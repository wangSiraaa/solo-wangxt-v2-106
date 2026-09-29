(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function du(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const It={},Ar=[],pi=()=>{},rd=()=>!1,zo=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Vo=n=>n.startsWith("onUpdate:"),rn=Object.assign,pu=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Nm=Object.prototype.hasOwnProperty,Et=(n,e)=>Nm.call(n,e),at=Array.isArray,sr=n=>fa(n)==="[object Map]",cs=n=>fa(n)==="[object Set]",ih=n=>fa(n)==="[object Date]",ct=n=>typeof n=="function",Gt=n=>typeof n=="string",gi=n=>typeof n=="symbol",Lt=n=>n!==null&&typeof n=="object",sd=n=>(Lt(n)||ct(n))&&ct(n.then)&&ct(n.catch),ad=Object.prototype.toString,fa=n=>ad.call(n),Fm=n=>fa(n).slice(8,-1),od=n=>fa(n)==="[object Object]",mu=n=>Gt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Hs=du(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ho=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Om=/-\w/g,Zn=Ho(n=>n.replace(Om,e=>e.slice(1).toUpperCase())),Bm=/\B([A-Z])/g,Or=Ho(n=>n.replace(Bm,"-$1").toLowerCase()),ld=Ho(n=>n.charAt(0).toUpperCase()+n.slice(1)),ul=Ho(n=>n?`on${ld(n)}`:""),ui=(n,e)=>!Object.is(n,e),co=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},cd=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},gu=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let rh;const Go=()=>rh||(rh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function _u(n){if(at(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=Gt(i)?Gm(i):_u(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Gt(n)||Lt(n))return n}const zm=/;(?![^(]*\))/g,Vm=/:([^]+)/,Hm=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Gm(n){const e={};return n.replace(Hm,t=>t.startsWith("/*")?"":t).split(zm).forEach(t=>{if(t){const i=t.split(Vm);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Di(n){let e="";if(Gt(n))e=n;else if(at(n))for(let t=0;t<n.length;t++){const i=Di(n[t]);i&&(e+=i+" ")}else if(Lt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const km="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Wm=du(km);function ud(n){return!!n||n===""}function Xm(n,e,t){if(n.length!==e.length)return!1;let i=!0;for(let r=0;i&&r<n.length;r++)i=ps(n[r],e[r],t);return i}function sh(n,e,t){if(n.size!==e.size)return!1;const i=Array.from(e),r=new Uint8Array(i.length);for(const s of n){let a=-1;for(let o=0;o<i.length;o++)if(!r[o]&&ps(s,i[o],t)){a=o;break}if(a<0)return!1;r[a]=1}return!0}function $m(n,e,t){let i=sr(n),r=sr(e);if(i||r||(i=cs(n),r=cs(e),i||r))return i&&r?sh(n,e,t):!1;const s=Object.keys(n).length,a=Object.keys(e).length;if(s!==a)return!1;for(const o in n){const l=n.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!ps(n[o],e[o],t))return!1}return String(n)===String(e)}function ah(n,e,t,i){t||(t=[new Map,new Map]);const[r,s]=t;if(r.has(n)||s.has(e))return r.get(n)===e&&s.get(e)===n;r.set(n,e),s.set(e,n);const a=i(n,e,t);return r.delete(n),s.delete(e),a}function ps(n,e,t){if(n===e)return!0;let i=ih(n),r=ih(e);return i||r?i&&r?n.getTime()===e.getTime():!1:(i=gi(n),r=gi(e),i||r?n===e:(i=at(n),r=at(e),i||r?i&&r?ah(n,e,t,Xm):!1:(i=Lt(n),r=Lt(e),i||r?!i||!r?!1:ah(n,e,t,$m):String(n)===String(e))))}function hd(n,e){return n.findIndex(t=>ps(t,e))}const fd=n=>!!(n&&n.__v_isRef===!0),st=n=>Gt(n)?n:n==null?"":at(n)||Lt(n)&&(n.toString===ad||!ct(n.toString))?fd(n)?st(n.value):JSON.stringify(n,dd,2):String(n),dd=(n,e)=>fd(e)?dd(n,e.value):sr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[hl(i,s)+" =>"]=r,t),{})}:cs(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>hl(t))}:gi(e)?hl(e):Lt(e)&&!at(e)&&!od(e)?String(e):e,hl=(n,e="")=>{var t;return gi(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let en;class qm{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&en&&(en.active?(this.parent=en,this.index=(en.scopes||(en.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){const i=this.scopes.slice();for(e=0,t=i.length;e<t;e++)i[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){const r=this.scopes.slice();for(e=0,t=r.length;e<t;e++)r[e].resume()}const i=this.effects.slice();for(e=0,t=i.length;e<t;e++)i[e].resume()}}run(e){if(this._active){const t=en;try{return en=this,e()}finally{en=t}}}on(){++this._on===1&&(this.prevScope=en,en=this)}off(){if(this._on>0&&--this._on===0){if(en===this)en=this.prevScope;else{let e=en;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){const r=this.scopes.slice();for(t=0,i=r.length;t<i;t++)r[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Ym(){return en}let Ut;const fl=new WeakSet;class pd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,en&&(en.active?en.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,fl.has(this)&&(fl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||gd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,oh(this),_d(this);const e=Ut,t=Jn;Ut=this,Jn=!0;try{return this.fn()}finally{vd(this),Ut=e,Jn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Su(e);this.deps=this.depsTail=void 0,oh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?fl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){cc(this)&&this.run()}get dirty(){return cc(this)}}let md=0,Gs,ks;function gd(n,e=!1){if(n.flags|=8,e){n.next=ks,ks=n;return}n.next=Gs,Gs=n}function vu(){md++}function xu(){if(--md>0)return;if(ks){let e=ks;for(ks=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Gs;){let e=Gs;for(Gs=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function _d(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function vd(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),Su(i),Km(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function cc(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(xd(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function xd(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Qs)||(n.globalVersion=Qs,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!cc(n))))return;n.flags|=2;const e=n.dep,t=Ut,i=Jn;Ut=n,Jn=!0;try{_d(n);const r=n.fn(n._value);(e.version===0||ui(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{Ut=t,Jn=i,vd(n),n.flags&=-3}}function Su(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)Su(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Km(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Jn=!0;const Sd=[];function Wi(){Sd.push(Jn),Jn=!1}function Xi(){const n=Sd.pop();Jn=n===void 0?!0:n}function oh(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Ut;Ut=void 0;try{e()}finally{Ut=t}}}let Qs=0;class Zm{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Mu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ut||!Jn||Ut===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Ut)t=this.activeLink=new Zm(Ut,this),Ut.deps?(t.prevDep=Ut.depsTail,Ut.depsTail.nextDep=t,Ut.depsTail=t):Ut.deps=Ut.depsTail=t,Md(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Ut.depsTail,t.nextDep=void 0,Ut.depsTail.nextDep=t,Ut.depsTail=t,Ut.deps===t&&(Ut.deps=i)}return t}trigger(e){this.version++,Qs++,this.notify(e)}notify(e){vu();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{xu()}}}function Md(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Md(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const uc=new WeakMap,Lr=Symbol(""),hc=Symbol(""),js=Symbol("");function on(n,e,t){if(Jn&&Ut){let i=uc.get(n);i||uc.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new Mu),r.map=i,r.key=t),r.track()}}function Ni(n,e,t,i,r,s){const a=uc.get(n);if(!a){Qs++;return}const o=l=>{l&&l.trigger()};if(vu(),e==="clear")a.forEach(o);else{const l=at(n),c=l&&mu(t);if(l&&t==="length"){const u=Number(i);a.forEach((f,h)=>{(h==="length"||h===js||!gi(h)&&h>=u)&&o(f)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(js)),e){case"add":l?c&&o(a.get("length")):(o(a.get(Lr)),sr(n)&&o(a.get(hc)));break;case"delete":l||(o(a.get(Lr)),sr(n)&&o(a.get(hc)));break;case"set":sr(n)&&o(a.get(Lr));break}}xu()}function Br(n){const e=bt(n);return e===n||(on(e,"iterate",js),Vn(n))?e:_i(n)?ar(n)?e.map(t=>or(Hn(t))):e.map(or):e.map(Hn)}function ko(n){return on(n=bt(n),"iterate",js),n}function oi(n,e){return _i(n)?or(ar(n)?Hn(e):e):Hn(e)}const Jm={__proto__:null,[Symbol.iterator](){return dl(this,Symbol.iterator,n=>oi(this,n))},concat(...n){return Br(this).concat(...n.map(e=>at(e)?Br(e):e))},entries(){return dl(this,"entries",n=>(n[1]=oi(this,n[1]),n))},every(n,e){return Ti(this,"every",n,e,void 0,arguments)},filter(n,e){return Ti(this,"filter",n,e,t=>t.map(i=>oi(this,i)),arguments)},find(n,e){return Ti(this,"find",n,e,t=>oi(this,t),arguments)},findIndex(n,e){return Ti(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Ti(this,"findLast",n,e,t=>oi(this,t),arguments)},findLastIndex(n,e){return Ti(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Ti(this,"forEach",n,e,void 0,arguments)},includes(...n){return pl(this,"includes",n)},indexOf(...n){return pl(this,"indexOf",n)},join(n){return Br(this).join(n)},lastIndexOf(...n){return pl(this,"lastIndexOf",n)},map(n,e){return Ti(this,"map",n,e,void 0,arguments)},pop(){return Ts(this,"pop")},push(...n){return Ts(this,"push",n)},reduce(n,...e){return lh(this,"reduce",n,e)},reduceRight(n,...e){return lh(this,"reduceRight",n,e)},shift(){return Ts(this,"shift")},some(n,e){return Ti(this,"some",n,e,void 0,arguments)},splice(...n){return Ts(this,"splice",n)},toReversed(){return Br(this).toReversed()},toSorted(n){return Br(this).toSorted(n)},toSpliced(...n){return Br(this).toSpliced(...n)},unshift(...n){return Ts(this,"unshift",n)},values(){return dl(this,"values",n=>oi(this,n))}};function dl(n,e,t){const i=ko(n),r=i[e]();return i!==n&&!Vn(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const Qm=Array.prototype;function Ti(n,e,t,i,r,s){const a=ko(n),o=a!==n&&!Vn(n),l=a[e];if(l!==Qm[e]){const f=l.apply(n,s);return o?Hn(f):f}let c=t;a!==n&&(o?c=function(f,h){return t.call(this,oi(n,f),h,n)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,n)}));const u=l.call(a,c,i);return o&&r?r(u):u}function lh(n,e,t,i){const r=ko(n),s=r!==n&&!Vn(n);let a=t,o=!1;r!==n&&(s?(o=i.length===0,a=function(c,u,f){return o&&(o=!1,c=oi(n,c)),t.call(this,c,oi(n,u),f,n)}):t.length>3&&(a=function(c,u,f){return t.call(this,c,u,f,n)}));const l=r[e](a,...i);return o?oi(n,l):l}function pl(n,e,t){const i=bt(n);on(i,"iterate",js);const r=i[e](...t);return(r===-1||r===!1)&&Eu(t[0])?(t[0]=bt(t[0]),i[e](...t)):r}function Ts(n,e,t=[]){Wi(),vu();const i=bt(n)[e].apply(n,t);return xu(),Xi(),i}const jm=du("__proto__,__v_isRef,__isVue"),yd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(gi));function eg(n){gi(n)||(n=String(n));const e=bt(this);return on(e,"has",n),e.hasOwnProperty(n)}class bd{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?ug:wd:s?Ad:Td).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=at(e);if(!r){let l;if(a&&(l=Jm[t]))return l;if(t==="hasOwnProperty")return eg}const o=Reflect.get(e,t,cn(e)?e:i);if((gi(t)?yd.has(t):jm(t))||(r||on(e,"get",t),s))return o;if(cn(o)){const l=a&&mu(t)?o:o.value;return r&&Lt(l)?dc(l):l}return Lt(o)?r?dc(o):rs(o):o}}class Ed extends bd{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];const a=at(e)&&mu(t);if(!this._isShallow){const c=_i(s);if(!Vn(i)&&!_i(i)&&(s=bt(s),i=bt(i)),!a&&cn(s)&&!cn(i))return c||(s.value=i),!0}const o=a?Number(t)<e.length:Et(e,t),l=Reflect.set(e,t,i,cn(e)?e:r);return e===bt(r)&&l&&(o?ui(i,s)&&Ni(e,"set",t,i):Ni(e,"add",t,i)),l}deleteProperty(e,t){const i=Et(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&Ni(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!gi(t)||!yd.has(t))&&on(e,"has",t),i}ownKeys(e){return on(e,"iterate",at(e)?"length":Lr),Reflect.ownKeys(e)}}class tg extends bd{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const ng=new Ed,ig=new tg,rg=new Ed(!0);const fc=n=>n,Ta=n=>Reflect.getPrototypeOf(n);function sg(n,e,t){return function(...i){const r=this.__v_raw,s=bt(r),a=sr(s),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=r[n](...i),u=t?fc:e?or:Hn;return!e&&on(s,"iterate",l?hc:Lr),rn(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:o?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function Aa(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function ag(n,e){const t={get(r){const s=this.__v_raw,a=bt(s),o=bt(r);n||(ui(r,o)&&on(a,"get",r),on(a,"get",o));const{has:l}=Ta(a),c=e?fc:n?or:Hn;if(l.call(a,r))return c(s.get(r));if(l.call(a,o))return c(s.get(o));s!==a&&s.get(r)},get size(){const r=this.__v_raw;return!n&&on(bt(r),"iterate",Lr),r.size},has(r){const s=this.__v_raw,a=bt(s),o=bt(r);return n||(ui(r,o)&&on(a,"has",r),on(a,"has",o)),r===o?s.has(r):s.has(r)||s.has(o)},forEach(r,s){const a=this,o=a.__v_raw,l=bt(o),c=e?fc:n?or:Hn;return!n&&on(l,"iterate",Lr),o.forEach((u,f)=>r.call(s,c(u),c(f),a))}};return rn(t,n?{add:Aa("add"),set:Aa("set"),delete:Aa("delete"),clear:Aa("clear")}:{add(r){const s=bt(this),a=Ta(s),o=bt(r),l=!e&&!Vn(r)&&!_i(r)?o:r;return a.has.call(s,l)||ui(r,l)&&a.has.call(s,r)||ui(o,l)&&a.has.call(s,o)||(s.add(l),Ni(s,"add",l,l)),this},set(r,s){!e&&!Vn(s)&&!_i(s)&&(s=bt(s));const a=bt(this),{has:o,get:l}=Ta(a);let c=o.call(a,r);c||(r=bt(r),c=o.call(a,r));const u=l.call(a,r);return a.set(r,s),c?ui(s,u)&&Ni(a,"set",r,s):Ni(a,"add",r,s),this},delete(r){const s=bt(this),{has:a,get:o}=Ta(s);let l=a.call(s,r);l||(r=bt(r),l=a.call(s,r)),o&&o.call(s,r);const c=s.delete(r);return l&&Ni(s,"delete",r,void 0),c},clear(){const r=bt(this),s=r.size!==0,a=r.clear();return s&&Ni(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=sg(r,n,e)}),t}function yu(n,e){const t=ag(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(Et(t,r)&&r in i?t:i,r,s)}const og={get:yu(!1,!1)},lg={get:yu(!1,!0)},cg={get:yu(!0,!1)};const Td=new WeakMap,Ad=new WeakMap,wd=new WeakMap,ug=new WeakMap;function hg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function rs(n){return _i(n)?n:bu(n,!1,ng,og,Td)}function fg(n){return bu(n,!1,rg,lg,Ad)}function dc(n){return bu(n,!0,ig,cg,wd)}function bu(n,e,t,i,r){if(!Lt(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const s=r.get(n);if(s)return s;const a=hg(Fm(n));if(a===0)return n;const o=new Proxy(n,a===2?i:t);return r.set(n,o),o}function ar(n){return _i(n)?ar(n.__v_raw):!!(n&&n.__v_isReactive)}function _i(n){return!!(n&&n.__v_isReadonly)}function Vn(n){return!!(n&&n.__v_isShallow)}function Eu(n){return n?!!n.__v_raw:!1}function bt(n){const e=n&&n.__v_raw;return e?bt(e):n}function dg(n){return!Et(n,"__v_skip")&&Object.isExtensible(n)&&cd(n,"__v_skip",!0),n}const Hn=n=>Lt(n)?rs(n):n,or=n=>Lt(n)?dc(n):n;function cn(n){return n?n.__v_isRef===!0:!1}function Wn(n){return Rd(n,!1)}function wa(n){return Rd(n,!0)}function Rd(n,e){return cn(n)?n:new pg(n,e)}class pg{constructor(e,t){this.dep=new Mu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:bt(e),this._value=t?e:Hn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Vn(e)||_i(e);e=i?e:bt(e),ui(e,t)&&(this._rawValue=e,this._value=i?e:Hn(e),this.dep.trigger())}}function Un(n){return cn(n)?n.value:n}const mg={get:(n,e,t)=>e==="__v_raw"?n:Un(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return cn(r)&&!cn(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function Cd(n){return ar(n)?n:new Proxy(n,mg)}class gg{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Mu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Qs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Ut!==this)return gd(this,!0),!0}get value(){const e=this.dep.track();return xd(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function _g(n,e,t=!1){let i,r;return ct(n)?i=n:(i=n.get,r=n.set),new gg(i,r,t)}const Ra={},Mo=new WeakMap;let Er;function vg(n,e=!1,t=Er){if(t){let i=Mo.get(t);i||Mo.set(t,i=[]),i.push(n)}}function xg(n,e,t=It){const{immediate:i,deep:r,once:s,scheduler:a,augmentJob:o,call:l}=t,c=M=>r?M:Vn(M)||r===!1||r===0?Fi(M,1):Fi(M);let u,f,h,d,_=!1,y=!1;if(cn(n)?(f=()=>n.value,_=Vn(n)):ar(n)?(f=()=>c(n),_=!0):at(n)?(y=!0,_=n.some(M=>ar(M)||Vn(M)),f=()=>n.map(M=>{if(cn(M))return M.value;if(ar(M))return c(M);if(ct(M))return l?l(M,2):M()})):ct(n)?e?f=l?()=>l(n,2):n:f=()=>{if(h){Wi();try{h()}finally{Xi()}}const M=Er;Er=u;try{return l?l(n,3,[d]):n(d)}finally{Er=M}}:f=pi,e&&r){const M=f,R=r===!0?1/0:r;f=()=>Fi(M(),R)}const m=Ym(),p=()=>{u.stop(),m&&m.active&&pu(m.effects,u)};if(s&&e){const M=e;e=(...R)=>{const C=M(...R);return p(),C}}let T=y?new Array(n.length).fill(Ra):Ra;const L=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const R=u.run();if(M||r||_||(y?R.some((C,F)=>ui(C,T[F])):ui(R,T))){h&&h();const C=Er;Er=u;try{const F=[R,T===Ra?void 0:y&&T[0]===Ra?[]:T,d];T=R,l?l(e,3,F):e(...F)}finally{Er=C}}}else u.run()};return o&&o(L),u=new pd(f),u.scheduler=a?()=>a(L,!1):L,d=M=>vg(M,!1,u),h=u.onStop=()=>{const M=Mo.get(u);if(M){if(l)l(M,4);else for(const R of M)R();Mo.delete(u)}},e?i?L(!0):T=u.run():a?a(L.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function Fi(n,e=1/0,t){if(e<=0||!Lt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,cn(n))Fi(n.value,e,t);else if(at(n))for(let i=0;i<n.length;i++)Fi(n[i],e,t);else if(cs(n)||sr(n))n.forEach(i=>{Fi(i,e,t)});else if(od(n)){for(const i in n)Fi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Fi(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function da(n,e,t,i){try{return i?n(...i):n()}catch(r){Wo(r,e,t)}}function jn(n,e,t,i){if(ct(n)){const r=da(n,e,t,i);return r&&sd(r)&&r.catch(s=>{Wo(s,e,t)}),r}if(at(n)){const r=[];for(let s=0;s<n.length;s++)r.push(jn(n[s],e,t,i));return r}}function Wo(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||It;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}o=o.parent}if(s){Wi(),da(s,null,10,[n,l,c]),Xi();return}}Sg(n,t,r,i,a)}function Sg(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const gn=[];let ai=-1;const ss=[];let ir=null,Qr=0;const Pd=Promise.resolve();let yo=null;function Mg(n){const e=yo||Pd;return n?e.then(this?n.bind(this):n):e}function yg(n){let e=ai+1,t=gn.length;for(;e<t;){const i=e+t>>>1,r=gn[i],s=ea(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function Tu(n){if(!(n.flags&1)){const e=ea(n),t=gn[gn.length-1];!t||!(n.flags&2)&&e>=ea(t)?gn.push(n):gn.splice(yg(e),0,n),n.flags|=1,Ld()}}function Ld(){yo||(yo=Pd.then(Id))}function bg(n){if(!at(n))ir&&n.id===-1?ir.splice(Qr+1,0,n):n.flags&1||(ss.push(n),n.flags|=1);else for(let e=0;e<n.length;e++)ss.push(n[e]);Ld()}function ch(n,e,t=ai+1){for(;t<gn.length;t++){const i=gn[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;gn.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Dd(n){if(ss.length){const e=[...new Set(ss)].sort((t,i)=>ea(t)-ea(i));if(ss.length=0,ir){for(let t=0;t<e.length;t++)ir.push(e[t]);return}for(ir=e,Qr=0;Qr<ir.length;Qr++){const t=ir[Qr];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}ir=null,Qr=0}}const ea=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Id(n){try{for(ai=0;ai<gn.length;ai++){const e=gn[ai];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),da(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ai<gn.length;ai++){const e=gn[ai];e&&(e.flags&=-2)}ai=-1,gn.length=0,Dd(),yo=null,(gn.length||ss.length)&&Id()}}let zn=null,Ud=null;function bo(n){const e=zn;return zn=n,Ud=n&&n.type.__scopeId||null,e}function Eg(n,e=zn,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&Sh(-1);const s=bo(e),a=Dr.length;let o;try{o=n(...r)}finally{for(let l=Dr.length;l>a;l--)rp();bo(s),i._d&&Sh(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function jt(n,e){if(zn===null)return n;const t=Ko(zn),i=n.dirs||(n.dirs=[]);for(let r=0;r<e.length;r++){let[s,a,o,l=It]=e[r];s&&(ct(s)&&(s={mounted:s,updated:s}),s.deep&&Fi(a),i.push({dir:s,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function pr(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[i];l&&(Wi(),jn(l,t,8,[n.el,o,n,e]),Xi())}}function Tg(n,e){if(_n){let t=_n.provides;const i=_n.parent&&_n.parent.provides;i===t&&(t=_n.provides=Object.create(i)),t[n]=e}}function uo(n,e,t=!1){const i=b_();if(i||as){let r=as?as._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&ct(e)?e.call(i&&i.proxy):e}}const Ag=Symbol.for("v-scx"),wg=()=>uo(Ag);function wr(n,e,t){return Nd(n,e,t)}function Nd(n,e,t=It){const{immediate:i,deep:r,flush:s,once:a}=t,o=rn({},t),l=e&&i||!e&&s!=="post";let c;if(ia){if(s==="sync"){const d=wg();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=pi,d.resume=pi,d.pause=pi,d}}const u=_n;o.call=(d,_,y)=>jn(d,u,_,y);let f=!1;s==="post"?o.scheduler=d=>{En(d,u&&u.suspense)}:s!=="sync"&&(f=!0,o.scheduler=(d,_)=>{_?d():Tu(d)}),o.augmentJob=d=>{e&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=xg(n,e,o);return ia&&(c?c.push(h):l&&h()),h}function Rg(n,e,t){const i=this.proxy,r=Gt(n)?n.includes(".")?Fd(i,n):()=>i[n]:n.bind(i,i);let s;ct(e)?s=e:(s=e.handler,t=e);const a=pa(this),o=Nd(r,s.bind(i),t);return a(),o}function Fd(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const Cg=Symbol("_vte"),Xo=n=>n.__isTeleport,ml=Symbol("_leaveCb");function Pg(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==$i){e=t;break}}return e}function Od(n){if(!wu(n))return Xo(n.type)&&n.children?Pg(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&ct(t.default))return t.default()}}function Au(n,e){if(n.shapeFlag&6&&n.component){n.transition=e;const t=n.component.subTree;Au(Xo(t.type)&&Od(t)||t,e)}else n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Lg(n,e){return ct(n)?rn({name:n.name},e,{setup:n}):n}function Bd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function uh(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Eo=new WeakMap;function Ws(n,e,t,i,r=!1){if(at(n)){n.forEach((y,m)=>Ws(y,e&&(at(e)?e[m]:e),t,i,r));return}if(Xs(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Ws(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?Ko(i.component):i.el,a=r?null:s,{i:o,r:l}=n,c=e&&e.r,u=o.refs===It?o.refs={}:o.refs,f=o.setupState,h=bt(f),d=f===It?rd:y=>uh(u,y)?!1:Et(h,y),_=(y,m)=>!(m&&uh(u,m));if(c!=null&&c!==l){if(hh(e),Gt(c))u[c]=null,d(c)&&(f[c]=null);else if(cn(c)){const y=e;_(c,y.k)&&(c.value=null),y.k&&(u[y.k]=null)}}if(ct(l))da(l,o,12,[a,u]);else{const y=Gt(l),m=cn(l);if(y||m){const p=()=>{if(n.f){const T=y?d(l)?f[l]:u[l]:_()||!n.k?l.value:u[n.k];if(r)at(T)&&pu(T,s);else if(at(T))T.includes(s)||T.push(s);else if(y)u[l]=[s],d(l)&&(f[l]=u[l]);else{const L=[s];_(l,n.k)&&(l.value=L),n.k&&(u[n.k]=L)}}else y?(u[l]=a,d(l)&&(f[l]=a)):m&&(_(l,n.k)&&(l.value=a),n.k&&(u[n.k]=a))};if(a){const T=()=>{p(),Eo.delete(n)};T.id=-1,Eo.set(n,T),En(T,t)}else hh(n),p()}}}function hh(n){const e=Eo.get(n);e&&(e.flags|=8,Eo.delete(n))}Go().requestIdleCallback;Go().cancelIdleCallback;const Xs=n=>!!n.type.__asyncLoader,wu=n=>n.type.__isKeepAlive;function Dg(n,e){zd(n,"a",e)}function Ig(n,e){zd(n,"da",e)}function zd(n,e,t=_n){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if($o(e,i,t),t){let r=t.parent;for(;r&&r.parent;)wu(r.parent.vnode)&&Ug(i,e,t,r),r=r.parent}}function Ug(n,e,t,i){const r=$o(e,n,i,!0);Vd(()=>{pu(i[e],r)},t)}function $o(n,e,t=_n,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...a)=>{Wi();const o=pa(t),l=jn(e,t,n,a);return o(),Xi(),l});return i?r.unshift(s):r.push(s),s}}const Yi=n=>(e,t=_n)=>{(!ia||n==="sp")&&$o(n,(...i)=>e(...i),t)},Ng=Yi("bm"),pc=Yi("m"),Fg=Yi("bu"),Og=Yi("u"),Bg=Yi("bum"),Vd=Yi("um"),zg=Yi("sp"),Vg=Yi("rtg"),Hg=Yi("rtc");function Gg(n,e=_n){$o("ec",n,e)}const kg=Symbol.for("v-ndc");function gl(n,e,t,i){let r;const s=t,a=at(n);if(a||Gt(n)){const o=a&&ar(n);let l=!1,c=!1;o&&(l=!Vn(n),c=_i(n),n=ko(n)),r=new Array(n.length);for(let u=0,f=n.length;u<f;u++)r[u]=e(l?c?or(Hn(n[u])):Hn(n[u]):n[u],u,void 0,s)}else if(typeof n=="number"){r=new Array(n);for(let o=0;o<n;o++)r[o]=e(o+1,o,void 0,s)}else if(Lt(n))if(n[Symbol.iterator])r=Array.from(n,(o,l)=>e(o,l,void 0,s));else{const o=Object.keys(n);r=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];r[l]=e(n[u],u,l,s)}}else r=[];return r}const mc=n=>n?lp(n)?Ko(n):mc(n.parent):null,$s=rn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>mc(n.parent),$root:n=>mc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Gd(n),$forceUpdate:n=>n.f||(n.f=()=>{Tu(n.update)}),$nextTick:n=>n.n||(n.n=Mg.bind(n.proxy)),$watch:n=>Rg.bind(n)}),_l=(n,e)=>n!==It&&!n.__isScriptSetup&&Et(n,e),Wg={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const h=a[e];if(h!==void 0)switch(h){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(_l(i,e))return a[e]=1,i[e];if(r!==It&&Et(r,e))return a[e]=2,r[e];if(Et(s,e))return a[e]=3,s[e];if(t!==It&&Et(t,e))return a[e]=4,t[e];gc&&(a[e]=0)}}const c=$s[e];let u,f;if(c)return e==="$attrs"&&on(n.attrs,"get",""),c(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==It&&Et(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,Et(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return _l(r,e)?(r[e]=t,!0):i!==It&&Et(i,e)?(i[e]=t,!0):Et(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,props:s,type:a}},o){let l;return!!(t[o]||n!==It&&o[0]!=="$"&&Et(n,o)||_l(e,o)||Et(s,o)||Et(i,o)||Et($s,o)||Et(r.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Et(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function fh(n){return at(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let gc=!0;function Xg(n){const e=Gd(n),t=n.proxy,i=n.ctx;gc=!1,e.beforeCreate&&dh(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:_,activated:y,deactivated:m,beforeDestroy:p,beforeUnmount:T,destroyed:L,unmounted:M,render:R,renderTracked:C,renderTriggered:F,errorCaptured:S,serverPrefetch:I,expose:B,inheritAttrs:X,components:te,directives:re,filters:V}=e;if(c&&$g(c,i,null),a)for(const j in a){const de=a[j];ct(de)&&(i[j]=de.bind(t))}if(r){const j=r.call(t,t);Lt(j)&&(n.data=rs(j))}if(gc=!0,s)for(const j in s){const de=s[j],le=ct(de)?de.bind(t,t):ct(de.get)?de.get.bind(t,t):pi,ge=!ct(de)&&ct(de.set)?de.set.bind(t):pi,pe=jr({get:le,set:ge});Object.defineProperty(i,j,{enumerable:!0,configurable:!0,get:()=>pe.value,set:De=>pe.value=De})}if(o)for(const j in o)Hd(o[j],i,t,j);if(l){const j=ct(l)?l.call(t):l;Reflect.ownKeys(j).forEach(de=>{Tg(de,j[de])})}u&&dh(u,n,"c");function oe(j,de){at(de)?de.forEach(le=>j(le.bind(t))):de&&j(de.bind(t))}if(oe(Ng,f),oe(pc,h),oe(Fg,d),oe(Og,_),oe(Dg,y),oe(Ig,m),oe(Gg,S),oe(Hg,C),oe(Vg,F),oe(Bg,T),oe(Vd,M),oe(zg,I),at(B))if(B.length){const j=n.exposed||(n.exposed={});B.forEach(de=>{Object.defineProperty(j,de,{get:()=>t[de],set:le=>t[de]=le,enumerable:!0})})}else n.exposed||(n.exposed={});R&&n.render===pi&&(n.render=R),X!=null&&(n.inheritAttrs=X),te&&(n.components=te),re&&(n.directives=re),I&&Bd(n)}function $g(n,e,t=pi){at(n)&&(n=_c(n));for(const i in n){const r=n[i];let s;Lt(r)?"default"in r?s=uo(r.from||i,r.default,!0):s=uo(r.from||i):s=uo(r),cn(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):e[i]=s}}function dh(n,e,t){jn(at(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Hd(n,e,t,i){let r=i.includes(".")?Fd(t,i):()=>t[i];if(Gt(n)){const s=e[n];ct(s)&&wr(r,s)}else if(ct(n))wr(r,n.bind(t));else if(Lt(n))if(at(n))n.forEach(s=>Hd(s,e,t,i));else{const s=ct(n.handler)?n.handler.bind(t):e[n.handler];ct(s)&&wr(r,s,n)}}function Gd(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=n.appContext,o=s.get(e);let l;return o?l=o:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>To(l,c,a,!0)),To(l,e,a)),Lt(e)&&s.set(e,l),l}function To(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&To(n,s,t,!0),r&&r.forEach(a=>To(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=qg[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const qg={data:ph,props:mh,emits:mh,methods:Ns,computed:Ns,beforeCreate:dn,created:dn,beforeMount:dn,mounted:dn,beforeUpdate:dn,updated:dn,beforeDestroy:dn,beforeUnmount:dn,destroyed:dn,unmounted:dn,activated:dn,deactivated:dn,errorCaptured:dn,serverPrefetch:dn,components:Ns,directives:Ns,watch:Kg,provide:ph,inject:Yg};function ph(n,e){return e?n?function(){return rn(ct(n)?n.call(this,this):n,ct(e)?e.call(this,this):e)}:e:n}function Yg(n,e){return Ns(_c(n),_c(e))}function _c(n){if(at(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function dn(n,e){return n?[...new Set([].concat(n,e))]:e}function Ns(n,e){return n?rn(Object.create(null),n,e):e}function mh(n,e){return n?at(n)&&at(e)?[...new Set([...n,...e])]:rn(Object.create(null),fh(n),fh(e??{})):e}function Kg(n,e){if(!n)return e;if(!e)return n;const t=rn(Object.create(null),n);for(const i in e)t[i]=dn(n[i],e[i]);return t}function kd(){return{app:null,config:{isNativeTag:rd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Zg=0;function Jg(n,e){return function(i,r=null){ct(i)||(i=rn({},i)),r!=null&&!Lt(r)&&(r=null);const s=kd(),a=new WeakSet,o=[];let l=!1;const c=s.app={_uid:Zg++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:C_,get config(){return s.config},set config(u){},use(u,...f){return a.has(u)||(u&&ct(u.install)?(a.add(u),u.install(c,...f)):ct(u)&&(a.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||zi(i,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,Ko(d.component)}},onUnmount(u){o.push(u)},unmount(){l&&(jn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=as;as=c;try{return u()}finally{as=f}}};return c}}let as=null;const Qg=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Zn(e)}Modifiers`]||n[`${Or(e)}Modifiers`];function jg(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||It;let r=t;const s=e.startsWith("update:"),a=s&&Qg(i,e.slice(7));a&&(a.trim&&(r=t.map(u=>Gt(u)?u.trim():u)),a.number&&(r=r.map(gu)));let o,l=i[o=ul(e)]||i[o=ul(Zn(e))];!l&&s&&(l=i[o=ul(Or(e))]),l&&jn(l,n,6,r);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,jn(c,n,6,r)}}const e_=new WeakMap;function Wd(n,e,t=!1){const i=t?e_:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let a={},o=!1;if(!ct(n)){const l=c=>{const u=Wd(c,e,!0);u&&(o=!0,rn(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!o?(Lt(n)&&i.set(n,null),null):(at(s)?s.forEach(l=>a[l]=null):rn(a,s),Lt(n)&&i.set(n,a),a)}function qo(n,e){return!n||!zo(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),Et(n,e[0].toLowerCase()+e.slice(1))||Et(n,Or(e))||Et(n,e))}function gh(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:_,inheritAttrs:y}=n,m=bo(n);let p,T;try{if(t.shapeFlag&4){const M=r||i,R=M;p=li(c.call(R,M,u,f,d,h,_)),T=o}else{const M=e;p=li(M.length>1?M(f,{attrs:o,slots:a,emit:l}):M(f,null)),T=e.props?o:t_(o)}}catch(M){Dr.length=0,Wo(M,n,1),p=zi($i)}let L=p;if(T&&y!==!1){const M=Object.keys(T),{shapeFlag:R}=L;M.length&&R&7&&(s&&M.some(Vo)&&(T=n_(T,s)),L=us(L,T,!1,!0))}if(t.dirs&&(L=us(L,null,!1,!0),L.dirs=L.dirs?L.dirs.concat(t.dirs):t.dirs),t.transition){const M=Xo(L.type)&&Od(L)||L;Au(M,t.transition)}return p=L,bo(m),p}const t_=n=>{let e;for(const t in n)(t==="class"||t==="style"||zo(t))&&((e||(e={}))[t]=n[t]);return e},n_=(n,e)=>{const t={};for(const i in n)(!Vo(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function i_(n,e,t){const{props:i,children:r,component:s}=n,{props:a,children:o,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?_h(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(Xd(a,i,h)&&!qo(c,h))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?_h(i,a,c):!0:!!a;return!1}function _h(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(Xd(e,n,s)&&!qo(t,s))return!0}return!1}function Xd(n,e,t){const i=n[t],r=e[t];return t==="style"&&Lt(i)&&Lt(r)?!ps(i,r):i!==r}function r_({vnode:n,parent:e,suspense:t},i){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.suspense.vnode.el=r.el=i,n=r),r===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const $d={},qd=()=>Object.create($d),Yd=n=>Object.getPrototypeOf(n)===$d;function s_(n,e,t,i=!1){const r={},s=qd();n.propsDefaults=Object.create(null),Kd(n,e,r,s);for(const a in n.propsOptions[0])a in r||(r[a]=void 0);t?n.props=i?r:fg(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function a_(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:a}}=n,o=bt(r),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(qo(n.emitsOptions,h))continue;const d=e[h];if(l)if(Et(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const _=Zn(h);r[_]=vc(l,o,_,d,n,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{Kd(n,e,r,s)&&(c=!0);let u;for(const f in o)(!e||!Et(e,f)&&((u=Or(f))===f||!Et(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=vc(l,o,f,void 0,n,!0)):delete r[f]);if(s!==o)for(const f in s)(!e||!Et(e,f))&&(delete s[f],c=!0)}c&&Ni(n.attrs,"set","")}function Kd(n,e,t,i){const[r,s]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(Hs(l))continue;const c=e[l];let u;r&&Et(r,u=Zn(l))?!s||!s.includes(u)?t[u]=c:(o||(o={}))[u]=c:qo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(s){const l=bt(t),c=o||It;for(let u=0;u<s.length;u++){const f=s[u];t[f]=vc(r,l,f,c[f],n,!Et(c,f))}}return a}function vc(n,e,t,i,r,s){const a=n[t];if(a!=null){const o=Et(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&ct(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=pa(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===Or(t))&&(i=!0))}return i}const o_=new WeakMap;function Zd(n,e,t=!1){const i=t?o_:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,a={},o=[];let l=!1;if(!ct(n)){const u=f=>{l=!0;const[h,d]=Zd(f,e,!0);rn(a,h),d&&o.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return Lt(n)&&i.set(n,Ar),Ar;if(at(s))for(let u=0;u<s.length;u++){const f=Zn(s[u]);vh(f)&&(a[f]=It)}else if(s)for(const u in s){const f=Zn(u);if(vh(f)){const h=s[u],d=a[f]=at(h)||ct(h)?{type:h}:rn({},h),_=d.type;let y=!1,m=!0;if(at(_))for(let p=0;p<_.length;++p){const T=_[p],L=ct(T)&&T.name;if(L==="Boolean"){y=!0;break}else L==="String"&&(m=!1)}else y=ct(_)&&_.name==="Boolean";d[0]=y,d[1]=m,(y||Et(d,"default"))&&o.push(f)}}const c=[a,o];return Lt(n)&&i.set(n,c),c}function vh(n){return n[0]!=="$"&&!Hs(n)}const Ru=n=>n==="_"||n==="_ctx"||n==="$stable",Cu=n=>at(n)?n.map(li):[li(n)],l_=(n,e,t)=>{if(e._n)return e;const i=Eg((...r)=>Cu(e(...r)),t);return i._c=!1,i},Jd=(n,e,t)=>{const i=n._ctx;for(const r in n){if(Ru(r))continue;const s=n[r];if(ct(s))e[r]=l_(r,s,i);else if(s!=null){const a=Cu(s);e[r]=()=>a}}},Qd=(n,e)=>{const t=Cu(e);n.slots.default=()=>t},jd=(n,e,t)=>{for(const i in e)(t||!Ru(i))&&(n[i]=e[i])},c_=(n,e,t)=>{const i=n.slots=qd();if(n.vnode.shapeFlag&32){const r=e._;r?(jd(i,e,t),t&&cd(i,"_",r,!0)):Jd(e,i)}else e&&Qd(n,e)},u_=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,a=It;if(i.shapeFlag&32){const o=e._;o?t&&o===1?s=!1:jd(r,e,t):(s=!e.$stable,Jd(e,r)),a=e}else e&&(Qd(n,e),a={default:1});if(s)for(const o in r)!Ru(o)&&a[o]==null&&delete r[o]},En=m_;function h_(n){return f_(n)}function f_(n,e){const t=Go();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=pi,insertStaticContent:_}=n,y=(w,N,U,G=null,k=null,H=null,ee=void 0,fe=null,ce=!!N.dynamicChildren)=>{if(w===N)return;w&&!As(w,N)&&(G=q(w),De(w,k,H,!0),w=null),N.patchFlag===-2&&(ce=!1,N.dynamicChildren=null),N.dynamicChildren&&w&&w.dynamicChildren&&w.dynamicChildren.hasOnce&&(N.dynamicChildren===Ar&&(N.dynamicChildren=[]),N.dynamicChildren.hasOnce=!0);const{type:ie,ref:Ee,shapeFlag:P}=N;switch(ie){case Yo:m(w,N,U,G);break;case $i:p(w,N,U,G);break;case xl:w==null&&T(N,U,G,ee);break;case On:te(w,N,U,G,k,H,ee,fe,ce);break;default:P&1?R(w,N,U,G,k,H,ee,fe,ce):P&6?re(w,N,U,G,k,H,ee,fe,ce):(P&64||P&128)&&ie.process(w,N,U,G,k,H,ee,fe,ce,Le)}Ee!=null&&k?Ws(Ee,w&&w.ref,H,N||w,!N):Ee==null&&w&&w.ref!=null&&Ws(w.ref,null,H,w,!0)},m=(w,N,U,G)=>{if(w==null)i(N.el=o(N.children),U,G);else{const k=N.el=w.el;N.children!==w.children&&c(k,N.children)}},p=(w,N,U,G)=>{w==null?i(N.el=l(N.children||""),U,G):N.el=w.el},T=(w,N,U,G)=>{[w.el,w.anchor]=_(w.children,N,U,G,w.el,w.anchor)},L=({el:w,anchor:N},U,G)=>{let k;for(;w&&w!==N;)k=h(w),i(w,U,G),w=k;i(N,U,G)},M=({el:w,anchor:N})=>{let U;for(;w&&w!==N;)U=h(w),r(w),w=U;r(N)},R=(w,N,U,G,k,H,ee,fe,ce)=>{if(N.type==="svg"?ee="svg":N.type==="math"&&(ee="mathml"),w==null)C(N,U,G,k,H,ee,fe,ce);else{const ie=w.el&&w.el._isVueCE?w.el:null;try{ie&&ie._beginPatch(),I(w,N,k,H,ee,fe,ce)}finally{ie&&ie._endPatch()}}},C=(w,N,U,G,k,H,ee,fe)=>{let ce,ie;const{props:Ee,shapeFlag:P,transition:Ae,dirs:Ie}=w;if(ce=w.el=a(w.type,H,Ee&&Ee.is,Ee),P&8?u(ce,w.children):P&16&&S(w.children,ce,null,G,k,vl(w,H),ee,fe),Ie&&pr(w,null,G,"created"),F(ce,w,w.scopeId,ee,G),Ee){for(const g in Ee)g!=="value"&&!Hs(g)&&s(ce,g,null,Ee[g],H,G);"value"in Ee&&s(ce,"value",null,Ee.value,H),(ie=Ee.onVnodeBeforeMount)&&ni(ie,G,w)}Ie&&pr(w,null,G,"beforeMount");const E=d_(k,Ae);E&&Ae.beforeEnter(ce),i(ce,N,U),((ie=Ee&&Ee.onVnodeMounted)||E||Ie)&&En(()=>{try{ie&&ni(ie,G,w),E&&Ae.enter(ce),Ie&&pr(w,null,G,"mounted")}finally{}},k)},F=(w,N,U,G,k)=>{if(U&&d(w,U),G)for(let H=0;H<G.length;H++)d(w,G[H]);if(k){let H=k.subTree;if(N===H||ip(H.type)&&(H.ssContent===N||H.ssFallback===N)){const ee=k.vnode;F(w,ee,ee.scopeId,ee.slotScopeIds,k.parent)}}},S=(w,N,U,G,k,H,ee,fe,ce=0)=>{for(let ie=ce;ie<w.length;ie++){const Ee=w[ie]=fe?Ii(w[ie]):li(w[ie]);y(null,Ee,N,U,G,k,H,ee,fe)}},I=(w,N,U,G,k,H,ee)=>{const fe=N.el=w.el;let{patchFlag:ce,dynamicChildren:ie,dirs:Ee}=N;ce|=w.patchFlag&16;const P=w.props||It,Ae=N.props||It;let Ie;if(U&&mr(U,!1),(Ie=Ae.onVnodeBeforeUpdate)&&ni(Ie,U,N,w),Ee&&pr(N,w,U,"beforeUpdate"),U&&mr(U,!0),ie&&(!w.dynamicChildren||w.dynamicChildren.length!==ie.length)&&(ce=0,ee=!1,ie=null),(P.innerHTML&&Ae.innerHTML==null||P.textContent&&Ae.textContent==null)&&u(fe,""),ie?B(w.dynamicChildren,ie,fe,U,G,vl(N,k),H):ee||de(w,N,fe,null,U,G,vl(N,k),H,!1),ce>0){if(ce&16)X(fe,P,Ae,U,k);else if(ce&2&&P.class!==Ae.class&&s(fe,"class",null,Ae.class,k),ce&4&&s(fe,"style",P.style,Ae.style,k),ce&8){const E=N.dynamicProps;for(let g=0;g<E.length;g++){const O=E[g],K=P[O],ne=Ae[O];(ne!==K||O==="value")&&s(fe,O,K,ne,k,U)}}ce&1&&w.children!==N.children&&u(fe,N.children)}else!ee&&ie==null&&X(fe,P,Ae,U,k);((Ie=Ae.onVnodeUpdated)||Ee)&&En(()=>{Ie&&ni(Ie,U,N,w),Ee&&pr(N,w,U,"updated")},G)},B=(w,N,U,G,k,H,ee)=>{for(let fe=0;fe<N.length;fe++){const ce=w[fe],ie=N[fe],Ee=ce.el&&(ce.type===On||!As(ce,ie)||ce.shapeFlag&198)?f(ce.el):U;y(ce,ie,Ee,null,G,k,H,ee,!0)}},X=(w,N,U,G,k)=>{if(N!==U){if(N!==It)for(const H in N)!Hs(H)&&!(H in U)&&s(w,H,N[H],null,k,G);for(const H in U){if(Hs(H))continue;const ee=U[H],fe=N[H];ee!==fe&&H!=="value"&&s(w,H,fe,ee,k,G)}"value"in U&&s(w,"value",N.value,U.value,k)}},te=(w,N,U,G,k,H,ee,fe,ce)=>{const ie=N.el=w?w.el:o(""),Ee=N.anchor=w?w.anchor:o("");let{patchFlag:P,dynamicChildren:Ae,slotScopeIds:Ie}=N;Ie&&(fe=fe?fe.concat(Ie):Ie),w==null?(i(ie,U,G),i(Ee,U,G),S(N.children||[],U,Ee,k,H,ee,fe,ce)):P>0&&P&64&&Ae&&w.dynamicChildren&&w.dynamicChildren.length===Ae.length?(B(w.dynamicChildren,Ae,U,k,H,ee,fe),(N.key!=null||k&&N===k.subTree)&&ep(w,N,!0)):de(w,N,U,Ee,k,H,ee,fe,ce)},re=(w,N,U,G,k,H,ee,fe,ce)=>{N.slotScopeIds=fe,w==null?N.shapeFlag&512?k.ctx.activate(N,U,G,ee,ce):V(N,U,G,k,H,ee,ce):Q(w,N,ce)},V=(w,N,U,G,k,H,ee)=>{const fe=w.component=y_(w,G,k);if(wu(w)&&(fe.ctx.renderer=Le),E_(fe,!1,ee),fe.asyncDep){if(k&&k.registerDep(fe,oe,ee),!w.el){const ce=fe.subTree=zi($i);p(null,ce,N,U),w.placeholder=ce.el}}else oe(fe,w,N,U,k,H,ee)},Q=(w,N,U)=>{const G=N.component=w.component;if(i_(w,N,U))if(G.asyncDep&&!G.asyncResolved){N.el=w.el,j(G,N,U);return}else G.next=N,G.update();else N.el=w.el,G.vnode=N},oe=(w,N,U,G,k,H,ee)=>{const fe=()=>{if(w.isMounted){let{next:P,bu:Ae,u:Ie,parent:E,vnode:g}=w;{const Ce=tp(w);if(Ce){P&&(P.el=g.el,j(w,P,ee)),Ce.asyncDep.then(()=>{En(()=>{w.isUnmounted||ie()},k)});return}}let O=P,K;mr(w,!1),P?(P.el=g.el,j(w,P,ee)):P=g,Ae&&co(Ae),(K=P.props&&P.props.onVnodeBeforeUpdate)&&ni(K,E,P,g),mr(w,!0);const ne=gh(w),Te=w.subTree;w.subTree=ne,y(Te,ne,f(Te.el),q(Te),w,k,H),P.el=ne.el,O===null&&r_(w,ne.el),Ie&&En(Ie,k),(K=P.props&&P.props.onVnodeUpdated)&&En(()=>ni(K,E,P,g),k)}else{let P;const{el:Ae,props:Ie}=N,{bm:E,m:g,parent:O,root:K,type:ne}=w,Te=Xs(N);mr(w,!1),E&&co(E),!Te&&(P=Ie&&Ie.onVnodeBeforeMount)&&ni(P,O,N),mr(w,!0);{K.ce&&K.ce._hasShadowRoot()&&K.ce._injectChildStyle(ne,w.parent?w.parent.type:void 0);const Ce=w.subTree=gh(w);y(null,Ce,U,G,w,k,H),N.el=Ce.el}if(g&&En(g,k),!Te&&(P=Ie&&Ie.onVnodeMounted)){const Ce=N;En(()=>ni(P,O,Ce),k)}(N.shapeFlag&256||O&&Xs(O.vnode)&&O.vnode.shapeFlag&256)&&w.a&&En(w.a,k),w.isMounted=!0,N=U=G=null}};w.scope.on();const ce=w.effect=new pd(fe);w.scope.off();const ie=w.update=ce.run.bind(ce),Ee=w.job=ce.runIfDirty.bind(ce);Ee.i=w,Ee.id=w.uid,ce.scheduler=()=>Tu(Ee),mr(w,!0),ie()},j=(w,N,U)=>{N.component=w;const G=w.vnode.props;w.vnode=N,w.next=null,a_(w,N.props,G,U),u_(w,N.children,U),Wi(),ch(w),Xi()},de=(w,N,U,G,k,H,ee,fe,ce=!1)=>{const ie=w&&w.children,Ee=w?w.shapeFlag:0,P=N.children,{patchFlag:Ae,shapeFlag:Ie}=N;if(Ae>0){if(Ae&128){ge(ie,P,U,G,k,H,ee,fe,ce);return}else if(Ae&256){le(ie,P,U,G,k,H,ee,fe,ce);return}}Ie&8?(Ee&16&&nt(ie,k,H),P!==ie&&u(U,P)):Ee&16?Ie&16?ge(ie,P,U,G,k,H,ee,fe,ce):nt(ie,k,H,!0):(Ee&8&&u(U,""),Ie&16&&S(P,U,G,k,H,ee,fe,ce))},le=(w,N,U,G,k,H,ee,fe,ce)=>{w=w||Ar,N=N||Ar;const ie=w.length,Ee=N.length,P=Math.min(ie,Ee);let Ae;for(Ae=0;Ae<P;Ae++){const Ie=N[Ae]=ce?Ii(N[Ae]):li(N[Ae]);y(w[Ae],Ie,U,null,k,H,ee,fe,ce)}ie>Ee?nt(w,k,H,!0,!1,P):S(N,U,G,k,H,ee,fe,ce,P)},ge=(w,N,U,G,k,H,ee,fe,ce)=>{let ie=0;const Ee=N.length;let P=w.length-1,Ae=Ee-1;for(;ie<=P&&ie<=Ae;){const Ie=w[ie],E=N[ie]=ce?Ii(N[ie]):li(N[ie]);if(As(Ie,E))y(Ie,E,U,null,k,H,ee,fe,ce);else break;ie++}for(;ie<=P&&ie<=Ae;){const Ie=w[P],E=N[Ae]=ce?Ii(N[Ae]):li(N[Ae]);if(As(Ie,E))y(Ie,E,U,null,k,H,ee,fe,ce);else break;P--,Ae--}if(ie>P){if(ie<=Ae){const Ie=Ae+1,E=Ie<Ee?N[Ie].el:G;for(;ie<=Ae;)y(null,N[ie]=ce?Ii(N[ie]):li(N[ie]),U,E,k,H,ee,fe,ce),ie++}}else if(ie>Ae)for(;ie<=P;)De(w[ie],k,H,!0),ie++;else{const Ie=ie,E=ie,g=new Map;for(ie=E;ie<=Ae;ie++){const Re=N[ie]=ce?Ii(N[ie]):li(N[ie]);Re.key!=null&&g.set(Re.key,ie)}let O,K=0;const ne=Ae-E+1;let Te=!1,Ce=0;const me=new Array(ne);for(ie=0;ie<ne;ie++)me[ie]=0;for(ie=Ie;ie<=P;ie++){const Re=w[ie];if(K>=ne){De(Re,k,H,!0);continue}let ke;if(Re.key!=null)ke=g.get(Re.key);else for(O=E;O<=Ae;O++)if(me[O-E]===0&&As(Re,N[O])){ke=O;break}ke===void 0?De(Re,k,H,!0):(me[ke-E]=ie+1,ke>=Ce?Ce=ke:Te=!0,y(Re,N[ke],U,null,k,H,ee,fe,ce),K++)}const xe=Te?p_(me):Ar;for(O=xe.length-1,ie=ne-1;ie>=0;ie--){const Re=E+ie,ke=N[Re],Be=N[Re+1],Ne=Re+1<Ee?Be.el||np(Be):G;me[ie]===0?y(null,ke,U,Ne,k,H,ee,fe,ce):Te&&(O<0||ie!==xe[O]?pe(ke,U,Ne,2):O--)}}},pe=(w,N,U,G,k=null)=>{const{el:H,type:ee,transition:fe,children:ce,shapeFlag:ie}=w;if(ie&6){pe(w.component.subTree,N,U,G);return}if(ie&128){w.suspense.move(N,U,G);return}if(ie&64){ee.move(w,N,U,Le);return}if(ee===On){i(H,N,U);for(let P=0;P<ce.length;P++)pe(ce[P],N,U,G);i(w.anchor,N,U);return}if(ee===xl){L(w,N,U);return}if(G!==2&&ie&1&&fe)if(G===0)fe.persisted&&!H[ml]?i(H,N,U):(fe.beforeEnter(H),i(H,N,U),En(()=>fe.enter(H),k));else{const{leave:P,delayLeave:Ae,afterLeave:Ie}=fe,E=()=>{w.ctx.isUnmounted?r(H):i(H,N,U)},g=()=>{const O=H._isLeaving||!!H[ml];H._isLeaving&&H[ml](!0),fe.persisted&&!O?E():P(H,()=>{E(),Ie&&Ie()})};Ae?Ae(H,E,g):g()}else i(H,N,U)},De=(w,N,U,G=!1,k=!1)=>{const{type:H,props:ee,ref:fe,children:ce,dynamicChildren:ie,shapeFlag:Ee,patchFlag:P,dirs:Ae,cacheIndex:Ie,memo:E}=w;if((P===-2||ie&&ie.hasOnce)&&(k=!1),fe!=null&&(Wi(),Ws(fe,null,U,w,!0),Xi()),Ie!=null&&(!w.ctx||w.ctx===N)&&(N.renderCache[Ie]=void 0),Ee&256){N.ctx.deactivate(w);return}const g=Ee&1&&Ae,O=!Xs(w);let K;if(O&&(K=ee&&ee.onVnodeBeforeUnmount)&&ni(K,N,w),Ee&6)We(w.component,U,G);else{if(Ee&128){w.suspense.unmount(U,G);return}g&&pr(w,null,N,"beforeUnmount"),Ee&64?w.type.remove(w,N,U,Le,G):ie&&!ie.hasOnce&&(H!==On||P>0&&P&64)?nt(ie,N,U,!1,!0):(H===On&&P&384||!k&&Ee&16)&&nt(ce,N,U),G&&Me(w)}const ne=E!=null&&Ie==null;(O&&(K=ee&&ee.onVnodeUnmounted)||g||ne)&&En(()=>{K&&ni(K,N,w),g&&pr(w,null,N,"unmounted"),ne&&(w.el=null)},U)},Me=w=>{const{type:N,el:U,anchor:G,transition:k}=w;if(N===On){it(U,G);return}if(N===xl){M(w),k&&!k.persisted&&k.afterLeave&&k.afterLeave();return}const H=()=>{r(U),k&&!k.persisted&&k.afterLeave&&k.afterLeave()};if(w.shapeFlag&1&&k&&!k.persisted){const{leave:ee,delayLeave:fe}=k,ce=()=>ee(U,H);fe?fe(w.el,H,ce):ce()}else H()},it=(w,N)=>{let U;for(;w!==N;)U=h(w),r(w),w=U;r(N)},We=(w,N,U)=>{const{bum:G,scope:k,job:H,subTree:ee,um:fe,m:ce,a:ie}=w;xh(ce),xh(ie),G&&co(G),k.stop(),H?(H.flags|=8,De(ee,w,N,U)):w.vnode.el&&ee&&(ee.transition=w.vnode.transition,De(ee,w,N,U)),fe&&En(fe,N),En(()=>{w.isUnmounted=!0},N)},nt=(w,N,U,G=!1,k=!1,H=0)=>{for(let ee=H;ee<w.length;ee++)De(w[ee],N,U,G,k)},q=w=>{if(w.shapeFlag&6)return q(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const N=h(w.anchor||w.el),U=N&&N[Cg];return U?h(U):N};let A=!1;const J=(w,N,U)=>{let G;w==null?N._vnode&&(De(N._vnode,null,null,!0),G=N._vnode.component):y(N._vnode||null,w,N,null,null,null,U),N._vnode=w,A||(A=!0,ch(G),Dd(),A=!1)},Le={p:y,um:De,m:pe,r:Me,mt:V,mc:S,pc:de,pbc:B,n:q,o:n};return{render:J,hydrate:void 0,createApp:Jg(J)}}function vl({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function mr({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function d_(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function ep(n,e,t=!1){const i=n.children,r=e.children;if(at(i)&&at(r))for(let s=0;s<i.length;s++){const a=i[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=Ii(r[s]),o.el=a.el),!t&&o.patchFlag!==-2&&ep(a,o)),o.type===Yo&&(o.patchFlag===-1&&(o=r[s]=Ii(o)),o.el=a.el),o.type===$i&&!o.el&&(o.el=a.el)}}function p_(n){const e=n.slice(),t=[0];let i,r,s,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,a=t.length-1;s<a;)o=s+a>>1,n[t[o]]<c?s=o+1:a=o;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,a=t[s-1];s-- >0;)t[s]=a,a=e[a];return t}function tp(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:tp(e)}function xh(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function np(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?np(e.subTree):null}const ip=n=>n.__isSuspense;function m_(n,e){e&&e.pendingBranch?at(n)?e.effects.push(...n):e.effects.push(n):bg(n)}const On=Symbol.for("v-fgt"),Yo=Symbol.for("v-txt"),$i=Symbol.for("v-cmt"),xl=Symbol.for("v-stc"),Dr=[];let Cn=null;function pn(n=!1){Dr.push(Cn=n?null:[])}function rp(){Dr.pop(),Cn=Dr[Dr.length-1]||null}let ta=1;function Sh(n,e=!1){ta+=n,n<0&&Cn&&e&&(Cn.hasOnce=!0)}function sp(n){return n.dynamicChildren=ta>0?Cn||Ar:null,rp(),ta>0&&Cn&&Cn.push(n),n}function Mn(n,e,t,i,r,s){return sp(he(n,e,t,i,r,s,!0))}function g_(n,e,t,i,r){return sp(zi(n,e,t,i,r,!0))}function ap(n){return n?n.__v_isVNode===!0:!1}function As(n,e){return n.type===e.type&&n.key===e.key}const op=({key:n})=>n??null,ho=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Gt(n)||cn(n)||ct(n)?{i:zn,r:n,k:e,f:!!t}:n:null);function he(n,e=null,t=null,i=0,r=null,s=n===On?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&op(e),ref:e&&ho(e),scopeId:Ud,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:zn};return o?(Ao(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Gt(t)?8:16),ta>0&&!a&&Cn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Cn.push(l),l}const zi=__;function __(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===kg)&&(n=$i),ap(n)){const o=us(n,e,!0);return t&&Ao(o,t),ta>0&&!s&&Cn&&(o.shapeFlag&6?Cn[Cn.indexOf(n)]=o:Cn.push(o)),o.patchFlag=-2,o}if(R_(n)&&(n=n.__vccOpts),e){e=v_(e);let{class:o,style:l}=e;o&&!Gt(o)&&(e.class=Di(o)),Lt(l)&&(Eu(l)&&!at(l)&&(l=rn({},l)),e.style=_u(l))}const a=Gt(n)?1:ip(n)?128:Xo(n)?64:Lt(n)?4:ct(n)?2:0;return he(n,e,t,i,r,a,s,!0)}function v_(n){return n?Eu(n)||Yd(n)?rn({},n):n:null}function us(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=n,c=e?x_(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&op(c),ref:e&&e.ref?t&&s?at(s)?s.concat(ho(e)):[s,ho(e)]:ho(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==On?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&us(n.ssContent),ssFallback:n.ssFallback&&us(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce,cacheIndex:n.cacheIndex};return l&&i&&Au(u,l.clone(u)),u}function Pt(n=" ",e=0){return zi(Yo,null,n,e)}function gr(n="",e=!1){return e?(pn(),g_($i,null,n)):zi($i,null,n)}function li(n){return n==null||typeof n=="boolean"?zi($i):at(n)?zi(On,null,n.slice()):ap(n)?Ii(n):zi(Yo,null,String(n))}function Ii(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:us(n)}function Ao(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(at(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Ao(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Yd(e)?e._ctx=zn:r===3&&zn&&(zn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(ct(e)){if(i&65){Ao(n,{default:e});return}e={default:e,_ctx:zn},t=32}else e=String(e),i&64?(t=16,e=[Pt(e)]):t=8;n.children=e,n.shapeFlag|=t}function x_(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=Di([e.class,i.class]));else if(r==="style")e.style=_u([e.style,i.style]);else if(zo(r)){const s=e[r],a=i[r];a&&s!==a&&!(at(s)&&s.includes(a))?e[r]=s?[].concat(s,a):a:a==null&&s==null&&!Vo(r)&&(e[r]=a)}else r!==""&&(e[r]=i[r])}return e}function ni(n,e,t,i=null){jn(n,e,7,[t,i])}const S_=kd();let M_=0;function y_(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||S_,s={uid:M_++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new qm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zd(i,r),emitsOptions:Wd(i,r),emit:null,emitted:null,propsDefaults:It,inheritAttrs:i.inheritAttrs,ctx:It,data:It,props:It,attrs:It,slots:It,refs:It,setupState:It,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=jg.bind(null,s),n.ce&&n.ce(s),s}let _n=null;const b_=()=>_n||zn;let wo,na;{const n=Go(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};wo=e("__VUE_INSTANCE_SETTERS__",t=>_n=t),na=e("__VUE_SSR_SETTERS__",t=>ia=t)}const pa=n=>{const e=_n;return wo(n),n.scope.on(),()=>{n.scope.off(),wo(e)}},Mh=()=>{_n&&_n.scope.off(),wo(null)};function lp(n){return n.vnode.shapeFlag&4}let ia=!1;function E_(n,e=!1,t=!1){e&&na(e);const{props:i,children:r}=n.vnode,s=lp(n);s_(n,i,s,e),c_(n,r,t||e);const a=s?T_(n,e):void 0;return e&&na(!1),a}function T_(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Wg);const{setup:i}=t;if(i){Wi();const r=n.setupContext=i.length>1?w_(n):null,s=pa(n),a=da(i,n,0,[n.props,r]),o=sd(a);if(Xi(),s(),(o||n.sp)&&!Xs(n)&&Bd(n),o){if(a.then(Mh,Mh),e)return a.then(l=>{na(!0);try{yh(n,l,e)}finally{na(!1)}}).catch(l=>{Wo(l,n,0)});n.asyncDep=a}else yh(n,a)}else cp(n)}function yh(n,e,t){ct(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Lt(e)&&(n.setupState=Cd(e)),cp(n)}function cp(n,e,t){const i=n.type;n.render||(n.render=i.render||pi);{const r=pa(n);Wi();try{Xg(n)}finally{Xi(),r()}}}const A_={get(n,e){return on(n,"get",""),n[e]}};function w_(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,A_),slots:n.slots,emit:n.emit,expose:e}}function Ko(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Cd(dg(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in $s)return $s[t](n)},has(e,t){return t in e||t in $s}})):n.proxy}function R_(n){return ct(n)&&"__vccOpts"in n}const jr=(n,e)=>_g(n,e,ia),C_="3.5.43";/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let xc;const bh=typeof window<"u"&&window.trustedTypes;if(bh)try{xc=bh.createPolicy("vue",{createHTML:n=>n})}catch{}const up=xc?n=>xc.createHTML(n):n=>n,P_="http://www.w3.org/2000/svg",L_="http://www.w3.org/1998/Math/MathML",Li=typeof document<"u"?document:null,Eh=Li&&Li.createElement("template"),D_={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?Li.createElementNS(P_,n):e==="mathml"?Li.createElementNS(L_,n):t?Li.createElement(n,{is:t}):Li.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>Li.createTextNode(n),createComment:n=>Li.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Li.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const a=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{Eh.innerHTML=up(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Eh.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},I_=Symbol("_vtc");function U_(n,e,t){const i=n[I_];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Th=Symbol("_vod"),N_=Symbol("_vsh"),F_=Symbol(""),O_=/(?:^|;)\s*display\s*:/;function B_(n,e,t){const i=n.style,r=Gt(t);let s=!1;if(t&&!r){if(e)if(Gt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&Fs(i,o,"")}else for(const a in e)t[a]==null&&Fs(i,a,"");for(const a in t){a==="display"&&(s=!0);const o=t[a];o!=null?V_(n,a,!Gt(e)&&e?e[a]:void 0,o)||Fs(i,a,o):Fs(i,a,"")}}else if(r){if(e!==t){const a=i[F_];a&&(t+=";"+a),i.cssText=t,s=O_.test(t)}}else e&&n.removeAttribute("style");Th in n&&(n[Th]=s?i.display:"",n[N_]&&(i.display="none"))}const Ca=/\s*!important$/;function Fs(n,e,t){if(at(t))t.forEach(i=>Fs(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))Ca.test(t)?n.setProperty(e,t.replace(Ca,""),"important"):n.setProperty(e,t);else{const i=z_(n,e);Ca.test(t)?n.setProperty(Or(i),t.replace(Ca,""),"important"):n[i]=t}}const Ah=["Webkit","Moz","ms"],Sl={};function z_(n,e){const t=Sl[e];if(t)return t;let i=Zn(e);if(i!=="filter"&&i in n)return Sl[e]=i;i=ld(i);for(let r=0;r<Ah.length;r++){const s=Ah[r]+i;if(s in n)return Sl[e]=s}return e}function V_(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Gt(i)&&t===i}const wh="http://www.w3.org/1999/xlink";function Rh(n,e,t,i,r,s=Wm(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(wh,e.slice(6,e.length)):n.setAttributeNS(wh,e,t):t==null||s&&!ud(t)?n.removeAttribute(e):n.setAttribute(e,s?"":gi(t)?String(t):t)}function Ch(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?up(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=ud(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(r||e)}function Tr(n,e,t,i){n.addEventListener(e,t,i)}function H_(n,e,t,i){n.removeEventListener(e,t,i)}const Ph=Symbol("_vei");function G_(n,e,t,i,r=null){const s=n[Ph]||(n[Ph]={}),a=s[e];if(i&&a)a.value=i;else{const[o,l]=X_(e);if(i){const c=s[e]=Y_(i,r);Tr(n,o,c,l)}else a&&(H_(n,o,a,l),s[e]=void 0)}}const k_=/(Once|Passive|Capture)$/,W_=/^on:?(?:Once|Passive|Capture)$/;function X_(n){let e,t;for(;(t=n.match(k_))&&!W_.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):Or(n.slice(2)),e]}let Ml=0;const $_=Promise.resolve(),q_=()=>Ml||($_.then(()=>Ml=0),Ml=Date.now());function Y_(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;const r=t.value;if(at(r)){const s=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{s.call(i),i._stopped=!0};const a=r.slice(),o=[i];for(let l=0;l<a.length&&!i._stopped;l++){const c=a[l];c&&jn(c,e,5,o)}}else jn(r,e,5,[i])};return t.value=n,t.attached=q_(),t}const Lh=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,K_=(n,e,t,i,r,s)=>{const a=r==="svg";e==="class"?U_(n,i,a):e==="style"?B_(n,t,i):zo(e)?Vo(e)||G_(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Z_(n,e,i,a))?(Ch(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Rh(n,e,i,a,s,e!=="value")):n._isVueCE&&(J_(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!Gt(i)))?Ch(n,Zn(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Rh(n,e,i,a))};function Z_(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Lh(e)&&ct(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Lh(e)&&Gt(t)?!1:e in n}function J_(n,e){const t=n._def.props;if(!t)return!1;const i=Zn(e);return Array.isArray(t)?t.some(r=>Zn(r)===i):Object.keys(t).some(r=>Zn(r)===i)}const Ro=n=>{const e=n.props["onUpdate:modelValue"]||!1;return at(e)?t=>co(e,t):e};function Q_(n){n.target.composing=!0}function Dh(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Rr=Symbol("_assign"),Pa=Symbol("_initialValue");function yl(n,e,t){return e&&(n=n.trim()),t&&(n=gu(n)),n}const ii={created(n,{modifiers:{lazy:e,trim:t,number:i}},r){n.parentNode&&(n.type==="text"?n[Pa]=n.defaultValue.replace(/[\r\n]/g,""):n.type==="textarea"&&(n[Pa]=n.defaultValue.replace(/\r\n?/g,`
`))),n[Rr]=Ro(r);const s=i||r.props&&r.props.type==="number";Tr(n,e?"change":"input",a=>{a.target.composing||n[Rr](yl(n.value,t,s))}),(t||s)&&Tr(n,"change",()=>{n.value=yl(n.value,t,s)}),e||(Tr(n,"compositionstart",Q_),Tr(n,"compositionend",Dh),Tr(n,"change",Dh))},mounted(n,{value:e,modifiers:{trim:t,number:i}}){const r=e??"",s=n[Pa];delete n[Pa],s!==void 0&&(n.type==="text"||n.type==="textarea")&&n.value!==s?n[Rr](yl(n.value,t,i)):n.value=r},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:r,number:s}},a){if(n[Rr]=Ro(a),n.composing)return;const o=(s||n.type==="number")&&!/^0\d/.test(n.value)?gu(n.value):n.value,l=e??"";if(o===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&e===t||r&&n.value.trim()===l)||(n.value=l)}},_r={deep:!0,created(n,e,t){n[Rr]=Ro(t),Tr(n,"change",()=>{const i=n._modelValue,r=j_(n),s=n.checked,a=n[Rr];if(at(i)){const o=hd(i,r),l=o!==-1;if(s&&!l)a(i.concat(r));else if(!s&&l){const c=[...i];c.splice(o,1),a(c)}}else if(cs(i)){const o=new Set(i);s?o.add(r):o.delete(r),a(o)}else a(hp(n,s))})},mounted:Ih,beforeUpdate(n,e,t){n[Rr]=Ro(t),Ih(n,e,t)}};function Ih(n,{value:e,oldValue:t},i){n._modelValue=e;let r;if(at(e))r=hd(e,i.props.value)>-1;else if(cs(e))r=e.has(i.props.value);else{if(e===t)return;r=ps(e,hp(n,!0))}n.checked!==r&&(n.checked=r)}function j_(n){return"_value"in n?n._value:n.value}function hp(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const ev=rn({patchProp:K_},D_);let Uh;function tv(){return Uh||(Uh=h_(ev))}const nv=((...n)=>{const e=tv().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=rv(i);if(!r)return;const s=e._component;!ct(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=t(r,!1,iv(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e});function iv(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function rv(n){return Gt(n)?document.querySelector(n):n}const vr=Math.PI/180,La={haStar:1,cStar:.25,rhoFStar:.38};function sv(n,e){return{x:n*(Math.sin(e)-e*Math.cos(e)),y:n*(Math.cos(e)+e*Math.sin(e))}}function av(n){return Math.tan(n)-n}function Nh(n,e){const t=n/e;return Math.sqrt(Math.max(0,t*t-1))}function Fh(n,e){const t=Math.cos(e),i=Math.sin(e);return{x:n.x*t-n.y*i,y:n.x*i+n.y*t}}function Os(n,e){return{x:n*Math.cos(e),y:n*Math.sin(e)}}function ov(n,e,t,i){const r=[];for(let s=0;s<=i;s++){const a=e+(t-e)*s/i;r.push(Os(n,a))}return r}function Oh(n,e=16){const{z:t,module:i,alpha:r}=n,s=i*t/2,a=s*Math.cos(r),o=s+La.haStar*i,l=s-(La.haStar+La.cStar)*i,c=Math.PI*i,u=c*Math.cos(r),f=Math.PI*i/2,h=2*Math.PI/t,d=a>l,_=av(r),y=Math.PI/(2*t)+_,m=Nh(o,a),p=Math.atan(m),T=m-Math.atan(m),L=Math.PI/(2*t)+_-T,M=2*o*L,R=L<=0,C=2/(Math.sin(r)*Math.sin(r)),F=t<C,S=A=>({x:-A.x,y:A.y}),I=d?0:Nh(l,a),B=(A,J,Le,we)=>{const w=[];for(let N=0;N<=we;N++){const U=J+(Le-J)*N/we,G=Fh(sv(a,U),y);w.push(A===1?S(G):G)}return w},X=6,te=A=>{const J=-A,Le=Math.PI/2+J*y,we=B(A,I,I,1);if(!d)return{j:we[0],jAngle:Math.atan2(we[0].y,we[0].x),fillet:[],flankLo:null};const w=Math.PI/2+J*(h/2),N=(a*a-l*l)/(2*l),U=Math.abs(Le-w),G=Math.sin(U),k=G<1?l*G/(1-G):1/0,H=Math.max(0,Math.min(La.rhoFStar*i,N*.999,k*.999)),ee=l+H,fe=Math.asin(Math.min(1,H/ee)),ce=A===1?Le-fe:Le+fe,ie=Os(ee,ce),Ee=Os(l,ce),P=Math.sqrt(Math.max(0,ee*ee-H*H)),Ae=Os(P,Le),Ie=Math.atan2(Ee.y-ie.y,Ee.x-ie.x);let g=Math.atan2(Ae.y-ie.y,Ae.x-ie.x)-Ie;for(;g>Math.PI;)g-=2*Math.PI;for(;g<-Math.PI;)g+=2*Math.PI;g=Math.abs(g)*-A;const O=[];for(let K=0;K<=X;K++){const ne=Ie+g*K/X;O.push({x:ie.x+H*Math.cos(ne),y:ie.y+H*Math.sin(ne)})}return{j:Ee,jAngle:ce,fillet:O,flankLo:we[0]}},re=te(1),V=te(-1),Q=B(1,I,m,e),oe=B(-1,I,m,e),j=Q[e],de=oe[e],le=Math.atan2(j.y,j.x),ge=Math.atan2(de.y,de.x),pe=[];pe.push(...re.fillet),re.flankLo&&pe.push(re.flankLo),pe.push(...Q.slice(1));let De=ge-le;for(;De>Math.PI;)De-=2*Math.PI;for(;De<-Math.PI;)De+=2*Math.PI;const Me=Math.max(4,Math.ceil(Math.abs(De)/h*24));pe.push(...ov(o,le,le+De,Me).slice(1));for(let A=e-1;A>=0;A--)pe.push(oe[A]);V.flankLo&&(pe.push(V.flankLo),pe.push(V.fillet[V.fillet.length-1])),pe.push(...V.fillet.slice(0,-1).reverse());const it=[],We=6,nt=A=>{const J=it[it.length-1];(!J||Math.hypot(A.x-J.x,A.y-J.y)>1e-10)&&it.push(A)};for(let A=0;A<t;A++){const J=A*h,Le=pe.map(N=>Fh(N,J)),we=V.jAngle+J,w=re.jAngle+(A+1)*h;for(const N of Le.slice(0,-1))nt(N);for(let N=1;N<=We;N++){const U=we+(w-we)*N/We;nt(Os(l,U))}}if(it.length>1){const A=it[0],J=it[it.length-1];Math.hypot(A.x-J.x,A.y-J.y)<1e-10&&it.pop()}const q=Array.from({length:t},(A,J)=>Math.PI/2+J*h);return{input:n,pitchR:s,baseR:a,addendumR:o,dedendumR:l,baseAboveRoot:d,circularPitch:c,basePitch:u,toothThickness:f,beta:y,taTip:m,zMinValue:C,undercut:F,alphaTip:p,tipThickness:M,pointed:R,toothProfile:pe,outline:it,toothCenterAngles:q,jAngleRight:re.jAngle,jAngleLeft:V.jAngle}}function Bh(n,e,t,i){const r=Math.cos(i),s=Math.sin(i);return n.map(a=>({x:e+a.x*r-a.y*s,y:t+a.x*s+a.y*r}))}function zh(n){const e=[];return(!Number.isFinite(n.z)||n.z<4||Math.abs(n.z-Math.round(n.z))>1e-9)&&e.push("齿数必须为 ≥4 的整数"),(!(n.module>0)||!Number.isFinite(n.module))&&e.push("模数必须 > 0"),(!(n.alpha>0)||n.alpha>=Math.PI/2)&&e.push("压力角必须在 (0°, 90°) 内"),n.faceWidth>0||e.push("齿宽必须 > 0"),e}function lv(n){const{g1:e,g2:t,centerDistance:i}=n,r=e.pitchR+t.pitchR,s=e.input.alpha,a=Math.min(1,Math.max(-1,r*Math.cos(s)/i)),o=Math.acos(a),l=e.baseR/Math.cos(o),c=t.baseR/Math.cos(o),u=i-r,f=De=>Math.tan(De)-De,h=2*i*(f(o)-f(s)),d=h*Math.cos(o),_=i-e.addendumR-t.dedendumR,y=i-t.addendumR-e.dedendumR,m=Math.abs(e.basePitch-t.basePitch),p=m<1e-6,T=[],L=i<e.addendumR+t.addendumR;L&&T.push("中心距小于两齿顶圆半径之和，齿顶圆交叉，必然实体干涉"),(_<0||y<0)&&T.push("存在齿顶与对方齿根圆交叉（顶隙为负）"),Math.abs(u)>1e-9&&(u>0?T.push(`非标准中心距（+${u.toFixed(3)} mm）：有侧隙安装，啮合角增大，不再是无侧隙啮合`):T.push("中心距小于标准值：无侧隙空间，齿面相互挤压（仅教学演示干涉）")),p||T.push(`两轮基节不等（差 ${m.toFixed(4)} mm），不能正确啮合`);const M={x:l,y:0},R=Math.sin(o),C=Math.cos(o),F=-l*R,S={x:M.x+F*R,y:M.y+F*C},I=c*R,B={x:M.x+I*R,y:M.y+I*C},X=(De,Me)=>{const it=M.x-De,We=M.y,nt=2*(it*R+We*C),q=it*it+We*We-Me*Me,A=nt*nt-4*q;if(A<0)return[];const J=Math.sqrt(A);return[(-nt-J)/2,(-nt+J)/2]},te=X(0,e.addendumR),V=X(i,t.addendumR).filter(De=>De<=1e-9),Q=te.filter(De=>De>=-1e-9),oe=V.length?Math.max(...V):F,j=Q.length?Math.min(...Q):I,de={x:M.x+oe*R,y:M.y+oe*C},le={x:M.x+j*R,y:M.y+j*C},ge=Math.max(0,j-oe),pe=ge/e.basePitch;return{a0:r,a:i,alphaPrime:o,pitchR1:l,pitchR2:c,deltaA:u,backlashTangential:Math.max(0,h),backlashNormal:Math.max(0,d),clearance12:_,clearance21:y,basePitchMatch:p,basePitchDiff:m,addendumOverlap:L,actionLine:{p0:de,p1:le},tangentLine:{p0:S,p1:B},pitchPoint:M,pathOfContact:ge,contactRatio:pe,ok:p&&!L,warnings:T}}function Vh(n,e,t,i){const r=n.alphaPrime,s=Math.sin(r),a=Math.cos(r),o=Math.tan(r)+i/e.baseR,l=Math.tan(r)-i/t.baseR,c=o-Math.atan(o),u=l-Math.atan(l),f=Math.PI/2+e.beta-c,h=Math.PI/2+t.beta-u,d=Math.atan2(i*a,n.pitchR1+i*s),_=Math.atan2(i*a,-n.pitchR2+i*s),y=d-f,m=_-h;return{phi1:y,phi2:m,t1:o,t2:l}}function Hh(n,e,t,i){const r=t.alphaPrime,s=Math.sin(r),a=Math.cos(r);let o=0;for(let h=0;h<30;h++){const d=Math.tan(r)+o/n.baseR,_=d-Math.atan(d),y=Math.PI/2+n.beta-_,p=Math.atan2(o*a,t.pitchR1+o*s)-y-i;if(o-=p/(1/n.baseR),Math.abs(p)<1e-12)break}const l=Math.tan(r)-o/e.baseR,c=l-Math.atan(l),u=Math.PI/2+e.beta-c;return Math.atan2(o*a,-t.pitchR2+o*s)-u}const cv="modulepreload",uv=function(n,e){return new URL(n,e).href},Gh={},hv=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let a=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");r=a(t.map(u=>{if(u=uv(u,i),u in Gh)return;Gh[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(!!i)for(let y=o.length-1;y>=0;y--){const m=o[y];if(m.href===u&&(!f||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const _=document.createElement("link");if(_.rel=f?"stylesheet":cv,f||(_.as="script"),_.crossOrigin="",_.href=u,c&&_.setAttribute("nonce",c),document.head.appendChild(_),f)return new Promise((y,m)=>{_.addEventListener("load",y),_.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};async function fv(n={}){var e,t=n,i=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,s=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";if(s){const{createRequire:x}=await hv(()=>import("./__vite-browser-external-BIHI7g3E.js"),[],import.meta.url);var a=x(import.meta.url)}var o=import.meta.url,l="";function c(x){return t.locateFile?t.locateFile(x,l):l+x}var u,f;if(s){var h=a("fs");o.startsWith("file:")&&(l=a("path").dirname(a("url").fileURLToPath(o))+"/"),f=x=>{x=m(x)?new URL(x):x;var v=h.readFileSync(x);return v},u=async(x,v=!0)=>{x=m(x)?new URL(x):x;var D=h.readFileSync(x,v?void 0:"utf8");return D},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2)}else if(i||r){try{l=new URL(".",o).href}catch{}r&&(f=x=>{var v=new XMLHttpRequest;return v.open("GET",x,!1),v.responseType="arraybuffer",v.send(null),new Uint8Array(v.response)}),u=async x=>{if(m(x))return new Promise((D,z)=>{var Z=new XMLHttpRequest;Z.open("GET",x,!0),Z.responseType="arraybuffer",Z.onload=()=>{if(Z.status==200||Z.status==0&&Z.response){D(Z.response);return}z(Z.status)},Z.onerror=z,Z.send(null)});var v=await fetch(x,{credentials:"same-origin"});if(v.ok)return v.arrayBuffer();throw new Error(v.status+" : "+v.url)}}console.log.bind(console);var d=console.error.bind(console),_,y=!1,m=x=>x.startsWith("file://"),p,T,L,M,R,C,F,S,I,B,X,te,re=!1;function V(){var x=ba.buffer;L=new Int8Array(x),R=new Int16Array(x),t.HEAPU8=M=new Uint8Array(x),C=new Uint16Array(x),F=new Int32Array(x),S=new Uint32Array(x),I=new Float32Array(x),B=new Float64Array(x),X=new BigInt64Array(x),te=new BigUint64Array(x)}function Q(){if(t.preRun)for(typeof t.preRun=="function"&&(t.preRun=[t.preRun]);t.preRun.length;)we(t.preRun.shift());q(Le)}function oe(){re=!0,Es.E()}function j(){if(t.postRun)for(typeof t.postRun=="function"&&(t.postRun=[t.postRun]);t.postRun.length;)J(t.postRun.shift());q(A)}function de(x){t.onAbort?.(x),x="Aborted("+x+")",d(x),y=!0,x+=". Build with -sASSERTIONS for more info.";var v=new WebAssembly.RuntimeError(x);throw T?.(v),v}var le;function ge(){return t.locateFile?c("clipper2z.wasm"):new URL(""+new URL("clipper2z-Cj78y2Ub.wasm",import.meta.url).href,import.meta.url).href}function pe(x){if(x==le&&_)return new Uint8Array(_);if(f)return f(x);throw"both async and sync fetching of the wasm failed"}async function De(x){if(!_)try{var v=await u(x);return new Uint8Array(v)}catch{}return pe(x)}async function Me(x,v){try{var D=await De(x),z=await WebAssembly.instantiate(D,v);return z}catch(Z){d(`failed to asynchronously prepare wasm: ${Z}`),de(Z)}}async function it(x,v,D){if(!x&&!m(v)&&!s)try{var z=fetch(v,{credentials:"same-origin"}),Z=await WebAssembly.instantiateStreaming(z,D);return Z}catch(_e){d(`wasm streaming compile failed: ${_e}`),d("falling back to ArrayBuffer instantiation")}return Me(v,D)}function We(){var x={a:wm};return x}async function nt(){function x(_e,Se){return Es=_e.exports,Am(Es),V(),Es}function v(_e){return x(_e.instance)}var D=We();if(t.instantiateWasm)return new Promise((_e,Se)=>{t.instantiateWasm(D,(ye,Pe)=>{_e(x(ye))})});le??=ge();var z=await it(_,le,D),Z=v(z);return Z}var q=x=>{for(;x.length>0;)x.shift()(t)},A=[],J=x=>A.push(x),Le=[],we=x=>Le.push(x);class w{constructor(v){this.excPtr=v,this.ptr=v-24}set_type(v){S[this.ptr+4>>2]=v}get_type(){return S[this.ptr+4>>2]}set_destructor(v){S[this.ptr+8>>2]=v}get_destructor(){return S[this.ptr+8>>2]}set_caught(v){v=v?1:0,L[this.ptr+12]=v}get_caught(){return L[this.ptr+12]!=0}set_rethrown(v){v=v?1:0,L[this.ptr+13]=v}get_rethrown(){return L[this.ptr+13]!=0}init(v,D){this.set_adjusted_ptr(0),this.set_type(v),this.set_destructor(D)}set_adjusted_ptr(v){S[this.ptr+16>>2]=v}get_adjusted_ptr(){return S[this.ptr+16>>2]}}var N=0,U=(x,v,D)=>{var z=new w(x);throw z.init(v,D),N=x,N},G=()=>de(""),k={},H=x=>{for(;x.length;){var v=x.pop(),D=x.pop();D(v)}};function ee(x){return this.fromWireType(S[x>>2])}var fe={},ce={},ie={},Ee=class extends Error{constructor(v){super(v),this.name="InternalError"}},P=x=>{throw new Ee(x)},Ae=(x,v,D)=>{x.forEach(ye=>ie[ye]=v);function z(ye){var Pe=D(ye);Pe.length!==x.length&&P("Mismatched type converter count");for(var tt=0;tt<x.length;++tt)ne(x[tt],Pe[tt])}var Z=new Array(v.length),_e=[],Se=0;v.forEach((ye,Pe)=>{ce.hasOwnProperty(ye)?Z[Pe]=ce[ye]:(_e.push(ye),fe.hasOwnProperty(ye)||(fe[ye]=[]),fe[ye].push(()=>{Z[Pe]=ce[ye],++Se,Se===_e.length&&z(Z)}))}),_e.length===0&&z(Z)},Ie=x=>{var v=k[x];delete k[x];var D=v.rawConstructor,z=v.rawDestructor,Z=v.fields,_e=Z.map(Se=>Se.getterReturnType).concat(Z.map(Se=>Se.setterArgumentType));Ae([x],_e,Se=>{var ye={};return Z.forEach((Pe,tt)=>{var et=Pe.fieldName,yt=Se[tt],Vt=Se[tt].optional,xt=Pe.getter,Ht=Pe.getterContext,Qt=Se[tt+Z.length],kn=Pe.setter,Sn=Pe.setterContext;ye[et]={read:Ei=>yt.fromWireType(xt(Ht,Ei)),write:(Ei,fn)=>{var Ea=[];kn(Sn,Ei,Qt.toWireType(Ea,fn)),H(Ea)},optional:Vt}}),[{name:v.name,fromWireType:Pe=>{var tt={};for(var et in ye)tt[et]=ye[et].read(Pe);return z(Pe),tt},toWireType:(Pe,tt)=>{for(var et in ye)if(!(et in tt)&&!ye[et].optional)throw new TypeError(`Missing field: "${et}"`);var yt=D();for(et in ye)ye[et].write(yt,tt[et]);return Pe!==null&&Pe.push(z,yt),yt},readValueFromPointer:ee,destructorFunction:z}]})},E=x=>{for(var v="";;){var D=M[x++];if(!D)return v;v+=String.fromCharCode(D)}},g=class extends Error{constructor(v){super(v),this.name="BindingError"}},O=x=>{throw new g(x)};function K(x,v,D={}){var z=v.name;if(x||O(`type "${z}" must have a positive integer typeid pointer`),ce.hasOwnProperty(x)){if(D.ignoreDuplicateRegistrations)return;O(`Cannot register type '${z}' twice`)}if(ce[x]=v,delete ie[x],fe.hasOwnProperty(x)){var Z=fe[x];delete fe[x],Z.forEach(_e=>_e())}}function ne(x,v,D={}){return K(x,v,D)}var Te=(x,v,D)=>{switch(v){case 1:return D?z=>L[z]:z=>M[z];case 2:return D?z=>R[z>>1]:z=>C[z>>1];case 4:return D?z=>F[z>>2]:z=>S[z>>2];case 8:return D?z=>X[z>>3]:z=>te[z>>3];default:throw new TypeError(`invalid integer width (${v}): ${x}`)}},Ce=(x,v,D,z,Z)=>{v=E(v);const _e=z===0n;let Se=ye=>ye;if(_e){const ye=D*8;Se=Pe=>BigInt.asUintN(ye,Pe),Z=Se(Z)}ne(x,{name:v,fromWireType:Se,toWireType:(ye,Pe)=>(typeof Pe=="number"&&(Pe=BigInt(Pe)),Pe),readValueFromPointer:Te(v,D,!_e),destructorFunction:null})},me=(x,v,D,z)=>{v=E(v),ne(x,{name:v,fromWireType:function(Z){return!!Z},toWireType:function(Z,_e){return _e?D:z},readValueFromPointer:function(Z){return this.fromWireType(M[Z])},destructorFunction:null})},xe=x=>({count:x.count,deleteScheduled:x.deleteScheduled,preservePointerOnDelete:x.preservePointerOnDelete,ptr:x.ptr,ptrType:x.ptrType,smartPtr:x.smartPtr,smartPtrType:x.smartPtrType}),Re=x=>{function v(D){return D.$$.ptrType.registeredClass.name}O(v(x)+" instance already deleted")},ke=!1,Be=x=>{},Ne=x=>{x.smartPtr?x.smartPtrType.rawDestructor(x.smartPtr):x.ptrType.registeredClass.rawDestructor(x.ptr)},Je=x=>{x.count.value-=1;var v=x.count.value===0;v&&Ne(x)},je=x=>globalThis.FinalizationRegistry?(ke=new FinalizationRegistry(v=>{Je(v.$$)}),je=v=>{var D=v.$$,z=!!D.smartPtr;if(z){var Z={$$:D};ke.register(v,Z,v)}return v},Be=v=>ke.unregister(v),je(x)):(je=v=>v,x),ot=()=>{let x=Y.prototype;Object.assign(x,{isAliasOf(D){if(!(this instanceof Y)||!(D instanceof Y))return!1;var z=this.$$.ptrType.registeredClass,Z=this.$$.ptr;D.$$=D.$$;for(var _e=D.$$.ptrType.registeredClass,Se=D.$$.ptr;z.baseClass;)Z=z.upcast(Z),z=z.baseClass;for(;_e.baseClass;)Se=_e.upcast(Se),_e=_e.baseClass;return z===_e&&Z===Se},clone(){if(this.$$.ptr||Re(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var D=je(Object.create(Object.getPrototypeOf(this),{$$:{value:xe(this.$$)}}));return D.$$.count.value+=1,D.$$.deleteScheduled=!1,D},delete(){this.$$.ptr||Re(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&O("Object already scheduled for deletion"),Be(this),Je(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},isDeleted(){return!this.$$.ptr},deleteLater(){return this.$$.ptr||Re(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&O("Object already scheduled for deletion"),this.$$.deleteScheduled=!0,this}});const v=Symbol.dispose;v&&(x[v]=x.delete)};function Y(){}var Fe=(x,v)=>Object.defineProperty(v,"name",{value:x}),ve={},ze=(x,v,D)=>{if(x[v].overloadTable===void 0){var z=x[v];x[v]=function(...Z){return x[v].overloadTable.hasOwnProperty(Z.length)||O(`Function '${D}' called with an invalid number of arguments (${Z.length}) - expects one of (${x[v].overloadTable})!`),x[v].overloadTable[Z.length].apply(this,Z)},x[v].overloadTable=[],x[v].overloadTable[z.argCount]=z}},Ve=(x,v,D)=>{t.hasOwnProperty(x)?((D===void 0||t[x].overloadTable!==void 0&&t[x].overloadTable[D]!==void 0)&&O(`Cannot register public name '${x}' twice`),ze(t,x,x),t[x].overloadTable.hasOwnProperty(D)&&O(`Cannot register multiple overloads of a function with the same number of arguments (${D})!`),t[x].overloadTable[D]=v):(t[x]=v,t[x].argCount=D)},be=48,Qe=57,Ze=x=>{x=x.replace(/[^a-zA-Z0-9_]/g,"$");var v=x.charCodeAt(0);return v>=be&&v<=Qe?`_${x}`:x};function Rt(x,v,D,z,Z,_e,Se,ye){this.name=x,this.constructor=v,this.instancePrototype=D,this.rawDestructor=z,this.baseClass=Z,this.getActualType=_e,this.upcast=Se,this.downcast=ye,this.pureVirtualFunctions=[]}var pt=(x,v,D)=>{for(;v!==D;)v.upcast||O(`Expected null or instance of ${D.name}, got an instance of ${v.name}`),x=v.upcast(x),v=v.baseClass;return x},hn=x=>{if(x===null)return"null";var v=typeof x;return v==="object"||v==="array"||v==="function"?x.toString():""+x};function Ln(x,v){if(v===null)return this.isReference&&O(`null is not a valid ${this.name}`),0;v.$$||O(`Cannot pass "${hn(v)}" as a ${this.name}`),v.$$.ptr||O(`Cannot pass deleted object as a pointer of type ${this.name}`);var D=v.$$.ptrType.registeredClass,z=pt(v.$$.ptr,D,this.registeredClass);return z}function il(x,v){var D;if(v===null)return this.isReference&&O(`null is not a valid ${this.name}`),this.isSmartPointer?(D=this.rawConstructor(),x!==null&&x.push(this.rawDestructor,D),D):0;(!v||!v.$$)&&O(`Cannot pass "${hn(v)}" as a ${this.name}`),v.$$.ptr||O(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&v.$$.ptrType.isConst&&O(`Cannot convert argument of type ${v.$$.smartPtrType?v.$$.smartPtrType.name:v.$$.ptrType.name} to parameter type ${this.name}`);var z=v.$$.ptrType.registeredClass;if(D=pt(v.$$.ptr,z,this.registeredClass),this.isSmartPointer)switch(v.$$.smartPtr===void 0&&O("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:v.$$.smartPtrType===this?D=v.$$.smartPtr:O(`Cannot convert argument of type ${v.$$.smartPtrType?v.$$.smartPtrType.name:v.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:D=v.$$.smartPtr;break;case 2:if(v.$$.smartPtrType===this)D=v.$$.smartPtr;else{var Z=v.clone();D=this.rawShare(D,Xe.toHandle(()=>Z.delete())),x!==null&&x.push(this.rawDestructor,D)}break;default:O("Unsupporting sharing policy")}return D}function rl(x,v){if(v===null)return this.isReference&&O(`null is not a valid ${this.name}`),0;v.$$||O(`Cannot pass "${hn(v)}" as a ${this.name}`),v.$$.ptr||O(`Cannot pass deleted object as a pointer of type ${this.name}`),v.$$.ptrType.isConst&&O(`Cannot convert argument of type ${v.$$.ptrType.name} to parameter type ${this.name}`);var D=v.$$.ptrType.registeredClass,z=pt(v.$$.ptr,D,this.registeredClass);return z}var vs=(x,v,D)=>{if(v===D)return x;if(D.baseClass===void 0)return null;var z=vs(x,v,D.baseClass);return z===null?null:D.downcast(z)},xs={},sl=(x,v)=>{for(v===void 0&&O("ptr should not be undefined");x.baseClass;)v=x.upcast(v),x=x.baseClass;return v},_a=(x,v)=>(v=sl(x,v),xs[v]),hr=(x,v)=>{(!v.ptrType||!v.ptr)&&P("makeClassHandle requires ptr and ptrType");var D=!!v.smartPtrType,z=!!v.smartPtr;return D!==z&&P("Both smartPtrType and smartPtr must be specified"),v.count={value:1},je(Object.create(x,{$$:{value:v,writable:!0}}))};function yi(x){var v=this.getPointee(x);if(!v)return this.destructor(x),null;var D=_a(this.registeredClass,v);if(D!==void 0){if(D.$$.count.value===0)return D.$$.ptr=v,D.$$.smartPtr=x,D.clone();var z=D.clone();return this.destructor(x),z}function Z(){return this.isSmartPointer?hr(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:v,smartPtrType:this,smartPtr:x}):hr(this.registeredClass.instancePrototype,{ptrType:this,ptr:x})}var _e=this.registeredClass.getActualType(v),Se=ve[_e];if(!Se)return Z.call(this);var ye;this.isConst?ye=Se.constPointerType:ye=Se.pointerType;var Pe=vs(v,this.registeredClass,ye.registeredClass);return Pe===null?Z.call(this):this.isSmartPointer?hr(ye.registeredClass.instancePrototype,{ptrType:ye,ptr:Pe,smartPtrType:this,smartPtr:x}):hr(ye.registeredClass.instancePrototype,{ptrType:ye,ptr:Pe})}var Ss=()=>{Object.assign(fr.prototype,{getPointee(x){return this.rawGetPointee&&(x=this.rawGetPointee(x)),x},destructor(x){this.rawDestructor?.(x)},readValueFromPointer:ee,fromWireType:yi})};function fr(x,v,D,z,Z,_e,Se,ye,Pe,tt,et){this.name=x,this.registeredClass=v,this.isReference=D,this.isConst=z,this.isSmartPointer=Z,this.pointeeType=_e,this.sharingPolicy=Se,this.rawGetPointee=ye,this.rawConstructor=Pe,this.rawShare=tt,this.rawDestructor=et,!Z&&v.baseClass===void 0?z?(this.toWireType=Ln,this.destructorFunction=null):(this.toWireType=rl,this.destructorFunction=null):this.toWireType=il}var Ms=(x,v,D)=>{t.hasOwnProperty(x)||P("Replacing nonexistent public symbol"),t[x].overloadTable!==void 0&&D!==void 0?t[x].overloadTable[D]=v:(t[x]=v,t[x].argCount=D)},dr=[],va=x=>{var v=dr[x];return v||(dr[x]=v=Ju.get(x)),v},Yt=(x,v,D=!1)=>{x=E(x);function z(){var _e=va(v);return _e}var Z=z();return typeof Z!="function"&&O(`unknown function pointer with signature ${x}: ${v}`),Z};class xa extends Error{}var ys=x=>{var v=Zu(x),D=E(v);return Ji(v),D},Ki=(x,v)=>{var D=[],z={};function Z(_e){if(!z[_e]&&!ce[_e]){if(ie[_e]){ie[_e].forEach(Z);return}D.push(_e),z[_e]=!0}}throw v.forEach(Z),new xa(`${x}: `+D.map(ys).join([", "]))},al=(x,v,D,z,Z,_e,Se,ye,Pe,tt,et,yt,Vt)=>{et=E(et),_e=Yt(Z,_e),ye&&=Yt(Se,ye),tt&&=Yt(Pe,tt),Vt=Yt(yt,Vt);var xt=Ze(et);Ve(xt,function(){Ki(`Cannot construct ${et} due to unbound types`,[z])}),Ae([x,v,D],z?[z]:[],Ht=>{Ht=Ht[0];var Qt,kn;z?(Qt=Ht.registeredClass,kn=Qt.instancePrototype):kn=Y.prototype;var Sn=Fe(et,function(...cl){if(Object.getPrototypeOf(this)!==Ei)throw new g(`Use 'new' to construct ${et}`);if(fn.constructor_body===void 0)throw new g(`${et} has no accessible constructor`);var nh=fn.constructor_body[cl.length];if(nh===void 0)throw new g(`Tried to invoke ctor of ${et} with invalid number of parameters (${cl.length}) - expected (${Object.keys(fn.constructor_body).toString()}) parameters instead!`);return nh.apply(this,cl)}),Ei=Object.create(kn,{constructor:{value:Sn}});Sn.prototype=Ei;var fn=new Rt(et,Sn,Ei,Vt,Qt,_e,ye,tt);fn.baseClass&&(fn.baseClass.__derivedClasses??=[],fn.baseClass.__derivedClasses.push(fn));var Ea=new fr(et,fn,!0,!1,!1),eh=new fr(et+"*",fn,!1,!1,!1),th=new fr(et+" const*",fn,!1,!0,!1);return ve[x]={pointerType:eh,constPointerType:th},Ms(xt,Sn),[Ea,eh,th]})},bs=(x,v)=>{for(var D=[],z=0;z<x;z++)D.push(S[v+z*4>>2]);return D};function Sa(x){for(var v=1;v<x.length;++v)if(x[v]!==null&&x[v].destructorFunction===void 0)return!0;return!1}function Ma(x,v,D,z){var Z=Sa(x),_e=x.length-2,Se=[],ye=["fn"];v&&ye.push("thisWired");for(var Pe=0;Pe<_e;++Pe)Se.push(`arg${Pe}`),ye.push(`arg${Pe}Wired`);Se=Se.join(","),ye=ye.join(",");var tt=`return function (${Se}) {
`;Z&&(tt+=`var destructors = [];
`);var et=Z?"destructors":"null",yt=["humanName","throwBindingError","invoker","fn","runDestructors","fromRetWire","toClassParamWire"];v&&(tt+=`var thisWired = toClassParamWire(${et}, this);
`);for(var Pe=0;Pe<_e;++Pe){var Vt=`toArg${Pe}Wire`;tt+=`var arg${Pe}Wired = ${Vt}(${et}, arg${Pe});
`,yt.push(Vt)}if(tt+=(D||z?"var rv = ":"")+`invoker(${ye});
`,Z)tt+=`runDestructors(destructors);
`;else for(var Pe=v?1:2;Pe<x.length;++Pe){var xt=Pe===1?"thisWired":"arg"+(Pe-2)+"Wired";x[Pe].destructorFunction!==null&&(tt+=`${xt}_dtor(${xt});
`,yt.push(`${xt}_dtor`))}return D&&(tt+=`var ret = fromRetWire(rv);
return ret;
`),tt+=`}
`,new Function(yt,tt)}function b(x,v,D,z,Z,_e){var Se=v.length;Se<2&&O("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var ye=v[1]!==null&&D!==null,Pe=Sa(v),tt=!v[0].isVoid,et=v[0],yt=v[1],Vt=[x,O,z,Z,H,et.fromWireType.bind(et),yt?.toWireType.bind(yt)],xt=2;xt<Se;++xt){var Ht=v[xt];Vt.push(Ht.toWireType.bind(Ht))}if(!Pe)for(var xt=ye?1:2;xt<v.length;++xt)v[xt].destructorFunction!==null&&Vt.push(v[xt].destructorFunction);var kn=Ma(v,ye,tt,_e)(...Vt);return Fe(x,kn)}var W=(x,v,D,z,Z,_e)=>{var Se=bs(v,D);Z=Yt(z,Z),Ae([],[x],ye=>{ye=ye[0];var Pe=`constructor ${ye.name}`;if(ye.registeredClass.constructor_body===void 0&&(ye.registeredClass.constructor_body=[]),ye.registeredClass.constructor_body[v-1]!==void 0)throw new g(`Cannot register multiple constructors with identical number of parameters (${v-1}) for class '${ye.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return ye.registeredClass.constructor_body[v-1]=()=>{Ki(`Cannot construct ${ye.name} due to unbound types`,Se)},Ae([],Se,tt=>(tt.splice(1,0,null),ye.registeredClass.constructor_body[v-1]=b(Pe,tt,null,Z,_e),[])),[]})},ue=x=>{x=x.trim();const v=x.indexOf("(");return v===-1?x:x.slice(0,v)},ae=(x,v,D,z,Z,_e,Se,ye,Pe,tt)=>{var et=bs(D,z);v=E(v),v=ue(v),_e=Yt(Z,_e,Pe),Ae([],[x],yt=>{yt=yt[0];var Vt=`${yt.name}.${v}`;v.startsWith("@@")&&(v=Symbol[v.substring(2)]),ye&&yt.registeredClass.pureVirtualFunctions.push(v);function xt(){Ki(`Cannot call ${Vt} due to unbound types`,et)}var Ht=yt.registeredClass.instancePrototype,Qt=Ht[v];return Qt===void 0||Qt.overloadTable===void 0&&Qt.className!==yt.name&&Qt.argCount===D-2?(xt.argCount=D-2,xt.className=yt.name,Ht[v]=xt):(ze(Ht,v,Vt),Ht[v].overloadTable[D-2]=xt),Ae([],et,kn=>{var Sn=b(Vt,kn,yt,_e,Se,Pe);return Ht[v].overloadTable===void 0?(Sn.argCount=D-2,Ht[v]=Sn):Ht[v].overloadTable[D-2]=Sn,[]}),[]})},se=(x,v,D)=>(x instanceof Object||O(`${D} with invalid "this": ${x}`),x instanceof v.registeredClass.constructor||O(`${D} incompatible with "this" of type ${x.constructor.name}`),x.$$.ptr||O(`cannot call emscripten binding method ${D} on deleted object`),pt(x.$$.ptr,x.$$.ptrType.registeredClass,v.registeredClass)),He=(x,v,D,z,Z,_e,Se,ye,Pe,tt)=>{v=E(v),Z=Yt(z,Z),Ae([],[x],et=>{et=et[0];var yt=`${et.name}.${v}`,Vt={get(){Ki(`Cannot access ${yt} due to unbound types`,[D,Se])},enumerable:!0,configurable:!0};return Pe?Vt.set=()=>Ki(`Cannot access ${yt} due to unbound types`,[D,Se]):Vt.set=xt=>O(yt+" is a read-only property"),Object.defineProperty(et.registeredClass.instancePrototype,v,Vt),Ae([],Pe?[D,Se]:[D],xt=>{var Ht=xt[0],Qt={get(){var Sn=se(this,et,yt+" getter");return Ht.fromWireType(Z(_e,Sn))},enumerable:!0};if(Pe){Pe=Yt(ye,Pe);var kn=xt[1];Qt.set=function(Sn){var Ei=se(this,et,yt+" setter"),fn=[];Pe(tt,Ei,kn.toWireType(fn,Sn)),H(fn)}}return Object.defineProperty(et.registeredClass.instancePrototype,v,Qt),[]}),[]})},$e=[],Oe=[0,1,,1,null,1,!0,1,!1,1],Ye=x=>{x>9&&--Oe[x+1]===0&&(Oe[x]=void 0,$e.push(x))},Xe={toValue:x=>(x||O(`Cannot use deleted val. handle = ${x}`),Oe[x]),toHandle:x=>{switch(x){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:{const v=$e.pop()||Oe.length;return Oe[v]=x,Oe[v+1]=1,v}}}},ut={name:"emscripten::val",fromWireType:x=>{var v=Xe.toValue(x);return Ye(x),v},toWireType:(x,v)=>Xe.toHandle(v),readValueFromPointer:ee,destructorFunction:null},ft=x=>ne(x,ut),Ke=(x,v,D)=>{switch(v){case 1:return D?function(z){return this.fromWireType(L[z])}:function(z){return this.fromWireType(M[z])};case 2:return D?function(z){return this.fromWireType(R[z>>1])}:function(z){return this.fromWireType(C[z>>1])};case 4:return D?function(z){return this.fromWireType(F[z>>2])}:function(z){return this.fromWireType(S[z>>2])};default:throw new TypeError(`invalid integer width (${v}): ${x}`)}},St=(x,v,D,z)=>{v=E(v);function Z(){}Z.values={},ne(x,{name:v,constructor:Z,fromWireType:function(_e){return this.constructor.values[_e]},toWireType:(_e,Se)=>Se.value,readValueFromPointer:Ke(v,D,z),destructorFunction:null}),Ve(v,Z)},Ft=(x,v)=>{var D=ce[x];return D===void 0&&O(`${v} has unknown type ${ys(x)}`),D},Dt=(x,v,D)=>{var z=Ft(x,"enum");v=E(v);var Z=z.constructor,_e=Object.create(z.constructor.prototype,{value:{value:D},constructor:{value:Fe(`${z.name}_${v}`,function(){})}});Z.values[D]=_e,Z[v]=_e},Tt=(x,v)=>{switch(v){case 4:return function(D){return this.fromWireType(I[D>>2])};case 8:return function(D){return this.fromWireType(B[D>>3])};default:throw new TypeError(`invalid float width (${v}): ${x}`)}},Kt=(x,v,D)=>{v=E(v),ne(x,{name:v,fromWireType:z=>z,toWireType:(z,Z)=>Z,readValueFromPointer:Tt(v,D),destructorFunction:null})},qe=(x,v,D,z,Z,_e,Se,ye)=>{var Pe=bs(v,D);x=E(x),x=ue(x),Z=Yt(z,Z,Se),Ve(x,function(){Ki(`Cannot call ${x} due to unbound types`,Pe)},v-1),Ae([],Pe,tt=>{var et=[tt[0],null].concat(tt.slice(1));return Ms(x,b(x,et,null,Z,_e,Se),v-1),[]})},Jt=(x,v,D,z,Z)=>{v=E(v);const _e=z===0;let Se=Pe=>Pe;if(_e){var ye=32-8*D;Se=Pe=>Pe<<ye>>>ye,Z=Se(Z)}ne(x,{name:v,fromWireType:Se,toWireType:(Pe,tt)=>tt,readValueFromPointer:Te(v,D,z!==0),destructorFunction:null})},mt=(x,v,D)=>{var z=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array],Z=z[v];function _e(Se){var ye=S[Se>>2],Pe=S[Se+4>>2];return new Z(L.buffer,Pe,ye)}D=E(D),ne(x,{name:D,fromWireType:_e,readValueFromPointer:_e},{ignoreDuplicateRegistrations:!0})},xn=(x,v,D,z)=>{if(!(z>0))return 0;for(var Z=D,_e=D+z-1,Se=0;Se<x.length;++Se){var ye=x.codePointAt(Se);if(ye<=127){if(D>=_e)break;v[D++]=ye}else if(ye<=2047){if(D+1>=_e)break;v[D++]=192|ye>>6,v[D++]=128|ye&63}else if(ye<=65535){if(D+2>=_e)break;v[D++]=224|ye>>12,v[D++]=128|ye>>6&63,v[D++]=128|ye&63}else{if(D+3>=_e)break;v[D++]=240|ye>>18,v[D++]=128|ye>>12&63,v[D++]=128|ye>>6&63,v[D++]=128|ye&63,Se++}}return v[D]=0,D-Z},Dn=(x,v,D)=>xn(x,M,v,D),ei=x=>{for(var v=0,D=0;D<x.length;++D){var z=x.charCodeAt(D);z<=127?v++:z<=2047?v+=2:z>=55296&&z<=57343?(v+=4,++D):v+=3}return v},bi=globalThis.TextDecoder&&new TextDecoder,Mt=(x,v,D,z)=>{var Z=v+D;if(z)return Z;for(;x[v]&&!(v>=Z);)++v;return v},Ot=(x,v=0,D,z)=>{var Z=Mt(x,v,D,z);if(Z-v>16&&x.buffer&&bi)return bi.decode(x.subarray(v,Z));for(var _e="";v<Z;){var Se=x[v++];if(!(Se&128)){_e+=String.fromCharCode(Se);continue}var ye=x[v++]&63;if((Se&224)==192){_e+=String.fromCharCode((Se&31)<<6|ye);continue}var Pe=x[v++]&63;if((Se&240)==224?Se=(Se&15)<<12|ye<<6|Pe:Se=(Se&7)<<18|ye<<12|Pe<<6|x[v++]&63,Se<65536)_e+=String.fromCharCode(Se);else{var tt=Se-65536;_e+=String.fromCharCode(55296|tt>>10,56320|tt&1023)}}return _e},ti=(x,v,D)=>x?Ot(M,x,v,D):"",Ct=(x,v)=>{v=E(v),ne(x,{name:v,fromWireType(D){var z=S[D>>2],Z=D+4,_e;return _e=ti(Z,z,!0),Ji(D),_e},toWireType(D,z){z instanceof ArrayBuffer&&(z=new Uint8Array(z));var Z,_e=typeof z=="string";_e||ArrayBuffer.isView(z)&&z.BYTES_PER_ELEMENT==1||O("Cannot pass non-string to std::string"),_e?Z=ei(z):Z=z.length;var Se=ll(4+Z+1),ye=Se+4;return S[Se>>2]=Z,_e?Dn(z,ye,Z+1):M.set(z,ye),D!==null&&D.push(Ji,Se),Se},readValueFromPointer:ee,destructorFunction(D){Ji(D)}})},Gn=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Zi=(x,v,D)=>{var z=x>>1,Z=Mt(C,z,v/2,D);if(Z-z>16&&Gn)return Gn.decode(C.subarray(z,Z));for(var _e="",Se=z;Se<Z;++Se){var ye=C[Se];_e+=String.fromCharCode(ye)}return _e},ya=(x,v,D)=>{if(D??=2147483647,D<2)return 0;D-=2;for(var z=v,Z=D<x.length*2?D/2:x.length,_e=0;_e<Z;++_e){var Se=x.charCodeAt(_e);R[v>>1]=Se,v+=2}return R[v>>1]=0,v-z},rm=x=>x.length*2,sm=(x,v,D)=>{for(var z="",Z=x>>2,_e=0;!(_e>=v/4);_e++){var Se=S[Z+_e];if(!Se&&!D)break;z+=String.fromCodePoint(Se)}return z},am=(x,v,D)=>{if(D??=2147483647,D<4)return 0;for(var z=v,Z=z+D-4,_e=0;_e<x.length;++_e){var Se=x.codePointAt(_e);if(Se>65535&&_e++,F[v>>2]=Se,v+=4,v+4>Z)break}return F[v>>2]=0,v-z},om=x=>{for(var v=0,D=0;D<x.length;++D){var z=x.codePointAt(D);z>65535&&D++,v+=4}return v},lm=(x,v,D)=>{D=E(D);var z,Z,_e;v===2?(z=Zi,Z=ya,_e=rm):(z=sm,Z=am,_e=om),ne(x,{name:D,fromWireType:Se=>{var ye=S[Se>>2],Pe=z(Se+4,ye*v,!0);return Ji(Se),Pe},toWireType:(Se,ye)=>{typeof ye!="string"&&O(`Cannot pass non-string to C++ string type ${D}`);var Pe=_e(ye),tt=ll(4+Pe+v);return S[tt>>2]=Pe/v,Z(ye,tt+4,Pe+v),Se!==null&&Se.push(Ji,tt),tt},readValueFromPointer:ee,destructorFunction(Se){Ji(Se)}})},cm=(x,v,D,z,Z,_e)=>{k[x]={name:E(v),rawConstructor:Yt(D,z),rawDestructor:Yt(Z,_e),fields:[]}},um=(x,v,D,z,Z,_e,Se,ye,Pe,tt)=>{k[x].fields.push({fieldName:E(v),getterReturnType:D,getter:Yt(z,Z),getterContext:_e,setterArgumentType:Se,setter:Yt(ye,Pe),setterContext:tt})},hm=(x,v)=>{v=E(v),ne(x,{isVoid:!0,name:v,fromWireType:()=>{},toWireType:(D,z)=>{}})},ol=[],fm=x=>{var v=ol.length;return ol.push(x),v},dm=(x,v)=>{for(var D=new Array(x),z=0;z<x;++z)D[z]=Ft(S[v+z*4>>2],`parameter ${z}`);return D},pm=(x,v,D)=>{var z=[],Z=x(z,D);return z.length&&(S[v>>2]=Xe.toHandle(z)),Z},mm={},Ku=x=>{var v=mm[x];return v===void 0?E(x):v},gm=(x,v,D)=>{var z=8,[Z,..._e]=dm(x,v),Se=Z.toWireType.bind(Z),ye=_e.map(xt=>xt.readValueFromPointer.bind(xt));x--;var Pe={toValue:Xe.toValue},tt=ye.map((xt,Ht)=>{var Qt=`argFromPtr${Ht}`;return Pe[Qt]=xt,`${Qt}(args${Ht?"+"+Ht*z:""})`}),et;switch(D){case 0:et="toValue(handle)";break;case 2:et="new (toValue(handle))";break;case 3:et="";break;case 1:Pe.getStringOrSymbol=Ku,et="toValue(handle)[getStringOrSymbol(methodName)]";break}et+=`(${tt})`,Z.isVoid||(Pe.toReturnWire=Se,Pe.emval_returnValue=pm,et=`return emval_returnValue(toReturnWire, destructorsRef, ${et})`),et=`return function (handle, methodName, destructorsRef, args) {
  ${et}
  }`;var yt=new Function(Object.keys(Pe),et)(...Object.values(Pe)),Vt=`methodCaller<(${_e.map(xt=>xt.name)}) => ${Z.name}>`;return fm(Fe(Vt,yt))},_m=(x,v)=>(x=Xe.toValue(x),v=Xe.toValue(v),Xe.toHandle(x[v])),vm=x=>{x>9&&(Oe[x+1]+=1)},xm=(x,v,D,z,Z)=>ol[x](v,D,z,Z),Sm=x=>Xe.toHandle(Ku(x)),Mm=x=>{var v=Xe.toValue(x);H(v),Ye(x)},ym=()=>2147483648,bm=(x,v)=>Math.ceil(x/v)*v,Em=x=>{var v=ba.buffer.byteLength,D=(x-v+65535)/65536|0;try{return ba.grow(D),V(),1}catch{}},Tm=x=>{var v=M.length;x>>>=0;var D=ym();if(x>D)return!1;for(var z=1;z<=4;z*=2){var Z=v*(1+.2/z);Z=Math.min(Z,x+100663296);var _e=Math.min(D,bm(Math.max(x,Z),65536)),Se=Em(_e);if(Se)return!0}return!1};if(ot(),Ss(),t.noExitRuntime&&t.noExitRuntime,t.print&&t.print,t.printErr&&(d=t.printErr),t.wasmBinary&&(_=t.wasmBinary),t.arguments&&t.arguments,t.thisProgram&&t.thisProgram,t.preInit)for(typeof t.preInit=="function"&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.shift()();var Zu,ll,Ji,ba,Ju;function Am(x){Zu=x.F,ll=x.H,Ji=x.I,ba=x.D,Ju=x.G}var wm={h:U,x:G,v:Ie,u:Ce,B:me,e:al,g:W,a:ae,f:He,z:ft,n:St,c:Dt,t:Kt,b:qe,i:Jt,d:mt,A:Ct,q:lm,w:cm,p:um,C:hm,l:gm,m:Ye,r:_m,o:vm,k:xm,s:Sm,j:Mm,y:Tm};function Rm(){Q();function x(){t.calledRun=!0,!y&&(oe(),p?.(t),t.onRuntimeInitialized?.(),j())}t.setStatus?(t.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>t.setStatus(""),1),x()},1)):x()}var Es;Es=await nt(),Rm();function Cm(x){if(x.length%2!=0)throw"MakePath64: intArray.length must be even";const v=x.length/2,D=new BigInt64Array(v*3);for(let Z=0,_e=0;Z<x.length;Z+=2,_e+=3){const Se=x[Z],ye=x[Z+1];D[_e]=typeof Se=="bigint"?Se:BigInt(Se),D[_e+1]=typeof ye=="bigint"?ye:BigInt(ye)}let z=new t.Path64;return z.assign(D),z}t.MakePath64=Cm;function Pm(x){if(x.length%3!=0)throw"MakePathZ64: intArray.length must be multiple of 3";const v=new BigInt64Array(x.length);for(let z=0;z<x.length;z++){const Z=x[z];v[z]=typeof Z=="bigint"?Z:BigInt(Z)}let D=new t.Path64;return D.assign(v),D}t.MakePathZ64=Pm;function Lm(x){if(x.length%2!=0)throw"MakePathD: intArray.length must be even";const v=x.length/2,D=new Float64Array(v*3);for(let Z=0,_e=0;Z<x.length;Z+=2,_e+=3)D[_e]=x[Z],D[_e+1]=x[Z+1];let z=new t.PathD;return z.assign(D),z}t.MakePathD=Lm;function Dm(x){if(x.length%3!=0)throw"MakePathZD: intArray.length must be multiple of 3";const v=x instanceof Float64Array?x:Float64Array.from(x);let D=new t.PathD;return D.assign(v),D}t.MakePathZD=Dm;function Qu(x){const v=x.view(),D=new BigInt64Array(v.length);for(let Z=0;Z<v.length;Z++)D[Z]=BigInt(Math.round(v[Z]));let z=new t.Path64;return z.assign(D),z}t.PathDToPath64=Qu;function ju(x){const v=x.view(),D=new Float64Array(v.length);for(let Z=0;Z<v.length;Z++)D[Z]=Number(v[Z]);let z=new t.PathD;return z.assign(D),z}t.Path64ToPathD=ju;function Im(x){let v=new t.PathsD;for(let D=0;D<x.size();D++){const z=x.get(D);let Z=ju(z);v.push_back(Z),Z.delete(),z.delete()}return v}t.Paths64ToPathsD=Im;function Um(x){let v=new t.Paths64;for(let D=0;D<x.size();D++){const z=x.get(D);let Z=Qu(z);v.push_back(Z),Z.delete(),z.delete()}return v}return t.PathsDToPaths64=Um,re?e=t:e=new Promise((x,v)=>{p=x,T=v}),e}let bl=null;function dv(){return bl||(bl=fv()),bl}function pv(n,e){const t=[];for(const i of e)t.push(i.x,i.y);return n.MakePathD(t)}function kh(n,e){const t=n.PathsD,i=new t;for(const r of e)r.length>=3&&i.push_back(pv(n,r));return i}function mv(n){const e=n.size(),t=[];for(let i=0;i<e;i++){const r=n.get(i);t.push({x:r.x,y:r.y})}return t}function gv(n){const e=[],t=n.size();for(let i=0;i<t;i++)e.push(mv(n.get(i)));return e}async function _v(n,e){const t=await dv(),i=kh(t,n),r=kh(t,e),a=t.IntersectD(i,r,t.FillRule.NonZero,6),o=Math.abs(t.AreaPathsD(a));return{regions:gv(a),area:o,intersects:o>1e-8}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pu="186",Vi={ROTATE:0,DOLLY:1,PAN:2},ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vv=0,Wh=1,xv=2,fo=1,Sv=2,Bs=3,Ir=0,Tn=1,hi=2,Hi=0,qs=1,Xh=2,$h=3,qh=4,Mv=5,es=100,yv=101,bv=102,Ev=103,Tv=104,Av=200,wv=201,Rv=202,Cv=203,fp=204,dp=205,Pv=206,Lv=207,Dv=208,Iv=209,Uv=210,Nv=211,Fv=212,Ov=213,Bv=214,Sc=0,Mc=1,yc=2,ra=3,bc=4,Ec=5,Tc=6,Ac=7,pp=0,zv=1,Vv=2,mi=0,mp=1,gp=2,_p=3,vp=4,xp=5,Sp=6,Mp=7,yp=300,Ur=301,hs=302,El=303,Tl=304,Zo=306,wc=1e3,Oi=1001,Rc=1002,tn=1003,Hv=1004,Da=1005,ln=1006,Al=1007,Cr=1008,Rn=1009,bp=1010,Ep=1011,sa=1012,Lu=1013,vi=1014,fi=1015,xi=1016,Du=1017,Iu=1018,aa=1020,Tp=35902,Ap=35899,wp=1021,Rp=1022,Kn=1023,qi=1026,Pr=1027,Cp=1028,Uu=1029,Nr=1030,Nu=1031,Fu=1033,po=33776,mo=33777,go=33778,_o=33779,Cc=35840,Pc=35841,Lc=35842,Dc=35843,Ic=36196,Uc=37492,Nc=37496,Fc=37488,Oc=37489,Co=37490,Bc=37491,zc=37808,Vc=37809,Hc=37810,Gc=37811,kc=37812,Wc=37813,Xc=37814,$c=37815,qc=37816,Yc=37817,Kc=37818,Zc=37819,Jc=37820,Qc=37821,jc=36492,eu=36494,tu=36495,nu=36283,iu=36284,Po=36285,ru=36286,Gv=3200,su=0,kv=1,rr="",Fn="srgb",Lo="srgb-linear",Do="linear",At="srgb",wl=7680,Wv=519,Xv=512,$v=513,qv=514,Ou=515,Yv=516,Kv=517,Bu=518,Zv=519,Jv=35044,Yh="300 es",di=2e3,oa=2001;function Qv(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Io(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function jv(){const n=Io("canvas");return n.style.display="block",n}const Kh={};function Zh(...n){const e="THREE."+n.shift();console.log(e,...n)}function Pp(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function rt(...n){n=Pp(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function vt(...n){n=Pp(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function os(...n){const e=n.join(" ");e in Kh||(Kh[e]=!0,rt(...n))}function e0(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const t0={[Sc]:Mc,[yc]:Tc,[bc]:Ac,[ra]:Ec,[Mc]:Sc,[Tc]:yc,[Ac]:bc,[Ec]:ra};class ur{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ys=Math.PI/180,au=180/Math.PI;function ms(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function dt(n,e,t){return Math.max(e,Math.min(t,n))}function n0(n,e){return(n%e+e)%e}function Rl(n,e,t){return(1-t)*n+t*e}function ws(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function yn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const i0={DEG2RAD:Ys};class Ue{static{Ue.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class lr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[a+0],d=s[a+1],_=s[a+2],y=s[a+3];if(f!==y||l!==h||c!==d||u!==_){let m=l*h+c*d+u*_+f*y;m<0&&(h=-h,d=-d,_=-_,y=-y,m=-m);let p=1-o;if(m<.9995){const T=Math.acos(m),L=Math.sin(T);p=Math.sin(p*T)/L,o=Math.sin(o*T)/L,l=l*p+h*o,c=c*p+d*o,u=u*p+_*o,f=f*p+y*o}else{l=l*p+h*o,c=c*p+d*o,u=u*p+_*o,f=f*p+y*o;const T=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=T,c*=T,u*=T,f*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],h=s[a+1],d=s[a+2],_=s[a+3];return e[t]=o*_+u*f+l*d-c*h,e[t+1]=l*_+u*h+c*f-o*d,e[t+2]=c*_+u*d+o*h-l*f,e[t+3]=u*_-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),h=l(i/2),d=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*_,this._y=c*d*f-h*u*_,this._z=c*u*_+h*d*f,this._w=c*u*f-h*d*_;break;case"YXZ":this._x=h*u*f+c*d*_,this._y=c*d*f-h*u*_,this._z=c*u*_-h*d*f,this._w=c*u*f+h*d*_;break;case"ZXY":this._x=h*u*f-c*d*_,this._y=c*d*f+h*u*_,this._z=c*u*_+h*d*f,this._w=c*u*f-h*d*_;break;case"ZYX":this._x=h*u*f-c*d*_,this._y=c*d*f+h*u*_,this._z=c*u*_-h*d*f,this._w=c*u*f+h*d*_;break;case"YZX":this._x=h*u*f+c*d*_,this._y=c*d*f+h*u*_,this._z=c*u*_-h*d*f,this._w=c*u*f-h*d*_;break;case"XZY":this._x=h*u*f-c*d*_,this._y=c*d*f-h*u*_,this._z=c*u*_+h*d*f,this._w=c*u*f+h*d*_;break;default:rt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${static{$.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Cl.copy(this).projectOnVector(e),this.sub(Cl)}reflect(e){return this.sub(Cl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Cl=new $,Jh=new lr;class lt{static{lt.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],_=i[8],y=r[0],m=r[3],p=r[6],T=r[1],L=r[4],M=r[7],R=r[2],C=r[5],F=r[8];return s[0]=a*y+o*T+l*R,s[3]=a*m+o*L+l*C,s[6]=a*p+o*M+l*F,s[1]=c*y+u*T+f*R,s[4]=c*m+u*L+f*C,s[7]=c*p+u*M+f*F,s[2]=h*y+d*T+_*R,s[5]=h*m+d*L+_*C,s[8]=h*p+d*M+_*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,_=t*f+i*h+r*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=f*y,e[1]=(r*c-u*i)*y,e[2]=(o*i-r*a)*y,e[3]=h*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=d*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pl.makeScale(e,t)),this}rotate(e){return os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pl.makeRotation(-e)),this}translate(e,t){return os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pl=new lt,Qh=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jh=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function r0(){const n={enabled:!0,workingColorSpace:Lo,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===At&&(r.r=Gi(r.r),r.g=Gi(r.g),r.b=Gi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(r.r=ls(r.r),r.g=ls(r.g),r.b=ls(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===rr?Do:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Lo]:{primaries:e,whitePoint:i,transfer:Do,toXYZ:Qh,fromXYZ:jh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Fn},outputColorSpaceConfig:{drawingBufferColorSpace:Fn}},[Fn]:{primaries:e,whitePoint:i,transfer:At,toXYZ:Qh,fromXYZ:jh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Fn}}}),n}const gt=r0();function Gi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ls(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let zr;class s0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{zr===void 0&&(zr=Io("canvas")),zr.width=e.width,zr.height=e.height;const r=zr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=zr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Io("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Gi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gi(t[i]/255)*255):t[i]=Gi(t[i]);return{data:t,width:e.width,height:e.height}}else return rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let a0=0;class zu{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=ms(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ll(r[a].image)):s.push(Ll(r[a]))}else s=Ll(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ll(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?s0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(rt("Texture: Unable to serialize Texture."),{})}let o0=0;const Dl=new $;class vn extends ur{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,i=Oi,r=Oi,s=ln,a=Cr,o=Kn,l=Rn,c=vn.DEFAULT_ANISOTROPY,u=rr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=ms(),this.name="",this.source=new zu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Dl).x}get height(){return this.source.getSize(Dl).y}get depth(){return this.source.getSize(Dl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){rt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){rt(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wc:e.x=e.x-Math.floor(e.x);break;case Oi:e.x=e.x<0?0:1;break;case Rc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wc:e.y=e.y-Math.floor(e.y);break;case Oi:e.y=e.y<0?0:1;break;case Rc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=yp;vn.DEFAULT_ANISOTROPY=1;class Bt{static{Bt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],_=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-y)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+y)<.1&&Math.abs(_+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const L=(c+1)/2,M=(d+1)/2,R=(p+1)/2,C=(u+h)/4,F=(f+y)/4,S=(_+m)/4;return L>M&&L>R?L<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(L),r=C/i,s=F/i):M>R?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=C/r,s=S/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=F/s,r=S/s),this.set(i,r,s,t),this}let T=Math.sqrt((m-_)*(m-_)+(f-y)*(f-y)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(m-_)/T,this.y=(f-y)/T,this.z=(h-u)/T,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class l0 extends ur{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new vn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new zu(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qn extends l0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Lp extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class c0 extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Nt{static{Nt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,f,h,d,_,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,h,d,_,y,m)}set(e,t,i,r,s,a,o,l,c,u,f,h,d,_,y,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=_,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Nt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Vr.setFromMatrixColumn(e,0).length(),s=1/Vr.setFromMatrixColumn(e,1).length(),a=1/Vr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,d=a*f,_=o*u,y=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+_*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=_+d*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,_=c*u,y=c*f;t[0]=h+y*o,t[4]=_*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-_,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,_=c*u,y=c*f;t[0]=h-y*o,t[4]=-a*f,t[8]=_+d*o,t[1]=d+_*o,t[5]=a*u,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,d=a*f,_=o*u,y=o*f;t[0]=l*u,t[4]=_*c-d,t[8]=h*c+y,t[1]=l*f,t[5]=y*c+h,t[9]=d*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,d=a*c,_=o*l,y=o*c;t[0]=l*u,t[4]=y-h*f,t[8]=_*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+_,t[10]=h-y*f}else if(e.order==="XZY"){const h=a*l,d=a*c,_=o*l,y=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+y,t[5]=a*u,t[9]=d*f-_,t[2]=_*f-d,t[6]=o*u,t[10]=y*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(u0,e,h0)}lookAt(e,t,i){const r=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Qi.crossVectors(i,An),Qi.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Qi.crossVectors(i,An)),Qi.normalize(),Ia.crossVectors(An,Qi),r[0]=Qi.x,r[4]=Ia.x,r[8]=An.x,r[1]=Qi.y,r[5]=Ia.y,r[9]=An.y,r[2]=Qi.z,r[6]=Ia.z,r[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],_=i[2],y=i[6],m=i[10],p=i[14],T=i[3],L=i[7],M=i[11],R=i[15],C=r[0],F=r[4],S=r[8],I=r[12],B=r[1],X=r[5],te=r[9],re=r[13],V=r[2],Q=r[6],oe=r[10],j=r[14],de=r[3],le=r[7],ge=r[11],pe=r[15];return s[0]=a*C+o*B+l*V+c*de,s[4]=a*F+o*X+l*Q+c*le,s[8]=a*S+o*te+l*oe+c*ge,s[12]=a*I+o*re+l*j+c*pe,s[1]=u*C+f*B+h*V+d*de,s[5]=u*F+f*X+h*Q+d*le,s[9]=u*S+f*te+h*oe+d*ge,s[13]=u*I+f*re+h*j+d*pe,s[2]=_*C+y*B+m*V+p*de,s[6]=_*F+y*X+m*Q+p*le,s[10]=_*S+y*te+m*oe+p*ge,s[14]=_*I+y*re+m*j+p*pe,s[3]=T*C+L*B+M*V+R*de,s[7]=T*F+L*X+M*Q+R*le,s[11]=T*S+L*te+M*oe+R*ge,s[15]=T*I+L*re+M*j+R*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],_=e[3],y=e[7],m=e[11],p=e[15],T=l*d-c*h,L=o*d-c*f,M=o*h-l*f,R=a*d-c*u,C=a*h-l*u,F=a*f-o*u;return t*(y*T-m*L+p*M)-i*(_*T-m*R+p*C)+r*(_*L-y*R+p*F)-s*(_*M-y*C+m*F)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],_=e[12],y=e[13],m=e[14],p=e[15],T=t*o-i*a,L=t*l-r*a,M=t*c-s*a,R=i*l-r*o,C=i*c-s*o,F=r*c-s*l,S=u*y-f*_,I=u*m-h*_,B=u*p-d*_,X=f*m-h*y,te=f*p-d*y,re=h*p-d*m,V=T*re-L*te+M*X+R*B-C*I+F*S;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Q=1/V;return e[0]=(o*re-l*te+c*X)*Q,e[1]=(r*te-i*re-s*X)*Q,e[2]=(y*F-m*C+p*R)*Q,e[3]=(h*C-f*F-d*R)*Q,e[4]=(l*B-a*re-c*I)*Q,e[5]=(t*re-r*B+s*I)*Q,e[6]=(m*M-_*F-p*L)*Q,e[7]=(u*F-h*M+d*L)*Q,e[8]=(a*te-o*B+c*S)*Q,e[9]=(i*B-t*te-s*S)*Q,e[10]=(_*C-y*M+p*T)*Q,e[11]=(f*M-u*C-d*T)*Q,e[12]=(o*I-a*X-l*S)*Q,e[13]=(t*X-i*I+r*S)*Q,e[14]=(y*L-_*R-m*T)*Q,e[15]=(u*R-f*L+h*T)*Q,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,_=s*f,y=a*u,m=a*f,p=o*f,T=l*c,L=l*u,M=l*f,R=i.x,C=i.y,F=i.z;return r[0]=(1-(y+p))*R,r[1]=(d+M)*R,r[2]=(_-L)*R,r[3]=0,r[4]=(d-M)*C,r[5]=(1-(h+p))*C,r[6]=(m+T)*C,r[7]=0,r[8]=(_+L)*F,r[9]=(m-T)*F,r[10]=(1-(h+y))*F,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Vr.set(r[0],r[1],r[2]).length();const o=Vr.set(r[4],r[5],r[6]).length(),l=Vr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Xn.copy(this);const c=1/a,u=1/o,f=1/l;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=u,Xn.elements[5]*=u,Xn.elements[6]*=u,Xn.elements[8]*=f,Xn.elements[9]*=f,Xn.elements[10]*=f,t.setFromRotationMatrix(Xn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=di,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let _,y;if(l)_=s/(a-s),y=a*s/(a-s);else if(o===di)_=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===oa)_=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=di,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r);let _,y;if(l)_=1/(a-s),y=a/(a-s);else if(o===di)_=-2/(a-s),y=-(a+s)/(a-s);else if(o===oa)_=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Vr=new $,Xn=new Nt,u0=new $(0,0,0),h0=new $(1,1,1),Qi=new $,Ia=new $,An=new $,ef=new Nt,tf=new lr;class cr{constructor(e=0,t=0,i=0,r=cr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-dt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ef.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ef,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tf.setFromEuler(this),this.setFromQuaternion(tf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cr.DEFAULT_ORDER="XYZ";class Vu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let f0=0;const nf=new $,Hr=new lr,Ai=new Nt,Ua=new $,Rs=new $,d0=new $,p0=new lr,rf=new $(1,0,0),sf=new $(0,1,0),af=new $(0,0,1),of={type:"added"},m0={type:"removed"},Gr={type:"childadded",child:null},Il={type:"childremoved",child:null};class nn extends ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const e=new $,t=new cr,i=new lr,r=new $(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Nt},normalMatrix:{value:new lt}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hr.setFromAxisAngle(e,t),this.quaternion.multiply(Hr),this}rotateOnWorldAxis(e,t){return Hr.setFromAxisAngle(e,t),this.quaternion.premultiply(Hr),this}rotateX(e){return this.rotateOnAxis(rf,e)}rotateY(e){return this.rotateOnAxis(sf,e)}rotateZ(e){return this.rotateOnAxis(af,e)}translateOnAxis(e,t){return nf.copy(e).applyQuaternion(this.quaternion),this.position.add(nf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rf,e)}translateY(e){return this.translateOnAxis(sf,e)}translateZ(e){return this.translateOnAxis(af,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ua.copy(e):Ua.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Rs,Ua,this.up):Ai.lookAt(Ua,Rs,this.up),this.quaternion.setFromRotationMatrix(Ai),r&&(Ai.extractRotation(r.matrixWorld),Hr.setFromRotationMatrix(Ai),this.quaternion.premultiply(Hr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(of),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(m0),Il.child=e,this.dispatchEvent(Il),Il.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(of),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,e,d0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,p0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}nn.DEFAULT_UP=new $(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ns extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const g0={type:"move"};class Ul{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ns,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ns,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ns,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,i),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,_=.005;c.inputState.pinching&&h>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(g0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ns;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Dp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Na={h:0,s:0,l:0};function Nl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class _t{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=gt.workingColorSpace){return this.r=e,this.g=t,this.b=i,gt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=gt.workingColorSpace){if(e=n0(e,1),t=dt(t,0,1),i=dt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Nl(a,s,e+1/3),this.g=Nl(a,s,e),this.b=Nl(a,s,e-1/3)}return gt.colorSpaceToWorking(this,r),this}setStyle(e,t=Fn){function i(s){s!==void 0&&parseFloat(s)<1&&rt("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:rt("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);rt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Fn){const i=Dp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):rt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fn){return gt.workingToColorSpace(an.copy(this),e),Math.round(dt(an.r*255,0,255))*65536+Math.round(dt(an.g*255,0,255))*256+Math.round(dt(an.b*255,0,255))}getHexString(e=Fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(an.copy(this),t);const i=an.r,r=an.g,s=an.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Fn){gt.workingToColorSpace(an.copy(this),e);const t=an.r,i=an.g,r=an.b;return e!==Fn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL(Na);const i=Rl(ji.h,Na.h,t),r=Rl(ji.s,Na.s,t),s=Rl(ji.l,Na.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new _t;_t.NAMES=Dp;class _0 extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cr,this.environmentIntensity=1,this.environmentRotation=new cr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const $n=new $,wi=new $,Fl=new $,Ri=new $,kr=new $,Wr=new $,lf=new $,Ol=new $,Bl=new $,zl=new $,Vl=new Bt,Hl=new Bt,Gl=new Bt;class Bn{constructor(e=new $,t=new $,i=new $){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),$n.subVectors(e,t),r.cross($n);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){$n.subVectors(r,t),wi.subVectors(i,t),Fl.subVectors(e,t);const a=$n.dot($n),o=$n.dot(wi),l=$n.dot(Fl),c=wi.dot(wi),u=wi.dot(Fl),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,_=(a*u-o*l)*h;return s.set(1-d-_,_,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ri.x),l.addScaledVector(a,Ri.y),l.addScaledVector(o,Ri.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Vl.setScalar(0),Hl.setScalar(0),Gl.setScalar(0),Vl.fromBufferAttribute(e,t),Hl.fromBufferAttribute(e,i),Gl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Vl,s.x),a.addScaledVector(Hl,s.y),a.addScaledVector(Gl,s.z),a}static isFrontFacing(e,t,i,r){return $n.subVectors(i,t),wi.subVectors(e,t),$n.cross(wi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),$n.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Bn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;kr.subVectors(r,i),Wr.subVectors(s,i),Ol.subVectors(e,i);const l=kr.dot(Ol),c=Wr.dot(Ol);if(l<=0&&c<=0)return t.copy(i);Bl.subVectors(e,r);const u=kr.dot(Bl),f=Wr.dot(Bl);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(kr,a);zl.subVectors(e,s);const d=kr.dot(zl),_=Wr.dot(zl);if(_>=0&&d<=_)return t.copy(s);const y=d*c-l*_;if(y<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(Wr,o);const m=u*_-d*f;if(m<=0&&f-u>=0&&d-_>=0)return lf.subVectors(s,r),o=(f-u)/(f-u+(d-_)),t.copy(r).addScaledVector(lf,o);const p=1/(m+y+h);return a=y*p,o=h*p,t.copy(i).addScaledVector(kr,a).addScaledVector(Wr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ma{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qn):qn.fromBufferAttribute(s,a),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fa.copy(i.boundingBox)),Fa.applyMatrix4(e.matrixWorld),this.union(Fa)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cs),Oa.subVectors(this.max,Cs),Xr.subVectors(e.a,Cs),$r.subVectors(e.b,Cs),qr.subVectors(e.c,Cs),er.subVectors($r,Xr),tr.subVectors(qr,$r),xr.subVectors(Xr,qr);let t=[0,-er.z,er.y,0,-tr.z,tr.y,0,-xr.z,xr.y,er.z,0,-er.x,tr.z,0,-tr.x,xr.z,0,-xr.x,-er.y,er.x,0,-tr.y,tr.x,0,-xr.y,xr.x,0];return!kl(t,Xr,$r,qr,Oa)||(t=[1,0,0,0,1,0,0,0,1],!kl(t,Xr,$r,qr,Oa))?!1:(Ba.crossVectors(er,tr),t=[Ba.x,Ba.y,Ba.z],kl(t,Xr,$r,qr,Oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ci=[new $,new $,new $,new $,new $,new $,new $,new $],qn=new $,Fa=new ma,Xr=new $,$r=new $,qr=new $,er=new $,tr=new $,xr=new $,Cs=new $,Oa=new $,Ba=new $,Sr=new $;function kl(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Sr.fromArray(n,s);const o=r.x*Math.abs(Sr.x)+r.y*Math.abs(Sr.y)+r.z*Math.abs(Sr.z),l=e.dot(Sr),c=t.dot(Sr),u=i.dot(Sr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const kt=new $,za=new Ue;let v0=0;class ki extends ur{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:v0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Jv,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)za.fromBufferAttribute(this,t),za.applyMatrix3(e),this.setXY(t,za.x,za.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ws(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=yn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ws(t,this.array)),t}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ws(t,this.array)),t}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ws(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ws(t,this.array)),t}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),i=yn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),i=yn(i,this.array),r=yn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),i=yn(i,this.array),r=yn(r,this.array),s=yn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ip extends ki{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Up extends ki{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Wt extends ki{constructor(e,t,i){super(new Float32Array(e),t,i)}}const x0=new ma,Ps=new $,Wl=new $;class Jo{constructor(e=new $,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):x0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ps.subVectors(e,this.center);const t=Ps.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ps,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ps.copy(e.center).add(Wl)),this.expandByPoint(Ps.copy(e.center).sub(Wl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let S0=0;const In=new Nt,Xl=new nn,Yr=new $,wn=new ma,Ls=new ma,Zt=new $;class un extends ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qv(e)?Up:Ip)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new lt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,i){return In.makeTranslation(e,t,i),this.applyMatrix4(In),this}scale(e,t,i){return In.makeScale(e,t,i),this.applyMatrix4(In),this}lookAt(e){return Xl.lookAt(e),Xl.updateMatrix(),this.applyMatrix4(Xl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yr).negate(),this.translate(Yr.x,Yr.y,Yr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Wt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ma);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];wn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(e){const i=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(wn.min,Ls.min),wn.expandByPoint(Zt),Zt.addVectors(wn.max,Ls.max),wn.expandByPoint(Zt)):(wn.expandByPoint(Ls.min),wn.expandByPoint(Ls.max))}wn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Zt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Zt.fromBufferAttribute(o,c),l&&(Yr.fromBufferAttribute(e,c),Zt.add(Yr)),r=Math.max(r,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ki(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let S=0;S<i.count;S++)o[S]=new $,l[S]=new $;const c=new $,u=new $,f=new $,h=new Ue,d=new Ue,_=new Ue,y=new $,m=new $;function p(S,I,B){c.fromBufferAttribute(i,S),u.fromBufferAttribute(i,I),f.fromBufferAttribute(i,B),h.fromBufferAttribute(s,S),d.fromBufferAttribute(s,I),_.fromBufferAttribute(s,B),u.sub(c),f.sub(c),d.sub(h),_.sub(h);const X=1/(d.x*_.y-_.x*d.y);isFinite(X)&&(y.copy(u).multiplyScalar(_.y).addScaledVector(f,-d.y).multiplyScalar(X),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(X),o[S].add(y),o[I].add(y),o[B].add(y),l[S].add(m),l[I].add(m),l[B].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let S=0,I=T.length;S<I;++S){const B=T[S],X=B.start,te=B.count;for(let re=X,V=X+te;re<V;re+=3)p(e.getX(re+0),e.getX(re+1),e.getX(re+2))}const L=new $,M=new $,R=new $,C=new $;function F(S){R.fromBufferAttribute(r,S),C.copy(R);const I=o[S];L.copy(I),L.sub(R.multiplyScalar(R.dot(I))).normalize(),M.crossVectors(C,I);const X=M.dot(l[S])<0?-1:1;a.setXYZW(S,L.x,L.y,L.z,X)}for(let S=0,I=T.length;S<I;++S){const B=T[S],X=B.start,te=B.count;for(let re=X,V=X+te;re<V;re+=3)F(e.getX(re+0)),F(e.getX(re+1)),F(e.getX(re+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new ki(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new $,s=new $,a=new $,o=new $,l=new $,c=new $,u=new $,f=new $;if(e)for(let h=0,d=e.count;h<d;h+=3){const _=e.getX(h+0),y=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,_=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*u;for(let p=0;p<u;p++)h[_++]=c[d++]}return new ki(h,u,f)}if(this.index===null)return rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new un,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $l=new $,M0=new $,y0=new lt;class Ui{constructor(e=new $(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=$l.subVectors(i,t).cross(M0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta($l),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||y0.getNormalMatrix(e),r=this.coplanarPoint($l).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let b0=0;class gs extends ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=ms(),this.name="",this.type="Material",this.blending=qs,this.side=Ir,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fp,this.blendDst=dp,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=ra,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wl,this.stencilZFail=wl,this.stencilZPass=wl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){rt(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){rt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new _t().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ui().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ue().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Pi=new $,ql=new $,Va=new $,Ha=new $;class Qo{constructor(e=new $,t=new $(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ql.copy(e).add(t).multiplyScalar(.5),Va.copy(t).sub(e).normalize(),Ha.copy(this.origin).sub(ql);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Va),o=Ha.dot(this.direction),l=-Ha.dot(Va),c=Ha.lengthSq(),u=Math.abs(1-a*a);let f,h,d,_;if(u>0)if(f=a*l-o,h=a*o-l,_=s*u,f>=0)if(h>=-_)if(h<=_){const y=1/u;f*=y,h*=y,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ql).addScaledVector(Va,h),d}intersectSphere(e,t){if(e.radius<0)return null;Pi.subVectors(e.center,this.origin);const i=Pi.dot(this.direction),r=Pi.dot(Pi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,h=e.y-a.y,d=e.z-a.z,_=t.x-a.x,y=t.y-a.y,m=t.z-a.z,p=i.x-a.x,T=i.y-a.y,L=i.z-a.z,M=Math.abs(l),R=Math.abs(c),C=Math.abs(u);let F,S,I,B,X,te,re,V,Q,oe,j,de;if(M>=R&&M>=C?(I=l,te=f,Q=_,de=p,l>=0?(F=c,S=u,B=h,X=d,re=y,V=m,oe=T,j=L):(F=u,S=c,B=d,X=h,re=m,V=y,oe=L,j=T)):R>=C?(I=c,te=h,Q=y,de=T,c>=0?(F=u,S=l,B=d,X=f,re=m,V=_,oe=L,j=p):(F=l,S=u,B=f,X=d,re=_,V=m,oe=p,j=L)):(I=u,te=d,Q=m,de=L,u>=0?(F=l,S=c,B=f,X=h,re=_,V=y,oe=p,j=T):(F=c,S=l,B=h,X=f,re=y,V=_,oe=T,j=p)),I===0)return null;const le=F/I,ge=S/I,pe=1/I,De=B-le*te,Me=X-ge*te,it=re-le*Q,We=V-ge*Q,nt=oe-le*de,q=j-ge*de,A=nt*We-q*it,J=De*q-Me*nt,Le=it*Me-We*De;if(r){if(A<0||J<0||Le<0)return null}else if((A<0||J<0||Le<0)&&(A>0||J>0||Le>0))return null;const we=A+J+Le;if(we===0)return null;const w=pe*(A*te+J*Q+Le*de);return(we>0?w<0:w>0)?null:this.at(w/we,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ks extends gs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cr,this.combine=pp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cf=new Nt,Mr=new Qo,Ga=new Jo,uf=new $,ka=new $,Wa=new $,Xa=new $,Yl=new $,$a=new $,hf=new $,qa=new $;class Pn extends nn{constructor(e=new un,t=new Ks){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){$a.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Yl.fromBufferAttribute(f,e),a?$a.addScaledVector(Yl,u):$a.addScaledVector(Yl.sub(t),u))}t.add($a)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ga.copy(i.boundingSphere),Ga.applyMatrix4(s),Mr.copy(e.ray).recast(e.near),!(Ga.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(Ga,uf)===null||Mr.origin.distanceToSquared(uf)>(e.far-e.near)**2))&&(cf.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(cf),!(i.boundingBox!==null&&Mr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Mr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){const m=h[_],p=a[m.materialIndex],T=Math.max(m.start,d.start),L=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=T,R=L;M<R;M+=3){const C=o.getX(M),F=o.getX(M+1),S=o.getX(M+2);r=Ya(this,p,e,i,c,u,f,C,F,S),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let m=_,p=y;m<p;m+=3){const T=o.getX(m),L=o.getX(m+1),M=o.getX(m+2);r=Ya(this,a,e,i,c,u,f,T,L,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){const m=h[_],p=a[m.materialIndex],T=Math.max(m.start,d.start),L=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=T,R=L;M<R;M+=3){const C=M,F=M+1,S=M+2;r=Ya(this,p,e,i,c,u,f,C,F,S),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let m=_,p=y;m<p;m+=3){const T=m,L=m+1,M=m+2;r=Ya(this,a,e,i,c,u,f,T,L,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function E0(n,e,t,i,r,s,a,o){let l;if(e.side===Tn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Ir,o),l===null)return null;qa.copy(o),qa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(qa);return c<t.near||c>t.far?null:{distance:c,point:qa.clone(),object:n}}function Ya(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ka),n.getVertexPosition(l,Wa),n.getVertexPosition(c,Xa);const u=E0(n,e,t,i,ka,Wa,Xa,hf);if(u){const f=new $;Bn.getBarycoord(hf,ka,Wa,Xa,f),r&&(u.uv=Bn.getInterpolatedAttribute(r,o,l,c,f,new Ue)),s&&(u.uv1=Bn.getInterpolatedAttribute(s,o,l,c,f,new Ue)),a&&(u.normal=Bn.getInterpolatedAttribute(a,o,l,c,f,new $),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new $,materialIndex:0};Bn.getNormal(ka,Wa,Xa,h.normal),u.face=h,u.barycoord=f}return u}class T0 extends vn{constructor(e=null,t=1,i=1,r,s,a,o,l,c=tn,u=tn,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yr=new Jo,A0=new Ue(.5,.5),Ka=new $;class Hu{constructor(e=new Ui,t=new Ui,i=new Ui,r=new Ui,s=new Ui,a=new Ui){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=di,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],_=s[8],y=s[9],m=s[10],p=s[11],T=s[12],L=s[13],M=s[14],R=s[15];if(r[0].setComponents(c-a,d-u,p-_,R-T).normalize(),r[1].setComponents(c+a,d+u,p+_,R+T).normalize(),r[2].setComponents(c+o,d+f,p+y,R+L).normalize(),r[3].setComponents(c-o,d-f,p-y,R-L).normalize(),i)r[4].setComponents(l,h,m,M).normalize(),r[5].setComponents(c-l,d-h,p-m,R-M).normalize();else if(r[4].setComponents(c-l,d-h,p-m,R-M).normalize(),t===di)r[5].setComponents(c+l,d+h,p+m,R+M).normalize();else if(t===oa)r[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yr)}intersectsSprite(e){yr.center.set(0,0,0);const t=A0.distanceTo(e.center);return yr.radius=.7071067811865476+t,yr.applyMatrix4(e.matrixWorld),this.intersectsSphere(yr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ka.x=r.normal.x>0?e.max.x:e.min.x,Ka.y=r.normal.y>0?e.max.y:e.min.y,Ka.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ka)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class vo extends gs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Uo=new $,No=new $,ff=new Nt,Ds=new Qo,Za=new Jo,Kl=new $,df=new $;class Gu extends nn{constructor(e=new un,t=new vo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Uo.fromBufferAttribute(t,r-1),No.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Uo.distanceTo(No);e.setAttribute("lineDistance",new Wt(i,1))}else rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Za.copy(i.boundingSphere),Za.applyMatrix4(r),Za.radius+=s,e.ray.intersectsSphere(Za)===!1)return;ff.copy(r).invert(),Ds.copy(e.ray).applyMatrix4(ff);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let y=d,m=_-1;y<m;y+=c){const p=u.getX(y),T=u.getX(y+1),L=Ja(this,e,Ds,l,p,T,y);L&&t.push(L)}if(this.isLineLoop){const y=u.getX(_-1),m=u.getX(d),p=Ja(this,e,Ds,l,y,m,_-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let y=d,m=_-1;y<m;y+=c){const p=Ja(this,e,Ds,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){const y=Ja(this,e,Ds,l,_-1,d,_-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ja(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(Uo.fromBufferAttribute(o,r),No.fromBufferAttribute(o,s),t.distanceSqToSegment(Uo,No,Kl,df)>i)return;Kl.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Kl);if(!(c<e.near||c>e.far))return{distance:c,point:df.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const pf=new $,mf=new $;class w0 extends Gu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)pf.fromBufferAttribute(t,r),mf.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+pf.distanceTo(mf);e.setAttribute("lineDistance",new Wt(i,1))}else rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class R0 extends Gu{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Np extends vn{constructor(e=[],t=Ur,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class la extends vn{constructor(e,t,i=vi,r,s,a,o=tn,l=tn,c,u=qi,f=1){if(u!==qi&&u!==Pr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class C0 extends la{constructor(e,t=vi,i=Ur,r,s,a=tn,o=tn,l,c=qi){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Fp extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ga extends un{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(f,2));function _(y,m,p,T,L,M,R,C,F,S,I){const B=M/F,X=R/S,te=M/2,re=R/2,V=C/2,Q=F+1,oe=S+1;let j=0,de=0;const le=new $;for(let ge=0;ge<oe;ge++){const pe=ge*X-re;for(let De=0;De<Q;De++){const Me=De*B-te;le[y]=Me*T,le[m]=pe*L,le[p]=V,c.push(le.x,le.y,le.z),le[y]=0,le[m]=0,le[p]=C>0?1:-1,u.push(le.x,le.y,le.z),f.push(De/F),f.push(1-ge/S),j+=1}}for(let ge=0;ge<S;ge++)for(let pe=0;pe<F;pe++){const De=h+pe+Q*ge,Me=h+pe+Q*(ge+1),it=h+(pe+1)+Q*(ge+1),We=h+(pe+1)+Q*ge;l.push(De,Me,We),l.push(Me,it,We),de+=6}o.addGroup(d,de,I),d+=de,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Qa=new $,ja=new $,Zl=new $,eo=new Bn;class P0 extends un{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(Ys*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},d=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:y,b:m,c:p}=eo;if(y.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),eo.getNormal(Zl),f[0]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,f[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,f[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let T=0;T<3;T++){const L=(T+1)%3,M=f[T],R=f[L],C=eo[u[T]],F=eo[u[L]],S=`${M}_${R}`,I=`${R}_${M}`;I in h&&h[I]?(Zl.dot(h[I].normal)<=s&&(d.push(C.x,C.y,C.z),d.push(F.x,F.y,F.z)),h[I]=null):S in h||(h[S]={index0:c[T],index1:c[L],normal:Zl.clone()})}}for(const _ in h)if(h[_]){const{index0:y,index1:m}=h[_];Qa.fromBufferAttribute(o,y),ja.fromBufferAttribute(o,m),d.push(Qa.x,Qa.y,Qa.z),d.push(ja.x,ja.y,ja.z)}this.setAttribute("position",new Wt(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Mi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){rt("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],h=i[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Ue:new $);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new $,r=[],s=[],a=[],o=new $,l=new Nt;for(let d=0;d<=e;d++){const _=d/e;r[d]=this.getTangentAt(_,new $)}s[0]=new $,a[0]=new $;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(dt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,_))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(dt(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(r[_],d*_)),a[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ku extends Mi{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ue){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class L0 extends ku{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Wu(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const gf=new $,_f=new $,Jl=new Wu,Ql=new Wu,jl=new Wu;class D0 extends Mi{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new $){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(_f.subVectors(r[0],r[1]).add(r[0]),c=_f);const f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(gf.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=gf),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(f),d),y=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);y<1e-4&&(y=1),_<1e-4&&(_=y),m<1e-4&&(m=y),Jl.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,_,y,m),Ql.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,_,y,m),jl.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,_,y,m)}else this.curveType==="catmullrom"&&(Jl.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Ql.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),jl.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(Jl.calc(l),Ql.calc(l),jl.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new $().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function vf(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function I0(n,e){const t=1-n;return t*t*e}function U0(n,e){return 2*(1-n)*n*e}function N0(n,e){return n*n*e}function Zs(n,e,t,i){return I0(n,e)+U0(n,t)+N0(n,i)}function F0(n,e){const t=1-n;return t*t*t*e}function O0(n,e){const t=1-n;return 3*t*t*n*e}function B0(n,e){return 3*(1-n)*n*n*e}function z0(n,e){return n*n*n*e}function Js(n,e,t,i,r){return F0(n,e)+O0(n,t)+B0(n,i)+z0(n,r)}class Op extends Mi{constructor(e=new Ue,t=new Ue,i=new Ue,r=new Ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Ue){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Js(e,r.x,s.x,a.x,o.x),Js(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class V0 extends Mi{constructor(e=new $,t=new $,i=new $,r=new $){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new $){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Js(e,r.x,s.x,a.x,o.x),Js(e,r.y,s.y,a.y,o.y),Js(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Bp extends Mi{constructor(e=new Ue,t=new Ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ue){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class H0 extends Mi{constructor(e=new $,t=new $){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new $){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new $){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zp extends Mi{constructor(e=new Ue,t=new Ue,i=new Ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ue){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Zs(e,r.x,s.x,a.x),Zs(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class G0 extends Mi{constructor(e=new $,t=new $,i=new $){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new $){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Zs(e,r.x,s.x,a.x),Zs(e,r.y,s.y,a.y),Zs(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vp extends Mi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ue){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(vf(o,l.x,c.x,u.x,f.x),vf(o,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Ue().fromArray(r))}return this}}var ou=Object.freeze({__proto__:null,ArcCurve:L0,CatmullRomCurve3:D0,CubicBezierCurve:Op,CubicBezierCurve3:V0,EllipseCurve:ku,LineCurve:Bp,LineCurve3:H0,QuadraticBezierCurve:zp,QuadraticBezierCurve3:G0,SplineCurve:Vp});class k0 extends Mi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ou[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new ou[r.type]().fromJSON(r))}return this}}class xf extends k0{constructor(e){super(),this.type="Path",this.currentPoint=new Ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Bp(this.currentPoint.clone(),new Ue(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new zp(this.currentPoint.clone(),new Ue(e,t),new Ue(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Op(this.currentPoint.clone(),new Ue(e,t),new Ue(i,r),new Ue(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Vp(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new ku(e,t,i,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Fo extends xf{constructor(e){super(e),this.uuid=ms(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new xf().fromJSON(r))}return this}}function W0(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Hp(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=K0(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,f=l;for(let h=t;h<r;h+=t){const d=n[h],_=n[h+1];d<o&&(o=d),_<l&&(l=_),d>u&&(u=d),_>f&&(f=_)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return ca(s,a,t,o,l,c,0),a}function Hp(n,e,t,i,r){let s;if(r===ax(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Sf(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Sf(a/i|0,n[a],n[a+1],s);return s&&fs(s,s.next)&&(ha(s),s=s.next),s}function Fr(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(fs(t,t.next)||zt(t.prev,t,t.next)===0)){if(ha(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function ca(n,e,t,i,r,s,a){if(!n)return;!a&&s&&ex(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?$0(n,i,r,s):X0(n)){e.push(l.i,n.i,c.i),ha(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=q0(Fr(n),e),ca(n,e,t,i,r,s,2)):a===2&&Y0(n,e,t,i,r,s):ca(Fr(n),e,t,i,r,s,1);break}}}function X0(n){const e=n.prev,t=n,i=n.next;if(zt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),f=Math.min(o,l,c),h=Math.max(r,s,a),d=Math.max(o,l,c);let _=i.next;for(;_!==e;){if(_.x>=u&&_.x<=h&&_.y>=f&&_.y<=d&&zs(r,o,s,l,a,c,_.x,_.y)&&zt(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function $0(n,e,t,i){const r=n.prev,s=n,a=n.next;if(zt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,f=s.y,h=a.y,d=Math.min(o,l,c),_=Math.min(u,f,h),y=Math.max(o,l,c),m=Math.max(u,f,h),p=lu(d,_,e,t,i),T=lu(y,m,e,t,i);let L=n.prevZ,M=n.nextZ;for(;L&&L.z>=p&&M&&M.z<=T;){if(L.x>=d&&L.x<=y&&L.y>=_&&L.y<=m&&L!==r&&L!==a&&zs(o,u,l,f,c,h,L.x,L.y)&&zt(L.prev,L,L.next)>=0||(L=L.prevZ,M.x>=d&&M.x<=y&&M.y>=_&&M.y<=m&&M!==r&&M!==a&&zs(o,u,l,f,c,h,M.x,M.y)&&zt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;L&&L.z>=p;){if(L.x>=d&&L.x<=y&&L.y>=_&&L.y<=m&&L!==r&&L!==a&&zs(o,u,l,f,c,h,L.x,L.y)&&zt(L.prev,L,L.next)>=0)return!1;L=L.prevZ}for(;M&&M.z<=T;){if(M.x>=d&&M.x<=y&&M.y>=_&&M.y<=m&&M!==r&&M!==a&&zs(o,u,l,f,c,h,M.x,M.y)&&zt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function q0(n,e){let t=n;do{const i=t.prev,r=t.next.next;!fs(i,r)&&kp(i,t,t.next,r)&&ua(i,r)&&ua(r,i)&&(e.push(i.i,t.i,r.i),ha(t),ha(t.next),t=n=r),t=t.next}while(t!==n);return Fr(t)}function Y0(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ix(a,o)){let l=Wp(a,o);a=Fr(a,a.next),l=Fr(l,l.next),ca(a,e,t,i,r,s,0),ca(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function K0(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=Hp(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(nx(c))}r.sort(Z0);for(let s=0;s<r.length;s++)t=J0(r[s],t);return t}function Z0(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function J0(n,e){const t=Q0(n,e);if(!t)return e;const i=Wp(t,n);return Fr(i,i.next),Fr(t,t.next)}function Q0(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(fs(n,t))return t;do{if(fs(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Gp(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const f=Math.abs(r-t.y)/(i-t.x);ua(t,n)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&j0(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function j0(n,e){return zt(n.prev,n,e.prev)<0&&zt(e.next,n,n.next)<0}function ex(n,e,t,i){let r=n;do r.z===0&&(r.z=lu(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,tx(r)}function tx(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function lu(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function nx(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Gp(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function zs(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&Gp(n,e,t,i,r,s,a,o)}function ix(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!rx(n,e)&&(ua(n,e)&&ua(e,n)&&sx(n,e)&&(zt(n.prev,n,e.prev)||zt(n,e.prev,e))||fs(n,e)&&zt(n.prev,n,n.next)>0&&zt(e.prev,e,e.next)>0)}function zt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function fs(n,e){return n.x===e.x&&n.y===e.y}function kp(n,e,t,i){const r=no(zt(n,e,t)),s=no(zt(n,e,i)),a=no(zt(t,i,n)),o=no(zt(t,i,e));return!!(r!==s&&a!==o||r===0&&to(n,t,e)||s===0&&to(n,i,e)||a===0&&to(t,n,i)||o===0&&to(t,e,i))}function to(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function no(n){return n>0?1:n<0?-1:0}function rx(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&kp(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function ua(n,e){return zt(n.prev,n,n.next)<0?zt(n,e,n.next)>=0&&zt(n,n.prev,e)>=0:zt(n,e,n.prev)<0||zt(n,n.next,e)<0}function sx(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Wp(n,e){const t=cu(n.i,n.x,n.y),i=cu(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Sf(n,e,t,i){const r=cu(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ha(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function cu(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ax(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class ox{static triangulate(e,t,i=2){return W0(e,t,i)}}class Bi{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Bi.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Mf(e),yf(i,e);let a=e.length;t.forEach(Mf);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,yf(i,t[l]);const o=ox.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Mf(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function yf(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Xu extends un{constructor(e=new Fo([new Ue(.5,.5),new Ue(-.5,.5),new Ue(-.5,-.5),new Ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Wt(r,3)),this.setAttribute("uv",new Wt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,_=t.bevelSize!==void 0?t.bevelSize:d-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:lx;let L,M=!1,R,C,F,S;if(p){L=p.getSpacedPoints(u),M=!0,h=!1;const U=p.isCatmullRomCurve3?p.closed:!1;R=p.computeFrenetFrames(u,U),C=new $,F=new $,S=new $}h||(m=0,d=0,_=0,y=0);const I=o.extractPoints(c);let B=I.shape;const X=I.holes;if(!Bi.isClockWise(B)){B=B.reverse();for(let U=0,G=X.length;U<G;U++){const k=X[U];Bi.isClockWise(k)&&(X[U]=k.reverse())}}function re(U){const k=10000000000000001e-36;let H=U[0];for(let ee=1;ee<=U.length;ee++){const fe=ee%U.length,ce=U[fe],ie=ce.x-H.x,Ee=ce.y-H.y,P=ie*ie+Ee*Ee,Ae=Math.max(Math.abs(ce.x),Math.abs(ce.y),Math.abs(H.x),Math.abs(H.y)),Ie=k*Ae*Ae;if(P<=Ie){U.splice(fe,1),ee--;continue}H=ce}}re(B),X.forEach(re);const V=X.length,Q=B;for(let U=0;U<V;U++){const G=X[U];B=B.concat(G)}function oe(U,G,k){return G||vt("ExtrudeGeometry: vec does not exist"),U.clone().addScaledVector(G,k)}const j=B.length;function de(U,G,k){let H,ee,fe;const ce=U.x-G.x,ie=U.y-G.y,Ee=k.x-U.x,P=k.y-U.y,Ae=ce*ce+ie*ie,Ie=ce*P-ie*Ee;if(Math.abs(Ie)>Number.EPSILON){const E=Math.sqrt(Ae),g=Math.sqrt(Ee*Ee+P*P),O=G.x-ie/E,K=G.y+ce/E,ne=k.x-P/g,Te=k.y+Ee/g,Ce=((ne-O)*P-(Te-K)*Ee)/(ce*P-ie*Ee);H=O+ce*Ce-U.x,ee=K+ie*Ce-U.y;const me=H*H+ee*ee;if(me<=2)return new Ue(H,ee);fe=Math.sqrt(me/2)}else{let E=!1;ce>Number.EPSILON?Ee>Number.EPSILON&&(E=!0):ce<-Number.EPSILON?Ee<-Number.EPSILON&&(E=!0):Math.sign(ie)===Math.sign(P)&&(E=!0),E?(H=-ie,ee=ce,fe=Math.sqrt(Ae)):(H=ce,ee=ie,fe=Math.sqrt(Ae/2))}return new Ue(H/fe,ee/fe)}const le=[];for(let U=0,G=Q.length,k=G-1,H=U+1;U<G;U++,k++,H++)k===G&&(k=0),H===G&&(H=0),le[U]=de(Q[U],Q[k],Q[H]);const ge=[];let pe,De=le.concat();for(let U=0,G=V;U<G;U++){const k=X[U];pe=[];for(let H=0,ee=k.length,fe=ee-1,ce=H+1;H<ee;H++,fe++,ce++)fe===ee&&(fe=0),ce===ee&&(ce=0),pe[H]=de(k[H],k[fe],k[ce]);ge.push(pe),De=De.concat(pe)}let Me;if(m===0)Me=Bi.triangulateShape(Q,X);else{const U=[],G=[];for(let k=0;k<m;k++){const H=k/m,ee=d*Math.cos(H*Math.PI/2),fe=_*Math.sin(H*Math.PI/2)+y;for(let ce=0,ie=Q.length;ce<ie;ce++){const Ee=oe(Q[ce],le[ce],fe);J(Ee.x,Ee.y,-ee),H===0&&U.push(Ee)}for(let ce=0,ie=V;ce<ie;ce++){const Ee=X[ce];pe=ge[ce];const P=[];for(let Ae=0,Ie=Ee.length;Ae<Ie;Ae++){const E=oe(Ee[Ae],pe[Ae],fe);J(E.x,E.y,-ee),H===0&&P.push(E)}H===0&&G.push(P)}}Me=Bi.triangulateShape(U,G)}const it=Me.length,We=_+y;for(let U=0;U<j;U++){const G=h?oe(B[U],De[U],We):B[U];M?(F.copy(R.normals[0]).multiplyScalar(G.x),C.copy(R.binormals[0]).multiplyScalar(G.y),S.copy(L[0]).add(F).add(C),J(S.x,S.y,S.z)):J(G.x,G.y,0)}for(let U=1;U<=u;U++)for(let G=0;G<j;G++){const k=h?oe(B[G],De[G],We):B[G];M?(F.copy(R.normals[U]).multiplyScalar(k.x),C.copy(R.binormals[U]).multiplyScalar(k.y),S.copy(L[U]).add(F).add(C),J(S.x,S.y,S.z)):J(k.x,k.y,f/u*U)}for(let U=m-1;U>=0;U--){const G=U/m,k=d*Math.cos(G*Math.PI/2),H=_*Math.sin(G*Math.PI/2)+y;for(let ee=0,fe=Q.length;ee<fe;ee++){const ce=oe(Q[ee],le[ee],H);J(ce.x,ce.y,f+k)}for(let ee=0,fe=X.length;ee<fe;ee++){const ce=X[ee];pe=ge[ee];for(let ie=0,Ee=ce.length;ie<Ee;ie++){const P=oe(ce[ie],pe[ie],H);M?J(P.x,P.y+L[u-1].y,L[u-1].x+k):J(P.x,P.y,f+k)}}}nt(),q();function nt(){const U=r.length/3;if(h){let G=0,k=j*G;for(let H=0;H<it;H++){const ee=Me[H];Le(ee[2]+k,ee[1]+k,ee[0]+k)}G=u+m*2,k=j*G;for(let H=0;H<it;H++){const ee=Me[H];Le(ee[0]+k,ee[1]+k,ee[2]+k)}}else{for(let G=0;G<it;G++){const k=Me[G];Le(k[2],k[1],k[0])}for(let G=0;G<it;G++){const k=Me[G];Le(k[0]+j*u,k[1]+j*u,k[2]+j*u)}}i.addGroup(U,r.length/3-U,0)}function q(){const U=r.length/3;let G=0;A(Q,G),G+=Q.length;for(let k=0,H=X.length;k<H;k++){const ee=X[k];A(ee,G),G+=ee.length}i.addGroup(U,r.length/3-U,1)}function A(U,G){let k=U.length;for(;--k>=0;){const H=k;let ee=k-1;ee<0&&(ee=U.length-1);for(let fe=0,ce=u+m*2;fe<ce;fe++){const ie=j*fe,Ee=j*(fe+1),P=G+H+ie,Ae=G+ee+ie,Ie=G+ee+Ee,E=G+H+Ee;we(P,Ae,Ie,E)}}}function J(U,G,k){l.push(U),l.push(G),l.push(k)}function Le(U,G,k){w(U),w(G),w(k);const H=r.length/3,ee=T.generateTopUV(i,r,H-3,H-2,H-1);N(ee[0]),N(ee[1]),N(ee[2])}function we(U,G,k,H){w(U),w(G),w(H),w(G),w(k),w(H);const ee=r.length/3,fe=T.generateSideWallUV(i,r,ee-6,ee-3,ee-2,ee-1);N(fe[0]),N(fe[1]),N(fe[3]),N(fe[1]),N(fe[2]),N(fe[3])}function w(U){r.push(l[U*3+0]),r.push(l[U*3+1]),r.push(l[U*3+2])}function N(U){s.push(U.x),s.push(U.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return cx(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ou[r.type]().fromJSON(r)),new Xu(i,e.options)}}const lx={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new Ue(s,a),new Ue(o,l),new Ue(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],h=e[r*3],d=e[r*3+1],_=e[r*3+2],y=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new Ue(a,1-l),new Ue(c,1-f),new Ue(h,1-_),new Ue(y,1-p)]:[new Ue(o,1-l),new Ue(u,1-f),new Ue(d,1-_),new Ue(m,1-p)]}};function cx(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class jo extends un{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],_=[],y=[],m=[];for(let p=0;p<u;p++){const T=p*h-a;for(let L=0;L<c;L++){const M=L*f-s;_.push(M,-T,0),y.push(0,0,1),m.push(L/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const L=T+c*p,M=T+c*(p+1),R=T+1+c*(p+1),C=T+1+c*p;d.push(L,M,C),d.push(M,R,C)}this.setIndex(d),this.setAttribute("position",new Wt(_,3)),this.setAttribute("normal",new Wt(y,3)),this.setAttribute("uv",new Wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.width,e.height,e.widthSegments,e.heightSegments)}}class $u extends un{constructor(e=new Fo([new Ue(0,.5),new Ue(-.5,-.5),new Ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new Wt(r,3)),this.setAttribute("normal",new Wt(s,3)),this.setAttribute("uv",new Wt(a,2));function c(u){const f=r.length/3,h=u.extractPoints(t);let d=h.shape;const _=h.holes;Bi.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=_.length;m<p;m++){const T=_[m];Bi.isClockWise(T)===!0&&(_[m]=T.reverse())}const y=Bi.triangulateShape(d,_);for(let m=0,p=_.length;m<p;m++){const T=_[m];d=d.concat(T)}for(let m=0,p=d.length;m<p;m++){const T=d[m];r.push(T.x,T.y,0),s.push(0,0,1),a.push(T.x,T.y)}for(let m=0,p=y.length;m<p;m++){const T=y[m],L=T[0]+f,M=T[1]+f,R=T[2]+f;i.push(L,M,R),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return ux(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];i.push(a)}return new $u(i,e.curveSegments)}}function ux(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}class Oo extends un{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new $,h=new $,d=[],_=[],y=[],m=[];for(let p=0;p<=i;p++){const T=[],L=p/i,M=a+L*o,R=e*Math.cos(M),C=Math.sqrt(e*e-R*R);let F=0;p===0&&a===0?F=.5/t:p===i&&l===Math.PI&&(F=-.5/t);for(let S=0;S<=t;S++){const I=S/t,B=r+I*s;f.x=-C*Math.cos(B),f.y=R,f.z=C*Math.sin(B),_.push(f.x,f.y,f.z),h.copy(f).normalize(),y.push(h.x,h.y,h.z),m.push(I+F,1-L),T.push(c++)}u.push(T)}for(let p=0;p<i;p++)for(let T=0;T<t;T++){const L=u[p][T+1],M=u[p][T],R=u[p+1][T],C=u[p+1][T+1];(p!==0||a>0)&&d.push(L,M,C),(p!==i-1||l<Math.PI)&&d.push(M,R,C)}this.setIndex(d),this.setAttribute("position",new Wt(_,3)),this.setAttribute("normal",new Wt(y,3)),this.setAttribute("uv",new Wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ds(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(bf(r))r.isRenderTargetTexture?(rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(bf(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function mn(n){const e={};for(let t=0;t<n.length;t++){const i=ds(n[t]);for(const r in i)e[r]=i[r]}return e}function bf(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function hx(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Xp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}const fx={clone:ds,merge:mn};var dx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,px=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Si extends gs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dx,this.fragmentShader=px,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=hx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new _t().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ue().fromArray(r.value);break;case"v3":this.uniforms[i].value=new $().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Bt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new lt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Nt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class mx extends Si{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gx extends gs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=su,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _x extends gs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vx extends gs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class $p extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new _t(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ec=new Nt,Ef=new $,Tf=new $;class xx{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new Nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hu,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Ef.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ef),Tf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Tf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){ec.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(ec,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===oa||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ec)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const io=new $,ro=new lr,ri=new $;class qp extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(io,ro,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(io,ro,ri.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(io,ro,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(io,ro,ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const nr=new $,Af=new Ue,wf=new Ue;class Yn extends qp{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=au*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return au*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){nr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(nr.x,nr.y).multiplyScalar(-e/nr.z),nr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(nr.x,nr.y).multiplyScalar(-e/nr.z)}getViewSize(e,t){return this.getViewBounds(e,Af,wf),t.subVectors(wf,Af)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ys*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class el extends qp{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Sx extends xx{constructor(){super(new el(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mx extends $p{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new Sx}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class yx extends $p{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Kr=-90,Zr=1;class bx extends nn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Yn(Kr,Zr,e,t);r.layers=this.layers,this.add(r);const s=new Yn(Kr,Zr,e,t);s.layers=this.layers,this.add(s);const a=new Yn(Kr,Zr,e,t);a.layers=this.layers,this.add(a);const o=new Yn(Kr,Zr,e,t);o.layers=this.layers,this.add(o);const l=new Yn(Kr,Zr,e,t);l.layers=this.layers,this.add(l);const c=new Yn(Kr,Zr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===di)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===oa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Ex extends Yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Rf=new Nt;class Tx{constructor(e,t,i=0,r=1/0){this.ray=new Qo(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Vu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):vt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Rf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rf),this}intersectObject(e,t=!0,i=[]){return uu(e,this,i,t),i.sort(Cf),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)uu(e[r],this,i,t);return i.sort(Cf),i}}function Cf(n,e){return n.distance-e.distance}function uu(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)uu(s[a],e,t,!0)}}class Pf{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=dt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(dt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Yp{static{Yp.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}class Ax extends ur{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Lf(n,e,t,i){const r=wx(i);switch(t){case wp:return n*e;case Cp:return n*e/r.components*r.byteLength;case Uu:return n*e/r.components*r.byteLength;case Nr:return n*e*2/r.components*r.byteLength;case Nu:return n*e*2/r.components*r.byteLength;case Rp:return n*e*3/r.components*r.byteLength;case Kn:return n*e*4/r.components*r.byteLength;case Fu:return n*e*4/r.components*r.byteLength;case po:case mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case go:case _o:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Pc:case Dc:return Math.max(n,16)*Math.max(e,8)/4;case Cc:case Lc:return Math.max(n,8)*Math.max(e,8)/2;case Ic:case Uc:case Fc:case Oc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Nc:case Co:case Bc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Vc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Hc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case kc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Wc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Xc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case $c:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case qc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Yc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Kc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Zc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Jc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Qc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case jc:case eu:case tu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case nu:case iu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Po:case ru:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wx(n){switch(n){case Rn:case bp:return{byteLength:1,components:1};case sa:case Ep:case xi:return{byteLength:2,components:1};case Du:case Iu:return{byteLength:2,components:4};case vi:case Lu:case fi:return{byteLength:4,components:1};case Tp:case Ap:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pu}}));typeof window<"u"&&(window.__THREE__?rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kp(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Rx(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,_)=>d.start-_.start);let h=0;for(let d=1;d<f.length;d++){const _=f[h],y=f[d];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++h,f[h]=y)}f.length=h+1;for(let d=0,_=f.length;d<_;d++){const y=f[d];n.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Cx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Px=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ix=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ux=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ox=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Bx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,kx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Qx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,eS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,tS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,iS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sS="gl_FragColor = linearToOutputTexel( gl_FragColor );",aS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,oS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,lS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,uS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_S=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,SS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,MS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,yS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ES=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,TS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,AS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,RS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,CS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,PS=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,LS=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,DS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,IS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,US=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,FS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,OS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,BS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,VS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,HS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,GS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,WS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,XS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$S=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,YS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,KS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,QS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,eM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,sM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,aM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,oM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,fM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,pM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_M=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,SM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,MM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,EM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,TM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,AM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,RM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const CM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,PM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,FM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,OM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,BM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,zM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,VM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,GM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,WM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$M=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,YM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ZM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,JM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ey=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ty=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ny=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ry=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ay=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,oy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ly=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:Cx,alphahash_pars_fragment:Px,alphamap_fragment:Lx,alphamap_pars_fragment:Dx,alphatest_fragment:Ix,alphatest_pars_fragment:Ux,aomap_fragment:Nx,aomap_pars_fragment:Fx,batching_pars_vertex:Ox,batching_vertex:Bx,begin_vertex:zx,beginnormal_vertex:Vx,bsdfs:Hx,iridescence_fragment:Gx,bumpmap_pars_fragment:kx,clipping_planes_fragment:Wx,clipping_planes_pars_fragment:Xx,clipping_planes_pars_vertex:$x,clipping_planes_vertex:qx,color_fragment:Yx,color_pars_fragment:Kx,color_pars_vertex:Zx,color_vertex:Jx,common:Qx,cube_uv_reflection_fragment:jx,defaultnormal_vertex:eS,displacementmap_pars_vertex:tS,displacementmap_vertex:nS,emissivemap_fragment:iS,emissivemap_pars_fragment:rS,colorspace_fragment:sS,colorspace_pars_fragment:aS,envmap_fragment:oS,envmap_common_pars_fragment:lS,envmap_pars_fragment:cS,envmap_pars_vertex:uS,envmap_physical_pars_fragment:MS,envmap_vertex:hS,fog_vertex:fS,fog_pars_vertex:dS,fog_fragment:pS,fog_pars_fragment:mS,gradientmap_pars_fragment:gS,lightmap_pars_fragment:_S,lights_lambert_fragment:vS,lights_lambert_pars_fragment:xS,lights_pars_begin:SS,lights_toon_fragment:yS,lights_toon_pars_fragment:bS,lights_phong_fragment:ES,lights_phong_pars_fragment:TS,lights_physical_fragment:AS,lights_physical_pars_fragment:wS,lights_fragment_begin:RS,lights_fragment_maps:CS,lights_fragment_end:PS,lightprobes_pars_fragment:LS,logdepthbuf_fragment:DS,logdepthbuf_pars_fragment:IS,logdepthbuf_pars_vertex:US,logdepthbuf_vertex:NS,map_fragment:FS,map_pars_fragment:OS,map_particle_fragment:BS,map_particle_pars_fragment:zS,metalnessmap_fragment:VS,metalnessmap_pars_fragment:HS,morphinstance_vertex:GS,morphcolor_vertex:kS,morphnormal_vertex:WS,morphtarget_pars_vertex:XS,morphtarget_vertex:$S,normal_fragment_begin:qS,normal_fragment_maps:YS,normal_pars_fragment:KS,normal_pars_vertex:ZS,normal_vertex:JS,normalmap_pars_fragment:QS,clearcoat_normal_fragment_begin:jS,clearcoat_normal_fragment_maps:eM,clearcoat_pars_fragment:tM,iridescence_pars_fragment:nM,opaque_fragment:iM,packing:rM,premultiplied_alpha_fragment:sM,project_vertex:aM,dithering_fragment:oM,dithering_pars_fragment:lM,roughnessmap_fragment:cM,roughnessmap_pars_fragment:uM,shadowmap_pars_fragment:hM,shadowmap_pars_vertex:fM,shadowmap_vertex:dM,shadowmask_pars_fragment:pM,skinbase_vertex:mM,skinning_pars_vertex:gM,skinning_vertex:_M,skinnormal_vertex:vM,specularmap_fragment:xM,specularmap_pars_fragment:SM,tonemapping_fragment:MM,tonemapping_pars_fragment:yM,transmission_fragment:bM,transmission_pars_fragment:EM,uv_pars_fragment:TM,uv_pars_vertex:AM,uv_vertex:wM,worldpos_vertex:RM,background_vert:CM,background_frag:PM,backgroundCube_vert:LM,backgroundCube_frag:DM,cube_vert:IM,cube_frag:UM,depth_vert:NM,depth_frag:FM,distance_vert:OM,distance_frag:BM,equirect_vert:zM,equirect_frag:VM,linedashed_vert:HM,linedashed_frag:GM,meshbasic_vert:kM,meshbasic_frag:WM,meshlambert_vert:XM,meshlambert_frag:$M,meshmatcap_vert:qM,meshmatcap_frag:YM,meshnormal_vert:KM,meshnormal_frag:ZM,meshphong_vert:JM,meshphong_frag:QM,meshphysical_vert:jM,meshphysical_frag:ey,meshtoon_vert:ty,meshtoon_frag:ny,points_vert:iy,points_frag:ry,shadow_vert:sy,shadow_frag:ay,sprite_vert:oy,sprite_frag:ly},Ge={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new $},probesMax:{value:new $},probesResolution:{value:new $}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},ci={basic:{uniforms:mn([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:mn([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,Ge.lights,{emissive:{value:new _t(0)},envMapIntensity:{value:1}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:mn([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,Ge.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:mn([Ge.common,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.roughnessmap,Ge.metalnessmap,Ge.fog,Ge.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:mn([Ge.common,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.gradientmap,Ge.fog,Ge.lights,{emissive:{value:new _t(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:mn([Ge.common,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:mn([Ge.points,Ge.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:mn([Ge.common,Ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:mn([Ge.common,Ge.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:mn([Ge.common,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:mn([Ge.sprite,Ge.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distance:{uniforms:mn([Ge.common,Ge.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distance_vert,fragmentShader:ht.distance_frag},shadow:{uniforms:mn([Ge.lights,Ge.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};ci.physical={uniforms:mn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const so={r:0,b:0,g:0},cy=new Nt,Zp=new lt;Zp.set(-1,0,0,0,1,0,0,0,1);function uy(n,e,t,i,r,s){const a=new _t(0);let o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(T){let L=T.isScene===!0?T.background:null;if(L&&L.isTexture){const M=T.backgroundBlurriness>0;L=e.get(L,M)}return L}function _(T){let L=!1;const M=d(T);M===null?m(a,o):M&&M.isColor&&(m(M,1),L=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||L)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(T,L){const M=d(L);M&&(M.isCubeTexture||M.mapping===Zo)?(c===void 0&&(c=new Pn(new ga(1,1,1),new Si({name:"BackgroundCubeMaterial",uniforms:ds(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,C,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cy.makeRotationFromEuler(L.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Zp),c.material.toneMapped=gt.getTransfer(M.colorSpace)!==At,(u!==M||f!==M.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Pn(new jo(2,2),new Si({name:"BackgroundMaterial",uniforms:ds(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:Ir,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.toneMapped=gt.getTransfer(M.colorSpace)!==At,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function m(T,L){T.getRGB(so,Xp(n)),t.buffers.color.setClear(so.r,so.g,so.b,L,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,L=1){a.set(T),o=L,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,m(a,o)},render:_,addToRenderList:y,dispose:p}}function hy(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(X,te,re,V,Q){let oe=!1;const j=f(X,V,re,te);s!==j&&(s=j,c(s.object)),oe=d(X,V,re,Q),oe&&_(X,V,re,Q),Q!==null&&e.update(Q,n.ELEMENT_ARRAY_BUFFER),(oe||a)&&(a=!1,M(X,te,re,V),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function l(){return n.createVertexArray()}function c(X){return n.bindVertexArray(X)}function u(X){return n.deleteVertexArray(X)}function f(X,te,re,V){const Q=V.wireframe===!0;let oe=i[te.id];oe===void 0&&(oe={},i[te.id]=oe);const j=X.isInstancedMesh===!0?X.id:0;let de=oe[j];de===void 0&&(de={},oe[j]=de);let le=de[re.id];le===void 0&&(le={},de[re.id]=le);let ge=le[Q];return ge===void 0&&(ge=h(l()),le[Q]=ge),ge}function h(X){const te=[],re=[],V=[];for(let Q=0;Q<t;Q++)te[Q]=0,re[Q]=0,V[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:te,enabledAttributes:re,attributeDivisors:V,object:X,attributes:{},index:null}}function d(X,te,re,V){const Q=s.attributes,oe=te.attributes;let j=0;const de=re.getAttributes();for(const le in de)if(de[le].location>=0){const pe=Q[le];let De=oe[le];if(De===void 0&&(le==="instanceMatrix"&&X.instanceMatrix&&(De=X.instanceMatrix),le==="instanceColor"&&X.instanceColor&&(De=X.instanceColor)),pe===void 0||pe.attribute!==De||De&&pe.data!==De.data)return!0;j++}return s.attributesNum!==j||s.index!==V}function _(X,te,re,V){const Q={},oe=te.attributes;let j=0;const de=re.getAttributes();for(const le in de)if(de[le].location>=0){let pe=oe[le];pe===void 0&&(le==="instanceMatrix"&&X.instanceMatrix&&(pe=X.instanceMatrix),le==="instanceColor"&&X.instanceColor&&(pe=X.instanceColor));const De={};De.attribute=pe,pe&&pe.data&&(De.data=pe.data),Q[le]=De,j++}s.attributes=Q,s.attributesNum=j,s.index=V}function y(){const X=s.newAttributes;for(let te=0,re=X.length;te<re;te++)X[te]=0}function m(X){p(X,0)}function p(X,te){const re=s.newAttributes,V=s.enabledAttributes,Q=s.attributeDivisors;re[X]=1,V[X]===0&&(n.enableVertexAttribArray(X),V[X]=1),Q[X]!==te&&(n.vertexAttribDivisor(X,te),Q[X]=te)}function T(){const X=s.newAttributes,te=s.enabledAttributes;for(let re=0,V=te.length;re<V;re++)te[re]!==X[re]&&(n.disableVertexAttribArray(re),te[re]=0)}function L(X,te,re,V,Q,oe,j){j===!0?n.vertexAttribIPointer(X,te,re,Q,oe):n.vertexAttribPointer(X,te,re,V,Q,oe)}function M(X,te,re,V){y();const Q=V.attributes,oe=re.getAttributes(),j=te.defaultAttributeValues;for(const de in oe){const le=oe[de];if(le.location>=0){let ge=Q[de];if(ge===void 0&&(de==="instanceMatrix"&&X.instanceMatrix&&(ge=X.instanceMatrix),de==="instanceColor"&&X.instanceColor&&(ge=X.instanceColor)),ge!==void 0){const pe=ge.normalized,De=ge.itemSize,Me=e.get(ge);if(Me===void 0)continue;const it=Me.buffer,We=Me.type,nt=Me.bytesPerElement,q=We===n.INT||We===n.UNSIGNED_INT||ge.gpuType===Lu;if(ge.isInterleavedBufferAttribute){const A=ge.data,J=A.stride,Le=ge.offset;if(A.isInstancedInterleavedBuffer){for(let we=0;we<le.locationSize;we++)p(le.location+we,A.meshPerAttribute);X.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=A.meshPerAttribute*A.count)}else for(let we=0;we<le.locationSize;we++)m(le.location+we);n.bindBuffer(n.ARRAY_BUFFER,it);for(let we=0;we<le.locationSize;we++)L(le.location+we,De/le.locationSize,We,pe,J*nt,(Le+De/le.locationSize*we)*nt,q)}else{if(ge.isInstancedBufferAttribute){for(let A=0;A<le.locationSize;A++)p(le.location+A,ge.meshPerAttribute);X.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let A=0;A<le.locationSize;A++)m(le.location+A);n.bindBuffer(n.ARRAY_BUFFER,it);for(let A=0;A<le.locationSize;A++)L(le.location+A,De/le.locationSize,We,pe,De*nt,De/le.locationSize*A*nt,q)}}else if(j!==void 0){const pe=j[de];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(le.location,pe);break;case 3:n.vertexAttrib3fv(le.location,pe);break;case 4:n.vertexAttrib4fv(le.location,pe);break;default:n.vertexAttrib1fv(le.location,pe)}}}}T()}function R(){I();for(const X in i){const te=i[X];for(const re in te){const V=te[re];for(const Q in V){const oe=V[Q];for(const j in oe)u(oe[j].object),delete oe[j];delete V[Q]}}delete i[X]}}function C(X){if(i[X.id]===void 0)return;const te=i[X.id];for(const re in te){const V=te[re];for(const Q in V){const oe=V[Q];for(const j in oe)u(oe[j].object),delete oe[j];delete V[Q]}}delete i[X.id]}function F(X){for(const te in i){const re=i[te];for(const V in re){const Q=re[V];if(Q[X.id]===void 0)continue;const oe=Q[X.id];for(const j in oe)u(oe[j].object),delete oe[j];delete Q[X.id]}}}function S(X){for(const te in i){const re=i[te],V=X.isInstancedMesh===!0?X.id:0,Q=re[V];if(Q!==void 0){for(const oe in Q){const j=Q[oe];for(const de in j)u(j[de].object),delete j[de];delete Q[oe]}delete re[V],Object.keys(re).length===0&&delete i[te]}}}function I(){B(),a=!0,s!==r&&(s=r,c(s.object))}function B(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:B,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfObject:S,releaseStatesOfProgram:F,initAttributes:y,enableAttribute:m,disableUnusedAttributes:T}}function fy(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function dy(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(F){return!(F!==Kn&&i.convert(F)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(F){const S=F===xi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(F!==Rn&&F!==fi&&!S&&i.convert(F)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(F){if(F==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(rt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),L=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:L,maxFragmentUniforms:M,maxSamples:R,samples:C}}function py(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Ui,o=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const _=f.clippingPlanes,y=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const T=s?0:i,L=T*4;let M=p.clippingState||null;l.value=M,M=u(_,h,L,d);for(let R=0;R!==L;++R)M[R]=t[R];p.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,_){const y=f!==null?f.length:0;let m=null;if(y!==0){if(m=l.value,_!==!0||m===null){const p=d+y*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let L=0,M=d;L!==y;++L,M+=4)a.copy(f[L]).applyMatrix4(T,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}const is=4,my=6,gy=20,_y=256,Is=new el,Df=new _t;let tc=null,nc=0,ic=0,rc=!1;const vy=new $,br=new $;class If{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=vy}=s;tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ff(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(tc,nc,ic),this._renderer.xr.enabled=rc,e.scissorTest=!1,Jr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ur||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:xi,format:Kn,colorSpace:Lo,depthBuffer:!1},r=Uf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uf(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=xy(s)),this._blurMaterial=My(s,e,t),this._ggxMaterial=Sy(s,e,t)}return r}_compileMaterial(e){const t=new Pn(new un,e);this._renderer.compile(t,Is)}_sceneToCubeUV(e,t,i,r,s){const l=new Yn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Df),f.toneMapping=mi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pn(new ga,new Ks({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let p=!1;const T=e.background;T?T.isColor&&(m.color.copy(T),e.background=null,p=!0):(m.color.copy(Df),p=!0);for(let L=0;L<6;L++){const M=L%3;M===0?(l.up.set(0,c[L],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[L],s.y,s.z)):M===1?(l.up.set(0,0,c[L]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[L],s.z)):(l.up.set(0,c[L],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[L]));const R=this._cubeSize;Jr(r,M*R,L>2?R:0,R,R),f.setRenderTarget(r),p&&f.render(y,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=T}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ur||e.mapping===hs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ff()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Jr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Is)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,d=f*h,{_lodMax:_}=this,y=this._sizeLods[i],m=3*y*(i>_-is?i-_+is:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=_-t,Jr(s,m,p,3*y,2*y),r.setRenderTarget(s),r.render(o,Is),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,Jr(e,m,p,3*y,2*y),r.setRenderTarget(e),r.render(o,Is)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-is?r-this._lodMax+is:0),h=4*(this._cubeSize-u);Jr(t,f,h,3*u,2*u),a.setRenderTarget(t),a.render(l,Is)}}function xy(n){const e=[],t=[];let i=n;const r=n-is+1+my;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,d=3,_=new Float32Array(d*h*f),y=new Float32Array(d*h*f);for(let p=0;p<f;p++){const T=p%3*2/3-1,L=p>2?0:-1,M=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];_.set(M,d*h*p);for(let R=0;R<h;R++){const C=u[R*2]*2-1,F=u[R*2+1]*2-1;p===0?br.set(1,F,C):p===1?br.set(-C,1,-F):p===2?br.set(-C,F,1):p===3?br.set(-1,F,-C):p===4?br.set(-C,-1,F):br.set(C,F,-1),br.toArray(y,(p*h+R)*d)}}const m=new un;m.setAttribute("position",new ki(_,d)),m.setAttribute("outputDirection",new ki(y,d)),t.push(new Pn(m,null)),i>is&&i--}return{lodMeshes:t,sizeLods:e}}function Uf(n,e,t){const i=new Qn(n,e,t);return i.texture.mapping=Zo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Jr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Sy(n,e,t){return new Si({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_y,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:tl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function My(n,e,t){return new Si({name:"SphericalGaussianBlur",defines:{SAMPLES:gy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:tl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Nf(){return new Si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Ff(){return new Si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function tl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Jp extends Qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Np(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ga(5,5,5),s=new Si({name:"CubemapFromEquirect",uniforms:ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Tn,blending:Hi});s.uniforms.tEquirect.value=t;const a=new Pn(r,s),o=t.minFilter;return t.minFilter===Cr&&(t.minFilter=ln),new bx(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function yy(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===El||d===Tl)if(e.has(h)){const _=e.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const y=new Jp(_.height);return y.fromEquirectangularTexture(n,h),e.set(h,y),h.addEventListener("dispose",c),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,_=d===El||d===Tl,y=d===Ur||d===hs;if(_||y){let m=t.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new If(n)),m=_?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const T=h.image;return _&&T&&T.height>0||y&&T&&l(T)?(i===null&&(i=new If(n)),m=_?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,d){return d===El?h.mapping=Ur:d===Tl&&(h.mapping=hs),h}function l(h){let d=0;const _=6;for(let y=0;y<_;y++)h[y]!==void 0&&d++;return d===_}function c(h){const d=h.target;d.removeEventListener("dispose",c);const _=e.get(d);_!==void 0&&(e.delete(d),_.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function by(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&os("WebGLRenderer: "+i+" extension not supported."),r}}}function Ey(n,e,t,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],n.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,_=f.attributes.position;let y=0;if(_===void 0)return;if(d!==null){const T=d.array;y=d.version;for(let L=0,M=T.length;L<M;L+=3){const R=T[L+0],C=T[L+1],F=T[L+2];h.push(R,C,C,F,F,R)}}else{const T=_.array;y=_.version;for(let L=0,M=T.length/3-1;L<M;L+=3){const R=L+0,C=L+1,F=L+2;h.push(R,C,C,F,F,R)}}const m=new(_.count>=65535?Up:Ip)(h,1);m.version=y;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Ty(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,s,f*a),t.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,s,f*a,d),t.update(h,i,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,d);let y=0;for(let m=0;m<d;m++)y+=h[m];t.update(y,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Ay(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function wy(n,e,t){const i=new WeakMap,r=new Bt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let I=function(){F.dispose(),i.delete(o),o.removeEventListener("dispose",I)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let L=0;d===!0&&(L=1),_===!0&&(L=2),y===!0&&(L=3);let M=o.attributes.position.count*L,R=1;M>e.maxTextureSize&&(R=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const C=new Float32Array(M*R*4*f),F=new Lp(C,M,R,f);F.type=fi,F.needsUpdate=!0;const S=L*4;for(let B=0;B<f;B++){const X=m[B],te=p[B],re=T[B],V=M*R*4*B;for(let Q=0;Q<X.count;Q++){const oe=Q*S;d===!0&&(r.fromBufferAttribute(X,Q),C[V+oe+0]=r.x,C[V+oe+1]=r.y,C[V+oe+2]=r.z,C[V+oe+3]=0),_===!0&&(r.fromBufferAttribute(te,Q),C[V+oe+4]=r.x,C[V+oe+5]=r.y,C[V+oe+6]=r.z,C[V+oe+7]=0),y===!0&&(r.fromBufferAttribute(re,Q),C[V+oe+8]=r.x,C[V+oe+9]=r.y,C[V+oe+10]=r.z,C[V+oe+11]=re.itemSize===4?r.w:1)}}h={count:f,texture:F,size:new Ue(M,R)},i.set(o,h),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];const _=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Ry(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Cy={[mp]:"LINEAR_TONE_MAPPING",[gp]:"REINHARD_TONE_MAPPING",[_p]:"CINEON_TONE_MAPPING",[vp]:"ACES_FILMIC_TONE_MAPPING",[Sp]:"AGX_TONE_MAPPING",[Mp]:"NEUTRAL_TONE_MAPPING",[xp]:"CUSTOM_TONE_MAPPING"};function Py(n,e,t,i,r,s){const a=new Qn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new un;c.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Wt([0,2,0,0,2,0],2));const u=new mx({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Pn(c,u),h=new el(-1,1,1,-1,0,1);let d=null,_=null,y=!1,m,p=null,T=[],L=!1;this.setSize=function(M,R){a.setSize(M,R),o!==null&&o.setSize(M,R),l!==null&&l.setSize(M,R);for(let C=0;C<T.length;C++){const F=T[C];F.setSize&&F.setSize(M,R)}},this.setEffects=function(M){T=M,L=T.length>0&&T[0].isRenderPass===!0;const R=a.width,C=a.height;T.length>0&&o===null&&(o=new Qn(R,C,{type:xi,depthBuffer:!1,stencilBuffer:!1}),l=new Qn(R,C,{type:xi,depthBuffer:!1,stencilBuffer:!1}));for(let F=0;F<T.length;F++){const S=T[F];S.setSize&&S.setSize(R,C)}},this.begin=function(M,R){if(y||M.toneMapping===mi&&T.length===0)return!1;if(p=R,R!==null){const C=R.width,F=R.height;(a.width!==C||a.height!==F)&&this.setSize(C,F)}return L===!1&&M.setRenderTarget(a),m=M.toneMapping,M.toneMapping=mi,!0},this.hasRenderPass=function(){return L},this.end=function(M,R){M.toneMapping=m,y=!0;let C=a,F=o;for(let S=0;S<T.length;S++){const I=T[S];I.enabled!==!1&&(I.render(M,F,C,R),I.needsSwap!==!1&&(C=F,F=F===o?l:o))}if(d!==M.outputColorSpace||_!==M.toneMapping){d=M.outputColorSpace,_=M.toneMapping,u.defines={},gt.getTransfer(d)===At&&(u.defines.SRGB_TRANSFER="");const S=Cy[_];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=C.texture,M.setRenderTarget(p),M.render(f,h),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const Qp=new vn,hu=new la(1,1),jp=new Lp,em=new c0,tm=new Np,Of=[],Bf=[],zf=new Float32Array(16),Vf=new Float32Array(9),Hf=new Float32Array(4);function _s(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Of[r];if(s===void 0&&(s=new Float32Array(r),Of[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function $t(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function qt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function nl(n,e){let t=Bf[e];t===void 0&&(t=new Int32Array(e),Bf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ly(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Dy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;n.uniform2fv(this.addr,e),qt(t,e)}}function Iy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if($t(t,e))return;n.uniform3fv(this.addr,e),qt(t,e)}}function Uy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;n.uniform4fv(this.addr,e),qt(t,e)}}function Ny(n,e){const t=this.cache,i=e.elements;if(i===void 0){if($t(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if($t(t,i))return;Hf.set(i),n.uniformMatrix2fv(this.addr,!1,Hf),qt(t,i)}}function Fy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if($t(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if($t(t,i))return;Vf.set(i),n.uniformMatrix3fv(this.addr,!1,Vf),qt(t,i)}}function Oy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if($t(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if($t(t,i))return;zf.set(i),n.uniformMatrix4fv(this.addr,!1,zf),qt(t,i)}}function By(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function zy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;n.uniform2iv(this.addr,e),qt(t,e)}}function Vy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;n.uniform3iv(this.addr,e),qt(t,e)}}function Hy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;n.uniform4iv(this.addr,e),qt(t,e)}}function Gy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ky(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;n.uniform2uiv(this.addr,e),qt(t,e)}}function Wy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;n.uniform3uiv(this.addr,e),qt(t,e)}}function Xy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;n.uniform4uiv(this.addr,e),qt(t,e)}}function $y(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(hu.compareFunction=t.isReversedDepthBuffer()?Bu:Ou,s=hu):s=Qp,t.setTexture2D(e||s,r)}function qy(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||em,r)}function Yy(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||tm,r)}function Ky(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||jp,r)}function Zy(n){switch(n){case 5126:return Ly;case 35664:return Dy;case 35665:return Iy;case 35666:return Uy;case 35674:return Ny;case 35675:return Fy;case 35676:return Oy;case 5124:case 35670:return By;case 35667:case 35671:return zy;case 35668:case 35672:return Vy;case 35669:case 35673:return Hy;case 5125:return Gy;case 36294:return ky;case 36295:return Wy;case 36296:return Xy;case 35678:case 36198:case 36298:case 36306:case 35682:return $y;case 35679:case 36299:case 36307:return qy;case 35680:case 36300:case 36308:case 36293:return Yy;case 36289:case 36303:case 36311:case 36292:return Ky}}function Jy(n,e){n.uniform1fv(this.addr,e)}function Qy(n,e){const t=_s(e,this.size,2);n.uniform2fv(this.addr,t)}function jy(n,e){const t=_s(e,this.size,3);n.uniform3fv(this.addr,t)}function eb(n,e){const t=_s(e,this.size,4);n.uniform4fv(this.addr,t)}function tb(n,e){const t=_s(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nb(n,e){const t=_s(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ib(n,e){const t=_s(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function rb(n,e){n.uniform1iv(this.addr,e)}function sb(n,e){n.uniform2iv(this.addr,e)}function ab(n,e){n.uniform3iv(this.addr,e)}function ob(n,e){n.uniform4iv(this.addr,e)}function lb(n,e){n.uniform1uiv(this.addr,e)}function cb(n,e){n.uniform2uiv(this.addr,e)}function ub(n,e){n.uniform3uiv(this.addr,e)}function hb(n,e){n.uniform4uiv(this.addr,e)}function fb(n,e,t){const i=this.cache,r=e.length,s=nl(t,r);$t(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=hu:a=Qp;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function db(n,e,t){const i=this.cache,r=e.length,s=nl(t,r);$t(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||em,s[a])}function pb(n,e,t){const i=this.cache,r=e.length,s=nl(t,r);$t(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||tm,s[a])}function mb(n,e,t){const i=this.cache,r=e.length,s=nl(t,r);$t(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||jp,s[a])}function gb(n){switch(n){case 5126:return Jy;case 35664:return Qy;case 35665:return jy;case 35666:return eb;case 35674:return tb;case 35675:return nb;case 35676:return ib;case 5124:case 35670:return rb;case 35667:case 35671:return sb;case 35668:case 35672:return ab;case 35669:case 35673:return ob;case 5125:return lb;case 36294:return cb;case 36295:return ub;case 36296:return hb;case 35678:case 36198:case 36298:case 36306:case 35682:return fb;case 35679:case 36299:case 36307:return db;case 35680:case 36300:case 36308:case 36293:return pb;case 36289:case 36303:case 36311:case 36292:return mb}}class _b{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Zy(t.type)}}class vb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gb(t.type)}}class xb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const sc=/(\w+)(\])?(\[|\.)?/g;function Gf(n,e){n.seq.push(e),n.map[e.id]=e}function Sb(n,e,t){const i=n.name,r=i.length;for(sc.lastIndex=0;;){const s=sc.exec(i),a=sc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Gf(t,c===void 0?new _b(o,n,e):new vb(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new xb(o),Gf(t,f)),t=f}}}class xo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Sb(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function kf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Mb=37297;let yb=0;function bb(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Wf=new lt;function Eb(n){gt._getMatrix(Wf,gt.workingColorSpace,n);const e=`mat3( ${Wf.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(n)){case Do:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return rt("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Xf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+bb(n.getShaderSource(e),o)}else return s}function Tb(n,e){const t=Eb(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Ab={[mp]:"Linear",[gp]:"Reinhard",[_p]:"Cineon",[vp]:"ACESFilmic",[Sp]:"AgX",[Mp]:"Neutral",[xp]:"Custom"};function wb(n,e){const t=Ab[e];return t===void 0?(rt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ao=new $;function Rb(){gt.getLuminanceCoefficients(ao);const n=ao.x.toFixed(4),e=ao.y.toFixed(4),t=ao.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vs).join(`
`)}function Pb(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Lb(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Vs(n){return n!==""}function $f(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Db=/^[ \t]*#include +<([\w\d./]+)>/gm;function fu(n){return n.replace(Db,Ub)}const Ib=new Map;function Ub(n,e){let t=ht[e];if(t===void 0){const i=Ib.get(e);if(i!==void 0)t=ht[i],rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return fu(t)}const Nb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yf(n){return n.replace(Nb,Fb)}function Fb(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Kf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Ob={[fo]:"SHADOWMAP_TYPE_PCF",[Bs]:"SHADOWMAP_TYPE_VSM"};function Bb(n){return Ob[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const zb={[Ur]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE",[Zo]:"ENVMAP_TYPE_CUBE_UV"};function Vb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":zb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Hb={[hs]:"ENVMAP_MODE_REFRACTION"};function Gb(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Hb[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const kb={[pp]:"ENVMAP_BLENDING_MULTIPLY",[zv]:"ENVMAP_BLENDING_MIX",[Vv]:"ENVMAP_BLENDING_ADD"};function Wb(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":kb[n.combine]||"ENVMAP_BLENDING_NONE"}function Xb(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function $b(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Bb(t),c=Vb(t),u=Gb(t),f=Wb(t),h=Xb(t),d=Cb(t),_=Pb(s),y=r.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Vs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Vs).join(`
`),p.length>0&&(p+=`
`)):(m=[Kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vs).join(`
`),p=[Kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?ht.tonemapping_pars_fragment:"",t.toneMapping!==mi?wb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Tb("linearToOutputTexel",t.outputColorSpace),Rb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vs).join(`
`)),a=fu(a),a=$f(a,t),a=qf(a,t),o=fu(o),o=$f(o,t),o=qf(o,t),a=Yf(a),o=Yf(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const L=T+m+a,M=T+p+o,R=kf(r,r.VERTEX_SHADER,L),C=kf(r,r.FRAGMENT_SHADER,M);r.attachShader(y,R),r.attachShader(y,C),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function F(X){if(n.debug.checkShaderErrors){const te=r.getProgramInfoLog(y)||"",re=r.getShaderInfoLog(R)||"",V=r.getShaderInfoLog(C)||"",Q=te.trim(),oe=re.trim(),j=V.trim();let de=!0,le=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(de=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,R,C);else{const ge=Xf(r,R,"vertex"),pe=Xf(r,C,"fragment");vt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+Q+`
`+ge+`
`+pe)}else Q!==""?rt("WebGLProgram: Program Info Log:",Q):(oe===""||j==="")&&(le=!1);le&&(X.diagnostics={runnable:de,programLog:Q,vertexShader:{log:oe,prefix:m},fragmentShader:{log:j,prefix:p}})}r.deleteShader(R),r.deleteShader(C),S=new xo(r,y),I=Lb(r,y)}let S;this.getUniforms=function(){return S===void 0&&F(this),S};let I;this.getAttributes=function(){return I===void 0&&F(this),I};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(y,Mb)),B},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yb++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=C,this}let qb=0;class Yb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Kb(e),t.set(e,i)),i}}class Kb{constructor(e){this.id=qb++,this.code=e,this.usedTimes=0}}function Zb(n){return n===Nr||n===Co||n===Po}function Jb(n,e,t,i,r,s){const a=new Vu,o=new Yb,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function y(S,I,B,X,te,re){const V=X.fog,Q=te.geometry,oe=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?X.environment:null,j=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,de=e.get(S.envMap||oe,j),le=de&&de.mapping===Zo?de.image.height:null,ge=d[S.type];S.precision!==null&&(h=i.getMaxPrecision(S.precision),h!==S.precision&&rt("WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const pe=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,De=pe!==void 0?pe.length:0;let Me=0;Q.morphAttributes.position!==void 0&&(Me=1),Q.morphAttributes.normal!==void 0&&(Me=2),Q.morphAttributes.color!==void 0&&(Me=3);let it,We,nt,q;if(ge){const Rt=ci[ge];it=Rt.vertexShader,We=Rt.fragmentShader}else{it=S.vertexShader,We=S.fragmentShader;const Rt=o.getVertexShaderStage(S),pt=o.getFragmentShaderStage(S);o.update(S,Rt,pt),nt=Rt.id,q=pt.id}const A=n.getRenderTarget(),J=n.state.buffers.depth.getReversed(),Le=te.isInstancedMesh===!0,we=te.isBatchedMesh===!0,w=!!S.map,N=!!S.matcap,U=!!de,G=!!S.aoMap,k=!!S.lightMap,H=!!S.bumpMap&&S.wireframe===!1,ee=!!S.normalMap,fe=!!S.displacementMap,ce=!!S.emissiveMap,ie=!!S.metalnessMap,Ee=!!S.roughnessMap,P=S.anisotropy>0,Ae=S.clearcoat>0,Ie=S.dispersion>0,E=S.retroreflectivity>0,g=S.iridescence>0,O=S.sheen>0,K=S.transmission>0,ne=P&&!!S.anisotropyMap,Te=Ae&&!!S.clearcoatMap,Ce=Ae&&!!S.clearcoatNormalMap,me=Ae&&!!S.clearcoatRoughnessMap,xe=g&&!!S.iridescenceMap,Re=g&&!!S.iridescenceThicknessMap,ke=O&&!!S.sheenColorMap,Be=O&&!!S.sheenRoughnessMap,Ne=!!S.specularMap,Je=!!S.specularColorMap,je=!!S.specularIntensityMap,ot=K&&!!S.transmissionMap,Y=K&&!!S.thicknessMap,Fe=!!S.gradientMap,ve=!!S.alphaMap,ze=S.alphaTest>0,Ve=!!S.alphaHash,be=!!S.extensions;let Qe=mi;S.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Qe=n.toneMapping);const Ze={shaderID:ge,shaderType:S.type,shaderName:S.name,vertexShader:it,fragmentShader:We,defines:S.defines,customVertexShaderID:nt,customFragmentShaderID:q,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:we,batchingColor:we&&te._colorsTexture!==null,instancing:Le,instancingColor:Le&&te.instanceColor!==null,instancingMorph:Le&&te.morphTexture!==null,outputColorSpace:A===null?n.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:gt.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:w,matcap:N,envMap:U,envMapMode:U&&de.mapping,envMapCubeUVHeight:le,aoMap:G,lightMap:k,bumpMap:H,normalMap:ee,displacementMap:fe,emissiveMap:ce,normalMapObjectSpace:ee&&S.normalMapType===kv,normalMapTangentSpace:ee&&S.normalMapType===su,packedNormalMap:ee&&S.normalMapType===su&&Zb(S.normalMap.format),metalnessMap:ie,roughnessMap:Ee,anisotropy:P,anisotropyMap:ne,clearcoat:Ae,clearcoatMap:Te,clearcoatNormalMap:Ce,clearcoatRoughnessMap:me,dispersion:Ie,retroreflection:E,iridescence:g,iridescenceMap:xe,iridescenceThicknessMap:Re,sheen:O,sheenColorMap:ke,sheenRoughnessMap:Be,specularMap:Ne,specularColorMap:Je,specularIntensityMap:je,transmission:K,transmissionMap:ot,thicknessMap:Y,gradientMap:Fe,opaque:S.transparent===!1&&S.blending===qs&&S.alphaToCoverage===!1,alphaMap:ve,alphaTest:ze,alphaHash:Ve,combine:S.combine,mapUv:w&&_(S.map.channel),aoMapUv:G&&_(S.aoMap.channel),lightMapUv:k&&_(S.lightMap.channel),bumpMapUv:H&&_(S.bumpMap.channel),normalMapUv:ee&&_(S.normalMap.channel),displacementMapUv:fe&&_(S.displacementMap.channel),emissiveMapUv:ce&&_(S.emissiveMap.channel),metalnessMapUv:ie&&_(S.metalnessMap.channel),roughnessMapUv:Ee&&_(S.roughnessMap.channel),anisotropyMapUv:ne&&_(S.anisotropyMap.channel),clearcoatMapUv:Te&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(S.sheenRoughnessMap.channel),specularMapUv:Ne&&_(S.specularMap.channel),specularColorMapUv:Je&&_(S.specularColorMap.channel),specularIntensityMapUv:je&&_(S.specularIntensityMap.channel),transmissionMapUv:ot&&_(S.transmissionMap.channel),thicknessMapUv:Y&&_(S.thicknessMap.channel),alphaMapUv:ve&&_(S.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(ee||P),vertexNormals:!!Q.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:te.isPoints===!0&&!!Q.attributes.uv&&(w||ve),fog:!!V,useFog:S.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||Q.attributes.normal===void 0&&ee===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:J,skinning:te.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:Me,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:re.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:Qe,decodeVideoTexture:w&&S.map.isVideoTexture===!0&&gt.getTransfer(S.map.colorSpace)===At,decodeVideoTextureEmissive:ce&&S.emissiveMap.isVideoTexture===!0&&gt.getTransfer(S.emissiveMap.colorSpace)===At,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===hi,flipSided:S.side===Tn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:be&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&S.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ze.vertexUv1s=l.has(1),Ze.vertexUv2s=l.has(2),Ze.vertexUv3s=l.has(3),l.clear(),Ze}function m(S){const I=[];if(S.shaderID?I.push(S.shaderID):(I.push(S.customVertexShaderID),I.push(S.customFragmentShaderID)),S.defines!==void 0)for(const B in S.defines)I.push(B),I.push(S.defines[B]);return S.isRawShaderMaterial===!1&&(p(I,S),T(I,S),I.push(n.outputColorSpace)),I.push(S.customProgramCacheKey),I.join()}function p(S,I){S.push(I.precision),S.push(I.outputColorSpace),S.push(I.envMapMode),S.push(I.envMapCubeUVHeight),S.push(I.mapUv),S.push(I.alphaMapUv),S.push(I.lightMapUv),S.push(I.aoMapUv),S.push(I.bumpMapUv),S.push(I.normalMapUv),S.push(I.displacementMapUv),S.push(I.emissiveMapUv),S.push(I.metalnessMapUv),S.push(I.roughnessMapUv),S.push(I.anisotropyMapUv),S.push(I.clearcoatMapUv),S.push(I.clearcoatNormalMapUv),S.push(I.clearcoatRoughnessMapUv),S.push(I.iridescenceMapUv),S.push(I.iridescenceThicknessMapUv),S.push(I.sheenColorMapUv),S.push(I.sheenRoughnessMapUv),S.push(I.specularMapUv),S.push(I.specularColorMapUv),S.push(I.specularIntensityMapUv),S.push(I.transmissionMapUv),S.push(I.thicknessMapUv),S.push(I.combine),S.push(I.fogExp2),S.push(I.sizeAttenuation),S.push(I.morphTargetsCount),S.push(I.morphAttributeCount),S.push(I.numSunLights),S.push(I.numDirLights),S.push(I.numPointLights),S.push(I.numSpotLights),S.push(I.numSpotLightMaps),S.push(I.numHemiLights),S.push(I.numRectAreaLights),S.push(I.numSunLightShadows),S.push(I.numDirLightShadows),S.push(I.numPointLightShadows),S.push(I.numSpotLightShadows),S.push(I.numSpotLightShadowsWithMaps),S.push(I.numLightProbes),S.push(I.shadowMapType),S.push(I.toneMapping),S.push(I.numClippingPlanes),S.push(I.numClipIntersection),S.push(I.depthPacking)}function T(S,I){a.disableAll(),I.instancing&&a.enable(0),I.instancingColor&&a.enable(1),I.instancingMorph&&a.enable(2),I.matcap&&a.enable(3),I.envMap&&a.enable(4),I.normalMapObjectSpace&&a.enable(5),I.normalMapTangentSpace&&a.enable(6),I.clearcoat&&a.enable(7),I.iridescence&&a.enable(8),I.alphaTest&&a.enable(9),I.vertexColors&&a.enable(10),I.vertexAlphas&&a.enable(11),I.vertexUv1s&&a.enable(12),I.vertexUv2s&&a.enable(13),I.vertexUv3s&&a.enable(14),I.vertexTangents&&a.enable(15),I.anisotropy&&a.enable(16),I.alphaHash&&a.enable(17),I.batching&&a.enable(18),I.dispersion&&a.enable(19),I.retroreflection&&a.enable(24),I.batchingColor&&a.enable(20),I.gradientMap&&a.enable(21),I.packedNormalMap&&a.enable(22),I.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),I.fog&&a.enable(0),I.useFog&&a.enable(1),I.flatShading&&a.enable(2),I.logarithmicDepthBuffer&&a.enable(3),I.reversedDepthBuffer&&a.enable(4),I.skinning&&a.enable(5),I.morphTargets&&a.enable(6),I.morphNormals&&a.enable(7),I.morphColors&&a.enable(8),I.premultipliedAlpha&&a.enable(9),I.shadowMapEnabled&&a.enable(10),I.doubleSided&&a.enable(11),I.flipSided&&a.enable(12),I.useDepthPacking&&a.enable(13),I.dithering&&a.enable(14),I.transmission&&a.enable(15),I.sheen&&a.enable(16),I.opaque&&a.enable(17),I.pointsUvs&&a.enable(18),I.decodeVideoTexture&&a.enable(19),I.decodeVideoTextureEmissive&&a.enable(20),I.alphaToCoverage&&a.enable(21),I.numLightProbeGrids>0&&a.enable(22),I.hasPositionAttribute&&a.enable(23),S.push(a.mask)}function L(S){const I=d[S.type];let B;if(I){const X=ci[I];B=fx.clone(X.uniforms)}else B=S.uniforms;return B}function M(S,I){let B=u.get(I);return B!==void 0?++B.usedTimes:(B=new $b(n,I,S,r),c.push(B),u.set(I,B)),B}function R(S){if(--S.usedTimes===0){const I=c.indexOf(S);c[I]=c[c.length-1],c.pop(),u.delete(S.cacheKey),S.destroy()}}function C(S){o.remove(S)}function F(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:L,acquireProgram:M,releaseProgram:R,releaseShaderCache:C,programs:c,dispose:F}}function Qb(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function jb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Zf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Jf(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,_,y,m,p){let T=n[e];return T===void 0?(T={id:h.id,object:h,geometry:d,material:_,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:m,group:p},n[e]=T):(T.id=h.id,T.object=h,T.geometry=d,T.material=_,T.materialVariant=a(h),T.groupOrder=y,T.renderOrder=h.renderOrder,T.z=m,T.group=p),e++,T}function l(h,d,_,y,m,p,T){T.reversedDepth===!0&&(m=-m);const L=o(h,d,_,y,m,p);_.transmission>0?i.push(L):_.transparent===!0?r.push(L):t.push(L)}function c(h,d,_,y,m,p){const T=o(h,d,_,y,m,p);_.transmission>0?i.unshift(T):_.transparent===!0?r.unshift(T):t.unshift(T)}function u(h,d){t.length>1&&t.sort(h||jb),i.length>1&&i.sort(d||Zf),r.length>1&&r.sort(d||Zf)}function f(){for(let h=e,d=n.length;h<d;h++){const _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function eE(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Jf,n.set(i,[a])):r>=s.length?(a=new Jf,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function tE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new $,color:new _t};break;case"SpotLight":t={position:new $,direction:new $,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new $,color:new _t,distance:0,decay:0};break;case"HemisphereLight":t={direction:new $,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":t={color:new _t,position:new $,halfWidth:new $,halfHeight:new $};break}return n[e.id]=t,t}}}function nE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let iE=0;function rE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function sE(n){const e=new tE,t=nE(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new $);const r=new $,s=new Nt,a=new Nt;function o(c){let u=0,f=0,h=0;for(let te=0;te<9;te++)i.probe[te].set(0,0,0);let d=0,_=0,y=0,m=0,p=0,T=0,L=0,M=0,R=0,C=0,F=0,S=0,I=0,B=0;c.sort(rE);for(let te=0,re=c.length;te<re;te++){const V=c[te],Q=V.color,oe=V.intensity,j=V.distance;let de=null;if(V.shadow&&V.shadow.map&&(V.shadow.map.texture.format===Nr?de=V.shadow.map.texture:de=V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)u+=Q.r*oe,f+=Q.g*oe,h+=Q.b*oe;else if(V.isLightProbe){for(let le=0;le<9;le++)i.probe[le].addScaledVector(V.sh.coefficients[le],oe);B++}else if(V.isSunLight){const le=e.get(V);if(le.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const ge=V.shadow,pe=t.get(V);pe.shadowIntensity=ge.intensity,pe.shadowBias=ge.bias,pe.shadowNormalBias=ge.normalBias,pe.shadowRadius=ge.radius,pe.shadowMapSize.copy(ge.mapSize).multiply(ge.getFrameExtents()),i.sunShadow[_]=pe,i.sunShadowMap[_]=de;const De=ge.getViewportCount();for(let Me=0;Me<De;Me++)i.sunShadowMatrix[y+Me]=ge.getMatrix(Me),i.sunShadowCascade[y+Me]=ge._cascadeData[Me];y+=De,_++}i.sun[d]=le,d++}else if(V.isDirectionalLight){const le=e.get(V);if(le.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const ge=V.shadow,pe=t.get(V);pe.shadowIntensity=ge.intensity,pe.shadowBias=ge.bias,pe.shadowNormalBias=ge.normalBias,pe.shadowRadius=ge.radius,pe.shadowMapSize=ge.mapSize,i.directionalShadow[m]=pe,i.directionalShadowMap[m]=de,i.directionalShadowMatrix[m]=V.shadow.matrix,R++}i.directional[m]=le,m++}else if(V.isSpotLight){const le=e.get(V);le.position.setFromMatrixPosition(V.matrixWorld),le.color.copy(Q).multiplyScalar(oe),le.distance=j,le.coneCos=Math.cos(V.angle),le.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),le.decay=V.decay,i.spot[T]=le;const ge=V.shadow;if(V.map&&(i.spotLightMap[S]=V.map,S++,ge.updateMatrices(V),V.castShadow&&I++),i.spotLightMatrix[T]=ge.matrix,V.castShadow){const pe=t.get(V);pe.shadowIntensity=ge.intensity,pe.shadowBias=ge.bias,pe.shadowNormalBias=ge.normalBias,pe.shadowRadius=ge.radius,pe.shadowMapSize=ge.mapSize,i.spotShadow[T]=pe,i.spotShadowMap[T]=de,F++}T++}else if(V.isRectAreaLight){const le=e.get(V);le.color.copy(Q).multiplyScalar(oe),le.halfWidth.set(V.width*.5,0,0),le.halfHeight.set(0,V.height*.5,0),i.rectArea[L]=le,L++}else if(V.isPointLight){const le=e.get(V);if(le.color.copy(V.color).multiplyScalar(V.intensity),le.distance=V.distance,le.decay=V.decay,V.castShadow){const ge=V.shadow,pe=t.get(V);pe.shadowIntensity=ge.intensity,pe.shadowBias=ge.bias,pe.shadowNormalBias=ge.normalBias,pe.shadowRadius=ge.radius,pe.shadowMapSize=ge.mapSize,pe.shadowCameraNear=ge.camera.near,pe.shadowCameraFar=ge.camera.far,i.pointShadow[p]=pe,i.pointShadowMap[p]=de,i.pointShadowMatrix[p]=V.shadow.matrix,C++}i.point[p]=le,p++}else if(V.isHemisphereLight){const le=e.get(V);le.skyColor.copy(V.color).multiplyScalar(oe),le.groundColor.copy(V.groundColor).multiplyScalar(oe),i.hemi[M]=le,M++}}L>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ge.LTC_FLOAT_1,i.rectAreaLTC2=Ge.LTC_FLOAT_2):(i.rectAreaLTC1=Ge.LTC_HALF_1,i.rectAreaLTC2=Ge.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const X=i.hash;(X.sunLength!==d||X.directionalLength!==m||X.pointLength!==p||X.spotLength!==T||X.rectAreaLength!==L||X.hemiLength!==M||X.numSunShadows!==_||X.numDirectionalShadows!==R||X.numPointShadows!==C||X.numSpotShadows!==F||X.numSpotMaps!==S||X.numLightProbes!==B)&&(i.sun.length=d,i.directional.length=m,i.spot.length=T,i.rectArea.length=L,i.point.length=p,i.hemi.length=M,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=C,i.pointShadowMap.length=C,i.pointShadowMatrix.length=C,i.spotShadow.length=F,i.spotShadowMap.length=F,i.spotLightMatrix.length=F+S-I,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=B,X.sunLength=d,X.directionalLength=m,X.pointLength=p,X.spotLength=T,X.rectAreaLength=L,X.hemiLength=M,X.numSunShadows=_,X.numDirectionalShadows=R,X.numPointShadows=C,X.numSpotShadows=F,X.numSpotMaps=S,X.numLightProbes=B,i.version=iE++)}function l(c,u){let f=0,h=0,d=0,_=0,y=0,m=0;const p=u.matrixWorldInverse;for(let T=0,L=c.length;T<L;T++){const M=c[T];if(M.isSunLight){const R=i.sun[f];R.direction.setFromMatrixPosition(M.matrixWorld),R.direction.transformDirection(p),f++}else if(M.isDirectionalLight){const R=i.directional[h];R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),h++}else if(M.isSpotLight){const R=i.spot[_];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),_++}else if(M.isRectAreaLight){const R=i.rectArea[y];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(p),a.identity(),s.copy(M.matrixWorld),s.premultiply(p),a.extractRotation(s),R.halfWidth.set(M.width*.5,0,0),R.halfHeight.set(0,M.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),y++}else if(M.isPointLight){const R=i.point[d];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const R=i.hemi[m];R.direction.setFromMatrixPosition(M.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function Qf(n){const e=new sE(n),t=[],i=[],r=[];function s(h){f.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function aE(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Qf(n),e.set(r,[o])):s>=a.length?(o=new Qf(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const oE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cE=[new $(1,0,0),new $(-1,0,0),new $(0,1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1)],uE=[new $(0,-1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1),new $(0,-1,0),new $(0,-1,0)],jf=new Nt,Us=new $,ac=new $;function hE(n,e,t){let i=new Hu;const r=new Ue,s=new Ue,a=new Bt,o=new _x,l=new vx,c={},u=t.maxTextureSize,f={[Ir]:Tn,[Tn]:Ir,[hi]:hi},h=new Si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:oE,fragmentShader:lE}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const _=new un;_.setAttribute("position",new ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Pn(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fo;let p=this.type;this.render=function(C,F,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===Sv&&(rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fo);const I=n.getRenderTarget(),B=n.getActiveCubeFace(),X=n.getActiveMipmapLevel(),te=n.state;te.setBlending(Hi),te.buffers.depth.getReversed()===!0?te.buffers.color.setClear(0,0,0,0):te.buffers.color.setClear(1,1,1,1),te.buffers.depth.setTest(!0),te.setScissorTest(!1);const re=p!==this.type;re&&F.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(Q=>Q.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,Q=C.length;V<Q;V++){const oe=C[V],j=oe.shadow;if(j===void 0){rt("WebGLShadowMap:",oe,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const de=j.getFrameExtents();r.multiply(de),s.copy(j.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/de.x),r.x=s.x*de.x,j.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/de.y),r.y=s.y*de.y,j.mapSize.y=s.y));const le=n.state.buffers.depth.getReversed();if(j.camera._reversedDepth=le,j.map===null||re===!0){if(j.map!==null&&(j.map.depthTexture!==null&&(j.map.depthTexture.dispose(),j.map.depthTexture=null),j.map.dispose()),this.type===Bs){if(oe.isPointLight){rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}j.map=new Qn(r.x,r.y,{format:Nr,type:xi,minFilter:ln,magFilter:ln,generateMipmaps:!1}),j.map.texture.name=oe.name+".shadowMap",j.map.depthTexture=new la(r.x,r.y,fi),j.map.depthTexture.name=oe.name+".shadowMapDepth",j.map.depthTexture.format=qi,j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=tn,j.map.depthTexture.magFilter=tn}else oe.isPointLight?(j.map=new Jp(r.x),j.map.depthTexture=new C0(r.x,vi)):(j.map=new Qn(r.x,r.y),j.map.depthTexture=new la(r.x,r.y,vi)),j.map.depthTexture.name=oe.name+".shadowMap",j.map.depthTexture.format=qi,this.type===fo?(j.map.depthTexture.compareFunction=le?Bu:Ou,j.map.depthTexture.minFilter=ln,j.map.depthTexture.magFilter=ln):(j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=tn,j.map.depthTexture.magFilter=tn);j.camera.updateProjectionMatrix()}j.map.isWebGLCubeRenderTarget!==!0&&(j.map.width!==r.x||j.map.height!==r.y)&&j.map.setSize(r.x,r.y);const ge=j.map.isWebGLCubeRenderTarget?6:j.getViewportCount();oe.isPointLight!==!0&&j.updateMatrices(oe,S);for(let pe=0;pe<ge;pe++){const De=j.getCamera(pe);if(oe.isPointLight){const Me=j.camera,it=j.matrix,We=oe.distance||Me.far;We!==Me.far&&(Me.far=We,Me.updateProjectionMatrix()),Us.setFromMatrixPosition(oe.matrixWorld),Me.position.copy(Us),ac.copy(Me.position),ac.add(cE[pe]),Me.up.copy(uE[pe]),Me.lookAt(ac),Me.updateMatrixWorld(),it.makeTranslation(-Us.x,-Us.y,-Us.z),jf.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),j._frustum.setFromProjectionMatrix(jf,Me.coordinateSystem,Me.reversedDepth)}if(j.map.isWebGLCubeRenderTarget)n.setRenderTarget(j.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(j.map),n.clear());const Me=j.getViewport(pe);a.set(s.x*Me.x,s.y*Me.y,s.x*Me.z,s.y*Me.w),te.viewport(a)}i=j.getFrustum(pe),M(F,S,De,oe,this.type)}j.isPointLightShadow!==!0&&this.type===Bs&&T(j,S),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(I,B,X)};function T(C,F){const S=e.update(y);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null?C.mapPass=new Qn(r.x,r.y,{format:Nr,type:xi}):(C.mapPass.width!==C.map.width||C.mapPass.height!==C.map.height)&&C.mapPass.setSize(C.map.width,C.map.height),h.uniforms.shadow_pass.value=C.map.depthTexture,h.uniforms.resolution.value.set(C.map.width,C.map.height),h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(F,null,S,h,y,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value.set(C.map.width,C.map.height),d.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(F,null,S,d,y,null)}function L(C,F,S,I){let B=null;const X=S.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(X!==void 0)B=X;else if(B=S.isPointLight===!0?l:o,n.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const te=B.uuid,re=F.uuid;let V=c[te];V===void 0&&(V={},c[te]=V);let Q=V[re];Q===void 0&&(Q=B.clone(),V[re]=Q,F.addEventListener("dispose",R)),B=Q}if(B.visible=F.visible,B.wireframe=F.wireframe,I===Bs?B.side=F.shadowSide!==null?F.shadowSide:F.side:B.side=F.shadowSide!==null?F.shadowSide:f[F.side],B.alphaMap=F.alphaMap,B.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,B.map=F.map,B.clipShadows=F.clipShadows,B.clippingPlanes=F.clippingPlanes,B.clipIntersection=F.clipIntersection,B.displacementMap=F.displacementMap,B.displacementScale=F.displacementScale,B.displacementBias=F.displacementBias,B.wireframeLinewidth=F.wireframeLinewidth,B.linewidth=F.linewidth,S.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const te=n.properties.get(B);te.light=S}return B}function M(C,F,S,I,B){if(C.visible===!1)return;if(C.layers.test(F.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&B===Bs)&&(!C.frustumCulled||C.intersectsFrustum(i))){C.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,C.matrixWorld);const re=e.update(C),V=C.material;if(Array.isArray(V)){const Q=re.groups;for(let oe=0,j=Q.length;oe<j;oe++){const de=Q[oe],le=V[de.materialIndex];if(le&&le.visible){const ge=L(C,le,I,B);C.onBeforeShadow(n,C,F,S,re,ge,de),n.renderBufferDirect(S,null,re,ge,C,de),C.onAfterShadow(n,C,F,S,re,ge,de)}}}else if(V.visible){const Q=L(C,V,I,B);C.onBeforeShadow(n,C,F,S,re,Q,null),n.renderBufferDirect(S,null,re,Q,C,null),C.onAfterShadow(n,C,F,S,re,Q,null)}}const te=C.children;for(let re=0,V=te.length;re<V;re++)M(te[re],F,S,I,B)}function R(C){C.target.removeEventListener("dispose",R);for(const S in c){const I=c[S],B=C.target.uuid;B in I&&(I[B].dispose(),delete I[B])}}}function fE(n,e){function t(){let Y=!1;const Fe=new Bt;let ve=null;const ze=new Bt(0,0,0,0);return{setMask:function(Ve){ve!==Ve&&!Y&&(n.colorMask(Ve,Ve,Ve,Ve),ve=Ve)},setLocked:function(Ve){Y=Ve},setClear:function(Ve,be,Qe,Ze,Rt){Rt===!0&&(Ve*=Ze,be*=Ze,Qe*=Ze),Fe.set(Ve,be,Qe,Ze),ze.equals(Fe)===!1&&(n.clearColor(Ve,be,Qe,Ze),ze.copy(Fe))},reset:function(){Y=!1,ve=null,ze.set(-1,0,0,0)}}}function i(){let Y=!1,Fe=!1,ve=null,ze=null,Ve=null;return{setReversed:function(be){if(Fe!==be){const Qe=e.get("EXT_clip_control");be?Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.ZERO_TO_ONE_EXT):Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.NEGATIVE_ONE_TO_ONE_EXT),Fe=be;const Ze=Ve;Ve=null,this.setClear(Ze)}},getReversed:function(){return Fe},setTest:function(be){be?A(n.DEPTH_TEST):J(n.DEPTH_TEST)},setMask:function(be){ve!==be&&!Y&&(n.depthMask(be),ve=be)},setFunc:function(be){if(Fe&&(be=t0[be]),ze!==be){switch(be){case Sc:n.depthFunc(n.NEVER);break;case Mc:n.depthFunc(n.ALWAYS);break;case yc:n.depthFunc(n.LESS);break;case ra:n.depthFunc(n.LEQUAL);break;case bc:n.depthFunc(n.EQUAL);break;case Ec:n.depthFunc(n.GEQUAL);break;case Tc:n.depthFunc(n.GREATER);break;case Ac:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ze=be}},setLocked:function(be){Y=be},setClear:function(be){Ve!==be&&(Ve=be,Fe&&(be=1-be),n.clearDepth(be))},reset:function(){Y=!1,ve=null,ze=null,Ve=null,Fe=!1}}}function r(){let Y=!1,Fe=null,ve=null,ze=null,Ve=null,be=null,Qe=null,Ze=null,Rt=null;return{setTest:function(pt){Y||(pt?A(n.STENCIL_TEST):J(n.STENCIL_TEST))},setMask:function(pt){Fe!==pt&&!Y&&(n.stencilMask(pt),Fe=pt)},setFunc:function(pt,hn,Ln){(ve!==pt||ze!==hn||Ve!==Ln)&&(n.stencilFunc(pt,hn,Ln),ve=pt,ze=hn,Ve=Ln)},setOp:function(pt,hn,Ln){(be!==pt||Qe!==hn||Ze!==Ln)&&(n.stencilOp(pt,hn,Ln),be=pt,Qe=hn,Ze=Ln)},setLocked:function(pt){Y=pt},setClear:function(pt){Rt!==pt&&(n.clearStencil(pt),Rt=pt)},reset:function(){Y=!1,Fe=null,ve=null,ze=null,Ve=null,be=null,Qe=null,Ze=null,Rt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,_=[],y=null,m=!1,p=null,T=null,L=null,M=null,R=null,C=null,F=null,S=new _t(0,0,0),I=0,B=!1,X=null,te=null,re=null,V=null,Q=null;const oe=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,de=0;const le=n.getParameter(n.VERSION);le.indexOf("WebGL")!==-1?(de=parseFloat(/^WebGL (\d)/.exec(le)[1]),j=de>=1):le.indexOf("OpenGL ES")!==-1&&(de=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),j=de>=2);let ge=null,pe={};const De=n.getParameter(n.SCISSOR_BOX),Me=n.getParameter(n.VIEWPORT),it=new Bt().fromArray(De),We=new Bt().fromArray(Me);function nt(Y,Fe,ve,ze){const Ve=new Uint8Array(4),be=n.createTexture();n.bindTexture(Y,be),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Qe=0;Qe<ve;Qe++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(Fe,0,n.RGBA,1,1,ze,0,n.RGBA,n.UNSIGNED_BYTE,Ve):n.texImage2D(Fe+Qe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ve);return be}const q={};q[n.TEXTURE_2D]=nt(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=nt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=nt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=nt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),A(n.DEPTH_TEST),a.setFunc(ra),H(!1),ee(Wh),A(n.CULL_FACE),G(Hi);function A(Y){u[Y]!==!0&&(n.enable(Y),u[Y]=!0)}function J(Y){u[Y]!==!1&&(n.disable(Y),u[Y]=!1)}function Le(Y,Fe){return h[Y]!==Fe?(n.bindFramebuffer(Y,Fe),h[Y]=Fe,Y===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Fe),Y===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Fe),!0):!1}function we(Y,Fe){let ve=_,ze=!1;if(Y){ve=d.get(Fe),ve===void 0&&(ve=[],d.set(Fe,ve));const Ve=Y.textures;if(ve.length!==Ve.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let be=0,Qe=Ve.length;be<Qe;be++)ve[be]=n.COLOR_ATTACHMENT0+be;ve.length=Ve.length,ze=!0}}else ve[0]!==n.BACK&&(ve[0]=n.BACK,ze=!0);ze&&n.drawBuffers(ve)}function w(Y){return y!==Y?(n.useProgram(Y),y=Y,!0):!1}const N={[es]:n.FUNC_ADD,[yv]:n.FUNC_SUBTRACT,[bv]:n.FUNC_REVERSE_SUBTRACT};N[Ev]=n.MIN,N[Tv]=n.MAX;const U={[Av]:n.ZERO,[wv]:n.ONE,[Rv]:n.SRC_COLOR,[fp]:n.SRC_ALPHA,[Uv]:n.SRC_ALPHA_SATURATE,[Dv]:n.DST_COLOR,[Pv]:n.DST_ALPHA,[Cv]:n.ONE_MINUS_SRC_COLOR,[dp]:n.ONE_MINUS_SRC_ALPHA,[Iv]:n.ONE_MINUS_DST_COLOR,[Lv]:n.ONE_MINUS_DST_ALPHA,[Nv]:n.CONSTANT_COLOR,[Fv]:n.ONE_MINUS_CONSTANT_COLOR,[Ov]:n.CONSTANT_ALPHA,[Bv]:n.ONE_MINUS_CONSTANT_ALPHA};function G(Y,Fe,ve,ze,Ve,be,Qe,Ze,Rt,pt){if(Y===Hi){m===!0&&(J(n.BLEND),m=!1);return}if(m===!1&&(A(n.BLEND),m=!0),Y!==Mv){if(Y!==p||pt!==B){if((T!==es||R!==es)&&(n.blendEquation(n.FUNC_ADD),T=es,R=es),pt)switch(Y){case qs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xh:n.blendFunc(n.ONE,n.ONE);break;case $h:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:vt("WebGLState: Invalid blending: ",Y);break}else switch(Y){case qs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case $h:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qh:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",Y);break}L=null,M=null,C=null,F=null,S.set(0,0,0),I=0,p=Y,B=pt}return}Ve=Ve||Fe,be=be||ve,Qe=Qe||ze,(Fe!==T||Ve!==R)&&(n.blendEquationSeparate(N[Fe],N[Ve]),T=Fe,R=Ve),(ve!==L||ze!==M||be!==C||Qe!==F)&&(n.blendFuncSeparate(U[ve],U[ze],U[be],U[Qe]),L=ve,M=ze,C=be,F=Qe),(Ze.equals(S)===!1||Rt!==I)&&(n.blendColor(Ze.r,Ze.g,Ze.b,Rt),S.copy(Ze),I=Rt),p=Y,B=!1}function k(Y,Fe){Y.side===hi?J(n.CULL_FACE):A(n.CULL_FACE);let ve=Y.side===Tn;Fe&&(ve=!ve),H(ve),Y.blending===qs&&Y.transparent===!1?G(Hi):G(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),s.setMask(Y.colorWrite);const ze=Y.stencilWrite;o.setTest(ze),ze&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),ce(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?A(n.SAMPLE_ALPHA_TO_COVERAGE):J(n.SAMPLE_ALPHA_TO_COVERAGE)}function H(Y){X!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),X=Y)}function ee(Y){Y!==vv?(A(n.CULL_FACE),Y!==te&&(Y===Wh?n.cullFace(n.BACK):Y===xv?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):J(n.CULL_FACE),te=Y}function fe(Y){Y!==re&&(j&&n.lineWidth(Y),re=Y)}function ce(Y,Fe,ve){Y?(A(n.POLYGON_OFFSET_FILL),(V!==Fe||Q!==ve)&&(V=Fe,Q=ve,a.getReversed()&&(Fe=-Fe),n.polygonOffset(Fe,ve))):J(n.POLYGON_OFFSET_FILL)}function ie(Y){Y?A(n.SCISSOR_TEST):J(n.SCISSOR_TEST)}function Ee(Y){Y===void 0&&(Y=n.TEXTURE0+oe-1),ge!==Y&&(n.activeTexture(Y),ge=Y)}function P(Y,Fe,ve){ve===void 0&&(ge===null?ve=n.TEXTURE0+oe-1:ve=ge);let ze=pe[ve];ze===void 0&&(ze={type:void 0,texture:void 0},pe[ve]=ze),(ze.type!==Y||ze.texture!==Fe)&&(ge!==ve&&(n.activeTexture(ve),ge=ve),n.bindTexture(Y,Fe||q[Y]),ze.type=Y,ze.texture=Fe)}function Ae(){const Y=pe[ge];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Ie(){try{n.compressedTexImage2D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function g(){try{n.texSubImage2D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function O(){try{n.texSubImage3D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function ne(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function Te(){try{n.texStorage2D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function Ce(){try{n.texStorage3D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function me(){try{n.texImage2D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function xe(){try{n.texImage3D(...arguments)}catch(Y){vt("WebGLState:",Y)}}function Re(Y){return f[Y]!==void 0?f[Y]:n.getParameter(Y)}function ke(Y,Fe){f[Y]!==Fe&&(n.pixelStorei(Y,Fe),f[Y]=Fe)}function Be(Y){it.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),it.copy(Y))}function Ne(Y){We.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),We.copy(Y))}function Je(Y,Fe){let ve=c.get(Fe);ve===void 0&&(ve=new WeakMap,c.set(Fe,ve));let ze=ve.get(Y);ze===void 0&&(ze=n.getUniformBlockIndex(Fe,Y.name),ve.set(Y,ze))}function je(Y,Fe){const ze=c.get(Fe).get(Y);l.get(Fe)!==ze&&(n.uniformBlockBinding(Fe,ze,Y.__bindingPointIndex),l.set(Fe,ze))}function ot(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},ge=null,pe={},h={},d=new WeakMap,_=[],y=null,m=!1,p=null,T=null,L=null,M=null,R=null,C=null,F=null,S=new _t(0,0,0),I=0,B=!1,X=null,te=null,re=null,V=null,Q=null,it.set(0,0,n.canvas.width,n.canvas.height),We.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:A,disable:J,bindFramebuffer:Le,drawBuffers:we,useProgram:w,setBlending:G,setMaterial:k,setFlipSided:H,setCullFace:ee,setLineWidth:fe,setPolygonOffset:ce,setScissorTest:ie,activeTexture:Ee,bindTexture:P,unbindTexture:Ae,compressedTexImage2D:Ie,compressedTexImage3D:E,texImage2D:me,texImage3D:xe,pixelStorei:ke,getParameter:Re,updateUBOMapping:Je,uniformBlockBinding:je,texStorage2D:Te,texStorage3D:Ce,texSubImage2D:g,texSubImage3D:O,compressedTexSubImage2D:K,compressedTexSubImage3D:ne,scissor:Be,viewport:Ne,reset:ot}}function dE(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ue,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(E,g){return _?new OffscreenCanvas(E,g):Io("canvas")}function m(E,g,O){let K=1;const ne=Ie(E);if((ne.width>O||ne.height>O)&&(K=O/Math.max(ne.width,ne.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Te=Math.floor(K*ne.width),Ce=Math.floor(K*ne.height);h===void 0&&(h=y(Te,Ce));const me=g?y(Te,Ce):h;return me.width=Te,me.height=Ce,me.getContext("2d").drawImage(E,0,0,Te,Ce),rt("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+Te+"x"+Ce+")."),me}else return"data"in E&&rt("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),E;return E}function p(E){return E.generateMipmaps}function T(E){n.generateMipmap(E)}function L(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(E,g,O,K,ne,Te=!1){if(E!==null){if(n[E]!==void 0)return n[E];rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Ce;K&&(Ce=e.get("EXT_texture_norm16"),Ce||rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let me=g;if(g===n.RED&&(O===n.FLOAT&&(me=n.R32F),O===n.HALF_FLOAT&&(me=n.R16F),O===n.UNSIGNED_BYTE&&(me=n.R8),O===n.UNSIGNED_SHORT&&Ce&&(me=Ce.R16_EXT),O===n.SHORT&&Ce&&(me=Ce.R16_SNORM_EXT)),g===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(me=n.R8UI),O===n.UNSIGNED_SHORT&&(me=n.R16UI),O===n.UNSIGNED_INT&&(me=n.R32UI),O===n.BYTE&&(me=n.R8I),O===n.SHORT&&(me=n.R16I),O===n.INT&&(me=n.R32I)),g===n.RG&&(O===n.FLOAT&&(me=n.RG32F),O===n.HALF_FLOAT&&(me=n.RG16F),O===n.UNSIGNED_BYTE&&(me=n.RG8),O===n.UNSIGNED_SHORT&&Ce&&(me=Ce.RG16_EXT),O===n.SHORT&&Ce&&(me=Ce.RG16_SNORM_EXT)),g===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(me=n.RG8UI),O===n.UNSIGNED_SHORT&&(me=n.RG16UI),O===n.UNSIGNED_INT&&(me=n.RG32UI),O===n.BYTE&&(me=n.RG8I),O===n.SHORT&&(me=n.RG16I),O===n.INT&&(me=n.RG32I)),g===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(me=n.RGB8UI),O===n.UNSIGNED_SHORT&&(me=n.RGB16UI),O===n.UNSIGNED_INT&&(me=n.RGB32UI),O===n.BYTE&&(me=n.RGB8I),O===n.SHORT&&(me=n.RGB16I),O===n.INT&&(me=n.RGB32I)),g===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(me=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(me=n.RGBA16UI),O===n.UNSIGNED_INT&&(me=n.RGBA32UI),O===n.BYTE&&(me=n.RGBA8I),O===n.SHORT&&(me=n.RGBA16I),O===n.INT&&(me=n.RGBA32I)),g===n.RGB&&(O===n.UNSIGNED_SHORT&&Ce&&(me=Ce.RGB16_EXT),O===n.SHORT&&Ce&&(me=Ce.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(me=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(me=n.R11F_G11F_B10F)),g===n.RGBA){const xe=Te?Do:gt.getTransfer(ne);O===n.FLOAT&&(me=n.RGBA32F),O===n.HALF_FLOAT&&(me=n.RGBA16F),O===n.UNSIGNED_BYTE&&(me=xe===At?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&Ce&&(me=Ce.RGBA16_EXT),O===n.SHORT&&Ce&&(me=Ce.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(me=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(me=n.RGB5_A1)}return(me===n.R16F||me===n.R32F||me===n.RG16F||me===n.RG32F||me===n.RGBA16F||me===n.RGBA32F)&&e.get("EXT_color_buffer_float"),me}function R(E,g){let O;return E?g===null||g===vi||g===aa?O=n.DEPTH24_STENCIL8:g===fi?O=n.DEPTH32F_STENCIL8:g===sa&&(O=n.DEPTH24_STENCIL8,rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===vi||g===aa?O=n.DEPTH_COMPONENT24:g===fi?O=n.DEPTH_COMPONENT32F:g===sa&&(O=n.DEPTH_COMPONENT16),O}function C(E,g){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==tn&&E.minFilter!==ln?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function F(E){const g=E.target;g.removeEventListener("dispose",F),I(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&f.delete(g)}function S(E){const g=E.target;g.removeEventListener("dispose",S),X(g)}function I(E){const g=i.get(E);if(g.__webglInit===void 0)return;const O=E.source,K=d.get(O);if(K){const ne=K[g.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&B(E),Object.keys(K).length===0&&d.delete(O)}i.remove(E)}function B(E){const g=i.get(E);n.deleteTexture(g.__webglTexture);const O=E.source,K=d.get(O);delete K[g.__cacheKey],a.memory.textures--}function X(E){const g=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(g.__webglFramebuffer[K]))for(let ne=0;ne<g.__webglFramebuffer[K].length;ne++)n.deleteFramebuffer(g.__webglFramebuffer[K][ne]);else n.deleteFramebuffer(g.__webglFramebuffer[K]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[K])}else{if(Array.isArray(g.__webglFramebuffer))for(let K=0;K<g.__webglFramebuffer.length;K++)n.deleteFramebuffer(g.__webglFramebuffer[K]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let K=0;K<g.__webglColorRenderbuffer.length;K++)g.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[K]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const O=E.textures;for(let K=0,ne=O.length;K<ne;K++){const Te=i.get(O[K]);Te.__webglTexture&&(n.deleteTexture(Te.__webglTexture),a.memory.textures--),i.remove(O[K])}i.remove(E)}let te=0;function re(){te=0}function V(){return te}function Q(E){te=E}function oe(){const E=te;return E>=r.maxTextures&&rt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+r.maxTextures),te+=1,E}function j(E){const g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function de(E,g){const O=i.get(E);if(E.isVideoTexture&&P(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&O.__version!==E.version){const K=E.image;if(K===null)rt("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)rt("WebGLRenderer: Texture marked for update but image is incomplete");else{J(O,E,g);return}}else E.isExternalTexture&&(O.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+g)}function le(E,g){const O=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){J(O,E,g);return}else E.isExternalTexture&&(O.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+g)}function ge(E,g){const O=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){J(O,E,g);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+g)}function pe(E,g){const O=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&O.__version!==E.version){Le(O,E,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+g)}const De={[wc]:n.REPEAT,[Oi]:n.CLAMP_TO_EDGE,[Rc]:n.MIRRORED_REPEAT},Me={[tn]:n.NEAREST,[Hv]:n.NEAREST_MIPMAP_NEAREST,[Da]:n.NEAREST_MIPMAP_LINEAR,[ln]:n.LINEAR,[Al]:n.LINEAR_MIPMAP_NEAREST,[Cr]:n.LINEAR_MIPMAP_LINEAR},it={[Xv]:n.NEVER,[Zv]:n.ALWAYS,[$v]:n.LESS,[Ou]:n.LEQUAL,[qv]:n.EQUAL,[Bu]:n.GEQUAL,[Yv]:n.GREATER,[Kv]:n.NOTEQUAL};function We(E,g){if(g.type===fi&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===ln||g.magFilter===Al||g.magFilter===Da||g.magFilter===Cr||g.minFilter===ln||g.minFilter===Al||g.minFilter===Da||g.minFilter===Cr)&&rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,De[g.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,De[g.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,De[g.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,Me[g.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,Me[g.minFilter]),g.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,it[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===tn||g.minFilter!==Da&&g.minFilter!==Cr||g.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function nt(E,g){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",F));const K=g.source;let ne=d.get(K);ne===void 0&&(ne={},d.set(K,ne));const Te=j(g);if(Te!==E.__cacheKey){ne[Te]===void 0&&(ne[Te]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),ne[Te].usedTimes++;const Ce=ne[E.__cacheKey];Ce!==void 0&&(ne[E.__cacheKey].usedTimes--,Ce.usedTimes===0&&B(g)),E.__cacheKey=Te,E.__webglTexture=ne[Te].texture}return O}function q(E,g,O){return Math.floor(Math.floor(E/O)/g)}function A(E,g,O,K){const Te=E.updateRanges;if(Te.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,O,K,g.data);else{Te.sort((ke,Be)=>ke.start-Be.start);let Ce=0;for(let ke=1;ke<Te.length;ke++){const Be=Te[Ce],Ne=Te[ke],Je=Be.start+Be.count,je=q(Ne.start,g.width,4),ot=q(Be.start,g.width,4);Ne.start<=Je+1&&je===ot&&q(Ne.start+Ne.count-1,g.width,4)===je?Be.count=Math.max(Be.count,Ne.start+Ne.count-Be.start):(++Ce,Te[Ce]=Ne)}Te.length=Ce+1;const me=t.getParameter(n.UNPACK_ROW_LENGTH),xe=t.getParameter(n.UNPACK_SKIP_PIXELS),Re=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let ke=0,Be=Te.length;ke<Be;ke++){const Ne=Te[ke],Je=Math.floor(Ne.start/4),je=Math.ceil(Ne.count/4),ot=Je%g.width,Y=Math.floor(Je/g.width),Fe=je,ve=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ot),t.pixelStorei(n.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(n.TEXTURE_2D,0,ot,Y,Fe,ve,O,K,g.data)}E.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,me),t.pixelStorei(n.UNPACK_SKIP_PIXELS,xe),t.pixelStorei(n.UNPACK_SKIP_ROWS,Re)}}function J(E,g,O){let K=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(K=n.TEXTURE_3D);const ne=nt(E,g),Te=g.source;t.bindTexture(K,E.__webglTexture,n.TEXTURE0+O);const Ce=i.get(Te);if(Te.version!==Ce.__version||ne===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const ve=gt.getPrimaries(gt.workingColorSpace),ze=g.colorSpace===rr?null:gt.getPrimaries(g.colorSpace),Ve=g.colorSpace===rr||ve===ze?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve)}t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment);let xe=m(g.image,!1,r.maxTextureSize);xe=Ae(g,xe);const Re=s.convert(g.format,g.colorSpace),ke=s.convert(g.type);let Be=M(g.internalFormat,Re,ke,g.normalized,g.colorSpace,g.isVideoTexture);We(K,g);let Ne;const Je=g.mipmaps,je=g.isVideoTexture!==!0,ot=Ce.__version===void 0||ne===!0,Y=Te.dataReady,Fe=C(g,xe);if(g.isDepthTexture)Be=R(g.format===Pr,g.type),ot&&(je?t.texStorage2D(n.TEXTURE_2D,1,Be,xe.width,xe.height):t.texImage2D(n.TEXTURE_2D,0,Be,xe.width,xe.height,0,Re,ke,null));else if(g.isDataTexture)if(Je.length>0){je&&ot&&t.texStorage2D(n.TEXTURE_2D,Fe,Be,Je[0].width,Je[0].height);for(let ve=0,ze=Je.length;ve<ze;ve++)Ne=Je[ve],je?Y&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,Ne.width,Ne.height,Re,ke,Ne.data):t.texImage2D(n.TEXTURE_2D,ve,Be,Ne.width,Ne.height,0,Re,ke,Ne.data);g.generateMipmaps=!1}else je?(ot&&t.texStorage2D(n.TEXTURE_2D,Fe,Be,xe.width,xe.height),Y&&A(g,xe,Re,ke)):t.texImage2D(n.TEXTURE_2D,0,Be,xe.width,xe.height,0,Re,ke,xe.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){je&&ot&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Fe,Be,Je[0].width,Je[0].height,xe.depth);for(let ve=0,ze=Je.length;ve<ze;ve++)if(Ne=Je[ve],g.format!==Kn)if(Re!==null)if(je){if(Y)if(g.layerUpdates.size>0){const Ve=Lf(Ne.width,Ne.height,g.format,g.type);for(const be of g.layerUpdates){const Qe=Ne.data.subarray(be*Ve/Ne.data.BYTES_PER_ELEMENT,(be+1)*Ve/Ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,be,Ne.width,Ne.height,1,Re,Qe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,Ne.width,Ne.height,xe.depth,Re,Ne.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ve,Be,Ne.width,Ne.height,xe.depth,0,Ne.data,0,0);else rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?Y&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,Ne.width,Ne.height,xe.depth,Re,ke,Ne.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ve,Be,Ne.width,Ne.height,xe.depth,0,Re,ke,Ne.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{je&&ot&&t.texStorage2D(n.TEXTURE_2D,Fe,Be,Je[0].width,Je[0].height);for(let ve=0,ze=Je.length;ve<ze;ve++)Ne=Je[ve],g.format!==Kn?Re!==null?je?Y&&t.compressedTexSubImage2D(n.TEXTURE_2D,ve,0,0,Ne.width,Ne.height,Re,Ne.data):t.compressedTexImage2D(n.TEXTURE_2D,ve,Be,Ne.width,Ne.height,0,Ne.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?Y&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,Ne.width,Ne.height,Re,ke,Ne.data):t.texImage2D(n.TEXTURE_2D,ve,Be,Ne.width,Ne.height,0,Re,ke,Ne.data)}else if(g.isDataArrayTexture)if(je){if(ot&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Fe,Be,xe.width,xe.height,xe.depth),Y)if(g.layerUpdates.size>0){const ve=Lf(xe.width,xe.height,g.format,g.type);for(const ze of g.layerUpdates){const Ve=xe.data.subarray(ze*ve/xe.data.BYTES_PER_ELEMENT,(ze+1)*ve/xe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ze,xe.width,xe.height,1,Re,ke,Ve)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,Re,ke,xe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Be,xe.width,xe.height,xe.depth,0,Re,ke,xe.data);else if(g.isData3DTexture)je?(ot&&t.texStorage3D(n.TEXTURE_3D,Fe,Be,xe.width,xe.height,xe.depth),Y&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,Re,ke,xe.data)):t.texImage3D(n.TEXTURE_3D,0,Be,xe.width,xe.height,xe.depth,0,Re,ke,xe.data);else if(g.isFramebufferTexture){if(ot)if(je)t.texStorage2D(n.TEXTURE_2D,Fe,Be,xe.width,xe.height);else{let ve=xe.width,ze=xe.height;for(let Ve=0;Ve<Fe;Ve++)t.texImage2D(n.TEXTURE_2D,Ve,Be,ve,ze,0,Re,ke,null),ve>>=1,ze>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in n){const ve=n.canvas;if(ve.hasAttribute("layoutsubtree")||ve.setAttribute("layoutsubtree","true"),xe.parentNode!==ve){ve.appendChild(xe),f.add(g),ve.onpaint=ze=>{const Ve=ze.changedElements;for(const be of f)Ve.includes(be.image)&&(be.needsUpdate=!0)},ve.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,xe);else{const Ve=n.RGBA,be=n.RGBA,Qe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ve,be,Qe,xe)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Je.length>0){if(je&&ot){const ve=Ie(Je[0]);t.texStorage2D(n.TEXTURE_2D,Fe,Be,ve.width,ve.height)}for(let ve=0,ze=Je.length;ve<ze;ve++)Ne=Je[ve],je?Y&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,Re,ke,Ne):t.texImage2D(n.TEXTURE_2D,ve,Be,Re,ke,Ne);g.generateMipmaps=!1}else if(je){if(ot){const ve=Ie(xe);t.texStorage2D(n.TEXTURE_2D,Fe,Be,ve.width,ve.height)}Y&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Re,ke,xe)}else t.texImage2D(n.TEXTURE_2D,0,Be,Re,ke,xe);p(g)&&T(K),Ce.__version=Te.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function Le(E,g,O){if(g.image.length!==6)return;const K=nt(E,g),ne=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+O);const Te=i.get(ne);if(ne.version!==Te.__version||K===!0){t.activeTexture(n.TEXTURE0+O);const Ce=gt.getPrimaries(gt.workingColorSpace),me=g.colorSpace===rr?null:gt.getPrimaries(g.colorSpace),xe=g.colorSpace===rr||Ce===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Re=g.isCompressedTexture||g.image[0].isCompressedTexture,ke=g.image[0]&&g.image[0].isDataTexture,Be=[];for(let be=0;be<6;be++)!Re&&!ke?Be[be]=m(g.image[be],!0,r.maxCubemapSize):Be[be]=ke?g.image[be].image:g.image[be],Be[be]=Ae(g,Be[be]);const Ne=Be[0],Je=s.convert(g.format,g.colorSpace),je=s.convert(g.type),ot=M(g.internalFormat,Je,je,g.normalized,g.colorSpace),Y=g.isVideoTexture!==!0,Fe=Te.__version===void 0||K===!0,ve=ne.dataReady;let ze=C(g,Ne);We(n.TEXTURE_CUBE_MAP,g);let Ve;if(Re){Y&&Fe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ze,ot,Ne.width,Ne.height);for(let be=0;be<6;be++){Ve=Be[be].mipmaps;for(let Qe=0;Qe<Ve.length;Qe++){const Ze=Ve[Qe];g.format!==Kn?Je!==null?Y?ve&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe,0,0,Ze.width,Ze.height,Je,Ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe,ot,Ze.width,Ze.height,0,Ze.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe,0,0,Ze.width,Ze.height,Je,je,Ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe,ot,Ze.width,Ze.height,0,Je,je,Ze.data)}}}else{if(Ve=g.mipmaps,Y&&Fe){Ve.length>0&&ze++;const be=Ie(Be[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ze,ot,be.width,be.height)}for(let be=0;be<6;be++)if(ke){Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Be[be].width,Be[be].height,Je,je,Be[be].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,ot,Be[be].width,Be[be].height,0,Je,je,Be[be].data);for(let Qe=0;Qe<Ve.length;Qe++){const Rt=Ve[Qe].image[be].image;Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe+1,0,0,Rt.width,Rt.height,Je,je,Rt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe+1,ot,Rt.width,Rt.height,0,Je,je,Rt.data)}}else{Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Je,je,Be[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,ot,Je,je,Be[be]);for(let Qe=0;Qe<Ve.length;Qe++){const Ze=Ve[Qe];Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe+1,0,0,Je,je,Ze.image[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,Qe+1,ot,Je,je,Ze.image[be])}}}p(g)&&T(n.TEXTURE_CUBE_MAP),Te.__version=ne.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function we(E,g,O,K,ne,Te){const Ce=s.convert(O.format,O.colorSpace),me=s.convert(O.type),xe=M(O.internalFormat,Ce,me,O.normalized,O.colorSpace),Re=i.get(g),ke=i.get(O);if(ke.__renderTarget=g,!Re.__hasExternalTextures){const Be=Math.max(1,g.width>>Te),Ne=Math.max(1,g.height>>Te);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,Te,xe,Be,Ne,g.depth,0,Ce,me,null):t.texImage2D(ne,Te,xe,Be,Ne,0,Ce,me,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),Ee(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,ne,ke.__webglTexture,0,ie(g)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,ne,ke.__webglTexture,Te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function w(E,g,O){if(n.bindRenderbuffer(n.RENDERBUFFER,E),g.depthBuffer){const K=g.depthTexture,ne=K&&K.isDepthTexture?K.type:null,Te=R(g.stencilBuffer,ne),Ce=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ee(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie(g),Te,g.width,g.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie(g),Te,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,Te,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ce,n.RENDERBUFFER,E)}else{const K=g.textures;for(let ne=0;ne<K.length;ne++){const Te=K[ne],Ce=s.convert(Te.format,Te.colorSpace),me=s.convert(Te.type),xe=M(Te.internalFormat,Ce,me,Te.normalized,Te.colorSpace);Ee(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie(g),xe,g.width,g.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie(g),xe,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,xe,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function N(E,g,O){const K=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=i.get(g.depthTexture);if(ne.__renderTarget=g,(!ne.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,g.depthTexture.addEventListener("dispose",F)),ne.__webglTexture===void 0){ne.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),We(n.TEXTURE_CUBE_MAP,g.depthTexture);const Re=s.convert(g.depthTexture.format),ke=s.convert(g.depthTexture.type);let Be;g.depthTexture.format===qi?Be=n.DEPTH_COMPONENT24:g.depthTexture.format===Pr&&(Be=n.DEPTH24_STENCIL8);for(let Ne=0;Ne<6;Ne++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0,Be,g.width,g.height,0,Re,ke,null)}}else de(g.depthTexture,0);const Te=ne.__webglTexture,Ce=ie(g),me=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,xe=g.depthTexture.format===Pr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===qi)Ee(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xe,me,Te,0,Ce):n.framebufferTexture2D(n.FRAMEBUFFER,xe,me,Te,0);else if(g.depthTexture.format===Pr)Ee(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xe,me,Te,0,Ce):n.framebufferTexture2D(n.FRAMEBUFFER,xe,me,Te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function U(E){const g=i.get(E),O=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){const K=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),K){const ne=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,K.removeEventListener("dispose",ne)};K.addEventListener("dispose",ne),g.__depthDisposeCallback=ne}g.__boundDepthTexture=K}if(E.depthTexture&&!g.__autoAllocateDepthBuffer)if(O)for(let K=0;K<6;K++)N(g.__webglFramebuffer[K],E,K);else{const K=E.texture.mipmaps;K&&K.length>0?N(g.__webglFramebuffer[0],E,0):N(g.__webglFramebuffer,E,0)}else if(O){g.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[K]),g.__webglDepthbuffer[K]===void 0)g.__webglDepthbuffer[K]=n.createRenderbuffer(),w(g.__webglDepthbuffer[K],E,!1);else{const ne=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=g.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,Te),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,Te)}}else{const K=E.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),w(g.__webglDepthbuffer,E,!1);else{const ne=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Te),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,Te)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function G(E,g,O){const K=i.get(E);g!==void 0&&we(K.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&U(E)}function k(E){const g=E.texture,O=i.get(E),K=i.get(g);E.addEventListener("dispose",S);const ne=E.textures,Te=E.isWebGLCubeRenderTarget===!0,Ce=ne.length>1;if(Ce||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=g.version,a.memory.textures++),Te){O.__webglFramebuffer=[];for(let me=0;me<6;me++)if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer[me]=[];for(let xe=0;xe<g.mipmaps.length;xe++)O.__webglFramebuffer[me][xe]=n.createFramebuffer()}else O.__webglFramebuffer[me]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer=[];for(let me=0;me<g.mipmaps.length;me++)O.__webglFramebuffer[me]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Ce)for(let me=0,xe=ne.length;me<xe;me++){const Re=i.get(ne[me]);Re.__webglTexture===void 0&&(Re.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&Ee(E)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let me=0;me<ne.length;me++){const xe=ne[me];O.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[me]);const Re=s.convert(xe.format,xe.colorSpace),ke=s.convert(xe.type),Be=M(xe.internalFormat,Re,ke,xe.normalized,xe.colorSpace,E.isXRRenderTarget===!0),Ne=ie(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,Be,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,O.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),w(O.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Te){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),We(n.TEXTURE_CUBE_MAP,g);for(let me=0;me<6;me++)if(g.mipmaps&&g.mipmaps.length>0)for(let xe=0;xe<g.mipmaps.length;xe++)we(O.__webglFramebuffer[me][xe],E,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,xe);else we(O.__webglFramebuffer[me],E,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);p(g)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let me=0,xe=ne.length;me<xe;me++){const Re=ne[me],ke=i.get(Re);let Be=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Be=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Be,ke.__webglTexture),We(Be,Re),we(O.__webglFramebuffer,E,Re,n.COLOR_ATTACHMENT0+me,Be,0),p(Re)&&T(Be)}t.unbindTexture()}else{let me=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(me=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,K.__webglTexture),We(me,g),g.mipmaps&&g.mipmaps.length>0)for(let xe=0;xe<g.mipmaps.length;xe++)we(O.__webglFramebuffer[xe],E,g,n.COLOR_ATTACHMENT0,me,xe);else we(O.__webglFramebuffer,E,g,n.COLOR_ATTACHMENT0,me,0);p(g)&&T(me),t.unbindTexture()}E.depthBuffer&&U(E)}function H(E){const g=E.textures;for(let O=0,K=g.length;O<K;O++){const ne=g[O];if(p(ne)){const Te=L(E),Ce=i.get(ne).__webglTexture;t.bindTexture(Te,Ce),T(Te),t.unbindTexture()}}}const ee=[],fe=[];function ce(E){if(E.samples>0){if(Ee(E)===!1){const g=E.textures,O=E.width,K=E.height;let ne=n.COLOR_BUFFER_BIT;const Te=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ce=i.get(E),me=g.length>1;if(me)for(let Re=0;Re<g.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const xe=E.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Re=0;Re<g.length;Re++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),me){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ce.__webglColorRenderbuffer[Re]);const ke=i.get(g[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,O,K,0,0,O,K,ne,n.NEAREST),l===!0&&(ee.length=0,fe.length=0,ee.push(n.COLOR_ATTACHMENT0+Re),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(ee.push(Te),fe.push(Te),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<g.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,Ce.__webglColorRenderbuffer[Re]);const ke=i.get(g[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){const g=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function ie(E){return Math.min(r.maxSamples,E.samples)}function Ee(E){const g=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function P(E){const g=a.render.frame;u.get(E)!==g&&(u.set(E,g),E.update())}function Ae(E,g){const O=E.colorSpace,K=E.format,ne=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==Lo&&O!==rr&&(gt.getTransfer(O)===At?(K!==Kn||ne!==Rn)&&rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",O)),g}function Ie(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=oe,this.resetTextureUnits=re,this.getTextureUnits=V,this.setTextureUnits=Q,this.setTexture2D=de,this.setTexture2DArray=le,this.setTexture3D=ge,this.setTextureCube=pe,this.rebindTextures=G,this.setupRenderTarget=k,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=U,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ee,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function pE(n,e){function t(i,r=rr){let s;const a=gt.getTransfer(r);if(i===Rn)return n.UNSIGNED_BYTE;if(i===Du)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Iu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Tp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ap)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===bp)return n.BYTE;if(i===Ep)return n.SHORT;if(i===sa)return n.UNSIGNED_SHORT;if(i===Lu)return n.INT;if(i===vi)return n.UNSIGNED_INT;if(i===fi)return n.FLOAT;if(i===xi)return n.HALF_FLOAT;if(i===wp)return n.ALPHA;if(i===Rp)return n.RGB;if(i===Kn)return n.RGBA;if(i===qi)return n.DEPTH_COMPONENT;if(i===Pr)return n.DEPTH_STENCIL;if(i===Cp)return n.RED;if(i===Uu)return n.RED_INTEGER;if(i===Nr)return n.RG;if(i===Nu)return n.RG_INTEGER;if(i===Fu)return n.RGBA_INTEGER;if(i===po||i===mo||i===go||i===_o)if(a===At)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===po)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===go)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===_o)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===po)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===mo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===go)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===_o)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Cc||i===Pc||i===Lc||i===Dc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Cc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Pc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Lc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Dc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ic||i===Uc||i===Nc||i===Fc||i===Oc||i===Co||i===Bc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ic||i===Uc)return a===At?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Nc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Fc)return s.COMPRESSED_R11_EAC;if(i===Oc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Co)return s.COMPRESSED_RG11_EAC;if(i===Bc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===zc||i===Vc||i===Hc||i===Gc||i===kc||i===Wc||i===Xc||i===$c||i===qc||i===Yc||i===Kc||i===Zc||i===Jc||i===Qc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===zc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Vc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Hc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===kc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$c)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===qc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Yc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Kc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Jc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qc)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===jc||i===eu||i===tu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===jc)return a===At?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===eu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===tu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===nu||i===iu||i===Po||i===ru)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===nu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===iu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Po)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ru)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===aa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const mE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class _E{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Si({vertexShader:mE,fragmentShader:gE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pn(new jo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vE extends ur{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,_=null;const y=typeof XRWebGLBinding<"u",m=new _E,p={},T=t.getContextAttributes();let L=null,M=null;const R=[],C=[],F=new Ue;let S=null,I=null;const B=new Yn;B.viewport=new Bt;const X=new Yn;X.viewport=new Bt;const te=[B,X],re=new Ex;let V=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let A=R[q];return A===void 0&&(A=new Ul,R[q]=A),A.getTargetRaySpace()},this.getControllerGrip=function(q){let A=R[q];return A===void 0&&(A=new Ul,R[q]=A),A.getGripSpace()},this.getHand=function(q){let A=R[q];return A===void 0&&(A=new Ul,R[q]=A),A.getHandSpace()};function oe(q){const A=C.indexOf(q.inputSource);if(A===-1)return;const J=R[A];J!==void 0&&(J.update(q.inputSource,q.frame,c||a),J.dispatchEvent({type:q.type,data:q.inputSource}))}function j(){r.removeEventListener("select",oe),r.removeEventListener("selectstart",oe),r.removeEventListener("selectend",oe),r.removeEventListener("squeeze",oe),r.removeEventListener("squeezestart",oe),r.removeEventListener("squeezeend",oe),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",de);for(let q=0;q<R.length;q++){const A=C[q];A!==null&&(C[q]=null,R[q].disconnect(A))}V=null,Q=null,m.reset();for(const q in p)delete p[q];if(e.setRenderTarget(L),d=null,h=null,f=null,r=null,M=null,nt.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(F.width,F.height,!1),I!==null){const q=I.camera;q.fov=I.fov,q.zoom=I.zoom,q.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(L=e.getRenderTarget(),r.addEventListener("select",oe),r.addEventListener("selectstart",oe),r.addEventListener("selectend",oe),r.addEventListener("squeeze",oe),r.addEventListener("squeezestart",oe),r.addEventListener("squeezeend",oe),r.addEventListener("end",j),r.addEventListener("inputsourceschange",de),T.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(F),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let J=null,Le=null,we=null;T.depth&&(we=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=T.stencil?Pr:qi,Le=T.stencil?aa:vi);const w={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(w),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Qn(h.textureWidth,h.textureHeight,{format:Kn,type:Rn,depthTexture:new la(h.textureWidth,h.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const J={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Qn(d.framebufferWidth,d.framebufferHeight,{format:Kn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),nt.setContext(r),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function de(q){for(let A=0;A<q.removed.length;A++){const J=q.removed[A],Le=C.indexOf(J);Le>=0&&(C[Le]=null,R[Le].disconnect(J))}for(let A=0;A<q.added.length;A++){const J=q.added[A];let Le=C.indexOf(J);if(Le===-1){for(let w=0;w<R.length;w++)if(w>=C.length){C.push(J),Le=w;break}else if(C[w]===null){C[w]=J,Le=w;break}if(Le===-1)break}const we=R[Le];we&&we.connect(J)}}const le=new $,ge=new $;function pe(q,A,J){le.setFromMatrixPosition(A.matrixWorld),ge.setFromMatrixPosition(J.matrixWorld);const Le=le.distanceTo(ge),we=A.projectionMatrix.elements,w=J.projectionMatrix.elements,N=we[14]/(we[10]-1),U=we[14]/(we[10]+1),G=(we[9]+1)/we[5],k=(we[9]-1)/we[5],H=(we[8]-1)/we[0],ee=(w[8]+1)/w[0],fe=N*H,ce=N*ee,ie=Le/(-H+ee),Ee=ie*-H;if(A.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ee),q.translateZ(ie),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),we[10]===-1)q.projectionMatrix.copy(A.projectionMatrix),q.projectionMatrixInverse.copy(A.projectionMatrixInverse);else{const P=N+ie,Ae=U+ie,Ie=fe-Ee,E=ce+(Le-Ee),g=G*U/Ae*P,O=k*U/Ae*P;q.projectionMatrix.makePerspective(Ie,E,g,O,P,Ae),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function De(q,A){A===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(A.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let A=q.near,J=q.far;m.texture!==null&&(m.depthNear>0&&(A=m.depthNear),m.depthFar>0&&(J=m.depthFar)),re.near=X.near=B.near=A,re.far=X.far=B.far=J,(V!==re.near||Q!==re.far)&&(r.updateRenderState({depthNear:re.near,depthFar:re.far}),V=re.near,Q=re.far),re.layers.mask=q.layers.mask|6,B.layers.mask=re.layers.mask&-5,X.layers.mask=re.layers.mask&-3;const Le=q.parent,we=re.cameras;De(re,Le);for(let w=0;w<we.length;w++)De(we[w],Le);we.length===2?pe(re,B,X):re.projectionMatrix.copy(B.projectionMatrix),I===null&&q.isPerspectiveCamera&&(I={camera:q,fov:q.fov,zoom:q.zoom}),Me(q,re,Le)};function Me(q,A,J){J===null?q.matrix.copy(A.matrixWorld):(q.matrix.copy(J.matrixWorld),q.matrix.invert(),q.matrix.multiply(A.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(A.projectionMatrix),q.projectionMatrixInverse.copy(A.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=au*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return re},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(q){l=q,h!==null&&(h.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(re)},this.getCameraTexture=function(q){return p[q]};let it=null;function We(q,A){if(u=A.getViewerPose(c||a),_=A,u!==null){const J=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Le=!1;J.length!==re.cameras.length&&(re.cameras.length=0,Le=!0);for(let U=0;U<J.length;U++){const G=J[U];let k=null;if(d!==null)k=d.getViewport(G);else{const ee=f.getViewSubImage(h,G);k=ee.viewport,U===0&&(e.setRenderTargetTextures(M,ee.colorTexture,ee.depthStencilTexture),e.setRenderTarget(M))}let H=te[U];H===void 0&&(H=new Yn,H.layers.enable(U),H.viewport=new Bt,te[U]=H),H.matrix.fromArray(G.transform.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale),H.projectionMatrix.fromArray(G.projectionMatrix),H.projectionMatrixInverse.copy(H.projectionMatrix).invert(),H.viewport.set(k.x,k.y,k.width,k.height),U===0&&(re.matrix.copy(H.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale)),Le===!0&&re.cameras.push(H)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){f=i.getBinding();const U=f.getDepthInformation(J[0]);U&&U.isValid&&U.texture&&m.init(U,r.renderState)}if(we&&we.includes("camera-access")&&y){e.state.unbindTexture(),f=i.getBinding();for(let U=0;U<J.length;U++){const G=J[U].camera;if(G){let k=p[G];k||(k=new Fp,p[G]=k);const H=f.getCameraImage(G);k.sourceTexture=H}}}}for(let J=0;J<R.length;J++){const Le=C[J],we=R[J];Le!==null&&we!==void 0&&we.update(Le,A,c||a)}it&&it(q,A),A.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:A}),_=null}const nt=new Kp;nt.setAnimationLoop(We),this.setAnimationLoop=function(q){it=q},this.dispose=function(){}}}const xE=new Nt,nm=new lt;nm.set(-1,0,0,0,1,0,0,0,1);function SE(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Xp(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,T,L,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),y(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,L):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),L=T.envMap,M=T.envMapRotation;L&&(m.envMap.value=L,m.envMapRotation.value.setFromMatrix4(xE.makeRotationFromEuler(M)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(nm),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,L){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=L*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ME(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,R){const C=R.program;i.uniformBlockBinding(M,C)}function c(M,R){let C=r[M.id];C===void 0&&(m(M),C=u(M),r[M.id]=C,M.addEventListener("dispose",T));const F=R.program;i.updateUBOMapping(M,F);const S=e.render.frame;s[M.id]!==S&&(h(M),s[M.id]=S)}function u(M){const R=f();M.__bindingPointIndex=R;const C=n.createBuffer(),F=M.__size,S=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,F,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,C),C}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const R=r[M.id],C=M.uniforms,F=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let S=0,I=C.length;S<I;S++){const B=C[S];if(Array.isArray(B))for(let X=0,te=B.length;X<te;X++)d(B[X],S,X,F);else d(B,S,0,F)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,R,C,F){if(y(M,R,C,F)===!0){const S=M.__offset,I=M.value;if(Array.isArray(I)){let B=0;for(let X=0;X<I.length;X++){const te=I[X],re=p(te);_(te,M.__data,B),typeof te!="number"&&typeof te!="boolean"&&!te.isMatrix3&&!ArrayBuffer.isView(te)&&(B+=re.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(I,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,M.__data)}}function _(M,R,C){typeof M=="number"||typeof M=="boolean"?R[0]=M:M.isMatrix3?(R[0]=M.elements[0],R[1]=M.elements[1],R[2]=M.elements[2],R[3]=0,R[4]=M.elements[3],R[5]=M.elements[4],R[6]=M.elements[5],R[7]=0,R[8]=M.elements[6],R[9]=M.elements[7],R[10]=M.elements[8],R[11]=0):ArrayBuffer.isView(M)?R.set(new M.constructor(M.buffer,M.byteOffset,R.length)):M.toArray(R,C)}function y(M,R,C,F){const S=M.value,I=R+"_"+C;if(F[I]===void 0)return typeof S=="number"||typeof S=="boolean"?F[I]=S:ArrayBuffer.isView(S)?F[I]=S.slice():F[I]=S.clone(),!0;{const B=F[I];if(typeof S=="number"||typeof S=="boolean"){if(B!==S)return F[I]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(B.equals(S)===!1)return B.copy(S),!0}}return!1}function m(M){const R=M.uniforms;let C=0;const F=16;for(let I=0,B=R.length;I<B;I++){const X=Array.isArray(R[I])?R[I]:[R[I]];for(let te=0,re=X.length;te<re;te++){const V=X[te],Q=Array.isArray(V.value)?V.value:[V.value];for(let oe=0,j=Q.length;oe<j;oe++){const de=Q[oe],le=p(de),ge=C%F,pe=ge%le.boundary,De=ge+pe;C+=pe,De!==0&&F-De<le.storage&&(C+=F-De),V.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=C,C+=le.storage}}}const S=C%F;return S>0&&(C+=F-S),M.__size=C,M.__cache={},this}function p(M){const R={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(R.boundary=4,R.storage=4):M.isVector2?(R.boundary=8,R.storage=8):M.isVector3||M.isColor?(R.boundary=16,R.storage=12):M.isVector4?(R.boundary=16,R.storage=16):M.isMatrix3?(R.boundary=48,R.storage=48):M.isMatrix4?(R.boundary=64,R.storage=64):M.isTexture?rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(R.boundary=16,R.storage=M.byteLength):rt("WebGLRenderer: Unsupported uniform value type.",M),R}function T(M){const R=M.target;R.removeEventListener("dispose",T);const C=a.indexOf(R.__bindingPointIndex);a.splice(C,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete s[R.id]}function L(){for(const M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:L}}const yE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let si=null;function bE(){return si===null&&(si=new T0(yE,16,16,Nr,xi),si.name="DFG_LUT",si.minFilter=ln,si.magFilter=ln,si.wrapS=Oi,si.wrapT=Oi,si.generateMipmaps=!1,si.needsUpdate=!0),si}class EE{constructor(e={}){const{canvas:t=jv(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Rn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const y=d,m=new Set([Fu,Nu,Uu]),p=new Set([Rn,vi,sa,aa,Du,Iu]),T=new Uint32Array(4),L=new Int32Array(4),M=new $;let R=null,C=null;const F=[],S=[];let I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let X=!1,te=null,re=null,V=null,Q=null;this._outputColorSpace=Fn;let oe=0,j=0,de=null,le=-1,ge=null;const pe=new Bt,De=new Bt;let Me=null;const it=new _t(0);let We=0,nt=t.width,q=t.height,A=1,J=null,Le=null;const we=new Bt(0,0,nt,q),w=new Bt(0,0,nt,q);let N=!1;const U=new Hu;let G=!1,k=!1;const H=new Nt,ee=new $,fe=new Bt,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ie=!1;function Ee(){return de===null?A:1}let P=i;function Ae(b,W){return t.getContext(b,W)}let Ie,E,g,O,K,ne,Te,Ce,me,xe,Re,ke,Be,Ne,Je,je,ot,Y,Fe,ve,ze,Ve,be;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pu}`),t.addEventListener("webglcontextlost",Rt,!1),t.addEventListener("webglcontextrestored",pt,!1),t.addEventListener("webglcontextcreationerror",hn,!1),P===null){const W="webgl2";if(P=Ae(W,b),P===null)throw Ae(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Qe()}catch(b){throw t.removeEventListener("webglcontextlost",Rt,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",hn,!1),vt("WebGLRenderer: "+b.message),b}function Qe(){Ie=new by(P),Ie.init(),ze=new pE(P,Ie),E=new dy(P,Ie,e,ze),g=new fE(P,Ie),E.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),re=P.createFramebuffer(),V=P.createFramebuffer(),Q=P.createFramebuffer(),O=new Ay(P),K=new Qb,ne=new dE(P,Ie,g,K,E,ze,O),Te=new yy(B),Ce=new Rx(P),Ve=new hy(P,Ce),me=new Ey(P,Ce,O,Ve),xe=new Ry(P,me,Ce,Ve,O),Y=new wy(P,E,ne),Je=new py(K),Re=new Jb(B,Te,Ie,E,Ve,Je),ke=new SE(B,K),Be=new eE,Ne=new aE(Ie),ot=new uy(B,Te,g,xe,_,l),je=new hE(B,xe,E),be=new ME(P,O,E,g),Fe=new fy(P,Ie,O),ve=new Ty(P,Ie,O),O.programs=Re.programs,B.capabilities=E,B.extensions=Ie,B.properties=K,B.renderLists=Be,B.shadowMap=je,B.state=g,B.info=O}y!==Rn&&(I=new Py(y,t.width,t.height,o,r,s));const Ze=new vE(B,P);this.xr=Ze,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=Ie.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ie.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return A},this.setPixelRatio=function(b){b!==void 0&&(A=b,this.setSize(nt,q,!1))},this.getSize=function(b){return b.set(nt,q)},this.setSize=function(b,W,ue=!0){if(Ze.isPresenting){rt("WebGLRenderer: Can't change size while VR device is presenting.");return}nt=b,q=W,t.width=Math.floor(b*A),t.height=Math.floor(W*A),ue===!0&&(t.style.width=b+"px",t.style.height=W+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,b,W)},this.getDrawingBufferSize=function(b){return b.set(nt*A,q*A).floor()},this.setDrawingBufferSize=function(b,W,ue){nt=b,q=W,A=ue,t.width=Math.floor(b*ue),t.height=Math.floor(W*ue),this.setViewport(0,0,b,W)},this.setEffects=function(b){if(y===Rn){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let W=0;W<b.length;W++)if(b[W].isOutputPass===!0){rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(pe)},this.getViewport=function(b){return b.copy(we)},this.setViewport=function(b,W,ue,ae){b.isVector4?we.set(b.x,b.y,b.z,b.w):we.set(b,W,ue,ae),g.viewport(pe.copy(we).multiplyScalar(A).round())},this.getScissor=function(b){return b.copy(w)},this.setScissor=function(b,W,ue,ae){b.isVector4?w.set(b.x,b.y,b.z,b.w):w.set(b,W,ue,ae),g.scissor(De.copy(w).multiplyScalar(A).round())},this.getScissorTest=function(){return N},this.setScissorTest=function(b){g.setScissorTest(N=b)},this.setOpaqueSort=function(b){J=b},this.setTransparentSort=function(b){Le=b},this.getClearColor=function(b){return b.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor(...arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha(...arguments)},this.clear=function(b=!0,W=!0,ue=!0){let ae=0;if(b){let se=!1;if(de!==null){const He=de.texture.format;se=m.has(He)}if(se){const He=de.texture.type,$e=p.has(He),Oe=ot.getClearColor(),Ye=ot.getClearAlpha(),Xe=Oe.r,ut=Oe.g,ft=Oe.b;$e?(T[0]=Xe,T[1]=ut,T[2]=ft,T[3]=Ye,P.clearBufferuiv(P.COLOR,0,T)):(L[0]=Xe,L[1]=ut,L[2]=ft,L[3]=Ye,P.clearBufferiv(P.COLOR,0,L))}else ae|=P.COLOR_BUFFER_BIT}W&&(ae|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ue&&(ae|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae!==0&&P.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),te=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Rt,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",hn,!1),ot.dispose(),Be.dispose(),Ne.dispose(),K.dispose(),Te.dispose(),xe.dispose(),Ve.dispose(),be.dispose(),Re.dispose(),Ze.dispose(),Ze.removeEventListener("sessionstart",_a),Ze.removeEventListener("sessionend",hr),yi.stop()};function Rt(b){b.preventDefault(),Zh("WebGLRenderer: Context Lost."),X=!0}function pt(){Zh("WebGLRenderer: Context Restored."),X=!1;const b=O.autoReset,W=je.enabled,ue=je.autoUpdate,ae=je.needsUpdate,se=je.type;Qe(),O.autoReset=b,je.enabled=W,je.autoUpdate=ue,je.needsUpdate=ae,je.type=se}function hn(b){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ln(b){const W=b.target;W.removeEventListener("dispose",Ln),il(W)}function il(b){rl(b),K.remove(b)}function rl(b){const W=K.get(b).programs;W!==void 0&&(W.forEach(function(ue){Re.releaseProgram(ue)}),b.isShaderMaterial&&Re.releaseShaderCache(b))}this.renderBufferDirect=function(b,W,ue,ae,se,He){W===null&&(W=ce);const $e=se.isMesh&&se.matrixWorld.determinantAffine()<0,Oe=al(b,W,ue,ae,se);g.setMaterial(ae,$e);let Ye=ue.index,Xe=1;if(ae.wireframe===!0){if(Ye=me.getWireframeAttribute(ue),Ye===void 0)return;Xe=2}const ut=ue.drawRange,ft=ue.attributes.position;let Ke=ut.start*Xe,St=(ut.start+ut.count)*Xe;He!==null&&(Ke=Math.max(Ke,He.start*Xe),St=Math.min(St,(He.start+He.count)*Xe)),Ye!==null?(Ke=Math.max(Ke,0),St=Math.min(St,Ye.count)):ft!=null&&(Ke=Math.max(Ke,0),St=Math.min(St,ft.count));const Ft=St-Ke;if(Ft<0||Ft===1/0)return;Ve.setup(se,ae,Oe,ue,Ye);let Dt,Tt=Fe;if(Ye!==null&&(Dt=Ce.get(Ye),Tt=ve,Tt.setIndex(Dt)),se.isMesh)ae.wireframe===!0?(g.setLineWidth(ae.wireframeLinewidth*Ee()),Tt.setMode(P.LINES)):Tt.setMode(P.TRIANGLES);else if(se.isLine){let Kt=ae.linewidth;Kt===void 0&&(Kt=1),g.setLineWidth(Kt*Ee()),se.isLineSegments?Tt.setMode(P.LINES):se.isLineLoop?Tt.setMode(P.LINE_LOOP):Tt.setMode(P.LINE_STRIP)}else se.isPoints?Tt.setMode(P.POINTS):se.isSprite&&Tt.setMode(P.TRIANGLES);if(se.isBatchedMesh)if(Ie.get("WEBGL_multi_draw"))Tt.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else{const Kt=se._multiDrawStarts,qe=se._multiDrawCounts,Jt=se._multiDrawCount,mt=Ye?Ce.get(Ye).bytesPerElement:1,xn=K.get(ae).currentProgram.getUniforms();for(let Dn=0;Dn<Jt;Dn++)xn.setValue(P,"_gl_DrawID",Dn),Tt.render(Kt[Dn]/mt,qe[Dn])}else if(se.isInstancedMesh)Tt.renderInstances(Ke,Ft,se.count);else if(ue.isInstancedBufferGeometry){const Kt=ue._maxInstanceCount!==void 0?ue._maxInstanceCount:1/0,qe=Math.min(ue.instanceCount,Kt);Tt.renderInstances(Ke,Ft,qe)}else Tt.render(Ke,Ft)};function vs(b,W,ue,ae){te!==null&&b.isNodeMaterial&&te.setObject(ae,b),G===!0&&Je.setState(b,ue,!1),b.transparent===!0&&b.side===hi&&b.forceSinglePass===!1?(b.side=Tn,b.needsUpdate=!0,Yt(b,W,ae),b.side=Ir,b.needsUpdate=!0,Yt(b,W,ae),b.side=hi):Yt(b,W,ae)}this.compile=function(b,W,ue=null){ue===null&&(ue=b),te!==null&&te.renderStart(b,W,ue),C=Ne.get(ue),C.init(W),S.push(C),ue.traverseVisible(function(se){se.isLight&&se.layers.test(W.layers)&&(C.pushLight(se),se.castShadow&&C.pushShadow(se))}),b!==ue&&b.traverseVisible(function(se){se.isLight&&se.layers.test(W.layers)&&(C.pushLight(se),se.castShadow&&C.pushShadow(se))}),C.setupLights(),te!==null&&te.updateLights(C.state.lightsArray),k=this.localClippingEnabled,G=Je.init(this.clippingPlanes,k),G===!0&&Je.setGlobalState(this.clippingPlanes,W),te!==null&&je.render(C.state.shadowsArray,ue,W);const ae=new Set;return b.traverse(function(se){if(!(se.isMesh||se.isPoints||se.isLine||se.isSprite))return;const He=se.material;if(He)if(Array.isArray(He))for(let $e=0;$e<He.length;$e++){const Oe=He[$e];vs(Oe,ue,W,se),ae.add(Oe)}else vs(He,ue,W,se),ae.add(He)}),C=S.pop(),te!==null&&te.renderEnd(),ae},this.compileAsync=function(b,W,ue=null){const ae=this.compile(b,W,ue);return new Promise(se=>{function He(){if(ae.forEach(function($e){const Ye=K.get($e).currentProgram;(Ye===void 0||Ye.isReady())&&ae.delete($e)}),ae.size===0){se(b);return}setTimeout(He,10)}Ie.get("KHR_parallel_shader_compile")!==null?He():setTimeout(He,10)})};let xs=null;function sl(b){xs&&xs(b)}function _a(){yi.stop()}function hr(){yi.start()}const yi=new Kp;yi.setAnimationLoop(sl),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(b){xs=b,Ze.setAnimationLoop(b),b===null?yi.stop():yi.start()},Ze.addEventListener("sessionstart",_a),Ze.addEventListener("sessionend",hr),this.render=function(b,W){if(W!==void 0&&W.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;te!==null&&te.renderStart(b,W);const ue=Ze.enabled===!0&&Ze.isPresenting===!0,ae=I!==null&&(de===null||ue)&&I.begin(B,de);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Ze.enabled===!0&&Ze.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(Ze.cameraAutoUpdate===!0&&Ze.updateCamera(W),W=Ze.getCamera()),b.isScene===!0&&b.onBeforeRender(B,b,W,de),C=Ne.get(b,S.length),C.init(W),C.state.textureUnits=ne.getTextureUnits(),S.push(C),H.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),U.setFromProjectionMatrix(H,di,W.reversedDepth),k=this.localClippingEnabled,G=Je.init(this.clippingPlanes,k),R=Be.get(b,F.length),R.init(),F.push(R),Ze.enabled===!0&&Ze.isPresenting===!0){const $e=B.xr.getDepthSensingMesh();$e!==null&&Ss($e,W,-1/0,B.sortObjects)}Ss(b,W,0,B.sortObjects),R.finish(),te!==null&&te.updateLights(C.state.lightsArray),B.sortObjects===!0&&R.sort(J,Le),ie=Ze.enabled===!1||Ze.isPresenting===!1||Ze.hasDepthSensing()===!1,ie&&ot.addToRenderList(R,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),G===!0&&Je.beginShadows();const se=C.state.shadowsArray;if(je.render(se,b,W),G===!0&&Je.endShadows(),(ae&&I.hasRenderPass())===!1){const $e=R.opaque,Oe=R.transmissive;if(C.setupLights(),W.isArrayCamera){const Ye=W.cameras;if(Oe.length>0)for(let Xe=0,ut=Ye.length;Xe<ut;Xe++){const ft=Ye[Xe];Ms($e,Oe,b,ft)}ie&&ot.render(b);for(let Xe=0,ut=Ye.length;Xe<ut;Xe++){const ft=Ye[Xe];fr(R,b,ft,ft.viewport)}}else Oe.length>0&&Ms($e,Oe,b,W),ie&&ot.render(b),fr(R,b,W)}de!==null&&j===0&&(ne.updateMultisampleRenderTarget(de),ne.updateRenderTargetMipmap(de)),ae&&I.end(B),b.isScene===!0&&b.onAfterRender(B,b,W),Ve.resetDefaultState(),le=-1,ge=null,S.pop(),S.length>0?(C=S[S.length-1],ne.setTextureUnits(C.state.textureUnits),G===!0&&Je.setGlobalState(B.clippingPlanes,C.state.camera)):C=null,F.pop(),F.length>0?R=F[F.length-1]:R=null,te!==null&&te.renderEnd()};function Ss(b,W,ue,ae){if(b.visible===!1)return;if(b.layers.test(W.layers)){if(b.isGroup)ue=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(W);else if(b.isLightProbeGrid)C.pushLightProbeGrid(b);else if(b.isLight)C.pushLight(b),b.castShadow&&C.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(U)){ae&&fe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(H);const $e=xe.update(b),Oe=b.material;Oe.visible&&R.push(b,$e,Oe,ue,fe.z,null,W)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(U))){const $e=xe.update(b),Oe=b.material;if(ae&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),fe.copy(b.boundingSphere.center)):($e.boundingSphere===null&&$e.computeBoundingSphere(),fe.copy($e.boundingSphere.center)),fe.applyMatrix4(b.matrixWorld).applyMatrix4(H)),Array.isArray(Oe)){const Ye=$e.groups;for(let Xe=0,ut=Ye.length;Xe<ut;Xe++){const ft=Ye[Xe],Ke=Oe[ft.materialIndex];Ke&&Ke.visible&&R.push(b,$e,Ke,ue,fe.z,ft,W)}}else Oe.visible&&R.push(b,$e,Oe,ue,fe.z,null,W)}}const He=b.children;for(let $e=0,Oe=He.length;$e<Oe;$e++)Ss(He[$e],W,ue,ae)}function fr(b,W,ue,ae){const{opaque:se,transmissive:He,transparent:$e}=b;C.setupLightsView(ue),G===!0&&Je.setGlobalState(B.clippingPlanes,ue),ae&&g.viewport(pe.copy(ae)),se.length>0&&dr(se,W,ue),He.length>0&&dr(He,W,ue),$e.length>0&&dr($e,W,ue),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Ms(b,W,ue,ae){if((ue.isScene===!0?ue.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[ae.id]===void 0){const Ke=Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[ae.id]=new Qn(1,1,{generateMipmaps:!0,type:Ke?xi:Rn,minFilter:Cr,samples:Math.max(4,E.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:gt.workingColorSpace})}const He=C.state.transmissionRenderTarget[ae.id],$e=ae.viewport||pe;He.setSize($e.z*B.transmissionResolutionScale,$e.w*B.transmissionResolutionScale);const Oe=B.getRenderTarget(),Ye=B.getActiveCubeFace(),Xe=B.getActiveMipmapLevel();B.setRenderTarget(He),B.getClearColor(it),We=B.getClearAlpha(),We<1&&B.setClearColor(16777215,.5),B.clear(),ie&&ot.render(ue);const ut=B.toneMapping;B.toneMapping=mi;const ft=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),C.setupLightsView(ae),G===!0&&Je.setGlobalState(B.clippingPlanes,ae),dr(b,ue,ae),ne.updateMultisampleRenderTarget(He),ne.updateRenderTargetMipmap(He),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let St=0,Ft=W.length;St<Ft;St++){const Dt=W[St],{object:Tt,geometry:Kt,material:qe,group:Jt}=Dt;if(qe.side===hi&&Tt.layers.test(ae.layers)){const mt=qe.side;qe.side=Tn,qe.needsUpdate=!0,va(Tt,ue,ae,Kt,qe,Jt),qe.side=mt,qe.needsUpdate=!0,Ke=!0}}Ke===!0&&(ne.updateMultisampleRenderTarget(He),ne.updateRenderTargetMipmap(He))}B.setRenderTarget(Oe,Ye,Xe),B.setClearColor(it,We),ft!==void 0&&(ae.viewport=ft),B.toneMapping=ut}function dr(b,W,ue){const ae=W.isScene===!0?W.overrideMaterial:null;for(let se=0,He=b.length;se<He;se++){const $e=b[se],{object:Oe,geometry:Ye,group:Xe}=$e;let ut=$e.material;ut.allowOverride===!0&&ae!==null&&(ut=ae),Oe.layers.test(ue.layers)&&va(Oe,W,ue,Ye,ut,Xe)}}function va(b,W,ue,ae,se,He){te!==null&&se.isNodeMaterial&&te.setObject(b,se),b.onBeforeRender(B,W,ue,ae,se,He),b.modelViewMatrix.multiplyMatrices(ue.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),se.onBeforeRender(B,W,ue,ae,b,He),se.transparent===!0&&se.side===hi&&se.forceSinglePass===!1?(se.side=Tn,se.needsUpdate=!0,B.renderBufferDirect(ue,W,ae,se,b,He),se.side=Ir,se.needsUpdate=!0,B.renderBufferDirect(ue,W,ae,se,b,He),se.side=hi):B.renderBufferDirect(ue,W,ae,se,b,He),b.onAfterRender(B,W,ue,ae,se,He)}function Yt(b,W,ue){W.isScene!==!0&&(W=ce);const ae=K.get(b),se=C.state.lights,He=C.state.shadowsArray,$e=se.state.version,Oe=Re.getParameters(b,se.state,He,W,ue,C.state.lightProbeGridArray),Ye=Re.getProgramCacheKey(Oe);let Xe=ae.programs;ae.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?W.environment:null,ae.fog=W.fog;const ut=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;ae.envMap=Te.get(b.envMap||ae.environment,ut),ae.envMapRotation=ae.environment!==null&&b.envMap===null?W.environmentRotation:b.envMapRotation,Xe===void 0&&(b.addEventListener("dispose",Ln),Xe=new Map,ae.programs=Xe);let ft=Xe.get(Ye);if(ft!==void 0){if(ae.currentProgram===ft&&ae.lightsStateVersion===$e)return ys(b,Oe),ft}else Oe.uniforms=Re.getUniforms(b),te!==null&&b.isNodeMaterial&&te.build(b,ue,Oe),b.onBeforeCompile(Oe,B),ft=Re.acquireProgram(Oe,Ye),Xe.set(Ye,ft),ae.uniforms=Oe.uniforms;const Ke=ae.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ke.clippingPlanes=Je.uniform),ys(b,Oe),ae.needsLights=Sa(b),ae.lightsStateVersion=$e,ae.needsLights&&(Ke.ambientLightColor.value=se.state.ambient,Ke.lightProbe.value=se.state.probe,Ke.sunLights.value=se.state.sun,Ke.sunLightShadows.value=se.state.sunShadow,Ke.directionalLights.value=se.state.directional,Ke.directionalLightShadows.value=se.state.directionalShadow,Ke.spotLights.value=se.state.spot,Ke.spotLightShadows.value=se.state.spotShadow,Ke.rectAreaLights.value=se.state.rectArea,Ke.ltc_1.value=se.state.rectAreaLTC1,Ke.ltc_2.value=se.state.rectAreaLTC2,Ke.pointLights.value=se.state.point,Ke.pointLightShadows.value=se.state.pointShadow,Ke.hemisphereLights.value=se.state.hemi,Ke.sunShadowMatrix.value=se.state.sunShadowMatrix,Ke.sunShadowCascade.value=se.state.sunShadowCascade,Ke.directionalShadowMatrix.value=se.state.directionalShadowMatrix,Ke.spotLightMatrix.value=se.state.spotLightMatrix,Ke.spotLightMap.value=se.state.spotLightMap,Ke.pointShadowMatrix.value=se.state.pointShadowMatrix),ae.lightProbeGrid=C.state.lightProbeGridArray.length>0,ae.currentProgram=ft,ae.uniformsList=null,ft}function xa(b){if(b.uniformsList===null){const W=b.currentProgram.getUniforms();b.uniformsList=xo.seqWithValue(W.seq,b.uniforms)}return b.uniformsList}function ys(b,W){const ue=K.get(b);ue.outputColorSpace=W.outputColorSpace,ue.batching=W.batching,ue.batchingColor=W.batchingColor,ue.instancing=W.instancing,ue.instancingColor=W.instancingColor,ue.instancingMorph=W.instancingMorph,ue.skinning=W.skinning,ue.morphTargets=W.morphTargets,ue.morphNormals=W.morphNormals,ue.morphColors=W.morphColors,ue.morphTargetsCount=W.morphTargetsCount,ue.numClippingPlanes=W.numClippingPlanes,ue.numIntersection=W.numClipIntersection,ue.vertexAlphas=W.vertexAlphas,ue.vertexTangents=W.vertexTangents,ue.toneMapping=W.toneMapping}function Ki(b,W){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;M.setFromMatrixPosition(W.matrixWorld);for(let ue=0,ae=b.length;ue<ae;ue++){const se=b[ue];if(se.texture!==null&&se.boundingBox.containsPoint(M))return se}return null}function al(b,W,ue,ae,se){W.isScene!==!0&&(W=ce),ne.resetTextureUnits();const He=W.fog,$e=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial?W.environment:null,Oe=de===null?B.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:gt.workingColorSpace,Ye=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial&&!ae.envMap||ae.isMeshPhongMaterial&&!ae.envMap,Xe=Te.get(ae.envMap||$e,Ye),ut=ae.vertexColors===!0&&!!ue.attributes.color&&ue.attributes.color.itemSize===4,ft=!!ue.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),Ke=!!ue.morphAttributes.position,St=!!ue.morphAttributes.normal,Ft=!!ue.morphAttributes.color;let Dt=mi;ae.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Dt=B.toneMapping);const Tt=ue.morphAttributes.position||ue.morphAttributes.normal||ue.morphAttributes.color,Kt=Tt!==void 0?Tt.length:0,qe=K.get(ae),Jt=C.state.lights;if(G===!0&&(k===!0||b!==ge)){const Ct=b===ge&&ae.id===le;Je.setState(ae,b,Ct)}let mt=!1;ae.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Jt.state.version||qe.outputColorSpace!==Oe||se.isBatchedMesh&&qe.batching===!1||!se.isBatchedMesh&&qe.batching===!0||se.isBatchedMesh&&qe.batchingColor===!0&&se._colorsTexture===null||se.isBatchedMesh&&qe.batchingColor===!1&&se._colorsTexture!==null||se.isInstancedMesh&&qe.instancing===!1||!se.isInstancedMesh&&qe.instancing===!0||se.isSkinnedMesh&&qe.skinning===!1||!se.isSkinnedMesh&&qe.skinning===!0||se.isInstancedMesh&&qe.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&qe.instancingColor===!1&&se.instanceColor!==null||se.isInstancedMesh&&qe.instancingMorph===!0&&se.morphTexture===null||se.isInstancedMesh&&qe.instancingMorph===!1&&se.morphTexture!==null||qe.envMap!==Xe||ae.fog===!0&&qe.fog!==He||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Je.numPlanes||qe.numIntersection!==Je.numIntersection)||qe.vertexAlphas!==ut||qe.vertexTangents!==ft||qe.morphTargets!==Ke||qe.morphNormals!==St||qe.morphColors!==Ft||qe.toneMapping!==Dt||qe.morphTargetsCount!==Kt||!!qe.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(mt=!0):(mt=!0,qe.__version=ae.version);let xn=qe.currentProgram;mt===!0&&(xn=Yt(ae,W,se),te&&ae.isNodeMaterial&&te.onUpdateProgram(ae,xn,qe));let Dn=!1,ei=!1,bi=!1;const Mt=xn.getUniforms(),Ot=qe.uniforms;if(g.useProgram(xn.program)&&(Dn=!0,ei=!0,bi=!0),ae.id!==le&&(le=ae.id,ei=!0),qe.needsLights){const Ct=Ki(C.state.lightProbeGridArray,se);qe.lightProbeGrid!==Ct&&(qe.lightProbeGrid=Ct,ei=!0)}if(Dn||ge!==b){g.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Mt.setValue(P,"projectionMatrix",b.projectionMatrix),Mt.setValue(P,"viewMatrix",b.matrixWorldInverse);const Gn=Mt.map.cameraPosition;Gn!==void 0&&Gn.setValue(P,ee.setFromMatrixPosition(b.matrixWorld)),E.logarithmicDepthBuffer&&Mt.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&Mt.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),ge!==b&&(ge=b,ei=!0,bi=!0)}if(qe.needsLights&&(Jt.state.sunShadowMap.length>0&&Mt.setValue(P,"sunShadowMap",Jt.state.sunShadowMap,ne),Jt.state.directionalShadowMap.length>0&&Mt.setValue(P,"directionalShadowMap",Jt.state.directionalShadowMap,ne),Jt.state.spotShadowMap.length>0&&Mt.setValue(P,"spotShadowMap",Jt.state.spotShadowMap,ne),Jt.state.pointShadowMap.length>0&&Mt.setValue(P,"pointShadowMap",Jt.state.pointShadowMap,ne)),se.isSkinnedMesh){Mt.setOptional(P,se,"bindMatrix"),Mt.setOptional(P,se,"bindMatrixInverse");const Ct=se.skeleton;Ct&&(Ct.boneTexture===null&&Ct.computeBoneTexture(),Mt.setValue(P,"boneTexture",Ct.boneTexture,ne))}se.isBatchedMesh&&(Mt.setOptional(P,se,"batchingTexture"),Mt.setValue(P,"batchingTexture",se._matricesTexture,ne),Mt.setOptional(P,se,"batchingIdTexture"),Mt.setValue(P,"batchingIdTexture",se._indirectTexture,ne),Mt.setOptional(P,se,"batchingColorTexture"),se._colorsTexture!==null&&Mt.setValue(P,"batchingColorTexture",se._colorsTexture,ne));const ti=ue.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&Y.update(se,ue,xn),(ei||qe.receiveShadow!==se.receiveShadow)&&(qe.receiveShadow=se.receiveShadow,Mt.setValue(P,"receiveShadow",se.receiveShadow)),(ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial)&&ae.envMap===null&&W.environment!==null&&(Ot.envMapIntensity.value=W.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=bE()),ei){if(Mt.setValue(P,"toneMappingExposure",B.toneMappingExposure),qe.needsLights&&bs(Ot,bi),He&&ae.fog===!0&&ke.refreshFogUniforms(Ot,He),ke.refreshMaterialUniforms(Ot,ae,A,q,C.state.transmissionRenderTarget[b.id]),qe.needsLights&&qe.lightProbeGrid){const Ct=qe.lightProbeGrid;Ot.probesSH.value=Ct.texture,Ot.probesMin.value.copy(Ct.boundingBox.min),Ot.probesMax.value.copy(Ct.boundingBox.max),Ot.probesResolution.value.copy(Ct.resolution)}xo.upload(P,xa(qe),Ot,ne)}if(ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(xo.upload(P,xa(qe),Ot,ne),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&Mt.setValue(P,"center",se.center),Mt.setValue(P,"modelViewMatrix",se.modelViewMatrix),Mt.setValue(P,"normalMatrix",se.normalMatrix),Mt.setValue(P,"modelMatrix",se.matrixWorld),ae.uniformsGroups!==void 0){const Ct=ae.uniformsGroups;for(let Gn=0,Zi=Ct.length;Gn<Zi;Gn++){const ya=Ct[Gn];be.update(ya,xn),be.bind(ya,xn)}}return xn}function bs(b,W){b.ambientLightColor.needsUpdate=W,b.lightProbe.needsUpdate=W,b.sunLights.needsUpdate=W,b.sunLightShadows.needsUpdate=W,b.directionalLights.needsUpdate=W,b.directionalLightShadows.needsUpdate=W,b.pointLights.needsUpdate=W,b.pointLightShadows.needsUpdate=W,b.spotLights.needsUpdate=W,b.spotLightShadows.needsUpdate=W,b.rectAreaLights.needsUpdate=W,b.hemisphereLights.needsUpdate=W}function Sa(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return de},this.setRenderTargetTextures=function(b,W,ue){const ae=K.get(b);ae.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),K.get(b.texture).__webglTexture=W,K.get(b.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:ue,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,W){const ue=K.get(b);ue.__webglFramebuffer=W,ue.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(b,W=0,ue=0){de=b,oe=W,j=ue;let ae=null,se=!1,He=!1;if(b){const Oe=K.get(b);if(Oe.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(P.FRAMEBUFFER,Oe.__webglFramebuffer),pe.copy(b.viewport),De.copy(b.scissor),Me=b.scissorTest,g.viewport(pe),g.scissor(De),g.setScissorTest(Me),le=-1;return}else if(Oe.__webglFramebuffer===void 0)ne.setupRenderTarget(b);else if(Oe.__hasExternalTextures)ne.rebindTextures(b,K.get(b.texture).__webglTexture,K.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ut=b.depthTexture;if(Oe.__boundDepthTexture!==ut){if(ut!==null&&K.has(ut)&&(b.width!==ut.image.width||b.height!==ut.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(b)}}const Ye=b.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(He=!0);const Xe=K.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Xe[W])?ae=Xe[W][ue]:ae=Xe[W],se=!0):b.samples>0&&ne.useMultisampledRTT(b)===!1?ae=K.get(b).__webglMultisampledFramebuffer:Array.isArray(Xe)?ae=Xe[ue]:ae=Xe,pe.copy(b.viewport),De.copy(b.scissor),Me=b.scissorTest}else pe.copy(we).multiplyScalar(A).floor(),De.copy(w).multiplyScalar(A).floor(),Me=N;if(ue!==0&&(ae=re),g.bindFramebuffer(P.FRAMEBUFFER,ae)&&g.drawBuffers(b,ae),g.viewport(pe),g.scissor(De),g.setScissorTest(Me),se){const Oe=K.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+W,Oe.__webglTexture,ue)}else if(He){const Oe=W;for(let Ye=0;Ye<b.textures.length;Ye++){const Xe=K.get(b.textures[Ye]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ye,Xe.__webglTexture,ue,Oe)}}else if(b!==null&&ue!==0){const Oe=K.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Oe.__webglTexture,ue)}le=-1};function Ma(b){const W=K.get(b);return(W.__readFormat!==b.format||W.__readType!==b.type)&&(W.__readFormat=b.format,W.__readType=b.type,W.__formatReadable=E.textureFormatReadable(b.format),W.__typeReadable=E.textureTypeReadable(b.type)),W}this.readRenderTargetPixels=function(b,W,ue,ae,se,He,$e,Oe=0){if(!(b&&b.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=K.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&$e!==void 0&&(Ye=Ye[$e]),Ye){g.bindFramebuffer(P.FRAMEBUFFER,Ye);try{const Xe=b.textures[Oe],ut=Xe.format,ft=Xe.type;b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Oe);const Ke=Ma(Xe);if(Ke.__formatReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ke.__typeReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=b.width-ae&&ue>=0&&ue<=b.height-se&&P.readPixels(W,ue,ae,se,ze.convert(ut),ze.convert(ft),He)}finally{const Xe=de!==null?K.get(de).__webglFramebuffer:null;g.bindFramebuffer(P.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(b,W,ue,ae,se,He,$e,Oe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=K.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&$e!==void 0&&(Ye=Ye[$e]),Ye)if(W>=0&&W<=b.width-ae&&ue>=0&&ue<=b.height-se){g.bindFramebuffer(P.FRAMEBUFFER,Ye);const Xe=b.textures[Oe],ut=Xe.format,ft=Xe.type;b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Oe);const Ke=Ma(Xe);if(Ke.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ke.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const St=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,St),P.bufferData(P.PIXEL_PACK_BUFFER,He.byteLength,P.STREAM_READ),P.readPixels(W,ue,ae,se,ze.convert(ut),ze.convert(ft),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);const Ft=de!==null?K.get(de).__webglFramebuffer:null;g.bindFramebuffer(P.FRAMEBUFFER,Ft);const Dt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await e0(P,Dt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,St),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,He),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(St),P.deleteSync(Dt),He}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,W=null,ue=0){const ae=Math.pow(2,-ue),se=Math.floor(b.image.width*ae),He=Math.floor(b.image.height*ae),$e=W!==null?W.x:0,Oe=W!==null?W.y:0;ne.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,ue,0,0,$e,Oe,se,He),g.unbindTexture()},this.copyTextureToTexture=function(b,W,ue=null,ae=null,se=0,He=0){let $e,Oe,Ye,Xe,ut,ft,Ke,St,Ft;const Dt=b.isCompressedTexture?b.mipmaps[He]:b.image;if(ue!==null)$e=ue.max.x-ue.min.x,Oe=ue.max.y-ue.min.y,Ye=ue.isBox3?ue.max.z-ue.min.z:1,Xe=ue.min.x,ut=ue.min.y,ft=ue.isBox3?ue.min.z:0;else{const Ot=Math.pow(2,-se);$e=Math.floor(Dt.width*Ot),Oe=Math.floor(Dt.height*Ot),b.isDataArrayTexture?Ye=Dt.depth:b.isData3DTexture?Ye=Math.floor(Dt.depth*Ot):Ye=1,Xe=0,ut=0,ft=0}ae!==null?(Ke=ae.x,St=ae.y,Ft=ae.z):(Ke=0,St=0,Ft=0);const Tt=ze.convert(W.format),Kt=ze.convert(W.type);let qe;W.isData3DTexture?(ne.setTexture3D(W,0),qe=P.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ne.setTexture2DArray(W,0),qe=P.TEXTURE_2D_ARRAY):(ne.setTexture2D(W,0),qe=P.TEXTURE_2D),g.activeTexture(P.TEXTURE0),g.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,W.flipY),g.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),g.pixelStorei(P.UNPACK_ALIGNMENT,W.unpackAlignment);const Jt=g.getParameter(P.UNPACK_ROW_LENGTH),mt=g.getParameter(P.UNPACK_IMAGE_HEIGHT),xn=g.getParameter(P.UNPACK_SKIP_PIXELS),Dn=g.getParameter(P.UNPACK_SKIP_ROWS),ei=g.getParameter(P.UNPACK_SKIP_IMAGES);g.pixelStorei(P.UNPACK_ROW_LENGTH,Dt.width),g.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Dt.height),g.pixelStorei(P.UNPACK_SKIP_PIXELS,Xe),g.pixelStorei(P.UNPACK_SKIP_ROWS,ut),g.pixelStorei(P.UNPACK_SKIP_IMAGES,ft);const bi=b.isDataArrayTexture||b.isData3DTexture,Mt=W.isDataArrayTexture||W.isData3DTexture;if(b.isDepthTexture){const Ot=K.get(b),ti=K.get(W),Ct=K.get(Ot.__renderTarget),Gn=K.get(ti.__renderTarget);g.bindFramebuffer(P.READ_FRAMEBUFFER,Ct.__webglFramebuffer),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Zi=0;Zi<Ye;Zi++)bi&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,K.get(b).__webglTexture,se,ft+Zi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,K.get(W).__webglTexture,He,Ft+Zi)),P.blitFramebuffer(Xe,ut,$e,Oe,Ke,St,$e,Oe,P.DEPTH_BUFFER_BIT,P.NEAREST);g.bindFramebuffer(P.READ_FRAMEBUFFER,null),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(se!==0||b.isRenderTargetTexture||K.has(b)){const Ot=K.get(b),ti=K.get(W);g.bindFramebuffer(P.READ_FRAMEBUFFER,V),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,Q);for(let Ct=0;Ct<Ye;Ct++)bi?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ot.__webglTexture,se,ft+Ct):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ot.__webglTexture,se),Mt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ti.__webglTexture,He,Ft+Ct):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ti.__webglTexture,He),se!==0?P.blitFramebuffer(Xe,ut,$e,Oe,Ke,St,$e,Oe,P.COLOR_BUFFER_BIT,P.NEAREST):Mt?P.copyTexSubImage3D(qe,He,Ke,St,Ft+Ct,Xe,ut,$e,Oe):P.copyTexSubImage2D(qe,He,Ke,St,Xe,ut,$e,Oe);g.bindFramebuffer(P.READ_FRAMEBUFFER,null),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Mt?b.isDataTexture||b.isData3DTexture?P.texSubImage3D(qe,He,Ke,St,Ft,$e,Oe,Ye,Tt,Kt,Dt.data):W.isCompressedArrayTexture?P.compressedTexSubImage3D(qe,He,Ke,St,Ft,$e,Oe,Ye,Tt,Dt.data):P.texSubImage3D(qe,He,Ke,St,Ft,$e,Oe,Ye,Tt,Kt,Dt):b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,He,Ke,St,$e,Oe,Tt,Kt,Dt.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,He,Ke,St,Dt.width,Dt.height,Tt,Dt.data):P.texSubImage2D(P.TEXTURE_2D,He,Ke,St,$e,Oe,Tt,Kt,Dt);g.pixelStorei(P.UNPACK_ROW_LENGTH,Jt),g.pixelStorei(P.UNPACK_IMAGE_HEIGHT,mt),g.pixelStorei(P.UNPACK_SKIP_PIXELS,xn),g.pixelStorei(P.UNPACK_SKIP_ROWS,Dn),g.pixelStorei(P.UNPACK_SKIP_IMAGES,ei),He===0&&W.generateMipmaps&&P.generateMipmap(qe),g.unbindTexture()},this.initRenderTarget=function(b){K.get(b).__webglFramebuffer===void 0&&ne.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ne.setTextureCube(b,0):b.isData3DTexture?ne.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ne.setTexture2DArray(b,0):ne.setTexture2D(b,0),g.unbindTexture()},this.resetState=function(){oe=0,j=0,de=null,g.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}}const ed={type:"change"},qu={type:"start"},im={type:"end"},oo=new Qo,td=new Ui,TE=Math.cos(70*i0.DEG2RAD),Xt=new $,bn=2*Math.PI,wt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},oc=1e-6;class AE extends Ax{constructor(e,t=null){super(e,t),this.state=wt.NONE,this.target=new $,this.cursor=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vi.ROTATE,MIDDLE:Vi.DOLLY,RIGHT:Vi.PAN},this.touches={ONE:ts.ROTATE,TWO:ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new $,this._lastQuaternion=new lr,this._lastTargetPosition=new $,this._quat=new lr().setFromUnitVectors(e.up,new $(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Pf,this._sphericalDelta=new Pf,this._scale=1,this._panOffset=new $,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new $,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=RE.bind(this),this._onPointerDown=wE.bind(this),this._onPointerUp=CE.bind(this),this._onContextMenu=FE.bind(this),this._onMouseWheel=DE.bind(this),this._onKeyDown=IE.bind(this),this._onTouchStart=UE.bind(this),this._onTouchMove=NE.bind(this),this._onMouseDown=PE.bind(this),this._onMouseMove=LE.bind(this),this._interceptControlDown=OE.bind(this),this._interceptControlUp=BE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=wt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ed),this.update(),this.state=wt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Xt.copy(t).sub(this.target),Xt.applyQuaternion(this._quat),this._spherical.setFromVector3(Xt),this.autoRotate&&this.state===wt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=bn:i>Math.PI&&(i-=bn),r<-Math.PI?r+=bn:r>Math.PI&&(r-=bn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Xt.setFromSpherical(this._spherical),Xt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Xt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Xt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new $(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new $(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Xt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(oo.origin.copy(this.object.position),oo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oo.direction))<TE?this.object.lookAt(this.target):(td.setFromNormalAndCoplanarPoint(this.object.up,this.target),oo.intersectPlane(td,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>oc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>oc||this._lastTargetPosition.distanceToSquared(this.target)>oc?(this.dispatchEvent(ed),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?bn/60*this.autoRotateSpeed*e:bn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Xt.setFromMatrixColumn(t,0),Xt.multiplyScalar(-e),this._panOffset.add(Xt)}_panUp(e,t){this.screenSpacePanning===!0?Xt.setFromMatrixColumn(t,1):(Xt.setFromMatrixColumn(t,0),Xt.crossVectors(this.object.up,Xt)),Xt.multiplyScalar(e),this._panOffset.add(Xt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Xt.copy(r).sub(this.target);let s=Xt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function wE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function RE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function CE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(im),this.state=wt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function PE(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Vi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=wt.DOLLY;break;case Vi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=wt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=wt.ROTATE}break;case Vi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=wt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=wt.PAN}break;default:this.state=wt.NONE}this.state!==wt.NONE&&this.dispatchEvent(qu)}function LE(n){switch(this.state){case wt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case wt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case wt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function DE(n){this.enabled===!1||this.enableZoom===!1||this.state!==wt.NONE||(n.preventDefault(),this.dispatchEvent(qu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(im))}function IE(n){this.enabled!==!1&&this._handleKeyDown(n)}function UE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ts.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=wt.TOUCH_ROTATE;break;case ts.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=wt.TOUCH_PAN;break;default:this.state=wt.NONE}break;case 2:switch(this.touches.TWO){case ts.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=wt.TOUCH_DOLLY_PAN;break;case ts.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=wt.TOUCH_DOLLY_ROTATE;break;default:this.state=wt.NONE}break;default:this.state=wt.NONE}this.state!==wt.NONE&&this.dispatchEvent(qu)}function NE(n){switch(this._trackPointer(n),this.state){case wt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case wt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case wt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case wt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=wt.NONE}}function FE(n){this.enabled!==!1&&n.preventDefault()}function OE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function BE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class zE{renderer;scene;camera;controls;gear1=null;gear2=null;actionLine=null;tangentLine=null;pitchPoint=null;contactMarker=null;interferenceGroup;raycaster=new Tx;container;resizeObs;constructor(e){this.container=e;const t=e.clientWidth||800,i=e.clientHeight||600;this.renderer=new EE({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(t,i),e.appendChild(this.renderer.domElement),this.scene=new _0,this.scene.background=new _t(1053464);const r=t/i,s=80;this.camera=new el(-s*r/2,s*r/2,s/2,-s/2,.1,2e3),this.camera.position.set(0,0,120),this.camera.lookAt(0,0,0),this.controls=new AE(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.mouseButtons={LEFT:Vi.ROTATE,MIDDLE:Vi.DOLLY,RIGHT:Vi.PAN};const a=new yx(16777215,.65),o=new Mx(16777215,.9);o.position.set(40,60,100),this.scene.add(a,o),this.interferenceGroup=new ns,this.scene.add(this.interferenceGroup),this.resizeObs=new ResizeObserver(()=>this.resize()),this.resizeObs.observe(e),this.animate()}makeCircleLine(e,t,i=.02,r=160){const s=[];for(let l=0;l<=r;l++){const c=l/r*Math.PI*2;s.push(new $(e*Math.cos(c),e*Math.sin(c),i))}const a=new un().setFromPoints(s),o=new vo({color:t,transparent:!0,opacity:.8});return new R0(a,o)}buildGearMesh(e,t){const i=new ns,r=new Fo,s=e.outline;r.moveTo(s[0].x,s[0].y);for(let h=1;h<s.length;h++)r.lineTo(s[h].x,s[h].y);r.closePath();const a=e.input.faceWidth,o=new Xu(r,{depth:a,bevelEnabled:!1,curveSegments:1});o.translate(0,0,-a/2),o.computeVertexNormals();const l=new gx({color:t,metalness:.35,roughness:.55}),c=new Pn(o,l);i.add(c);const u=new w0(new P0(o,12),new vo({color:2239027,transparent:!0,opacity:.5}));i.add(u);const f={pitch:this.makeCircleLine(e.pitchR,4891647,a/2+.02),base:this.makeCircleLine(e.baseR,2605194,a/2+.02),addendum:this.makeCircleLine(e.addendumR,16765286,a/2+.02),dedendum:this.makeCircleLine(e.dedendumR,16748451,a/2+.02)};return Object.values(f).forEach(h=>i.add(h)),{group:i,body:c,refs:f}}setGears(e,t,i){this.gear1&&this.scene.remove(this.gear1.group),this.gear2&&this.scene.remove(this.gear2.group),this.gear1=this.buildGearMesh(e,7252222),this.gear2=this.buildGearMesh(t,16758894),this.scene.add(this.gear1.group,this.gear2.group),this.gear2.group.position.x=i,this.targetCenter(i/2,Math.max(e.addendumR,t.addendumR))}targetCenter(e,t){const i=(this.container.clientWidth||800)/(this.container.clientHeight||600),r=(t*2+40)/2,s=Math.max(r*2,80);this.camera.left=-s*i/2,this.camera.right=s*i/2,this.camera.top=s/2,this.camera.bottom=-s/2,this.camera.updateProjectionMatrix(),this.controls.target.set(e,0,0),this.camera.position.set(e,0,140)}setAngles(e,t){this.gear1&&(this.gear1.group.rotation.z=e),this.gear2&&(this.gear2.group.rotation.z=t)}setMeshOverlay(e,t){if(this.clearOverlay(),!e||!this.gear1||!this.gear2)return;const i=o=>t[o],r=o=>{o.geometry.computeBoundingBox();const l=o.geometry.boundingBox;return l?l.max.z-l.min.z:0},s=r(this.gear1.body),a=r(this.gear2.body);if(this.gear1.refs.pitch.visible=!!i("showPitchCircle"),this.gear2.refs.pitch.visible=!!i("showPitchCircle"),this.gear1.refs.base.visible=!!i("showBaseCircle"),this.gear2.refs.base.visible=!!i("showBaseCircle"),this.gear1.refs.addendum.visible=!!i("showAddendumCircle"),this.gear2.refs.addendum.visible=!!i("showAddendumCircle"),this.gear1.refs.dedendum.visible=!!i("showDedendumCircle"),this.gear2.refs.dedendum.visible=!!i("showDedendumCircle"),i("showActionLine")){const o=Math.max(s,a)/2+1,l=(u,f,h)=>{const d=new un().setFromPoints([new $(u.x,u.y,o),new $(f.x,f.y,o)]);return new Gu(d,new vo({color:h,transparent:!0,opacity:.9,depthTest:!1}))};this.tangentLine=l(e.tangentLine.p0,e.tangentLine.p1,8950691),this.tangentLine.renderOrder=50,this.actionLine=l(e.actionLine.p0,e.actionLine.p1,3794539),this.actionLine.renderOrder=51,this.scene.add(this.tangentLine,this.actionLine);const c=new Oo(.7,16,16);this.pitchPoint=new Pn(c,new Ks({color:16777215,depthTest:!1})),this.pitchPoint.position.set(e.pitchPoint.x,e.pitchPoint.y,o),this.pitchPoint.renderOrder=52,this.scene.add(this.pitchPoint)}if(i("showContact")){const o=e.alphaPrime,l=Math.sin(o),c=Math.cos(o),u={x:e.pitchPoint.x+t.contactS*l,y:e.pitchPoint.y+t.contactS*c},f=Math.max(s,a)/2+1.5,h=new Oo(1,20,20);this.contactMarker=new Pn(h,new Ks({color:16726891,depthTest:!1})),this.contactMarker.position.set(u.x,u.y,f),this.contactMarker.renderOrder=60,this.scene.add(this.contactMarker)}if(t.contactRegions)for(const o of t.contactRegions)for(const l of o){if(l.length<3)continue;const c=new Fo;c.moveTo(l[0].x,l[0].y);for(let d=1;d<l.length;d++)c.lineTo(l[d].x,l[d].y);c.closePath();const u=new $u(c),f=new Ks({color:16723285,transparent:!0,opacity:.5,side:hi,depthTest:!1}),h=new Pn(u,f);h.position.z=Math.max(s,a)/2+2,h.renderOrder=999,this.interferenceGroup.add(h)}}clearOverlay(){for(this.actionLine&&(this.scene.remove(this.actionLine),this.actionLine.geometry.dispose(),this.actionLine=null),this.tangentLine&&(this.scene.remove(this.tangentLine),this.tangentLine.geometry.dispose(),this.tangentLine=null),this.pitchPoint&&(this.scene.remove(this.pitchPoint),this.pitchPoint=null),this.contactMarker&&(this.scene.remove(this.contactMarker),this.contactMarker=null);this.interferenceGroup.children.length;)this.interferenceGroup.children.pop().geometry?.dispose()}pick(e,t){return this.raycaster,null}resize(){const e=this.container.clientWidth,t=this.container.clientHeight;if(!e||!t)return;this.renderer.setSize(e,t);const i=e/t,s=(this.camera.top-this.camera.bottom)/1/2;this.camera.left=-s*i,this.camera.right=s*i,this.camera.updateProjectionMatrix()}animate=()=>{requestAnimationFrame(this.animate),this.controls.update(),this.renderer.render(this.scene,this.camera)};dispose(){this.resizeObs.disconnect(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}const Nn={mm:{id:"mm",label:"mm",factor:1,step:.1,decimals:3},cm:{id:"cm",label:"cm",factor:.1,step:.01,decimals:4},m:{id:"m",label:"m",factor:.001,step:.001,decimals:5},in:{id:"in",label:"in",factor:1/25.4,step:.01,decimals:4}};function So(n,e){return n*Nn[e].factor}function lc(n,e){return n/Nn[e].factor}function VE(n,e){return`${So(n,e).toFixed(Nn[e].decimals)} ${Nn[e].label}`}const nd=1,HE="spur-gear-lab",Bo="cases";let lo=null;function GE(){return lo||(lo=new Promise((n,e)=>{const t=indexedDB.open(HE,1);t.onupgradeneeded=()=>{const i=t.result;i.objectStoreNames.contains(Bo)||i.createObjectStore(Bo,{keyPath:"id"}).createIndex("updatedAt","updatedAt")},t.onsuccess=()=>n(t.result),t.onerror=()=>e(t.error)}),lo)}function Yu(n,e){return GE().then(t=>new Promise((i,r)=>{const s=t.transaction(Bo,n),a=e(s.objectStore(Bo));a.onsuccess=()=>i(a.result),a.onerror=()=>r(a.error)}))}async function id(n){await Yu("readwrite",e=>e.put({...n,updatedAt:Date.now()}))}async function kE(n){await Yu("readwrite",e=>e.delete(n))}async function WE(){return[...await Yu("readonly",e=>e.getAll())].sort((e,t)=>t.updatedAt-e.updatedAt)}function XE(){return`case-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function $E(n){return JSON.stringify(n,null,2)}function qE(n){const e=JSON.parse(n);if(!e||e.schemaVersion!==nd)throw new Error(`不支持的案例版本（需要 schemaVersion=${nd}）`);if(!e.gear1||!e.gear2)throw new Error("案例缺少齿轮参数");for(const t of[e.gear1,e.gear2])if(!(t.z>=4)||!(t.module>0)||!(t.alphaDeg>0))throw new Error("案例参数不合法（z≥4, m>0, α>0）");return e}function YE(n){const e=new Blob([$E(n)],{type:"application/json"}),t=URL.createObjectURL(e),i=document.createElement("a");i.href=t;const r=(n.name||"gear-case").replace(/[^\w一-龥-]+/g,"_");i.download=`${r}.json`,i.click(),URL.revokeObjectURL(t)}const KE={class:"app"},ZE={class:"panel"},JE={class:"units"},QE=["onClick"],jE=["step"],eT=["step"],tT={class:"two"},nT={key:0,class:"err"},iT={key:1,class:"err"},rT={class:"row"},sT={key:0},aT=["step"],oT={class:"row"},lT=["disabled"],cT=["disabled"],uT=["disabled","min","max"],hT=["disabled"],fT={key:0,class:"report"},dT={class:"row"},pT={class:"row"},mT={class:"row"},gT={class:"row"},_T={class:"row"},vT={class:"row"},xT={class:"samples"},ST={class:"viewport"},MT={class:"readouts"},yT={key:0,class:"dim-grid"},bT={class:"mesh-report"},ET={key:0,class:"warns"},TT={class:"panel right"},AT={class:"row"},wT={class:"row"},RT={class:"wide filebtn"},CT={class:"caselist"},PT={class:"ci"},LT={class:"ca"},DT=["onClick"],IT=["onClick"],UT={key:0,class:"empty"},NT=Lg({__name:"App",setup(n){const e=Wn("mm"),t=rs({z1:20,z2:40,m:2,alphaDeg:20,faceWidth:10,centerDistance:60,useStandardCenter:!0}),i=wa(),r=wa(),s=wa(),a=rs({g1:[],g2:[]});function o(){const q={z:Math.round(t.z1),module:t.m,alpha:t.alphaDeg*vr,faceWidth:t.faceWidth},A={z:Math.round(t.z2),module:t.m,alpha:t.alphaDeg*vr,faceWidth:t.faceWidth};if(a.g1=zh(q),a.g2=zh(A),a.g1.length||a.g2.length)return;i.value=Oh(q),r.value=Oh(A);const J=t.useStandardCenter?i.value.pitchR+r.value.pitchR:t.centerDistance;s.value=lv({g1:i.value,g2:r.value,centerDistance:J})}const l=jr({get:()=>So(t.m,e.value),set:q=>t.m=lc(q,e.value)}),c=jr({get:()=>So(t.faceWidth,e.value),set:q=>t.faceWidth=lc(q,e.value)}),u=jr({get:()=>So(t.centerDistance,e.value),set:q=>t.centerDistance=lc(q,e.value)});wr(e,()=>{});const f=Wn(!0),h=Wn(0),d=Wn(.25);let _=0;const y=Wn(0),m=rs({showPitchCircle:!0,showBaseCircle:!0,showAddendumCircle:!1,showDedendumCircle:!1,showActionLine:!0,showContact:!0,contactS:0}),p=Wn(null),T=wa([]),L=Wn(!1);let M=0;async function R(q){if(!i.value||!r.value||!s.value)return;const A=q,J=Hh(i.value,r.value,s.value,A),Le=[Bh(i.value.outline,0,0,A)],we=[Bh(r.value.outline,s.value.a,0,J)],w=++M;L.value=!0;try{const N=await _v(Le,we);if(w!==M)return;p.value=N.area,T.value=N.regions}finally{w===M&&(L.value=!1)}}const C=Wn();let F=null;function S(){!F||!s.value||F.setMeshOverlay(s.value,{...m,contactS:y.value,contactRegions:[T.value]})}pc(()=>{o(),F=new zE(C.value),i.value&&r.value&&s.value&&F.setGears(i.value,r.value,s.value.a);const q=A=>{const J=Math.min(.05,(A-_)/1e3||0);if(_=A,f.value&&i.value&&r.value&&s.value){h.value+=d.value*J;const Le=2*Math.PI/i.value.input.z;h.value=(h.value%Le+Le)%Le;const we=(h.value-Vh(s.value,i.value,r.value,0).phi1)*i.value.baseR;y.value=I(we)}if(i.value&&r.value&&s.value){const Le=Hh(i.value,r.value,s.value,h.value);F.setAngles(h.value,Le),m.contactS=y.value,S()}requestAnimationFrame(q)};requestAnimationFrame(q)});function I(q){if(!s.value)return 0;const A=s.value.actionLine,J=s.value.alphaPrime,Le=Math.sin(J),we=Math.cos(J),w=(A.p0.x-s.value.pitchPoint.x)*Le+(A.p0.y-s.value.pitchPoint.y)*we,N=(A.p1.x-s.value.pitchPoint.x)*Le+(A.p1.y-s.value.pitchPoint.y)*we;return q<w?N-(w-q)%(N-w):q>N?w+(q-N)%(N-w):q}wr(()=>[t.z1,t.z2,t.m,t.alphaDeg,t.faceWidth,t.useStandardCenter,t.centerDistance],()=>{o(),F&&i.value&&r.value&&s.value&&F.setGears(i.value,r.value,s.value.a),h.value=0,y.value=0,p.value=null,T.value=[]}),wr(m,S),wr(y,()=>m.contactS=y.value);function B(){f.value=!1}function X(){f.value=!0}function te(){f.value||!i.value||!r.value||!s.value||(h.value=Vh(s.value,i.value,r.value,y.value).phi1)}const re=Wn([]),V=Wn("未命名案例"),Q=Wn("");async function oe(){re.value=await WE()}pc(oe);function j(q){const A=s.value?.a??t.centerDistance;return{schemaVersion:1,id:XE(),name:V.value,createdAt:Date.now(),updatedAt:Date.now(),note:Q.value,gear1:{z:t.z1,module:t.m,alpha:t.alphaDeg*vr,alphaDeg:t.alphaDeg,faceWidth:t.faceWidth},gear2:{z:t.z2,module:t.m,alpha:t.alphaDeg*vr,alphaDeg:t.alphaDeg,faceWidth:t.faceWidth},centerDistance:t.useStandardCenter?null:A,unit:e.value,outlines:q&&i.value&&r.value?{gear1:i.value.outline,gear2:r.value.outline}:void 0}}async function de(q){await id(j(q)),await oe()}function le(q){YE(j(q))}async function ge(q){t.z1=q.gear1.z,t.z2=q.gear2.z,t.m=q.gear1.module,t.alphaDeg=q.gear1.alphaDeg,t.faceWidth=q.gear1.faceWidth,q.centerDistance==null?t.useStandardCenter=!0:(t.useStandardCenter=!1,t.centerDistance=q.centerDistance),e.value=q.unit||"mm",V.value=q.name,Q.value=q.note,o(),F&&i.value&&r.value&&s.value&&F.setGears(i.value,r.value,s.value.a)}async function pe(q){await kE(q),await oe()}function De(q){const A=q.target,J=A.files?.[0];if(!J)return;const Le=new FileReader;Le.onload=async()=>{try{const we=qE(String(Le.result));await id(we),await ge(we),await oe()}catch(we){alert("导入失败："+we.message)}},Le.readAsText(J),A.value=""}const Me=jr(()=>!i.value||!r.value||!s.value?null:{g1:i.value,g2:r.value,mesh:s.value}),it=jr(()=>{if(!s.value)return[-30,30];const q=s.value,A=Math.sin(q.alphaPrime),J=Math.cos(q.alphaPrime),Le=(q.actionLine.p0.x-q.pitchPoint.x)*A+(q.actionLine.p0.y-q.pitchPoint.y)*J,we=(q.actionLine.p1.x-q.pitchPoint.x)*A+(q.actionLine.p1.y-q.pitchPoint.y)*J;return[Math.floor(Le*10)/10,Math.ceil(we*10)/10]});function We(q){return VE(q,e.value)}function nt(q,A,J=2,Le=20){t.z1=q,t.z2=A,t.m=J,t.alphaDeg=Le,t.useStandardCenter=!0}return(q,A)=>(pn(),Mn("div",KE,[A[66]||(A[66]=he("header",null,[he("h1",null,"直齿圆柱齿轮参数化实验室"),he("div",{class:"sub"},"外啮合 · 无变位 · 理想刚性 · 渐开线齿廓（教学模型）")],-1)),he("main",null,[he("aside",ZE,[he("section",null,[A[26]||(A[26]=he("h2",null,"显示单位（不改变实际尺寸）",-1)),he("div",JE,[(pn(!0),Mn(On,null,gl(Object.keys(Un(Nn)),J=>(pn(),Mn("button",{key:J,class:Di({active:e.value===J}),onClick:Le=>e.value=J},st(Un(Nn)[J].label),11,QE))),128))])]),he("section",null,[A[30]||(A[30]=he("h2",null,"齿轮参数",-1)),he("label",null,[A[27]||(A[27]=Pt("压力角 α（度） ",-1)),jt(he("input",{type:"number","onUpdate:modelValue":A[0]||(A[0]=J=>t.alphaDeg=J),min:"1",max:"45",step:"0.5"},null,512),[[ii,t.alphaDeg,void 0,{number:!0}]])]),he("label",null,[Pt("模数 m（"+st(Un(Nn)[e.value].label)+"） ",1),jt(he("input",{type:"number","onUpdate:modelValue":A[1]||(A[1]=J=>l.value=J),step:Un(Nn)[e.value].step},null,8,jE),[[ii,l.value,void 0,{number:!0}]])]),he("label",null,[Pt("齿宽 b（"+st(Un(Nn)[e.value].label)+"） ",1),jt(he("input",{type:"number","onUpdate:modelValue":A[2]||(A[2]=J=>c.value=J),step:Un(Nn)[e.value].step},null,8,eT),[[ii,c.value,void 0,{number:!0}]])]),he("div",tT,[he("label",null,[A[28]||(A[28]=Pt("齿数 z₁ ",-1)),jt(he("input",{type:"number","onUpdate:modelValue":A[3]||(A[3]=J=>t.z1=J),min:"4",step:"1"},null,512),[[ii,t.z1,void 0,{number:!0}]])]),he("label",null,[A[29]||(A[29]=Pt("齿数 z₂ ",-1)),jt(he("input",{type:"number","onUpdate:modelValue":A[4]||(A[4]=J=>t.z2=J),min:"4",step:"1"},null,512),[[ii,t.z2,void 0,{number:!0}]])])]),a.g1.length?(pn(),Mn("div",nT,st(a.g1.join("；")),1)):gr("",!0),a.g2.length?(pn(),Mn("div",iT,st(a.g2.join("；")),1)):gr("",!0)]),he("section",null,[A[32]||(A[32]=he("h2",null,"中心距",-1)),he("label",rT,[jt(he("input",{type:"checkbox","onUpdate:modelValue":A[5]||(A[5]=J=>t.useStandardCenter=J)},null,512),[[_r,t.useStandardCenter]]),A[31]||(A[31]=Pt(" 使用标准中心距 a₀ = m(z₁+z₂)/2 ",-1))]),t.useStandardCenter?gr("",!0):(pn(),Mn("label",sT,[Pt("实际中心距 a（"+st(Un(Nn)[e.value].label)+"） ",1),jt(he("input",{type:"number","onUpdate:modelValue":A[6]||(A[6]=J=>u.value=J),step:Un(Nn)[e.value].step},null,8,aT),[[ii,u.value,void 0,{number:!0}]])]))]),he("section",null,[A[35]||(A[35]=he("h2",null,"运动 / 检查",-1)),he("div",oT,[he("button",{onClick:B,disabled:!f.value},"暂停",8,lT),he("button",{onClick:X,disabled:f.value},"继续",8,cT)]),he("label",null,[A[33]||(A[33]=Pt("轮1 角速度（rad/s） ",-1)),jt(he("input",{type:"range","onUpdate:modelValue":A[7]||(A[7]=J=>d.value=J),min:"0",max:"1.5",step:"0.01"},null,512),[[ii,d.value,void 0,{number:!0}]])]),he("label",null,[A[34]||(A[34]=Pt("接触点沿啮合线 s（mm，暂停可拖动） ",-1)),jt(he("input",{type:"range",disabled:f.value,"onUpdate:modelValue":A[8]||(A[8]=J=>y.value=J),min:it.value[0],max:it.value[1],step:"0.05",onInput:te},null,40,uT),[[ii,y.value,void 0,{number:!0}]])]),he("button",{class:"wide",onClick:A[9]||(A[9]=J=>R(h.value)),disabled:f.value||L.value},st(L.value?"Clipper 求交中…":"在当前帧做局部干涉求交（Clipper2 WASM）"),9,hT),p.value!==null?(pn(),Mn("div",fT,[Pt(" 重叠面积 = "+st(p.value.toExponential(3))+" mm² ",1),he("b",{class:Di(p.value>1e-6?"bad":"good")},st(p.value>1e-6?"存在实体干涉 ❗":"当前帧无干涉 ✅"),3)])):gr("",!0)]),he("section",null,[A[42]||(A[42]=he("h2",null,"显示选项",-1)),he("label",dT,[jt(he("input",{type:"checkbox","onUpdate:modelValue":A[10]||(A[10]=J=>m.showPitchCircle=J)},null,512),[[_r,m.showPitchCircle]]),A[36]||(A[36]=Pt(" 节圆/分度圆",-1))]),he("label",pT,[jt(he("input",{type:"checkbox","onUpdate:modelValue":A[11]||(A[11]=J=>m.showBaseCircle=J)},null,512),[[_r,m.showBaseCircle]]),A[37]||(A[37]=Pt(" 基圆",-1))]),he("label",mT,[jt(he("input",{type:"checkbox","onUpdate:modelValue":A[12]||(A[12]=J=>m.showAddendumCircle=J)},null,512),[[_r,m.showAddendumCircle]]),A[38]||(A[38]=Pt(" 齿顶圆",-1))]),he("label",gT,[jt(he("input",{type:"checkbox","onUpdate:modelValue":A[13]||(A[13]=J=>m.showDedendumCircle=J)},null,512),[[_r,m.showDedendumCircle]]),A[39]||(A[39]=Pt(" 齿根圆",-1))]),he("label",_T,[jt(he("input",{type:"checkbox","onUpdate:modelValue":A[14]||(A[14]=J=>m.showActionLine=J)},null,512),[[_r,m.showActionLine]]),A[40]||(A[40]=Pt(" 啮合线（理论/实际）",-1))]),he("label",vT,[jt(he("input",{type:"checkbox","onUpdate:modelValue":A[15]||(A[15]=J=>m.showContact=J)},null,512),[[_r,m.showContact]]),A[41]||(A[41]=Pt(" 接触点",-1))])]),he("section",null,[A[43]||(A[43]=he("h2",null,"核对样本",-1)),he("div",xT,[he("button",{onClick:A[16]||(A[16]=J=>nt(20,40))},"20/40 标准"),he("button",{onClick:A[17]||(A[17]=J=>nt(17,17))},"17/17 临界"),he("button",{onClick:A[18]||(A[18]=J=>nt(16,40))},"16/40 根切"),he("button",{onClick:A[19]||(A[19]=J=>nt(12,40))},"12/40 极少齿")])])]),he("section",ST,[he("div",{ref_key:"host",ref:C,class:"canvas-host"},null,512),he("div",MT,[Me.value?(pn(),Mn("div",yT,[he("table",null,[he("thead",null,[he("tr",null,[A[44]||(A[44]=he("th",null,null,-1)),he("th",null,"齿轮 1（z₁="+st(t.z1)+"）",1),he("th",null,"齿轮 2（z₂="+st(t.z2)+"）",1)])]),he("tbody",null,[he("tr",null,[A[45]||(A[45]=he("td",null,"分度圆直径 d",-1)),he("td",null,st(We(Me.value.g1.pitchR*2)),1),he("td",null,st(We(Me.value.g2.pitchR*2)),1)]),he("tr",null,[A[46]||(A[46]=he("td",null,"基圆直径 d_b",-1)),he("td",null,st(We(Me.value.g1.baseR*2)),1),he("td",null,st(We(Me.value.g2.baseR*2)),1)]),he("tr",null,[A[47]||(A[47]=he("td",null,"齿顶圆 d_a",-1)),he("td",null,st(We(Me.value.g1.addendumR*2)),1),he("td",null,st(We(Me.value.g2.addendumR*2)),1)]),he("tr",null,[A[48]||(A[48]=he("td",null,"齿根圆 d_f",-1)),he("td",null,st(We(Me.value.g1.dedendumR*2)),1),he("td",null,st(We(Me.value.g2.dedendumR*2)),1)]),he("tr",null,[A[49]||(A[49]=he("td",null,"齿距 p = πm",-1)),he("td",null,st(We(Me.value.g1.circularPitch)),1),he("td",null,st(We(Me.value.g2.circularPitch)),1)]),he("tr",null,[A[50]||(A[50]=he("td",null,"基节 p_b",-1)),he("td",null,st(We(Me.value.g1.basePitch)),1),he("td",null,st(We(Me.value.g2.basePitch)),1)]),he("tr",null,[A[51]||(A[51]=he("td",null,"齿顶压力角 α_a",-1)),he("td",null,st((Me.value.g1.alphaTip/Un(vr)).toFixed(2))+"°",1),he("td",null,st((Me.value.g2.alphaTip/Un(vr)).toFixed(2))+"°",1)]),he("tr",null,[he("td",null,"根切风险 (z<"+st(Me.value.g1.zMinValue.toFixed(1))+")",1),he("td",{class:Di(Me.value.g1.undercut?"bad":"good")},st(Me.value.g1.undercut?"根切 ❗":"安全"),3),he("td",{class:Di(Me.value.g2.undercut?"bad":"good")},st(Me.value.g2.undercut?"根切 ❗":"安全"),3)])])]),he("div",bT,[A[61]||(A[61]=he("h3",null,"啮合检查",-1)),he("div",null,[A[52]||(A[52]=Pt("标准中心距 a₀：",-1)),he("b",null,st(We(Me.value.mesh.a0)),1)]),he("div",null,[A[53]||(A[53]=Pt("实际中心距 a：",-1)),he("b",null,st(We(Me.value.mesh.a)),1),Pt("（Δa = "+st(We(Me.value.mesh.deltaA))+"）",1)]),he("div",null,[A[54]||(A[54]=Pt("啮合角 α′：",-1)),he("b",null,st((Me.value.mesh.alphaPrime/Un(vr)).toFixed(3))+"°",1)]),he("div",null,[A[55]||(A[55]=Pt("节圆半径 r₁′/r₂′：",-1)),he("b",null,st(We(Me.value.mesh.pitchR1))+" / "+st(We(Me.value.mesh.pitchR2)),1)]),he("div",null,[A[56]||(A[56]=Pt("实际啮合线长度 g_α：",-1)),he("b",null,st(We(Me.value.mesh.pathOfContact)),1)]),he("div",null,[A[57]||(A[57]=Pt("重合度 ε_α = g_α/p_b：",-1)),he("b",{class:Di(Me.value.mesh.contactRatio<1?"bad":"good")},st(Me.value.mesh.contactRatio.toFixed(3)),3)]),he("div",null,[A[58]||(A[58]=Pt("圆周/法向侧隙：",-1)),he("b",null,st(We(Me.value.mesh.backlashTangential))+" / "+st(We(Me.value.mesh.backlashNormal)),1)]),he("div",null,[A[59]||(A[59]=Pt("顶隙 c：",-1)),he("b",null,st(We(Me.value.mesh.clearance12)),1)]),he("div",null,[A[60]||(A[60]=Pt("基节一致：",-1)),he("b",{class:Di(Me.value.mesh.basePitchMatch?"good":"bad")},st(Me.value.mesh.basePitchMatch?"是 ✅":"否 ❌"),3)]),Me.value.mesh.warnings.length?(pn(),Mn("ul",ET,[(pn(!0),Mn(On,null,gl(Me.value.mesh.warnings,(J,Le)=>(pn(),Mn("li",{key:Le},"⚠️ "+st(J),1))),128))])):gr("",!0),A[62]||(A[62]=he("div",{class:"formula"}," 渐开线：x=r_b(sin t−t cos t)，y=r_b(cos t+t sin t)；inv(α)=tanα−α； 啮合要求基节相等 + 相位共法线，且 r_b1·Δφ₁ = −r_b2·Δφ₂（不是只按转速比旋转）。 ",-1))])])):gr("",!0)])]),he("aside",TT,[he("section",null,[A[64]||(A[64]=he("h2",null,"案例（IndexedDB）",-1)),jt(he("input",{"onUpdate:modelValue":A[20]||(A[20]=J=>V.value=J),placeholder:"案例名称"},null,512),[[ii,V.value]]),jt(he("textarea",{"onUpdate:modelValue":A[21]||(A[21]=J=>Q.value=J),placeholder:"备注（可选）",rows:"2"},null,512),[[ii,Q.value]]),he("div",AT,[he("button",{onClick:A[22]||(A[22]=J=>de(!0))},"保存（含轮廓）"),he("button",{onClick:A[23]||(A[23]=J=>de(!1))},"仅参数")]),he("div",wT,[he("button",{onClick:A[24]||(A[24]=J=>le(!0))},"导出 JSON+轮廓"),he("button",{onClick:A[25]||(A[25]=J=>le(!1))},"导出参数")]),he("label",RT,[A[63]||(A[63]=Pt("导入 JSON ",-1)),he("input",{type:"file",accept:"application/json,.json",onChange:De,hidden:""},null,32)])]),he("section",null,[A[65]||(A[65]=he("h2",null,"已存案例",-1)),he("ul",CT,[(pn(!0),Mn(On,null,gl(re.value,J=>(pn(),Mn("li",{key:J.id},[he("div",PT,[he("b",null,st(J.name),1),he("span",null,st(J.gear1.z)+"/"+st(J.gear2.z)+" · m="+st(J.gear1.module)+" · α="+st(J.gear1.alphaDeg)+"°"+st(J.outlines?" · 含轮廓":""),1)]),he("div",LT,[he("button",{onClick:Le=>ge(J)},"载入",8,DT),he("button",{class:"del",onClick:Le=>pe(J.id)},"删",8,IT)])]))),128)),re.value.length?gr("",!0):(pn(),Mn("li",UT,"暂无案例"))])])])])]))}});nv(NT).mount("#app");
