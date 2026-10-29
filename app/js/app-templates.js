(function(){
var A=window.GSApp,G=window.GSTpl;if(!A||!G)return;
var T=A.t,E=A.esc,root,limit=0,rows0=[],q="",sort="recent",flt="all",view="grid";
var NEW="/app/templates/edit/";var TPAD='<style>html{background:#fff}body{margin:0!important;padding:40px 44px!important;box-sizing:border-box}</style>';
var SN={blank:["tp.s.blank","Blank","Start from an empty message."],welcome:["tp.s.welcome","Welcome","Greet new users with a button."],code:["tp.s.code","Verification code","Send a one-time code."],receipt:["tp.s.receipt","Receipt","Confirm a payment."]};
function head(sub){return '<div class="ph pgh"><div><h1>'+E(T("tp.h","Templates"))+'</h1>'+(sub?'<p class="psub">'+E(sub)+'</p>':'')+'</div><button type="button" class="abtn pri lg" id="tpNew">'+A.icon(A.IC.plus,16)+'<span>'+E(T("tp.new","New template"))+'</span></button></div>'}
function chooser(){
 var cards=Object.keys(SN).map(function(k){return '<a class="stc" href="'+NEW+'?new=1&s='+k+'"><b>'+E(T(SN[k][0],SN[k][1]))+'</b><span>'+E(T(SN[k][0]+".d",SN[k][2]))+'</span></a>'}).join("");
 A.modal({title:T("tp.choose","Start from"),wide:true,body:'<div class="stg">'+cards+'</div>',actions:[{label:T("app.close","Close")}]})}
function fit(){root.querySelectorAll(".tpaper").forEach(function(b){var f=b.firstElementChild;if(f)f.style.transform="scale("+(b.clientWidth/600)+")"})}
function card(t){
 var vars=t.variables.slice(0,4).map(function(v){return '<i class="vchip">'+E(v)+'</i>'}).join("")+(t.variables.length>4?'<i class="vchip">+'+(t.variables.length-4)+'</i>':'');
 return '<div class="tplc" data-id="'+t.id+'"><a class="tlink" href="'+NEW+'?id='+t.id+'" aria-label="'+E(t.name)+'"></a>'+(t.thumb?'<div class="tthumb"><div class="tpaper"><iframe sandbox="" tabindex="-1" loading="lazy" title="" srcdoc="'+E(TPAD+t.thumb)+'"></iframe></div></div>':'<div class="tthumb ph0">'+A.icon('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M9 9v11"/>',32)+'</div>')+'<div class="tinfo"><b>'+E(t.name)+'</b><span>'+E(t.subject||T("tp.nosubject","No subject"))+'</span><div class="tvars">'+vars+'</div><time>'+E(A.ago(t.updated_at))+(t.sent?' · <span class="tsent">'+E(A.plural(t.sent,"tp.sentn","Sent {n} times"))+'</span>':'')+'</time></div><div class="tact"><button type="button" class="app-ico tmore" data-more="'+t.id+'" aria-haspopup="menu" aria-expanded="false" aria-label="'+E(T("tp.m.open","Template actions"))+'">'+A.icon('<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>',16)+'</button></div></div>'}
function sorted(){
 var r=rows0.filter(function(t){var s=(t.name+" "+(t.subject||"")).toLowerCase();return (!q||s.indexOf(q)>=0)&&(flt==="all"||(flt==="used"?(t.sent||0)>0:!(t.sent||0)))});
 if(sort==="name")r.sort(function(a,b){return a.name.localeCompare(b.name)});
 else if(sort==="used")r.sort(function(a,b){return (b.sent||0)-(a.sent||0)||new Date(b.updated_at)-new Date(a.updated_at)});
 return r}
function bar(){return '<div class="tbar"><div class="tsearch">'+A.icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',16)+'<input id="tpQ" type="search" value="'+E(q)+'" placeholder="'+E(T("tp.search","Search templates"))+'" autocomplete="off" aria-label="'+E(T("tp.search","Search templates"))+'"></div><div class="sgc" id="tpS">'+[["recent",T("tp.sort.recent","Recent")],["name",T("tp.sort.name","Name")],["used",T("tp.sort.used","Most used")]].map(function(x){return '<button type="button" data-val="'+x[0]+'" class="'+(x[0]===sort?"on":"")+'">'+E(x[1])+'</button>'}).join("")+'</div><div class="tright"><span id="tpF"></span><div class="vtog" id="tpV"><button type="button" data-v="grid" class="'+(view==="grid"?"on":"")+'" aria-label="'+E(T("tp.v.grid","Grid view"))+'">'+A.icon('<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',16)+'</button><button type="button" data-v="list" class="'+(view==="list"?"on":"")+'" aria-label="'+E(T("tp.v.list","List view"))+'">'+A.icon('<path d="M4 6h16M4 12h16M4 18h16"/>',16)+'</button></div></div></div>'}
function grid(){var r=sorted();return r.length?'<div class="tgrid'+(view==="list"?" tlist":"")+'">'+r.map(card).join("")+'</div>':'<div class="emptyb" style="padding:40px;text-align:center;color:var(--a-tx2)">'+E(T("tp.nomatch","No templates match your search."))+'</div>'}
function byId(id){return rows0.filter(function(x){return x.id===id})[0]}
function doDup(id){A.api("/templates/"+id+"/duplicate",{method:"POST"}).then(function(){A.toast(T("tp.duped","Template duplicated"),"ok");load()},function(e){A.toast(e.code==="plan_limit"?T("tp.limit","You reached the template limit of your plan."):A.err(e),"err")})}
function doDel(id){A.modal({title:T("tp.del.t","Delete template"),desc:T("tp.del.d","This cannot be undone. Emails already sent are not affected."),actions:[{label:T("hp.cancel","Cancel")},{label:T("tp.del","Delete"),cls:"dng",onClick:function(api,btn){btn.disabled=true;A.api("/templates/"+id,{method:"DELETE"}).then(function(){api.close();A.toast(T("tp.deleted","Template deleted"),"ok");load()},function(e){btn.disabled=false;A.toast(A.err(e),"err")})}}]})}
function doRename(id){var t=byId(id);if(!t)return;
 var m=A.modal({title:T("tp.m.rn.t","Rename template"),body:'<label class="lab" for="tpRn">'+E(T("tp.m.rn.l","Name"))+'</label><input class="fld" id="tpRn" maxlength="80" autocomplete="off" value="'+E(t.name)+'">',actions:[{label:T("hp.cancel","Cancel")},{label:T("tp.m.rn.ok","Save"),cls:"pri",onClick:function(api,btn){var v=m.body.querySelector("#tpRn").value.trim();if(!v){m.body.querySelector("#tpRn").focus();return}if(v===t.name){api.close();return}btn.disabled=true;A.api("/templates/"+id,{method:"PATCH",body:{name:v}}).then(function(){api.close();A.toast(T("tp.m.renamed","Template renamed"),"ok");load()},function(e){btn.disabled=false;A.toast(A.err(e),"err")})}}]});
 var i=m.body.querySelector("#tpRn");i.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();var pb=m.el.querySelector(".ma .pri");if(pb)pb.click()}});i.select()}
