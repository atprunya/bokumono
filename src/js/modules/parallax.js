export function initParallax(){
  const layers=[...document.querySelectorAll('.plx')];
  if(!layers.length) return;
  const strength={ 'layer-sky':0.08, 'layer-haze':0.16, 'layer-ground':0.24 };
  if (matchMedia('(max-width:640px)').matches){ for(const k in strength){ strength[k]*=0.5; } }
  let lastY=-1;
  function frame(){
    const y=window.scrollY||window.pageYOffset;
    if(y!==lastY){
      layers.forEach(l=>{
        const key=[...l.classList].find(c=>strength[c]);
        const k=strength[key]||0.1;
        const t=Math.max(-40, Math.min(40, y*k));
        l.style.transform=`translateY(${t}px)`;
      });
      lastY=y;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
