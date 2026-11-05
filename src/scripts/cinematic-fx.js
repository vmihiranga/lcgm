/* ════════════════════════════════════════
   CINEMATIC FX JS — Inner Pages
   Lions Club of Gampaha Metro
   Auto-injects mobile menu & cinematic FX
════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── PARALLAX EFFECT ────────────────────
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
      el.style.transform = `translateY(${-(scrollY * speed)}px)`;
    });

    // Reveal on scroll (legacy support)
    document.querySelectorAll('.ar-reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add('active');
      }
    });

    // Nav solid on scroll
    const nav = document.querySelector('.cin-nav');
    if (nav) {
      nav.classList.toggle('solid', window.scrollY > 50);
    }
  }, { passive: true });

  // ── INTERSECTION OBSERVER REVEALS ──────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.cin-reveal').forEach(el => observer.observe(el));

  // ── SR REVEAL (cinematic.css classes) ──
  const srObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        srObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.sr, .sr-left, .sr-right, .sr-scale, .sr-stagger').forEach(el => srObs.observe(el));

  // ── AUTO-INJECT MOBILE MENU ────────────
  // Only inject if hamburger doesn't exist
  const cinNav = document.getElementById('cinNav');
  const existingHamburger = document.getElementById('cinHamburger');

  if (cinNav && !existingHamburger) {
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'cin-hamburger';
    hamburger.id = 'cinHamburger';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    cinNav.querySelector('.nav-inner')?.appendChild(hamburger);

    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobileMenu';
    mobileMenu.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'right:0', 'bottom:0',
      'background:rgba(9,24,40,0.98)', 'z-index:889',
      'transform:translateX(100%)',
      'transition:transform 0.6s cubic-bezier(0.76,0,0.24,1),opacity 0.4s ease',
      'display:flex', 'flex-direction:column', 'justify-content:center',
      'align-items:center', 'gap:28px', 'backdrop-filter:blur(30px)',
      'opacity:0'
    ].join(';');

    // Gather nav links from desktop nav
    const desktopLinks = cinNav.querySelectorAll('.cin-link, .cin-join-btn');
    const linkData = [];
    desktopLinks.forEach(l => {
      const href = l.closest('.cin-dropdown')
        ? l.closest('.cin-dropdown').querySelector('.cin-link')?.getAttribute('href') || '#'
        : l.getAttribute('href') || '#';
      const text = l.textContent.replace(/[▾▼]/g, '').trim();
      const isJoin = l.classList.contains('cin-join-btn');
      if (!linkData.find(d => d.text === text)) {
        linkData.push({ href, text, isJoin });
      }
    });

    linkData.forEach(({ href, text, isJoin }) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      a.style.cssText = isJoin
        ? 'font-family:Bebas Neue,sans-serif;font-size:1.2rem;color:#a7e1c3;letter-spacing:0.2em;border:1px solid #a7e1c3;padding:12px 40px;border-radius:2px;opacity:0;transform:translateX(40px);transition:opacity 0.4s ease,transform 0.4s cubic-bezier(0.22,1,0.36,1),background 0.3s ease'
        : 'font-family:Bebas Neue,sans-serif;font-size:2rem;color:#F5F0E8;letter-spacing:0.1em;opacity:0;transform:translateX(40px);transition:opacity 0.4s ease,transform 0.4s cubic-bezier(0.22,1,0.36,1),color 0.3s ease,letter-spacing 0.3s ease';
      a.addEventListener('click', () => closeMobFx());
      a.addEventListener('mouseenter', () => {
        if (!isJoin) { a.style.color = '#a7e1c3'; a.style.letterSpacing = '0.16em'; }
        else { a.style.background = '#a7e1c3'; a.style.color = '#0b1914'; }
      });
      a.addEventListener('mouseleave', () => {
        if (!isJoin) { a.style.color = '#F5F0E8'; a.style.letterSpacing = '0.1em'; }
        else { a.style.background = 'transparent'; a.style.color = '#a7e1c3'; }
      });
      mobileMenu.appendChild(a);
    });

    document.body.appendChild(mobileMenu);

    const mobLinks = mobileMenu.querySelectorAll('a');
    let isOpen = false;

    function closeMobFx() {
      mobLinks.forEach(l => { l.style.opacity = '0'; l.style.transform = 'translateX(40px)'; });
      setTimeout(() => {
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.opacity = '0';
        document.body.style.overflow = '';
        isOpen = false;
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }, 200);
    }

    hamburger.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        mobileMenu.style.transform = 'translateX(0)';
        mobileMenu.style.opacity = '1';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          mobLinks.forEach((l, i) => {
            l.style.transition = `opacity 0.4s ease ${0.1 + i * 0.07}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.07}s, color 0.3s ease, letter-spacing 0.3s ease, background 0.3s ease`;
            l.style.opacity = '1';
            l.style.transform = 'translateX(0)';
          });
        }, 60);
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        closeMobFx();
      }
    });

    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) closeMobFx();
    });
  }

  // ── FILM GRAIN OVERLAY ─────────────────
  if (!document.querySelector('.film-grain-overlay')) {
    const grain = document.createElement('div');
    grain.className = 'film-grain-overlay';
    document.body.appendChild(grain);
  }

  // ── CUSTOM CURSOR (desktop only) ───────
  if (!window.matchMedia('(hover: none)').matches && !document.querySelector('.cin-cursor')) {
    const cursor = document.createElement('div');
    const ring = document.createElement('div');
    cursor.className = 'cin-cursor';
    ring.className = 'cin-cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button, input, textarea, select, .tab-btn').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('is-hovering'); ring.classList.add('is-hovering'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('is-hovering'); ring.classList.remove('is-hovering'); });
    });
  }

  // ── BUTTON RIPPLE ──────────────────────
  document.querySelectorAll('.btn-cin-primary, .btn-cin-ghost, .cin-join-btn, .tab-btn').forEach(btn => {
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;
        background:rgba(167,225,195,0.22);border-radius:50%;
        transform:scale(0);animation:ripple-expand 0.8s linear forwards;
        pointer-events:none;z-index:0;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);
    });
  });

  // ── PAGE TRANSITION ────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (!href.endsWith('.html') && !href.includes('.html#')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.href;
      const overlay = document.createElement('div');
      overlay.style.cssText = [
        'position:fixed', 'inset:0', 'background:#0b1914',
        'z-index:999999', 'pointer-events:none',
        "clip-path:inset(100% 0 0 0)",
        "transition:clip-path 0.5s cubic-bezier(0.76,0,0.24,1)"
      ].join(';');
      document.body.appendChild(overlay);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        overlay.style.clipPath = 'inset(0% 0 0 0)';
      }));
      setTimeout(() => { window.location.href = target; }, 530);
    });
  });

  // ── TEXT SCRAMBLE ON SECTION LABELS ───
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—|';
  function scramble(el, orig, dur) {
    const frames = Math.floor(dur / 40);
    let frame = 0;
    (function step() {
      frame++;
      const p = frame / frames;
      el.textContent = Array.from(orig).map((c, i) => {
        if (c === ' ') return ' ';
        if (i / orig.length < p) return c;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      if (frame < frames) requestAnimationFrame(step);
      else el.textContent = orig;
    })();
  }

  const scrambleObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const txt = e.target.textContent.trim();
        if (txt.length < 50) scramble(e.target, txt, 700);
        scrambleObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.cin-section-label').forEach(el => scrambleObs.observe(el));

});
