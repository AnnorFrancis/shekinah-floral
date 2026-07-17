/* ============================================================
   SHEKINAH FLORAL DECOR — booking.js
   Multi-step booking form with validation, AI quote generator,
   and the interactive package builder (packages page).
   Frontend demo — no data leaves the page.
   ============================================================ */
(function () {
  'use strict';

  function fmtGHS(n) {
    return 'GHS ' + Math.round(n).toLocaleString();
  }

  /* ============================================================
     MULTI-STEP BOOKING FORM (contact.html)
     ============================================================ */
  var form = document.getElementById('booking-form');
  if (form) {
    var steps = form.querySelectorAll('.form-step');
    var dots = document.querySelectorAll('.progress-step');
    var current = 0;

    function showStep(i) {
      current = i;
      steps.forEach(function (s, idx) { s.classList.toggle('is-active', idx === i); });
      dots.forEach(function (d, idx) {
        d.classList.toggle('is-current', idx === i);
        d.classList.toggle('is-done', idx < i);
      });
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateStep(i) {
      var ok = true;
      steps[i].querySelectorAll('[required]').forEach(function (el) {
        var field = el.closest('.field');
        var valid = !!el.value.trim();
        if (valid && el.type === 'tel') valid = /^[\d\s+()-]{9,}$/.test(el.value.trim());
        if (valid && el.type === 'date') valid = el.value >= new Date().toISOString().slice(0, 10);
        if (field) field.classList.toggle('has-error', !valid);
        if (!valid) ok = false;
      });
      return ok;
    }

    form.querySelectorAll('[data-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!validateStep(current)) return;
        if (current === steps.length - 2) buildQuote(); // entering review step
        showStep(current + 1);
      });
    });
    form.querySelectorAll('[data-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () { showStep(current - 1); });
    });

    // Checkbox pills toggle state
    form.querySelectorAll('.check-pill input').forEach(function (cb) {
      cb.addEventListener('change', function () {
        cb.closest('.check-pill').classList.toggle('is-checked', cb.checked);
      });
    });

    /* ---------- AI Quote Generator ---------- */
    var SERVICE_PRICES = {
      decoration: { label: 'Venue decoration & styling', base: 2200 },
      florals: { label: 'Floral arrangements', base: 1400 },
      balloons: { label: 'Balloon installations', base: 800 },
      rentals: { label: 'Chairs, linens & rentals', base: 900 },
      lighting: { label: 'Lighting design', base: 700 },
      bridal: { label: 'Bridal party florals', base: 1100 }
    };
    var EVENT_MULTIPLIER = {
      'Wedding': 1.35, 'Engagement / Traditional': 1.2, 'Birthday Party': 0.85,
      'Baby Shower': 0.75, 'Naming Ceremony': 0.8, 'Graduation': 0.8,
      'Anniversary': 0.9, 'Corporate Event': 1.15, 'Funeral': 0.95, 'Other': 1
    };

    function buildQuote() {
      var panel = document.getElementById('quote-panel');
      if (!panel) return;
      var lines = panel.querySelector('.quote-lines');
      var totalEl = panel.querySelector('.quote-total .value');

      var evType = (form.querySelector('[name="event-type"]') || {}).value || 'Other';
      var guests = parseInt((form.querySelector('[name="guests"]') || {}).value, 10) || 50;
      var mult = (EVENT_MULTIPLIER[evType] || 1) * (1 + Math.min(guests, 600) / 500);

      var checked = Array.prototype.slice.call(form.querySelectorAll('.check-pill input:checked'));
      if (!checked.length) checked = [{ value: 'decoration' }];

      lines.innerHTML = '';
      var total = 0;
      checked.forEach(function (cb) {
        var svc = SERVICE_PRICES[cb.value];
        if (!svc) return;
        var price = svc.base * mult;
        total += price;
        var li = document.createElement('li');
        li.innerHTML = '<span>' + svc.label + '</span><span>' + fmtGHS(price) + '</span>';
        lines.appendChild(li);
      });
      var setup = total * 0.12;
      total += setup;
      var liSetup = document.createElement('li');
      liSetup.innerHTML = '<span>Setup & teardown</span><span>' + fmtGHS(setup) + '</span>';
      lines.appendChild(liSetup);

      // Animate the total counting up (with a hard fallback so the
      // exact figure always lands even if rAF is throttled)
      var start = null, from = 0, dur = 1100;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        totalEl.textContent = fmtGHS(from + (total - from) * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      window.setTimeout(function () { totalEl.textContent = fmtGHS(total); }, dur + 150);

      // Review summary
      var review = document.getElementById('review-summary');
      if (review) {
        var name = (form.querySelector('[name="name"]') || {}).value || '—';
        var date = (form.querySelector('[name="event-date"]') || {}).value || '—';
        var venue = (form.querySelector('[name="venue"]') || {}).value || 'To be decided';
        review.innerHTML =
          '<li><span>Name</span><span>' + name.replace(/</g, '&lt;') + '</span></li>' +
          '<li><span>Event</span><span>' + evType + '</span></li>' +
          '<li><span>Date</span><span>' + date + '</span></li>' +
          '<li><span>Venue</span><span>' + venue.replace(/</g, '&lt;') + '</span></li>' +
          '<li><span>Guests</span><span>' + guests + '</span></li>';
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(current)) return;
      // Demo: show success state
      form.querySelector('.form-steps-wrap').style.display = 'none';
      var progress = form.querySelector('.progress-steps');
      if (progress) progress.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
      var wa = document.getElementById('success-wa');
      if (wa) {
        var name = (form.querySelector('[name="name"]') || {}).value || '';
        var evType = (form.querySelector('[name="event-type"]') || {}).value || '';
        var date = (form.querySelector('[name="event-date"]') || {}).value || '';
        wa.href = 'https://wa.me/233242264773?text=' + encodeURIComponent(
          'Hello Shekinah! I just submitted a booking request. Name: ' + name +
          ', Event: ' + evType + ', Date: ' + date + '. Looking forward to hearing from you!');
      }
    });

    showStep(0);
  }

  /* ============================================================
     PACKAGE BUILDER (packages.html)
     ============================================================ */
  var builder = document.getElementById('package-builder');
  if (builder) {
    var opts = builder.querySelectorAll('.builder-opt');
    var linesEl = document.getElementById('builder-lines');
    var totalEl = document.getElementById('builder-total');
    var waBtn = document.getElementById('builder-wa');
    var displayed = 0;

    function refresh() {
      var total = 0;
      var chosen = [];
      opts.forEach(function (opt) {
        var input = opt.querySelector('input');
        opt.classList.toggle('is-checked', input.checked);
        if (input.checked) {
          var price = parseInt(opt.getAttribute('data-price'), 10);
          total += price;
          chosen.push({ name: opt.getAttribute('data-name'), price: price });
        }
      });

      if (!chosen.length) {
        linesEl.innerHTML = '<li class="empty">Select services to build your package…</li>';
      } else {
        linesEl.innerHTML = chosen.map(function (c) {
          return '<li><span>' + c.name + '</span><span>' + fmtGHS(c.price) + '</span></li>';
        }).join('');
      }

      // Smooth count to new total (hard fallback lands the exact figure)
      var from = displayed, to = total, start = null, dur = 600;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        displayed = from + (to - from) * eased;
        totalEl.textContent = fmtGHS(displayed);
        if (p < 1) requestAnimationFrame(tick);
        else displayed = to;
      }
      requestAnimationFrame(tick);
      window.setTimeout(function () { displayed = to; totalEl.textContent = fmtGHS(to); }, dur + 150);

      if (waBtn) {
        var msg = chosen.length
          ? 'Hello Shekinah! I built a custom package on your website: ' +
            chosen.map(function (c) { return c.name; }).join(', ') +
            '. Estimated total: ' + fmtGHS(to) + '. Can we discuss?'
          : 'Hello Shekinah! I would like to discuss a custom event package.';
        waBtn.href = 'https://wa.me/233242264773?text=' + encodeURIComponent(msg);
      }
    }

    // The options are <label> elements, so the browser toggles the
    // checkbox natively — we only need to react to the change.
    opts.forEach(function (opt) {
      opt.querySelector('input').addEventListener('change', refresh);
    });
    refresh();
  }
})();
