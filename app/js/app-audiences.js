(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,id=new URLSearchParams(location.search).get("id"),st={q:"",status:"all",segment:"",offset:0},tab=(location.hash||"#contacts").slice(1),cache={},cmap={},LIM=25,timer;
function ico(n){return A.icon(A.IC[n],16)}
function err(x){var c=x&&x.code,k="au.err."+c;var m=A.t(k,"");if(m)return m;return A.err(x)}
function headList(sub){return'<div class="ph pgh"><div><h1>'+e(t("aud.t","Audiences"))+"</h1>"+(sub?'<p class="psub">'+e(sub)+"</p>":"")+'</div><button type="button" class="abtn lg pri" id="aNew">'+ico("plus")+"<span>"+e(t("aud.new","Create audience"))+"</span></button></div>"}
function loadList(){
 root.innerHTML=headList()+A.loading();bindNew();
 A.api("/audiences").then(drawList,function(x){root.innerHTML=headList()+A.failed(x,"aRetry");bindNew();var b=document.getElementById("aRetry");if(b)b.onclick=loadList})
}
function lim(n){return n?A.num(n):t("au.unlimited","Unlimited")}
function drawList(d){
 var sub=t("aud.count","{a} of {b} audiences · {c} of {d} contacts",{a:A.num(d.used.audiences),b:lim(d.limits.audiences),c:A.num(d.used.contacts),d:lim(d.limits.contacts)});
 var body,cols="--cols:minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.1fr) 40px";
 if(!d.data.length)body=A.empty(A.IC.aud,t("aud.h","No audiences yet"),t("aud.p","An audience is a list of contacts you send broadcasts to. Create one, then add contacts by pasting emails or importing a CSV file."),'<button type="button" class="abtn lg pri" data-new>'+e(t("aud.new","Create audience"))+"</button>");
 else body='<div class="dl auds"><div class="drow dhead" style="'+cols+'"><div>'+e(t("aud.c.name","Name"))+"</div><div>"+e(t("aud.c.contacts","Contacts"))+"</div><div>"+e(t("aud.c.unsub","Unsubscribed"))+"</div><div>"+e(t("au.k.created","Created"))+"</div><div></div></div>"+
 d.data.map(function(a){return'<div class="drow link" style="'+cols+'" data-go="'+e(a.id)+'"><div class="c strong" data-l="'+e(t("aud.c.name","Name"))+'">'+e(a.name)+'</div><div class="c msub">'+e(A.num(a.contacts)+" "+t("aud.m.contacts","contacts")+" · "+A.date(a.created_at).replace(/,?\s*\d{1,2}:\d{2}.*$/,""))+'</div><div class="c" data-l="'+e(t("aud.c.contacts","Contacts"))+'">'+A.num(a.contacts)+'</div><div class="c dim" data-l="'+e(t("aud.c.unsub","Unsubscribed"))+'">'+A.num(a.unsubscribed)+'</div><div class="c dim" data-l="'+e(t("au.k.created","Created"))+'">'+e(A.date(a.created_at))+'</div><div class="c end"><button type="button" class="app-ico" data-am="'+e(a.id)+'" aria-haspopup="menu" aria-expanded="false" aria-label="'+e(t("tp.m.open","Actions"))+'">'+A.icon('<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>',16)+"</button></div></div>"}).join("")+"</div>";
 root.innerHTML=headList(sub)+body;bindNew();
 root.querySelectorAll("[data-go]").forEach(function(r){r.onclick=function(ev){if(ev.target.closest("[data-am]"))return;location.href="/app/audiences/view/?id="+r.dataset.go}});
 root.querySelectorAll("[data-am]").forEach(function(b){b.onclick=function(ev){ev.stopPropagation();var aid=b.dataset.am,x=d.data.filter(function(z){return z.id===aid})[0];if(!x)return;
  A.menu(b,[{label:t("aud.open","Open"),icon:'<path d="M4 6h16M4 12h16M4 18h10"/>',fn:function(){location.href="/app/audiences/view/?id="+aid}},
  {label:t("aud.rename","Rename"),icon:'<path d="M5 19l1-4L16.5 4.5a2 2 0 0 1 3 3L9 18z"/><path d="M14.5 6.5l3 3"/>',fn:function(){nameModal({title:t("aud.rename","Rename"),label:t("aud.c.name","Name"),value:x.name,go:t("aud.save","Save"),run:function(v){return A.api("/audiences/"+encodeURIComponent(aid),{method:"PATCH",body:{name:v}}).then(function(){loadList()})}})}},
  "-",{label:t("aud.del","Delete audience"),icon:A.IC.trash,cls:"dng",fn:function(){A.modal({title:t("aud.del.t","Delete audience"),desc:t("aud.del.d","The audience and all its contacts will be deleted. Broadcasts already sent keep their history."),actions:[{label:t("au.cancel","Cancel")},{label:t("aud.del","Delete audience"),cls:"dng",onClick:function(mm,bb){bb.disabled=true;A.api("/audiences/"+encodeURIComponent(aid),{method:"DELETE"}).then(function(){mm.close();loadList()},function(er){bb.disabled=false;mm.close();A.toast(err(er),"err")})}}]})}}])}})
}
function bindNew(){root.querySelectorAll("#aNew,[data-new]").forEach(function(b){b.onclick=create})}
function create(){
 var b=document.createElement("div");b.innerHTML='<label class="lab" for="aName">'+e(t("aud.c.name","Name"))+'</label><input class="fld" id="aName" maxlength="80" autocomplete="off" placeholder="'+e(t("aud.name.ph","e.g. Newsletter"))+'"><p class="ferr" id="aErr" hidden></p>';
 var m=A.modal({title:t("aud.new","Create audience"),desc:t("aud.new.d","Name the list so you can recognise it when you send."),body:b,actions:[{label:t("au.cancel","Cancel")},{label:t("au.k.create","Create"),cls:"pri",onClick:function(mm,btn){go(mm,btn)}}]});
 var i=b.querySelector("#aName");i.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();go(m,m.el.querySelector(".ma .pri"))}});
 function go(mm,btn){var er=b.querySelector("#aErr");er.hidden=true;btn.disabled=true;A.api("/audiences",{method:"POST",body:{name:i.value.trim()}}).then(function(a){mm.close();location.href="/app/audiences/view/?id="+a.id},function(x){btn.disabled=false;er.textContent=err(x);er.hidden=false})}
}
function headView(a){return'<a class="backlnk" href="/app/audiences/">'+A.icon(A.IC.back,16)+"<span>"+e(t("aud.t","Audiences"))+'</span></a><div class="ph pgh"><div><h1>'+e(a?a.name:"")+"</h1>"+(a?'<p class="psub">'+e(t("aud.stats","{a} contacts · {b} subscribed · {c} unsubscribed",{a:A.num(a.contacts),b:A.num(a.contacts-a.unsubscribed),c:A.num(a.unsubscribed)}))+"</p>":"")+"</div>"+(a?'<div class="bx-act"><button type="button" class="abtn lg" id="aRen">'+e(t("aud.rename","Rename"))+'</button><a class="abtn lg" href="'+e((window.GESERD&&GESERD.api||"/api")+"/audiences/"+a.id+"/export")+'">'+e(t("aud.export","Export CSV"))+'</a><button type="button" class="abtn lg pri" id="aAdd">'+ico("plus")+"<span>"+e(t("aud.add","Add contacts"))+"</span></button></div>":"")+"</div>"}
var aud;
function loadView(){
 root.innerHTML=headView(null)+A.loading();
 A.api("/audiences/"+encodeURIComponent(id)).then(function(a){aud=a;drawView()},function(x){root.innerHTML=headView(null)+A.failed(x,"aRetry");var b=document.getElementById("aRetry");if(b)b.onclick=loadView})
}
function drawView(){
 if(["contacts","properties","segments","topics"].indexOf(tab)<0)tab="contacts";
 root.innerHTML=headView(aud)+'<div class="stabs" id="aTabs">'+[["contacts",t("aud.tab.contacts","Contacts")],["properties",t("aud.tab.props","Properties")],["segments",t("aud.tab.segs","Segments")],["topics",t("aud.tab.topics","Topics")]].map(function(x){return'<a href="#'+x[0]+'" data-tab="'+x[0]+'">'+e(x[1])+"</a>"}).join("")+'</div><div id="aBody"></div>';
 root.querySelectorAll("[data-tab]").forEach(function(a){a.onclick=function(ev){ev.preventDefault();tab=a.dataset.tab;history.replaceState(null,"","#"+tab);showTab()}});
 window.onhashchange=function(){var h=(location.hash||"#contacts").slice(1);if(h!==tab&&["contacts","properties","segments","topics"].indexOf(h)>-1){tab=h;showTab()}};
 document.getElementById("aAdd").onclick=addModal;document.getElementById("aRen").onclick=renameModal;
 showTab()
}
function body(){return document.getElementById("aBody")}
function getList(k,force){if(cache[k]&&!force)return Promise.resolve(cache[k]);return A.api(path("/"+({segs:"segments",props:"properties",topics:"topics"})[k])).then(function(r){cache[k]=r.data;return r.data})}
function path(x){return"/audiences/"+encodeURIComponent(id)+(x||"")}
function showTab(){
 root.querySelectorAll("[data-tab]").forEach(function(a){a.classList.toggle("on",a.dataset.tab===tab)});
 ({contacts:tabContacts,properties:tabProps,segments:tabSegs,topics:tabTopics})[tab]()
}
function tabContacts(){
 body().innerHTML='<div class="bx-bar"><div class="bx-search">'+A.icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',16)+'<input id="aq" type="search" autocomplete="off" placeholder="'+e(t("aud.search","Search contacts"))+'" value="'+e(st.q)+'"></div><div id="aSt"></div><div id="aSg"></div></div><div id="aList">'+A.loading()+"</div>";
 document.getElementById("aSt").appendChild(A.dropdown([["all",t("aud.f.all","All contacts")],["subscribed",t("aud.f.sub","Subscribed")],["unsubscribed",t("aud.f.unsub","Unsubscribed")]],st.status,function(v){st.status=v;st.offset=0;loadContacts()},""));
 var q=document.getElementById("aq");q.addEventListener("input",function(){st.q=q.value.trim();st.offset=0;clearTimeout(timer);timer=setTimeout(loadContacts,250)});
 getList("segs").then(function(l){var h=document.getElementById("aSg");if(!h||!l.length)return;h.appendChild(A.dropdown([[ "",t("aud.f.seg","All segments")]].concat(l.map(function(x){return[x.id,x.name]})),st.segment,function(v){st.segment=v;st.offset=0;loadContacts()},""))},function(){});
 loadContacts()
}
function rowActions(h){return h}
function errT(x){var c=x&&x.code,m=c&&A.t("au.err."+c,"");return m||A.err(x)}
function nameModal(o){
 var b=document.createElement("div");b.innerHTML='<label class="lab" for="nmI">'+e(o.label)+'</label><input class="fld" id="nmI" maxlength="80" autocomplete="off" value="'+e(o.value||"")+'" placeholder="'+e(o.ph||"")+'"><p class="ferr" id="nmE" hidden></p>';
 var m=A.modal({title:o.title,body:b,actions:[{label:t("au.cancel","Cancel")},{label:o.go,cls:"pri",onClick:function(mm,btn){go(mm,btn)}}]});
 var i=b.querySelector("#nmI");i.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();go(m,m.el.querySelector(".ma .pri"))}});
 function go(mm,btn){var er=b.querySelector("#nmE");er.hidden=true;btn.disabled=true;o.run(i.value.trim()).then(function(){mm.close()},function(x){btn.disabled=false;er.textContent=errT(x);er.hidden=false})}
}
function confirmDel(title,desc,run){A.modal({title:title,desc:desc,actions:[{label:t("au.cancel","Cancel")},{label:t("aud.remove","Remove"),cls:"dng",onClick:function(mm,b){b.disabled=true;run().then(function(){mm.close()},function(x){b.disabled=false;mm.close();A.toast(errT(x),"err")})}}]})}
var PEN='<path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="m13.5 6.5 4 4"/>';
function actBtn(kind,idv,label,icon,dng){return'<button type="button" class="app-ico'+(dng?" dng":"")+'" data-'+kind+'="'+e(idv)+'" aria-label="'+e(label)+'" title="'+e(label)+'">'+A.icon(icon,16)+"</button>"}
function tabSegs(){
 body().innerHTML=A.loading();
 getList("segs",true).then(function(l){
  var nb='<button type="button" class="abtn pri" data-new>'+ico("plus")+"<span>"+e(t("aud.segs.new","Create segment"))+"</span></button>";
  if(!l.length){body().innerHTML=A.empty(A.IC.aud,t("aud.segs.h","No segments yet"),t("aud.segs.p","A segment is a group of contacts inside this audience. Send a broadcast to a segment instead of the whole list."),nb)}
  else{var cols="--cols:minmax(0,2fr) minmax(0,1fr) 128px";body().innerHTML='<div class="tabbar"><p class="gd">'+e(t("aud.segs.p","A segment is a group of contacts inside this audience. Send a broadcast to a segment instead of the whole list."))+"</p>"+nb+'</div><div class="dl"><div class="drow dhead" style="'+cols+'"><div>'+e(t("aud.c.name","Name"))+"</div><div>"+e(t("aud.segs.contacts","Contacts"))+"</div><div></div></div>"+l.map(function(x){return'<div class="drow" style="'+cols+'"><div class="c strong" data-l="'+e(t("aud.c.name","Name"))+'">'+e(x.name)+'</div><div class="c dim" data-l="'+e(t("aud.segs.contacts","Contacts"))+'">'+e(A.num(x.contacts))+'</div><div class="c end">'+actBtn("view",x.id,t("aud.segs.view","View contacts"),A.IC.aud)+actBtn("ren",x.id,t("aud.rename","Rename"),PEN)+actBtn("del",x.id,t("aud.remove","Remove"),A.IC.trash,1)+"</div></div>"}).join("")+"</div>"}
  var nw=body().querySelector("[data-new]");if(nw)nw.onclick=function(){nameModal({title:t("aud.segs.new","Create segment"),label:t("aud.c.name","Name"),ph:t("aud.segs.ph","e.g. Customers"),go:t("aud.segs.create","Create"),run:function(v){return A.api(path("/segments"),{method:"POST",body:{name:v}}).then(function(){tabSegs()})}})};
  body().querySelectorAll("[data-view]").forEach(function(b){b.onclick=function(){st.segment=b.dataset.view;st.offset=0;tab="contacts";history.replaceState(null,"","#contacts");showTab()}});
  body().querySelectorAll("[data-ren]").forEach(function(b){b.onclick=function(){var x=l.filter(function(z){return z.id===b.dataset.ren})[0];nameModal({title:t("aud.rename","Rename"),label:t("aud.c.name","Name"),value:x.name,go:t("aud.save","Save"),run:function(v){return A.api(path("/segments/"+x.id),{method:"PATCH",body:{name:v}}).then(function(){tabSegs()})}})}});
  body().querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){var x=l.filter(function(z){return z.id===b.dataset.del})[0];confirmDel(t("aud.segs.del.t","Delete segment"),t("aud.segs.del.d","{n} stays in the audience. Only the group is deleted.",{n:x.name}),function(){return A.api(path("/segments/"+x.id),{method:"DELETE"}).then(function(){if(st.segment===x.id)st.segment="";tabSegs()})})}})
 },function(x){body().innerHTML=A.failed(x,"tRetry");var b=document.getElementById("tRetry");if(b)b.onclick=tabSegs})
}
function tabProps(){
 body().innerHTML=A.loading();
 getList("props",true).then(function(l){
  var nb='<button type="button" class="abtn pri" data-new>'+ico("plus")+"<span>"+e(t("aud.props.new","Add property"))+"</span></button>";
  var P=t("aud.props.p","Properties add your own fields to contacts, such as company or plan. Use them in a broadcast as a variable.");
  if(!l.length){body().innerHTML=A.empty(A.IC.aud,t("aud.props.h","No properties yet"),P,nb)}
  else{var cols="--cols:minmax(0,1.3fr) minmax(0,.8fr) minmax(0,1.2fr) minmax(0,.8fr) 64px";body().innerHTML='<div class="tabbar"><p class="gd">'+e(P)+"</p>"+nb+'</div><div class="dl"><div class="drow dhead" style="'+cols+'"><div>'+e(t("aud.props.key","Key"))+"</div><div>"+e(t("aud.props.type","Type"))+"</div><div>"+e(t("aud.props.var","Variable"))+"</div><div>"+e(t("aud.props.used","Filled"))+"</div><div></div></div>"+l.map(function(x){return'<div class="drow" style="'+cols+'"><div class="c strong" data-l="'+e(t("aud.props.key","Key"))+'">'+e(x.key)+'</div><div class="c dim" data-l="'+e(t("aud.props.type","Type"))+'">'+e(t(x.type==="number"?"aud.props.t.number":"aud.props.t.string",x.type==="number"?"Number":"Text"))+'</div><div class="c mono" data-l="'+e(t("aud.props.var","Variable"))+'">'+e("{{{"+x.key+"}}}")+'</div><div class="c dim" data-l="'+e(t("aud.props.used","Filled"))+'">'+e(A.num(x.filled))+'</div><div class="c end">'+actBtn("del",x.id,t("aud.remove","Remove"),A.IC.trash,1)+"</div></div>"}).join("")+"</div>"}
  var nw=body().querySelector("[data-new]");if(nw)nw.onclick=propModal;
  body().querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){var x=l.filter(function(z){return z.id===b.dataset.del})[0];confirmDel(t("aud.props.del.t","Delete property"),t("aud.props.del.d","The values stored in {k} on every contact will be deleted.",{k:x.key}),function(){return A.api(path("/properties/"+x.id),{method:"DELETE"}).then(function(){tabProps()})})}})
 },function(x){body().innerHTML=A.failed(x,"tRetry");var b=document.getElementById("tRetry");if(b)b.onclick=tabProps})
}
function propModal(){
 var b=document.createElement("div");b.innerHTML='<div class="pfld"><label class="lab" for="pKey">'+e(t("aud.props.key","Key"))+'</label><input class="fld" id="pKey" maxlength="40" autocomplete="off" spellcheck="false" placeholder="company"><p class="fhint">'+e(t("aud.props.keyh","Lowercase letters, digits and underscores, starting with a letter."))+'</p></div><div class="pfld"><label class="lab" for="pType">'+e(t("aud.props.type","Type"))+'</label><select class="fld" id="pType"><option value="string">'+e(t("aud.props.t.string","Text"))+'</option><option value="number">'+e(t("aud.props.t.number","Number"))+'</option></select></div><p class="ferr" id="pErr" hidden></p>';
 var m=A.modal({title:t("aud.props.new","Add property"),body:b,actions:[{label:t("au.cancel","Cancel")},{label:t("aud.segs.create","Create"),cls:"pri",onClick:function(mm,btn){var er=b.querySelector("#pErr");er.hidden=true;btn.disabled=true;A.api(path("/properties"),{method:"POST",body:{key:b.querySelector("#pKey").value.trim(),type:b.querySelector("#pType").value}}).then(function(){mm.close();tabProps()},function(x){btn.disabled=false;er.textContent=errT(x);er.hidden=false})}}]})
}
function tabTopics(){
 body().innerHTML=A.loading();
 getList("topics",true).then(function(l){
  var nb='<button type="button" class="abtn pri" data-new>'+ico("plus")+"<span>"+e(t("aud.topics.new","Create topic"))+"</span></button>";
  var P=t("aud.topics.p","Topics let people choose what they receive. A contact can unsubscribe from one topic and keep the rest.");
  if(!l.length){body().innerHTML=A.empty(A.IC.aud,t("aud.topics.h","No topics yet"),P,nb)}
  else{var cols="--cols:minmax(0,1.6fr) minmax(0,1fr) minmax(0,.8fr) 96px";body().innerHTML='<div class="tabbar"><p class="gd">'+e(P)+"</p>"+nb+'</div><div class="dl"><div class="drow dhead" style="'+cols+'"><div>'+e(t("aud.c.name","Name"))+"</div><div>"+e(t("aud.topics.def","Default"))+"</div><div>"+e(t("aud.topics.subs","Subscribed"))+"</div><div></div></div>"+l.map(function(x){return'<div class="drow" style="'+cols+'"><div class="c" data-l="'+e(t("aud.c.name","Name"))+'"><span class="strong">'+e(x.name)+"</span>"+(x.description?'<span class="ksub">'+e(x.description)+"</span>":"")+'</div><div class="c dim" data-l="'+e(t("aud.topics.def","Default"))+'">'+e(t(x.default_on?"aud.topics.def.on":"aud.topics.def.off",x.default_on?"Subscribed by default":"Opt-in only"))+'</div><div class="c dim" data-l="'+e(t("aud.topics.subs","Subscribed"))+'">'+e(A.num(x.subscribed))+'</div><div class="c end">'+actBtn("ren",x.id,t("aud.rename","Rename"),PEN)+actBtn("del",x.id,t("aud.remove","Remove"),A.IC.trash,1)+"</div></div>"}).join("")+"</div>"}
  var nw=body().querySelector("[data-new]");if(nw)nw.onclick=function(){topicModal(null)};
  body().querySelectorAll("[data-ren]").forEach(function(b){b.onclick=function(){topicModal(l.filter(function(z){return z.id===b.dataset.ren})[0])}});
  body().querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){var x=l.filter(function(z){return z.id===b.dataset.del})[0];confirmDel(t("aud.topics.del.t","Delete topic"),t("aud.topics.del.d","The topic {n} and every contact's choice for it will be deleted.",{n:x.name}),function(){return A.api(path("/topics/"+x.id),{method:"DELETE"}).then(function(){tabTopics()})})}})
 },function(x){body().innerHTML=A.failed(x,"tRetry");var b=document.getElementById("tRetry");if(b)b.onclick=tabTopics})
}
function topicModal(x){
 var b=document.createElement("div");b.innerHTML='<div class="pfld"><label class="lab" for="tName">'+e(t("aud.c.name","Name"))+'</label><input class="fld" id="tName" maxlength="80" autocomplete="off" value="'+e(x?x.name:"")+'" placeholder="'+e(t("aud.topics.ph","e.g. Product updates"))+'"></div><div class="pfld"><label class="lab" for="tDesc">'+e(t("aud.topics.desc","Description"))+'</label><input class="fld" id="tDesc" maxlength="200" autocomplete="off" value="'+e(x&&x.description?x.description:"")+'"></div><div class="pfld"><label class="lab" for="tDef">'+e(t("aud.topics.def","Default"))+'</label><select class="fld" id="tDef"><option value="1"'+(!x||x.default_on?" selected":"")+">"+e(t("aud.topics.def.on","Subscribed by default"))+'</option><option value="0"'+(x&&!x.default_on?" selected":"")+">"+e(t("aud.topics.def.off","Opt-in only"))+'</option></select></div><p class="ferr" id="tErr" hidden></p>';
 A.modal({title:x?t("aud.topics.edit","Edit topic"):t("aud.topics.new","Create topic"),body:b,actions:[{label:t("au.cancel","Cancel")},{label:x?t("aud.save","Save"):t("aud.segs.create","Create"),cls:"pri",onClick:function(mm,btn){var er=b.querySelector("#tErr");er.hidden=true;btn.disabled=true;var body_={name:b.querySelector("#tName").value.trim(),description:b.querySelector("#tDesc").value.trim(),default_on:b.querySelector("#tDef").value==="1"};A.api(path("/topics"+(x?"/"+x.id:"")),{method:x?"PATCH":"POST",body:body_}).then(function(){mm.close();tabTopics()},function(y){btn.disabled=false;er.textContent=errT(y);er.hidden=false})}}]})
}
function checklist(items,sel){
 var box=document.createElement("div");box.className="evlist";
 function paint(){box.innerHTML=items.map(function(i){return'<button type="button" class="evrow'+(sel[i.id]?" on":"")+'" data-v="'+e(i.id)+'"><i class="evbx">'+(sel[i.id]?A.icon(A.IC.check,12):"")+"</i><span>"+e(i.name)+"</span></button>"}).join("")}
 paint();box.onclick=function(ev){var r=ev.target.closest(".evrow");if(!r)return;sel[r.dataset.v]=!sel[r.dataset.v];paint()};return box
}
function editContact(c){
 Promise.all([getList("props"),getList("segs"),getList("topics")]).then(function(R){
  var P=R[0],S=R[1],T=R[2],b=document.createElement("div");
  var ssel={};(c.segments||[]).forEach(function(x){ssel[x]=true});var tsel={};T.forEach(function(x){tsel[x.id]=c.topics&&x.id in c.topics?!!c.topics[x.id]:x.default_on});
  b.innerHTML='<p class="fhint ctem">'+e(c.email)+'</p><div class="pfld"><label class="lab" for="cFn">'+e(t("aud.fn","First name"))+'</label><input class="fld" id="cFn" maxlength="80" value="'+e(c.first_name||"")+'"></div><div class="pfld"><label class="lab" for="cLn">'+e(t("aud.ln","Last name"))+'</label><input class="fld" id="cLn" maxlength="80" value="'+e(c.last_name||"")+'"></div>'+P.map(function(p,i){return'<div class="pfld"><label class="lab" for="cp'+i+'">'+e(p.key)+'</label><input class="fld" id="cp'+i+'" data-k="'+e(p.key)+'" maxlength="200" value="'+e(c.props&&c.props[p.key]!=null?c.props[p.key]:"")+'"'+(p.type==="number"?' inputmode="decimal"':"")+"></div>"}).join("")+(S.length?'<div class="pfld" id="cSg"><span class="lab">'+e(t("aud.add.seg","Segments"))+"</span></div>":"")+(T.length?'<div class="pfld" id="cTp"><span class="lab">'+e(t("aud.tab.topics","Topics"))+"</span></div>":"")+'<p class="ferr" id="cErr" hidden></p>';
  var sc=checklist(S,ssel),tc=checklist(T,tsel);var sg=b.querySelector("#cSg"),tp=b.querySelector("#cTp");if(sg)sg.appendChild(sc);if(tp)tp.appendChild(tc);
  A.modal({title:t("aud.edit","Edit contact"),body:b,actions:[{label:t("au.cancel","Cancel")},{label:t("aud.save","Save"),cls:"pri",onClick:function(mm,btn){var er=b.querySelector("#cErr");er.hidden=true;btn.disabled=true;var pr={};b.querySelectorAll("[data-k]").forEach(function(i){pr[i.dataset.k]=i.value.trim()});var tt={};T.forEach(function(x){tt[x.id]=!!tsel[x.id]});
   A.api(path("/contacts/"+c.id),{method:"PATCH",body:{first_name:b.querySelector("#cFn").value.trim(),last_name:b.querySelector("#cLn").value.trim(),props:pr,segments:Object.keys(ssel).filter(function(k){return ssel[k]}),topics:tt}}).then(function(){mm.close();cache.segs=null;loadContacts()},function(x){btn.disabled=false;er.textContent=errT(x);er.hidden=false})}}]})
 },function(x){A.toast(errT(x),"err")})
}
function loadContacts(){
 var box=document.getElementById("aList");if(!box)return;
 var p="/audiences/"+encodeURIComponent(id)+"/contacts?limit="+LIM+"&offset="+st.offset+(st.q?"&q="+encodeURIComponent(st.q):"")+(st.status!=="all"?"&status="+st.status:"")+(st.segment?"&segment="+encodeURIComponent(st.segment):"");
 A.api(p).then(function(d){drawContacts(box,d)},function(x){box.innerHTML=A.failed(x,"cRetry");var b=document.getElementById("cRetry");if(b)b.onclick=loadContacts})
}
function drawContacts(box,d){
 var cols="--cols:minmax(0,1.7fr) minmax(0,1.2fr) minmax(0,.9fr) minmax(0,1fr) 128px";
 if(!d.data.length){box.innerHTML=(st.q||st.status!=="all"||st.segment)?A.empty(A.IC.aud,t("aud.nomatch","No contacts match"),t("aud.nomatch.p","Try another search or filter."),""):A.empty(A.IC.aud,t("aud.ch","No contacts yet"),t("aud.cp","Add contacts by pasting email addresses or importing a CSV file."),'<button type="button" class="abtn lg pri" data-add>'+e(t("aud.add","Add contacts"))+"</button>");var ab=box.querySelector("[data-add]");if(ab)ab.onclick=addModal;return}
 var rows=d.data.map(function(c){cmap[c.id]=c;var nm=[c.first_name,c.last_name].filter(Boolean).join(" ");return'<div class="drow" style="'+cols+'"><div class="c strong" data-l="Email">'+e(c.email)+'</div><div class="c dim" data-l="'+e(t("aud.c.name","Name"))+'">'+e(nm||"—")+'</div><div class="c" data-l="'+e(t("bc.c.status","Status"))+'">'+A.pill(c.unsubscribed?"dim":"ok",t(c.unsubscribed?"aud.s.unsub":"aud.s.sub",c.unsubscribed?"Unsubscribed":"Subscribed"))+'</div><div class="c dim" data-l="'+e(t("aud.added","Added"))+'">'+e(A.date(c.created_at))+'</div><div class="c end"><button type="button" class="app-ico" data-edit="'+e(c.id)+'" aria-label="'+e(t("aud.edit","Edit contact"))+'" title="'+e(t("aud.edit","Edit contact"))+'">'+A.icon(PEN,16)+'</button><button type="button" class="app-ico" data-tog="'+e(c.id)+'" data-v="'+(c.unsubscribed?"0":"1")+'" aria-label="'+e(t(c.unsubscribed?"aud.resub":"aud.unsub",c.unsubscribed?"Resubscribe":"Unsubscribe"))+'" title="'+e(t(c.unsubscribed?"aud.resub":"aud.unsub",c.unsubscribed?"Resubscribe":"Unsubscribe"))+'">'+A.icon(c.unsubscribed?A.IC.refresh:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',16)+'</button><button type="button" class="app-ico dng" data-del="'+e(c.id)+'" data-email="'+e(c.email)+'" aria-label="'+e(t("aud.remove","Remove"))+'" title="'+e(t("aud.remove","Remove"))+'">'+A.icon(A.IC.trash,16)+"</button></div></div>"}).join("");
 var from=d.offset+1,to=d.offset+d.data.length,pg='<div class="bx-pg"><span>'+e(t("aud.range","{a}–{b} of {c}",{a:A.num(from),b:A.num(to),c:A.num(d.total)}))+'</span><div><button type="button" class="abtn" id="cPrev"'+(d.offset?"":" disabled")+">"+e(t("aud.prev","Previous"))+'</button><button type="button" class="abtn" id="cNext"'+(to<d.total?"":" disabled")+">"+e(t("aud.next","Next"))+"</button></div></div>";
 box.innerHTML='<div class="dl"><div class="drow dhead" style="'+cols+'"><div>Email</div><div>'+e(t("aud.c.name","Name"))+"</div><div>"+e(t("bc.c.status","Status"))+"</div><div>"+e(t("aud.added","Added"))+"</div><div></div></div>"+rows+"</div>"+pg;
 var pv=document.getElementById("cPrev"),nx=document.getElementById("cNext");
 pv.onclick=function(){st.offset=Math.max(0,st.offset-LIM);loadContacts()};nx.onclick=function(){st.offset+=LIM;loadContacts()};
 box.querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(){editContact(cmap[b.dataset.edit])}});
 box.querySelectorAll("[data-tog]").forEach(function(b){b.onclick=function(){b.disabled=true;A.api("/audiences/"+encodeURIComponent(id)+"/contacts/"+b.dataset.tog,{method:"PATCH",body:{unsubscribed:b.dataset.v==="1"}}).then(function(){refresh()},function(x){b.disabled=false;A.toast(err(x),"err")})}});
 box.querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){removeContact(b.dataset.del,b.dataset.email)}})
}
function refresh(){A.api("/audiences/"+encodeURIComponent(id)).then(function(a){aud=a;var h=root.querySelector(".psub");if(h)h.textContent=t("aud.stats","{a} contacts · {b} subscribed · {c} unsubscribed",{a:A.num(a.contacts),b:A.num(a.contacts-a.unsubscribed),c:A.num(a.unsubscribed)})}).catch(function(){});loadContacts()}
function removeContact(cid,email){
 var m=A.modal({title:t("aud.rm.t","Remove contact"),desc:t("aud.rm.d","{e} will be removed from this audience.",{e:email}),actions:[{label:t("au.cancel","Cancel")},{label:t("aud.remove","Remove"),cls:"dng",onClick:function(mm,b){b.disabled=true;A.api("/audiences/"+encodeURIComponent(id)+"/contacts/"+cid,{method:"DELETE"}).then(function(){mm.close();refresh()},function(x){b.disabled=false;A.toast(err(x),"err")})}}]})
}
function addModal(){
 var b=document.createElement("div");
 b.innerHTML='<label class="lab" for="aTxt">'+e(t("aud.add.l","Email addresses"))+'</label><textarea class="fld bx-ta" id="aTxt" rows="8" spellcheck="false" placeholder="anna@example.com,Anna,Smith&#10;bob@example.com"></textarea><p class="fhint">'+e(t("aud.add.h","One contact per line: email, first name, last name. A CSV file with an email column works too."))+'</p><div class="bx-row"><label class="abtn" for="aFile">'+e(t("aud.add.file","Choose CSV file"))+'</label><input type="file" id="aFile" accept=".csv,.txt,text/csv,text/plain" hidden><span class="fhint" id="aFn"></span></div><div class="pfld" id="aSegs" hidden><span class="lab">'+e(t("aud.add.seg","Segments"))+'</span><p class="fhint">'+e(t("aud.add.seg.h","Optionally add to existing segments."))+'</p></div><p class="ferr" id="aErr" hidden></p>';
 var m=A.modal({title:t("aud.add","Add contacts"),desc:aud.name,body:b,wide:true,actions:[{label:t("au.cancel","Cancel")},{label:t("aud.add.go","Add"),cls:"pri",onClick:function(mm,btn){go(mm,btn)}}]});
 var asel={};getList("segs").then(function(l){if(!l.length)return;var h=b.querySelector("#aSegs");h.hidden=false;h.appendChild(checklist(l,asel))},function(){});
 var f=b.querySelector("#aFile");f.onchange=function(){var file=f.files[0];if(!file)return;if(file.size>2000000){showErr(t("aud.add.big","The file is larger than 2 MB."));return}b.querySelector("#aFn").textContent=file.name;var r=new FileReader();r.onload=function(){b.querySelector("#aTxt").value=String(r.result||"")};r.readAsText(file)};
 function showErr(s){var er=b.querySelector("#aErr");er.textContent=s;er.hidden=false}
 function go(mm,btn){var v=b.querySelector("#aTxt").value;b.querySelector("#aErr").hidden=true;if(!v.trim())return showErr(t("aud.add.empty","Paste at least one email address."));btn.disabled=true;
  A.api("/audiences/"+encodeURIComponent(id)+"/contacts",{method:"POST",body:{csv:v,segments:Object.keys(asel).filter(function(k){return asel[k]})}}).then(function(r){mm.close();cache.segs=null;A.toast(t("aud.add.done","Added {a}, already in the list {b}, skipped {c}",{a:A.num(r.added),b:A.num(r.existing),c:A.num(r.invalid+r.duplicates)}),"ok");refresh()},function(x){btn.disabled=false;var s=err(x);if(x.code==="limit_reached"&&x.data)s=t("aud.limit."+x.data.resource,s,{n:A.num(x.data.limit)});showErr(s)})}
}
function renameModal(){
 var b=document.createElement("div");b.innerHTML='<label class="lab" for="aName">'+e(t("aud.c.name","Name"))+'</label><input class="fld" id="aName" maxlength="80" value="'+e(aud.name)+'"><p class="ferr" id="aErr" hidden></p>';
 var m=A.modal({title:t("aud.rename","Rename"),body:b,actions:[{label:t("au.cancel","Cancel")},{label:t("aud.save","Save"),cls:"pri",onClick:function(mm,btn){go(mm,btn)}},{label:t("aud.del","Delete audience"),cls:"dng",onClick:function(mm){mm.close();del()}}]});
 var i=b.querySelector("#aName");i.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();go(m,m.el.querySelector(".ma .pri"))}});
 function go(mm,btn){var er=b.querySelector("#aErr");er.hidden=true;btn.disabled=true;A.api("/audiences/"+encodeURIComponent(id),{method:"PATCH",body:{name:i.value.trim()}}).then(function(r){mm.close();aud.name=r.name;var h=root.querySelector("h1");if(h)h.textContent=r.name},function(x){btn.disabled=false;er.textContent=err(x);er.hidden=false})}
}
function del(){
 A.modal({title:t("aud.del.t","Delete audience"),desc:t("aud.del.d","The audience and all its contacts will be deleted. Broadcasts already sent keep their history."),actions:[{label:t("au.cancel","Cancel")},{label:t("aud.del","Delete audience"),cls:"dng",onClick:function(mm,b){b.disabled=true;A.api("/audiences/"+encodeURIComponent(id),{method:"DELETE"}).then(function(){location.href="/app/audiences/"},function(x){b.disabled=false;mm.close();A.toast(err(x),"err")})}}]})
}
A.ready(function(){root=document.getElementById("app-root");if(!root)return;if(root.dataset.page==="audience")id?loadView():location.replace("/app/audiences/");else loadList()})
})();
