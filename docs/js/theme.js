(function(){
var K="geserd_doctheme";
function get(){try{return localStorage.getItem(K)||"dark"}catch(e){return "dark"}}
function apply(m){if(m==="system")document.documentElement.removeAttribute("data-theme");else document.documentElement.setAttribute("data-theme",m)}
function set(m){try{localStorage.setItem(K,m)}catch(e){}apply(m)}
apply(get());
window.GSDocTheme={get:get,set:set};
})();
