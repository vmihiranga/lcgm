import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import useCinematic from '../hooks/useCinematic'

export default function Login() {
  useCinematic()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await resp.json()

      if (resp.ok) {
        localStorage.setItem('lion_token', data.token)
        localStorage.setItem('lion_role', data.user.role)
        
        if (data.user.role === 'Admin' || data.user.role === 'President') {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Connection error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <section className="login-frame" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--navy-dark)'
      }}>
        {/* Background Decoration */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(31, 74, 128, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="login-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 500px)',
            justifyContent: 'center'
          }}>
            <div className="cin-form sr" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(251, 191, 36, 0.1)',
              padding: '50px',
              borderRadius: '4px'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div className="cin-section-label" style={{ marginBottom: '16px' }}>
                  Member Access
                </div>
                <h2 className="cin-heading" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
                  Welcome <span className="gold-italic">Back</span>
                </h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  Enter your credentials to access the member portal.
                </p>
              </div>

              {error && (
                <div style={{ 
                  background: 'rgba(192, 57, 43, 0.1)', 
                  color: '#e74c3c', 
                  padding: '12px', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem', 
                  marginBottom: '20px', 
                  textAlign: 'center',
                  border: '1px solid rgba(192, 57, 43, 0.2)' 
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="fg">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@lionsgampahametro.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  />
                </div>
                <div className="fg">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                    <a href="#" style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Forgot?</a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  />
                </div>

                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="remember" style={{ width: 'auto', accentColor: 'var(--gold)' }} />
                  <label htmlFor="remember" style={{ fontSize: '0.75rem', color: 'var(--text-body)', margin: 0, textTransform: 'none', letterSpacing: 'normal' }}>Keep me logged in</label>
                </div>

                <button
                  type="submit"
                  className="btn-cin-primary"
                  disabled={loading}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    border: 'none',
                    padding: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
              </form>

              <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                New to the portal? <Link to="/#contact" style={{ color: 'var(--gold)', fontWeight: '600' }}>Contact Secretary</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
