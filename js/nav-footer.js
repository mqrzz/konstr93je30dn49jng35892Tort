/* ==========================================================================
   ovyrn — nav-footer.js
   Единая шапка и подвал маркетингового сайта. Рендерится в #site-header
   и #site-footer. Правится ТОЛЬКО здесь — все страницы сайта используют
   этот файл, поэтому дублирования разметки меню больше нет.
   ========================================================================== */

(function () {
  const NAV = [
    {
      label: 'Продукт',
      panel: [
        { href: '/#bots', title: 'Управление ботами', desc: 'Имя, фото, меню команд — без BotFather' },
        { href: '/#monitoring', title: 'Мониторинг', desc: 'Аптайм, скорость ответа, диагностика вебхука' },
        { href: '/#storage', title: 'Хранилище', desc: 'Файлы через Telegram, без своих серверов' },
      ],
    },
    {
      label: 'Компания',
      panel: [
        { href: '/about/', title: 'О нас' },
        { href: '/blog/', title: 'Блог' },
        { href: '/careers/', title: 'Карьера' },
      ],
    },
    { label: 'Заказать бота', href: '/order/' },
    { label: 'Документация', href: '/docs/' },
    { label: 'Тарифы', href: '/pricing/' },
  ];

  const FOOTER = {
    address: '',
    columns: [
      {
        title: 'Продукт',
        links: [
          ['/#bots', 'Управление ботами'],
          ['/#monitoring', 'Мониторинг'],
          ['/#storage', 'Хранилище'],
          ['/pricing/', 'Тарифы'],
          ['/order/', 'Заказать бота'],
        ],
      },
      {
        title: 'Ресурсы',
        links: [
          ['/changelog/', 'Изменения'],
          ['/docs/', 'Документация'],
          ['/status/', 'Статус'],
        ],
      },
      {
        title: 'Компания',
        links: [
          ['/about/', 'О нас'],
          ['/blog/', 'Блог'],
          ['/careers/', 'Карьера'],
        ],
      },
      {
        title: 'Помощь',
        links: [
          ['/contact/', 'Связаться с нами'],
          ['/legal/', 'Документы'],
        ],
      },
    ],
  };

  const LOGO_SVG = `<a href="/" class="logo-link" aria-label="ovyrn"><svg viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="0" y="34" font-family="Outfit, sans-serif" font-size="30" font-weight="600" fill="#f4f2ec">ovyrn</text></svg></a>`;

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;

    const items = NAV.map((item, i) => {
      if (item.panel) {
        return `
        <li class="nav-item">
          <button class="nav-trigger" aria-expanded="false" aria-controls="nav-panel-${i}" data-nav-trigger="${i}">
            ${item.label}
            <svg class="chev icon" style="width:12px;height:12px"><use href="/assets/icons.svg#icon-chevron-down"></use></svg>
          </button>
          <div class="nav-panel glass" id="nav-panel-${i}" role="menu">
            ${item.panel.map(p => `<a href="${p.href}" role="menuitem">${p.title}${p.desc ? `<small>${p.desc}</small>` : ''}</a>`).join('')}
          </div>
        </li>`;
      }
      return `<li class="nav-item"><a class="nav-link" href="${item.href}">${item.label}</a></li>`;
    }).join('');

    el.innerHTML = `
      ${LOGO_SVG}
      <nav>
        <ul class="nav-menu">${items}</ul>
      </nav>
      <div class="header-actions">
        <a href="/login/" class="btn btn-ghost">Войти</a>
        <a href="/signup/" class="btn btn-primary glass">Начать</a>
        <button class="nav-mobile-toggle" aria-label="Открыть меню" id="mobileMenuToggle">
          <svg class="icon"><use href="/assets/icons.svg#icon-menu"></use></svg>
        </button>
      </div>
    `;

    // Dropdown behaviour: click to toggle, click-outside to close, Escape to close.
    const triggers = el.querySelectorAll('[data-nav-trigger]');
    function closeAll(except) {
      triggers.forEach(t => {
        if (t === except) return;
        t.setAttribute('aria-expanded', 'false');
        document.getElementById(t.getAttribute('aria-controls')).classList.remove('open');
      });
    }
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        closeAll(isOpen ? null : trigger);
        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.classList.toggle('open', !isOpen);
      });
    });
    document.addEventListener('click', () => closeAll(null));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(null); });

    // Header becomes solid once the page scrolls (transparent at the very top,
    // like the Resend reference).
    function onScroll() {
      el.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function renderMobileDrawer() {
    if (document.getElementById('mobileDrawer')) return;
    const drawer = document.createElement('div');
    drawer.className = 'mobile-drawer';
    drawer.id = 'mobileDrawer';

    const flatLinks = [];
    NAV.forEach(item => {
      if (item.panel) {
        flatLinks.push({ label: item.label, isGroup: true });
        item.panel.forEach(p => flatLinks.push({ label: p.title, href: p.href }));
      } else {
        flatLinks.push({ label: item.label, href: item.href });
      }
    });

    drawer.innerHTML = `
      <div class="mobile-drawer-top">
        ${LOGO_SVG}
        <button class="nav-mobile-toggle" id="mobileMenuClose" aria-label="Закрыть меню">
          <svg class="icon"><use href="/assets/icons.svg#icon-close"></use></svg>
        </button>
      </div>
      <nav>
        ${flatLinks.map(l => l.isGroup
          ? `<div class="mnav-group-label">${l.label}</div>`
          : `<a href="${l.href}">${l.label}</a>`).join('')}
      </nav>
      <div class="mobile-ctas">
        <a href="/login/" class="btn btn-ghost" style="border:1px solid var(--border-strong)">Войти</a>
        <a href="/signup/" class="btn btn-primary glass">Начать</a>
      </div>
    `;
    document.body.appendChild(drawer);

    const toggleBtn = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('mobileMenuClose');
    function open() { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { drawer.classList.remove('open'); document.body.style.overflow = ''; }
    if (toggleBtn) toggleBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;

    const cols = FOOTER.columns.map(col => `
      <div class="footer-col">
        <h4>${col.title}</h4>
        <ul>${col.links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>
      </div>
    `).join('');

    el.innerHTML = `
      <div class="container footer-grid">
        <div class="footer-col">
          ${LOGO_SVG}
          <a class="footer-status" href="/status/">
            <span class="dot"></span> Все системы работают
          </a>
        </div>
        ${cols}
      </div>
    `;
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    renderMobileDrawer();
    initReveal();
  });
})();
