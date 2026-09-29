// verify/checks.ts
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// src/geometry/spur.ts
function inv(alpha) {
  return Math.tan(alpha) - alpha;
}
function geom(p) {
  const alpha = p.alphaDeg * Math.PI / 180;
  const r = p.m * p.z / 2;
  const rb = r * Math.cos(alpha);
  const ra = r + p.haStar * p.m;
  const rf = r - (p.haStar + p.cStar) * p.m;
  const zMin = 2 * p.haStar / Math.sin(alpha) ** 2;
  return {
    p,
    alpha,
    r,
    rb,
    ra,
    rf,
    pCircular: Math.PI * p.m,
    s: Math.PI * p.m / 2,
    zMin,
    undercut: p.z < zMin - 1e-9
  };
}
function pressureAngleAt(g, rho) {
  return Math.acos(Math.min(1, g.rb / rho));
}
function halfAngleAt(g, rho) {
  return g.s / (2 * g.r) + inv(g.alpha) - inv(pressureAngleAt(g, rho));
}
function involuteSide(g, side, rhoStart, rhoEnd, nSegments, centerAngle = 0) {
  const gammaBase = g.s / (2 * g.r) + inv(g.alpha);
  const sign = side === 1 ? 1 : -1;
  const rot = centerAngle - sign * gammaBase;
  const tStart = Math.sqrt(Math.max(0, (rhoStart / g.rb) ** 2 - 1));
  const tEnd = Math.sqrt(Math.max(0, (rhoEnd / g.rb) ** 2 - 1));
  const pts = [];
  const c = Math.cos(rot);
  const s = Math.sin(rot);
  for (let i = 0; i <= nSegments; i++) {
    const t = tStart + (tEnd - tStart) * i / nSegments;
    const x0 = g.rb * (Math.cos(t) + t * Math.sin(t));
    const y0 = sign * g.rb * (Math.sin(t) - t * Math.cos(t));
    pts.push({ x: x0 * c - y0 * s, y: x0 * s + y0 * c });
  }
  return pts;
}
function arcPoints(radius, a0, a1, maxStep) {
  const span = a1 - a0;
  const n = Math.max(1, Math.ceil(Math.abs(span) / maxStep));
  const out = [];
  for (let i = 1; i <= n; i++) {
    const a = a0 + span * i / n;
    out.push({ x: radius * Math.cos(a), y: radius * Math.sin(a) });
  }
  return out;
}
function gearProfile(g, opts = {}) {
  const nInv = opts.involuteSegments ?? 28;
  const arcStep = opts.arcStep ?? 2 * Math.PI / 180;
  const rho0 = Math.max(g.rb, g.rf);
  const gammaRoot = halfAngleAt(g, rho0);
  const gammaTip = halfAngleAt(g, g.ra);
  const pitch = 2 * Math.PI / g.p.z;
  const ring = [];
  for (let i = 0; i < g.p.z; i++) {
    const c = i * pitch;
    const right = involuteSide(g, 1, rho0, g.ra, nInv, c);
    const rootPt = {
      x: g.rf * Math.cos(c - gammaRoot),
      y: g.rf * Math.sin(c - gammaRoot)
    };
    if (i === 0) ring.push(rootPt);
    ring.push(right[0]);
    for (let k = 1; k < right.length; k++) ring.push(right[k]);
    ring.push(...arcPoints(g.ra, c - gammaTip, c + gammaTip, arcStep));
    const left = involuteSide(g, -1, rho0, g.ra, nInv, c);
    for (let k = left.length - 2; k >= 0; k--) ring.push(left[k]);
    const leftRoot = {
      x: g.rf * Math.cos(c + gammaRoot),
      y: g.rf * Math.sin(c + gammaRoot)
    };
    ring.push(leftRoot);
    const next = (i + 1) * pitch;
    if (i === g.p.z - 1) {
      ring.push(...arcPoints(g.rf, c + gammaRoot, 2 * Math.PI - gammaRoot, arcStep));
    } else {
      ring.push(...arcPoints(g.rf, c + gammaRoot, next - gammaRoot, arcStep));
    }
  }
  ring.push({ ...ring[0] });
  return ring;
}
function polygonArea(ring) {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i].x * ring[i + 1].y - ring[i + 1].x * ring[i].y;
  }
  return a / 2;
}
function transformRing(ring, cx, cy, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return ring.map((p) => ({ x: cx + p.x * c - p.y * s, y: cy + p.x * s + p.y * c }));
}

// src/geometry/mesh.ts
var D2R = Math.PI / 180;
function analyzeMesh(input) {
  const g1 = geom(input.g1);
  const g2 = geom(input.g2);
  const issues = [];
  const compatible = Math.abs(g1.p.m - g2.p.m) < 1e-9 && Math.abs(g1.p.alphaDeg - g2.p.alphaDeg) < 1e-9 && Math.abs(g1.p.haStar - g2.p.haStar) < 1e-9 && Math.abs(g1.p.cStar - g2.p.cStar) < 1e-9;
  if (!compatible) issues.push("\u4E24\u8F6E\u6A21\u6570\u6216\u538B\u529B\u89D2\uFF08\u9F7F\u5236\uFF09\u4E0D\u540C\uFF0C\u4E0D\u80FD\u6B63\u786E\u556E\u5408\u3002");
  const aStandard = g1.r + g2.r;
  const a = aStandard + input.deltaA;
  if (input.deltaA < -1e-9) issues.push("\u4E2D\u5FC3\u8DDD\u5C0F\u4E8E\u6807\u51C6\u4E2D\u5FC3\u8DDD\uFF0C\u6807\u51C6\u96F6\u4FA7\u9699\u9F7F\u8F6E\u65E0\u6CD5\u88C5\u5165\uFF08\u9876\u6B7B\uFF0C\u5E94\u51FA\u73B0\u5B9E\u4F53\u91CD\u53E0\uFF09\u3002");
  const cosAlphaW = aStandard * Math.cos(g1.alpha) / a;
  const alphaW = Math.acos(Math.min(1, Math.max(-1, cosAlphaW)));
  const rw1 = g1.rb / Math.cos(alphaW);
  const rw2 = g2.rb / Math.cos(alphaW);
  const center1 = { x: 0, y: 0 };
  const center2 = { x: a, y: 0 };
  const pitchPoint = { x: rw1, y: 0 };
  const u = { x: -Math.sin(alphaW), y: Math.cos(alphaW) };
  const t1 = rw1 * Math.sin(alphaW);
  const t2 = -rw2 * Math.sin(alphaW);
  const sinW = Math.sin(alphaW);
  const discE1 = (2 * rw1 * sinW) ** 2 - 4 * (rw1 * rw1 - g1.ra * g1.ra);
  const e1 = discE1 >= 0 ? rw1 * sinW - 0.5 * Math.sqrt(Math.max(0, discE1)) : 0;
  const discE2 = (2 * rw2 * sinW) ** 2 - 4 * (rw2 * rw2 - g2.ra * g2.ra);
  const e2 = discE2 >= 0 ? -rw2 * sinW + 0.5 * Math.sqrt(Math.max(0, discE2)) : 0;
  const xiA = Math.max(e1, t2);
  const xiE = Math.min(e2, t1);
  const pathLen = Math.max(0, xiE - xiA);
  const basePitch = Math.PI * g1.p.m * Math.cos(g1.alpha);
  const contactRatio = pathLen / basePitch;
  const psi1 = halfAngleAt(g1, rw1);
  const psi2 = halfAngleAt(g2, rw2);
  const phi1 = Math.PI + psi1;
  const phi2 = psi2;
  const filletMargin1 = t1 - xiE;
  const filletMargin2 = xiA - t2;
  const fi1 = filletMargin1 < -1e-6;
  const fi2 = filletMargin2 < -1e-6;
  if (g1.undercut) issues.push(`\u5C0F\u8F6E z1=${g1.p.z} \u5C11\u4E8E\u65E0\u6839\u5207\u6700\u5C11\u9F7F\u6570 zmin=${g1.zMin.toFixed(2)}\uFF08\u03B1=${g1.p.alphaDeg}\xB0, ha*=${g1.p.haStar}\uFF09\uFF1A\u6807\u51C6\u5200\u5177\u52A0\u5DE5\u4F1A\u6839\u5207\uFF0C\u9F7F\u6839\u6E10\u5F00\u7EBF\u88AB\u5207\u53BB\u4E00\u90E8\u5206\u3002`);
  if (g2.undercut) issues.push(`\u5927\u8F6E z2=${g2.p.z} \u5C11\u4E8E\u65E0\u6839\u5207\u6700\u5C11\u9F7F\u6570 zmin=${g2.zMin.toFixed(2)}\uFF0C\u4F1A\u6839\u5207\u3002`);
  if (fi1) issues.push("\u5B58\u5728\u8FC7\u6E21\u66F2\u7EBF\u5E72\u6D89\u98CE\u9669\uFF1A\u5927\u8F6E\u9F7F\u9876\u8FDB\u5165\u5C0F\u8F6E\u9F7F\u6839\u975E\u6E10\u5F00\u7EBF\u533A\uFF08\u9700\u4FEE\u9F7F\u9876/\u53D8\u4F4D\uFF09\u3002");
  if (fi2) issues.push("\u5B58\u5728\u8FC7\u6E21\u66F2\u7EBF\u5E72\u6D89\u98CE\u9669\uFF1A\u5C0F\u8F6E\u9F7F\u9876\u8FDB\u5165\u5927\u8F6E\u9F7F\u6839\u975E\u6E10\u5F00\u7EBF\u533A\u3002");
  if (compatible && contactRatio < 1) issues.push(`\u91CD\u5408\u5EA6 \u03B5=${contactRatio.toFixed(3)} < 1\uFF0C\u4F20\u52A8\u4E0D\u8FDE\u7EED\u3002`);
  if (input.deltaA > 1e-9) issues.push(`\u4E2D\u5FC3\u8DDD\u62C9\u5F00 \u0394a=${input.deltaA} mm\uFF1A\u4EA7\u751F\u9F7F\u4FA7\u95F4\u9699\uFF0C\u556E\u5408\u89D2\u53D8\u4E3A ${(alphaW / D2R).toFixed(3)}\xB0\uFF0C\u5355\u5411\u4F20\u52A8\u65F6\u4EC5\u4E00\u4FA7\u9F7F\u9762\u63A5\u89E6\u3002`);
  return {
    g1,
    g2,
    compatible,
    issues,
    aStandard,
    a,
    alphaW,
    rw1,
    rw2,
    center1,
    center2,
    ratio: g2.p.z / g1.p.z,
    lineOfAction: { p: pitchPoint, u },
    pitchPoint,
    tangent1: t1,
    tangent2: t2,
    xiTip1: e1,
    xiTip2: e2,
    pathOfContactLength: pathLen,
    basePitch,
    contactRatio,
    phi1,
    phi2,
    undercut1: g1.undercut,
    undercut2: g2.undercut,
    filletInterference1: fi1,
    filletInterference2: fi2,
    filletMargin1,
    filletMargin2
  };
}
function meshAngles(rep, theta) {
  return {
    a1: rep.phi1 + theta,
    a2: rep.phi2 - rep.g1.p.z / rep.g2.p.z * theta
  };
}
function contactPointsAt(rep, theta) {
  const { g1, lineOfAction } = rep;
  const xiA = Math.max(rep.xiTip1, rep.tangent2);
  const xiE = Math.min(rep.xiTip2, rep.tangent1);
  const pb = rep.basePitch;
  const out = [];
  const center = g1.rb * theta;
  const n0 = Math.round(-center / pb);
  for (let n = n0 - 2; n <= n0 + 2; n++) {
    const xi = center + n * pb;
    if (xi >= xiA - 1e-7 && xi <= xiE + 1e-7) {
      out.push({
        x: lineOfAction.p.x + xi * lineOfAction.u.x,
        y: lineOfAction.p.y + xi * lineOfAction.u.y,
        xi,
        pairIndex: n
      });
    }
  }
  return out;
}

