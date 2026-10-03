(function(){
var A=window.GSApp,t=A.t,e=A.esc;
var root;
function head(count){return'<div class="ph pgh"><div><h1>'+e(t("ap.k.t","API keys"))+"</h1>"+(count?'<p class="psub">'+e(count)+"</p>":"")+'</div><button type="button" class="abtn lg pri" id="kNew">'+A.icon(A.IC.plus,16)+"<span>"+e(t("ap.k.add","Create API key"))+"</span></button></div>"}
function load(){
 root.innerHTML=head()+A.loading();bind();
 Promise.all([A.api("/api-keys"),A.api("/usage").catch(function(){return null})]).then(function(r){draw(r[0],r[1])},function(x){root.innerHTML=head()+A.failed(x,"kRetry");bind();var b=document.getElementById("kRetry");if(b)b.onclick=load});
}
function draw(keys,us){
 var count=us?t("au.k.count","{a} of {b} API keys used",{a:A.num(keys.length),b:us.limits.keys?A.num(us.limits.keys):t("au.unlimited","Unlimited")}):"";
 var body;
 if(!keys.length)body=A.empty(A.IC.key,t("ap.k.h","No API keys yet"),t("ap.k.p","Create an API key to start sending emails from your app."),'<button type="button" class="abtn lg pri" data-new>'+e(t("ap.k.add","Create API key"))+"</button>");
 else body='<div class="dl"><div class="drow dhead" style="--cols:minmax(0,1.6fr) minmax(0,1.3fr) minmax(0,1.2fr) minmax(0,1.2fr) 40px"><div>'+e(t("au.k.name","Name"))+"</div><div>"+e(t("au.k.token","Token"))+"</div><div>"+e(t("au.k.created","Created"))+"</div><div>"+e(t("au.k.used","Last used"))+"</div><div></div></div>"+
  keys.map(function(k){return'<div class="drow" style="--cols:minmax(0,1.6fr) minmax(0,1.3fr) minmax(0,1.2fr) minmax(0,1.2fr) 40px"><div class="c strong" data-l="'+e(t("au.k.name","Name"))+'">'+e(k.name)+'</div><div class="c" data-l="'+e(t("au.k.token","Token"))+'"><code class="mono">'+e(k.prefix)+"…</code></div><div class=\"c dim\" data-l=\""+e(t("au.k.created","Created"))+'">'+e(A.date(k.created_at))+'</div><div class="c dim" data-l="'+e(t("au.k.used","Last used"))+'">'+e(k.last_used_at?A.ago(k.last_used_at):t("au.never","Never"))+'</div><div class="c end"><button type="button" class="app-ico dng" data-rev="'+e(k.id)+'" data-name="'+e(k.name)+'" aria-label="'+e(t("au.k.revoke","Revoke"))+'" title="'+e(t("au.k.revoke","Revoke"))+'">'+A.icon(A.IC.trash,16)+"</button></div></div>"}).join("")+"</div>";
 root.innerHTML=head(count)+body;bind();
 root.querySelectorAll("[data-rev]").forEach(function(b){b.onclick=function(){revoke(b.dataset.rev,b.dataset.name)}});
}
function bind(){root.querySelectorAll("#kNew,[data-new]").forEach(function(b){b.onclick=create})}
function create(){
 var inp=document.createElement("div");inp.innerHTML='<label class="lab" for="kName">'+e(t("au.k.name","Name"))+'</label><input class="fld" id="kName" maxlength="60" autocomplete="off" placeholder="'+e(t("au.k.name.ph","e.g. Production"))+'"><p class="ferr" id="kErr" hidden></p>';
 var m=A.modal({title:t("au.k.new.t","Create API key"),desc:t("au.k.new.d","Give the key a name so you can recognise it later."),body:inp,actions:[
  {label:t("au.cancel","Cancel")},
  {label:t("au.k.create","Create"),cls:"pri",onClick:function(mm,b){go(mm,b)}}]});
 var i=inp.querySelector("#kName");i.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();go(m,m.el.querySelector(".ma .pri"))}});
 function go(mm,b){var er=inp.querySelector("#kErr");er.hidden=true;b.disabled=true;
  A.api("/api-keys",{method:"POST",body:{name:i.value.trim()}}).then(function(k){mm.close();reveal(k)},function(x){b.disabled=false;er.textContent=A.err(x);er.hidden=false})}
}
function reveal(k){
 var b=document.createElement("div");
 b.innerHTML='<div class="warn">'+A.icon('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',18)+"<span>"+e(t("au.k.show.warn","Copy it now. For your security it is shown only once and can’t be retrieved later."))+'</span></div><div class="keybox"><code id="kVal">'+e(k.key)+'</code><button type="button" class="abtn cp" id="kCp">'+A.icon(A.IC.copy,15)+"<span>"+e(t("au.copy","Copy"))+"</span></button></div>";
 b.querySelector("#kCp").onclick=function(){A.copy(k.key,this)};
 A.modal({title:t("au.k.show.t","Your new API key"),desc:k.name,body:b,persist:true,actions:[{label:t("au.done","Done"),cls:"pri",onClick:function(m){m.close();load()}}]});
}
function revoke(id,name){
 A.modal({title:t("au.k.revoke.t","Revoke this key?"),desc:t("au.k.revoke.p","Apps using “{name}” stop working right away. This can’t be undone.",{name:name}),actions:[
  {label:t("au.cancel","Cancel")},
  {label:t("au.k.revoke","Revoke"),cls:"dng",onClick:function(m,b){b.disabled=true;A.api("/api-keys/"+encodeURIComponent(id),{method:"DELETE"}).then(function(){m.close();A.toast(t("au.k.revoked","API key revoked"));load()},function(x){b.disabled=false;A.toast(A.err(x))})}}]});
}
A.ready(function(){root=document.getElementById("app-root");if(root)load()});
})();
