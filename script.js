/* ============ INTEGRATE CODE SNIPPETS (index.html, docs pages) ============ */
const snippets = {
  node: `<span class="tok-kw">import</span> { Flowgram } <span class="tok-kw">from</span> <span class="tok-str">'flowgram'</span>;

<span class="tok-kw">const</span> <span class="tok-var">flowgram</span> = <span class="tok-fn">new Flowgram</span>(<span class="tok-str">'fg_xxxxxxxxx'</span>);

(<span class="tok-kw">async</span> <span class="tok-kw">function</span>() {
  <span class="tok-kw">const</span> { data, error } = <span class="tok-kw">await</span> flowgram.messages.<span class="tok-fn">send</span>({
    bot_id: <span class="tok-str">'847291'</span>,
    chat_id: <span class="tok-str">'193004521'</span>,
    text: <span class="tok-str">'Заказ №1042 передан курьеру 🚚'</span>
  });

  <span class="tok-kw">if</span> (error) <span class="tok-kw">return</span> console.<span class="tok-fn">log</span>(error);
  console.<span class="tok-fn">log</span>(data);
})();`,
  python: `<span class="tok-kw">import</span> flowgram

flowgram.<span class="tok-var">api_key</span> = <span class="tok-str">"fg_xxxxxxxxx"</span>

<span class="tok-var">r</span> = flowgram.Messages.<span class="tok-fn">send</span>({
  <span class="tok-str">"bot_id"</span>: <span class="tok-str">"847291"</span>,
  <span class="tok-str">"chat_id"</span>: <span class="tok-str">"193004521"</span>,
  <span class="tok-str">"text"</span>: <span class="tok-str">"Заказ №1042 передан курьеру 🚚"</span>
})

<span class="tok-fn">print</span>(r)`,
  ruby: `<span class="tok-var">flowgram</span> = Flowgram::Client.<span class="tok-fn">new</span>(<span class="tok-str">"fg_xxxxxxxxx"</span>)

<span class="tok-var">params</span> = {
  <span class="tok-var">bot_id:</span> <span class="tok-str">"847291"</span>,
  <span class="tok-var">chat_id:</span> <span class="tok-str">"193004521"</span>,
  <span class="tok-var">text:</span> <span class="tok-str">"Заказ №1042 передан курьеру 🚚"</span>
}

<span class="tok-var">flowgram</span>.messages.<span class="tok-fn">send</span>(params)`,
  php: `<span class="tok-var">$flowgram</span> = <span class="tok-kw">new</span> Flowgram\\Client(<span class="tok-str">'fg_xxxxxxxxx'</span>);

<span class="tok-var">$flowgram</span>-&gt;messages-&gt;<span class="tok-fn">send</span>([
  <span class="tok-str">'bot_id'</span> =&gt; <span class="tok-str">'847291'</span>,
  <span class="tok-str">'chat_id'</span> =&gt; <span class="tok-str">'193004521'</span>,
  <span class="tok-str">'text'</span> =&gt; <span class="tok-str">'Заказ №1042 передан курьеру 🚚'</span>
]);`,
  go: `<span class="tok-var">client</span> := flowgram.<span class="tok-fn">NewClient</span>(<span class="tok-str">"fg_xxxxxxxxx"</span>)

<span class="tok-var">_</span>, <span class="tok-var">err</span> := client.Messages.<span class="tok-fn">Send</span>(&amp;flowgram.SendMessageRequest{
  BotID:  <span class="tok-str">"847291"</span>,
  ChatID: <span class="tok-str">"193004521"</span>,
  Text:   <span class="tok-str">"Заказ №1042 передан курьеру 🚚"</span>,
})`,
  rust: `<span class="tok-kw">let</span> <span class="tok-var">flowgram</span> = Flowgram::<span class="tok-fn">new</span>(<span class="tok-str">"fg_xxxxxxxxx"</span>);

<span class="tok-var">flowgram</span>.messages().<span class="tok-fn">send</span>(SendMessage {
    bot_id: <span class="tok-str">"847291"</span>.<span class="tok-fn">into</span>(),
    chat_id: <span class="tok-str">"193004521"</span>.<span class="tok-fn">into</span>(),
    text: <span class="tok-str">"Заказ №1042 передан курьеру 🚚"</span>.<span class="tok-fn">into</span>(),
}).<span class="tok-fn">await</span>?;`,
  java: `<span class="tok-var">Flowgram</span> flowgram = <span class="tok-kw">new</span> Flowgram(<span class="tok-str">"fg_xxxxxxxxx"</span>);

SendMessageOptions params = SendMessageOptions.<span class="tok-fn">builder</span>()
    .botId(<span class="tok-str">"847291"</span>)
    .chatId(<span class="tok-str">"193004521"</span>)
    .text(<span class="tok-str">"Заказ №1042 передан курьеру 🚚"</span>)
    .build();

flowgram.messages().<span class="tok-fn">send</span>(params);`,
  dotnet: `<span class="tok-kw">var</span> <span class="tok-var">flowgram</span> = <span class="tok-kw">new</span> FlowgramClient(<span class="tok-str">"fg_xxxxxxxxx"</span>);

<span class="tok-kw">await</span> flowgram.Messages.<span class="tok-fn">SendAsync</span>(<span class="tok-kw">new</span> SendMessageOptions
{
    BotId = <span class="tok-str">"847291"</span>,
    ChatId = <span class="tok-str">"193004521"</span>,
    Text = <span class="tok-str">"Заказ №1042 передан курьеру 🚚"</span>
});`,
  rest: `<span class="tok-fn">curl</span> -X POST <span class="tok-str">'https://api.flowgram.dev/messages'</span> \\
  -H <span class="tok-str">'Authorization: Bearer fg_xxxxxxxxx'</span> \\
  -H <span class="tok-str">'Content-Type: application/json'</span> \\
  -d <span class="tok-str">'{
    "bot_id": "847291",
    "chat_id": "193004521",
    "text": "Заказ №1042 передан курьеру 🚚"
  }'</span>`,
  smtp: `<span class="tok-com"># Регистрация вебхука на события бота</span>
<span class="tok-fn">curl</span> -X POST <span class="tok-str">'https://api.flowgram.dev/bots/847291/webhook'</span> \\
  -H <span class="tok-str">'Authorization: Bearer fg_xxxxxxxxx'</span> \\
  -d <span class="tok-str">'{
    "url": "https://ваш-сервер.ру/hooks/flowgram",
    "events": ["message.received", "button.clicked", "payment.completed"]
  }'</span>`
};

