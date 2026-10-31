(function(){
var A=window.GSApp={};
var G=function(){return window.GESERD||{}};
A.lang=function(){return G().lang||"en"};
A.t=function(k,d,v){var s=G().t?G().t(k,d):d;if(s==null)s=d;if(v)for(var x in v)s=String(s).split("{"+x+"}").join(v[x]);return s};
A.esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
A.icon=function(d,n){n=n||16;return'<svg viewBox="0 0 24 24" width="'+n+'" height="'+n+'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+"</svg>"};
A.IC={copy:'<rect x="9" y="9" width="11" height="11" rx="3"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',check:'<path d="m5 12 5 5 9-10"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',chev:'<path d="m9 6 6 6-6 6"/>',back:'<path d="m15 6-6 6 6 6"/>',x:'<path d="m6 6 12 12M18 6 6 18"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 11a8 8 0 0 0-14-4M4 5v4h4M4 13a8 8 0 0 0 14 4M20 19v-4h-4"/>',inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',key:'<circle cx="7.8" cy="16.2" r="3.6"/><path d="m10.4 13.6 8.6-8.6M15.6 8.4l2.6 2.6M18 6l1.8 1.8"/>',globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 2.4 3.6 5.2 3.6 8.5s-1.1 6.1-3.6 8.5c-2.5-2.4-3.6-5.2-3.6-8.5s1.1-6.1 3.6-8.5z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3.8 7.6 8.2 6 8.2-6"/>',hook:'<circle cx="12" cy="6" r="2.4"/><circle cx="5.6" cy="17.2" r="2.4"/><circle cx="18.4" cy="17.2" r="2.4"/><path d="M12 8.4v2.2l-4.9 4.6M14.6 17.2H8M16.6 15.2 13.1 9.6"/>',tpl:'<rect x="8" y="3.5" width="8" height="17" rx="2.5"/><path d="M4 7.5v9M20 7.5v9"/>',bc:'<circle cx="12" cy="10.5" r="1.7"/><path d="M12 12.3V20"/><path d="M8.6 7.1a4.8 4.8 0 0 0 0 6.8M15.4 7.1a4.8 4.8 0 0 1 0 6.8"/><path d="M5.9 4.4a8.6 8.6 0 0 0 0 12.2M18.1 4.4a8.6 8.6 0 0 1 0 12.2"/>',aud:'<circle cx="12" cy="8" r="2.6"/><path d="M7.8 16.4a4.2 4.2 0 0 1 8.4 0"/><circle cx="5.4" cy="10.2" r="1.9"/><path d="M2.4 17a3 3 0 0 1 4.3-2.6"/><circle cx="18.6" cy="10.2" r="1.9"/><path d="M21.6 17a3 3 0 0 0-4.3-2.6"/>',metrics:'<path d="M3.5 3.5v15a2 2 0 0 0 2 2h15"/><path d="m7.5 15 3.6-4.4 3 2.6 4.4-5.6"/>',logs:'<rect x="3.5" y="4" width="17" height="6" rx="2"/><rect x="3.5" y="12" width="17" height="6" rx="2"/><path d="M7 20.5h10"/>',bell:'<path class="i-bell" d="M6.2 10a5.8 5.8 0 0 1 11.6 0c0 4.6 1.8 5.9 1.8 5.9H4.4s1.8-1.3 1.8-5.9z"/><path class="i-clap" d="M10 19.2a2.2 2.2 0 0 0 4 0"/>',chat:'<path d="M5.5 4.5h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4.6 3.6V16.5h-.9a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/><path d="M8 9.5h8M8 12.5h5"/>'};

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
 var e=document.createElement("div");e.className="gt "+(kind||"");e.innerHTML='<i class="gti">'+(kind==="err"?A.icon('<path d="M12 6v8"/><path d="M12 18h.01"/>',18):kind==="ok"?A.icon('<path d="m5.5 12.5 4.2 4.2 8.8-9.4"/>',18):A.icon('<path d="M12 10.5v8"/><path d="M12 6h.01"/>',18))+"</i><span></span>";e.lastChild.textContent=msg;box.appendChild(e);
 while(box.children.length>3)box.removeChild(box.firstChild);
 requestAnimationFrame(function(){requestAnimationFrame(function(){e.classList.add("on")})});
 setTimeout(function(){e.classList.remove("on");setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},320)},3200)};

