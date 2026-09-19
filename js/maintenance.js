/* ==========================================================================
   ovyrn — maintenance.js
   Переключатель техработ. Смотрит /maintenance-status.json — если там
   {"active": true}, редиректит на /maintenance/. Включать/выключать —
   правкой одного JSON-файла на сервере, без деплоя и правок HTML.

   Пока /maintenance-status.json на сервере нет — файл создать заранее:
   {"active": false}
   ========================================================================== */
(async function maintenanceCheck() {
  // Сама страница техработ не должна проверять сама себя.
  if (location.pathname.startsWith('/maintenance')) return;

  try {
    const res = await fetch('/maintenance-status.json', { cache: 'no-store', signal: AbortSignal.timeout(3000) });
    if (!res.ok) return; // файла нет или сервер недоступен — не мешаем сайту работать
    const data = await res.json();
    if (data && data.active === true) {
      window.location.replace('/maintenance/');
    }
  } catch (_) {
    // Сбой проверки — не блокируем сайт (fail-open), техработы лучше
    // включать явно через JSON, а не как побочный эффект сбойного запроса.
  }
})();
