(function(){
var G=window.GSTpl={};
var VAR=/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]{0,39})\s*\}\}/g;
var ESC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return ESC[c]})}
G.esc=esc;
G.vars=function(){var out=[];for(var i=0;i<arguments.length;i++){String(arguments[i]||"").replace(VAR,function(m,k){if(out.indexOf(k)<0)out.push(k);return m})}return out};
G.render=function(str,values,html,keep){return String(str||"").replace(VAR,function(m,k){var v=values&&values[k];if(v==null||v===""){return keep?(html?esc(m):m):""}return html?esc(v):String(v)})};
G.ACCENTS=["#111111","#2563eb","#16a34a","#dc2626","#9333ea","#f59e0b"];
G.TYPES=["heading","text","list","quote","button","image","links","code","divider","spacer","footer"];
G.defaults=function(t){
 if(t==="heading")return{type:t,text:"Heading",align:"left",size:"m"};
 if(t==="text")return{type:t,text:"Write your message here.",align:"left",size:"m"};
 if(t==="list")return{type:t,text:"First point\nSecond point\nThird point"};
 if(t==="quote")return{type:t,text:"A short quote or a highlighted note."};
 if(t==="button")return{type:t,label:"Open",url:"https://",align:"left",style:"solid",full:false};
 if(t==="image")return{type:t,url:"https://",alt:"",link:""};
 if(t==="links")return{type:t,text:"Website|https://example.com\nHelp|https://example.com/help"};
 if(t==="code")return{type:t,text:"{{code}}"};
 if(t==="spacer")return{type:t,height:24};
 if(t==="footer")return{type:t,text:"You received this email because you have an account with us."};
 return{type:t}};
