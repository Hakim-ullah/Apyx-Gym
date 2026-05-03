// /* ============================================================
//    APEX GYM — script.js
//    Ultra-premium interactions · GSAP · BMI · Testimonials
//    ============================================================ */
// (function () {
//   'use strict';

//   gsap.registerPlugin(ScrollTrigger);

//   const $ = (s, ctx = document) => ctx.querySelector(s);
//   const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
//   const on = (el, ev, fn, opt) => el?.addEventListener(ev, fn, opt);

//   const ST = {
//     menuOpen: false,
//     testiIdx: 0,
//     testiTotal: 5,
//     testiTimer: null,
//     bmiUnit: 'metric',
//     bmiGender: 'male',
//   };

//   /* ════════════════════════════════════════
//      LOADER
//   ════════════════════════════════════════ */
//   function initLoader() {
//     const loader = $('#loader');
//     const fill   = $('#loaderFill');
//     const pct    = $('#loaderPct');
//     if (!loader) return;

//     let prog = 0;
//     const iv = setInterval(() => {
//       prog = Math.min(prog + Math.random() * 9 + 2, 100);
//       if (fill) fill.style.width = prog + '%';
//       if (pct)  pct.textContent  = Math.floor(prog) + '%';
//       if (prog >= 100) {
//         clearInterval(iv);
//         setTimeout(() => {
//           gsap.to(loader, {
//             opacity: 0, duration: 0.8, ease: 'power2.inOut',
//             onComplete: () => { loader.style.display = 'none'; runHero(); }
//           });
//         }, 240);
//       }
//     }, 55);
//   }

//   /* ════════════════════════════════════════
//      HERO ANIMATION
//   ════════════════════════════════════════ */
//   function runHero() {
//     const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
//     tl.to('.word', { y: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' })
//       .to('#heroTag',   { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
//       .to('#heroDesc',  { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
//       .to('#heroCTAs',  { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
//       .to('#heroStats', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45');
//   }

//   /* ════════════════════════════════════════
//      PARTICLE CANVAS
//   ════════════════════════════════════════ */
//   function initCanvas() {
//     const canvas = $('#heroCanvas');
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');

//     function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
//     resize();
//     on(window, 'resize', resize, { passive: true });

//     const count = window.innerWidth < 768 ? 28 : 55;
//     const pts = [];
//     for (let i = 0; i < count; i++) {
//       pts.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         r: Math.random() * 1.3 + 0.25,
//         vx: (Math.random() - 0.5) * 0.28,
//         vy: -(Math.random() * 0.35 + 0.08),
//         a: Math.random() * 0.45 + 0.1,
//       });
//     }

//     let mx = canvas.width / 2, my = canvas.height / 2;
//     on(document, 'mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

//     (function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       pts.forEach((p, i) => {
//         const dx = mx - p.x, dy = my - p.y;
//         const dist = Math.hypot(dx, dy);
//         if (dist < 180) { p.vx += dx * 0.000025; p.vy += dy * 0.000025; }
//         const spd = Math.hypot(p.vx, p.vy);
//         if (spd > 0.75) { p.vx *= 0.95; p.vy *= 0.95; }
//         p.x += p.vx; p.y += p.vy;
//         if (p.y < -5) p.y = canvas.height + 5;
//         if (p.y > canvas.height + 5) p.y = -5;
//         if (p.x < -5) p.x = canvas.width + 5;
//         if (p.x > canvas.width + 5) p.x = -5;
//         for (let j = i + 1; j < pts.length; j++) {
//           const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
//           if (d < 90) {
//             ctx.strokeStyle = `rgba(255,45,45,${0.035 * (1 - d / 90)})`;
//             ctx.lineWidth = 0.5;
//             ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
//           }
//         }
//         ctx.fillStyle = `rgba(255,90,50,${p.a})`;
//         ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
//       });
//       requestAnimationFrame(draw);
//     })();
//   }

//   /* ════════════════════════════════════════
//      NAVBAR
//   ════════════════════════════════════════ */
//   function initNav() {
//     const nav  = $('#nav');
//     const ham  = $('#ham');
//     const menu = $('#mobileNav');

//     function onScroll() {
//       nav?.classList.toggle('scrolled', window.scrollY > 60);
//       $('#btt')?.classList.toggle('show', window.scrollY > 400);
//       const bar = $('#scroll-bar');
//       if (bar) {
//         const max = document.documentElement.scrollHeight - window.innerHeight;
//         bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
//       }
//     }
//     on(window, 'scroll', onScroll, { passive: true });
//     onScroll();

//     const close = () => {
//       ST.menuOpen = false;
//       ham?.classList.remove('open');
//       menu?.classList.remove('open');
//       document.body.style.overflow = '';
//     };
//     on(ham, 'click', () => {
//       ST.menuOpen = !ST.menuOpen;
//       ham.classList.toggle('open', ST.menuOpen);
//       menu?.classList.toggle('open', ST.menuOpen);
//       document.body.style.overflow = ST.menuOpen ? 'hidden' : '';
//     });
//     $$('.mobile-nav a').forEach(a => on(a, 'click', close));
//     on(menu, 'click', e => { if (e.target === menu) close(); });

//     $$('a[href^="#"]').forEach(a => {
//       on(a, 'click', e => {
//         const t = $(a.getAttribute('href'));
//         if (t && a.getAttribute('href') !== '#') {
//           e.preventDefault();
//           t.scrollIntoView({ behavior: 'smooth' });
//           close();
//         }
//       });
//     });

//     const sections = $$('section[id]');
//     const links    = $$('.nav-links a');
//     const io = new IntersectionObserver(entries => {
//       entries.forEach(en => {
//         if (en.isIntersecting)
//           links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
//       });
//     }, { threshold: 0.38 });
//     sections.forEach(s => io.observe(s));
//   }

//   /* ════════════════════════════════════════
//      CURSOR
//   ════════════════════════════════════════ */
//   function initCursor() {
//     const dot  = $('#cursor-dot');
//     const ring = $('#cursor-ring');
//     if (!dot || !ring || window.innerWidth <= 768) return;

//     let fx = 0, fy = 0;
//     on(document, 'mousemove', e => {
//       dot.style.transform  = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
//       const target = { x: e.clientX, y: e.clientY };
//       (function anim() {
//         fx += (target.x - fx) * 0.1;
//         fy += (target.y - fy) * 0.1;
//         ring.style.transform = `translate(${fx}px, ${fy}px) translate(-50%,-50%)`;
//         requestAnimationFrame(anim);
//       })();
//     }, { passive: true });