function initCodeTabs(){
  const codeBody = document.getElementById('codeBody');
  const langTabs = document.getElementById('langTabs');
  if (!codeBody || !langTabs) return;
  function setLang(lang){
    codeBody.innerHTML = snippets[lang] || snippets.node;
  }
  langTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.lang-tab');
    if(!tab) return;
    langTabs.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    setLang(tab.dataset.lang);
  });
  setLang('node');
}

/* ============ CUSTOM CODE NODE TABS (index.html, static preview only) ============ */
function initStaticCodeTabs(){
  document.querySelectorAll('.code-shell').forEach(shell => {
    const tabs = shell.querySelector('.lang-tabs');
    if (!tabs || tabs.id === 'langTabs') return; // skip the interactive Integrate block, handled above
    tabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.lang-tab');
      if (!tab) return;
      tabs.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // static demo: no real content swap needed beyond active state, code stays as-is
    });
  });
}

/* ============ MOCK BAR CHARTS ============ */
function initBars(){
  const bars2 = document.getElementById('mockBars2');
  if (bars2 && !bars2.children.length) {
    for (let i = 0; i < 16; i++) {
      const bar = document.createElement('i');
      bar.style.height = (20 + Math.random() * 80) + '%';
      bars2.appendChild(bar);
    }
  }
  const bars = document.getElementById('mockBars');
  if (bars && !bars.children.length) {
    for (let i = 0; i < 24; i++) {
      const bar = document.createElement('i');
      bar.style.height = (20 + Math.random() * 80) + '%';
      bars.appendChild(bar);
    }
  }
}

/* ============ ANIMATED LOG ROWS ============ */
function initLog(){
  const logList = document.getElementById('logList');
  if (!logList || logList.children.length) return;
  const logEvents = [
    {label:'выполнено', to:'/start → Приветствие'},
    {label:'выполнено', to:'Приветствие → Кнопки'},
    {label:'нажато', to:'Каталог'},
    {label:'выполнено', to:'Каталог → Товары бота'},
    {label:'отправлено', to:'chat_id 193004521'},
  ];
  logEvents.forEach((ev, i) => {
    const row = document.createElement('div');
    row.className = 'log-row';
    row.style.animationDelay = (i * 0.12) + 's';
    row.innerHTML = `<span class="status">${ev.label}</span><span>${ev.to}</span><span>только что</span>`;
    logList.appendChild(row);
  });
}

