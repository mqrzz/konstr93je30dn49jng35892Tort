(function(){
var A=window.GSApp,t=A.t,e=A.esc;
var IC={mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 5.5L20 8"/>',inbox:'<path d="M4 13.5 6.2 6.6A2 2 0 0 1 8.1 5.2h7.8a2 2 0 0 1 1.9 1.4L20 13.5"/><path d="M4 13.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.5h-4.2a1 1 0 0 0-.9.6 3.3 3.3 0 0 1-5.8 0 1 1 0 0 0-.9-.6Z"/>',plus:'<path d="M12 5v14M5 12h14"/>',reply:'<path d="M9 8 4 12.5 9 17"/><path d="M4 12.5h9a7 7 0 0 1 7 7"/>',clip:'<path d="m20 11-8.2 8.2a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.5a1.7 1.7 0 0 1-2.4-2.4L15 7"/>',trash:'<path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12"/>',back:'<path d="M15 5l-7 7 7 7"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',send:'<path d="M20 4 10 14M20 4l-6 16-4-6-6-4Z"/>',x:'<path d="m6 6 12 12M18 6 6 18"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>'};
var KINDS=["general","support","government","legal","press","security","billing","partnerships","advertising","careers","abuse","custom"];
var S={boxes:[],can:false,staff:[],domain:"",sel:"all",folder:"in",list:null,msg:null,mode:null,q:"",view:"list",root:null,head:null};
function kindLabel(k){return t("ad.ml.k."+k,k)}
function errMsg(x){var c=x&&x.code;var m={invalid_address:t("ad.ml.err.addr","Use letters, digits, dot, dash or underscore."),invalid_title:t("ad.ml.err.title","Enter a name."),exists:t("ad.ml.err.exists","This address already exists."),invalid_to:t("ad.ml.err.to","Check the recipient address."),empty:t("ad.ml.err.empty","The message is empty."),too_large:t("ad.ml.err.large","Attachments are larger than 10 MB."),attachment_blocked:t("ad.ml.err.att","This file type is not allowed."),send_failed:t("ad.ml.err.send","The message could not be sent. Try again.")}[c];return m||A.err(x)}
function sz(n){return n>1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB"}
function curBox(){return S.sel==="all"?null:S.boxes.filter(function(b){return b.id===S.sel})[0]||null}
function unreadAll(){return S.boxes.reduce(function(a,b){return a+(b.unread||0)},0)}
function side(){
 var h='<div class="ml-ph"><h2>'+e(t("ad.ml.boxes","Addresses"))+'</h2>'+(S.can?'<button type="button" class="abtn" id="mlAdd" aria-label="'+e(t("ad.ml.add","Add"))+'">'+A.icon(IC.plus,16)+'</button>':"")+'</div>';
 if(!S.boxes.length)return h+'<div class="ml-e"><span class="ml-ei">'+A.icon(IC.mail,24)+'</span><h3>'+e(t("ad.ml.noboxes","No addresses yet"))+'</h3><p>'+e(S.can?t("ad.ml.noboxes.d","Create the first organization address."):t("ad.ml.noboxes.d2","You have not been given access to any address yet."))+'</p>'+(S.can?'<button type="button" class="abtn pri" id="mlAdd2">'+e(t("ad.ml.add.first","Add address"))+'</button>':"")+'</div>';
 var all='<button type="button" class="ml-b'+(S.sel==="all"?" on":"")+'" data-id="all"><span class="ml-bi">'+A.icon(IC.inbox,16)+'</span><span class="ml-bt"><b>'+e(t("ad.ml.all","All inboxes"))+'</b></span>'+(unreadAll()?'<em>'+A.num(unreadAll())+'</em>':"")+'</button>';
 return h+'<div class="ml-bl">'+all+S.boxes.map(function(b){return'<button type="button" class="ml-b'+(S.sel===b.id?" on":"")+'" data-id="'+b.id+'"><span class="ml-bi">'+A.icon(IC.mail,16)+'</span><span class="ml-bt"><b>'+e(b.title)+'</b><small>'+e(b.address)+'</small></span>'+(b.unread?'<em>'+A.num(b.unread)+'</em>':"")+'</button>'}).join("")+'</div>'}
function listPane(){
 var b=curBox();
 var h='<div class="ml-ph"><button type="button" class="abtn ml-bk" id="mlBk1" aria-label="'+e(t("ad.ml.back","Back"))+'">'+A.icon(IC.back,16)+'</button><div class="ml-pt"><h2>'+e(b?b.title:t("ad.ml.all","All inboxes"))+'</h2>'+(b?'<span>'+e(b.address)+'</span>':"")+'</div><div class="ml-ma">'+(b&&S.can?'<button type="button" class="abtn" id="mlSet" aria-label="'+e(t("ad.ml.settings","Settings"))+'">'+A.icon(IC.gear,16)+'</button>':"")+'<button type="button" class="abtn pri" id="mlNew">'+A.icon(IC.plus,16)+'<span>'+e(t("ad.ml.write","Write"))+'</span></button></div></div>';
 h+='<div class="sgc ml-tabs"><button type="button" data-f="in" class="'+(S.folder==="in"?"on":"")+'">'+e(t("ad.ml.in","Inbox"))+'</button><button type="button" data-f="out" class="'+(S.folder==="out"?"on":"")+'">'+e(t("ad.ml.out","Sent"))+'</button></div>';
 h+='<label class="ml-sr">'+A.icon(IC.search,16)+'<input type="search" id="mlQ" value="'+e(S.q)+'" placeholder="'+e(t("ad.ml.search","Search messages"))+'" autocomplete="off"></label>';
 return h+'<div class="ml-lw" id="mlLW">'+listRows()+'</div>'}
function listRows(){
 if(S.list===null)return A.loading();
 var q=S.q.trim().toLowerCase();
 var rows=q?S.list.filter(function(m){return((m.subject||"")+" "+(m.preview||"")+" "+m.from_addr+" "+m.to_addrs).toLowerCase().indexOf(q)>=0}):S.list;
 if(!rows.length)return'<div class="ml-e"><span class="ml-ei">'+A.icon(IC.mail,24)+'</span><h3>'+e(q?t("ad.ml.nores","Nothing found"):S.folder==="in"?t("ad.ml.empty.in","No incoming mail"):t("ad.ml.empty.out","Nothing sent yet"))+'</h3>'+(q?"":'<p>'+e(S.folder==="in"?t("ad.ml.empty.in.d","Messages sent to this address will be listed here."):t("ad.ml.empty.out.d","Replies and new messages from this address will be listed here."))+'</p>')+'</div>';
 return'<div class="ml-l">'+rows.map(function(m){var who=S.folder==="in"?m.from_addr:m.to_addrs;return'<button type="button" class="ml-r'+(S.msg&&S.msg.id===m.id?" on":"")+(!m.read_at&&S.folder==="in"?" un":"")+'" data-m="'+m.id+'"><span class="ml-w">'+e(who)+'</span><time>'+e(A.ago(m.created_at))+'</time><span class="ml-s"><b>'+e(m.subject||t("ad.ml.nosub","(no subject)"))+'</b></span><span class="ml-pv">'+e(m.preview||"")+'</span>'+((S.sel==="all"&&m.box_title)?'<span class="ml-tg">'+e(m.box_title)+'</span>':"")+(m.atts?'<span class="ml-c">'+A.icon(IC.clip,14)+'</span>':"")+'</button>'}).join("")+'</div>'}
function readPane(){
 if(S.mode==="compose")return composePane();
 var m=S.msg;
 if(!m)return'<div class="ml-e ml-ph0"><span class="ml-ei">'+A.icon(IC.mail,24)+'</span><h3>'+e(t("ad.ml.sel","Select a message"))+'</h3><p>'+e(t("ad.ml.sel.d","It will open here, with the reply field under it."))+'</p></div>';
 var h='<div class="ml-ph"><button type="button" class="abtn ml-bk" id="mlBk2" aria-label="'+e(t("ad.ml.back","Back"))+'">'+A.icon(IC.back,16)+'</button><div class="ml-pt"><h2>'+e(m.subject||t("ad.ml.nosub","(no subject)"))+'</h2></div><div class="ml-ma"><button type="button" class="abtn" id="mlDel" aria-label="'+e(t("ad.ml.del","Delete"))+'">'+A.icon(IC.trash,16)+'</button></div></div>';
 h+='<div class="ml-sc"><dl class="ml-dl"><dt>'+e(t("ad.ml.from","From"))+'</dt><dd>'+e(m.from)+'</dd><dt>'+e(t("ad.ml.to","To"))+'</dt><dd>'+e(m.to)+'</dd><dt>'+e(t("ad.ml.date","Date"))+'</dt><dd>'+e(A.date(m.created_at))+'</dd></dl><pre class="ml-bd">'+e(m.text||"")+'</pre>';
 if(m.attachments&&m.attachments.length)h+='<div class="ml-at"><h3>'+e(t("ad.ml.atts","Attachments"))+'</h3>'+m.attachments.map(function(a){return'<a class="ml-a" href="/api/admin/mail/attachments/'+a.id+'" download>'+A.icon(IC.clip,16)+'<span>'+e(a.filename||"file")+'</span><small>'+sz(a.size)+'</small></a>'}).join("")+'</div>';
 h+='</div>';
 if(m.direction==="in")h+='<div class="ml-rp"><textarea id="mlRb" rows="1" placeholder="'+e(t("ad.ml.reply.ph","Write a reply…"))+'" aria-label="'+e(t("ad.ml.reply","Reply"))+'"></textarea><div class="ml-fl" id="mlRf"></div><div class="ml-rb"><label class="abtn" for="mlRu">'+A.icon(IC.clip,16)+'<span>'+e(t("ad.ml.attach","Attach file"))+'</span></label><input type="file" id="mlRu" multiple hidden><span class="ml-k">Ctrl Enter</span><button type="button" class="abtn pri" id="mlRs">'+A.icon(IC.send,16)+'<span>'+e(t("ad.ml.send","Send"))+'</span></button></div><p class="ferr" id="mlRe" hidden></p></div>';
 return h}
function composePane(){
 var b=curBox();
 var opts=S.boxes.map(function(x){return'<option value="'+x.id+'"'+(b&&b.id===x.id?" selected":"")+'>'+e(x.title)+" — "+e(x.address)+'</option>'}).join("");
 return'<div class="ml-ph"><button type="button" class="abtn ml-bk" id="mlBk2" aria-label="'+e(t("ad.ml.back","Back"))+'">'+A.icon(IC.back,16)+'</button><div class="ml-pt"><h2>'+e(t("ad.ml.write","Write"))+'</h2></div><div class="ml-ma"><button type="button" class="abtn" id="mlCx">'+A.icon(IC.x,16)+'<span>'+e(t("au.cancel","Cancel"))+'</span><span class="ml-k">Esc</span></button><button type="button" class="abtn pri" id="mlCs">'+A.icon(IC.send,16)+'<span>'+e(t("ad.ml.send","Send"))+'</span></button></div></div><div class="ml-sc ml-cf"><label class="ml-row"><span>'+e(t("ad.ml.fromf","From"))+'</span><select class="fld" id="mcF">'+opts+'</select></label><label class="ml-row"><span>'+e(t("ad.ml.to","To"))+'</span><input class="fld" id="mcT" autocomplete="off" placeholder="name@example.com"></label><label class="ml-row"><span>'+e(t("ad.ml.subject","Subject"))+'</span><input class="fld" id="mcS" maxlength="300" autocomplete="off"></label><textarea class="fld ml-ta" id="mcB" aria-label="'+e(t("ad.ml.message","Message"))+'"></textarea><div class="ml-fl" id="mcL"></div><div class="ml-rb"><label class="abtn" for="mcU">'+A.icon(IC.clip,16)+'<span>'+e(t("ad.ml.attach","Attach file"))+'</span></label><input type="file" id="mcU" multiple hidden><small>'+e(t("ad.ml.limit","Up to 10 MB in total"))+'</small></div><p class="ferr" id="mcE" hidden></p></div>'}
function paint(keep){
 var r=S.root,lw=r.querySelector(".ml-lw"),sc=lw?lw.scrollTop:0;
 r.innerHTML=S.head()+'<div class="ml" data-v="'+S.view+'"><aside class="ml-p ml-p1">'+side()+'</aside><section class="ml-p ml-p2">'+listPane()+'</section><section class="ml-p ml-p3">'+readPane()+'</section></div>';
 var n=r.querySelector(".ml-lw");if(n&&keep)n.scrollTop=sc;
 bind()}
function attachPicker(input,list,files,errEl){
 var tot=function(){return files.reduce(function(a,f){return a+f.size},0)};
 function draw(){list.innerHTML=files.map(function(f,i){return'<span class="ml-chip">'+A.icon(IC.clip,14)+'<span>'+e(f.name)+'</span><small>'+sz(f.size)+'</small><button type="button" data-i="'+i+'" aria-label="'+e(t("ad.ml.del","Delete"))+'">'+A.icon(IC.x,14)+'</button></span>'}).join("");list.querySelectorAll("button").forEach(function(b){b.onclick=function(){files.splice(+b.dataset.i,1);draw()}})}
 input.onchange=function(){errEl.hidden=true;[].slice.call(this.files).forEach(function(f){if(tot()+f.size>10*1024*1024){errEl.textContent=errMsg({code:"too_large"});errEl.hidden=false;return}files.push(f)});this.value="";draw()}}
function b64(f){return new Promise(function(ok,no){var r=new FileReader();r.onload=function(){ok({filename:f.name,content_type:f.type||"application/octet-stream",data:String(r.result).split(",")[1]||""})};r.onerror=no;r.readAsDataURL(f)})}
function bind(){
 var r=S.root,q=function(s){return r.querySelector(s)},on=function(s,f){var n=q(s);if(n)n.onclick=f};
 r.querySelectorAll(".ml-b").forEach(function(b){b.onclick=function(){S.sel=b.dataset.id;S.msg=null;S.mode=null;S.folder="in";S.q="";S.view="list";load()}});
 on("#mlAdd",function(){boxForm()});on("#mlAdd2",function(){boxForm()});
 on("#mlSet",function(){boxForm(curBox())});
 on("#mlNew",function(){S.mode="compose";S.msg=null;S.view="msg";paint(true);setTimeout(function(){var n=q("#mcT");if(n)n.focus()},50)});
 r.querySelectorAll(".ml-tabs button").forEach(function(b){b.onclick=function(){S.folder=b.dataset.f;S.msg=null;S.mode=null;S.view="list";load()}});
 var qi=q("#mlQ");if(qi)qi.oninput=function(){S.q=qi.value;var w=q("#mlLW");w.innerHTML=listRows();rowBind()};
 rowBind();
 on("#mlBk1",function(){S.view="boxes";paint(true)});
 on("#mlBk2",function(){S.view="list";S.mode=null;paint(true)});
 on("#mlCx",function(){S.mode=null;S.view="list";paint(true)});
 on("#mlDel",delMsg);
 if(S.mode==="compose")bindCompose();else if(S.msg)bindReply()}
function rowBind(){S.root.querySelectorAll(".ml-r").forEach(function(b){b.onclick=function(){openMsg(b.dataset.m)}})}
function bindReply(){
 var r=S.root,ta=r.querySelector("#mlRb");if(!ta)return;var files=[];
 var grow=function(){ta.style.height="auto";ta.style.height=Math.min(220,Math.max(44,ta.scrollHeight))+"px"};ta.oninput=grow;grow();
 attachPicker(r.querySelector("#mlRu"),r.querySelector("#mlRf"),files,r.querySelector("#mlRe"));
 var go=function(){
  var m=S.msg,er=r.querySelector("#mlRe"),btn=r.querySelector("#mlRs"),txt=ta.value.trim();er.hidden=true;
  if(!txt&&!files.length){er.textContent=errMsg({code:"empty"});er.hidden=false;return}
  var to=m.from.replace(/^.*<([^>]+)>.*$/,"$1"),sub=/^re:/i.test(m.subject||"")?m.subject:"Re: "+(m.subject||"");
  var quote="\n\n"+t("ad.ml.quote","On {d}, {w} wrote:").replace("{d}",A.date(m.created_at)).replace("{w}",m.from)+"\n"+(m.text||"").split("\n").map(function(l){return"> "+l}).join("\n");
  btn.disabled=true;
  Promise.all(files.map(b64)).then(function(at){return A.api("/admin/mail/boxes/"+m.mailbox.id+"/send",{method:"POST",body:{to:to,subject:sub,text:txt+quote,reply_to_id:m.id,attachments:at}})}).then(function(){A.toast(t("ad.ml.sent","Message sent"));ta.value="";files.length=0;r.querySelector("#mlRf").innerHTML="";grow();btn.disabled=false;refreshBoxes().then(function(){paint(true)})},function(x){btn.disabled=false;er.textContent=errMsg(x);er.hidden=false})};
 r.querySelector("#mlRs").onclick=go;
 ta.onkeydown=function(ev){if((ev.ctrlKey||ev.metaKey)&&ev.key==="Enter"){ev.preventDefault();go()}}}
function bindCompose(){
 var r=S.root,files=[];
 attachPicker(r.querySelector("#mcU"),r.querySelector("#mcL"),files,r.querySelector("#mcE"));
 var go=function(){
  var er=r.querySelector("#mcE");er.hidden=true;
  var bt=r.querySelector("#mlCs");bt.disabled=true;
  Promise.all(files.map(b64)).then(function(at){return A.api("/admin/mail/boxes/"+r.querySelector("#mcF").value+"/send",{method:"POST",body:{to:r.querySelector("#mcT").value,subject:r.querySelector("#mcS").value,text:r.querySelector("#mcB").value,attachments:at}})}).then(function(){A.toast(t("ad.ml.sent","Message sent"));S.mode=null;S.view="list";S.folder="out";load()},function(x){bt.disabled=false;er.textContent=errMsg(x);er.hidden=false})};
 r.querySelector("#mlCs").onclick=go;
 r.querySelector(".ml-cf").onkeydown=function(ev){if((ev.ctrlKey||ev.metaKey)&&ev.key==="Enter"){ev.preventDefault();go()}}}
function delMsg(){
 A.modal({title:t("ad.ml.del.t","Delete this message?"),desc:t("ad.ml.del.d","The message and its attachments will be removed for everyone."),actions:[{label:t("ad.ml.del","Delete"),cls:"pri",onClick:function(api,b){b.disabled=true;A.api("/admin/mail/messages/"+S.msg.id,{method:"DELETE"}).then(function(){api.close();S.msg=null;S.view="list";refreshBoxes().then(load)},function(x){b.disabled=false;A.toast(errMsg(x),"err")})}},{label:t("au.cancel","Cancel")}]})}
function refreshBoxes(){return A.api("/admin/mail/boxes").then(function(d){S.boxes=d.items;S.can=d.can_manage;S.staff=d.staff||[];S.domain=d.domain;if(S.sel!=="all"&&!curBox())S.sel="all"})}
function load(){
 S.list=null;paint();
 var u=S.sel==="all"?"/admin/mail/all?folder="+S.folder:"/admin/mail/boxes/"+S.sel+"/messages?folder="+S.folder;
 A.api(u).then(function(d){S.list=d.items;paint()},function(x){S.list=[];paint();A.toast(errMsg(x),"err")})}
function openMsg(id){
 A.api("/admin/mail/messages/"+id).then(function(m){S.msg=m;S.mode=null;S.view="msg";
  if(S.list)S.list.forEach(function(x){if(x.id===id)x.read_at=x.read_at||new Date().toISOString()});
  refreshBoxes().then(function(){paint(true)})},function(x){A.toast(errMsg(x),"err")})}
function boxForm(edit){
 var ed=edit&&edit.id?edit:null;
 var body=document.createElement("div");
 var kopts=KINDS.map(function(k){return'<option value="'+k+'"'+(ed?(ed.kind===k?" selected":""):(k==="general"?" selected":""))+">"+e(kindLabel(k))+"</option>"}).join("");
 var staff=S.staff.map(function(u){var on=ed&&(ed.staff_ids||[]).indexOf(u.id)>=0;return'<label class="ml-ck"><input type="checkbox" value="'+u.id+'"'+(on?" checked":"")+'><span>'+e(u.name||u.email)+'<small>'+e(u.email)+'</small></span></label>'}).join("");
 body.innerHTML=(ed?"":'<label class="lab" for="mfL">'+e(t("ad.ml.local","Address"))+'</label><div class="ml-ad"><input class="fld" id="mfL" maxlength="40" autocomplete="off" placeholder="partners"><span>@'+e(S.domain)+'</span></div>')+
 '<label class="lab" for="mfT">'+e(t("ad.ml.title","Name"))+'</label><input class="fld" id="mfT" maxlength="80" autocomplete="off" value="'+e(ed?ed.title:"")+'" placeholder="'+e(t("ad.ml.title.ph","Support"))+'">'+
 '<label class="lab" for="mfK">'+e(t("ad.ml.kind","Purpose"))+'</label><select class="fld" id="mfK">'+kopts+'</select>'+
 '<span class="lab">'+e(t("ad.ml.access","Who can read and reply"))+'</span><p class="dim ml-hint">'+e(t("ad.ml.access.d","Owner and director always have access."))+'</p><div class="ml-cks">'+staff+'</div>'+
 '<label class="ml-ck"><input type="checkbox" id="mfP"'+(ed?(ed.show_public?" checked":""):" checked")+'><span>'+e(t("ad.ml.public","Show on the site"))+'<small>'+e(t("ad.ml.public.d","In the footer and on the contacts page."))+'</small></span></label><p class="ferr" id="mfE" hidden></p>';
 var acts=[{label:ed?t("ad.ml.save","Save"):t("ad.ml.create","Create"),cls:"pri",onClick:function(api,b){
  var er=body.querySelector("#mfE");er.hidden=true;
  var ids=[].slice.call(body.querySelectorAll(".ml-cks input:checked")).map(function(x){return x.value});
  var pay={title:body.querySelector("#mfT").value,kind:body.querySelector("#mfK").value,staff_ids:ids,show_public:body.querySelector("#mfP").checked};
  if(!ed)pay.local=body.querySelector("#mfL").value;
  b.disabled=true;
  A.api(ed?"/admin/mail/boxes/"+ed.id:"/admin/mail/boxes",{method:ed?"PATCH":"POST",body:pay}).then(function(){api.close();refreshBoxes().then(load)},function(x){b.disabled=false;er.textContent=errMsg(x);er.hidden=false})}}];
 if(ed)acts.push({label:t("ad.ml.rm","Delete address"),cls:"dng",onClick:function(api){api.close();A.modal({title:t("ad.ml.rm.t","Delete this address?"),desc:t("ad.ml.rm.d","All its messages and attachments will be deleted permanently."),actions:[{label:t("ad.ml.rm","Delete address"),cls:"pri",onClick:function(a2,b2){b2.disabled=true;A.api("/admin/mail/boxes/"+ed.id,{method:"DELETE"}).then(function(){a2.close();S.sel="all";S.msg=null;refreshBoxes().then(load)},function(x){b2.disabled=false;A.toast(errMsg(x),"err")})}},{label:t("au.cancel","Cancel")}]})}});
 acts.push({label:t("au.cancel","Cancel")});
 A.modal({title:ed?t("ad.ml.edit","Address settings"):t("ad.ml.new","New address"),body:body,actions:acts})}
document.addEventListener("keydown",function(ev){if(ev.key==="Escape"&&S.mode==="compose"&&S.root&&S.root.querySelector("#mlCx")&&!document.querySelector(".gm")){S.mode=null;S.view="list";paint(true)}});
window.GSAdminMail={run:function(root,head){S.root=root;S.head=head;S.view="list";root.innerHTML=head()+A.loading();refreshBoxes().then(function(){load()},function(x){root.innerHTML=head()+A.failed(x,"mlRt");root.querySelector("#mlRt").onclick=function(){window.GSAdminMail.run(root,head)}})}};
})();
