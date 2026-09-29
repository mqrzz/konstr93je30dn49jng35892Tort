/* js/pages/pricing.js — renders the #plans grid. Only loaded on /pricing/.
   Currency follows the visitor's country (from geo.js, already resolved by the time this
   runs since i18n.js's O.ready waits on O.geo): CIS visitors see RUB, everyone else sees USD.
   The two currencies are two separate, fixed price points per plan (not a live FX conversion) —
   standard regional pricing, so numbers stay round and don't drift with the exchange rate.
   RUB_CC and the USD figures are business calls: adjust the list/prices here, nothing else
   needs to change. Limits (L/plan[2]) are the same worldwide, only the price display differs. */
(function(){var O=window.GESERD,t=function(k,d){return O.t?O.t(k,d):d};
/* Russian-ruble-sphere CIS countries. Deliberately excludes Ukraine (own currency, UAH) and the
   Baltics (EU/EUR) — everyone not in this list sees USD. */
var RUB_CC=["RU","BY","KZ","KG","TJ","TM","UZ","AM","AZ","MD"];
var rub=RUB_CC.indexOf((O.country||"").toUpperCase())>-1;
/* plan: [key, {rub,usd}, [monthly,daily,inbound,domains,logDays], signup url] */
var P=[
 ["free",{rub:"₽0",usd:"$0"},[300,10,100,1,1],"/signup/"],
 ["pro",{rub:"₽790",usd:"$9"},[10000,500,5000,3,7],"/signup/?plan=pro"],
 ["biz",{rub:"₽2 490",usd:"$29"},[50000,2500,25000,10,30],"/signup/?plan=business"],
 ["ent",null,null,"/contact/"]
];
var L=["emails per month","emails per day","inbound per month","domains","days of logs"];
(O.ready||Promise.resolve()).then(function(){var lg=O.lang||"en";document.getElementById("plans").innerHTML=P.map(function(p){var e=p[0]=="ent";
var CK='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
var rows=L.slice(1).map(function(l,i){return"<li>"+CK+"<span>"+(e?t("pr.custom","Custom"):p[2][i+1].toLocaleString(lg)+" "+t("pr.l"+(i+2),l))+"</span></li>"}).join("");
var top=e?t("pr.custom","Custom"):p[2][0].toLocaleString(lg)+" "+t("pr.l1",L[0]);
var price=e?t("pr.ent","Enterprise"):(rub?p[1].rub:p[1].usd)+"<small> "+t("pr.mo","/mo")+"</small>";
return'<div class="plan'+(p[0]=="pro"?" hot":"")+'"><h3>'+t("pr."+p[0],p[0])+(p[0]=="pro"?'<span class="rec">'+t("pr.rec","Recommended")+"</span>":"")+'</h3><div class="price">'+price+'</div><div class="q">'+top+"</div><ul>"+rows+'</ul><a class="btn'+(p[0]=="pro"?"":" ghost")+'" href="'+p[3]+'">'+(e?t("pr.contact","Contact us"):t("cta.start","Get started"))+"</a></div>"}).join("")})})()
