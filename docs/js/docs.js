/* docs/js/docs.js — docs sidebar (search box + accordion groups), "On this page" with scroll-spy,
   page actions (copy page / report an issue) and a mobile slide-out drawer for the sidebar.
   Mounts into #dside and #dtoc. All labels come from i18n via GESERD.t. */
(function(){
function t(k,d){return (window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
function svg(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'}
var ICON_SEARCH=svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>');
var ICON_CHEV=svg('<path d="M9 18l6-6-6-6"/>');
var ICON_MENU=svg('<path d="M3 6h18M3 12h18M3 18h18"/>');
var ICON_COPY=svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>');
var ICON_CHECK=svg('<path d="M5 13l4 4L19 7"/>');
var ICON_FLAG=svg('<path d="M4 22V4a1 1 0 0 1 1-1h11l-2 5 2 5H6"/>');

function nav(){
 return [
  [t("doc.nav.start","Get started"),[
    [t("doc.nav.intro","Introduction"),"/docs/"],
    [t("doc.nav.qs","Quickstart"),"/docs/quickstart/"]
  ]],
  [t("doc.nav.ref","API reference"),[
    [t("doc.nav.send","Send email"),"/docs/api/#send"],
    [t("doc.nav.domains","Domains"),"/docs/api/#domains"],
    [t("doc.nav.receiving","Receiving"),"/docs/api/#receiving"]
  ]],
  [t("doc.nav.more","Reference"),[
    [t("doc.nav.errors","Errors"),"/docs/errors/"],
    [t("doc.nav.limits","Rate limits"),"/docs/rate-limits/"]
  ]]
 ];
}

var p=location.pathname;

function renderSidebar(){
 var d=document.getElementById("dside");
 if(!d)return;
 var N=nav();
 var html='<div class="dsearch" id="dSearchBox" role="button" tabindex="0">'+ICON_SEARCH+'<span>'+t("doc.search","Search docs")+'</span><span class="kbd">\u2318K</span></div>';
 html+=N.map(function(g,gi){
   var items=g[1].map(function(a){
     var u=a[1].split("#")[0];
     var on=(p===u);
     return '<a href="'+a[1]+'"'+(on?' class="on"':"")+'>'+a[0]+"</a>";
   }).join("");
   var hasActive=g[1].some(function(a){return p===a[1].split("#")[0]});
   return '<div class="dgroup'+(hasActive?" open":"")+'" data-g="'+gi+'"><div class="dhead">'+g[0]+ICON_CHEV+'</div><div class="dsub">'+items+"</div></div>";
 }).join("");
 d.innerHTML=html;

 d.querySelectorAll(".dgroup").forEach(function(grp){
   var sub=grp.querySelector(".dsub");
   if(grp.classList.contains("open")) sub.style.maxHeight=sub.scrollHeight+"px";
   grp.querySelector(".dhead").addEventListener("click",function(){
     var open=grp.classList.contains("open");
     grp.classList.toggle("open",!open);
     sub.style.maxHeight=open?"0px":sub.scrollHeight+"px";
   });
 });
}

function renderToc(){
 var tc=document.getElementById("dtoc");
 if(!tc)return;
 var h=[].slice.call(document.querySelectorAll(".dbody h2"));
 var lbl=t("doc.nav.onpage","On this page");
 if(!h.length){tc.innerHTML="";return}
 tc.innerHTML="<h5>"+lbl+"</h5>"+h.map(function(e){
   e.id=e.id||e.textContent.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
   return '<a href="#'+e.id+'" data-t="'+e.id+'">'+e.textContent+"</a>";
 }).join("");
 var links=[].slice.call(tc.querySelectorAll("a"));
 links.forEach(function(a){a.addEventListener("click",function(ev){
   ev.preventDefault();
   var target=document.getElementById(a.dataset.t);
   if(target)target.scrollIntoView({behavior:"smooth",block:"start"});
 })});
 function spy(){
   var pos=window.scrollY+90;
   var cur=h[0]&&h[0].id;
   h.forEach(function(e){if(e.offsetTop<=pos)cur=e.id});
   links.forEach(function(a){a.classList.toggle("on",a.dataset.t===cur)});
 }
 window.addEventListener("scroll",spy,{passive:true});
 spy();
}

function renderActions(){
 var h1=document.querySelector(".dbody>h1");
 if(!h1||document.getElementById("dActions"))return;
 var bar=document.createElement("div");
 bar.className="dactions";
 bar.id="dActions";
 bar.innerHTML=
   '<button id="dCopyPage" type="button">'+ICON_COPY+'<span id="dCopyLbl">'+t("doc.copy","Copy page")+'</span></button>'+
   '<a href="/contact/">'+ICON_FLAG+t("doc.report","Report an issue")+"</a>";
 h1.insertAdjacentElement("afterend",bar);
 var btn=document.getElementById("dCopyPage"),lbl=document.getElementById("dCopyLbl");
 btn.addEventListener("click",function(){
   var art=document.querySelector(".dbody");
   var text=art?art.innerText:"";
   (navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){
     btn.classList.add("copied");
     btn.innerHTML=ICON_CHECK+"<span>"+t("doc.copied","Copied")+"</span>";
     setTimeout(function(){btn.classList.remove("copied");btn.innerHTML=ICON_COPY+'<span id="dCopyLbl">'+t("doc.copy","Copy page")+"</span>"},1600);
   }).catch(function(){});
 });
}

function renderTopbar(){
 var top=document.getElementById("docTop");
 var dside=document.getElementById("dside");
 if(!top||!dside)return;
 var onApi=p.indexOf("/docs/api/")===0;
 top.innerHTML=
   '<a class="dlogo" href="/"><img src="/assets/logo.svg" alt="geserd"></a>'+
   '<nav class="dtabs">'+
     '<a href="/docs/"'+(onApi?"":' class="on"')+'>'+t("doc.tab.docs","Documentation")+'</a>'+
     '<a href="/docs/api/"'+(onApi?' class="on"':"")+'>'+t("doc.tab.api","API Reference")+'</a>'+
   '</nav>'+
   '<button class="dhamburger" id="dHamburger" type="button" aria-label="'+t("doc.menu","Docs menu")+'">'+ICON_MENU+'</button>'+
   '<div class="dside-actions">'+
     '<a class="dsignin" href="/login/">'+t("nav.login","Log in")+'</a>'+
     '<a class="dget" href="/signup/">'+t("nav.start","Get started")+'</a>'+
   '</div>';
 var backdrop=document.createElement("div");
 backdrop.className="dbackdrop";
 backdrop.id="dBackdrop";
 document.body.appendChild(backdrop);
 function open(){dside.classList.add("open");backdrop.classList.add("open")}
 function close(){dside.classList.remove("open");backdrop.classList.remove("open")}
 document.getElementById("dHamburger").addEventListener("click",open);
 backdrop.addEventListener("click",close);
 dside.addEventListener("click",function(e){if(e.target.tagName==="A")close()});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
}

function m(){renderSidebar();renderToc();renderActions();renderTopbar()}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m()};
(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go);
})();
