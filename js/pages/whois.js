(function(){
var O;
function t(k,d){return O&&O.t?O.t(k,d):d}
function loc(){var l=O&&O.lang;return typeof l==="string"&&l?l:"en"}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function dt(s){if(!s)return esc(t("wh.none","no data"));var d=new Date(s);return isNaN(d)?esc(s):d.toLocaleDateString(loc(),{year:"numeric",month:"long",day:"numeric"})}
function none(){return'<span class="wh-n">'+esc(t("wh.none","no data"))+"</span>"}
function row(k,v){return'<div class="wh-r"><span>'+esc(t(k,k))+"</span><span>"+(v||none())+"</span></div>"}
function plural(n,k){var f=t(k,"");return f.replace("{n}",n)}
function years(days){if(days==null)return null;var y=Math.floor(days/365),m=Math.floor((days%365)/30);var p=[];if(y)p.push(t("wh.y","{n} y").replace("{n}",y));if(m||!y)p.push(t("wh.m","{n} mo").replace("{n}",m));return p.join(" ")}
function tag(ok,yes,no){return'<span class="wh-t '+(ok?"y":"n")+'"><i></i>'+esc(ok?yes:no)+"</span>"}
function card(title,body,cls){return'<section class="wh-k'+(cls?" "+cls:"")+'"><h3>'+esc(t(title,title))+"</h3>"+body+"</section>"}
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
 var head='<div class="wh-h"><div><h2>'+esc(d.unicode)+'</h2><p>'+esc(t(state,state))+'</p></div><div class="wh-f2">';
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
  cards+=card("wh.c.reg",'<p class="wh-free">'+esc(t("wh.freep","This name has no registration record. If you want to use it, register it with any registrar."))+"</p>","wide")
 }
 cards+=card("wh.c.dns",dnsRows(dn),"wide")+nsCard;
 var m=dn.mail;
 cards+=card("wh.c.mail",'<div class="wh-ml">'+tag(m.mx,t("wh.mx.y","MX records found"),t("wh.mx.n","No MX records"))+tag(!!m.spf,t("wh.spf.y","SPF published"),t("wh.spf.n","No SPF"))+tag(!!m.dmarc,t("wh.dm.y","DMARC published")+(m.dmarcPolicy?" ("+m.dmarcPolicy+")":""),t("wh.dm.n","No DMARC"))+"</div>"+(m.spf?'<code class="wh-cd">'+esc(m.spf)+"</code>":"")+(m.dmarc?'<code class="wh-cd">'+esc(m.dmarc)+"</code>":""));
 cards+=card("wh.c.host",d.hosting.length?'<ul class="wh-hl">'+d.hosting.map(function(h){return"<li><code>"+esc(h.ip)+"</code><span>"+esc([h.country,h.city].filter(Boolean).join(", ")||t("wh.none","no data"))+"</span>"+(h.ptr?"<small>"+esc(h.ptr)+"</small>":"")+"</li>"}).join("")+"</ul>":none());
 var c=d.tls;
 cards+=card("wh.c.ssl",c?row("wh.ssl.is",esc(c.issuer||""))+row("wh.ssl.sub",esc(c.subject||""))+row("wh.ssl.from",dt(c.validFrom))+row("wh.ssl.to",dt(c.validTo))+row("wh.ssl.pr",esc(c.protocol||""))+row("wh.ssl.tr",esc(t(c.trusted?"wh.ssl.ok":"wh.ssl.bad",c.trusted?"valid":"not trusted")))+(c.san&&c.san.length?row("wh.ssl.san",c.san.map(function(s){return"<code>"+esc(s)+"</code>"}).join(" ")):""):none());
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
