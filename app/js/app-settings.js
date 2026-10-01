/* app/js/app-settings.js — Settings pages (Usage, Billing, Team, SMTP). Reads data-page from #settings-root.
   Visual only for now: numbers are the Free plan's limits, nothing is fetched yet. */
(function(){
var t=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var ic=function(d){return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'};
var I={key:ic('<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/>'),hook:ic('<path d="M9 17a4 4 0 1 1 3-6.5M15 7a4 4 0 1 1 3 6.5M8 19h8"/>'),mail:ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),cal:ic('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>'),inb:ic('<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>'),globe:ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),clock:ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),bolt:ic('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),user:ic('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),srv:ic('<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>'),plug:ic('<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>'),lock:ic('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>')};
var TABS=[["usage","app.set.usage","Usage"],["billing","app.set.billing","Billing"],["team","app.set.team","Team"],["smtp","app.set.smtp","SMTP"]];
function rows(a){return '<table class="stbl"><tbody>'+a.map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>'}).join('')+'</tbody></table>'}
function sec(title,desc,btn,right){return '<section class="ssec"><div class="sl"><h2>'+title+'</h2><p>'+desc+'</p>'+(btn||'')+'</div><div class="sr">'+right+'</div></section>'}
var up='<a class="abtn" href="/pricing/">'+"__UP__"+'</a>';
var P={
usage:function(){var U=up.replace("__UP__",t("app.upgrade","Upgrade")),F='<h3>'+t("app.plan.free","Free")+'</h3>';
 var TG=function(k,d){return '<button class="tg" type="button" disabled aria-label="'+t(k,d)+'"><i></i></button>'};
 return sec(t("app.usage.tx","Transactional"),t("app.usage.tx.d","Integrate email into your app using the API or SMTP interface."),U,F+rows([[I.mail,t("app.usage.monthly","Monthly limit"),"0 / 100"],[I.cal,t("app.usage.daily","Daily limit"),"0 / 5"]]))+
 sec(t("app.usage.inb","Inbound"),t("app.usage.inb.d","Receive and reply to email sent to your domains."),U,F+rows([[I.inb,t("app.usage.monthly","Monthly limit"),"0 / 25"]]))+
 '<h1 class="sh1">'+t("app.usage.team","Team")+'</h1>'+
 sec(t("app.usage.limits","Limits"),t("app.usage.limits.d","Understand the quotas and limits for your account."),'',F+rows([[I.globe,t("app.usage.domains","Domains"),"0 / 1"],[I.key,t("app.usage.keys","API keys"),"0 / 2"],[I.hook,t("app.usage.hooks","Webhook endpoints"),"0 / 1"],[I.clock,t("app.usage.logs","Log retention"),t("app.usage.logs.v","1 day")],[I.bolt,t("app.usage.rate","Rate limit"),t("app.usage.rate.v","2 requests / sec")]]))+
 '<h1 class="sh1">'+t("app.usage.extras","Extras")+'</h1>'+
 sec(t("app.usage.payg","Pay-as-you-go"),t("app.usage.payg.d","Continue using Geserd beyond your quota."),'','<div class="pgi"><h3>'+t("app.usage.payg.t","Transactional")+'</h3><p>'+t("app.usage.payg.p","When enabled, you keep sending and receiving beyond your quota. Geserd charges your plan's overage rate for each additional bucket of 1,000 emails. Available on paid plans.")+'</p>'+TG("app.usage.payg.t","Transactional")+'</div>')+
 sec(t("app.usage.addons","Add-ons"),t("app.usage.addons.d","Get even more of Geserd with add-ons."),'','<div class="pgi"><h3>'+t("app.usage.add.dom","Domains")+'</h3><p>'+t("app.usage.add.dom.p","Adds 10 domains on top of the number included in your plan. You need a paid plan to add more domains.")+'</p><a class="abtn" href="/pricing/">'+t("app.usage.viewpr","View pricing")+'</a></div><div class="pgi"><h3>'+t("app.usage.add.ip","Dedicated IP")+'</h3><p>'+t("app.usage.add.ip.p","We provision, warm up and monitor a dedicated IP for consistent deliverability. Available on request on the Business plan.")+'</p><a class="abtn" href="/contact/">'+t("app.usage.add.ip.b","Request dedicated IP")+'</a></div>')},
billing:function(){return sec(t("app.bill.plan","Plan"),t("app.bill.plan.d","Your current plan and what it includes."),'<a class="abtn pri" href="/pricing/">'+t("app.upgrade","Upgrade")+'</a>','<h3>'+t("app.plan.free","Free")+'</h3>'+rows([[I.mail,t("app.usage.tx","Transactional"),"300 / "+t("app.bill.mo","month")],[I.inb,t("app.usage.inb","Inbound"),"100 / "+t("app.bill.mo","month")],[I.globe,t("app.usage.domains","Domains"),"1"]]))+
 sec(t("app.bill.pm","Payment method"),t("app.bill.pm.d","The card used for paid plans."),'<button class="abtn" type="button">'+t("app.bill.add","Add payment method")+'</button>','<div class="emptyb">'+t("app.bill.none","No payment method on file.")+'</div>')+
 sec(t("app.bill.inv","Invoices"),t("app.bill.inv.d","Receipts for every payment."),'','<div class="emptyb">'+t("app.bill.noinv","No invoices yet.")+'</div>')},
team:function(){return sec(t("app.team.mem","Members"),t("app.team.mem.d","People with access to this workspace."),'<button class="abtn pri" type="button">'+t("app.team.invite","Invite member")+'</button>','<table class="stbl"><tbody><tr><td>'+I.user+'</td><td>'+t("app.team.you","You")+'</td><td class="sub">'+t("app.team.owner","Owner")+'</td></tr></tbody></table>')},
smtp:function(){return sec(t("app.smtp.t","SMTP"),t("app.smtp.d","Send through SMTP instead of the API. Use your API key as the password."),'<a class="abtn" href="/app/api-keys/">'+t("app.smtp.keys","Create API key")+'</a>',rows([[I.srv,t("app.smtp.host","Host"),"smtp.geserd.com"],[I.plug,t("app.smtp.port","Port"),"465 / 587"],[I.user,t("app.smtp.user","Username"),"geserd"],[I.lock,t("app.smtp.pass","Password"),t("app.smtp.pass.v","Your API key")]]))}
};
function mount(){
 var r=document.getElementById("settings-root");if(!r)return;
 var pg=r.dataset.page||"usage";
 r.innerHTML='<div class="ph"><h1>'+t("app.set.title","Settings")+'</h1></div><nav class="stabs">'+TABS.map(function(x){return '<a href="/app/settings/'+x[0]+'/"'+(x[0]===pg?' class="on"':'')+'>'+t(x[1],x[2])+'</a>'}).join('')+'</nav>'+(P[pg]||P.usage)();
}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount()};
function wait(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go);if(n>200)return go();setTimeout(function(){wait(n+1)},25)}
wait(0);
})();
