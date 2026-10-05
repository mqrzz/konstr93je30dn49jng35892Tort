(function(){
var A=window.GSApp,G=window.GSTpl;if(!A||!G)return;
var T=A.t,E=A.esc,root;
var LIST="/app/templates/";
var st={id:null,name:"",subject:"",kind:"blocks",doc:{style:G.defaultStyle(),blocks:[]},html:"",text:"",mode:"blocks",open:0,vals:{},device:"desktop",pane:"edit",dirty:false,saving:false};
var BN={heading:["tp.b.heading","Heading"],text:["tp.b.text","Text"],button:["tp.b.button","Button"],image:["tp.b.image","Image"],code:["tp.b.code","Code"],divider:["tp.b.divider","Divider"],spacer:["tp.b.spacer","Spacer"],footer:["tp.b.footer","Footer"]};
var BI={heading:'<path d="M5 5v14M19 5v14M5 12h14"/>',text:'<path d="M4 6h16M4 12h16M4 18h10"/>',button:'<rect x="3" y="8" width="18" height="8" rx="4"/>',image:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/>',code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>',divider:'<path d="M4 12h16"/>',spacer:'<path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4"/>',footer:'<path d="M4 18h16M7 14h10"/>'};
function bn(t){return T(BN[t][0],BN[t][1])}
function summary(b){var s=b.text||b.label||b.alt||(b.type==="image"?b.url:"")||"";return String(s).replace(/\s+/g," ").slice(0,48)}
function currentHtml(){return st.kind==="blocks"?G.build(st.doc):st.html}
function allVars(){return G.vars(st.subject,currentHtml(),st.text)}
function vals(){var o={};allVars().forEach(function(k){o[k]=st.vals[k]||""});return o}
function dirty(){st.dirty=true;var b=document.getElementById("edSave");if(b)b.classList.add("dot")}
var pt;
function schedule(){clearTimeout(pt);pt=setTimeout(preview,160)}
function preview(){
 var f=document.getElementById("edFrame");if(!f)return;
 var v=vals(),h=G.render(currentHtml(),v,true,true);
 f.srcdoc=h;
 var sb=document.getElementById("edSubj");if(sb)sb.textContent=G.render(st.subject,v,false,true)||T("tp.nosubject","No subject");
 paintVars()}
function paintVars(){
 var box=document.getElementById("edVars");if(!box)return;
 var ks=allVars();
 if(box.dataset.k===ks.join(",")&&box.children.length)return;
 box.dataset.k=ks.join(",");
 box.innerHTML=ks.length?ks.map(function(k){return '<label class="vrow"><span class="mono">'+E(k)+'</span><input data-v="'+E(k)+'" value="'+E(st.vals[k]||"")+'" placeholder="'+E(T("tp.sample","Sample value"))+'" autocomplete="off"></label>'}).join(""):'<p class="vhint">'+E(T("tp.novars","Type {{name}} in the subject or text to add a variable."))+'</p>'}
function fld(label,id,val,extra){return '<div class="pfld"><label for="'+id+'">'+E(label)+'</label><input id="'+id+'" value="'+E(val)+'" '+(extra||"")+' autocomplete="off"></div>'}
function seg(name,opts,val){return '<div class="seg2" data-seg="'+name+'">'+opts.map(function(o){return '<button type="button" data-val="'+o[0]+'" class="'+(String(o[0])===String(val)?"on":"")+'">'+E(o[1])+'</button>'}).join("")+'</div>'}
function blockFields(b,i){
 var out="";
 if(b.type==="heading"||b.type==="text"||b.type==="footer"||b.type==="code")out+='<div class="pfld"><label>'+E(T("tp.f.text","Text"))+'</label><textarea data-f="text" rows="'+(b.type==="text"?4:2)+'">'+E(b.text)+'</textarea></div>';
 if(b.type==="button")out+='<div class="pfld"><label>'+E(T("tp.f.label","Label"))+'</label><input data-f="label" value="'+E(b.label)+'" autocomplete="off"></div><div class="pfld"><label>'+E(T("tp.f.url","Link"))+'</label><input data-f="url" value="'+E(b.url)+'" autocomplete="off" inputmode="url"></div>';
 if(b.type==="image")out+='<div class="pfld"><label>'+E(T("tp.f.imgurl","Image address"))+'</label><input data-f="url" value="'+E(b.url)+'" autocomplete="off" inputmode="url"></div><div class="pfld"><label>'+E(T("tp.f.alt","Description"))+'</label><input data-f="alt" value="'+E(b.alt)+'" autocomplete="off"></div>';
 if(b.type==="heading"||b.type==="text"||b.type==="button")out+='<div class="pfld"><label>'+E(T("tp.f.align","Alignment"))+'</label>'+seg("align",[["left",T("tp.al.left","Left")],["center",T("tp.al.center","Center")]],b.align||"left")+'</div>';
 if(b.type==="spacer")out+='<div class="pfld"><label>'+E(T("tp.f.height","Height"))+'</label>'+seg("height",[[16,"16"],[24,"24"],[48,"48"],[72,"72"]],b.height)+'</div>';
 if(b.type==="divider")out+='<p class="vhint">'+E(T("tp.divhint","A thin line between sections."))+'</p>';
 return out}
function blocksPane(){
 if(st.kind!=="blocks")return '<div class="emptyb ed-note"><p>'+E(T("tp.custom","This template uses custom HTML, so the block editor is off."))+'</p><button type="button" class="abtn" id="edToBlocks">'+E(T("tp.toblocks","Start over with blocks"))+'</button></div>';
 var list=st.doc.blocks.map(function(b,i){
  var on=st.open===i;
  return '<div class="blk'+(on?" on":"")+'" data-i="'+i+'"><div class="ebh"><button type="button" class="bt" data-act="open" aria-expanded="'+on+'">'+A.icon(BI[b.type],16)+'<b>'+E(bn(b.type))+'</b><span>'+E(summary(b))+'</span></button><div class="bx"><button type="button" class="app-ico" data-act="up" aria-label="'+E(T("tp.up","Move up"))+'"'+(i===0?" disabled":"")+'>'+A.icon('<path d="m6 15 6-6 6 6"/>',16)+'</button><button type="button" class="app-ico" data-act="down" aria-label="'+E(T("tp.down","Move down"))+'"'+(i===st.doc.blocks.length-1?" disabled":"")+'>'+A.icon('<path d="m6 9 6 6 6-6"/>',16)+'</button><button type="button" class="app-ico dng" data-act="rm" aria-label="'+E(T("tp.del","Delete"))+'">'+A.icon(A.IC.trash,16)+'</button></div></div>'+(on?'<div class="bb">'+blockFields(b,i)+'</div>':"")+'</div>'}).join("");
 var add=G.TYPES.map(function(t){return '<button type="button" class="addb" data-add="'+t+'">'+A.icon(BI[t],16)+'<span>'+E(bn(t))+'</span></button>'}).join("");
 var sty=st.doc.style;
 var look='<div class="stylebox"><div class="pfld"><label>'+E(T("tp.accent","Accent colour"))+'</label><div class="sw" data-sw>'+G.ACCENTS.map(function(c){return '<button type="button" data-c="'+c+'" class="'+(c===sty.accent?"on":"")+'" style="--c:'+c+'" aria-label="'+c+'"></button>'}).join("")+'</div></div><div class="pfld"><label>'+E(T("tp.font","Font"))+'</label>'+seg("font",[["sans",T("tp.sans","Sans")],["serif",T("tp.serif","Serif")]],sty.font)+'</div><div class="pfld"><label>'+E(T("tp.bg","Background"))+'</label>'+seg("bg",[["soft",T("tp.bg.soft","Soft")],["white",T("tp.bg.white","White")]],sty.bg)+'</div></div>';
 return '<div class="blks">'+list+'</div><div class="pfld"><label>'+E(T("tp.addblock","Add a block"))+'</label><div class="addg">'+add+'</div></div><div class="pfld"><label>'+E(T("tp.look","Look"))+'</label>'+look+'</div>'}
function htmlPane(){
 if(st.kind==="blocks")return '<div class="emptyb ed-note"><p>'+E(T("tp.htmlnote","This HTML is generated from your blocks. Edit it by hand only if you need full control, then the block editor turns off."))+'</p><button type="button" class="abtn" id="edToHtml">'+E(T("tp.edithtml","Edit as HTML"))+'</button></div><textarea class="ecode" readonly rows="14" aria-label="HTML">'+E(G.build(st.doc))+'</textarea>';
 return '<textarea class="ecode" id="edHtml" rows="22" spellcheck="false" aria-label="HTML">'+E(st.html)+'</textarea>'}
function textPane(){return '<p class="vhint" style="margin-bottom:10px">'+E(T("tp.textnote","Plain-text version. Leave empty and it is generated from the HTML."))+'</p><textarea class="ecode" id="edText" rows="14" spellcheck="false" aria-label="Text">'+E(st.text)+'</textarea>'}
function left(){
 var tabs=[["blocks",T("tp.tab.blocks","Blocks")],["html","HTML"],["text",T("tp.tab.text","Text")]];
 return fld(T("tp.f.name","Name"),"edName",st.name,'maxlength="80"')+fld(T("tp.f.subject","Subject"),"edSubject",st.subject,'maxlength="300"')+'<div class="seg2 tabs3" data-seg="mode">'+tabs.map(function(x){return '<button type="button" data-val="'+x[0]+'" class="'+(st.mode===x[0]?"on":"")+'">'+E(x[1])+'</button>'}).join("")+'</div><div class="edpane" id="edPane">'+(st.mode==="blocks"?blocksPane():st.mode==="html"?htmlPane():textPane())+'</div>'}
function right(){
 return '<div class="pvh"><div class="pvs"><span>'+E(T("tp.subjectlabel","Subject"))+'</span><b id="edSubj"></b></div>'+seg("device",[["desktop",T("tp.desktop","Desktop")],["mobile",T("tp.mobile","Mobile")]],st.device)+'</div><div class="pvf '+st.device+'" id="edWrap"><iframe id="edFrame" sandbox="" title="'+E(T("tp.preview","Preview"))+'"></iframe></div><div class="ucard vcard"><h3>'+E(T("tp.vars","Variables"))+'</h3><p class="vhint">'+E(T("tp.varsd","Sample values are used in the preview and in test emails."))+'</p><div id="edVars"></div></div>'}
function paintAll(){
 root.querySelector("#edL").innerHTML=left();root.querySelector("#edR").innerHTML=right();
 root.querySelector(".edt").dataset.pane=st.pane;
 root.querySelectorAll(".pane-tabs button").forEach(function(b){b.classList.toggle("on",b.dataset.val===st.pane)});
 preview()}
function paintPane(){root.querySelector("#edPane").innerHTML=st.mode==="blocks"?blocksPane():st.mode==="html"?htmlPane():textPane();var t=root.querySelectorAll('[data-seg="mode"] button');t.forEach(function(b){b.classList.toggle("on",b.dataset.val===st.mode)})}
function payload(){return{name:st.name.trim(),subject:st.subject,html:currentHtml(),text:st.text}}
function save(){
 if(st.saving)return;
 if(!st.name.trim()){A.toast(T("tp.err.name","Give the template a name."),"err");var n=document.getElementById("edName");if(n)n.focus();return}
 st.saving=true;var b=document.getElementById("edSave");if(b)b.disabled=true;
 var req=st.id?A.api("/templates/"+st.id,{method:"PATCH",body:payload()}):A.api("/templates",{method:"POST",body:payload()});
 req.then(function(r){
  var first=!st.id;st.id=r.id;st.dirty=false;
  if(first)history.replaceState(null,"",location.pathname+"?id="+r.id);
  A.toast(T("ac.saved","Saved"),"ok");paintTop()
 },function(e){A.toast(e.code==="plan_limit"?T("tp.limit","You reached the template limit of your plan."):e.code==="template_too_large"?T("tp.toolarge","The template is too large."):A.err(e),"err")}).then(function(){st.saving=false;var b2=document.getElementById("edSave");if(b2){b2.disabled=false;if(!st.dirty)b2.classList.remove("dot")}})}
function sendTest(){
 if(!st.id&&st.dirty){A.toast(T("tp.savefirst","Save the template first."),"err");return}
 var box=document.createElement("div");box.innerHTML='<div class="pfld"><label for="tsFrom">'+E(T("tp.from","From"))+'</label><input id="tsFrom" autocomplete="off" placeholder="Name <hello@yourdomain.com>"></div><p class="vhint" id="tsHint">'+E(T("tp.fromhint","The sender must belong to a verified domain or your Geserd subdomain."))+'</p><div class="chips2" id="tsChips"></div>';
 var m=A.modal({title:T("tp.sendtest","Send a test"),desc:T("tp.sendtest.d","The email goes to the address of your account."),body:box,actions:[{label:T("hp.cancel","Cancel")},{label:T("hp.send","Send"),cls:"pri",onClick:function(api,btn){
  var from=api.el.querySelector("#tsFrom").value.trim();if(!from){A.toast(T("tp.err.from","Enter a sender address."),"err");return}
  var v=vals();allVars().forEach(function(k){if(!v[k])v[k]="["+k+"]"});
  btn.disabled=true;var p=payload();
  A.api("/templates/test",{method:"POST",body:{from:from,subject:p.subject,html:p.html,text:p.text,variables:v}}).then(function(r){api.close();A.toast(T("tp.sent","Test sent to")+" "+r.to,"ok")},function(e){btn.disabled=false;A.toast(e.code==="domain_not_verified"?T("tp.err.domain","This sender domain is not verified."):A.err(e),"err")})}}]});
 Promise.all([A.api("/domains").catch(function(){return[]}),A.api("/subdomain").catch(function(){return{}})]).then(function(r){
  var opts=[];(r[0]||[]).filter(function(d){return d.status==="verified"}).forEach(function(d){opts.push("hello@"+d.name)});
  if(r[1]&&r[1].slug&&r[1].base)opts.push("hello@"+r[1].slug+"."+r[1].base);
  var c=m.el.querySelector("#tsChips");if(!opts.length){m.el.querySelector("#tsHint").innerHTML=E(T("tp.nodomain","You have no verified domain yet."))+' <a href="/app/domains/">'+E(T("tp.adddomain","Add a domain"))+'</a>';return}
  c.innerHTML=opts.map(function(o){return '<button type="button" data-o="'+E(o)+'">'+E(o)+'</button>'}).join("");
  var inp=m.el.querySelector("#tsFrom");if(!inp.value)inp.value=opts[0];
  c.onclick=function(e){var b=e.target.closest("button[data-o]");if(b)inp.value=b.dataset.o}})}
function remove(){
 A.modal({title:T("tp.del.t","Delete template"),desc:T("tp.del.d","This cannot be undone. Emails already sent are not affected."),actions:[{label:T("hp.cancel","Cancel")},{label:T("tp.del","Delete"),cls:"dng",onClick:function(api,btn){btn.disabled=true;A.api("/templates/"+st.id,{method:"DELETE"}).then(function(){st.dirty=false;location.href=LIST},function(e){btn.disabled=false;A.toast(A.err(e),"err")})}}]})}
function paintTop(){
 var top=document.getElementById("edTop");
 top.innerHTML='<div class="edh"><a class="backlnk" href="'+LIST+'">'+A.icon(A.IC.back,16)+'<span>'+E(T("tp.back","All templates"))+'</span></a><div class="edact">'+(st.id?'<button type="button" class="app-ico dng" id="edDel" aria-label="'+E(T("tp.del","Delete"))+'">'+A.icon(A.IC.trash,16)+'</button>':'')+'<button type="button" class="abtn lg" id="edTest">'+E(T("tp.sendtest","Send a test"))+'</button><button type="button" class="abtn pri lg'+(st.dirty?" dot":"")+'" id="edSave">'+E(T("ac.save","Save"))+'</button></div></div><div class="seg2 pane-tabs" data-seg="pane"><button type="button" data-val="edit" class="'+(st.pane==="edit"?"on":"")+'">'+E(T("tp.pane.edit","Edit"))+'</button><button type="button" data-val="view" class="'+(st.pane==="view"?"on":"")+'">'+E(T("tp.preview","Preview"))+'</button></div>';
 document.getElementById("edSave").onclick=save;document.getElementById("edTest").onclick=sendTest;
 var d=document.getElementById("edDel");if(d)d.onclick=remove}
function reorder(i,d){var a=st.doc.blocks,j=i+d;if(j<0||j>=a.length)return;var x=a[i];a[i]=a[j];a[j]=x;st.open=j}
function wire(){
 root.addEventListener("input",function(e){
  var t=e.target;
  if(t.id==="edName"){st.name=t.value;dirty();return}
  if(t.id==="edSubject"){st.subject=t.value;dirty();schedule();return}
  if(t.id==="edHtml"){st.html=t.value;dirty();schedule();return}
  if(t.id==="edText"){st.text=t.value;dirty();return}
  if(t.dataset.v){st.vals[t.dataset.v]=t.value;schedule();return}
  if(t.dataset.f){var b=root.querySelector(".blk.on");if(!b)return;var i=+b.dataset.i;st.doc.blocks[i][t.dataset.f]=t.value;var s=b.querySelector(".bt span");if(s)s.textContent=summary(st.doc.blocks[i]);dirty();schedule()}});
 root.addEventListener("click",function(e){
  var t=e.target;
  var sg=t.closest("[data-seg] button");
  if(sg){var grp=sg.parentNode.dataset.seg,v=sg.dataset.val;
   if(grp==="mode"){st.mode=v;paintPane();return}
   if(grp==="pane"){st.pane=v;root.querySelector(".edt").dataset.pane=v;root.querySelectorAll(".pane-tabs button").forEach(function(b){b.classList.toggle("on",b.dataset.val===v)});return}
   if(grp==="device"){st.device=v;document.getElementById("edWrap").className="pvf "+v;sg.parentNode.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b===sg)});return}
   if(grp==="font"||grp==="bg"){st.doc.style[grp]=v;dirty();sg.parentNode.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b===sg)});schedule();return}
   var blk=sg.closest(".blk");if(blk&&(grp==="align"||grp==="height")){var i=+blk.dataset.i;st.doc.blocks[i][grp]=grp==="height"?+v:v;dirty();sg.parentNode.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b===sg)});schedule();return}}
  var sw=t.closest("[data-sw] button");if(sw){st.doc.style.accent=sw.dataset.c;dirty();sw.parentNode.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b===sw)});schedule();return}
  var ad=t.closest("[data-add]");if(ad){st.doc.blocks.push(G.defaults(ad.dataset.add));st.open=st.doc.blocks.length-1;dirty();paintPane();schedule();return}
  var ac=t.closest("[data-act]");if(ac){var blk2=ac.closest(".blk"),i2=+blk2.dataset.i,a=ac.dataset.act;
   if(a==="open")st.open=st.open===i2?-1:i2;
   else if(a==="up")reorder(i2,-1);else if(a==="down")reorder(i2,1);
   else if(a==="rm"){st.doc.blocks.splice(i2,1);st.open=Math.min(st.open,st.doc.blocks.length-1)}
   if(a!=="open")dirty();paintPane();if(a!=="open")schedule();return}
  if(t.id==="edToHtml"||t.closest("#edToHtml")){A.modal({title:T("tp.edithtml","Edit as HTML"),desc:T("tp.edithtml.d","The block editor will be turned off for this template."),actions:[{label:T("hp.cancel","Cancel")},{label:T("tp.edithtml.ok","Continue"),cls:"pri",onClick:function(api){st.html=G.build(st.doc);st.kind="html";dirty();api.close();paintPane()}}]});return}
  if(t.id==="edToBlocks"||t.closest("#edToBlocks")){A.modal({title:T("tp.toblocks","Start over with blocks"),desc:T("tp.toblocks.d","Your HTML will be replaced by a blank block layout."),actions:[{label:T("hp.cancel","Cancel")},{label:T("tp.edithtml.ok","Continue"),cls:"dng",onClick:function(api){st.kind="blocks";st.doc={style:G.defaultStyle(),blocks:G.starter("blank",A.lang()).blocks};st.open=0;dirty();api.close();paintPane();schedule()}}]});return}});
 window.addEventListener("beforeunload",function(e){if(st.dirty){e.preventDefault();e.returnValue=""}})}
