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
var LB={id:"bQ",q:"",placeholder:"",filters:[]};
function btbl(all){var f=LB.filters[0]?LB.filters[0].value:"",list=all.filter(function(b){return(!f||b.status===f)&&(!LB.q||(String(b.name)+" "+String(b.audience_name||"")).toLowerCase().indexOf(LB.q.toLowerCase())>-1)});if(!list.length)return A.empty(A.IC.bc,t("bc.none","No broadcasts match"),"");var cols="--cols:minmax(0,1.6fr) minmax(0,1.2fr) minmax(0,1fr) minmax(0,.9fr) minmax(0,1.5fr) 24px";return '<div class="dl bcs"><div class="drow dhead" style="'+cols+'"><div>'+e(t("bc.c.name","Name"))+"</div><div>"+e(t("bc.c.aud","Audience"))+"</div><div>"+e(t("bc.c.status","Status"))+"</div><div>"+e(t("bc.c.prog","Delivered"))+"</div><div>"+e(t("bc.c.date","Date"))+"</div><div></div></div>"+
 list.map(function(b){var dt=b.finished_at||b.scheduled_at||b.started_at||b.created_at,href=(b.status==="draft"?"/app/broadcasts/edit/?id=":"/app/broadcasts/view/?id=")+b.id;
  return'<div class="drow link" style="'+cols+'" data-go="'+e(href)+'"><div class="c strong ell" data-l="'+e(t("bc.c.name","Name"))+'">'+e(b.name)+'</div><div class="c dim ell" data-l="'+e(t("bc.c.aud","Audience"))+'">'+e(b.audience_name||"—")+'</div><div class="c" data-l="'+e(t("bc.c.status","Status"))+'">'+pill(b.status)+'</div><div class="c" data-l="'+e(t("bc.c.prog","Delivered"))+'">'+(b.status==="draft"?"—":A.num(b.sent)+" / "+A.num(b.total))+'</div><div class="c dim" data-l="'+e(t("bc.c.date","Date"))+'">'+e(A.date(dt))+'</div><div class="c end">'+A.icon(A.IC.chev,16)+"</div></div>"}).join("")+"</div>"}
