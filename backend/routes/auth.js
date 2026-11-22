const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

/*
 * POST /api/auth/admin/login
 *
 * Authenticates a stall administrator using:
 * - userId
 * - password
 */
router.post('/admin/login', async function (req, res) {
  try {
    const userId = String(req.body.userId || '').trim();
    const password = String(req.body.password || '');

    if (!userId || !password) {
      return res.status(400).json({
        error: 'Admin ID and password are required.'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('[AUTH] JWT_SECRET is not configured.');

      return res.status(500).json({
        error: 'Authentication service is not configured.'
      });
    }

    const admin = await User.findOne({
      userId: userId,
      role: 'admin',
      active: true
    }).select('+passwordHash');

    /*
     * Use the same response for an unknown admin and an incorrect
     * password so we do not reveal which admin accounts exist.
     */
    if (!admin || !admin.passwordHash) {
      return res.status(401).json({
        error: 'Invalid admin ID or password.'
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: 'Invalid admin ID or password.'
      });
    }

    const token = jwt.sign(
      {
        userId: admin.userId,
        role: admin.role,
        stallId: admin.stallId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '8h'
      }
    );

    return res.status(200).json({
      token: token,

      admin: {
        userId: admin.userId,
        name: admin.name,
        role: admin.role,
        stallId: admin.stallId
      }
    });
  } catch (error) {
    console.error('[AUTH] Admin login failed:', error.message);

    return res.status(500).json({
      error: 'Unable to complete admin login.'
    });
  }
});

module.exports = router;