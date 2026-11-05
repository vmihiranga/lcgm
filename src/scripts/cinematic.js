/* ════════════════════════════════════════
   CINEMATIC JS v2
   Lions Club of Gampaha Metro
   Uncommon & Dramatic Animations
════════════════════════════════════════ */

"use strict";

// ── SCROLL PROGRESS BAR ─────────────────
const scrollProg = document.getElementById("scrollProg");
if (scrollProg) {
  window.addEventListener(
    "scroll",
    () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProg.style.width = `${(scrolled / total) * 100}%`;
    },
    { passive: true },
  );
}

// ── STICKY NAV ───────────────────────────
const cinNav = document.getElementById("cinNav");
if (cinNav) {
  const onScroll = () => {
    cinNav.classList.toggle("solid", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ── MOBILE MENU ──────────────────────────
const mobileMenu = document.getElementById("mobileMenu");
const hamburger = document.getElementById("cinHamburger");
let menuOpen = false;

function closeMob() {
  if (mobileMenu) {
    mobileMenu.style.transform = "translateX(100%)";
    mobileMenu.style.opacity = "0";
    mobileMenu.classList.remove("open");
  }
  if (hamburger) {
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  }
  document.body.style.overflow = "";
  menuOpen = false;
}
window.closeMob = closeMob;

if (hamburger && mobileMenu) {
  // Initialize mobile menu opacity
  mobileMenu.style.opacity = "0";

  // Stagger the links when menu opens
  const mobLinks = mobileMenu.querySelectorAll("a");
  mobLinks.forEach((link, i) => {
    link.style.opacity = "0";
    link.style.transform = "translateX(40px)";
    link.style.transition = `opacity 0.4s ease ${0.1 + i * 0.07}s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.07}s, color 0.3s ease, letter-spacing 0.3s ease`;
  });

  hamburger.addEventListener("click", () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.style.transform = "translateX(0)";
      mobileMenu.style.opacity = "1";
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
      // Animate links in with delay
      setTimeout(() => {
        mobLinks.forEach((link) => {
          link.style.opacity = "1";
          link.style.transform = "translateX(0)";
        });
      }, 50);
    } else {
      // Animate links out then close
      mobLinks.forEach((link) => {
        link.style.opacity = "0";
        link.style.transform = "translateX(40px)";
      });
      setTimeout(closeMob, 280);
    }
    const spans = hamburger.querySelectorAll("span");
    if (menuOpen) {
      spans[0].style.transform = "translateY(6.5px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-6.5px) rotate(-45deg)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close on backdrop click
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobLinks.forEach((link) => {
        link.style.opacity = "0";
        link.style.transform = "translateX(40px)";
      });
      setTimeout(closeMob, 250);
    }
  });
}

// ── HERO IMAGE PARALLAX ──────────────────
const heroBgImg = document.getElementById("heroBgImg");
if (heroBgImg) {
  heroBgImg.addEventListener("load", () => {
    document.querySelector(".hero-frame")?.classList.add("loaded");
  });
  if (heroBgImg.complete) {
    document.querySelector(".hero-frame")?.classList.add("loaded");
  }

  window.addEventListener(
    "scroll",
    () => {
      const vy = window.scrollY;
      if (vy < window.innerHeight * 1.2) {
        heroBgImg.style.transform = `scale(1) translateY(${vy * 0.22}px)`;
      }
    },
    { passive: true },
  );
}

// ── SCROLL REVEAL ────────────────────────
(function initSR() {
  const els = document.querySelectorAll(
    ".sr, .sr-left, .sr-right, .sr-scale, .sr-stagger",
  );
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
  );

  els.forEach((el) => obs.observe(el));
})();

// ── COUNTER ANIMATION ────────────────────
(function initCounters() {
  const counters = document.querySelectorAll(".counter[data-target]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const dur = 2200;
    const start = performance.now();
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / dur, 1);
      el.textContent = Math.floor(ease(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
      else {
        el.textContent = target;
        el.classList.add("counted");
      }
    };
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((c) => obs.observe(c));
})();

// ── PROGRESS BARS (IMPACT) ───────────────
(function initBars() {
  const bars = document.querySelectorAll(
    ".ib-fill[data-width], .crb-bar-fill[data-width]",
  );
  if (!bars.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.width = e.target.dataset.width + "%";
          }, 200);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  bars.forEach((b) => obs.observe(b));
})();

