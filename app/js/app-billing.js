(function(){
var t=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var A,R,top,D,sel={pro:true,business:true},busy=false;
function esc(s){return A.esc(String(s))}
function rub(n){return"₽"+Number(n).toLocaleString(A.lang(),{minimumFractionDigits:Number(n)%1?2:0,maximumFractionDigits:2})}
function day(iso){try{return new Date(iso).toLocaleDateString(A.lang(),{day:"numeric",month:"long",year:"numeric"})}catch(e){return""}}
function sec(title,desc,btn,right){return'<section class="ssec"><div class="sl"><h2>'+title+'</h2><p>'+desc+'</p>'+(btn||"")+'</div><div class="sr">'+right+'</div></section>'}
function rows(a){return'<table class="stbl bl-t"><tbody>'+a.map(function(r){return"<tr><td>"+r[0]+"</td><td>"+r[1]+"</td></tr>"}).join("")+"</tbody></table>"}
function status(){
 var s=D.subscription;
 if(!s||s.status==="canceled"||D.plan==="free")return t("bl.st.free","No active subscription");
 if(s.status==="past_due")return t("bl.st.due","Payment failed, subscription will end soon");
 if(s.cancel_at_period_end)return t("bl.st.ends","Ends on")+" "+day(s.current_period_end);
 if(s.recurring)return t("bl.st.renews","Renews on")+" "+day(s.current_period_end);
 return t("bl.st.until","Paid until")+" "+day(s.current_period_end)
}
function planSec(){
 var s=D.subscription,paid=s&&s.status!=="canceled"&&D.plan!=="free",btn="";
 if(paid&&D.plan!=="enterprise"){
  if(s.status==="past_due")btn="";
  else if(s.cancel_at_period_end||!s.recurring)btn=s.parent_invoice_id||s.cancel_at_period_end?'<button class="abtn" type="button" data-act="resume">'+t("bl.resume","Turn on auto-renew")+"</button>":"";
  else btn='<button class="abtn" type="button" data-act="cancel">'+t("bl.cancel","Cancel auto-renew")+"</button>"
 }
 var h='<h3>'+esc(t("app.plan."+D.plan,D.plan))+"</h3><p class=\"bl-st\">"+esc(status())+"</p>";
 if(D.plan==="enterprise")h+='<p class="bl-st">'+t("bl.ent","Your plan is managed by our team. Contact us for changes.")+"</p>";
 return sec(t("app.bill.plan","Plan"),t("app.bill.plan.d","Your current plan and what it includes."),btn,h)
}
function choose(){
 if(D.plan==="enterprise")return"";
 var order={free:0,pro:1,business:2},cards=["pro","business"].map(function(p){
  var cur=D.plan===p&&D.subscription&&D.subscription.status!=="canceled",down=order[p]<order[D.plan]&&D.subscription&&D.subscription.status!=="canceled";
  var lbl=cur?t("bl.extend","Extend 30 days"):(down?t("bl.down","Available after the current period"):t("bl.pay","Pay")+" "+rub(D.prices[p]));
  return'<div class="pgi bl-plan"><h3>'+esc(t("app.plan."+p,p))+'</h3><p class="bl-pr"><b>'+rub(D.prices[p])+"</b> / "+D.period_days+" "+t("bl.days","days")+'</p><p class="bl-q" data-q="'+p+'"></p><button class="abtn pri" type="button" data-act="pay" data-plan="'+p+'"'+(down||!D.provider.configured?" disabled":"")+">"+lbl+"</button></div>"
 }).join("");
 var tg='<div class="bl-ar"><div><div class="bl-ah">'+t("bl.auto","Renew automatically")+"</div><p>"+t("bl.auto.p","Geserd charges the same payment method every 30 days. You can cancel any time before the renewal date.")+'</p></div><button class="tg'+(sel.pro?" on":"")+'" type="button" id="blAuto" aria-label="'+t("bl.auto","Renew automatically")+'"><i></i></button></div>';
 var note=D.provider.configured?"":'<p class="bl-warn">'+t("bl.off","Online payments are not enabled yet.")+"</p>";
 return sec(t("bl.ch","Choose a plan"),t("bl.ch.d","Plans are paid in rubles. Enterprise is arranged with our team."),'<a class="abtn" href="/contact/">'+t("bl.ent.btn","Enterprise: contact us")+"</a>",note+tg+cards)
}
function methodSec(){
 return sec(t("app.bill.pm","Payment method"),t("bl.pm.d","Payments are processed by Robokassa."),"",'<div class="pgi"><h3>Robokassa</h3><p>'+t("bl.pm.p","Cards, the Faster Payments System and wallets. You enter payment details on the Robokassa page, Geserd never sees or stores them.")+"</p>"+(D.provider.test?'<p class="bl-warn">'+t("bl.test","Test mode: no real money is charged.")+"</p>":"")+"</div>")
}
function regionSec(){
 var rg=D.region?t("bl.rg."+D.region,D.region):"—";
 return sec(t("bl.rg","Account region"),t("bl.rg.d","Your region sets sign-in methods, currency, payments and where your data is kept."),"",rows([[t("bl.rg.r","Region"),esc(rg)],[t("bl.rg.c","Billing currency"),esc(D.currency)],[t("bl.rg.s","Prices shown in"),esc(D.display||D.currency)],[t("bl.rg.l","Data location"),esc(t("wl.dr."+D.data_region,D.data_region))]]))
}
function invSec(){
 var body=D.invoices.length?'<table class="stbl bl-t bl-inv"><tbody>'+D.invoices.map(function(i){return"<tr><td>#"+i.id+" · "+esc(t("app.plan."+i.plan,i.plan))+'<span class="bl-d">'+A.date(i.paid_at||i.created_at)+"</span></td><td>"+rub(i.amount)+'</td><td class="bl-s s-'+i.status+'">'+t("bl.is."+i.status,i.status)+"</td></tr>"}).join("")+"</tbody></table>":'<div class="emptyb">'+t("app.bill.noinv","No invoices yet.")+"</div>";
 return sec(t("app.bill.inv","Invoices"),t("app.bill.inv.d","Receipts for every payment."),"",body)
}
function draw(){
 R.innerHTML=top+planSec()+choose()+methodSec()+regionSec()+invSec();
 var au=document.getElementById("blAuto");if(au)au.onclick=function(){sel.pro=!sel.pro;au.classList.toggle("on",sel.pro)};
 R.querySelectorAll("[data-act]").forEach(function(b){b.onclick=function(){act(b)}});
 ["pro","business"].forEach(function(p){
  if(p===D.plan||D.plan==="free"||!D.subscription||D.subscription.status==="canceled")return;
  A.api("/billing/quote",{method:"POST",body:{plan:p}}).then(function(q){var el=R.querySelector('[data-q="'+p+'"]');if(el&&q.credit>0)el.textContent=t("bl.credit","Credit for unused time")+" −"+rub(q.credit)+". "+t("bl.topay","To pay")+": "+rub(q.amount)},function(){})
 })
}
function act(b){
 if(busy)return;var a=b.getAttribute("data-act");busy=true;b.disabled=true;
 var p;
 if(a==="pay")p=A.api("/billing/checkout",{method:"POST",body:{plan:b.getAttribute("data-plan"),recurring:sel.pro,lang:A.lang()}}).then(function(o){location.href=o.url;return new Promise(function(){})});
 else p=A.api("/billing/"+a,{method:"POST"}).then(function(){A.toast(t(a==="cancel"?"bl.t.cancel":"bl.t.resume",a));return load(true)});
 p.catch(function(e){A.toast(t("bl.err."+e.code,A.err(e)),"error")}).then(function(){busy=false;b.disabled=false})
}
function load(quiet){
 return A.api("/billing").then(function(d){D=d;draw();return d},function(x){R.innerHTML=top+A.failed(x,"blRetry");var b=document.getElementById("blRetry");if(b)b.onclick=function(){R.innerHTML=top+A.loading();load()}})
}
function flash(){
 var q=new URLSearchParams(location.search),id=q.get("paid")||q.get("check"),bad=q.get("failed");
 if(!id&&!bad)return;history.replaceState(null,"",location.pathname);
 if(bad){A.toast(t("bl.t.failed","Payment was not completed."),"error");return}
 var n=0;A.toast(t("bl.t.paid","Payment received. Your plan is being activated."));
 (function poll(){if(n++>6)return;setTimeout(function(){load(true).then(function(d){if(d&&d.invoices.some(function(i){return String(i.id)===String(id)&&i.status==="paid"}))return;poll()})},2000)})()
}
window.GSBilling={mount:function(r,tp){A=window.GSApp;R=r;top=tp;R.innerHTML=top+A.loading();load().then(flash)}};
})();
