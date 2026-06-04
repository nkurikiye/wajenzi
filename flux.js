// Flux — shared behaviour: scroll reveals + animated capital-flow canvas.
window.FLUXCONFIG = window.FLUXCONFIG || {motion:true, speed:1, accentMain:'#E2276F', accentLight:'#FF5C97'};
function fluxRgb(hex){hex=hex.replace('#','');if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');const n=parseInt(hex,16);return [(n>>16)&255,(n>>8)&255,n&255];}

(function(){
  // reveal on scroll
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // mobile nav
  const mt=document.querySelector('.menu-toggle');
  if(mt){mt.addEventListener('click',()=>{const n=document.querySelector('.nav-links');n.style.display=(getComputedStyle(n).display==='none'?'flex':'none');});}

  // flow canvas
  const canvas=document.getElementById('flow-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,dpr;
  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,2);
    W=canvas.clientWidth;H=canvas.clientHeight;
    canvas.width=W*dpr;canvas.height=H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  const arcs=[
    {x1:0.10,y1:0.78,cx:0.42,cy:0.30,x2:0.74,y2:0.62},
    {x1:0.14,y1:0.88,cx:0.50,cy:0.46,x2:0.88,y2:0.70},
    {x1:0.06,y1:0.62,cx:0.40,cy:0.18,x2:0.80,y2:0.42},
  ];
  function pt(a,t){const u=1-t;return {x:(u*u*a.x1+2*u*t*a.cx+t*t*a.x2)*W,y:(u*u*a.y1+2*u*t*a.cy+t*t*a.y2)*H};}
  const parts=[];
  arcs.forEach((a,i)=>{const n=14;for(let k=0;k<n;k++) parts.push({a:i,t:k/n,sp:0.0014+Math.random()*0.0016,r:1+Math.random()*1.8});});
  function drawArc(a,rgb){
    ctx.beginPath();ctx.moveTo(a.x1*W,a.y1*H);ctx.quadraticCurveTo(a.cx*W,a.cy*H,a.x2*W,a.y2*H);
    ctx.strokeStyle='rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.10)';ctx.lineWidth=1;ctx.stroke();
  }
  function node(x,y,c){
    ctx.beginPath();ctx.arc(x*W,y*H,4,0,7);ctx.fillStyle=c;ctx.fill();
    ctx.beginPath();ctx.arc(x*W,y*H,9,0,7);ctx.strokeStyle=c;ctx.globalAlpha=0.3;ctx.stroke();ctx.globalAlpha=1;
  }
  function frame(){
    const cfg=window.FLUXCONFIG||{};
    const main=fluxRgb(cfg.accentMain||'#E2276F');
    const light=fluxRgb(cfg.accentLight||'#FF5C97');
    const sp=cfg.speed||1; const moving=cfg.motion!==false;
    ctx.clearRect(0,0,W,H);
    arcs.forEach(a=>drawArc(a,main));
    parts.forEach(p=>{
      if(moving){p.t+=p.sp*sp; if(p.t>1) p.t-=1;}
      const a=arcs[p.a];const q=pt(a,p.t);
      const grd=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,p.r*4);
      grd.addColorStop(0,'rgba('+light[0]+','+light[1]+','+light[2]+',0.95)');
      grd.addColorStop(1,'rgba('+main[0]+','+main[1]+','+main[2]+',0)');
      ctx.fillStyle=grd;ctx.beginPath();ctx.arc(q.x,q.y,p.r*4,0,7);ctx.fill();
    });
    const lc='rgb('+light[0]+','+light[1]+','+light[2]+')';
    arcs.forEach(a=>{node(a.x1,a.y1,'#4FD6C8');node(a.x2,a.y2,lc);});
    requestAnimationFrame(frame);
  }
  resize();window.addEventListener('resize',resize);frame();
})();
