(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,id=new URLSearchParams(location.search).get("id"),st={q:"",status:"all",offset:0},LIM=25,timer;
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
 if(!d.data.length)body=A.empty(A.IC.inbox,t("aud.h","No audiences yet"),t("aud.p","An audience is a list of contacts you send broadcasts to. Create one, then add contacts by pasting emails or importing a CSV file."),'<button type="button" class="abtn lg pri" data-new>'+e(t("aud.new","Create audience"))+"</button>");
 else body='<div class="dl"><div class="drow dhead" style="'+cols+'"><div>'+e(t("aud.c.name","Name"))+"</div><div>"+e(t("aud.c.contacts","Contacts"))+"</div><div>"+e(t("aud.c.unsub","Unsubscribed"))+"</div><div>"+e(t("au.k.created","Created"))+"</div><div></div></div>"+
 d.data.map(function(a){return'<div class="drow link" style="'+cols+'" data-go="'+e(a.id)+'"><div class="c strong" data-l="'+e(t("aud.c.name","Name"))+'">'+e(a.name)+'</div><div class="c" data-l="'+e(t("aud.c.contacts","Contacts"))+'">'+A.num(a.contacts)+'</div><div class="c dim" data-l="'+e(t("aud.c.unsub","Unsubscribed"))+'">'+A.num(a.unsubscribed)+'</div><div class="c dim" data-l="'+e(t("au.k.created","Created"))+'">'+e(A.date(a.created_at))+'</div><div class="c end">'+A.icon(A.IC.chev,16)+"</div></div>"}).join("")+"</div>";
 root.innerHTML=headList(sub)+body;bindNew();
 root.querySelectorAll("[data-go]").forEach(function(r){r.onclick=function(){location.href="/app/audiences/view/?id="+r.dataset.go}})
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
 root.innerHTML=headView(aud)+'<div class="bx-bar"><div class="bx-search">'+A.icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',16)+'<input id="aq" type="search" autocomplete="off" placeholder="'+e(t("aud.search","Search contacts"))+'" value="'+e(st.q)+'"></div><div id="aSt"></div></div><div id="aList">'+A.loading()+"</div>";
 var dd=A.dropdown([["all",t("aud.f.all","All contacts")],["subscribed",t("aud.f.sub","Subscribed")],["unsubscribed",t("aud.f.unsub","Unsubscribed")]],st.status,function(v){st.status=v;st.offset=0;loadContacts()},"");
 document.getElementById("aSt").appendChild(dd);
 var q=document.getElementById("aq");q.addEventListener("input",function(){st.q=q.value.trim();st.offset=0;clearTimeout(timer);timer=setTimeout(loadContacts,250)});
 document.getElementById("aAdd").onclick=addModal;document.getElementById("aRen").onclick=renameModal;
 loadContacts()
}
function loadContacts(){
 var box=document.getElementById("aList");if(!box)return;
 var p="/audiences/"+encodeURIComponent(id)+"/contacts?limit="+LIM+"&offset="+st.offset+(st.q?"&q="+encodeURIComponent(st.q):"")+(st.status!=="all"?"&status="+st.status:"");
 A.api(p).then(function(d){drawContacts(box,d)},function(x){box.innerHTML=A.failed(x,"cRetry");var b=document.getElementById("cRetry");if(b)b.onclick=loadContacts})
}
function drawContacts(box,d){
 var cols="--cols:minmax(0,1.7fr) minmax(0,1.2fr) minmax(0,.9fr) minmax(0,1fr) 88px";
 if(!d.data.length){box.innerHTML=(st.q||st.status!=="all")?A.empty(A.IC.inbox,t("aud.nomatch","No contacts match"),t("aud.nomatch.p","Try another search or filter."),""):A.empty(A.IC.inbox,t("aud.ch","No contacts yet"),t("aud.cp","Add contacts by pasting email addresses or importing a CSV file."),'<button type="button" class="abtn lg pri" data-add>'+e(t("aud.add","Add contacts"))+"</button>");var ab=box.querySelector("[data-add]");if(ab)ab.onclick=addModal;return}
 var rows=d.data.map(function(c){var nm=[c.first_name,c.last_name].filter(Boolean).join(" ");return'<div class="drow" style="'+cols+'"><div class="c strong" data-l="Email">'+e(c.email)+'</div><div class="c dim" data-l="'+e(t("aud.c.name","Name"))+'">'+e(nm||"—")+'</div><div class="c" data-l="'+e(t("bc.c.status","Status"))+'">'+A.pill(c.unsubscribed?"dim":"ok",t(c.unsubscribed?"aud.s.unsub":"aud.s.sub",c.unsubscribed?"Unsubscribed":"Subscribed"))+'</div><div class="c dim" data-l="'+e(t("aud.added","Added"))+'">'+e(A.date(c.created_at))+'</div><div class="c end"><button type="button" class="app-ico" data-tog="'+e(c.id)+'" data-v="'+(c.unsubscribed?"0":"1")+'" aria-label="'+e(t(c.unsubscribed?"aud.resub":"aud.unsub",c.unsubscribed?"Resubscribe":"Unsubscribe"))+'" title="'+e(t(c.unsubscribed?"aud.resub":"aud.unsub",c.unsubscribed?"Resubscribe":"Unsubscribe"))+'">'+A.icon(c.unsubscribed?A.IC.refresh:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',16)+'</button><button type="button" class="app-ico dng" data-del="'+e(c.id)+'" data-email="'+e(c.email)+'" aria-label="'+e(t("aud.remove","Remove"))+'" title="'+e(t("aud.remove","Remove"))+'">'+A.icon(A.IC.trash,16)+"</button></div></div>"}).join("");
 var from=d.offset+1,to=d.offset+d.data.length,pg='<div class="bx-pg"><span>'+e(t("aud.range","{a}–{b} of {c}",{a:A.num(from),b:A.num(to),c:A.num(d.total)}))+'</span><div><button type="button" class="abtn" id="cPrev"'+(d.offset?"":" disabled")+">"+e(t("aud.prev","Previous"))+'</button><button type="button" class="abtn" id="cNext"'+(to<d.total?"":" disabled")+">"+e(t("aud.next","Next"))+"</button></div></div>";
 box.innerHTML='<div class="dl"><div class="drow dhead" style="'+cols+'"><div>Email</div><div>'+e(t("aud.c.name","Name"))+"</div><div>"+e(t("bc.c.status","Status"))+"</div><div>"+e(t("aud.added","Added"))+"</div><div></div></div>"+rows+"</div>"+pg;
 var pv=document.getElementById("cPrev"),nx=document.getElementById("cNext");
 pv.onclick=function(){st.offset=Math.max(0,st.offset-LIM);loadContacts()};nx.onclick=function(){st.offset+=LIM;loadContacts()};
 box.querySelectorAll("[data-tog]").forEach(function(b){b.onclick=function(){b.disabled=true;A.api("/audiences/"+encodeURIComponent(id)+"/contacts/"+b.dataset.tog,{method:"PATCH",body:{unsubscribed:b.dataset.v==="1"}}).then(function(){refresh()},function(x){b.disabled=false;A.toast(err(x),"err")})}});
 box.querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){removeContact(b.dataset.del,b.dataset.email)}})
}
function refresh(){A.api("/audiences/"+encodeURIComponent(id)).then(function(a){aud=a;var h=root.querySelector(".psub");if(h)h.textContent=t("aud.stats","{a} contacts · {b} subscribed · {c} unsubscribed",{a:A.num(a.contacts),b:A.num(a.contacts-a.unsubscribed),c:A.num(a.unsubscribed)})}).catch(function(){});loadContacts()}
function removeContact(cid,email){
 var m=A.modal({title:t("aud.rm.t","Remove contact"),desc:t("aud.rm.d","{e} will be removed from this audience.",{e:email}),actions:[{label:t("au.cancel","Cancel")},{label:t("aud.remove","Remove"),cls:"dng",onClick:function(mm,b){b.disabled=true;A.api("/audiences/"+encodeURIComponent(id)+"/contacts/"+cid,{method:"DELETE"}).then(function(){mm.close();refresh()},function(x){b.disabled=false;A.toast(err(x),"err")})}}]})
}
function addModal(){
 var b=document.createElement("div");
 b.innerHTML='<label class="lab" for="aTxt">'+e(t("aud.add.l","Email addresses"))+'</label><textarea class="fld bx-ta" id="aTxt" rows="8" spellcheck="false" placeholder="anna@example.com,Anna,Smith&#10;bob@example.com"></textarea><p class="fhint">'+e(t("aud.add.h","One contact per line: email, first name, last name. A CSV file with an email column works too."))+'</p><div class="bx-row"><label class="abtn" for="aFile">'+e(t("aud.add.file","Choose CSV file"))+'</label><input type="file" id="aFile" accept=".csv,.txt,text/csv,text/plain" hidden><span class="fhint" id="aFn"></span></div><p class="ferr" id="aErr" hidden></p>';
 var m=A.modal({title:t("aud.add","Add contacts"),desc:aud.name,body:b,wide:true,actions:[{label:t("au.cancel","Cancel")},{label:t("aud.add.go","Add"),cls:"pri",onClick:function(mm,btn){go(mm,btn)}}]});
 var f=b.querySelector("#aFile");f.onchange=function(){var file=f.files[0];if(!file)return;if(file.size>2000000){showErr(t("aud.add.big","The file is larger than 2 MB."));return}b.querySelector("#aFn").textContent=file.name;var r=new FileReader();r.onload=function(){b.querySelector("#aTxt").value=String(r.result||"")};r.readAsText(file)};
 function showErr(s){var er=b.querySelector("#aErr");er.textContent=s;er.hidden=false}
 function go(mm,btn){var v=b.querySelector("#aTxt").value;b.querySelector("#aErr").hidden=true;if(!v.trim())return showErr(t("aud.add.empty","Paste at least one email address."));btn.disabled=true;
  A.api("/audiences/"+encodeURIComponent(id)+"/contacts",{method:"POST",body:{csv:v}}).then(function(r){mm.close();A.toast(t("aud.add.done","Added {a}, already in the list {b}, skipped {c}",{a:A.num(r.added),b:A.num(r.existing),c:A.num(r.invalid+r.duplicates)}),"ok");refresh()},function(x){btn.disabled=false;var s=err(x);if(x.code==="limit_reached"&&x.data)s=t("aud.limit."+x.data.resource,s,{n:A.num(x.data.limit)});showErr(s)})}
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
