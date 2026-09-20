/**
 * First-party analytics — the only tracker on the site, by design.
 * No Google Analytics, no third-party scripts: pageviews, events, web
 * vitals and errors beacon to our own /api/track and land in Neon.
 *
 * Privacy: visitor id is a random token in localStorage (no fingerprinting,
 * no cookies), sessions live in sessionStorage, and nothing personal is
 * ever sent. Admin/driver/tracking surfaces are never tracked.
 */
import { API } from '../config/api';

const VID_KEY = 'bar_vid';
const SID_KEY = 'bar_sid';
const ATTR_KEY = 'bar_attr';

// /pay/:bookingId is excluded too — tracking it wrote a booking UUID into
// the analytics store and minted one permanent daily row per booking.
const EXCLUDED = /^\/(admin|driver|track|pay)(\/|$)/;

function randomId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function visitorId() {
  try {
    let vid = localStorage.getItem(VID_KEY);
    if (!vid) { vid = randomId(); localStorage.setItem(VID_KEY, vid); }
    return vid;
  } catch { return 'anon'; }
}

function sessionId() {
  try {
    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) { sid = randomId(); sessionStorage.setItem(SID_KEY, sid); }
    return sid;
  } catch { return 'anon'; }
}

/** First-touch attribution: captured once, attached to bookings and
 *  driver applications so every SEO page gets a revenue number. */
export function getAttribution() {
  try {
    const stored = localStorage.getItem(ATTR_KEY);
    if (stored) return JSON.parse(stored);
    const params = new URLSearchParams(window.location.search);
    const attribution = {
      landingPage: window.location.pathname,
      referrer: (document.referrer || '').slice(0, 300),
      utmSource: (params.get('utm_source') || '').slice(0, 100),
      utmMedium: (params.get('utm_medium') || '').slice(0, 100),
      utmCampaign: (params.get('utm_campaign') || '').slice(0, 100),
      firstSeenAt: new Date().toISOString(),
    };
    localStorage.setItem(ATTR_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return null;
  }
}

function send(payload) {
  try {
    const body = JSON.stringify({ ...payload, vid: visitorId(), sid: sessionId() });
    const url = `${API}/track`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
    }
  } catch { /* analytics must never break the site */ }
}

export function trackPageview(path) {
  if (EXCLUDED.test(path)) return;
  send({ t: 'pageview', p: path, r: (document.referrer || '').slice(0, 300) });
}

export function trackEvent(name, meta = {}) {
  const path = window.location.pathname;
  if (EXCLUDED.test(path)) return;
  send({ t: 'event', p: path, n: String(name).slice(0, 60), m: meta });
}

/** Core Web Vitals, hand-rolled (no library): LCP + CLS reported when the
 *  page is hidden, worst-case INP approximated from event timings. */
export function initVitals() {
  if (typeof PerformanceObserver === 'undefined') return;
  let lcp = 0;
  let cls = 0;
  let inp = 0;
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > inp) inp = entry.duration;
      }
    }).observe({ type: 'event', durationThreshold: 40, buffered: true });
  } catch { return; }

  let reported = false;
  const report = () => {
    if (reported) return;
    reported = true;
    const path = window.location.pathname;
    if (EXCLUDED.test(path)) return;
    send({ t: 'vital', p: path, m: {
      lcp: Math.round(lcp),
      cls: Math.round(cls * 1000) / 1000,
      inp: Math.round(inp),
    } });
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') report();
  });
  window.addEventListener('pagehide', report);
}

/** JS error beacon — max 3 per session so a render loop can't flood us. */
export function initErrorTracking() {
  let sent = 0;
  window.addEventListener('error', (event) => {
    if (sent >= 3) return;
    // Same exclusion as pageviews — without it an error on /track/<ref> or
    // /admin/* beaconed that path into the analytics store, putting customer
    // tracking references and admin URLs in the SEO league table.
    if (EXCLUDED.test(window.location.pathname)) return;
    sent += 1;
    send({ t: 'error', p: window.location.pathname, m: {
      msg: String(event.message || '').slice(0, 300),
      src: String(event.filename || '').slice(0, 200),
      line: event.lineno || 0,
    } });
  });
}
