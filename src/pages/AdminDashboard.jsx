import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import useCinematic from '../hooks/useCinematic'

export default function AdminDashboard() {
  useCinematic()
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [projects, setProjects] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [events, setEvents] = useState([])
  const [activeTab, setActiveTab] = useState('members') 
  const [stats, setStats] = useState({ totalMembers: 0, activeMembers: 0, activeProjects: 0 })
  const [loading, setLoading] = useState(true)
  
  // Modals
  const [showMemberForm, setShowMemberForm] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showAnnForm, setShowAnnForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  
  // Form States
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Member', password: '' })
  const [projectForm, setProjectForm] = useState({ title: '', description: '', category: 'Vision Health', date: '', image: '' })
  const [annForm, setAnnForm] = useState({ title: '', content: '' })
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '', image: '' })

  const categories = ['Vision Health', 'Environment', 'Youth Empowerment', 'Elderly Care', 'Health Camp', 'Education']

  useEffect(() => {
    const token = localStorage.getItem('lion_token')
    if (!token) return navigate('/login')

    const fetchData = async () => {
      try {
        const [mResp, pResp, aResp, eResp] = await Promise.all([
          fetch('/api/admin/members', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/projects'),
          fetch('/api/announcements'),
          fetch('/api/events')
        ])
        
        if (mResp.ok && pResp.ok) {
          const mData = await mResp.json()
          const pData = await pResp.json()
          const aData = aResp.ok ? await aResp.json() : []
          const eData = eResp.ok ? await eResp.json() : []
          
          setMembers(mData)
          setProjects(pData)
          setAnnouncements(aData)
          setEvents(eData)
          
          setStats({ 
            totalMembers: mData.length, 
            activeMembers: mData.filter(m => m.status === 'Active').length,
            activeProjects: pData.length 
          })
        } else {
          navigate('/dashboard')
        }
      } catch (err) {
        console.error("Admin data fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('lion_token')
    localStorage.removeItem('lion_role')
    navigate('/login')
  }

  const handleMemberSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('lion_token')
    try {
      const resp = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newMember)
      })
      if (resp.ok) {
        alert("Member registered successfully!")
        window.location.reload()
      } else {
        const d = await resp.json()
        alert(d.error || "Failed to register")
      }
    } catch (err) { alert("Error connecting to server") }
    finally { setLoading(false) }
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('lion_token')
    const method = editingProject ? 'PUT' : 'POST'
    const url = editingProject ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects'
    
    try {
      const resp = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(projectForm)
      })
      if (resp.ok) {
        alert(editingProject ? "Project updated successfully!" : "Project added successfully!")
        window.location.reload()
      } else { alert("Failed to save project") }
    } catch (err) { alert("Error connecting to server") }
    finally { setLoading(false) }
  }

  const openEditProject = (p) => {
    setEditingProject(p)
    setProjectForm({ title: p.title, description: p.description, category: p.category, date: p.date, image: p.image || '' })
    setShowProjectForm(true)
  }

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    const token = localStorage.getItem('lion_token')
    try {
      const resp = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (resp.ok) {
        setProjects(projects.filter(p => p.id !== id))
        setStats(prev => ({ ...prev, activeProjects: prev.activeProjects - 1 }))
      }
    } catch (err) { alert("Delete failed") }
  }

  const handleAnnSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('lion_token')
    try {
      const resp = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(annForm)
      })
      if (resp.ok) {
        alert("Announcement sent!")
        window.location.reload()
      }
    } catch (err) { alert("Failed to send") }
  }

  const handleEventSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('lion_token')
    try {
      const resp = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(eventForm)
      })
      if (resp.ok) {
        alert("Event added!")
        window.location.reload()
      }
    } catch (err) { alert("Failed to add event") }
  }

  const handleDeleteAnn = async (id) => {
    if (!confirm("Delete announcement?")) return
    const token = localStorage.getItem('lion_token')
    try {
      await fetch(`/api/admin/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setAnnouncements(announcements.filter(a => a.id !== id))
    } catch (err) { alert("Failed") }
  }

  const handleDeleteEvent = async (id) => {
    if (!confirm("Delete event?")) return
    const token = localStorage.getItem('lion_token')
    try {
      await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setEvents(events.filter(e => e.id !== id))
    } catch (err) { alert("Failed") }
  }

  if (loading) return <div style={{ background: 'var(--navy-dark)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>Loading Management Console...</div>

  return (
    <>
      <Nav />
      <div style={{ background: 'var(--navy-dark)', minHeight: '100vh', padding: '120px 0 80px' }}>
        <div className="container">
          
          <div style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div className="cin-section-label" style={{ marginBottom: '14px' }}>Admin Panel</div>
              <h1 className="cin-heading" style={{ fontSize: '3rem', marginBottom: '8px' }}>
                Management <span className="gold-italic">Console</span>
              </h1>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Governance, Membership & Project Oversight</p>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                className="btn-cin-primary" 
                onClick={() => {
                  if (activeTab === 'members') setShowMemberForm(true);
                  else if (activeTab === 'projects') { setEditingProject(null); setProjectForm({title:'', description:'', category:'Vision Health', date:'', image:''}); setShowProjectForm(true); }
                  else if (activeTab === 'announcements') setShowAnnForm(true);
                  else if (activeTab === 'events') setShowEventForm(true);
                }}
              >
                {activeTab === 'members' ? 'Register Member' : activeTab === 'projects' ? 'Add Project' : activeTab === 'announcements' ? 'Post Announcement' : 'Create Event'}
              </button>
              <button className="btn-cin-primary" onClick={handleLogout} style={{ border: '1px solid var(--gold)', background: 'transparent', color: 'var(--gold)' }}>Log Out</button>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {[
              { label: 'Total Members', val: stats.totalMembers, icon: 'fa-users' },
              { label: 'Active Projects', val: stats.activeProjects, icon: 'fa-diagram-project' },
              { label: 'Service Hours', val: '1,240', icon: 'fa-clock' },
              { label: 'Impact Score', val: '4.8/5', icon: 'fa-star' }
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <div style={{ color: 'var(--gold)', fontSize: '1.2rem', marginBottom: '10px' }}><i className={`fa-solid ${s.icon}`} /></div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--white)', marginBottom: '4px' }}>{s.val}</div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '40px', overflowX: 'auto' }}>
            {['members', 'projects', 'announcements', 'events'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ paddingBottom: '15px', borderBottom: activeTab === tab ? '2px solid var(--gold)' : 'none', color: activeTab === tab ? 'var(--gold)' : 'var(--text-dim)', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1rem', transition: '0.3s', textTransform: 'capitalize', whiteSpace: 'nowrap' }}
              >
                {tab === 'members' ? 'Membership' : tab}
              </button>
            ))}
          </div>

          {/* Conditional Rendering */}
          {activeTab === 'members' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251, 191, 36, 0.1)', padding: '40px', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '30px' }}>Member <span className="gold-italic">Directory</span></h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <th style={{ padding: '16px 10px' }}>Name</th>
                    <th style={{ padding: '16px 10px' }}>Role</th>
                    <th style={{ padding: '16px 10px' }}>Status</th>
                    <th style={{ padding: '16px 10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-body)', fontSize: '0.9rem' }}>
                  {members.map((m, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '16px 10px' }}><strong>{m.name}</strong><br/><span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{m.email}</span></td>
                      <td style={{ padding: '16px 10px' }}>{m.role}</td>
                      <td style={{ padding: '16px 10px' }}><span style={{ color: '#34D399', fontSize: '0.8rem', fontWeight: 'bold' }}>{m.status}</span></td>
                      <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', marginRight: '15px' }}><i className="fa-solid fa-edit" /></button>
                        <button style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}><i className="fa-solid fa-trash-can" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'projects' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251, 191, 36, 0.1)', padding: '40px', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '30px' }}>Ongoing <span className="gold-italic">Initiatives</span></h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {projects.map((p, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px' }}>
                      <button onClick={() => openEditProject(p)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}><i className="fa-solid fa-edit" /></button>
                      <button onClick={() => handleDeleteProject(p.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}><i className="fa-solid fa-trash-can" /></button>
                    </div>
                    {p.image && <img src={p.image} alt="" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '2px', marginBottom: '15px' }} />}
                    <div style={{ color: 'var(--gold)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>{p.category}</div>
                    <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>{p.title}</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.6' }}>{p.description}</p>
                    <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', color: 'var(--gold)', display: 'flex', justifyContent: 'space-between' }}>
                       <span>Target Date</span>
                       <span>{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251, 191, 36, 0.1)', padding: '40px', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '30px' }}>Broadcasted <span className="gold-italic">Updates</span></h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {announcements.map((a) => (
                  <div key={a.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: 'var(--gold)', marginBottom: '5px' }}>{a.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>{a.content}</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{new Date(a.date).toLocaleDateString()}</span>
                    </div>
                    <button onClick={() => handleDeleteAnn(a.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}><i className="fa-solid fa-trash-can" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251, 191, 36, 0.1)', padding: '40px', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '30px' }}>Club <span className="gold-italic">Events</span></h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {events.map((e) => (
                  <div key={e.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 'bold' }}>{e.date}</span>
                      <button onClick={() => handleDeleteEvent(e.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}><i className="fa-solid fa-trash-can" /></button>
                    </div>
                    <h4 style={{ color: 'var(--white)', marginBottom: '10px' }}>{e.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '10px' }}>{e.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Member Modal */}
      {showMemberForm && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4, 13, 26, 0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'var(--navy-mid)', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '4px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
             <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1.5rem', marginBottom: '24px' }}>Register <span className="gold-italic">Member</span></h3>
             <form onSubmit={handleMemberSubmit}>
               <div className="fg"><label>Full Name</label><input type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required /></div>
               <div className="fg"><label>Email Address</label><input type="email" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required /></div>
               <div className="fg"><label>Initial Password</label><input type="password" value={newMember.password} onChange={e => setNewMember({...newMember, password: e.target.value})} required /></div>
               <div className="fg">
                 <label>Role</label>
                 <select value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px', border: '1px solid var(--gold-dim)' }}>
                    <option value="Member">Member</option><option value="Board Member">Board Member</option><option value="President">President</option><option value="Admin">Admin</option>
                 </select>
               </div>
               <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                  <button type="submit" className="btn-cin-primary" style={{ flex: 1 }}>Register</button>
                  <button type="button" className="btn-cin-ghost" onClick={() => setShowMemberForm(false)} style={{ flex: 1 }}>Cancel</button>
               </div>
             </form>
          </div>
        </div>
      )}

       {/* Project Modal */}
       {showProjectForm && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4, 13, 26, 0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'var(--navy-mid)', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '4px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
             <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1.5rem', marginBottom: '24px' }}>{editingProject ? 'Edit' : 'New'} <span className="gold-italic">Project</span></h3>
             <form onSubmit={handleProjectSubmit}>
               <div className="fg"><label>Project Title</label><input type="text" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} placeholder="e.g. Tree Planting" required /></div>
               <div className="fg"><label>Description</label><textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} placeholder="Tell us about the impact..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px', border: '1px solid var(--gold-dim)', minHeight: '100px', borderRadius: '3px' }} required /></div>
               <div className="fg">
                 <label>Category</label>
                 <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px', border: '1px solid var(--gold-dim)', borderRadius: '3px' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>
               <div className="fg"><label>Target Date</label><input type="text" value={projectForm.date} onChange={e => setProjectForm({...projectForm, date: e.target.value})} placeholder="July 2026" required /></div>
               <div className="fg"><label>Image URL (Optional)</label><input type="text" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} placeholder="https://unsplash.com/..." /></div>
               <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                  <button type="submit" className="btn-cin-primary" style={{ flex: 1 }}>{editingProject ? 'Save Changes' : 'Add Project'}</button>
                  <button type="button" className="btn-cin-ghost" onClick={() => (setShowProjectForm(false), setEditingProject(null))} style={{ flex: 1 }}>Cancel</button>
               </div>
             </form>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnForm && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4, 13, 26, 0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'var(--navy-mid)', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '4px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
             <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1.5rem', marginBottom: '24px' }}>Send <span className="gold-italic">Announcement</span></h3>
             <form onSubmit={handleAnnSubmit}>
               <div className="fg"><label>Subject</label><input type="text" value={annForm.title} onChange={e => setAnnForm({...annForm, title: e.target.value})} required /></div>
               <div className="fg"><label>Message Content</label><textarea value={annForm.content} onChange={e => setAnnForm({...annForm, content: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px', border: '1px solid var(--gold-dim)', minHeight: '120px', borderRadius: '3px' }} required /></div>
               <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                  <button type="submit" className="btn-cin-primary" style={{ flex: 1 }}>Broadcast Now</button>
                  <button type="button" className="btn-cin-ghost" onClick={() => setShowAnnForm(false)} style={{ flex: 1 }}>Cancel</button>
               </div>
             </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventForm && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4, 13, 26, 0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'var(--navy-mid)', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '4px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
             <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1.5rem', marginBottom: '24px' }}>Schedule <span className="gold-italic">Event</span></h3>
             <form onSubmit={handleEventSubmit}>
               <div className="fg"><label>Event Title</label><input type="text" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} required /></div>
               <div className="fg"><label>Date & Time</label><input type="text" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} placeholder="Oct 12, 10:00 AM" required /></div>
               <div className="fg"><label>Location</label><input type="text" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} required /></div>
               <div className="fg"><label>Description</label><textarea value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px', border: '1px solid var(--gold-dim)', minHeight: '80px', borderRadius: '3px' }} /></div>
               <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                  <button type="submit" className="btn-cin-primary" style={{ flex: 1 }}>Add Event</button>
                  <button type="button" className="btn-cin-ghost" onClick={() => setShowEventForm(false)} style={{ flex: 1 }}>Cancel</button>
               </div>
             </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}
