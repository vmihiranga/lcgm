import { Link } from 'react-router-dom'

export default function PageHero({ title, titleHighlight, subtitle, breadcrumb, bgImage = '/images/hero_banner.png' }) {
  return (
    <section className="cin-page-hero">
      <div className="cin-page-hero-bg" data-parallax="0.2">
        <img src={bgImage} alt={`${breadcrumb} Background`} />
      </div>
      <div className="cin-page-hero-vignette" />
      <div className="container">
        <div className="breadcrumb" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '15px', fontSize: '0.8rem' }}>
          <Link to="/">Home</Link> › <span>{breadcrumb}</span>
        </div>
        <h1 className="cin-page-title">
          {title} {titleHighlight && <span style={{ color: 'var(--gold)' }}>{titleHighlight}</span>}
        </h1>
        <p className="cin-page-subtitle">{subtitle}</p>
      </div>
    </section>
  )
}
