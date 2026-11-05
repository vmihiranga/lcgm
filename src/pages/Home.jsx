import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import anime from 'animejs'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import useCinematic from '../hooks/useCinematic'
import Typewriter from '../components/Typewriter'

export default function Home() {
  useCinematic()

  const heroImages = [
    'https://i.ibb.co/QFRxH5Gw/image.png',
    '/images/about_image.png',
    '/images/mobile_hero_section_1773123366752.png'
  ];
  const [currentHero, setCurrentHero] = useState(0);
  const servRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const animated = useRef(false);
  useEffect(() => {
    if (animated.current) return;
    animated.current = true;

    const tl = anime.timeline({
      easing: 'easeOutExpo'
    });

    tl.add({
      targets: '.hero-eyebrow',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutCirc'
    }, 200)
    .add({
      targets: '.hero-title-line',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(200),
      easing: 'easeOutCubic'
    }, 400)
    .add({
      targets: '.hero-tagline-cin, .hero-subtext-cin',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    }, 1000)
    .add({
      targets: '.hero-cta-row',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 900,
      easing: 'easeOutBack(1.5)'
    }, 1200)
    .add({
      targets: '.hero-stats-cin',
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutCirc'
    }, 1600)
    .add({
      targets: '.scroll-hint',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear'
    }, 2000)
    .add({
      targets: '.cin-nav.home-entrance',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutSine',
      complete: function(anim) {
        document.querySelectorAll('.cin-nav.home-entrance').forEach(el => {
          el.style.pointerEvents = 'auto';
        });
      }
    }, 2400);
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* CINEMATIC NAVIGATION */}
      <Nav />

      {/* FRAME 1 · HERO */}
      <section className="cin-frame hero-frame" id="hero">
        <div className="hero-canvas">
          {heroImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt="Lions Club Gampaha Metro community service"
              className="hero-bg-img"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                opacity: idx === currentHero ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out, transform 8s ease'
              }}
            />
          ))}
          <div className="hero-grain" />
          <div className="hero-vignette" />
        </div>

        <div className="container hero-inner" id="heroInner">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">Lions District 306 D4 · Sri Lanka &amp; Maldives</span>
            <span className="eyebrow-dot" />
          </div>

          <h1 className="hero-title-cin">
            <span className="hero-title-line">Lions Club</span>
            <span className="hero-title-line">of Gampaha <span className="outline-text">Metro</span></span>
          </h1>

          <p className="hero-tagline-cin" style={{ minHeight: '3em' }}>
            <Typewriter 
              phrases={[
                "Serving Humanity & Inspiring Lives with Compassion and Integrity",
                "Connecting Hearts & Bridging Communities Across Gampaha",
                "Empowering The Next Generation of Leaders Since 1986",
                "We Serve: Bringing Hope Exactly Where It's Needed"
              ]}
              startDelay={1800}
              typingSpeed={40}
              deletingSpeed={20}
              pauseTime={3500}
            />
          </p>

          <div className="hero-cta-row">
            <Link to="/services" className="btn-cin-primary" id="discoverBtn">
              Discover Our Work
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <Link to="/login" className="btn-cin-ghost" id="joinBtn">
              Join the Lions Movement
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stats-cin">
          <div className="hero-stat-cin"><span className="hsc-num">40</span><span className="hsc-label">Years of Service</span></div>
          <div className="hero-stat-cin"><span className="hsc-num">44</span><span className="hsc-label">Active Members</span></div>
          <div className="hero-stat-cin"><span className="hsc-num">306 D4</span><span className="hsc-label">Lions District</span></div>
          <div className="hero-stat-cin"><span className="hsc-num">1986</span><span className="hsc-label">Charter Year</span></div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="cin-ticker">
        <div className="ticker-track" id="tickerTrack">
          {['We Serve', 'Chartered 1 April 1986', 'Lions District 306 D4', 'Sri Lanka & Maldives', 'Compassion · Integrity · Service', 'Gampaha Metro', 'Youth Empowerment', 'Global Humanitarian',
            'We Serve', 'Chartered 1 April 1986', 'Lions District 306 D4', 'Sri Lanka & Maldives', 'Compassion · Integrity · Service', 'Gampaha Metro', 'Youth Empowerment', 'Global Humanitarian'].map((item, i) => (
            <span key={i} className="ticker-item">{item}<span className="ticker-sep" /></span>
          ))}
        </div>
      </div>

      {/* FRAME 2 · ABOUT */}
      <section className="about-frame" id="about">
        <div className="about-frame-inner">
          <div className="about-image-side sr-left">
            <img
              src="/images/about_image.png"
              alt="Lions Club volunteers in service"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80'; e.target.onerror = null }}
            />
            <div className="about-image-overlay" />
            <div className="about-img-fade-right" />
            <div className="about-stamp">
              <div className="about-stamp-year">1986</div>
              <div className="about-stamp-label">Charter Year</div>
            </div>
          </div>
          <div className="about-content-side">
            <div className="about-content-inner">
              <div className="about-eyebrow">
                <span className="ab-line" />
                <span className="ab-label">About the Club</span>
              </div>
              <h2 className="about-heading sr">A Legacy of Service<br />and <em>Leadership</em></h2>
              <p className="about-body-text sr d1">The <strong>Lions Club of Gampaha Metro</strong>, chartered on <strong>1 April 1986</strong>, is a leading community service organization operating under <strong>Lions District 306 D4 – Sri Lanka &amp; Maldives</strong>.</p>
              <p className="about-body-text sr d2">Our diverse membership — including corporate leaders, senior legal and medical professionals, entrepreneurs, bankers, and young professionals — is united by a shared commitment: <em>"We Serve."</em></p>
              <p className="about-body-text sr d3">Guided by Lions Clubs International, we focus on leadership development, healthcare, environmental sustainability, youth empowerment, disaster preparedness, climate change adaptation, and community development across the Gampaha region.</p>
              <div className="about-meta-chips sr d4">
                <div className="chip"><span className="chip-icon">❤️</span> Compassion</div>
                <div className="chip"><span className="chip-icon">⚖️</span> Integrity</div>
                <div className="chip"><span className="chip-icon">🤝</span> Community</div>
                <div className="chip"><span className="chip-icon">🌱</span> Service</div>
              </div>
              <Link to="/about" className="btn-cin-primary sr d5" style={{ marginTop: '10px', display: 'inline-flex' }}>
                Learn More
                <span style={{ display: 'inline-flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 3 · IMPACT */}
      <section className="impact-frame" id="impact">
        <div className="impact-grid-bg" />
        <div className="container">
          <div className="impact-frame-header sr">
            <div className="cin-section-label">Our Impact</div>
            <h2 className="cin-heading">Impact in <span className="gold-italic">Numbers</span></h2>
          </div>

          <div className="impact-counters sr">
            {[
              { icon: 'fa-calendar-check', target: 40, label: 'Years of Service', desc: 'Since 1st of April 1986', suffix: '' },
              { icon: 'fa-users', target: 12445, label: 'Lives Served', desc: 'Directly impacted community members', suffix: '' },
              { icon: 'fa-list-check', target: 132, label: 'Service Projects', desc: 'Completed humanitarian initiatives', suffix: '' },
              { icon: 'fa-users-line', target: 44, label: 'Club Members', desc: 'Dedicated professional volunteers', suffix: '' },
              { icon: 'fa-stethoscope', target: 5, label: 'Diabetes Camps', desc: 'Specialized screening events', suffix: '+' },
              { icon: 'fa-award', target: 3, label: 'Leo Clubs', desc: 'Nurturing future youth leaders', suffix: '' },
            ].map((ic) => (
              <div key={ic.label} className="ic">
                <span className="ic-emoji"><i className={`fa-solid ${ic.icon}`} /></span>
                <div className="ic-num"><span className="counter" data-target={ic.target}>0</span>{ic.suffix}</div>
                <div className="ic-label">{ic.label}</div>
                <div className="ic-desc">{ic.desc}</div>
              </div>
            ))}
          </div>

          <div className="impact-bar-section sr d2">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '30px', letterSpacing: '0.02em' }}>
              Service Areas Performance
            </h3>
            <div className="impact-bars-grid">
              {[
                { icon: 'fa-bowl-food', label: 'Hunger', pct: 57 },
                { icon: 'fa-child', label: 'Youth', pct: 17 },
                { icon: 'fa-handshake', label: 'Humanitarian', pct: 10 },
                { icon: 'fa-leaf', label: 'Environment', pct: 6 },
                { icon: 'fa-circle-exclamation', label: 'Disaster Relief', pct: 5 },
                { icon: 'fa-syringe', label: 'Diabetes', pct: 4 },
                { icon: 'fa-eye', label: 'Vision', pct: 1 },
                { icon: 'fa-ribbon', label: 'Childhood Cancer', pct: 1 },
              ].map((bar) => (
                <div key={bar.label} className="ib-item">
                  <div className="ib-top">
                    <span className="ib-name"><i className={`fa-solid ${bar.icon}`} style={{ marginRight: '8px', color: 'var(--gold)' }} />{bar.label}</span>
                    <span className="ib-pct">{bar.pct}%</span>
                  </div>
                  <div className="ib-track"><div className="ib-fill" data-width={bar.pct} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 4 · GLOBAL CAUSES */}
      <section className="causes-frame" id="causes">
        <div className="container">
          <div className="causes-intro">
            <div>
              <div className="cin-section-label" style={{ color: 'var(--gold-dim)' }}>
                <span style={{ background: 'var(--gold-dim)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
                Global Causes
                <span style={{ background: 'var(--gold-dim)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
              </div>
              <h2 className="cin-heading dark no-glitch" data-glitch-exclude="true" style={{ marginTop: '14px', marginBottom: '24px' }}>
                Serving the<br /><em style={{ color: 'var(--gold-dim)', fontStyle: 'italic' }}>World's Greatest</em><br />Needs
              </h2>
            </div>
            <div>
              <p style={{ color: '#3a3028', fontSize: '0.9rem', lineHeight: '1.85', marginBottom: '20px' }}>
                The Lions Club of Gampaha Metro contributes to the global service initiatives of Lions International. Each cause represents our commitment to improving lives both locally in Gampaha and globally.
              </p>
              <Link to="/about#global-causes" className="btn-cin-primary" style={{ display: 'inline-flex', background: 'var(--navy)', color: 'var(--white)' }}>
                All Global Causes
                <span style={{ display: 'inline-flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className="causes-ribbon">
            {[
              { icon: '/Lions Emblem.png', name: 'Vision', desc: 'Restoring sight and preventing blindness.', nums: [{ v: '163', l: 'Screenings' }, { v: '7', l: 'Cataracts' }], pct: 85, bgPos: '0% 0%' },
              { icon: '/Lions Emblem.png', name: 'Hunger', desc: 'Fighting food insecurity and hunger.', nums: [{ v: '5686', l: 'Meals' }, { v: '80', l: 'Drives' }], pct: 72, bgPos: '33.3% 0%', d: 'd1' },
              { icon: '/Lions Emblem.png', name: 'Environment', desc: 'Protecting our planet for future generations.', nums: [{ v: 'Ongoing', l: 'Monitoring' }, { v: 'O2/CO2', l: 'Focus' }], pct: 78, bgPos: '66.6% 0%', d: 'd2' },
              { icon: '/Lions Emblem.png', name: 'Childhood Cancer', desc: 'Supporting children and their families.', nums: [{ v: '4', l: 'Patients' }, { v: '4', l: 'Families' }], pct: 60, bgPos: '100% 0%', d: 'd3' },
              { icon: '/Lions Emblem.png', name: 'Diabetes', desc: 'Educating and screening for awareness.', nums: [{ v: '336', l: 'Screened' }, { v: '47', l: 'Referrals' }], pct: 80, bgPos: '0% 50%', d: 'd4' },
              { icon: '/Lions Emblem.png', name: 'Mental Health', desc: 'Promoting well-being and awareness.', nums: [{ v: 'Sumithrayo', l: 'Partner' }, { v: 'Gampaha', l: 'Branch' }], pct: 70, bgPos: '66.6% 50%', d: 'd5' },
              { icon: '/Lions Emblem.png', name: 'Disaster Relief', desc: 'Rapid response when needed most.', nums: [{ v: '4231', l: 'Served' }, { v: '1.6M+', l: 'Funds utilized' }], pct: 90, bgPos: '0% 100%', d: 'd6' },
              { icon: '/Lions Emblem.png', name: 'Humanitarian', desc: 'Building resilient, inclusive communities.', nums: [{ v: '10', l: 'Projects' }, { v: '813', l: 'Served' }], pct: 88, bgPos: '100% 100%' },
            ].map((card) => (
              <div key={card.name} className={`crb-card sr${card.d ? ` ${card.d}` : ''}`}>
                <div className="crb-img-thumb" style={{ backgroundImage: 'url("/images/global_causes_thumbnails.png")', backgroundSize: '400% 400%', backgroundPosition: card.bgPos }} />
                <div className="crb-name">
                  <img src={card.icon} alt="Lion" style={{ height: '24px', marginRight: '8px' }} />
                  {card.name}
                </div>
                <p className="crb-desc">{card.desc}</p>
                <div className="crb-nums">
                  {card.nums.map((n) => (
                    <div key={n.l} className="crb-num"><strong>{n.v}</strong><span>{n.l}</span></div>
                  ))}
                </div>
                <div className="crb-bar"><div className="crb-bar-fill" data-width={card.pct} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAME 5 · PRESIDENT */}
      <section className="president-frame" id="president" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          {heroImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: idx === currentHero ? 0.25 : 0,
                transition: 'opacity 2s ease-in-out',
                mixBlendMode: 'luminosity'
              }}
            />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'var(--navy-mid)', opacity: 0.85 }} />
        </div>
        <div className="pf-left" style={{ position: 'relative', zIndex: 1 }}>
          <img
            src="https://i.ibb.co/35JF9Ftx/image.png"
            alt="Club President"
            id="presPhoto"
            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg,var(--navy-mid),var(--navy-light))' }}
          />
          <div className="pf-overlay" />
          <div className="pf-badge">
            <strong>Club President</strong>
            <span>Lions Club of Gampaha Metro</span>
            <span>2025–2026</span>
          </div>
        </div>
        <div className="pf-right" style={{ position: 'relative', zIndex: 1 }}>
          <div className="pf-content">
            <div className="cin-section-label" style={{ justifyContent: 'flex-start', marginBottom: '18px' }}>
              <span style={{ background: 'var(--gold)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
              Presidential Message
              <span style={{ background: 'var(--gold)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
            </div>
            <h2 className="cin-heading sr" style={{ marginBottom: '24px' }}>
              A Message from the <span className="gold-italic">President</span>
            </h2>
            <div className="pf-quote-mark sr">"</div>
            <blockquote className="pf-quote sr d1">
              Dear Fellow Lions, Friends, and Supporters,<br /><br />
              It is with great pride and deep humility that I address you as the President of the Lions Club of Gampaha Metro. For nearly four decades, our club has stood as a beacon of hope, compassion, and service in our community.
              <br /><br />
              Together, we have the power to transform lives, uplift communities, and inspire the next generation of leaders through our Leo programs. <em>We Serve</em>.
            </blockquote>
            <div className="sr d2">
              <div className="pf-sig-line" />
              <div className="pf-sig">
                <strong>Lion Rajitha Abeygunasekara</strong>
                <span>President, Lions Club of Gampaha Metro (2025–2026)</span>
                <span>Lions District 306 D4 – Sri Lanka &amp; Maldives</span>
              </div>
            </div>
            <Link to="/leadership#president" className="btn-cin-ghost sr d3" style={{ marginTop: '26px', display: 'inline-flex' }}>
              Full Message &amp; Profile →
            </Link>
          </div>
        </div>
      </section>

      {/* FRAME 6 · SERVICES */}
      <section className="services-frame" id="services">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="cin-section-label" style={{ justifyContent: 'flex-start', marginBottom: '14px' }}>
                <span style={{ background: 'var(--gold)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
                Community Service
              </div>
              <h2 className="cin-heading sr">Our Signature <span className="gold-italic">Initiatives</span></h2>
            </div>
            <Link to="/services" className="btn-cin-ghost sr" style={{ display: 'inline-flex' }}>All Services →</Link>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="services-horizontal" id="servHoriz" ref={servRef}>
              {[
                { img: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=800', tag: 'Youth Leadership', title: 'PERFECT Prefect Program', desc: 'Empowering school prefects across Gampaha with structured leadership training. Over 427 prefects trained through 16 courses.', href: '/services#youth' },
                { img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800', tag: 'Education', title: 'O/L Results Enhancement', desc: 'Supporting underprivileged students preparing for GCE O/L through tutoring, resources, and motivational programs.', href: '/services#education' },
                { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800', tag: 'Environment', title: 'Climate Adaptation', desc: 'Focusing on environmental sustainability, tree monitoring, and climate change adaptation across the Gampaha region.', href: '/services#environment' },
                { img: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=800', tag: 'Mental Health', title: 'Sumithrayo — Gampaha', desc: 'Supporting Sri Lanka\'s leading mental health organization through fundraising, volunteering, and community awareness.', href: '/services#mental-health' },
                { img: 'https://images.unsplash.com/photo-1593113563332-6bfba169829e?q=80&w=800', tag: 'Disaster Relief', title: '1.6M+ Humanitarian Support', desc: 'Rapid response and significant funding utilized for disaster relief and community preparedness programs.', href: '/services#disaster' },
                { emoji: <i className="fa-solid fa-hand-holding-heart"></i>, bg: 'sc-cta-bg', tag: 'Get Involved', title: 'Join Our Mission', desc: 'Become a Lion and be part of the world\'s largest humanitarian volunteer network. Make a difference today.', isJoin: true },
              ].map((sc, i) => (
                <div key={i} className="sc" style={sc.isJoin ? { background: 'rgba(251, 191, 36,0.06)', borderColor: 'rgba(251, 191, 36,0.25)' } : {}}>
                  <div 
                    className={`sc-top ${sc.bg || ''}`} 
                    style={sc.isJoin 
                        ? { background: 'linear-gradient(135deg,rgba(251, 191, 36,0.8),rgba(210,120,20,0.8))' } 
                        : {}
                    }
                  >
                    {sc.img ? <div className="sc-bg-img" style={{ backgroundImage: `url(${sc.img})` }} /> : null}
                    {sc.img ? <div style={{position: 'absolute', inset: 0, background: 'rgba(5, 15, 10, 0.5)', zIndex: 1}} /> : null}
                    {sc.emoji ? <span style={{position: 'relative', zIndex: 2}}>{sc.emoji}</span> : null}
                  </div>
                  <div className="sc-body">
                    <div className="sc-tag" style={sc.isJoin ? { color: 'var(--gold)' } : {}}>{sc.tag}</div>
                    <h3>{sc.title}</h3>
                    <p>{sc.desc}</p>
                    {sc.isJoin
                      ? <Link to="/login" className="btn-cin-primary" style={{ marginTop: '16px', fontSize: '0.7rem', padding: '10px 20px' }}>Join Now</Link>
                      : <Link to={sc.href} className="sc-link">Explore <span>→</span></Link>
                    }
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Navigation */}
            <button 
              onClick={() => servRef.current.scrollBy({ left: -400, behavior: 'smooth' })}
              style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', background: 'var(--navy-mid)', color: 'var(--gold)', border: '1px solid rgba(251,191,36,0.3)', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button 
              onClick={() => servRef.current.scrollBy({ left: 400, behavior: 'smooth' })}
              style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', background: 'var(--navy-mid)', color: 'var(--gold)', border: '1px solid rgba(251,191,36,0.3)', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
             {[0,1,2,3].map(dot => (
               <div key={dot} style={{ width: dot === 0 ? '30px' : '8px', height: '8px', borderRadius: '4px', background: dot === 0 ? 'var(--gold)' : 'rgba(255,255,255,0.1)', transition: '0.3s' }} />
             ))}
          </div>

          <div className="services-hint sr" style={{ marginTop: '30px' }}>
            <span className="hint-line" />
            <span className="hint-text" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>SCROLL OR DRAG TO DISCOVER MORE INITIATIVES</span>
          </div>
        </div>
      </section>

      {/* FRAME 7 · LEO CLUBS */}
      <section className="leo-frame" id="leo-clubs">
        <div className="container">
          <div className="impact-frame-header sr" style={{ marginBottom: '60px' }}>
            <div className="cin-section-label" style={{ color: 'var(--gold-dim)' }}>
              <span style={{ background: 'var(--gold-dim)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
              Youth Leadership
              <span style={{ background: 'var(--gold-dim)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
            </div>
            <h2 className="cin-heading dark no-glitch">Our <span style={{ color: 'var(--gold-dim)', fontStyle: 'italic' }}>Leo Clubs</span></h2>
            <p style={{ color: '#3a3028', fontSize: '0.9rem', marginTop: '14px', maxWidth: '500px', marginInline: 'auto', lineHeight: '1.75' }}>
              Three vibrant youth clubs sponsored and mentored by Lions Club of Gampaha Metro — nurturing the next generation of community leaders.
            </p>
          </div>

          <div className="leo-triptych">
            {[
              { href: '/leo#metro', num: '01', icon: '🦁', name: 'Leo Club of Gampaha Metro', desc: 'The flagship Leo club directly sponsored by LCGM, engaging young professionals and university students in impactful service.', bar: 'gold-bar' },
              { href: '/leo#kelaniya', num: '02', icon: '🎓', name: 'Leo Club of University of Kelaniya', desc: 'A vibrant academic Leo club combining excellence with community service at the University of Kelaniya.', bar: 'navy-bar' },
              { href: '/leo#juniors', num: '03', icon: '🌟', name: 'Leo Club of Gampaha Metro Juniors', desc: 'Cultivating young school leaders through structured programs, meaningful service, and mentorship activities.', bar: 'green-bar' },
            ].map((lp) => (
              <Link key={lp.href} to={lp.href} className="leo-panel">
                <div className="lp-number">{lp.num}</div>
                <div className="lp-icon">
                  <img src="/images/leo_emblem.png" alt="Leo" style={{ height: '45px', filter: 'brightness(1.1)' }} />
                </div>
                <div className="lp-name">{lp.name}</div>
                <div className="lp-desc">{lp.desc}</div>
                <div className={`lp-bar ${lp.bar}`} />
                <div className="lp-link">View Club →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FRAME 8 · CONTACT */}
      <section className="contact-frame" id="contact">
        <div className="contact-bg-text">SERVE</div>
        <div className="container contact-grid">
          <div className="contact-info-col">
            <div className="cin-section-label" style={{ justifyContent: 'flex-start', marginBottom: '16px' }}>
              <span style={{ background: 'var(--gold)', height: '1px', width: '35px', display: 'inline-block', opacity: 0.5 }} />
              Get Involved
            </div>
            <h2 className="cin-heading sr" style={{ marginBottom: 0 }}>Join the<br /><span className="gold-italic">Lions Movement</span></h2>
            <p className="sr d1">Become a member of the Lions Club of Gampaha Metro and join thousands of dedicated volunteers working to make a difference across Sri Lanka and the world.</p>
            <div className="contact-deets sr d2">
              {[
                { icon: '📍', label: 'Location', val: 'Gampaha, Western Province, Sri Lanka' },
                { icon: '🏛️', label: 'District', val: 'Lions District 306 D4 – Sri Lanka & Maldives' },
                { icon: '📅', label: 'Chartered', val: '1 April 1986' },
                { icon: '🌍', label: 'Affiliation', val: 'Lions Clubs International (LCI)' },
              ].map((d) => (
                <div key={d.label} className="cdeet">
                  <span className="cdeet-icon">{d.icon}</span>
                  <div>
                    <span className="cdeet-label">{d.label}</span>
                    <span className="cdeet-val">{d.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cin-form sr-right">
            <h3>Express Your Interest</h3>
            <form id="contactForm" noValidate>
              <div className="cin-form-row">
                <div className="fg">
                  <label htmlFor="fName">Full Name</label>
                  <input type="text" id="fName" name="name" placeholder="Your full name" required />
                </div>
                <div className="fg">
                  <label htmlFor="fEmail">Email</label>
                  <input type="email" id="fEmail" name="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="cin-form-row">
                <div className="fg">
                  <label htmlFor="fPhone">Phone</label>
                  <input type="tel" id="fPhone" name="phone" placeholder="+94 7X XXX XXXX" />
                </div>
                <div className="fg">
                  <label htmlFor="fInterest">Interest</label>
                  <select id="fInterest" name="interest">
                    <option value="">Select interest</option>
                    <option value="membership">Club Membership</option>
                    <option value="youth">Youth / Leo Club</option>
                    <option value="volunteer">Volunteer Work</option>
                    <option value="service">Support a Project</option>
                    <option value="other">General Inquiry</option>
                  </select>
                </div>
              </div>
              <div className="fg">
                <label htmlFor="fMsg">Message</label>
                <textarea id="fMsg" name="message" rows="3" placeholder="Tell us about yourself..." />
              </div>
              <button type="submit" className="btn-cin-primary" style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer', padding: '16px 34px' }} id="submitBtn">
                Submit Interest
                <span style={{ display: 'inline-flex' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
