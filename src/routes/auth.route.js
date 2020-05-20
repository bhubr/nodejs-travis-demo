const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required field(s)' });
  }

  let user;
  try {
    user = await userModel.getOneByEmail(email);
  } catch (dbErr) {
    return res.status(500).json({ error: dbErr.message });
  }
  // User not found -> 401
  if (!user) {
    return res.status(401).json({ error: 'Account does not exist' });
  }

  let passwordsMatch;
  try {
    passwordsMatch = await bcrypt.compare(password, user.password);
  } catch (bcryptErr) {
    return res.status(500).json({ error: bcryptErr.message });
  }
  if (!passwordsMatch) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const { id } = user;
  const payload = { id, email };

  let token;
  try {
    token = await jwt.sign(payload, 'secret');
  } catch (jwtErr) {
    return res.status(500).json({ error: jwtErr.message });
  }

  res.cookie('jwt', token, { httpOnly: true, secure: process.env.USE_HTTPS === 'true' });
  return res.json(payload);
});

module.exports = router;