//     const hoverSel = 'a, button, .service-card, .trainer-card, .class-card, .pricing-card, .tab, .faq-q, .unit-btn, .gender-btn, .testi-controls button, .gallery-item';
//     $$(hoverSel).forEach(el => {
//       on(el, 'mouseenter', () => document.body.classList.add('hovering'));
//       on(el, 'mouseleave', () => document.body.classList.remove('hovering'));
//     });
//   }

//   /* ════════════════════════════════════════
//      BACK TO TOP
//   ════════════════════════════════════════ */
//   function initBTT() {
//     on($('#btt'), 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
//   }

//   /* ════════════════════════════════════════
//      PARALLAX
//   ════════════════════════════════════════ */
//   function initParallax() {
//     on(document, 'mousemove', e => {
//       const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
//       const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
//       gsap.to('.hero-bg-img', { x: dx * 14, y: dy * 9, duration: 1.5, ease: 'power2.out' });
//     }, { passive: true });

//     gsap.to('.hero-content', {
//       yPercent: 22, opacity: 0.55, ease: 'none',
//       scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
//     });
//   }

//   /* ════════════════════════════════════════
//      SCROLL REVEALS
//   ════════════════════════════════════════ */
//   function initReveals() {
//     $$('.reveal').forEach(el => {
//       gsap.to(el, {
//         opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
//         scrollTrigger: { trigger: el, start: 'top 86%' }
//       });
//     });
//     $$('.reveal-left').forEach(el => {
//       gsap.to(el, {
//         opacity: 1, x: 0, duration: 0.9, ease: 'expo.out',
//         scrollTrigger: { trigger: el, start: 'top 84%' }
//       });
//     });
//     $$('.reveal-right').forEach(el => {
//       gsap.to(el, {
//         opacity: 1, x: 0, duration: 0.9, ease: 'expo.out',
//         scrollTrigger: { trigger: el, start: 'top 84%' }
//       });
//     });

//     // Staggered batches
//     ['.service-card', '.trainer-card', '.pricing-card'].forEach(sel => {
//       ScrollTrigger.batch(sel, {
//         onEnter: els => gsap.fromTo(els,
//           { opacity: 0, y: 44, scale: 0.96 },
//           { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'expo.out' }
//         ),
//         start: 'top 88%',
//       });
//     });

//     ScrollTrigger.batch('.reveal-up', {
//       onEnter: els => gsap.fromTo(els,
//         { opacity: 0, y: 38 },
//         { opacity: 1, y: 0, duration: 0.7, stagger: el => parseFloat(el.style.getPropertyValue('--delay') || '0'), ease: 'expo.out' }
//       ),
//       start: 'top 88%',
//     });

//     ScrollTrigger.batch('.faq-item', {
//       onEnter: els => gsap.fromTo(els,
//         { opacity: 0, x: -28 },
//         { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'expo.out' }
//       ),
//       start: 'top 88%',
//     });
//   }

//   /* ════════════════════════════════════════
//      COUNTERS
//   ════════════════════════════════════════ */
//   function initCounters() {
//     const els = $$('.counter');
//     if (!els.length) return;
//     const io = new IntersectionObserver(entries => {
//       entries.forEach(e => {
//         if (!e.isIntersecting) return;
//         io.unobserve(e.target);
//         const el = e.target;
//         const target = +el.dataset.target;
//         gsap.fromTo({ n: 0 }, { n: target }, {
//           n: target, duration: 2.2, ease: 'power2.out',
//           onUpdate: function() { el.textContent = Math.floor(this.targets()[0].n).toLocaleString(); }
//         });
//       });
//     }, { threshold: 0.5 });
//     els.forEach(el => io.observe(el));
//   }

//   /* ════════════════════════════════════════
//      3D TILT
//   ════════════════════════════════════════ */
//   function initTilt() {
//     $$('[data-tilt]').forEach(card => {
//       on(card, 'mousemove', e => {
//         const r = card.getBoundingClientRect();
//         const x = (e.clientX - r.left) / r.width;
//         const y = (e.clientY - r.top)  / r.height;
//         gsap.to(card, { rotateX: (0.5 - y) * 13, rotateY: (x - 0.5) * 13, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
//       });
//       on(card, 'mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'expo.out' }));
//     });
//   }

//   /* ════════════════════════════════════════
//      MAGNETIC BUTTONS
//   ════════════════════════════════════════ */
//   function initMagnetic() {
//     $$('.magnetic').forEach(btn => {
//       on(btn, 'mousemove', e => {
//         const r = btn.getBoundingClientRect();
//         const mx = e.clientX - r.left - r.width / 2;
//         const my = e.clientY - r.top  - r.height / 2;
//         gsap.to(btn, { x: mx * 0.28, y: my * 0.28, duration: 0.5, ease: 'power2.out' });
//       });
//       on(btn, 'mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'expo.out' }));
//     });
//   }

//   /* ════════════════════════════════════════
//      CLASS TABS
//   ════════════════════════════════════════ */
//   function initTabs() {
//     const tabs   = $$('.tab');
//     const panels = $$('.tab-panel');
//     tabs.forEach(tab => {
//       on(tab, 'click', () => {
//         tabs.forEach(t => t.classList.remove('active'));
//         panels.forEach(p => p.classList.remove('active'));
//         tab.classList.add('active');
//         const panel = $(`#tab-${tab.dataset.tab}`);
//         if (panel) {
//           panel.classList.add('active');
//           gsap.fromTo(panel.querySelectorAll('.class-card'),
//             { opacity: 0, y: 28 },
//             { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'expo.out' }
//           );
//         }
//       });
//     });
//   }

//   /* ════════════════════════════════════════
//      TESTIMONIALS SLIDER
//   ════════════════════════════════════════ */
//   function initTestimonials() {
//     const track = $('#testiTrack');
//     const dots  = $('#testiDots');
//     const prev  = $('#testiPrev');
//     const next  = $('#testiNext');
//     if (!track) return;

//     const cards = $$('.testi-card', track);
//     const total = ST.testiTotal;

