const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema(
  {
    stallId: {
      type: String,
      required: true,
      unique: true,
      trim: true
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

    image: {
      type: String,
      default: ''
    },

    prepTime: {
      type: Number,
      default: 0,
      min: 0
    },

    isOpen: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Stall', stallSchema);