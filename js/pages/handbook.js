(function(){
var T=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
function fit(){var s=document.getElementById("hbBig");if(!s)return;var h=s.parentNode,w=document.documentElement.clientWidth-40;h.style.fontSize="100px";var cur=s.getBoundingClientRect().width||1;var fs=Math.min(100*w/cur,340);h.style.fontSize=fs+"px"}
function dates(){var l=(window.GESERD&&GESERD.lang)||"en";document.querySelectorAll("[data-hbd]").forEach(function(t){var d=new Date(t.getAttribute("datetime")+"T12:00:00");if(!isNaN(d))t.textContent=d.toLocaleDateString(l,{day:"numeric",month:"short",year:"numeric"})})}
function nav(){document.querySelectorAll(".hb-ct").forEach(function(b){b.addEventListener("click",function(){var g=b.parentNode,o=!g.classList.contains("open");g.classList.toggle("open",o);b.setAttribute("aria-expanded",o)})});
var m=document.querySelector("[data-hb-menu]");if(m)m.addEventListener("click",function(){var s=m.parentNode,o=!s.classList.contains("mo");s.classList.toggle("mo",o);m.setAttribute("aria-expanded",o)})}
var ov,inp,res,sel=0,cur=[];
function lang(){return(window.GESERD&&GESERD.lang)||"en"}
function build(){ov=document.createElement("div");ov.className="hb-ov";ov.innerHTML='<div class="hb-md" role="dialog" aria-modal="true"><div class="hb-mi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg><input type="text" autocomplete="off" spellcheck="false"><button type="button" class="hb-mx">Esc</button></div><ul class="hb-mr"></ul></div>';document.body.appendChild(ov);inp=ov.querySelector("input");res=ov.querySelector("ul");inp.placeholder=T("hb2.search.ph","Search the handbook");
ov.addEventListener("mousedown",function(e){if(e.target===ov)close()});ov.querySelector(".hb-mx").addEventListener("click",close);inp.addEventListener("input",function(){sel=0;list()});
inp.addEventListener("keydown",function(e){if(e.key==="ArrowDown"){sel=Math.min(sel+1,cur.length-1);mark();e.preventDefault()}else if(e.key==="ArrowUp"){sel=Math.max(sel-1,0);mark();e.preventDefault()}else if(e.key==="Enter"&&cur[sel]){location.href=cur[sel].u}else if(e.key==="Escape")close()})}
function mark(){[].forEach.call(res.querySelectorAll("a"),function(a,i){a.classList.toggle("on",i===sel);if(i===sel)a.scrollIntoView({block:"nearest"})})}
function list(){var q=inp.value.trim().toLowerCase(),l=lang(),out=[];
(window.HB_INDEX||[]).forEach(function(a){var t=T(a.t,"").toLowerCase(),x=((a.x[l]||a.x.en)+"").toLowerCase();
if(!q){out.push({a:a,s:0});return}var s=0;q.split(/\s+/).forEach(function(w){if(t.indexOf(w)>-1)s+=10;else if(x.indexOf(w)>-1)s+=1;else s-=100});if(s>0)out.push({a:a,s:s})});
out.sort(function(p,r){return r.s-p.s});cur=out.map(function(o){return o.a});
res.innerHTML=out.length?out.map(function(o,i){var a=o.a,x=(a.x[l]||a.x.en)+"",sn=x.slice(0,110);if(q){var p=x.toLowerCase().indexOf(q.split(/\s+/)[0]);if(p>-1)sn=(p>30?"…":"")+x.slice(Math.max(0,p-30),p+90)}
return '<li><a href="'+a.u+'"'+(i===sel?' class="on"':"")+'><small>'+T(a.c,"")+'</small><b>'+T(a.t,"")+'</b><em>'+sn.replace(/</g,"&lt;")+'</em></a></li>'}).join(""):'<li class="hb-mn">'+T("hb2.none","Nothing found")+'</li>'}
function open(){if(!ov)build();ov.classList.add("on");inp.value="";sel=0;list();setTimeout(function(){inp.focus()},30)}
function close(){if(ov)ov.classList.remove("on")}
function init(){fit();dates();nav();document.querySelectorAll("[data-hb-open]").forEach(function(b){b.addEventListener("click",open)});
document.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();open()}else if(e.key==="Escape")close()});
window.addEventListener("resize",fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit)}
function go(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()}
(function wait(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go,go);if(n>400)return go();setTimeout(function(){wait(n+1)},25)})(0)
})();
