import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import anime from 'animejs'

/**
 * useCinematic — runs all the cinematic JS effects after each page render.
 * This version simplifies the structural logic and ensures all listeners are cleaned up.
 */
export default function useCinematic() {
  const location = useLocation()

  useEffect(() => {
    const cleanupTasks = []

    // ── SCROLL TO TOP ────────────────────────
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    // ── GLOBAL ELEMENTS: CURSOR & GRAIN ──────
    const isTouch = window.matchMedia('(hover: none)').matches
    let cursor = document.querySelector('.cin-cursor')
    let ring = document.querySelector('.cin-cursor-ring')
    let mx = -100, my = -100, rx = -100, ry = -100
    let ringRaf

    if (!isTouch) {
      document.documentElement.classList.add('cin-cursor-enabled')
      if (!cursor) {
        cursor = document.createElement('div')
        cursor.className = 'cin-cursor'
        document.body.appendChild(cursor)
      }
      if (!ring) {
        ring = document.createElement('div')
        ring.className = 'cin-cursor-ring'
        document.body.appendChild(ring)
      }

      const onMouseMoveCursor = (e) => {
        mx = e.clientX
        my = e.clientY
        if (cursor) {
          cursor.style.left = `${mx}px`
          cursor.style.top = `${my}px`
          if (cursor.style.opacity === '0' || !cursor.style.opacity) {
            cursor.style.opacity = '1'
            if (ring) ring.style.opacity = '1'
          }
        }
        
        // Hover State (Delegation)
        const target = e.target.closest('a, button, .sc, .crb-card, .leo-panel, .cin-join-btn, input, textarea, select, .ic, .tab-btn, .member-card, .board-card, .sig-project, .nav-links a')
        if (target) {
          cursor?.classList.add('is-hovering')
          ring?.classList.add('is-hovering')
          if (target.classList.contains('mag-ready')) {
            // Optional snapping logic if target has class
          }
        } else {
          cursor?.classList.remove('is-hovering')
          ring?.classList.remove('is-hovering')
        }
      }
      document.addEventListener('mousemove', onMouseMoveCursor)
      cleanupTasks.push(() => document.removeEventListener('mousemove', onMouseMoveCursor))

      const animRing = () => {
        rx += (mx - rx) * 0.15
        ry += (my - ry) * 0.15
        if (ring) {
          ring.style.left = `${rx}px`
          ring.style.top = `${ry}px`
        }
        ringRaf = requestAnimationFrame(animRing)
      }
      ringRaf = requestAnimationFrame(animRing)
      cleanupTasks.push(() => cancelAnimationFrame(ringRaf))

      // Hide/Show on leave window
      const onWinLeave = () => { if (cursor) { cursor.style.opacity = '0'; ring.style.opacity = '0' } }
      const onWinEnter = () => { if (cursor) { cursor.style.opacity = '1'; ring.style.opacity = '1' } }
      document.addEventListener('mouseleave', onWinLeave)
      document.addEventListener('mouseenter', onWinEnter)
      cleanupTasks.push(() => {
        document.removeEventListener('mouseleave', onWinLeave)
        document.removeEventListener('mouseenter', onWinEnter)
      })
    }

    // ── FILM GRAIN SINGLETON ─────────────────
    if (!document.querySelector('.film-grain-overlay')) {
      const grain = document.createElement('div')
      grain.className = 'film-grain-overlay'
      document.body.appendChild(grain)
    }

    // ── SCROLL PROGRESS ─────────────────────
    const scrollProg = document.getElementById('scrollProg')
    if (scrollProg) {
      const onScroll = () => {
        const scrolled = window.scrollY
        const total = document.documentElement.scrollHeight - window.innerHeight
        scrollProg.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%'
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanupTasks.push(() => window.removeEventListener('scroll', onScroll))
      onScroll() // Initial check
    }

    // ── REVEAL OBSERVER (ANIME.JS POWERED) ─────────────────────
    const srEls = document.querySelectorAll('.sr, .sr-left, .sr-right, .sr-scale, .sr-stagger, .reveal, .reveal-left, .reveal-right, .sig-project, .board-card, .member-card, .cin-reveal, .leo-ov-card, .dg-card, .officer, .project-item')
    
    // Ensure they start at 0 opacity
    srEls.forEach(el => {
      if (!el.classList.contains('active')) el.style.opacity = '0';
    });

    const srObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          if (el.classList.contains('active')) return;

          const isLeft = el.classList.contains('reveal-left') || el.classList.contains('sr-left');
          const isRight = el.classList.contains('reveal-right') || el.classList.contains('sr-right');
          const isScale = el.classList.contains('board-card') || el.classList.contains('member-card') || el.classList.contains('leo-ov-card') || el.classList.contains('sr-scale');
          
          let translateX = isLeft ? [-60, 0] : isRight ? [60, 0] : 0;
          let translateY = (!isLeft && !isRight) ? [40, 0] : 0;
          let scale = isScale ? [0.92, 1] : 1;
          
          // Disable CSS transitions entirely to let Anime JS handle it without stuttering
          el.style.transition = 'none';

          anime({
            targets: el,
            translateX: translateX,
            translateY: translateY,
            scale: scale,
            opacity: [0, 1],
            duration: 1000,
            delay: 150,
            easing: 'easeOutQuart'
          });

          el.classList.add('in', 'active');
          srObs.unobserve(el);
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
    
    srEls.forEach((el) => srObs.observe(el))
    cleanupTasks.push(() => srObs.disconnect())

    // ── COUNTERS ────────────────────────────
    const counters = document.querySelectorAll('.counter[data-target]:not(.counted)')
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target
          const target = parseInt(el.dataset.target, 10)
          const startTime = performance.now()
          const duration = 2000
          const ease = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
          const tick = (now) => {
            const elapsed = Math.min((now - startTime) / duration, 1)
            el.textContent = Math.floor(ease(elapsed) * target)
            if (elapsed < 1) requestAnimationFrame(tick)
            else { el.textContent = target; el.classList.add('counted') }
          }
          requestAnimationFrame(tick)
          counterObs.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    counters.forEach((c) => counterObs.observe(c))
    cleanupTasks.push(() => counterObs.disconnect())

    // ── PROGRESS BARS ───────────────────────
    const bars = document.querySelectorAll('.ib-fill[data-width], .crb-bar-fill[data-width]')
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => { e.target.style.width = `${e.target.dataset.width}%` }, 250)
          barObs.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })
    bars.forEach((b) => barObs.observe(b))
    cleanupTasks.push(() => barObs.disconnect())

    // ── DRAG SCROLL (SERVICES) ──────────────
    const track = document.getElementById('servHoriz')
    if (track) {
      let isDown = false, startX, scrollLeft
      const down = (e) => {
        isDown = true; track.classList.add('active');
        startX = (e.pageX || e.touches[0].pageX) - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      }
      const end = () => { isDown = false; track.classList.remove('active') }
      const move = (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = (e.pageX || (e.touches ? e.touches[0].pageX : 0)) - track.offsetLeft
        const walk = (x - startX) * 1.5
        track.scrollLeft = scrollLeft - walk
      }
      track.addEventListener('mousedown', down); track.addEventListener('touchstart', down, { passive: true })
      track.addEventListener('mousemove', move); track.addEventListener('touchmove', move, { passive: false })
      track.addEventListener('mouseleave', end); track.addEventListener('mouseup', end); track.addEventListener('touchend', end)
      cleanupTasks.push(() => {
        track.removeEventListener('mousedown', down); track.removeEventListener('touchstart', down)
        track.removeEventListener('mousemove', move); track.removeEventListener('touchmove', move)
        track.removeEventListener('mouseleave', end); track.removeEventListener('mouseup', end); track.removeEventListener('touchend', end)
      })
    }

    // ── GLOBAL PARTICLES (Full Site) ───────
    let canvas = document.getElementById('particleCanvas')
    if (!canvas) {
      canvas = document.createElement('canvas')
      canvas.id = 'particleCanvas'
      document.body.appendChild(canvas)
    }
    const ctx = canvas.getContext('2d')
    let particles = []
    let pRaf
    const mouse = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const createParticle = () => {
      const p = {
        reset: (initial = false) => {
          p.x = Math.random() * canvas.width
          p.y = initial ? Math.random() * canvas.height : canvas.height + 20
          p.size = Math.random() * 1.2 + 0.4
          p.speedX = (Math.random() - 0.5) * 0.25
          p.speedY = -0.15 - Math.random() * 0.35 // Floating UP slowly
          p.opacity = Math.random() * 0.35 + 0.05
          p.baseOpacity = p.opacity
        },
        update: () => {
          p.x += p.speedX
          p.y += p.speedY

          // Mouse Interactivity
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const force = (180 - dist) / 180
            p.x -= dx * force * 0.012
            p.y -= dy * force * 0.012
            p.opacity = Math.min(0.7, p.baseOpacity + force * 0.35)
          } else {
            p.opacity = p.baseOpacity
          }

          if (p.y < -20) {
            p.reset(false)
          }
          if (p.x < -20) p.x = canvas.width + 20
          if (p.x > canvas.width + 20) p.x = -20
        },
        draw: () => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(167, 225, 195, ${p.opacity})`
          ctx.fill()
        }
      }
      p.reset(true)
      return p
    }

    // Slightly more particles (45)
    for (let i = 0; i < 45; i++) particles.push(createParticle())

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      pRaf = requestAnimationFrame(animateParticles)
    }
    animateParticles()

    const onGlobalMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onGlobalMouseMove, { passive: true })

    // ── HERO SPOTLIGHT (Hero Only) ──────────
    const heroFrame = document.querySelector('.hero-frame')
    if (heroFrame && !isTouch) {
      let spotlight = heroFrame.querySelector('.cin-spotlight')
      if (!spotlight) {
        spotlight = document.createElement('div')
        spotlight.className = 'cin-spotlight'
        heroFrame.appendChild(spotlight)
      }
      const onHeroMove = (e) => {
        const r = heroFrame.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        if (spotlight) {
          spotlight.style.transform = `translate(${x - 350}px, ${y - 350}px)`
          spotlight.style.opacity = '1'
        }
      }
      const onHeroLeave = () => { if (spotlight) spotlight.style.opacity = '0' }

      heroFrame.addEventListener('mousemove', onHeroMove, { passive: true })
      heroFrame.addEventListener('mouseleave', onHeroLeave)
      
      cleanupTasks.push(() => {
        heroFrame.removeEventListener('mousemove', onHeroMove)
        heroFrame.removeEventListener('mouseleave', onHeroLeave)
      })
    }

    cleanupTasks.push(() => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onGlobalMouseMove)
      cancelAnimationFrame(pRaf)
    })

    // ── BUTTON RIPPLES ──────────────────────
    const rippleHandler = (e) => {
      const b = e.currentTarget
      const rect = b.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const ripple = document.createElement('span')
      ripple.className = 'btn-ripple'
      ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;background:rgba(167,225,195,0.25);border-radius:50%;transform:scale(0);animation:ripple-expand 0.8s linear forwards;pointer-events:none;z-index:9;`
      b.appendChild(ripple)
      setTimeout(() => ripple.remove(), 900)
    }
    const btns = document.querySelectorAll('.btn-cin-primary, .btn-cin-ghost, .cin-join-btn, .tab-btn, .btn-primary')
    btns.forEach((b) => {
      if (getComputedStyle(b).position === 'static') b.style.position = 'relative'
      b.style.overflow = 'hidden'
      b.addEventListener('click', rippleHandler)
    })
    cleanupTasks.push(() => btns.forEach((b) => b.removeEventListener('click', rippleHandler)))

    // ── HEADING GLITCH ─────────────────────
    document.querySelectorAll('.cin-heading:not(.no-glitch):not([data-glitch-exclude])').forEach((h) => {
      h.classList.add('cin-heading-glitch')
      h.setAttribute('data-text', h.textContent.trim())
    })

    // ── TEXT SCRAMBLE ──────────────────────
    const scrambleObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target
          const orig = el.textContent.trim()
          if (orig.length > 50) return
          let iter = 0
          const intr = setInterval(() => {
            el.innerText = orig.split('').map((char, i) => {
              if (i < iter) return orig[i]
              return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
            }).join('')
            if (iter >= orig.length) clearInterval(intr)
            iter += 1 / 3
          }, 30)
          scrambleObs.unobserve(el)
        }
      })
    }, { threshold: 0.6 })
    document.querySelectorAll('.section-label, .cin-section-label').forEach((s) => scrambleObs.observe(s))
    cleanupTasks.push(() => scrambleObs.disconnect())

    // ── PARALLAX FX ────────────────────────
    const onPara = () => {
      const sy = window.scrollY
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const spd = parseFloat(el.getAttribute('data-parallax')) || 0.1
        el.style.transform = `translateY(${-(sy * spd)}px)`
      })
      const hb = document.getElementById('heroBgImg')
      if (hb && sy < window.innerHeight) hb.style.transform = `scale(1) translateY(${sy * 0.2}px)`
    }
    window.addEventListener('scroll', onPara, { passive: true })
    cleanupTasks.push(() => window.removeEventListener('scroll', onPara))

    // ── TAB INITIAL HASH ───────────────────
    if (location.hash) {
      setTimeout(() => {
        const match = document.querySelector(`.tab-btn[data-tab="${location.hash.replace('#','')}"], [data-tab-hash="${location.hash.replace('#','')}"]`)
        if (match) match.click()
      }, 350)
    }

    // ── INITIAL LOAD ────────────────────────
    document.body.classList.add('cin-loaded')
    console.log('%c🦁 Lions Cinematic Engine Ready', 'color:#a7e1c3; font-weight:bold;')

    return () => {
      cleanupTasks.forEach((task) => task())
    }
  }, [location.pathname, location.hash])
}
