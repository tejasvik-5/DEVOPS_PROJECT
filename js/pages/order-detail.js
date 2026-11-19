/* ==========================================================================
   BHUKH LAGI — Order Detail / Tracking Page (order-detail.js)
   ========================================================================== */

var OrderDetailPage = {
  currentOrder: null,

  render: function (container, orderId) {
    var order = OrderDetailPage.currentOrder;
    if (!order) {
      container.innerHTML = '<div class="container">' + EmptyState.render('orders', 'Go Home', 'home') + '</div>';
      return;
    }

    var isJustPlaced = !order.acceptedAt && order.status === 'PENDING';
    var html = '<div class="container"><div class="order-detail">';

    // Confirmation animation (if just placed)
    if (isJustPlaced) {
      var confTitle = (order.paymentMethod === 'ONLINE' && order.paymentStatus === 'PAID')
        ? 'Payment Successful'
        : 'Order placed!';
      var confSubtitle = (order.paymentMethod === 'ONLINE' && order.paymentStatus === 'PAID')
        ? 'Payment verified via Razorpay. Your food is being prepared.'
        : 'Your food is being prepared.';

      html += '<div class="order-confirmed animate-fade-in-up">' +
        '<div class="order-confirmed__check"><svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
        '<h2 class="order-confirmed__title">' + confTitle + '</h2>' +
        '<p class="order-confirmed__subtitle">' + confSubtitle + '</p>' +
      '</div>';
    }

    // Payment badge
    var paymentBadge = '';
    if (order.paymentMethod === 'ONLINE' && order.paymentStatus === 'PAID') {
      paymentBadge = '<span class="badge badge--payment-paid" style="margin-left:var(--space-xs);">PAID</span>';
    } else if (order.paymentMethod === 'PAY_AT_COUNTER' || order.paymentStatus === 'PAY_AT_COUNTER') {
      paymentBadge = '<span class="badge badge--payment-counter" style="margin-left:var(--space-xs);">PAY AT COUNTER</span>';
    }

    // Order card
    html += '<div class="order-detail__card">' +
      '<div class="order-detail__header">' +
        '<div>' +
          '<h2 style="font-size:var(--text-h2);font-weight:var(--weight-bold);color:var(--navy);">' + order.id + '</h2>' +
          '<p class="text-sm text-muted">' + DOM.escapeHTML(order.stallName) + '</p>' +
        '</div>' +
        '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;">' +
          '<span class="badge badge--status badge--' + order.status.toLowerCase() + '"><span class="badge__dot"></span>' + order.status + '</span>' +
          paymentBadge +
        '</div>' +
      '</div>';

    // Timeline
    html += '<div class="order-detail__section">' +
      '<p class="order-detail__section-title">Order Timeline</p>' +
      OrderTimeline.render(order) +
    '</div>';

    // Scheduling info
    html += '<div class="order-detail__section">' +
      '<p class="order-detail__section-title">Schedule</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);">' +
        '<div><p class="text-caption text-muted">Placed</p><p class="font-semi">' + TimeUtil.formatTime(order.placedAt) + '</p></div>' +
        '<div><p class="text-caption text-muted">Est. Ready</p><p class="font-semi">' + TimeUtil.formatTime(order.updatedEstimate || order.estimatedReadyAt) + '</p></div>' +
        '<div><p class="text-caption text-muted">Pickup Window</p><p class="font-semi">' + TimeUtil.formatTime(order.pickupWindowStart) + ' \u2013 ' + TimeUtil.formatTime(order.pickupWindowEnd) + '</p></div>' +
        (order.completedAt ? '<div><p class="text-caption text-muted">Completed</p><p class="font-semi">' + TimeUtil.formatTime(order.completedAt) + '</p></div>' : '') +
      '</div>' +
    '</div>';

    // Items
    html += '<div class="order-detail__section">' +
      '<p class="order-detail__section-title">Items</p>';

    order.items.forEach(function (item) {
      html += '<div style="display:flex;justify-content:space-between;padding:var(--space-xs) 0;font-size:var(--text-body-sm);">' +
        '<span>' + item.qty + 'x ' + DOM.escapeHTML(item.name) + '</span>' +
        '<span class="font-semi">\u20B9' + (item.price * item.qty) + '</span>' +
      '</div>';
    });

    html += '<hr class="divider" style="margin:var(--space-sm) 0;">' +
      '<div style="display:flex;justify-content:space-between;font-weight:var(--weight-bold);color:var(--navy);">' +
        '<span>Total</span><span>\u20B9' + order.total + '</span>' +
      '</div>';

    if (order.paymentMethod === 'ONLINE' && order.paymentStatus === 'PAID') {
      html += '<div style="margin-top:var(--space-sm);padding:var(--space-sm) var(--space-md);background:var(--sky-light);border-radius:var(--radius-sm);font-size:var(--text-body-sm);">' +
        '<div style="font-weight:var(--weight-semi);color:var(--navy);margin-bottom:var(--space-2xs);display:flex;align-items:center;justify-content:space-between;">' +
          '<span>Payment Method: Online</span>' +
          '<span style="color:#2E7D32;font-weight:var(--weight-bold);font-size:11px;">PAID</span>' +
        '</div>' +
        '<div style="font-size:var(--text-caption);color:var(--navy);display:flex;flex-direction:column;gap:2px;">' +
          '<div><span class="text-muted">Order ID:</span> ' + order.id + '</div>' +
          '<div><span class="text-muted">Payment ID:</span> <span style="font-family:monospace;">' + (order.razorpayPaymentId || 'pay_test') + '</span></div>' +
          '<div><span class="text-muted">Amount Paid:</span> \u20B9' + order.total + '</div>' +
        '</div>' +
      '</div>';
    } else {
      html += '<p class="text-caption text-muted" style="margin-top:var(--space-xs);">Payment: ' + DOM.escapeHTML(BRAND.copy.payAtCounter) + '</p>';
    }

    html += '</div>'; // items section
    html += '</div>'; // card

    // Actions
    html += '<div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">';
if (OrderStatus.canCancel(order.status)) {
      html += '<button class="btn btn--secondary btn--full" id="cancel-order-btn">Cancel Order</button>';
    }
    html += '<a href="#orders" class="btn btn--ghost btn--full">All Orders</a>';
    html += '</div>';

    html += '</div></div>';

    container.innerHTML = html;

    // Cancel order
var cancelBtn = document.getElementById('cancel-order-btn');

if (cancelBtn) {
  cancelBtn.addEventListener('click', function () {
    var now = new Date().toISOString();

    if (
      typeof AppConfig === 'undefined' ||
      typeof fetch === 'undefined'
    ) {
      Toast.warning('Unable to connect to the order service.');
      return;
    }

    cancelBtn.disabled = true;

    fetch(
      AppConfig.apiUrl(
        '/api/orders/' +
        encodeURIComponent(orderId) +
        '/status'
      ),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'CANCELLED',
          cancelledAt: now
        })
      }
    )
      .then(function (response) {
        if (!response.ok) {
          return response.json()
            .catch(function () {
              return {};
            })
            .then(function (body) {
              throw new Error(
                body.error || 'Order cancellation failed'
              );
            });
        }

        return response.json();
      })
      .then(function (savedOrder) {
        // Keep localStorage synchronized temporarily.
        Store.updateOrder(orderId, {
          status: savedOrder.status,
          orderStatus: savedOrder.status,
          cancelledAt: savedOrder.cancelledAt || now
        });

        Toast.info('Order cancelled');
      OrderDetailPage._loadOrder(container, orderId);
      })
      .catch(function (error) {
        console.error(
          '[BHUKH LAGI] Order cancellation failed:',
          error
        );

        cancelBtn.disabled = false;
        Toast.warning('Could not cancel order.');
      });
  });
}
  
},

_loadOrder: function (container, orderId) {
  if (!orderId) {
    OrderDetailPage.currentOrder = null;
    OrderDetailPage.render(container, orderId);
    return;
  }

  if (
    typeof AppConfig === 'undefined' ||
    typeof fetch === 'undefined'
  ) {
    OrderDetailPage.currentOrder = Store.getOrder(orderId);
    OrderDetailPage.render(container, orderId);
    return;
  }

  fetch(
    AppConfig.apiUrl(
      '/api/orders/' + encodeURIComponent(orderId)
    )
  )
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Unable to load order');
      }

      return response.json();
    })
    .then(function (order) {
      OrderDetailPage.currentOrder = Object.assign({}, order, {
        id: order.orderId || order.id,
        userId: order.studentId || order.userId,
        userName: order.studentName || order.userName,
        placedAt: order.placedAt || order.createdAt,
        actualReadyAt:
          order.actualReadyAt ||
          order.readyAt ||
          null
      });

      OrderDetailPage.render(container, orderId);
    })
    .catch(function (error) {
      console.error(
        '[BHUKH LAGI] Order detail load failed:',
        error
      );

      OrderDetailPage.currentOrder = Store.getOrder(orderId);
      OrderDetailPage.render(container, orderId);
    });
}

};