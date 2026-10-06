(function(){
var A=window.GSApp;if(!A)return;
A.ready(function(){var r=document.getElementById("acc-root");if(!r||!window.GSAccount)return;GSAccount.mount(r,'<div class="ph"><h1>'+A.esc(A.t("app.nav.account","Account settings"))+'</h1></div>')})
})();
