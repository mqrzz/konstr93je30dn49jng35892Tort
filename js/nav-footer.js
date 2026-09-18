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
        { href: '/about.html', title: 'О нас' },
        { href: '/blog/', title: 'Блог' },
        { href: '/careers.html', title: 'Карьера' },
      ],
    },
    { label: 'Документация', href: '/docs/' },
    { label: 'Тарифы', href: '/pricing.html' },
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
          ['/pricing.html', 'Тарифы'],
        ],
      },
      {
        title: 'Ресурсы',
        links: [
          ['/changelog.html', 'Изменения'],
          ['/docs/', 'Документация'],
          ['/status.html', 'Статус'],
        ],
      },
      {
        title: 'Компания',
        links: [
          ['/about.html', 'О нас'],
          ['/blog/', 'Блог'],
          ['/careers.html', 'Карьера'],
        ],
      },
      {
        title: 'Помощь',
        links: [
          ['/contact.html', 'Связаться с нами'],
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
        <a href="/login.html" class="btn btn-ghost">Войти</a>
        <a href="/signup.html" class="btn btn-primary glass">Начать</a>
        <button class="nav-mobile-toggle" aria-label="Меню">
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
          <a class="footer-status" href="/status.html">
            <span class="dot"></span> Все системы работают
          </a>
        </div>
        ${cols}
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();
