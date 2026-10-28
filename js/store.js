/* ==========================================================================
   BHUKH LAGI — Data Store (store.js) — v2 Revised
   LocalStorage-backed data layer.
   Single-stall cart enforcement with conflict detection.
   ========================================================================== */

var Store = {
MAX_ITEM_QTY: 10,
  KEYS: {
    USER: 'bl_user',
    CART: 'bl_cart',
    ORDERS: 'bl_orders',
    STREAK: 'bl_streak',
    ORDER_COUNTER: 'bl_order_counter',
    STALL_OVERRIDES: 'bl_stall_overrides'
  },

  _get: function (key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  _set: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Store: write error', key, e);
    }
  },

  // ═══════════════════════ USER ═══════════════════════

  getUser: function () { return this._get(this.KEYS.USER); },
  setUser: function (user) { this._set(this.KEYS.USER, user); },
  isLoggedIn: function () { return !!this.getUser(); },
  isAdmin: function () { var u = this.getUser(); return u && u.role === 'admin'; },
  logout: function () { localStorage.removeItem(this.KEYS.USER); },

  // ═══════════════════════ CART (Single-Stall) ═══════════════════════

  getCart: function () {
    return this._get(this.KEYS.CART) || { stallId: null, stallName: '', items: [] };
  },

  setCart: function (cart) {
    this._set(this.KEYS.CART, cart);
    this._notifyCartChange();
  },

  /**
   * Add item to cart. Returns { conflict, cart, currentStall, newStall, item }
   * If conflict is true, the UI must show confirmation before proceeding.
   */
  addToCart: function (stallId, stallName, item) {
    var cart = this.getCart();

    // Single-stall enforcement
    if (cart.stallId && cart.stallId !== stallId && cart.items.length > 0) {
      return {
        conflict: true,
        currentStall: cart.stallName,
        newStall: stallName,
        pendingItem: item,
        pendingStallId: stallId,
        pendingStallName: stallName
      };
    }

    cart.stallId = stallId;
    cart.stallName = stallName;

    var existing = cart.items.find(function (i) { return i.id === item.id; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        prepTime: item.prepTime,
        veg: item.veg,
        image: item.image || (item.id ? 'assets/images/food/' + item.id + '.webp' : null),
        qty: 1
      });
    }

    this.setCart(cart);
    return { conflict: false, cart: cart };
  },

  /**
   * Force-add after user confirms stall switch. Clears existing cart first.
   */
  forceAddToCart: function (stallId, stallName, item) {
    this.clearCart();
    return this.addToCart(stallId, stallName, item);
  },
// Handles cart item quantity updates and removes items when quantity reaches zero.
  updateCartItemQty: function (itemId, qty) {
  var cart = this.getCart();
  var safeQty = Number(qty);

  if (!Number.isInteger(safeQty)) {
    return cart;
  }

  if (safeQty > this.MAX_ITEM_QTY) {
    safeQty = this.MAX_ITEM_QTY;
  }

  if (safeQty <= 0) {
    cart.items = cart.items.filter(function (i) {
      return i.id !== itemId;
    });

    if (cart.items.length === 0) {
      cart.stallId = null;
      cart.stallName = '';
    }
  } else {
    var item = cart.items.find(function (i) {
      return i.id === itemId;
    });

    if (item) item.qty = safeQty;
  }

  this.setCart(cart);
  return cart;
},

  removeFromCart: function (itemId) {
    return this.updateCartItemQty(itemId, 0);
  },

  clearCart: function () {
    this.setCart({ stallId: null, stallName: '', items: [] });
  },

getCartTotal: function () {
  var cart = this.getCart();

  return cart.items.reduce(function (sum, item) {
    var price = Number(item.price);
    var qty = Number(item.qty);

    if (!Number.isFinite(price) || !Number.isInteger(qty) || qty < 1) {
      return sum;
    }

    return sum + (price * qty);
  }, 0);
},
  getCartItemCount: function () {
    var cart = this.getCart();
    return cart.items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  },

  getCartItemQty: function (itemId) {
    var cart = this.getCart();
    var item = cart.items.find(function (i) { return i.id === itemId; });
    return item ? item.qty : 0;
  },

  _cartListeners: [],
  onCartChange: function (fn) { this._cartListeners.push(fn); },
  _notifyCartChange: function () {
    var cart = this.getCart();
    this._cartListeners.forEach(function (fn) { fn(cart); });
  },

  // ═══════════════════════ ORDERS ═══════════════════════

  getOrders: function () { return this._get(this.KEYS.ORDERS) || []; },

  getOrder: function (orderId) {
    return this.getOrders().find(function (o) { return o.id === orderId; });
  },

  addOrder: function (order) {
    var orders = this.getOrders();
    orders.unshift(order);
    this._set(this.KEYS.ORDERS, orders);
    return order;
  },

  updateOrder: function (orderId, updates) {
    var orders = this.getOrders();
    var idx = orders.findIndex(function (o) { return o.id === orderId; });
    if (idx !== -1) {
      Object.assign(orders[idx], updates);
      this._set(this.KEYS.ORDERS, orders);
      return orders[idx];
    }
    return null;
  },
