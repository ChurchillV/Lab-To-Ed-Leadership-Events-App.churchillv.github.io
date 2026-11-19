/* Alternative B – Ref2 · member and guest screens.
   Admin screens are in admin.js, which also mounts the current screen. */
(function () {
  const D = window.L2E, I = P.icon, u = P.u, e = P.esc, m = P.money, q = P.q;
  const guest = !!q.guest;
  const AV = ['', 'c1', 'c2', 'c3', 'c4'];
  const avc = (s) => AV[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length];
  const ini = (n) => n.replace(/^Dr |^Prof\. /, '').split(' ').map((w) => w[0]).join('').slice(0, 2);

  const H = {
    header(title, back, right = '') {
      return `<header class="header">${back ? `<a class="iconbtn" href="${back}" aria-label="Back">${I('back')}</a>` : ''}<h1>${title}</h1>${right}</header>`;
    },
    nav(active) {
      const items = guest
        ? [['home', u('home.html'), 'Home'], ['search', u('events.html'), 'Events'], ['user', 'sign-up.html', 'Join free'], ['lock', 'log-in.html', 'Log in']]
        : [['home', 'home.html', 'Home'], ['search', 'events.html', 'Events'], ['ticket', 'tickets.html', 'Tickets'], ['inbox', 'inbox.html', 'Inbox', 1], ['user', 'profile.html', 'Profile']];
      return `<nav class="tabbar" aria-label="Main">${items.map(([ic, href, l, pip]) => `<a href="${href}" ${active === ic ? 'aria-current="page"' : `aria-label="${l}"`}>${I(ic, 22)}<span class="lbl-t">${l}</span>${pip && active !== ic ? '<span class="pip" aria-hidden="true"></span>' : ''}</a>`).join('')}</nav>`;
    },
    sheet(id, title, body) {
      return `<div class="sheet" id="${id}" hidden role="dialog" aria-modal="true" aria-labelledby="${id}-t"><div class="panel"><div class="grabber" aria-hidden="true"></div><div class="row between"><h2 id="${id}-t">${title}</h2><button class="iconbtn" data-close aria-label="Close">${I('x', 20)}</button></div><div class="stack" style="margin-top:14px">${body}</div></div></div>`;
    },
    avatar(name, initials, cls = '', rank) {
      return `<span class="avatar ${cls} ${avc(name)}" role="img" aria-label="${e(name)}">${e(initials || ini(name))}${rank ? `<span class="rank" aria-hidden="true">${rank}</span>` : ''}</span>`;
    },
    unit(ev) { return guest ? ev.price : D.memberPrice(ev.price); },
    price(ev) {
      if (!ev.price) return '<span class="pill">Free</span>';
      return guest ? `<span class="pill white" style="box-shadow:inset 0 0 0 1.5px var(--line)">${m(ev.price)}</span>` : `<span class="pill">${m(D.memberPrice(ev.price))}</span>`;
    },
    card(ev) {
      return `<a class="ecard" href="${u('event-detail.html', { id: ev.id })}"><span class="img" style="display:block"><img src="${ev.image}" alt="${e(ev.imageAlt)}"><span class="pill white">${e(ev.category)}</span></span><h3>${e(ev.short)}</h3><p>${e(ev.weekday)} ${ev.day} ${ev.mon} · ${e(ev.format === 'Online' ? 'Online' : ev.venueShort.split(',').pop().trim())}</p></a>`;
    },
    row(ev) {
      const tags = [ev.category, ev.price ? 'paid' : 'free', ev.format === 'Online' ? 'online' : 'inperson', ev.mon].join('|');
      return `<a class="erow" href="${u('event-detail.html', { id: ev.id })}" data-filter-item data-tags="${tags}"><span class="img"><img src="${ev.image}" alt="${e(ev.imageAlt)}"></span><span class="grow" style="display:block"><span class="row" style="gap:6px"><span class="pill grey">${e(ev.category)}</span>${ev.left === 0 ? '<span class="pill red">Sold out</span>' : ev.left < 25 ? `<span class="pill orange">${ev.left} left</span>` : ''}</span><h3 style="margin-top:6px">${e(ev.short)}</h3><span class="meta">${I('calendar', 14)}${e(ev.dateShort)} · ${e(ev.time.split('–')[0])}</span><span class="meta" style="margin-top:2px">${I(ev.format === 'Online' ? 'globe' : 'pin', 14)}<span class="ellipsis">${e(ev.venueShort)}</span></span></span><span style="align-self:flex-start;padding:6px 6px 0 0">${H.price(ev)}</span></a>`;
    },
    ticket(t, ev) {
      const st = t.status === 'used' ? '<span class="pill grey">Used</span>' : t.status === 'transferred' ? '<span class="pill grey">Transferred</span>' : `<span class="pill">${I('check', 12)} Valid</span>`;
      return `<a class="tkt" href="ticket-detail.html?id=${t.id}"><div class="head"><span class="img"><img src="${ev.image}" alt="${e(ev.imageAlt)}"></span><div class="grow"><h3>${e(ev.short)}</h3><p class="small muted">${e(ev.dateShort)} · ${e(ev.time.split('–')[0])}</p><p class="small muted ellipsis">${e(ev.venueShort)}</p></div><span class="iconbtn" style="background:var(--surface-2)" aria-hidden="true">${I('qr', 20)}</span></div><div class="foot"><span>${e(t.id)} · ${e(t.type)}</span>${st}</div></a>`;
    },
    join(ev) {
      return `<section class="hero-primary" style="min-height:0"><span class="pill navy tagr">Free</span><h2 style="max-width:78%">Join and save 25%</h2><p class="small" style="margin-top:6px;max-width:80%;font-weight:600">${ev ? `Members pay ${m(D.memberPrice(ev.price))} instead of ${m(ev.price)} for ${e(ev.short)}.` : 'Members get 25% off every paid event.'}</p><a class="btn sm white" style="margin-top:14px" href="sign-up.html"><span class="plus">${I('plus', 14)}</span>Join free</a></section>`;
    },
  };
  window.B = H;
  const S = {};

  /* 1 Splash */
  S.splash = () => `<main class="splash"><div class="spectrum" aria-hidden="true"></div><div class="stack-lg"><div class="logo-tile">${P.loaderHtml()}</div><h1 style="font-size:34px">Events, tickets and news for our community.</h1><p class="small muted strong">Checking your login…</p></div>
    <div class="stack"><a class="btn block" href="onboarding.html">First time here? Continue</a><a class="btn block white" href="home.html">Returning member: go to Home</a></div></main>`;

  /* 2 Onboarding */
  S.onboarding = () => {
    const slides = [
      ['event-summit.svg', 'Events that move you forward', 'Conferences, webinars and mentoring circles for science leaders.', 'calendar', '5 upcoming events'],
      ['event-webinar.svg', 'Book in two minutes', 'Pay by card, Apple Pay or Google Pay. Your QR ticket works offline.', 'ticket', 'Ticket ready'],
      ['event-mentoring.svg', 'Stay in the loop', 'News and updates from the team arrive in your Inbox.', 'inbox', '2 new messages'],
    ];
    return `<main class="screen" style="padding-left:0;padding-right:0"><div class="row between" style="padding:0 16px"><span class="pill navy">Welcome</span><a class="link" href="welcome.html">Skip</a></div>
    <div class="onb" data-carousel="onb" id="onb" aria-roledescription="carousel" aria-label="Introduction">${slides.map(([img, t, d, ic, f], i) => `<section aria-roledescription="slide" aria-label="${i + 1} of 3"><div class="art"><img src="../shared/img/${img}" alt=""><span class="float"><span class="disc sm">${I(ic, 18)}</span>${f}</span></div><h1>${t}</h1><p class="muted" style="font-size:16px">${d}</p></section>`).join('')}</div>
    <div class="stack" style="padding:0 16px"><div class="dots" data-dots="onb">${slides.map((_, i) => `<button data-dot aria-label="Slide ${i + 1}"></button>`).join('')}</div><button class="btn block" id="onb-next">Next</button></div></main>`;
  };

  /* 3 Welcome */
  S.welcome = () => `<main class="screen stack-lg"><div class="bento"><div class="tile span2" style="padding:20px"><img src="../shared/img/logo-dark.png" alt="Lab to Ed Leadership" style="height:52px;width:auto"></div>
    <div class="tile"><span class="disc">${I('users', 20)}</span><p class="num" style="margin-top:12px">412</p><p class="lbl">members</p></div><div class="tile"><span class="disc blue">${I('tag', 20)}</span><p class="num" style="margin-top:12px">25<small>%</small></p><p class="lbl">off for members</p></div>
    <div class="tile primary span2"><h2 style="font-size:26px">Lead science.<br>Grow together.</h2><p class="small strong" style="margin-top:6px">Membership is free and open to everyone.</p></div></div>
    <div class="stack"><a class="btn block" href="sign-up.html"><span class="plus">${I('plus', 14)}</span>Join free</a><a class="btn block white" href="log-in.html">Log in</a><a class="btn block ghost" href="home.html?guest=1">Browse as a guest</a></div></main>`;

  /* 4 Sign up */
  S['sign-up'] = () => {
    const fc = q.from === 'checkout';
    const ev = fc ? D.event(q.id) : null;
    const next = fc ? u('verify-email.html', { from: 'checkout', id: q.id, qty: q.qty, guest: null }) : 'verify-email.html';
    const soc = fc ? u('checkout.html', { id: q.id, qty: q.qty, joined: 1, guest: null }) : 'profile-setup.html';
    return `<main class="screen">${H.header('Join free', fc ? u('checkout.html', { id: q.id, qty: q.qty, guest: 1 }) : 'welcome.html')}
    ${fc ? `<div class="notice primary" style="margin-bottom:16px">${I('tag', 20)}<span>Join now and pay <b>${m(D.memberPrice(ev.price) * (+q.qty || 1))}</b> instead of ${m(ev.price * (+q.qty || 1))}. You'll go straight back to checkout.</span></div>` : ''}
    <div class="social"><a class="btn block" style="background:#000" href="${soc}">${I('apple', 20)} Continue with Apple</a><a class="btn block white" href="${soc}">${I('google', 20)} Continue with Google</a></div>
    <div class="divider">or with email</div>
    <form class="stack" data-next="${next}" data-loading="Creating your account…" data-loading-sub="We'll email you a code"><div class="btn-row"><label class="field"><span>First name</span><input autocomplete="given-name" value="Amara" required></label><label class="field"><span>Last name</span><input autocomplete="family-name" value="Okafor" required></label></div>
    <label class="field"><span>Email</span><input type="email" autocomplete="email" value="${e(D.me.email)}" required></label>
    <label class="field"><span>Password</span><input type="password" autocomplete="new-password" value="correct-horse-42" minlength="8" required><span class="hint">At least 8 characters.</span></label>
    <label class="check"><input type="checkbox" checked required><span>I agree to the <a href="profile.html#policies">Terms of service</a> and <a href="profile.html#policies">Privacy policy</a>.</span></label>
    <label class="check"><input type="checkbox"><span>Email me news about upcoming events (optional).</span></label>
    <button class="btn block">Create my free account</button></form>
    <p class="center small" style="margin-top:12px">Already a member? <a href="log-in.html">Log in</a></p></main>`;
  };

  /* 5 Log in / Forgot password */
  S['log-in'] = () => `<main class="screen">${H.header('Log in', 'welcome.html')}
    <div class="tile primary" style="margin-bottom:16px"><h2>Welcome back</h2><p class="small strong">Your tickets and messages are waiting.</p></div>
    <div class="social"><a class="btn block" style="background:#000" href="home.html">${I('apple', 20)} Continue with Apple</a><a class="btn block white" href="home.html">${I('google', 20)} Continue with Google</a></div>
    <div class="divider">or with email</div>
    <form class="stack" data-next="home.html" data-loading="Logging you in…" data-loading-sub="Getting your tickets and messages"><label class="field"><span>Email</span><input type="email" autocomplete="email" value="${e(D.me.email)}" required></label>
    <label class="field"><span>Password</span><input type="password" autocomplete="current-password" value="correct-horse-42" required></label>
    <div class="row between"><span></span><button type="button" class="link" data-open="forgot">Forgot password?</button></div><button class="btn block">Log in</button></form>
    <div class="notice navy stack" style="margin-top:18px;display:block"><p class="row" style="align-items:flex-start">${I('shield', 20)}<span>Prototype: the Admin account opens on the Admin dashboard.</span></p><a class="btn block primary sm" href="admin-dashboard.html">Log in as Admin (Geetika)</a></div>
    <p class="center small" style="margin-top:14px">New here? <a href="sign-up.html">Join free</a></p>
    ${H.sheet('forgot', 'Reset password', `<p class="muted">We'll email you a 6-digit code.</p><label class="field"><span>Email</span><input type="email" value="${e(D.me.email)}"></label><button class="btn block" data-open="reset" data-close>Send reset code</button>`)}
    ${H.sheet('reset', 'New password', `<p class="muted">Code sent to ${e(D.me.email)}.</p><label class="field"><span>Code</span><input inputmode="numeric" value="604 218"></label><label class="field"><span>New password</span><input type="password" value="new-password-2026"></label><button class="btn block" data-close data-toast="Password updated. You can now log in.">Update password</button>`)}</main>`;

  /* 6 Verify email */
  S['verify-email'] = () => {
    const next = q.from === 'checkout' ? u('checkout.html', { id: q.id, qty: q.qty, joined: 1, guest: null }) : 'profile-setup.html';
    return `<main class="screen">${H.header('Verify email', q.from === 'checkout' ? u('sign-up.html', { from: 'checkout', id: q.id, qty: q.qty }) : 'sign-up.html')}
    <div class="tile stack-lg center"><span class="disc" style="width:72px;height:72px;margin:0 auto">${I('mail', 30)}</span><div class="stack"><h2>Check your inbox</h2><p class="muted">Enter the 6-digit code we sent to <b>${e(D.me.email)}</b>.</p></div>
    <form class="stack-lg" data-next="${next}" data-loading="Checking your code…"><fieldset style="border:0;padding:0;margin:0"><legend class="sr-only">Verification code</legend><div class="otp" data-otp>${'482916'.split('').map((d, i) => `<input inputmode="numeric" maxlength="1" value="${d}" aria-label="Digit ${i + 1}" style="background:var(--surface-2)" required>`).join('')}</div></fieldset><button class="btn block">Verify and continue</button></form>
    <button class="link" data-toast="A new code is on its way.">Resend code</button></div></main>`;
  };

  /* 7 Profile setup */
  S['profile-setup'] = () => {
    const interests = ['Curriculum', 'Coaching', 'Workload', 'Inquiry', 'Assessment', 'Wellbeing', 'Careers', 'Research'];
    return `<main class="screen">${H.header('Your profile', 'verify-email.html', '<span class="pill navy">Step 3 of 3</span>')}
    <form class="stack-lg" data-next="home.html?toast=Welcome%20to%20Lab%20to%20Ed%20Leadership%2C%20Amara!"><div class="profile-card">${H.avatar(D.me.name, D.me.initials, 'xl')}<button type="button" class="btn sm white" style="box-shadow:inset 0 0 0 1.5px var(--line);margin-top:10px" data-toast="Photo added">${I('camera', 18)} Add a photo</button></div>
    <label class="field"><span>Phone (optional)</span><input type="tel" value="${e(D.me.phone)}"></label><label class="field"><span>School or institution</span><input value="${e(D.me.institution)}" required></label><label class="field"><span>Your role</span><input value="${e(D.me.role)}"></label>
    <fieldset style="border:0;padding:0;margin:0"><legend class="strong" style="margin-bottom:10px">Interests</legend><div class="row wrap" style="gap:8px">${interests.map((t) => `<button type="button" class="chip" data-toggle aria-pressed="${D.me.interests.includes(t)}">${t}</button>`).join('')}</div></fieldset>
    <div class="tile stack"><h3>Notifications</h3>${[['Push notifications', 'New events, announcements, messages', true], ['Event reminders', '1 day and 1 hour before', true], ['Email news', 'A monthly round-up', false]].map(([t, s, on]) => `<div class="row"><div class="grow"><p class="strong">${t}</p><p class="small muted">${s}</p></div><button type="button" class="switch" data-toggle aria-pressed="${on}" aria-label="${t}"></button></div>`).join('')}</div>
    <button class="btn block">Finish</button><a class="btn block ghost" href="home.html">Skip for now</a></form></main>`;
  };

  /* 8 Home */
  S.home = () => {
    const ev = D.events[0];
    const top = guest
      ? `<div class="row between"><img src="../shared/img/logo-dark.png" alt="Lab to Ed Leadership" style="height:38px;width:auto"><a class="btn sm white" href="log-in.html">Log in</a></div>`
      : `<div class="row between"><div class="row">${H.avatar(D.me.name, D.me.initials, 'round')}<div><p class="small muted strong">Good morning</p><p style="font-size:18px;font-weight:800">${e(D.me.first)}</p></div></div><a class="iconbtn dot" href="notifications.html" aria-label="Notifications, 3 unread">${I('bell')}</a></div>`;
    return `<main class="screen has-nav">${top}
    <form class="search" style="margin-top:16px" action="events.html"><label>${I('search', 20)}<span class="sr-only">Search events</span><input name="q" type="search" placeholder="Search events">${guest ? '<input type="hidden" name="guest" value="1">' : ''}</label><a class="iconbtn navy" href="${u('events.html')}" aria-label="Filters">${I('sliders')}</a></form>
    <div class="section-title"><h2>Next event</h2><a href="${u('events.html')}">All events</a></div>
    <a class="hero-primary" href="${u('event-detail.html', { id: ev.id })}"><span class="pill navy tagr">${ev.left} left</span><h2>${e(ev.short)}</h2><p class="small strong" style="margin-top:6px;max-width:55%">${e(ev.dateShort)}<br>${e(ev.venueShort)}</p><p class="small strong" style="margin-top:14px">${guest ? 'Booking open' : '16 days to go'}</p><div class="prog-dots" aria-hidden="true"><span class="done"></span><span class="done"></span><span class="on">${I('check', 12)}</span><span></span><span></span><span></span></div><span class="art"><img src="${ev.image}" alt="${e(ev.imageAlt)}"></span></a>
    ${guest ? `<div style="margin-top:12px">${H.join(ev)}</div>` : `
    <div class="bento" style="margin-top:12px"><a class="tile" href="tickets.html"><span class="disc">${I('ticket', 20)}</span><p class="lbl" style="margin-top:10px">Tickets held</p><p class="num">2</p></a><a class="tile" href="profile.html"><span class="disc">${I('star', 20)}</span><p class="lbl" style="margin-top:10px">Events attended</p><p class="num">4</p></a></div>
    <div class="section-title"><h2>My next ticket</h2><a href="tickets.html">My Tickets</a></div>
    ${H.ticket(D.tickets[0], ev)}
    <div class="section-title"><h2>Latest news</h2><a href="inbox.html">Inbox</a></div>
    <div class="rlist">${D.messages.slice(0, 3).map((x) => `<a class="ritem ${x.unread ? 'unread' : ''}" href="message.html?id=${x.id}"><span class="disc ${x.kind === 'Event update' ? 'blue' : ''}">${I(x.kind === 'Event update' ? 'calendar' : 'megaphone', 20)}</span><span class="grow"><p class="t ellipsis">${e(x.title)}</p><p class="s">${e(x.kind)} · ${e(x.date)}</p></span></a>`).join('')}</div>
    <div class="section-title"><h2>Quick actions</h2></div>
    <div class="mini3"><a href="events.html">${I('search', 22)}Find events<span class="s">5 upcoming</span></a><a href="ticket-detail.html?id=${D.tickets[0].id}">${I('qr', 22)}Show ticket<span class="s">Works offline</span></a><a href="profile.html">${I('wallet', 22)}Member card<span class="s">${e(D.me.memberId)}</span></a></div>`}
    <div class="section-title"><h2>More events</h2><a href="${u('events.html')}">See all</a></div>
    <div class="bento">${D.events.slice(1).map(H.card).join('')}</div>
    ${H.nav('home')}</main>`;
  };

  /* 9 Events */
  S.events = () => `<main class="screen has-nav"><header class="header big"><h1>Events</h1><button class="iconbtn navy" data-open="filters" aria-label="More filters">${I('sliders')}</button></header>
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search events</span><input type="search" data-search placeholder="Title, speaker or city" value="${e(q.q || '')}"></label></div>
    <div class="chips" style="margin-top:12px" data-filter-group="cat">${['all', 'Conference', 'Webinar', 'Workshop', 'Networking'].map((c) => `<button class="chip" data-filter="${c}" aria-pressed="${(q.cat || 'all') === c}">${c === 'all' ? 'All' : c}</button>`).join('')}</div>
    <div class="chips" data-filter-group="price">${[['all', 'Any price'], ['free', 'Free'], ['paid', 'Paid']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${v === 'free' ? '<span class="dotc" style="background:var(--green)"></span>' : v === 'paid' ? '<span class="dotc" style="background:var(--logo-orange)"></span>' : ''}${l}</button>`).join('')}</div>
    <div class="row between" style="margin:12px 2px"><p class="small strong"><span data-count>5</span> upcoming</p><span class="small muted strong">Soonest first</span></div>
    <div class="stack">${D.events.map(H.row).join('')}</div>
    <div class="empty" data-empty hidden>${I('search', 30)}<p style="margin-top:8px">No events match. Try a different search.</p></div>
    ${H.sheet('filters', 'Filters', `<div class="tile stack"><p class="strong">Date</p><div class="row wrap" style="gap:8px" data-filter-group="month">${[['all', 'Any date'], ['Nov', 'November'], ['Dec', 'December'], ['Jan', 'January']].map(([v, l]) => `<button class="chip" style="background:var(--surface-2)" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div></div>
    <div class="tile stack"><p class="strong">Format</p><div class="row wrap" style="gap:8px" data-filter-group="format">${[['all', 'Any'], ['online', 'Online'], ['inperson', 'In person']].map(([v, l]) => `<button class="chip" style="background:var(--surface-2)" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div></div><button class="btn block" data-close>Show events</button>`)}
    ${H.nav('search')}</main>`;

  /* 10 Event detail */
  S['event-detail'] = () => {
    const ev = D.event(q.id);
    const soldOut = ev.left === 0;
    const unit = H.unit(ev);
    const pct = Math.round((ev.capacity - ev.left) / ev.capacity * 100);
    return `<main class="screen has-cta"><div class="detail-img"><img src="${ev.image}" alt="${e(ev.imageAlt)}"><div class="bar"><a class="iconbtn" href="${u('events.html')}" aria-label="Back to events">${I('back')}</a><button class="iconbtn" data-toast="Event link copied to share" aria-label="Share event">${I('share', 20)}</button></div><span class="pill">${e(ev.category)}</span></div>
    <section class="tile stack" style="margin-top:12px"><div class="row top"><h1 class="grow" style="font-size:24px">${e(ev.title)}</h1><span class="pill ${soldOut ? 'red' : ''}">${soldOut ? 'Sold out' : 'Open'}</span></div>
    <p class="small strong"><span class="muted">Date:</span> ${e(ev.dateShort)} &nbsp; <span class="muted">Time:</span> ${e(ev.time)}</p>
    <div class="inner row"><span class="disc ${ev.price ? '' : 'blue'}">${I('tag', 20)}</span><div class="grow">${!ev.price ? '<p class="num" style="font-size:26px">Free</p><p class="small muted">for everyone</p>' : guest ? `<p class="num" style="font-size:26px">${m(ev.price)}</p><p class="small strong" style="color:var(--green)">${m(D.memberPrice(ev.price))} for members (25% off)</p>` : `<p class="num" style="font-size:26px">${m(unit)} <s class="small muted" style="font-weight:600">${m(ev.price)}</s></p><span class="pill" style="margin-top:4px">${I('check', 12)} Member price</span>`}</div></div>
    <div class="mini3"><a href="${ev.mapUrl || ev.onlineUrl}" target="_blank" rel="noopener">${I(ev.format === 'Online' ? 'globe' : 'pin', 20)}${ev.format}<span class="s">${ev.format === 'Online' ? 'Link on ticket' : 'Open map'}</span></a><button type="button" data-open="policy" style="font:inherit">${I('shield', 20)}No refunds<span class="s">Transfer instead</span></button><button type="button" data-toast="Added to your phone calendar" style="font:inherit">${I('calendar', 20)}Calendar<span class="s">Add date</span></button></div>
    <div><div class="row between small strong"><span>${soldOut ? 'All places taken' : `${ev.left} of ${ev.capacity} places left`}</span><span class="muted">${pct}% booked</span></div><div class="meter" style="margin-top:6px"><span style="width:${pct}%"></span></div></div></section>
    <section class="tile stack" style="margin-top:12px"><h2>About</h2>${ev.description.map((p) => `<p class="muted">${e(p)}</p>`).join('')}<p class="small strong">${I('pin', 14, 'style="display:inline;vertical-align:-2px"')} ${e(ev.venue)}</p><p class="small muted">${e(ev.deadline)}</p></section>
    ${ev.speakers.length ? `<section class="rlist" style="margin-top:12px"><h2 style="padding:12px 16px 4px">Speakers</h2>${ev.speakers.map((s) => `<div class="ritem">${H.avatar(s.name, ini(s.name), 'round')}<div class="grow"><p class="t">${e(s.name)}</p><p class="s">${e(s.role)}</p></div><span class="pill">Speaker</span></div>`).join('')}</section>` : ''}
    <section class="tile stack" style="margin-top:12px"><h2>Agenda</h2><ul class="agenda">${ev.agenda.map((a) => `<li><b>${a.time}</b><span>${e(a.item)}</span></li>`).join('')}</ul></section>
    <div class="cta-bar">${soldOut ? `<button class="btn" data-toast="You're on the waitlist. We'll let you know if a place comes up."><span class="plus">${I('plus', 14)}</span>Join the waitlist</button>` : `<span class="price"><span class="tiny muted strong">${ev.price ? 'per ticket' : 'Free'}</span><b>${m(unit)}</b></span><a class="btn" href="${u('ticket-selection.html', { id: ev.id })}"><span class="plus">${I('plus', 14)}</span>${ev.price ? 'Get tickets' : 'Register free'}</a>`}</div>
    ${H.sheet('policy', 'No refunds, but you can transfer', `<div class="tile stack"><p>All tickets are non-refundable. If you can't attend, members can transfer their ticket to another member until <b>${e(ev.transferCloses)}</b>.</p><a class="link" href="profile.html#policies">Read the full policy</a></div>`)}</main>`;
  };

  /* 11 Ticket selection */
  S['ticket-selection'] = () => {
    const ev = D.event(q.id);
    const max = Math.min(4, ev.left);
    const unit = H.unit(ev);
    return `<main class="screen has-cta">${H.header('Tickets', u('event-detail.html', { id: ev.id }))}
    <form id="sel" class="stack" data-next="${u('checkout.html', { id: ev.id, qty: +q.qty || 1 })}"><div class="tile row tight"><img src="${ev.image}" alt="" style="width:60px;height:60px;border-radius:18px;object-fit:cover"><div class="grow"><p class="strong">${e(ev.short)}</p><p class="small muted">${e(ev.dateShort)} · ${e(ev.time)}</p></div></div>
    <section class="tile stack"><div class="row between"><div><span class="pill ${guest ? 'grey' : ''}">${ev.price ? (guest ? 'Standard' : 'Member') : 'Free'}</span><p class="num" style="margin-top:8px">${m(unit)}</p><p class="small muted">${ev.price ? (guest ? `Members pay ${m(D.memberPrice(ev.price))}` : `Standard ${m(ev.price)}`) : 'No payment needed'}</p></div>
    <div class="stepper" data-stepper><button type="button" data-step="-1" aria-label="One fewer ticket">${I('minus', 18)}</button><input id="qty" type="number" min="1" max="${max}" value="${+q.qty || 1}" aria-label="Number of tickets" readonly><button type="button" data-step="1" aria-label="One more ticket">${I('plus', 18)}</button></div></div><p class="tiny muted">Up to ${max} per order.</p></section>
    ${guest ? `<section class="tile stack"><h3>Your details</h3><p class="small muted">Checking out as a guest. We'll email your ticket.</p><label class="field"><span>Full name</span><input autocomplete="name" value="Marcus Reid" required></label><label class="field"><span>Email</span><input type="email" autocomplete="email" value="marcus.reid@outlook.com" required></label></section>` : `<div class="notice">${H.avatar(D.me.name, D.me.initials, 'sm')}<span>Booking as <b>${e(D.me.name)}</b><br>${e(D.me.email)}</span></div>`}
    ${ev.questions.length ? `<section class="tile stack"><h3>A few questions</h3>${ev.questions.map((x) => x.type === 'select' ? `<label class="field"><span>${e(x.label)}</span><select>${x.options.map((o) => `<option>${e(o)}</option>`).join('')}</select></label>` : `<label class="field"><span>${e(x.label)}</span><input></label>`).join('')}</section>` : ''}
    <div class="notice orange">${I('clock', 20)}<span>Your places are held for ${D.settings.seatHoldMinutes} minutes while you check out.</span></div>
    <div class="cta-bar"><span class="price"><span class="tiny muted strong">Total</span><b id="sel-total">${m(unit * (+q.qty || 1))}</b></span><button class="btn">Continue</button></div></form></main>`;
  };

  /* 12 Checkout */
  S.checkout = () => {
    const ev = D.event(q.id);
    const qty = +q.qty || 1;
    const std = ev.price * qty, unit = H.unit(ev), sub = unit * qty;
    const pct = D.promoCodes[(q.promo || '').toUpperCase()] || 0;
    const off = Math.round(sub * pct / 100), total = sub - off, free = !ev.price;
    return `<main class="screen has-cta">${H.header('Checkout', u('ticket-selection.html', { id: ev.id, qty }), free ? '' : `<span class="hold">${I('clock', 14)} <b data-hold>10:00</b></span>`)}
    <div class="stack">${q.joined ? `<div class="notice primary">${I('check', 20)}<span><b>Welcome, ${e(D.me.first)}!</b> You're a member now, so 25% off has been applied.</span></div>` : ''}
    <section class="tile stack"><div class="row"><img src="${ev.image}" alt="" style="width:56px;height:56px;border-radius:18px;object-fit:cover"><div class="grow"><p class="strong">${e(ev.short)}</p><p class="small muted">${e(ev.dateShort)} · ${e(ev.venueShort)}</p></div></div>
    <div class="sum"><div class="r"><span>${qty} × ${free ? 'Free ticket' : guest ? 'Standard ticket' : 'Ticket'}</span><span>${m(free ? 0 : std)}</span></div>${!free && !guest ? `<div class="r save"><span>Member discount (25%)</span><span>−${m(std - sub)}</span></div>` : ''}${off ? `<div class="r save"><span>Code ${e(q.promo.toUpperCase())} (${pct}%)</span><span>−${m(off)}</span></div>` : ''}<div class="r total"><span>Total</span><span>${m(total)}</span></div></div></section>
    ${guest && !free ? `<section class="hero-primary" style="min-height:0"><span class="pill navy tagr">Save ${m(std - D.memberPrice(ev.price) * qty)}</span><h2 style="max-width:62%">Join free and save 25%</h2><p class="small strong" style="margin-top:6px">Pay <b>${m(D.memberPrice(ev.price) * qty)}</b> instead of ${m(std)}. It takes a minute and brings you straight back here.</p><div class="btn-row" style="margin-top:14px"><a class="btn sm white" href="${u('sign-up.html', { from: 'checkout', id: ev.id, qty, guest: null })}"><span class="plus">${I('plus', 12)}</span>Join free</a><a class="btn sm navy" href="#pay" id="as-guest">Continue as guest</a></div></section>` : ''}
    ${free ? '' : `<form class="row" style="gap:8px" id="promo-form"><label class="field grow"><span class="sr-only">Promo code</span><input id="promo" placeholder="Promo code (try LEAD10)" value="${e(q.promo || '')}" autocapitalize="characters"></label><button class="btn sm primary" style="min-height:54px">Apply</button></form>`}
    <div class="notice blue">${I('info', 20)}<span><b>No refunds.</b> If you can't go, members can transfer a ticket to another member until ${e(ev.transferCloses)}.</span></div>
    <label class="check" id="pay"><input type="checkbox" id="agree" checked><span>I understand tickets can't be refunded.</span></label></div>
    <div class="cta-bar"><span class="price"><span class="tiny muted strong">Total</span><b>${m(total)}</b></span><a class="btn" id="pay-btn" href="${free ? u('confirmation.html', { id: ev.id, qty }) : u('payment.html', { id: ev.id, qty, promo: q.promo })}">${free ? 'Confirm registration' : 'Pay ' + m(total)}</a></div></main>`;
  };

  /* 13 Payment */
  S.payment = () => {
    const ev = D.event(q.id);
    const qty = +q.qty || 1;
    const sub = H.unit(ev) * qty, pct = D.promoCodes[(q.promo || '').toUpperCase()] || 0, total = sub - Math.round(sub * pct / 100);
    const done = u('confirmation.html', { id: ev.id, qty });
    return `<main class="screen">${H.header('Payment', u('checkout.html', { id: ev.id, qty, promo: q.promo }))}
    <div class="tile row" style="opacity:.7" aria-hidden="true"><span class="disc">${I('ticket', 20)}</span><div class="grow"><p class="strong">${e(ev.short)}</p><p class="small muted">${qty} ticket${qty > 1 ? 's' : ''}</p></div><p class="strong">${m(total)}</p></div>
    <section class="paysheet" aria-label="Secure payment"><div class="grabber" aria-hidden="true"></div><div class="row between"><div><p class="tiny muted strong">Pay Lab to Ed Leadership</p><p class="num">${m(total)}</p></div><span class="hold">${I('clock', 14)} <b data-hold>9:41</b></span></div>
    <div class="stack" style="margin-top:14px"><a class="wallet-btn" href="${done}" data-pay>${I('apple', 20)} Pay</a><a class="wallet-btn g" href="${done}" data-pay>${I('google', 20)} Pay</a></div><div class="divider">or pay by card</div>
    <form class="stack" data-next="${done}" data-loading="Confirming your payment…" data-loading-sub="Waiting for your bank. Please don't close the app."><div class="card-input"><input inputmode="numeric" aria-label="Card number" value="4242 4242 4242 4242" autocomplete="cc-number"><div class="two"><input aria-label="Expiry date" value="12 / 28" autocomplete="cc-exp"><input aria-label="Security code" value="123" inputmode="numeric" autocomplete="cc-csc"></div></div><label class="field"><span>Postcode</span><input value="LS1 2LH" style="background:var(--surface-2)" autocomplete="postal-code"></label><button class="btn block">${I('lock', 18)} Pay ${m(total)}</button></form>
    <p class="stripe-note" style="margin-top:12px">${I('shield', 14)} Secure payment by Stripe. We never see or store your card details.</p>
    <a class="btn block ghost sm" href="${u('payment-failed.html', { id: ev.id, qty, promo: q.promo })}">Prototype: simulate a declined card</a></section></main>`;
  };

  /* 14 Payment failed */
  S['payment-failed'] = () => {
    const ev = D.event(q.id);
    return `<main class="screen"><div class="result"><span class="big-ic fail">${I('x', 46)}</span><h1>Payment didn't go through</h1><p class="muted" style="font-size:16px">Your bank declined the card. You haven't been charged.</p>
    <div class="bento"><div class="tile"><p class="lbl">Places held for</p><p class="num" data-hold>7:42</p></div><div class="tile"><p class="lbl">Event</p><p class="strong" style="margin-top:6px">${e(ev.short)}</p></div></div>
    <div class="notice">${I('info', 20)}<span>Check your card details, try another card, or use Apple Pay or Google Pay.</span></div>
    <a class="btn block" href="${u('checkout.html', { id: ev.id, qty: q.qty, promo: q.promo })}">Try again</a><a class="btn block white" href="${u('payment.html', { id: ev.id, qty: q.qty, promo: q.promo })}">Use a different card</a><a class="btn block ghost" href="${u('event-detail.html', { id: ev.id })}">Cancel order</a></div></main>`;
  };

  /* 15 Confirmation */
  S.confirmation = () => {
    const ev = D.event(q.id);
    const qty = +q.qty || 1;
    return `<main class="screen"><div class="result"><span class="big-ic">${I('check', 50)}</span><h1>You're going!</h1><p class="muted" style="font-size:16px">${qty} ticket${qty > 1 ? 's' : ''} for ${e(ev.title)}.</p>
    <div class="bento"><div class="tile"><span class="disc">${I('calendar', 20)}</span><p class="strong" style="margin-top:10px">${e(ev.dateShort)}</p><p class="small muted">${e(ev.time)}</p></div><div class="tile"><span class="disc blue">${I(ev.format === 'Online' ? 'globe' : 'pin', 20)}</span><p class="strong" style="margin-top:10px">${e(ev.venueShort)}</p><p class="small muted">Order ORD-10592</p></div></div>
    <div class="notice primary">${I('mail', 20)}<span>Receipt and ticket sent to <b>${e(guest ? 'marcus.reid@outlook.com' : D.me.email)}</b>.</span></div>
    ${guest ? `<a class="btn block" href="${u('events.html')}">Done</a><button class="btn block white" data-toast="Added to your phone calendar">${I('calendar', 18)} Add to calendar</button>${H.join(null)}`
      : `<a class="btn block" href="ticket-detail.html?event=${ev.id}&new=1">${I('ticket', 18)} View ticket</a><button class="btn block white" data-toast="Added to your phone calendar">${I('calendar', 18)} Add to calendar</button><a class="btn block ghost" href="home.html">Back to Home</a>`}</div></main>`;
  };

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
    const up = D.tickets.filter((t) => t.status === 'valid'), past = D.tickets.filter((t) => t.status !== 'valid');
    return `<main class="screen has-nav"><header class="header big"><h1>My Tickets</h1></header>
    <div class="bento" style="margin-bottom:14px"><div class="tile"><span class="disc">${I('ticket', 20)}</span><p class="num" style="margin-top:10px">${up.length}</p><p class="lbl">upcoming</p></div><div class="tile primary"><span class="disc navy">${I('wallet', 20)}</span><p class="strong" style="margin-top:10px">Works offline</p><p class="small">Saved on this phone</p></div></div>
    <div class="seg" role="tablist" data-seg-group="tk"><button role="tab" data-seg="up" aria-selected="true">Upcoming</button><button role="tab" data-seg="past" aria-selected="false">Past</button></div>
    <div class="stack" style="margin-top:12px" data-panel-group="tk" data-panel="up">${up.map((t) => H.ticket(t, D.event(t.eventId))).join('')}</div>
    <div class="stack" style="margin-top:12px" data-panel-group="tk" data-panel="past" hidden>${past.map((t) => H.ticket(t, D.event(t.eventId))).join('')}</div>
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
    ${isNew ? `<div class="notice primary" style="margin-bottom:12px">${I('check', 20)}<span>Payment confirmed. Your ticket is in My Tickets.</span></div>` : ''}
    ${t.status === 'transferred' ? `<div class="notice navy" style="margin-bottom:12px">${I('transfer', 20)}<span>Transferred to <b>${e(to)}</b> on 19 Nov 2026. This code no longer works; they have a new ticket.</span></div>` : ''}
    <section class="tile stack"><div class="row top"><div class="grow"><h2>${e(ev.title)}</h2><p class="small strong muted" style="margin-top:4px">${e(ev.dateShort)} · ${e(ev.time)}</p></div>${t.status === 'valid' ? `<span class="pill">${I('check', 12)} Valid</span>` : `<span class="pill grey">${t.status === 'used' ? 'Used' : 'Transferred'}</span>`}</div>
    <div class="qr-wrap ${stamp ? 'void' : ''}"><div class="qr-box ${stamp ? 'void' : ''}">${P.qr(t.qr, 'QR code for ticket ' + t.id)}${stamp ? `<div class="stamp"><span>${stamp}</span></div>` : ''}</div><p class="center small strong" style="margin-top:10px">${t.status === 'valid' ? 'Show this at the door' : t.checkedIn ? e(t.checkedIn) : 'Not valid for entry'}</p></div>
    <dl class="kv"><div><dt>Name</dt><dd>${e(t.holder)}</dd></div><div><dt>Ticket type</dt><dd>${e(t.type)}</dd></div><div><dt>Ticket no.</dt><dd>${e(t.id)}</dd></div><div><dt>Order</dt><dd>${e(t.order)}</dd></div><div style="grid-column:span 2"><dt>${online ? 'Joining' : 'Venue'}</dt><dd>${e(ev.venue)}</dd></div></dl></section>
    ${t.status === 'valid' ? `<div class="mini3" style="margin-top:12px">${online ? `<a href="${ev.onlineUrl}" target="_blank" rel="noopener">${I('globe', 20)}Join link</a>` : `<a href="${ev.mapUrl}" target="_blank" rel="noopener">${I('map', 20)}Directions</a>`}<button type="button" style="font:inherit" data-toast="Added to Apple Wallet">${I('wallet', 20)}Wallet</button><button type="button" style="font:inherit" data-toast="Added to your phone calendar">${I('calendar', 20)}Calendar</button></div>
    <section class="tile stack" style="margin-top:12px"><div class="row"><span class="disc">${I('transfer', 20)}</span><div class="grow"><p class="strong">Can't make it?</p><p class="small muted">Transfer this ticket to another member until ${e(ev.transferCloses)}. Tickets can't be refunded.</p></div></div><a class="btn block" href="transfer.html?id=${t.id}${q.event ? '&event=' + q.event : ''}"><span class="plus">${I('transfer', 14)}</span>Transfer ticket</a></section>` : ''}
    <p class="center tiny muted strong" style="margin-top:14px">Paid ${m(t.paid)}</p></main>`;
  };

  /* 18 Transfer */
  S.transfer = () => {
    const { t, ev } = currentTicket();
    const back = `ticket-detail.html?id=${t.id}${q.event ? '&event=' + q.event : ''}`;
    const people = D.members.filter((x) => x.name !== D.me.name && x.role !== 'Admin');
    return `<main class="screen has-cta">${H.header('Transfer ticket', back)}
    <div class="stack"><div class="tile row tight"><span class="disc">${I('ticket', 20)}</span><div class="grow"><p class="strong">${e(ev.short)}</p><p class="small muted">${e(t.id)} · ${e(ev.dateShort)}</p></div></div>
    <h2 style="margin-top:20px">Who should get it?</h2><p class="small muted">Find another member by name or email. They need a free account.</p>
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search members</span><input type="search" data-search placeholder="Name or email"></label></div>
    <div class="stack" role="radiogroup" aria-label="Members" data-select-group id="who">${people.map((p) => `<button type="button" class="option" role="radio" aria-checked="false" data-select="${e(p.name)}" data-filter-item data-tags="">${H.avatar(p.name, p.initials, 'sm')}<span class="grow"><span class="strong" style="display:block">${e(p.name)}</span><span class="small muted ellipsis" style="display:block">${e(p.email)}</span></span><span class="radio" aria-hidden="true"></span></button>`).join('')}</div>
    <div class="empty" data-empty hidden>No members found. Ask them to join free first.</div>
    <div class="notice orange">${I('info', 20)}<span>Your QR code will be cancelled and a new ticket issued to them. This can't be undone.</span></div></div>
    <div class="cta-bar"><button class="btn" id="tr-btn" disabled data-open="confirm-tr">Choose a member</button></div>
    ${H.sheet('confirm-tr', 'Confirm transfer', `<div class="tile stack"><p>Transfer your <b>${e(ev.short)}</b> ticket to <b id="tr-name">—</b>?</p><p class="small muted">They'll get a push notification and an email with their new ticket.</p></div><a class="btn block" id="tr-go" href="${back}&transferred=1">Transfer ticket</a><button class="btn block white" data-close>Cancel</button>`)}</main>`;
  };

  /* 19 Inbox */
  S.inbox = () => `<main class="screen has-nav"><header class="header big"><h1>Inbox</h1><a class="iconbtn dot" href="notifications.html" aria-label="Notifications">${I('bell')}</a></header>
    <div class="chips" data-filter-group="kind">${[['all', 'All'], ['Announcement', 'Announcements'], ['Event update', 'Event updates'], ['Direct message', 'Direct']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div>
    <div class="rlist" style="margin-top:12px">${D.messages.map((x) => `<a class="ritem ${x.unread ? 'unread' : ''}" href="message.html?id=${x.id}" data-filter-item data-tags="${x.kind}"><span class="disc ${x.kind === 'Event update' ? 'blue' : x.kind === 'Direct message' ? 'navy' : ''}">${I(x.kind === 'Event update' ? 'calendar' : x.kind === 'Direct message' ? 'mail' : 'megaphone', 20)}</span><span class="grow"><p class="t">${e(x.title)}</p><p class="s ellipsis">${e(x.preview)}</p></span><span class="pill grey">${e(x.date)}</span></a>`).join('')}</div>
    <div class="empty" data-empty hidden>Nothing here yet.</div>
    <p class="small muted center strong" style="margin-top:14px">Messages come from the Lab to Ed Leadership team. Replies aren't available.</p>${H.nav('inbox')}</main>`;

  /* 20 Message */
  S.message = () => {
    const x = D.message(q.id);
    const ev = x.eventId ? D.event(x.eventId) : null;
    return `<main class="screen">${H.header('', 'inbox.html', `<button class="iconbtn" data-open="report" aria-label="Report or block">${I('info', 20)}</button>`)}
    <article class="stack"><span class="pill ${x.kind === 'Event update' ? 'blue' : x.kind === 'Direct message' ? 'navy' : ''}">${e(x.kind)}</span><h1 style="font-size:26px">${e(x.title)}</h1>
    <div class="row">${H.avatar(x.from, x.from === 'Lab to Ed Leadership' ? 'LE' : 'G', 'sm')}<div><p class="strong small">${e(x.from)}</p><p class="tiny muted strong">${e(x.date)} 2026 at ${e(x.time)}</p></div></div>
    <div class="tile stack">${x.body.map((p) => `<p>${e(p)}</p>`).join('')}</div>
    ${x.attachment ? `<button class="tile row" style="border:0;width:100%;text-align:left" data-toast="Opening ${e(x.attachment)}"><span class="disc">${I('file', 20)}</span><span class="grow"><span class="strong" style="display:block">${e(x.attachment)}</span><span class="small muted">PDF · 420 KB</span></span>${I('download', 20)}</button>` : ''}
    ${ev ? `<a class="btn block white" href="event-detail.html?id=${ev.id}">${I('calendar', 18)} View ${e(ev.short)}</a>` : ''}
    <p class="small muted center strong">You can't reply to this message. Questions? Email ${e(D.org.contactEmail)}.</p></article>
    ${H.sheet('report', 'Report this message', `<div class="stack" data-select-group>${['Spam or misleading', 'Abusive or offensive', 'Not relevant to me'].map((r, i) => `<button type="button" class="option ${i === 0 ? 'selected' : ''}" role="radio" aria-checked="${i === 0}" data-select="${r}"><span class="radio" aria-hidden="true"></span>${r}</button>`).join('')}</div><button class="btn block" data-close data-toast="Thanks. We've received your report.">Send report</button><button class="btn block danger" data-close data-toast="You won't see messages from this sender">Block sender</button>`)}</main>`;
  };

  /* 21 Notifications */
  S.notifications = () => `<main class="screen">${H.header('Notifications', 'home.html', `<button class="iconbtn primary" id="mark-read" aria-label="Mark all as read">${I('check', 20)}</button>`)}
    <div class="seg" role="tablist" data-seg-group="nt" style="margin-bottom:12px"><button role="tab" data-seg="all" aria-selected="true">All</button><button role="tab" data-seg="unread" aria-selected="false">Unread · 3</button></div>
    ${['all', 'unread'].map((p) => `<div class="rlist" data-panel-group="nt" data-panel="${p}" ${p === 'unread' ? 'hidden' : ''}>${D.notifications.filter((n) => p === 'all' || n.unread).map((n) => `<a class="ritem ${n.unread ? 'unread' : ''}" href="${n.href}"><span class="disc ${n.icon === 'card' ? 'blue' : n.icon === 'calendar' ? 'orange' : ''}">${I(n.icon, 20)}</span><span class="grow"><p class="t">${e(n.title)}</p><p class="s">${e(n.body)}</p><p class="tiny muted strong" style="margin-top:2px">${e(n.when)}</p></span></a>`).join('')}</div>`).join('')}
    <a class="btn block white sm" style="margin-top:14px" href="profile.html#notif">${I('settings', 18)} Notification settings</a></main>`;

  /* 22 Profile */
  S.profile = () => {
    const prefs = [['New events', true], ['Announcements', true], ['Messages from the Admin', true], ['Payment confirmations', true], ['Event reminders (1 day and 1 hour before)', true], ['Email news round-up', false]];
    const item = (id, ic, t, cls = '') => `<button class="ritem" data-open="${id}" id="${id === 'notif' || id === 'policies' ? id : ''}"><span class="disc ${cls}">${I(ic, 20)}</span><span class="grow t">${t}</span>${I('next', 18)}</button>`;
    return `<main class="screen has-nav"><div class="profile-card">${H.avatar(D.me.name, D.me.initials, 'xl')}<h2>${e(D.me.name)}</h2><p class="small strong muted">${I('pin', 14, 'style="display:inline;vertical-align:-2px;color:var(--blue)"')} ${e(D.me.institution)}</p><p class="small muted">${e(D.me.role)}</p>
    <div class="mini3" style="width:100%;margin-top:10px"><div>${I('ticket', 18)}<b>2</b><span class="s">Tickets</span></div><div>${I('star', 18)}<b>4</b><span class="s">Attended</span></div><div>${I('heart', 18)}<b>${D.me.interests.length}</b><span class="s">Interests</span></div></div>
    <button class="btn block" style="margin-top:10px" data-open="edit"><span class="plus">${I('edit', 14)}</span>Edit profile</button></div>
    <section class="member-card stack" style="margin-top:12px" aria-label="Membership card"><div class="row between"><img class="logo" src="../shared/img/logo-white.png" alt="Lab to Ed Leadership"><span class="pill">Member</span></div><p class="id">${e(D.me.memberId)}</p><div class="row between small"><span>${e(D.me.name)}</span><span>Since ${e(D.me.memberSince)}</span></div></section>
    <div class="rlist" style="margin-top:12px">${item('notif', 'bell', 'Notification preferences')}${item('about', 'info', 'About Lab to Ed Leadership', 'blue')}${item('policies', 'shield', 'Terms, privacy and ticket policy', 'blue')}${item('help', 'mail', 'Contact us and FAQ', 'orange')}</div>
    <div class="rlist" style="margin-top:12px"><button class="ritem" data-toast="We'll email a copy of your data within 24 hours"><span class="disc grey">${I('download', 20)}</span><span class="grow t">Download my data</span></button><button class="ritem" data-open="delete"><span class="disc red">${I('trash', 20)}</span><span class="grow t" style="color:var(--red)">Delete account</span></button><a class="ritem" href="welcome.html"><span class="disc navy">${I('logout', 20)}</span><span class="grow t">Log out</span></a></div>
    <p class="center tiny muted strong" style="margin-top:14px">Version 1.0.3 (prototype)</p>
    ${H.sheet('edit', 'Edit profile', `<label class="field"><span>Full name</span><input value="${e(D.me.name)}"></label><label class="field"><span>Phone</span><input type="tel" value="${e(D.me.phone)}"></label><label class="field"><span>School or institution</span><input value="${e(D.me.institution)}"></label><label class="field"><span>Role</span><input value="${e(D.me.role)}"></label><label class="field"><span>Bio</span><textarea>${e(D.me.bio)}</textarea></label><button class="btn block" data-close data-toast="Profile saved">Save changes</button>`)}
    ${H.sheet('notif', 'Notifications', `<div class="tile stack">${prefs.map(([l, on]) => `<div class="row" style="min-height:48px"><span class="grow strong small">${l}</span><button class="switch" data-toggle aria-pressed="${on}" aria-label="${l}"></button></div>`).join('')}</div><p class="small muted">Ticket and payment emails are always sent.</p><button class="btn block" data-close data-toast="Preferences saved">Save</button>`)}
    ${H.sheet('about', 'About us', `<div class="tile stack"><img src="../shared/img/logo-dark.png" alt="Lab to Ed Leadership" style="height:46px;width:auto"><p>${e(D.org.mission)}</p></div><div class="rlist">${D.org.executives.map((x) => `<div class="ritem">${H.avatar(x.name, ini(x.name), 'sm')}<span class="grow"><p class="t">${e(x.name)}</p><p class="s">${e(x.role)}</p></span></div>`).join('')}</div><p class="small muted strong">${e(D.org.address)}<br>${e(D.org.contactEmail)}</p>`)}
    ${H.sheet('policies', 'Policies', `<div class="tile stack"><h3>No-refund and ticket transfer policy</h3><p class="small">All tickets are non-refundable. Members can transfer a ticket to another member in the app until that event's transfer deadline (usually 48 hours before it starts). The old QR code is cancelled and a new ticket is issued.</p></div><div class="tile stack"><h3>Privacy policy</h3><p class="small">We collect only what we need to run events. Payments are handled by Stripe and we never store card details. You can download or delete your data at any time.</p></div><div class="tile stack"><h3>Terms of service</h3><p class="small">Treat other members with respect, and use tickets only for the named holder.</p></div>`)}
    ${H.sheet('help', 'Contact us', `<a class="btn block white" href="mailto:${D.org.contactEmail}">${I('mail', 18)} ${e(D.org.contactEmail)}</a>${[['Can I get a refund?', 'No, tickets are non-refundable, but members can transfer them.'], ['Does my ticket work offline?', 'Yes. It is saved on your phone.'], ['How much is membership?', 'It is free and gives you 25% off paid events.']].map(([qq, a]) => `<details class="tile"><summary class="strong">${qq}</summary><p class="small muted" style="margin-top:8px">${a}</p></details>`).join('')}`)}
    ${H.sheet('delete', 'Delete your account?', `<div class="tile"><p>This permanently removes your profile and membership. Tickets for upcoming events will be cancelled and can't be refunded.</p></div><a class="btn block danger" href="welcome.html?toast=Your%20account%20has%20been%20deleted">Delete my account</a><button class="btn block white" data-close>Keep my account</button>`)}
    ${H.nav('user')}</main>`;
  };

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
      document.querySelectorAll('[data-pay]').forEach((a) => a.addEventListener('click', (ev) => {
        ev.preventDefault(); const href = a.getAttribute('href');
        P.loading('Confirming your payment…', 'Waiting for your bank. Please don\u2019t close the app.', href);
      }));
    },
    'payment-failed'() { P.timer('[data-hold]', 462); },
    transfer() {
      const g = document.getElementById('who'), b = document.getElementById('tr-btn'), n = document.getElementById('tr-name'), go = document.getElementById('tr-go');
      const base = go.getAttribute('href');
      g.addEventListener('select', (ev) => { b.disabled = false; b.textContent = 'Transfer to ' + ev.detail.split(' ')[0]; n.textContent = ev.detail; go.href = base + '&to=' + encodeURIComponent(ev.detail); });
    },
    notifications() {
      document.getElementById('mark-read').addEventListener('click', () => { document.querySelectorAll('.ritem.unread').forEach((x) => x.classList.remove('unread')); P.toast('All notifications marked as read'); });
    },
    profile() { const h = location.hash.slice(1); if (h === 'policies' || h === 'notif') P.openSheet(h); },
  };

  window.B_SCREENS = S;
  window.B_AFTER = after;
})();