var L={
ru:{
blank:{subject:"",blocks:[{type:"text",text:"Здравствуйте, {{name}}!",align:"left"}]},
welcome:{subject:"Добро пожаловать в {{company}}",blocks:[{type:"heading",text:"Добро пожаловать в {{company}}",align:"left"},{type:"text",text:"Здравствуйте, {{name}}! Спасибо за регистрацию. Ваш аккаунт готов.",align:"left"},{type:"button",label:"Начать",url:"{{cta_url}}",align:"left"},{type:"divider"},{type:"footer",text:"Если вы не создавали этот аккаунт, просто проигнорируйте письмо."}]},
code:{subject:"Ваш код подтверждения",blocks:[{type:"heading",text:"Ваш код подтверждения",align:"left"},{type:"text",text:"Введите этот код, чтобы завершить вход. Он действует 10 минут.",align:"left"},{type:"code",text:"{{code}}"},{type:"footer",text:"Если вы не запрашивали код, просто проигнорируйте письмо."}]},
receipt:{subject:"Ваш чек от {{company}}",blocks:[{type:"heading",text:"Чек",align:"left"},{type:"text",text:"Здравствуйте, {{name}}! Спасибо за оплату {{amount}}.",align:"left"},{type:"divider"},{type:"text",text:"Заказ: {{order_id}}",align:"left"},{type:"button",label:"Открыть счёт",url:"{{invoice_url}}",align:"left"},{type:"footer",text:"{{company}}"}]}},
de:{
blank:{subject:"",blocks:[{type:"text",text:"Hallo {{name}},",align:"left"}]},
welcome:{subject:"Willkommen bei {{company}}",blocks:[{type:"heading",text:"Willkommen bei {{company}}",align:"left"},{type:"text",text:"Hallo {{name}}, danke für deine Anmeldung. Dein Konto ist bereit.",align:"left"},{type:"button",label:"Los geht's",url:"{{cta_url}}",align:"left"},{type:"divider"},{type:"footer",text:"Wenn du dieses Konto nicht erstellt hast, kannst du diese E-Mail ignorieren."}]},
code:{subject:"Dein Bestätigungscode",blocks:[{type:"heading",text:"Dein Bestätigungscode",align:"left"},{type:"text",text:"Gib diesen Code ein, um die Anmeldung abzuschließen. Er ist 10 Minuten gültig.",align:"left"},{type:"code",text:"{{code}}"},{type:"footer",text:"Wenn du diesen Code nicht angefordert hast, kannst du diese E-Mail ignorieren."}]},
receipt:{subject:"Dein Beleg von {{company}}",blocks:[{type:"heading",text:"Beleg",align:"left"},{type:"text",text:"Hallo {{name}}, danke für deine Zahlung über {{amount}}.",align:"left"},{type:"divider"},{type:"text",text:"Bestellung: {{order_id}}",align:"left"},{type:"button",label:"Rechnung ansehen",url:"{{invoice_url}}",align:"left"},{type:"footer",text:"{{company}}"}]}},
fr:{
blank:{subject:"",blocks:[{type:"text",text:"Bonjour {{name}},",align:"left"}]},
welcome:{subject:"Bienvenue chez {{company}}",blocks:[{type:"heading",text:"Bienvenue chez {{company}}",align:"left"},{type:"text",text:"Bonjour {{name}}, merci pour votre inscription. Votre compte est prêt.",align:"left"},{type:"button",label:"Commencer",url:"{{cta_url}}",align:"left"},{type:"divider"},{type:"footer",text:"Si vous n'avez pas créé ce compte, vous pouvez ignorer cet e-mail."}]},
code:{subject:"Votre code de vérification",blocks:[{type:"heading",text:"Votre code de vérification",align:"left"},{type:"text",text:"Saisissez ce code pour terminer la connexion. Il expire dans 10 minutes.",align:"left"},{type:"code",text:"{{code}}"},{type:"footer",text:"Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail."}]},
receipt:{subject:"Votre reçu de {{company}}",blocks:[{type:"heading",text:"Reçu",align:"left"},{type:"text",text:"Bonjour {{name}}, merci pour votre paiement de {{amount}}.",align:"left"},{type:"divider"},{type:"text",text:"Commande : {{order_id}}",align:"left"},{type:"button",label:"Voir la facture",url:"{{invoice_url}}",align:"left"},{type:"footer",text:"{{company}}"}]}}
};
G.starter=function(k,lang){var set=L[lang]||G.STARTERS;var s=set[k]||G.STARTERS[k]||G.STARTERS.blank;return{subject:s.subject,blocks:s.blocks.map(function(b){return Object.assign({},b)})}};
G.STARTERS={
 blank:{subject:"",blocks:[{type:"text",text:"Hi {{name}},",align:"left",size:"m"}]},
 welcome:{subject:"Welcome to {{company}}",blocks:[{type:"heading",text:"Welcome to {{company}}",align:"left",size:"m"},{type:"text",text:"Hi {{name}}, thanks for signing up. Your account is ready.",align:"left",size:"m"},{type:"button",label:"Get started",url:"{{cta_url}}",align:"left",style:"solid",full:false},{type:"divider"},{type:"footer",text:"If you did not create this account, you can ignore this email."}]},
 code:{subject:"Your verification code",blocks:[{type:"heading",text:"Your verification code",align:"left",size:"m"},{type:"text",text:"Use this code to finish signing in. It expires in 10 minutes.",align:"left",size:"m"},{type:"code",text:"{{code}}"},{type:"footer",text:"If you did not request this code, you can ignore this email."}]},
 receipt:{subject:"Your receipt from {{company}}",blocks:[{type:"heading",text:"Receipt",align:"left",size:"m"},{type:"text",text:"Hi {{name}}, thank you for your payment of {{amount}}.",align:"left",size:"m"},{type:"divider"},{type:"text",text:"Order: {{order_id}}",align:"left",size:"m"},{type:"button",label:"View invoice",url:"{{invoice_url}}",align:"left",style:"solid",full:false},{type:"footer",text:"{{company}}"}]}
};
G.defaultStyle=function(){return{accent:"#111111",font:"sans",bg:"soft"}};
function lum(hex){var n=parseInt(hex.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;return(.299*r+.587*g+.114*b)/255}
function url(u){u=String(u||"").trim();if(/^(https?:\/\/|mailto:|\{\{)/i.test(u))return u;return u?"https://"+u:"#"}
function al(a){return a==="center"?"center":"left"}
function inline(s,acc){
 var t=esc(s);
 t=t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,function(m,x,u){var raw=u.replace(/&amp;/g,"&");if(!/^(https?:\/\/|mailto:|\{\{)/i.test(raw))return m;return'<a href="'+esc(raw)+'" style="color:'+acc+';text-decoration:underline;">'+x+"</a>"});
 t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>");
 t=t.replace(/(^|[\s(>])_([^_]+)_(?=$|[\s).,!?:;<])/g,"$1<em>$2</em>");
 return t.replace(/\r?\n/g,"<br>")}
G.inline=inline;
var HS={s:22,m:26,l:32},TS={s:14,m:16,l:18};
function block(b,st){
 var t=b.type,acc=st.accent;
 if(t==="heading")return'<h1 style="margin:0 0 16px;font-size:'+(HS[b.size]||26)+'px;line-height:1.25;font-weight:700;text-align:'+al(b.align)+';">'+inline(b.text,acc)+"</h1>";
 if(t==="text")return'<p style="margin:0 0 16px;font-size:'+(TS[b.size]||16)+'px;line-height:1.6;text-align:'+al(b.align)+';">'+inline(b.text,acc)+"</p>";
 if(t==="list"){var items=String(b.text||"").split(/\r?\n/).filter(function(x){return x.trim()}).map(function(x){return'<li style="margin:0 0 6px;">'+inline(x,acc)+"</li>"}).join("");return'<ul style="margin:0 0 16px;padding:0 0 0 22px;font-size:16px;line-height:1.6;">'+items+"</ul>"}
 if(t==="quote")return'<blockquote style="margin:0 0 16px;padding:4px 0 4px 16px;border-left:3px solid '+acc+';font-size:16px;line-height:1.6;color:#3f3f46;">'+inline(b.text,acc)+"</blockquote>";
 if(t==="button"){
  var solid=b.style!=="outline",fg=solid?(lum(acc)>.62?"#111111":"#ffffff"):acc,full=!!b.full;
  var td=solid?'background:'+acc+';border-radius:8px;':'border:2px solid '+acc+';border-radius:8px;';
  return'<table role="presentation" cellpadding="0" cellspacing="0"'+(full?' width="100%"':(al(b.align)==="center"?' align="center"':""))+' style="margin:8px 0 24px;"><tr><td align="center" style="'+td+'"><a href="'+esc(url(b.url))+'" style="display:block;padding:'+(solid?12:10)+'px 24px;font-size:16px;font-weight:600;color:'+fg+';text-decoration:none;text-align:center;">'+esc(b.label)+"</a></td></tr></table>"}
 if(t==="image"){var img='<img src="'+esc(url(b.url))+'" alt="'+esc(b.alt)+'" width="520" style="display:block;width:100%;max-width:100%;height:auto;border-radius:8px;border:0;">';var inner=b.link?'<a href="'+esc(url(b.link))+'" style="text-decoration:none;">'+img+"</a>":img;return'<div style="margin:0 0 16px;">'+inner+"</div>"}
 if(t==="links"){var parts=String(b.text||"").split(/\r?\n/).filter(function(x){return x.trim()}).map(function(x){var i=x.lastIndexOf("|"),lab=i>0?x.slice(0,i):x,u=i>0?x.slice(i+1):"";return u.trim()?'<a href="'+esc(url(u))+'" style="color:'+acc+';text-decoration:underline;">'+esc(lab.trim())+"</a>":esc(lab.trim())});return'<p style="margin:8px 0 16px;font-size:14px;line-height:1.8;text-align:center;">'+parts.join(" &nbsp;·&nbsp; ")+"</p>"}
 if(t==="code")return'<div style="margin:8px 0 24px;padding:16px;background:#f4f4f5;border-radius:8px;text-align:center;font-family:Menlo,Consolas,monospace;font-size:28px;letter-spacing:6px;font-weight:700;">'+esc(b.text)+"</div>";
 if(t==="divider")return'<hr style="border:0;border-top:1px solid #e4e4e7;margin:24px 0;">';
 if(t==="spacer"){var h=Math.max(8,Math.min(96,+b.height||24));return'<div style="height:'+h+"px;line-height:"+h+'px;font-size:1px;">&nbsp;</div>'}
 if(t==="footer")return'<p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#71717a;text-align:center;">'+inline(b.text,"#71717a")+"</p>";
 return""}
function enc(o){return btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function dec(s){return JSON.parse(decodeURIComponent(escape(atob(s))))}
G.build=function(doc){
 var st=doc.style||G.defaultStyle(),font=st.font==="serif"?"Georgia,'Times New Roman',serif":"Arial,Helvetica,sans-serif",bg=st.bg==="white"?"#ffffff":"#f4f4f5";
 var rows=doc.blocks.map(function(b){return block(b,st)}).join(""),pre=doc.pre?'<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">'+esc(doc.pre)+"</div>":"";
 return'<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:'+bg+';">'+pre+'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:'+bg+';"><tr><td align="center" style="padding:32px 16px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" data-gs-blocks="'+enc({v:1,style:st,pre:doc.pre||"",blocks:doc.blocks})+'" style="max-width:600px;background:#ffffff;border-radius:12px;font-family:'+font+";color:#18181b;"+(st.bg==="white"?"border:1px solid #e4e4e7;":"")+'"><tr><td style="padding:40px;">'+rows+"</td></tr></table></td></tr></table></body></html>"};
G.parse=function(html){
 var m=/data-gs-blocks="([A-Za-z0-9+\/=]+)"/.exec(html||"");if(!m)return null;
 try{var o=dec(m[1]);if(o&&o.v===1&&Array.isArray(o.blocks)){var st=o.style||{};return{pre:typeof o.pre==="string"?o.pre:"",style:{accent:/^#[0-9a-f]{6}$/i.test(st.accent)?st.accent:"#111111",font:st.font==="serif"?"serif":"sans",bg:st.bg==="white"?"white":"soft"},blocks:o.blocks.filter(function(b){return G.TYPES.indexOf(b.type)>=0})}}}catch(e){}
 return null};
})();
