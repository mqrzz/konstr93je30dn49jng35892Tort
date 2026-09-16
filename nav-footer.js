/* ============ SITE NAV & FOOTER (single source of truth) ============ */
const SITE_NAV_HTML = `<nav class="nav">
  <div class="nav-inner">
    <a class="logo" href="/">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8 7l2.5 8.5M16 7l-2.5 8.5"/></svg>
      Flowgram
    </a>
    <div class="nav-links" id="navLinks">
      <div class="nav-links-close" onclick="toggleNavMenu()">
        <span>Меню</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </div>
      <a href="/#features">Возможности</a>
      <a href="/templates">Шаблоны</a>
      <a href="/#company">Компания</a>
      <a href="/enterprise">Для бизнеса</a>
      <a href="/docs">Документация</a>
      <a href="/pricing">Тарифы</a>
      <a href="/login" class="link-login nav-link-mobile-only" style="border-bottom:none;">Войти</a>
    </div>
    <div class="nav-right">
      <a class="link-login" href="/login">Войти</a>
      <a class="nav-cta" href="/login?mode=signup">Начать</a>
      <button class="nav-burger" id="navBurger" aria-label="Меню" onclick="toggleNavMenu()"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="nav-overlay" id="navOverlay" onclick="toggleNavMenu()"></div>
</nav>`;
const SITE_FOOTER_HTML = `<footer>
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="logo" href="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8 7l2.5 8.5M16 7l-2.5 8.5"/></svg>
          Flowgram
        </a>
        <address>ул. Примерная 12, офис 5<br>Санкт-Петербург, Россия</address>
        <div class="footer-social">
          <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h3l-7.5 8.6L22 22h-6.6l-5.2-6.8L4 22H1l8-9.2L2 2h6.8l4.7 6.2L18 2z"/></svg></a>
          <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9c0-1.1.4-1.8.9-2.2-3-.3-6.1-1.5-6.1-6.6 0-1.5.5-2.6 1.4-3.6-.1-.3-.6-1.6.1-3.4 0 0 1.1-.4 3.6 1.3 1-.3 2.1-.4 3.1-.4s2.1.1 3.1.4c2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.2 3.1.1 3.4.9 1 1.4 2.1 1.4 3.6 0 5.1-3.1 6.3-6.1 6.6.5.4.9 1.2.9 2.5V19"/></svg></a>
          <a href="#" aria-label="Telegram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l6 3-6 3z"/></svg></a>
        </div>
      </div>
      <div class="footer-cols footer-cols-5">
        <div class="footer-col">
          <h4>Возможности</h4>
          <a href="/#features">Конструктор</a>
          <a href="/#features">Аудитории</a>
          <a href="/#features">Рассылки</a>
          <a href="/#features">Входящие</a>
          <a href="/templates">Шаблоны</a>
          <a href="/docs/webhooks">Вебхуки</a>
          <a href="/integrations">Интеграции</a>
        </div>
        <div class="footer-col">
          <h4>Ресурсы</h4>
          <a href="/changelog">Список изменений</a>
          <a href="/pricing">Тарифы</a>
          <a href="/enterprise">Для бизнеса</a>
          <a href="/security">Безопасность и 152-ФЗ</a>
        </div>
        <div class="footer-col">
          <h4>Компания</h4>
          <a href="/about">О нас</a>
          <a href="/blog">Блог</a>
          <a href="/careers">Вакансии</a>
          <a href="/#enterprise">Клиенты</a>
          <a href="/about#philosophy">Философия</a>
        </div>
        <div class="footer-col">
          <h4>Помощь</h4>
          <a href="/contact">Поддержка</a>
          <a href="/status">Статус</a>
          <a href="/docs">База знаний</a>
        </div>
        <div class="footer-col">
          <h4>Юридическое</h4>
          <a href="/legal">Все документы</a>
          <a href="/legal/oferta">Договор оферты</a>
          <a href="/legal/privacy">Конфиденциальность</a>
          <a href="/legal/aup">Правила использования</a>
          <a href="/legal/refund">Возврат средств</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Flowgram. Все права защищены.</span>
      <span>Статус: всё работает</span>
    </div>
  </div>
</footer>`;
function renderNav() {
  const el = document.getElementById('site-nav');
  if (el) el.outerHTML = SITE_NAV_HTML;
}
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (el) el.outerHTML = SITE_FOOTER_HTML;
}

/* ============ COOKIE CONSENT BANNER ============ */
function renderCookieBanner() {
  if (localStorage.getItem('fg_cookie_choice')) return;
  const div = document.createElement('div');
  div.className = 'cookie-banner';
  div.id = 'cookieBanner';
  div.innerHTML = `<p>Мы используем cookie для входа в аккаунт и аналитики посещений. Подробности — в <a href="privacy">политике конфиденциальности</a>.</p>
    <div class="cookie-actions">
      <button class="cookie-accept" onclick="setCookieChoice('accepted')">Принять</button>
      <button class="cookie-decline" onclick="setCookieChoice('declined')">Только необходимые</button>
    </div>`;
  document.body.appendChild(div);
  requestAnimationFrame(() => requestAnimationFrame(() => div.classList.add('show')));
}
function setCookieChoice(choice) {
  localStorage.setItem('fg_cookie_choice', choice);
  const b = document.getElementById('cookieBanner');
  if (b) { b.classList.remove('show'); setTimeout(() => b.remove(), 300); }
}