A.copy=function(text,btn){function ok(){if(btn){var o=btn.innerHTML;btn.classList.add("done");btn.innerHTML=A.icon(A.IC.check)+'<span>'+A.esc(A.t("au.copied","Copied"))+"</span>";setTimeout(function(){btn.classList.remove("done");btn.innerHTML=o},1400)}else A.toast(A.t("au.copied","Copied"))}
 function fb(){var t=document.createElement("textarea");t.value=text;t.setAttribute("readonly","");t.style.cssText="position:fixed;top:0;left:0;opacity:0";document.body.appendChild(t);t.select();var r=false;try{r=document.execCommand("copy")}catch(e){}t.remove();r?ok():A.toast(A.t("au.copyfail","Couldn't copy — select the text and copy it manually."))}
 if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(text).then(ok,fb);else fb()};

A.modal=function(o){var m=document.createElement("div");m.className="gm";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");
 var al=(o.actions||[]).map(function(a,i){return{a:a,i:i,p:/\bpri\b/.test(a.cls||"")}});al.sort(function(x,y){return(y.p?1:0)-(x.p?1:0)||x.i-y.i});var seenPri=false,seenSec=false;
 var acts=al.map(function(x){var kb="";if(x.p&&!seenPri){seenPri=true;kb='<kbd>Ctrl</kbd><kbd>Enter</kbd>'}else if(!x.p&&!seenSec){seenSec=true;kb='<kbd>Esc</kbd>'}return'<button type="button" class="abtn lg '+(x.a.cls||"")+'" data-i="'+x.i+'"><span>'+A.esc(x.a.label)+"</span>"+kb+"</button>"}).join("");
 m.innerHTML='<div class="box'+(o.wide?" wide":"")+'"><div class="mh2"><h2>'+A.esc(o.title||"")+'</h2>'+(o.persist?"":'<button type="button" class="mx" aria-label="'+A.esc(A.t("app.close","Close"))+'">'+A.icon(A.IC.x,18)+"</button>")+"</div>"+(o.desc?"<p class=\"md\">"+A.esc(o.desc)+"</p>":"")+'<div class="mb"></div>'+(acts?'<div class="ma">'+acts+"</div>":"")+"</div>";
 var body=m.querySelector(".mb");if(typeof o.body==="string")body.innerHTML=o.body;else if(o.body)body.appendChild(o.body);
 var prev=document.activeElement;
 function close(){document.removeEventListener("keydown",key);m.remove();document.documentElement.classList.remove("lock2");if(prev&&prev.focus)try{prev.focus()}catch(e){}if(o.onClose)o.onClose()}
 function key(e){if(e.key==="Escape"&&!o.persist)close();else if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){var pb=m.querySelector(".ma .pri");if(pb&&!pb.disabled){e.preventDefault();pb.click()}}}
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


A.menu=function(btn,items){
 if(A._menu&&A._menu.btn===btn){A._menu.close();return}
 if(A._menu)A._menu.close();
 var el=document.createElement("div");el.className="tmenu";el.setAttribute("role","menu");
 el.innerHTML=items.map(function(d,i){return d==="-"?"<hr>":'<button type="button" role="menuitem" data-i="'+i+'" class="'+(d.cls||"")+'">'+(d.icon?A.icon(d.icon,16):"")+"<span>"+A.esc(d.label)+"</span></button>"}).join("");
 document.body.appendChild(el);
 var r=btn.getBoundingClientRect(),w=el.offsetWidth,h=el.offsetHeight,left=Math.min(Math.max(8,r.right-w),window.innerWidth-w-8),top=r.bottom+6;
 if(top+h>window.innerHeight-8)top=Math.max(8,r.top-h-6);
 el.style.left=left+"px";el.style.top=top+"px";btn.setAttribute("aria-expanded","true");
 function close(){el.remove();btn.setAttribute("aria-expanded","false");A._menu=null;document.removeEventListener("mousedown",out,true);document.removeEventListener("keydown",key,true);window.removeEventListener("scroll",close,true);window.removeEventListener("resize",close)}
 function out(e){if(!el.contains(e.target)&&!btn.contains(e.target))close()}
 function key(e){var b=[].slice.call(el.querySelectorAll("button")),i=b.indexOf(document.activeElement);
  if(e.key==="Escape"){e.preventDefault();close();btn.focus()}else if(e.key==="ArrowDown"){e.preventDefault();b[(i+1)%b.length].focus()}else if(e.key==="ArrowUp"){e.preventDefault();b[(i<=0?b.length:i)-1].focus()}else if(e.key==="Tab")close()}
 el.onclick=function(e){var b=e.target.closest("button[data-i]");if(!b)return;var d=items[+b.dataset.i];close();if(d&&d.fn)d.fn()};
 document.addEventListener("mousedown",out,true);document.addEventListener("keydown",key,true);window.addEventListener("scroll",close,true);window.addEventListener("resize",close);
 A._menu={btn:btn,close:close};var f=el.querySelector("button");if(f)f.focus()};
