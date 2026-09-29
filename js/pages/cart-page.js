/* ==========================================================================
   BHUKH LAGI — Cart Page (cart-page.js)
   ========================================================================== */

var CartPage = {
  selectedPaymentMethod: 'ONLINE',
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
    html += '<div id="cart-summary">' + CartComponent.renderSummary(cart, CartPage.selectedPaymentMethod) + '</div>';

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

    // Payment method selector
    DOM.on(container, 'change', 'input[name="payment_method"]', function (e, input) {
      CartPage.selectedPaymentMethod = input.value;
      var onlineOption = container.querySelector('#payment-option-online') || document.getElementById('payment-option-online');
      var counterOption = container.querySelector('#payment-option-counter') || document.getElementById('payment-option-counter');
      if (onlineOption) DOM.toggleClass(onlineOption, 'is-selected', input.value === 'ONLINE');
      if (counterOption) DOM.toggleClass(counterOption, 'is-selected', input.value === 'PAY_AT_COUNTER');

      var placeBtn = container.querySelector('#place-order-btn') || document.getElementById('place-order-btn');
      if (placeBtn && !CartPage._isProcessing) {
        var total = Store.getCartTotal();
        placeBtn.textContent = (input.value === 'ONLINE')
          ? 'Pay Online \u2014 \u20B9' + total
          : 'Place Order \u2014 \u20B9' + total;
      }
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

    // PAY AT COUNTER FLOW
    if (CartPage.selectedPaymentMethod === 'PAY_AT_COUNTER') {
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
      return;
    }

    // ONLINE PAYMENT FLOW (Razorpay Test Mode)
    CartPage._isProcessing = true;
    var placeBtn = document.getElementById('place-order-btn');
    if (placeBtn) {
      placeBtn.disabled = true;
      placeBtn.textContent = 'Connecting to Payment\u2026';
    }

    var tempRef = OrderID.generate();
    var apiBase = CartPage._getApiBase();

    fetch(apiBase + '/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total, receipt: tempRef })
    })
    .then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          throw new Error(data.error || 'Server rejected order creation');
        });
      }
      return res.json();
    })
    .then(function (data) {
      if (!data.success || !data.orderId) {
        throw new Error(data.error || 'Failed to initialize payment');
      }
      CartPage._openRazorpay(data, cart, tempRef, times, user);
    })
    .catch(function (err) {
      CartPage._isProcessing = false;
      var msg = (err.message && err.message.indexOf('Failed to fetch') !== -1)
        ? 'Unable to connect to payment service. Please ensure backend is running.'
        : (err.message || 'Payment initiation failed.');
      Toast.error(msg);
      CartPage._resetButton(placeBtn, total);
    });
  },

  _openRazorpay: function (rzpData, cart, tempRef, times, user) {
    var total = Store.getCartTotal();
    var placeBtn = document.getElementById('place-order-btn');

    if (typeof window.Razorpay !== 'function') {
      CartPage._isProcessing = false;
      Toast.error('Razorpay Checkout SDK is loading. Please check internet connection.');
      CartPage._resetButton(placeBtn, total);
      return;
    }

    var options = {
      key: rzpData.keyId,
      amount: rzpData.amount,
      currency: rzpData.currency || 'INR',
      name: (typeof BRAND !== 'undefined' && BRAND.name) ? BRAND.name : 'BHUKH LAGI',
      description: 'College Canteen Order \u2014 ' + cart.stallName,
      order_id: rzpData.orderId,
      prefill: {
        name: (user && user.name) ? user.name : '',
        contact: (user && user.id && /^\d{10}$/.test(user.id)) ? user.id : ''
      },
      theme: {
        color: '#2F4156'
      },
      modal: {
        ondismiss: function () {
          CartPage._isProcessing = false;
          Toast.info('Payment cancelled');
          CartPage._resetButton(placeBtn, total);
        }
      },
      handler: function (response) {
        CartPage._verifyPayment(response, rzpData.orderId, cart, tempRef, times, user, placeBtn);
      }
    };

    var rzpInstance = new window.Razorpay(options);
    rzpInstance.on('payment.failed', function (failResp) {
      CartPage._isProcessing = false;
      var reason = (failResp && failResp.error && failResp.error.description)
        ? failResp.error.description
        : 'Payment failed';
      Toast.error('Payment failed: ' + reason);
      CartPage._resetButton(placeBtn, total);
    });
    rzpInstance.open();
  },

  _verifyPayment: function (response, rzpOrderId, cart, tempRef, times, user, placeBtn) {
    if (placeBtn) placeBtn.textContent = 'Verifying Payment\u2026';
    var apiBase = CartPage._getApiBase();
    var total = Store.getCartTotal();

    fetch(apiBase + '/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        orderId: tempRef
      })
    })
    .then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, data: data };
      }).catch(function () {
        return { ok: false, data: {} };
      });
    })
    .then(function (result) {
      CartPage._isProcessing = false;
      if (result.ok && result.data.success && result.data.verified) {
        // Finalize order ONLY after successful server-side payment verification
        var order = {
          id: tempRef,
          orderId: tempRef,
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
          paymentMethod: 'ONLINE',
          paymentStatus: 'PAID',
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
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

        Toast.success('Payment verified & order placed! ' + tempRef);
        if (typeof Router !== 'undefined' && Router.go) {
          Router.go('order/' + tempRef);
        } else {
          window.location.hash = '#order/' + tempRef;
        }
      } else {
        Toast.error('Payment verification failed. Please contact canteen counter.');
        CartPage._resetButton(placeBtn, total);
      }
    })
    .catch(function () {
      CartPage._isProcessing = false;
      Toast.error('Unable to connect to payment service for verification.');
      CartPage._resetButton(placeBtn, total);
    });
  },

  _resetButton: function (btn, total) {
    CartPage._isProcessing = false;
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = (CartPage.selectedPaymentMethod === 'ONLINE')
      ? 'Pay Online \u2014 \u20B9' + total
      : 'Place Order \u2014 \u20B9' + total;
  },

  _getApiBase: function () {
    if (window.API_BASE_URL) return window.API_BASE_URL;
    if (window.location.port === '3000' || (!window.location.port && window.location.hostname !== 'localhost')) {
      return '';
    }
    return 'http://localhost:3000';
  }
};
