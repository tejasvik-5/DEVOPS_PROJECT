const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    qty: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    _id: false
  }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },

    studentId: {
      type: String,
      required: true,
      index: true
    },

    studentName: {
      type: String,
      required: true
    },

    stallId: {
      type: String,
      required: true,
      index: true
    },

    stallName: {
      type: String,
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true
    },

    total: {
      type: Number,
      required: true,
      min: 0
    },

    paymentMethod: {
      type: String,
      enum: ['PAY_AT_COUNTER'],
      default: 'PAY_AT_COUNTER'
    },

    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID'],
      default: 'PENDING'
    },

    status: {
      type: String,
      enum: [
        'PENDING',
        'PREPARING',
        'DELAYED',
        'READY',
        'COMPLETED',
        'CANCELLED'
      ],
      default: 'PENDING',
      index: true
    },

    placedAt: {
  type: Date,
  default: Date.now
},

estimatedReadyAt: {
  type: Date,
  default: null
},

acceptedAt: {
  type: Date,
  default: null
},

actualReadyAt: {
  type: Date,
  default: null
},

readyAt: {
  type: Date,
  default: null
},

completedAt: {
  type: Date,
  default: null
},

cancelledAt: {
  type: Date,
  default: null
},

updatedEstimate: {
  type: Date,
  default: null
},

delayReason: {
  type: String,
  default: null
}
  },
  {
    timestamps: true
  }
);

orderSchema.index({ stallId: 1, status: 1 });
orderSchema.index({ studentId: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);