function doDetails(id){var t=byId(id);if(!t)return;
 var row=function(k,v){return '<div class="dtr"><span>'+E(k)+'</span><b>'+v+'</b></div>'};
 var vars=t.variables.length?t.variables.map(function(v){return '<i class="vchip">'+E(v)+'</i>'}).join(" "):E(T("tp.m.none","None"));
 var m=A.modal({title:t.name,wide:false,body:'<div class="dtl">'+row(T("tp.m.d.id","Template ID"),'<code class="dtid">'+E(t.id)+'</code>')+row(T("tp.m.d.subject","Subject"),E(t.subject||T("tp.nosubject","No subject")))+row(T("tp.m.d.vars","Variables"),vars)+row(T("tp.m.d.sent","Emails sent"),String(t.sent||0))+row(T("tp.m.d.created","Created"),E(A.date?A.date(t.created_at):t.created_at))+row(T("tp.m.d.updated","Updated"),E(A.date?A.date(t.updated_at):t.updated_at))+'</div>',actions:[{label:T("app.close","Close")},{label:T("tp.m.edit","Edit template"),cls:"pri",onClick:function(){location.href=NEW+"?id="+id}}]});
 var c=m.body.querySelector(".dtid");if(c){c.setAttribute("role","button");c.setAttribute("tabindex","0");c.title=T("tp.m.copyid","Copy ID");c.onclick=function(){A.copy(t.id)}}}
var openMenu=null;
function closeMenu(){if(!openMenu)return;openMenu.el.remove();openMenu.btn.setAttribute("aria-expanded","false");openMenu=null;document.removeEventListener("mousedown",outside,true);document.removeEventListener("keydown",menuKey,true);window.removeEventListener("scroll",closeMenu,true);window.removeEventListener("resize",closeMenu)}
function outside(e){if(openMenu&&!openMenu.el.contains(e.target)&&!openMenu.btn.contains(e.target))closeMenu()}
function menuKey(e){if(!openMenu)return;var items=[].slice.call(openMenu.el.querySelectorAll("button"));var i=items.indexOf(document.activeElement);
 if(e.key==="Escape"){e.preventDefault();var b=openMenu.btn;closeMenu();b.focus()}
 else if(e.key==="ArrowDown"){e.preventDefault();items[(i+1)%items.length].focus()}
 else if(e.key==="ArrowUp"){e.preventDefault();items[(i<=0?items.length:i)-1].focus()}
 else if(e.key==="Tab")closeMenu()}
