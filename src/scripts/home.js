/* ========================================
   HOME PAGE JS — Lions Club of Gampaha Metro
   ======================================== */

// ── HERO PARTICLES ──────────────────────
(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = Math.random() * 8 + 8;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%; top:${y}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
      opacity:${Math.random() * 0.15 + 0.04};
    `;
    container.appendChild(p);
  }
})();


// ── HERO PARALLAX ───────────────────────
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      heroBg.style.transform = `translateY(${scroll * 0.3}px)`;
    }
  }, { passive: true });
})();


// ── CAUSE CARDS HOVER GLOW ──────────────
(function initCauseCards() {
  document.querySelectorAll('.cause-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const fill = card.querySelector('.cause-progress-fill');
      if (fill) {
        const w = fill.style.width;
        fill.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => fill.style.width = w, 50);
        });
      }
    });
  });
})();


// ── HERO TEXT TYPEWRITER ─────────────────
(function initTypeIn() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  // Subtle shimmer after full load
  setTimeout(() => {
    tagline.style.textShadow = '0 0 30px rgba(245,166,35,0.2)';
  }, 1200);
})();