function boot(t){
 if(t){st.id=t.id;st.name=t.name;st.subject=t.subject;st.text=t.text||"";var p=G.parse(t.html);
  if(p){st.kind="blocks";st.doc=p}else{st.kind=t.html?"html":"blocks";st.html=t.html||"";if(!t.html)st.doc={style:G.defaultStyle(),blocks:G.starter("blank",A.lang()).blocks}}}
 else{var k=new URLSearchParams(location.search).get("s"),s=G.starter(k,A.lang());st.doc={style:G.defaultStyle(),blocks:s.blocks};st.subject=s.subject;st.name=k&&G.STARTERS[k]&&k!=="blank"?T("tp.s."+k,k.charAt(0).toUpperCase()+k.slice(1)):""}
 root.innerHTML='<div id="edTop"></div><div class="edt" data-pane="edit"><div class="edl ucard" id="edL"></div><div class="edr" id="edR"></div></div>';
 paintTop();paintAll();wire()}
A.ready(function(){root=document.getElementById("ed-root");if(!root)return;
 var q=new URLSearchParams(location.search),id=q.get("id");
 if(id&&/^[0-9a-f-]{36}$/i.test(id)){root.innerHTML=A.loading();A.api("/templates/"+id).then(boot,function(x){if(x&&x.status===404){location.replace(LIST);return}root.innerHTML=A.failed(x,"edRetry");var b=document.getElementById("edRetry");if(b)b.onclick=function(){location.reload()}})}
 else boot(null)});
})();
