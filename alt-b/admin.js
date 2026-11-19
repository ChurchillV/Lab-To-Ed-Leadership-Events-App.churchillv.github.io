/* Alternative B – Ref2 · Admin screens, then mount. */
(function () {
  const D = window.L2E, I = P.icon, e = P.esc, m = P.money, q = P.q, H = window.B;
  const S = window.B_SCREENS, after = window.B_AFTER;
  const ev0 = D.events[0];
  const sold = ev0.capacity - ev0.left;
  const ini = (n) => n.replace(/^Dr /, '').split(' ').map((w) => w[0]).join('').slice(0, 2);

  const nav = (active) => {
    const items = [['grid', 'admin-dashboard.html', 'Dashboard'], ['calendar', 'admin-events.html', 'Events'], ['scan', 'admin-scanner.html', 'Scan'], ['megaphone', 'admin-messages.html', 'Messages'], ['users', 'admin-members.html', 'Members']];
    return `<nav class="tabbar admin" aria-label="Admin">${items.map(([ic, href, l]) => `<a href="${href}" ${active === ic ? 'aria-current="page"' : `aria-label="${l}"`}>${I(ic, 22)}<span class="lbl-t">${l}</span></a>`).join('')}</nav>`;
  };
  const stPill = (s) => ({ live: '<span class="pill">Live</span>', draft: '<span class="pill orange">Draft</span>', past: '<span class="pill grey">Past</span>' }[s]);
  const payPill = (p) => p === 'Paid' ? '<span class="pill green">Paid</span>' : p.startsWith('Pending') ? '<span class="pill orange">Pending</span>' : p === 'Failed' ? '<span class="pill red">Failed</span>' : `<span class="pill blue">${e(p)}</span>`;

  /* Revenue chart: two lines (members, non-members) with a tooltip */
  function chart() {
    const a = [22, 30, 26, 44, 38, 52, 47, 66, 58, 74], b = [8, 12, 10, 9, 14, 12, 18, 15, 20, 17];
    const W = 320, Hh = 120, step = W / (a.length - 1);
    const pts = (arr) => arr.map((v, i) => `${(i * step).toFixed(1)},${(Hh - v * 1.4).toFixed(1)}`).join(' ');
    return `<svg class="chart" viewBox="-6 -10 ${W + 12} ${Hh + 30}" role="img" aria-label="Revenue over the last 10 weeks, rising from about £600 to £1,900 a week. Members account for most of it."><polyline points="${pts(b)}" fill="none" stroke="#f78a47" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${pts(a)}" fill="none" stroke="#2570b6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><line x1="${7 * step}" x2="${7 * step}" y1="0" y2="${Hh}" stroke="#c9ccd6" stroke-dasharray="3 4"/><circle cx="${7 * step}" cy="${Hh - 66 * 1.4}" r="6" fill="#1c2c71" stroke="#fff" stroke-width="3"/>${['8 Sep', '', '', '6 Oct', '', '', '3 Nov', '', '', '17 Nov'].map((l, i) => l ? `<text x="${i * step}" y="${Hh + 18}" font-size="11" font-weight="700" fill="#5d6276" text-anchor="${i === 0 ? 'start' : i === 9 ? 'end' : 'middle'}">${l}</text>` : '').join('')}</svg>`;
  }

  /* 23 Dashboard */
  S['admin-dashboard'] = () => `<main class="screen has-nav"><div class="row between"><div class="row">${H.avatar(D.admin.name, D.admin.initials, 'round')}<div><p class="small muted strong">Good morning</p><p style="font-size:18px;font-weight:800">${e(D.admin.first)} <span class="pill navy">Admin</span></p></div></div><a class="btn sm white" href="home.html">${I('eye', 18)} Member view</a></div>
    <div class="bento" style="margin-top:16px"><a class="tile" href="admin-members.html"><span class="disc">${I('users', 20)}</span><p class="lbl" style="margin-top:10px">Members</p><p class="num">${D.stats.members}</p></a><a class="tile" href="admin-attendees.html"><span class="disc">${I('ticket', 20)}</span><p class="lbl" style="margin-top:10px">Registrations</p><p class="num">${D.stats.registrations}</p></a>
    <a class="tile primary span2" href="admin-attendees.html" style="position:relative"><span class="pill navy" style="position:absolute;top:16px;right:16px">November</span><p class="num" style="font-size:38px">${P.moneyAlways(D.stats.revenue)}</p><p class="strong">Revenue this month</p><p class="small strong" style="margin-top:4px">Paid out to Co-operative Bank every Monday</p><div class="prog-dots" aria-hidden="true"><span class="done"></span><span class="done"></span><span class="on">${I('check', 12)}</span><span></span></div></a>
    <section class="tile span2 stack"><div class="row between"><h2>Revenue</h2><span class="pill grey">10 weeks</span></div><div class="legend"><span class="pill blue">● Members</span><span class="pill orange">● Non-members</span></div><div style="position:relative">${chart()}<span class="tooltip" style="position:absolute;left:44%;top:-4px">3 Nov<br>£924 members</span></div></section>
    <a class="tile" href="admin-events.html"><span class="disc blue">${I('calendar', 20)}</span><p class="lbl" style="margin-top:10px">Upcoming</p><p class="num">${D.stats.upcoming}</p><p class="small muted">+1 draft</p></a><a class="tile" href="admin-activity.html"><span class="disc orange">${I('check', 20)}</span><p class="lbl" style="margin-top:10px">Attendance</p><p class="num">${D.stats.attendanceRate}<small>%</small></p><p class="small muted">Last 3 events</p></a></div>
    <div class="section-title"><h2>Next event</h2><a href="admin-events.html">All events</a></div>
    <section class="tile stack"><div class="row"><img src="${ev0.image}" alt="${e(ev0.imageAlt)}" style="width:64px;height:64px;border-radius:20px;object-fit:cover"><div class="grow"><h3>${e(ev0.short)}</h3><p class="small muted strong">${e(ev0.dateShort)} · ${e(ev0.venueShort)}</p></div>${stPill('live')}</div>
    <div class="row between small strong"><span>${sold} / ${ev0.capacity} sold</span><span class="muted">${ev0.left} left</span></div><div class="meter primary"><span style="width:${Math.round(sold / ev0.capacity * 100)}%"></span></div>
    <div class="btn-row"><a class="btn sm white" style="box-shadow:inset 0 0 0 1.5px var(--line)" href="admin-attendees.html">Attendees</a><a class="btn sm" href="admin-scanner.html">${I('scan', 18)} Scanner</a></div></section>
    <div class="section-title"><h2>Shortcuts</h2></div>
    <div class="mini3">${[['plus', 'Create event', 'admin-event-edit.html'], ['megaphone', 'Announce', 'admin-announce.html'], ['send', 'Message', 'admin-messages.html?tab=new'], ['scan', 'Check-in', 'admin-scanner.html'], ['activity', 'Activity log', 'admin-activity.html'], ['settings', 'App settings', 'admin-settings.html']].map(([ic, l, h]) => `<a href="${h}">${I(ic, 22)}${l}</a>`).join('')}</div>
    <div class="section-title"><h2>Top events by sales</h2></div>
    <div class="rlist">${[[ev0, sold], [D.events[2], 16], [D.events[4], 9]].map(([x, n], i) => `<a class="ritem" href="admin-attendees.html?id=${x.id}"><span class="avatar sm c${i + 1}" role="img" aria-label="">${I('calendar', 18)}<span class="rank">${i + 1}</span></span><span class="grow"><p class="t">${e(x.short)}</p><p class="s">${e(x.dateShort)}</p></span><span class="pill">${I('ticket', 12)} ${n} sold</span></a>`).join('')}</div>
    <div class="section-title"><h2>Recent activity</h2><a href="admin-activity.html">Activity log</a></div>
    <div class="rlist">${D.activity.slice(0, 3).map((a) => `<a class="ritem" href="admin-activity.html?entry=${a.id}"><span class="disc grey">${I('activity', 20)}</span><span class="grow"><p class="t">${e(a.action)}</p><p class="s">${e(a.who)} · ${e(a.when.split(', ')[1])}</p></span></a>`).join('')}</div>
    ${nav('grid')}</main>`;

  /* 24 Manage events */
  S['admin-events'] = () => {
    const all = [...D.events, ...D.draftEvents, ...D.pastEvents.map((x) => ({ ...x, capacity: 60, left: 6 }))];
    if (q.published) all.unshift({ ...D.draftEvents[0], id: 'new-event', status: 'live' });
    const tab = q.tab || 'live';
    return `<main class="screen has-nav"><header class="header big"><h1>Events</h1><a class="iconbtn primary" href="admin-event-edit.html" aria-label="Create event">${I('plus')}</a></header>
    <div class="chips" data-filter-group="st">${[['live', 'Live'], ['draft', 'Drafts'], ['past', 'Past'], ['all', 'All']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${tab === v}">${l}</button>`).join('')}</div>
    <div class="stack" style="margin-top:12px">${all.map((x) => { const s = x.capacity - x.left; return `<article class="tile stack" data-filter-item data-tags="${x.status}"><div class="row top"><img src="${x.image}" alt="" style="width:56px;height:56px;border-radius:18px;object-fit:cover"><div class="grow"><h3>${e(x.title)}</h3><p class="small muted strong">${e(x.dateShort)} · ${e(x.venueShort)}</p></div>${stPill(x.status)}</div>
      ${x.status === 'draft' ? '<p class="small strong muted">Not published yet</p>' : `<div><div class="row between small strong"><span>${s} / ${x.capacity} sold</span><span class="muted">${m(x.price)}${x.price ? ` · members ${m(D.memberPrice(x.price))}` : ''}</span></div><div class="meter" style="margin-top:6px"><span style="width:${Math.round(s / x.capacity * 100)}%"></span></div></div>`}
      <div class="btn-row"><a class="btn sm white" style="box-shadow:inset 0 0 0 1.5px var(--line)" href="admin-event-edit.html?id=${x.id}">${I('edit', 16)} Edit</a>${x.status === 'draft' ? `<a class="btn sm" href="admin-events.html?published=1&toast=Event%20published.%20Members%20have%20been%20notified.">Publish</a>` : `<a class="btn sm" href="admin-attendees.html?id=${x.id}">Attendees</a>`}</div></article>`; }).join('')}</div>
    <div class="empty" data-empty hidden>No events here.</div>${nav('calendar')}</main>`;
  };

  /* 25 Create / edit event */
  S['admin-event-edit'] = () => {
    const editing = !!q.id;
    const x = editing ? D.event(q.id) : { title: '', category: 'Workshop', format: 'In person', price: 2500, capacity: 40, venue: '', description: [''], questions: [], status: 'draft' };
    return `<main class="screen has-cta">${H.header(editing ? 'Edit event' : 'New event', 'admin-events.html', editing ? stPill(x.status) : '<span class="pill orange">Draft</span>')}
    <form class="stack" id="ev-form" data-next="admin-events.html?tab=draft&toast=Draft%20saved"><button type="button" class="tile row" style="border:2px dashed #c9ccd6;width:100%;background:transparent" data-toast="Banner image added">${editing ? `<img src="${x.image}" alt="" style="width:64px;height:48px;border-radius:12px;object-fit:cover">` : `<span class="disc">${I('camera', 20)}</span>`}<span class="grow" style="text-align:left"><span class="strong" style="display:block">${editing ? 'Change banner' : 'Add a banner image'}</span><span class="small muted">JPG or PNG, 16:9</span></span></button>
    <section class="tile stack"><h3>Details</h3><label class="field"><span>Title</span><input value="${e(x.title)}" placeholder="e.g. Spring Leadership Retreat" required></label>
    <div class="btn-row"><label class="field"><span>Category</span><select>${['Conference', 'Webinar', 'Workshop', 'Networking'].map((c) => `<option ${c === x.category ? 'selected' : ''}>${c}</option>`).join('')}</select></label><label class="field"><span>Format</span><select><option ${x.format === 'In person' ? 'selected' : ''}>In person</option><option ${x.format === 'Online' ? 'selected' : ''}>Online</option></select></label></div>
    <div class="btn-row"><label class="field"><span>Date</span><input type="date" value="${editing ? '2026-12-05' : '2027-03-20'}"></label><label class="field"><span>Starts</span><input type="time" value="${editing ? (x.time || '10:00').split('–')[0] : '10:00'}"></label></div>
    <label class="field"><span>Venue or online link</span><input value="${e(x.venue || '')}" placeholder="Address or meeting link"></label><label class="field"><span>Description</span><textarea>${e((x.description || []).join('\n\n'))}</textarea></label></section>
    <section class="tile stack"><h3>Price and places</h3><div class="btn-row"><label class="field"><span>Standard price (£)</span><input id="std" type="number" inputmode="decimal" min="0" step="0.5" value="${(x.price / 100).toFixed(2)}"></label><label class="field"><span>Capacity</span><input type="number" min="1" value="${x.capacity || 40}"></label></div>
    <div class="notice primary">${I('tag', 20)}<span>Members pay <b id="mp">${m(D.memberPrice(x.price))}</b> (${D.settings.memberDiscountPct}% off from App settings). Enter 0 for a free event.</span></div><label class="field"><span>Registration deadline</span><input type="datetime-local" value="2026-12-02T23:59"></label></section>
    <section class="tile stack"><h3>Registration questions</h3>${((x.questions || []).length ? x.questions : [{ label: 'Dietary requirements' }]).map((qq) => `<div class="row"><span class="grow small strong">${e(qq.label)}</span><button type="button" class="iconbtn" style="background:var(--surface-2)" data-toast="Question removed" aria-label="Remove question">${I('trash', 18)}</button></div>`).join('')}<button type="button" class="btn sm primary" data-toast="New question added">${I('plus', 16)} Add a question</button></section>
    <section class="tile stack"><h3>Settings for this event</h3><div class="row"><div class="grow"><p class="strong small">Ticket transfer deadline (hours)</p><p class="tiny muted">Default ${D.settings.transferCutoffHours} hours before</p></div><div class="stepper" data-stepper><button type="button" data-step="-1" aria-label="Fewer hours">${I('minus', 16)}</button><input type="number" min="0" max="720" step="12" value="${x.transferCutoffHours == null ? 48 : x.transferCutoffHours}" aria-label="Hours before event" readonly><button type="button" data-step="1" aria-label="More hours">${I('plus', 16)}</button></div></div>
    <div class="row"><div class="grow"><p class="strong small">Reminders</p><p class="tiny muted">1 day and 1 hour before (default)</p></div><button type="button" class="switch" data-toggle aria-pressed="true" aria-label="Send reminders"></button></div></section>
    ${editing ? `<div class="btn-row"><button type="button" class="btn sm white" data-toast="Event unpublished and moved to drafts" data-go="admin-events.html?tab=draft">Unpublish</button><button type="button" class="btn sm danger" data-open="cancel-ev">Cancel event</button></div>` : ''}
    <div class="cta-bar"><button class="btn white" style="flex:1">Save draft</button><a class="btn" style="flex:1.3" href="admin-events.html?published=1&toast=Event%20published.%20Members%20have%20been%20notified.">${editing ? 'Save and publish' : 'Publish'}</a></div></form>
    ${H.sheet('cancel-ev', 'Cancel this event?', `<div class="tile stack"><p>Ticket holders will be told by push notification and email. This is recorded in the activity log.</p></div><div class="notice orange">${I('info', 20)}<span>Whether cancelled tickets are refunded, credited or moved is still to be decided.</span></div><a class="btn block danger" href="admin-events.html?tab=past&toast=Event%20cancelled%20and%20ticket%20holders%20notified">Cancel event</a><button class="btn block white" data-close>Keep event</button>`)}</main>`;
  };

  /* 26 Attendees */
  S['admin-attendees'] = () => {
    const A = D.attendees;
    const tags = (a) => [a.tier === 'Non-member' ? 'non' : 'member', a.payment === 'Paid' ? 'paid' : a.payment.startsWith('Pending') ? 'pending' : a.payment === 'Failed' ? 'failed' : 'comp', a.transfer ? 'transfer' : ''].join('|');
    return `<main class="screen has-nav">${H.header('Attendees', 'admin-events.html', `<button class="iconbtn primary" id="export" aria-label="Export CSV">${I('download', 20)}</button>`)}
    <label class="field"><span class="sr-only">Event</span><select><option>${e(ev0.title)}</option>${D.events.slice(1).map((x) => `<option>${e(x.title)}</option>`).join('')}</select></label>
    <div class="bento" style="margin-top:12px"><div class="tile"><p class="lbl">Sold</p><p class="num">${sold}<small> / ${ev0.capacity}</small></p></div><div class="tile primary"><p class="lbl" >Revenue</p><p class="num">£3,552</p></div></div>
    <div class="search" style="margin-top:12px"><label>${I('search', 20)}<span class="sr-only">Search attendees</span><input type="search" data-search placeholder="Name, email or ticket"></label></div>
    <div class="chips" style="margin-top:8px" data-filter-group="a">${[['all', 'All'], ['member', 'Members'], ['non', 'Non-members'], ['pending', 'Pending'], ['failed', 'Failed'], ['transfer', 'Transfers']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div>
    <p class="small strong muted" style="margin:10px 4px">Showing <span data-count></span> of ${A.length} (sample)</p>
    <div class="rlist">${A.map((a, i) => `<div class="ritem" data-filter-item data-tags="${tags(a)}" style="align-items:flex-start">${H.avatar(a.name, ini(a.name), 'sm')}<div class="grow"><p class="t">${e(a.name)}</p><p class="s ellipsis">${e(a.email)}</p><div class="row wrap" style="gap:6px;margin-top:6px"><span class="pill ${a.tier === 'Non-member' ? 'grey' : ''}">${e(a.tier)}</span>${payPill(a.payment)}${a.transfer ? '<span class="pill navy">Transfer</span>' : ''}</div>${a.transfer ? `<p class="tiny muted" style="margin-top:4px">${e(a.transfer)}</p>` : ''}</div><span class="strong small nowrap">${m(a.amount)}</span></div>`).join('')}</div>
    <div class="empty" data-empty hidden>No attendees match.</div>
    <div class="btn-row" style="margin-top:14px"><a class="btn sm white" href="admin-messages.html?tab=new&to=event">${I('send', 16)} Message all</a><a class="btn sm" href="admin-scanner.html">${I('scan', 16)} Scanner</a></div>${nav('calendar')}</main>`;
  };

  /* 27 Scanner */
  S['admin-scanner'] = () => `<main class="screen has-nav">${H.header('Check-in', 'admin-attendees.html', `<button class="iconbtn" data-toggle aria-pressed="false" aria-label="Torch" data-toast="Torch toggled">${I('flash', 20)}</button>`)}
    <div class="bento" style="margin-bottom:12px"><div class="tile tight"><p class="lbl">Checked in</p><p class="num"><span id="count">0</span><small> / ${sold}</small></p></div><div class="tile tight"><p class="lbl">Event</p><p class="strong">${e(ev0.short)}</p><p class="tiny muted strong">${e(ev0.dateShort)}</p></div></div>
    <div class="scanner" role="img" aria-label="Camera view (simulated) with a QR code frame"><div class="cam"><span class="pill">● Camera</span><span class="pill white">Auto-focus</span></div><div class="ghost-qr">${P.qr('L2E:ghost', 'Simulated QR')}</div><div class="frame"></div><div class="line"></div></div>
    <div class="scan-result" id="result" role="status" aria-live="polite" style="margin-top:12px"><span class="disc grey">${I('qr', 22)}</span><div class="grow"><p class="strong">Ready to scan</p><p class="small">Point the camera at a ticket QR code.</p></div></div>
    <div class="btn-row" style="margin-top:12px"><button class="btn" id="sim">${I('scan', 18)} Simulate</button><button class="btn white" data-open="manual">${I('search', 18)} By name</button></div>
    <p class="tiny muted strong center" style="margin-top:8px">Prototype: each tap shows the next result (valid, already used, transferred, invalid).</p>
    ${H.sheet('manual', 'Manual check-in', `<div class="search"><label>${I('search', 20)}<span class="sr-only">Search attendees</span><input type="search" data-search placeholder="Search by name"></label></div><div class="rlist">${D.attendees.filter((a) => a.ticket !== '—').map((a) => `<div class="ritem" data-filter-item data-tags=""><div class="grow"><p class="t">${e(a.name)}</p><p class="s">${e(a.ticket)} · ${e(a.tier)}</p></div><button class="btn sm primary" data-close data-toast="${e(a.name)} checked in">Check in</button></div>`).join('')}</div>`)}
    ${nav('scan')}</main>`;

  /* 28 Announcement */
  S['admin-announce'] = () => `<main class="screen has-cta">${H.header('Announcement', 'admin-dashboard.html')}
    <form class="stack" id="ann"><section class="tile stack"><label class="field"><span>Title</span><input id="ann-title" value="Mentoring Circle: 4 places left"></label><label class="field"><span>Message</span><textarea id="ann-body">Our first-year middle leaders circle on Tuesday 9 December has just 4 places left. Members pay £9.00. Book in the app.</textarea></label><button type="button" class="btn sm white" style="box-shadow:inset 0 0 0 1.5px var(--line)" data-toast="Attachment added">${I('file', 16)} Add image or PDF</button></section>
    <h3 style="margin:18px 4px 0">Audience</h3><div class="stack" data-select-group id="aud">${[['all', 'All members', '412 people'], ['event', 'Ticket holders of an event', 'Winter Summit 2026 · 97 people'], ['segment', 'Members interested in Coaching', '88 people']].map(([v, l, s], i) => `<button type="button" class="option ${i === 0 ? 'selected' : ''}" role="radio" aria-checked="${i === 0}" data-select="${v}|${s.match(/(\d+) people/)[1]}"><span class="radio" aria-hidden="true"></span><span class="grow"><span class="strong" style="display:block">${l}</span><span class="small muted">${s}</span></span></button>`).join('')}</div>
    <div class="seg" role="tablist" data-seg-group="when" style="margin-top:14px"><button type="button" role="tab" data-seg="now" aria-selected="true">Send now</button><button type="button" role="tab" data-seg="later" aria-selected="false">Schedule</button></div>
    <div data-panel-group="when" data-panel="later" hidden class="btn-row"><label class="field"><span>Date</span><input type="date" value="2026-11-21"></label><label class="field"><span>Time</span><input type="time" value="08:00"></label></div>
    <p class="strong small" style="margin:16px 4px 0">Push notification preview</p><div class="tile row tight"><img src="../shared/img/logo-dark.png" alt="" style="width:44px;height:44px;object-fit:contain;border-radius:12px;background:var(--surface-2)"><div class="grow"><p class="tiny muted strong">Lab to Ed Leadership · now</p><p class="strong small" id="pv-t"></p><p class="small muted ellipsis" id="pv-b"></p></div></div>
    <div class="cta-bar"><button type="button" class="btn" data-open="send-ann" id="ann-send"><span class="plus">${I('send', 12)}</span>Send to 412 people</button></div></form>
    ${H.sheet('send-ann', 'Send announcement?', `<div class="tile"><p id="ann-confirm">It will go to <b>412 members</b> by push notification and appear in their Inbox. Members can't reply.</p></div><button class="btn block" data-open="sent-ann" data-close>Send now</button><button class="btn block white" data-close>Back to editing</button>`)}
    ${H.sheet('sent-ann', 'Announcement sent', `<div class="notice primary">${I('check', 20)}<span>Delivered to members' Inbox. Track reads in Messages.</span></div><a class="btn block" href="admin-messages.html?toast=Announcement%20sent">Done</a><a class="btn block white" href="inbox.html">See the member Inbox</a>`)}</main>`;

  /* 29 Messages */
  S['admin-messages'] = () => {
    const tab = q.tab === 'new' ? 'new' : 'sent';
    const people = D.members.filter((x) => x.role !== 'Admin');
    const pre = D.members.find((x) => x.id === q.to);
    return `<main class="screen has-nav"><header class="header big"><h1>Messages</h1><a class="iconbtn primary" href="admin-announce.html" aria-label="New announcement">${I('megaphone', 20)}</a></header>
    <div class="seg" role="tablist" data-seg-group="msg"><button role="tab" data-seg="sent" aria-selected="${tab === 'sent'}">Sent log</button><button role="tab" data-seg="new" aria-selected="${tab === 'new'}">New message</button></div>
    <div data-panel-group="msg" data-panel="sent" ${tab === 'sent' ? '' : 'hidden'} class="stack" style="margin-top:12px">${D.sentMessages.map((x) => `<button class="tile stack" style="border:0;width:100%;text-align:left" data-open="sm-${x.id}"><div class="row between"><span class="pill ${x.kind === 'Direct message' ? 'navy' : x.kind === 'Event update' ? 'blue' : ''}">${e(x.kind)}</span>${x.scheduled ? '<span class="pill orange">Scheduled</span>' : `<span class="num" style="font-size:22px">${Math.round(x.read / x.delivered * 100)}<small>% read</small></span>`}</div><h3>${e(x.title)}</h3><p class="small muted strong">${e(x.audience)} · ${e(x.sent)}</p>${x.scheduled ? '' : `<div class="meter primary"><span style="width:${Math.round(x.read / x.delivered * 100)}%"></span></div><p class="tiny muted strong">${x.delivered} delivered · ${x.read} read</p>`}</button>`).join('')}</div>
    <form data-panel-group="msg" data-panel="new" ${tab === 'new' ? '' : 'hidden'} class="stack" style="margin-top:12px"><div class="seg" role="tablist" data-seg-group="to"><button type="button" role="tab" data-seg="one" aria-selected="${q.to !== 'event'}">One member</button><button type="button" role="tab" data-seg="ev" aria-selected="${q.to === 'event'}">Ticket holders</button></div>
    <section class="tile stack"><div data-panel-group="to" data-panel="one" ${q.to === 'event' ? 'hidden' : ''}><label class="field"><span>Member</span><select>${people.map((p) => `<option ${pre && pre.id === p.id ? 'selected' : ''}>${e(p.name)} (${e(p.email)})</option>`).join('')}</select></label></div>
    <div data-panel-group="to" data-panel="ev" ${q.to === 'event' ? '' : 'hidden'}><label class="field"><span>Event</span><select>${D.events.map((x) => `<option>${e(x.title)}</option>`).join('')}</select></label><p class="small muted" style="margin-top:6px">97 ticket holders will get this as an event update.</p></div>
    <label class="field"><span>Subject</span><input value="${pre ? 'A quick note' : 'Venue access for 5 December'}"></label><label class="field"><span>Message</span><textarea>${pre ? `Hi ${e(pre.name.split(' ')[0])}, ` : ''}The Studio entrance is on Lever Street. Step-free access is via the lift on the ground floor.</textarea></label><button type="button" class="btn sm white" style="box-shadow:inset 0 0 0 1.5px var(--line)" data-toast="PDF attached">${I('file', 16)} Attach image or PDF</button></section>
    <div class="notice">${I('info', 20)}<span>Messages are one way. Members can't reply.</span></div><button type="button" class="btn block" data-open="dm-sent"><span class="plus">${I('send', 12)}</span>Send message</button></form>
    ${D.sentMessages.map((x) => H.sheet('sm-' + x.id, e(x.title), `<p class="small muted strong">${e(x.kind)} · ${e(x.audience)} · ${e(x.sent)}</p>${x.scheduled ? `<div class="notice orange">${I('clock', 20)}<span>Scheduled. It will send automatically.</span></div><button class="btn block danger" data-close data-toast="Scheduled message cancelled">Cancel scheduled send</button>` : `<div class="bento"><div class="tile"><p class="lbl">Delivered</p><p class="num">${x.delivered}</p></div><div class="tile primary"><p class="lbl" >Read</p><p class="num">${x.read}</p></div></div><a class="btn block white" href="message.html?id=${{ s1: 'm1', s2: 'm2', s4: 'm3', s5: 'm4' }[x.id]}">View message</a>`}`)).join('')}
    ${H.sheet('dm-sent', 'Message sent', `<div class="notice primary">${I('check', 20)}<span>Delivered by push notification and added to their Inbox.</span></div><a class="btn block" href="message.html?id=m1">View message</a><a class="btn block white" href="admin-messages.html?toast=Message%20sent">Back to sent log</a>`)}
    ${nav('megaphone')}</main>`;
  };

  /* 30 Members and settings */
  const tabs = (cur) => `<div class="seg" style="margin-bottom:12px"><a href="admin-members.html" ${cur === 'm' ? 'aria-current="page"' : ''}>Members</a><a href="admin-settings.html" ${cur === 's' ? 'aria-current="page"' : ''}>App settings</a></div>`;
  S['admin-members'] = () => `<main class="screen has-nav"><header class="header"><h1>Members and settings</h1><button class="iconbtn primary" id="export-m" aria-label="Export members">${I('download', 20)}</button></header>${tabs('m')}
    <div class="bento" style="margin-bottom:12px"><div class="tile tight"><span class="disc sm">${I('users', 18)}</span><p class="num" style="margin-top:8px">${D.stats.members}</p><p class="lbl">members</p></div><div class="tile tight"><span class="disc sm blue">${I('plus', 18)}</span><p class="num" style="margin-top:8px">${D.stats.newMembers}</p><p class="lbl">joined this month</p></div></div>
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search members</span><input type="search" data-search placeholder="Name, email or school"></label></div>
    <div class="chips" style="margin-top:8px" data-filter-group="r">${[['all', 'All'], ['Member', 'Members'], ['Admin', 'Admins']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div>
    <div class="rlist" style="margin-top:10px">${D.members.map((p, i) => `<button class="ritem" data-open="mem-${p.id}" data-filter-item data-tags="${p.role}">${H.avatar(p.name, p.initials, 'sm')}<span class="grow"><p class="t">${e(p.name)}</p><p class="s ellipsis">${e(p.institution)}</p></span>${p.role === 'Admin' ? '<span class="pill navy">Admin</span>' : `<span class="pill">${I('ticket', 12)} ${p.events}</span>`}</button>`).join('')}</div>
    <div class="empty" data-empty hidden>No members match.</div>
    <a class="btn block white sm" style="margin-top:14px" href="admin-activity.html">${I('activity', 16)} Activity log</a>
    ${D.members.map((p) => H.sheet('mem-' + p.id, e(p.name), `<div class="tile"><p class="small muted strong">${e(p.email)}<br>${e(p.institution)}<br>Joined ${e(p.joined)} · ${p.events} events</p></div><p class="strong small">Role</p><div class="stack" data-select-group>${['Member', 'Admin'].map((r) => `<button type="button" class="option ${p.role === r ? 'selected' : ''}" role="radio" aria-checked="${p.role === r}" data-select="${r}"><span class="radio" aria-hidden="true"></span>${r}</button>`).join('')}<button type="button" class="option" disabled style="opacity:.55"><span class="radio" aria-hidden="true"></span>Event Coordinator <span class="pill grey">Coming later</span></button></div><button class="btn block" data-close data-toast="Role saved and recorded in the activity log">Save role</button><a class="btn block white" href="admin-messages.html?tab=new&to=${p.id}">${I('send', 16)} Send a message</a>`)).join('')}
    ${nav('users')}</main>`;

  S['admin-settings'] = () => {
    const st = D.settings;
    const stepper = (id, v, min, max, step, unit, label) => `<div class="stepper" data-stepper><button type="button" data-step="-1" aria-label="Decrease ${label}">${I('minus', 16)}</button><input id="${id}" type="number" min="${min}" max="${max}" step="${step}" value="${v}" aria-label="${label} (${unit})" readonly><button type="button" data-step="1" aria-label="Increase ${label}">${I('plus', 16)}</button></div>`;
    const block = (ic, cls, title, sub, ctrl) => `<section class="tile stack"><div class="row"><span class="disc ${cls}">${I(ic, 20)}</span><div class="grow"><p class="strong">${title}</p><p class="small muted">${sub}</p></div></div>${ctrl}</section>`;
    return `<main class="screen has-nav"><header class="header"><h1>Members and settings</h1></header>${tabs('s')}
    <div class="notice primary">${I('flash', 20)}<span>Changes apply straight away, with no app update, and are recorded in the activity log.</span></div>
    <div class="stack" style="margin-top:12px">
    ${block('transfer', '', 'Ticket transfer deadline', 'Hours before an event when transfers close. Can be changed per event.', `<div class="row between"><span class="pill grey">Tickets</span>${stepper('s1', st.transferCutoffHours, 0, 720, 12, 'hours', 'transfer deadline')}</div>`)}
    ${block('clock', 'blue', 'Seat hold during checkout', 'Minutes a place is held while someone pays (5 to 30).', `<div class="row between"><span class="pill grey">Checkout</span>${stepper('s2', st.seatHoldMinutes, 5, 30, 1, 'minutes', 'seat hold')}</div>`)}
    ${block('tag', 'orange', 'Member discount', 'Percentage off the standard price, copied to each new event.', `<div class="row between"><span class="pill grey">Pricing</span>${stepper('s3', st.memberDiscountPct, 0, 100, 5, 'percent', 'member discount')}</div>`)}
    ${block('bell', '', 'Event reminder times', 'Hours before an event. Can be changed per event.', `<div class="row wrap" style="gap:6px"><span class="pill">24 hours</span><span class="pill">1 hour</span><button type="button" class="chip" style="min-height:36px;background:var(--surface-2)" data-toast="Reminder time added">${I('plus', 14)} Add</button></div>`)}
    <section class="tile navy stack"><div class="row"><span class="disc">${I('card', 20)}</span><div class="grow"><p class="strong">Stripe connected</p><p class="small" style="color:#cfd6f0">Payouts to ${e(D.org.stripe.account)}, ${e(D.org.stripe.payouts.toLowerCase())}. Card details are never stored in the app.</p></div></div><span class="pill" style="align-self:flex-start">Active</span></section></div>
    <button class="btn block" style="margin-top:16px" data-toast="Settings saved and recorded in the activity log">Save settings</button>
    ${nav('users')}</main>`;
  };

  /* 31 Activity log */
  S['admin-activity'] = () => {
    const cats = ['all', 'Accounts', 'Payments', 'Tickets', 'Events', 'Messages', 'Settings', 'Roles'];
    const days = [...new Set(D.activity.map((a) => a.day))];
    const people = [...new Set(D.activity.map((a) => a.who))];
    const evs = [...new Set(D.activity.map((a) => a.event).filter((x) => x !== '—'))];
    const slug = (s) => s.replace(/\W+/g, '-');
    const icon = { Accounts: ['user', ''], Payments: ['card', 'blue'], Tickets: ['ticket', ''], Events: ['calendar', 'orange'], Messages: ['megaphone', 'blue'], Settings: ['settings', 'navy'], Roles: ['shield', 'navy'] };
    return `<main class="screen has-nav">${H.header('Activity log', 'admin-dashboard.html', `<button class="iconbtn primary" id="export-log" aria-label="Export CSV">${I('download', 20)}</button>`)}
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search activity</span><input type="search" data-search placeholder="Who, what or ticket number"></label><button class="iconbtn navy" data-open="log-filters" aria-label="Filter by date, person and event">${I('sliders')}</button></div>
    <div class="chips" style="margin-top:8px" data-filter-group="cat">${cats.map((c) => `<button class="chip" data-filter="${c}" aria-pressed="${c === 'all'}">${c === 'all' ? 'All' : c}</button>`).join('')}</div>
    <div class="notice" style="margin-top:10px">${I('lock', 18)}<span class="small"><b><span data-count></span> entries</b>, newest first. Entries are permanent and can't be edited or deleted.</span></div>
    ${days.map((d) => `<section data-filter-section><p class="day">${e(d)}</p><div class="rlist">${D.activity.filter((a) => a.day === d).map((a) => `<button class="ritem" data-open="log-${a.id}" data-filter-item data-tags="${a.cat}|p-${slug(a.who)}|e-${slug(a.event)}|${d === 'Today' ? 'today' : ''}|${['Today', 'Yesterday', '17 November', '16 November', '15 November', '14 November'].includes(d) ? 'week' : ''}" style="align-items:flex-start"><span class="disc sm ${icon[a.cat][1]}">${I(icon[a.cat][0], 18)}</span><span class="grow"><span class="row between" style="gap:8px"><span class="t">${e(a.action)}</span><span class="tiny muted strong nowrap">${e(a.when.split(', ')[1])}</span></span><p class="s">${e(a.summary)}</p><p class="tiny muted strong">${e(a.who)}</p></span></button>`).join('')}</div></section>`).join('')}
    <div class="empty" data-empty hidden>No activity matches these filters.</div>
    ${H.sheet('log-filters', 'Filter activity', `<div class="tile stack"><p class="strong">Date</p><div class="row wrap" style="gap:8px" data-filter-group="date">${[['all', 'Any time'], ['today', 'Today'], ['week', 'Last 7 days']].map(([v, l]) => `<button class="chip" style="background:var(--surface-2)" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div></div>
    <div class="tile stack"><p class="strong">Person</p><div class="row wrap" style="gap:8px" data-filter-group="who"><button class="chip" style="background:var(--surface-2)" data-filter="all" aria-pressed="true">Anyone</button>${people.map((p) => `<button class="chip" style="background:var(--surface-2)" data-filter="p-${slug(p)}" aria-pressed="false">${e(p)}</button>`).join('')}</div></div>
    <div class="tile stack"><p class="strong">Event</p><div class="row wrap" style="gap:8px" data-filter-group="ev"><button class="chip" style="background:var(--surface-2)" data-filter="all" aria-pressed="true">Any event</button>${evs.map((p) => `<button class="chip" style="background:var(--surface-2)" data-filter="e-${slug(p)}" aria-pressed="false">${e(p)}</button>`).join('')}</div></div><button class="btn block" data-close>Show results</button>`)}
    ${D.activity.map((a) => H.sheet('log-' + a.id, e(a.action), `<div class="tile"><dl class="kv"><div><dt>When</dt><dd>${e(a.when)}</dd></div><div><dt>Who</dt><dd>${e(a.who)}</dd></div><div><dt>Category</dt><dd>${e(a.cat)}</dd></div><div><dt>Event</dt><dd>${e(a.event)}</dd></div><div><dt>Device</dt><dd>${e(a.ip)}</dd></div><div><dt>Entry ID</dt><dd>LOG-${a.id.slice(1).padStart(6, '0')}</dd></div><div style="grid-column:span 2"><dt>Details</dt><dd>${e(a.summary)}</dd></div></dl></div><div class="notice">${I('lock', 20)}<span>Log entries are permanent and can't be edited or deleted.</span></div>`)).join('')}
    ${nav('grid')}</main>`;
  };

  /* Chip backgrounds inside tiles need the pressed state to win */
  const style = document.createElement('style');
  style.textContent = '.tile .chip[aria-pressed="true"]{background:var(--primary)!important;color:#fff}';
  document.head.appendChild(style);

  Object.assign(after, {
    'admin-event-edit'() { const std = document.getElementById('std'), mp = document.getElementById('mp'); std.addEventListener('input', () => { mp.textContent = m(D.memberPrice(Math.round((+std.value || 0) * 100))); }); },
    'admin-attendees'() { document.getElementById('export').addEventListener('click', () => { P.csv('winter-summit-attendees.csv', [['Name', 'Email', 'Type', 'Ticket', 'Amount', 'Payment', 'Transfer'], ...D.attendees.map((a) => [a.name, a.email, a.tier, a.ticket, P.moneyAlways(a.amount), a.payment, a.transfer || ''])]); P.toast('Attendee list exported (CSV)'); }); },
    'admin-scanner'() {
      const R = [['valid', 'check', 'Valid: Kwame Asante', 'Member ticket T-55D0E1. Checked in at 09:41.'], ['used', 'clock', 'Already used', 'Amara Okafor’s ticket T-7F3A21 was scanned at 09:38.'], ['transferred', 'transfer', 'Transferred ticket', 'Old code T-81C2A0 went to Kwame Asante. Ask for the new ticket.'], ['invalid', 'x', 'Invalid code', 'This QR code isn’t a ticket for Winter Summit 2026.']];
      let i = 0, n = 0;
      const box = document.getElementById('result'), c = document.getElementById('count');
      document.getElementById('sim').addEventListener('click', () => {
        const [cls, ic, t, s] = R[i++ % R.length];
        box.className = 'scan-result ' + cls;
        box.innerHTML = `<span class="disc">${I(ic, 22)}</span><div class="grow"><p class="strong">${t}</p><p class="small">${s}</p></div>`;
        if (cls === 'valid') c.textContent = ++n;
        if (navigator.vibrate) navigator.vibrate(cls === 'valid' ? 40 : [60, 40, 60]);
      });
    },
    'admin-announce'() {
      const t = document.getElementById('ann-title'), b = document.getElementById('ann-body');
      const up = () => { document.getElementById('pv-t').textContent = t.value || 'Title'; document.getElementById('pv-b').textContent = b.value || 'Message'; };
      t.addEventListener('input', up); b.addEventListener('input', up); up();
      document.getElementById('aud').addEventListener('select', (ev) => {
        const n = ev.detail.split('|')[1];
        document.getElementById('ann-send').innerHTML = `<span class="plus">${I('send', 12)}</span>Send to ${n} people`;
        document.getElementById('ann-confirm').innerHTML = `It will go to <b>${n} people</b> by push notification and appear in their Inbox. Members can't reply.`;
      });
    },
    'admin-members'() { document.getElementById('export-m').addEventListener('click', () => { P.csv('members.csv', [['Name', 'Email', 'Institution', 'Role', 'Joined'], ...D.members.map((p) => [p.name, p.email, p.institution, p.role, p.joined])]); P.toast('Member directory exported (CSV)'); }); },
    'admin-activity'() {
      document.getElementById('export-log').addEventListener('click', () => {
        const rows = [...document.querySelectorAll('[data-filter-item]:not([hidden])')].map((el) => D.activity.find((a) => 'log-' + a.id === el.dataset.open));
        P.csv('activity-log.csv', [['When', 'Who', 'Category', 'Action', 'Summary', 'Event'], ...rows.map((a) => [a.when, a.who, a.cat, a.action, a.summary, a.event])]);
        P.toast(`Exported ${rows.length} entries (CSV)`);
      });
      if (q.entry) P.openSheet('log-' + q.entry);
    },
  });

  P.mount(S, after);
})();
