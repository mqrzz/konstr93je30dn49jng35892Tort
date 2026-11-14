(function(){
var O;
var REGRU_REFERRAL_URL="https://www.reg.ru/";
var IC={"wh.c.reg":'<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6M4 20h16"/>',"wh.c.dates":'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/>',"wh.c.st":'<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2.2 2.2L15 10"/>',"wh.ns":'<rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01M8 17h.01"/>',"wh.c.dns":'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',"wh.c.mail":'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 6 8-6"/>',"wh.c.host":'<path d="M12 21s-6.5-5.2-6.5-10.5a6.5 6.5 0 0 1 13 0C18.500 15.800 12 21 12 21z"/><circle cx="12" cy="10.500" r="2.300"/>',"wh.c.ssl":'<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',free:'<circle cx="12" cy="12" r="9"/><path d="M8.500 12.500 11 15l4.500-5"/>',taken:'<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',unk:'<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 .9-1 1.700M12 17h.01"/>',cart:'<path d="M4 5h2l2 10h9l2-7H7"/><circle cx="10" cy="19" r="1.500"/><circle cx="17" cy="19" r="1.500"/>'};
function ico(k,n){return'<svg class="wh-svg" width="'+(n||18)+'" height="'+(n||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[k]||"")+"</svg>"}
function t(k,d){return O&&O.t?O.t(k,d):d}
function loc(){var l=O&&O.lang;return typeof l==="string"&&l?l:"en"}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function dt(s){if(!s)return esc(t("wh.none","no data"));var d=new Date(s);return isNaN(d)?esc(s):d.toLocaleDateString(loc(),{year:"numeric",month:"long",day:"numeric"})}
function none(){return'<span class="wh-n">'+esc(t("wh.none","no data"))+"</span>"}
function row(k,v){return'<div class="wh-r"><span>'+esc(t(k,k))+"</span><span>"+(v||none())+"</span></div>"}
function plural(n,k){var f=t(k,"");return f.replace("{n}",n)}
function years(days){if(days==null)return null;var y=Math.floor(days/365),m=Math.floor((days%365)/30);var p=[];if(y)p.push(t("wh.y","{n} y").replace("{n}",y));if(m||!y)p.push(t("wh.m","{n} mo").replace("{n}",m));return p.join(" ")}
function tag(ok,yes,no){return'<span class="wh-t '+(ok?"y":"n")+'"><i></i>'+esc(ok?yes:no)+"</span>"}
function card(title,body,cls){return'<section class="wh-k'+(cls?" "+cls:"")+'"><h3><span class="wh-ic">'+ico(title,18)+"</span>"+esc(t(title,title))+"</h3>"+body+"</section>"}
function stKey(s){return String(s).replace(/[\s_-]+/g,"").toLowerCase()}
function statusRows(list){
 if(!list||!list.length)return none();
 return'<ul class="wh-sl">'+list.map(function(s){var k="wh.s."+stKey(s),d=t(k,"");if(d===k)d="";return"<li><b>"+esc(s)+"</b>"+(d?"<span>"+esc(d)+"</span>":"")+"</li>"}).join("")+"</ul>"
}
function life(r){
 if(!r.created||!r.expires)return"";
 var a=Date.parse(r.created),b=Date.parse(r.expires),n=Date.now();if(isNaN(a)||isNaN(b)||b<=a)return"";
 var p=Math.max(0,Math.min(100,Math.round((n-a)/(b-a)*100)));
 return'<div class="wh-bar" role="img" aria-label="'+p+'%"><i style="width:'+p+'%"></i></div><div class="wh-bl"><span>'+dt(r.created)+"</span><span>"+dt(r.expires)+"</span></div>"
}
function dnsRows(dn){
 var o="";
 function g(label,items){if(items&&items.length)o+='<div class="wh-d"><span>'+label+'</span><span>'+items.map(function(x){return'<code>'+esc(x)+"</code>"}).join("")+"</span></div>"}
 g("A",dn.a);g("AAAA",dn.aaaa);g("NS",dn.ns);
 g("MX",dn.mx.map(function(m){return m.priority+" "+m.host}));
 g("CAA",dn.caa.map(function(c){return c.tag+" "+c.value}));
 g("TXT",dn.txt);
 if(dn.soa)g("SOA",[dn.soa.host+" "+dn.soa.admin+" "+dn.soa.serial]);
 if(dn.cname)g("CNAME",[dn.cname]);
 return o||none()
}
function render(d){
 var r=d.registry,dn=d.dns,out="";
 var state=!r.ok?"wh.unk":r.registered?"wh.taken":"wh.free";
 var head='<div class="wh-h"><span class="wh-hi '+(!r.ok?"u":r.registered?"t":"f")+'">'+ico(!r.ok?"unk":r.registered?"taken":"free",26)+'</span><div><h2>'+esc(d.unicode)+'</h2><p>'+esc(t(state,state))+'</p></div><div class="wh-f2">';
 if(r.ok&&r.registered){
  if(r.ageDays!=null)head+='<div><b>'+esc(years(r.ageDays))+"</b><span>"+esc(t("wh.age","Age"))+"</span></div>";
  if(r.daysLeft!=null)head+='<div><b>'+esc(r.daysLeft>=0?plural(r.daysLeft,"wh.days"):t("wh.expired","expired"))+"</b><span>"+esc(t("wh.left","Until expiry"))+"</span></div>"
 }
 if(d.tls&&d.tls.daysLeft!=null)head+='<div><b>'+esc(plural(d.tls.daysLeft,"wh.days"))+"</b><span>"+esc(t("wh.sslleft","Certificate valid for"))+"</span></div>";
 head+="</div></div>";out+=head;
 if(!r.ok)out+='<p class="wh-w">'+esc(t("wh.partial","The registry did not answer, so only DNS and server data are shown."))+"</p>";
 var cards="",nsCard="";
 if(r.ok&&r.registered){
  cards+=card("wh.c.reg",row("wh.reg",r.registrar?esc(r.registrar)+(r.registrarIana?' <small>IANA '+esc(r.registrarIana)+"</small>":""):"")+row("wh.org",r.registrantOrg?esc(r.registrantOrg):"")+row("wh.cn",r.registrantCountry?esc(r.registrantCountry):"")+row("wh.ab",r.abuseEmail?esc(r.abuseEmail):"")+row("wh.sec",esc(t(r.dnssec?"wh.on":"wh.off",r.dnssec?"on":"off")))+row("wh.src",esc(r.source==="rdap"?"RDAP":"WHOIS")));
  cards+=card("wh.c.dates",row("wh.cr",dt(r.created))+row("wh.up",dt(r.updated))+row("wh.ex",dt(r.expires))+life(r));
  cards+=card("wh.c.st",statusRows(r.status),"wide");
  nsCard=card("wh.ns",'<ul class="wh-ul">'+(r.nameservers.length?r.nameservers:dn.ns).map(function(n){return"<li><code>"+esc(n)+"</code></li>"}).join("")+"</ul>")
 }else if(r.ok&&!r.registered){
  out+='<section class="wh-fr"><span class="wh-fi">'+ico("free",34)+'</span><h3>'+esc(t("wh.free.t","This domain is not registered"))+"</h3><p>"+esc(t("wh.freep","This name has no registration record. If you want to use it, register it with any registrar."))+'</p><a class="btn pri wh-reg" href="'+esc(REGRU_REFERRAL_URL)+'" target="_blank" rel="sponsored noopener nofollow">'+ico("cart",18)+"<span>"+esc(t("wh.free.b","Register on Reg.ru"))+"</span></a><small>"+esc(t("wh.free.n","Partner link: we may receive a commission, the price for you stays the same."))+"</small></section>";
 }
 cards+=card("wh.c.dns",dnsRows(dn),"wide")+nsCard;
 var m=dn.mail;
 cards+=card("wh.c.mail",'<div class="wh-ml">'+tag(m.mx,t("wh.mx.y","MX records found"),t("wh.mx.n","No MX records"))+tag(!!m.spf,t("wh.spf.y","SPF published"),t("wh.spf.n","No SPF"))+tag(!!m.dmarc,t("wh.dm.y","DMARC published")+(m.dmarcPolicy?" ("+m.dmarcPolicy+")":""),t("wh.dm.n","No DMARC"))+"</div>"+(m.spf?'<code class="wh-cd">'+esc(m.spf)+"</code>":"")+(m.dmarc?'<code class="wh-cd">'+esc(m.dmarc)+"</code>":""));
 cards+=card("wh.c.host",d.hosting.length?'<ul class="wh-hl">'+d.hosting.map(function(h){return"<li><code>"+esc(h.ip)+"</code><span>"+esc([h.country,h.city].filter(Boolean).join(", ")||t("wh.none","no data"))+"</span>"+(h.ptr?"<small>"+esc(h.ptr)+"</small>":"")+"</li>"}).join("")+"</ul>":none());
 var c=d.tls;
 cards+=card("wh.c.ssl",c?row("wh.ssl.is",esc(c.issuer||""))+row("wh.ssl.sub",esc(c.subject||""))+row("wh.ssl.from",dt(c.validFrom))+row("wh.ssl.to",dt(c.validTo))+row("wh.ssl.pr",esc(c.protocol||""))+row("wh.ssl.tr",esc(t(c.trusted?"wh.ssl.ok":"wh.ssl.bad",c.trusted?"valid":"not trusted")))+(c.san&&c.san.length?row("wh.ssl.san",c.san.map(function(s){return"<code>"+esc(s)+"</code>"}).join(" ")):""):none());
 if(r.ok&&!r.registered&&!(dn.a.length||dn.ns.length||dn.mx.length||dn.txt.length||d.hosting.length||d.tls))cards="";
 out+='<div class="wh-g">'+cards+"</div>";
 out+='<div class="wh-cta"><p>'+esc(t("wh.cta","Want to send and receive mail from this domain?"))+'</p><a class="btn" href="/signup/">'+esc(t("wh.cta.b","Add it to Geserd"))+"</a></div>";
 return out
}
function init(){
 var f=document.getElementById("whF"),i=document.getElementById("whI"),o=document.getElementById("whO");
 i.placeholder=t("wh.ph","example.com");
 var q=new URLSearchParams(location.search).get("d");if(q){i.value=q}
 function msg(k){o.innerHTML='<p class="wh-e">'+esc(t(k,""))+"</p>"}
 function go(){
  var v=i.value.trim();
  if(!v){msg("wh.bad");return}
  try{history.replaceState(null,"","?d="+encodeURIComponent(v))}catch(e){}
  o.innerHTML='<p class="wh-e">'+esc(t("wh.wait","Checking…"))+"</p>";
  fetch("/api/whois?domain="+encodeURIComponent(v)).then(function(r){return r.json().then(function(d){return{s:r.status,d:d}},function(){return{s:r.status,d:{}}})}).then(function(x){
   if(x.s===451){location.href="/unavailable/";return}
   if(x.s===400){msg("wh.bad");return}
   if(x.s===429){msg("wh.rate");return}
   if(x.s!==200){msg("wh.err");return}
   o.innerHTML=render(x.d)
  }).catch(function(){msg("wh.err")})
 }
 f.addEventListener("submit",function(e){e.preventDefault();go()});
 if(q)go()
}
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
wait(0)
})();