// ── HORIZONTAL DRAG SCROLL ───────────────
(function initDragScroll() {
  const track = document.getElementById("servHoriz");
  if (!track) return;

  let isDown = false,
    startX,
    scrollLeft;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.style.userSelect = "none";
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener("mouseleave", () => {
    isDown = false;
  });
  track.addEventListener("mouseup", () => {
    isDown = false;
    track.style.userSelect = "";
  });
  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX, touchScrollLeft;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = track.scrollLeft;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchmove",
    (e) => {
      const dx = touchStartX - e.touches[0].pageX;
      track.scrollLeft = touchScrollLeft + dx;
    },
    { passive: true },
  );
})();

// ── CONTACT FORM ─────────────────────────
(function initForm() {
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  if (!form || !btn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const orig = btn.innerHTML;
    btn.innerHTML =
      '<i class="fas fa-check-circle"></i> &nbsp;Message Received!';
    btn.style.background = "#28B450";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = "";
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
})();

// ── SMOOTH HASH ANCHORS ───────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ── ABOUT IMAGE PARALLAX ─────────────────
const aboutImg = document.querySelector(".about-image-side img");
if (aboutImg) {
  window.addEventListener(
    "scroll",
    () => {
      const rect = aboutImg
        .closest(".about-image-side")
        .getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const ratio =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        aboutImg.style.transform = `scale(1.05) translateY(${(ratio - 0.5) * 30}px)`;
      }
    },
    { passive: true },
  );
}

// ── PAGE TRANSITION (cinematic wipe) ─────
(function initPageTransition() {
  // Fade in on load
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  const revealPage = () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealPage);
  } else {
    revealPage();
  }

  // Intercept internal page links for exit animation
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel")
    )
      return;
    // Only intercept .html links
    if (!href.endsWith(".html") && !href.includes(".html#")) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.href;
      const exitOverlay = document.createElement("div");
      exitOverlay.style.cssText = [
        "position:fixed",
        "inset:0",
        "background:#0b1914",
        "z-index:999999",
        "pointer-events:none",
        "clip-path:inset(100% 0 0 0)",
        "transition:clip-path 0.5s cubic-bezier(0.76,0,0.24,1)",
      ].join(";");
      document.body.appendChild(exitOverlay);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          exitOverlay.style.clipPath = "inset(0% 0 0 0)";
        });
      });
      setTimeout(() => {
        window.location.href = target;
      }, 530);
    });
  });
})();

// ── INNER PAGE TABS ──────────────────────
(function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => {
        c.style.display = "none";
        c.classList.remove("active");
      });
      btn.classList.add("active");
      const content = document.getElementById(target);
      if (content) {
        content.style.display = "block";
        content.classList.add("active");
      }
    });
  });

  const firstContent = document.querySelector(".tab-content");
  if (firstContent) {
    firstContent.style.display = "block";
    firstContent.classList.add("active");
  }

  const hash = window.location.hash?.replace("#", "");
  if (hash) {
    const matchBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (matchBtn) {
      setTimeout(() => matchBtn.click(), 200);
    }
  }
})();

// ── CUSTOM MAGNETIC CURSOR ───────────────
(function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cursor = document.createElement("div");
  const ring = document.createElement("div");
  cursor.className = "cin-cursor";
  ring.className = "cin-cursor-ring";
  document.body.appendChild(cursor);
  document.body.appendChild(ring);

  let mx = -100,
    my = -100;
  let rx = -100,
    ry = -100;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  // Spring-based ring follow
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animRing);
  })();

  // Hover state for interactive elements
  const hoverSelector =
    "a, button, .sc, .crb-card, .leo-panel, .cin-join-btn, input, textarea, select, .ic";
  document.querySelectorAll(hoverSelector).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hovering");
      ring.classList.add("is-hovering");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hovering");
      ring.classList.remove("is-hovering");
    });
  });
})();

// ── FILM GRAIN OVERLAY ───────────────────
(function initFilmGrain() {
  const grain = document.createElement("div");
  grain.className = "film-grain-overlay";
  document.body.appendChild(grain);
})();

