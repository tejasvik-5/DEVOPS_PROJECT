const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authenticateAdmin } = require('../middleware/auth');
const Counter = require('../models/Counter');

// GET all orders
router.get('/', async function (req, res) {
  try {
    const filter = {};

    if (req.query.stallId) {
      filter.stallId = req.query.stallId;
    }

    if (req.query.studentId) {
  filter.studentId = req.query.studentId;
}

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve orders'
    });
  }
});

// GET one order
router.get('/:orderId', async function (req, res) {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId
    });

    if (!order) {
      return res.status(404).json({
        error: 'ORDER_NOT_FOUND'
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to retrieve order'
    });
  }
});
async function generateOrderId() {
  const latestOrder = await Order.findOne({
    orderId: /^BL\d+$/
  })
    .sort({ orderId: -1 })
    .select('orderId')
    .lean();

  let minimumValue = 10000;

  if (latestOrder && latestOrder.orderId) {
    const parsed = parseInt(
      latestOrder.orderId.replace('BL', ''),
      10
    );

    if (Number.isInteger(parsed) && parsed > minimumValue) {
      minimumValue = parsed;
    }
  }

  const counter = await Counter.findOneAndUpdate(
    { key: 'orderId' },
    {
      $max: {
        value: minimumValue
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );

  const nextCounter = await Counter.findOneAndUpdate(
    { key: 'orderId' },
    {
      $inc: {
        value: 1
      }
    },
    {
      new: true
    }
  );

  return 'BL' + nextCounter.value;
}
// CREATE order
router.post('/', async function (req, res) {
  try {
    const data = Object.assign({}, req.body);

    if (
      !data.studentId ||
      !data.studentName ||
      !data.stallId ||
      !data.stallName ||
      !Array.isArray(data.items) ||
      data.items.length === 0
    ) {
      return res.status(400).json({
        error: 'INVALID_ORDER'
      });
    }
    data.orderId = await generateOrderId();
    const order = await Order.create(data);

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'ORDER_ALREADY_EXISTS'
      });
    }

    res.status(400).json({
      error: 'ORDER_CREATION_FAILED',
      message: error.message
    });
  }
});

// UPDATE order status
router.patch(
  '/:orderId/status',
  authenticateAdmin,
async function (req, res){
try {
    const allowedStatuses = [
      'PENDING',
      'PREPARING',
      'DELAYED',
      'READY',
      'COMPLETED',
      'CANCELLED'
    ];

    const nextStatus = req.body.status;

    if (allowedStatuses.indexOf(nextStatus) === -1) {
      return res.status(400).json({
        error: 'INVALID_STATUS'
      });
    }
    const existingOrder = await Order.findOne({
  orderId: req.params.orderId
});

if (!existingOrder) {
  return res.status(404).json({
    error: 'ORDER_NOT_FOUND'
  });
}

const allowedTransitions = {
  PENDING: ['PREPARING', 'CANCELLED'],
  PREPARING: ['READY', 'DELAYED', 'CANCELLED'],
  DELAYED: ['READY', 'CANCELLED'],
  READY: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: []
};

if (
  existingOrder.status !== nextStatus &&
  allowedTransitions[existingOrder.status].indexOf(nextStatus) === -1
) {
  return res.status(409).json({
    error: 'INVALID_STATUS_TRANSITION',
    currentStatus: existingOrder.status,
    requestedStatus: nextStatus
  });
}
if (existingOrder.stallId !== req.user.stallId) {
  return res.status(403).json({
    error: 'STALL_ACCESS_DENIED'
  });
}
const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      {
  status: nextStatus,

  ...(req.body.acceptedAt !== undefined && {
    acceptedAt: req.body.acceptedAt
  }),

  ...(req.body.actualReadyAt !== undefined && {
    actualReadyAt: req.body.actualReadyAt
  }),

  ...(req.body.readyAt !== undefined && {
    readyAt: req.body.readyAt
  }),

  ...(req.body.completedAt !== undefined && {
    completedAt: req.body.completedAt
  }),

  ...(req.body.cancelledAt !== undefined && {
    cancelledAt: req.body.cancelledAt
  }),

  ...(req.body.updatedEstimate !== undefined && {
    updatedEstimate: req.body.updatedEstimate
  }),

  ...(req.body.delayReason !== undefined && {
    delayReason: req.body.delayReason
  })
},
      {
        new: true,
        runValidators: true
      }
    );

    if (!order) {
      return res.status(404).json({
        error: 'ORDER_NOT_FOUND'
      });
    }

        res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      error: 'ORDER_UPDATE_FAILED'
    });
  }
});
module.exports = router;