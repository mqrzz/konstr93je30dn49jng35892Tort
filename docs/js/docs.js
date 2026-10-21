(function(){
function t(k,d){return (window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
function esc(s){return String(s).replace(/[&<>]/g,function(c){return c==="&"?"&amp;":c==="<"?"&lt;":"&gt;"})}
function svg(p,cls){return '<svg class="'+(cls||"s")+'" viewBox="0 0 24 24">'+p+'</svg>'}
var I_SEARCH=svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>');
var I_MENU=svg('<path d="M3 6h18M3 12h18M3 18h18"/>');
var I_CHEV=svg('<path d="M9 18l6-6-6-6"/>');
var I_COPY=svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>');
var I_CHECK=svg('<path d="M5 13l4 4L19 7"/>');
var I_ARROW=svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
var I_ARROW_L=svg('<path d="M19 12H5M11 18l-6-6 6-6"/>');
var I_LIST=svg('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>');
var I_MON=svg('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>');
var I_SUN=svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');
var I_MOON=svg('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>');

function PAGES(){return [
 {path:"/docs/",group:t("doc.nav.start","Get started"),title:t("doc.nav.intro","Introduction")},
 {path:"/docs/quickstart/",group:t("doc.nav.start","Get started"),title:t("doc.nav.qs","Quickstart")},
 {path:"/docs/concepts/",group:t("doc.nav.start","Get started"),title:t("doc.nav.m.concepts","Core concepts")},
 {path:"/docs/going-live/",group:t("doc.nav.start","Get started"),title:t("doc.nav.m.going-live","Going live checklist")},
 {path:"/docs/node/",group:t("doc.nav.guides","Guides"),title:t("doc.nav.m.node","Send with Node.js")},
 {path:"/docs/python/",group:t("doc.nav.guides","Guides"),title:t("doc.nav.m.python","Send with Python")},
 {path:"/docs/php/",group:t("doc.nav.guides","Guides"),title:t("doc.nav.m.php","Send with PHP")},
 {path:"/docs/receive-reply/",group:t("doc.nav.guides","Guides"),title:t("doc.nav.m.receive-reply","Receive and reply")},
 {path:"/docs/beginners/",group:t("doc.nav.begin","I'm not a developer"),title:t("doc.nav.b.beginners","Start here")},
 {path:"/docs/beginners/what-is-smtp/",group:t("doc.nav.begin","I'm not a developer"),title:t("doc.nav.b.what-is-smtp","What is SMTP")},
 {path:"/docs/beginners/dns-records/",group:t("doc.nav.begin","I'm not a developer"),title:t("doc.nav.b.dns-records","DNS records")},
 {path:"/docs/beginners/add-dns/",group:t("doc.nav.begin","I'm not a developer"),title:t("doc.nav.b.add-dns","Adding DNS records step by step")},
 {path:"/docs/beginners/dkim-spf-dmarc/",group:t("doc.nav.begin","I'm not a developer"),title:t("doc.nav.b.dkim-spf-dmarc","DKIM, SPF and DMARC")},
 {path:"/docs/beginners/first-email/",group:t("doc.nav.begin","I'm not a developer"),title:t("doc.nav.b.first-email","Your first email")},
 {path:"/docs/beginners/troubleshooting/",group:t("doc.nav.begin","I'm not a developer"),title:t("doc.nav.b.troubleshooting","If an email does not arrive")},
 {path:"/docs/api/",group:t("doc.nav.ref","API reference"),title:t("doc.nav.api.over","Overview")},
 {path:"/docs/emails/",group:t("doc.nav.ref","API reference"),title:t("doc.nav.m.emails","Emails")},
 {path:"/docs/domains/",group:t("doc.nav.ref","API reference"),title:t("doc.nav.m.domains","Domains")},
 {path:"/docs/api-keys/",group:t("doc.nav.ref","API reference"),title:t("doc.nav.m.api-keys","API keys")},
 {path:"/docs/webhooks/",group:t("doc.nav.ref","API reference"),title:t("doc.nav.m.webhooks","Webhooks")},
 {path:"/docs/templates/",group:t("doc.nav.ref","API reference"),title:t("doc.nav.m.templates","Templates")},
 {path:"/docs/errors/",group:t("doc.nav.more","Reference"),title:t("doc.nav.errors","Errors")},
 {path:"/docs/rate-limits/",group:t("doc.nav.more","Reference"),title:t("doc.nav.limits","Rate limits")},
 {path:"/docs/idempotency/",group:t("doc.nav.more","Reference"),title:t("doc.nav.m.idempotency","Idempotency")},
 {path:"/docs/security/",group:t("doc.nav.more","Reference"),title:t("doc.nav.m.security","Security")},
 {path:"/docs/glossary/",group:t("doc.nav.more","Reference"),title:t("doc.nav.m.glossary","Glossary")}
]}
function navGroups(){
 return [
  [t("doc.nav.start","Get started"),[["/docs/",t("doc.nav.intro","Introduction")],["/docs/quickstart/",t("doc.nav.qs","Quickstart")],["/docs/concepts/",t("doc.nav.m.concepts","Core concepts")],["/docs/going-live/",t("doc.nav.m.going-live","Going live checklist")]]],
  [t("doc.nav.guides","Guides"),[["/docs/node/",t("doc.nav.m.node","Send with Node.js")],["/docs/python/",t("doc.nav.m.python","Send with Python")],["/docs/php/",t("doc.nav.m.php","Send with PHP")],["/docs/receive-reply/",t("doc.nav.m.receive-reply","Receive and reply")]]],
  [t("doc.nav.begin","I'm not a developer"),[["/docs/beginners/",t("doc.nav.b.beginners","Start here")],["/docs/beginners/what-is-smtp/",t("doc.nav.b.what-is-smtp","What is SMTP")],["/docs/beginners/dns-records/",t("doc.nav.b.dns-records","DNS records")],["/docs/beginners/add-dns/",t("doc.nav.b.add-dns","Adding DNS records step by step")],["/docs/beginners/dkim-spf-dmarc/",t("doc.nav.b.dkim-spf-dmarc","DKIM, SPF and DMARC")],["/docs/beginners/first-email/",t("doc.nav.b.first-email","Your first email")],["/docs/beginners/troubleshooting/",t("doc.nav.b.troubleshooting","If an email does not arrive")]]],
  [t("doc.nav.ref","API reference"),[["/docs/api/",t("doc.nav.api.over","Overview")],["/docs/emails/",t("doc.nav.m.emails","Emails")],["/docs/domains/",t("doc.nav.m.domains","Domains")],["/docs/api-keys/",t("doc.nav.m.api-keys","API keys")],["/docs/webhooks/",t("doc.nav.m.webhooks","Webhooks")],["/docs/templates/",t("doc.nav.m.templates","Templates")]]],
  [t("doc.nav.more","Reference"),[["/docs/errors/",t("doc.nav.errors","Errors")],["/docs/rate-limits/",t("doc.nav.limits","Rate limits")],["/docs/idempotency/",t("doc.nav.m.idempotency","Idempotency")],["/docs/security/",t("doc.nav.m.security","Security")],["/docs/glossary/",t("doc.nav.m.glossary","Glossary")]]]
 ]
}
function here(){return location.pathname.replace(/index\.html$/,"").replace(/([^/])$/,"$1/")}

function buildHeader(){
 var onApi=here()==="/docs/api/";
 return ''+
 '<div class="logo"><a href="/"><img src="/assets/logo.svg" alt="Geserd" style="height:22px"></a></div>'+
 '<div class="tabs">'+
  '<a href="/docs/" class="'+(onApi?"":"on")+'">'+svg('<path d="M4 4h16v16H4z" fill="none"/><path d="M8 8h8M8 12h8M8 16h5"/>')+t("doc.tab.docs","Documentation")+'</a>'+
  '<a href="/docs/api/" class="'+(onApi?"on":"")+'">'+svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9l2 2-2 2M12 13h5"/>')+t("doc.tab.api","API Reference")+'</a>'+
 '</div>'+
 '<div class="end">'+
  '<span class="hlg">'+(window.GESERD&&GESERD.langMenu?GESERD.langMenu():'')+'</span>'+
  '<a class="hb o si" href="/login/">'+t("nav.login","Log in")+'</a>'+
  '<a class="hb k" href="/signup/">'+t("nav.start","Get started")+'</a>'+
  '<button type="button" class="hb o m" id="dMenuBtn" aria-label="'+t("doc.menu","Docs menu")+'">'+I_MENU+'</button>'+
 '</div>';
}

function sideNav(){
 var h=here(),out="";
 navGroups().forEach(function(g){
  var has=g[1].some(function(it){return h===it[0]}),multi=g[1].length>1;
  out+='<div class="grp'+(multi?' fold':'')+((has||!multi)?' open':'')+'"><h5>'+(multi?'<button type="button" class="gh" aria-expanded="'+((has||!multi)?'true':'false')+'">'+g[0]+I_CHEV+'</button>':g[0])+'</h5><div class="gl">';
  g[1].forEach(function(it){out+='<a href="'+it[0]+'"'+(h===it[0]?' class="on"':'')+'>'+it[1]+'</a>'});
  out+='</div></div>';
 });
 return out;
}
function buildSidebar(){
 return ''+
 '<div class="dtop"><a href="/"><img src="/assets/logo.svg" alt="Geserd"></a><button type="button" class="dclose" aria-label="'+t("doc.close","Close")+'">'+svg('<path d="M6 6l12 12M18 6 6 18"/>')+'</button></div>'+
 '<div class="sb"><button type="button" class="sbtn" id="dSearchBtn2"><span class="l">'+I_SEARCH+t("doc.search","Search...")+'</span><kbd>Ctrl K</kbd></button></div>'+
 '<div class="mt">'+
  '<a href="/docs/" class="'+(here()==="/docs/api/"?"":"on")+'">'+svg('<path d="M4 4h16v16H4z" fill="none"/><path d="M8 8h8M8 12h8M8 16h5"/>')+t("doc.tab.docs","Documentation")+'</a>'+
  '<a href="/docs/api/" class="'+(here()==="/docs/api/"?"on":"")+'">'+svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9l2 2-2 2M12 13h5"/>')+t("doc.tab.api","API Reference")+'</a>'+
 '</div>'+
 '<nav class="nav">'+sideNav()+'</nav>'+
 '<div class="foot"><div class="tl">'+t("doc.theme","Theme")+'</div><div class="tg" id="dTheme">'+
   '<button type="button" data-m="system">'+t("app.theme.system","System")+'</button>'+
   '<button type="button" data-m="light">'+t("app.theme.light","Light")+'</button>'+
   '<button type="button" data-m="dark">'+t("app.theme.dark","Dark")+'</button>'+
 '</div>'+(window.GESERD&&GESERD.langMenu?'<div class="tl mlg">'+t("doc.language","Language")+'</div><div class="slg mlg">'+GESERD.langMenu()+'</div>':'')+'</div>'+
 '<div class="mb"><a class="hb o" href="/login/" style="flex:1;justify-content:center">'+t("nav.login","Log in")+'</a><a class="hb k" href="/signup/" style="flex:1;justify-content:center">'+t("nav.start","Get started")+'</a></div>';
}

function buildToc(){
 var body=document.querySelector(".pg .body");if(!body)return "";
 var hs=body.querySelectorAll("h2,h3");if(!hs.length)return "";
 var out='<h6>'+I_LIST+t("doc.onpage","On this page")+'</h6>';
 hs.forEach(function(h,i){
  if(!h.id)h.id="s"+i;
  out+='<a href="#'+h.id+'" class="'+(h.tagName==="H3"?"h3":"")+'" data-id="'+h.id+'">'+h.textContent+'</a>';
 });
 return out;
}
function scrollspy(toc){
 var links=toc.querySelectorAll("a");if(!links.length)return;
 var hs=[].map.call(links,function(a){return document.getElementById(a.dataset.id)}).filter(Boolean);
 var card=document.getElementById("dc"),forced=null,until=0;
 function top(h){return h.getBoundingClientRect().top-card.getBoundingClientRect().top+card.scrollTop}
 function mark(id){links.forEach(function(a){a.classList.toggle("on",a.dataset.id===id)})}
 function onScroll(){
  if(forced&&Date.now()<until){mark(forced);return}
  forced=null;
  var y=card.scrollTop+90,cur=hs[0];
  hs.forEach(function(h){if(top(h)<=y)cur=h});
  if(card.scrollTop+card.clientHeight>=card.scrollHeight-6)cur=hs[hs.length-1];
  mark(cur.id);
 }
 card.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);onScroll();
 links.forEach(function(a){a.addEventListener("click",function(e){
  e.preventDefault();var h=document.getElementById(a.dataset.id);
  forced=a.dataset.id;until=Date.now()+900;mark(forced);
  card.scrollTo({top:Math.max(0,top(h)-24),behavior:"smooth"});history.replaceState(null,"",location.pathname+"#"+a.dataset.id);
 })});
}

function pageMarkdown(){
 var h1=document.querySelector(".pg h1"),body=document.querySelector(".pg .body");
 var out="# "+(h1?h1.textContent:"")+"\n\n";
 if(!body)return out;
 body.querySelectorAll("h2,h3,p,li,pre").forEach(function(el){
  if(el.tagName==="H2")out+="\n## "+el.textContent.trim()+"\n\n";
  else if(el.tagName==="H3")out+="\n### "+el.textContent.trim()+"\n\n";
  else if(el.tagName==="PRE")out+="```\n"+el.textContent.trim()+"\n```\n\n";
  else if(el.tagName==="LI")out+="- "+el.textContent.trim()+"\n";
  else if(el.tagName==="P")out+=el.textContent.trim()+"\n\n";
 });
 return out;
}
function copyText(s){
 if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(s);
 var ta=document.createElement("textarea");ta.value=s;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();
 try{document.execCommand("copy")}catch(e){}document.body.removeChild(ta);return Promise.resolve();
}

var AI_LOGOS={claude:'<path d="M12 12L12.00 3.40" stroke-width="2.5"/><path d="M12 12L15.20 6.46" stroke-width="2.5"/><path d="M12 12L19.10 7.90" stroke-width="2.5"/><path d="M12 12L19.00 12.00" stroke-width="2.5"/><path d="M12 12L19.62 16.40" stroke-width="2.5"/><path d="M12 12L15.10 17.37" stroke-width="2.5"/><path d="M12 12L12.00 20.00" stroke-width="2.5"/><path d="M12 12L8.40 18.24" stroke-width="2.5"/><path d="M12 12L4.55 16.30" stroke-width="2.5"/><path d="M12 12L5.40 12.00" stroke-width="2.5"/><path d="M12 12L4.90 7.90" stroke-width="2.5"/><path d="M12 12L8.50 5.94" stroke-width="2.5"/>',chatgpt:'<ellipse cx="12.00" cy="7.40" rx="5.4" ry="2.7" transform="rotate(0 12.00 7.40)"/><ellipse cx="15.98" cy="9.70" rx="5.4" ry="2.7" transform="rotate(60 15.98 9.70)"/><ellipse cx="15.98" cy="14.30" rx="5.4" ry="2.7" transform="rotate(120 15.98 14.30)"/><ellipse cx="12.00" cy="16.60" rx="5.4" ry="2.7" transform="rotate(180 12.00 16.60)"/><ellipse cx="8.02" cy="14.30" rx="5.4" ry="2.7" transform="rotate(240 8.02 14.30)"/><ellipse cx="8.02" cy="9.70" rx="5.4" ry="2.7" transform="rotate(300 8.02 9.70)"/>',cursor:'<path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4z"/><path d="M4 7.4l8 4.6 8-4.6M12 12v9.2"/><path d="M12 12 20 7.4v9.2l-8 4.6z" fill="currentColor" fill-opacity=".3" stroke="none"/>',perplexity:'<path d="M12 2.5v19M5.5 8.2 12 13l6.5-4.8M5.5 8.2v8.6L12 13l6.5 3.8V8.2M5.5 8.2 12 2.5l6.5 5.7"/>'};
function aiPrompt(){
 var h1=document.querySelector(".pg h1"),ttl=h1?h1.textContent.trim():document.title;
 return t("doc.ai.prompt","I am reading the Geserd documentation page “{t}” at {u}. Read it and help me understand it: answer my questions, give examples and point out the steps I need.").replace("{t}",ttl).replace("{u}",location.href.split("#")[0]);
}
function aiTargets(){
 var q=encodeURIComponent(aiPrompt());
 return [["claude","Claude","https://claude.ai/new?q="+q],["chatgpt","ChatGPT","https://chatgpt.com/?q="+q],["cursor","Cursor","https://cursor.com/link/prompt?text="+q],["perplexity","Perplexity","https://www.perplexity.ai/search?q="+q]];
}
function aiMenu(el){
 var pm=el.querySelector(".pm");if(!pm||pm.querySelector(".ai-i"))return;
 var hr=document.createElement("div");hr.className="ai-sep";pm.appendChild(hr);
 aiTargets().forEach(function(a){
  var b=document.createElement("a");b.className="ai-i";b.target="_blank";b.rel="noopener";b.dataset.k=a[0];
  b.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+AI_LOGOS[a[0]]+'</svg><span>'+t("doc.ai.open","Open in {x}").replace("{x}",a[1])+'</span>';
  b.addEventListener("click",function(){b.href=aiTargets().filter(function(x){return x[0]===a[0]})[0][2]});
  b.href=a[2];pm.appendChild(b);
 });
 var top=document.createElement("div");top.className="ai-top";
 top.innerHTML=aiTargets().map(function(a){return '<a class="ai-b" target="_blank" rel="noopener" data-k="'+a[0]+'" href="'+a[2]+'" title="'+t("doc.ai.open","Open in {x}").replace("{x}",a[1])+'"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+AI_LOGOS[a[0]]+'</svg></a>'}).join("");
 el.insertBefore(top,el.firstChild);
}

function pageActions(){
 var el=document.querySelector(".pa");if(!el)return;aiMenu(el);
 var main=el.querySelector(".c"),chev=el.querySelector(".d");
 function flash(){main.innerHTML=I_CHECK;setTimeout(function(){main.innerHTML=I_COPY},1400)}
 main.addEventListener("click",function(){copyText(pageMarkdown()).then(flash)});
 chev.addEventListener("click",function(e){e.stopPropagation();el.classList.toggle("open")});
 el.querySelector('[data-a="copy"]').addEventListener("click",function(){copyText(pageMarkdown()).then(flash);el.classList.remove("open")});
 el.querySelector('[data-a="md"]').addEventListener("click",function(){
  var blob=new Blob([pageMarkdown()],{type:"text/markdown"});var url=URL.createObjectURL(blob);window.open(url,"_blank");setTimeout(function(){URL.revokeObjectURL(url)},30000);el.classList.remove("open");
 });
 document.addEventListener("click",function(e){if(!el.contains(e.target))el.classList.remove("open")});
}

function buildPager(){
 var pages=PAGES(),i=-1;
 pages.forEach(function(p,idx){if(p.path===here())i=idx});
 if(i<0)return "";
 var prev=pages[i-1],next=pages[i+1],out="";
 if(prev)out+='<a href="'+prev.path+'"><small>'+I_ARROW_L+" "+t("doc.prev","Previous")+'</small>'+prev.title+'</a>';else out+="<span></span>";
 if(next)out+='<a href="'+next.path+'" class="r"><small>'+t("doc.next","Next")+" "+I_ARROW+'</small>'+next.title+'</a>';
 return out;
}

function helpful(){
 var el=document.querySelector(".hp");if(!el)return;
 var yes=el.querySelector('[data-v="y"]'),no=el.querySelector('[data-v="n"]'),lbl=el.querySelector(".hlbl");
 function pick(b){[yes,no].forEach(function(x){x.disabled=true});b.classList.add("on");lbl.textContent=t("doc.thanks","Thanks for the feedback.")}
 yes.addEventListener("click",function(){pick(yes)});no.addEventListener("click",function(){pick(no)});
}

function themeCtl(root){
 var seg=root.querySelector("#dTheme");if(!seg)return;
 function mark(){var m=(window.GSDocTheme?GSDocTheme.get():"system");seg.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b.dataset.m===m)})}
 seg.addEventListener("click",function(e){var b=e.target.closest("button");if(!b||!window.GSDocTheme)return;GSDocTheme.set(b.dataset.m);mark()});
 mark();
}

var INDEX=null,indexing=null;
function buildIndex(){
 if(INDEX)return Promise.resolve(INDEX);
 if(indexing)return indexing;
 var pages=PAGES();
 indexing=Promise.all(pages.map(function(p){
  if(p.path===here())return Promise.resolve(extractFrom(document,p));
  return fetch(p.path).then(function(r){return r.text()}).then(function(html){
   var doc=new DOMParser().parseFromString(html,"text/html");
   return extractFrom(doc,p);
  }).catch(function(){return []});
 })).then(function(lists){INDEX=[].concat.apply([],lists);indexing=null;return INDEX});
 return indexing;
}
function extractFrom(doc,p){
 var out=[],body=doc.querySelector(".pg .body");if(!body)return out;
 var cur={h:p.title,txt:""};
 var nodes=body.querySelectorAll("h2,h3,p,li");
 function push(){if(cur.txt.trim())out.push({path:p.path,page:p.title,heading:cur.h,text:cur.txt.trim().slice(0,220)})}
 nodes.forEach(function(n){
  if(n.tagName==="H2"||n.tagName==="H3"){push();cur={h:n.textContent.trim(),txt:""}}
  else cur.txt+=" "+n.textContent;
 });
 push();
 if(!out.length)out.push({path:p.path,page:p.title,heading:p.title,text:""});
 return out;
}
function highlight(s,q){
 if(!q)return esc(s);
 var i=s.toLowerCase().indexOf(q.toLowerCase());if(i<0)return esc(s);
 return esc(s.slice(0,i))+"<em>"+esc(s.slice(i,i+q.length))+"</em>"+esc(s.slice(i+q.length));
}
function openSearch(){
 var m=document.getElementById("sm");m.classList.add("open");
 var input=m.querySelector("input");input.value="";input.focus();
 renderResults("",m);
 buildIndex().then(function(){if(input.value==="")renderResults("",m)});
}
function closeSearch(){document.getElementById("sm").classList.remove("open")}
function renderResults(q,m){
 var rs=m.querySelector(".rs");
 var list=(INDEX||[]).filter(function(it){
  if(!q)return true;
  var s=(it.heading+" "+it.text).toLowerCase();return s.indexOf(q.toLowerCase())>-1;
 }).slice(0,20);
 if(!list.length){rs.innerHTML='<div class="no">'+t("doc.snoresults","No results")+'</div>';return}
 rs.innerHTML=list.map(function(it,i){
  return '<a href="'+it.path+(it.heading&&it.heading!==it.page?"#":"")+'" data-i="'+i+'" class="'+(i===0?"on":"")+'">'+
   '<b>'+highlight(it.heading,q)+'</b><span>'+it.page+(it.text?" — "+highlight(it.text,q):"")+'</span></a>';
 }).join("");
}
function mountSearch(){
 var m=document.getElementById("sm");
 m.addEventListener("click",function(e){if(e.target===m)closeSearch()});
 m.querySelector(".x").addEventListener("click",closeSearch);
 var input=m.querySelector("input");
 input.addEventListener("input",function(){renderResults(input.value,m)});
 input.addEventListener("keydown",function(e){
  var items=[].slice.call(m.querySelectorAll(".rs a")),cur=m.querySelector(".rs a.on"),i=items.indexOf(cur);
  if(e.key==="ArrowDown"){e.preventDefault();if(cur)cur.classList.remove("on");items[(i+1)%items.length]&&items[(i+1)%items.length].classList.add("on")}
  else if(e.key==="ArrowUp"){e.preventDefault();if(cur)cur.classList.remove("on");items[(i-1+items.length)%items.length]&&items[(i-1+items.length)%items.length].classList.add("on")}
  else if(e.key==="Enter"){e.preventDefault();var on=m.querySelector(".rs a.on");if(on)location.href=on.getAttribute("href")}
  else if(e.key==="Escape")closeSearch();
 });
 document.addEventListener("keydown",function(e){
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openSearch()}
  else if(e.key==="Escape")closeSearch();
 });
  document.getElementById("dSearchBtn2").addEventListener("click",openSearch);
}

function mountMobile(){
 var ds=document.getElementById("ds"),bd=document.getElementById("bd"),btn=document.getElementById("dMenuBtn");
 function open(v){ds.classList.toggle("open",v);bd.classList.toggle("open",v)}
 btn.addEventListener("click",function(){open(!ds.classList.contains("open"))});
 bd.addEventListener("click",function(){open(false)});
 ds.addEventListener("click",function(e){if(e.target.closest(".nav a, .mt a"))open(false)});
 var dm=document.getElementById("dm"),crumb=document.querySelector(".crumb"),h1=document.querySelector(".pg h1");
 if(dm)dm.innerHTML='<span>'+(crumb?crumb.textContent:"")+'</span><span class="sep">'+I_CHEV+'</span><b>'+(h1?h1.textContent:"")+'</b>';
 
}

function codeCopy(){
 document.querySelectorAll(".cb .cp").forEach(function(b){
  var lbl=b.textContent;
  b.innerHTML=I_COPY+'<span>'+lbl+'</span>';
  b.addEventListener("click",function(){
   var pre=b.closest(".cb").querySelector("pre");if(!pre)return;
   copyText(pre.innerText.replace(/\s+$/,"")).then(function(){
    b.classList.add("ok");b.innerHTML=I_CHECK+'<span>'+t("doc.copied","Copied")+'</span>';
    setTimeout(function(){b.classList.remove("ok");b.innerHTML=I_COPY+'<span>'+lbl+'</span>'},1600);
   });
  });
 });
}

function mount(){
 var dh=document.getElementById("dh"),ds=document.getElementById("ds"),toc=document.getElementById("toc");
 if(!dh||!ds)return;
 dh.innerHTML=buildHeader();
 ds.innerHTML=buildSidebar();
 var dcl=ds.querySelector(".dclose");if(dcl)dcl.addEventListener("click",function(){var bd=document.getElementById("bd");if(bd)bd.click()});
 ds.querySelectorAll(".gh").forEach(function(b){b.addEventListener("click",function(){var g=b.closest(".grp"),o=!g.classList.contains("open");g.classList.toggle("open",o);b.setAttribute("aria-expanded",o)})});
 if(toc){toc.innerHTML=buildToc();if(toc.innerHTML)scrollspy(toc)}
 var pager=document.querySelector(".pn2");if(pager)pager.innerHTML=buildPager();
 pageActions();
 helpful();
 themeCtl(ds);
 mountMobile();
 mountSearch();
 codeCopy();
 if(window.GESERD&&GESERD.bindLang)GESERD.bindLang(document);
}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount()};
function wait(n){if(window.GESERD&&GESERD.ready&&GESERD.langMenu)return GESERD.ready.then(go);if(n>200)return go();setTimeout(function(){wait(n+1)},25)}
wait(0);
})();
