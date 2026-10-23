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
  '<button type="button" class="hb o ask" id="dAsk" aria-label="'+t("doc.ai.btn","Ask AI")+'">'+svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>')+'<span>'+t("doc.ai.btn","Ask AI")+'</span></button>'+
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

var AI_LOGOS={"claude": "<path d=\"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z\"/>", "chatgpt": "<path d=\"M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z\">", "cursor": "<path d=\"M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23\"/>", "perplexity": "<path d=\"M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z\"/>"};
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
 var hr=document.createElement("div");hr.className="ai-sep";pm.appendChild(hr);var hh=document.createElement("div");hh.className="ai-h";hh.textContent=t("doc.ai.pagehead","Ask AI about this page");pm.appendChild(hh);
 aiTargets().forEach(function(a){
  var b=document.createElement("a");b.className="ai-i";b.target="_blank";b.rel="noopener";b.dataset.k=a[0];
  b.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">'+AI_LOGOS[a[0]]+'</svg><span>'+t("doc.ai.open","Open in {x}").replace("{x}",a[1])+'</span>';
  b.addEventListener("click",function(){b.href=aiTargets().filter(function(x){return x[0]===a[0]})[0][2]});
  b.href=a[2];pm.appendChild(b);
 });

}


function aiGeneral(){return t("doc.ai.gen","I have a question about the Geserd documentation at https://geserd.com/docs/. Read it and answer my questions about Geserd: sending and receiving email, domains, API keys, webhooks and billing. My question:")}
function aiGenTargets(){var q=encodeURIComponent(aiGeneral());return [["claude","Claude","https://claude.ai/new?q="+q],["chatgpt","ChatGPT","https://chatgpt.com/?q="+q],["cursor","Cursor","https://cursor.com/link/prompt?text="+q],["perplexity","Perplexity","https://www.perplexity.ai/search?q="+q]]}
function askAI(){
 if(document.getElementById("aiMod"))return;
 var m=document.createElement("div");m.id="aiMod";m.className="ai-mod";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");
 m.innerHTML='<div class="ai-box"><button type="button" class="ai-x" aria-label="'+t("doc.ai.close","Close")+'">&times;</button><h2>'+t("doc.ai.t","Ask AI about the documentation")+'</h2><p>'+t("doc.ai.d","Pick an assistant. It opens with a ready message that points it at the Geserd documentation, so you can ask your own question about anything here.")+'</p><div class="ai-g">'+aiGenTargets().map(function(a){return '<a class="ai-c" target="_blank" rel="noopener" href="'+a[2]+'"><svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">'+AI_LOGOS[a[0]]+'</svg><span>'+a[1]+'</span></a>'}).join("")+'</div><small>'+t("doc.ai.note","You will leave this site. What you write there is handled by that service.")+'</small></div>';
 function close(){m.remove();document.removeEventListener("keydown",key)}
 function key(e){if(e.key==="Escape")close()}
 m.addEventListener("click",function(e){if(e.target===m||e.target.closest(".ai-x"))close();else if(e.target.closest(".ai-c"))setTimeout(close,100)});
 document.addEventListener("keydown",key);document.body.appendChild(m);
 var f=m.querySelector(".ai-c");if(f)f.focus()
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
 var ak=document.getElementById("dAsk");if(ak)ak.addEventListener("click",askAI);
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
