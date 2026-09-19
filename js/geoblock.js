/* ==========================================================================
   ovyrn — geoblock.js
   Редиректит посетителей из заблокированных стран на страницу geo.antviz.ru.
   Логика взята из рабочего скрипта пользователя, добавлено только
   кэширование результата в sessionStorage, чтобы не дёргать API на
   каждой странице сайта заново.
   ========================================================================== */
(async function geoRedirect() {
  const REDIRECT_URL = 'https://geo.antviz.ru';
  const CACHE_KEY = 'ovyrn_geo_check';
  const blockedCountries = ['IR','AF','IQ','UA','NG','NE','MX','SA','JO','PK','IN','MM','BD','NP','BT','OM','YE','QA','KW','BH','CD','CG','DZ'];

  function redirect() {
    window.location.replace(REDIRECT_URL);
  }

  // Уже проверяли в этой вкладке — не бьём лишний раз по API на каждой странице.
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached === 'blocked') { redirect(); return; }
  if (cached === 'ok') return;

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
      // Обе проверки не удались — не блокируем по умолчанию (fail-open),
      // чтобы сбой стороннего API не клал доступ на весь сайт.
      return;
    }
  }

  if (country && blockedCountries.includes(country)) {
    sessionStorage.setItem(CACHE_KEY, 'blocked');
    redirect();
  } else {
    sessionStorage.setItem(CACHE_KEY, 'ok');
  }
})();
