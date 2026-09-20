/* ==========================================================================
   ovyrn — i18n.js
   Определяет язык по префиксу пути (/en/, /fr/, /de/; без префикса — ru),
   подгружает соответствующий /i18n/{lang}.json и подставляет текст в
   элементы с data-i18n / data-i18n-html / data-i18n-content.
   Разметку страниц трогать не нужно — только словари в /i18n/*.json.
   ========================================================================== */
(function () {
  const SUPPORTED = ['en', 'fr', 'de']; // ru — язык по умолчанию, без префикса

  function detectLang() {
    const seg = location.pathname.split('/')[1];
    return SUPPORTED.includes(seg) ? seg : 'ru';
  }

  function getPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  async function loadDict(lang) {
    const res = await fetch(`/i18n/${lang}.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error('i18n_missing_' + lang);
    return res.json();
  }

  function applyDict(dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = getPath(dict, el.getAttribute('data-i18n'));
      if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = getPath(dict, el.getAttribute('data-i18n-html'));
      if (val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
      const val = getPath(dict, el.getAttribute('data-i18n-content'));
      if (val !== undefined) el.setAttribute('content', val);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = getPath(dict, el.getAttribute('data-i18n-placeholder'));
      if (val !== undefined) el.setAttribute('placeholder', val);
    });
  }

  window.ovyrnI18n = { lang: detectLang(), dict: null };

  document.addEventListener('DOMContentLoaded', async () => {
    const lang = window.ovyrnI18n.lang;
    document.documentElement.lang = lang;
    if (lang === 'ru') return; // разметка уже на русском — грузить нечего

    try {
      const dict = await loadDict(lang);
      window.ovyrnI18n.dict = dict;
      applyDict(dict);
      // Хедер/футер рендерятся отдельно в nav-footer.js чуть позже —
      // применяем словарь ещё раз после их отрисовки.
      document.addEventListener('ovyrn:chrome-rendered', () => applyDict(dict), { once: true });
    } catch (e) {
      // Словаря нет или не загрузился — остаёмся на русском тексте разметки,
      // это лучше, чем пустая страница.
      console.warn('[i18n] fallback to ru:', e.message);
    }
  });
})();
