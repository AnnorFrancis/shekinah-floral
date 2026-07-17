/* ============================================================
   SHEKINAH FLORAL DECOR — ai-chat.js
   "Shekinah AI Assistant" — frontend-simulated concierge chat.
   Injects its own markup, so a single script tag enables it
   on any page. Responses are scripted/keyword-matched (demo).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Markup ---------- */
  var root = document.createElement('div');
  root.innerHTML =
    '<button class="chat-fab" aria-label="Open Shekinah AI Assistant" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
        '<path d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.1 2.6 5.5-.2 1.2-.8 2.3-1.6 3.1 1.7 0 3.2-.6 4.4-1.4 1.1.4 2.3.7 3.6.7 5 0 9-3.6 9-7.9S17 3 12 3z"/>' +
        '<path d="M8.5 11h.01M12 11h.01M15.5 11h.01" stroke-linecap="round" stroke-width="2.4"/>' +
      '</svg>' +
      '<span class="chat-dot"></span>' +
    '</button>' +
    '<div class="chat-window" role="dialog" aria-label="Shekinah AI Assistant chat">' +
      '<div class="chat-header">' +
        '<div class="chat-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2c1.8 2.5 1.8 5.5 0 8-1.8-2.5-1.8-5.5 0-8zM12 10c2.5-1.8 5.5-1.8 8 0-2.5 1.8-5.5 1.8-8 0zM12 10c-2.5-1.8-5.5-1.8-8 0 2.5 1.8 5.5 1.8 8 0zM12 10v10" stroke-linecap="round"/></svg></div>' +
        '<div class="chat-header-info">' +
          '<div class="chat-header-name">Shekinah AI Assistant</div>' +
          '<div class="chat-header-status">Online — replies instantly</div>' +
        '</div>' +
        '<button class="chat-close" aria-label="Close chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button>' +
      '</div>' +
      '<div class="chat-body" aria-live="polite"></div>' +
      '<div class="chat-quick"></div>' +
      '<form class="chat-input">' +
        '<input type="text" placeholder="Ask about pricing, dates, services…" aria-label="Type your message">' +
        '<button type="submit" aria-label="Send message"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12l16-7-6 16-2.5-6.5L4 12z" stroke-linejoin="round"/></svg></button>' +
      '</form>' +
      '<div class="chat-powered">Powered by Shekinah AI · Demo</div>' +
    '</div>';
  while (root.firstChild) document.body.appendChild(root.firstChild);

  var fab = document.querySelector('.chat-fab');
  var win = document.querySelector('.chat-window');
  var body = win.querySelector('.chat-body');
  var quick = win.querySelector('.chat-quick');
  var form = win.querySelector('.chat-input');
  var input = form.querySelector('input');
  var closeBtn = win.querySelector('.chat-close');

  var opened = false;

  /* ---------- Helpers ---------- */
  function scrollDown() { body.scrollTop = body.scrollHeight; }

  function addMsg(html, who) {
    var m = document.createElement('div');
    m.className = 'chat-msg chat-msg--' + who;
    m.innerHTML = html;
    body.appendChild(m);
    scrollDown();
  }

  function typing(ms) {
    return new Promise(function (resolve) {
      var t = document.createElement('div');
      t.className = 'chat-typing';
      t.innerHTML = '<i></i><i></i><i></i>';
      body.appendChild(t);
      scrollDown();
      window.setTimeout(function () { t.remove(); resolve(); }, ms);
    });
  }

  function botSay(html, delay) {
    return typing(delay || 1100).then(function () { addMsg(html, 'bot'); });
  }

  function setQuickReplies(replies) {
    quick.innerHTML = '';
    replies.forEach(function (r) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = r.label;
      b.addEventListener('click', function () { handleUser(r.label, r.intent); });
      quick.appendChild(b);
    });
  }

  var DEFAULT_QUICK = [
    { label: 'View Packages', intent: 'packages' },
    { label: 'Book Consultation', intent: 'consult' },
    { label: 'Check Availability', intent: 'availability' },
    { label: 'Speak to Team', intent: 'team' }
  ];

  /* ---------- Scripted opening conversation ---------- */
  function playIntro() {
    botSay('Akwaaba! 🌸 Welcome to <strong>Shekinah Floral Decor</strong>. I am your AI event assistant. Are you planning a wedding, birthday, funeral or corporate event?', 900)
      .then(function () {
        return new Promise(function (r) { window.setTimeout(r, 1400); });
      })
      .then(function () {
        addMsg('Hi! How much does wedding decoration cost?', 'user');
        return botSay(
          'Beautiful choice! 💍 Our wedding decoration starts from:<br><br>' +
          '🌸 <strong>Bloom Package</strong> — from GHS 3,000<br>' +
          '✨ <strong>Elegance Package</strong> — from GHS 8,000<br>' +
          '👑 <strong>Royal Package</strong> — from GHS 15,000<br><br>' +
          'To recommend the right one — what is your <strong>event date</strong> and expected <strong>guest count</strong>?', 1500);
      })
      .then(function () {
        return new Promise(function (r) { window.setTimeout(r, 1600); });
      })
      .then(function () {
        addMsg('December 12, about 150 guests', 'user');
        return botSay(
          'Perfect — <strong>December 12</strong> for <strong>150 guests</strong>. 🎉 December is our peak season, so early booking is wise.<br><br>' +
          'For 150 guests I recommend the <strong>Elegance Package</strong> (from GHS 8,000): full venue transformation, 10 premium centerpieces, 100 Chiavari chairs, custom balloon wall and bridal florals.<br><br>' +
          'Would you like me to connect you with our team to reserve the date?', 1700);
      })
      .then(function () {
        setQuickReplies(DEFAULT_QUICK);
      });
  }

  /* ---------- Keyword intelligence (demo) ---------- */
  var RESPONSES = [
    { match: /(balloon)/i, intent: 'balloon' },
    { match: /(chair|rent|rental|linen|backdrop)/i, intent: 'rental' },
    { match: /(price|pricing|cost|how much|quote|charge)/i, intent: 'packages' },
    { match: /(package|bloom|elegance|royal)/i, intent: 'packages' },
    { match: /(book|consult|appointment|meet)/i, intent: 'consult' },
    { match: /(available|availability|date|free|open)/i, intent: 'availability' },
    { match: /(team|human|person|call|speak|talk|agent)/i, intent: 'team' },
    { match: /(wedding|engagement|traditional|marriage)/i, intent: 'wedding' },
    { match: /(birthday|party|shower|naming|graduation|anniversary)/i, intent: 'party' },
    { match: /(funeral|wreath|memorial)/i, intent: 'funeral' },
    { match: /(balloon)/i, intent: 'balloon' },
    { match: /(chair|rent|rental|table|linen|backdrop|light)/i, intent: 'rental' },
    { match: /(where|location|dome|address|find you)/i, intent: 'location' },
    { match: /(hello|hi|hey|good (morning|afternoon|evening)|akwaaba)/i, intent: 'greet' },
    { match: /(thank|medaase)/i, intent: 'thanks' }
  ];

  var INTENT_REPLIES = {
    packages:
      'Here is our pricing at a glance:<br><br>' +
      '🌸 <strong>Bloom</strong> — from GHS 3,000 (intimate events)<br>' +
      '✨ <strong>Elegance</strong> — from GHS 8,000 (most popular)<br>' +
      '👑 <strong>Royal</strong> — from GHS 15,000 (full luxury)<br><br>' +
      'You can also build a custom estimate on our <a href="./packages.html" style="color:#B8860B;font-weight:700;text-decoration:underline;">Packages page</a>.',
    consult:
      'Wonderful! 🗓️ Consultations are free and take about 30 minutes. You can fill our <a href="./contact.html" style="color:#B8860B;font-weight:700;text-decoration:underline;">booking form</a> or chat directly on WhatsApp at <strong>024 226 4773</strong>. Which do you prefer?',
    availability:
      'Let me check… 🌿 We currently have openings this month and next, but <strong>Saturdays fill fast</strong> — especially in December. Share your event date and I will flag it for the team to confirm within hours.',
    team:
      'Of course! Our team is a call or message away:<br><br>📞 024 226 4773<br>📞 028 825 9177<br>📞 024 448 8353<br><br>Or tap the green WhatsApp button to chat instantly. We reply within minutes during working hours (Mon–Sat, 8am–7pm).',
    wedding:
      'Weddings are our signature. 💍 We handle traditional ceremonies, church weddings and receptions — decor, florals, bridal bouquets, aisle styling, arches and more. See real setups in our <a href="./gallery.html" style="color:#B8860B;font-weight:700;text-decoration:underline;">gallery</a>. What date are you planning for?',
    party:
      'We love a celebration! 🎈 Birthdays, baby showers, naming ceremonies, graduations, anniversaries — we design balloon installations, themed backdrops and table styling. Balloon setups start from around GHS 700. Tell me the occasion and guest count!',
    funeral:
      'You have our deepest sympathy. 🕊️ We provide dignified funeral decoration — grounds styling, wreaths (fresh or artificial), tent and canopy draping. Our team handles everything gently and on time. Would you like us to call you to discuss quietly?',
    balloon:
      'Balloons are one of our favourites! 🎈 Arches, columns, walls, organic garlands, helium setups — any colour palette. Standalone balloon packages start around GHS 700. What event are we styling?',
    rental:
      'We rent Chiavari, banquet and plastic chairs, chair covers and sashes, table linens, backdrop frames with draping, lighting and red carpet. 🪑 Chiavari chairs go for roughly GHS 10–15 each. How many guests are you hosting?',
    location:
      'We are based in <strong>Dome, Greater Accra</strong> 📍 (P.O. Box 9527) and we decorate events all across Accra and beyond. See the map on our <a href="./contact.html" style="color:#B8860B;font-weight:700;text-decoration:underline;">contact page</a>.',
    greet:
      'Akwaaba! 🌸 So glad you are here. Ask me anything about decoration, florals, balloons, rentals or pricing — or tap a quick option below.',
    thanks:
      'You are most welcome! 🌿 It would be an honour to style your event. Anything else I can help with?',
    fallback:
      'Great question! For that, our human team will serve you best — reach them on <strong>024 226 4773</strong> or tap <em>Speak to Team</em> below. Meanwhile, would you like to see our packages or check availability?'
  };

  function detectIntent(text) {
    for (var i = 0; i < RESPONSES.length; i++) {
      if (RESPONSES[i].match.test(text)) return RESPONSES[i].intent;
    }
    return 'fallback';
  }

  function handleUser(text, intent) {
    addMsg(text.replace(/</g, '&lt;'), 'user');
    quick.innerHTML = '';
    var key = intent || detectIntent(text);
    botSay(INTENT_REPLIES[key] || INTENT_REPLIES.fallback, 1200).then(function () {
      setQuickReplies(DEFAULT_QUICK);
    });
  }

  /* ---------- Events ---------- */
  function setOpen(open) {
    win.classList.toggle('is-open', open);
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && !opened) { opened = true; playIntro(); }
    if (open) window.setTimeout(function () { input.focus(); }, 450);
  }
  fab.addEventListener('click', function () { setOpen(!win.classList.contains('is-open')); });
  closeBtn.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && win.classList.contains('is-open')) setOpen(false);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUser(text);
  });
})();