// node_modules/clipper2-wasm/dist/es/clipper2z.js
async function Clipper2Z(moduleArg = {}) {
  var moduleRtn;
  var Module = moduleArg;
  var ENVIRONMENT_IS_WEB = !!globalThis.window;
  var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
  var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
  if (ENVIRONMENT_IS_NODE) {
    const { createRequire } = await import("module");
    var require2 = createRequire(import.meta.url);
  }
  var arguments_ = [];
  var thisProgram = "./this.program";
  var quit_ = (status, toThrow) => {
    throw toThrow;
  };
  var _scriptName = import.meta.url;
  var scriptDirectory = "";
  function locateFile(path2) {
    if (Module["locateFile"]) {
      return Module["locateFile"](path2, scriptDirectory);
    }
    return scriptDirectory + path2;
  }
  var readAsync, readBinary;
  if (ENVIRONMENT_IS_NODE) {
    var fs = require2("fs");
    if (_scriptName.startsWith("file:")) {
      scriptDirectory = require2("path").dirname(require2("url").fileURLToPath(_scriptName)) + "/";
    }
    readBinary = (filename) => {
      filename = isFileURI(filename) ? new URL(filename) : filename;
      var ret = fs.readFileSync(filename);
      return ret;
    };
    readAsync = async (filename, binary = true) => {
      filename = isFileURI(filename) ? new URL(filename) : filename;
      var ret = fs.readFileSync(filename, binary ? void 0 : "utf8");
      return ret;
    };
    if (process.argv.length > 1) {
      thisProgram = process.argv[1].replace(/\\/g, "/");
    }
    arguments_ = process.argv.slice(2);
    quit_ = (status, toThrow) => {
      process.exitCode = status;
      throw toThrow;
    };
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    try {
      scriptDirectory = new URL(".", _scriptName).href;
    } catch {
    }
    {
      if (ENVIRONMENT_IS_WORKER) {
        readBinary = (url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.responseType = "arraybuffer";
          xhr.send(null);
          return new Uint8Array(xhr.response);
        };
      }
      readAsync = async (url) => {
        if (isFileURI(url)) {
          return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                resolve(xhr.response);
                return;
              }
              reject(xhr.status);
            };
            xhr.onerror = reject;
            xhr.send(null);
          });
        }
        var response = await fetch(url, { credentials: "same-origin" });
        if (response.ok) {
          return response.arrayBuffer();
        }
        throw new Error(response.status + " : " + response.url);
      };
    }
  } else {
  }
  var out = console.log.bind(console);
  var err = console.error.bind(console);
  var wasmBinary;
  var ABORT = false;
  var isFileURI = (filename) => filename.startsWith("file://");
  var readyPromiseResolve, readyPromiseReject;
  var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
  var HEAP64, HEAPU64;
  var runtimeInitialized = false;
  function updateMemoryViews() {
    var b = wasmMemory.buffer;
    HEAP8 = new Int8Array(b);
    HEAP16 = new Int16Array(b);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
    HEAPU16 = new Uint16Array(b);
    HEAP32 = new Int32Array(b);
    HEAPU32 = new Uint32Array(b);
    HEAPF32 = new Float32Array(b);
    HEAPF64 = new Float64Array(b);
    HEAP64 = new BigInt64Array(b);
    HEAPU64 = new BigUint64Array(b);
  }
  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    callRuntimeCallbacks(onPreRuns);
  }
  function initRuntime() {
    runtimeInitialized = true;
    wasmExports["E"]();
  }
  function postRun() {
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    callRuntimeCallbacks(onPostRuns);
  }
  function abort(what) {
    Module["onAbort"]?.(what);
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    what += ". Build with -sASSERTIONS for more info.";
    var e = new WebAssembly.RuntimeError(what);
    readyPromiseReject?.(e);
    throw e;
  }
  var wasmBinaryFile;
  function findWasmBinary() {
    if (Module["locateFile"]) {
      return locateFile("clipper2z.wasm");
    }
    return new URL("clipper2z.wasm", import.meta.url).href;
  }
  function getBinarySync(file) {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    }
    throw "both async and sync fetching of the wasm failed";
  }
  async function getWasmBinary(binaryFile) {
    if (!wasmBinary) {
      try {
        var response = await readAsync(binaryFile);
        return new Uint8Array(response);
      } catch {
      }
    }
    return getBinarySync(binaryFile);
  }
  async function instantiateArrayBuffer(binaryFile, imports) {
    try {
      var binary = await getWasmBinary(binaryFile);
      var instance = await WebAssembly.instantiate(binary, imports);
      return instance;
    } catch (reason) {
      err(`failed to asynchronously prepare wasm: ${reason}`);
      abort(reason);
    }
  }
  async function instantiateAsync(binary, binaryFile, imports) {
    if (!binary && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE) {
      try {
        var response = fetch(binaryFile, { credentials: "same-origin" });
        var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
        return instantiationResult;
      } catch (reason) {
        err(`wasm streaming compile failed: ${reason}`);
        err("falling back to ArrayBuffer instantiation");
      }
    }
    return instantiateArrayBuffer(binaryFile, imports);
  }
  function getWasmImports() {
    var imports = { a: wasmImports };
    return imports;
  }
  async function createWasm() {
    function receiveInstance(instance, module) {
      wasmExports = instance.exports;
      assignWasmExports(wasmExports);
      updateMemoryViews();
      return wasmExports;
    }
    function receiveInstantiationResult(result2) {
      return receiveInstance(result2["instance"]);
    }
    var info = getWasmImports();
    if (Module["instantiateWasm"]) {
      return new Promise((resolve, reject) => {
        Module["instantiateWasm"](info, (inst, mod) => {
          resolve(receiveInstance(inst, mod));
        });
      });
    }
    wasmBinaryFile ??= findWasmBinary();
    var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
    var exports = receiveInstantiationResult(result);
    return exports;
  }
  class ExitStatus {
    name = "ExitStatus";
    constructor(status) {
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  }
  var callRuntimeCallbacks = (callbacks) => {
    while (callbacks.length > 0) {
      callbacks.shift()(Module);
    }
  };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);
  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);
  var noExitRuntime = true;
  class ExceptionInfo {
    constructor(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 24;
    }
    set_type(type) {
      HEAPU32[this.ptr + 4 >> 2] = type;
    }
    get_type() {
      return HEAPU32[this.ptr + 4 >> 2];
    }
    set_destructor(destructor) {
      HEAPU32[this.ptr + 8 >> 2] = destructor;
    }
    get_destructor() {
      return HEAPU32[this.ptr + 8 >> 2];
    }
    set_caught(caught) {
      caught = caught ? 1 : 0;
      HEAP8[this.ptr + 12] = caught;
    }
    get_caught() {
      return HEAP8[this.ptr + 12] != 0;
    }
    set_rethrown(rethrown) {
      rethrown = rethrown ? 1 : 0;
      HEAP8[this.ptr + 13] = rethrown;
    }
    get_rethrown() {
      return HEAP8[this.ptr + 13] != 0;
    }
    init(type, destructor) {
      this.set_adjusted_ptr(0);
      this.set_type(type);
      this.set_destructor(destructor);
    }
    set_adjusted_ptr(adjustedPtr) {
      HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
    }
    get_adjusted_ptr() {
      return HEAPU32[this.ptr + 16 >> 2];
    }
  }
  var exceptionLast = 0;
  var uncaughtExceptionCount = 0;
  var ___cxa_throw = (ptr, type, destructor) => {
    var info = new ExceptionInfo(ptr);
    info.init(type, destructor);
    exceptionLast = ptr;
    uncaughtExceptionCount++;
    throw exceptionLast;
  };
  var __abort_js = () => abort("");
  var structRegistrations = {};
  var runDestructors = (destructors) => {
    while (destructors.length) {
      var ptr = destructors.pop();
      var del = destructors.pop();
      del(ptr);
    }
  };
  function readPointer(pointer) {
    return this.fromWireType(HEAPU32[pointer >> 2]);
  }
  var awaitingDependencies = {};
  var registeredTypes = {};
  var typeDependencies = {};
  var InternalError = class InternalError extends Error {
    constructor(message) {
      super(message);
      this.name = "InternalError";
    }
  };
  var throwInternalError = (message) => {
    throw new InternalError(message);
  };
  var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
    myTypes.forEach((type) => typeDependencies[type] = dependentTypes);
    function onComplete(typeConverters2) {
      var myTypeConverters = getTypeConverters(typeConverters2);
      if (myTypeConverters.length !== myTypes.length) {
        throwInternalError("Mismatched type converter count");
      }
      for (var i = 0; i < myTypes.length; ++i) {
        registerType(myTypes[i], myTypeConverters[i]);
      }
    }
    var typeConverters = new Array(dependentTypes.length);
    var unregisteredTypes = [];
    var registered = 0;
    dependentTypes.forEach((dt, i) => {
      if (registeredTypes.hasOwnProperty(dt)) {
        typeConverters[i] = registeredTypes[dt];
      } else {
        unregisteredTypes.push(dt);
        if (!awaitingDependencies.hasOwnProperty(dt)) {
          awaitingDependencies[dt] = [];
        }
        awaitingDependencies[dt].push(() => {
          typeConverters[i] = registeredTypes[dt];
          ++registered;
          if (registered === unregisteredTypes.length) {
            onComplete(typeConverters);
          }
        });
      }
    });
    if (0 === unregisteredTypes.length) {
      onComplete(typeConverters);
    }
  };
  var __embind_finalize_value_object = (structType) => {
    var reg = structRegistrations[structType];
    delete structRegistrations[structType];
    var rawConstructor = reg.rawConstructor;
    var rawDestructor = reg.rawDestructor;
    var fieldRecords = reg.fields;
    var fieldTypes = fieldRecords.map((field) => field.getterReturnType).concat(fieldRecords.map((field) => field.setterArgumentType));
    whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes2) => {
      var fields = {};
      fieldRecords.forEach((field, i) => {
        var fieldName = field.fieldName;
        var getterReturnType = fieldTypes2[i];
        var optional = fieldTypes2[i].optional;
        var getter = field.getter;
        var getterContext = field.getterContext;
        var setterArgumentType = fieldTypes2[i + fieldRecords.length];
        var setter = field.setter;
        var setterContext = field.setterContext;
        fields[fieldName] = { read: (ptr) => getterReturnType.fromWireType(getter(getterContext, ptr)), write: (ptr, o) => {
          var destructors = [];
          setter(setterContext, ptr, setterArgumentType.toWireType(destructors, o));
          runDestructors(destructors);
        }, optional };
      });
      return [{ name: reg.name, fromWireType: (ptr) => {
        var rv = {};
        for (var i in fields) {
          rv[i] = fields[i].read(ptr);
        }
        rawDestructor(ptr);
        return rv;
      }, toWireType: (destructors, o) => {
        for (var fieldName in fields) {
          if (!(fieldName in o) && !fields[fieldName].optional) {
            throw new TypeError(`Missing field: "${fieldName}"`);
          }
        }
        var ptr = rawConstructor();
        for (fieldName in fields) {
          fields[fieldName].write(ptr, o[fieldName]);
        }
        if (destructors !== null) {
          destructors.push(rawDestructor, ptr);
        }
        return ptr;
      }, readValueFromPointer: readPointer, destructorFunction: rawDestructor }];
    });
  };
  var AsciiToString = (ptr) => {
    var str = "";
    while (1) {
      var ch = HEAPU8[ptr++];
      if (!ch) return str;
      str += String.fromCharCode(ch);
    }
  };
  var BindingError = class BindingError extends Error {
    constructor(message) {
      super(message);
      this.name = "BindingError";
    }
  };
  var throwBindingError = (message) => {
    throw new BindingError(message);
  };
  function sharedRegisterType(rawType, registeredInstance, options = {}) {
    var name = registeredInstance.name;
    if (!rawType) {
      throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
    }
    if (registeredTypes.hasOwnProperty(rawType)) {
      if (options.ignoreDuplicateRegistrations) {
        return;
      } else {
        throwBindingError(`Cannot register type '${name}' twice`);
      }
    }
    registeredTypes[rawType] = registeredInstance;
    delete typeDependencies[rawType];
    if (awaitingDependencies.hasOwnProperty(rawType)) {
      var callbacks = awaitingDependencies[rawType];
      delete awaitingDependencies[rawType];
      callbacks.forEach((cb) => cb());
    }
  }
  function registerType(rawType, registeredInstance, options = {}) {
    return sharedRegisterType(rawType, registeredInstance, options);
  }
  var integerReadValueFromPointer = (name, width, signed) => {
    switch (width) {
      case 1:
        return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
      case 2:
        return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
      case 4:
        return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
      case 8:
        return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
      default:
        throw new TypeError(`invalid integer width (${width}): ${name}`);
    }
  };
  var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
    name = AsciiToString(name);
    const isUnsignedType = minRange === 0n;
    let fromWireType = (value) => value;
    if (isUnsignedType) {
      const bitSize = size * 8;
      fromWireType = (value) => BigInt.asUintN(bitSize, value);
      maxRange = fromWireType(maxRange);
    }
    registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => {
      if (typeof value == "number") {
        value = BigInt(value);
      }
      return value;
    }, readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType), destructorFunction: null });
  };
  var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: function(wt) {
      return !!wt;
    }, toWireType: function(destructors, o) {
      return o ? trueValue : falseValue;
    }, readValueFromPointer: function(pointer) {
      return this.fromWireType(HEAPU8[pointer]);
    }, destructorFunction: null });
  };
  var shallowCopyInternalPointer = (o) => ({ count: o.count, deleteScheduled: o.deleteScheduled, preservePointerOnDelete: o.preservePointerOnDelete, ptr: o.ptr, ptrType: o.ptrType, smartPtr: o.smartPtr, smartPtrType: o.smartPtrType });
  var throwInstanceAlreadyDeleted = (obj) => {
    function getInstanceTypeName(handle) {
      return handle.$$.ptrType.registeredClass.name;
    }
    throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
  };
  var finalizationRegistry = false;
  var detachFinalizer = (handle) => {
  };
  var runDestructor = ($$) => {
    if ($$.smartPtr) {
      $$.smartPtrType.rawDestructor($$.smartPtr);
    } else {
      $$.ptrType.registeredClass.rawDestructor($$.ptr);
    }
  };
  var releaseClassHandle = ($$) => {
    $$.count.value -= 1;
    var toDelete = 0 === $$.count.value;
    if (toDelete) {
      runDestructor($$);
    }
  };
  var attachFinalizer = (handle) => {
    if (!globalThis.FinalizationRegistry) {
      attachFinalizer = (handle2) => handle2;
      return handle;
    }
    finalizationRegistry = new FinalizationRegistry((info) => {
      releaseClassHandle(info.$$);
    });
    attachFinalizer = (handle2) => {
      var $$ = handle2.$$;
      var hasSmartPtr = !!$$.smartPtr;
      if (hasSmartPtr) {
        var info = { $$ };
        finalizationRegistry.register(handle2, info, handle2);
      }
      return handle2;
    };
    detachFinalizer = (handle2) => finalizationRegistry.unregister(handle2);
    return attachFinalizer(handle);
  };
  var deletionQueue = [];
  var flushPendingDeletes = () => {
    while (deletionQueue.length) {
      var obj = deletionQueue.pop();
      obj.$$.deleteScheduled = false;
      obj["delete"]();
    }
  };
  var delayFunction;
  var init_ClassHandle = () => {
    let proto = ClassHandle.prototype;
    Object.assign(proto, { isAliasOf(other) {
      if (!(this instanceof ClassHandle)) {
        return false;
      }
      if (!(other instanceof ClassHandle)) {
        return false;
      }
      var leftClass = this.$$.ptrType.registeredClass;
      var left = this.$$.ptr;
      other.$$ = other.$$;
      var rightClass = other.$$.ptrType.registeredClass;
      var right = other.$$.ptr;
      while (leftClass.baseClass) {
        left = leftClass.upcast(left);
        leftClass = leftClass.baseClass;
      }
      while (rightClass.baseClass) {
        right = rightClass.upcast(right);
        rightClass = rightClass.baseClass;
      }
      return leftClass === rightClass && left === right;
    }, clone() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1;
        return this;
      } else {
        var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } }));
        clone.$$.count.value += 1;
        clone.$$.deleteScheduled = false;
        return clone;
      }
    }, delete() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion");
      }
      detachFinalizer(this);
      releaseClassHandle(this.$$);
      if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = void 0;
        this.$$.ptr = void 0;
      }
    }, isDeleted() {
      return !this.$$.ptr;
    }, deleteLater() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion");
      }
      deletionQueue.push(this);
      if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
      this.$$.deleteScheduled = true;
      return this;
    } });
    const symbolDispose = Symbol.dispose;
    if (symbolDispose) {
      proto[symbolDispose] = proto["delete"];
    }
  };
  function ClassHandle() {
  }
  var createNamedFunction = (name, func) => Object.defineProperty(func, "name", { value: name });
  var registeredPointers = {};
  var ensureOverloadTable = (proto, methodName, humanName) => {
    if (void 0 === proto[methodName].overloadTable) {
      var prevFunc = proto[methodName];
      proto[methodName] = function(...args) {
        if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
          throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
        }
        return proto[methodName].overloadTable[args.length].apply(this, args);
      };
      proto[methodName].overloadTable = [];
      proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
    }
  };
  var exposePublicSymbol = (name, value, numArguments) => {
    if (Module.hasOwnProperty(name)) {
      if (void 0 === numArguments || void 0 !== Module[name].overloadTable && void 0 !== Module[name].overloadTable[numArguments]) {
        throwBindingError(`Cannot register public name '${name}' twice`);
      }
      ensureOverloadTable(Module, name, name);
      if (Module[name].overloadTable.hasOwnProperty(numArguments)) {
        throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
      }
      Module[name].overloadTable[numArguments] = value;
    } else {
      Module[name] = value;
      Module[name].argCount = numArguments;
    }
  };
  var char_0 = 48;
  var char_9 = 57;
  var makeLegalFunctionName = (name) => {
    name = name.replace(/[^a-zA-Z0-9_]/g, "$");
    var f = name.charCodeAt(0);
    if (f >= char_0 && f <= char_9) {
      return `_${name}`;
    }
    return name;
  };
  function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
    this.name = name;
    this.constructor = constructor;
    this.instancePrototype = instancePrototype;
    this.rawDestructor = rawDestructor;
    this.baseClass = baseClass;
    this.getActualType = getActualType;
    this.upcast = upcast;
    this.downcast = downcast;
    this.pureVirtualFunctions = [];
  }
  var upcastPointer = (ptr, ptrClass, desiredClass) => {
    while (ptrClass !== desiredClass) {
      if (!ptrClass.upcast) {
        throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
      }
      ptr = ptrClass.upcast(ptr);
      ptrClass = ptrClass.baseClass;
    }
    return ptr;
  };
  var embindRepr = (v) => {
    if (v === null) {
      return "null";
    }
    var t = typeof v;
    if (t === "object" || t === "array" || t === "function") {
      return v.toString();
    } else {
      return "" + v;
    }
  };
  function constNoSmartPtrRawPointerToWireType(destructors, handle) {
    if (handle === null) {
      if (this.isReference) {
        throwBindingError(`null is not a valid ${this.name}`);
      }
      return 0;
    }
    if (!handle.$$) {
      throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
    }
    if (!handle.$$.ptr) {
      throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    return ptr;
  }
  function genericPointerToWireType(destructors, handle) {
    var ptr;
    if (handle === null) {
      if (this.isReference) {
        throwBindingError(`null is not a valid ${this.name}`);
      }
      if (this.isSmartPointer) {
        ptr = this.rawConstructor();
        if (destructors !== null) {
          destructors.push(this.rawDestructor, ptr);
        }
        return ptr;
      } else {
        return 0;
      }
    }
    if (!handle || !handle.$$) {
      throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
    }
    if (!handle.$$.ptr) {
      throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
    }
    if (!this.isConst && handle.$$.ptrType.isConst) {
      throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    if (this.isSmartPointer) {
      if (void 0 === handle.$$.smartPtr) {
        throwBindingError("Passing raw pointer to smart pointer is illegal");
      }
      switch (this.sharingPolicy) {
        case 0:
          if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr;
          } else {
            throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
          }
          break;
        case 1:
          ptr = handle.$$.smartPtr;
          break;
        case 2:
          if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr;
          } else {
            var clonedHandle = handle["clone"]();
            ptr = this.rawShare(ptr, Emval.toHandle(() => clonedHandle["delete"]()));
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr);
            }
          }
          break;
        default:
          throwBindingError("Unsupporting sharing policy");
      }
    }
    return ptr;
  }
  function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
    if (handle === null) {
      if (this.isReference) {
        throwBindingError(`null is not a valid ${this.name}`);
      }
      return 0;
    }
    if (!handle.$$) {
      throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
    }
    if (!handle.$$.ptr) {
      throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
    }
    if (handle.$$.ptrType.isConst) {
      throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    return ptr;
  }
  var downcastPointer = (ptr, ptrClass, desiredClass) => {
    if (ptrClass === desiredClass) {
      return ptr;
    }
    if (void 0 === desiredClass.baseClass) {
      return null;
    }
    var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
    if (rv === null) {
      return null;
    }
    return desiredClass.downcast(rv);
  };
  var registeredInstances = {};
  var getBasestPointer = (class_, ptr) => {
    if (ptr === void 0) {
      throwBindingError("ptr should not be undefined");
    }
    while (class_.baseClass) {
      ptr = class_.upcast(ptr);
      class_ = class_.baseClass;
    }
    return ptr;
  };
  var getInheritedInstance = (class_, ptr) => {
    ptr = getBasestPointer(class_, ptr);
    return registeredInstances[ptr];
  };
  var makeClassHandle = (prototype, record) => {
    if (!record.ptrType || !record.ptr) {
      throwInternalError("makeClassHandle requires ptr and ptrType");
    }
    var hasSmartPtrType = !!record.smartPtrType;
    var hasSmartPtr = !!record.smartPtr;
    if (hasSmartPtrType !== hasSmartPtr) {
      throwInternalError("Both smartPtrType and smartPtr must be specified");
    }
    record.count = { value: 1 };
    return attachFinalizer(Object.create(prototype, { $$: { value: record, writable: true } }));
  };
  function RegisteredPointer_fromWireType(ptr) {
    var rawPointer = this.getPointee(ptr);
    if (!rawPointer) {
      this.destructor(ptr);
      return null;
    }
    var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
    if (void 0 !== registeredInstance) {
      if (0 === registeredInstance.$$.count.value) {
        registeredInstance.$$.ptr = rawPointer;
        registeredInstance.$$.smartPtr = ptr;
        return registeredInstance["clone"]();
      } else {
        var rv = registeredInstance["clone"]();
        this.destructor(ptr);
        return rv;
      }
    }
    function makeDefaultHandle() {
      if (this.isSmartPointer) {
        return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: rawPointer, smartPtrType: this, smartPtr: ptr });
      } else {
        return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr });
      }
    }
    var actualType = this.registeredClass.getActualType(rawPointer);
    var registeredPointerRecord = registeredPointers[actualType];
    if (!registeredPointerRecord) {
      return makeDefaultHandle.call(this);
    }
    var toType;
    if (this.isConst) {
      toType = registeredPointerRecord.constPointerType;
    } else {
      toType = registeredPointerRecord.pointerType;
    }
    var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
    if (dp === null) {
      return makeDefaultHandle.call(this);
    }
    if (this.isSmartPointer) {
      return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp, smartPtrType: this, smartPtr: ptr });
    } else {
      return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp });
    }
  }
  var init_RegisteredPointer = () => {
    Object.assign(RegisteredPointer.prototype, { getPointee(ptr) {
      if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr);
      }
      return ptr;
    }, destructor(ptr) {
      this.rawDestructor?.(ptr);
    }, readValueFromPointer: readPointer, fromWireType: RegisteredPointer_fromWireType });
  };
  function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
    this.name = name;
    this.registeredClass = registeredClass;
    this.isReference = isReference;
    this.isConst = isConst;
    this.isSmartPointer = isSmartPointer;
    this.pointeeType = pointeeType;
    this.sharingPolicy = sharingPolicy;
    this.rawGetPointee = rawGetPointee;
    this.rawConstructor = rawConstructor;
    this.rawShare = rawShare;
    this.rawDestructor = rawDestructor;
    if (!isSmartPointer && registeredClass.baseClass === void 0) {
      if (isConst) {
        this.toWireType = constNoSmartPtrRawPointerToWireType;
        this.destructorFunction = null;
      } else {
        this.toWireType = nonConstNoSmartPtrRawPointerToWireType;
        this.destructorFunction = null;
      }
    } else {
      this.toWireType = genericPointerToWireType;
    }
  }
  var replacePublicSymbol = (name, value, numArguments) => {
    if (!Module.hasOwnProperty(name)) {
      throwInternalError("Replacing nonexistent public symbol");
    }
    if (void 0 !== Module[name].overloadTable && void 0 !== numArguments) {
      Module[name].overloadTable[numArguments] = value;
    } else {
      Module[name] = value;
      Module[name].argCount = numArguments;
    }
  };
  var wasmTableMirror = [];
  var getWasmTableEntry = (funcPtr) => {
    var func = wasmTableMirror[funcPtr];
    if (!func) {
      wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
    }
    return func;
  };
  var embind__requireFunction = (signature, rawFunction, isAsync = false) => {
    signature = AsciiToString(signature);
    function makeDynCaller() {
      var rtn = getWasmTableEntry(rawFunction);
      return rtn;
    }
    var fp = makeDynCaller();
    if (typeof fp != "function") {
      throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
    }
    return fp;
  };
  class UnboundTypeError extends Error {
  }
  var getTypeName = (type) => {
    var ptr = ___getTypeName(type);
    var rv = AsciiToString(ptr);
    _free(ptr);
    return rv;
  };
  var throwUnboundTypeError = (message, types) => {
    var unboundTypes = [];
    var seen = {};
    function visit(type) {
      if (seen[type]) {
        return;
      }
      if (registeredTypes[type]) {
        return;
      }
      if (typeDependencies[type]) {
        typeDependencies[type].forEach(visit);
        return;
      }
      unboundTypes.push(type);
      seen[type] = true;
    }
    types.forEach(visit);
    throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([", "]));
  };
  var __embind_register_class = (rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) => {
    name = AsciiToString(name);
    getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
    upcast &&= embind__requireFunction(upcastSignature, upcast);
    downcast &&= embind__requireFunction(downcastSignature, downcast);
    rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
    var legalFunctionName = makeLegalFunctionName(name);
    exposePublicSymbol(legalFunctionName, function() {
      throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [baseClassRawType]);
    });
    whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], (base) => {
      base = base[0];
      var baseClass;
      var basePrototype;
      if (baseClassRawType) {
        baseClass = base.registeredClass;
        basePrototype = baseClass.instancePrototype;
      } else {
        basePrototype = ClassHandle.prototype;
      }
      var constructor = createNamedFunction(name, function(...args) {
        if (Object.getPrototypeOf(this) !== instancePrototype) {
          throw new BindingError(`Use 'new' to construct ${name}`);
        }
        if (void 0 === registeredClass.constructor_body) {
          throw new BindingError(`${name} has no accessible constructor`);
        }
        var body = registeredClass.constructor_body[args.length];
        if (void 0 === body) {
          throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
        }
        return body.apply(this, args);
      });
      var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } });
      constructor.prototype = instancePrototype;
      var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
      if (registeredClass.baseClass) {
        registeredClass.baseClass.__derivedClasses ??= [];
        registeredClass.baseClass.__derivedClasses.push(registeredClass);
      }
      var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
      var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
      var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
      registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter };
      replacePublicSymbol(legalFunctionName, constructor);
      return [referenceConverter, pointerConverter, constPointerConverter];
    });
  };
  var heap32VectorToArray = (count, firstElement) => {
    var array = [];
    for (var i = 0; i < count; i++) {
      array.push(HEAPU32[firstElement + i * 4 >> 2]);
    }
    return array;
  };
  function usesDestructorStack(argTypes) {
    for (var i = 1; i < argTypes.length; ++i) {
      if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
        return true;
      }
    }
    return false;
  }
  function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
    var needsDestructorStack = usesDestructorStack(argTypes);
    var argCount = argTypes.length - 2;
    var argsList = [];
    var argsListWired = ["fn"];
    if (isClassMethodFunc) {
      argsListWired.push("thisWired");
    }
    for (var i = 0; i < argCount; ++i) {
      argsList.push(`arg${i}`);
      argsListWired.push(`arg${i}Wired`);
    }
    argsList = argsList.join(",");
    argsListWired = argsListWired.join(",");
    var invokerFnBody = `return function (${argsList}) {
`;
    if (needsDestructorStack) {
      invokerFnBody += "var destructors = [];\n";
    }
    var dtorStack = needsDestructorStack ? "destructors" : "null";
    var args1 = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
    if (isClassMethodFunc) {
      invokerFnBody += `var thisWired = toClassParamWire(${dtorStack}, this);
`;
    }
    for (var i = 0; i < argCount; ++i) {
      var argName = `toArg${i}Wire`;
      invokerFnBody += `var arg${i}Wired = ${argName}(${dtorStack}, arg${i});
`;
      args1.push(argName);
    }
    invokerFnBody += (returns || isAsync ? "var rv = " : "") + `invoker(${argsListWired});
`;
    if (needsDestructorStack) {
      invokerFnBody += "runDestructors(destructors);\n";
    } else {
      for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
        var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
        if (argTypes[i].destructorFunction !== null) {
          invokerFnBody += `${paramName}_dtor(${paramName});
`;
          args1.push(`${paramName}_dtor`);
        }
      }
    }
    if (returns) {
      invokerFnBody += "var ret = fromRetWire(rv);\nreturn ret;\n";
    } else {
    }
    invokerFnBody += "}\n";
    return new Function(args1, invokerFnBody);
  }
  function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
    var argCount = argTypes.length;
    if (argCount < 2) {
      throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
    }
    var isClassMethodFunc = argTypes[1] !== null && classType !== null;
    var needsDestructorStack = usesDestructorStack(argTypes);
    var returns = !argTypes[0].isVoid;
    var retType = argTypes[0];
    var instType = argTypes[1];
    var closureArgs = [humanName, throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, retType.fromWireType.bind(retType), instType?.toWireType.bind(instType)];
    for (var i = 2; i < argCount; ++i) {
      var argType = argTypes[i];
      closureArgs.push(argType.toWireType.bind(argType));
    }
    if (!needsDestructorStack) {
      for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
        if (argTypes[i].destructorFunction !== null) {
          closureArgs.push(argTypes[i].destructorFunction);
        }
      }
    }
    let invokerFactory = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
    var invokerFn = invokerFactory(...closureArgs);
    return createNamedFunction(humanName, invokerFn);
  }
  var __embind_register_class_constructor = (rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) => {
    var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
    invoker = embind__requireFunction(invokerSignature, invoker);
    whenDependentTypesAreResolved([], [rawClassType], (classType) => {
      classType = classType[0];
      var humanName = `constructor ${classType.name}`;
      if (void 0 === classType.registeredClass.constructor_body) {
        classType.registeredClass.constructor_body = [];
      }
      if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) {
        throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount - 1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
      }
      classType.registeredClass.constructor_body[argCount - 1] = () => {
        throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, rawArgTypes);
      };
      whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
        argTypes.splice(1, 0, null);
        classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
        return [];
      });
      return [];
    });
  };
  var getFunctionName = (signature) => {
    signature = signature.trim();
    const argsIndex = signature.indexOf("(");
    if (argsIndex === -1) return signature;
    return signature.slice(0, argsIndex);
  };
  var __embind_register_class_function = (rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual, isAsync, isNonnullReturn) => {
    var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
    methodName = AsciiToString(methodName);
    methodName = getFunctionName(methodName);
    rawInvoker = embind__requireFunction(invokerSignature, rawInvoker, isAsync);
    whenDependentTypesAreResolved([], [rawClassType], (classType) => {
      classType = classType[0];
      var humanName = `${classType.name}.${methodName}`;
      if (methodName.startsWith("@@")) {
        methodName = Symbol[methodName.substring(2)];
      }
      if (isPureVirtual) {
        classType.registeredClass.pureVirtualFunctions.push(methodName);
      }
      function unboundTypesHandler() {
        throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
      }
      var proto = classType.registeredClass.instancePrototype;
      var method = proto[methodName];
      if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
        unboundTypesHandler.argCount = argCount - 2;
        unboundTypesHandler.className = classType.name;
        proto[methodName] = unboundTypesHandler;
      } else {
        ensureOverloadTable(proto, methodName, humanName);
        proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
      }
      whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
        var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
        if (void 0 === proto[methodName].overloadTable) {
          memberFunction.argCount = argCount - 2;
          proto[methodName] = memberFunction;
        } else {
          proto[methodName].overloadTable[argCount - 2] = memberFunction;
        }
        return [];
      });
      return [];
    });
  };
  var validateThis = (this_, classType, humanName) => {
    if (!(this_ instanceof Object)) {
      throwBindingError(`${humanName} with invalid "this": ${this_}`);
    }
    if (!(this_ instanceof classType.registeredClass.constructor)) {
      throwBindingError(`${humanName} incompatible with "this" of type ${this_.constructor.name}`);
    }
    if (!this_.$$.ptr) {
      throwBindingError(`cannot call emscripten binding method ${humanName} on deleted object`);
    }
    return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass);
  };
  var __embind_register_class_property = (classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) => {
    fieldName = AsciiToString(fieldName);
    getter = embind__requireFunction(getterSignature, getter);
    whenDependentTypesAreResolved([], [classType], (classType2) => {
      classType2 = classType2[0];
      var humanName = `${classType2.name}.${fieldName}`;
      var desc = { get() {
        throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [getterReturnType, setterArgumentType]);
      }, enumerable: true, configurable: true };
      if (setter) {
        desc.set = () => throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [getterReturnType, setterArgumentType]);
      } else {
        desc.set = (v) => throwBindingError(humanName + " is a read-only property");
      }
      Object.defineProperty(classType2.registeredClass.instancePrototype, fieldName, desc);
      whenDependentTypesAreResolved([], setter ? [getterReturnType, setterArgumentType] : [getterReturnType], (types) => {
        var getterReturnType2 = types[0];
        var desc2 = { get() {
          var ptr = validateThis(this, classType2, humanName + " getter");
          return getterReturnType2.fromWireType(getter(getterContext, ptr));
        }, enumerable: true };
        if (setter) {
          setter = embind__requireFunction(setterSignature, setter);
          var setterArgumentType2 = types[1];
          desc2.set = function(v) {
            var ptr = validateThis(this, classType2, humanName + " setter");
            var destructors = [];
            setter(setterContext, ptr, setterArgumentType2.toWireType(destructors, v));
            runDestructors(destructors);
          };
        }
        Object.defineProperty(classType2.registeredClass.instancePrototype, fieldName, desc2);
        return [];
      });
      return [];
    });
  };
  var emval_freelist = [];
  var emval_handles = [0, 1, , 1, null, 1, true, 1, false, 1];
  var __emval_decref = (handle) => {
    if (handle > 9 && 0 === --emval_handles[handle + 1]) {
      emval_handles[handle] = void 0;
      emval_freelist.push(handle);
    }
  };
  var Emval = { toValue: (handle) => {
    if (!handle) {
      throwBindingError(`Cannot use deleted val. handle = ${handle}`);
    }
    return emval_handles[handle];
  }, toHandle: (value) => {
    switch (value) {
      case void 0:
        return 2;
      case null:
        return 4;
      case true:
        return 6;
      case false:
        return 8;
      default: {
        const handle = emval_freelist.pop() || emval_handles.length;
        emval_handles[handle] = value;
        emval_handles[handle + 1] = 1;
        return handle;
      }
    }
  } };
  var EmValType = { name: "emscripten::val", fromWireType: (handle) => {
    var rv = Emval.toValue(handle);
    __emval_decref(handle);
    return rv;
  }, toWireType: (destructors, value) => Emval.toHandle(value), readValueFromPointer: readPointer, destructorFunction: null };
  var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
  var enumReadValueFromPointer = (name, width, signed) => {
    switch (width) {
      case 1:
        return signed ? function(pointer) {
          return this.fromWireType(HEAP8[pointer]);
        } : function(pointer) {
          return this.fromWireType(HEAPU8[pointer]);
        };
      case 2:
        return signed ? function(pointer) {
          return this.fromWireType(HEAP16[pointer >> 1]);
        } : function(pointer) {
          return this.fromWireType(HEAPU16[pointer >> 1]);
        };
      case 4:
        return signed ? function(pointer) {
          return this.fromWireType(HEAP32[pointer >> 2]);
        } : function(pointer) {
          return this.fromWireType(HEAPU32[pointer >> 2]);
        };
      default:
        throw new TypeError(`invalid integer width (${width}): ${name}`);
    }
  };
  var __embind_register_enum = (rawType, name, size, isSigned) => {
    name = AsciiToString(name);
    function ctor() {
    }
    ctor.values = {};
    registerType(rawType, { name, constructor: ctor, fromWireType: function(c) {
      return this.constructor.values[c];
    }, toWireType: (destructors, c) => c.value, readValueFromPointer: enumReadValueFromPointer(name, size, isSigned), destructorFunction: null });
    exposePublicSymbol(name, ctor);
  };
  var requireRegisteredType = (rawType, humanName) => {
    var impl = registeredTypes[rawType];
    if (void 0 === impl) {
      throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
    }
    return impl;
  };
  var __embind_register_enum_value = (rawEnumType, name, enumValue) => {
    var enumType = requireRegisteredType(rawEnumType, "enum");
    name = AsciiToString(name);
    var Enum = enumType.constructor;
    var Value = Object.create(enumType.constructor.prototype, { value: { value: enumValue }, constructor: { value: createNamedFunction(`${enumType.name}_${name}`, function() {
    }) } });
    Enum.values[enumValue] = Value;
    Enum[name] = Value;
  };
  var floatReadValueFromPointer = (name, width) => {
    switch (width) {
      case 4:
        return function(pointer) {
          return this.fromWireType(HEAPF32[pointer >> 2]);
        };
      case 8:
        return function(pointer) {
          return this.fromWireType(HEAPF64[pointer >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${width}): ${name}`);
    }
  };
  var __embind_register_float = (rawType, name, size) => {
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: (value) => value, toWireType: (destructors, value) => value, readValueFromPointer: floatReadValueFromPointer(name, size), destructorFunction: null });
  };
  var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync, isNonnullReturn) => {
    var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
    name = AsciiToString(name);
    name = getFunctionName(name);
    rawInvoker = embind__requireFunction(signature, rawInvoker, isAsync);
    exposePublicSymbol(name, function() {
      throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
    }, argCount - 1);
    whenDependentTypesAreResolved([], argTypes, (argTypes2) => {
      var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
      replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
      return [];
    });
  };
  var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
    name = AsciiToString(name);
    const isUnsignedType = minRange === 0;
    let fromWireType = (value) => value;
    if (isUnsignedType) {
      var bitshift = 32 - 8 * size;
      fromWireType = (value) => value << bitshift >>> bitshift;
      maxRange = fromWireType(maxRange);
    }
    registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => value, readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0), destructorFunction: null });
  };
  var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
    var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
    var TA = typeMapping[dataTypeIndex];
    function decodeMemoryView(handle) {
      var size = HEAPU32[handle >> 2];
      var data = HEAPU32[handle + 4 >> 2];
      return new TA(HEAP8.buffer, data, size);
    }
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: decodeMemoryView, readValueFromPointer: decodeMemoryView }, { ignoreDuplicateRegistrations: true });
  };
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
      var u = str.codePointAt(i);
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        heap[outIdx++] = 192 | u >> 6;
        heap[outIdx++] = 128 | u & 63;
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        heap[outIdx++] = 224 | u >> 12;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
      } else {
        if (outIdx + 3 >= endIdx) break;
        heap[outIdx++] = 240 | u >> 18;
        heap[outIdx++] = 128 | u >> 12 & 63;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
        i++;
      }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx;
  };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  var lengthBytesUTF8 = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var c = str.charCodeAt(i);
      if (c <= 127) {
        len++;
      } else if (c <= 2047) {
        len += 2;
      } else if (c >= 55296 && c <= 57343) {
        len += 4;
        ++i;
      } else {
        len += 3;
      }
    }
    return len;
  };
  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
    var maxIdx = idx + maxBytesToRead;
    if (ignoreNul) return maxIdx;
    while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
    return idx;
  };
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
    var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    var str = "";
    while (idx < endPtr) {
      var u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      var u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str;
  };
  var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
  var __embind_register_std_string = (rawType, name) => {
    name = AsciiToString(name);
    var stdStringIsUTF8 = true;
    registerType(rawType, { name, fromWireType(value) {
      var length = HEAPU32[value >> 2];
      var payload = value + 4;
      var str;
      if (stdStringIsUTF8) {
        str = UTF8ToString(payload, length, true);
      } else {
        str = "";
        for (var i = 0; i < length; ++i) {
          str += String.fromCharCode(HEAPU8[payload + i]);
        }
      }
      _free(value);
      return str;
    }, toWireType(destructors, value) {
      if (value instanceof ArrayBuffer) {
        value = new Uint8Array(value);
      }
      var length;
      var valueIsOfTypeString = typeof value == "string";
      if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
        throwBindingError("Cannot pass non-string to std::string");
      }
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        length = lengthBytesUTF8(value);
      } else {
        length = value.length;
      }
      var base = _malloc(4 + length + 1);
      var ptr = base + 4;
      HEAPU32[base >> 2] = length;
      if (valueIsOfTypeString) {
        if (stdStringIsUTF8) {
          stringToUTF8(value, ptr, length + 1);
        } else {
          for (var i = 0; i < length; ++i) {
            var charCode = value.charCodeAt(i);
            if (charCode > 255) {
              _free(base);
              throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
            }
            HEAPU8[ptr + i] = charCode;
          }
        }
      } else {
        HEAPU8.set(value, ptr);
      }
      if (destructors !== null) {
        destructors.push(_free, base);
      }
      return base;
    }, readValueFromPointer: readPointer, destructorFunction(ptr) {
      _free(ptr);
    } });
  };
  var UTF16Decoder = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0;
  var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
    var idx = ptr >> 1;
    var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
    if (endIdx - idx > 16 && UTF16Decoder) return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
    var str = "";
    for (var i = idx; i < endIdx; ++i) {
      var codeUnit = HEAPU16[i];
      str += String.fromCharCode(codeUnit);
    }
    return str;
  };
  var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
    maxBytesToWrite ??= 2147483647;
    if (maxBytesToWrite < 2) return 0;
    maxBytesToWrite -= 2;
    var startPtr = outPtr;
    var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
    for (var i = 0; i < numCharsToWrite; ++i) {
      var codeUnit = str.charCodeAt(i);
      HEAP16[outPtr >> 1] = codeUnit;
      outPtr += 2;
    }
    HEAP16[outPtr >> 1] = 0;
    return outPtr - startPtr;
  };
  var lengthBytesUTF16 = (str) => str.length * 2;
  var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
    var str = "";
    var startIdx = ptr >> 2;
    for (var i = 0; !(i >= maxBytesToRead / 4); i++) {
      var utf32 = HEAPU32[startIdx + i];
      if (!utf32 && !ignoreNul) break;
      str += String.fromCodePoint(utf32);
    }
    return str;
  };
  var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
    maxBytesToWrite ??= 2147483647;
    if (maxBytesToWrite < 4) return 0;
    var startPtr = outPtr;
    var endPtr = startPtr + maxBytesToWrite - 4;
    for (var i = 0; i < str.length; ++i) {
      var codePoint = str.codePointAt(i);
      if (codePoint > 65535) {
        i++;
      }
      HEAP32[outPtr >> 2] = codePoint;
      outPtr += 4;
      if (outPtr + 4 > endPtr) break;
    }
    HEAP32[outPtr >> 2] = 0;
    return outPtr - startPtr;
  };
  var lengthBytesUTF32 = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var codePoint = str.codePointAt(i);
      if (codePoint > 65535) {
        i++;
      }
      len += 4;
    }
    return len;
  };
  var __embind_register_std_wstring = (rawType, charSize, name) => {
    name = AsciiToString(name);
    var decodeString, encodeString, lengthBytesUTF;
    if (charSize === 2) {
      decodeString = UTF16ToString;
      encodeString = stringToUTF16;
      lengthBytesUTF = lengthBytesUTF16;
    } else {
      decodeString = UTF32ToString;
      encodeString = stringToUTF32;
      lengthBytesUTF = lengthBytesUTF32;
    }
    registerType(rawType, { name, fromWireType: (value) => {
      var length = HEAPU32[value >> 2];
      var str = decodeString(value + 4, length * charSize, true);
      _free(value);
      return str;
    }, toWireType: (destructors, value) => {
      if (!(typeof value == "string")) {
        throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
      }
      var length = lengthBytesUTF(value);
      var ptr = _malloc(4 + length + charSize);
      HEAPU32[ptr >> 2] = length / charSize;
      encodeString(value, ptr + 4, length + charSize);
      if (destructors !== null) {
        destructors.push(_free, ptr);
      }
      return ptr;
    }, readValueFromPointer: readPointer, destructorFunction(ptr) {
      _free(ptr);
    } });
  };
  var __embind_register_value_object = (rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) => {
    structRegistrations[rawType] = { name: AsciiToString(name), rawConstructor: embind__requireFunction(constructorSignature, rawConstructor), rawDestructor: embind__requireFunction(destructorSignature, rawDestructor), fields: [] };
  };
  var __embind_register_value_object_field = (structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) => {
    structRegistrations[structType].fields.push({ fieldName: AsciiToString(fieldName), getterReturnType, getter: embind__requireFunction(getterSignature, getter), getterContext, setterArgumentType, setter: embind__requireFunction(setterSignature, setter), setterContext });
  };
  var __embind_register_void = (rawType, name) => {
    name = AsciiToString(name);
    registerType(rawType, { isVoid: true, name, fromWireType: () => void 0, toWireType: (destructors, o) => void 0 });
  };
  var emval_methodCallers = [];
  var emval_addMethodCaller = (caller) => {
    var id = emval_methodCallers.length;
    emval_methodCallers.push(caller);
    return id;
  };
  var emval_lookupTypes = (argCount, argTypes) => {
    var a = new Array(argCount);
    for (var i = 0; i < argCount; ++i) {
      a[i] = requireRegisteredType(HEAPU32[argTypes + i * 4 >> 2], `parameter ${i}`);
    }
    return a;
  };
  var emval_returnValue = (toReturnWire, destructorsRef, handle) => {
    var destructors = [];
    var result = toReturnWire(destructors, handle);
    if (destructors.length) {
      HEAPU32[destructorsRef >> 2] = Emval.toHandle(destructors);
    }
    return result;
  };
  var emval_symbols = {};
  var getStringOrSymbol = (address) => {
    var symbol = emval_symbols[address];
    if (symbol === void 0) {
      return AsciiToString(address);
    }
    return symbol;
  };
  var __emval_create_invoker = (argCount, argTypesPtr, kind) => {
    var GenericWireTypeSize = 8;
    var [retType, ...argTypes] = emval_lookupTypes(argCount, argTypesPtr);
    var toReturnWire = retType.toWireType.bind(retType);
    var argFromPtr = argTypes.map((type) => type.readValueFromPointer.bind(type));
    argCount--;
    var captures = { toValue: Emval.toValue };
    var args = argFromPtr.map((argFromPtr2, i) => {
      var captureName = `argFromPtr${i}`;
      captures[captureName] = argFromPtr2;
      return `${captureName}(args${i ? "+" + i * GenericWireTypeSize : ""})`;
    });
    var functionBody;
    switch (kind) {
      case 0:
        functionBody = "toValue(handle)";
        break;
      case 2:
        functionBody = "new (toValue(handle))";
        break;
      case 3:
        functionBody = "";
        break;
      case 1:
        captures["getStringOrSymbol"] = getStringOrSymbol;
        functionBody = "toValue(handle)[getStringOrSymbol(methodName)]";
        break;
    }
    functionBody += `(${args})`;
    if (!retType.isVoid) {
      captures["toReturnWire"] = toReturnWire;
      captures["emval_returnValue"] = emval_returnValue;
      functionBody = `return emval_returnValue(toReturnWire, destructorsRef, ${functionBody})`;
    }
    functionBody = `return function (handle, methodName, destructorsRef, args) {
  ${functionBody}
  }`;
    var invokerFunction = new Function(Object.keys(captures), functionBody)(...Object.values(captures));
    var functionName = `methodCaller<(${argTypes.map((t) => t.name)}) => ${retType.name}>`;
    return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
  };
  var __emval_get_property = (handle, key) => {
    handle = Emval.toValue(handle);
    key = Emval.toValue(key);
    return Emval.toHandle(handle[key]);
  };
  var __emval_incref = (handle) => {
    if (handle > 9) {
      emval_handles[handle + 1] += 1;
    }
  };
  var __emval_invoke = (caller, handle, methodName, destructorsRef, args) => emval_methodCallers[caller](handle, methodName, destructorsRef, args);
  var __emval_new_cstring = (v) => Emval.toHandle(getStringOrSymbol(v));
  var __emval_run_destructors = (handle) => {
    var destructors = Emval.toValue(handle);
    runDestructors(destructors);
    __emval_decref(handle);
  };
  var getHeapMax = () => 2147483648;
  var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
  var growMemory = (size) => {
    var oldHeapSize = wasmMemory.buffer.byteLength;
    var pages = (size - oldHeapSize + 65535) / 65536 | 0;
    try {
      wasmMemory.grow(pages);
      updateMemoryViews();
      return 1;
    } catch (e) {
    }
  };
  var _emscripten_resize_heap = (requestedSize) => {
    var oldSize = HEAPU8.length;
    requestedSize >>>= 0;
    var maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize) {
      return false;
    }
    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
      var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
      var replacement = growMemory(newSize);
      if (replacement) {
        return true;
      }
    }
    return false;
  };
  init_ClassHandle();
  init_RegisteredPointer();
  {
    if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
    if (Module["print"]) out = Module["print"];
    if (Module["printErr"]) err = Module["printErr"];
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    if (Module["arguments"]) arguments_ = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].shift()();
      }
    }
  }
  var ___getTypeName, _malloc, _free, memory, __indirect_function_table, wasmMemory, wasmTable;
  function assignWasmExports(wasmExports2) {
    ___getTypeName = wasmExports2["F"];
    _malloc = wasmExports2["H"];
    _free = wasmExports2["I"];
    memory = wasmMemory = wasmExports2["D"];
    __indirect_function_table = wasmTable = wasmExports2["G"];
  }
  var wasmImports = { h: ___cxa_throw, x: __abort_js, v: __embind_finalize_value_object, u: __embind_register_bigint, B: __embind_register_bool, e: __embind_register_class, g: __embind_register_class_constructor, a: __embind_register_class_function, f: __embind_register_class_property, z: __embind_register_emval, n: __embind_register_enum, c: __embind_register_enum_value, t: __embind_register_float, b: __embind_register_function, i: __embind_register_integer, d: __embind_register_memory_view, A: __embind_register_std_string, q: __embind_register_std_wstring, w: __embind_register_value_object, p: __embind_register_value_object_field, C: __embind_register_void, l: __emval_create_invoker, m: __emval_decref, r: __emval_get_property, o: __emval_incref, k: __emval_invoke, s: __emval_new_cstring, j: __emval_run_destructors, y: _emscripten_resize_heap };
  function run() {
    preRun();
    function doRun() {
      Module["calledRun"] = true;
      if (ABORT) return;
      initRuntime();
      readyPromiseResolve?.(Module);
      Module["onRuntimeInitialized"]?.();
      postRun();
    }
    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(() => {
        setTimeout(() => Module["setStatus"](""), 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }
  var wasmExports;
  wasmExports = await createWasm();
  run();
  function MakePath64(intArray) {
    if (intArray.length % 2 != 0) {
      throw "MakePath64: intArray.length must be even";
    }
    const n = intArray.length / 2;
    const flat = new BigInt64Array(n * 3);
    for (let i = 0, j = 0; i < intArray.length; i += 2, j += 3) {
      const a = intArray[i], b = intArray[i + 1];
      flat[j] = typeof a === "bigint" ? a : BigInt(a);
      flat[j + 1] = typeof b === "bigint" ? b : BigInt(b);
    }
    let path2 = new Module["Path64"]();
    path2.assign(flat);
    return path2;
  }
  Module["MakePath64"] = MakePath64;
  function MakePathZ64(intArray) {
    if (intArray.length % 3 != 0) {
      throw "MakePathZ64: intArray.length must be multiple of 3";
    }
    const flat = new BigInt64Array(intArray.length);
    for (let i = 0; i < intArray.length; i++) {
      const item = intArray[i];
      flat[i] = typeof item === "bigint" ? item : BigInt(item);
    }
    let path2 = new Module["Path64"]();
    path2.assign(flat);
    return path2;
  }
  Module["MakePathZ64"] = MakePathZ64;
  function MakePathD(intArray) {
    if (intArray.length % 2 != 0) {
      throw "MakePathD: intArray.length must be even";
    }
    const n = intArray.length / 2;
    const flat = new Float64Array(n * 3);
    for (let i = 0, j = 0; i < intArray.length; i += 2, j += 3) {
      flat[j] = intArray[i];
      flat[j + 1] = intArray[i + 1];
    }
    let path2 = new Module["PathD"]();
    path2.assign(flat);
    return path2;
  }
  Module["MakePathD"] = MakePathD;
  function MakePathZD(intArray) {
    if (intArray.length % 3 != 0) {
      throw "MakePathZD: intArray.length must be multiple of 3";
    }
    const flat = intArray instanceof Float64Array ? intArray : Float64Array.from(intArray);
    let path2 = new Module["PathD"]();
    path2.assign(flat);
    return path2;
  }
  Module["MakePathZD"] = MakePathZD;
  function PathDToPath64(pathD) {
    const src = pathD.view();
    const dst = new BigInt64Array(src.length);
    for (let i = 0; i < src.length; i++) {
      dst[i] = BigInt(Math.round(src[i]));
    }
    let path2 = new Module["Path64"]();
    path2.assign(dst);
    return path2;
  }
  Module["PathDToPath64"] = PathDToPath64;
  function Path64ToPathD(path64) {
    const src = path64.view();
    const dst = new Float64Array(src.length);
    for (let i = 0; i < src.length; i++) {
      dst[i] = Number(src[i]);
    }
    let path2 = new Module["PathD"]();
    path2.assign(dst);
    return path2;
  }
  Module["Path64ToPathD"] = Path64ToPathD;
  function Paths64ToPathsD(paths64) {
    let paths = new Module["PathsD"]();
    for (let i = 0; i < paths64.size(); i++) {
      const path64 = paths64.get(i);
      let path2 = Path64ToPathD(path64);
      paths["push_back"](path2);
      path2.delete();
      path64.delete();
    }
    return paths;
  }
  Module["Paths64ToPathsD"] = Paths64ToPathsD;
  function PathsDToPaths64(pathsD) {
    let paths = new Module["Paths64"]();
    for (let i = 0; i < pathsD.size(); i++) {
      const pathD = pathsD.get(i);
      let path2 = PathDToPath64(pathD);
      paths["push_back"](path2);
      path2.delete();
      pathD.delete();
    }
    return paths;
  }
  Module["PathsDToPaths64"] = PathsDToPaths64;
  if (runtimeInitialized) {
    moduleRtn = Module;
  } else {
    moduleRtn = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
  }
  ;
  return moduleRtn;
}
var clipper2z_default = Clipper2Z;

// stub:wasm-url-stub
var wasm_url_stub_default = "clipper2z.wasm";

// src/clipper/intersection.ts
var modulePromise = null;
var wasmBinaryOverride;
function primeClipperWasm(bytes) {
  wasmBinaryOverride = bytes;
  modulePromise = null;
}
function clipperReady() {
  const existing = modulePromise;
  if (existing) return existing;
  const created = clipper2z_default({
    // 显式指向 Vite 产出的 wasm 资源，避免部署到子目录时 404
    locateFile: (path2) => path2.endsWith(".wasm") ? wasm_url_stub_default : path2,
    ...wasmBinaryOverride ? { wasmBinary: wasmBinaryOverride } : {}
  });
  modulePromise = created;
  return created;
}
function ringToPath(mod, ring) {
  const pts = ring.length > 1 && Math.abs(ring[0].x - ring[ring.length - 1].x) < 1e-12 && Math.abs(ring[0].y - ring[ring.length - 1].y) < 1e-12 ? ring.slice(0, -1) : ring.slice();
  const coords = [];
  for (const p of pts) coords.push(p.x, p.y);
  const path2 = mod.MakePathD(coords);
  const paths = new mod.PathsD();
  paths.push_back(path2);
  return paths;
}
function pathsToRings(mod, paths) {
  const out = [];
  for (let i = 0; i < paths.size(); i++) {
    const path2 = paths.get(i);
    const ring = [];
    for (let j = 0; j < path2.size(); j++) {
      const pt = path2.get(j);
      ring.push({ x: pt.x, y: pt.y });
    }
    if (ring.length > 0) ring.push({ ...ring[0] });
    out.push(ring);
  }
  return out;
}
async function intersectRings(a, b) {
  const mod = await clipperReady();
  const subj = ringToPath(mod, a);
  const clip = ringToPath(mod, b);
  const solution = mod.IntersectD(subj, clip, mod.FillRule.NonZero, 6);
  const polygons = pathsToRings(mod, solution);
  const area = Math.abs(mod.AreaPathsD(solution));
  let maxPenetration = 0;
  for (const poly of polygons) {
    let dmax = 0;
    for (let i = 0; i < poly.length; i++) {
      for (let j = i + 1; j < poly.length; j++) {
        const d = Math.hypot(poly[i].x - poly[j].x, poly[i].y - poly[j].y);
        if (d > dmax) dmax = d;
      }
    }
    maxPenetration = Math.max(maxPenetration, dmax);
  }
  subj.delete();
  clip.delete();
  solution.delete();
  return { area, count: polygons.length, polygons, maxPenetration };
}

// src/geometry/contactCheck.ts
function placeGears(rep, theta, segments = 24) {
  const ring1 = gearProfile(rep.g1, { involuteSegments: segments });
  const ring2 = gearProfile(rep.g2, { involuteSegments: segments });
  const ang = meshAngles(rep, theta);
  return {
    profile1: transformRing(ring1, rep.center1.x, rep.center1.y, ang.a1),
    profile2: transformRing(ring2, rep.center2.x, rep.center2.y, ang.a2),
    theta
  };
}
function distanceToRing(p, ring) {
  let best = Infinity;
  let nearest = ring[0];
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i];
    const b = ring[i + 1];
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const len2 = abx * abx + aby * aby || 1e-12;
    let t = ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2;
    t = Math.max(0, Math.min(1, t));
    const qx = a.x + t * abx;
    const qy = a.y + t * aby;
    const d = Math.hypot(p.x - qx, p.y - qy);
    if (d < best) {
      best = d;
      nearest = { x: qx, y: qy };
    }
  }
  return { dist: best, nearest };
}
function centroid(ring) {
  let x = 0;
  let y = 0;
  let n = 0;
  for (const p of ring) {
    x += p.x;
    y += p.y;
    n++;
  }
  return { x: x / n, y: y / n };
}
async function checkAt(rep, theta, opts = {}) {
  const segments = opts.segments ?? 24;
  const tolerance = opts.tolerance ?? Math.max(2e-3 * rep.g1.p.m, 2e-3);
  const residualRadius = opts.residualRadius ?? Math.max(0.02 * rep.g1.p.m, 0.02);
  const { profile1, profile2 } = placeGears(rep, theta, segments);
  const theoretical = contactPointsAt(rep, theta);
  const contacts = theoretical.map((c) => ({
    point: { x: c.x, y: c.y },
    distToGear1: distanceToRing({ x: c.x, y: c.y }, profile1).dist,
    distToGear2: distanceToRing({ x: c.x, y: c.y }, profile2).dist
  }));
  const intersection = await intersectRings(profile1, profile2);
  let numericalResidualArea = 0;
  let realInterferenceArea = 0;
  let realMaxPenetration = 0;
  const classified = [];
  for (const poly of intersection.polygons) {
    const c = centroid(poly);
    const nearContact = theoretical.some((q) => Math.hypot(q.x - c.x, q.y - c.y) <= residualRadius);
    if (nearContact) {
      numericalResidualArea += polygonAreaSimple(poly);
      classified.push({ ring: poly, real: false });
    } else {
      realInterferenceArea += polygonAreaSimple(poly);
      realMaxPenetration = Math.max(realMaxPenetration, penetrationDepth(poly));
      classified.push({ ring: poly, real: true });
    }
  }
  const hasInterference = realInterferenceArea > tolerance * tolerance || realMaxPenetration > tolerance;
  return {
    theta,
    contacts,
    intersection,
    numericalResidualArea,
    realInterferenceArea,
    realMaxPenetration,
    hasInterference,
    tolerance,
    classified
  };
}
function polygonAreaSimple(ring) {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) a += ring[i].x * ring[i + 1].y - ring[i + 1].x * ring[i].y;
  return Math.abs(a / 2);
}
function penetrationDepth(poly) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of poly) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  return Math.min(maxX - minX, maxY - minY);
}

// src/io/caseFormat.ts
var FORMAT_VERSION = 1;
function isCaseFile(x) {
  return !!x && typeof x === "object" && x.format === "gear-lab-case" && typeof x.version === "number" && !!x.input;
}
function isProfileFile(x) {
  return !!x && typeof x === "object" && x.format === "gear-lab-profile" && Array.isArray(x.profiles);
}

// src/io/exporter.ts
function buildCaseFile(input, withProfiles, notes) {
  const file = {
    format: "gear-lab-case",
    version: FORMAT_VERSION,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    input: structuredClone(input),
    notes
  };
  if (withProfiles) {
    const rep = analyzeMesh(input);
    file.profiles = {
      local1: gearProfile(rep.g1, { involuteSegments: 40 }),
      local2: gearProfile(rep.g2, { involuteSegments: 40 })
    };
  }
  return file;
}
function buildProfileFile(input) {
  const rep = analyzeMesh(input);
  const raw = [
    {
      gear: 1,
      unit: "mm",
      params: structuredClone(input.g1),
      ring: gearProfile(rep.g1, { involuteSegments: 48 }),
      pointCount: 0
    },
    {
      gear: 2,
      unit: "mm",
      params: structuredClone(input.g2),
      ring: gearProfile(rep.g2, { involuteSegments: 48 }),
      pointCount: 0
    }
  ];
  return {
    format: "gear-lab-profile",
    version: FORMAT_VERSION,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    profiles: raw.map((p) => ({ ...p, pointCount: p.ring.length }))
  };
}

// verify/checks.ts
var root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
var failures = 0;
function check(name, cond, detail = "") {
  if (cond) console.log(`  PASS  ${name}${detail ? " \u2014 " + detail : ""}`);
  else {
    failures++;
    console.error(`  FAIL  ${name}${detail ? " \u2014 " + detail : ""}`);
  }
}
function approx(a, b, tol = 1e-9) {
  return Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
}
console.log("A. \u89E3\u6790\u5C3A\u5BF8\uFF08m=2, \u03B1=20\xB0, ha*=1, c*=0.25\uFF09");
{
  const g20 = geom({ z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 });
  check("z=20: r = mz/2 = 20", approx(g20.r, 20), g20.r.toFixed(6));
  check("z=20: rb = r cos20\xB0", approx(g20.rb, 20 * Math.cos(20 * Math.PI / 180)), g20.rb.toFixed(6));
  check("z=20: ra = r+m = 22", approx(g20.ra, 22), g20.ra.toFixed(6));
  check("z=20: rf = r\u22121.25m = 17.5", approx(g20.rf, 17.5), g20.rf.toFixed(6));
  check("z=20: p = \u03C0m = 2\u03C0", approx(g20.pCircular, 2 * Math.PI), g20.pCircular.toFixed(6));
  check("z=20: s = \u03C0m/2 = \u03C0", approx(g20.s, Math.PI), g20.s.toFixed(6));
  const zmin = 2 / Math.sin(20 * Math.PI / 180) ** 2;
  check("zmin = 17.097\uFF0820\xB0,ha*=1\uFF0C\u4E25\u683C\u503C\uFF1B\u5DE5\u7A0B\u4E0A\u53D6 17\uFF09", approx(zmin, 17.097, 2e-3), zmin.toFixed(3));
  check("z=18 \u4E0D\u6839\u5207", geom({ z: 18, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === false);
  check(
    "z=17 \u4E25\u683C\u8BF4\u8F7B\u5FAE\u6839\u5207\uFF0817 < 17.097\uFF1B\u5DE5\u7A0B\u8FD1\u4F3C\u53D6 17\uFF09",
    geom({ z: 17, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === true
  );
  check("z=16 \u6839\u5207", geom({ z: 16, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === true);
  check("z=13 \u6839\u5207", geom({ z: 13, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === true);
  check(
    "\u03B1=14.5\xB0 \u65F6 zmin\u224831.90\uFF08\u65E7\u9F7F\u5236\uFF09",
    approx(geom({ z: 33, m: 2, alphaDeg: 14.5, haStar: 1, cStar: 0.25 }).zMin, 31.9, 2e-3)
  );
  const g30 = geom({ z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 });
  check(
    "z=30: r=30, ra=32, rf=27.5",
    approx(g30.r, 30) && approx(g30.ra, 32) && approx(g30.rf, 27.5)
  );
}
console.log("A2. \u4E2D\u5FC3\u8DDD / \u556E\u5408\u89D2 / \u91CD\u5408\u5EA6");
{
  const input = {
    g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0
  };
  const rep = analyzeMesh(input);
  check("\u6807\u51C6\u4E2D\u5FC3\u8DDD a0 = r1+r2 = 50", approx(rep.aStandard, 50), rep.aStandard.toFixed(4));
  check("\u0394a=0 \u65F6\u556E\u5408\u89D2 \u03B1w = 20\xB0", approx(rep.alphaW, 20 * Math.PI / 180, 1e-12));
  check("\u8282\u5706 = \u5206\u5EA6\u5706 rw1=20 rw2=30", approx(rep.rw1, 20) && approx(rep.rw2, 30));
  check("\u4F20\u52A8\u6BD4 \u03C91/\u03C92 = z2/z1 = 1.5", approx(rep.ratio, 1.5));
  check("\u91CD\u5408\u5EA6 \u03B5 \u2248 1.605\uFF08\u624B\u518C\u503C\uFF09", approx(rep.contactRatio, 1.605, 8e-3), rep.contactRatio.toFixed(4));
  check(
    "\u5B9E\u9645\u556E\u5408\u7EBF\u957F\u5EA6 = \u03B5\xB7pb",
    approx(rep.pathOfContactLength, rep.contactRatio * rep.basePitch, 1e-10)
  );
  check("\u57FA\u8282 pb = \u03C0m cos\u03B1", approx(rep.basePitch, 2 * Math.PI * Math.cos(20 * Math.PI / 180), 1e-12));
  const repGap = analyzeMesh({ ...input, deltaA: 1 });
  const alphaW = Math.acos(50 * Math.cos(20 * Math.PI / 180) / 51);
  check("\u0394a=1: \u03B1w \u7531 a0cos\u03B1/a \u8BA1\u7B97", approx(repGap.alphaW, alphaW, 1e-12));
  check("\u0394a=1: \u5B9E\u9645\u4E2D\u5FC3\u8DDD = 51", approx(repGap.a, 51));
  check(
    "\u0394a<0 \u88AB\u62D2\u7EDD\u5B89\u88C5",
    analyzeMesh({ ...input, deltaA: -0.5 }).issues.some((s) => s.includes("\u5C0F\u4E8E\u6807\u51C6\u4E2D\u5FC3\u8DDD"))
  );
  check(
    "\u6A21\u6570\u4E0D\u517C\u5BB9",
    analyzeMesh({ ...input, g2: { ...input.g2, m: 3 } }).compatible === false
  );
}
console.log("B. \u9F7F\u5F62\u95ED\u5408");
for (const z of [13, 17, 20, 30, 40]) {
  const g = geom({ z, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 });
  const ring = gearProfile(g, { involuteSegments: 40 });
  const first = ring[0];
  const last = ring[ring.length - 1];
  const closed = approx(first.x, last.x, 1e-9) && approx(first.y, last.y, 1e-9);
  const area = polygonArea(ring);
  const diskRoot = Math.PI * g.rf ** 2;
  const diskTip = Math.PI * g.ra ** 2;
  let rMin = Infinity;
  let rMax = 0;
  for (const p of ring) {
    const r = Math.hypot(p.x, p.y);
    rMin = Math.min(rMin, r);
    rMax = Math.max(rMax, r);
  }
  check(`z=${z}: \u9996\u5C3E\u95ED\u5408`, closed);
  check(
    `z=${z}: \u9006\u65F6\u9488(\u9762\u79EF\u6B63) \u4E14\u9762\u79EF\u5728\u9F7F\u6839\u5706\u76D8\u4E0E\u9F7F\u9876\u5706\u76D8\u4E4B\u95F4`,
    area > 0 && area > diskRoot && area < diskTip,
    `area=${area.toFixed(2)} \u2208 (${diskRoot.toFixed(1)}, ${diskTip.toFixed(1)})`
  );
  check(
    `z=${z}: \u5F84\u5411\u8303\u56F4 [rf,ra]\uFF08\u5BB9\u5DEE 2e-3\uFF09`,
    rMin >= g.rf - 2e-3 && rMax <= g.ra + 2e-3,
    `[${rMin.toFixed(3)}, ${rMax.toFixed(3)}] vs [${g.rf}, ${g.ra}]`
  );
  check(`z=${z}: \u65CB\u8F6C\u5BF9\u79F0\u6027\uFF08\u8F6C\u8FC7 2\u03C0/z \u540E\u70B9\u96C6\u91CD\u5408\uFF09`, (() => {
    const step = 2 * Math.PI / z;
    const c = Math.cos(step);
    const s = Math.sin(step);
    const set = new Set(ring.map((p) => `${p.x.toFixed(6)},${p.y.toFixed(6)}`));
    for (const p of ring.slice(0, 20)) {
      const rx = p.x * c - p.y * s;
      const ry = p.x * s + p.y * c;
      if (!set.has(`${rx.toFixed(6)},${ry.toFixed(6)}`)) return false;
    }
    return true;
  })());
}
console.log("B2. \u6E10\u5F00\u7EBF\u672C\u4F53\uFF1A\u5C55\u89D2 \u03B2=inv(\u03B1t)\u3001\u534A\u5F84 \u03C1=rb\u221A(1+t\xB2)");
{
  const g = geom({ z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 });
  const ring = gearProfile(g, { involuteSegments: 50 });
  const alphaA = pressureAngleAt(g, g.ra);
  check("\u9F7F\u9876\u538B\u529B\u89D2 \u03B1a = arccos(rb/ra)", approx(Math.cos(alphaA), g.rb / g.ra, 1e-12));
  check("\u9F7F\u9876\u539A\u534A\u89D2\u4E3A\u6B63", halfAngleAt(g, g.ra) > 0);
  check("inv(\u03B1) \u5355\u8C03\u589E", inv(0.5) > inv(0.4));
  void ring;
}
console.log("C. \u63A5\u89E6\u7EBF / \u6B63\u786E\u556E\u5408\u76F8\u4F4D\uFF08\u4E0D\u662F\u53EA\u6309\u8F6C\u901F\u6BD4\u65CB\u8F6C\uFF09");
{
  const input = {
    g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0
  };
  const rep = analyzeMesh(input);
  let maxDist = 0;
  let contactCountOk = true;
  const N = 90;
  const period = 2 * Math.PI / 20;
  for (let i = 0; i < N; i++) {
    const theta = period * i / N;
    const { profile1, profile2 } = placeGears(rep, theta, 30);
    const pts = contactPointsAt(rep, theta);
    if (pts.length < 1 || pts.length > 2) contactCountOk = false;
    for (const q of pts) {
      const d1 = distanceToRing({ x: q.x, y: q.y }, profile1).dist;
      const d2 = distanceToRing({ x: q.x, y: q.y }, profile2).dist;
      maxDist = Math.max(maxDist, d1, d2);
    }
  }
  check("\u6BCF\u4E2A\u76F8\u4F4D 1~2 \u5BF9\u9F7F\u63A5\u89E6\uFF08\u03B5\u22481.6\uFF09", contactCountOk);
  check("\u7406\u8BBA\u63A5\u89E6\u70B9\u5230\u4E24\u8F6E\u9F7F\u5ED3\u6298\u7EBF\u8DDD\u79BB\u4EC5\u4E3A\u5F26\u8BEF\u5DEE (<0.01mm)", maxDist < 0.01, `max=${maxDist.toExponential(2)}`);
  const at0 = contactPointsAt(rep, 0);
  const atNode = at0.some((p) => approx(p.x, rep.pitchPoint.x, 1e-9) && approx(p.y, rep.pitchPoint.y, 1e-9));
  check("\u03B8=0 \u63A5\u89E6\u70B9\u4E3A\u8282\u70B9 P", atNode);
}
console.log("D. \u65CB\u8F6C\u65B9\u5411\u4E0E\u8F6C\u901F\u6BD4");
{
  const rep = analyzeMesh({
    g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0
  });
  const a0 = meshAngles(rep, 0);
  const a1 = meshAngles(rep, 0.1);
  const dw1 = a1.a1 - a0.a1;
  const dw2 = a1.a2 - a0.a2;
  check("\u5916\u556E\u5408\u8F6C\u5411\u76F8\u53CD (\u0394\u03B81\xB7\u0394\u03B82 < 0)", dw1 * dw2 < 0);
  check("|\u0394\u03B82/\u0394\u03B81| = z1/z2 = 2/3", approx(Math.abs(dw2 / dw1), 20 / 30, 1e-12));
  const afterOneTooth = meshAngles(rep, 2 * Math.PI / 20);
  check("\u8F6E1\u8F6C\u8FC7\u4E00\u9F7F\u540E\u89D2\u5EA6\u589E\u91CF\u4E3A 2\u03C0/z1", approx(afterOneTooth.a1 - a0.a1, 2 * Math.PI / 20, 1e-12));
}
console.log("E. Clipper2 WASM \u5E03\u5C14\u4EA4\uFF1A\u6574\u5468\u671F\u626B\u63CF");
{
  const wasmPath = path.join(root, "node_modules/clipper2-wasm/dist/es/clipper2z.wasm");
  const bytes = readFileSync(wasmPath);
  primeClipperWasm(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  await clipperReady();
  console.log("  (WASM \u521D\u59CB\u5316\u6210\u529F)");
  for (const [z1, z2, label] of [
    [20, 30, "\u6807\u51C6 20/30"],
    [17, 17, "\u6781\u5C11\u9F7F 17/17\uFF08\u5DE5\u7A0B\u4E34\u754C\uFF0C\u4E25\u683C\u8F7B\u5FAE\u6839\u5207\uFF09"],
    [40, 40, "40/40"]
  ]) {
    const rep = analyzeMesh({
      g1: { z: z1, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      g2: { z: z2, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      deltaA: 0
    });
    let worst = 0;
    let worstTheta = 0;
    const steps = 36;
    for (let i = 0; i < steps; i++) {
      const theta = 2 * Math.PI / z1 * (i + 0.5) / steps;
      const r = await checkAt(rep, theta, { segments: 22 });
      if (r.realMaxPenetration > worst) {
        worst = r.realMaxPenetration;
        worstTheta = theta;
      }
    }
    check(
      `${label}: \u6574\u5468\u671F\u65E0\u771F\u5B9E\u5E72\u6D89 (max<0.004mm)`,
      worst < 4e-3,
      `worst=${worst.toExponential(2)}@${(worstTheta * 180 / Math.PI).toFixed(2)}\xB0`
    );
  }
  {
    const rep = analyzeMesh({
      g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      deltaA: -1
    });
    const r = await checkAt(rep, 0, { segments: 22 });
    check(
      "\u8FC7\u76C8\u4E2D\u5FC3\u8DDD a=49: Clipper \u68C0\u51FA\u5927\u9762\u79EF\u771F\u5B9E\u5E72\u6D89",
      r.realInterferenceArea > 1,
      `area=${r.realInterferenceArea.toFixed(2)} mm\xB2`
    );
  }
}
console.log("F. \u5BFC\u51FA\u8F6E\u5ED3\u5F80\u8FD4\u4E00\u81F4");
{
  const input = {
    g1: { z: 17, m: 2.5, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 23, m: 2.5, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0
  };
  const pf = buildProfileFile(input);
  const json = JSON.parse(JSON.stringify(pf));
  check("\u8F6E\u5ED3\u6587\u4EF6\u683C\u5F0F\u53EF\u8BC6\u522B", isProfileFile(json));
  check("\u8F6E\u5ED3\u6587\u4EF6\u542B\u4E24\u4E2A\u9F7F\u8F6E", json.profiles.length === 2);
  check("\u5750\u6807\u5355\u4F4D\u58F0\u660E\u4E3A mm", json.profiles.every((p) => p.unit === "mm"));
  for (const item of json.profiles) {
    const g = geom(item.params);
    const regen = gearProfile(g, { involuteSegments: 48 });
    const same = regen.length === item.ring.length && regen.every((p, i) => approx(p.x, item.ring[i].x, 1e-10) && approx(p.y, item.ring[i].y, 1e-10));
    check(`\u9F7F\u8F6E ${item.gear} \u8F6E\u5ED3\u91CD\u65B0\u751F\u6210\u9010\u70B9\u4E00\u81F4`, same, `\u70B9\u6570=${regen.length}`);
  }
  const cf = buildCaseFile(input, true);
  const cj = JSON.parse(JSON.stringify(cf));
  check("\u6848\u4F8B\u6587\u4EF6\u683C\u5F0F\u53EF\u8BC6\u522B", isCaseFile(cj));
  check("\u6848\u4F8B\u542B\u8F6E\u5ED3\u4E0E\u53C2\u6570", !!cj.profiles && cj.input.g1.z === 17);
}
console.log(failures === 0 ? "\n\u5168\u90E8\u6838\u5BF9\u901A\u8FC7 \u2705" : `
${failures} \u9879\u5931\u8D25 \u274C`);
process.exit(failures === 0 ? 0 : 1);
