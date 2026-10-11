(function(){
var O,M=window.SIBMAP,reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function t(k,d,v){var s=O&&O.t?O.t(k,d):d;if(v)for(var x in v)s=s.replace("{"+x+"}",v[x]);return s}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
function loc(){var l=O&&O.lang;return typeof l==="string"&&l?l:"en"}
function fmt(n){return Math.round(n).toLocaleString(loc()).replace(/\u202f/g," ")+"\u00a0₽"}
function tween(el,from,to,ms,f){
 if(reduce){el.textContent=f(to);return}
 var s=performance.now();
 function step(now){var p=Math.min(1,(now-s)/ms),e=1-Math.pow(1-p,3);el.textContent=f(from+(to-from)*e);if(p<1)requestAnimationFrame(step)}
 requestAnimationFrame(step)
}
function counters(){
 var els=document.querySelectorAll(".sb-count");if(!els.length)return;
 function run(el){
  var to=+el.dataset.to,from=el.dataset.from!==undefined?+el.dataset.from:0,pre=el.dataset.pre||"",suf=el.dataset.suf||"";
  tween(el,from,to,1100,function(v){return pre+Math.round(v)+suf})
 }
 if(!("IntersectionObserver"in window)){return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.4});
 els.forEach(function(el){io.observe(el)})
}
var sel=null;
function map(){
 var host=document.getElementById("sbMap");if(!host||!M)return;
 var ids=Object.keys(M.regions),svg='<svg viewBox="0 0 '+M.w+" "+M.h+'" role="presentation" focusable="false">';
 Object.keys(M.context).forEach(function(k){svg+='<path class="sb-ctx" d="'+M.context[k]+'"/>'});
 ids.forEach(function(id){var r=M.regions[id];svg+='<path class="sb-reg" data-id="'+id+'" tabindex="0" role="button" aria-pressed="false" aria-label="'+esc(t("sb.r."+id,id))+'" d="'+r.d+'"/>'});
 ids.forEach(function(id){var r=M.regions[id];svg+='<g class="sb-pg" data-id="'+id+'" transform="translate('+r.c[0]+" "+r.c[1]+')"><circle class="sb-ring" r="14"/><circle class="sb-pin" r="5"/><text class="sb-lab" y="-20" text-anchor="middle">'+esc(t("sb.ct."+id,""))+"</text></g>"});
 svg+="</svg>";host.innerHTML=svg;
 var al=host.getAttribute("data-aria");if(al)host.setAttribute("aria-label",t(al,"Map of the ten Siberian regions"));
 var chips=document.getElementById("sbChips");
 chips.innerHTML=ids.map(function(id){return'<button type="button" class="sb-chip" data-id="'+id+'" aria-pressed="false">'+esc(t("sb.r."+id,id))+"</button>"}).join("");
 function pick(id){
  sel=id;
  document.querySelectorAll(".sb-reg,.sb-chip,.sb-pg").forEach(function(x){var on=x.dataset.id===id;x.classList.toggle("on",on);if(x.hasAttribute("aria-pressed"))x.setAttribute("aria-pressed",on)});
  var g=host.querySelector('.sb-pg[data-id="'+id+'"]');if(g&&g.parentNode)g.parentNode.appendChild(g);
  var p=document.getElementById("sbPanel"),r=M.regions[id];
  p.innerHTML='<span class="sb-pi"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span><span class="sb-tg">'+esc(t("sb.m.in","Covered by the tariff"))+"</span><h3>"+esc(t("sb.r."+id,id))+'</h3><dl><div><dt>'+esc(t("sb.m.center","Regional centre"))+"</dt><dd>"+esc(t("sb.ct."+id,""))+"</dd></div><div><dt>"+esc(t("sb.m.code","Region code"))+"</dt><dd>"+esc(r.i)+"</dd></div></dl>"
 }
 host.addEventListener("pointerover",function(e){if(e.pointerType==="touch")return;var r=e.target.closest&&e.target.closest(".sb-reg");if(r)pick(r.dataset.id)});
 host.addEventListener("click",function(e){var r=e.target.closest&&e.target.closest(".sb-reg");if(r)pick(r.dataset.id)});
 host.addEventListener("focusin",function(e){var r=e.target.closest&&e.target.closest(".sb-reg");if(r)pick(r.dataset.id)});
 host.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target.classList&&e.target.classList.contains("sb-reg")){e.preventDefault();pick(e.target.dataset.id)}});
 chips.addEventListener("click",function(e){var b=e.target.closest("button");if(b)pick(b.dataset.id)});
 pick("novosibirsk");
 chips.addEventListener("pointerover",function(e){var b=e.target.closest&&e.target.closest("button");if(b&&e.pointerType!=="touch")pick(b.dataset.id)})
}
function calc(){
 var PR={pro:790,business:2490},st={p:"pro",m:1},o={std:0,sib:0,save:0};
 var a=document.getElementById("kStd"),b=document.getElementById("kSib"),c=document.getElementById("kSave");if(!a)return;
 function upd(first){
  var std=PR[st.p]*st.m,sib=std/2,save=std-sib;
  if(first){a.textContent=fmt(std);b.textContent=fmt(sib);c.textContent=fmt(save)}
  else{tween(a,o.std,std,450,fmt);tween(b,o.sib,sib,450,fmt);tween(c,o.save,save,450,fmt)}
  o.std=std;o.sib=sib;o.save=save
 }
 function wire(id,key,attr){document.getElementById(id).addEventListener("click",function(e){var x=e.target.closest("button");if(!x)return;this.querySelectorAll("button").forEach(function(y){y.classList.toggle("on",y===x)});st[key]=key==="m"?+x.dataset[attr]:x.dataset[attr];upd()})}
 wire("kPlan","p","p");wire("kPer","m","m");upd(true)
}
function innOk(v,len){
 if(!/^\d+$/.test(v)||v.length!==len)return false;
 var d=v.split("").map(Number);
 function ctl(w){var s=0;for(var i=0;i<w.length;i++)s+=w[i]*d[i];return s%11%10}
 if(len===10)return ctl([2,4,10,3,5,9,4,6,8])===d[9];
 return ctl([7,2,4,10,3,5,9,4,6,8])===d[10]&&ctl([3,7,2,4,10,3,5,9,4,6,8])===d[11]
}
function form(){
 var f=document.getElementById("sbForm");if(!f)return;
 var go=document.getElementById("sbGo"),ge=document.getElementById("sbErr"),done=document.getElementById("sbDone");
 function kind(){var r=f.querySelector("input[name=kind]:checked");return r?r.value:"company"}
 function sync(){
  var co=kind()==="company";
  document.getElementById("fnameL").textContent=co?t("sb.f.name.c","Company name"):t("sb.f.name.p","Full name");
  document.getElementById("finnH").textContent=co?t("sb.f.inn10","10 digits"):t("sb.f.inn12","12 digits")
 }
 f.addEventListener("change",function(e){if(e.target.name==="kind")sync()});sync();
 function er(field,on){var s=f.querySelector('.sb-er[data-f="'+field+'"]');if(!s)return;var box=s.parentNode;if(on){s.textContent=t("sb.f.err."+field,"Check this field");s.hidden=false;box.classList.add("bad")}else{s.hidden=true;box.classList.remove("bad")}}
 function clear(){["org_name","inn","region","email","site","phone","purpose"].forEach(function(x){er(x,false)});ge.hidden=true}
 f.addEventListener("input",function(e){var n=e.target.name;if(n)er(n,false)});
 f.addEventListener("submit",function(e){
  e.preventDefault();clear();
  var v={kind:kind(),org_name:f.org_name.value.trim().replace(/\s+/g," "),inn:f.inn.value.replace(/\s+/g,""),region:f.region.value,email:f.email.value.trim(),site:f.site.value.trim(),phone:f.phone.value.trim(),purpose:f.purpose.value.trim(),website:f.website.value,lang:loc()};
  var bad=[];
  if(v.org_name.length<2||v.org_name.length>200)bad.push("org_name");
  if(!innOk(v.inn,v.kind==="company"?10:12))bad.push("inn");
  if(!v.region)bad.push("region");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))bad.push("email");
  if(v.site&&!/^https?:\/\/[^\s\/$.?#][^\s]*\.[^\s]{2,}$/i.test(v.site))bad.push("site");
  if(v.phone&&!/^[+\d][\d\s()\-]{5,}$/.test(v.phone))bad.push("phone");
  if(v.purpose.length<30||v.purpose.length>1000)bad.push("purpose");
  if(bad.length){bad.forEach(function(x){er(x,true)});var el=f.querySelector(".sb-fl.bad input,.sb-fl.bad select,.sb-fl.bad textarea");if(el)el.focus();return}
  if(!document.getElementById("fok").checked){ge.textContent=t("sb.f.err.ok","Please confirm the statement first");ge.hidden=false;return}
  go.disabled=true;
  fetch((O.api||"/api")+"/siberia/apply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v)})
   .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw j;return j})})
   .then(function(){f.hidden=true;document.getElementById("sbDoneP").textContent=t("sb.f.done.p","We sent a confirmation to {e}.",{e:v.email});done.hidden=false;done.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"})})
   .catch(function(j){
    go.disabled=false;var c=j&&j.error;
    if(c==="invalid"&&j.fields){j.fields.forEach(function(x){er(x,true)});return}
    var key=c==="rate_limited"?"sb.f.err.rate":c==="pending_exists"?"sb.f.err.pending":c==="already_approved"?"sb.f.err.approved":"sb.f.err.net";
    ge.textContent=t(key,"Could not send the application. Please try again.");ge.hidden=false
   })
 })
}
function init(){map();counters();calc();form()}
wait(0);
})();
