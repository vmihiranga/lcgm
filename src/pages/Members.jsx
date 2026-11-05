import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import Tabs from '../components/Tabs'
import ScrollProgress from '../components/ScrollProgress'
import useCinematic from '../hooks/useCinematic'

const tabs = [
  { id: 'current', label: 'Current Members' },
  { id: 'charter', label: 'Charter Members' },
  { id: 'past-presidents', label: 'Past Presidents' },
  { id: 'distinguished', label: 'Distinguished Lions' },
  { id: 'fellows', label: 'Fellowship Holders' },
]

export default function Members() {
  useCinematic()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <PageHero
        title="The"
        titleHighlight="Lions"
        subtitle='A dedicated fellowship of professionals and volunteers united by the motto "We Serve".'
        breadcrumb="Members"
      />

      <section className="section" style={{ paddingTop: '60px', paddingBottom: '120px', background: 'var(--off-white)' }}>
        <div className="container">
          <Tabs tabs={tabs}>
            {(active) => (
              <>
                {/* CURRENT MEMBERS */}
                <div id="current" style={{ display: active === 'current' ? 'block' : 'none' }}>
                  <div className="section-label">2025–2026</div>
                  <h2 className="section-title" style={{ marginBottom: '14px' }}>Current <span className="text-gold">Members</span></h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '36px' }}>Our members are professionals, entrepreneurs, educators and community leaders united by the purpose of service.</p>
                  <div className="members-grid">
                    {[
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: 'President', prof: 'Professional / Entrepreneur', year: 'Member Since: 20XX' },
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: 'Immediate Past President', prof: 'Community Leader', year: 'Member Since: 20XX' },
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: '1st Vice President', prof: 'Business Professional', year: 'Member Since: 20XX' },
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: 'Secretary', prof: 'Educator', year: 'Member Since: 20XX' },
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: 'Treasurer', prof: 'Financial Professional', year: 'Member Since: 20XX' },
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: 'Director', prof: 'Healthcare Professional', year: 'Member Since: 20XX' },
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: 'Director', prof: 'Engineer', year: 'Member Since: 20XX' },
                      { icon: 'fa-user', name: 'Lion [Member Name]', role: 'Member', prof: 'Entrepreneur', year: 'Member Since: 20XX' },
                    ].map((m, i) => (
                      <div key={i} className="member-card reveal">
                        <div className="member-photo"><i className={`fa-solid ${m.icon}`} /></div>
                        <div className="member-info">
                          <h3>{m.name}</h3>
                          <div className="member-role">{m.role}</div>
                          <div className="member-profession">{m.prof}</div>
                          <div className="member-year">{m.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '40px', padding: '30px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full member profiles to be updated with names, photos, and detailed information.</p>
                    <Link to="/login" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>Become a Member →</Link>
                  </div>
                </div>

                {/* CHARTER MEMBERS */}
                <div id="charter" style={{ display: active === 'charter' ? 'block' : 'none' }}>
                  <div className="section-label">Founding Members</div>
                  <h2 className="section-title" style={{ marginBottom: '20px' }}>Charter <span className="text-gold">Members</span></h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '36px', fontSize: '0.95rem', lineHeight: '1.75' }}>The founding members who chartered the Lions Club of Gampaha Metro on <strong>1 April 1986</strong>.</p>
                  <div className="highlight-box" style={{ marginBottom: '40px' }}>
                    <h3>1 April 1986</h3>
                    <p>On this historic day, a group of dedicated community leaders came together to establish the Lions Club of Gampaha Metro under Lions International.</p>
                  </div>
                  <div className="members-grid">
                    {[
                      { icon: 'fa-paw', name: 'Lion [Charter President]', role: 'Charter President', prof: 'Community Leader' },
                      { icon: 'fa-paw', name: 'Lion [Charter Member]', role: 'Charter Secretary', prof: 'Professional' },
                      { icon: 'fa-paw', name: 'Lion [Charter Member]', role: 'Charter Treasurer', prof: 'Professional' },
                      { icon: 'fa-paw', name: 'Lion [Charter Member]', role: 'Charter Member', prof: 'Entrepreneur' },
                    ].map((m, i) => (
                      <div key={i} className="member-card reveal">
                        <div className="member-photo"><i className={`fa-solid ${m.icon}`} /></div>
                        <div className="member-info">
                          <h3>{m.name}</h3>
                          <div className="member-role">{m.role}</div>
                          <div className="member-profession">{m.prof}</div>
                          <div className="member-year">Charter Member · 1986</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PAST PRESIDENTS */}
                <div id="past-presidents" style={{ display: active === 'past-presidents' ? 'block' : 'none' }}>
                  <div className="section-label">1986 – Present</div>
                  <h2 className="section-title" style={{ marginBottom: '36px' }}>Past <span className="text-gold">Presidents</span></h2>
                  <table className="pp-table">
                    <thead>
                      <tr><th>#</th><th>Lion's Name</th><th>Year of Presidency</th><th>Notable Contributions</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>1</td><td>Lion [Charter President]</td><td className="year-term">1986–1987</td><td>Founded the club; established founding programs</td></tr>
                      <tr><td>2</td><td>Lion [Past President]</td><td className="year-term">1987–1988</td><td>Expanded membership and service activities</td></tr>
                      <tr><td>3</td><td>Lion [Past President]</td><td className="year-term">1988–1989</td><td>Initiated first health camp programs</td></tr>
                      <tr><td>4</td><td>Lion [Past President]</td><td className="year-term">1989–1990</td><td>Sponsored first Leo Club</td></tr>
                      <tr><td>5</td><td>Lion [Past President]</td><td className="year-term">1990–1991</td><td>Expanded environmental projects</td></tr>
                      <tr><td>—</td><td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>Records for years 1991–2020 to be updated</td></tr>
                      <tr><td>35</td><td>Lion [Past President]</td><td className="year-term">2022–2023</td><td>COVID recovery programs; digital transformation</td></tr>
                      <tr><td>36</td><td>Lion [Past President]</td><td className="year-term">2023–2024</td><td>BBBG Initiative; Leo club expansion</td></tr>
                      <tr><td>37</td><td>Lion [Past President]</td><td className="year-term">2024–2025</td><td>Sumithrayo partnership; Gampabathuru.lk</td></tr>
                      <tr><td>38</td><td>Lion [Current President]</td><td className="year-term">2025–2026</td><td>Current President</td></tr>
                    </tbody>
                  </table>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '16px', textAlign: 'center' }}>* Full records to be completed with actual names and years</p>
                </div>

                {/* DISTINGUISHED LIONS */}
                <div id="distinguished" style={{ display: active === 'distinguished' ? 'block' : 'none' }}>
                  <div className="section-label">Recognized Leaders</div>
                  <h2 className="section-title" style={{ marginBottom: '20px' }}>Distinguished <span className="text-gold">Lions</span></h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '36px', lineHeight: '1.75' }}>The Lions Club of Gampaha Metro has produced outstanding leaders who have represented our club at district, national, and international levels.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { icon: 'fa-building-columns', color: 'var(--navy)', role: 'District Governor', name: 'Lion [DG Name]', desc: 'Served as District Governor for Lions District 306 D4, providing outstanding leadership across Sri Lanka and Maldives.' },
                      { icon: 'fa-earth-americas', color: 'var(--navy)', role: 'International Representative', name: "Lion [Int'l Rep Name]", desc: "Represented LCGM at Lions International conventions and global service forums." },
                      { icon: 'fa-award', color: 'var(--gold)', role: 'Award Recipient', name: 'Lion [Awardee Name]', desc: 'Recognized for exceptional humanitarian service and leadership at the district and international level.' },
                    ].map((d) => (
                      <div key={d.name} className="dg-card reveal">
                        <div className="dg-icon"><i className={`fa-solid ${d.icon}`} style={{ color: d.color }} /></div>
                        <div>
                          <div className="dg-role">{d.role}</div>
                          <div className="dg-name">{d.name}</div>
                          <div className="dg-desc">{d.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FELLOWSHIP HOLDERS */}
                <div id="fellows" style={{ display: active === 'fellows' ? 'block' : 'none' }}>
                  <div className="section-label">Honors & Recognition</div>
                  <h2 className="section-title" style={{ marginBottom: '20px' }}>Fellowship <span className="text-gold">Holders</span></h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '36px', lineHeight: '1.75' }}>Fellowship awards represent some of the highest honors in Lions International.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
                    <div style={{ background: 'linear-gradient(135deg,var(--navy-dark),var(--navy))', borderRadius: 'var(--radius-lg)', padding: '36px', color: 'var(--white)' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '14px', color: 'var(--gold)' }}><i className="fa-solid fa-medal" /></div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '12px' }}>Melvin Jones Fellow (MJF)</h3>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '16px' }}>The highest individual honor recognizing Lions members for dedicated humanitarian service. Named after the founder of Lions International, Melvin Jones.</p>
                      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
                        <p style={{ color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: '600' }}>Our MJF Holders</p>
                        <ul style={{ marginTop: '8px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {['Lion [MJF Name] — Year XXXX', 'Lion [MJF Name] — Year XXXX', 'Lion [MJF Name] — Year XXXX'].map((m) => (
                            <li key={m} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}><i className="fa-solid fa-paw" style={{ marginRight: '8px', color: 'var(--gold)' }} />{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div style={{ background: 'linear-gradient(135deg,var(--navy-mid),var(--navy-light))', borderRadius: 'var(--radius-lg)', padding: '36px', color: 'var(--white)' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#A8FFD4' }}><i className="fa-solid fa-star" /></div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#A8FFD4', marginBottom: '12px' }}>Mahendra Amarasuriya Fellow</h3>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '16px' }}>A prestigious fellowship recognizing outstanding Lions in the Sri Lanka and Maldives district.</p>
                      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
                        <p style={{ color: '#A8FFD4', fontSize: '0.82rem', fontWeight: '600' }}>Our Fellowship Holders</p>
                        <ul style={{ marginTop: '8px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {['Lion [Fellow Name] — Year XXXX', 'Lion [Fellow Name] — Year XXXX'].map((m) => (
                            <li key={m} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}><i className="fa-solid fa-paw" style={{ marginRight: '8px', color: '#A8FFD4' }} />{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="highlight-box">
                    <h3>Honoring Service Excellence</h3>
                    <p>These recognitions reflect the significant contributions our members have made to humanitarian service both locally in Gampaha and globally through Lions International programs.</p>
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
