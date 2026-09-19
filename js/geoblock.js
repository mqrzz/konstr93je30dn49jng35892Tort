/* ==========================================================================
   ovyrn — geoblock.js
   Редиректит посетителей из заблокированных стран на /unavailable/.
   Логика взята из рабочего скрипта пользователя. По его просьбе проверка
   идёт на КАЖДОЙ странице при заходе, без кэширования — так geo-смена
   (например, отключение VPN) посреди сессии тоже отловится. Это чуть
   больше запросов к API геолокации, но так надёжнее для блокировки.
   ========================================================================== */
(async function geoRedirect() {
  // Сама страница блокировки не должна проверять сама себя (иначе цикл).
  if (location.pathname.startsWith('/unavailable')) return;

  const REDIRECT_URL = '/unavailable/';
  const blockedCountries = ['IR','AF','IQ','UA','NG','NE','MX','SA','JO','PK','IN','MM','BD','NP','BT','OM','YE','QA','KW','BH','CD','CG','DZ'];

  function redirect() {
    window.location.replace(REDIRECT_URL);
  }

  async function checkCountryIs() {
    const res = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('bad_response');
    const data = await res.json();
    return data.country || null;
  }

  async function checkIpWhoIs() {
    const res = await fetch('https://ipwho.is/?fields=country_code', { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('bad_response');
    const data = await res.json();
    return data.country_code || null;
  }

  let country = null;
  try {
    country = await checkCountryIs();
  } catch (_) {
    try {
      country = await checkIpWhoIs();
    } catch (_) {
      // Обе проверки не удались — не блокируем (fail-open): сбой стороннего
      // API не должен класть доступ на весь сайт.
      return;
    }
  }

  if (country && blockedCountries.includes(country)) {
    redirect();
  }
})();
