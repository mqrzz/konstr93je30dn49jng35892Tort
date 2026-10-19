(function(){
var A=window.GSApp,t=A.t,e=A.esc;
var IC={mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 5.5L20 8"/>',plus:'<path d="M12 5v14M5 12h14"/>',reply:'<path d="M9 8 4 12.5 9 17"/><path d="M4 12.5h9a7 7 0 0 1 7 7"/>',clip:'<path d="m20 11-8.2 8.2a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.5a1.7 1.7 0 0 1-2.4-2.4L15 7"/>',trash:'<path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12"/>',back:'<path d="M15 5l-7 7 7 7"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'};
var KINDS=["general","support","government","legal","press","security","billing","custom"];
var KT={general:["Общий","General"],support:["Поддержка","Support"],government:["Госорганы","Government"],legal:["Юридический","Legal"],press:["Пресса","Press"],security:["Безопасность","Security"],billing:["Оплата","Billing"],custom:["Другое","Other"]};
var S={boxes:[],can:false,staff:[],domain:"",box:null,folder:"in",list:[],msg:null,root:null,head:null};
function kindLabel(k){return t("ad.ml.k."+k,KT[k]?KT[k][1]:k)}
function errMsg(x){var c=x&&x.code;var m={invalid_address:t("ad.ml.err.addr","Use letters, digits, dot, dash or underscore."),invalid_title:t("ad.ml.err.title","Enter a name."),exists:t("ad.ml.err.exists","This address already exists."),invalid_to:t("ad.ml.err.to","Check the recipient address."),empty:t("ad.ml.err.empty","The message is empty."),too_large:t("ad.ml.err.large","Attachments are larger than 10 MB."),attachment_blocked:t("ad.ml.err.att","This file type is not allowed."),send_failed:t("ad.ml.err.send","The message could not be sent. Try again.")}[c];return m||A.err(x)}
function paint(){
 var r=S.root;
 var side='<aside class="ml-side"><div class="ml-sh"><h2>'+e(t("ad.ml.boxes","Addresses"))+'</h2>'+(S.can?'<button type="button" class="abtn" id="mlAdd">'+A.icon(IC.plus,16)+'<span>'+e(t("ad.ml.add","Add"))+'</span></button>':"")+'</div>'+
 (S.boxes.length?'<div class="ml-bl">'+S.boxes.map(function(b){return'<button type="button" class="ml-b'+(S.box&&S.box.id===b.id?" on":"")+'" data-id="'+b.id+'"><span class="ml-bi">'+A.icon(IC.mail,16)+'</span><span class="ml-bt"><b>'+e(b.title)+'</b><small>'+e(b.address)+'</small></span>'+(b.unread?'<em>'+A.num(b.unread)+'</em>':"")+'</button>'}).join("")+'</div>':'<div class="ml-e"><span class="ml-ei">'+A.icon(IC.mail,24)+'</span><h3>'+e(t("ad.ml.noboxes","No addresses yet"))+'</h3><p>'+e(t("ad.ml.noboxes.d",S.can?"Create the first organization address, for example support or the address for government requests.":"You have not been given access to any address yet."))+'</p>'+(S.can?'<button type="button" class="abtn pri" id="mlAdd2">'+e(t("ad.ml.add.first","Add address"))+'</button>':"")+'</div>')+'</aside>';
 var main;
 if(!S.box)main='<section class="ml-main"><div class="ml-e"><span class="ml-ei">'+A.icon(IC.mail,24)+'</span><h3>'+e(t("ad.ml.pick","Choose an address"))+'</h3><p>'+e(t("ad.ml.pick.d","Incoming mail will appear here."))+'</p></div></section>';
 else if(S.msg)main='<section class="ml-main">'+readView()+'</section>';
 else main='<section class="ml-main">'+listView()+'</section>';
 r.innerHTML=S.head()+'<div class="ml'+(S.box?" has":"")+(S.msg?" rd":"")+'">'+side+main+'</div>';
 bind()}
function listView(){
 var b=S.box;
 var h='<div class="ml-mh"><div class="ml-mt"><h2>'+e(b.title)+'</h2><span>'+e(b.address)+'</span></div><div class="ml-ma">'+(S.can?'<button type="button" class="abtn" id="mlSet" aria-label="'+e(t("ad.ml.settings","Settings"))+'">'+A.icon(IC.gear,16)+'</button>':"")+'<button type="button" class="abtn pri" id="mlNew">'+A.icon(IC.plus,16)+'<span>'+e(t("ad.ml.write","Write"))+'</span></button></div></div>';
 h+='<div class="sgc ml-tabs"><button type="button" data-f="in" class="'+(S.folder==="in"?"on":"")+'">'+e(t("ad.ml.in","Inbox"))+'</button><button type="button" data-f="out" class="'+(S.folder==="out"?"on":"")+'">'+e(t("ad.ml.out","Sent"))+'</button></div>';
 if(S.list===null)return h+A.loading();
 if(!S.list.length)return h+'<div class="ml-e"><span class="ml-ei">'+A.icon(IC.mail,24)+'</span><h3>'+e(S.folder==="in"?t("ad.ml.empty.in","No incoming mail"):t("ad.ml.empty.out","Nothing sent yet"))+'</h3><p>'+e(S.folder==="in"?t("ad.ml.empty.in.d","Messages sent to this address will be listed here."):t("ad.ml.empty.out.d","Replies and new messages from this address will be listed here."))+'</p></div>';
 return h+'<div class="ml-l">'+S.list.map(function(m){var who=S.folder==="in"?m.from_addr:m.to_addrs;return'<button type="button" class="ml-r'+(!m.read_at&&S.folder==="in"?" un":"")+'" data-m="'+m.id+'"><span class="ml-w">'+e(who)+'</span><span class="ml-s"><b>'+e(m.subject||t("ad.ml.nosub","(no subject)"))+'</b><small>'+e(m.preview||"")+'</small></span>'+(m.atts?'<span class="ml-c" aria-label="'+e(t("ad.ml.atts","Attachments"))+'">'+A.icon(IC.clip,14)+'</span>':"")+'<time>'+e(A.ago(m.created_at))+'</time></button>'}).join("")+'</div>'}
function sz(n){return n>1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB"}
function readView(){
 var m=S.msg;
 var h='<div class="ml-mh"><button type="button" class="abtn" id="mlBack">'+A.icon(IC.back,16)+'<span>'+e(t("ad.ml.back","Back"))+'</span></button><div class="ml-ma"><button type="button" class="abtn" id="mlDel" aria-label="'+e(t("ad.ml.del","Delete"))+'">'+A.icon(IC.trash,16)+'</button>'+(m.direction==="in"?'<button type="button" class="abtn pri" id="mlRe">'+A.icon(IC.reply,16)+'<span>'+e(t("ad.ml.reply","Reply"))+'</span></button>':"")+'</div></div>';
 h+='<article class="ml-rd"><h2>'+e(m.subject||t("ad.ml.nosub","(no subject)"))+'</h2><dl><dt>'+e(t("ad.ml.from","From"))+'</dt><dd>'+e(m.from)+'</dd><dt>'+e(t("ad.ml.to","To"))+'</dt><dd>'+e(m.to)+'</dd><dt>'+e(t("ad.ml.date","Date"))+'</dt><dd>'+e(A.date(m.created_at))+'</dd></dl><pre class="ml-bd">'+e(m.text||"")+'</pre>';
 if(m.attachments&&m.attachments.length)h+='<div class="ml-at"><h3>'+e(t("ad.ml.atts","Attachments"))+'</h3>'+m.attachments.map(function(a){return'<a class="ml-a" href="/api/admin/mail/attachments/'+a.id+'" download>'+A.icon(IC.clip,16)+'<span>'+e(a.filename||"file")+'</span><small>'+sz(a.size)+'</small></a>'}).join("")+'</div>';
 return h+'</article>'}
function bind(){
 var r=S.root,q=function(s){return r.querySelector(s)};
 r.querySelectorAll(".ml-b").forEach(function(b){b.onclick=function(){openBox(b.dataset.id)}});
 var a1=q("#mlAdd"),a2=q("#mlAdd2");if(a1)a1.onclick=boxForm;if(a2)a2.onclick=boxForm;
 var n=q("#mlNew");if(n)n.onclick=function(){compose()};
 var st=q("#mlSet");if(st)st.onclick=function(){boxForm(S.box)};
 r.querySelectorAll(".ml-tabs button").forEach(function(b){b.onclick=function(){S.folder=b.dataset.f;loadList()}});
 r.querySelectorAll(".ml-r").forEach(function(b){b.onclick=function(){openMsg(b.dataset.m)}});
 var bk=q("#mlBack");if(bk)bk.onclick=function(){S.msg=null;loadList()};
 var re=q("#mlRe");if(re)re.onclick=function(){compose(S.msg)};
 var dl=q("#mlDel");if(dl)dl.onclick=function(){var m=A.modal({title:t("ad.ml.del.t","Delete this message?"),desc:t("ad.ml.del.d","The message and its attachments will be removed for everyone."),actions:[{label:t("ad.ml.del","Delete"),cls:"pri",onClick:function(api,b){b.disabled=true;A.api("/admin/mail/messages/"+S.msg.id,{method:"DELETE"}).then(function(){api.close();S.msg=null;refreshBoxes().then(loadList)},function(x){b.disabled=false;A.toast(errMsg(x),"err")})}},{label:t("au.cancel","Cancel")}]})}}
function refreshBoxes(){return A.api("/admin/mail/boxes").then(function(d){S.boxes=d.items;S.can=d.can_manage;S.staff=d.staff||[];S.domain=d.domain;if(S.box){var f=S.boxes.filter(function(b){return b.id===S.box.id})[0];S.box=f||null}})}
function openBox(id){S.box=S.boxes.filter(function(b){return b.id===id})[0]||null;S.msg=null;S.folder="in";loadList()}
function loadList(){
 if(!S.box){paint();return}
 S.list=null;paint();
 A.api("/admin/mail/boxes/"+S.box.id+"/messages?folder="+S.folder).then(function(d){S.list=d.items;paint()},function(x){S.list=[];paint();A.toast(errMsg(x),"err")})}
function openMsg(id){A.api("/admin/mail/messages/"+id).then(function(m){S.msg=m;paint();refreshBoxes().then(function(){var c=S.root.querySelectorAll(".ml-b");c.forEach(function(el){})})},function(x){A.toast(errMsg(x),"err")})}
function boxForm(edit){
 var ed=edit&&edit.id?edit:null;
 var body=document.createElement("div");
 var kopts=KINDS.map(function(k){return'<option value="'+k+'"'+(ed&&ed.kind===k?" selected":"")+">"+e(kindLabel(k))+"</option>"}).join("");
 var staff=S.staff.map(function(u){var on=ed&&(ed.staff_ids||[]).indexOf(u.id)>=0;return'<label class="ml-ck"><input type="checkbox" value="'+u.id+'"'+(on?" checked":"")+'><span>'+e(u.name||u.email)+'<small>'+e(u.email)+'</small></span></label>'}).join("");
 body.innerHTML=(ed?"":'<label class="lab" for="mfL">'+e(t("ad.ml.local","Address"))+'</label><div class="ml-ad"><input class="fld" id="mfL" maxlength="40" autocomplete="off" placeholder="support"><span>@'+e(S.domain)+'</span></div>')+
 '<label class="lab" for="mfT">'+e(t("ad.ml.title","Name"))+'</label><input class="fld" id="mfT" maxlength="80" autocomplete="off" value="'+e(ed?ed.title:"")+'" placeholder="'+e(t("ad.ml.title.ph","Support"))+'">'+
 '<label class="lab" for="mfK">'+e(t("ad.ml.kind","Purpose"))+'</label><select class="fld" id="mfK">'+kopts+'</select>'+
 '<span class="lab">'+e(t("ad.ml.access","Who can read and reply"))+'</span><p class="dim ml-hint">'+e(t("ad.ml.access.d","Owner and director always have access."))+'</p><div class="ml-cks">'+staff+'</div>'+
 '<label class="ml-ck"><input type="checkbox" id="mfP"'+(ed&&ed.show_public?" checked":"")+'><span>'+e(t("ad.ml.public","Show on the site"))+'<small>'+e(t("ad.ml.public.d","In the footer and on the contacts page."))+'</small></span></label><p class="ferr" id="mfE" hidden></p>';
 var acts=[{label:ed?t("ad.ml.save","Save"):t("ad.ml.create","Create"),cls:"pri",onClick:function(api,b){
  var er=body.querySelector("#mfE");er.hidden=true;
  var ids=[].slice.call(body.querySelectorAll(".ml-cks input:checked")).map(function(x){return x.value});
  var pay={title:body.querySelector("#mfT").value,kind:body.querySelector("#mfK").value,staff_ids:ids,show_public:body.querySelector("#mfP").checked};
  if(!ed)pay.local=body.querySelector("#mfL").value;
  b.disabled=true;
  A.api(ed?"/admin/mail/boxes/"+ed.id:"/admin/mail/boxes",{method:ed?"PATCH":"POST",body:pay}).then(function(){api.close();refreshBoxes().then(function(){if(!ed&&!S.box&&S.boxes.length)S.box=null;if(S.box)loadList();else paint()})},function(x){b.disabled=false;er.textContent=errMsg(x);er.hidden=false})}}];
 if(ed)acts.push({label:t("ad.ml.rm","Delete address"),cls:"dng",onClick:function(api){api.close();var m=A.modal({title:t("ad.ml.rm.t","Delete this address?"),desc:t("ad.ml.rm.d","All its messages and attachments will be deleted permanently."),actions:[{label:t("ad.ml.rm","Delete address"),cls:"pri",onClick:function(a2,b2){b2.disabled=true;A.api("/admin/mail/boxes/"+ed.id,{method:"DELETE"}).then(function(){a2.close();S.box=null;S.msg=null;refreshBoxes().then(paint)},function(x){b2.disabled=false;A.toast(errMsg(x),"err")})}},{label:t("au.cancel","Cancel")}]})}});
 acts.push({label:t("au.cancel","Cancel")});
 A.modal({title:ed?t("ad.ml.edit","Address settings"):t("ad.ml.new","New address"),body:body,actions:acts})}
function compose(re){
 var body=document.createElement("div");var files=[];
 var to=re?re.from.replace(/^.*<([^>]+)>.*$/,"$1"):"";
 var sub=re?(/^re:/i.test(re.subject||"")?re.subject:"Re: "+(re.subject||"")):"";
 var quote=re?"\n\n"+t("ad.ml.quote","On {d}, {w} wrote:").replace("{d}",A.date(re.created_at)).replace("{w}",re.from)+"\n"+(re.text||"").split("\n").map(function(l){return"> "+l}).join("\n"):"";
 body.innerHTML='<div class="ml-fr"><span>'+e(t("ad.ml.fromf","From"))+'</span><b>'+e(S.box.address)+'</b></div><label class="lab" for="mcT">'+e(t("ad.ml.to","To"))+'</label><input class="fld" id="mcT" value="'+e(to)+'" autocomplete="off" placeholder="name@example.com"><label class="lab" for="mcS">'+e(t("ad.ml.subject","Subject"))+'</label><input class="fld" id="mcS" value="'+e(sub)+'" maxlength="300" autocomplete="off"><label class="lab" for="mcB">'+e(t("ad.ml.message","Message"))+'</label><textarea class="fld ta" id="mcB" rows="9">'+e(quote)+'</textarea><div class="ml-fl" id="mcF"></div><div class="ml-up"><label class="abtn" for="mcU">'+A.icon(IC.clip,16)+'<span>'+e(t("ad.ml.attach","Attach file"))+'</span></label><input type="file" id="mcU" multiple hidden><small>'+e(t("ad.ml.limit","Up to 10 MB in total"))+'</small></div><p class="ferr" id="mcE" hidden></p>';
 var tot=function(){return files.reduce(function(a,f){return a+f.size},0)};
 function fl(){var c=body.querySelector("#mcF");c.innerHTML=files.map(function(f,i){return'<span class="ml-chip">'+A.icon(IC.clip,14)+'<span>'+e(f.name)+'</span><small>'+sz(f.size)+'</small><button type="button" data-i="'+i+'" aria-label="'+e(t("ad.ml.del","Delete"))+'">'+A.icon('<path d="m6 6 12 12M18 6 6 18"/>',14)+'</button></span>'}).join("");c.querySelectorAll("button").forEach(function(b){b.onclick=function(){files.splice(+b.dataset.i,1);fl()}})}
 body.querySelector("#mcU").onchange=function(){var er=body.querySelector("#mcE");er.hidden=true;[].slice.call(this.files).forEach(function(f){if(tot()+f.size>10*1024*1024){er.textContent=errMsg({code:"too_large"});er.hidden=false;return}files.push(f)});this.value="";fl()};
 function b64(f){return new Promise(function(ok,no){var r=new FileReader();r.onload=function(){ok({filename:f.name,content_type:f.type||"application/octet-stream",data:String(r.result).split(",")[1]||""})};r.onerror=no;r.readAsDataURL(f)})}
 A.modal({title:re?t("ad.ml.reply","Reply"):t("ad.ml.write","Write"),wide:true,body:body,actions:[{label:t("ad.ml.send","Send"),cls:"pri",onClick:function(api,b){
  var er=body.querySelector("#mcE");er.hidden=true;b.disabled=true;
  Promise.all(files.map(b64)).then(function(at){return A.api("/admin/mail/boxes/"+S.box.id+"/send",{method:"POST",body:{to:body.querySelector("#mcT").value,subject:body.querySelector("#mcS").value,text:body.querySelector("#mcB").value,reply_to_id:re?re.id:undefined,attachments:at}})}).then(function(){api.close();A.toast(t("ad.ml.sent","Message sent"));if(re)S.msg=null;S.folder="out";loadList()},function(x){b.disabled=false;er.textContent=errMsg(x);er.hidden=false})}},{label:t("au.cancel","Cancel")}]})}
window.GSAdminMail={run:function(root,head){S.root=root;S.head=head;root.innerHTML=head()+A.loading();refreshBoxes().then(function(){if(S.boxes.length===1&&!S.box)S.box=S.boxes[0];if(S.box)loadList();else paint()},function(x){root.innerHTML=head()+A.failed(x,"mlRt");root.querySelector("#mlRt").onclick=function(){window.GSAdminMail.run(root,head)}})}};
})();
