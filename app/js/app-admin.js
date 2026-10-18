(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,page,F={q:"",status:"",plan:"",flag:""},U={off:0,rows:[],total:0};
var P={key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l3 3M14 9l2 2"/>',shield:'<path d="M12 3 4 6v6c0 4.5 3.2 7.5 8 9 4.8-1.5 8-4.5 8-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',map:'<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3.5 7.5 8.5 6 8.5-6"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',pause:'<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',ok:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',back:'<path d="m15 6-6 6 6 6"/>'};
var TABS=[["","ad.t.over","Overview","/app/admin/",P.shield],["users","ad.t.users","Users","/app/admin/users/",P.users],["review","ad.t.review","Review","/app/admin/review/",P.flag],["siberia","ad.t.sib","Applications","/app/admin/siberia/",P.map],["tickets","ad.t.tickets","Tickets","/app/admin/tickets/",P.chat],["rating","ad.t.rating","Rating rules","/app/admin/rating/",P.star]];
function head(){
 var ti={"":["ad.t.over","Overview"],users:["ad.t.users","Users"],user:["ad.t.users","Users"],review:["ad.t.review","Review"],siberia:["ad.t.sib","Applications"],tickets:["ad.t.tickets","Tickets"],rating:["ad.t.rating","Rating rules"],maint:["ad.t.maint","Maintenance"],sso:["ad.t.sso","SSO"],notice:["ad.t.notice","Notice"],staff:["ad.t.staff","Team"]}[page]||["ad.h","Admin"];
 return'<div class="ph"><h1>'+e(t(ti[0],ti[1]))+"</h1></div>"
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
  root.innerHTML=head()+'<a class="backlnk" href="/app/admin/users/">'+A.icon(P.back,16)+"<span>"+e(t("ad.back","All accounts"))+'</span></a><section class="gcard ad-uh"><span class="ad-av big">'+e((u.name||u.email).charAt(0).toUpperCase())+'</span><div class="ad-un"><h2>'+e(u.email)+"</h2><p>"+e(u.name||"")+'</p><div class="ad-pl">'+pill(u.status)+A.pill("dim",t("app.plan."+u.plan,u.plan))+(u.tariff==="siberia"?A.pill("dim",t("ad.o.siberia","Siberia tariff")):"")+(u.is_admin?A.pill("dim",t("ad.u.admin","admin")):"")+"</div>"+(u.status_reason?'<p class="dim sm">'+e(t("ad.reason","Reason: {x}",{x:u.status_reason}))+"</p>":"")+"</div>"+acts+"</section>"+
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

function roleName(r){return t("ad.role."+r,r)}
function sso(){
 A.api("/admin/sso").then(function(d){
  var h='<section class="gcard"><div class="trow"><div><b>'+e(t("ad.sso.uri","Redirect URI"))+'</b><span>'+e(t("ad.sso.uri.p","Give this address to the customer to register in their identity provider."))+'</span></div><button type="button" class="abtn" id="ssCp">'+A.icon(A.IC.copy,16)+'<span>'+e(t("au.copy","Copy"))+'</span></button></div><code class="brk ad-uri">'+e(d.redirect_uri)+'</code></section>';
  h+='<div class="ad-act"><button type="button" class="abtn pri lg" id="ssAdd">'+e(t("ad.sso.add","Add connection"))+'</button></div>';
  if(!d.items.length)h+=A.empty(P.key,t("ad.sso.none","No SSO connections"),t("ad.sso.none.p","Enterprise customers sign in with their own identity provider. Add the first connection when a contract is signed."));
  else h+='<div class="dl">'+d.items.map(function(x,i){return'<div class="drow ad-ssr" data-i="'+i+'" style="--cols:minmax(0,1.3fr) minmax(0,2fr) minmax(0,.8fr) 270px"><div class="c strong ell" data-l="'+e(t("ad.sso.domain","Domain"))+'">'+e(x.domain)+'</div><div class="c ell dim" data-l="'+e(t("ad.sso.issuer","Issuer"))+'">'+e(x.issuer)+'</div><div class="c" data-l="'+e(t("ad.u.status","Status"))+'">'+A.pill(x.enabled?"ok":"dim",x.enabled?t("ad.sso.on","On"):t("ad.sso.off","Off"))+'</div><div class="c ad-btns"><button type="button" class="abtn" data-a="tg">'+e(x.enabled?t("ad.sso.disable","Turn off"):t("ad.sso.enable","Turn on"))+'</button><button type="button" class="abtn" data-a="ed">'+e(t("ad.sso.edit","Edit"))+'</button><button type="button" class="abtn dng" data-a="rm">'+e(t("ad.sso.rm","Delete"))+'</button></div></div>'}).join("")+"</div>";
  shell(h);
  document.getElementById("ssCp").onclick=function(){A.copy(d.redirect_uri,this)};
  document.getElementById("ssAdd").onclick=function(){form(null)};
  root.querySelectorAll(".ad-ssr").forEach(function(row){var x=d.items[+row.dataset.i];row.querySelectorAll("[data-a]").forEach(function(b){b.onclick=function(){var a=b.dataset.a;
   if(a==="ed")return form(x);
   if(a==="tg"){b.disabled=true;return A.api("/admin/sso/"+encodeURIComponent(x.domain),{method:"PATCH",body:{enabled:!x.enabled}}).then(function(){A.toast(t("ad.m.done","Saved"));sso()},function(z){b.disabled=false;A.toast(A.err(z),"err")})}
   var m=A.modal({title:t("ad.sso.del.t","Delete this connection?"),body:'<p class="dim">'+e(t("ad.sso.del.p","People from {d} will no longer be able to sign in with SSO, and their identity links are removed. Their accounts stay.",{d:x.domain}))+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.sso.rm","Delete"))+"</button></div>"});
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/sso/"+encodeURIComponent(x.domain),{method:"DELETE"}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));sso()},function(z){y.disabled=false;A.toast(A.err(z),"err")})}
  }})});
  function form(x){
   var ed=!!x;
   var m=A.modal({title:ed?t("ad.sso.edit.t","Edit connection"):t("ad.sso.add","Add connection"),wide:true,body:'<div class="pfld"><label for="ssD">'+e(t("ad.sso.domain","Domain"))+'</label><input id="ssD" autocomplete="off" maxlength="253" placeholder="company.com" value="'+e(ed?x.domain:"")+'"'+(ed?" disabled":"")+'><small class="dim">'+e(t("ad.sso.domain.h","People with an email on this domain sign in through this provider."))+'</small></div><div class="pfld"><label for="ssI">'+e(t("ad.sso.issuer","Issuer"))+'</label><input id="ssI" autocomplete="off" maxlength="300" placeholder="https://login.company.com" value="'+e(ed?x.issuer:"")+'"><small class="dim">'+e(t("ad.sso.issuer.h","The OpenID Connect issuer address. We find the rest from its discovery document."))+'</small></div><div class="pfld"><label for="ssC">'+e(t("ad.sso.cid","Client ID"))+'</label><input id="ssC" autocomplete="off" maxlength="300" value="'+e(ed?x.client_id:"")+'"></div><div class="pfld"><label for="ssS">'+e(t("ad.sso.sec","Client secret"))+'</label><input id="ssS" type="password" autocomplete="new-password" maxlength="2000" placeholder="'+e(ed?t("ad.sso.sec.keep","Leave empty to keep the current secret"):"")+'"></div><p class="ferr" id="ssE" hidden></p><div class="prow"><button type="button" class="abtn" id="ssT">'+e(t("ad.sso.test","Check provider"))+'</button><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.d.save","Save"))+"</button></div>"});
   var er=m.body.querySelector("#ssE");
   function show(c){er.textContent=c;er.hidden=!c}
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#ssT").onclick=function(){var b=this;show("");b.disabled=true;A.api("/admin/sso/check",{method:"POST",body:{issuer:m.body.querySelector("#ssI").value}}).then(function(){b.disabled=false;A.toast(t("ad.sso.test.ok","The provider answered correctly"))},function(z){b.disabled=false;show(t("ad.sso.test.bad","The provider could not be reached or its settings are wrong."))})};
   m.body.querySelector("#adYes").onclick=function(){var b=this;show("");b.disabled=true;
    var body={issuer:m.body.querySelector("#ssI").value,client_id:m.body.querySelector("#ssC").value,client_secret:m.body.querySelector("#ssS").value};
    var rq=ed?A.api("/admin/sso/"+encodeURIComponent(x.domain),{method:"PATCH",body:body}):A.api("/admin/sso",{method:"POST",body:Object.assign({domain:m.body.querySelector("#ssD").value},body)});
    rq.then(function(){m.close();A.toast(t("ad.m.done","Saved"));sso()},function(z){b.disabled=false;show(A.err(z))})}
  }
 },function(x){fail(x,"adRetry")})
}
function staff(){
 A.api("/admin/staff").then(function(d){
  var h='<div class="ad-act"><button type="button" class="abtn pri lg" id="stAdd">'+e(t("ad.st.add","Add employee"))+'</button></div><div class="dl">'+d.items.map(function(x,i){var mine=x.id===d.me,can=!mine&&d.assignable.indexOf(x.role)>-1;return'<div class="drow ad-str" data-i="'+i+'" style="--cols:minmax(0,2.2fr) minmax(0,1fr) minmax(0,1fr) 230px"><div class="c" data-l="'+e(t("ad.u.acc","Account"))+'"><span class="ad-av">'+e((x.name||x.email).charAt(0).toUpperCase())+'</span><span class="ad-nm"><b class="ell">'+e(x.email)+'</b><small>'+e(x.name||"")+(mine?" · "+e(t("app.team.you","You")):"")+'</small></div><div class="c" data-l="'+e(t("ad.st.role","Role"))+'">'+A.pill(x.role==="owner"?"ok":x.role==="director"?"wait":"dim",roleName(x.role))+'</div><div class="c dim" data-l="'+e(t("ad.st.seen","Last seen"))+'">'+e(x.last_seen?A.ago(x.last_seen):t("au.never","Never"))+'</div><div class="c ad-btns">'+(can?'<button type="button" class="abtn" data-a="ro">'+e(t("ad.st.change","Change role"))+'</button><button type="button" class="abtn dng" data-a="rm">'+e(t("ad.st.remove","Remove"))+"</button>":"")+"</div></div>"}).join("")+"</div>";
  h+='<section class="gcard ad-roles"><h2 class="sh3">'+e(t("ad.st.what","What each role can do"))+'</h2>'+["owner","director","admin","support"].map(function(r){return'<div class="ad-rr"><label>'+e(roleName(r))+'</label><span class="dim">'+e(t("ad.role."+r+".d",""))+"</span></div>"}).join("")+"</section>";
  shell(h);
  var opts=d.assignable.map(function(r){return[r,roleName(r)]});
  document.getElementById("stAdd").onclick=function(){
   var role=opts[opts.length-1][0];
   var m=A.modal({title:t("ad.st.add","Add employee"),body:'<div class="pfld"><label for="stE">'+e(t("ad.sb.email","Email"))+'</label><input id="stE" type="email" autocomplete="off" maxlength="200"><small class="dim">'+e(t("ad.st.add.h","The person must have signed in to Geserd at least once."))+'</small></div><div class="pfld"><label>'+e(t("ad.st.role","Role"))+'</label><div id="stR"></div></div><p class="ferr" id="stX" hidden></p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.st.add","Add employee"))+"</button></div>"});
   m.body.querySelector("#stR").appendChild(A.dropdown(opts,role,function(v){role=v}));
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var b=this,er=m.body.querySelector("#stX");er.hidden=true;b.disabled=true;A.api("/admin/staff",{method:"POST",body:{email:m.body.querySelector("#stE").value,role:role}}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));staff()},function(z){b.disabled=false;er.textContent=A.err(z);er.hidden=false})}
  };
  root.querySelectorAll(".ad-str").forEach(function(row){var x=d.items[+row.dataset.i];row.querySelectorAll("[data-a]").forEach(function(b){b.onclick=function(){
   if(b.dataset.a==="rm"){var m=A.modal({title:t("ad.st.rm.t","Remove this employee?"),body:'<p class="dim">'+e(t("ad.st.rm.p","{e} loses access to the control panel. The account itself stays.",{e:x.email}))+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.st.remove","Remove"))+"</button></div>"});m.body.querySelector("#adNo").onclick=m.close;m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/staff/"+x.id,{method:"DELETE"}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));staff()},function(z){y.disabled=false;A.toast(A.err(z),"err")})};return}
   var role=x.role;var m2=A.modal({title:t("ad.st.change","Change role"),body:'<div class="pfld"><label>'+e(t("ad.st.role","Role"))+'</label><div id="stR"></div></div><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.d.save","Save"))+"</button></div>"});
   m2.body.querySelector("#stR").appendChild(A.dropdown(opts,role,function(v){role=v}));
   m2.body.querySelector("#adNo").onclick=m2.close;
   m2.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/staff/"+x.id,{method:"PATCH",body:{role:role}}).then(function(){m2.close();A.toast(t("ad.m.done","Saved"));staff()},function(z){y.disabled=false;A.toast(A.err(z),"err")})}
  }})})
 },function(x){fail(x,"adRetry")})
}

function notice(){
 A.api("/admin/maintenance/notice").then(function(n){
  var LG=["ru","en","fr","de"],names={ru:"Русский",en:"English",fr:"Français",de:"Deutsch"},cur=(window.GESERD&&GESERD.lang)||"ru";if(LG.indexOf(cur)<0)cur="en";
  var texts=JSON.parse(JSON.stringify(n.texts||{})),on=!!n.active;
  LG.forEach(function(l){if(!texts[l])texts[l]={title:"",message:""}});
  shell('<section class="gcard mt-st'+(on?" hot":"")+'"><div class="trow"><div><b id="ntSt">'+e(t(on?"ad.nt.on":"ad.nt.off",on?"The notice is shown":"The notice is hidden"))+'</b><span>'+e(t("ad.nt.state","People see it as a banner in the dashboard, on the sign-in page and on the sign-up page. Nothing stops working."))+'</span></div><button type="button" class="tg'+(on?" on":"")+'" id="ntTg" role="switch" aria-checked="'+(on?"true":"false")+'"><i></i></button></div></section>'+
  '<h2 class="sh3">'+e(t("ad.nt.text","Text"))+'</h2><section class="gcard"><div class="opts ad-lg" id="ntLg" role="tablist"></div><div class="pfld"><label for="ntT">'+e(t("ad.mt.title","Title"))+'</label><input id="ntT" maxlength="120" autocomplete="off" placeholder="'+e(t("ad.nt.title.p","Planned maintenance on Saturday"))+'"></div><div class="pfld"><label for="ntM">'+e(t("ad.mt.text","Details"))+'</label><textarea id="ntM" rows="4" maxlength="1000" placeholder="'+e(t("ad.nt.text.p","We will update the servers. Sending may pause for a few minutes."))+'"></textarea><span class="fhint">'+e(t("ad.nt.lang.h","Write each language you can. People whose language is empty see the English text."))+'</span></div></section>'+
  '<h2 class="sh3">'+e(t("ad.nt.when","When"))+'</h2><section class="gcard"><div class="pfld"><label for="ntS">'+e(t("ad.nt.from","Starts"))+'</label><input id="ntS" type="datetime-local" value="'+e(mtDt(n.starts_at))+'"></div><div class="pfld"><label for="ntE">'+e(t("ad.nt.to","Ends"))+'</label><input id="ntE" type="datetime-local" value="'+e(mtDt(n.ends_at))+'"><span class="fhint">'+e(t("ad.nt.to.h","After this time the banner disappears by itself."))+'</span></div><div class="prow"><button type="button" class="abtn pri lg" id="ntSave">'+e(t("ac.save","Save"))+'</button><button type="button" class="abtn lg" id="ntMail">'+e(t("ad.nt.mail","Email everyone"))+'</button></div>'+(n.emailed_at?'<p class="dim ad-sent">'+e(t("ad.nt.sent","Last email: {n} people, {d}",{n:n.emailed_count,d:new Date(n.emailed_at).toLocaleString()}))+'</p>':'')+'</section>');
  var lg=document.getElementById("ntLg"),ti=document.getElementById("ntT"),me=document.getElementById("ntM");
  function keep(){texts[cur]={title:ti.value,message:me.value}}
  function paint(){lg.innerHTML=LG.map(function(l){var f=texts[l].title||texts[l].message;return'<button type="button" class="opt'+(l===cur?" on":"")+'" data-l="'+l+'" role="tab" aria-selected="'+(l===cur?"true":"false")+'"><b>'+e(names[l])+'</b><span>'+e(f?t("ad.nt.filled","Filled"):t("ad.nt.empty","Empty"))+'</span></button>'}).join("");ti.value=texts[cur].title;me.value=texts[cur].message;lg.querySelectorAll("[data-l]").forEach(function(b){b.onclick=function(){keep();cur=b.dataset.l;paint()}})}
  paint();
  function body(a){keep();var s=document.getElementById("ntS").value,en=document.getElementById("ntE").value;return{active:a,texts:texts,starts_at:s?new Date(s).toISOString():null,ends_at:en?new Date(en).toISOString():null}}
  function save(a,btn){if(btn)btn.disabled=true;return A.api("/admin/maintenance/notice",{method:"PUT",body:body(a)}).then(function(){if(btn)btn.disabled=false;A.toast(t("ad.m.done","Saved"));return true},function(z){if(btn)btn.disabled=false;A.toast(A.err(z),"err");return false})}
  document.getElementById("ntSave").onclick=function(){save(on,this).then(function(ok){if(ok)notice()})};
  document.getElementById("ntTg").onclick=function(){var b=this;save(!on,b).then(function(ok){if(ok)notice()})};
  document.getElementById("ntMail").onclick=function(){
   var m=A.modal({title:t("ad.nt.mail.t","Email everyone?"),body:'<p class="dim">'+e(t("ad.nt.mail.p","Every account that is not blocked gets a branded email in its own language, and a notification in the dashboard. The saved text is sent, so save first. This cannot be undone."))+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.nt.mail","Email everyone"))+"</button></div>"});
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;save(on).then(function(ok){if(!ok){y.disabled=false;return}A.api("/admin/maintenance/notice/email",{method:"POST"}).then(function(r){m.close();A.toast(t("ad.nt.done","Sent to {n} people",{n:r.sent}));notice()},function(z){y.disabled=false;A.toast(A.err(z),"err")})})}
  }
 },function(x){fail(x,"adRetry")})
}
function mtDt(v){if(!v)return"";var d=new Date(v);if(isNaN(d))return"";var o=d.getTimezoneOffset()*60000;return new Date(d.getTime()-o).toISOString().slice(0,16)}
function maint(){
 A.api("/admin/maintenance").then(function(m){
  var on=!!m.active,sc=m.scope==="sending"?"sending":"all";
  function opt(v,title,desc){return'<button type="button" class="opt'+(v===sc?" on":"")+'" data-v="'+v+'" role="radio" aria-checked="'+(v===sc?"true":"false")+'"><b>'+e(title)+"</b><span>"+e(desc)+"</span></button>"}
  shell('<section class="gcard mt-st'+(on?" hot":"")+'"><div class="trow"><div><b>'+e(t(on?"ad.mt.on":"ad.mt.off",on?"Maintenance is on":"Maintenance is off"))+"</b><span>"+e(t("ad.mt.state","While it is on, visitors see the maintenance page. Administrators can still sign in and use this panel."))+'</span></div><button type="button" class="tg'+(on?" on":"")+'" id="mtTg" role="switch" aria-checked="'+(on?"true":"false")+'"><i></i></button></div></section>'+
  '<h2 class="sh3">'+e(t("ad.mt.scope","What stops"))+'</h2><div class="opts" id="mtSc" role="radiogroup">'+opt("all",t("ad.mt.all","Whole service"),t("ad.mt.all.d","Website, dashboard and API show the maintenance page. The status, health and admin endpoints keep working."))+opt("sending",t("ad.mt.snd","Sending only"),t("ad.mt.snd.d","The dashboard stays open. Only sending emails and starting broadcasts is paused with a clear error."))+"</div>"+
  '<h2 class="sh3">'+e(t("ad.mt.msg","Message for visitors"))+'</h2><section class="gcard"><div class="pfld"><label for="mtT">'+e(t("ad.mt.title","Title"))+'</label><input id="mtT" maxlength="120" autocomplete="off" value="'+e(m.title||"")+'" placeholder="'+e(t("ad.mt.title.p","We are upgrading the servers"))+'"></div><div class="pfld"><label for="mtM">'+e(t("ad.mt.text","Details"))+'</label><textarea id="mtM" rows="4" maxlength="1000" placeholder="'+e(t("ad.mt.text.p","Sending will be back in about an hour."))+'">'+e(m.message||"")+'</textarea></div><div class="pfld"><label for="mtE">'+e(t("ad.mt.eta","Expected to finish"))+'</label><input id="mtE" type="datetime-local" value="'+e(mtDt(m.eta))+'"><span class="fhint">'+e(t("ad.mt.eta.h","Optional. Shown on the maintenance page in the visitor\'s own time zone."))+'</span></div><div class="prow"><button type="button" class="abtn pri lg" id="mtSave">'+e(t("ac.save","Save"))+'</button><a class="abtn lg" href="/maintenance/" target="_blank" rel="noopener">'+e(t("ad.mt.view","Open the page"))+"</a></div></section>");
  function body(a){var v=document.getElementById("mtE").value;return{active:a,scope:sc,title:document.getElementById("mtT").value,message:document.getElementById("mtM").value,eta:v?new Date(v).toISOString():null}}
  function save(a){return A.api("/admin/maintenance",{method:"PUT",body:body(a)}).then(function(){A.toast(t("ad.mt.saved","Saved"));return a})}
  root.querySelectorAll("#mtSc .opt").forEach(function(b){b.onclick=function(){sc=b.dataset.v;root.querySelectorAll("#mtSc .opt").forEach(function(x){var o=x===b;x.classList.toggle("on",o);x.setAttribute("aria-checked",o)})}});
  document.getElementById("mtSave").onclick=function(){save(on).then(maint)};
  document.getElementById("mtTg").onclick=function(){var nx=!on;if(nx&&!window.confirm(t("ad.mt.confirm","Turn maintenance on? Visitors will see the maintenance page right away.")))return;save(nx).then(maint)}
 },function(x){root.innerHTML=head()+A.failed(x,"adRt");document.getElementById("adRt").onclick=maint})
}
function load(){
 root.innerHTML=head()+A.loading();
 if(page==="")ov();else if(page==="users"){shell('<div class="tool" id="adTool"></div><div id="adBody">'+A.loading()+"</div>");var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});usersTool();users(true)}else if(page==="maint")maint();else if(page==="user")user();else if(page==="review")review();else if(page==="siberia")sib();else if(page==="tickets")tickets();else if(page==="rating")rating();else if(page==="notice")notice();else if(page==="sso")sso();else if(page==="staff")staff()
}
A.ready(function(){
 root=document.getElementById("app-root");if(!root)return;page=root.dataset.page||"";
 A.api("/auth/me").then(function(me){if(!me.is_admin){location.replace("/app/");return}A.api("/admin/me").then(function(r){window.GSRole=r;var map={"":"overview",users:"users",user:"users",review:"review",siberia:"siberia",tickets:"tickets",rating:"rating-rules",maint:"maintenance",notice:"maintenance",sso:"sso",staff:"staff"};if(r.areas.indexOf(map[page])<0){location.replace("/app/admin/");return}document.querySelectorAll('a[href^="/app/admin/"]').forEach(function(a){var h=a.getAttribute("href"),k={"/app/admin/":"overview","/app/admin/users/":"users","/app/admin/review/":"review","/app/admin/siberia/":"siberia","/app/admin/tickets/":"tickets","/app/admin/rating/":"rating-rules","/app/admin/maintenance/":"maintenance","/app/admin/notice/":"maintenance","/app/admin/sso/":"sso","/app/admin/staff/":"staff"}[h];if(k&&r.areas.indexOf(k)<0){var li=a.parentNode.tagName==="LI"?a.parentNode:a;li.style.display="none"}});load()},function(){location.replace("/app/")})},function(){location.replace("/app/")})
})
})();
