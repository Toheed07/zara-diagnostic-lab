const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('your_mongodb_uri');

// Simple auth middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Routes
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
});

// Protected routes
app.use('/api/admin/*', authMiddleware);

app.get('/api/admin/content', async (req, res) => {
  // Fetch content from MongoDB
  const content = await Content.find();
  res.json(content);
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
}); 