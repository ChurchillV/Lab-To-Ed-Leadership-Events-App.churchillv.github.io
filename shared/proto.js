/* Shared prototype helpers used by every alternative.
   No framework: each screen file sets <body data-screen="..."> and the
   alternative's app.js supplies a template for that screen. */
(function () {
  const q = Object.fromEntries(new URLSearchParams(location.search));

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const gbp = (p) => '£' + (p / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (p) => (p === 0 ? 'Free' : gbp(p));
  const moneyAlways = gbp;

  /* Build a link, carrying guest mode through the flow unless told otherwise. */
  function u(href, params = {}) {
    const [path, existing] = href.split('?');
    const sp = new URLSearchParams(existing || '');
    if (q.guest && !('guest' in params)) sp.set('guest', '1');
    Object.entries(params).forEach(([k, v]) => {
      if (v === null || v === undefined || v === false || v === '') sp.delete(k);
      else sp.set(k, v);
    });
    const s = sp.toString();
    return esc(path + (s ? '?' + s : ''));
  }

  function go(href) { location.href = href.replace(/&amp;/g, '&'); }

  /* ---------- Icons (stroke icons, 24px grid) ---------- */
  const paths = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h5v-6h4v6h5V9.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13L21 13v6H3v-6Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4Z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5Z"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.2 10.8 6.6-3.6M8.2 13.2l6.6 3.6"/>',
    back: '<path d="M15 5 8 12l7 7"/>',
    next: '<path d="m9 5 7 7-7 7"/>',
    arrowUR: '<path d="M7 17 17 7M9 7h8v8"/>',
    arrowR: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.8 3 2.6 3.5 5.2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M4 20h16"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4Z"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 8l-4 4 4 4M6 12h10"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6Z"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>',
    transfer: '<path d="M4 8h14l-4-4M20 16H6l4 4"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z"/>',
    map: '<path d="m9 4-6 2.5v13L9 17l6 2.5 6-2.5V4l-6 2.5Z"/><path d="M9 4v13M15 6.5v13"/>',
    file: '<path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/>',
    megaphone: '<path d="M3 10v4l3 .5L7.5 20h3L9.5 15l9.5 3V6L6 9.5Z"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    wallet: '<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1Z"/><path d="M4 7V6a2 2 0 0 1 2-2h10v3M16 13.5h.01"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8Z"/><circle cx="7.5" cy="8" r="1.5"/>',
    eye: '<path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"/><circle cx="12" cy="12" r="3"/>',
    flash: '<path d="M13 3 5 13h6l-1 8 8-10h-6Z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z"/>',
    apple: '<path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8C6.9 7.3 5 8.7 5 11.8c0 1.9.7 3.9 1.6 5.2.8 1.1 1.5 2 2.5 2s1.4-.7 2.7-.7 1.6.7 2.7.7 1.8-1 2.5-2a8 8 0 0 0 1.1-2.4s-2.2-.8-2.2-3.4Z" fill="currentColor" stroke="none"/><path d="M14.2 5.6c.6-.7 1-1.7.9-2.6-.8 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5.9.1 1.9-.5 2.5-1.2Z" fill="currentColor" stroke="none"/>',
    google: '<path d="M20.5 12.2c0-.6-.1-1.2-.2-1.7H12v3.3h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.6-3.9 2.6-6.5Z" fill="#4285F4" stroke="none"/><path d="M12 21c2.4 0 4.4-.8 5.9-2.2L15 16.5c-.8.5-1.8.9-3 .9-2.3 0-4.3-1.6-5-3.7H4v2.3A9 9 0 0 0 12 21Z" fill="#34A853" stroke="none"/><path d="M7 13.7a5.4 5.4 0 0 1 0-3.4V8H4a9 9 0 0 0 0 8Z" fill="#FBBC05" stroke="none"/><path d="M12 6.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 4 8l3 2.3c.7-2.1 2.7-3.7 5-3.7Z" fill="#EA4335" stroke="none"/>',
  };
  function icon(name, size = 22, extra = '') {
    return `<svg class="ic ic-${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extra}>${paths[name] || ''}</svg>`;
  }

  /* ---------- Mock QR code (deterministic pattern, not a real code) ---------- */
  function qr(token, label) {
    let h = 2166136261;
    for (const c of token) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
    const n = 25, cell = 8, size = n * cell;
    const rnd = () => { h ^= h << 13; h >>>= 0; h ^= h >>> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
    const finder = (x, y) => x < 8 && y < 8 || x >= n - 8 && y < 8 || x < 8 && y >= n - 8;
    let rects = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue;
      if (rnd() > 0.52) rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`;
    }
    const f = (x, y) => `<rect x="${x * cell}" y="${y * cell}" width="${7 * cell}" height="${7 * cell}" rx="${cell}"/><rect x="${(x + 1) * cell}" y="${(y + 1) * cell}" width="${5 * cell}" height="${5 * cell}" rx="${cell / 2}" fill="#fff"/><rect x="${(x + 2) * cell}" y="${(y + 2) * cell}" width="${3 * cell}" height="${3 * cell}" rx="${cell / 2}"/>`;
    return `<svg class="qr" viewBox="-8 -8 ${size + 16} ${size + 16}" role="img" aria-label="${esc(label || 'Ticket QR code')}" fill="currentColor"><rect x="-8" y="-8" width="${size + 16}" height="${size + 16}" fill="#fff"/>${rects}${f(0, 0)}${f(n - 7, 0)}${f(0, n - 7)}</svg>`;
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    let t = document.getElementById('proto-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'proto-toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- Sheets ---------- */
  function openSheet(id) {
    const s = document.getElementById(id);
    if (!s) return;
    s.hidden = false;
    requestAnimationFrame(() => s.classList.add('open'));
    const f = s.querySelector('button, a, input, select, textarea');
    if (f) setTimeout(() => f.focus({ preventScroll: true }), 50);
    document.documentElement.classList.add('sheet-open');
  }
  function closeSheet(s) {
    if (!s) return;
    s.classList.remove('open');
    setTimeout(() => { s.hidden = true; }, 220);
    document.documentElement.classList.remove('sheet-open');
  }

  /* ---------- Loading screen with the logo ---------- */
  const LOGO_FULL = (document.currentScript && document.currentScript.src.replace(/proto\.js.*$/, 'img/logo-dark.png')) || '../shared/img/logo-dark.png';
  (function injectLoaderCss() {
    const st = document.createElement('style');
    st.textContent = `
    .logo-loader { width: min(72vw, 260px); margin: 0 auto; display: grid; gap: 18px; justify-items: stretch; }
    .logo-loader img { width: 100%; height: auto; display: block; }
    .logo-loader .bar { position: relative; height: 5px; border-radius: 999px; background: rgba(28, 44, 113, .12); overflow: hidden; }
    .logo-loader .bar span { position: absolute; top: 0; bottom: 0; width: 45%; border-radius: 999px; background: linear-gradient(90deg, #1c2c71, #2570b6, #69c1db, #1ea025, #cfdd67, #f8de6d, #f78a47, #dd492f); animation: l2e-slide 1.3s ease-in-out infinite; }
    .logo-loader.card { background: #fff; border-radius: 28px; padding: 24px 24px 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, .18); width: min(80vw, 300px); }
    .loading-screen { position: fixed; inset: 0; z-index: 500; display: grid; place-content: center; gap: 18px; text-align: center; padding: 24px; background: rgba(255, 255, 255, .985); color: #141a33; font: 600 16px/1.4 inherit; opacity: 0; transition: opacity .15s; }
    .loading-screen.show { opacity: 1; }
    .loading-screen p { margin: 0; }
    .loading-screen small { display: block; font-weight: 500; color: #5d6276; font-size: 13px; margin-top: 4px; }
    @keyframes l2e-slide { 0% { left: -45%; } 100% { left: 100%; } }
    
    @media (prefers-reduced-motion: reduce) { .logo-loader .bar span, .logo-loader img { animation: none; } .logo-loader .bar span { left: 0; width: 100%; } }`;
    document.head.appendChild(st);
  })();
  const loaderHtml = (cls = '') => `<div class="logo-loader ${cls}" role="progressbar" aria-label="Loading"><img src="${LOGO_FULL}" alt="Lab to Ed Leadership"><span class="bar" aria-hidden="true"><span></span></span></div>`;
  function loading(msg, sub, href, ms = 1100) {
    const el = document.createElement('div');
    el.className = 'loading-screen';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.innerHTML = loaderHtml() + `<p>${esc(msg)}${sub ? `<small>${esc(sub)}</small>` : ''}</p>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    if (href) setTimeout(() => go(href), ms);
  }

  /* ---------- Countdown ---------- */
  function timer(sel, seconds) {
    const els = document.querySelectorAll(sel);
    if (!els.length) return;
    let left = seconds;
    const draw = () => els.forEach((el) => { el.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0'); });
    draw();
    const id = setInterval(() => { left = Math.max(0, left - 1); draw(); if (!left) clearInterval(id); }, 1000);
  }

  /* ---------- CSV download ---------- */
  function csv(filename, rows) {
    const text = rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }));
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- Generic behaviours driven by data attributes ---------- */
  function applyFilters(scope) {
    const root = scope || document;
    const groups = root.querySelectorAll('[data-filter-group]');
    const items = document.querySelectorAll('[data-filter-item]');
    const active = {};
    groups.forEach((g) => {
      const on = g.querySelector('[aria-pressed="true"]');
      active[g.dataset.filterGroup] = on ? on.dataset.filter : 'all';
    });
    const search = document.querySelector('[data-search]');
    const term = search ? search.value.trim().toLowerCase() : '';
    let shown = 0;
    items.forEach((it) => {
      const tags = (it.dataset.tags || '').split('|');
      const okFilters = Object.values(active).every((v) => v === 'all' || tags.includes(v));
      const okSearch = !term || it.textContent.toLowerCase().includes(term);
      const ok = okFilters && okSearch;
      it.hidden = !ok;
      if (ok) shown++;
    });
    document.querySelectorAll('[data-empty]').forEach((e) => { e.hidden = shown > 0; });
    document.querySelectorAll('[data-count]').forEach((e) => { e.textContent = shown; });
    // hide group headings whose items are all hidden
    document.querySelectorAll('[data-filter-section]').forEach((sec) => {
      sec.hidden = !sec.querySelector('[data-filter-item]:not([hidden])');
    });
  }

  function bind() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-toast],[data-open],[data-close],[data-filter],[data-seg],[data-step],[data-select],[data-go],[data-toggle]');
      if (!t) {
        const sheet = e.target.classList && e.target.classList.contains('sheet') ? e.target : null;
        if (sheet) closeSheet(sheet);
        return;
      }
      if (t.dataset.filter !== undefined) {
        const g = t.closest('[data-filter-group]');
        g.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', b === t ? 'true' : 'false'));
        applyFilters();
      }
      if (t.dataset.seg !== undefined) {
        const g = t.closest('[data-seg-group]');
        g.querySelectorAll('[data-seg]').forEach((b) => b.setAttribute('aria-selected', b === t ? 'true' : 'false'));
        document.querySelectorAll(`[data-panel-group="${g.dataset.segGroup}"]`).forEach((p) => { p.hidden = p.dataset.panel !== t.dataset.seg; });
      }
      if (t.dataset.select !== undefined) {
        const g = t.closest('[data-select-group]');
        g.querySelectorAll('[data-select]').forEach((b) => { b.setAttribute('aria-checked', b === t ? 'true' : 'false'); b.classList.toggle('selected', b === t); });
        g.dispatchEvent(new CustomEvent('select', { detail: t.dataset.select, bubbles: true }));
      }
      if (t.dataset.toggle !== undefined) {
        const on = t.getAttribute('aria-pressed') !== 'true';
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
        t.dispatchEvent(new CustomEvent('toggled', { detail: on, bubbles: true }));
      }
      if (t.dataset.step !== undefined) {
        const box = t.closest('[data-stepper]');
        const input = box.querySelector('input');
        const min = +input.min || 0, max = +input.max || 99, step = +(input.step || 1);
        input.value = Math.min(max, Math.max(min, (+input.value || 0) + (+t.dataset.step) * step));
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (t.dataset.open) { e.preventDefault(); openSheet(t.dataset.open); }
      if (t.dataset.close !== undefined) { e.preventDefault(); closeSheet(t.closest('.sheet')); }
      if (t.dataset.toast) { if (t.tagName === 'A' && !t.getAttribute('href')) e.preventDefault(); toast(t.dataset.toast); }
      if (t.dataset.go) { e.preventDefault(); setTimeout(() => go(t.dataset.go), t.dataset.toast ? 700 : 0); }
    });

    document.addEventListener('input', (e) => { if (e.target.matches('[data-search]')) applyFilters(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') document.querySelectorAll('.sheet.open').forEach(closeSheet);
    });

    // Forms simply move on to the next screen (no backend)
    document.addEventListener('submit', (e) => {
      const f = e.target;
      if (!f.dataset.next) return;
      e.preventDefault();
      if (f.dataset.loading) { loading(f.dataset.loading, f.dataset.loadingSub, f.dataset.next); return; }
      if (f.dataset.toast) toast(f.dataset.toast);
      setTimeout(() => go(f.dataset.next), f.dataset.toast ? 700 : 0);
    });

    // Carousels with dots
    document.querySelectorAll('[data-carousel]').forEach((c) => {
      const dots = document.querySelectorAll(`[data-dots="${c.dataset.carousel}"] [data-dot]`);
      const update = () => {
        const i = Math.round(c.scrollLeft / c.clientWidth);
        dots.forEach((d, j) => d.setAttribute('aria-current', i === j ? 'true' : 'false'));
        c.dispatchEvent(new CustomEvent('slide', { detail: i }));
      };
      c.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
      dots.forEach((d, j) => d.addEventListener('click', () => c.scrollTo({ left: j * c.clientWidth, behavior: 'smooth' })));
      update();
    });

    // OTP inputs: auto-advance
    document.querySelectorAll('[data-otp] input').forEach((inp, i, all) => {
      inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 1); if (inp.value && all[i + 1]) all[i + 1].focus(); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Backspace' && !inp.value && all[i - 1]) all[i - 1].focus(); });
    });

    applyFilters();
  }

  /* ---------- Mount ---------- */
  function mount(screens, after) {
    const name = document.body.dataset.screen;
    const app = document.getElementById('app');
    const fn = screens[name];
    app.innerHTML = fn ? fn() : `<main class="pad"><h1>Screen not found</h1><p>${esc(name)}</p></main>`;
    bind();
    if (after && after[name]) after[name]();
    if (q.toast) toast(q.toast);
  }

  window.P = { loading, loaderHtml, q, esc, money, moneyAlways, u, go, icon, qr, toast, openSheet, closeSheet, timer, csv, mount, applyFilters };
})();
