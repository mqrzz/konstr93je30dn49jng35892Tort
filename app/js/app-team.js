(function(){
var A=window.GSApp,t=A.t,e=A.esc;
var IC={plus:'<path d="M12 5v14M5 12h14"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 5.5L20 8"/>',x:'<path d="m6 6 12 12M18 6 6 18"/>',user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'};
var ROLE=function(r){return t("app.team.role."+r,r==="admin"?"Admin":"Member")};
function err(x){var m={invalid_email:t("app.team.err.email","Check the email address."),self_invite:t("app.team.err.self","You cannot invite yourself."),team_limit:t("app.team.err.limit","The team is limited to 20 people including pending invitations."),already_member:t("app.team.err.member","This person is already in the team."),send_failed:t("app.team.err.send","The invitation could not be sent. Try again."),invite_invalid:t("app.team.err.inv","This invitation is no longer valid."),invite_email_mismatch:t("app.team.err.mis","This invitation was sent to a different email address.")}[x&&x.code];return m||A.err(x)}
var S={r:null,top:"",d:null};
function sec(title,desc,act,body){return'<section class="ssec"><div class="sh"><div><h2>'+e(title)+'</h2><p>'+e(desc)+'</p></div>'+(act||"")+'</div>'+body+'</section>'}
function paint(){
 var d=S.d,rows='<tr><td>'+A.icon(IC.user,18)+'</td><td><b>'+e(d.owner.name||d.owner.email)+'</b><small class="tm-e">'+e(d.owner.email)+'</small></td><td class="sub">'+e(t("app.team.owner","Owner"))+'</td><td></td></tr>'+d.members.map(function(m){return'<tr><td>'+A.icon(IC.user,18)+'</td><td><b>'+e(m.name||m.email)+'</b><small class="tm-e">'+e(m.email)+'</small></td><td class="sub">'+e(ROLE(m.role))+'</td><td class="tm-x"><button type="button" class="abtn" data-rm="'+m.id+'">'+e(t("app.team.remove","Remove"))+'</button></td></tr>'}).join("");
 var members=sec(t("app.team.mem","Members"),t("app.team.mem.d","People with access to this workspace."),'<button class="abtn pri" type="button" id="tmInv">'+A.icon(IC.plus,16)+'<span>'+e(t("app.team.invite","Invite member"))+'</span></button>','<table class="stbl"><tbody>'+rows+'</tbody></table>');
 var inv=d.invites.length?sec(t("app.team.pend","Pending invitations"),t("app.team.pend.d","Invitations are valid for 7 days."),"",'<table class="stbl"><tbody>'+d.invites.map(function(i){return'<tr><td>'+A.icon(IC.mail,18)+'</td><td><b>'+e(i.email)+'</b><small class="tm-e">'+e(A.ago(i.created_at))+'</small></td><td class="sub">'+e(ROLE(i.role))+'</td><td class="tm-x"><button type="button" class="abtn" data-rv="'+i.id+'">'+e(t("app.team.revoke","Revoke"))+'</button></td></tr>'}).join("")+'</tbody></table>'):"";
 var jn=d.joined.length?sec(t("app.team.joined","Workspaces you joined"),"","",'<table class="stbl"><tbody>'+d.joined.map(function(o){return'<tr><td>'+A.icon(IC.user,18)+'</td><td><b>'+e(o.name||o.email)+'</b></td><td class="sub">'+e(ROLE(o.role))+'</td><td class="tm-x"><button type="button" class="abtn" data-lv="'+o.id+'">'+e(t("app.team.leave","Leave"))+'</button></td></tr>'}).join("")+'</tbody></table>'):"";
 S.r.innerHTML=S.top+members+inv+jn;bind()}
function reload(){return A.api("/team").then(function(d){S.d=d;paint()},function(x){S.r.innerHTML=S.top+A.failed(x,"tmRt");var b=document.getElementById("tmRt");if(b)b.onclick=function(){load()}})}
function load(){S.r.innerHTML=S.top+A.loading();reload()}
function confirmDo(title,desc,label,fn){A.modal({title:title,desc:desc,actions:[{label:label,cls:"pri",onClick:function(api,b){b.disabled=true;fn().then(function(){api.close();reload()},function(x){b.disabled=false;A.toast(err(x),"err")})}},{label:t("au.cancel","Cancel")}]})}
function invite(){
 var body=document.createElement("div");
 body.innerHTML='<label class="lab" for="tmE">'+e(t("app.team.email","Email address"))+'</label><input class="fld" id="tmE" type="email" autocomplete="off" placeholder="name@example.com"><span class="lab">'+e(t("app.team.role","Role"))+'</span><div class="chips2" id="tmR"><button type="button" data-r="member" class="on">'+e(ROLE("member"))+'</button><button type="button" data-r="admin">'+e(ROLE("admin"))+'</button></div><p class="dim tm-h" id="tmRh"></p><p class="ferr" id="tmEr" hidden></p>';
 var role="member";
 var hint=function(){body.querySelector("#tmRh").textContent=role==="admin"?t("app.team.role.admin.d","Can manage domains, keys and settings."):t("app.team.role.member.d","Can send mail and view logs.")};hint();
 body.querySelector("#tmR").onclick=function(ev){var b=ev.target.closest("button[data-r]");if(!b)return;role=b.dataset.r;body.querySelectorAll("#tmR button").forEach(function(x){x.classList.toggle("on",x===b)});hint()};
 A.modal({title:t("app.team.invite","Invite member"),body:body,actions:[{label:t("app.team.send","Send invitation"),cls:"pri",onClick:function(api,b){var er=body.querySelector("#tmEr");er.hidden=true;b.disabled=true;A.api("/team/invites",{method:"POST",body:{email:body.querySelector("#tmE").value,role:role}}).then(function(){api.close();A.toast(t("app.team.sent","Invitation sent"));reload()},function(x){b.disabled=false;er.textContent=err(x);er.hidden=false})}},{label:t("au.cancel","Cancel")}]});
 setTimeout(function(){var n=document.getElementById("tmE");if(n)n.focus()},60)}
function bind(){
 var r=S.r,q=function(s){return r.querySelector(s)};
 var b=q("#tmInv");if(b)b.onclick=invite;
 r.querySelectorAll("[data-rm]").forEach(function(x){x.onclick=function(){confirmDo(t("app.team.rm.t","Remove this member?"),t("app.team.rm.d","They will lose access to this workspace."),t("app.team.remove","Remove"),function(){return A.api("/team/members/"+x.dataset.rm,{method:"DELETE"})})}});
 r.querySelectorAll("[data-rv]").forEach(function(x){x.onclick=function(){A.api("/team/invites/"+x.dataset.rv,{method:"DELETE"}).then(reload,function(e2){A.toast(err(e2),"err")})}});
 r.querySelectorAll("[data-lv]").forEach(function(x){x.onclick=function(){confirmDo(t("app.team.lv.t","Leave this workspace?"),t("app.team.lv.d","You will lose access to it."),t("app.team.leave","Leave"),function(){return A.api("/team/leave/"+x.dataset.lv,{method:"POST"})})}})}
function accept(token){
 A.api("/team/invite/"+encodeURIComponent(token)).then(function(i){
  A.modal({title:t("app.team.acc.t","Join this workspace?"),desc:t("app.team.acc.d","{n} invited you as {r}.").replace("{n}",i.owner_name).replace("{r}",ROLE(i.role)),actions:[{label:t("app.team.acc","Accept"),cls:"pri",onClick:function(api,b){b.disabled=true;A.api("/team/accept",{method:"POST",body:{token:token}}).then(function(){api.close();history.replaceState(null,"",location.pathname);A.toast(t("app.team.acc.ok","You joined the workspace"));reload()},function(x){b.disabled=false;A.toast(err(x),"err")})}},{label:t("au.cancel","Cancel"),onClick:function(api){api.close();history.replaceState(null,"",location.pathname)}}]})
 },function(x){A.toast(err(x),"err");history.replaceState(null,"",location.pathname)})}
window.GSTeam={mount:function(r,top){S.r=r;S.top=top;load();var tk=new URLSearchParams(location.search).get("invite");if(tk)accept(tk)}};
})();
