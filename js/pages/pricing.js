(function(){var O=window.GESERD,t=function(k,d){return O.t?O.t(k,d):d};
var P=[["free","₽0",[300,10,100,1,1],"/signup/"],["pro","₽790",[10000,500,5000,3,7],"/signup/?plan=pro"],["biz","₽2 490",[50000,2500,25000,10,30],"/signup/?plan=business"],["ent",null,null,"/contact/"]];
var L=["emails per month","emails per day","inbound per month","domains","days of logs"];
(O.ready||Promise.resolve()).then(function(){var lg=O.lang||"en";document.getElementById("plans").innerHTML=P.map(function(p){var e=p[0]=="ent";
var CK='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
var rows=L.map(function(l,i){return"<li>"+CK+"<span><b>"+(e?t("pr.custom","Custom"):p[2][i].toLocaleString(lg))+"</b> "+t("pr.l"+(i+1),l)+"</span></li>"}).join("");
return'<div class="plan'+(p[0]=="pro"?" hot":"")+'">'+(p[0]=="pro"?'<span class="tag">'+t("pr.pop","Popular")+"</span>":"")+"<h3>"+t("pr."+p[0],p[0])+'</h3><div class="price">'+(e?t("pr.custom","Custom"):p[1]+"<small>"+t("pr.mo","/mo")+"</small>")+"</div><ul>"+rows+'</ul><a class="btn" href="'+p[3]+'">'+(e?t("pr.contact","Contact us"):t("cta.start","Get started"))+"</a></div>"}).join("")})})()
