function w(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(run);if(n>200)return;setTimeout(function(){w(n+1)},25)}
function run(){var O=GESERD,n;try{n=new Intl.DisplayNames([O.lang||"en"],{type:"region"})}catch(e){n={of:function(c){return c}}}document.getElementById("chips").innerHTML=O.blocked.map(function(c){return"<span>"+n.of(c)+"</span>"}).sort().join("")}
w(0);
