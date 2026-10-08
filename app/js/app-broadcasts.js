(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,id=new URLSearchParams(location.search).get("id"),poll;
var KIND={draft:"dim",scheduled:"wait",sending:"wait",paused:"wait",sent:"ok",failed:"bad",canceled:"dim"};
function ico(n){return A.icon(A.IC[n],16)}
function err(x){var m=A.t("au.err."+(x&&x.code),"");return m||A.err(x)}
function pill(s){return A.pill(KIND[s]||"dim",t("bc.s."+s,s))}
function pct(b){return b.total?Math.min(100,Math.round((b.sent+b.failed+b.skipped)/b.total*100)):0}
function headList(){return'<div class="ph pgh"><div><h1>'+e(t("bc.t","Broadcasts"))+'</h1><p class="psub">'+e(t("bc.sub","Send one email to a whole audience, with an unsubscribe link in every message."))+'</p></div><a class="abtn lg pri" href="/app/broadcasts/edit/">'+ico("plus")+"<span>"+e(t("bc.new","Create broadcast"))+"</span></a></div>"}
function loadList(){
 root.innerHTML=headList()+A.loading();
 A.api("/broadcasts?limit=100").then(drawList,function(x){root.innerHTML=headList()+A.failed(x,"bRetry");var b=document.getElementById("bRetry");if(b)b.onclick=loadList})
}
function drawList(d){
 var cols="--cols:minmax(0,1.6fr) minmax(0,1.2fr) minmax(0,1fr) minmax(0,1.1fr) minmax(0,1fr) 24px",body;
 if(!d.data.length)body=A.empty(A.IC.mail,t("bc.h","No broadcasts yet"),t("bc.p","Write an email once, pick an audience and Geserd sends it to every subscribed contact."),'<a class="abtn lg pri" href="/app/broadcasts/edit/">'+e(t("bc.new","Create broadcast"))+"</a>");
 else body='<div class="dl"><div class="drow dhead" style="'+cols+'"><div>'+e(t("bc.c.name","Name"))+"</div><div>"+e(t("bc.c.aud","Audience"))+"</div><div>"+e(t("bc.c.status","Status"))+"</div><div>"+e(t("bc.c.prog","Delivered"))+"</div><div>"+e(t("bc.c.date","Date"))+"</div><div></div></div>"+
 d.data.map(function(b){var dt=b.finished_at||b.scheduled_at||b.started_at||b.created_at,href=(b.status==="draft"?"/app/broadcasts/edit/?id=":"/app/broadcasts/view/?id=")+b.id;
  return'<div class="drow link" style="'+cols+'" data-go="'+e(href)+'"><div class="c strong ell" data-l="'+e(t("bc.c.name","Name"))+'">'+e(b.name)+'</div><div class="c dim ell" data-l="'+e(t("bc.c.aud","Audience"))+'">'+e(b.audience_name||"—")+'</div><div class="c" data-l="'+e(t("bc.c.status","Status"))+'">'+pill(b.status)+'</div><div class="c" data-l="'+e(t("bc.c.prog","Delivered"))+'">'+(b.status==="draft"?"—":A.num(b.sent)+" / "+A.num(b.total))+'</div><div class="c dim" data-l="'+e(t("bc.c.date","Date"))+'">'+e(A.date(dt))+'</div><div class="c end">'+A.icon(A.IC.chev,16)+"</div></div>"}).join("")+"</div>";
 root.innerHTML=headList()+body;
 root.querySelectorAll("[data-go]").forEach(function(r){r.onclick=function(){location.href=r.dataset.go}})
}
function back(){return'<a class="backlnk" href="/app/broadcasts/">'+A.icon(A.IC.back,16)+"<span>"+e(t("bc.t","Broadcasts"))+"</span></a>"}
function loadView(first){
 if(first)root.innerHTML=back()+A.loading();
 A.api("/broadcasts/"+encodeURIComponent(id)).then(drawView,function(x){clearTimeout(poll);root.innerHTML=back()+A.failed(x,"bRetry");var b=document.getElementById("bRetry");if(b)b.onclick=function(){loadView(true)}})
}
function when(iso){try{return new Date(iso).toLocaleString(A.lang(),{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch(x){return""}}
function drawView(b){
 clearTimeout(poll);
 var live=b.status==="sending"||b.status==="scheduled"||b.status==="paused",p=pct(b);
 var acts='<button type="button" class="abtn lg" id="bDup">'+e(t("bc.dup","Duplicate"))+"</button>"+(live?'<button type="button" class="abtn lg dng" id="bCancel">'+e(t("bc.cancel","Cancel sending"))+"</button>":'<button type="button" class="abtn lg dng" id="bDel">'+e(t("bc.del","Delete"))+"</button>");
 var note="";
 if(b.status==="paused")note='<div class="warn">'+A.icon('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',18)+"<span>"+e(t("bc.paused","Your plan’s sending limit was reached. Sending continues automatically on {d}.",{d:when(b.resume_at)}))+"</span></div>";
 else if(b.status==="failed")note='<div class="warn bad">'+A.icon('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',18)+"<span>"+e(t("bc.err."+b.error,t("bc.err.generic","Sending stopped because of an error.")))+"</span></div>";
 else if(b.status==="scheduled")note='<div class="warn">'+A.icon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',18)+"<span>"+e(t("bc.sched","Scheduled for {d}.",{d:when(b.scheduled_at)}))+"</span></div>";
 function stat(l,v){return'<div class="bx-stat"><b>'+A.num(v)+"</b><span>"+e(l)+"</span></div>"}
 var fails=b.failures&&b.failures.length?'<h2 class="sh3">'+e(t("bc.fails","Failed deliveries"))+'</h2><div class="dl">'+b.failures.map(function(f){return'<div class="drow" style="--cols:minmax(0,1fr) minmax(0,1fr)"><div class="c strong ell">'+e(f.email)+'</div><div class="c dim ell">'+e(t("bc.fe."+f.error,t("bc.fe.generic","Delivery failed")))+"</div></div>"}).join("")+"</div>":"";
 var prev=b.html?'<iframe class="bx-prev" sandbox="" title="'+e(t("bc.preview","Preview"))+'" srcdoc="'+e(b.html)+'"></iframe>':'<pre class="bx-pre">'+e(b.text||"")+"</pre>";
 root.innerHTML=back()+'<div class="ph pgh"><div><h1>'+e(b.name)+'</h1><p class="psub">'+pill(b.status)+'</p></div><div class="bx-act">'+acts+"</div></div>"+note+
 '<div class="bx-prog"><div class="bx-bartrack"><i style="width:'+p+'%"></i></div><span>'+e(t("bc.progress","{a}% processed",{a:p}))+"</span></div>"+
 '<div class="bx-stats">'+stat(t("bc.st.total","Recipients"),b.total)+stat(t("bc.st.sent","Sent"),b.sent)+stat(t("bc.st.skipped","Skipped"),b.skipped)+stat(t("bc.st.failed","Failed"),b.failed)+"</div>"+
 '<div class="bx-info"><div><span>'+e(t("bc.c.aud","Audience"))+"</span><b>"+e(b.audience_name||"—")+"</b></div><div><span>"+e(t("bc.from","From"))+"</span><b>"+e(b.from_addr||"—")+"</b></div><div><span>"+e(t("bc.subject","Subject"))+"</span><b>"+e(b.subject||"—")+"</b></div>"+(b.started_at?"<div><span>"+e(t("bc.started","Started"))+"</span><b>"+e(when(b.started_at))+"</b></div>":"")+(b.finished_at?"<div><span>"+e(t("bc.finished","Finished"))+"</span><b>"+e(when(b.finished_at))+"</b></div>":"")+"</div>"+fails+
 '<h2 class="sh3">'+e(t("bc.content","Content"))+"</h2>"+prev;
 document.getElementById("bDup").onclick=function(){var x=this;x.disabled=true;A.api("/broadcasts/"+encodeURIComponent(id)+"/duplicate",{method:"POST"}).then(function(n){location.href="/app/broadcasts/edit/?id="+n.id},function(z){x.disabled=false;A.toast(err(z),"err")})};
 var c=document.getElementById("bCancel");if(c)c.onclick=function(){confirmBox(t("bc.cancel.t","Cancel sending"),t("bc.cancel.d","Emails that were already sent can’t be recalled. The rest will not be sent."),t("bc.cancel","Cancel sending"),"/broadcasts/"+encodeURIComponent(id)+"/cancel","POST",function(){loadView(true)})};
 var d=document.getElementById("bDel");if(d)d.onclick=function(){confirmBox(t("bc.del.t","Delete broadcast"),t("bc.del.d","The broadcast will be removed from the list. Sent emails stay in your logs."),t("bc.del","Delete"),"/broadcasts/"+encodeURIComponent(id),"DELETE",function(){location.href="/app/broadcasts/"})};
 if(b.status==="sending"||b.status==="scheduled"||b.status==="paused")poll=setTimeout(function(){loadView(false)},b.status==="sending"?3000:15000)
}
function confirmBox(title,desc,label,path,method,done){
 A.modal({title:title,desc:desc,actions:[{label:t("au.cancel","Cancel")},{label:label,cls:"dng",onClick:function(mm,btn){btn.disabled=true;A.api(path,{method:method}).then(function(){mm.close();done()},function(x){btn.disabled=false;mm.close();A.toast(err(x),"err")})}}]})
}
A.ready(function(){root=document.getElementById("app-root");if(!root)return;if(root.dataset.page==="broadcast")id?loadView(true):location.replace("/app/broadcasts/");else loadList()})
})();
