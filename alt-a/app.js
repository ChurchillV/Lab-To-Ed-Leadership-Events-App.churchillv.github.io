/* Alternative A – Ref1 · member and guest screens.
   Admin screens are in admin.js, which also mounts the current screen. */
(function () {
  const D = window.L2E, I = P.icon, u = P.u, e = P.esc, m = P.money, q = P.q;
  const guest = !!q.guest;
  const AV = ['', 'alt1', 'alt2', 'alt3', 'alt4'];
  const avClass = (s) => AV[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length];

  /* ---------- Shared building blocks ---------- */
  const H = {
    header(title, back, right = '<span class="spacer"></span>') {
      return `<header class="header">${back ? `<a class="iconbtn" href="${back}" aria-label="Back">${I('back')}</a>` : '<span class="spacer"></span>'}<h1>${title}</h1>${right}</header>`;
    },
    nav(active) {
      if (guest) {
        const items = [['home', 'home.html', 'Home'], ['search', 'events.html', 'Events'], ['user', 'sign-up.html', 'Join free'], ['lock', 'log-in.html', 'Log in']];
        return `<nav class="tabbar" aria-label="Main">${items.map(([ic, href, l]) => `<a href="${u(href, ic === 'user' || ic === 'lock' ? { guest: null } : {})}" ${active === ic ? 'aria-current="page"' : ''}>${I(ic, 22)}<span class="lbl">${l}</span></a>`).join('')}</nav>`;
      }
      const items = [['home', 'home.html', 'Home'], ['search', 'events.html', 'Events'], ['ticket', 'tickets.html', 'My Tickets'], ['inbox', 'inbox.html', 'Inbox', true], ['user', 'profile.html', 'Profile']];
      return `<nav class="tabbar" aria-label="Main">${items.map(([ic, href, l, pip]) => `<a href="${href}" ${active === ic ? 'aria-current="page"' : ''}>${I(ic, 22)}<span class="lbl">${l}</span>${pip && active !== ic ? '<span class="pip" aria-hidden="true"></span>' : ''}</a>`).join('')}</nav>`;
    },
    sheet(id, title, body, extraClass = '') {
      return `<div class="sheet ${extraClass}" id="${id}" hidden role="dialog" aria-modal="true" aria-labelledby="${id}-t"><div class="panel"><div class="grabber" aria-hidden="true"></div><div class="row between"><h2 id="${id}-t">${title}</h2><button class="iconbtn" data-close aria-label="Close">${I('x', 20)}</button></div><div class="stack" style="margin-top:12px">${body}</div></div></div>`;
    },
    avatar(name, initials, cls = '') {
      return `<span class="avatar ${cls} ${avClass(name)}" role="img" aria-label="${e(name)}">${e(initials)}</span>`;
    },
    unit(ev) { return guest ? ev.price : D.memberPrice(ev.price); },
    priceLine(ev) {
      if (!ev.price) return '<span class="price-tag">Free</span>';
      return guest ? `<span class="price-tag">${m(ev.price)}</span>` : `<span class="price-tag">${m(D.memberPrice(ev.price))}</span> <s class="muted tiny">${m(ev.price)}</s>`;
    },
    mini(ev) {
      return `<a class="mini" href="${u('event-detail.html', { id: ev.id })}"><span class="go" aria-hidden="true">${I('arrowUR', 18)}</span><h3>${e(ev.short)}</h3><p class="sub">${e(ev.category)}</p><div class="meta"><span class="${ev.format === 'Online' ? 'live dark' : ''}">${ev.format === 'Online' ? 'Online' : I('pin', 14) + e(ev.venueShort.split(',').pop().trim())}</span><span>${I('calendar', 14)}${e(ev.dateShort)}</span><span>${I('clock', 14)}${e(ev.time)}</span><span>${I('tag', 14)}${ev.left === 0 ? '<span class="badge red">Sold out</span>' : H.priceLine(ev)}</span></div></a>`;
    },
    row(ev) {
      const tags = [ev.category, ev.price ? 'paid' : 'free', ev.format === 'Online' ? 'online' : 'inperson', ev.mon].join('|');
      return `<a class="ev" href="${u('event-detail.html', { id: ev.id })}" data-filter-item data-tags="${tags}"><span class="thumb"><img src="${ev.image}" alt="${e(ev.imageAlt)}"><span class="d">${ev.day}<small>${ev.mon}</small></span></span><span class="info"><span class="row between"><span class="badge rust">${e(ev.category)}</span>${ev.left === 0 ? '<span class="badge red">Sold out</span>' : ev.left < 25 ? `<span class="badge amber">${ev.left} left</span>` : ''}</span><h3>${e(ev.title)}</h3><span class="meta">${I(ev.format === 'Online' ? 'globe' : 'pin', 14)}<span class="ellipsis">${e(ev.venueShort)}</span></span><span class="meta">${I('clock', 14)}${e(ev.weekday)} ${ev.day} ${ev.mon} · ${e(ev.time.split('–')[0])}</span><span class="foot">${H.priceLine(ev)}</span></span></a>`;
    },
    ticketCard(t, ev, extra = {}) {
      const cls = t.status === 'used' ? 'used' : t.status === 'transferred' ? 'void' : '';
      const label = t.status === 'used' ? '<span class="badge">Used</span>' : t.status === 'transferred' ? '<span class="badge">Transferred</span>' : extra.isNew ? '<span class="badge green">New</span>' : '<span class="badge green">Valid</span>';
      return `<a class="tk" href="${extra.href || u('ticket-detail.html', { id: t.id })}"><div class="top ${cls}"><span class="d">${ev.day}<small>${ev.mon}</small></span><div class="grow"><h3>${e(ev.title)}</h3><p class="small" style="opacity:.9">${e(ev.time)} · ${e(ev.venueShort)}</p></div></div><div class="perf" aria-hidden="true"></div><div class="bottom"><span><span class="muted">Ticket</span> <b>${e(t.id)}</b> · ${e(t.type)}</span>${label}</div></a>`;
    },
    joinBanner(ev) {
      return `<section class="join-card stack"><h3>Join free and save 25%</h3><p class="small" style="opacity:.95">Membership is free and open to everyone. Members pay ${ev ? m(D.memberPrice(ev.price)) + ' instead of ' + m(ev.price) + ' for ' + e(ev.short) : '25% less for every paid event'}.</p><a class="btn sm" href="sign-up.html">Join free</a></section>`;
    },
  };
  window.A = H;

  const S = {};

  /* 1 Splash */
  S.splash = () => `<main class="splash">${P.loaderHtml('card')}<p style="font-size:17px;font-weight:600">Events, tickets and news for our community</p><p class="small" style="opacity:.9">Checking your login…</p><div class="stack" style="width:100%;max-width:320px"><a class="btn block light" href="onboarding.html">First time here? Continue</a><a class="btn block ghost" style="color:#fff" href="home.html">Returning member: go to Home</a></div></main>`;

  /* 2 Onboarding carousel */
  S.onboarding = () => {
    const slides = [
      ['event-summit.svg', 'Find events that move you forward', 'Conferences, webinars and mentoring circles for science leaders, all in one place.', `${I('calendar', 18)}<span><b>Winter Summit</b><br><span class="muted">Sat 5 Dec · Manchester</span></span>`],
      ['event-webinar.svg', 'Book in two minutes, keep your ticket', 'Pay by card, Apple Pay or Google Pay. Your QR ticket lives in the app and works offline.', `${I('ticket', 18)}<span><b>Ticket ready</b><br><span class="muted">Show the QR code at the door</span></span>`],
      ['event-mentoring.svg', 'Stay close to the community', 'News and updates from the Lab to Ed Leadership team arrive straight to your Inbox.', `${I('inbox', 18)}<span><b>New announcement</b><br><span class="muted">Programme now live</span></span>`],
    ];
    return `<main class="screen" style="padding-left:0;padding-right:0"><div class="row between pad"><img class="logo-inline" src="../shared/img/logo-dark.png" alt="Lab to Ed Leadership" style="height:34px"><a class="link" href="welcome.html">Skip</a></div>
    <div class="onb" data-carousel="onb" id="onb" aria-roledescription="carousel" aria-label="Introduction">${slides.map(([img, t, d, f], i) => `<section aria-roledescription="slide" aria-label="${i + 1} of 3"><div class="art"><img src="../shared/img/${img}" alt=""><div class="float">${f}</div></div><h1>${t}</h1><p class="muted">${d}</p></section>`).join('')}</div>
    <div class="pad stack"><div class="dots" data-dots="onb">${slides.map((_, i) => `<button data-dot aria-label="Slide ${i + 1}"></button>`).join('')}</div><button class="btn block" id="onb-next">Next</button></div></main>`;
  };

  /* 3 Welcome */
  S.welcome = () => `<main class="screen stack-lg"><div class="welcome-art"><img src="../shared/img/event-summit.svg" alt="Illustration of a conference stage with a large audience"></div>
    <div class="stack"><img class="logo-inline" src="../shared/img/logo-dark.png" alt="Lab to Ed Leadership"><h1 style="font-size:28px">Lead science.<br>Grow together.</h1><p class="muted">Membership is free and open to everyone. Members get 25% off every paid event.</p></div>
    <div class="stack"><a class="btn block" href="sign-up.html">Join free</a><a class="btn block light" href="log-in.html">Log in</a><a class="btn block ghost" href="home.html?guest=1">Browse as a guest</a></div></main>`;

  /* 4 Sign up */
  S['sign-up'] = () => {
    const fromCheckout = q.from === 'checkout';
    const ev = fromCheckout ? D.event(q.id) : null;
    const next = fromCheckout ? u('verify-email.html', { from: 'checkout', id: q.id, qty: q.qty, guest: null }) : 'verify-email.html';
    const socialNext = fromCheckout ? u('checkout.html', { id: q.id, qty: q.qty, joined: 1, guest: null }) : 'profile-setup.html';
    return `<main class="screen">${H.header('Join free', fromCheckout ? u('checkout.html', { id: q.id, qty: q.qty, guest: 1 }) : 'welcome.html')}
    ${fromCheckout ? `<div class="notice rust" style="margin-bottom:16px">${I('tag', 20)}<span>Join now and pay <b>${m(D.memberPrice(ev.price) * (+q.qty || 1))}</b> instead of ${m(ev.price * (+q.qty || 1))}. You'll go straight back to checkout.</span></div>` : ''}
    <p class="muted" style="margin-bottom:16px">Free, open to everyone, no approval needed.</p>
    <div class="social"><a class="btn block dark" href="${socialNext}">${I('apple', 20)} Continue with Apple</a><a class="btn block light" href="${socialNext}">${I('google', 20)} Continue with Google</a></div>
    <div class="divider">or with email</div>
    <form class="stack" data-next="${next}" data-loading="Creating your account…" data-loading-sub="We'll email you a code"><div class="btn-row"><label class="field"><span>First name</span><input name="first" autocomplete="given-name" value="Amara" required></label><label class="field"><span>Last name</span><input name="last" autocomplete="family-name" value="Okafor" required></label></div>
    <label class="field"><span>Email</span><input type="email" autocomplete="email" value="${e(D.me.email)}" required></label>
    <label class="field"><span>Password</span><input type="password" autocomplete="new-password" value="correct-horse-42" minlength="8" required><span class="hint">At least 8 characters.</span></label>
    <label class="check"><input type="checkbox" checked required><span>I agree to the <a href="profile.html#policies">Terms of service</a> and <a href="profile.html#policies">Privacy policy</a>.</span></label>
    <label class="check"><input type="checkbox"><span>Email me news about upcoming events (optional).</span></label>
    <button class="btn block">Create my free account</button></form>
    <p class="center small" style="margin-top:12px">Already a member? <a href="log-in.html">Log in</a></p></main>`;
  };

  /* 5 Log in / Forgot password */
  S['log-in'] = () => `<main class="screen">${H.header('Log in', 'welcome.html')}
    <div class="stack-lg"><div><h1>Welcome back</h1><p class="muted">Log in to see your tickets and messages.</p></div>
    <div class="social"><a class="btn block dark" href="home.html">${I('apple', 20)} Continue with Apple</a><a class="btn block light" href="home.html">${I('google', 20)} Continue with Google</a></div></div>
    <div class="divider">or with email</div>
    <form class="stack" data-next="home.html" data-loading="Logging you in…" data-loading-sub="Getting your tickets and messages"><label class="field"><span>Email</span><input type="email" autocomplete="email" value="${e(D.me.email)}" required></label>
    <label class="field"><span>Password</span><input type="password" autocomplete="current-password" value="correct-horse-42" required></label>
    <div class="row between"><span></span><button type="button" class="link" data-open="forgot">Forgot password?</button></div>
    <button class="btn block">Log in</button></form>
    <div class="notice stack" style="margin-top:20px;display:block"><p class="row" style="align-items:flex-start">${I('shield', 20)}<span>Prototype: the Admin account opens on the Admin dashboard.</span></p><a class="btn block dark sm" href="admin-dashboard.html">Log in as Admin (Geetika)</a></div>
    <p class="center small" style="margin-top:16px">New here? <a href="sign-up.html">Join free</a></p>
    ${H.sheet('forgot', 'Reset your password', `<p class="muted">Enter your email and we'll send a 6-digit code.</p><label class="field"><span>Email</span><input type="email" value="${e(D.me.email)}"></label><button class="btn block" data-open="reset" data-close>Send reset code</button>`)}
    ${H.sheet('reset', 'Choose a new password', `<p class="muted">We sent a code to ${e(D.me.email)}.</p><label class="field"><span>Code</span><input inputmode="numeric" value="604 218"></label><label class="field"><span>New password</span><input type="password" value="new-password-2026"></label><button class="btn block" data-close data-toast="Password updated. You can now log in.">Update password</button>`)}
    </main>`;

  /* 6 Verify email */
  S['verify-email'] = () => {
    const next = q.from === 'checkout' ? u('checkout.html', { id: q.id, qty: q.qty, joined: 1, guest: null }) : 'profile-setup.html';
    return `<main class="screen">${H.header('Verify email', q.from === 'checkout' ? u('sign-up.html', { from: 'checkout', id: q.id, qty: q.qty }) : 'sign-up.html')}
    <div class="stack-lg center"><div class="ico-wrap" style="width:72px;height:72px;border-radius:24px;margin:8px auto 0">${I('mail', 32)}</div><div class="stack"><h1>Check your inbox</h1><p class="muted">We sent a 6-digit code to <b>${e(D.me.email)}</b>. It expires in 10 minutes.</p></div>
    <form class="stack-lg" data-next="${next}" data-loading="Checking your code…"><fieldset style="border:0;padding:0;margin:0"><legend class="sr-only">Verification code</legend><div class="otp" data-otp>${'482916'.split('').map((d, i) => `<input inputmode="numeric" maxlength="1" value="${d}" aria-label="Digit ${i + 1}" required>`).join('')}</div></fieldset>
    <button class="btn block">Verify and continue</button></form>
    <button class="link" data-toast="A new code is on its way.">Resend code</button></div></main>`;
  };

  /* 7 Profile setup */
  S['profile-setup'] = () => {
    const interests = ['Curriculum', 'Coaching', 'Workload', 'Inquiry', 'Assessment', 'Wellbeing', 'Careers', 'Research'];
    return `<main class="screen">${H.header('Set up your profile', 'verify-email.html')}
    <form class="stack-lg" data-next="home.html?toast=Welcome%20to%20Lab%20to%20Ed%20Leadership%2C%20Amara!"><div class="profile-head">${H.avatar(D.me.name, D.me.initials, 'lg')}<button type="button" class="btn sm light" data-toast="Photo added">${I('camera', 18)} Add a photo</button></div>
    <label class="field"><span>Phone (optional)</span><input type="tel" autocomplete="tel" value="${e(D.me.phone)}"></label>
    <label class="field"><span>School or institution</span><input value="${e(D.me.institution)}" required></label>
    <label class="field"><span>Your role</span><input value="${e(D.me.role)}"></label>
    <fieldset style="border:0;padding:0;margin:0"><legend class="strong" style="margin-bottom:10px">Interests</legend><div class="interest">${interests.map((t) => `<button type="button" class="chip" data-toggle aria-pressed="${D.me.interests.includes(t)}">${t}</button>`).join('')}</div></fieldset>
    <div class="card flat stack"><h3>Notifications</h3>${[['Push notifications', 'New events, announcements and messages', true], ['Event reminders', '1 day and 1 hour before', true], ['Email news', 'A monthly round-up', false]].map(([t, s, on]) => `<div class="row"><div class="grow"><p class="strong">${t}</p><p class="small muted">${s}</p></div><button type="button" class="switch" data-toggle aria-pressed="${on}" aria-label="${t}"></button></div>`).join('')}</div>
    <button class="btn block">Finish</button><a class="btn block ghost" href="home.html">Skip for now</a></form></main>`;
  };

  /* 8 Home */
  S.home = () => {
    const ev = D.events[0];
    const t = D.tickets[0];
    const cats = ['All', 'Free', 'Conference', 'Webinar', 'Workshop', 'Networking'];
    const hello = guest
      ? `<div class="row between"><div class="row"><img src="../shared/img/logo-dark.png" alt="Lab to Ed Leadership" style="height:36px;width:auto"></div><a class="btn sm light" href="log-in.html">Log in</a></div>`
      : `<div class="row between"><div class="row">${H.avatar(D.me.name, D.me.initials)}<div><p class="small muted">Good morning</p><p class="strong">${e(D.me.name)}</p></div></div><a class="iconbtn dot" href="notifications.html" aria-label="Notifications, 3 unread">${I('bell')}</a></div>`;
    return `<main class="screen has-nav">${hello}
    <form class="search" style="margin-top:16px" action="events.html"><label>${I('search', 20)}<span class="sr-only">Search events</span><input name="q" placeholder="Search events…" type="search">${guest ? '<input type="hidden" name="guest" value="1">' : ''}</label><a class="iconbtn" href="${u('events.html', { filters: 1 })}" aria-label="Filters">${I('sliders')}</a></form>
    <div class="chips" style="margin-top:14px" aria-label="Categories">${cats.map((c, i) => `<a class="chip ${i === 0 ? 'active' : ''}" href="${u('events.html', { cat: i ? c : null })}">${c === 'Free' ? 'Free events' : c}</a>`).join('')}</div>
    <div class="section-title"><h2>Next event</h2><a href="${u('events.html')}">See all</a></div>
    <a class="feature" href="${u('event-detail.html', { id: ev.id })}"><div class="tab"><div class="date"><b>${ev.day} ${ev.mon}</b><span>2026</span></div><div class="tabhead"><div class="kicker"><span>${e(ev.category)}</span><span>${e(ev.venueShort.split(',').pop().trim())}</span></div><h3 class="ellipsis">${e(ev.short)}</h3><p class="when">${e(ev.time)} · ${e(ev.weekday)}</p></div></div>
    <div class="body"><div class="going"><span class="avatars" aria-hidden="true">${['PR', 'KA', 'DB'].map((x, i) => `<span class="avatar ${AV[i + 1]}">${x}</span>`).join('')}</span><span class="grow">+ 94 going · ${ev.left} places left</span><span class="cta">${guest ? 'Book now' : 'You’re going'}</span></div><div class="pic"><img src="${ev.image}" alt="${e(ev.imageAlt)}"></div></div></a>
    ${guest ? `<div style="margin-top:20px">${H.joinBanner(ev)}</div>` : `
    <div class="section-title"><h2>My next ticket</h2><a href="tickets.html">My Tickets</a></div>
    <a class="card row" href="ticket-detail.html?id=${t.id}" style="text-decoration:none;color:inherit"><span style="width:64px;flex:none;color:#111">${P.qr(t.qr, 'QR code preview for your Winter Summit ticket')}</span><span class="grow"><span class="badge green">Valid</span><p class="strong" style="margin-top:6px">${e(ev.short)}</p><p class="small muted">${e(ev.dateShort)} · ${e(ev.time.split('–')[0])}</p></span><span class="chev">${I('next')}</span></a>
    <div class="section-title"><h2>Latest announcements</h2><a href="inbox.html">Inbox</a></div>
    <div class="list">${D.messages.slice(0, 2).map((x) => `<a class="item ${x.unread ? 'unread' : ''}" href="message.html?id=${x.id}"><span class="ico-wrap">${I(x.kind === 'Event update' ? 'calendar' : 'megaphone', 20)}</span><span class="grow"><p class="t">${e(x.title)}</p><p class="s ellipsis">${e(x.preview)}</p></span><span class="tiny muted nowrap">${e(x.date)}</span></a>`).join('')}</div>
    <div class="section-title"><h2>Quick actions</h2></div>
    <div class="shortcuts"><a class="shortcut" href="events.html"><span class="ico-wrap">${I('search', 20)}</span>Find events</a><a class="shortcut" href="tickets.html"><span class="ico-wrap">${I('qr', 20)}</span>Show ticket</a><a class="shortcut" href="profile.html"><span class="ico-wrap">${I('wallet', 20)}</span>Member card</a></div>`}
    <div class="section-title"><h2>More events</h2><a href="${u('events.html')}">See all</a></div>
    <div class="grid2">${D.events.slice(1).map(H.mini).join('')}</div>
    ${H.nav('home')}</main>`;
  };

  /* 9 Events list */
  S.events = () => {
    const cats = ['all', 'Conference', 'Webinar', 'Workshop', 'Networking'];
    return `<main class="screen has-nav"><header class="header left"><h1>Events</h1>${guest ? '' : `<a class="iconbtn dot" href="notifications.html" aria-label="Notifications">${I('bell')}</a>`}</header>
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search events</span><input type="search" data-search placeholder="Search by title, speaker or city" value="${e(q.q || '')}"></label><button class="iconbtn" data-open="filters" aria-label="More filters">${I('sliders')}</button></div>
    <div class="chips" style="margin-top:14px" data-filter-group="cat" aria-label="Category">${cats.map((c) => `<button class="chip" data-filter="${c}" aria-pressed="${(q.cat || 'all') === c}">${c === 'all' ? 'All' : c}</button>`).join('')}</div>
    <div class="chips" data-filter-group="price" aria-label="Price">${[['all', 'Any price'], ['free', 'Free'], ['paid', 'Paid']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${(q.cat === 'Free' ? 'free' : 'all') === v}">${l}</button>`).join('')}<span style="width:1px;background:var(--line);flex:none"></span>${[['online', 'Online'], ['inperson', 'In person']].map(([v, l]) => `<button class="chip" data-toast="Use the format filter in More filters" data-open="filters">${l}</button>`).join('')}</div>
    <p class="small muted" style="margin:10px 0"><span data-count>5</span> upcoming events</p>
    <div class="stack">${D.events.map(H.row).join('')}</div>
    <div class="empty" data-empty hidden>${I('search', 32)}<p class="strong" style="margin-top:8px">No events match</p><p class="small">Try a different search or clear the filters.</p></div>
    ${H.sheet('filters', 'Filter events', `<div><p class="strong" style="margin-bottom:8px">Date</p><div class="chips" data-filter-group="month" style="margin:0;padding:0;flex-wrap:wrap">${[['all', 'Any date'], ['Nov', 'November'], ['Dec', 'December'], ['Jan', 'January']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div></div>
      <div><p class="strong" style="margin-bottom:8px">Format</p><div class="chips" data-filter-group="format" style="margin:0;padding:0;flex-wrap:wrap">${[['all', 'Any'], ['online', 'Online'], ['inperson', 'In person']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div></div>
      <button class="btn block" data-close>Show events</button>`)}
    ${H.nav('search')}</main>`;
  };

  /* 10 Event detail */
  S['event-detail'] = () => {
    const ev = D.event(q.id);
    const soldOut = ev.left === 0;
    const unit = H.unit(ev);
    const priceBlock = !ev.price ? '<div class="price-big"><b>Free</b><span class="tiny muted">for everyone</span></div>'
      : guest ? `<div class="price-big"><b>${m(ev.price)}</b><span class="tiny" style="color:var(--green);font-weight:600">${m(D.memberPrice(ev.price))} for members</span></div>`
        : `<div class="price-big"><b>${m(unit)}</b><s>${m(ev.price)}</s></div>`;
    const days = [];
    const first = { Nov: 0, Dec: 2, Jan: 5 }[ev.mon];
    const len = { Nov: 30, Dec: 31, Jan: 31 }[ev.mon];
    for (let i = 0; i < first; i++) days.push('<span></span>');
    for (let d = 1; d <= len; d++) {
      const on = d === +ev.day;
      const past = ev.mon === 'Nov' && d < 19;
      days.push(`<span class="${on ? 'on' : past ? 'past' : ''}" ${on ? 'aria-current="date"' : ''}>${d}</span>`);
    }
    return `<main class="screen flush has-cta"><div class="hero"><img src="${ev.image}" alt="${e(ev.imageAlt)}"><div class="bar"><a class="iconbtn on-image" href="${u('events.html')}" aria-label="Back to events">${I('back')}</a><div class="row" style="gap:8px"><button class="iconbtn on-image" data-toast="Event link copied to share" aria-label="Share event">${I('share', 20)}</button><button class="iconbtn on-image" data-toast="Added to your phone calendar" aria-label="Add to calendar">${I('calendar', 20)}</button></div></div></div>
    <div class="pad" style="margin-top:18px"><div class="row between top"><div class="grow"><span class="badge rust">${e(ev.category)}</span><h1 style="font-size:21px;margin-top:8px">${e(ev.title)}</h1></div>${priceBlock}</div>
    ${!guest && ev.price ? `<p class="small" style="color:var(--green);font-weight:600;margin-top:6px">${I('check', 14, 'style="display:inline;vertical-align:-2px"')} Member price applied (25% off)</p>` : ''}
    <div class="icon-tabs" role="tablist" data-seg-group="ev">
      <button role="tab" data-seg="where" aria-selected="false">${I(ev.format === 'Online' ? 'globe' : 'pin')}${ev.format === 'Online' ? 'Online event' : 'In person'}</button>
      <button role="tab" data-seg="policy" aria-selected="false">${I('shield')}Refund policy</button>
      <button role="tab" data-seg="when" aria-selected="true">${I('calendar')}Date and time</button></div>
    <section data-panel-group="ev" data-panel="when" class="card stack"><div class="row between"><h2>${e(ev.dateLong)}</h2></div><p class="muted small">${e(ev.time)} (UK time)</p><div class="cal" aria-label="Calendar for ${ev.mon}">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<span class="h">${d}</span>`).join('')}${days.join('')}</div><p class="small muted">${e(ev.deadline)}</p><button class="btn block light sm" data-toast="Added to your phone calendar">${I('calendar', 18)} Add to calendar</button></section>
    <section data-panel-group="ev" data-panel="where" class="card stack" hidden><h2>${ev.format === 'Online' ? 'Joining online' : 'Venue'}</h2><p>${e(ev.venue)}</p>${ev.mapUrl ? `<a class="btn block light sm" href="${ev.mapUrl}" target="_blank" rel="noopener">${I('map', 18)} Open in Maps</a>` : '<p class="small muted">The joining link is on your ticket and in your confirmation email.</p>'}</section>
    <section data-panel-group="ev" data-panel="policy" class="card stack" hidden><h2>No refunds, but you can transfer</h2><p class="small">All tickets are non-refundable. If you can't attend, members can transfer their ticket to another member until ${e(ev.transferCloses)}.</p><a class="link" href="profile.html#policies">Read the full policy</a></section>
    <section class="stack" style="margin-top:22px"><h2>About this event</h2>${ev.description.map((p) => `<p class="muted">${e(p)}</p>`).join('')}</section>
    ${ev.speakers.length ? `<section class="stack" style="margin-top:22px"><h2>Speakers</h2><div class="list">${ev.speakers.map((s) => `<div class="item">${H.avatar(s.name, s.name.replace(/^Dr |^Prof\. /, '').split(' ').map((w) => w[0]).join(''), 'sm')}<div class="grow"><p class="t">${e(s.name)}</p><p class="s">${e(s.role)}</p></div></div>`).join('')}</div></section>` : ''}
    <section class="stack" style="margin-top:22px"><h2>Agenda</h2><ul class="agenda">${ev.agenda.map((a) => `<li><b>${a.time}</b><span>${e(a.item)}</span></li>`).join('')}</ul></section>
    <section class="card stack" style="margin-top:22px"><div class="row between"><h3>Places</h3><span class="small ${soldOut ? '' : 'muted'}">${soldOut ? '<span class="badge red">Sold out</span>' : `${ev.left} of ${ev.capacity} left`}</span></div><div class="progress" role="progressbar" aria-label="Places taken" aria-valuenow="${ev.capacity - ev.left}" aria-valuemin="0" aria-valuemax="${ev.capacity}"><span style="width:${Math.round((ev.capacity - ev.left) / ev.capacity * 100)}%"></span></div></section>
    </div>
    <div class="cta-bar">${soldOut ? `<button class="btn" data-toast="You're on the waitlist. We'll notify you if a place comes up.">Join the waitlist</button>` : `<div class="price"><span class="tiny muted">${ev.price ? 'per ticket' : 'Free event'}</span><b>${m(unit)}</b></div><a class="btn" href="${u('ticket-selection.html', { id: ev.id })}">${ev.price ? 'Get tickets' : 'Register free'}</a>`}</div></main>`;
  };

  /* 11 Ticket selection */
  S['ticket-selection'] = () => {
    const ev = D.event(q.id);
    const max = Math.min(4, ev.left);
    const unit = H.unit(ev);
    return `<main class="screen has-cta">${H.header('Tickets', u('event-detail.html', { id: ev.id }))}
    <form id="sel" class="stack-lg" data-next="${u('checkout.html', { id: ev.id, qty: +q.qty || 1 })}"><div class="card row"><img src="${ev.image}" alt="" style="width:64px;height:64px;border-radius:16px;object-fit:cover"><div class="grow"><p class="strong">${e(ev.title)}</p><p class="small muted">${e(ev.dateShort)} · ${e(ev.time)}</p></div></div>
    <section class="card stack"><div class="row between"><div><h3>${ev.price ? (guest ? 'Standard ticket' : 'Member ticket') : 'Free ticket'}</h3><p class="small muted">${ev.price ? (guest ? `Members pay ${m(D.memberPrice(ev.price))}` : `Standard price ${m(ev.price)}`) : 'No payment needed'}</p></div><b style="font-size:18px;color:var(--rust-ink)">${m(unit)}</b></div>
    <div class="row between"><span class="small muted">Quantity (up to ${max})</span><div class="stepper" data-stepper><button type="button" data-step="-1" aria-label="One fewer ticket">${I('minus', 18)}</button><input id="qty" type="number" min="1" max="${max}" value="${+q.qty || 1}" aria-label="Number of tickets" readonly><button type="button" data-step="1" aria-label="One more ticket">${I('plus', 18)}</button></div></div></section>
    ${guest ? `<section class="stack"><h2>Your details</h2><p class="small muted">Checking out as a guest. Your ticket will be emailed to you.</p><label class="field"><span>Full name</span><input autocomplete="name" value="Marcus Reid" required></label><label class="field"><span>Email</span><input type="email" autocomplete="email" value="marcus.reid@outlook.com" required></label></section>` : `<div class="notice">${I('user', 20)}<span>Booking as <b>${e(D.me.name)}</b> (${e(D.me.email)})</span></div>`}
    ${ev.questions.length ? `<section class="stack"><h2>A few questions</h2>${ev.questions.map((x) => x.type === 'select' ? `<label class="field"><span>${e(x.label)}</span><select>${x.options.map((o) => `<option>${e(o)}</option>`).join('')}</select></label>` : `<label class="field"><span>${e(x.label)}</span><input></label>`).join('')}</section>` : ''}
    <div class="notice amber">${I('clock', 20)}<span>We'll hold your ${'places'} for ${D.settings.seatHoldMinutes} minutes while you check out.</span></div>
    <div class="cta-bar"><div class="price"><span class="tiny muted">Total</span><b id="sel-total">${m(unit * (+q.qty || 1))}</b></div><button class="btn">Continue</button></div></form></main>`;
  };

  /* 12 Order summary / Checkout */
  S.checkout = () => {
    const ev = D.event(q.id);
    const qty = +q.qty || 1;
    const std = ev.price * qty;
    const unit = H.unit(ev);
    const sub = unit * qty;
    const promoPct = D.promoCodes[(q.promo || '').toUpperCase()] || 0;
    const promoOff = Math.round(sub * promoPct / 100);
    const total = sub - promoOff;
    const free = !ev.price;
    const payHref = u('payment.html', { id: ev.id, qty, promo: q.promo });
    const doneHref = u('confirmation.html', { id: ev.id, qty });
    return `<main class="screen has-cta">${H.header('Checkout', u('ticket-selection.html', { id: ev.id, qty }))}
    <div class="stack-lg">${q.joined ? `<div class="notice green">${I('check', 20)}<span><b>Welcome, ${e(D.me.first)}!</b> You're now a member, so the 25% member price has been applied.</span></div>` : ''}
    ${free ? '' : `<div class="row between"><span class="hold">${I('clock', 16)} Places held for <span data-hold>10:00</span></span><span class="tiny muted">then released</span></div>`}
    <section class="card stack"><div class="row"><img src="${ev.image}" alt="" style="width:56px;height:56px;border-radius:14px;object-fit:cover"><div class="grow"><p class="strong">${e(ev.short)}</p><p class="small muted">${e(ev.dateShort)} · ${e(ev.venueShort)}</p></div></div>
    <div class="sum"><div class="r"><span>${qty} × ${free ? 'Free ticket' : guest ? 'Standard ticket' : 'Ticket'}</span><span>${m(free ? 0 : std)}</span></div>
    ${!free && !guest ? `<div class="r save"><span>Member discount (25%)</span><span>−${m(std - sub)}</span></div>` : ''}
    ${promoOff ? `<div class="r save"><span>Promo code ${e(q.promo.toUpperCase())} (${promoPct}%)</span><span>−${m(promoOff)}</span></div>` : ''}
    <div class="r total"><span>Total</span><span>${m(total)}</span></div></div></section>
    ${guest && !free ? `<section class="join-card stack"><h3>Join free and save 25%</h3><p class="small">Members pay <b>${m(D.memberPrice(ev.price) * qty)}</b> instead of ${m(std)}. Membership is free, takes a minute, and you'll come straight back here.</p><div class="btn-row"><a class="btn sm" href="${u('sign-up.html', { from: 'checkout', id: ev.id, qty, guest: null })}">Join free</a><a class="btn sm outline" href="#pay" id="as-guest">Continue as guest</a></div></section>` : ''}
    ${free ? '' : `<form class="row" style="gap:8px" id="promo-form"><label class="field grow"><span class="sr-only">Promo code</span><input id="promo" placeholder="Promo code (try LEAD10)" value="${e(q.promo || '')}" autocapitalize="characters"></label><button class="btn sm dark" style="min-height:52px">Apply</button></form>`}
    <div class="notice rust">${I('info', 20)}<span><b>Tickets are non-refundable.</b> If you can't go, members can transfer a ticket to another member until ${e(ev.transferCloses)}.</span></div>
    <label class="check" id="pay"><input type="checkbox" id="agree" checked><span>I understand tickets can't be refunded.</span></label></div>
    <div class="cta-bar"><div class="price"><span class="tiny muted">Total</span><b>${m(total)}</b></div><a class="btn" id="pay-btn" href="${free ? doneHref : payHref}">${free ? 'Confirm registration' : 'Pay ' + m(total)}</a></div></main>`;
  };

  /* 13 Payment (provider sheet, mocked) */
  S.payment = () => {
    const ev = D.event(q.id);
    const qty = +q.qty || 1;
    const sub = H.unit(ev) * qty;
    const pct = D.promoCodes[(q.promo || '').toUpperCase()] || 0;
    const total = sub - Math.round(sub * pct / 100);
    const done = u('confirmation.html', { id: ev.id, qty });
    return `<main class="screen">${H.header('Payment', u('checkout.html', { id: ev.id, qty, promo: q.promo }))}
    <div class="card stack" style="opacity:.75" aria-hidden="true"><p class="strong">${e(ev.short)}</p><p class="small muted">${qty} ticket${qty > 1 ? 's' : ''} · ${m(total)}</p></div>
    <section class="paysheet" aria-label="Secure payment"><div class="grabber" aria-hidden="true"></div>
    <div class="row between"><div><p class="tiny muted">Pay Lab to Ed Leadership</p><p style="font-size:24px;font-weight:750">${m(total)}</p></div><span class="hold">${I('clock', 16)} <span data-hold>9:41</span></span></div>
    <div class="stack" style="margin-top:14px"><a class="wallet-btn" href="${done}" data-pay>${I('apple', 20)} Pay</a><a class="wallet-btn g" href="${done}" data-pay>${I('google', 20)} Pay</a></div>
    <div class="divider">or pay by card</div>
    <form class="stack" id="card-form" data-next="${done}" data-loading="Confirming your payment…" data-loading-sub="Waiting for your bank. Please don't close the app."><div class="card-input"><input inputmode="numeric" aria-label="Card number" value="4242 4242 4242 4242" autocomplete="cc-number"><div class="two"><input aria-label="Expiry date" value="12 / 28" autocomplete="cc-exp"><input aria-label="Security code" value="123" inputmode="numeric" autocomplete="cc-csc"></div></div>
    <label class="field"><span>Postcode</span><input value="LS1 2LH" autocomplete="postal-code"></label>
    <button class="btn block" id="pay-card">${I('lock', 18)} Pay ${m(total)}</button></form>
    <p class="stripe-note" style="margin-top:12px">${I('shield', 14)} Secure payment by Stripe. We never see or store your card details.</p>
    <a class="btn block ghost sm" style="margin-top:4px" href="${u('payment-failed.html', { id: ev.id, qty, promo: q.promo })}">Prototype: simulate a declined card</a></section></main>`;
  };

  /* 14 Payment failed */
  S['payment-failed'] = () => {
    const ev = D.event(q.id);
    return `<main class="screen"><div class="result"><div class="badge-ic fail">${I('x', 44)}</div><h1>Payment didn't go through</h1><p class="muted">Your bank declined the card. You haven't been charged.</p>
    <div class="notice amber" style="text-align:left">${I('clock', 20)}<span>Your places for <b>${e(ev.short)}</b> are still held for <b data-hold>7:42</b>.</span></div>
    <div class="card flat stack" style="text-align:left"><p class="strong">What you can do</p><p class="small muted">Check the card details, try another card, or use Apple Pay or Google Pay.</p></div>
    <a class="btn block" href="${u('checkout.html', { id: ev.id, qty: q.qty, promo: q.promo })}">Try again</a><a class="btn block light" href="${u('payment.html', { id: ev.id, qty: q.qty, promo: q.promo })}">Use a different card</a><a class="btn block ghost" href="${u('event-detail.html', { id: ev.id })}">Cancel order</a></div></main>`;
  };

  /* 15 Confirmation */
  S.confirmation = () => {
    const ev = D.event(q.id);
    const qty = +q.qty || 1;
    const email = guest ? 'marcus.reid@outlook.com' : D.me.email;
    return `<main class="screen"><div class="result"><div class="badge-ic">${I('check', 48)}</div><h1>You're going!</h1><p class="muted">${qty} ticket${qty > 1 ? 's' : ''} for <b>${e(ev.title)}</b>.</p>
    <div class="card stack" style="text-align:left"><dl class="kv"><div><dt>Date</dt><dd>${e(ev.dateShort)}</dd></div><div><dt>Time</dt><dd>${e(ev.time)}</dd></div><div><dt>Where</dt><dd>${e(ev.venueShort)}</dd></div><div><dt>Order</dt><dd>ORD-10592</dd></div></dl></div>
    <div class="notice green" style="text-align:left">${I('mail', 20)}<span>Receipt and ticket sent to <b>${e(email)}</b>.</span></div>
    ${guest ? `<a class="btn block" href="${u('event-detail.html', { id: ev.id })}" data-toast="Your ticket is in your email" data-go="${u('events.html')}">Done</a><button class="btn block light" data-toast="Added to your phone calendar">${I('calendar', 18)} Add to calendar</button>${H.joinBanner(null)}`
      : `<a class="btn block" href="ticket-detail.html?event=${ev.id}&new=1">${I('ticket', 18)} View ticket</a><button class="btn block light" data-toast="Added to your phone calendar">${I('calendar', 18)} Add to calendar</button><a class="btn block ghost" href="home.html">Back to Home</a>`}</div></main>`;
  };

  /* helper to resolve a ticket from params */
  function currentTicket() {
    if (q.event) {
      const ev = D.event(q.event);
      return { t: { id: 'T-C4E219', eventId: ev.id, holder: D.me.name, type: ev.price ? 'Member' : 'Free', paid: D.memberPrice(ev.price), status: 'valid', qr: 'L2E:c4e219' + ev.id, order: 'ORD-10592' }, ev, isNew: true };
    }
    const t = D.ticket(q.id) || D.tickets[0];
    return { t: { ...t }, ev: D.event(t.eventId), isNew: false };
  }

  /* 16 My Tickets */
  S.tickets = () => {
    const up = D.tickets.filter((t) => t.status === 'valid');
    const past = D.tickets.filter((t) => t.status !== 'valid');
    return `<main class="screen has-nav"><header class="header left"><h1>My Tickets</h1></header>
    <div class="seg" role="tablist" data-seg-group="tk"><button role="tab" data-seg="up" aria-selected="true">Upcoming (${up.length})</button><button role="tab" data-seg="past" aria-selected="false">Past (${past.length})</button></div>
    <div class="stack" style="margin-top:16px" data-panel-group="tk" data-panel="up">${up.map((t) => H.ticketCard(t, D.event(t.eventId))).join('')}
    <div class="notice">${I('wallet', 20)}<span>Tickets are saved on this phone and work without signal.</span></div></div>
    <div class="stack" style="margin-top:16px" data-panel-group="tk" data-panel="past" hidden>${past.map((t) => H.ticketCard(t, D.event(t.eventId))).join('')}</div>
    ${H.nav('ticket')}</main>`;
  };

  /* 17 Ticket detail */
  S['ticket-detail'] = () => {
    const { t, ev, isNew } = currentTicket();
    if (q.transferred) t.status = 'transferred';
    const to = q.to || 'Kwame Asante';
    const online = ev.format === 'Online';
    const stamp = t.status === 'used' ? 'USED' : t.status === 'transferred' ? 'TRANSFERRED<br><small>Code cancelled</small>' : '';
    return `<main class="screen">${H.header('Ticket', 'tickets.html', `<button class="iconbtn" data-toast="Ticket link copied" aria-label="Share ticket">${I('share', 20)}</button>`)}
    ${isNew ? `<div class="notice green" style="margin-bottom:14px">${I('check', 20)}<span>Payment confirmed. Your ticket has been added to My Tickets.</span></div>` : ''}
    ${t.status === 'transferred' ? `<div class="notice dark" style="margin-bottom:14px">${I('transfer', 20)}<span>Transferred to <b>${e(to)}</b> on 19 Nov 2026. This QR code no longer works; a new ticket has been issued to them.</span></div>` : ''}
    <article class="tk" style="pointer-events:none"><div class="top ${t.status === 'used' ? 'used' : t.status === 'transferred' ? 'void' : ''}"><span class="d">${ev.day}<small>${ev.mon}</small></span><div class="grow"><h3>${e(ev.title)}</h3><p class="small" style="opacity:.9">${e(ev.weekday)} · ${e(ev.time)}</p></div></div>
    <div style="padding:18px 16px 6px"><div class="qr-box ${stamp ? 'void' : ''}">${P.qr(t.qr, 'QR code for ticket ' + t.id)}${stamp ? `<div class="stamp"><span>${stamp}</span></div>` : ''}</div><p class="center small muted" style="margin-top:10px">${t.status === 'valid' ? 'Show this at the door. Turn your brightness up.' : t.checkedIn ? e(t.checkedIn) : ''}</p></div>
    <div class="perf" aria-hidden="true"></div>
    <div style="padding:6px 16px 18px"><dl class="kv"><div><dt>Name</dt><dd>${e(t.holder)}</dd></div><div><dt>Ticket type</dt><dd>${e(t.type)}</dd></div><div><dt>Date</dt><dd>${e(ev.dateShort)}</dd></div><div><dt>Ticket no.</dt><dd>${e(t.id)}</dd></div><div style="grid-column:span 2"><dt>${online ? 'Joining' : 'Venue'}</dt><dd>${e(ev.venue)}</dd></div></dl></div></article>
    ${t.status === 'valid' ? `<div class="btn-row" style="margin-top:16px">${online ? `<a class="btn light sm" href="${ev.onlineUrl}" target="_blank" rel="noopener">${I('globe', 18)} Join link</a>` : `<a class="btn light sm" href="${ev.mapUrl}" target="_blank" rel="noopener">${I('map', 18)} Directions</a>`}<button class="btn light sm" data-toast="Added to Apple Wallet">${I('wallet', 18)} Add to Wallet</button></div>
    <section class="card stack" style="margin-top:16px"><div class="row"><span class="ico-wrap">${I('transfer', 20)}</span><div class="grow"><p class="strong">Can't make it?</p><p class="small muted">Tickets aren't refundable, but you can transfer this one to another member until ${e(ev.transferCloses)}.</p></div></div><a class="btn block dark" href="transfer.html?id=${t.id}${q.event ? '&event=' + q.event : ''}">Transfer ticket</a></section>` : ''}
    <p class="center tiny muted" style="margin-top:16px">Order ${e(t.order)} · Paid ${m(t.paid)}</p></main>`;
  };

  /* 18 Transfer ticket */
  S.transfer = () => {
    const { t, ev } = currentTicket();
    const back = `ticket-detail.html?id=${t.id}${q.event ? '&event=' + q.event : ''}`;
    const people = D.members.filter((x) => x.name !== D.me.name && x.role !== 'Admin');
    return `<main class="screen has-cta">${H.header('Transfer ticket', back)}
    <div class="stack-lg"><div class="card row"><span class="ico-wrap">${I('ticket', 20)}</span><div class="grow"><p class="strong">${e(ev.short)}</p><p class="small muted">${e(t.id)} · ${e(ev.dateShort)}</p></div></div>
    <div class="stack"><h2>Who should get it?</h2><p class="small muted">Search for another member by name or email. They need a free member account.</p>
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search members</span><input type="search" data-search placeholder="Name or email"></label></div></div>
    <div class="stack" role="radiogroup" aria-label="Members" data-select-group id="who">${people.map((p) => `<button type="button" class="option" role="radio" aria-checked="false" data-select="${e(p.name)}" data-filter-item data-tags="">${H.avatar(p.name, p.initials, 'sm')}<span class="grow"><span class="strong" style="display:block">${e(p.name)}</span><span class="small muted ellipsis" style="display:block">${e(p.email)}</span></span><span class="radio" aria-hidden="true"></span></button>`).join('')}</div>
    <div class="empty" data-empty hidden>No members found. Ask them to join free first.</div>
    <div class="notice rust">${I('info', 20)}<span>Your QR code will be cancelled and a new ticket issued to them. This can't be undone. Transfers close ${e(ev.transferCloses)}.</span></div></div>
    <div class="cta-bar"><button class="btn" id="tr-btn" disabled data-open="confirm-tr">Choose a member</button></div>
    ${H.sheet('confirm-tr', 'Confirm transfer', `<p>Transfer your <b>${e(ev.short)}</b> ticket to <b id="tr-name">—</b>?</p><p class="small muted">They'll get a push notification and an email with their new ticket. Your ticket will show as transferred.</p><a class="btn block" id="tr-go" href="${back}&transferred=1">Transfer ticket</a><button class="btn block light" data-close>Cancel</button>`)}</main>`;
  };

  /* 19 Inbox */
  S.inbox = () => `<main class="screen has-nav"><header class="header left"><h1>Inbox</h1><a class="iconbtn dot" href="notifications.html" aria-label="Notifications">${I('bell')}</a></header>
    <div class="chips" data-filter-group="kind" aria-label="Message type">${[['all', 'All'], ['Announcement', 'Announcements'], ['Event update', 'Event updates'], ['Direct message', 'Direct']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div>
    <div class="list" style="margin-top:14px">${D.messages.map((x) => `<a class="item ${x.unread ? 'unread' : ''}" href="message.html?id=${x.id}" data-filter-item data-tags="${x.kind}"><span class="ico-wrap ${x.kind === 'Direct message' ? 'dark' : ''}">${I(x.kind === 'Event update' ? 'calendar' : x.kind === 'Direct message' ? 'mail' : 'megaphone', 20)}</span><span class="grow"><span class="row between"><span class="tiny muted">${e(x.kind)}</span><span class="tiny muted">${e(x.date)}</span></span><p class="t">${e(x.title)}</p><p class="s ellipsis">${e(x.preview)}</p></span></a>`).join('')}</div>
    <div class="empty" data-empty hidden>Nothing here yet.</div>
    <p class="small muted center" style="margin-top:16px">Messages come from the Lab to Ed Leadership team. Replies aren't available.</p>
    ${H.nav('inbox')}</main>`;

  /* 20 Message */
  S.message = () => {
    const x = D.message(q.id);
    const ev = x.eventId ? D.event(x.eventId) : null;
    return `<main class="screen">${H.header(e(x.kind), 'inbox.html', `<button class="iconbtn" data-open="report" aria-label="Report or block">${I('info', 20)}</button>`)}
    <article class="stack-lg"><div class="stack"><span class="badge rust">${e(x.kind)}</span><h1>${e(x.title)}</h1><div class="row">${H.avatar(x.from, x.from === 'Lab to Ed Leadership' ? 'LE' : 'G', 'sm')}<div><p class="strong small">${e(x.from)}</p><p class="tiny muted">${e(x.date)} 2026 at ${e(x.time)}</p></div></div></div>
    <div class="card stack">${x.body.map((p) => `<p>${e(p)}</p>`).join('')}</div>
    ${x.attachment ? `<button class="card row" style="border:0;width:100%;text-align:left" data-toast="Opening ${e(x.attachment)}"><span class="ico-wrap">${I('file', 20)}</span><span class="grow"><span class="strong" style="display:block">${e(x.attachment)}</span><span class="small muted">PDF · 420 KB</span></span>${I('download', 20)}</button>` : ''}
    ${ev ? `<a class="btn block light" href="event-detail.html?id=${ev.id}">${I('calendar', 18)} View ${e(ev.short)}</a>` : ''}
    <p class="small muted center">You can't reply to this message. Questions? Email ${e(D.org.contactEmail)}.</p></article>
    ${H.sheet('report', 'Report this message', `<p class="small muted">Tell us what's wrong. The Admin team will review it.</p><div class="stack" data-select-group>${['Spam or misleading', 'Abusive or offensive', 'Not relevant to me'].map((r, i) => `<button type="button" class="option ${i === 0 ? 'selected' : ''}" role="radio" aria-checked="${i === 0}" data-select="${r}"><span class="radio" aria-hidden="true"></span>${r}</button>`).join('')}</div><button class="btn block" data-close data-toast="Thanks. We've received your report.">Send report</button><button class="btn block danger" data-close data-toast="You won't see messages from this sender">Block sender</button>`)}</main>`;
  };

  /* 21 Notifications */
  S.notifications = () => `<main class="screen">${H.header('Notifications', 'home.html', `<button class="iconbtn" id="mark-read" aria-label="Mark all as read">${I('check', 20)}</button>`)}
    <div class="seg" role="tablist" data-seg-group="nt" style="margin-bottom:14px"><button role="tab" data-seg="all" aria-selected="true">All</button><button role="tab" data-seg="unread" aria-selected="false">Unread (3)</button></div>
    ${['all', 'unread'].map((p) => `<div class="list" data-panel-group="nt" data-panel="${p}" ${p === 'unread' ? 'hidden' : ''}>${D.notifications.filter((n) => p === 'all' || n.unread).map((n) => `<a class="item ${n.unread ? 'unread' : ''}" href="${n.href}"><span class="ico-wrap">${I(n.icon, 20)}</span><span class="grow"><p class="t">${e(n.title)}</p><p class="s">${e(n.body)}</p><p class="tiny muted">${e(n.when)}</p></span><span class="chev">${I('next', 18)}</span></a>`).join('')}</div>`).join('')}
    <a class="btn block light sm" style="margin-top:16px" href="profile.html#notif">${I('settings', 18)} Notification settings</a></main>`;

  /* 22 Profile and settings */
  S.profile = () => {
    const prefs = [['New events', true], ['Announcements', true], ['Messages from the Admin', true], ['Payment confirmations', true], ['Event reminders (1 day and 1 hour before)', true], ['Email news round-up', false]];
    return `<main class="screen has-nav"><header class="header left"><h1>Profile</h1><button class="iconbtn" data-open="edit" aria-label="Edit profile">${I('edit', 20)}</button></header>
    <div class="profile-head">${H.avatar(D.me.name, D.me.initials, 'lg')}<h2 style="font-size:22px">${e(D.me.name)}</h2><p class="muted small">${e(D.me.role)} · ${e(D.me.institution)}</p><div class="interest" style="justify-content:center">${D.me.interests.map((t) => `<span class="badge rust">${t}</span>`).join('')}</div></div>
    <section class="member-card stack" style="margin-top:20px" aria-label="Membership card"><div class="row between"><img class="logo" src="../shared/img/logo-white.png" alt="Lab to Ed Leadership"><span class="badge" style="background:rgba(255,255,255,.2);color:#fff">Member</span></div><p class="num">${e(D.me.memberId)}</p><div class="row between small"><span>${e(D.me.name)}</span><span>Since ${e(D.me.memberSince)}</span></div></section>
    <div class="section-title"><h2>Settings</h2></div>
    <div class="list"><button class="item" data-open="edit"><span class="ico-wrap">${I('user', 20)}</span><span class="grow t">Edit profile</span><span class="chev">${I('next', 18)}</span></button>
    <button class="item" data-open="notif" id="notif"><span class="ico-wrap">${I('bell', 20)}</span><span class="grow t">Notification preferences</span><span class="chev">${I('next', 18)}</span></button>
    <button class="item" data-open="about"><span class="ico-wrap">${I('info', 20)}</span><span class="grow t">About Lab to Ed Leadership</span><span class="chev">${I('next', 18)}</span></button>
    <button class="item" data-open="policies" id="policies"><span class="ico-wrap">${I('shield', 20)}</span><span class="grow t">Terms, privacy and ticket policy</span><span class="chev">${I('next', 18)}</span></button>
    <button class="item" data-open="help"><span class="ico-wrap">${I('mail', 20)}</span><span class="grow t">Contact us and FAQ</span><span class="chev">${I('next', 18)}</span></button></div>
    <div class="section-title"><h2>Your data</h2></div>
    <div class="list"><button class="item" data-toast="We'll email a copy of your data within 24 hours"><span class="ico-wrap">${I('download', 20)}</span><span class="grow t">Download my data</span></button>
    <button class="item" data-open="delete"><span class="ico-wrap" style="background:var(--red-soft);color:#a3221a">${I('trash', 20)}</span><span class="grow t" style="color:#a3221a">Delete account</span></button>
    <a class="item" href="welcome.html"><span class="ico-wrap dark">${I('logout', 20)}</span><span class="grow t">Log out</span></a></div>
    <p class="center tiny muted" style="margin-top:16px">Version 1.0.3 (prototype)</p>
    ${H.sheet('edit', 'Edit profile', `<label class="field"><span>Full name</span><input value="${e(D.me.name)}"></label><label class="field"><span>Phone</span><input type="tel" value="${e(D.me.phone)}"></label><label class="field"><span>School or institution</span><input value="${e(D.me.institution)}"></label><label class="field"><span>Role</span><input value="${e(D.me.role)}"></label><label class="field"><span>Bio</span><textarea>${e(D.me.bio)}</textarea></label><button class="btn block" data-close data-toast="Profile saved">Save changes</button>`)}
    ${H.sheet('notif', 'Notifications', `<p class="small muted">Choose what you hear about. Ticket and payment emails are always sent.</p>${prefs.map(([l, on]) => `<div class="row" style="min-height:52px"><span class="grow">${l}</span><button class="switch" data-toggle aria-pressed="${on}" aria-label="${l}"></button></div>`).join('')}<button class="btn block" data-close data-toast="Preferences saved">Save</button>`)}
    ${H.sheet('about', 'About us', `<img src="../shared/img/logo-dark.png" alt="Lab to Ed Leadership" style="height:48px;width:auto"><p>${e(D.org.mission)}</p><h3>Executive team</h3><div class="list">${D.org.executives.map((x) => `<div class="item"><span class="grow"><p class="t">${e(x.name)}</p><p class="s">${e(x.role)}</p></span></div>`).join('')}</div><p class="small muted">${e(D.org.address)}<br>${e(D.org.contactEmail)}</p>`)}
    ${H.sheet('policies', 'Policies', `<div class="card flat stack"><h3>No-refund and ticket transfer policy</h3><p class="small">All tickets are non-refundable. Members can transfer a ticket to another member through the app until the transfer deadline for that event (usually 48 hours before it starts). The old QR code is cancelled and a new ticket is issued.</p></div><div class="card flat stack"><h3>Privacy policy</h3><p class="small">We collect only what we need to run events: your name, email, and the details you add to your profile. Payments are handled by Stripe; we never store card details. You can download or delete your data at any time.</p></div><div class="card flat stack"><h3>Terms of service</h3><p class="small">By using the app you agree to treat other members with respect and to use tickets only for the named holder.</p></div>`)}
    ${H.sheet('help', 'Contact us', `<a class="btn block light" href="mailto:${D.org.contactEmail}">${I('mail', 18)} ${e(D.org.contactEmail)}</a><h3>Frequently asked</h3>${[['Can I get a refund?', 'No, tickets are non-refundable, but members can transfer them.'], ['Does my ticket work offline?', 'Yes. It is saved on your phone.'], ['How much is membership?', 'It is free and gives you 25% off paid events.']].map(([qq, a]) => `<details class="card flat"><summary class="strong" style="min-height:28px">${qq}</summary><p class="small muted" style="margin-top:8px">${a}</p></details>`).join('')}`)}
    ${H.sheet('delete', 'Delete your account?', `<p>This permanently removes your profile and membership. Tickets you hold for upcoming events will be cancelled and can't be refunded.</p><a class="btn block danger" href="welcome.html?toast=Your%20account%20has%20been%20deleted">Delete my account</a><button class="btn block light" data-close>Keep my account</button>`)}
    ${H.nav('user')}</main>`;
  };

  /* ---------- After-render behaviour ---------- */
  const after = {
    splash() { if (!q.stay) setTimeout(() => { if (document.visibilityState === 'visible') location.href = 'onboarding.html'; }, 3500); },
    onboarding() {
      const c = document.getElementById('onb'), b = document.getElementById('onb-next');
      let i = 0;
      c.addEventListener('slide', (ev) => { i = ev.detail; b.textContent = i === 2 ? 'Get started' : 'Next'; });
      b.addEventListener('click', () => { if (i >= 2) location.href = 'welcome.html'; else c.scrollTo({ left: (i + 1) * c.clientWidth, behavior: 'smooth' }); });
    },
    'ticket-selection'() {
      const ev = D.event(q.id), f = document.getElementById('sel'), qty = document.getElementById('qty'), tot = document.getElementById('sel-total');
      qty.addEventListener('input', () => { tot.textContent = m(H.unit(ev) * qty.value); });
      f.addEventListener('submit', () => { f.dataset.next = P.u('checkout.html', { id: ev.id, qty: qty.value }).replace(/&amp;/g, '&'); });
    },
    checkout() {
      P.timer('[data-hold]', 600);
      const f = document.getElementById('promo-form');
      if (f) f.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const code = document.getElementById('promo').value.trim().toUpperCase();
        if (!code) return;
        if (D.promoCodes[code]) location.href = P.u('checkout.html', { id: q.id, qty: q.qty, joined: q.joined, promo: code }).replace(/&amp;/g, '&');
        else P.toast('That code isn’t valid for this event');
      });
      const agree = document.getElementById('agree'), btn = document.getElementById('pay-btn');
      agree.addEventListener('change', () => btn.classList.toggle('disabled', !agree.checked));
      const g = document.getElementById('as-guest');
      if (g) g.addEventListener('click', (ev) => { ev.preventDefault(); btn.scrollIntoView({ behavior: 'smooth' }); P.toast('Continuing as a guest at the standard price'); });
    },
    payment() {
      P.timer('[data-hold]', 581);
      const busy = (ev) => {
        ev.preventDefault();
        const href = (ev.currentTarget.getAttribute('href') || ev.currentTarget.dataset.next);
        P.loading('Confirming your payment…', 'Waiting for your bank. Please don\u2019t close the app.', href);
      };
      document.querySelectorAll('[data-pay]').forEach((a) => a.addEventListener('click', busy));
    },
    'payment-failed'() { P.timer('[data-hold]', 462); },
    transfer() {
      const g = document.getElementById('who'), b = document.getElementById('tr-btn'), n = document.getElementById('tr-name'), go = document.getElementById('tr-go');
      const base = go.getAttribute('href');
      g.addEventListener('select', (ev) => { b.disabled = false; b.textContent = 'Transfer to ' + ev.detail.split(' ')[0]; n.textContent = ev.detail; go.href = base + '&to=' + encodeURIComponent(ev.detail); });
    },
    notifications() {
      document.getElementById('mark-read').addEventListener('click', () => { document.querySelectorAll('.item.unread').forEach((x) => x.classList.remove('unread')); P.toast('All notifications marked as read'); });
    },
    profile() {
      const h = location.hash.slice(1);
      if (h === 'policies' || h === 'notif') P.openSheet(h);
    },
  };

  window.A_SCREENS = S;
  window.A_AFTER = after;
})();