var MI={details:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.2M12 7.8v.2"/>',edit:'<path d="M5 19l1-4L16.5 4.5a2 2 0 0 1 3 3L9 18z"/><path d="M14.5 6.5l3 3"/>',rename:'<path d="M5 8V6h14v2M12 6v12M9 18h6"/>',dup:A.IC.copy,del:A.IC.trash};
function showMenu(btn){closeMenu();var id=btn.dataset.more;
 var defs=[["details",T("tp.m.details","View details")],["edit",T("tp.m.edit","Edit template")],["rename",T("tp.m.rename","Rename template")],["dup",T("tp.m.dup","Duplicate template")],["-"],["del",T("tp.m.del","Delete template"),"dng"]];
 var el=document.createElement("div");el.className="tmenu";el.setAttribute("role","menu");
 el.innerHTML=defs.map(function(d){return d[0]==="-"?'<hr>':'<button type="button" role="menuitem" data-a="'+d[0]+'" class="'+(d[2]||"")+'">'+A.icon(MI[d[0]],16)+'<span>'+E(d[1])+'</span></button>'}).join("");
 document.body.appendChild(el);
 var r=btn.getBoundingClientRect(),w=el.offsetWidth,h=el.offsetHeight;
 var left=Math.min(Math.max(8,r.right-w),window.innerWidth-w-8),top=r.bottom+6;if(top+h>window.innerHeight-8)top=Math.max(8,r.top-h-6);
 el.style.left=left+"px";el.style.top=top+"px";
 btn.setAttribute("aria-expanded","true");openMenu={el:el,btn:btn};
 el.onclick=function(e){var b=e.target.closest("button[data-a]");if(!b)return;var a=b.dataset.a;closeMenu();
  if(a==="details")doDetails(id);else if(a==="edit")location.href=NEW+"?id="+id;else if(a==="rename")doRename(id);else if(a==="dup")doDup(id);else if(a==="del")doDel(id)};
 document.addEventListener("mousedown",outside,true);document.addEventListener("keydown",menuKey,true);window.addEventListener("scroll",closeMenu,true);window.addEventListener("resize",closeMenu);
 var f=el.querySelector("button");if(f)f.focus()}
function wireCards(){fit();setTimeout(fit,300);
 root.querySelectorAll("[data-more]").forEach(function(b){b.onclick=function(e){e.preventDefault();e.stopPropagation();if(openMenu&&openMenu.btn===b){closeMenu();return}showMenu(b)}})}
function load(){
 root.innerHTML=head()+A.loading();
 Promise.all([A.api("/templates"),A.api("/usage")]).then(function(r){
  rows0=r[0];limit=(r[1].limits||{}).templates||0;
  var sub=A.plural(rows0.length,"tp.used","{n} templates")+(limit?" · "+T("tp.of","limit")+" "+limit:"");
  root.innerHTML=head(rows0.length?sub:"")+(rows0.length?bar()+'<div id="tpG">'+grid()+'</div>':A.empty(A.IC.tpl,T("tp.none","No templates yet"),T("tp.none.d","Save a message once and send it with a template id and variables."),'<button type="button" class="abtn pri lg" id="tpNew2">'+E(T("tp.new","New template"))+'</button>'));
  var n=document.getElementById("tpNew");if(n)n.onclick=chooser;var n2=document.getElementById("tpNew2");if(n2)n2.onclick=chooser;
  var qi=document.getElementById("tpQ");if(qi)qi.oninput=function(){q=qi.value.trim().toLowerCase();document.getElementById("tpG").innerHTML=grid();wireCards()};
  var fh=document.getElementById("tpF");if(fh)fh.appendChild(A.dropdown([["all",T("tp.f.all","All templates")],["used",T("tp.f.used","Sent at least once")],["unused",T("tp.f.unused","Never sent")]],flt,function(v){flt=v;document.getElementById("tpG").innerHTML=grid();wireCards()}));
  var vg=document.getElementById("tpV");if(vg)vg.onclick=function(e){var b=e.target.closest("button[data-v]");if(!b)return;view=b.dataset.v;vg.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});document.getElementById("tpG").innerHTML=grid();wireCards()};
  var sg=document.getElementById("tpS");if(sg)sg.onclick=function(e){var b=e.target.closest("button[data-val]");if(!b)return;sort=b.dataset.val;sg.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});document.getElementById("tpG").innerHTML=grid();wireCards()};
  wireCards()
 },function(x){root.innerHTML=head()+A.failed(x,"tpRetry");var b=document.getElementById("tpRetry");if(b)b.onclick=load})}
A.ready(function(){root=document.getElementById("tp-root");if(!root)return;window.addEventListener("resize",fit);load()});
})();
