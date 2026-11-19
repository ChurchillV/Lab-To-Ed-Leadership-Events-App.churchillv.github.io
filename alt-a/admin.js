/* Alternative A – Ref1 · Admin screens, then mount. */
(function () {
  const D = window.L2E, I = P.icon, e = P.esc, m = P.money, q = P.q, H = window.A;
  const S = window.A_SCREENS, after = window.A_AFTER;
  const ev0 = D.events[0];
  const sold = ev0.capacity - ev0.left;

  const nav = (active) => {
    const items = [['grid', 'admin-dashboard.html', 'Dashboard'], ['calendar', 'admin-events.html', 'Manage events'], ['scan', 'admin-scanner.html', 'Check-in scanner'], ['megaphone', 'admin-messages.html', 'Messages'], ['users', 'admin-members.html', 'Members and settings']];
    return `<nav class="tabbar admin" aria-label="Admin">${items.map(([ic, href, l]) => `<a href="${href}" ${active === ic ? 'aria-current="page"' : ''}>${I(ic, 22)}<span class="lbl">${l}</span></a>`).join('')}</nav>`;
  };
  const adminTag = '<span class="badge dark">Admin</span>';
  const statusBadge = (s) => ({ live: '<span class="badge green">Live</span>', draft: '<span class="badge amber">Draft</span>', past: '<span class="badge">Past</span>' }[s]);
  const payBadge = (p) => p === 'Paid' ? '<span class="badge green">Paid</span>' : p.startsWith('Pending') ? '<span class="badge amber">Pending</span>' : p === 'Failed' ? '<span class="badge red">Failed</span>' : `<span class="badge blue">${e(p)}</span>`;

  /* 23 Admin dashboard */
  S['admin-dashboard'] = () => `<main class="screen has-nav"><div class="row between"><div class="row">${H.avatar(D.admin.name, D.admin.initials)}<div><p class="small muted">Good morning</p><p class="strong">${e(D.admin.first)} ${adminTag}</p></div></div><a class="btn sm light" href="home.html">${I('eye', 18)} Member view</a></div>
    <div class="spectrum" style="margin:16px 0 4px" aria-hidden="true"></div>
    <div class="section-title" style="margin-top:14px"><h2>This month</h2><span class="small muted">November 2026</span></div>
    <div class="stat-grid"><a class="stat hero-stat" href="admin-attendees.html"><span class="k">${I('card', 16)} Revenue (paid out to Co-operative Bank)</span><span class="v">${P.moneyAlways(D.stats.revenue)}</span><span class="d">+18% on October</span><span class="bars" aria-hidden="true">${[30, 45, 38, 60, 52, 70, 64, 82, 76, 95].map((h, i) => `<span class="${i === 9 ? 'on' : ''}" style="height:${h}%"></span>`).join('')}</span></a>
    <a class="stat" href="admin-members.html"><span class="k">${I('users', 16)} Members</span><span class="v">${D.stats.members}</span><span class="d">+${D.stats.newMembers} this month</span></a>
    <a class="stat" href="admin-attendees.html"><span class="k">${I('ticket', 16)} Registrations</span><span class="v">${D.stats.registrations}</span><span class="d">+24 this week</span></a>
    <a class="stat" href="admin-events.html"><span class="k">${I('calendar', 16)} Upcoming events</span><span class="v">${D.stats.upcoming}</span><span class="small muted">1 draft</span></a>
    <a class="stat" href="admin-activity.html"><span class="k">${I('check', 16)} Attendance rate</span><span class="v">${D.stats.attendanceRate}%</span><span class="small muted">Last 3 events</span></a></div>
    <div class="section-title"><h2>Next event</h2><a href="admin-events.html">All events</a></div>
    <section class="card stack"><div class="row"><img src="${ev0.image}" alt="${e(ev0.imageAlt)}" style="width:64px;height:64px;border-radius:16px;object-fit:cover"><div class="grow"><p class="strong">${e(ev0.short)}</p><p class="small muted">${e(ev0.dateShort)} · ${e(ev0.venueShort)}</p></div>${statusBadge('live')}</div>
    <div class="row between small"><span>${sold} of ${ev0.capacity} sold</span><span class="muted">${ev0.left} left</span></div><div class="progress"><span style="width:${Math.round(sold / ev0.capacity * 100)}%"></span></div>
    <div class="btn-row"><a class="btn sm light" href="admin-attendees.html">${I('list', 18)} Attendees</a><a class="btn sm" href="admin-scanner.html">${I('scan', 18)} Scanner</a></div></section>
    <div class="section-title"><h2>Shortcuts</h2></div>
    <div class="shortcuts">${[['plus', 'Create event', 'admin-event-edit.html', ''], ['megaphone', 'Announcement', 'admin-announce.html', 'blue'], ['send', 'Message', 'admin-messages.html?tab=new', 'lime'], ['scan', 'Check-in', 'admin-scanner.html', 'orange'], ['users', 'Members', 'admin-members.html', 'blue'], ['activity', 'Activity log', 'admin-activity.html', ''], ['settings', 'App settings', 'admin-settings.html', 'lime'], ['calendar', 'Events', 'admin-events.html', 'orange'], ['list', 'Attendees', 'admin-attendees.html', '']].map(([ic, l, h, c]) => `<a class="shortcut" href="${h}"><span class="ico-wrap ${c}">${I(ic, 20)}</span>${l}</a>`).join('')}</div>
    <div class="section-title"><h2>Recent activity</h2><a href="admin-activity.html">Activity log</a></div>
    <div class="list">${D.activity.slice(0, 3).map((a) => `<a class="item" href="admin-activity.html?entry=${a.id}"><span class="ico-wrap">${I('activity', 20)}</span><span class="grow"><p class="t">${e(a.action)}</p><p class="s">${e(a.who)} · ${e(a.when.split(', ')[1])}</p></span></a>`).join('')}</div>
    ${nav('grid')}</main>`;

  /* 24 Manage events */
  S['admin-events'] = () => {
    const all = [...D.events.map((x) => ({ ...x })), ...D.draftEvents, ...D.pastEvents.map((x) => ({ ...x, capacity: 60, left: 6 }))];
    if (q.published) all.unshift({ ...D.draftEvents[0], id: 'new-event', title: 'Spring Leadership Retreat', status: 'live' });
    const tab = q.tab || 'live';
    return `<main class="screen has-nav"><header class="header left"><h1>Manage events</h1><a class="iconbtn rust" href="admin-event-edit.html" aria-label="Create event">${I('plus')}</a></header>
    <div class="chips" data-filter-group="st">${[['live', 'Live'], ['draft', 'Drafts'], ['past', 'Past'], ['all', 'All']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${tab === v}">${l}</button>`).join('')}</div>
    <div class="stack" style="margin-top:14px">${all.map((x) => { const s = x.capacity - x.left; return `<article class="card stack" data-filter-item data-tags="${x.status}"><div class="row top"><img src="${x.image}" alt="" style="width:56px;height:56px;border-radius:14px;object-fit:cover"><div class="grow"><p class="strong">${e(x.title)}</p><p class="small muted">${e(x.dateShort)} · ${e(x.venueShort)}</p></div>${statusBadge(x.status)}</div>
      <div class="row between small"><span>${x.status === 'draft' ? 'Not published' : `${s} / ${x.capacity} sold`}</span><span class="muted">${m(x.price)} standard${x.price ? ` · ${m(D.memberPrice(x.price))} members` : ''}</span></div>
      <div class="btn-row"><a class="btn sm light" href="admin-event-edit.html?id=${x.id}">${I('edit', 16)} Edit</a>${x.status === 'draft' ? `<a class="btn sm" href="admin-events.html?published=1&toast=Event%20published.%20Members%20have%20been%20notified.">Publish</a>` : `<a class="btn sm light" href="admin-attendees.html?id=${x.id}">${I('users', 16)} Attendees</a>`}</div></article>`; }).join('')}</div>
    <div class="empty" data-empty hidden>No events here.</div>
    ${nav('calendar')}</main>`;
  };

  /* 25 Create / edit event */
  S['admin-event-edit'] = () => {
    const editing = !!q.id;
    const x = editing ? D.event(q.id) : { title: '', category: 'Workshop', format: 'In person', price: 2500, capacity: 40, venue: '', description: [''], questions: [], status: 'draft' };
    const ov = x.transferCutoffHours != null && x.transferCutoffHours !== D.settings.transferCutoffHours;
    return `<main class="screen has-cta">${H.header(editing ? 'Edit event' : 'Create event', 'admin-events.html')}
    <form class="stack-lg" id="ev-form" data-next="admin-events.html?tab=draft&toast=Draft%20saved"><button type="button" class="card row" style="border:2px dashed var(--line);box-shadow:none;width:100%" data-toast="Banner image added">${editing ? `<img src="${x.image}" alt="" style="width:64px;height:48px;border-radius:10px;object-fit:cover">` : `<span class="ico-wrap">${I('camera', 20)}</span>`}<span class="grow" style="text-align:left"><span class="strong" style="display:block">${editing ? 'Change banner' : 'Add a banner image'}</span><span class="small muted">JPG or PNG, 16:9</span></span></button>
    <label class="field"><span>Title</span><input value="${e(x.title)}" placeholder="e.g. Spring Leadership Retreat" required></label>
    <div class="btn-row"><label class="field"><span>Category</span><select>${['Conference', 'Webinar', 'Workshop', 'Networking'].map((c) => `<option ${c === x.category ? 'selected' : ''}>${c}</option>`).join('')}</select></label><label class="field"><span>Format</span><select><option ${x.format === 'In person' ? 'selected' : ''}>In person</option><option ${x.format === 'Online' ? 'selected' : ''}>Online</option></select></label></div>
    <div class="btn-row"><label class="field"><span>Date</span><input type="date" value="${editing ? '2026-12-05' : '2027-03-20'}"></label><label class="field"><span>Starts</span><input type="time" value="${editing ? (x.time || '10:00').split('–')[0] : '10:00'}"></label></div>
    <label class="field"><span>Venue or online link</span><input value="${e(x.venue || '')}" placeholder="Address or meeting link"></label>
    <label class="field"><span>Description</span><textarea placeholder="What will people get from it?">${e((x.description || []).join('\n\n'))}</textarea></label>
    <section class="card stack"><h3>Price and places</h3><div class="btn-row"><label class="field"><span>Standard price (£)</span><input id="std" type="number" inputmode="decimal" min="0" step="0.5" value="${(x.price / 100).toFixed(2)}"></label><label class="field"><span>Capacity</span><input type="number" min="1" value="${x.capacity || 40}"></label></div>
    <div class="notice green">${I('tag', 20)}<span>Members pay <b id="mp">${m(D.memberPrice(x.price))}</b> (${D.settings.memberDiscountPct}% off, set in App settings). Enter 0 for a free event.</span></div>
    <label class="field"><span>Registration deadline</span><input type="datetime-local" value="2026-12-02T23:59"></label></section>
    <section class="card stack"><h3>Registration questions</h3>${((x.questions || []).length ? x.questions : [{ label: 'Dietary requirements' }]).map((qq) => `<div class="row"><span class="grow small">${e(qq.label)}</span><button type="button" class="iconbtn" data-toast="Question removed" aria-label="Remove question">${I('trash', 18)}</button></div>`).join('')}<button type="button" class="btn sm light" data-toast="New question added">${I('plus', 16)} Add a question</button></section>
    <section class="card stack"><h3>Settings for this event</h3><p class="small muted">Leave these on the default to follow App settings.</p>
    <div class="row"><div class="grow"><p class="strong small">Ticket transfer deadline</p><p class="tiny muted">Default: ${D.settings.transferCutoffHours} hours before the start</p></div><div class="stepper" data-stepper><button type="button" data-step="-1" aria-label="Fewer hours">${I('minus', 16)}</button><input type="number" min="0" max="720" step="12" value="${x.transferCutoffHours == null ? 48 : x.transferCutoffHours}" aria-label="Hours before event" readonly><button type="button" data-step="1" aria-label="More hours">${I('plus', 16)}</button></div></div>
    ${ov ? '<span class="badge amber">Overrides the default</span>' : ''}
    <div class="row"><div class="grow"><p class="strong small">Reminders</p><p class="tiny muted">1 day and 1 hour before (default)</p></div><button type="button" class="switch" data-toggle aria-pressed="true" aria-label="Send reminders"></button></div></section>
    ${editing ? `<div class="btn-row"><button type="button" class="btn sm light" data-toast="Event unpublished and moved to drafts" data-go="admin-events.html?tab=draft">Unpublish</button><button type="button" class="btn sm danger" data-open="cancel-ev">Cancel event</button></div>` : ''}
    <div class="cta-bar"><button class="btn light" style="flex:1">Save draft</button><a class="btn" href="admin-events.html?published=1&toast=Event%20published.%20Members%20have%20been%20notified." style="flex:1.3">${editing ? 'Save and publish' : 'Publish'}</a></div></form>
    ${H.sheet('cancel-ev', 'Cancel this event?', `<p>Ticket holders will be told by push notification and email. This is recorded in the activity log.</p><div class="notice amber">${I('info', 20)}<span>Whether cancelled tickets are refunded, credited or moved is still to be decided by the organisation.</span></div><a class="btn block danger" href="admin-events.html?tab=past&toast=Event%20cancelled%20and%20ticket%20holders%20notified">Cancel event</a><button class="btn block light" data-close>Keep event</button>`)}</main>`;
  };

  /* 26 Attendees */
  S['admin-attendees'] = () => {
    const A = D.attendees;
    const tags = (a) => [a.tier === 'Non-member' ? 'non' : 'member', a.payment === 'Paid' ? 'paid' : a.payment.startsWith('Pending') ? 'pending' : a.payment === 'Failed' ? 'failed' : 'comp', a.transfer ? 'transfer' : ''].join('|');
    return `<main class="screen has-nav">${H.header('Attendees', 'admin-events.html', `<button class="iconbtn" id="export" aria-label="Export CSV">${I('download', 20)}</button>`)}
    <label class="field"><span class="sr-only">Event</span><select><option>${e(ev0.title)}</option>${D.events.slice(1).map((x) => `<option>${e(x.title)}</option>`).join('')}</select></label>
    <div class="stat-grid" style="margin-top:14px"><div class="stat"><span class="k">Tickets sold</span><span class="v">${sold}<span class="small muted"> / ${ev0.capacity}</span></span></div><div class="stat"><span class="k">Revenue</span><span class="v">£3,552</span><span class="small muted">82 member · 15 standard</span></div></div>
    <div class="search" style="margin-top:14px"><label>${I('search', 20)}<span class="sr-only">Search attendees</span><input type="search" data-search placeholder="Search name, email or ticket"></label></div>
    <div class="chips" style="margin-top:10px" data-filter-group="a">${[['all', 'All'], ['member', 'Members'], ['non', 'Non-members'], ['pending', 'Pending'], ['failed', 'Failed'], ['transfer', 'Transfers']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div>
    <p class="small muted" style="margin:10px 4px">Showing <span data-count></span> of ${A.length} (sample)</p>
    <div class="list">${A.map((a) => `<div class="table-row" data-filter-item data-tags="${tags(a)}">${H.avatar(a.name, a.name.split(' ').map((w) => w[0]).join(''), 'sm')}<div class="grow"><p class="strong small">${e(a.name)}</p><p class="tiny muted ellipsis">${e(a.email)} · ${e(a.ticket)}</p><div class="row wrap" style="gap:6px;margin-top:4px"><span class="badge ${a.tier === 'Non-member' ? '' : 'rust'}">${e(a.tier)}</span>${payBadge(a.payment)}${a.transfer ? `<span class="badge blue">${I('transfer', 12)} Transfer</span>` : ''}</div>${a.transfer ? `<p class="tiny muted" style="margin-top:4px">${e(a.transfer)}</p>` : ''}</div><span class="small strong nowrap">${m(a.amount)}</span></div>`).join('')}</div>
    <div class="empty" data-empty hidden>No attendees match.</div>
    <div class="btn-row" style="margin-top:16px"><a class="btn sm light" href="admin-messages.html?tab=new&to=event">${I('send', 16)} Message holders</a><a class="btn sm" href="admin-scanner.html">${I('scan', 16)} Check-in scanner</a></div>
    ${nav('calendar')}</main>`;
  };

  /* 27 Check-in scanner */
  S['admin-scanner'] = () => `<main class="screen has-nav">${H.header('Check-in', 'admin-attendees.html', `<button class="iconbtn" data-toggle aria-pressed="false" aria-label="Torch" data-toast="Torch toggled">${I('flash', 20)}</button>`)}
    <p class="small muted center" style="margin-top:-8px;margin-bottom:12px">${e(ev0.short)} · ${e(ev0.dateShort)}</p>
    <div class="scanner" role="img" aria-label="Camera view (simulated) with a QR code frame"><div class="cam-label"><span class="live">Camera</span><span>Checked in <b id="count">0</b> / ${sold}</span></div><div class="ghost-qr">${P.qr('L2E:ghost', 'Simulated QR')}</div><div class="frame"></div><div class="line"></div></div>
    <div class="scan-result idle" id="result" role="status" aria-live="polite" style="margin-top:14px"><span class="ico-wrap">${I('qr', 22)}</span><div class="grow"><p class="strong">Ready to scan</p><p class="small">Point the camera at a ticket QR code.</p></div></div>
    <div class="btn-row" style="margin-top:12px"><button class="btn" id="sim">${I('scan', 18)} Simulate scan</button><button class="btn light" data-open="manual">${I('search', 18)} Find by name</button></div>
    <p class="tiny muted center" style="margin-top:8px">Prototype: each tap shows the next result (valid, already used, transferred, invalid).</p>
    <a class="btn block ghost sm" href="admin-attendees.html">${I('list', 16)} View attendee list</a>
    ${H.sheet('manual', 'Manual check-in', `<div class="search"><label>${I('search', 20)}<span class="sr-only">Search attendees</span><input type="search" data-search placeholder="Search by name"></label></div><div class="list">${D.attendees.filter((a) => a.ticket !== '—').map((a) => `<div class="table-row" data-filter-item data-tags=""><div class="grow"><p class="strong small">${e(a.name)}</p><p class="tiny muted">${e(a.ticket)} · ${e(a.tier)}</p></div><button class="btn sm" data-close data-toast="${e(a.name)} checked in">Check in</button></div>`).join('')}</div>`)}
    ${nav('scan')}</main>`;

  /* 28 Compose announcement */
  S['admin-announce'] = () => `<main class="screen has-cta">${H.header('Announcement', 'admin-dashboard.html')}
    <form class="stack-lg" id="ann"><label class="field"><span>Title</span><input id="ann-title" value="Mentoring Circle: 4 places left"></label>
    <label class="field"><span>Message</span><textarea id="ann-body">Our first-year middle leaders circle on Tuesday 9 December has just 4 places left. Members pay £9.00. Book in the app.</textarea></label>
    <button type="button" class="card row" style="border:2px dashed var(--line);box-shadow:none;width:100%" data-toast="Attachment added">${I('file', 20)}<span class="grow" style="text-align:left">Add an image or PDF (optional)</span></button>
    <fieldset style="border:0;padding:0;margin:0" class="stack"><legend class="strong" style="margin-bottom:10px">Audience</legend><div class="stack" data-select-group id="aud">${[['all', 'All members', '412 people'], ['event', 'Ticket holders of an event', 'Winter Summit 2026 · 97 people'], ['segment', 'Members interested in Coaching', '88 people']].map(([v, l, s], i) => `<button type="button" class="option ${i === 0 ? 'selected' : ''}" role="radio" aria-checked="${i === 0}" data-select="${v}|${s.match(/(\d+) people/)[1]}"><span class="radio" aria-hidden="true"></span><span class="grow"><span class="strong" style="display:block">${l}</span><span class="small muted">${s}</span></span></button>`).join('')}</div></fieldset>
    <div class="seg" role="tablist" data-seg-group="when"><button type="button" role="tab" data-seg="now" aria-selected="true">Send now</button><button type="button" role="tab" data-seg="later" aria-selected="false">Schedule</button></div>
    <div data-panel-group="when" data-panel="later" hidden class="btn-row"><label class="field"><span>Date</span><input type="date" value="2026-11-21"></label><label class="field"><span>Time</span><input type="time" value="08:00"></label></div>
    <section class="stack"><p class="strong small">Push notification preview</p><div class="card row tight"><img src="../shared/img/logo-dark.png" alt="" style="width:44px;height:44px;object-fit:contain;border-radius:10px;background:#fff;border:1px solid var(--line)"><div class="grow"><p class="tiny muted">Lab to Ed Leadership · now</p><p class="strong small" id="pv-t">Mentoring Circle: 4 places left</p><p class="small muted ellipsis" id="pv-b">Our first-year middle leaders circle…</p></div></div></section>
    <div class="cta-bar"><button type="button" class="btn" data-open="send-ann" id="ann-send">Send to 412 people</button></div></form>
    ${H.sheet('send-ann', 'Send announcement?', `<p id="ann-confirm">It will go to <b>412 members</b> by push notification and appear in their Inbox. Members can't reply.</p><button class="btn block" data-open="sent-ann" data-close>Send now</button><button class="btn block light" data-close>Back to editing</button>`)}
    ${H.sheet('sent-ann', 'Announcement sent', `<div class="notice green">${I('check', 20)}<span>Delivered to members' Inbox. You can track reads in Messages.</span></div><a class="btn block" href="admin-messages.html?toast=Announcement%20sent">Done</a><a class="btn block light" href="inbox.html">See the member Inbox</a>`)}</main>`;

  /* 29 Admin messages */
  S['admin-messages'] = () => {
    const tab = q.tab === 'new' ? 'new' : 'sent';
    const people = D.members.filter((x) => x.role !== 'Admin');
    const pre = D.members.find((x) => x.id === q.to);
    return `<main class="screen has-nav"><header class="header left"><h1>Messages</h1><a class="iconbtn rust" href="admin-announce.html" aria-label="New announcement">${I('megaphone', 20)}</a></header>
    <div class="seg" role="tablist" data-seg-group="msg"><button role="tab" data-seg="sent" aria-selected="${tab === 'sent'}">Sent log</button><button role="tab" data-seg="new" aria-selected="${tab === 'new'}">New message</button></div>
    <div data-panel-group="msg" data-panel="sent" ${tab === 'sent' ? '' : 'hidden'} class="stack" style="margin-top:14px">${D.sentMessages.map((x) => `<button class="card stack" style="border:0;width:100%;text-align:left" data-open="sm-${x.id}"><div class="row between"><span class="badge ${x.kind === 'Direct message' ? 'dark' : x.kind === 'Event update' ? 'blue' : 'rust'}">${e(x.kind)}</span>${x.scheduled ? '<span class="badge amber">Scheduled</span>' : ''}</div><p class="strong">${e(x.title)}</p><p class="small muted">${e(x.audience)} · ${e(x.sent)}</p>${x.scheduled ? '' : `<div class="row small" style="gap:16px"><span>${I('check', 14, 'style="display:inline;vertical-align:-2px"')} ${x.delivered} delivered</span><span>${I('eye', 14, 'style="display:inline;vertical-align:-2px"')} ${x.read} read (${Math.round(x.read / x.delivered * 100)}%)</span></div><div class="progress"><span style="width:${Math.round(x.read / x.delivered * 100)}%"></span></div>`}</button>`).join('')}</div>
    <form data-panel-group="msg" data-panel="new" ${tab === 'new' ? '' : 'hidden'} class="stack-lg" style="margin-top:14px" id="dm"><fieldset style="border:0;padding:0;margin:0"><legend class="strong" style="margin-bottom:10px">Send to</legend><div class="seg" role="tablist" data-seg-group="to"><button type="button" role="tab" data-seg="one" aria-selected="${q.to !== 'event'}">One member</button><button type="button" role="tab" data-seg="ev" aria-selected="${q.to === 'event'}">Event ticket holders</button></div></fieldset>
    <div data-panel-group="to" data-panel="one" ${q.to === 'event' ? 'hidden' : ''}><label class="field"><span>Member</span><select>${people.map((p) => `<option ${pre && pre.id === p.id ? 'selected' : ''}>${e(p.name)} (${e(p.email)})</option>`).join('')}</select></label></div>
    <div data-panel-group="to" data-panel="ev" ${q.to === 'event' ? '' : 'hidden'}><label class="field"><span>Event</span><select>${D.events.map((x) => `<option>${e(x.title)}</option>`).join('')}</select></label><p class="small muted" style="margin-top:6px">97 ticket holders will receive this as an event update.</p></div>
    <label class="field"><span>Subject</span><input value="${pre ? 'A quick note' : 'Venue access for 5 December'}"></label><label class="field"><span>Message</span><textarea>${pre ? `Hi ${e(pre.name.split(' ')[0])}, ` : ''}The Studio entrance is on Lever Street. Step-free access is via the lift on the ground floor.</textarea></label>
    <button type="button" class="btn light sm" data-toast="PDF attached">${I('file', 16)} Attach image or PDF</button>
    <div class="notice">${I('info', 20)}<span>Messages are one way. Members receive them in their Inbox and can't reply.</span></div>
    <button type="button" class="btn block" data-open="dm-sent">${I('send', 18)} Send message</button></form>
    ${D.sentMessages.map((x) => H.sheet('sm-' + x.id, e(x.title), `<p class="small muted">${e(x.kind)} · ${e(x.audience)}</p><p class="small">${e(x.sent)}</p>${x.scheduled ? `<div class="notice amber">${I('clock', 20)}<span>Scheduled. It will send automatically.</span></div><button class="btn block danger" data-close data-toast="Scheduled message cancelled">Cancel scheduled send</button>` : `<div class="stat-grid"><div class="stat"><span class="k">Delivered</span><span class="v">${x.delivered}</span></div><div class="stat"><span class="k">Read</span><span class="v">${x.read}</span></div></div><a class="btn block light" href="message.html?id=${{ s1: 'm1', s2: 'm2', s4: 'm3', s5: 'm4' }[x.id]}">View message</a>`}`)).join('')}
    ${H.sheet('dm-sent', 'Message sent', `<div class="notice green">${I('check', 20)}<span>Delivered by push notification and added to their Inbox.</span></div><a class="btn block" href="message.html?id=m1">View message</a><a class="btn block light" href="admin-messages.html?toast=Message%20sent">Back to sent log</a>`)}
    ${nav('megaphone')}</main>`;
  };

  /* 30 Members and settings */
  const msTabs = (cur) => `<div class="seg" style="margin-bottom:14px"><a href="admin-members.html" ${cur === 'm' ? 'aria-current="page"' : ''}>Members</a><a href="admin-settings.html" ${cur === 's' ? 'aria-current="page"' : ''}>App settings</a></div>`;
  S['admin-members'] = () => `<main class="screen has-nav"><header class="header left"><h1>Members and settings</h1><button class="iconbtn" id="export-m" aria-label="Export members">${I('download', 20)}</button></header>${msTabs('m')}
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search members</span><input type="search" data-search placeholder="Search name, email or school"></label></div>
    <div class="chips" style="margin-top:10px" data-filter-group="r">${[['all', 'All (412)'], ['Member', 'Members'], ['Admin', 'Admins']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div>
    <div class="list" style="margin-top:12px">${D.members.map((p) => `<button class="item" data-open="mem-${p.id}" data-filter-item data-tags="${p.role}">${H.avatar(p.name, p.initials, 'sm')}<span class="grow"><p class="t">${e(p.name)}</p><p class="s ellipsis">${e(p.institution)}</p></span>${p.role === 'Admin' ? '<span class="badge dark">Admin</span>' : ''}<span class="chev">${I('next', 18)}</span></button>`).join('')}</div>
    <div class="empty" data-empty hidden>No members match.</div>
    <a class="btn block light sm" style="margin-top:16px" href="admin-activity.html">${I('activity', 16)} Activity log</a>
    ${D.members.map((p) => H.sheet('mem-' + p.id, e(p.name), `<p class="small muted">${e(p.email)}<br>${e(p.institution)} · Joined ${e(p.joined)} · ${p.events} events</p><fieldset style="border:0;padding:0;margin:0"><legend class="strong small" style="margin-bottom:8px">Role</legend><div class="stack" data-select-group>${['Member', 'Admin'].map((r) => `<button type="button" class="option ${p.role === r ? 'selected' : ''}" role="radio" aria-checked="${p.role === r}" data-select="${r}"><span class="radio" aria-hidden="true"></span>${r}</button>`).join('')}<button type="button" class="option" disabled style="opacity:.55"><span class="radio" aria-hidden="true"></span>Event Coordinator <span class="badge">Coming later</span></button></div></fieldset><button class="btn block" data-close data-toast="Role saved and recorded in the activity log">Save role</button><a class="btn block light" href="admin-messages.html?tab=new&to=${p.id}">${I('send', 16)} Send a message</a>`)).join('')}
    ${nav('users')}</main>`;

  S['admin-settings'] = () => {
    const st = D.settings;
    const stepper = (id, val, min, max, step, unit, label) => `<div class="stepper" data-stepper><button type="button" data-step="-1" aria-label="Decrease ${label}">${I('minus', 16)}</button><input id="${id}" type="number" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${label} (${unit})" readonly><button type="button" data-step="1" aria-label="Increase ${label}">${I('plus', 16)}</button></div>`;
    return `<main class="screen has-nav"><header class="header left"><h1>Members and settings</h1></header>${msTabs('s')}
    <div class="notice">${I('info', 20)}<span>Changes apply straight away, with no app update. Each change is recorded in the activity log.</span></div>
    <div class="log-day">Tickets</div><div class="list"><div class="setting"><div class="grow"><p class="t">Ticket transfer deadline</p><p class="s">Hours before an event when transfers close. Can be changed per event.</p></div>${stepper('s1', st.transferCutoffHours, 0, 720, 12, 'hours', 'transfer deadline')}</div></div>
    <div class="log-day">Checkout</div><div class="list"><div class="setting"><div class="grow"><p class="t">Seat hold during checkout</p><p class="s">Minutes a place is held while someone pays (5 to 30).</p></div>${stepper('s2', st.seatHoldMinutes, 5, 30, 1, 'minutes', 'seat hold')}</div></div>
    <div class="log-day">Pricing</div><div class="list"><div class="setting"><div class="grow"><p class="t">Member discount</p><p class="s">Percentage off the standard price, copied to each new event.</p></div>${stepper('s3', st.memberDiscountPct, 0, 100, 5, 'percent', 'member discount')}</div></div>
    <div class="log-day">Notifications</div><div class="list"><div class="setting"><div class="grow"><p class="t">Event reminder times</p><p class="s">Hours before an event. Can be changed per event.</p><div class="row wrap" style="gap:6px;margin-top:8px"><span class="badge rust">24 hours</span><span class="badge rust">1 hour</span><button type="button" class="chip" style="min-height:32px;padding:0 12px" data-toast="Reminder time added">${I('plus', 14)} Add</button></div></div></div></div>
    <div class="log-day">Payments</div><div class="list"><div class="setting"><span class="ico-wrap green">${I('card', 20)}</span><div class="grow"><p class="t">Stripe connected</p><p class="s">Payouts to ${e(D.org.stripe.account)}, ${e(D.org.stripe.payouts.toLowerCase())}.</p></div><span class="badge green">Active</span></div><div class="setting"><span class="ico-wrap">${I('lock', 20)}</span><div class="grow"><p class="t">Card details</p><p class="s">Handled by Stripe. The app never stores them.</p></div></div></div>
    <button class="btn block" style="margin-top:20px" data-toast="Settings saved and recorded in the activity log">Save settings</button>
    ${nav('users')}</main>`;
  };

  /* 31 Activity log */
  S['admin-activity'] = () => {
    const cats = ['all', 'Accounts', 'Payments', 'Tickets', 'Events', 'Messages', 'Settings', 'Roles'];
    const days = [...new Set(D.activity.map((a) => a.day))];
    const people = [...new Set(D.activity.map((a) => a.who))];
    const evs = [...new Set(D.activity.map((a) => a.event).filter((x) => x !== '—'))];
    const slug = (s) => s.replace(/\W+/g, '-');
    return `<main class="screen has-nav">${H.header('Activity log', 'admin-dashboard.html', `<button class="iconbtn" id="export-log" aria-label="Export CSV">${I('download', 20)}</button>`)}
    <div class="search"><label>${I('search', 20)}<span class="sr-only">Search activity</span><input type="search" data-search placeholder="Search who, what or ticket number"></label><button class="iconbtn" data-open="log-filters" aria-label="Filter by date, person and event">${I('sliders')}</button></div>
    <div class="chips" style="margin-top:10px" data-filter-group="cat">${cats.map((c) => `<button class="chip" data-filter="${c}" aria-pressed="${c === 'all'}">${c === 'all' ? 'All' : c}</button>`).join('')}</div>
    <p class="small muted" style="margin:10px 4px">${I('lock', 14, 'style="display:inline;vertical-align:-2px"')} Newest first · <span data-count></span> entries · entries can't be edited or deleted</p>
    ${days.map((d) => `<section data-filter-section><p class="log-day">${e(d)}</p><div class="list">${D.activity.filter((a) => a.day === d).map((a) => `<button class="item" data-open="log-${a.id}" data-filter-item data-tags="${a.cat}|p-${slug(a.who)}|e-${slug(a.event)}|${d === 'Today' ? 'today' : ''}|${['Today', 'Yesterday', '17 November', '16 November', '15 November', '14 November'].includes(d) ? 'week' : ''}"><span class="ico-wrap ${a.cat === 'Payments' ? 'green' : a.cat === 'Settings' || a.cat === 'Roles' ? 'dark' : ''}">${I({ Accounts: 'user', Payments: 'card', Tickets: 'ticket', Events: 'calendar', Messages: 'megaphone', Settings: 'settings', Roles: 'shield' }[a.cat], 20)}</span><span class="grow"><p class="t">${e(a.action)}</p><p class="s">${e(a.summary)}</p><p class="tiny muted">${e(a.who)} · ${e(a.when.split(', ')[1])}</p></span></button>`).join('')}</div></section>`).join('')}
    <div class="empty" data-empty hidden>No activity matches these filters.</div>
    ${H.sheet('log-filters', 'Filter activity', `<div><p class="strong small" style="margin-bottom:8px">Date</p><div class="chips" data-filter-group="date" style="margin:0;padding:0;flex-wrap:wrap">${[['all', 'Any time'], ['today', 'Today'], ['week', 'Last 7 days']].map(([v, l]) => `<button class="chip" data-filter="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div></div>
      <div><p class="strong small" style="margin-bottom:8px">Person</p><div class="chips" data-filter-group="who" style="margin:0;padding:0;flex-wrap:wrap"><button class="chip" data-filter="all" aria-pressed="true">Anyone</button>${people.map((p) => `<button class="chip" data-filter="p-${slug(p)}" aria-pressed="false">${e(p)}</button>`).join('')}</div></div>
      <div><p class="strong small" style="margin-bottom:8px">Event</p><div class="chips" data-filter-group="ev" style="margin:0;padding:0;flex-wrap:wrap"><button class="chip" data-filter="all" aria-pressed="true">Any event</button>${evs.map((p) => `<button class="chip" data-filter="e-${slug(p)}" aria-pressed="false">${e(p)}</button>`).join('')}</div></div>
      <button class="btn block" data-close>Show results</button>`)}
    ${D.activity.map((a) => H.sheet('log-' + a.id, e(a.action), `<dl class="kv"><div><dt>When</dt><dd>${e(a.when)}</dd></div><div><dt>Who</dt><dd>${e(a.who)}</dd></div><div><dt>Category</dt><dd>${e(a.cat)}</dd></div><div><dt>Event</dt><dd>${e(a.event)}</dd></div><div><dt>Device</dt><dd>${e(a.ip)}</dd></div><div><dt>Entry ID</dt><dd>LOG-${a.id.slice(1).padStart(6, '0')}</dd></div><div style="grid-column:span 2"><dt>Details</dt><dd>${e(a.summary)}</dd></div></dl><div class="notice">${I('lock', 20)}<span>Log entries are permanent and can't be edited or deleted.</span></div>`)).join('')}
    ${nav('grid')}</main>`;
  };

  /* ---------- Admin behaviour ---------- */
  Object.assign(after, {
    'admin-event-edit'() {
      const std = document.getElementById('std'), mp = document.getElementById('mp');
      std.addEventListener('input', () => { mp.textContent = m(D.memberPrice(Math.round((+std.value || 0) * 100))); });
    },
    'admin-attendees'() {
      document.getElementById('export').addEventListener('click', () => { P.csv('winter-summit-attendees.csv', [['Name', 'Email', 'Type', 'Ticket', 'Amount', 'Payment', 'Transfer'], ...D.attendees.map((a) => [a.name, a.email, a.tier, a.ticket, P.moneyAlways(a.amount), a.payment, a.transfer || ''])]); P.toast('Attendee list exported (CSV)'); });
    },
    'admin-scanner'() {
      const R = [
        ['valid', 'check', 'Valid: Kwame Asante', 'Member ticket T-55D0E1. Checked in at 09:41.'],
        ['used', 'clock', 'Already used', 'Amara Okafor’s ticket T-7F3A21 was scanned at 09:38.'],
        ['transferred', 'transfer', 'Transferred ticket', 'Old code T-81C2A0 was transferred to Kwame Asante. Ask for the new ticket.'],
        ['invalid', 'x', 'Invalid code', 'This QR code isn’t a ticket for Winter Summit 2026.'],
      ];
      let i = 0, n = 0;
      const box = document.getElementById('result'), c = document.getElementById('count');
      document.getElementById('sim').addEventListener('click', () => {
        const [cls, ic, t, s] = R[i % R.length];
        box.className = 'scan-result ' + cls;
        box.innerHTML = `<span class="ico-wrap">${I(ic, 22)}</span><div class="grow"><p class="strong">${t}</p><p class="small">${s}</p></div>`;
        if (cls === 'valid') c.textContent = ++n;
        if (navigator.vibrate) navigator.vibrate(cls === 'valid' ? 40 : [60, 40, 60]);
        i++;
      });
    },
    'admin-announce'() {
      const t = document.getElementById('ann-title'), b = document.getElementById('ann-body');
      const up = () => { document.getElementById('pv-t').textContent = t.value || 'Title'; document.getElementById('pv-b').textContent = b.value || 'Message'; };
      t.addEventListener('input', up); b.addEventListener('input', up); up();
      document.getElementById('aud').addEventListener('select', (ev) => {
        const n = ev.detail.split('|')[1];
        document.getElementById('ann-send').textContent = `Send to ${n} people`;
        document.getElementById('ann-confirm').innerHTML = `It will go to <b>${n} people</b> by push notification and appear in their Inbox. Members can't reply.`;
      });
    },
    'admin-members'() {
      document.getElementById('export-m').addEventListener('click', () => { P.csv('members.csv', [['Name', 'Email', 'Institution', 'Role', 'Joined'], ...D.members.map((p) => [p.name, p.email, p.institution, p.role, p.joined])]); P.toast('Member directory exported (CSV)'); });
    },
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
