import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import Tabs from '../components/Tabs'
import ScrollProgress from '../components/ScrollProgress'
import { useState, useEffect } from 'react'
import useCinematic from '../hooks/useCinematic'

const tabs = [
  { id: 'community', label: 'Overview' },
  { id: 'health', label: 'Health' },
  { id: 'environment', label: 'Environment' },
  { id: 'education', label: 'Education' },
  { id: 'youth', label: 'Youth' },
  { id: 'hunger', label: 'Hunger Relief' },
  { id: 'disaster', label: 'Disaster Relief' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'impact-stories', label: 'Impact Stories' },
]

function SigProject({ barColor, tag, icon, title, desc, stats, image }) {
  const defaultImages = {
    'fa-eye': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    'fa-syringe': 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop',
    'fa-stethoscope': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800&auto=format&fit=crop',
    'fa-child': 'https://images.unsplash.com/photo-1542880941-18eff38d9dc1?q=80&w=800&auto=format&fit=crop',
    'fa-globe': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    'fa-tree': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    'fa-broom': 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800&auto=format&fit=crop',
    'fa-book-open': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
    'fa-medal': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    'fa-graduation-cap': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
    'fa-paw': 'https://images.unsplash.com/photo-1521669246297-b02a28eaad92?q=80&w=800&auto=format&fit=crop',
    'fa-circle-exclamation': 'https://images.unsplash.com/photo-1517400325492-2cc3dfbe4ed3?q=80&w=800&auto=format&fit=crop',
    'fa-truck-medical': 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
    'fa-brain': 'https://images.unsplash.com/photo-1559757134-f8fc52c2bc6e?q=80&w=800&auto=format&fit=crop',
    'fa-heart': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop'
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1593113565694-c6a1384c67eb?q=80&w=800&auto=format&fit=crop';
  const imageUrl = image || defaultImages[icon] || fallbackImage;

  return (
    <div className="sig-project reveal">
      <div className="sig-image-container">
        <img src={imageUrl} alt={title} className="sig-image" />
        <div className="sig-image-overlay" />
        <div style={{ background: 'var(--navy-dark)', color: 'var(--gold)', position: 'absolute', top: '20px', left: '20px', padding: '6px 14px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 4px 15px rgba(4,13,26,0.3)', zIndex: 2 }}>
          {tag}
        </div>
      </div>
      <div className="sig-content">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.9)', padding: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src="/Lions Emblem.png" alt="Lion" style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
          </span>
          {title}
        </h3>
        <p>{desc}</p>
        <div className="sig-stats">
          {stats.map((s) => <div key={s.label} className="sig-stat"><strong>{s.val}</strong><span>{s.label}</span></div>)}
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  useCinematic()
  const [dbProjects, setDbProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => setDbProjects(data))
      .catch(e => console.error("Projects fetch error", e))
  }, [])
  return (
    <>
      <ScrollProgress />
      <Nav />
      <PageHero
        title="Service"
        titleHighlight="Mission"
        subtitle="Impactful humanitarian service across health, environment, and community empowerment since 1986."
        breadcrumb="Service Projects"
        bgImage="/images/services_banner_1773114656066.png"
      />

      <section className="section" style={{ paddingTop: '60px', paddingBottom: '120px', background: 'var(--off-white)' }}>
        <div className="container">
          <Tabs tabs={tabs}>
            {(active) => (
              <>
                {/* OVERVIEW */}
                <div id="community" style={{ display: active === 'community' ? 'block' : 'none' }}>
                  <div className="section-label">What We Do</div>
                  <h2 className="section-title" style={{ marginBottom: '20px' }}>Our Community <span className="text-gold">Work</span></h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', maxWidth: '700px', marginBottom: '40px' }}>
                    The Lions Club of Gampaha Metro carries out hundreds of service projects across multiple key areas, directly improving the lives of thousands of people in the Gampaha district and beyond.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '40px' }}>
                    {[
                      { color: 'var(--gold)', icon: 'fa-stethoscope', label: 'Health & Medical', desc: 'Free camps, vision care, diabetes screening', tab: 'health' },
                      { color: 'var(--gold)', icon: 'fa-leaf', label: 'Environment', desc: 'Tree monitoring, climate change adaptation', tab: 'environment' },
                      { color: '#7B2FBE', icon: 'fa-brain', label: 'Mental Health', desc: 'Sumithrayo partnership, awareness programs', tab: 'mental-health' },
                      { color: '#F39C12', icon: 'fa-bowl-food', label: 'Hunger Relief', desc: 'Meals served, food drives, nourishment', tab: 'hunger' },
                      { color: '#2980B9', icon: 'fa-graduation-cap', label: 'Youth Development', desc: 'PERFECT Prefect, Leo clubs, leadership', tab: 'youth' },
                      { color: '#C0392B', icon: 'fa-truck-medical', label: 'Disaster Relief', desc: 'LKR 1.6M+ funds utilized, rapid response', tab: 'disaster' },
                    ].map((card) => (
                      <div
                        key={card.label}
                        style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)', borderTop: `3px solid ${card.color}`, cursor: 'pointer', transition: 'var(--transition)' }}
                        onClick={() => document.querySelector(`[data-tab="${card.tab}"]`)?.click()}
                      >
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px', color: card.color }}><i className={`fa-solid ${card.icon}`} /></div>
                        <h4 style={{ color: 'var(--navy)', marginBottom: '6px' }}>{card.label}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  {dbProjects.length > 0 && (
                    <div style={{ marginTop: '80px' }}>
                      <div className="section-label" style={{ color: 'var(--gold)' }}>Latest Initiatives</div>
                      <h2 className="section-title" style={{ marginBottom: '40px' }}>Current <span className="text-gold">Service Projects</span></h2>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                        {dbProjects.map((p) => (
                          <SigProject 
                            key={p.id}
                            barColor="var(--gold)"
                            tag={p.category}
                            icon="fa-diagram-project"
                            title={p.title}
                            desc={p.description}
                            stats={[{ val: p.date, label: 'Target Date' }]}
                            image={p.image}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* HEALTH */}
                <div id="health" style={{ display: active === 'health' ? 'block' : 'none' }}>
                  <div className="section-label">Healthcare Initiatives</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Health &amp; Medical <span className="text-gold">Programs</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                     <SigProject barColor="linear-gradient(to bottom,#E74C3C,#C0392B)" tag="Vision Care" icon="fa-eye" title="Free Eye Screening Camps" desc="Annual and bi-annual free eye screening camps providing vision testing, prescription glasses distribution, and referrals for cataract surgery to underprivileged members of the Gampaha community." stats={[{ val: '163', label: 'Screenings Done' }, { val: '7', label: 'Cataract Referrals' }, { val: 'Ongoing', label: 'Program' }]} />
                     <SigProject barColor="linear-gradient(to bottom,#3498DB,#2980B9)" tag="Diabetes" icon="fa-syringe" title="Diabetes Awareness & Screening" desc="Free blood sugar screening camps, diabetes awareness workshops, and educational programs to combat the growing burden of diabetes in the community." stats={[{ val: '336', label: 'Screenings' }, { val: '47', label: 'Referrals Made' }, { val: '5+', label: 'Camps Held' }]} />
                     <SigProject barColor="linear-gradient(to bottom,var(--gold),var(--gold-dark))" tag="General Health" icon="fa-stethoscope" title="Community Health Fairs" desc="Multi-specialty free health check-up camps offering general medicine consultations, blood pressure monitoring, dental screening, and nutritional advice." stats={[{ val: '50+', label: 'Medical Camps' }, { val: '5K+', label: 'Patients Served' }]} />
                     <SigProject barColor="linear-gradient(to bottom,#F39C12,var(--gold-dark))" tag="Childhood Cancer" icon="fa-child" title="Childhood Cancer Support" desc="Fundraising drives, awareness campaigns, and family support for children battling cancer, aligned with Lions International's global Childhood Cancer cause." stats={[{ val: '4', label: 'Patients Served' }, { val: '4', label: 'Families Supported' }]} />
                  </div>
                </div>

                {/* ENVIRONMENT */}
                <div id="environment" style={{ display: active === 'environment' ? 'block' : 'none' }}>
                  <div className="section-label">Environmental Conservation</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Our <span className="text-gold">Environmental Projects</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <SigProject barColor="linear-gradient(to bottom,#1A8A4A,#116635)" tag="Environment" icon="fa-leaf" title="Climate Adaptation & Conservation" desc="Our environmental initiatives focus on tree planting, monitoring, and raising awareness about climate change adaptation across the Gampaha region." stats={[{ val: 'Ongoing', label: 'Tree Monitoring' }, { val: 'Climate', label: 'Adaptation Focus' }]} />
                    <SigProject barColor="linear-gradient(to bottom,var(--navy-light),var(--navy-mid))" tag="Digital Platform" icon="fa-globe" title="Gampabathuru.lk" desc="A landmark digital environmental platform dedicated to raising awareness about climate change, biodiversity conservation, and sustainable living in the Gampaha region." stats={[{ val: '5K+', label: 'Website Visitors' }, { val: '1', label: 'Unique Platform' }]} />
                    <SigProject barColor="linear-gradient(to bottom,#16A085,#0e7a63)" tag="Clean Environment" icon="fa-broom" title="Community Clean-Up Campaigns" desc="Regular clean-up drives targeting public spaces, waterways, drains, and beaches. These initiatives promote civic pride and community ownership of environmental hygiene." stats={[{ val: '30+', label: 'Clean-up Events' }, { val: '500+', label: 'Volunteers Engaged' }]} />
                  </div>
                </div>

                {/* EDUCATION */}
                <div id="education" style={{ display: active === 'education' ? 'block' : 'none' }}>
                  <div className="section-label">Academic Support</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Education <span className="text-gold">Support</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <SigProject barColor="linear-gradient(to bottom,#F39C12,var(--gold-dark))" tag="Exam Support" icon="fa-book-open" title="O/L Results Enhancement Program" desc="A comprehensive tutoring and support program for underprivileged students preparing for the GCE Ordinary Level (O/L) examination. Provides free tuition, study materials, motivational workshops, and mentoring." stats={[{ val: '200+', label: 'Students Supported' }, { val: 'Annual', label: 'Ongoing Program' }]} />
                    <SigProject barColor="linear-gradient(to bottom,#3498DB,#2980B9)" tag="Scholarships" icon="fa-medal" title="Educational Scholarships" desc="Annual scholarships and bursaries awarded to deserving students from low-income families in the Gampaha district, enabling them to pursue higher education and vocational training." stats={[{ val: '50+', label: 'Scholarships Awarded' }]} />
                  </div>
                </div>

                {/* YOUTH */}
                <div id="youth" style={{ display: active === 'youth' ? 'block' : 'none' }}>
                  <div className="section-label">Empowering the Next Generation</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Youth <span className="text-gold">Development</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <SigProject barColor="linear-gradient(to bottom,var(--navy),var(--navy-light))" tag="Leadership" icon="fa-graduation-cap" title="PERFECT Prefect Program" desc="Our flagship youth initiative empowering school prefects across Gampaha schools with structured leadership training and personal growth mentorship." stats={[{ val: '427', label: 'Prefects Trained' }, { val: '16', label: 'Courses Conducted' }, { val: 'Annual', label: 'Ongoing Program' }]} />
                    <SigProject barColor="linear-gradient(to bottom,#8E44AD,#6C3483)" tag="Leo Clubs" icon="fa-paw" title="Leo Club Development" desc="The Lions Club of Gampaha Metro sponsors and mentors vibrant Leo Clubs, providing guidance and mentorship to young leaders." stats={[{ val: '3', label: 'Active Clubs' }, { val: 'Multiple', label: 'Leadership Awards' }]} />
                  </div>
                </div>

                {/* HUNGER */}
                <div id="hunger" style={{ display: active === 'hunger' ? 'block' : 'none' }}>
                  <div className="section-label">Global Cause: Hunger</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Hunger Relief <span className="text-gold">Programs</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <SigProject barColor="linear-gradient(to bottom,#F39C12,#E67E22)" tag="Signature Program" icon="fa-bowl-food" title="Community Food Drives" desc="Regular food drives and meal distribution programs aimed at combating food insecurity and supporting vulnerable communities in Gampaha." stats={[{ val: '5686', label: 'Meals Served' }, { val: '80', label: 'Food Drives' }, { val: '80', label: 'Projects Completed' }]} />
                    <SigProject barColor="linear-gradient(to bottom,#D35400,#A04000)" tag="Direct Support" icon="fa-handshake-angle" title="Humanitarian Aid" desc="Providing targeted humanitarian support and essential supplies to individuals and families facing extreme hardship." stats={[{ val: '813', label: 'Beneficiaries' }, { val: '14', label: 'Humanitarian Projects' }]} />
                  </div>
                </div>

                {/* DISASTER RELIEF */}
                <div id="disaster" style={{ display: active === 'disaster' ? 'block' : 'none' }}>
                  <div className="section-label">Emergency Response</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Disaster <span className="text-gold">Relief</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <SigProject barColor="linear-gradient(to bottom,#E74C3C,#C0392B)" tag="Impact" icon="fa-truck-medical" title="Disaster Recovery & Support" desc="Rapid mobilization and significant resource allocation during natural disasters, helping communities rebuild and recover with resilience." stats={[{ val: '4231', label: 'Beneficiaries' }, { val: 'LKR 1.6M+', label: 'Funds Utilized' }, { val: '7', label: 'Core Projects' }]} />
                    <SigProject barColor="linear-gradient(to bottom,#E67E22,#D35400)" tag="BBBG" icon="fa-circle-exclamation" title="Building Back Better in Gampaha" desc="Our flagship disaster preparedness program focusing on community training and long-term recovery support." stats={[{ val: '24/7', label: 'Response Ready' }, { val: 'Ongoing', label: 'Mitigation' }]} />
                  </div>
                </div>

                {/* MENTAL HEALTH */}
                <div id="mental-health" style={{ display: active === 'mental-health' ? 'block' : 'none' }}>
                  <div className="section-label">Well-Being Initiatives</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Mental Health <span className="text-gold">&amp; Well-Being</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <SigProject barColor="linear-gradient(to bottom,#7B2FBE,#512DA8)" tag="Partner Organization" icon="fa-brain" title="Sri Lanka Sumithrayo — Gampaha Branch" desc="A cornerstone partnership supporting Sri Lanka's leading emotional support and mental health organization through financial contributions, volunteer support, and joint awareness campaigns addressing suicide prevention and emotional well-being." stats={[{ val: '500+', label: 'People Reached' }, { val: '20+', label: 'Programs Supported' }, { val: 'Annual', label: 'Partnership' }]} />
                    <SigProject barColor="linear-gradient(to bottom,#2980B9,#1A5A8A)" tag="Awareness" icon="fa-heart" title="Mental Health Awareness Campaigns" desc="Community-wide mental health awareness events, workshops and educational programs aligned with World Mental Health Day and Lions International's Mental Health & Well-Being global cause." stats={[{ val: '10+', label: 'Awareness Events' }, { val: 'Community', label: 'Wide Reach' }]} />
                  </div>
                </div>

                {/* IMPACT STORIES */}
                <div id="impact-stories" style={{ display: active === 'impact-stories' ? 'block' : 'none' }}>
                  <div className="section-label">Real Impact</div>
                  <h2 className="section-title" style={{ marginBottom: '30px' }}>Impact <span className="text-gold">Stories</span></h2>
                  <div className="impact-grid">
                    {[
                      { icon: 'fa-eye', title: 'Restoring Sight', desc: 'Our eye screening camp in 2023 identified 45 patients requiring surgery. Through our referral network, all received successful cataract operations.' },
                      { icon: 'fa-tree', title: 'Green Gampaha', desc: 'The Gampabathuru.lk platform and our tree planting drives together planted over 10,000 trees across Gampaha.' },
                      { icon: 'fa-graduation-cap', title: 'Student Success Stories', desc: 'Students supported by our O/L Results Enhancement Program showed measurable improvements in academic achievement.' },
                      { icon: 'fa-brain', title: 'Breaking the Stigma', desc: 'Our mental health awareness programs reached over 500 individuals, many of whom sought professional help for the first time.' },
                      { icon: 'fa-circle-exclamation', title: 'Disaster Recovery', desc: 'During the 2023 floods in Gampaha, LCGM mobilized within hours, distributing essential supplies to over 200 displaced families.' },
                      { icon: 'fa-paw', title: 'Youth Leaders Rising', desc: 'Over 300 school prefects trained through PERFECT Prefect Program, with alumni now serving as community leaders and Leo club officers.' },
                    ].map((story) => (
                      <div key={story.title} className="impact-story reveal">
                        <div className="is-photo"><i className={`fa-solid ${story.icon}`} /></div>
                        <h4>{story.title}</h4>
                        <p>{story.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Tabs>

          {/* NEWSLETTER SECTION (Always Visible) */}
          <div id="newsletter" style={{ marginTop: '100px', padding: '80px', background: 'var(--navy-mid)', borderRadius: '4px', border: '1px solid rgba(251, 191, 36, 0.15)', position: 'relative', overflow: 'hidden' }}>
            {/* Background Texture */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
            <div style={{ position: 'absolute', top: '-15%', right: '-15%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.1, zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <div className="section-label" style={{ color: 'var(--gold)' }}>Stay Informed</div>
                <h2 className="section-title" style={{ color: 'var(--white)', fontSize: '2.5rem', marginBottom: '24px' }}>
                  Our Monthly <span className="gold-italic">Newsletter</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '36px' }}>
                  The "Metro Voice" brings you the latest updates on our humanitarian projects, upcoming service goals, and member highlights from across the Gampaha Metro Lions community.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button className="btn-cin-primary" style={{ padding: '14px 28px' }}>
                    <i className="fa-solid fa-download" style={{ marginRight: '10px' }} />
                    Download March 2026 Edition
                  </button>
                  <button className="btn-cin-ghost" style={{ padding: '14px 28px' }}>
                    Archives 2025-26
                  </button>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '20px' }}>Subscribe to the Digital Edition</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Get the newsletter delivered directly to your inbox early each month.</p>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="fg" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>Your Email</label>
                    <input type="email" placeholder="name@email.com" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: '14px', borderRadius: '2px', color: 'white', width: '100%' }} />
                  </div>
                  <button type="submit" className="btn-cin-primary" style={{ width: '100%', border: 'none', padding: '14px', cursor: 'pointer' }}>
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
