import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const hamburgerRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('lion_token'))
  }, [location])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const closeMob = () => setMenuOpen(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { path: '/', label: 'Home', dropdown: null },
    {
      path: '/about', label: 'About', dropdown: [
        { path: '/about#overview', label: 'Club Overview' },
        { path: '/about#history', label: 'Our History' },
        { path: '/about#mission', label: 'Mission & Vision' },
        { path: '/about#lions-int', label: 'Lions International' },
        { path: '/about#ethics', label: 'Code of Ethics' },
      ]
    },
    {
      path: '/leadership', label: 'Leadership', dropdown: [
        { path: '/leadership#president', label: 'Club President' },
        { path: '/leadership#board', label: 'Board of Directors' },
        { path: '/leadership#committees', label: 'Committees' },
      ]
    },
    {
      path: '/members', label: 'Members', dropdown: [
        { path: '/members#current', label: 'Current Members' },
        { path: '/members#charter', label: 'Charter Members' },
        { path: '/members#past-presidents', label: 'Past Presidents' },
        { path: '/members#distinguished', label: 'Distinguished Lions' },
      ]
    },
    {
      path: '/services', label: 'Services', dropdown: [
        { path: '/services#health', label: 'Health Programs' },
        { path: '/services#environment', label: 'Environment' },
        { path: '/services#youth', label: 'Youth Development' },
        { path: '/services#disaster', label: 'Disaster Relief' },
        { path: '/services#mental-health', label: 'Mental Health' },
        { path: '/services#newsletter', label: 'Newsletter' },
      ]
    },
    {
      path: '/leo', label: 'Leo Clubs', dropdown: [
        { path: '/leo#metro', label: 'Leo Club Gampaha Metro' },
        { path: '/leo#kelaniya', label: 'Leo Club of Kelaniya Uni' },
        { path: '/leo#juniors', label: 'Leo Club Metro Juniors' },
      ]
    },
  ]

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(9,24,40,0.98)',
          zIndex: 889,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: menuOpen ? 1 : 0,
          transition: 'transform 0.5s cubic-bezier(0.76,0,0.24,1), opacity 0.4s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '28px',
          backdropFilter: 'blur(30px)',
        }}
      >
        {[
          { to: '/', label: 'Home' },
          { to: '/about', label: 'About' },
          { to: '/leadership', label: 'Leadership' },
          { to: '/members', label: 'Members' },
          { to: '/services', label: 'Services' },
          { to: '/leo', label: 'Leo Clubs' },
        ].map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeMob}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '2rem',
              color: '#f5f0e8',
              letterSpacing: '0.1em',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.07}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.07}s`,
            }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to={isLoggedIn ? "/dashboard" : "/login"}
          onClick={closeMob}
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.5rem',
            color: '#a7e1c3',
            letterSpacing: '0.2em',
            border: '1px solid #a7e1c3',
            padding: '12px 40px',
            borderRadius: '2px',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
            transition: `opacity 0.4s ease 0.59s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.59s`,
          }}
        >
          {isLoggedIn ? "My Dashboard" : "Join Us"}
        </Link>
      </div>

      <nav className={`cin-nav${solid ? ' solid' : ''}${location.pathname === '/' && !solid ? ' home-entrance' : ''}`} id="cinNav">
        <div className="nav-inner">
          <Link to="/" className="cin-logo">
            <img
              src="/Lions Emblem.png"
              alt="Lions Club of Gampaha Metro Emblem"
              className="cin-logo-img"
              style={{ height: '42px', width: 'auto', marginRight: '12px', objectFit: 'contain' }}
            />
            <div className="cin-logo-text">
              <span className="cin-logo-main">Lions Club</span>
              <span className="cin-logo-sub">Gampaha Metro</span>
            </div>
          </Link>

          <div className="cin-links" id="cinLinks">
            {navLinks.map((navLink) =>
              navLink.dropdown ? (
                <div className="cin-dropdown" key={navLink.path}>
                  <Link
                    to={navLink.path}
                    className={`cin-link${isActive(navLink.path) ? ' active' : ''}`}
                  >
                    {navLink.label} ▾
                  </Link>
                  <div className="cin-sub">
                    <div className="mega-menu-inner">
                      {navLinks.filter(n => n.dropdown).map((col) => (
                        <div className="mega-menu-col" key={col.label}>
                          <h4 className="mega-menu-title">{col.label}</h4>
                          {col.dropdown.map((sub) => (
                            <Link key={sub.path} to={sub.path}>
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={navLink.path}
                  to={navLink.path}
                  className={`cin-link${isActive(navLink.path) ? ' active' : ''}`}
                >
                  {navLink.label}
                </Link>
              )
            )}

            {isLoggedIn ? (
              <Link to={localStorage.getItem('lion_role') === 'Admin' || localStorage.getItem('lion_role') === 'President' ? "/admin" : "/dashboard"} className="cin-link" style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: '800', letterSpacing: '0.1em' }}>
                {localStorage.getItem('lion_role') === 'Admin' || localStorage.getItem('lion_role') === 'President' ? "Admin Console" : "My Dashboard"}
              </Link>
            ) : (
              <Link to="/login" className="cin-join-btn" id="joinNavBtn">
                Join Us
              </Link>
            )}
          </div>

          <button
            className="cin-hamburger"
            id="cinHamburger"
            aria-label="Menu"
            ref={hamburgerRef}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              style={{
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : '',
                transition: 'transform 0.3s ease',
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s ease' }} />
            <span
              style={{
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : '',
                transition: 'transform 0.3s ease',
              }}
            />
          </button>
        </div>
      </nav>
    </>
  )
}
