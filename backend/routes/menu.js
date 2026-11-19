const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET all menu items
router.get('/', async function (req, res) {
  try {
    const filter = {};

    if (req.query.stallId) {
      filter.stallId = req.query.stallId;
    }

    if (req.query.available !== undefined) {
      filter.available = req.query.available === 'true';
    }

    const items = await MenuItem.find(filter).sort({
      stallId: 1,
      category: 1,
      name: 1
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve menu items'
    });
  }
});

// GET one menu item
router.get('/:itemId', async function (req, res) {
  try {
    const item = await MenuItem.findOne({
      itemId: req.params.itemId
    });

    if (!item) {
      return res.status(404).json({
        error: 'MENU_ITEM_NOT_FOUND'
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve menu item'
    });
  }
});

// CREATE menu item
router.post('/', async function (req, res) {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'MENU_ITEM_ALREADY_EXISTS'
      });
    }

    res.status(400).json({
      error: 'MENU_ITEM_CREATION_FAILED',
      message: error.message
    });
  }
});

// UPDATE menu item availability
router.patch('/:itemId/availability', async function (req, res) {
  try {
    if (typeof req.body.available !== 'boolean') {
      return res.status(400).json({
        error: 'INVALID_AVAILABILITY'
      });
    }

    const item = await MenuItem.findOneAndUpdate(
      { itemId: req.params.itemId },
      { available: req.body.available },
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) {
      return res.status(404).json({
        error: 'MENU_ITEM_NOT_FOUND'
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      error: 'MENU_ITEM_UPDATE_FAILED'
    });
  }
});

module.exports = router;