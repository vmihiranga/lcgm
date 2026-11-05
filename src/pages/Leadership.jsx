import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import Tabs from '../components/Tabs'
import ScrollProgress from '../components/ScrollProgress'
import useCinematic from '../hooks/useCinematic'

const tabs = [
  { id: 'president', label: 'Club President' },
  { id: 'board', label: 'Board of Directors' },
  { id: 'committees', label: 'Committees' },
]

const boardMembers = [
  { emoji: '🦁', position: 'President', name: 'Lion Rajitha Abeygunasekara' },
  { emoji: '👑', position: 'Immediate Past President', name: 'Lion [IPP Name]' },
  { emoji: '⭐', position: '1st Vice President', name: 'Lion [VP1 Name]' },
  { emoji: '⭐', position: '2nd Vice President', name: 'Lion [VP2 Name]' },
  { emoji: '📋', position: 'Secretary', name: 'Lion [Secretary Name]' },
  { emoji: '💰', position: 'Treasurer', name: 'Lion [Treasurer Name]' },
  { emoji: '🎯', position: 'Director – Service', name: 'Lion [Director Name]' },
  { emoji: '🎯', position: 'Director – Membership', name: 'Lion [Director Name]' },
  { emoji: '🎯', position: 'Director – Finance', name: 'Lion [Director Name]' },
  { emoji: '🎯', position: 'Director – Marketing', name: 'Lion [Director Name]' },
]

const standingCommittees = [
  { icon: '🌍', label: 'Global Action Team' }, { icon: '👥', label: 'Membership' }, { icon: '📣', label: 'Marketing' }, { icon: '🤝', label: 'Service' },
  { icon: '💰', label: 'Finance' }, { icon: '💻', label: 'Information Technology' }, { icon: '🎓', label: 'Leadership' }, { icon: '📜', label: 'Constitution & Bylaws' },
]

const specialCommittees = [
  { icon: '🦁', label: 'Leo Club Advisor' }, { icon: '🌱', label: 'Environment' }, { icon: '🩺', label: 'Health & Medical' }, { icon: '🆘', label: 'Disaster Preparedness' },
  { icon: '🧠', label: 'Mental Health' }, { icon: '🎉', label: 'Club Development' }, { icon: '📸', label: 'Communications' }, { icon: '🏆', label: 'Awards & Recognition' },
]

export default function Leadership() {
  useCinematic()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <PageHero
        title="Our"
        titleHighlight="Leadership"
        subtitle="Directed by a shared vision of service, compassion, and integrity since 1986."
        breadcrumb="Leadership"
      />

      <section className="section" style={{ paddingTop: '60px', paddingBottom: '120px', background: 'var(--off-white)' }}>
        <div className="container">
          <Tabs tabs={tabs}>
            {(active) => (
              <>
                {/* PRESIDENT */}
                <div className="tab-content" id="president" style={{ display: active === 'president' ? 'block' : 'none' }}>
                  <div className="section-label">2025–2026</div>
                  <h2 className="section-title" style={{ marginBottom: '40px' }}>Club <span className="text-gold">President</span></h2>
                  <div className="president-feature">
                    <div className="pres-photo-card">
                      <div className="pres-photo-top">
                        <img src="/images/president_photo.png" alt="Club President" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '🦁' }} />
                      </div>
                      <div className="pres-photo-info">
                        <div className="pres-name">Lion Rajitha Abeygunasekara</div>
                        <div className="pres-title-tag">Club President 2025–2026</div>
                        <div className="pres-year">Lions Club of Gampaha Metro</div>
                      </div>
                    </div>
                    <div className="pres-content">
                      <div className="section-label">Presidential Message</div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '20px' }}>Leadership <span className="text-gold">Journey</span></h3>
                      <p>Dear Fellow Lions, Friends, and Supporters — it is with great pride and deep humility that I serve as President of the Lions Club of Gampaha Metro for 2025–2026.</p>
                      <p>As your President, my vision is to strengthen our club's foundations, expand our reach in the Gampaha area, and deepen our impact across all eight global causes of Lions International.</p>
                      <p>Together, we will continue our club's proud legacy of making a meaningful difference — in our neighborhood, our district, and our world.</p>
                      <p><em>"The greatest use of life is to spend it for something that will outlast it."</em></p>
                      <div style={{ background: 'var(--light-grey)', borderRadius: 'var(--radius-md)', padding: '20px', marginTop: '20px' }}>
                        <h4 style={{ color: 'var(--navy)', marginBottom: '12px', fontSize: '0.9rem' }}>Presidential Priorities 2025–2026</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {['Expand youth leadership through Leo club programs', 'Strengthen mental health and well-being initiatives', 'Deepen environmental conservation efforts', 'Grow membership and fellowship among Lions', 'Enhance disaster preparedness and relief capacity'].map((p) => (
                            <li key={p} style={{ display: 'flex', gap: '10px', fontSize: '0.87rem', color: 'var(--text-secondary)' }}>✅ {p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOARD */}
                <div className="tab-content" id="board" style={{ display: active === 'board' ? 'block' : 'none' }}>
                  <div className="section-label">Club Leadership</div>
                  <h2 className="section-title" style={{ marginBottom: '40px' }}>Board of <span className="text-gold">Directors</span></h2>
                  <div className="board-grid">
                    {boardMembers.map((m, i) => (
                      <div key={i} className="board-card reveal">
                        <div className="board-avatar">{m.emoji}</div>
                        <div className="board-info">
                          <div className="board-position">{m.position}</div>
                          <h3>{m.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="highlight-box" style={{ marginTop: '40px' }}>
                    <h3>Serving with Dedication</h3>
                    <p>The Board of Directors includes key officers responsible for administration, service delivery, membership development, and fundraising activities.</p>
                  </div>
                </div>

                {/* COMMITTEES */}
                <div className="tab-content" id="committees" style={{ display: active === 'committees' ? 'block' : 'none' }}>
                  <div className="section-label">Organizational Structure</div>
                  <h2 className="section-title" style={{ marginBottom: '20px' }}>Club <span className="text-gold">Committees</span></h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', maxWidth: '680px', marginBottom: '40px' }}>Our club operations are organized through standing and special committees, each focused on specific aspects of our service mission.</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '20px' }}>Standing Committees</h3>
                  <div className="committee-grid">
                    {standingCommittees.map((c) => <div key={c.label} className="committee-card reveal"><div className="c-icon">{c.icon}</div><h4>{c.label}</h4></div>)}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--navy)', margin: '40px 0 20px' }}>Special Committees</h3>
                  <div className="committee-grid">
                    {specialCommittees.map((c) => <div key={c.label} className="committee-card reveal"><div className="c-icon">{c.icon}</div><h4>{c.label}</h4></div>)}
                  </div>
                </div>
              </>
            )}
          </Tabs>
        </div>
      </section>

      <Footer />
    </>
  )
}
