(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,data=[],unread=0,flt="all",root;
var ICON={bounce:'<path d="M4 4h16v12H4zM4 8l8 5 8-5M9 20h6"/>',complaint:'<path d="M12 3 2 20h20zM12 10v4M12 17h.01"/>',quota:'<path d="M5 20V11M11 20V4M17 20v-6M3 20h18"/>',domain:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',ticket:'<path d="M4 5h16v11H9l-5 4z"/>'};
function title(n){var k=n.title;return T("nt.t."+k,k)}
function body(n){
 if(n.title==="quota_80"||n.title==="quota_full"){var sc=String(n.body||"").split(":")[0];return T("nt.b.quota."+(sc==="daily"?"daily":"monthly"),sc==="daily"?"Daily sending limit":"Monthly sending limit")}
 return n.body||""}
function item(n){
 var ic=ICON[n.type]||ICON.quota,link=n.link||"";
 return '<div class="nitem'+(n.read_at?'':' un')+'" data-id="'+n.id+'" data-link="'+E(link)+'"><span class="ni">'+A.icon(ic,20)+'</span><div><b>'+E(title(n))+'</b>'+(body(n)?'<p>'+E(body(n))+'</p>':'')+'<time>'+E(A.ago(n.created_at))+'</time></div><button type="button" class="x" data-del="'+n.id+'" aria-label="'+E(T("nt.del","Delete"))+'">'+A.icon(A.IC.x,16)+'</button></div>'}
var FL=[["all","nt.f.all","All"],["unread","nt.f.unread","Unread"],["bounce","nt.f.bounce","Bounces"],["complaint","nt.f.complaint","Complaints"],["quota","nt.f.quota","Limits"],["domain","nt.f.domain","Domains"],["ticket","nt.f.ticket","Support"]];
function head(){return '<div class="ph"><h1>'+E(T("nt.h","Notifications"))+'</h1></div>'}
function shown(){return data.filter(function(n){if(flt==="all")return true;if(flt==="unread")return !n.read_at;return n.type===flt||(flt==="bounce"&&n.type==="bounced")||(flt==="complaint"&&n.type==="complained")})}
function tops(){
 var hasRead=data.some(function(n){return n.read_at});
 return '<div class="tops"><div class="chips2" id="ntF">'+FL.map(function(f){return '<button type="button" data-f="'+f[0]+'" class="'+(f[0]===flt?"on":"")+'">'+E(T(f[1],f[2]))+(f[0]==="unread"&&unread?' <i class="cnt">'+unread+'</i>':'')+'</button>'}).join("")+'</div><div class="prow">'+(unread?'<button type="button" class="abtn" id="ntAll">'+E(T("nt.markall","Mark all as read"))+'</button>':'')+(hasRead?'<button type="button" class="abtn" id="ntClr">'+E(T("nt.clear","Delete read"))+'</button>':'')+'</div></div>'}
function list(){var r=shown();return r.length?'<div class="nlist" id="ntl">'+r.map(item).join("")+'</div>':'<div class="emptyb" style="padding:40px;text-align:center;color:var(--a-tx2)">'+E(flt==="all"?T("nt.allread","All caught up"):T("nt.nomatch","Nothing here."))+'</div>'}
function paint(){
 root.innerHTML=head()+(data.length?tops()+list():A.empty('<path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0"/>',T("nt.none","No notifications yet"),T("nt.none.d","Bounces, spam complaints, plan limits and support replies will appear here.")));
 var f=document.getElementById("ntF");if(f)f.onclick=function(e){var b=e.target.closest("button[data-f]");if(!b)return;flt=b.dataset.f;paint()};
 var all=document.getElementById("ntAll");if(all)all.onclick=function(){all.disabled=true;A.api("/notifications/read",{method:"POST"}).then(function(){if(window.GSBadge)GSBadge();load()},function(e){all.disabled=false;A.toast(A.err(e),"err")})};
 var clr=document.getElementById("ntClr");if(clr)clr.onclick=function(){clr.disabled=true;A.api("/notifications",{method:"DELETE"}).then(function(){A.toast(T("nt.cleared","Read notifications deleted"),"ok");load()},function(e){clr.disabled=false;A.toast(A.err(e),"err")})};
 var l=document.getElementById("ntl");if(l)l.onclick=function(e){
  var d=e.target.closest("[data-del]");
  if(d){e.stopPropagation();A.api("/notifications/"+d.dataset.del,{method:"DELETE"}).then(function(){if(window.GSBadge)GSBadge();load()},function(x){A.toast(A.err(x),"err")});return}
  var it=e.target.closest(".nitem");if(!it)return;
  A.api("/notifications/"+it.dataset.id+"/read",{method:"POST"}).catch(function(){}).then(function(){if(it.dataset.link)location.href=it.dataset.link;else{if(window.GSBadge)GSBadge();load()}})}}
function load(){
 A.api("/notifications?limit=100").then(function(j){data=j.data;unread=j.unread;paint()},function(x){root.innerHTML=head()+A.failed(x,"ntRetry");var b=document.getElementById("ntRetry");if(b)b.onclick=function(){root.innerHTML=head()+A.loading();load()}})}
A.ready(function(){root=document.getElementById("nt-root");if(!root)return;root.innerHTML=head()+A.loading();load()});
})();
