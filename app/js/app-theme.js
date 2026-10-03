(function(){
var K="geserd_theme";
function get(){try{return localStorage.getItem(K)||"dark"}catch(e){return"dark"}}
function apply(m){var d=m==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):m;document.documentElement.setAttribute("data-theme",d)}
function set(m){try{localStorage.setItem(K,m)}catch(e){}apply(m)}
apply(get());
matchMedia("(prefers-color-scheme: light)").addEventListener&&matchMedia("(prefers-color-scheme: light)").addEventListener("change",function(){if(get()==="system")apply("system")});
window.GSTheme={get:get,set:set};
})();
