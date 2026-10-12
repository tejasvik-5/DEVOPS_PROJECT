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
