require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'lions_metro.db'));

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    since TEXT,
    district TEXT DEFAULT 'Lions District 306 D4',
    club TEXT DEFAULT 'Lions Club of Gampaha Metro',
    status TEXT DEFAULT 'Active',
    duesStatus TEXT DEFAULT 'Paid',
    attendance TEXT DEFAULT '100%',
    serviceHours INTEGER DEFAULT 0,
    impactPoints INTEGER DEFAULT 0,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS newsletters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    downloadUrl TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    date TEXT,
    image TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT,
    type TEXT DEFAULT 'Club'
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT,
    location TEXT,
    image TEXT
  )
`);

// Insert default admin if not exists
const adminEmail = process.env.ADMIN_EMAIL || 'admin@lions.org';
const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

const adminRow = db.prepare('SELECT * FROM members WHERE email = ?').get(adminEmail);
if (!adminRow) {
  const adminHash = bcrypt.hashSync(adminPass, 10);
  db.prepare(`
    INSERT INTO members (name, role, email, password, status)
    VALUES (?, ?, ?, ?, ?)
  `).run('Super Admin', 'Admin', adminEmail, adminHash, 'Active');
}

// Insert default member if not exists
const row = db.prepare('SELECT * FROM members WHERE email = ?').get('mihiranga@lions.org');
if (!row) {
  const hash = bcrypt.hashSync('lion123', 10);
  db.prepare(`
    INSERT INTO members (name, role, email, password, since, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('Lion Mihiranga', 'Member', 'mihiranga@lions.org', hash, 'Charter Member since 2021', 'Active');
}

// Update existing member to admin for testing convenience
db.prepare('UPDATE members SET role = ? WHERE email = ?').run('Admin', 'mihiranga@lions.org');

// Insert default newsletters if empty
const count = db.prepare('SELECT count(*) as count FROM newsletters').get().count;
if (count === 0) {
  const insertNews = db.prepare('INSERT INTO newsletters (title, date, downloadUrl) VALUES (?, ?, ?)');
  insertNews.run('Metro Voice - March 2026', 'March 2026', '#');
  insertNews.run('Metro Voice - February 2026', 'February 2026', '#');
}

// Seed Projects
const pCount = db.prepare('SELECT count(*) as count FROM projects').get().count;
if (!pCount) {
  const ins = db.prepare('INSERT INTO projects (title, description, category, date) VALUES (?, ?, ?, ?)');
  ins.run('Annual Sight Conservation Camp', 'Comprehensive vision testing and free eyeglasses distribution for underserved communities in Gampaha District.', 'Vision Health', 'April 15, 2026');
  ins.run('Gampaha Reforestation Initiative', 'Partnering with local schools to plant 1,000 endemic trees along the Gampaha urban corridor.', 'Environment', 'May 22, 2026');
  ins.run('Scholarship Program 2026', 'Providing financial support and mentorship to high-achieving students from low-income families.', 'Youth Empowerment', 'June 10, 2026');
}

module.exports = db;
