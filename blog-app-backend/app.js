const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { generateAccessToken } = require('./src/utils');

require('dotenv').config();

const app = express();
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

function readDb() {
  const file = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(file);
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/blogs', authenticateToken, (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.body) {
      return res.status(400).json({ message: 'title and body are required' });
    }

    const db = readDb();
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newBlog = {
      id: db.blogs.length + 1,
      title: body.title,
      summary: body.summary || '',
      author: body.author || 'Anonymous',
      created_at: body.created_at || new Date().toISOString().split('T')[0],
      featured: body.featured === 'true',
      body: body.body,
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
      slug,
      cover_url: body.cover_url || '',
    };

    db.blogs.push(newBlog);
    writeDb(db);

    return res.status(201).json({ message: 'Blog added successfully', result: newBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get('/blogs', (req, res) => {
  try {
    const db = readDb();
    return res.status(200).json({ message: db.blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get('/blogs/:blogSlug', (req, res) => {
  const { blogSlug } = req.params;
  const db = readDb();
  const matchedBlog = db.blogs.find((blogx) => blogx.slug === blogSlug);

  if (!matchedBlog) return res.status(404).json({ message: "Blog Doesn't exist!!" });
  return res.status(200).json({ result: matchedBlog });
});

app.delete('/blog/:blogId', (req, res) => {
  const { blogId } = req.params;
  const db = readDb();
  db.blogs = db.blogs.filter((blog) => String(blog.id) !== String(blogId));
  writeDb(db);
  return res.status(200).json({ message: 'Blog deleted successfully' });
});

app.put('/blogs/:blogId', (req, res) => {
  const { blogId } = req.params;
  const db = readDb();
  const idx = db.blogs.findIndex((blog) => String(blog.id) === String(blogId));
  if (idx === -1) return res.status(404).json({ message: 'Blog not found' });

  db.blogs[idx] = {
    ...db.blogs[idx],
    ...req.body,
    tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
  };
  writeDb(db);
  return res.status(200).json({ message: 'Blog updated successfully', result: db.blogs[idx] });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  const db = readDb();
  const existing = db.users.find((user) => user.username === username);
  if (existing) {
    return res.status(409).json({ message: 'username already exists' });
  }

  const newUser = {
    id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1,
    username,
    password,
  };
  db.users.push(newUser);
  writeDb(db);

  return res.status(201).json({ message: 'Signup successful', user: { id: newUser.id, username: newUser.username } });
});

app.post('/login', (req, res) => {
  const loginData = req.body;
  const db = readDb();
  const user = db.users.find((u) => u.username === loginData.username && u.password === loginData.password);

  if (!user) {
    return res.status(401).json({ message: 'Credentials do not match' });
  }

  const token = generateAccessToken({ username: user.username });
  return res.status(200).json({ token });
});

app.listen(3001, () => {
  console.log('Listening on http://localhost:3001');
});