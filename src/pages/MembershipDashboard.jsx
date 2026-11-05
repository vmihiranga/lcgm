import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import useCinematic from '../hooks/useCinematic'

export default function MembershipDashboard() {
  useCinematic()
  const navigate = useNavigate()
  const [memberInfo, setMemberInfo] = useState(null)
  const [announcements, setAnnouncements] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('lion_token')
      if (!token) return navigate('/login')

      try {
        const [pResp, aResp, eResp] = await Promise.all([
          fetch('/api/members/me', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/announcements'),
          fetch('/api/events')
        ])
        
        if (pResp.ok) {
          const pData = await pResp.json()
          const aData = aResp.ok ? await aResp.json() : []
          const eData = eResp.ok ? await eResp.json() : []
          
          setMemberInfo(pData)
          setAnnouncements(aData)
          setEvents(eData)
        } else {
          localStorage.removeItem('lion_token')
          navigate('/login')
        }
      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('lion_token')
    navigate('/login')
  }

  if (loading) return (
    <div style={{ background: 'var(--navy-dark)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
      Loading Profile...
    </div>
  )

  if (!memberInfo) return null

  const upcomingEvents = events.length > 0 ? events.slice(0, 3) : [
    { title: "No upcoming events", date: "TBD", location: "Check back later" }
  ]

  const quickLinks = [
    { label: "Pay Dues Online", icon: "fa-credit-card", color: "#FBBF24" },
    { label: "Submit Service Report", icon: "fa-file-lines", color: "#34D399" },
    { label: "Request Leave of Absence", icon: "fa-calendar-minus", color: "#F87171" },
    { label: "Download Newsletter", icon: "fa-download", color: "#60A5FA" },
    { label: "Member Directory", icon: "fa-users", color: "#A78BFA" },
    { label: "Convention Registration", icon: "fa-ticket", color: "#F472B6" }
  ]

  return (
    <>
      <Nav />
      <div style={{ background: 'var(--navy-dark)', minHeight: '100vh', padding: '120px 0 80px' }}>
        <div className="container">
          
          {/* Dashboard Header */}
          <div className="sr" style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div className="cin-section-label" style={{ marginBottom: '14px' }}>Membership Portal</div>
              <h1 className="cin-heading" style={{ fontSize: '3rem', marginBottom: '8px' }}>
                Welcome, <span className="gold-italic">{memberInfo.name}</span>
              </h1>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>{memberInfo.district} · {memberInfo.club}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {(memberInfo.role === 'Admin' || memberInfo.role === 'President') && (
                <Link to="/admin" className="btn-cin-primary" style={{ padding: '12px 24px', fontSize: '0.75rem', border: '1px solid var(--gold)', background: 'transparent', color: 'var(--gold)' }}>Admin Console</Link>
              )}
              <button className="btn-cin-ghost" style={{ padding: '12px 24px', fontSize: '0.75rem' }}>Edit Profile</button>
              <button onClick={handleLogout} className="btn-cin-primary" style={{ padding: '12px 24px', fontSize: '0.75rem' }}>Log Out</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
            
            {/* Left Column: Profile & Quick Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Profile Card */}
              <div className="sr d1" style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(251, 191, 36, 0.1)', 
                padding: '40px', 
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
                  <div style={{ 
                    background: 'rgba(52, 211, 153, 0.1)', 
                    color: '#34D399', 
                    padding: '6px 16px', 
                    borderRadius: '20px', 
                    fontSize: '0.65rem', 
                    fontWeight: '700', 
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    {memberInfo.status} Member
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    color: 'var(--navy-dark)',
                    fontWeight: '700'
                  }}>
                    {memberInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '6px' }}>{memberInfo.name}</h3>
                    <p style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>{memberInfo.role}</p>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{memberInfo.since}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Attendance</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)' }}>{memberInfo.attendance}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Service Hours</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--gold)' }}>{memberInfo.serviceHours}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Impact Points</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)' }}>{memberInfo.impactPoints}</span>
                  </div>
                </div>
              </div>

              {/* Quick Links Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {quickLinks.map((link, i) => (
                  <div key={i} className={`sr d${i+2}`} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '24px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '4px', 
                      background: `${link.color}15`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: link.color
                    }}>
                      <i className={`fa-solid ${link.icon}`} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-body)' }}>{link.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Events & Status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Status Section */}
              <div className="sr d2" style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                padding: '30px', 
                borderRadius: '4px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', margin: 0 }}>Financial Status</h3>
                  <i className="fa-solid fa-circle-check" style={{ color: '#34D399' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', color: 'var(--white)' }}>2025–2026 Dues</span>
                  <span style={{ color: '#34D399', fontWeight: '700', fontSize: '0.9rem' }}>{memberInfo.duesStatus}</span>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="sr d3" style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(251, 191, 36, 0.1)', 
                padding: '36px', 
                borderRadius: '4px' 
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--white)', marginBottom: '26px' }}>Upcoming Club <span className="gold-italic">Events</span></h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {upcomingEvents.map((event, i) => (
                    <div key={i} style={{ 
                      paddingBottom: i === upcomingEvents.length - 1 ? 0 : '20px', 
                      borderBottom: i === upcomingEvents.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      gap: '20px'
                    }}>
                      <div style={{ 
                        background: 'rgba(251, 191, 36, 0.1)', 
                        padding: '10px 14px', 
                        borderRadius: '4px',
                        textAlign: 'center',
                        minWidth: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: '700', letterSpacing: '0.1em' }}>{event.date?.split(' ')[0]}</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--white)' }}>{event.date?.split(' ')[1]?.replace(',', '') || '--'}</span>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', color: 'var(--white)', marginBottom: '4px' }}>{event.title || event.name}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          <span><i className="fa-solid fa-clock" style={{ marginRight: '6px' }} />{event.time || 'All Day'}</span>
                          <span><i className="fa-solid fa-location-dot" style={{ marginRight: '6px' }} />{event.location || event.loc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-cin-ghost" style={{ width: '100%', marginTop: '30px', fontSize: '0.7rem' }}>View Full Calendar</button>
              </div>

              {/* Latest Announcement */}
              <div className="sr d4" style={{ 
                background: 'linear-gradient(135deg, var(--navy-mid), var(--navy-dark))',
                padding: '30px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '16px' }}>
                  <i className="fa-solid fa-bullhorn" />
                </div>
                <h4 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '8px' }}>
                  {announcements.length > 0 ? announcements[0].title : 'No New Announcements'}
                </h4>
                <p style={{ color: 'var(--text-body)', fontSize: '0.82rem', lineHeight: '1.7' }}>
                  {announcements.length > 0 
                    ? announcements[0].content 
                    : 'Stay tuned for updates from the club board and district leadership.'}
                </p>
                {announcements.length > 0 && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold)', marginTop: '10px', display: 'block' }}>
                    Posted {new Date(announcements[0].date).toLocaleDateString()}
                  </span>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
