(function(){
var A=window.GSApp,t=A.t,e=A.esc,root;
var IC={deliverability:'<path d="M21 12V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h7"/><path d="m3.5 7.5 8.5 6 8.5-6"/><path d="m16 18 2 2 4-4"/>',domain:A.IC.globe,history:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',conduct:'<path d="M12 3 4 6v6c0 4.5 3.2 7.5 8 9 4.8-1.5 8-4.5 8-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'};
var OK='<path d="m5 12.5 4.5 4.5L19 7.5"/>',WARN='<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5h.01"/>',WAIT='<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
var TIP={deliverability:["/app/metrics/","ap.m.t","Metrics"],domain:["/app/domains/","app.nav.domains","Domains"],conduct:["/app/broadcasts/","app.nav.broadcasts","Broadcasts"],profile:["/app/account/","app.nav.account","Account settings"]};
function pc(v){return(Math.round(v*100)/100).toLocaleString(A.lang())+"%"}
function desc(f){
 var d=f.detail||{};
 if(f.id==="deliverability")return f.state==="pending"?t("rt.d.pending","Appears after {need} emails in 30 days. You have sent {sent}.",{need:d.need,sent:d.sent}):t("rt.d.live","Score {score} of 100 from {sent} emails in the last 30 days. Bounces {b}, complaints {c}.",{score:d.score,sent:A.num(d.sent),b:pc(d.rates.bounced||0),c:pc(d.rates.complained||0)});
 if(f.id==="domain")return f.state==="full"?t("rt.dm.full","Your own domain is verified."):f.state==="partial"?t("rt.dm.part","Only a Geserd address so far. Verify your own domain for full points."):t("rt.dm.none","No domain connected yet.");
 if(f.id==="history")return t("rt.h","The account is {days} days old. Full points at {full} days.",{days:d.days,full:d.full_days});
 if(f.id==="conduct")return d.broadcasts?t("rt.c.some","Complaints {c} and unsubscribes {u} over your last {n} broadcasts.",{c:pc(d.complaint_rate),u:pc(d.unsubscribe_rate),n:d.broadcasts}):t("rt.c.none","No broadcast problems so far.");
 var miss=[];if(!d.name)miss.push(t("rt.p.name","name"));if(!d.region)miss.push(t("rt.p.region","region"));if(!d.onboarded)miss.push(t("rt.p.setup","setup"));
 return miss.length?t("rt.p.miss","Still missing: {x}.",{x:miss.join(", ")}):t("rt.p.done","Name, region and setup are complete.")
}
function gauge(r){
 var C=2*Math.PI*70,k=r.level==="low"?"bad":r.level==="fair"?"wait":"ok";
 return'<div class="rt-g '+k+'"><svg viewBox="0 0 160 160" width="180" height="180" role="img" aria-label="'+e(t("rt.aria","Account rating {n} out of 100",{n:r.score}))+'"><circle cx="80" cy="80" r="70" class="rt-tr"/><circle cx="80" cy="80" r="70" class="rt-ar" stroke-dasharray="'+(r.score/100*C).toFixed(1)+" "+C.toFixed(1)+'" transform="rotate(-90 80 80)"/></svg><div class="rt-n"><b>'+r.score+"</b><span>/ 100</span></div></div>"
}
function row(f){
 var k=f.state==="full"?"ok":f.state==="pending"?"dim":f.state==="partial"?"wait":"bad";
 return'<div class="rt-r"><span class="rt-i">'+A.icon(IC[f.id],20)+'</span><div class="rt-t"><div class="rt-h"><b>'+e(t("rt.f."+f.id,f.id))+'</b><strong>'+f.points+'<small>/'+f.max+'</small></strong></div><div class="rt-b"><i class="'+k+'" style="width:'+Math.max(f.points?3:0,f.points/f.max*100)+'%"></i></div><p>'+e(desc(f))+'</p></div><span class="rt-s '+k+'">'+A.icon(f.state==="full"?OK:f.state==="pending"?WAIT:WARN,16)+"</span></div>"
}
function draw(me,r){
 var nm=(me.name||me.email||"?").trim(),ini=nm.charAt(0).toUpperCase();
 var reg="";try{if(me.account_country)reg=new Intl.DisplayNames([A.lang()],{type:"region"}).of(me.account_country)}catch(x){reg=me.account_country||""}
 var tips=r.tips.filter(function(x){return TIP[x]}).map(function(x){var f=r.factors.filter(function(y){return y.id===x})[0],tp=TIP[x];return'<div class="rt-tp"><span class="rt-i">'+A.icon(IC[x],20)+'</span><div><b>'+e(t("rt.tip."+x+(f.state==="pending"?".p":""),x))+"</b></div><a class=\"abtn\" href=\""+tp[0]+'">'+e(t(tp[1],tp[2]))+"</a></div>"}).join("");
 root.innerHTML='<div class="ph"><h1>'+e(t("app.nav.profile","Profile"))+'</h1></div>'+
  '<section class="gcard pf-id"><span class="pf-av">'+e(ini)+'</span><div class="pf-nm"><h2>'+e(me.name||me.email)+"</h2><p>"+e(me.email)+'</p><div class="pf-ch">'+A.pill("dim",t("app.plan."+me.plan,me.plan))+(reg?'<span class="pf-c">'+A.icon(A.IC.globe,14)+e(reg)+"</span>":"")+'<span class="pf-c">'+A.icon('<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/>',14)+e(t("rt.since","Member since {d}",{d:new Date(r.since).toLocaleDateString(A.lang(),{month:"long",year:"numeric"})}))+'</span></div></div><a class="abtn" href="/app/account/">'+A.icon('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>',16)+"<span>"+e(t("app.nav.account","Account settings"))+"</span></a></section>"+
  '<section class="gcard rt"><div class="rt-top">'+gauge(r)+'<div class="rt-sum"><h2 class="sh3">'+e(t("rt.title","Account rating"))+"</h2>"+A.pill(r.level==="low"?"bad":r.level==="fair"?"wait":"ok",t("rt.l."+r.level,r.level))+"<p>"+e(t("rt.l."+r.level+".p",""))+'</p><p class="dim sm">'+e(t("rt.how","The rating is recalculated every time you open this page from your last 30 days of sending, your domains and the age of the account. 100 is the best."))+"</p></div></div><div class=\"rt-list\">"+r.factors.map(row).join("")+"</div></section>"+
  (tips?'<section class="gcard"><h2 class="sh3">'+e(t("rt.improve","How to improve"))+'</h2><div class="rt-tips">'+tips+"</div></section>":"")
}
A.ready(function(){
 root=document.getElementById("app-root");if(!root)return;root.innerHTML=A.loading();
 Promise.all([A.api("/auth/me"),A.api("/account/rating")]).then(function(v){draw(v[0],v[1])},function(x){root.innerHTML=A.failed(x,"rtRetry");document.getElementById("rtRetry").onclick=function(){location.reload()}})
})
})();
