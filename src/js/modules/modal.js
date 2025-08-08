export function initModal(){
  const backdrop=document.getElementById('flyerModal');
  if(!backdrop) return;
  const openBtn=document.querySelector('[data-open-modal]');
  const closeBtn=backdrop.querySelector('[data-close-modal]');
  const carousel=backdrop.querySelector('[data-carousel]');
  const slides=[...carousel.querySelectorAll('.slide')];
  const dotsWrap=backdrop.querySelector('[data-dots]');
  const dots=[...dotsWrap.querySelectorAll('.dot')];
  let active=0; let lastFocus=null;

  const setSlide=(i)=>{
    active=(i+slides.length)%slides.length;
    slides.forEach((s,idx)=> s.classList.toggle('is-active', idx===active));
    dots.forEach((d,idx)=>{ d.setAttribute('aria-selected', idx===active); d.toggleAttribute('aria-current', idx===active); });
  };

  const open=()=>{ lastFocus=document.activeElement; backdrop.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; setTimeout(()=> closeBtn.focus(), 0); setSlide(active); };
  const close=()=>{ backdrop.setAttribute('aria-hidden','true'); document.body.style.overflow=''; if(lastFocus) lastFocus.focus(); };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) close(); });
  document.addEventListener('keydown', (e)=>{ if(backdrop.getAttribute('aria-hidden')==='false' && e.key==='Escape') close(); });

  carousel.querySelector('[data-prev]').addEventListener('click', ()=> setSlide(active-1));
  carousel.querySelector('[data-next]').addEventListener('click', ()=> setSlide(active+1));
  dots.forEach((d,idx)=> d.addEventListener('click', ()=> setSlide(idx)));

  // arrows + focus trap
  backdrop.addEventListener('keydown', (e)=>{
    if(backdrop.getAttribute('aria-hidden')!=='false') return;
    if(e.key==='ArrowLeft') setSlide(active-1);
    if(e.key==='ArrowRight') setSlide(active+1);
    if(e.key==='Tab'){
      const focusables=backdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const list=[...focusables].filter(el=>!el.hasAttribute('disabled'));
      if(list.length){ const first=list[0], last=list[list.length-1];
        if(e.shiftKey && document.activeElement===first){ last.focus(); e.preventDefault(); }
        else if(!e.shiftKey && document.activeElement===last){ first.focus(); e.preventDefault(); }
      }
    }
  });
}
