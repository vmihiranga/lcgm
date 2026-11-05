/* ========================================
   MAIN JS — Lions Club of Gampaha Metro
   ======================================== */

// ── NAVBAR ──────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // Mobile dropdowns
  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    const link = dd.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dd.classList.toggle('open');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      menu?.classList.remove('open');
    }
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0] === currentPage) {
      link.classList.add('active');
    }
  });
})();


// ── SCROLL REVEAL ────────────────────────
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


// ── COUNTER ANIMATION ────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
})();


// ── PROGRESS BARS ───────────────────────
(function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();


// ── CONTACT FORM ─────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalContent = btn.innerHTML;

    btn.innerHTML = '<span>✅ Message Sent!</span>';
    btn.style.background = 'linear-gradient(135deg, #27AE60, #1a6a3a)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
})();


// ── PAGE TABS ───────────────────────────
(function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = document.getElementById(target);
      if (content) {
        content.classList.add('active');
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Hash-based tab switching
  const hash = window.location.hash;
  if (hash) {
    const matchBtn = document.querySelector(`.tab-btn[data-tab="${hash.substring(1)}"]`);
    if (matchBtn) matchBtn.click();
  }
})();


// ── SMOOTH ANCHOR SCROLL ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = document.querySelector('.navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── TOOLTIP / FADE-IN for card elements ──
document.querySelectorAll('.cause-card, .service-card, .leo-card, .impact-card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.transitionDelay = `${i * 0.06}s`;
});
