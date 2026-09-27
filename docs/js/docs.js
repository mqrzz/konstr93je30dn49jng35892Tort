/* docs/js/docs.js — docs sidebar, "On this page" TOC with scroll-spy, page actions (copy page),
   a real cross-page search (Ctrl/Cmd+K), breadcrumb, prev/next footer nav, a "was this helpful"
   widget, and a mobile slide-out drawer for the sidebar. Mounts into #dside and #dtoc.
   All labels come from i18n via GESERD.t. */
(function(){
function t(k,d){return (window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
function svg(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'}
var ICON_SEARCH=svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>');
var ICON_CHEV=svg('<path d="M9 18l6-6-6-6"/>');
var ICON_MENU=svg('<path d="M3 6h18M3 12h18M3 18h18"/>');
var ICON_COPY=svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>');
var ICON_CHECK=svg('<path d="M5 13l4 4L19 7"/>');
var ICON_X=svg('<path d="M18 6 6 18M6 6l12 12"/>');
var ICON_FLAG=svg('<path d="M4 22V4a1 1 0 0 1 1-1h11l-2 5 2 5H6"/>');
var ICON_ARROW=svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
var ICON_ARROW_L=svg('<path d="M19 12H5M11 18l-6-6 6-6"/>');
var ICON_UP=svg('<path d="M7 14l5-5 5 5"/>');
var ICON_DOWN=svg('<path d="M7 10l5 5 5-5"/>');

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
/* flat page order, used for prev/next + as the search crawl list */
function flatPages(){
 var out=[];
 nav().forEach(function(g){g[1].forEach(function(a){var u=a[1].split("#")[0];if(!out.some(function(x){return x.url===u}))out.push({url:u,title:a[0],group:g[0]})})});
 return out;
}

var p=location.pathname;

function renderSidebar(){
 var d=document.getElementById("dside");
 if(!d)return;
 var N=nav();
 var html=N.map(function(g,gi){
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

function renderBreadcrumb(){
 var h1=document.querySelector(".dbody>h1");
 if(!h1||document.getElementById("dCrumb"))return;
 var grp=null;
 nav().forEach(function(g){g[1].forEach(function(a){if(a[1].split("#")[0]===p)grp=g[0]})});
 if(!grp)return;
 var el=document.createElement("div");
 el.id="dCrumb";el.className="dcrumb";el.textContent=grp;
 h1.parentNode.insertBefore(el,h1);
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
   history.replaceState(null,"","#"+a.dataset.t);
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

function copyText(text){
 if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(text);
 return new Promise(function(res,rej){
   try{
     var ta=document.createElement("textarea");
     ta.value=text;ta.style.position="fixed";ta.style.opacity="0";
     document.body.appendChild(ta);ta.focus();ta.select();
     var ok=document.execCommand("copy");
     document.body.removeChild(ta);
     ok?res():rej(new Error("execCommand failed"))
   }catch(e){rej(e)}
 });
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
 var btn=document.getElementById("dCopyPage");
 btn.addEventListener("click",function(){
   var art=document.querySelector(".dbody");
   var text=art?art.innerText:"";
   copyText(text).then(function(){
     btn.classList.add("copied");btn.classList.remove("err");
     btn.innerHTML=ICON_CHECK+"<span>"+t("doc.copied","Copied")+"</span>";
   }).catch(function(){
     btn.classList.add("err");btn.classList.remove("copied");
     btn.innerHTML=ICON_X+"<span>"+t("doc.copyfail","Couldn't copy")+"</span>";
   }).then(function(){
     setTimeout(function(){btn.classList.remove("copied","err");btn.innerHTML=ICON_COPY+'<span id="dCopyLbl">'+t("doc.copy","Copy page")+"</span>"},1800);
   });
 });
}

function renderFeedback(body){
 var el=document.createElement("div");
 el.className="dfeedback";
 el.innerHTML='<span>'+t("doc.helpful","Was this page helpful?")+'</span><div class="dfbtns"><button data-v="y">'+t("doc.yes","Yes")+'</button><button data-v="n">'+t("doc.no","No")+"</button></div>";
 body.appendChild(el);
 el.querySelectorAll("button").forEach(function(b){
   b.addEventListener("click",function(){
     el.innerHTML='<span>'+t("doc.thanks","Thanks for the feedback.")+"</span>";
   });
 });
}

function renderPager(){
 var body=document.querySelector(".dbody");
 if(!body||document.getElementById("dPager"))return;
 renderFeedback(body);
 var pages=flatPages();
 var i=pages.findIndex(function(x){return x.url===p});
 if(i<0)return;
 var prev=pages[i-1],next=pages[i+1];
 var el=document.createElement("div");
 el.id="dPager";el.className="dpager";
 el.innerHTML=
   (prev?'<a class="dp-prev" href="'+prev.url+'">'+ICON_ARROW_L+'<span><small>'+t("doc.prev","Previous")+'</small>'+prev.title+"</span></a>":"<span></span>")+
   (next?'<a class="dp-next" href="'+next.url+'"><span><small>'+t("doc.next","Next")+'</small>'+next.title+"</span>"+ICON_ARROW+"</a>":"");
 body.appendChild(el);
}

function renderTopbar(){
 var top=document.getElementById("docTop");
 var dside=document.getElementById("dside");
 if(!top||!dside)return;
 var onApi=p.indexOf("/docs/api/")===0;
 top.innerHTML=
   '<a class="dlogo" href="/"><img src="/assets/logo.svg" alt="Geserd"></a>'+
   '<nav class="dtabs">'+
     '<a href="/docs/"'+(onApi?"":' class="on"')+'>'+t("doc.tab.docs","Documentation")+'</a>'+
     '<a href="/docs/api/"'+(onApi?' class="on"':"")+'>'+t("doc.tab.api","API Reference")+'</a>'+
   '</nav>'+
   '<div class="dsearch dsearch-top" id="dSearchBoxTop" role="button" tabindex="0">'+ICON_SEARCH+'<span>'+t("doc.search","Search docs")+'</span><span class="kbd">'+(navigator.platform.indexOf("Mac")>-1?"\u2318K":"Ctrl K")+'</span></div>'+
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
 document.getElementById("dSearchBoxTop").addEventListener("click",openSearch);
}

/* ---- real cross-page search: crawls the static doc pages once, then filters client-side ---- */
var searchIndex=null,searchPromise=null;
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function buildIndex(){
 if(searchPromise)return searchPromise;
 var pages=flatPages();
 searchPromise=Promise.all(pages.map(function(pg){
   var work=(pg.url===p)?Promise.resolve(document):fetch(pg.url).then(function(r){return r.text()}).then(function(html){return new DOMParser().parseFromString(html,"text/html")});
   return work.then(function(doc){
     var entries=[];
     var article=doc.querySelector(".dbody");
     if(!article)return entries;
     var lead=article.querySelector("h1+p");
     entries.push({url:pg.url,title:pg.title,heading:null,snippet:lead?lead.textContent:""});
     article.querySelectorAll("h2").forEach(function(h2){
       var id=h2.id||slug(h2.textContent);
       var txt="";
       var n=h2.nextElementSibling;
       var steps=0;
       while(n&&n.tagName!=="H2"&&steps<4){if(n.textContent)txt+=" "+n.textContent;n=n.nextElementSibling;steps++}
       entries.push({url:pg.url+"#"+id,title:pg.title,heading:h2.textContent,snippet:txt.trim().slice(0,140)});
     });
     return entries;
   }).catch(function(){return []});
 })).then(function(lists){return searchIndex=lists.reduce(function(a,b){return a.concat(b)},[])});
 return searchPromise;
}
function runSearch(q){
 q=q.trim().toLowerCase();
 if(!q)return[];
 return (searchIndex||[]).map(function(e){
   var hay=((e.heading||e.title)+" "+e.snippet).toLowerCase();
   var score=-1;
   if(e.title.toLowerCase().indexOf(q)>-1)score=3;
   else if(e.heading&&e.heading.toLowerCase().indexOf(q)>-1)score=2;
   else if(hay.indexOf(q)>-1)score=1;
   return{e:e,score:score}
 }).filter(function(x){return x.score>-1}).sort(function(a,b){return b.score-a.score}).slice(0,8).map(function(x){return x.e});
}
var modal=null,input=null,list=null,active=-1;
function openSearch(){
 if(!modal){
   modal=document.createElement("div");modal.className="dsmodal";modal.id="dSModal";
   modal.innerHTML='<div class="dsmodal-box" role="dialog" aria-modal="true">'+
     '<div class="dsmodal-input">'+ICON_SEARCH+'<input id="dSInput" type="text" placeholder="'+t("doc.search","Search docs")+'" autocomplete="off"><button id="dSClose" type="button" aria-label="Close">'+ICON_X+'</button></div>'+
     '<div class="dsmodal-list" id="dSList"></div>'+
     '<div class="dsmodal-foot"><span>'+ICON_UP+ICON_DOWN+t("doc.snavigate","to navigate")+'</span><span>\u21b5 '+t("doc.sselect","to select")+'</span><span>esc '+t("doc.sclose","to close")+'</span></div>'+
   '</div>';
   document.body.appendChild(modal);
   input=document.getElementById("dSInput");list=document.getElementById("dSList");
   modal.addEventListener("click",function(e){if(e.target===modal)closeSearch()});
   document.getElementById("dSClose").addEventListener("click",closeSearch);
   input.addEventListener("input",function(){renderResults(runSearch(input.value))});
   input.addEventListener("keydown",function(e){
     var items=[].slice.call(list.querySelectorAll("a"));
     if(e.key==="ArrowDown"){e.preventDefault();active=Math.min(active+1,items.length-1);highlight(items)}
     else if(e.key==="ArrowUp"){e.preventDefault();active=Math.max(active-1,0);highlight(items)}
     else if(e.key==="Enter"){if(items[active])items[active].click();else if(items[0])items[0].click()}
   });
 }
 modal.classList.add("open");
 input.value="";list.innerHTML="";active=-1;
 buildIndex().then(function(){input.focus();renderResults(runSearch(""))});
}
function closeSearch(){if(modal)modal.classList.remove("open")}
function highlight(items){items.forEach(function(a,i){a.classList.toggle("on",i===active)});if(items[active])items[active].scrollIntoView({block:"nearest"})}
function renderResults(items){
 if(!items.length){list.innerHTML='<div class="dsmodal-empty">'+t("doc.snoresults","No results")+"</div>";return}
 active=0;
 list.innerHTML=items.map(function(e,i){
   return '<a href="'+e.url+'" class="'+(i===0?"on":"")+'"><div class="dsr-t">'+(e.heading||e.title)+'</div>'+(e.snippet?'<div class="dsr-s">'+e.snippet+"</div>":"")+'<div class="dsr-p">'+e.title+"</div></a>";
 }).join("");
}
document.addEventListener("keydown",function(e){
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();modal&&modal.classList.contains("open")?closeSearch():openSearch()}
});

function m(){renderSidebar();renderBreadcrumb();renderToc();renderActions();renderPager();renderTopbar()}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m()};
(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go);
})();
