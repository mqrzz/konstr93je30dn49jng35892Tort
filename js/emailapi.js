(function(){
var box=document.getElementById("ea-json");if(!box)return;
var on={};
var BASE=[["from",'"Acme <hello@acme.dev>"'],["to",'["ada@example.com"]'],["subject",'"Welcome to Acme"'],["html",'"<p>Hello Ada</p>"']];
var EXTRA={cc:[["cc",'["team@acme.dev"]'],["bcc",'["audit@acme.dev"]']],reply:[["reply_to",'"support@acme.dev"']],att:[["attachments",'[{\n    "filename": "invoice.pdf",\n    "content": "JVBERi0xLjQK…",\n    "content_type": "application/pdf"\n  }]']],hdr:[["headers",'{\n    "List-Unsubscribe": "<https://acme.dev/u/1>"\n  }']],tpl:[["template_id",'"c325…"'],["variables",'{ "name": "Ada" }']]};
var ORDER=["cc","reply","att","hdr","tpl"];
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function line(k,v,last,fresh){var t='  <span class="k">"'+k+'"</span>: <span class="s">'+esc(v)+"</span>"+(last?"":",");return fresh?'<span class="new">'+t+"</span>":t}
function render(fresh){var base=on.tpl?[BASE[0],BASE[1]]:BASE;
var list=base.map(function(x){return x.concat([0])});
ORDER.forEach(function(f){if(on[f])EXTRA[f].forEach(function(x){list.push(x.concat([f===fresh?1:0]))})});
var out="{\n"+list.map(function(x,i){return line(x[0],x[1],i===list.length-1,x[2])}).join("\n")+"\n}";
box.innerHTML=out}
document.querySelectorAll(".ea-ch").forEach(function(b){b.addEventListener("click",function(){var f=b.dataset.f,v=b.getAttribute("aria-pressed")!=="true";on[f]=v;b.setAttribute("aria-pressed",v);render(v?f:null)})});
render(null)})();