/* ============ TESTIMONIAL MARQUEE ============ */
function initMarquee(){
  const track = document.getElementById('marqueeTrack');
  if (!track || track.children.length) return;
  const testimonials = [
    ['«Команда обожает Flowgram. Собрать бота стало просто и надёжно — после переезда на выделенных воркеров скорость ответа заметно выросла.»','Влад Матиков','Основатель, Infracell'],
    ['«Как разработчику мне нравится подход команды Flowgram. Очень освежающе — и HTTP-нода реально закрывает всё, чего не хватает в конструкторе.»','Ханби Ли','Технический директор, Mintware'],
    ['«Мы ценим инструменты, которые ощущаются стабильными и продуманными. Flowgram — именно такой.»','Брэдли Гринвуд','Руководитель отдела автоматизации, Beastcorp'],
    ['«Партнёрство с Flowgram — отличный опыт. Мы можем сосредоточиться на сценариях для клиентов, а не на инфраструктуре ботов.»','Сахил Лавингиа','Основатель школы Kaira'],
    ['«Переход на Flowgram стал заметным улучшением. Начали с бота для записи клиентов — и за 30 минут всё уже работало.»','Томас Манн','Владелец сети барбершопов Racecase'],
    ['«Простота и надёжность Flowgram позволили нам заниматься сценариями, а не серверами и вебхуками.»','Амадео Пелличе','SMM-менеджер, Replika'],
  ];
  const build = () => testimonials.map(([q,name,role]) => `
    <div class="t-card">
      <p>${q}</p>
      <div class="t-who">
        <div class="avatar"></div>
        <div><div class="name">${name}</div><div class="role">${role}</div></div>
      </div>
    </div>`).join('');
  track.innerHTML = build() + build();
}

/* ============ PRICING PAGE ============ */
function setBilling(mode) {
  const m = document.getElementById('btn-month');
  const y = document.getElementById('btn-year');
  if (!m || !y) return;
  m.classList.toggle('active', mode==='month');
  y.classList.toggle('active', mode==='year');
  document.querySelectorAll('.price-num[data-month]').forEach(el => {
    const val = mode==='year' ? el.dataset.year : el.dataset.month;
    const per = mode==='year' ? ' /мес при годовой' : ' /мес';
    el.innerHTML = new Intl.NumberFormat('ru-RU').format(val) + ' ₽<span class="per">' + per + '</span>';
  });
}
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ============ TEMPLATES PAGE ============ */
function filterTpl(cat, btn) {
  document.querySelectorAll('.tpl-filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tpl-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}

/* ============ LOGIN / SIGNUP PAGE ============ */
function setMode(mode) {
  const tabs = document.getElementById('authTabs');
  if (!tabs) return;
  const isSignup = mode === 'signup';
  tabs.classList.toggle('mode-signup', isSignup);
  document.getElementById('tab-login').classList.toggle('active', !isSignup);
  document.getElementById('tab-signup').classList.toggle('active', isSignup);

  const title = document.getElementById('auth-title');
  const sub = document.getElementById('auth-sub');
  title.style.opacity = 0;
  sub.style.opacity = 0;
  setTimeout(() => {
    title.textContent = isSignup ? 'Создайте аккаунт' : 'С возвращением';
    sub.textContent = isSignup ? 'Соберите первого бота за пару минут' : 'Войдите, чтобы продолжить работу над ботами';
    title.style.opacity = 1;
    sub.style.opacity = 1;
  }, 150);

  document.getElementById('field-name').classList.toggle('collapsed', !isSignup);
  document.getElementById('submit-label').textContent = isSignup ? 'Создать аккаунт' : 'Получить код на почту';
  document.getElementById('auth-foot').innerHTML = isSignup
    ? 'Уже есть аккаунт? <a href="#" onclick="setMode(&#39;login&#39;);return false;">Войти</a>'
    : 'Ещё нет аккаунта? <a href="#" onclick="setMode(&#39;signup&#39;);return false;">Зарегистрироваться</a>';
}
function submitAuth(btn) {
  if (btn.classList.contains('loading')) return;
  btn.classList.add('loading');
  setTimeout(() => btn.classList.remove('loading'), 1400);
}
function initAuthFromUrl(){
  if (document.getElementById('authTabs') && new URLSearchParams(location.search).get('mode') === 'signup') {
    setMode('signup');
  }
}

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
function closeNavOnLinkClick(){
  const links = document.getElementById('navLinks');
  if (!links) return;
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (links.classList.contains('open')) toggleNavMenu();
  }));
}

/* ============ DOCS SIDEBAR (docs-*.html) ============ */
function toggleDocsMenu() {
  const el = document.getElementById('docsSidebar');
  if (el) el.classList.toggle('open');
}
function markActiveDocsLink(){
  if (typeof CURRENT_PAGE === 'undefined') return;
  document.querySelectorAll('.docs-sidebar a[data-page]').forEach(a => {
    if (a.dataset.page === CURRENT_PAGE) a.classList.add('active');
  });
}

/* ============ INIT — run everything now that nav/footer/content are all in the DOM ============ */
initCodeTabs();
initStaticCodeTabs();
initBars();
initLog();
initMarquee();
closeNavOnLinkClick();
markActiveDocsLink();
initAuthFromUrl();
renderCookieBanner();
