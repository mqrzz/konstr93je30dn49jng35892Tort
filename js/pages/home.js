/* js/pages/home.js — home page: language tabs + copy button for the "Integrate tonight" code panel. */
(function(){
var host=location.host||"geserd.com";
var U="https://"+host+"/api/emails";
var S={
"cURL":'curl -X POST '+U+' \\\n  -H "Authorization: Bearer gs_xxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"from":"hi@yourdomain.com","to":"user@example.com","subject":"Hello","html":"<strong>it works</strong>"}\'',
"Node.js":'const res = await fetch("'+U+'", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer gs_xxxxxxxx",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    from: "hi@yourdomain.com",\n    to: "user@example.com",\n    subject: "Hello",\n    html: "<strong>it works</strong>"\n  })\n});\nconsole.log(await res.json());',
"Python":'import requests\n\nres = requests.post(\n    "'+U+'",\n    headers={"Authorization": "Bearer gs_xxxxxxxx"},\n    json={\n        "from": "hi@yourdomain.com",\n        "to": "user@example.com",\n        "subject": "Hello",\n        "html": "<strong>it works</strong>",\n    },\n)\nprint(res.json())',
"PHP":'$ch = curl_init("'+U+'");\ncurl_setopt_array($ch, [\n    CURLOPT_POST => true,\n    CURLOPT_RETURNTRANSFER => true,\n    CURLOPT_HTTPHEADER => [\n        "Authorization: Bearer gs_xxxxxxxx",\n        "Content-Type: application/json",\n    ],\n    CURLOPT_POSTFIELDS => json_encode([\n        "from" => "hi@yourdomain.com",\n        "to" => "user@example.com",\n        "subject" => "Hello",\n        "html" => "<strong>it works</strong>",\n    ]),\n]);\necho curl_exec($ch);'
};
var names=Object.keys(S),cur=names[0];
var tabs=document.getElementById("idTabs"),pre=document.getElementById("idCode"),btn=document.getElementById("idCopy");
if(!tabs||!pre)return;
function esc(x){return x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function hl(x){return esc(x).replace(/(&quot;|")([^"\n]*?)\1/g,function(m){return '<span class="s">'+m+'</span>'}).replace(/(\'[^\'\n]*\')/g,'<span class="s">$1</span>')}
function draw(){
 tabs.innerHTML=names.map(function(n){return '<button type="button" role="tab" class="'+(n===cur?"on":"")+'" data-n="'+n+'" aria-selected="'+(n===cur)+'">'+n+'</button>'}).join("");
 pre.innerHTML=hl(S[cur]);
}
tabs.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;cur=b.dataset.n;draw()});
function fallback(t){return new Promise(function(ok,no){try{var a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();var r=document.execCommand("copy");document.body.removeChild(a);r?ok():no()}catch(x){no()}})}
btn.addEventListener("click",function(){
 var t=S[cur],lab=btn.querySelector("span"),old=lab.textContent;
 (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):fallback(t)).catch(function(){return fallback(t)}).then(function(){lab.textContent=(window.GESERD&&GESERD.t)?GESERD.t("home.copied","Copied"):"Copied"},function(){lab.textContent="\u2715"}).then(function(){setTimeout(function(){lab.textContent=old},1600)});
});
draw();
})();
