import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import Tabs from '../components/Tabs'
import ScrollProgress from '../components/ScrollProgress'
import useCinematic from '../hooks/useCinematic'
import { motion } from 'motion/react'

const tabs = [
  { id: 'metro', label: 'Leo Club Gampaha Metro' },
  { id: 'kelaniya', label: 'Leo Club of Kelaniya Uni' },
  { id: 'juniors', label: 'Leo Club Metro Juniors' },
]

const officers = [
  { pos: 'President', name: 'Leo [President Name]' },
  { pos: 'Vice President', name: 'Leo [VP Name]' },
  { pos: 'Secretary', name: 'Leo [Secretary Name]' },
  { pos: 'Treasurer', name: 'Leo [Treasurer Name]' },
  { pos: 'Lion Advisor', name: 'Lion [Advisor Name]' },
]

function ClubSection({ active, id, bgGradient, clubName, intro1, intro2, projects, gallery }) {
  return (
    <div id={id} style={{ display: active === id ? 'block' : 'none' }}>
      <div className="club-header">
        <div className="club-emblem" style={{ background: bgGradient }}>
          <img src="/images/leo_emblem.png" alt="Leo Logo" style={{ height: '50px' }} />
        </div>
        <div>
          <div className="section-label">Sponsored by Lions Club of Gampaha Metro</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)' }}>{clubName}</h2>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '50px', alignItems: 'start' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '16px' }}>Club Introduction</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.75', marginBottom: '16px' }}>{intro1}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.75', marginBottom: '24px' }}>{intro2}</p>
          <h4 style={{ color: 'var(--navy)', marginBottom: '14px', fontSize: '0.92rem' }}>Club Officers 2025–2026</h4>
          <div className="officer-row">
            {officers.map((o) => (
              <div key={o.pos} className="officer">
                <div className="officer-pos">{o.pos}</div>
                <div className="officer-name">{o.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ color: 'var(--navy)', marginBottom: '16px', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Signature Projects</h4>
          {projects.map((p, i) => (
            <motion.div 
              key={p.title} 
              className="project-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </motion.div>
          ))}
          <h4 style={{ color: 'var(--navy)', margin: '30px 0 16px', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Photo Gallery</h4>
          <div className="gallery-placeholder">
            {gallery.map((g, i) => (
              <motion.div 
                key={i} 
                className="gallery-item" 
                style={{ background: g.bg }}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                {g.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Leo() {
  useCinematic()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <PageHero
        title="Youth"
        titleHighlight="Leaders"
        subtitle="Leadership, Experience, and Opportunity — Empowering the next generation through three sponsored Leo clubs."
        breadcrumb="Leo Clubs"
        bgImage="/images/leo_clubs_banner_1773114674063.png"
      />

      <section className="section" style={{ paddingTop: '80px', paddingBottom: '120px', background: 'var(--off-white)' }}>
        <div className="container">
          {/* Overview Header */}
          <div className="leo-page-header">
            <div>
              <div className="section-label">Youth Leadership</div>
              <h2 className="section-title">Nurturing <span className="text-gold">Future Leaders</span></h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '20px' }}>
                Leo clubs are Lions-affiliated youth service organizations for young people aged 12 to 30. The Lions Club of Gampaha Metro proudly sponsors and mentors three Leo clubs.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75' }}>
                Through Leo clubs, young people develop leadership skills, build character, and make a tangible difference in their communities. They are the next generation of Lions.
              </p>
            </div>
            <div className="leo-overview-cards">
              {[
                { tab: 'metro', bg: 'linear-gradient(135deg,var(--gold-dark),var(--gold))', icon: 'fa-paw', label: 'Leo Club of Gampaha Metro', sub: 'The flagship Leo club sponsored by LCGM' },
                { tab: 'kelaniya', bg: 'linear-gradient(135deg,var(--navy),var(--navy-light))', icon: 'fa-graduation-cap', label: 'Leo Club of Uni. of Kelaniya', sub: 'Academic excellence meets service' },
                { tab: 'juniors', bg: 'linear-gradient(135deg,#0284C7,#0369A1)', icon: 'fa-star', label: 'Leo Club of Metro Juniors', sub: 'Young school leaders in service' },
              ].map((card, i) => (
                <motion.div 
                  key={card.tab} 
                  className="leo-ov-card" 
                  onClick={() => document.querySelector(`[data-tab="${card.tab}"]`)?.click()} 
                  style={{ cursor: 'pointer' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, type: 'spring' }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(4,13,26,0.15)' }}
                >
                  <div className="leo-ov-top" style={{ background: card.bg }}>
                    <img src="/images/leo_emblem.png" alt="Leo Logo" style={{ height: '70px', filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(4,13,26,0.3))' }} />
                  </div>
                  <div className="leo-ov-body">
                    <h4>{card.label}</h4>
                    <p>{card.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs tabs={tabs}>
            {(active) => (
              <>
                <ClubSection
                  active={active} id="metro"
                  bgGradient="linear-gradient(135deg,var(--gold-dark),var(--gold))"
                  icon="fa-paw"
                  clubName={<>Leo Club of <span className="text-gold">Gampaha Metro</span></>}
                  intro1="The Leo Club of Gampaha Metro is the flagship youth club directly sponsored by the Lions Club of Gampaha Metro. It brings together young professionals and university students committed to service, leadership, and fellowship."
                  intro2="Members are mentored by experienced Lions and participate in both club-specific and joint service projects across the Gampaha district."
                  projects={[
                    { title: <><i className="fa-solid fa-book-open" style={{ marginRight: '8px', color: 'var(--gold)' }} /> Education Support Drive</>, desc: 'Partnering with schools to provide stationery, books, and mentorship to underprivileged students.' },
                    { title: <><i className="fa-solid fa-stethoscope" style={{ marginRight: '8px', color: 'var(--gold)' }} /> Health Camp Support</>, desc: 'Volunteering at health camps organized by the parent Lions club, assisting medical teams and logistics.' },
                    { title: <><i className="fa-solid fa-leaf" style={{ marginRight: '8px', color: 'var(--gold)' }} /> Green Gampaha</>, desc: 'Joint tree planting and clean-up drives with LCGM and the Gampabathuru.lk environmental platform.' },
                    { title: <><i className="fa-solid fa-heart" style={{ marginRight: '8px', color: 'var(--gold)' }} /> Mental Health Awareness</>, desc: 'Youth-focused mental health awareness campaigns in schools and universities.' },
                  ]}
                  gallery={[
                    { bg: 'linear-gradient(135deg,var(--navy),var(--navy-light))', icon: <i className="fa-solid fa-camera" /> },
                    { bg: 'linear-gradient(135deg,var(--gold-dark),var(--gold))', icon: <i className="fa-solid fa-cake-candles" /> },
                    { bg: 'linear-gradient(135deg,#0284C7,#0369A1)', icon: <i className="fa-solid fa-tree" /> },
                    { bg: 'linear-gradient(135deg,#7B2FBE,#512DA8)', icon: <i className="fa-solid fa-handshake" /> },
                    { bg: 'linear-gradient(135deg,#C0392B,#922B21)', icon: <i className="fa-solid fa-heart" /> },
                    { bg: 'linear-gradient(135deg,#2980B9,#1A5A8A)', icon: <i className="fa-solid fa-book" /> },
                  ]}
                />
                <ClubSection
                  active={active} id="kelaniya"
                  bgGradient="linear-gradient(135deg,var(--navy),var(--navy-light))"
                  icon="fa-graduation-cap"
                  clubName={<>Leo Club of <span className="text-gold">University of Kelaniya</span></>}
                  intro1="The Leo Club of University of Kelaniya combines academic excellence with community service. Composed of undergraduate students from the University of Kelaniya, this club bridges the gap between university life and community contribution."
                  intro2="Under the guidance of the Lions Club of Gampaha Metro, Kelaniya Leo members apply their academic knowledge in service projects that benefit both the university community and the broader Gampaha region."
                  projects={[
                    { title: '🎓 Academic Mentoring', desc: 'Senior university students mentoring A/L school students, helping with study skills, career guidance, and university preparation.' },
                    { title: '🌱 Environmental Research & Action', desc: 'Combining academic research with hands-on environmental conservation activities around the Kelaniya campus and Gampaha district.' },
                    { title: '🧠 Student Well-Being Campaign', desc: 'On-campus and community mental health de-stigmatization programs and awareness campaigns targeting student populations.' },
                    { title: '🤝 Community Outreach', desc: 'Reaching underserved communities near the university with educational resources, health awareness, and social support.' },
                  ]}
                  gallery={[
                    { bg: 'linear-gradient(135deg,var(--navy),var(--navy-light))', icon: '📸' },
                    { bg: 'linear-gradient(135deg,#7B2FBE,#512DA8)', icon: '🎓' },
                    { bg: 'linear-gradient(135deg,var(--gold-dark),var(--gold))', icon: '🌟' },
                    { bg: 'linear-gradient(135deg,#0284C7,#0369A1)', icon: '🌱' },
                    { bg: 'linear-gradient(135deg,#2980B9,#1A5A8A)', icon: '📖' },
                    { bg: 'linear-gradient(135deg,#C0392B,#922B21)', icon: '🤝' },
                  ]}
                />
                <ClubSection
                  active={active} id="juniors"
                  bgGradient="linear-gradient(135deg,#0284C7,#0369A1)"
                  icon="fa-star"
                  clubName={<>Leo Club of <span className="text-gold">Gampaha Metro Juniors</span></>}
                  intro1="The Leo Club of Gampaha Metro Juniors cultivates leadership among school students, providing them with age-appropriate service opportunities and structured mentorship."
                  intro2="Through fun yet meaningful activities, Junior Leos develop values of compassion, teamwork, and civic responsibility — building the foundation for lifelong service."
                  projects={[
                    { title: '🌱 Junior Green Warriors', desc: 'School-based environmental projects including clean-up drives, recycling awareness, and mini tree planting campaigns.' },
                    { title: '📚 Buddy Reading Program', desc: 'Older students mentoring younger peers in reading, building literacy skills and nurturing the spirit of generosity.' },
                    { title: '🎗️ Awareness Walks', desc: 'School-level awareness walks and campaigns for causes including anti-bullying, mental health, and environmental protection.' },
                    { title: '🏆 Leadership Workshops', desc: 'Age-appropriate leadership development workshops building teamwork, communication, and community values.' },
                  ]}
                  gallery={[
                    { bg: 'linear-gradient(135deg,#0284C7,#0369A1)', icon: '📸' },
                    { bg: 'linear-gradient(135deg,var(--gold-dark),var(--gold))', icon: '🌟' },
                    { bg: 'linear-gradient(135deg,var(--navy),var(--navy-light))', icon: '🎒' },
                    { bg: 'linear-gradient(135deg,#E74C3C,#C0392B)', icon: '❤️' },
                    { bg: 'linear-gradient(135deg,#F39C12,var(--gold-dark))', icon: '📚' },
                    { bg: 'linear-gradient(135deg,#2980B9,#1A5A8A)', icon: '🤝' },
                  ]}
                />
              </>
            )}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--navy-dark)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label light">Get Involved</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--white)', marginBottom: '16px' }}>
            Interested in <span className="text-gold">Joining a Leo Club?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.75' }}>
            If you are aged 12 to 30 and want to make a difference in your community while developing your leadership skills, the Leo clubs of Lions Club of Gampaha Metro are the perfect platform for you.
          </p>
          <Link to="/#contact" className="btn btn-primary">Express Your Interest →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