A.ready=function(fn){function go(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn()}
 (function w(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go);if(n>200)return go();setTimeout(function(){w(n+1)},25)})(0)};

A.empty=function(icon,h,p,btn){return'<div class="empty">'+A.icon(icon,30)+"<h3>"+A.esc(h)+"</h3>"+(p?"<p>"+A.esc(p)+"</p>":"")+(btn||"")+"</div>"};
A.loading=function(){return'<div class="gload"><i></i><i></i><i></i></div>'};
A.failed=function(e,retryId){return'<div class="empty">'+A.icon(A.IC.refresh,30)+"<h3>"+A.esc(A.err(e))+'</h3><button type="button" class="abtn lg" id="'+retryId+'">'+A.esc(A.t("au.retry","Try again"))+"</button></div>"};
A.paperDoc=function(html,dark){return'<base target="_blank"><style>html{color-scheme:'+(dark?"dark":"light")+'}body{margin:16px;font-family:Arial,Helvetica,sans-serif;'+(dark?"background:#17181b;color:#ececee":"color:#111")+'}a{color:'+(dark?"#8ab4ff":"#0b57d0")+"}</style>"+html};
A.paperBox=function(html,cls,sb){
 var dark=document.documentElement.getAttribute("data-theme")==="dark";
 var w=document.createElement("div");w.className="pvw";
 w.innerHTML='<div class="pvw-bar"><span>'+A.esc(A.t("ap.pv.mode","Preview mode"))+'</span><div class="seg2 sm"><button type="button" data-m="light">'+A.esc(A.t("ap.pv.light","Light"))+'</button><button type="button" data-m="dark">'+A.esc(A.t("ap.pv.dark","Dark"))+"</button></div></div>";
 var f=document.createElement("iframe");f.className=cls||"pv";f.setAttribute("sandbox",sb===undefined?"allow-popups allow-popups-to-escape-sandbox":sb);f.setAttribute("referrerpolicy","no-referrer");f.title=A.t("bc.preview","Preview");
 function set(d){w.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",(b.dataset.m==="dark")===d)});f.srcdoc=A.paperDoc(html,d)}
 w.querySelector(".seg2").onclick=function(ev){var b=ev.target.closest("button");if(b)set(b.dataset.m==="dark")};
 w.appendChild(f);set(dark);return w
};
A.pill=function(kind,text){return'<span class="st '+kind+'"><i></i>'+A.esc(text)+"</span>"};

(function(){
function fit(){document.querySelectorAll(".stabs").forEach(function(n){if(n.dataset.fit)return;n.dataset.fit="1";var on=n.querySelector("a.on");function edge(){var l=n.scrollLeft>4,r=n.scrollLeft+n.clientWidth<n.scrollWidth-4;n.classList.toggle("fl",l);n.classList.toggle("fr",r)}n.addEventListener("scroll",edge,{passive:true});window.addEventListener("resize",edge);if(on&&n.scrollWidth>n.clientWidth)n.scrollLeft=Math.max(0,on.offsetLeft-n.clientWidth/2+on.offsetWidth/2);edge()})}
new MutationObserver(fit).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener("DOMContentLoaded",fit);fit()})();
A.lbar=function(o){var id=o.id||"lq";return'<div class="tbar lbar"><div class="tsearch">'+A.icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',16)+'<input id="'+id+'" type="search" value="'+A.esc(o.q||"")+'" placeholder="'+A.esc(o.placeholder||"")+'" autocomplete="off" aria-label="'+A.esc(o.placeholder||"")+'"></div><div class="tright lfs">'+(o.filters||[]).map(function(f){return'<span data-lf="'+f.id+'"></span>'}).join("")+"</div></div>"};
A.lbarWire=function(root,o,cb){var id=o.id||"lq",i=root.querySelector("#"+id),tm;if(i)i.oninput=function(){clearTimeout(tm);tm=setTimeout(function(){o.q=i.value;cb()},120)};(o.filters||[]).forEach(function(f){var sp=root.querySelector('[data-lf="'+f.id+'"]');if(sp)sp.appendChild(A.dropdown(f.options,f.value,function(v){f.value=v;cb()},""))})};
})();
