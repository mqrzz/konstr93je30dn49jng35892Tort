#!/usr/bin/env node
// Cache-busting stamp. Usage:  node frontend/tools/stamp.js
// Why: Cloudflare/browsers keep serving an OLD geserd.css or footer.js next to NEW html (home looks unstyled, footer missing, old login script runs).
// This computes BUILD = hash of every css/js/json/svg/webp/png under frontend/ (ignoring the ?v= stamps themselves) and rewrites every local
// reference in html + css to "...?v=BUILD". boot.js passes the same BUILD on to the scripts it loads and to the i18n json requests.
// It is run automatically by geserd-deploy on the server, so every deploy gets fresh URLs; no manual cache purge is needed afterwards.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..');
const VRX=/\?v=[0-9a-f]{10}/g;
function walk(d,out=[]){for(const f of fs.readdirSync(d)){if(f==='node_modules'||f==='tools'||f.startsWith('.'))continue;const p=path.join(d,f);const s=fs.statSync(p);s.isDirectory()?walk(p,out):out.push(p)}return out}
const files=walk(ROOT);
const h=crypto.createHash('sha1');
for(const f of files.filter(f=>/\.(css|js|json|svg|webp|png|jpg|ico|woff2?)$/.test(f)).sort()){h.update(path.relative(ROOT,f));h.update(/\.(css|js|json)$/.test(f)?fs.readFileSync(f,'utf8').replace(VRX,'').replace(/var BUILD="[^"]*"/,'var BUILD=""'):fs.readFileSync(f))}
const BUILD=h.digest('hex').slice(0,10);
const ASSET=/(\/(?:css|js|assets|i18n|docs\/css|docs\/js|app\/js|app\/css)\/[A-Za-z0-9_\-./]+?\.(?:css|js|svg|webp|png|jpg|ico|json))(\?v=[0-9a-f]{10})?(?=["')\s])/g;
let n=0;
for(const f of files){
  if(/\.html$/.test(f)){const s=fs.readFileSync(f,'utf8');const t=s.replace(/((?:href|src)=")([^"]+)(")/g,(m,a,u,c)=>/^\/(?:css|js|assets|docs\/|app\/)/.test(u)?a+u.replace(VRX,'').replace(/(\.(?:css|js|svg|webp|png|jpg|ico))(?=$)/,'$1?v='+BUILD)+c:m);if(t!==s){fs.writeFileSync(f,t);n++}}
  else if(/\.css$/.test(f)){const s=fs.readFileSync(f,'utf8');const t=s.replace(/url\((['"]?)(\/assets\/[^)'"?]+)(\?v=[0-9a-f]{10})?\1\)/g,(m,q,u)=>'url('+q+u+'?v='+BUILD+q+')');if(t!==s){fs.writeFileSync(f,t);n++}}
  else if(/boot\.js$/.test(f)){const s=fs.readFileSync(f,'utf8');const t=s.replace(/var BUILD="[^"]*"/,'var BUILD="'+BUILD+'"');if(t!==s){fs.writeFileSync(f,t);n++}}
}
console.log('stamp BUILD='+BUILD+', files touched: '+n);
