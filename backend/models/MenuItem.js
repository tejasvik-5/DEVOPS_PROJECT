const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true
    },

    stallId: {
      type: String,
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      default: ''
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    veg: {
      type: Boolean,
      default: true
    },

    prepTime: {
      type: Number,
      default: 0,
      min: 0
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

menuItemSchema.index({ stallId: 1, category: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);