/* ==========================================================================
   BHUKH LAGI — Cart Page (cart-page.js)
   Pay at Counter checkout flow.
   ========================================================================== */

var CartPage = {
  selectedPaymentMethod: 'PAY_AT_COUNTER',
  _isProcessing: false,

  render: function (container) {
    var cart = Store.getCart();

    if (!cart.stallId || cart.items.length === 0) {
      container.innerHTML = '<div class="container">' +
        '<div class="page-header"><h1 class="page-header__title">Your Cart</h1></div>' +
        EmptyState.render('cart', 'Explore Stalls', 'stalls') +
      '</div>';
      return;
    }

    var html = '<div class="container"><div class="cart-page">' +
      '<div class="page-header">' +
        '<h1 class="page-header__title">Your Cart</h1>' +
        '<p class="page-header__subtitle">Let\u2019s see what we\u2019ve got</p>' +
      '</div>';

    // Stall header
    html += '<p class="cart-page__stall-header">' + DOM.escapeHTML(cart.stallName) + '</p>';

    // Cart items
    html += '<div id="cart-items-list">';
    cart.items.forEach(function (item) {
      html += CartComponent.renderItem(item);
    });
    html += '</div>';

    // Summary + payment method + place order
    html += '<div id="cart-summary">' + CartComponent.renderSummary(cart) + '</div>';

    html += '</div></div>';

    container.innerHTML = html;

    // Cart quantity controls
    DOM.on(container, 'click', '.cart-qty-minus', function (e, btn) {
      var itemId = btn.getAttribute('data-item-id');
      var qty = Store.getCartItemQty(itemId);
      Store.updateCartItemQty(itemId, qty - 1);
      CartPage.render(container);
    });

    DOM.on(container, 'click', '.cart-qty-plus', function (e, btn) {
      var itemId = btn.getAttribute('data-item-id');
      var qty = Store.getCartItemQty(itemId);
      Store.updateCartItemQty(itemId, qty + 1);
      CartPage.render(container);
    });

    DOM.on(container, 'click', '.cart-remove-btn', function (e, btn) {
      var itemId = btn.getAttribute('data-item-id');
      Store.removeFromCart(itemId);
      CartPage.render(container);
      Toast.info('Item removed from cart');
    });

    // Place Order
    var placeBtn = container.querySelector('#place-order-btn') || document.getElementById('place-order-btn');
    if (placeBtn) {
      placeBtn.addEventListener('click', function () {
        CartPage._placeOrder();
      });
    }
  },

  _placeOrder: function () {
    var cart = Store.getCart();
    var validation = Store.validateCart();

if (!validation.valid) {
  Toast.warning('Cart is not ready for checkout: ' + validation.reason);
  return;
}
    if (!cart.items.length) return;
    if (CartPage._isProcessing) return;

    var maxPrep = TimeUtil.getMaxPrepTime(cart.items);
    var now = new Date();
    var times = TimeUtil.calculateOrderTimes(now, maxPrep);
    var user = Store.getUser() || {};
    var total = Store.getCartTotal();

    var orderId = OrderID.generate();
    var order = {
      id: orderId,
      orderId: orderId,
      userId: user.id || null,
      userName: user.name || null,
      stallId: cart.stallId,
      stallName: cart.stallName,
      items: cart.items.map(function (i) {
        return { id: i.id, name: i.name, qty: i.qty, price: i.price, veg: i.veg };
      }),
      total: total,
      status: 'PENDING',
      orderStatus: 'PENDING',
      paymentMethod: 'PAY_AT_COUNTER',
      paymentStatus: 'PAY_AT_COUNTER',
      placedAt: times.placedAt,
      createdAt: times.placedAt,
      acceptedAt: null,
      estimatedReadyAt: times.estimatedReadyAt,
      actualReadyAt: null,
      pickupWindowStart: times.pickupWindowStart,
      pickupWindowEnd: times.pickupWindowEnd,
      completedAt: null,
      delayReason: null,
      updatedEstimate: null
    };

    Store.addOrder(order);
    // Synchronize the locally created order with the centralized backend database.
if (
  typeof AppConfig !== 'undefined' &&
  typeof fetch !== 'undefined'
) {
  var apiOrder = {
    orderId: order.orderId || order.id,
    studentId: order.userId || 'GUEST',
    studentName: order.userName || 'Guest Student',
    stallId: order.stallId,
    stallName: order.stallName,

    items: order.items.map(function (item) {
      return {
        itemId: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        qty: Number(item.qty) || 1,
        subtotal: (Number(item.price) || 0) * (Number(item.qty) || 1)
      };
    }),

    total: Number(order.total) || 0,
paymentMethod: 'PAY_AT_COUNTER',
paymentStatus: 'PENDING',
status: order.status || 'PENDING',

placedAt: order.placedAt || order.createdAt || new Date().toISOString(),
estimatedReadyAt: order.estimatedReadyAt || null,
acceptedAt: order.acceptedAt || null,
actualReadyAt: order.actualReadyAt || null,
completedAt: order.completedAt || null,
updatedEstimate: order.updatedEstimate || null,
delayReason: order.delayReason || null
  };

  fetch(AppConfig.apiUrl('/api/orders'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(apiOrder)
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Order database sync failed');
      }

      return response.json();
    })
    .then(function (savedOrder) {
      if (typeof AppLogger !== 'undefined') {
        AppLogger.info('Order synchronized with database', {
          orderId: savedOrder.orderId
        });
      }
    })
    .catch(function (error) {
      console.error(
        '[BHUKH LAGI] Database order sync failed:',
        error
      );
    });
}
if (typeof AppLogger !== 'undefined') {
  AppLogger.info('Order created', {
    orderId: orderId,
    stallId: cart.stallId,
    total: total
  });
}
    Store.clearCart();
    Store.updateStreak();

    Toast.success('Order placed! ' + orderId);
    if (typeof Router !== 'undefined' && Router.go) {
      Router.go('order/' + orderId);
    } else {
      window.location.hash = '#order/' + orderId;
    }
  }
};
