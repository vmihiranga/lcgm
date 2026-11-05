import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import Tabs from '../components/Tabs'
import ScrollProgress from '../components/ScrollProgress'
import useCinematic from '../hooks/useCinematic'

const tabs = [
  { id: 'overview', label: 'Club Overview' },
  { id: 'history', label: 'Our History' },
  { id: 'mission', label: 'Mission & Vision' },
  { id: 'lions-int', label: 'Lions International' },
  { id: 'ethics', label: 'Code of Ethics' },
  { id: 'global-causes', label: 'Global Causes' },
]

export default function About() {
  useCinematic()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <PageHero
        title="Our"
        titleHighlight="Legacy"
        subtitle="Serving humanity and inspiring lives with compassion and integrity for nearly four decades."
        breadcrumb="About Us"
      />

      <section className="section" style={{ paddingTop: '60px', paddingBottom: '120px', background: 'var(--off-white)' }}>
        <div className="container">
          <Tabs tabs={tabs}>
            {(active) => (
              <>
                {/* OVERVIEW */}
                <div className="tab-content" id="overview" style={{ display: active === 'overview' ? 'block' : 'none' }}>
                  <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'start' }}>
                    <div>
                      <div className="section-label">Who We Are</div>
                      <h2 className="section-title">Club <span className="text-gold">Overview</span></h2>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '16px', fontSize: '0.95rem' }}>
                        The <strong>Lions Club of Gampaha Metro</strong> is a distinguished humanitarian service organization chartered on <strong>1 April 1986</strong>. We operate under <strong>Lions District 306 D4 – Sri Lanka &amp; Maldives</strong>.
                      </p>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '16px', fontSize: '0.95rem' }}>
                        Our members are professionals, entrepreneurs, educators, and community leaders united by a shared commitment: <em>We Serve.</em>
                      </p>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.95rem' }}>
                        Over the decades, we have conducted hundreds of service projects spanning health, environment, youth empowerment, mental well-being, disaster relief, and more.
                      </p>
                      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                          { icon: <i className="fa-solid fa-calendar-alt"></i>, label: 'Charter Date', val: '1 April 1986' },
                          { icon: <i className="fa-solid fa-building-columns"></i>, label: 'District', val: 'Lions District 306 D4 – Sri Lanka & Maldives' },
                          { icon: <i className="fa-solid fa-globe"></i>, label: 'Affiliation', val: 'Lions Clubs International (LCI)' },
                          { icon: <i className="fa-solid fa-paw"></i>, label: 'Leo Clubs Sponsored', val: '3 Leo Clubs (Metro, Kelaniya, Juniors)' },
                        ].map((item) => (
                          <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--white)', padding: '14px 20px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
                            <span style={{ fontSize: '1.4rem', color: 'var(--gold-dim)' }}>{item.icon}</span>
                            <div><strong style={{ color: 'var(--navy)', display: 'block', fontSize: '0.85rem' }}>{item.label}</strong><span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{item.val}</span></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="highlight-box">
                        <h3>Our Motto</h3>
                        <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginTop: '12px' }}>"We Serve"</p>
                        <p style={{ marginTop: '14px' }}>The universal Lions motto captures our essence — a commitment to service above self, unity in action, and compassion for all.</p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px', marginTop: '20px' }}>
                        {[
                          { icon: <i className="fa-solid fa-calendar-check"></i>, num: '40', label: 'Years Active' }, 
                          { icon: <i className="fa-solid fa-handshake"></i>, num: '132', label: 'Service Projects' }, 
                          { icon: <i className="fa-solid fa-users"></i>, num: '44', label: 'Active Members' }, 
                          { icon: <i className="fa-solid fa-globe"></i>, num: '1', label: 'Global Movement' }
                        ].map((s) => (
                          <div key={s.label} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--gold)' }}>{s.icon}</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{s.num}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* HISTORY */}
                <div className="tab-content" id="history" style={{ display: active === 'history' ? 'block' : 'none' }}>
                  <div className="section-label">Our Journey</div>
                  <h2 className="section-title" style={{ marginBottom: '40px' }}>Our <span className="text-gold">History</span></h2>
                  <div className="timeline">
                    {[
                      { year: '1986', title: 'Club Charter', desc: 'The Lions Club of Gampaha Metro was officially chartered on 1 April 1986, embarking on a four-decade journey of humanitarian service.' },
                      { year: '1993', title: 'Expanding Youth Leadership', desc: 'Chartered the Leo Club of Gampaha Metro, building a strong foundation for youth empowerment.' },
                      { year: '1997', title: 'Sponsoring Growth', desc: 'Extended the Lions Club of Weliveriya, expanding the reach of the Lions movement.' },
                      { year: '1999', title: 'National Leadership', desc: 'Produced Leo Multiple District President Leo Tharindu Thissera.' },
                      { year: '2001 - 2006', title: 'Regional Expansion', desc: 'Extended Mirigama Metro Lions Club (2001) and Gampaha Circle Lions Club (2006).' },
                      { year: '2012', title: 'Next Gen Leos', desc: 'Chartered the Leo Club of Gampaha Metro II to continue nurturing young leaders.' },
                      { year: '2016', title: 'Continued Excellence', desc: 'Produced Leo Multiple District President Leo Rajitha Abeygunasekara.' },
                      { year: '2017', title: 'Global Recognition', desc: 'Produced our first International Officer, Leo Lion Rajitha Abeygunasekara (Program Advisory Panelist). Awarded "World Class Centennial Lions Club" by Lions International.' },
                      { year: '2026', title: 'Contemporary Impact', desc: 'Extended two new clubs: Lions Club of Malwana and Lions Club of Gampaha Alliance, marking 40 years of service.' },
                    ].map((item) => (
                      <div key={item.year} className="timeline-item reveal">
                        <div className="timeline-dot" />
                        <div className="timeline-year">{item.year}</div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MISSION */}
                <div className="tab-content" id="mission" style={{ display: active === 'mission' ? 'block' : 'none' }}>
                  <div className="section-label">Our Purpose</div>
                  <h2 className="section-title" style={{ marginBottom: '40px' }}>Mission &amp; <span className="text-gold">Vision</span></h2>
                  <div className="mv-grid">
                    <div className="mv-card reveal-left">
                      <div className="mv-icon"><i className="fa-solid fa-bullseye" style={{ color: 'var(--gold-dim)' }}></i></div>
                      <h3>Our Mission</h3>
                      <p>To empower volunteers to serve their communities, meet humanitarian needs, encourage peace, and promote international understanding through Lions clubs.</p>
                      <br /><p>The Lions Club of Gampaha Metro fulfils this mission by organizing meaningful service projects, fostering fellowship, and engaging with our local community.</p>
                    </div>
                    <div className="mv-card reveal-right">
                      <div className="mv-icon"><i className="fa-solid fa-star" style={{ color: 'var(--gold-dim)' }}></i></div>
                      <h3>Our Vision</h3>
                      <p>To be the global leader in community and humanitarian service — a vision that begins right here in Gampaha, Sri Lanka.</p>
                      <br /><p>We envision a thriving, compassionate community in Gampaha where every individual has access to healthcare, education, a clean environment, and opportunities for personal growth.</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--navy)', marginBottom: '24px' }}>Our Core Values</h3>
                    <div className="values-grid">
                      {[
                        { icon: <i className="fa-solid fa-heart"></i>, title: 'Compassion', desc: 'Serving with empathy and genuine care for all people in need.' },
                        { icon: <i className="fa-solid fa-scale-balanced"></i>, title: 'Integrity', desc: 'Acting with honesty, transparency, and ethical conduct at all times.' },
                        { icon: <i className="fa-solid fa-hands-holding-circle"></i>, title: 'Community', desc: 'Strengthening bonds and fostering a sense of belonging and unity.' },
                        { icon: <i className="fa-solid fa-leaf"></i>, title: 'Sustainability', desc: 'Building lasting positive change for future generations.' },
                        { icon: <i className="fa-solid fa-graduation-cap"></i>, title: 'Leadership', desc: 'Developing capable leaders at every level of our community.' },
                        { icon: <i className="fa-solid fa-globe"></i>, title: 'Global Citizenship', desc: 'Contributing to international understanding and global peace.' },
                      ].map((v) => (
                        <div key={v.title} className="value-item reveal"><div className="value-icon" style={{ color: 'var(--gold)' }}>{v.icon}</div><h4>{v.title}</h4><p>{v.desc}</p></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LIONS INTERNATIONAL */}
                <div className="tab-content" id="lions-int" style={{ display: active === 'lions-int' ? 'block' : 'none' }}>
                  <div className="section-label">Global Movement</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Lions <span className="text-gold">International</span></h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '18px' }}>
                        <strong>Lions Clubs International (LCI)</strong> is the world's largest service club organization, with more than <strong>1.4 million members</strong> in approximately <strong>48,000 clubs</strong> in more than <strong>200 countries</strong>.
                      </p>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '18px' }}>
                        Founded in <strong>1917 by Melvin Jones</strong> in Chicago, USA, Lions International was established on the principle that people could accomplish more through collective action.
                      </p>
                      <div style={{ background: 'var(--light-grey)', borderRadius: 'var(--radius-md)', padding: '24px', marginTop: '20px' }}>
                        <h4 style={{ color: 'var(--navy)', marginBottom: '14px', fontSize: '1rem' }}>Key Facts</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { icon: 'fa-paw', text: 'Founded: 1917, Chicago, USA' },
                            { icon: 'fa-users', text: 'Members: 1.4+ Million Worldwide' },
                            { icon: 'fa-building-columns', text: 'Clubs: ~48,000 Clubs' },
                            { icon: 'fa-earth-americas', text: 'Countries: 200+ Countries & Areas' },
                          ].map((f) => (
                            <li key={f.text} style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                              <i className={`fa-solid ${f.icon}`} style={{ color: 'var(--gold)', marginTop: '3px' }} />
                              <span dangerouslySetInnerHTML={{ __html: f.text.replace(/:.+/, '<strong style="color:var(--navy)">$&</strong>') }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div style={{ background: 'linear-gradient(135deg,var(--navy-dark),var(--navy))', borderRadius: 'var(--radius-lg)', padding: '36px', color: 'var(--white)', textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '14px', color: 'var(--gold)' }}><i className="fa-solid fa-paw"></i></div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '14px' }}>District 306 D4</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.7' }}>Lions District 306 D4 covers Sri Lanka and Maldives. The District Governor provides leadership and coordination for all Lions clubs within the district.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ETHICS */}
                <div className="tab-content" id="ethics" style={{ display: active === 'ethics' ? 'block' : 'none' }}>
                  <div className="section-label">Our Principles</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Lions Code <span className="text-gold">of Ethics</span></h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '36px', maxWidth: '700px' }}>
                    The Lions Code of Ethics is the foundational charter of values that guides every Lion in their personal conduct, service activities, and interactions with the public.
                  </p>
                  <ul className="ethics-list" style={{ listStyle: 'none', padding: 0 }}>
                    {[
                      'To show my faith in the worthiness of my vocation by industrious application to the end that I may merit a reputation for quality of service.',
                      'To seek success and to demand all fair remuneration or profit as my just due, but to accept no profit or success at the price of my own self-respect lost because of unfair advantage taken.',
                      'To hold friendship as an end and not a means. To hold that true friendship exists not on account of the service it renders, but that true friendship demands nothing but accepts service in the spirit in which it is given.',
                      'To be careful with my criticism and liberal with my praise; to build up and not destroy.',
                      'To be too big for worry, too noble for anger, too strong for fear, and too happy to permit the presence of trouble.',
                      'To give of my self, my talents, my time — generously to others, expecting nothing in return.',
                      'To always remember that whether I am at home or abroad, in word or deed, I represent the Lions Club of Gampaha Metro and Lions International with pride and integrity.',
                    ].map((text, i) => (
                      <li key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                        <span className="ethics-num" style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '1.4rem', fontFamily: 'var(--font-display)', lineHeight: '1' }}>{i + 1}.</span>
                        <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.98rem' }}>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GLOBAL CAUSES */}
                <div className="tab-content" id="global-causes" style={{ display: active === 'global-causes' ? 'block' : 'none' }}>
                  <div className="section-label">Global Impact</div>
                  <h2 className="section-title" style={{ marginBottom: '20px' }}>Lions Global <span className="text-gold">Causes</span></h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', maxWidth: '680px', marginBottom: '30px' }}>
                    Lions International focuses on key global causes where Lions can make the greatest impact on human suffering.
                  </p>
                  <div className="global-cause-row">
                    {[
                      { icon: <i className="fa-solid fa-eye"></i>, label: 'Vision' }, 
                      { icon: <i className="fa-solid fa-bowl-food"></i>, label: 'Hunger' }, 
                      { icon: <i className="fa-solid fa-leaf"></i>, label: 'Environment' }, 
                      { icon: <i className="fa-solid fa-ribbon"></i>, label: 'Childhood Cancer' },
                      { icon: <i className="fa-solid fa-syringe"></i>, label: 'Diabetes' }, 
                      { icon: <i className="fa-solid fa-brain"></i>, label: 'Mental Health' }, 
                      { icon: <i className="fa-solid fa-truck-medical"></i>, label: 'Disaster Relief' }, 
                      { icon: <i className="fa-solid fa-handshake"></i>, label: 'Humanitarian' },
                    ].map((gc) => (
                      <div key={gc.label} className="gc-item reveal">
                        <div className="gc-icon" style={{ color: 'var(--gold-dim)' }}>{gc.icon}</div>
                        <h4>{gc.label}</h4>
                      </div>
                    ))}
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
