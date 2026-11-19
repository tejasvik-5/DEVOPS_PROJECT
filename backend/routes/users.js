const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async function (req, res) {
  try {
    const users = await User.find().sort({ name: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve users'
    });
  }
});

// GET one user
router.get('/:userId', async function (req, res) {
  try {
    const user = await User.findOne({
      userId: req.params.userId
    });

    if (!user) {
      return res.status(404).json({
        error: 'USER_NOT_FOUND'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve user'
    });
  }
});

// CREATE user
router.post('/', async function (req, res) {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'USER_ALREADY_EXISTS'
      });
    }

    res.status(400).json({
      error: 'USER_CREATION_FAILED',
      message: error.message
    });
  }
});

module.exports = router;