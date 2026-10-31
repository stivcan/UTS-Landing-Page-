(()=>{
const WA_NUMBER=''; // isi nomor WhatsApp format internasional, contoh: '6281234567890'
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// tema
$('#th').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('mora-theme',t)}catch(e){}};
// drawer
const dr=$('#dr'),mt=$('#mt'),setDr=o=>{dr.classList.toggle('open',o);mt.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';(o?$('#dc'):mt).focus()};
mt.onclick=()=>setDr(true);$('#dc').onclick=()=>setDr(false);$$('a',dr).forEach(a=>a.onclick=()=>setDr(false));
addEventListener('keydown',e=>{if(e.key==='Escape'&&dr.classList.contains('open'))setDr(false)});
// progress + back to top
const hdr=$('header'),up=$('#up');let tick=0;
const onScroll=()=>{tick=0;const h=root.scrollHeight-innerHeight;hdr.style.setProperty('--p',h>0?scrollY/h:0);up.classList.toggle('show',scrollY>700)};
addEventListener('scroll',()=>{tick||(tick=requestAnimationFrame(onScroll))},{passive:true});onScroll();
up.onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv,.arch').forEach(el=>io.observe(el));
// nav aktif
const links=$$('nav a'),so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('on',on);on?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id],footer[id]').forEach(s=>so.observe(s));
// marquee
const mq=$('.mq div');mq.innerHTML+=mq.innerHTML;
// parallax hero
if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){const st=$('#stage');$('.hero').addEventListener('pointermove',e=>{st.style.setProperty('--mx',(e.clientX/innerWidth-.5)*2);st.style.setProperty('--my',(e.clientY/innerHeight-.5)*2)})}
// tab menu
const menu=$('#menu'),tabs=$$('[role=tab]'),ind=$('#tabs i');
const place=()=>{const t=tabs.find(x=>x.getAttribute('aria-selected')==='true');ind.style.setProperty('--x',t.offsetLeft+'px');ind.style.setProperty('--w',t.offsetWidth+'px')};
const pick=(i,f)=>{tabs.forEach((t,j)=>{const on=i===j;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=!on});menu.dataset.t=tabs[i].dataset.t;place();f&&tabs[i].focus()};
tabs.forEach((t,i)=>{t.onclick=()=>pick(i);t.onkeydown=e=>{const n=tabs.length,k={ArrowRight:(i+1)%n,ArrowLeft:(i+n-1)%n,Home:0,End:n-1}[e.key];if(k!==undefined){e.preventDefault();pick(k,true)}}});
place();addEventListener('resize',place);document.fonts&&document.fonts.ready.then(place);
// WhatsApp
$$('[data-wa]').forEach(a=>{
  const message=encodeURIComponent('Halo MŌRA Caféé, saya ingin memesan '+a.dataset.wa);
  if(WA_NUMBER.trim()){
    a.href=`https://wa.me/${WA_NUMBER.trim()}?text=${message}`;
    a.target='_blank';
    a.rel='noopener noreferrer';
  }else{
    a.removeAttribute('href');
    a.setAttribute('aria-disabled','true');
    a.title='Isi WA_NUMBER pada kode JavaScript untuk mengaktifkan pemesanan';
    a.addEventListener('click',e=>{e.preventDefault();alert('Fitur pemesanan belum aktif. Isi WA_NUMBER dengan nomor WhatsApp bisnis format internasional, misalnya 6281234567890.');});
  }
});
// carousel
const tr=$('#tr'),step=()=>tr.firstElementChild.offsetWidth+20;
$('#nx').onclick=()=>tr.scrollBy({left:step(),behavior:reduce?'auto':'smooth'});$('#pv').onclick=()=>tr.scrollBy({left:-step(),behavior:reduce?'auto':'smooth'});
})();
