require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'lions_metro_secret_key_123';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API ROUTES
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM members WHERE email = ?').get(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.get('/api/members/me', authenticateToken, (req, res) => {
  const user = db.prepare('SELECT id, name, role, email, since, district, club, status, duesStatus, attendance, serviceHours, impactPoints FROM members WHERE id = ?').get(req.user.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// ADMIN ROUTES
app.get('/api/admin/members', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  const members = db.prepare('SELECT id, name, role, email, status, duesStatus FROM members').all();
  res.json(members);
});

app.post('/api/admin/members', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  const { name, email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  try {
    db.prepare('INSERT INTO members (name, email, password, role) VALUES (?, ?, ?, ?)').run(name, email, hash, role || 'Member');
    res.status(201).json({ message: 'Member registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

app.get('/api/newsletters', (req, res) => {
  const letters = db.prepare('SELECT * FROM newsletters').all();
  res.json(letters);
});

// PROJECTS API
app.get('/api/projects', (req, res) => {
  const projs = db.prepare('SELECT * FROM projects').all();
  res.json(projs);
});

app.post('/api/admin/projects', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  const { title, description, category, date, image } = req.body;
  try {
    db.prepare('INSERT INTO projects (title, description, category, date, image) VALUES (?, ?, ?, ?, ?)').run(title, description, category, date, image);
    res.status(201).json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding project' });
  }
});

app.put('/api/admin/projects/:id', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  const { title, description, category, date, image } = req.body;
  try {
    db.prepare('UPDATE projects SET title = ?, description = ?, category = ?, date = ?, image = ? WHERE id = ?').run(title, description, category, date, image, req.params.id);
    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error updating project' });
  }
});

app.delete('/api/admin/projects/:id', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  try {
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting project' });
  }
});

// ANNOUNCEMENTS API
app.get('/api/announcements', (req, res) => {
  const anns = db.prepare('SELECT * FROM announcements ORDER BY id DESC').all();
  res.json(anns);
});

app.post('/api/admin/announcements', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  const { title, content } = req.body;
  try {
    db.prepare('INSERT INTO announcements (title, content, date) VALUES (?, ?, datetime("now"))').run(title, content);
    res.status(201).json({ message: 'Announcement sent' });
  } catch (err) {
    res.status(400).json({ error: 'Error sending announcement' });
  }
});

app.delete('/api/admin/announcements/:id', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  db.prepare('DELETE FROM announcements WHERE id = ?').run(req.params.id);
  res.json({ message: 'Announcement deleted' });
});

// EVENTS API
app.get('/api/events', (req, res) => {
  const evs = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
  res.json(evs);
});

app.post('/api/admin/events', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  const { title, date, location, description, image } = req.body;
  try {
    db.prepare('INSERT INTO events (title, date, location, description, image) VALUES (?, ?, ?, ?, ?)').run(title, date, location, description, image);
    res.status(201).json({ message: 'Event added' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding event' });
  }
});

app.delete('/api/admin/events/:id', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT role FROM members WHERE id = ?').get(req.user.id);
  if (admin.role !== 'Admin' && admin.role !== 'President') return res.status(403).json({ error: 'Unauthorized' });

  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  res.json({ message: 'Event deleted' });
});

// SERVE FRONTEND (Production)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing (CATCH ALL)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
