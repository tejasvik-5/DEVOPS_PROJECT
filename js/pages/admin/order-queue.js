/* ==========================================================================
   BHUKH LAGI — Admin Order Queue (admin/order-queue.js)
   ========================================================================== */
var ADMIN_STATUS_LABELS = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  DELAYED: 'Delayed',
  READY: 'Ready',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};
var AdminOrderQueue = {
  currentFilter: 'ALL',

  render: function (container) {
    var user = Store.getUser();
    var stallId = user.stallId;
    var orders = Store.getStallOrders(stallId);

    // Group by status
    var statusGroups = { ALL: orders };
    ['PENDING', 'PREPARING', 'DELAYED', 'READY', 'COMPLETED', 'CANCELLED'].forEach(function (s) {
      statusGroups[s] = orders.filter(function (o) { return o.status === s; });
    });

    var html = '<div class="admin-page-header">' +
      '<h1 class="admin-page-header__title">Order Queue</h1>' +
      '<p class="admin-page-header__subtitle">Manage incoming orders</p>' +
    '</div>';

    // Filter tabs
    html += '<div class="tabs" id="order-queue-tabs">';
    var tabLabels = ['ALL', 'PENDING', 'PREPARING', 'READY', 'COMPLETED'];
    tabLabels.forEach(function (s) {
      var count = statusGroups[s] ? statusGroups[s].length : 0;
      var activeClass = s === AdminOrderQueue.currentFilter ? ' active' : '';
      html += '<button class="tab' + activeClass + '" data-status="' + s + '">' + s.charAt(0) + s.slice(1).toLowerCase() + '<span class="tab__count">' + count + '</span></button>';
    });
    html += '</div>';

    // Order list
    html += '<div id="order-queue-list">';
    html += AdminOrderQueue._renderOrders(statusGroups[AdminOrderQueue.currentFilter] || []);
    html += '</div>';

    container.innerHTML = html;

    // Tab click
    DOM.on(container, 'click', '.tab', function (e, tab) {
      container.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      AdminOrderQueue.currentFilter = tab.getAttribute('data-status');
      var filtered = statusGroups[AdminOrderQueue.currentFilter] || [];
      document.getElementById('order-queue-list').innerHTML = AdminOrderQueue._renderOrders(filtered);
      AdminOrderQueue._bindActions(container);
    });

    AdminOrderQueue._bindActions(container);
  },

  _renderOrders: function (orders) {
    if (orders.length === 0) {
      return '<div style="padding:var(--space-2xl) 0;text-align:center;color:var(--text-muted);">No orders in this category.</div>';
    }

    var html = '';
    orders.forEach(function (order) {
      var itemsHtml = order.items.map(function (i) {
        return '<div class="admin-order__item">' + i.qty + 'x ' + DOM.escapeHTML(i.name) + '</div>';
      }).join('');

      var actionsHtml = AdminOrderQueue._getActions(order);

      var paymentBadge = '';
      var payStatus = order.paymentStatus || (order.paymentMethod === 'ONLINE' ? 'PAID' : 'PAY_AT_COUNTER');
      if (payStatus === 'PAID') {
        paymentBadge = '<span class="badge badge--payment-paid">PAID</span>';
      } else if (payStatus === 'PAY_AT_COUNTER') {
        paymentBadge = '<span class="badge badge--payment-counter">PAY AT COUNTER</span>';
      } else if (payStatus === 'FAILED') {
        paymentBadge = '<span class="badge badge--payment-failed">FAILED</span>';
      } else if (payStatus === 'PENDING') {
        paymentBadge = '<span class="badge badge--payment-pending">PENDING</span>';
      }

      var paymentDetailHtml = payStatus;

      html += '<div class="admin-order" data-order-id="' + order.id + '">' +
        '<div class="admin-order__header">' +
          '<span class="admin-order__id">' + order.id + '</span>' +
          '<div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">' +
            '<span class="badge badge--status badge--' + order.status.toLowerCase() + '"><span class="badge__dot"></span>' + order.status + '</span>' +
            paymentBadge +
          '</div>' +
        '</div>' +
        '<div class="admin-order__items">' + itemsHtml + '</div>' +
        '<div class="admin-order__times">' +
          '<div class="admin-order__time-block"><p class="admin-order__time-label">Placed</p><p class="admin-order__time-value">' + TimeUtil.formatTime(order.placedAt) + '</p></div>' +
          '<div class="admin-order__time-block"><p class="admin-order__time-label">Est. Ready</p><p class="admin-order__time-value">' + TimeUtil.formatTime(order.updatedEstimate || order.estimatedReadyAt) + '</p></div>' +
          '<div class="admin-order__time-block"><p class="admin-order__time-label">Total</p><p class="admin-order__time-value">\u20B9' + order.total + '</p></div>' +
          '<div class="admin-order__time-block"><p class="admin-order__time-label">Payment</p><p class="admin-order__time-value font-semi">' + paymentDetailHtml + '</p></div>' +
        '</div>' +
        '<div class="admin-order__actions">' + actionsHtml + '</div>' +
      '</div>';
    });

    return html;
  },

  _getActions: function (order) {
    var actions = '';
    switch (order.status) {
      case 'PENDING':
        actions = '<button class="btn btn--primary btn--sm action-accept" data-oid="' + order.id + '">Accept Order</button>' +
          '<button class="btn btn--danger btn--sm action-cancel" data-oid="' + order.id + '">Cancel</button>';
        break;
      case 'PREPARING':
        actions = '<button class="btn btn--accent btn--sm action-ready" data-oid="' + order.id + '">Mark Ready</button>' +
          '<button class="btn btn--secondary btn--sm action-delay" data-oid="' + order.id + '">Mark Delayed</button>';
        break;
      case 'DELAYED':
        actions = '<button class="btn btn--accent btn--sm action-ready" data-oid="' + order.id + '">Mark Ready</button>' +
          '<button class="btn btn--danger btn--sm action-cancel" data-oid="' + order.id + '">Cancel</button>';
        break;
      case 'READY':
        actions = '<button class="btn btn--primary btn--sm action-complete" data-oid="' + order.id + '">Mark Completed</button>';
        break;
    }
    return actions;
  },

  _bindActions: function (container) {
    DOM.on(container, 'click', '.action-accept', function (e, btn) {
      var oid = btn.getAttribute('data-oid');
      Store.updateOrder(oid, { status: 'PREPARING', acceptedAt: new Date().toISOString() });
      Toast.success('Order ' + oid + ' accepted');
      AdminOrderQueue.render(container);
    });

    DOM.on(container, 'click', '.action-ready', function (e, btn) {
      var oid = btn.getAttribute('data-oid');
      Store.updateOrder(oid, { status: 'READY', actualReadyAt: new Date().toISOString() });
      Toast.success('Order ' + oid + ' is ready!');
      AdminOrderQueue.render(container);
    });

    DOM.on(container, 'click', '.action-complete', function (e, btn) {
      var oid = btn.getAttribute('data-oid');
      Store.updateOrder(oid, { status: 'COMPLETED', completedAt: new Date().toISOString() });
      Toast.success('Order ' + oid + ' completed');
      AdminOrderQueue.render(container);
    });

    DOM.on(container, 'click', '.action-cancel', function (e, btn) {
      var oid = btn.getAttribute('data-oid');
      Store.updateOrder(oid, { status: 'CANCELLED', completedAt: new Date().toISOString() });
      Toast.info('Order ' + oid + ' cancelled');
      AdminOrderQueue.render(container);
    });

    DOM.on(container, 'click', '.action-delay', function (e, btn) {
      var oid = btn.getAttribute('data-oid');
      var order = Store.getOrder(oid);
      var newEstimate = TimeUtil.addMinutes(order.estimatedReadyAt, 10).toISOString();
      Store.updateOrder(oid, { status: 'DELAYED', updatedEstimate: newEstimate, delayReason: 'Preparation taking longer than expected' });
      Toast.warning('Order ' + oid + ' marked delayed (+10 min)');
      AdminOrderQueue.render(container);
    });
  }
};
