// Usage: node tools/check-i18n.js  — lists missing keys per language and data-i18n keys used in HTML but absent from en.json
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const L=JSON.parse(fs.readFileSync(root+'/i18n/languages.json','utf8')),en=JSON.parse(fs.readFileSync(root+'/i18n/en.json','utf8'));
let bad=0;for(const {code} of L){if(code==='en')continue;let d={};try{d=JSON.parse(fs.readFileSync(root+`/i18n/${code}.json`,'utf8'))}catch{console.log(code+': FILE MISSING');bad++;continue}
 const miss=Object.keys(en).filter(k=>!(k in d));if(miss.length){bad++;console.log(code+': missing '+miss.length+' -> '+miss.join(', '))}}
const used=new Set();(function w(d){for(const f of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,f.name);if(f.isDirectory()){if(!['node_modules','.git','tools'].includes(f.name))w(p)}else if(f.name.endsWith('.html'))for(const m of fs.readFileSync(p,'utf8').matchAll(/data-i18n="([^"]+)"/g))used.add(m[1])}})(root);
const un=[...used].filter(k=>!(k in en));if(un.length){bad++;console.log('used in HTML but not in en.json: '+un.join(', '))}
console.log(bad?'\nIssues found.':'i18n OK ('+L.length+' languages, '+Object.keys(en).length+' keys)');
