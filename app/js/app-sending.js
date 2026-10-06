(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc;
function sec(title,desc,body){return '<section class="ssec"><div class="sl"><h2>'+E(title)+'</h2><p>'+E(desc)+'</p></div><div class="sr">'+body+'</div></section>'}
function tg(k,on){return '<button type="button" class="tg'+(on?' on':'')+'" data-k="'+k+'" role="switch" aria-checked="'+(on?'true':'false')+'"><i></i></button>'}
function opt(v,cur,title,desc){return '<button type="button" class="opt'+(v===cur?' on':'')+'" data-v="'+v+'" role="radio" aria-checked="'+(v===cur?'true':'false')+'"><b>'+E(title)+'</b><span>'+E(desc)+'</span></button>'}
function render(root,top,c){
 var defaults=sec(T("sd.def","Sender defaults"),T("sd.def.d","Applied when an email does not set its own."),
  '<div class="pfld"><label for="sdn">'+E(T("sd.name","Sender name"))+'</label><input id="sdn" maxlength="80" autocomplete="off" value="'+E(c.default_from_name)+'" placeholder="Acme"><span class="fhint">'+E(T("sd.name.h","Used when the From address has no name."))+'</span></div><div class="pfld"><label for="sdr">'+E(T("sd.reply","Reply-To address"))+'</label><input id="sdr" type="email" autocomplete="off" value="'+E(c.default_reply_to)+'" placeholder="support@yourdomain.com"><span class="fhint">'+E(T("sd.reply.h","Used when an email has no Reply-To."))+'</span></div><div class="prow"><button type="button" class="abtn pri lg" id="sdSave">'+E(T("ac.save","Save"))+'</button></div>');
 var spam=sec(T("sd.spam","Spam protection"),T("sd.spam.d","Every email is scored before it leaves. Rejected emails are not sent and do not count towards your limits."),
  '<div class="opts" id="sdSpam" role="radiogroup">'+opt("off",c.spam_block,T("sd.spam.off","Off"),T("sd.spam.off.d","Send everything. The score is still saved."))+opt("balanced",c.spam_block,T("sd.spam.bal","Balanced"),T("sd.spam.bal.d","Reject emails that clearly look like spam."))+opt("strict",c.spam_block,T("sd.spam.str","Strict"),T("sd.spam.str.d","Also reject borderline emails."))+'</div>');
 var supp=sec(T("sd.supp","Suppression list"),T("sd.supp.d","Addresses that bounce or complain are not emailed again."),
  '<div class="trow"><div><b>'+E(T("sd.supp.b","Hard bounces"))+'</b><span>'+E(T("sd.supp.b.d","The address does not exist."))+'</span></div>'+tg("suppress_bounce",c.suppress_bounce)+'</div><div class="trow"><div><b>'+E(T("sd.supp.c","Spam complaints"))+'</b><span>'+E(T("sd.supp.c.d","The recipient marked an email as spam."))+'</span></div>'+tg("suppress_complaint",c.suppress_complaint)+'</div><div class="prow" style="margin-top:14px"><a class="abtn" href="/app/emails/suppressions/">'+E(T("sd.supp.open","Open the list"))+'</a></div>');
 var access=sec(T("sd.ip","Allowed IP addresses"),T("sd.ip.d","Only these addresses can send with your API keys or over SMTP. Leave empty to allow any address."),
  '<div class="pfld"><label for="sdi">'+E(T("sd.ip.l","One address per line"))+'</label><textarea id="sdi" rows="4" spellcheck="false" placeholder="203.0.113.10">'+E((c.allowed_ips||[]).join("\n"))+'</textarea><span class="fhint">'+E(T("sd.ip.h","The dashboard is not affected. Up to 20 addresses."))+'</span></div><div class="prow"><button type="button" class="abtn pri lg" id="sdIp">'+E(T("ac.save","Save"))+'</button></div>');
 root.innerHTML=top+defaults+spam+supp+access;
 var $=function(i){return document.getElementById(i)};
 function patch(body,btn,ok){if(btn)btn.disabled=true;return A.api("/settings/sending",{method:"PATCH",body:body}).then(function(r){c=r;A.toast(T("ac.saved","Saved"),"ok");if(ok)ok(r);return r},function(e){A.toast(A.err(e),"err");throw e}).then(function(r){if(btn)btn.disabled=false;return r},function(e){if(btn)btn.disabled=false;throw e})}
 $("sdSave").onclick=function(){patch({default_from_name:$("sdn").value,default_reply_to:$("sdr").value},this).catch(function(){})};
 $("sdIp").onclick=function(){patch({allowed_ips:$("sdi").value},this,function(r){$("sdi").value=(r.allowed_ips||[]).join("\n")}).catch(function(){})};
 $("sdSpam").onclick=function(e){var b=e.target.closest(".opt");if(!b||b.classList.contains("on"))return;var prev=$("sdSpam").querySelector(".opt.on");
  $("sdSpam").querySelectorAll(".opt").forEach(function(x){var on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-checked",on)});
  patch({spam_block:b.dataset.v}).catch(function(){$("sdSpam").querySelectorAll(".opt").forEach(function(x){var on=x===prev;x.classList.toggle("on",on);x.setAttribute("aria-checked",on)})})};
 root.querySelectorAll(".tg[data-k]").forEach(function(b){b.onclick=function(){var on=!b.classList.contains("on"),o={};o[b.dataset.k]=on;b.classList.toggle("on",on);b.setAttribute("aria-checked",on);patch(o).catch(function(){b.classList.toggle("on",!on);b.setAttribute("aria-checked",!on)})}})}
function load(root,top){
 root.innerHTML=top+A.loading();
 A.api("/settings/sending").then(function(c){render(root,top,c)},function(x){root.innerHTML=top+A.failed(x,"sdRetry");var b=document.getElementById("sdRetry");if(b)b.onclick=function(){load(root,top)}})}
window.GSSending={mount:load};
})();
