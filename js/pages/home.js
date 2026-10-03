(function(){
var U="https://geserd.com/api/emails",KEY="gs_xxxxxxxx";
var BODY='{"from":"hi@yourdomain.com","to":"user@example.com","subject":"Hello","html":"<strong>it works!</strong>"}';
var S={
curl:["cURL",'curl -X POST '+U+' \\\n  -H "Authorization: Bearer '+KEY+'" \\\n  -H "Content-Type: application/json" \\\n  -d \''+BODY+'\''],
node:["Node.js",'const res = await fetch("'+U+'", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer '+KEY+'",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    from: "hi@yourdomain.com",\n    to: "user@example.com",\n    subject: "Hello",\n    html: "<strong>it works!</strong>"\n  })\n});\n\nconsole.log(await res.json());'],
python:["Python",'import requests\n\nres = requests.post(\n    "'+U+'",\n    headers={"Authorization": "Bearer '+KEY+'"},\n    json={\n        "from": "hi@yourdomain.com",\n        "to": "user@example.com",\n        "subject": "Hello",\n        "html": "<strong>it works!</strong>",\n    },\n)\nprint(res.json())'],
php:["PHP",'$ch = curl_init("'+U+'");\ncurl_setopt_array($ch, [\n    CURLOPT_POST => true,\n    CURLOPT_RETURNTRANSFER => true,\n    CURLOPT_HTTPHEADER => [\n        "Authorization: Bearer '+KEY+'",\n        "Content-Type: application/json",\n    ],\n    CURLOPT_POSTFIELDS => json_encode([\n        "from" => "hi@yourdomain.com",\n        "to" => "user@example.com",\n        "subject" => "Hello",\n        "html" => "<strong>it works!</strong>",\n    ]),\n]);\necho curl_exec($ch);'],
go:["Go",'body := strings.NewReader(`'+BODY+'`)\nreq, _ := http.NewRequest("POST", "'+U+'", body)\nreq.Header.Set("Authorization", "Bearer '+KEY+'")\nreq.Header.Set("Content-Type", "application/json")\n\nres, err := http.DefaultClient.Do(req)\nif err != nil {\n    log.Fatal(err)\n}\ndefer res.Body.Close()'],
ruby:["Ruby",'require "net/http"\nrequire "json"\n\nuri = URI("'+U+'")\nreq = Net::HTTP::Post.new(uri, "Content-Type" => "application/json",\n  "Authorization" => "Bearer '+KEY+'")\nreq.body = {\n  from: "hi@yourdomain.com", to: "user@example.com",\n  subject: "Hello", html: "<strong>it works!</strong>"\n}.to_json\n\nputs Net::HTTP.start(uri.host, uri.port, use_ssl: true) { |h| h.request(req) }.body'],
java:["Java",'HttpRequest req = HttpRequest.newBuilder()\n    .uri(URI.create("'+U+'"))\n    .header("Authorization", "Bearer '+KEY+'")\n    .header("Content-Type", "application/json")\n    .POST(HttpRequest.BodyPublishers.ofString(\n        "'+BODY.replace(/"/g,'\\"')+'"))\n    .build();\n\nHttpResponse<String> res = HttpClient.newHttpClient()\n    .send(req, HttpResponse.BodyHandlers.ofString());'],
dotnet:[".NET",'using var http = new HttpClient();\nhttp.DefaultRequestHeaders.Add("Authorization", "Bearer '+KEY+'");\n\nvar res = await http.PostAsync("'+U+'",\n    new StringContent(@"'+BODY.replace(/"/g,'""')+'",\n    Encoding.UTF8, "application/json"));\nConsole.WriteLine(await res.Content.ReadAsStringAsync());'],
smtp:["SMTP",'Host:     smtp.geserd.com\nPort:     587 (STARTTLS)\nUsername: geserd\nPassword: '+KEY+'\n\n# use any SMTP library, for example Nodemailer:\nconst transport = nodemailer.createTransport({\n  host: "smtp.geserd.com", port: 587,\n  auth: { user: "geserd", pass: "'+KEY+'" }\n});']
};
function $(i){return document.getElementById(i)}
function esc(x){return x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function hl(code){return code.split("\n").map(function(line){
  var e=esc(line),c=/^\s*(#|\/\/)/.test(line);
  if(c)return '<span class="l"><span class="k">'+e+'</span></span>';
  e=e.replace(/(&quot;[^&]*?&quot;|"[^"\n]*?"|`[^`]*`)/g,'<span class="s">$1</span>');
  e=e.replace(/\b(const|await|import|from|return|new|var|if|err|defer|require|using|HttpRequest|HttpResponse)\b(?![^<]*>)/g,'<span class="kw">$1</span>');
  return '<span class="l">'+e+'</span>'}).join("")}
var cur="curl";
function draw(){
  var t=$("idTabs"),pre=$("idCode");if(!t||!pre)return;
  t.innerHTML='<span class="on">'+S[cur][0]+'</span>';pre.innerHTML=hl(S[cur][1]);
  document.querySelectorAll(".sk").forEach(function(b){b.classList.toggle("on",b.dataset.s===cur)});
}
function init(){
  var sks=$("sks");if(!sks)return;
  sks.addEventListener("click",function(e){var b=e.target.closest(".sk");if(!b)return;cur=b.dataset.s;draw()});
  var cp=$("idCopy");
  cp.addEventListener("click",function(){
    var txt=S[cur][1],lbl=cp.querySelector("span"),old=lbl.textContent;
    (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).catch(function(){
      var a=document.createElement("textarea");a.value=txt;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove()
    }).then(function(){lbl.textContent=(window.GESERD&&GESERD.t?GESERD.t("hm.copied","Copied"):"Copied");cp.classList.add("ok");setTimeout(function(){lbl.textContent=(window.GESERD&&GESERD.t?GESERD.t("hm.copy","Copy"):old);cp.classList.remove("ok")},1600)});
  });
  draw();
  var cts=$("cts");
  if(cts)cts.addEventListener("click",function(e){var b=e.target.closest(".ctb");if(!b)return;
    cts.querySelectorAll(".ctb").forEach(function(x){x.classList.toggle("on",x===b)});
    cts.querySelectorAll(".pn").forEach(function(x){x.classList.toggle("on",x.dataset.t===b.dataset.t)})});
  var cube=document.querySelector(".cube3");
  if(cube&&matchMedia("(hover:hover)").matches)document.addEventListener("pointermove",function(e){
    var r=cube.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/innerWidth,dy=(e.clientY-(r.top+r.height/2))/innerHeight;
    cube.style.setProperty("--tx",(dx*26).toFixed(1)+"deg");cube.style.setProperty("--ty",(-dy*22).toFixed(1)+"deg")},{passive:true});
}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();
})();
