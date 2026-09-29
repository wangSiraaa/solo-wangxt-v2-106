const r=20,hf=2.5,m=2
const p=Math.PI*m
const tro=(w:number,th:number)=>{return {x:w*Math.cos(th)+(r-hf)*Math.sin(th),y:-w*Math.sin(th)+(r-hf)*Math.cos(th)}}
// 任意刀齿尖角在齿条坐标 w0 = n*p ± πm/4；滚过后 w = w0 + rθ
// 在齿轮系中摆线点只依赖 (w,θ)。要达到 (rho=18.8, ang=84.646)，
// 反解：给定 θ，w 由极坐标反推。用搜索：θ∈[-π/z,π/z]，w 自由，匹配目标
for(const tgtAngDeg of [84.646,95.354]){
  const t=tgtAngDeg*Math.PI/180, rho=18.8
  const tx=rho*Math.cos(t),ty=rho*Math.sin(t)
  // 对每个 θ，tro 是 w 的线性函数：x = w cosθ + A sinθ; y = -w sinθ + A cosθ, A=r-hf
  // => w = (tx - A sinθ)/cosθ = (A cosθ - ty)/sinθ。两者应一致（点在摆线族上）。
  // 直接求 θ 使两式给出相同 w：
  const A=r-hf
  let best={d:1e9,th:0,w:0}
  for(let k=-40000;k<=40000;k++){
    const th=k/40000*(Math.PI/20*1.5)
    const w1=(tx-A*Math.sin(th))/Math.cos(th)
    const w2=(A*Math.cos(th)-ty)/Math.sin(th)
    const d=Math.abs(w1-w2)
    if(d<best.d&&isFinite(d))best={d,th,w:w1}
  }
  console.log('tgt',tgtAngDeg,'theta',best.th.toFixed(5),'w',best.w.toFixed(3),'residual',best.d.toExponential(1))
  // w 应等于某 n*p ± πm/4
  for(const sgn of [1,-1]){
    const rem = best.w - sgn*Math.PI*m/4
    const n=Math.round(rem/p)
    console.log('   sgn',sgn,'n',n,'w - (n p + sgn πm/4)=',(best.w-(n*p+sgn*Math.PI*m/4)).toFixed(4))
  }
}
