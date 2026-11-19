/* Lab to Ed Leadership Events — shared sample data.
   Both alternatives read from this file so they can be compared like for like.
   Prices are stored in pence. "Today" in the prototype is Thursday 19 November 2026. */
(function () {
  const IMG = (document.currentScript && document.currentScript.src.replace(/data\.js.*$/, 'img/')) || '../shared/img/';

  const settings = {
    transferCutoffHours: 48,
    seatHoldMinutes: 10,
    memberDiscountPct: 25,
    reminderOffsetsHours: [24, 1],
  };

  const memberPrice = (pence) => Math.round(pence * (100 - settings.memberDiscountPct) / 100);

  const events = [
    {
      id: 'winter-summit',
      title: 'Leading Science Departments: Winter Summit 2026',
      short: 'Winter Summit 2026',
      category: 'Conference',
      format: 'In person',
      day: '5', mon: 'Dec', weekday: 'Sat',
      dateShort: 'Sat 5 Dec 2026',
      dateLong: 'Saturday 5 December 2026',
      time: '09:30–16:30',
      venue: 'The Studio, 51 Lever Street, Manchester M1 1FN',
      venueShort: 'The Studio, Manchester',
      mapUrl: 'https://maps.google.com/?q=51+Lever+Street+Manchester+M1+1FN',
      price: 4800,
      capacity: 120, left: 23,
      status: 'live',
      transferCutoffHours: 48, transferCloses: 'Thursday 3 December at 09:30',
      deadline: 'Registration closes Wednesday 2 December at 23:59',
      image: IMG + 'event-summit.svg',
      imageAlt: 'Illustration of a conference stage with a large audience in warm light',
      summary: 'A full day for heads of science and aspiring leaders: practical sessions on running a department, leading change and growing your team.',
      description: [
        'Our flagship winter gathering brings together heads of science, subject leads and colleagues stepping into leadership for the first time.',
        'Expect practical, research-informed sessions you can take straight back to school, plus plenty of time to meet people facing the same challenges as you. Lunch and refreshments are included.',
      ],
      speakers: [
        { name: 'Geetika', role: 'Founder, Lab to Ed Leadership' },
        { name: 'Priya Raman', role: 'Deputy Head, Northfield High School' },
        { name: 'Tom Ellery', role: 'Trust Science Lead, Pennine Learning Trust' },
      ],
      agenda: [
        { time: '09:30', item: 'Arrival, coffee and networking' },
        { time: '10:00', item: 'Keynote: leading a department through change' },
        { time: '11:15', item: 'Workshops: workload, coaching, curriculum' },
        { time: '12:45', item: 'Lunch' },
        { time: '13:45', item: 'Panel: from classroom teacher to middle leader' },
        { time: '15:15', item: 'Action planning in small groups' },
        { time: '16:30', item: 'Close' },
      ],
      questions: [
        { id: 'diet', label: 'Dietary requirements', type: 'select', options: ['None', 'Vegetarian', 'Vegan', 'Halal', 'Gluten free', 'Other'] },
        { id: 'access', label: 'Access needs we should know about (optional)', type: 'text' },
      ],
    },
    {
      id: 'bench-classroom',
      title: 'From Bench to Classroom: Practical Inquiry',
      short: 'Bench to Classroom',
      category: 'Webinar',
      format: 'Online',
      day: '26', mon: 'Nov', weekday: 'Wed',
      dateShort: 'Wed 26 Nov 2026',
      dateLong: 'Wednesday 26 November 2026',
      time: '19:00–20:15',
      venue: 'Online (link sent with your ticket)',
      venueShort: 'Online',
      onlineUrl: 'https://meet.example.org/l2el-bench-classroom',
      price: 0,
      capacity: 300, left: 182,
      status: 'live',
      transferCutoffHours: null, transferCloses: 'when the session starts',
      deadline: 'Registration closes when the session starts',
      image: IMG + 'event-webinar.svg',
      imageAlt: 'Illustration of a laptop showing a video call beside laboratory glassware',
      summary: 'How former researchers bring authentic inquiry into secondary science lessons, with examples you can use next week.',
      description: [
        'Many of our members came to teaching from research. This free evening webinar looks at how to turn that experience into practical inquiry work that fits a real timetable.',
        'Bring your questions; there will be 20 minutes of Q&A at the end.',
      ],
      speakers: [
        { name: 'Dr Samuel Adeyemi', role: 'Science Teacher and former research chemist' },
        { name: 'Grace Whitfield', role: 'Head of Biology, St Anne’s College' },
      ],
      agenda: [
        { time: '19:00', item: 'Welcome' },
        { time: '19:05', item: 'Inquiry that fits a 50-minute lesson' },
        { time: '19:35', item: 'Case studies from member schools' },
        { time: '19:55', item: 'Questions and answers' },
      ],
      questions: [
        { id: 'role', label: 'Your current role', type: 'select', options: ['Classroom teacher', 'Subject lead', 'Head of department', 'Senior leader', 'Other'] },
      ],
    },
    {
      id: 'mentoring-circle',
      title: 'Mentoring Circle: First-Year Middle Leaders',
      short: 'Mentoring Circle',
      category: 'Workshop',
      format: 'Online',
      day: '9', mon: 'Dec', weekday: 'Tue',
      dateShort: 'Tue 9 Dec 2026',
      dateLong: 'Tuesday 9 December 2026',
      time: '18:00–19:30',
      venue: 'Online (link sent with your ticket)',
      venueShort: 'Online',
      onlineUrl: 'https://meet.example.org/l2el-mentoring',
      price: 1200,
      capacity: 20, left: 4,
      status: 'live',
      transferCutoffHours: 24, transferCloses: 'Monday 8 December at 18:00',
      deadline: 'Registration closes Monday 8 December at 18:00',
      image: IMG + 'event-mentoring.svg',
      imageAlt: 'Illustration of a small group of people talking in a circle',
      summary: 'A small, confidential group session for colleagues in their first year of middle leadership.',
      description: [
        'Places are capped at 20 so everyone gets time to talk. Each circle is facilitated by an experienced head of department.',
        'We will work through the problems you bring, from difficult conversations to timetabling.',
      ],
      speakers: [{ name: 'Priya Raman', role: 'Deputy Head, Northfield High School' }],
      agenda: [
        { time: '18:00', item: 'Introductions' },
        { time: '18:15', item: 'Problem-solving rounds' },
        { time: '19:15', item: 'Commitments and close' },
      ],
      questions: [
        { id: 'focus', label: 'What would you like to discuss? (optional)', type: 'text' },
      ],
    },
    {
      id: 'christmas-networking',
      title: 'Christmas Networking Evening',
      short: 'Christmas Networking',
      category: 'Networking',
      format: 'In person',
      day: '17', mon: 'Dec', weekday: 'Thu',
      dateShort: 'Thu 17 Dec 2026',
      dateLong: 'Thursday 17 December 2026',
      time: '18:30–21:00',
      venue: 'Conway Hall, 25 Red Lion Square, London WC1R 4RL',
      venueShort: 'Conway Hall, London',
      mapUrl: 'https://maps.google.com/?q=Conway+Hall+25+Red+Lion+Square+London',
      price: 2000,
      capacity: 80, left: 0,
      status: 'live',
      transferCutoffHours: 48, transferCloses: 'Tuesday 15 December at 18:30',
      deadline: 'Sold out — join the waitlist',
      image: IMG + 'event-networking.svg',
      imageAlt: 'Illustration of string lights above people chatting',
      summary: 'An informal end-of-term evening with drinks, mince pies and good company.',
      description: [
        'Celebrate the end of term with fellow members. Soft drinks and mulled wine are included.',
        'This event is sold out. Join the waitlist and we will let you know if a place comes up.',
      ],
      speakers: [],
      agenda: [
        { time: '18:30', item: 'Doors open' },
        { time: '19:15', item: 'A few words from the team' },
        { time: '21:00', item: 'Close' },
      ],
      questions: [],
    },
    {
      id: 'curriculum-design',
      title: 'Data-Informed Curriculum Design',
      short: 'Curriculum Design',
      category: 'Workshop',
      format: 'In person',
      day: '16', mon: 'Jan', weekday: 'Sat',
      dateShort: 'Sat 16 Jan 2027',
      dateLong: 'Saturday 16 January 2027',
      time: '10:00–13:00',
      venue: 'Impact Hub Birmingham, 58 Oxford Street, Birmingham B5 5NR',
      venueShort: 'Impact Hub, Birmingham',
      mapUrl: 'https://maps.google.com/?q=58+Oxford+Street+Birmingham+B5+5NR',
      price: 3000,
      capacity: 40, left: 31,
      status: 'live',
      transferCutoffHours: 48, transferCloses: 'Thursday 14 January at 10:00',
      deadline: 'Registration closes Wednesday 13 January at 23:59',
      image: IMG + 'event-curriculum.svg',
      imageAlt: 'Illustration of charts and a curriculum map on a whiteboard',
      summary: 'Use assessment data to make better decisions about what you teach, and when.',
      description: [
        'A hands-on morning for subject and department leads. Bring an anonymised data set from your school if you have one.',
        'You will leave with a draft curriculum review plan for the spring term.',
      ],
      speakers: [{ name: 'Tom Ellery', role: 'Trust Science Lead, Pennine Learning Trust' }],
      agenda: [
        { time: '10:00', item: 'What your data can and cannot tell you' },
        { time: '11:00', item: 'Mapping gaps across the key stages' },
        { time: '12:15', item: 'Planning your review' },
      ],
      questions: [
        { id: 'diet', label: 'Dietary requirements', type: 'select', options: ['None', 'Vegetarian', 'Vegan', 'Halal', 'Gluten free', 'Other'] },
      ],
    },
  ];

  const pastEvents = [
    { id: 'autumn-breakfast', title: 'Autumn Leadership Breakfast', short: 'Autumn Breakfast', category: 'Networking', format: 'In person', day: '18', mon: 'Oct', weekday: 'Sun', dateShort: 'Sun 18 Oct 2026', dateLong: 'Sunday 18 October 2026', time: '08:30–10:30', venue: 'Leeds Library, 18 Commercial Street, Leeds LS1 6AL', venueShort: 'Leeds Library', price: 1000, image: IMG + 'event-breakfast.svg', imageAlt: 'Illustration of coffee cups and pastries on a table', status: 'past' },
  ];

  const draftEvents = [
    { id: 'spring-retreat', title: 'Spring Leadership Retreat', short: 'Spring Retreat', category: 'Conference', format: 'In person', day: '20', mon: 'Mar', weekday: 'Sat', dateShort: 'Sat 20 Mar 2027', time: '10:00–17:00', venueShort: 'York', price: 6500, capacity: 60, left: 60, status: 'draft', image: IMG + 'event-summit.svg', imageAlt: 'Illustration of a conference stage' },
  ];

  const me = {
    first: 'Amara', last: 'Okafor', name: 'Amara Okafor', initials: 'AO',
    email: 'amara.okafor@riverside.sch.uk', phone: '07700 900418',
    institution: 'Riverside Academy, Leeds', role: 'Head of Science',
    bio: 'Former biochemist, now leading a science department of 14. Interested in coaching and curriculum design.',
    interests: ['Curriculum', 'Coaching', 'Workload', 'Inquiry'],
    memberId: 'L2E-004218', memberSince: 'March 2026',
  };

  const admin = { name: 'Geetika', first: 'Geetika', initials: 'G', email: 'geetika@labtoed.org.uk', role: 'Admin' };

  const tickets = [
    { id: 'T-7F3A21', eventId: 'winter-summit', holder: 'Amara Okafor', type: 'Member', paid: 3600, status: 'valid', qr: 'L2E:7f3a21c94be0d6115a2f8e3c', order: 'ORD-10482' },
    { id: 'T-B90C44', eventId: 'bench-classroom', holder: 'Amara Okafor', type: 'Free', paid: 0, status: 'valid', qr: 'L2E:b90c44a17e6f03d28c5b19aa', order: 'ORD-10511' },
    { id: 'T-1D2E88', eventId: 'autumn-breakfast', holder: 'Amara Okafor', type: 'Member', paid: 750, status: 'used', qr: 'L2E:1d2e88f0a3b9c47e21d6f5b3', order: 'ORD-10217', checkedIn: 'Checked in 08:34, 18 Oct 2026' },
  ];

  const messages = [
    { id: 'm1', kind: 'Event update', eventId: 'winter-summit', from: 'Geetika', title: 'Venue access for 5 December', preview: 'The Studio entrance is on Lever Street. Step-free access is via the lift…', date: '18 Nov', time: '16:05', unread: true,
      body: ['Hello everyone,', 'A quick note ahead of the Winter Summit. The Studio’s entrance is on Lever Street, opposite the bike racks. Step-free access is via the lift on the ground floor.', 'Registration opens at 09:30. Please have your ticket QR code ready on your phone; it works without signal.', 'The nearest stations are Manchester Piccadilly (8 minutes’ walk) and Piccadilly Gardens tram stop.', 'See you there,', 'Geetika'] },
    { id: 'm2', kind: 'Announcement', from: 'Lab to Ed Leadership', title: 'Winter Summit programme now live', preview: 'Three workshop strands, a panel on first-year leadership and lunch included…', date: '17 Nov', time: '09:30', unread: true,
      body: ['The full programme for our Winter Summit on Saturday 5 December is now available in the app.', 'This year there are three workshop strands: workload, coaching and curriculum. You can choose on the day.', 'Members pay £36.00 (25% off the standard £48.00). Only 23 places are left.'], attachment: 'Winter-Summit-programme.pdf' },
    { id: 'm3', kind: 'Announcement', from: 'Lab to Ed Leadership', title: 'Welcome to the new Lab to Ed Leadership app', preview: 'Events, tickets and news now live in one place. Here’s what’s new…', date: '3 Nov', time: '12:00', unread: false,
      body: ['Thank you for joining. From today you can find events, book and pay, and keep your tickets in one place.', 'Membership is free and gives you 25% off every paid event.', 'Messages from the team will arrive here in your Inbox.'] },
    { id: 'm4', kind: 'Direct message', from: 'Geetika', title: 'Thank you for Sunday', preview: 'It was lovely to hear about your department’s coaching trial…', date: '20 Oct', time: '10:12', unread: false,
      body: ['Hi Amara,', 'It was lovely to hear about your department’s coaching trial at the Autumn Breakfast. Would you be open to sharing it as a short case study at a future event?', 'No need to reply here; I’ll email you the details.', 'Best wishes,', 'Geetika'] },
  ];

  const notifications = [
    { id: 'n1', icon: 'mail', title: 'New event update', body: 'Venue access for 5 December', when: '18 Nov, 16:05', unread: true, href: 'message.html?id=m1' },
    { id: 'n2', icon: 'bell', title: 'Reminder: Bench to Classroom', body: 'Your free webinar starts in 7 days, on Wednesday 26 November at 19:00.', when: '19 Nov, 08:00', unread: true, href: 'ticket-detail.html?id=T-B90C44' },
    { id: 'n3', icon: 'calendar', title: 'New event: Data-Informed Curriculum Design', body: 'Saturday 16 January, Birmingham. Members pay £22.50.', when: '16 Nov, 11:20', unread: true, href: 'event-detail.html?id=curriculum-design' },
    { id: 'n4', icon: 'card', title: 'Payment confirmed', body: '£36.00 for Winter Summit 2026. Your ticket is ready.', when: '12 Nov, 20:41', unread: false, href: 'ticket-detail.html?id=T-7F3A21' },
    { id: 'n5', icon: 'mail', title: 'New announcement', body: 'Welcome to the new Lab to Ed Leadership app', when: '3 Nov, 12:00', unread: false, href: 'message.html?id=m3' },
  ];

  const members = [
    { id: 'u1', name: 'Amara Okafor', initials: 'AO', email: 'amara.okafor@riverside.sch.uk', institution: 'Riverside Academy, Leeds', role: 'Member', joined: '14 Mar 2026', events: 4 },
    { id: 'u2', name: 'Kwame Asante', initials: 'KA', email: 'k.asante@hollybank.sch.uk', institution: 'Hollybank School, Bradford', role: 'Member', joined: '2 Apr 2026', events: 3 },
    { id: 'u3', name: 'Sophie Turner', initials: 'ST', email: 'sturner@castlefield.ac.uk', institution: 'Castlefield College', role: 'Member', joined: '28 Apr 2026', events: 2 },
    { id: 'u4', name: 'Daniel Brooks', initials: 'DB', email: 'd.brooks@northfield.sch.uk', institution: 'Northfield High School', role: 'Member', joined: '9 May 2026', events: 5 },
    { id: 'u5', name: 'Priya Raman', initials: 'PR', email: 'p.raman@northfield.sch.uk', institution: 'Northfield High School', role: 'Member', joined: '11 May 2026', events: 6 },
    { id: 'u6', name: 'Joseph Mwangi', initials: 'JM', email: 'joseph.mwangi@stannes.ac.uk', institution: 'St Anne’s College', role: 'Member', joined: '3 Jun 2026', events: 1 },
    { id: 'u7', name: 'Hannah Clarke', initials: 'HC', email: 'h.clarke@pennine.org.uk', institution: 'Pennine Learning Trust', role: 'Member', joined: '21 Jul 2026', events: 2 },
    { id: 'u8', name: 'Oliver Hughes', initials: 'OH', email: 'ohughes@riverside.sch.uk', institution: 'Riverside Academy, Leeds', role: 'Member', joined: '5 Sep 2026', events: 1 },
    { id: 'u9', name: 'Fatima Begum', initials: 'FB', email: 'f.begum@eastgate.sch.uk', institution: 'Eastgate Academy, Leicester', role: 'Member', joined: '30 Sep 2026', events: 2 },
    { id: 'u10', name: 'Geetika', initials: 'G', email: 'geetika@labtoed.org.uk', institution: 'Lab to Ed Leadership', role: 'Admin', joined: '1 Mar 2026', events: 9 },
  ];

  // Attendees for the Winter Summit (the event used throughout the Admin screens)
  const attendees = [
    { name: 'Amara Okafor', email: 'amara.okafor@riverside.sch.uk', tier: 'Member', ticket: 'T-7F3A21', amount: 3600, payment: 'Paid', status: 'Not checked in' },
    { name: 'Kwame Asante', email: 'k.asante@hollybank.sch.uk', tier: 'Member', ticket: 'T-55D0E1', amount: 3600, payment: 'Paid', status: 'Not checked in', transfer: 'Transferred from Oliver Hughes, 16 Nov' },
    { name: 'Rebecca Lowe', email: 'rebecca.lowe@gmail.com', tier: 'Non-member', ticket: 'T-0A9C77', amount: 4800, payment: 'Paid', status: 'Not checked in' },
    { name: 'Daniel Brooks', email: 'd.brooks@northfield.sch.uk', tier: 'Member', ticket: 'T-3C1B90', amount: 3600, payment: 'Paid', status: 'Not checked in' },
    { name: 'Priya Raman', email: 'p.raman@northfield.sch.uk', tier: 'Speaker', ticket: 'T-9E4F02', amount: 0, payment: 'Complimentary', status: 'Not checked in' },
    { name: 'Marcus Reid', email: 'marcus.reid@outlook.com', tier: 'Non-member', ticket: '—', amount: 4800, payment: 'Pending (seat held)', status: '—' },
    { name: 'Sophie Turner', email: 'sturner@castlefield.ac.uk', tier: 'Member', ticket: 'T-6B7A13', amount: 3600, payment: 'Paid', status: 'Not checked in' },
    { name: 'Fatima Begum', email: 'f.begum@eastgate.sch.uk', tier: 'Member', ticket: '—', amount: 3600, payment: 'Failed', status: '—' },
    { name: 'Hannah Clarke', email: 'h.clarke@pennine.org.uk', tier: 'Member', ticket: 'T-2F8D65', amount: 3600, payment: 'Paid', status: 'Not checked in' },
    { name: 'Joseph Mwangi', email: 'joseph.mwangi@stannes.ac.uk', tier: 'Member', ticket: 'T-4A0E39', amount: 3600, payment: 'Paid', status: 'Not checked in' },
  ];

  const sentMessages = [
    { id: 's1', title: 'Venue access for 5 December', kind: 'Event update', audience: 'Winter Summit ticket holders (97)', sent: '18 Nov, 16:05', delivered: 97, read: 64 },
    { id: 's2', title: 'Winter Summit programme now live', kind: 'Announcement', audience: 'All members (412)', sent: '17 Nov, 09:30', delivered: 409, read: 251 },
    { id: 's3', title: 'Mentoring Circle: 4 places left', kind: 'Announcement', audience: 'Members interested in coaching (88)', sent: 'Scheduled for 21 Nov, 08:00', delivered: 0, read: 0, scheduled: true },
    { id: 's4', title: 'Welcome to the new Lab to Ed Leadership app', kind: 'Announcement', audience: 'All members (356)', sent: '3 Nov, 12:00', delivered: 356, read: 301 },
    { id: 's5', title: 'Thank you for Sunday', kind: 'Direct message', audience: 'Amara Okafor', sent: '20 Oct, 10:12', delivered: 1, read: 1 },
  ];

  const activity = [
    { id: 'a1', when: '19 Nov 2026, 10:42', day: 'Today', who: 'Fatima Begum', cat: 'Payments', action: 'Payment failed', summary: 'Card declined for Winter Summit 2026 (£36.00, ORD-10577)', event: 'Winter Summit 2026', ip: 'iOS app 1.0.3' },
    { id: 'a2', when: '19 Nov 2026, 10:31', day: 'Today', who: 'Marcus Reid (guest)', cat: 'Payments', action: 'Order started', summary: 'Guest order for 1 ticket, seat held for 10 minutes (ORD-10576)', event: 'Winter Summit 2026', ip: 'Android app 1.0.3' },
    { id: 'a3', when: '19 Nov 2026, 09:58', day: 'Today', who: 'Geetika', cat: 'Settings', action: 'Setting changed', summary: 'Ticket transfer deadline changed from 24 to 48 hours', event: '—', ip: 'iOS app 1.0.3' },
    { id: 'a4', when: '19 Nov 2026, 09:12', day: 'Today', who: 'Joseph Mwangi', cat: 'Accounts', action: 'Signed in', summary: 'Signed in with Apple', event: '—', ip: 'iOS app 1.0.3' },
    { id: 'a5', when: '18 Nov 2026, 16:05', day: 'Yesterday', who: 'Geetika', cat: 'Messages', action: 'Event update sent', summary: '“Venue access for 5 December” sent to 97 ticket holders', event: 'Winter Summit 2026', ip: 'iOS app 1.0.3' },
    { id: 'a6', when: '18 Nov 2026, 14:20', day: 'Yesterday', who: 'Rebecca Lowe (guest)', cat: 'Payments', action: 'Payment received', summary: '£48.00 by Apple Pay for 1 standard ticket (ORD-10561)', event: 'Winter Summit 2026', ip: 'iOS app 1.0.3' },
    { id: 'a7', when: '18 Nov 2026, 14:20', day: 'Yesterday', who: 'System', cat: 'Tickets', action: 'Ticket issued', summary: 'Ticket T-0A9C77 issued to Rebecca Lowe and emailed', event: 'Winter Summit 2026', ip: 'Server' },
    { id: 'a8', when: '18 Nov 2026, 11:03', day: 'Yesterday', who: 'Hannah Clarke', cat: 'Accounts', action: 'Failed sign-in', summary: 'Incorrect password (attempt 1 of 5)', event: '—', ip: 'Android app 1.0.2' },
    { id: 'a9', when: '17 Nov 2026, 09:30', day: '17 November', who: 'Geetika', cat: 'Messages', action: 'Announcement sent', summary: '“Winter Summit programme now live” sent to all members (412)', event: '—', ip: 'Web dashboard' },
    { id: 'a10', when: '16 Nov 2026, 18:47', day: '16 November', who: 'Oliver Hughes', cat: 'Tickets', action: 'Ticket transferred', summary: 'Ticket T-81C2A0 transferred to Kwame Asante; old QR code cancelled, new ticket T-55D0E1 issued', event: 'Winter Summit 2026', ip: 'iOS app 1.0.3' },
    { id: 'a11', when: '16 Nov 2026, 11:20', day: '16 November', who: 'Geetika', cat: 'Events', action: 'Event published', summary: 'Data-Informed Curriculum Design published (40 places, £30.00 standard)', event: 'Curriculum Design', ip: 'Web dashboard' },
    { id: 'a12', when: '15 Nov 2026, 15:02', day: '15 November', who: 'Fatima Begum', cat: 'Accounts', action: 'Signed up', summary: 'New member account created with email; email verified', event: '—', ip: 'Android app 1.0.3' },
    { id: 'a13', when: '14 Nov 2026, 10:15', day: '14 November', who: 'Geetika', cat: 'Roles', action: 'Role changed', summary: 'Daniel Brooks: Event Coordinator role requested (Phase 2) — no change made', event: '—', ip: 'Web dashboard' },
    { id: 'a14', when: '18 Oct 2026, 08:34', day: '18 October', who: 'Geetika', cat: 'Tickets', action: 'Checked in', summary: 'Amara Okafor checked in with ticket T-1D2E88', event: 'Autumn Breakfast', ip: 'iOS app 1.0.1' },
  ];

  const org = {
    name: 'Lab to Ed Leadership',
    mission: 'We help scientists and science teachers grow into confident leaders in education, through events, mentoring and a supportive community.',
    contactEmail: 'hello@labtoed.org.uk',
    address: 'Lab to Ed Leadership, 12 Park Square, Leeds LS1 2LH',
    executives: [
      { name: 'Geetika', role: 'Founder and Lead' },
      { name: 'Priya Raman', role: 'Programme Director' },
      { name: 'Tom Ellery', role: 'Partnerships' },
    ],
    stripe: { connected: true, account: 'Co-operative Bank business account ending 4821', payouts: 'Every Monday' },
  };

  const stats = { members: 412, newMembers: 38, upcoming: 5, registrations: 186, revenue: 321450, checkins: 0, attendanceRate: 91 };

  const promoCodes = { LEAD10: 10 };

  window.L2E = { settings, memberPrice, events, pastEvents, draftEvents, me, admin, tickets, messages, notifications, members, attendees, sentMessages, activity, org, stats, promoCodes, IMG,
    allEvents() { return [...events, ...pastEvents, ...draftEvents]; },
    event(id) { return this.allEvents().find(e => e.id === id) || events[0]; },
    ticket(id) { return tickets.find(t => t.id === id); },
    message(id) { return messages.find(m => m.id === id) || messages[0]; },
  };
})();
