const express = require('express');
const router = express.Router();
const Stall = require('../models/Stall');

// GET all stalls
router.get('/', async function (req, res) {
  try {
    const stalls = await Stall.find().sort({ name: 1 });
    res.status(200).json(stalls);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve stalls'
    });
  }
});

// GET one stall
router.get('/:stallId', async function (req, res) {
  try {
    const stall = await Stall.findOne({
      stallId: req.params.stallId
    });

    if (!stall) {
      return res.status(404).json({
        error: 'STALL_NOT_FOUND'
      });
    }

    res.status(200).json(stall);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve stall'
    });
  }
});

// CREATE stall
router.post('/', async function (req, res) {
  try {
    const stall = await Stall.create(req.body);
    res.status(201).json(stall);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'STALL_ALREADY_EXISTS'
      });
    }

    res.status(400).json({
      error: 'STALL_CREATION_FAILED',
      message: error.message
    });
  }
});

// UPDATE stall availability
router.patch('/:stallId/availability', async function (req, res) {
  try {
    if (typeof req.body.isOpen !== 'boolean') {
      return res.status(400).json({
        error: 'INVALID_AVAILABILITY'
      });
    }

    const stall = await Stall.findOneAndUpdate(
      { stallId: req.params.stallId },
      { isOpen: req.body.isOpen },
      {
        new: true,
        runValidators: true
      }
    );

    if (!stall) {
      return res.status(404).json({
        error: 'STALL_NOT_FOUND'
      });
    }

    res.status(200).json(stall);
  } catch (error) {
    res.status(400).json({
      error: 'STALL_UPDATE_FAILED'
    });
  }
});

module.exports = router;