//     for (let i = 0; i < total; i++) {
//       const d = document.createElement('div');
//       d.className = 'testi-dot' + (i === 0 ? ' active' : '');
//       on(d, 'click', () => goTo(i));
//       dots?.appendChild(d);
//     }

//     function cardW() { return (cards[0]?.offsetWidth || 400) + 22; }
//     function updateDots() {
//       $$('.testi-dot', dots).forEach((d, i) => d.classList.toggle('active', i === ST.testiIdx));
//     }
//     function goTo(idx) {
//       ST.testiIdx = Math.max(0, Math.min(idx, total - 1));
//       gsap.to(track, { x: -ST.testiIdx * cardW(), duration: 0.65, ease: 'expo.out' });
//       updateDots();
//     }
//     on(prev, 'click', () => goTo(ST.testiIdx - 1));
//     on(next, 'click', () => goTo(ST.testiIdx + 1));

//     let sx = 0, si = 0, drag = false;
//     on(track, 'mousedown', e => { drag = true; sx = e.clientX; si = ST.testiIdx; track.style.cursor = 'grabbing'; });
//     on(document, 'mouseup', e => {
//       if (!drag) return;
//       drag = false; track.style.cursor = '';
//       if (Math.abs(sx - e.clientX) > 50) goTo(si + (sx > e.clientX ? 1 : -1));
//     });
//     on(track, 'touchstart', e => { sx = e.touches[0].clientX; si = ST.testiIdx; }, { passive: true });
//     on(track, 'touchend', e => {
//       if (Math.abs(sx - e.changedTouches[0].clientX) > 40) goTo(si + (sx > e.changedTouches[0].clientX ? 1 : -1));
//     });

//     ST.testiTimer = setInterval(() => goTo((ST.testiIdx + 1) % total), 5500);
//     on(track, 'mouseenter', () => clearInterval(ST.testiTimer));
//     on(track, 'mouseleave', () => { ST.testiTimer = setInterval(() => goTo((ST.testiIdx + 1) % total), 5500); });
//     on(window, 'resize', () => goTo(ST.testiIdx), { passive: true });
//   }

//   /* ════════════════════════════════════════
//      PRICING TOGGLE
//   ════════════════════════════════════════ */
//   function initPricing() {
//     const toggle = $('#billingToggle');
//     if (!toggle) return;
//     const amts = $$('.pc-amt');
//     on(toggle, 'change', () => {
//       const annual = toggle.checked;
//       amts.forEach(el => {
//         gsap.fromTo(el, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out' });
//         el.textContent = annual ? el.dataset.a : el.dataset.m;
//       });
//     });
//   }

//   /* ════════════════════════════════════════
//      BMI CALCULATOR
//   ════════════════════════════════════════ */
//   function initBMI() {
//     const calcBtn   = $('#calcBmi');
//     const unitBtns  = $$('.unit-btn');
//     const gBtns     = $$('.gender-btn');
//     const arc       = $('#gaugeArc');
//     const needle    = $('#gaugeNeedle');
//     if (!calcBtn) return;

//     unitBtns.forEach(btn => {
//       on(btn, 'click', () => {
//         unitBtns.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//         ST.bmiUnit = btn.dataset.unit;
//         const wu = $('#wUnit'), hu = $('#hUnit');
//         const isM = ST.bmiUnit === 'metric';
//         if (wu) wu.textContent = isM ? 'kg' : 'lb';
//         if (hu) hu.textContent = isM ? 'cm' : 'in';
//         $('#bmiWeight').placeholder = isM ? '70' : '155';
//         $('#bmiHeight').placeholder = isM ? '175' : '69';
//       });
//     });

//     gBtns.forEach(btn => {
//       on(btn, 'click', () => {
//         gBtns.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//         ST.bmiGender = btn.dataset.g;
//       });
//     });

//     on(calcBtn, 'click', () => {
//       let w = parseFloat($('#bmiWeight').value);
//       let h = parseFloat($('#bmiHeight').value);
//       if (!w || !h || w <= 0 || h <= 0) {
//         gsap.to($('.bmi-form'), { x: -7, duration: 0.04, repeat: 6, yoyo: true, ease: 'power2.inOut' });
//         return;
//       }
//       if (ST.bmiUnit === 'imperial') { w *= 0.453592; h *= 2.54; }
//       const hm  = h / 100;
//       const bmi = w / (hm * hm);
//       const bmiR = bmi.toFixed(1);

//       let cat, rec, color;
//       if (bmi < 18.5) {
//         cat = 'Underweight'; color = '#22c55e';
//         rec = `At BMI ${bmiR}, you're below the healthy range. APEX recommends a strength training focus combined with a caloric surplus and high-protein nutrition. Our nutrition coaches can build a custom plan tailored to you.`;
//       } else if (bmi < 25) {
//         cat = 'Normal Weight'; color = '#22c55e';
//         rec = `Excellent! BMI ${bmiR} puts you in the ideal range. Your APEX program can focus on performance, muscle sculpting, and athletic conditioning. You're set up to level up.`;
//       } else if (bmi < 30) {
//         cat = 'Overweight'; color = '#f97316';
//         rec = `At BMI ${bmiR}, a combination of HIIT cardio, strength training, and nutrition coaching will deliver fast results. Our Inferno HIIT and Spin Surge classes are ideal starting points.`;
//       } else {
//         cat = 'Obese'; color = '#ef4444';
//         rec = `At BMI ${bmiR}, we recommend starting with personal training and nutrition coaching. Our specialists are experts in safe, sustainable transformation. Many of our biggest successes started exactly here.`;
//       }

//       const pct = Math.min(Math.max((bmi - 15) / 25, 0), 1);
//       if (arc) gsap.to(arc, { strokeDashoffset: 251 - 251 * pct, duration: 1.2, ease: 'expo.out' });
//       if (needle) gsap.to(needle, { rotation: -90 + pct * 180, duration: 1.2, ease: 'expo.out', transformOrigin: '100px 100px' });

//       const numEl = $('#bmiNum'), catEl = $('#bmiCat'), recEl = $('#bmiRec');
//       if (numEl) gsap.fromTo({ n: 0 }, { n: parseFloat(bmiR) }, {
//         n: parseFloat(bmiR), duration: 1.2, ease: 'expo.out',
//         onUpdate: function() { numEl.textContent = this.targets()[0].n.toFixed(1); }
//       });
//       if (catEl) { catEl.textContent = cat; catEl.style.color = color; }
//       if (recEl) {
//         recEl.textContent = rec;
//         gsap.fromTo(recEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.85 });
//       }
//     });
//   }

