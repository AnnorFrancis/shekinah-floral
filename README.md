# Shekinah Floral Decor — Website & Admin Suite

A production-grade sample website for **Shekinah Floral Decor** — luxury event decoration,
floral design and rentals in Dome, Greater Accra, Ghana.

> Designed & Developed by [Perkins Creative](https://perkins-swart.vercel.app)

---

## What's inside

```
shekinah-floral/
  index.html          Home — hero slideshow, services, stats, gallery preview, packages, testimonials
  services.html       All 6 service categories + before/after slider + smart recommendations
  gallery.html        Filterable portfolio with FLIP animations and lightbox
  about.html          Story, timeline, values, team
  packages.html       3-tier pricing + interactive package builder (live estimate → WhatsApp)
  contact.html        4-step booking form with AI-generated estimate + map + contact channels
  admin/
    dashboard.html    Stats, revenue chart, popular services, recent bookings, 7-day timeline
    bookings.html     Search / filter / date-range table, detail drawer, status updates, add booking
    inventory.html    Rental stock grid with availability bars, categories, add item
    clients.html      Client database with history drawer and add client
    analytics.html    Revenue trend, event types, popular services, sources, YoY, seasonal heatmap
  css/
    style.css         Main site design system
    animations.css    Keyframes & motion utilities
    admin.css         Admin dashboard design system (light + dark)
  js/
    main.js           Nav, preloader, petal canvas, custom cursor, counters, reveals, WhatsApp float
    animations.js     GSAP ScrollTrigger layer, hero text choreography, tilt, before/after
    gallery.js        Gallery filters (FLIP) + lightbox
    booking.js        Multi-step form, validation, AI quote generator, package builder
    ai-chat.js        "Shekinah AI Assistant" chat widget (simulated)
    admin.js          Admin engine: mock data, tables, drawers, Chart.js, dark mode
  assets/
    icons/favicon.svg
    images/           (drop the client's real photos here later)
  README.md
```

## How to run

No build step. No install. Everything is plain HTML/CSS/JS with relative paths.

- **Quickest:** double-click `index.html`.
- **Recommended:** serve the folder so all browser features behave identically to production:
  - VS Code → "Live Server" extension → Open with Live Server, or
  - `python -m http.server` inside this folder → open `http://localhost:8000`
- **Hosting:** upload the whole folder as-is to any static host (Netlify, Vercel, cPanel,
  GitHub Pages…). No server code required.

Admin is at `/admin/dashboard.html` (linked nowhere on the public site on purpose —
open it directly when demoing).

## Internet requirements

The code itself is fully self-contained. Two things load from the internet at runtime:

1. **CDN libraries** — Google Fonts, GSAP + ScrollTrigger, Swiper, Vanilla-Tilt, Chart.js
   (all HTTPS). Every script is guarded: if a CDN fails, the page still works, just with
   fewer animations.
2. **Placeholder images** — Unsplash URLs, event/wedding/floral themed. If any image fails
   to load, an on-brand gradient placeholder appears automatically, so the demo never
   shows a broken image.

To go fully offline later: download the images into `assets/images/` and swap the URLs.

## Demo notes (for the pitch)

- **Everything is frontend-only.** Forms, the AI chat, the AI quote and the admin data are
  simulated with mock data — no data is sent anywhere. Production would add a backend
  (bookings DB, WhatsApp Business API, real AI assistant).
- **WhatsApp** buttons genuinely open `wa.me/233242264773` with pre-filled messages.
- **Dark mode** (admin sidebar toggle) persists via localStorage.
- **Package builder** and the **booking form estimate** compute prices live; the demo
  pricing tables live in `js/booking.js` and are easy to tune.
- Sample pricing: Bloom from GHS 3,000 · Elegance from GHS 8,000 · Royal from GHS 15,000.

## Business details baked in

- Shekinah Floral Decor · Dome, Greater Accra · P.O. Box 9527
- Phones: 024 226 4773 · 028 825 9177 · 024 448 8353
- WhatsApp: 024 226 4773 · Email placeholder: info@shekinahfloral.com

## Customising

- Colours/typography: CSS variables at the top of `css/style.css` and `css/admin.css`.
- Copy: all text is plain HTML in each page.
- Gallery: add/remove `.gallery-item` blocks in `gallery.html` (set `data-cat`,
  `data-title`, `data-full`).
- Mock admin data: arrays at the top of `js/admin.js`.