function goRows(){root.querySelectorAll("[data-go]").forEach(function(r){r.onclick=function(){location.href=r.dataset.go}})}
function drawList(d){
 var body;
 if(!d.data.length)body=A.empty(A.IC.bc,t("bc.h","No broadcasts yet"),t("bc.p","Write an email once, pick an audience and Geserd sends it to every subscribed contact."),'<a class="abtn lg pri" href="/app/broadcasts/edit/">'+e(t("bc.new","Create broadcast"))+"</a>");
 else{var present=["draft","scheduled","sending","paused","sent","failed","canceled"].filter(function(x){return d.data.some(function(b){return b.status===x})});LB.placeholder=t("bc.search","Search broadcasts");LB.filters=[{id:"st",value:LB.filters[0]?LB.filters[0].value:"",options:[["",t("bc.f.all","All statuses")]].concat(present.map(function(x){return[x,t("bc.s."+x,x)]}))}];body=A.lbar(LB)+'<div id="bList">'+btbl(d.data.slice())+"</div>"}
 root.innerHTML=headList()+body;goRows();
 if(d.data.length)A.lbarWire(root,LB,function(){var l=document.getElementById("bList");l.innerHTML=btbl(d.data);goRows()})
}
function back(){return'<a class="backlnk" href="/app/broadcasts/">'+A.icon(A.IC.back,16)+"<span>"+e(t("bc.t","Broadcasts"))+"</span></a>"}
function loadView(first){
 if(first)root.innerHTML=back()+A.loading();
 A.api("/broadcasts/"+encodeURIComponent(id)).then(drawView,function(x){clearTimeout(poll);root.innerHTML=back()+A.failed(x,"bRetry");var b=document.getElementById("bRetry");if(b)b.onclick=function(){loadView(true)}})
}
function when(iso){try{return new Date(iso).toLocaleString(A.lang(),{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch(x){return""}}
var BI={users:'<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><path d="M16 5.3a3.2 3.2 0 0 1 0 5.9M18 14.3c1.7.6 2.8 2.2 3.2 4.7"/>',out:'<rect x="3" y="5" width="18" height="14" rx="3.5"/><path d="m4 8 8 5.5L20 8"/>',ok:'<path d="M21 11V9a3.5 3.5 0 0 0-3.5-3.5h-11A3.5 3.5 0 0 0 3 9v6a3.5 3.5 0 0 0 3.5 3.5H12"/><path d="m4 8.5 8 5 8-5"/><path d="m15.5 18 2 2 3.8-4"/>',back:'<path d="M9 14 4.5 9.5 9 5"/><path d="M4.5 9.5H15a5 5 0 0 1 0 10h-3"/>',flag:'<path d="M5 21V4"/><path d="M5 5h11l-2 4 2 4H5"/>',unsub:'<circle cx="10" cy="8" r="3.4"/><path d="M3.5 19.5c.7-3.4 3.2-5.3 6.5-5.3s5.8 1.9 6.5 5.3"/><path d="M17.5 8.5h4"/>',clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',at:'<circle cx="12" cy="12" r="3.3"/><path d="M15.3 8.7v4.1a2.2 2.2 0 0 0 4.4 0V12a7.7 7.7 0 1 0-3 6.1"/>',sub:'<path d="M4 7h16M4 12h16M4 17h10"/>',cal:'<rect x="3.5" y="5" width="17" height="15" rx="3.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',timer:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.2 1.4M9.5 3h5"/>',more:'<circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>',dup:'<rect x="9" y="9" width="11" height="11" rx="3"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',skip:'<circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/>',edit:'<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z"/>'};
function bi(n,s){return A.icon(BI[n],s||20)}
var seen={};
function pc(n,d){return d>0?Math.min(100,Math.round(n/d*1000)/10):0}
function pcs(n,d){if(!(d>0))return"—";var v=pc(n,d);return(v>=10||v===0?Math.round(v):v).toLocaleString(A.lang())+"%"}
function dur(a,z){var ms=new Date(z)-new Date(a);if(!(ms>0))return"";var m=Math.round(ms/60000);if(m<1)return"<1 "+t("bv.min","min");if(m<60)return m+" "+t("bv.min","min");var h=Math.floor(m/60),r=m%60;return h+" "+t("bv.h","h")+(r?" "+r+" "+t("bv.min","min"):"")}
function node(k,icon,label,val,sub,cls){return'<div class="bv-n '+(cls||"")+'" data-k="'+k+'"><i class="bv-ni">'+bi(icon,22)+'</i><div class="bv-nt"><b data-n="'+(val==null?"":val)+'">'+(val==null?"—":A.num(val))+"</b><span>"+e(label)+"</span></div><em>"+e(sub||"")+"</em></div>"}
function leg(k,icon,label,n,p){return'<div class="bv-lg" data-k="'+k+'"><i>'+bi(icon,18)+'</i><span>'+e(label)+"</span><b>"+A.num(n)+"</b><em>"+e(p)+"</em></div>"}
function seg(k,n,d){return n>0?'<i class="bv-sg '+k+'" data-w="'+pc(n,d)+'" title="'+A.num(n)+'"></i>':""}
function drow(icon,label,val){return'<div class="bv-dr"><i>'+bi(icon,18)+"</i><span>"+e(label)+"</span><b>"+val+"</b></div>"}
function flowHTML(b,s,live,paused){
 var sent=b.sent,tot=b.total,del=s?s.delivered:null,r=s?s.rates:{};
 var fl1=tot?Math.min(100,Math.round((sent+b.failed+b.skipped)/tot*100)):0,fl2=s&&sent?pc(s.delivered+s.bounced,sent):0;
 var skipNote=b.skipped+b.failed>0?(b.skipped?A.num(b.skipped)+" "+t("bv.skipped","skipped"):"")+(b.skipped&&b.failed?" · ":"")+(b.failed?A.num(b.failed)+" "+t("bv.failed","failed"):""):"";
 var path='<div class="bv-path'+(live&&!paused?" live":"")+'">'+node("r","users",t("bc.st.total","Recipients"),tot,skipNote)+'<div class="bv-ln"><i data-w="'+fl1+'"></i></div>'+node("s","out",t("bc.st.sent","Sent"),sent,tot?pcs(sent,tot):"")+'<div class="bv-ln"><i data-w="'+fl2+'"></i></div>'+node("d","ok",t("au.e.st.delivered","Delivered"),del,s?pcs(s.delivered,sent):"","fin")+"</div>";
 if(!s)return path;
 var bar='<div class="bv-bar" role="img" aria-label="'+e(t("bv.split","How sent emails ended up"))+'">'+seg("ok",s.delivered,sent)+seg("wait",s.in_transit,sent)+seg("bad",s.bounced,sent)+"</div>";
 var legend='<div class="bv-legend">'+leg("ok","ok",t("au.e.st.delivered","Delivered"),s.delivered,pcs(s.delivered,sent))+leg("wait","clock",t("bv.transit","On the way"),s.in_transit,pcs(s.in_transit,sent))+leg("bad","back",t("au.e.st.bounced","Bounced"),s.bounced,pcs(s.bounced,sent))+leg("flag","flag",t("bc.rs.complaints","Spam complaints"),s.complained,pcs(s.complained,sent))+leg("mut","unsub",t("bc.rs.unsub","Unsubscribed"),s.unsubscribed,pcs(s.unsubscribed,sent))+"</div>";
 return path+'<div class="bv-split"><h3>'+e(t("bv.split","How sent emails ended up"))+"</h3>"+bar+"</div>"+legend
}
function countUp(root){
 root.querySelectorAll("b[data-n]").forEach(function(x){var v=+x.dataset.n;if(!x.dataset.n||isNaN(v)||v<2)return;var t0=performance.now();function f(n){var k=Math.min(1,(n-t0)/700);k=1-Math.pow(1-k,3);x.textContent=A.num(Math.round(v*k));if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)})
}
function grow(root,first){
 var els=root.querySelectorAll("[data-w]");
 if(!first){els.forEach(function(x){x.style.transition="none";x.style.setProperty("--p",x.dataset.w)});return}
 requestAnimationFrame(function(){requestAnimationFrame(function(){els.forEach(function(x){x.style.setProperty("--p",x.dataset.w)})})})
}
function drawView(b){
 clearTimeout(poll);
 if(b.sent>0)A.api("/broadcasts/"+encodeURIComponent(b.id)+"/stats").then(function(s){render(b,s)},function(){render(b,null)});
 else render(b,null)
}
function render(b,s){
 var first=!seen[b.id];seen[b.id]=1;
 var live=b.status==="sending"||b.status==="scheduled"||b.status==="paused",paused=b.status==="paused";
 var menu=[];
 if(live)menu.push({label:t("bc.cancel","Cancel sending"),icon:BI.skip,cls:"dng",fn:function(){confirmBox(t("bc.cancel.t","Cancel sending"),t("bc.cancel.d","Emails that were already sent can’t be recalled. The rest will not be sent."),t("bc.cancel","Cancel sending"),"/broadcasts/"+encodeURIComponent(id)+"/cancel","POST",function(){loadView(true)})}});
 else menu.push({label:t("bc.del","Delete"),icon:A.IC.trash,cls:"dng",fn:function(){confirmBox(t("bc.del.t","Delete broadcast"),t("bc.del.d","The broadcast will be removed from the list. Sent emails stay in your logs."),t("bc.del","Delete"),"/broadcasts/"+encodeURIComponent(id),"DELETE",function(){location.href="/app/broadcasts/"})}});
 var warnI='<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',note="";
 if(paused)note='<div class="bv-note">'+A.icon(warnI,18)+"<span>"+e(t("bc.paused","Your plan’s sending limit was reached. Sending continues automatically on {d}.",{d:when(b.resume_at)}))+"</span></div>";
 else if(b.status==="failed")note='<div class="bv-note bad">'+A.icon(warnI,18)+"<span>"+e(t("bc.err."+b.error,t("bc.err.generic","Sending stopped because of an error.")))+"</span></div>";
 else if(b.status==="scheduled")note='<div class="bv-note">'+bi("clock",18)+"<span>"+e(t("bc.sched","Scheduled for {d}.",{d:when(b.scheduled_at)}))+"</span></div>";
 var meta='<div class="bv-meta">'+(b.audience_name?"<span>"+bi("users",16)+e(b.audience_name)+"</span>":"")+(b.from_addr?"<span>"+bi("at",16)+e(b.from_addr)+"</span>":"")+(b.started_at?"<span>"+bi("cal",16)+e(when(b.started_at))+"</span>":"")+"</div>";
 var head='<div class="bv-head"><div class="bv-ht"><h1>'+e(b.name)+"</h1>"+pill(b.status)+"</div>"+meta+'</div><div class="bv-act"><button type="button" class="abtn lg" id="bDup">'+bi("dup",16)+"<span>"+e(t("bc.dup","Duplicate"))+'</span></button><button type="button" class="abtn lg bv-more" id="bMore" aria-label="'+e(t("bv.more","More"))+'" aria-haspopup="menu" aria-expanded="false">'+bi("more",20)+"</button></div>";
 var body;
 if(b.status==="draft"||(!(b.sent>0)&&!live))body='<section class="bv-card bv-empty"><i>'+bi("edit",26)+"</i><h2>"+e(t("bv.draft.t","Nothing has been sent yet"))+"</h2><p>"+e(t("bv.draft.p","Results appear here as soon as the first email leaves."))+'</p><a class="abtn lg pri" href="/app/broadcasts/edit/?id='+encodeURIComponent(b.id)+'">'+e(t("bv.draft.b","Edit draft"))+"</a></section>";
 else body='<section class="bv-card bv-flow"><div class="bv-ct"><h2>'+e(t("bv.path","Delivery path"))+"</h2>"+(s&&s.archived?"<small>"+e(t("bc.rs.arch","These results were saved before the delivery logs expired and no longer update."))+"</small>":s&&s.in_transit>0?"<small>"+e(t("bc.rs.transit","{n} emails are still on their way. The numbers update as providers respond.",{n:A.num(s.in_transit)}))+"</small>":b.finished_at?"<small>"+e(t("bv.done","Finished {d} · took {t}",{d:when(b.finished_at),t:dur(b.started_at,b.finished_at)||"—"}))+"</small>":"")+"</div>"+flowHTML(b,s,live,paused)+"</section>";
 var tl=s&&s.timeline||[],time="";
 if(s&&tl.length>=2){
  var first1=tl[0].delivered,cap=s.delivered>0?t("bv.first","{a} of {b} delivered in the first hour",{a:A.num(first1),b:A.num(s.delivered)}):"";
  time='<section class="bv-sec"><div class="bv-st"><h2>'+e(t("bc.rs.tl","Deliveries by hour"))+"</h2><small>"+e(cap)+'</small></div><div class="bv-chart" id="bsChart"></div></section>'
 }
 var tabs=[];
 if(s&&s.bounce_list&&s.bounce_list.length)tabs.push(["b",t("au.e.st.bounced","Bounced"),s.bounce_list.length]);
 if(s&&s.complaint_list&&s.complaint_list.length)tabs.push(["c",t("bc.rs.complaints","Spam complaints"),s.complaint_list.length]);
 if(s&&s.unsub_list&&s.unsub_list.length)tabs.push(["u",t("bc.rs.unsub","Unsubscribed"),s.unsub_list.length]);
 if(b.failures&&b.failures.length)tabs.push(["f",t("bc.fails","Failed deliveries"),b.failures.length]);
 var attn=tabs.length?'<section class="bv-sec"><div class="bv-st"><h2>'+e(t("bv.people","Who needs a look"))+'</h2></div><div class="bv-tabs" role="tablist">'+tabs.map(function(x,i){return'<button type="button" role="tab" data-t="'+x[0]+'" class="'+(i?"":"on")+'">'+e(x[1])+"<em>"+x[2]+"</em></button>"}).join("")+'</div><div class="bv-pane" id="bvPane"></div></section>':"";
 var d=b.started_at&&b.finished_at?dur(b.started_at,b.finished_at):"";
 var prev=b.html?'<div id="bxPv"></div>':'<pre class="bx-pre">'+e(b.text||"")+"</pre>";
 root.innerHTML=back()+'<div class="bv'+(first?" bv-in":"")+'"><div class="bv-top">'+head+"</div>"+note+body+time+attn+(b.html||b.text?'<section class="bv-sec"><div class="bv-st"><h2>'+e(t("bc.content","Content"))+"</h2>"+(b.subject?"<small>"+e(t("bc.subject","Subject"))+": "+e(b.subject)+"</small>":"")+"</div>"+prev+"</section>":"")+"</div>";
 var pvh=document.getElementById("bxPv");if(pvh)pvh.appendChild(A.paperBox(b.html,"bx-prev",""));
 var vr=root.querySelector(".bv");grow(vr,first);if(first)countUp(vr);
 var ch=document.getElementById("bsChart");
 if(ch)A.bars(ch,tl.map(function(x){return{t:x.t,v:x.delivered,raw:x}}),{hourly:true,color:"var(--a-ok)",name:t("au.e.st.delivered","Delivered"),label:t("bc.rs.tl","Deliveries by hour"),tip:function(p){return[[t("au.e.st.delivered","Delivered"),A.num(p.raw.delivered)],[t("au.e.st.bounced","Bounced"),A.num(p.raw.bounced)],[t("bc.rs.complaints","Spam complaints"),A.num(p.raw.complained)]]}});
 if(tabs.length){
  var pane=document.getElementById("bvPane");
  function row(main,sub,when2,tag){return'<div class="bv-pr"><b class="ell">'+e(main)+"</b>"+(sub?'<span class="ell">'+e(sub)+"</span>":"")+(when2?'<em title="'+e(A.date(when2))+'">'+e(A.ago(when2))+"</em>":"")+"</div>"}
  function show(k){
   var h="";
   if(k==="b"){
    if(s.reasons&&s.reasons.some(function(r){return r.n>1}))h+='<div class="bv-rs">'+s.reasons.map(function(r){return"<span><b>"+A.num(r.n)+"</b>"+e(A.dsn(r.dsn))+"</span>"}).join("")+"</div>";
    h+=s.bounce_list.map(function(x){return row(x.email||"",A.dsn(x.dsn),x.at)}).join("")
   }else if(k==="c")h=s.complaint_list.map(function(x){return row(x.email||"","",x.at)}).join("");
   else if(k==="u")h=s.unsub_list.map(function(x){return row(x.email||"","",x.at)}).join("");
   else h=b.failures.map(function(f){return row(f.email,t("bc.fe."+f.error,t("bc.fe.generic","Delivery failed")),null)}).join("");
   pane.innerHTML=h
  }
  show(tabs[0][0]);
  root.querySelectorAll(".bv-tabs button").forEach(function(x){x.onclick=function(){root.querySelectorAll(".bv-tabs button").forEach(function(y){y.classList.toggle("on",y===x)});show(x.dataset.t)}})
 }
 document.getElementById("bDup").onclick=function(){var x=this;x.disabled=true;A.api("/broadcasts/"+encodeURIComponent(id)+"/duplicate",{method:"POST"}).then(function(n){location.href="/app/broadcasts/edit/?id="+n.id},function(z){x.disabled=false;A.toast(err(z),"err")})};
 var mb=document.getElementById("bMore");mb.onclick=function(ev){ev.stopPropagation();A.menu(mb,menu)};
 if(live)poll=setTimeout(function(){loadView(false)},b.status==="sending"?3000:15000)
}
function confirmBox(title,desc,label,path,method,done){
 A.modal({title:title,desc:desc,actions:[{label:t("au.cancel","Cancel")},{label:label,cls:"dng",onClick:function(mm,btn){btn.disabled=true;A.api(path,{method:method}).then(function(){mm.close();done()},function(x){btn.disabled=false;mm.close();A.toast(err(x),"err")})}}]})
}
A.ready(function(){root=document.getElementById("app-root");if(!root)return;if(root.dataset.page==="broadcast")id?loadView(true):location.replace("/app/broadcasts/");else loadList()})
})();
