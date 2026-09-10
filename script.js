/* ============ MOBILE NAV MENU ============ */
function toggleNavMenu() {
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('navBurger');
  const overlay = document.getElementById('navOverlay');
  if (!links || !burger || !overlay) return;
  const open = links.classList.toggle('open');
  burger.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
(function closeNavOnLinkClick(){
  const links = document.getElementById('navLinks');
  if (!links) return;
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (links.classList.contains('open')) toggleNavMenu();
  }));
})();

/* ============ DOCS SIDEBAR (docs-*.html) ============ */
function toggleDocsMenu() {
  const el = document.getElementById('docsSidebar');
  if (el) el.classList.toggle('open');
}
(function markActiveDocsLink(){
  if (typeof CURRENT_PAGE === 'undefined') return;
  document.querySelectorAll('.docs-sidebar a[data-page]').forEach(a => {
    if (a.dataset.page === CURRENT_PAGE) a.classList.add('active');
  });
})();

/* trigger cookie banner once page (incl. footer) is in the DOM */
renderCookieBanner();
