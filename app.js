const root=document.documentElement, body=document.body;
const menuButton=document.getElementById('menu-button'), menu=document.getElementById('site-menu'), overlay=document.getElementById('menu-overlay'), closeButton=document.getElementById('menu-close');
function setMenu(open){if(!menu)return;menu.classList.toggle('open',open);overlay?.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));menuButton?.setAttribute('aria-expanded',String(open));menuButton?.setAttribute('aria-label',open?'Close menu':'Open menu');body.classList.toggle('menu-open',open);if(open)closeButton?.focus();}
menuButton?.addEventListener('click',()=>setMenu(true));closeButton?.addEventListener('click',()=>setMenu(false));overlay?.addEventListener('click',()=>setMenu(false));
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);closeModal();}});
const saved=localStorage.getItem('avin-theme');if(saved==='dark')root.dataset.theme='dark';updateTheme();
document.querySelectorAll('.theme-toggle').forEach(b=>b.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('avin-theme',root.dataset.theme);updateTheme();}));
function updateTheme(){const dark=root.dataset.theme==='dark';document.querySelectorAll('.theme-toggle').forEach(b=>{b.querySelector('.theme-icon').textContent=dark?'☀':'☾';b.querySelector('.theme-label').textContent=dark?'Light mode':'Dark mode';});}
const esc=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
async function getProjects(){try{const r=await fetch('data/projects.json');if(!r.ok)throw Error('Project data unavailable');return await r.json();}catch(e){console.error(e);return[];}}
function card(p){return `<article class="work-card reveal"><button class="work-art tone-${esc(p.tone)}" data-id="${p.id}" aria-label="Open ${esc(p.title)} project"><span class="work-number">0${p.id}</span><span class="shape"></span><span class="art-title">${esc(p.title)}</span><span class="arrow">↗</span><span class="case-link">View project</span></button><div class="work-info"><div><small>${esc(p.category)} · ${esc(p.year)}</small><h3>${esc(p.title)}</h3></div><span>${esc(p.type)}</span></div></article>`;}
let allProjects=[];
let modal=null;

async function initProjects(){
  allProjects=await getProjects();
  const home=document.getElementById('home-projects');
  const grid=document.getElementById('portfolio-grid');

  if(home) home.innerHTML=allProjects.slice(0,4).map(card).join('');
  if(grid) grid.innerHTML=allProjects.map(card).join('');

  bindCards();
  initFilters();
  reveal();
}

function bindCards(){
  if(window.__projectCardsBound)return;
  window.__projectCardsBound=true;

  document.addEventListener('click',e=>{
    const button=e.target.closest('.work-art');
    if(!button)return;

    e.preventDefault();

    const project=allProjects.find(p=>String(p.id)===String(button.dataset.id));
    if(project) openModal(project);
  });
}

function initFilters(){
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');

    const f=btn.dataset.filter;
    const grid=document.getElementById('portfolio-grid');

    if(grid){
      grid.innerHTML=(f==='all'?allProjects:allProjects.filter(p=>p.category===f)).map(card).join('');
      reveal();
    }
  }));
}

function getProjectModal(){
  return document.getElementById('project-modal');
}

function openModal(p){
  const modal=getProjectModal();
  if(!modal||!p)return;

  const setText=(id,value)=>{
    const el=document.getElementById(id);
    if(el)el.textContent=value ?? '';
  };

  setText('modal-meta',`${p.category} · ${p.year} · ${p.type}`);
  setText('modal-title',p.title);
  setText('modal-description',p.description);

  const tags=document.getElementById('modal-tags');
  if(tags)tags.innerHTML=(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join('');

  const art=document.getElementById('modal-art');
  if(art){
    art.className=`modal-art tone-${esc(p.tone)}`;
    art.innerHTML=`<span class="shape"></span><span class="mock-window"><i></i><i></i><i></i><b>${esc(p.title)}</b></span><span class="art-title">${esc(p.title)}</span>`;
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}
function closeModal(){
  const modal=getProjectModal();
  if(!modal)return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  body.classList.remove('modal-open');
}

document.addEventListener('click',e=>{
  if(e.target.closest('[data-close]')) closeModal();
});
const form=document.getElementById('contact-form');const toast=document.getElementById('toast');
form?.addEventListener('submit',e=>{e.preventDefault();let ok=true;form.querySelectorAll('.error').forEach(x=>x.textContent='');const checks=[['name',form.name.value.trim().length>=2,'Please enter your name.'],['email',/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim()),'Please enter a valid email address.'],['message',form.message.value.trim().length>=20,'Please add at least 20 characters about the project.'],['consent',document.getElementById('consent').checked,'Please confirm that you agree to be contacted.']];checks.forEach(([id,valid,msg])=>{const field=document.getElementById(id);if(!valid){ok=false;field?.setAttribute('aria-invalid','true');form.querySelector(`[data-error="${id}"]`).textContent=msg;}else field?.removeAttribute('aria-invalid');});if(ok){form.reset();toast.textContent='Thank you — your enquiry passed validation and is ready to send.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3500);}});
function initCursor(){const glow=document.getElementById('cursor-glow'),ring=document.getElementById('cursor-ring');if(!glow||!ring||window.matchMedia('(pointer:coarse)').matches||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;let x=window.innerWidth/2,y=window.innerHeight/2,rx=x,ry=y,gx=x,gy=y,raf=0;const move=e=>{x=e.clientX;y=e.clientY;document.body.classList.add('cursor-ready');if(!raf)raf=requestAnimationFrame(tick)};const tick=()=>{rx+=(x-rx)*.18;ry+=(y-ry)*.18;gx+=(x-gx)*.08;gy+=(y-gy)*.08;ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;glow.style.transform=`translate3d(${gx}px,${gy}px,0)`;raf=0;if(Math.abs(x-rx)+Math.abs(y-ry)>.2)raf=requestAnimationFrame(tick)};document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerdown',()=>ring.classList.add('is-down'));document.addEventListener('pointerup',()=>ring.classList.remove('is-down'));document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,input,select,textarea,.work-art,.round-link,.menu-button,.menu-close,.site-menu'))ring.classList.add('is-hover')});document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,input,select,textarea,.work-art,.round-link,.menu-button,.menu-close,.site-menu')&&!e.relatedTarget?.closest('a,button,input,select,textarea,.work-art,.round-link,.menu-button,.menu-close,.site-menu'))ring.classList.remove('is-hover')});window.addEventListener('blur',()=>document.body.classList.remove('cursor-ready'));}initCursor();
function reveal(){const items=document.querySelectorAll('.reveal:not(.visible)');if(!('IntersectionObserver'in window)){items.forEach(x=>x.classList.add('visible'));return;}const ob=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');ob.unobserve(x.target);}}),{threshold:.1});items.forEach(x=>ob.observe(x));}reveal();initProjects();