// ── FLOATING PARTICLE CANVAS ─────────────
(function initParticles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // Only show on desktop for performance
  if (window.innerWidth < 768) return;

  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight + window.innerHeight,
    r: Math.random() * 1.6 + 0.3,
    speed: Math.random() * 0.5 + 0.15,
    opacity: Math.random() * 0.4 + 0.08,
    drift: (Math.random() - 0.5) * 0.35,
    hue: 30 + Math.random() * 25,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -20) {
        p.y = canvas.height + 20;
        p.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── SPOTLIGHT ON HERO ────────────────────
(function initSpotlight() {
  const heroFrame = document.querySelector(".hero-frame");
  if (!heroFrame) return;

  const spotlight = document.createElement("div");
  spotlight.className = "cin-spotlight";
  heroFrame.appendChild(spotlight);

  if (window.matchMedia("(hover: none)").matches) return;

  heroFrame.addEventListener(
    "mousemove",
    (e) => {
      const rect = heroFrame.getBoundingClientRect();
      const x = e.clientX - rect.left - 350;
      const y = e.clientY - rect.top - 350;
      spotlight.style.cssText = `
      transform: translate(${x}px, ${y}px);
      animation: none;
      background: radial-gradient(circle, rgba(167,225,195,0.12) 0%, transparent 60%);
      transition: transform 0.1s linear;
    `;
    },
    { passive: true },
  );

  heroFrame.addEventListener("mouseleave", () => {
    spotlight.style.cssText = "";
  });
})();

// ── BUTTON RIPPLE EFFECT ─────────────────
(function initRipple() {
  const btns = document.querySelectorAll(
    ".btn-cin-primary, .btn-cin-ghost, .cin-join-btn",
  );
  btns.forEach((btn) => {
    if (getComputedStyle(btn).position === "static") {
      btn.style.position = "relative";
    }
    btn.style.overflow = "hidden";

    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        left:${x - size / 2}px; top:${y - size / 2}px;
        background:rgba(167,225,195,0.22);
        border-radius:50%;
        transform:scale(0);
        animation:ripple-expand 0.8s linear forwards;
        pointer-events:none;
        z-index:0;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);
    });
  });
})();

// ── HEADING GLITCH EFFECT ────────────────
(function initGlitch() {
  document.querySelectorAll('.cin-heading:not(.no-glitch):not([data-glitch-exclude])').forEach(h => {
    h.classList.add('cin-heading-glitch');
    h.setAttribute('data-text', h.textContent.trim());
  });
})();

// ── TEXT SCRAMBLE ON SECTION LABELS ──────
(function initScramble() {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—|▌";

  function scramble(el, original, duration) {
    const frames = Math.floor(duration / 40);
    let frame = 0;

    function step() {
      frame++;
      const progress = frame / frames;
      el.textContent = Array.from(original)
        .map((char, i) => {
          if (char === " ") return " ";
          if (i / original.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (frame < frames) requestAnimationFrame(step);
      else el.textContent = original;
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const txt = el.textContent.trim();
          if (txt.length < 50) scramble(el, txt, 750);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.6 },
  );

  document
    .querySelectorAll(".cin-section-label")
    .forEach((el) => obs.observe(el));
})();

// ── SECTION DEPTH PARALLAX ───────────────
(function initDepthParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const impactGridBg = document.querySelector(".impact-grid-bg");

  window.addEventListener(
    "scroll",
    () => {
      if (impactGridBg) {
        const section = impactGridBg.closest(".impact-frame");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const ratio = -rect.top / window.innerHeight;
          impactGridBg.style.transform = `translateY(${ratio * 30}px)`;
        }
      }
    },
    { passive: true },
  );
})();

// ── HERO PARTICLE FIELD ───────────────────
(function initHeroParticleField() {
  const heroFrame = document.querySelector(".hero-frame");
  if (!heroFrame) return;
  const field = document.createElement("div");
  field.className = "hero-particle-field";
  heroFrame.appendChild(field);
})();

// ── IC CARD HOVER TILT ───────────────────
(function initCardTilt() {
  if (window.matchMedia("(hover: none)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".ic").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px) scale(1.02)`;
      card.style.transition = "transform 0.1s ease";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition =
        "transform 0.4s var(--ease-out), background 0.4s ease";
    });
  });
})();

// ── TICKER PAUSE ON HOVER ────────────────
const tickerTrack = document.getElementById("tickerTrack");
if (tickerTrack) {
  const ticker = tickerTrack.closest(".cin-ticker");
  ticker?.addEventListener("mouseenter", () => {
    tickerTrack.style.animationPlayState = "paused";
  });
  ticker?.addEventListener("mouseleave", () => {
    tickerTrack.style.animationPlayState = "running";
  });
}

// ── NAV LINK ACTIVE STATE ────────────────
(function updateActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".cin-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && (href === path || href.split("#")[0] === path)) {
      link.classList.add("active");
    }
  });
})();

console.log(
  "%c🦁 Lions Club of Gampaha Metro",
  "font-size:1.2rem; color:#a7e1c3; font-weight:bold;",
);
console.log(
  "%cWe Serve · Chartered 1 April 1986",
  "font-size:0.9rem; color:#888;",
);
console.log(
  "%c✨ Cinematic JS v2 — Uncommon Animations Active",
  "font-size:0.8rem; color:#467;",
);