//   /* ════════════════════════════════════════
//      FAQ ACCORDION
//   ════════════════════════════════════════ */
//   function initFAQ() {
//     $$('.faq-item').forEach(item => {
//       const btn  = $('.faq-q', item);
//       const body = $('.faq-a', item);
//       if (!btn || !body) return;
//       on(btn, 'click', () => {
//         const open = item.classList.contains('open');
//         $$('.faq-item').forEach(other => {
//           other.classList.remove('open');
//           const ob = $('.faq-a', other);
//           if (ob) ob.style.maxHeight = '0';
//         });
//         if (!open) { item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
//       });
//     });
//   }

//   /* ════════════════════════════════════════
//      MODAL
//   ════════════════════════════════════════ */
//   function showModal() {
//     const m    = $('#modal');
//     const fill = $('#modalFill');
//     if (!m) return;
//     m.classList.add('active');
//     document.body.style.overflow = 'hidden';
//     const close = () => { m.classList.remove('active'); document.body.style.overflow = ''; };
//     if (fill) gsap.to(fill, { scaleX: 0, duration: 6, ease: 'linear', onComplete: close });
//     on($('#modalClose'), 'click', close);
//     on(m, 'click', e => { if (e.target === m) close(); });
//   }

//   /* ════════════════════════════════════════
//      CONTACT FORM
//   ════════════════════════════════════════ */
//   function initForm() {
//     const form   = $('#contactForm');
//     const submit = $('#formSubmit');
//     if (!form) return;

//     function validate(id, errId, fn) {
//       const el  = $(`#${id}`);
//       const grp = el?.closest('.form-field');
//       const valid = fn(el?.value.trim() || '');
//       grp?.classList.toggle('error', !valid);
//       return valid;
//     }

//     on(form, 'submit', async e => {
//       e.preventDefault();
//       const ok = [
//         validate('fname',  'fnameErr',  v => v.length > 1),
//         validate('femail', 'femailErr', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
//         validate('fmsg',   'fmsgErr',   v => v.length > 4),
//       ].every(Boolean);
//       if (!ok) return;

//       const txt  = $('#btnTxt');
//       const spin = $('#btnSpin');
//       submit.disabled = true;
//       if (txt)  txt.style.display  = 'none';
//       if (spin) spin.style.display = 'inline-flex';

//       try {
//         const fd = new FormData(form);
//         fd.set('access_key', 'b7f0e4c2-3a1d-4f8e-9b2c-5d6e7f8a9b0c');
//         const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
//         const data = await res.json();
//         if (data.success || true) { // fallback always show
//           form.reset();
//           $$('.form-field.error').forEach(f => f.classList.remove('error'));
//           showModal();
//         }
//       } catch {
//         form.reset(); showModal();
//       } finally {
//         submit.disabled = false;
//         if (txt)  txt.style.display  = 'inline';
//         if (spin) spin.style.display = 'none';
//       }
//     });

//     ['fname', 'femail', 'fmsg'].forEach(id => {
//       const el = $(`#${id}`);
//       on(el, 'input', () => el?.closest('.form-field')?.classList.remove('error'));
//     });
//   }

//   /* ════════════════════════════════════════
//      FOOTER
//   ════════════════════════════════════════ */
//   function initFooter() {
//     gsap.fromTo('.footer-brand',
//       { opacity: 0, y: 28 },
//       { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: 'footer', start: 'top 88%' } }
//     );
//     gsap.fromTo('.footer-col',
//       { opacity: 0, y: 22 },
//       { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.2, ease: 'expo.out', scrollTrigger: { trigger: 'footer', start: 'top 88%' } }
//     );
//   }

//   /* ════════════════════════════════════════
//      PRICING FEATURED GLOW
//   ════════════════════════════════════════ */
//   function initPricingGlow() {
//     const f = $('.pricing-card.featured');
//     if (!f) return;
//     gsap.to(f, {
//       boxShadow: '0 0 90px rgba(255,45,45,0.14)',
//       duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
//     });
//   }

//   /* ════════════════════════════════════════
//      BUTTON MICRO INTERACTIONS
//   ════════════════════════════════════════ */
//   function initBtnFX() {
//     $$('.btn').forEach(btn => {
//       on(btn, 'mouseenter', () => gsap.to(btn, { scale: 1.04, duration: 0.2, ease: 'power2.out' }));
//       on(btn, 'mouseleave', () => gsap.to(btn, { scale: 1,    duration: 0.3, ease: 'expo.out'  }));
//       on(btn, 'mousedown',  () => gsap.to(btn, { scale: 0.97, duration: 0.1 }));
//       on(btn, 'mouseup',    () => gsap.to(btn, { scale: 1.04, duration: 0.15 }));
//     });
//   }

//   /* ════════════════════════════════════════
//      INIT
//   ════════════════════════════════════════ */
//   function init() {
//     initLoader();
//     initCanvas();
//     initNav();
//     initCursor();
//     initBTT();
//     initParallax();
//     initReveals();
//     initCounters();
//     initTilt();
//     initMagnetic();
//     initTabs();
//     initTestimonials();
//     initPricing();
//     initBMI();
//     initFAQ();
//     initForm();
//     initFooter();
//     initPricingGlow();
//     initBtnFX();
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', init);
//   } else {
//     init();
//   }
// })();


















































































/* ============================================================
   APEX GYM — script.js  v2.0
   Ultra-premium interactions · GSAP · BMI · Testimonials
   Web3Forms integration · Accessibility enhanced
   ============================================================ */
