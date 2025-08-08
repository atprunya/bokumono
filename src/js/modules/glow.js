export function initGlow(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-on'); io.unobserve(e.target); } });
  }, {threshold:.2});
  document.querySelectorAll('.js-observe').forEach(el=>io.observe(el));
}
