const S=[
{n:"Face & Head Massage",c:["Massage"],d:"30 min",p:75,t:"This ancient experience relaxes, tones and eases muscle tension in the neck, head, scalp and shoulders. It also helps eliminate toxins by stimulating circulation, creating a positive energy flow and leaving you in a state of tranquility and peace."},
{n:"Reflexology | Foot Massage",c:["Massage","Body"],d:"30 min",p:75,img:"images/foot-care.jpg",alt:"Foot care treatment in progress",t:"Reflexology is performed to help restore and maintain the body's natural equilibrium. This gentle therapy encourages the body to work naturally to restore its healthy balance. The technique of applying gentle pressure to the reflex points is ideal after a day of walking or traveling."},
{n:"Moroccan Bath Premium",c:["Moroccan Bath"],d:"1 hr",p:200,t:"A traditional Moroccan cleansing ritual to soften the skin, remove dead skin layers and relax tired muscles."},
{n:"Moroccan Bath Deluxe",c:["Moroccan Bath"],d:"1 hr 30 min",p:300,av:"Male only",t:"The extended Moroccan bath ritual to soften the skin, remove dead skin layers and relax tired muscles."},
{n:"Manicure & Pedicure with Facial Clean Up",c:["Groupon","Hand & Feet","Combos","Face Care"],d:"1 hr 30 min",p:129,was:150,img:"images/pedicure-room.jpg",alt:"Pedicure chairs in the salon",t:"Groupon offer, available 7 days a week. Limited to 10 vouchers per month."}];
const C=["All Services","Combos","Hair","Beard","Hand & Feet","Face Care","Body","Massage","Moroccan Bath","Groupon"];
const $=s=>document.querySelector(s),aed=n=>"AED "+n.toLocaleString("en-AE");
function card(s){const ph=s.img?`<img src="${s.img}" alt="${s.alt}" loading="lazy">`:`<span>${s.n}</span>`;
return `<article class="card"><div class="ph">${ph}</div><div class="bd"><h3>${s.n}</h3><div><span class="badge">${s.d}</span>${s.av?`<span class="badge">${s.av}</span>`:""}</div><p>${s.t}</p><div class="row"><span class="price">${s.was?`<small><s>${aed(s.was)}</s></small>`:""}${aed(s.p)}</span><button class="btn" data-book="${s.n}">Book Now</button></div></div></article>`}
let cat="All Services";
function render(){$("#tabs").innerHTML=C.map(c=>`<button class="tab" aria-pressed="${c==cat}" data-t="${c}">${c}</button>`).join("");
const l=S.filter(s=>cat=="All Services"||s.c.includes(cat));
$("#grid").innerHTML=l.length?l.map(card).join(""):`<div class="empty" style="grid-column:1/-1">No ${cat} services are listed yet. <a href="#booking" style="color:var(--gold)">Contact us</a> for availability.</div>`}
render();
$("#pop").innerHTML=[0,1,2,3,4].map(i=>card(S[i])).join("");
$("#mor").innerHTML=S.filter(s=>s.c[0]=="Moroccan Bath").reverse().map(s=>`<div class="mini"><div><h3>${s.n}</h3><span class="badge">${s.d}</span>${s.av?`<span class="badge">${s.av}</span>`:""}</div><div class="row" style="gap:16px"><span class="price">${aed(s.p)}</span><button class="btn" data-book="${s.n}">Book Now</button></div></div>`).join("");
function mkForm(host){const f=$("#ft").content.cloneNode(true);f.querySelector("select").innerHTML='<option value="">Choose a service</option>'+S.map(s=>`<option>${s.n}</option>`).join("");
f.querySelector("form").addEventListener("submit",e=>{e.preventDefault();e.target.querySelector(".ok").classList.add("on");setTimeout(()=>{e.target.reset();e.target.querySelector(".ok").classList.remove("on")},6000)});
f.querySelector("input[type=date]").min=new Date().toISOString().slice(0,10);host.appendChild(f)}
mkForm($("#formHome"));mkForm($("#formModal"));
const M=$("#modal");let last;
function openBook(s){last=document.activeElement;[$("#formHome"),$("#formModal")].forEach(h=>{if(s)h.querySelector("select").value=s});
if(s&&!document.activeElement.closest("#booking")){}M.classList.add("on");M.querySelector("input").focus()}
const closeBook=()=>{M.classList.remove("on");last&&last.focus()};
document.addEventListener("click",e=>{
const b=e.target.closest("[data-book]");if(b){e.preventDefault();openBook(b.dataset.book||"");return}
const t=e.target.closest("[data-t]");if(t){cat=t.dataset.t;render();return}
const a=e.target.closest("[data-cat]");if(a){cat=a.dataset.cat;render();$("#nav").classList.remove("open")}
else if(e.target.closest("nav a")){$("#nav").classList.remove("open")}
const g=e.target.closest("[data-lb]");if(g){$("#lb img").src=g.dataset.lb;$("#lb").classList.add("on")}
if(e.target==M)closeBook()});
$("#mx").onclick=closeBook;$("#lbx").onclick=()=>$("#lb").classList.remove("on");$("#lb").onclick=e=>{if(e.target.id=="lb")$("#lb").classList.remove("on")};
document.addEventListener("keydown",e=>{if(e.key=="Escape"){closeBook();$("#lb").classList.remove("on")}});
$("#menu").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#menu").setAttribute("aria-expanded",o)};
$("#top").onclick=()=>scrollTo({top:0,behavior:"smooth"});
const io=new IntersectionObserver(r=>r.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll(".rv").forEach(n=>io.observe(n));