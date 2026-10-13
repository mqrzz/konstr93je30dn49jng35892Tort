(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,page,F={q:"",status:"",plan:"",flag:""},U={off:0,rows:[],total:0};
var P={shield:'<path d="M12 3 4 6v6c0 4.5 3.2 7.5 8 9 4.8-1.5 8-4.5 8-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',map:'<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3.5 7.5 8.5 6 8.5-6"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',pause:'<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',ok:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',back:'<path d="m15 6-6 6 6 6"/>'};
var TABS=[["","ad.t.over","Overview","/app/admin/",P.shield],["users","ad.t.users","Users","/app/admin/users/",P.users],["review","ad.t.review","Review","/app/admin/review/",P.flag],["siberia","ad.t.sib","Applications","/app/admin/siberia/",P.map],["tickets","ad.t.tickets","Tickets","/app/admin/tickets/",P.chat],["rating","ad.t.rating","Rating rules","/app/admin/rating/",P.star]];
function head(){
 return'<div class="ph"><h1>'+e(t("ad.h","Admin"))+'</h1></div><nav class="stabs ad-tabs">'+TABS.map(function(x){return'<a href="'+x[3]+'"'+((page===x[0]||(x[0]==="users"&&page==="user"))?' class="on"':"")+'>'+A.icon(x[4],16)+"<span>"+e(t(x[1],x[2]))+"</span></a>"}).join("")+"</nav>"
}
function shell(inner){root.innerHTML=head()+inner}
function fail(x,id){root.innerHTML=head()+A.failed(x,id);document.getElementById(id).onclick=function(){load()}}
function pill(s){var k=s==="active"||s==="approved"||s==="reviewed"?"ok":s==="frozen"||s==="pending"||s==="open"?"wait":s==="blocked"||s==="rejected"||s==="revoked"?"bad":"dim";return A.pill(k,t("ad.s."+s,s))}
function tile(n,l,ic,href,cls){return'<'+(href?'a href="'+href+'"':"div")+' class="ad-tile'+(cls?" "+cls:"")+'"><span class="ad-ti">'+A.icon(ic,20)+"</span><b>"+A.num(n)+"</b><span>"+e(l)+"</span></"+(href?"a":"div")+">"}
function ov(){
 A.api("/admin/overview").then(function(d){
  var u=d.users,m=d.mail24h,q=d.queues;
  shell('<div class="ad-tiles">'+tile(u.total,t("ad.o.users","Accounts"),P.users,"/app/admin/users/")+tile(u.new7,t("ad.o.new","New in 7 days"),P.users,"/app/admin/users/")+tile(u.frozen,t("ad.o.frozen","Frozen"),P.pause,"/app/admin/users/?status=frozen")+tile(u.blocked,t("ad.o.blocked","Blocked"),P.ban,"/app/admin/users/?status=blocked")+"</div><h2 class=\"sh3\">"+e(t("ad.o.queues","Needs your attention"))+'</h2><div class="ad-tiles">'+tile(q.flags_open,t("ad.o.flags","Open review flags"),P.flag,"/app/admin/review/",q.flags_open?"hot":"")+tile(q.siberia_pending,t("ad.o.sib","Siberia applications"),P.map,"/app/admin/siberia/",q.siberia_pending?"hot":"")+tile(q.tickets_open,t("ad.o.tickets","Open tickets"),P.chat,"/app/admin/tickets/",q.tickets_open?"hot":"")+"</div><h2 class=\"sh3\">"+e(t("ad.o.mail","Email in the last 24 hours"))+'</h2><div class="ad-tiles">'+tile(m.sent,t("ad.o.sent","Sent"),P.mail)+tile(m.bounced,t("ad.o.bounced","Bounced"),P.mail)+tile(m.complained,t("ad.o.compl","Complained"),P.mail)+"</div><h2 class=\"sh3\">"+e(t("ad.o.plans","Plans"))+'</h2><div class="ad-tiles">'+["free","pro","business","enterprise"].map(function(p){return tile(u[p],t("app.plan."+p,p),P.star)}).join("")+tile(u.siberia,t("ad.o.siberia","Siberia tariff"),P.map)+"</div>")
 },function(x){fail(x,"adRetry")})
}
function usersTool(){
 var tl=document.getElementById("adTool");tl.innerHTML="";
 var s=document.createElement("label");s.className="bx-search lg-search";s.innerHTML=A.icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',16)+'<input type="search" autocomplete="off" maxlength="100" placeholder="'+e(t("ad.u.search","Search by email, name or ID"))+'" aria-label="'+e(t("au.search","Search"))+'">';
 var inp=s.querySelector("input"),tm;inp.value=F.q;inp.oninput=function(){clearTimeout(tm);tm=setTimeout(function(){F.q=inp.value.trim();users(true)},300)};tl.appendChild(s);
 tl.appendChild(A.dropdown([["",t("ad.u.allst","All statuses")],["active",t("ad.s.active","Active")],["frozen",t("ad.s.frozen","Frozen")],["blocked",t("ad.s.blocked","Blocked")]],F.status,function(v){F.status=v;users(true)}));
 tl.appendChild(A.dropdown([["",t("ad.u.allpl","All plans")],["free",t("app.plan.free","Free")],["pro",t("app.plan.pro","Pro")],["business",t("app.plan.business","Business")],["enterprise",t("app.plan.enterprise","Enterprise")]],F.plan,function(v){F.plan=v;users(true)}));
 tl.appendChild(A.dropdown([["",t("ad.u.allfl","Any review state")],["open",t("ad.u.flagged","Needs review")]],F.flag,function(v){F.flag=v;users(true)}))
}
function users(reset){
 if(reset){U.off=0;U.rows=[]}
 var qs=["limit=50","offset="+U.off];["q","status","plan","flag"].forEach(function(k){if(F[k])qs.push(k+"="+encodeURIComponent(F[k]))});
 A.api("/admin/users?"+qs.join("&")).then(function(d){
  U.rows=U.rows.concat(d.data);U.total=d.total;U.off=U.rows.length;
  var b=document.getElementById("adBody");
  if(!U.rows.length){b.innerHTML=A.empty(P.users,t("ad.u.none","No accounts match"),t("ad.u.none.p","Try another search or filter."));return}
  b.innerHTML='<div class="dl">'+U.rows.map(function(r){return'<a class="drow link ad-ur" href="/app/admin/users/view/?id='+r.id+'" style="--cols:minmax(0,2.4fr) minmax(0,1fr) minmax(0,1fr) 70px minmax(0,1fr)"><div class="c" data-l="'+e(t("ad.u.acc","Account"))+'"><span class="ad-av">'+e((r.name||r.email).charAt(0).toUpperCase())+'</span><span class="ad-nm"><b class="ell">'+e(r.email)+'</b><small class="ell">'+e(r.name||"")+(r.is_admin?" · "+e(t("ad.u.admin","admin")):"")+"</small></span></div><div class=\"c\" data-l=\""+e(t("ad.u.plan","Plan"))+'">'+A.pill("dim",t("app.plan."+r.plan,r.plan))+(r.tariff==="siberia"?' <small class="dim">'+e(t("ad.o.siberia","Siberia"))+"</small>":"")+'</div><div class="c" data-l="'+e(t("ad.u.status","Status"))+'">'+pill(r.status)+'</div><div class="c" data-l="'+e(t("ad.u.flags","Flags"))+'">'+(r.flags?'<b class="ad-fl">'+r.flags+"</b>":'<span class="dim">0</span>')+'</div><div class="c dim" data-l="'+e(t("ad.u.created","Created"))+'">'+e(A.ago(r.created_at))+"</div></a>"}).join("")+"</div><div class=\"bx-pg\"><span>"+e(t("ap.lg.showing","Showing {a} of {b}",{a:A.num(U.rows.length),b:A.num(U.total)}))+"</span>"+(U.rows.length<U.total?'<div><button type="button" class="abtn lg" id="adMore">'+e(t("au.more","Load more"))+"</button></div>":"")+"</div>";
  var mb=document.getElementById("adMore");if(mb)mb.onclick=function(){mb.disabled=true;users(false)}
 },function(x){document.getElementById("adBody").innerHTML=A.failed(x,"adRetry");document.getElementById("adRetry").onclick=function(){users(true)}})
}
function stateModal(u,st,done){
 var tt={frozen:t("ad.m.freeze","Freeze this account?"),blocked:t("ad.m.block","Block this account?"),active:t("ad.m.unfreeze","Restore this account?")}[st];
 var m=A.modal({title:tt,body:'<p class="dim">'+e(st==="active"?t("ad.m.restore.p","The user will be told that the account is active again."):t("ad.m.state.p","The user is notified by email and in the dashboard. Sending stops; a blocked user cannot sign in to the dashboard or use API keys."))+'</p>'+(st==="active"?"":'<div class="pfld"><label for="adRs">'+e(t("ad.m.reason","Internal reason"))+'</label><input id="adRs" maxlength="300"></div>')+'<div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.m.go","Confirm"))+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var b=this;b.disabled=true;var rs=m.body.querySelector("#adRs");A.api("/admin/users/"+u.id,{method:"PATCH",body:{status:st,reason:rs?rs.value:""}}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));done()},function(x){b.disabled=false;A.toast(A.err(x),"err")})}
}
function dl(rows){return'<dl class="meta">'+rows.filter(function(r){return r[1]!=null&&r[1]!==""}).map(function(r){return"<div><dt>"+e(r[0])+'</dt><dd class="brk">'+e(r[1])+"</dd></div>"}).join("")+"</dl>"}
function flagHtml(f){
 var d=f.details||{},chips=[];
 if(d.same_email)chips.push(t("ad.f.alias","Same email once aliases are removed"));
 if(d.shared_ip_sessions)chips.push(t("ad.f.ip","Shared IP in {n} sign-ins",{n:d.shared_ip_sessions}));
 if(d.same_browser)chips.push(t("ad.f.ua","Same browser"));
 if(d.created_close)chips.push(t("ad.f.close","Created within 48 hours"));
 if(d.same_inn)chips.push(t("ad.f.inn","Same tax ID in applications"));
 if(d.shared_api_ip)chips.push(t("ad.f.api","API used from the same IP"));
 if(d.disposable_email)chips.push(t("ad.f.disp","Disposable email domain"));
 if(d.other_account_restricted)chips.push(t("ad.f.restr","The other account is {s}",{s:t("ad.s."+d.other_account_restricted,d.other_account_restricted)}));
 if(d.accounts_24h)chips.push(t("ad.f.burst","{n} accounts from one IP in 24 hours",{n:d.accounts_24h}));
 return chips.map(function(c){return'<span class="ad-chip">'+e(c)+"</span>"}).join("")
}
function user(){
 var id=new URLSearchParams(location.search).get("id");
 A.api("/admin/users/"+encodeURIComponent(id)).then(function(u){
  var r=u.rating,m=u.mail30,c=u.counts;
  var acts='<div class="ad-act">'+(u.status!=="frozen"&&u.status!=="blocked"?"":'<button type="button" class="abtn pri" data-s="active">'+A.icon(P.ok,16)+"<span>"+e(t("ad.a.restore","Restore"))+"</span></button>")+(u.status==="active"&&!u.is_admin?'<button type="button" class="abtn" data-s="frozen">'+A.icon(P.pause,16)+"<span>"+e(t("ad.a.freeze","Freeze"))+"</span></button>":"")+(u.status!=="blocked"&&!u.is_admin?'<button type="button" class="abtn bad" data-s="blocked">'+A.icon(P.ban,16)+"<span>"+e(t("ad.a.block","Block"))+"</span></button>":"")+"</div>";
  var sec=function(ti,body){return'<section class="gcard"><h2 class="sh3">'+e(ti)+"</h2>"+body+"</section>"};
  var tbl=function(cols,rows){return rows.length?'<div class="ad-tbl"><table><thead><tr>'+cols.map(function(c){return"<th>"+e(c)+"</th>"}).join("")+"</tr></thead><tbody>"+rows.map(function(r){return"<tr>"+r.map(function(x){return"<td>"+x+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table></div>":'<p class="dim">'+e(t("ad.none","Nothing here yet."))+"</p>"};
  root.innerHTML=head()+'<a class="bx-back" href="/app/admin/users/">'+A.icon(P.back,16)+"<span>"+e(t("ad.back","All accounts"))+'</span></a><section class="gcard ad-uh"><span class="ad-av big">'+e((u.name||u.email).charAt(0).toUpperCase())+'</span><div class="ad-un"><h2>'+e(u.email)+"</h2><p>"+e(u.name||"")+'</p><div class="ad-pl">'+pill(u.status)+A.pill("dim",t("app.plan."+u.plan,u.plan))+(u.tariff==="siberia"?A.pill("dim",t("ad.o.siberia","Siberia tariff")):"")+(u.is_admin?A.pill("dim",t("ad.u.admin","admin")):"")+"</div>"+(u.status_reason?'<p class="dim sm">'+e(t("ad.reason","Reason: {x}",{x:u.status_reason}))+"</p>":"")+"</div>"+acts+"</section>"+
   '<div class="ad-two">'+sec(t("ad.d.rating","Account rating"),'<div class="ad-rt"><b>'+r.score+"</b><span>/ 100</span>"+A.pill(r.level==="low"?"bad":r.level==="fair"?"wait":"ok",t("rt.l."+r.level,r.level))+'</div><div class="ad-rf">'+r.factors.map(function(f){return'<div><span>'+e(t("rt.f."+f.id,f.id))+"</span><b>"+f.points+"/"+f.max+"</b></div>"}).join("")+'</div><div class="pfld"><label for="adAdj">'+e(t("ad.d.adjust","Manual adjustment (−100 to 100)"))+'</label><div class="ad-adj"><input id="adAdj" type="number" min="-100" max="100" value="'+(u.rating_adjust||0)+'"><button type="button" class="abtn" id="adAdjGo">'+e(t("ad.d.save","Save"))+"</button></div></div>")+sec(t("ad.d.profile","Account"),dl([[t("ad.d.id","ID"),u.id],[t("ad.d.region","Region"),(u.region||"")+(u.account_country?" · "+u.account_country:"")],[t("ad.d.lang","Language"),u.lang],[t("ad.d.created","Created"),A.date(u.created_at)],[t("ad.d.onb","Setup finished"),u.onboarded_at?A.date(u.onboarded_at):"—"]])+'<div class="pfld"><label>'+e(t("ad.d.plan","Plan"))+'</label><div class="ad-adj" id="adPlan"></div></div>')+"</div>"+
   sec(t("ad.d.act","Activity in 30 days"),'<div class="ad-tiles s">'+tile(m.sent,t("ad.o.sent","Sent"),P.mail)+tile(m.delivered,t("au.e.st.delivered","Delivered"),P.mail)+tile(m.bounced,t("ad.o.bounced","Bounced"),P.mail)+tile(m.complained,t("ad.o.compl","Complained"),P.mail)+tile(c.domains,t("app.nav.domains","Domains"),P.map)+tile(c.keys,t("app.nav.apikeys","API keys"),P.lock)+tile(c.audiences,t("app.nav.audiences","Audiences"),P.users)+tile(c.tickets,t("ad.t.tickets","Tickets"),P.chat)+"</div>")+
   sec(t("ad.d.flags","Review flags"),u.flags.length?u.flags.map(function(f){return'<div class="ad-fr"><div>'+pill(f.status)+'<b class="ad-sc">'+f.score+'</b><span class="dim">'+e(t("ad.k."+f.kind,f.kind))+(f.related_email?" · "+e(f.related_email):"")+"</span></div><div>"+flagHtml(f)+"</div></div>"}).join(""):'<p class="dim">'+e(t("ad.none","Nothing here yet."))+"</p>")+
   sec(t("ad.d.sess","Sign-ins"),tbl([t("ad.d.ip","IP"),t("ad.d.ua","Browser"),t("ad.d.when","When")],u.sessions.map(function(s){return[e(s.ip||""),'<span class="ell ad-ua">'+e(s.ua||"")+"</span>",e(A.date(s.created_at))]})))+
   sec(t("ad.d.keys","API keys"),tbl([t("ad.d.name","Name"),t("ad.d.prefix","Prefix"),t("ad.d.last","Last used"),t("ad.u.status","Status")],u.keys.map(function(k){return[e(k.name),"<code>"+e(k.prefix)+"…</code>",k.last_used_at?e(A.ago(k.last_used_at)):"—",k.revoked_at?pill("revoked"):pill("active")]})))+
   sec(t("ad.d.dom","Domains"),tbl([t("ad.d.name","Name"),t("ad.u.status","Status"),t("ad.u.created","Created")],u.domains.map(function(d){return[e(d.name),e(d.status),e(A.ago(d.created_at))]})))+
   sec(t("ad.d.app","Siberia applications"),u.applications.length?u.applications.map(function(a){return'<div class="ad-fr"><div>'+pill(a.status)+" <b>"+e(a.org_name)+'</b> <span class="dim">'+e(t("sb.r."+a.region,a.region))+" · "+e(a.inn)+"</span></div></div>"}).join(""):'<p class="dim">'+e(t("ad.none","Nothing here yet."))+"</p>")+
   sec(t("ad.d.req","Recent API requests"),tbl([t("ap.lg.endpoint","Endpoint"),t("au.e.status","Status"),t("ad.d.ip","IP"),t("ad.d.when","When")],u.requests.map(function(q){return["<b class=\"lg-m\">"+e(q.method)+"</b> "+e(q.path),e(q.status),e(q.ip||""),e(A.ago(q.created_at))]})))+
   sec(t("ad.d.log","Admin log"),'<div class="pfld"><label for="adNote">'+e(t("ad.d.note","Add a private note"))+'</label><div class="ad-adj"><input id="adNote" maxlength="1000"><button type="button" class="abtn" id="adNoteGo">'+e(t("ad.d.add","Add"))+"</button></div></div>"+(u.actions.length?u.actions.map(function(a){var d=a.details||{};return'<div class="ad-fr"><div><b>'+e(t("ad.act."+a.action,a.action))+'</b> <span class="dim">'+e(A.date(a.created_at))+(a.admin?" · "+e(a.admin):"")+"</span></div>"+(d.reason||d.note||d.to!==undefined?'<div class="dim">'+e(d.reason||d.note||String(d.from)+" → "+String(d.to))+"</div>":"")+"</div>"}).join(""):'<p class="dim">'+e(t("ad.none","Nothing here yet."))+"</p>"));
  root.querySelectorAll("[data-s]").forEach(function(b){b.onclick=function(){stateModal(u,b.dataset.s,function(){user()})}});
  var pl=document.getElementById("adPlan");pl.appendChild(A.dropdown([["free",t("app.plan.free","Free")],["pro",t("app.plan.pro","Pro")],["business",t("app.plan.business","Business")],["enterprise",t("app.plan.enterprise","Enterprise")]],u.plan,function(v){if(v===u.plan)return;A.api("/admin/users/"+u.id,{method:"PATCH",body:{plan:v}}).then(function(){A.toast(t("ad.m.done","Saved"));user()},function(x){A.toast(A.err(x),"err")})}));
  document.getElementById("adAdjGo").onclick=function(){A.api("/admin/users/"+u.id,{method:"PATCH",body:{rating_adjust:parseInt(document.getElementById("adAdj").value,10)||0}}).then(function(){A.toast(t("ad.m.done","Saved"));user()},function(x){A.toast(A.err(x),"err")})};
  document.getElementById("adNoteGo").onclick=function(){var v=document.getElementById("adNote").value.trim();if(!v)return;A.api("/admin/users/"+u.id,{method:"PATCH",body:{note:v}}).then(function(){user()},function(x){A.toast(A.err(x),"err")})}
 },function(x){if(x&&x.status===404){location.replace("/app/admin/users/");return}fail(x,"adRetry")})
}
function review(){
 var st=F.rstate||"open";
 A.api("/admin/risk?status="+st).then(function(rows){
  var tool='<div class="tool" id="adTool"></div>';
  shell(tool+'<div id="adBody"></div>');
  document.getElementById("adTool").appendChild(A.dropdown([["open",t("ad.s.open","Open")],["reviewed",t("ad.s.reviewed","Reviewed")],["dismissed",t("ad.s.dismissed","Dismissed")]],st,function(v){F.rstate=v;review()}));
  var b=document.getElementById("adBody");
  if(!rows.length){b.innerHTML=A.empty(P.flag,t("ad.r.none","Nothing to review"),t("ad.r.none.p","Suspicious accounts will appear here."));return}
  b.innerHTML=rows.map(function(f){
   return'<section class="gcard ad-rv" data-id="'+f.id+'"><div class="ad-rh"><span class="ad-sc big">'+f.score+"</span><div><h2 class=\"sh3\">"+e(t("ad.k."+f.kind,f.kind))+"</h2><p class=\"dim\">"+pill(f.status)+(f.auto_action==="freeze"?" "+A.pill("wait",t("ad.r.autofreeze","Frozen automatically")):"")+" "+e(A.ago(f.created_at))+'</p></div></div><div class="ad-pair"><a href="/app/admin/users/view/?id='+f.user_id+'"><small>'+e(t("ad.r.flagged","Flagged account"))+"</small><b>"+e(f.email)+"</b>"+pill(f.user_status)+"</a>"+(f.related_id?'<span class="ad-vs">'+A.icon('<path d="M7 7h10l-3-3M17 17H7l3 3"/>',18)+'</span><a href="/app/admin/users/view/?id='+f.related_id+'"><small>'+e(t("ad.r.related","Linked account"))+"</small><b>"+e(f.related_email||"")+"</b>"+pill(f.related_status)+"</a>":"")+'</div><div class="ad-chips">'+flagHtml(f)+"</div>"+(f.status==="open"?'<div class="ad-act"><button type="button" class="abtn" data-d="dismiss">'+e(t("ad.r.dismiss","Not a problem"))+'</button><button type="button" class="abtn" data-d="confirm">'+e(t("ad.r.confirm","Confirm, keep state"))+'</button><button type="button" class="abtn bad" data-d="block">'+e(t("ad.r.block","Block the flagged account"))+"</button></div>":"")+"</section>"}).join("");
  b.querySelectorAll("[data-d]").forEach(function(btn){btn.onclick=function(){var id=btn.closest("[data-id]").dataset.id,d=btn.dataset.d;btn.disabled=true;A.api("/admin/risk/"+id,{method:"PATCH",body:{decision:d}}).then(function(){A.toast(t("ad.m.done","Saved"));review()},function(x){btn.disabled=false;A.toast(A.err(x),"err")})}})
 },function(x){fail(x,"adRetry")})
}
function sib(){
 var st=F.sstate||"pending";
 A.api("/admin/siberia?status="+st).then(function(rows){
  shell('<div class="tool" id="adTool"></div><div id="adBody"></div>');
  document.getElementById("adTool").appendChild(A.dropdown([["pending",t("ad.s.pending","Pending")],["approved",t("ad.s.approved","Approved")],["rejected",t("ad.s.rejected","Rejected")],["revoked",t("ad.s.revoked","Revoked")]],st,function(v){F.sstate=v;sib()}));
  var b=document.getElementById("adBody");
  if(!rows.length){b.innerHTML=A.empty(P.map,t("ad.sb.none","No applications"),t("ad.sb.none.p","Applications for the Siberia tariff appear here."));return}
  b.innerHTML=rows.map(function(a){
   return'<section class="gcard ad-ap" data-id="'+a.id+'"><div class="ad-rh"><div><h2 class="sh3">'+e(a.org_name)+"</h2><p class=\"dim\">"+pill(a.status)+" "+e(t("sb.f.k."+(a.kind==="sole_proprietor"?"sole":a.kind==="self_employed"?"self":"company"),a.kind))+" · "+e(t("sb.r."+a.region,a.region))+" · "+e(A.ago(a.created_at))+"</p></div></div>"+dl([[t("ad.sb.email","Email"),a.email],[t("sb.f.inn","Tax ID (INN)"),a.inn],[t("sb.f.site","Website"),a.site],[t("sb.f.phone","Phone"),a.phone],[t("ad.sb.acct","Account"),a.user_id?t("ad.sb.has","exists, tariff applies on approval"):t("ad.sb.no","none yet, applies at first sign-in")]])+'<h3 class="sh3">'+e(t("sb.f.purpose","What will you use Geserd for?"))+'</h3><p class="ad-pur">'+e(a.purpose)+"</p>"+(a.note?'<p class="dim">'+e(t("ad.reason","Reason: {x}",{x:a.note}))+"</p>":"")+(a.status==="pending"?'<div class="ad-act"><button type="button" class="abtn pri" data-d="approved">'+e(t("ad.sb.approve","Approve"))+'</button><button type="button" class="abtn bad" data-d="rejected">'+e(t("ad.sb.reject","Reject"))+"</button></div>":a.status==="approved"?'<div class="ad-act"><button type="button" class="abtn bad" data-d="revoked">'+e(t("ad.sb.revoke","End the tariff"))+"</button></div>":"")+"</section>"}).join("");
  b.querySelectorAll("[data-d]").forEach(function(btn){btn.onclick=function(){
   var id=btn.closest("[data-id]").dataset.id,d=btn.dataset.d;
   var m=A.modal({title:t("ad.sb.m."+d,"Decision"),body:'<div class="pfld"><label for="adNt">'+e(t("ad.sb.note","Message to the applicant (optional, shown in the email)"))+'</label><textarea id="adNt" rows="3" maxlength="500"></textarea></div><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.m.go","Confirm"))+"</button></div>"});
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/siberia/"+id,{method:"PATCH",body:{status:d,note:m.body.querySelector("#adNt").value}}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));sib()},function(x){y.disabled=false;A.toast(A.err(x),"err")})}
  }})
 },function(x){fail(x,"adRetry")})
}
function tickets(){
 var st=F.tstate||"open";
 A.api("/admin/tickets?status="+st).then(function(rows){
  shell('<div class="tool" id="adTool"></div><div id="adBody"></div>');
  document.getElementById("adTool").appendChild(A.dropdown([["open",t("ad.s.open","Open")],["closed",t("hp.st.closed","Closed")]],st,function(v){F.tstate=v;tickets()}));
  var b=document.getElementById("adBody");
  if(!rows.length){b.innerHTML=A.empty(P.chat,t("ad.tk.none","No tickets"),"");return}
  b.innerHTML='<div class="dl">'+rows.map(function(r,i){return'<button type="button" class="drow link" data-i="'+i+'" style="--cols:minmax(0,2fr) minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr)"><div class="c strong ell" data-l="'+e(t("hp.subject","Subject"))+'">'+e(r.subject)+'</div><div class="c ell dim" data-l="'+e(t("ad.sb.email","Email"))+'">'+e(r.email)+'</div><div class="c" data-l="'+e(t("ad.u.status","Status"))+'">'+(r.last_author==="user"&&r.status==="open"?A.pill("wait",t("ad.tk.wait","Waiting for you")):A.pill("dim",r.status==="closed"?t("hp.st.closed","Closed"):t("ad.tk.ans","Answered")))+'</div><div class="c dim" data-l="'+e(t("ad.d.when","When"))+'">'+e(A.ago(r.updated_at))+"</div></button>"}).join("")+"</div>";
  b.querySelectorAll("[data-i]").forEach(function(x){x.onclick=function(){ticket(rows[+x.dataset.i])}})
 },function(x){fail(x,"adRetry")})
}
function ticket(r){
 var m=A.modal({title:r.subject,wide:true,body:A.loading()});
 A.api("/admin/tickets/"+r.id).then(function(d){
  m.body.innerHTML='<p class="dim">'+e(d.email)+" · "+e(d.topic)+'</p><div class="tk-thr ad-thr">'+d.messages.map(function(x){var sf=x.author==="staff";return'<div class="tm '+(sf?"us":"sf")+'"><div class="tm-b"><small>'+e(sf?t("ad.tk.you","Staff"):d.email)+" · "+e(A.ago(x.created_at))+"</small><p>"+e(x.body)+"</p></div></div>"}).join("")+'</div><div class="pfld"><label for="adRp">'+e(t("ad.tk.reply","Your reply"))+'</label><textarea id="adRp" rows="4" maxlength="5000"></textarea></div><label class="sbf-c"><input type="checkbox" id="adCl"><span>'+e(t("ad.tk.close","Close the ticket after this reply"))+'</span></label><div class="prow"><button type="button" class="abtn pri" id="adSend">'+e(t("ad.tk.send","Send reply"))+"</button></div>";
  m.body.querySelector("#adSend").onclick=function(){var b=this,v=m.body.querySelector("#adRp").value.trim();if(!v)return;b.disabled=true;A.api("/admin/tickets/"+r.id+"/reply",{method:"POST",body:{message:v,close:m.body.querySelector("#adCl").checked}}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));tickets()},function(x){b.disabled=false;A.toast(A.err(x),"err")})}
 },function(x){m.body.innerHTML='<p class="ferr">'+e(A.err(x))+"</p>"})
}
var FL=[["deliverability","max","ad.ru.f.deliverability","Delivery quality"],["domain","max","ad.ru.f.domain","Own domain"],["history","max","ad.ru.f.history","Account age"],["conduct","max","ad.ru.f.conduct","Broadcast conduct"],["profile","max","ad.ru.f.profile","Profile completeness"]];
var EX={deliverability:[["min_sends","ad.ru.min_sends","Sends needed to score",1],["pending_share","ad.ru.pending_share","Share given before that (0 to 1)",.05],["days","ad.ru.days","Window in days",1]],domain:[["subdomain_share","ad.ru.sub_share","Share for a Geserd address only (0 to 1)",.05]],history:[["full_days","ad.ru.full_days","Days to full points",1]],conduct:[["complaint_full","ad.ru.c_full","Complaint rate with full points, %",.01],["complaint_zero","ad.ru.c_zero","Complaint rate with zero points, %",.01],["unsub_full","ad.ru.u_full","Unsubscribe rate with full points, %",.1],["unsub_zero","ad.ru.u_zero","Unsubscribe rate with zero points, %",.1],["broadcasts","ad.ru.bc","Broadcasts counted",1]],profile:[]};
function rating(){
 A.api("/admin/rating-rules").then(function(d){
  var R=JSON.parse(JSON.stringify(d.rules));
  function num(id,v,step){return'<input type="number" step="'+step+'" id="'+id+'" value="'+v+'">'}
  var h='<section class="gcard ad-rules"><h2 class="sh3">'+e(t("ad.ru.t","Points per factor"))+'</h2><p class="dim">'+e(t("ad.ru.p","The maximum points of all factors must add up to 100."))+"</p>";
  FL.forEach(function(f){h+='<div class="ad-rb"><div class="ad-rr"><label for="m_'+f[0]+'">'+e(t(f[2],f[3]))+"</label>"+num("m_"+f[0],R.factors[f[0]].max,1)+"</div>"+EX[f[0]].map(function(x){return'<div class="ad-rr sub"><label for="x_'+f[0]+"_"+x[0]+'">'+e(t(x[1],x[2]))+"</label>"+num("x_"+f[0]+"_"+x[0],R.factors[f[0]][x[0]],x[3])+"</div>"}).join("")+"</div>"});
  h+='<div class="ad-sum" id="adSum"></div></section><section class="gcard"><h2 class="sh3">'+e(t("ad.ru.lv","Level thresholds"))+"</h2>"+R.levels.map(function(l){return'<div class="ad-rr"><label for="l_'+l.id+'">'+e(t("rt.l."+l.id,l.id))+" "+e(t("ad.ru.from","from"))+"</label>"+(l.id==="low"?'<input id="l_low" value="0" disabled>':num("l_"+l.id,l.min,1))+"</div>"}).join("")+'</section><div class="ad-act"><button type="button" class="abtn pri lg" id="adSave">'+e(t("ad.d.save","Save"))+'</button><button type="button" class="abtn lg" id="adReset">'+e(t("ad.ru.reset","Restore defaults"))+'</button></div><p class="ferr" id="adRe" hidden></p>';
  shell(h);
  function read(){var o=JSON.parse(JSON.stringify(R));FL.forEach(function(f){o.factors[f[0]].max=parseFloat(document.getElementById("m_"+f[0]).value);EX[f[0]].forEach(function(x){o.factors[f[0]][x[0]]=parseFloat(document.getElementById("x_"+f[0]+"_"+x[0]).value)})});o.levels.forEach(function(l){if(l.id!=="low")l.min=parseFloat(document.getElementById("l_"+l.id).value)});return o}
  function sum(){var s=0;FL.forEach(function(f){s+=parseFloat(document.getElementById("m_"+f[0]).value)||0});var el=document.getElementById("adSum");el.textContent=t("ad.ru.sum","Total: {n} of 100",{n:s});el.className="ad-sum"+(s===100?" ok":" bad")}
  root.addEventListener("input",sum);sum();
  document.getElementById("adSave").onclick=function(){var b=this,er=document.getElementById("adRe");er.hidden=true;b.disabled=true;A.api("/admin/rating-rules",{method:"PUT",body:{rules:read()}}).then(function(){b.disabled=false;A.toast(t("ad.m.done","Saved"))},function(x){b.disabled=false;er.textContent=t("ad.ru.err","These values are not accepted: {x}",{x:(x.data&&x.data.fields||[]).join(", ")});er.hidden=false})};
  document.getElementById("adReset").onclick=function(){A.api("/admin/rating-rules/reset",{method:"POST"}).then(function(){A.toast(t("ad.m.done","Saved"));rating()})}
 },function(x){fail(x,"adRetry")})
}
function load(){
 root.innerHTML=head()+A.loading();
 if(page==="")ov();else if(page==="users"){shell('<div class="tool" id="adTool"></div><div id="adBody">'+A.loading()+"</div>");var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});usersTool();users(true)}else if(page==="user")user();else if(page==="review")review();else if(page==="siberia")sib();else if(page==="tickets")tickets();else if(page==="rating")rating()
}
A.ready(function(){
 root=document.getElementById("app-root");if(!root)return;page=root.dataset.page||"";
 A.api("/auth/me").then(function(me){if(!me.is_admin){location.replace("/app/");return}load()},function(){location.replace("/app/")})
})
})();
