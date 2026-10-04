(function(){
var A=window.GSApp={};
var G=function(){return window.GESERD||{}};
A.lang=function(){return G().lang||"en"};
A.t=function(k,d,v){var s=G().t?G().t(k,d):d;if(s==null)s=d;if(v)for(var x in v)s=String(s).split("{"+x+"}").join(v[x]);return s};
A.esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
A.icon=function(d,n){n=n||16;return'<svg viewBox="0 0 24 24" width="'+n+'" height="'+n+'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+"</svg>"};
A.IC={copy:'<rect x="9" y="9" width="11" height="11" rx="3"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',check:'<path d="m5 12 5 5 9-10"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',chev:'<path d="m9 6 6 6-6 6"/>',back:'<path d="m15 6-6 6 6 6"/>',x:'<path d="m6 6 12 12M18 6 6 18"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 11a8 8 0 0 0-14-4M4 5v4h4M4 13a8 8 0 0 0 14 4M20 19v-4h-4"/>',key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',hook:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M12 8.5 7.5 16M8.5 18h7M16.5 16 12 8.5"/>',inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>'};

A.api=function(path,o){o=o||{};var h={};if(o.body!==undefined)h["Content-Type"]="application/json";
 return fetch((G().api||"/api")+path,{method:o.method||"GET",credentials:"same-origin",cache:"no-store",headers:h,body:o.body!==undefined?JSON.stringify(o.body):undefined}).then(function(r){
  if(r.status===401){location.href="/login/";return new Promise(function(){})}
  return r.json().catch(function(){return{}}).then(function(j){if(!r.ok){var e=new Error(j.error||"server_error");e.code=j.error||"server_error";e.status=r.status;e.data=j;throw e}return j})
 },function(){var e=new Error("network");e.code="network";throw e})};
A.err=function(e){var c=(e&&e.code)||"server_error";return A.t("au.err."+c,A.t("au.err.generic","Something went wrong. Please try again."))};

A.num=function(n){try{return new Intl.NumberFormat(A.lang()).format(n)}catch(e){return String(n)}};
A.date=function(iso){var d=new Date(iso);if(isNaN(d))return"";try{return d.toLocaleString(A.lang(),{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch(e){return d.toISOString()}};
A.ago=function(iso){var d=new Date(iso);if(isNaN(d))return"";var s=Math.round((d-Date.now())/1000),a=Math.abs(s);
 try{var f=new Intl.RelativeTimeFormat(A.lang(),{numeric:"auto"});
  if(a<60)return f.format(Math.round(s/1)||0,"second");if(a<3600)return f.format(Math.round(s/60),"minute");if(a<86400)return f.format(Math.round(s/3600),"hour");if(a<2592000)return f.format(Math.round(s/86400),"day");
  return A.date(iso)}catch(e){return A.date(iso)}};
A.plural=function(n,prefix,def){var c="other";try{c=new Intl.PluralRules(A.lang()).select(n)}catch(e){}
 return A.t(prefix+"."+c,A.t(prefix+".other",def||"{n}"),{n:A.num(n)}).split("{n}").join(A.num(n))};

A.toast=function(msg,kind){var box=document.getElementById("gts");if(!box){box=document.createElement("div");box.id="gts";box.className="gts";box.setAttribute("role","status");box.setAttribute("aria-live","polite");document.body.appendChild(box)}
 var e=document.createElement("div");e.className="gt "+(kind||"");e.innerHTML="<i></i><span></span>";e.lastChild.textContent=msg;box.appendChild(e);
 while(box.children.length>3)box.removeChild(box.firstChild);
 requestAnimationFrame(function(){requestAnimationFrame(function(){e.classList.add("on")})});
 setTimeout(function(){e.classList.remove("on");setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},320)},3200)};

A.copy=function(text,btn){function ok(){if(btn){var o=btn.innerHTML;btn.classList.add("done");btn.innerHTML=A.icon(A.IC.check)+'<span>'+A.esc(A.t("au.copied","Copied"))+"</span>";setTimeout(function(){btn.classList.remove("done");btn.innerHTML=o},1400)}else A.toast(A.t("au.copied","Copied"))}
 function fb(){var t=document.createElement("textarea");t.value=text;t.setAttribute("readonly","");t.style.cssText="position:fixed;top:0;left:0;opacity:0";document.body.appendChild(t);t.select();var r=false;try{r=document.execCommand("copy")}catch(e){}t.remove();r?ok():A.toast(A.t("au.copyfail","Couldn't copy — select the text and copy it manually."))}
 if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(text).then(ok,fb);else fb()};

A.modal=function(o){var m=document.createElement("div");m.className="gm";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");
 var acts=(o.actions||[]).map(function(a,i){return'<button type="button" class="abtn lg '+(a.cls||"")+'" data-i="'+i+'">'+A.esc(a.label)+"</button>"}).join("");
 m.innerHTML='<div class="box'+(o.wide?" wide":"")+'"><div class="mh2"><h2>'+A.esc(o.title||"")+'</h2>'+(o.persist?"":'<button type="button" class="mx" aria-label="'+A.esc(A.t("app.close","Close"))+'">'+A.icon(A.IC.x,18)+"</button>")+"</div>"+(o.desc?"<p class=\"md\">"+A.esc(o.desc)+"</p>":"")+'<div class="mb"></div>'+(acts?'<div class="ma">'+acts+"</div>":"")+"</div>";
 var body=m.querySelector(".mb");if(typeof o.body==="string")body.innerHTML=o.body;else if(o.body)body.appendChild(o.body);
 var prev=document.activeElement;
 function close(){document.removeEventListener("keydown",key);m.remove();document.documentElement.classList.remove("lock2");if(prev&&prev.focus)try{prev.focus()}catch(e){}if(o.onClose)o.onClose()}
 function key(e){if(e.key==="Escape"&&!o.persist)close()}
 var api={el:m,body:body,close:close};
 m.addEventListener("mousedown",function(e){if(e.target===m&&!o.persist)close()});
 var x=m.querySelector(".mx");if(x)x.onclick=close;
 m.querySelectorAll(".ma button").forEach(function(b){b.onclick=function(){var a=o.actions[+b.dataset.i];if(a.onClick)a.onClick(api,b);else close()}});
 document.addEventListener("keydown",key);document.body.appendChild(m);document.documentElement.classList.add("lock2");
 var f=m.querySelector("input,textarea");if(f)setTimeout(function(){f.focus()},30);else{var b=m.querySelector(".ma .pri,.ma button");if(b)b.focus()}
 return api};

A.dropdown=function(opts,value,onChange,cls){var w=document.createElement("div");w.className="dd "+(cls||"");
 function label(v){var o=opts.filter(function(x){return x[0]===v})[0];return o?o[1]:""}
 function paint(){w.innerHTML='<button type="button" class="flt" aria-haspopup="listbox" aria-expanded="false"><span>'+A.esc(label(value))+"</span>"+A.icon('<path d="m6 9 6 6 6-6"/>',14)+'</button><div class="ddm" role="listbox">'+opts.map(function(o){return'<button type="button" role="option" data-v="'+A.esc(o[0])+'" class="'+(o[0]===value?"sel":"")+'"><span>'+A.esc(o[1])+"</span>"+(o[0]===value?A.icon(A.IC.check,14):"")+"</button>"}).join("")+"</div>"}
 paint();
 w.addEventListener("click",function(e){var b=e.target.closest(".flt"),it=e.target.closest(".ddm button");
  if(b){e.stopPropagation();var m=w.querySelector(".ddm"),was=m.classList.contains("on");document.querySelectorAll(".ddm.on").forEach(function(x){x.classList.remove("on")});if(!was){m.classList.add("on");b.setAttribute("aria-expanded","true")}return}
  if(it){e.stopPropagation();value=it.dataset.v;paint();if(onChange)onChange(value)}});
 return w};
document.addEventListener("click",function(){document.querySelectorAll(".ddm.on").forEach(function(x){x.classList.remove("on")})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")document.querySelectorAll(".ddm.on").forEach(function(x){x.classList.remove("on")})});

A.ready=function(fn){function go(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn()}
 (function w(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go);if(n>200)return go();setTimeout(function(){w(n+1)},25)})(0)};

A.empty=function(icon,h,p,btn){return'<div class="empty">'+A.icon(icon,30)+"<h3>"+A.esc(h)+"</h3>"+(p?"<p>"+A.esc(p)+"</p>":"")+(btn||"")+"</div>"};
A.loading=function(){return'<div class="gload"><i></i><i></i><i></i></div>'};
A.failed=function(e,retryId){return'<div class="empty">'+A.icon(A.IC.refresh,30)+"<h3>"+A.esc(A.err(e))+'</h3><button type="button" class="abtn lg" id="'+retryId+'">'+A.esc(A.t("au.retry","Try again"))+"</button></div>"};
A.pill=function(kind,text){return'<span class="st '+kind+'"><i></i>'+A.esc(text)+"</span>"};

(function(){
function fit(){document.querySelectorAll(".stabs").forEach(function(n){if(n.dataset.fit)return;n.dataset.fit="1";var on=n.querySelector("a.on");function edge(){var l=n.scrollLeft>4,r=n.scrollLeft+n.clientWidth<n.scrollWidth-4;n.classList.toggle("fl",l);n.classList.toggle("fr",r)}n.addEventListener("scroll",edge,{passive:true});window.addEventListener("resize",edge);if(on&&n.scrollWidth>n.clientWidth)n.scrollLeft=Math.max(0,on.offsetLeft-n.clientWidth/2+on.offsetWidth/2);edge()})}
new MutationObserver(fit).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener("DOMContentLoaded",fit);fit()})();
})();