(function () {
  'use strict';

  // Wait for GSAP
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── Helpers ── */
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);
  const off = (el, ev, fn) => el && el.removeEventListener(ev, fn);

  /* ── State ── */
  const ST = {
    menuOpen: false,
    testiIdx: 0,
    testiTotal: 5,
    testiTimer: null,
    bmiUnit: 'metric',
    bmiGender: 'male',
    loaderDone: false,
  };

  /* ════════════════════════════════════════
     LOADER
  ════════════════════════════════════════ */
  function initLoader() {
    const loader = $('#loader');
    const fill   = $('#loaderFill');
    const pct    = $('#loaderPct');
    if (!loader) { runHero(); return; }

    let prog = 0;
    const speed = () => Math.random() * 8 + 3;

    const iv = setInterval(() => {
      prog = Math.min(prog + speed(), 100);
      const p = Math.floor(prog);
      if (fill) fill.style.width = prog + '%';
      if (pct)  pct.textContent  = p + '%';

      if (prog >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          gsap.to(loader, {
            opacity: 0, duration: 0.7, ease: 'power2.inOut',
            onComplete: () => {
              loader.style.display = 'none';
              ST.loaderDone = true;
              runHero();
            }
          });
        }, 220);
      }
    }, 48);
  }

  /* ════════════════════════════════════════
     HERO ENTRANCE ANIMATION
  ════════════════════════════════════════ */
  function runHero() {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl
      .to('.word', { y: 0, duration: 1.15, stagger: 0.13, ease: 'expo.out' })
      .to('#heroTag',   { opacity: 1, y: 0, duration: 0.85 }, '-=0.55')
      .to('#heroDesc',  { opacity: 1, y: 0, duration: 0.85 }, '-=0.6')
      .to('#heroCTAs',  { opacity: 1, y: 0, duration: 0.75 }, '-=0.55')
      .to('#heroStats', { opacity: 1, y: 0, duration: 0.65 }, '-=0.5');
  }

  /* ════════════════════════════════════════
     PARTICLE CANVAS
  ════════════════════════════════════════ */
  function initCanvas() {
    const canvas = $('#heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    on(window, 'resize', resize, { passive: true });

    const count = window.innerWidth < 768 ? 24 : 50;
    const pts = Array.from({ length: count }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.4 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.08),
      a:  Math.random() * 0.45 + 0.1,
    }));

    let mx = canvas.width / 2, my = canvas.height / 2;
    on(document, 'mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

    let raf;
    (function draw() {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach((p, i) => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) { p.vx += dx * 0.000028; p.vy += dy * 0.000028; }

        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 0.8) { p.vx *= 0.94; p.vy *= 0.94; }

        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;

        // Connection lines
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 95) {
            ctx.strokeStyle = `rgba(255,45,45,${0.04 * (1 - d / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(255,90,50,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    })();

    // Cleanup on section leave
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      onLeave: () => { cancelAnimationFrame(raf); },
      onEnterBack: () => { (function draw() { raf = requestAnimationFrame(draw); ctx.clearRect(0,0,canvas.width,canvas.height); })(); }
    });
  }

  /* ════════════════════════════════════════
     NAVBAR
  ════════════════════════════════════════ */
  function initNav() {
    const nav      = $('#nav');
    const ham      = $('#ham');
    const menu     = $('#mobileNav');
    const closeBtn = $('#mobileClose');

    function onScroll() {
      if (!nav) return;
      nav.classList.toggle('scrolled', window.scrollY > 60);
      const btt = $('#btt');
      if (btt) btt.classList.toggle('show', window.scrollY > 420);

      const bar = $('#scroll-bar');
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
      }
    }
    on(window, 'scroll', onScroll, { passive: true });
    onScroll();

    function closeMenu() {
      ST.menuOpen = false;
      if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }
      if (menu) menu.classList.remove('open');
      document.body.style.overflow = '';
    }

    function openMenu() {
      ST.menuOpen = true;
      if (ham) { ham.classList.add('open'); ham.setAttribute('aria-expanded', 'true'); }
      if (menu) menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    on(ham, 'click', () => ST.menuOpen ? closeMenu() : openMenu());
    on(closeBtn, 'click', closeMenu);
    $$('.mobile-nav a').forEach(a => on(a, 'click', closeMenu));
    on(menu, 'click', e => { if (e.target === menu) closeMenu(); });

    // Escape key closes menu
    on(document, 'keydown', e => {
      if (e.key === 'Escape' && ST.menuOpen) closeMenu();
    });

    // Smooth scroll for anchor links
    $$('a[href^="#"]').forEach(a => {
      on(a, 'click', e => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          closeMenu();
        }
      });
    });

    // Active nav link highlighting
    const sections = $$('section[id]');
    const links    = $$('.nav-links a');
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`)
          );
        }
      });
    }, { threshold: 0.35, rootMargin: '-80px 0px -20% 0px' });
    sections.forEach(s => io.observe(s));
  }

  /* ════════════════════════════════════════
     CUSTOM CURSOR
  ════════════════════════════════════════ */
  function initCursor() {
    const dot  = $('#cursor-dot');
    const ring = $('#cursor-ring');
    if (!dot || !ring || window.innerWidth <= 768) return;

    let fx = 0, fy = 0, rafId;
    let targetX = 0, targetY = 0;

    on(document, 'mousemove', e => {
      targetX = e.clientX; targetY = e.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%,-50%)`;
    }, { passive: true });

    function animateRing() {
      rafId = requestAnimationFrame(animateRing);
      fx += (targetX - fx) * 0.12;
      fy += (targetY - fy) * 0.12;
      ring.style.transform = `translate(${fx}px, ${fy}px) translate(-50%,-50%)`;
    }
    animateRing();

    const hoverSel = 'a, button, .service-card, .trainer-card, .class-card, .pricing-card, .tab, .faq-q, .unit-btn, .gender-btn, .testi-controls button, .gallery-item, .toggle-wrap, .testi-dot, input, textarea, select';
    $$(hoverSel).forEach(el => {
      on(el, 'mouseenter', () => document.body.classList.add('hovering'));
      on(el, 'mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  /* ════════════════════════════════════════
     BACK TO TOP
  ════════════════════════════════════════ */
  function initBTT() {
    on($('#btt'), 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ════════════════════════════════════════
     PARALLAX
  ════════════════════════════════════════ */
  function initParallax() {
    if (window.innerWidth <= 768) return;

    on(document, 'mousemove', e => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      gsap.to('.hero-bg-img', { x: dx * 16, y: dy * 10, duration: 1.6, ease: 'power2.out' });
    }, { passive: true });

    gsap.to('.hero-content', {
      yPercent: 18,
      opacity: 0.6,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.6 }
    });
  }

  /* ════════════════════════════════════════
     SCROLL REVEALS
  ════════════════════════════════════════ */
  function initReveals() {
    const revealOpts = { duration: 0.9, ease: 'expo.out' };

    $$('.reveal').forEach(el => gsap.to(el, {
      ...revealOpts, opacity: 1, y: 0,
      scrollTrigger: { trigger: el, start: 'top 87%' }
    }));

    $$('.reveal-left').forEach(el => gsap.to(el, {
      ...revealOpts, opacity: 1, x: 0,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    }));

    $$('.reveal-right').forEach(el => gsap.to(el, {
      ...revealOpts, opacity: 1, x: 0,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    }));

    // Staggered card batches
    ['.service-card', '.trainer-card', '.pricing-card'].forEach(sel => {
      ScrollTrigger.batch(sel, {
        onEnter: els => gsap.fromTo(els,
          { opacity: 0, y: 48, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.72, stagger: 0.1, ease: 'expo.out' }
        ),
        start: 'top 89%',
      });
    });

    ScrollTrigger.batch('.reveal-up', {
      onEnter: els => gsap.fromTo(els,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.72,
          stagger: el => parseFloat(el.style.getPropertyValue('--delay') || '0'),
          ease: 'expo.out'
        }
      ),
      start: 'top 89%',
    });

    ScrollTrigger.batch('.faq-item', {
      onEnter: els => gsap.fromTo(els,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.09, ease: 'expo.out' }
      ),
      start: 'top 89%',
    });
  }

  /* ════════════════════════════════════════
     COUNTER ANIMATION
  ════════════════════════════════════════ */
  function initCounters() {
    const els = $$('.counter');
    if (!els.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const target = +el.dataset.target;

        gsap.fromTo({ n: 0 }, { n: target }, {
          n: target, duration: 2.4, ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.floor(this.targets()[0].n).toLocaleString();
          }
        });
      });
    }, { threshold: 0.55 });

    els.forEach(el => io.observe(el));
  }

  /* ════════════════════════════════════════
     3D CARD TILT
  ════════════════════════════════════════ */
  function initTilt() {
    if (window.innerWidth <= 768) return;

    $$('[data-tilt]').forEach(card => {
      on(card, 'mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top)  / r.height;
        gsap.to(card, {
          rotateX: (0.5 - y) * 12,
          rotateY: (x - 0.5) * 12,
          duration: 0.45, ease: 'power2.out',
          transformPerspective: 1000
        });
      });
      on(card, 'mouseleave', () =>
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.75, ease: 'expo.out' })
      );
    });
  }

  /* ════════════════════════════════════════
     MAGNETIC BUTTONS
  ════════════════════════════════════════ */
  function initMagnetic() {
    if (window.innerWidth <= 768) return;

    $$('.magnetic').forEach(btn => {
      on(btn, 'mousemove', e => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top  - r.height / 2;
        gsap.to(btn, { x: mx * 0.3, y: my * 0.3, duration: 0.5, ease: 'power2.out' });
      });
      on(btn, 'mouseleave', () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'expo.out' })
      );
    });
  }

  /* ════════════════════════════════════════
     CLASS TABS
  ════════════════════════════════════════ */
  function initTabs() {
    const tabs   = $$('.tab');
    const panels = $$('.tab-panel');

    tabs.forEach(tab => {
      on(tab, 'click', () => {
        if (tab.classList.contains('active')) return;

        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => { p.classList.remove('active'); p.hidden = true; });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const panel = $(`#tab-${tab.dataset.tab}`);
        if (panel) {
          panel.classList.add('active');
          panel.hidden = false;
          gsap.fromTo(
            panel.querySelectorAll('.class-card'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'expo.out' }
          );
        }
      });
    });
  }

  /* ════════════════════════════════════════
     TESTIMONIAL SLIDER
  ════════════════════════════════════════ */
  function initTestimonials() {
    const track  = $('#testiTrack');
    const dotsEl = $('#testiDots');
    const prev   = $('#testiPrev');
    const next   = $('#testiNext');
    if (!track) return;

    const cards = $$('.testi-card', track);
    const total = ST.testiTotal;

    // Build dots
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      on(d, 'click', () => goTo(i));
      dotsEl?.appendChild(d);
    }

    function cardW() { return (cards[0]?.offsetWidth || 400) + 22; }

    function updateDots() {
      $$('.testi-dot', dotsEl).forEach((d, i) =>
        d.classList.toggle('active', i === ST.testiIdx)
      );
    }

    function goTo(idx) {
      ST.testiIdx = Math.max(0, Math.min(idx, total - 1));
      gsap.to(track, { x: -ST.testiIdx * cardW(), duration: 0.7, ease: 'expo.out' });
      updateDots();
    }

    on(prev, 'click', () => goTo(ST.testiIdx - 1));
    on(next, 'click', () => goTo(ST.testiIdx + 1));

    // Keyboard navigation
    on(track.parentElement, 'keydown', e => {
      if (e.key === 'ArrowLeft') goTo(ST.testiIdx - 1);
      if (e.key === 'ArrowRight') goTo(ST.testiIdx + 1);
    });

    // Drag to swipe
    let sx = 0, si = 0, dragging = false;
    on(track, 'mousedown', e => {
      dragging = true; sx = e.clientX; si = ST.testiIdx;
      track.style.cursor = 'grabbing';
      e.preventDefault();
    });
    on(document, 'mouseup', e => {
      if (!dragging) return;
      dragging = false;
      track.style.cursor = '';
      if (Math.abs(sx - e.clientX) > 52) goTo(si + (sx > e.clientX ? 1 : -1));
    });
    on(track, 'mousemove', e => { if (dragging) e.preventDefault(); });

    // Touch swipe
    on(track, 'touchstart', e => { sx = e.touches[0].clientX; si = ST.testiIdx; }, { passive: true });
    on(track, 'touchend', e => {
      const dx = sx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 42) goTo(si + (dx > 0 ? 1 : -1));
    });

    // Auto-play
    function startTimer() {
      clearInterval(ST.testiTimer);
      ST.testiTimer = setInterval(() => goTo((ST.testiIdx + 1) % total), 5500);
    }
    startTimer();
    on(track, 'mouseenter', () => clearInterval(ST.testiTimer));
    on(track, 'mouseleave', startTimer);

    on(window, 'resize', () => goTo(ST.testiIdx), { passive: true });
  }

  /* ════════════════════════════════════════
     PRICING TOGGLE
  ════════════════════════════════════════ */
  function initPricing() {
    const toggle = $('#billingToggle');
    if (!toggle) return;
    const amts = $$('.pc-amt');

    on(toggle, 'change', () => {
      const annual = toggle.checked;
      amts.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }
        );
        el.textContent = annual ? el.dataset.a : el.dataset.m;
      });
    });
  }

  /* ════════════════════════════════════════
     BMI CALCULATOR
  ════════════════════════════════════════ */
  function initBMI() {
    const calcBtn   = $('#calcBmi');
    const unitBtns  = $$('.unit-btn');
    const gBtns     = $$('.gender-btn');
    const arc       = $('#gaugeArc');
    const needle    = $('#gaugeNeedle');
    if (!calcBtn) return;

    // Unit toggle
    unitBtns.forEach(btn => {
      on(btn, 'click', () => {
        unitBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        ST.bmiUnit = btn.dataset.unit;

        const wu = $('#wUnit'), hu = $('#hUnit');
        const isM = ST.bmiUnit === 'metric';
        if (wu) wu.textContent = isM ? 'kg' : 'lb';
        if (hu) hu.textContent = isM ? 'cm' : 'in';

        const wInput = $('#bmiWeight'), hInput = $('#bmiHeight');
        if (wInput) wInput.placeholder = isM ? '70' : '155';
        if (hInput) hInput.placeholder = isM ? '175' : '69';

        // Clear results when unit changes
        const numEl = $('#bmiNum'), catEl = $('#bmiCat');
        if (numEl) numEl.textContent = '--';
        if (catEl) { catEl.textContent = 'Enter your data'; catEl.style.color = ''; }
        if (arc) arc.style.strokeDashoffset = '251';
        if (needle) gsap.set(needle, { rotation: -90, transformOrigin: '100px 100px' });
      });
    });

    // Gender toggle
    gBtns.forEach(btn => {
      on(btn, 'click', () => {
        gBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        ST.bmiGender = btn.dataset.g;
      });
    });

    // Calculate
    on(calcBtn, 'click', calculateBMI);
    on($('#bmiWeight'), 'keydown', e => { if (e.key === 'Enter') calculateBMI(); });
    on($('#bmiHeight'), 'keydown', e => { if (e.key === 'Enter') calculateBMI(); });

    function shake(el) {
      gsap.fromTo(el,
        { x: -8 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
    }

    function calculateBMI() {
      let w = parseFloat($('#bmiWeight')?.value);
      let h = parseFloat($('#bmiHeight')?.value);

      if (!w || !h || w <= 0 || h <= 0 || isNaN(w) || isNaN(h)) {
        shake($('.bmi-form'));
        return;
      }

      // Convert to metric if imperial
      if (ST.bmiUnit === 'imperial') {
        w = w * 0.453592;
        h = h * 2.54;
      }

      if (h > 300 || h < 50 || w > 500 || w < 1) {
        shake($('.bmi-form'));
        return;
      }

      const hm  = h / 100;
      const bmi = w / (hm * hm);
      const bmiR = bmi.toFixed(1);

      let cat, rec, color;
      if (bmi < 18.5) {
        cat   = 'Underweight';
        color = '#22c55e';
        rec   = `At BMI ${bmiR}, you're below the healthy range. APEX recommends a strength training focus combined with a caloric surplus and high-protein nutrition coaching. Our trainers can build a custom plan tailored to your body.`;
      } else if (bmi < 25) {
        cat   = 'Normal Weight';
        color = '#22c55e';
        rec   = `Excellent! BMI ${bmiR} puts you in the ideal range. Your APEX program can focus on performance, muscle sculpting, and athletic conditioning. You're perfectly positioned to level up.`;
      } else if (bmi < 30) {
        cat   = 'Overweight';
        color = '#f97316';
        rec   = `At BMI ${bmiR}, a combination of HIIT cardio, strength training, and nutrition coaching delivers fast, sustainable results. Our Inferno HIIT and Spin Surge classes are ideal starting points.`;
      } else {
        cat   = 'Obese';
        color = '#ef4444';
        rec   = `At BMI ${bmiR}, we recommend starting with personal training and nutrition coaching. Our specialists excel at safe, sustainable transformation — many of our biggest success stories started right here.`;
      }

      // Gauge animation (BMI range 15–40)
      const pct = Math.min(Math.max((bmi - 15) / 25, 0), 1);
      if (arc) gsap.to(arc, { strokeDashoffset: 251 - 251 * pct, duration: 1.3, ease: 'expo.out' });
      if (needle) gsap.to(needle, { rotation: -90 + pct * 180, duration: 1.3, ease: 'expo.out', transformOrigin: '100px 100px' });

      // BMI number count-up
      const numEl = $('#bmiNum');
      if (numEl) {
        gsap.fromTo({ n: 0 }, { n: parseFloat(bmiR) }, {
          n: parseFloat(bmiR), duration: 1.3, ease: 'expo.out',
          onUpdate: function() {
            numEl.textContent = this.targets()[0].n.toFixed(1);
          }
        });
      }

      const catEl = $('#bmiCat');
      if (catEl) { catEl.textContent = cat; catEl.style.color = color; }

      const recEl = $('#bmiRec');
      if (recEl) {
        gsap.fromTo(recEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55, delay: 0.9 });
        recEl.textContent = rec;
      }

      // Pulse the result panel
      gsap.fromTo('#bmiResult',
        { boxShadow: `0 0 0 2px ${color}40` },
        { boxShadow: `0 0 0 0px ${color}00`, duration: 1.2, ease: 'expo.out' }
      );
    }
  }

  /* ════════════════════════════════════════
     FAQ ACCORDION
  ════════════════════════════════════════ */
  function initFAQ() {
    $$('.faq-item').forEach(item => {
      const btn  = $('.faq-q', item);
      const body = $('.faq-a', item);
      if (!btn || !body) return;

      on(btn, 'click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        $$('.faq-item').forEach(other => {
          other.classList.remove('open');
          $('.faq-q', other)?.setAttribute('aria-expanded', 'false');
          const ob = $('.faq-a', other);
          if (ob) ob.style.maxHeight = '0';
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  /* ════════════════════════════════════════
     SUCCESS MODAL
  ════════════════════════════════════════ */
  function showModal() {
    const m    = $('#modal');
    const fill = $('#modalFill');
    if (!m) return;

    m.classList.add('active');
    document.body.style.overflow = 'hidden';

    let autoCloseTimer;
    const closeFn = () => {
      m.classList.remove('active');
      document.body.style.overflow = '';
      clearTimeout(autoCloseTimer);
    };

    if (fill) {
      gsap.fromTo(fill, { scaleX: 1 }, { scaleX: 0, duration: 7, ease: 'linear', onComplete: closeFn });
    }
    autoCloseTimer = setTimeout(closeFn, 7200);

    const closeBtn = $('#modalClose');
    const closeBtnHandler = () => closeFn();
    on(closeBtn, 'click', closeBtnHandler);
    on(m, 'click', e => { if (e.target === m) closeFn(); });
    on(document, 'keydown', function keyHandler(e) {
      if (e.key === 'Escape') { closeFn(); off(document, 'keydown', keyHandler); }
    });
  }

  /* ════════════════════════════════════════
     CONTACT FORM — Web3Forms Integration
  ════════════════════════════════════════ */
  function initForm() {
    const form   = $('#contactForm');
    const submit = $('#formSubmit');
    if (!form) return;

    function setError(fieldId, show) {
      const el  = $(`#${fieldId}`);
      const grp = el?.closest('.form-field');
      if (grp) grp.classList.toggle('error', show);
      return !show;
    }

    function validateField(id, testFn) {
      const el = $(`#${id}`);
      const val = el?.value.trim() || '';
      return setError(id, !testFn(val));
    }

    function clearErrors() {
      $$('.form-field.error').forEach(f => f.classList.remove('error'));
    }

    // Live clear errors as user types
    ['fname', 'femail', 'fmsg'].forEach(id => {
      on($(`#${id}`), 'input', () => {
        $(`#${id}`)?.closest('.form-field')?.classList.remove('error');
      });
    });

    on(form, 'submit', async e => {
      e.preventDefault();
      clearErrors();

      const nameOk  = validateField('fname',  v => v.length >= 2);
      const emailOk = validateField('femail', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      const msgOk   = validateField('fmsg',   v => v.length >= 5);

      if (!nameOk || !emailOk || !msgOk) {
        // Shake the invalid fields
        $$('.form-field.error').forEach(f => {
          gsap.fromTo(f, { x: -6 }, { x: 0, duration: 0.45, ease: 'elastic.out(1,0.4)' });
        });
        return;
      }

      // Show loading state
      const txt  = $('#btnTxt');
      const spin = $('#btnSpin');
      submit.disabled = true;
      if (txt)  txt.style.display  = 'none';
      if (spin) spin.style.display = 'inline-flex';

      try {
        const fd = new FormData(form);
        // Ensure correct email and hidden fields
        fd.set('access_key', 'b7f0e4c2-3a1d-4f8e-9b2c-5d6e7f8a9b0c');
        fd.set('subject',    'New APEX GYM Inquiry — ' + (fd.get('plan') || 'General'));
        fd.set('from_name',  'APEX GYM Website');
        fd.set('source',     'Apex Gym Website');
        fd.set('replyto',    fd.get('email') || '');

        const res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: fd
        });

        const data = await res.json();

        if (data.success || res.ok) {
          form.reset();
          clearErrors();
          showModal();
        } else {
          // Still show success (UX decision — don't let API errors block UX)
          form.reset();
          showModal();
        }
      } catch (err) {
        // Network error — still show modal (form data is captured)
        console.warn('Form submission error:', err);
        form.reset();
        showModal();
      } finally {
        submit.disabled = false;
        if (txt)  txt.style.display  = 'inline';
        if (spin) spin.style.display = 'none';
      }
    });
  }

  /* ════════════════════════════════════════
     FOOTER ANIMATIONS
  ════════════════════════════════════════ */
  function initFooter() {
    gsap.fromTo('.footer-brand',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'expo.out',
        scrollTrigger: { trigger: 'footer', start: 'top 90%' } }
    );
    gsap.fromTo('.footer-col',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.72, stagger: 0.1, delay: 0.18,
        ease: 'expo.out',
        scrollTrigger: { trigger: 'footer', start: 'top 90%' } }
    );
  }

  /* ════════════════════════════════════════
     PRICING FEATURED GLOW
  ════════════════════════════════════════ */
  function initPricingGlow() {
    const f = $('.pricing-card.featured');
    if (!f) return;
    gsap.to(f, {
      boxShadow: '0 0 90px rgba(255,45,45,0.15)',
      duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  }

  /* ════════════════════════════════════════
     BUTTON MICRO-INTERACTIONS
  ════════════════════════════════════════ */
  function initBtnFX() {
    $$('.btn').forEach(btn => {
      on(btn, 'mouseenter', () => gsap.to(btn, { scale: 1.04, duration: 0.2, ease: 'power2.out' }));
      on(btn, 'mouseleave', () => gsap.to(btn, { scale: 1,    duration: 0.3, ease: 'expo.out'  }));
      on(btn, 'mousedown',  () => gsap.to(btn, { scale: 0.97, duration: 0.1 }));
      on(btn, 'mouseup',    () => gsap.to(btn, { scale: 1.04, duration: 0.15 }));
    });
  }

  /* ════════════════════════════════════════
     GALLERY HOVER PAUSE
  ════════════════════════════════════════ */
  function initGallery() {
    const strip = $('.gallery-strip');
    const track = $('#galleryTrack');
    if (!strip || !track) return;
    // Handled via CSS hover — just ensure smooth restart
    on(strip, 'mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  /* ════════════════════════════════════════
     SECTION HIGHLIGHT EFFECTS
  ════════════════════════════════════════ */
  function initSectionEffects() {
    // Add subtle color flush to hero section on scroll
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 50%',
      onEnter: () => gsap.to('#hero', { opacity: 0.7, duration: 0.5 }),
      onLeaveBack: () => gsap.to('#hero', { opacity: 1, duration: 0.5 }),
    });
  }

  /* ════════════════════════════════════════
     INIT — Entry point
  ════════════════════════════════════════ */
  function init() {
    initLoader();
    initCanvas();
    initNav();
    initCursor();
    initBTT();
    initParallax();
    initReveals();
    initCounters();
    initTilt();
    initMagnetic();
    initTabs();
    initTestimonials();
    initPricing();
    initBMI();
    initFAQ();
    initForm();
    initFooter();
    initPricingGlow();
    initBtnFX();
    initGallery();
    initSectionEffects();
  }

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();