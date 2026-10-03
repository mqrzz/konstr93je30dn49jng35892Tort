(function(){if(location.protocol==="http:"&&!/^(localhost|127\.|\[::1\]|10\.|192\.168\.)/.test(location.hostname)){location.replace("https:"+location.href.substring(5));return}var BUILD="8f5dac2940";var L=["config","geo","i18n","nav","footer","maintenance","analytics","site","consent","banners","experiments","events","errors","extra","faq"];
var base=document.currentScript.src.replace(/boot\.js.*$/,"");
L.forEach(function(n){var s=document.createElement("script");s.src=base+n+".js?v="+BUILD;window.GESERD_BUILD=BUILD;s.async=false;s.onerror=function(){};document.head.appendChild(s)});
var io="IntersectionObserver"in window&&new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".rv").forEach(function(el){io?io.observe(el):el.classList.add("in")})})})();
