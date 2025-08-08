export function initInk(){
  document.querySelectorAll('.ink').forEach(a=>{
    a.addEventListener('pointermove', e=>{
      const r=a.getBoundingClientRect();
      a.style.setProperty('--x', (e.clientX-r.left)+'px');
      a.style.setProperty('--y', (e.clientY-r.top)+'px');
    }, {passive:true});
  });
}
