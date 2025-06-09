const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists) return res.status(400).send('User already exists');
    
    const newUser = new User({ username, email, password });
    await newUser.save();
    
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Error signing up');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials');
    }
    
    req.session.user = user;
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