updateOrderStatus: function (orderId, nextStatus, extraUpdates) {
  var order = this.getOrder(orderId);

  if (!order) {
    return { success: false, reason: 'ORDER_NOT_FOUND' };
  }

  if (!OrderStatus.canTransition(order.status, nextStatus)) {
    return {
      success: false,
      reason: 'INVALID_TRANSITION',
      current: order.status,
      requested: nextStatus
    };
  }

  var updates = Object.assign(
    { status: nextStatus, orderStatus: nextStatus },
    extraUpdates || {}
  );

  return {
    success: true,
    order: this.updateOrder(orderId, updates)
  };
},
transitionOrder: function (orderId, nextStatus, updates) {
  return this.updateOrderStatus(orderId, nextStatus, updates);
},
cancelOrder: function (orderId) {
  var order = this.getOrder(orderId);

  if (!order) {
    return { success: false, reason: 'ORDER_NOT_FOUND' };
  }

  if (!OrderStatus.canCancel(order.status)) {
    return { success: false, reason: 'CANNOT_CANCEL' };
  }

  return this.updateOrderStatus(
    orderId,
    'CANCELLED',
    { completedAt: new Date().toISOString() }
  );
},



getOrderMetrics: function (orders) {
  orders = orders || this.getOrders();

  return {
    total: orders.length,
    pending: Metrics.countByStatus(orders, 'PENDING'),
    preparing: Metrics.countByStatus(orders, 'PREPARING'),
    delayed: Metrics.countByStatus(orders, 'DELAYED'),
    ready: Metrics.countByStatus(orders, 'READY'),
    completed: Metrics.countByStatus(orders, 'COMPLETED'),
    cancelled: Metrics.countByStatus(orders, 'CANCELLED'),
    value: Metrics.totalValue(orders)
  };
},
 
getOrderStatusLabel: function (status) {
  var labels = {
    PENDING: 'Pending',
    PREPARING: 'Preparing',
    DELAYED: 'Delayed',
    READY: 'Ready',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
  };

  return labels[status] || 'Unknown';
},

  getActiveOrders: function () {
    return this.getOrders().filter(function (o) {
      return ['PENDING', 'PREPARING', 'READY', 'DELAYED'].indexOf(o.status) !== -1;
    });
  },

  getPastOrders: function () {
    return this.getOrders().filter(function (o) {
      return ['COMPLETED', 'CANCELLED'].indexOf(o.status) !== -1;
    });
  },

  getOrdersByStatus: function (status) {
    return this.getOrders().filter(function (o) { return o.status === status; });
  },

  getStallOrders: function (stallId) {
    return this.getOrders().filter(function (o) { return o.stallId === stallId; });
  },

  // ═══════════════════════ STREAK ═══════════════════════

  getStreak: function () {
    return this._get(this.KEYS.STREAK) || {
      current: 0, best: 0,
      week: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
      lastOrderDate: null
    };
  },

  updateStreak: function () {
    var streak = this.getStreak();
    var today = TimeUtil.getTodayStr();
    var todayName = TimeUtil.getTodayName();

    if (streak.lastOrderDate === today) return streak;

    if (streak.lastOrderDate && TimeUtil.isYesterday(streak.lastOrderDate)) {
      streak.current += 1;
    } else {
      streak.current = 1;
    }

    if (streak.current > streak.best) streak.best = streak.current;

    streak.week[todayName] = true;
    streak.lastOrderDate = today;

    this._set(this.KEYS.STREAK, streak);
    return streak;
  },

  // ═══════════════════════ STALL OVERRIDES ═══════════════════════

  getStallOverrides: function () {
    return this._get(this.KEYS.STALL_OVERRIDES) || {};
  },

  setStallOverride: function (stallId, overrides) {
    var all = this.getStallOverrides();
    all[stallId] = Object.assign(all[stallId] || {}, overrides);
    this._set(this.KEYS.STALL_OVERRIDES, all);
  },

  toggleItemAvailability: function (stallId, itemId) {
    var overrides = this.getStallOverrides();
    if (!overrides[stallId]) overrides[stallId] = { items: {} };
    if (!overrides[stallId].items) overrides[stallId].items = {};
    overrides[stallId].items[itemId] = !this.isItemAvailable(stallId, itemId);
    this._set(this.KEYS.STALL_OVERRIDES, overrides);
  },
setAllItemsAvailability: function (stallId, available) {
  var stall = StallData.getStall(stallId);
  if (!stall) return false;

  var overrides = this.getStallOverrides();

  if (!overrides[stallId]) {
    overrides[stallId] = { items: {} };
  }

  if (!overrides[stallId].items) {
    overrides[stallId].items = {};
  }

  Object.keys(stall.menu).forEach(function (category) {
    stall.menu[category].forEach(function (item) {
      overrides[stallId].items[item.id] = !!available;
    });
  });

  this._set(this.KEYS.STALL_OVERRIDES, overrides);
  return true;
},

  isItemAvailable: function (stallId, itemId) {
    var overrides = this.getStallOverrides();
    if (overrides[stallId] && overrides[stallId].items && overrides[stallId].items[itemId] !== undefined) {
      return overrides[stallId].items[itemId];
    }
    return true;
  },

  isStallOpenOverride: function (stallId) {
    var overrides = this.getStallOverrides();
    if (overrides[stallId] && overrides[stallId].isOpen !== undefined) {
      return overrides[stallId].isOpen;
    }
    return null;
  },

validateOrderDraft: function (order) {
  if (!order) {
    return { valid: false, reason: 'MISSING_ORDER' };
  }

  if (!order.id || !/^BL\d{5,}$/.test(order.id)) {
    return { valid: false, reason: 'INVALID_ORDER_ID' };
  }

  if (!order.stallId) {
    return { valid: false, reason: 'MISSING_STALL' };
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    return { valid: false, reason: 'EMPTY_ORDER' };
  }

  if (!Number.isFinite(Number(order.total)) || Number(order.total) <= 0) {
    return { valid: false, reason: 'INVALID_TOTAL' };
  }

  return { valid: true, reason: null };
},

  // ═══════════════════════ CLEAR ═══════════════════════

  clearAll: function () {
    var self = this;
    Object.values(this.KEYS).forEach(function (key) { localStorage.removeItem(key); });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
 
