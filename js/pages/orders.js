/* ==========================================================================
   BHUKH LAGI — My Orders Page (orders.js)
   ========================================================================== */

var OrdersPage = {
  render: function (container) {
    var activeOrders = Store.getActiveOrders();
    var pastOrders = Store.getPastOrders();

    var html = '<div class="container"><div class="orders-page">' +
      '<div class="page-header">' +
        '<h1 class="page-header__title">My Orders</h1>' +
      '</div>';

    // Tabs
    html += '<div class="tabs" id="orders-tabs">' +
      '<button class="tab active" data-tab="active">Active<span class="tab__count">' + activeOrders.length + '</span></button>' +
      '<button class="tab" data-tab="past">Past<span class="tab__count">' + pastOrders.length + '</span></button>' +
    '</div>';

    // Active orders
    html += '<div id="orders-active">';
    if (activeOrders.length === 0) {
      html += EmptyState.render('noActiveOrders', 'Explore Stalls', 'stalls');
    } else {
      activeOrders.forEach(function (order) {
        html += OrdersPage._renderOrderCard(order, true);
      });
    }
    html += '</div>';

    // Past orders (hidden by default)
    html += '<div id="orders-past" style="display:none;">';
    if (pastOrders.length === 0) {
      html += EmptyState.render('orders', 'Explore Stalls', 'stalls');
    } else {
      pastOrders.forEach(function (order) {
        html += OrdersPage._renderOrderCard(order, false);
      });
    }
    html += '</div>';

    html += '</div></div>';

    container.innerHTML = html;

    // Tab switching
    DOM.on(container, 'click', '.tab', function (e, tab) {
      container.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var tabName = tab.getAttribute('data-tab');
      document.getElementById('orders-active').style.display = tabName === 'active' ? 'block' : 'none';
      document.getElementById('orders-past').style.display = tabName === 'past' ? 'block' : 'none';
    });
  },

  _renderOrderCard: function (order, isActive) {
    var statusClass = order.status.toLowerCase();
    var itemsText = order.items.map(function (i) { return i.qty + 'x ' + i.name; }).join(', ');

    var actionHtml = '';
    if (isActive) {
      actionHtml = '<a href="#order/' + order.id + '" class="btn btn--ghost btn--sm">Track Order \u2192</a>';
    } else {
      actionHtml = '<a href="#stall/' + order.stallId + '" class="btn btn--ghost btn--sm">Reorder \u2192</a>';
    }

    var timeText = isActive
      ? 'Est. ready: ' + TimeUtil.formatTime(order.updatedEstimate || order.estimatedReadyAt)
      : TimeUtil.formatDate(order.placedAt);

    var paymentBadge = '';
    if (order.paymentMethod === 'ONLINE' && order.paymentStatus === 'PAID') {
      paymentBadge = '<span class="badge badge--payment-paid">PAID</span>';
    } else if (order.paymentMethod === 'PAY_AT_COUNTER' || order.paymentStatus === 'PAY_AT_COUNTER') {
      paymentBadge = '<span class="badge badge--payment-counter">PAY AT COUNTER</span>';
    }

    return '<div class="order-card animate-fade-in-up">' +
      '<div class="order-card__header">' +
        '<span class="order-card__id">' + order.id + ' <span class="order-card__stall">\u2022 ' + DOM.escapeHTML(order.stallName) + '</span></span>' +
        '<div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">' +
          '<span class="badge badge--status badge--' + statusClass + '"><span class="badge__dot"></span>' + order.status + '</span>' +
          paymentBadge +
        '</div>' +
      '</div>' +
      '<p class="order-card__items">' + DOM.escapeHTML(itemsText) + '</p>' +
      '<div class="order-card__footer">' +
        '<span><span class="order-card__total">\u20B9' + order.total + '</span> <span class="order-card__time">\u2022 ' + timeText + '</span></span>' +
        actionHtml +
      '</div>' +
    '</div>';
  }
};
