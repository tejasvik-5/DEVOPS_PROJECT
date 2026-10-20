/* ==========================================================================
   BHUKH LAGI — Cart Component (cart.js)
   Cart item rendering and logic.
   ========================================================================== */

var CartComponent = {
  renderItem: function (item) {
    var vegClass = item.veg ? 'veg-indicator--veg' : 'veg-indicator--nonveg';
    var subtotal = item.price * item.qty;

  

    return '<div class="cart-item" data-item-id="' + item.id + '">' +
   
      '<div class="cart-item__details">' +
        '<p class="cart-item__name">' + DOM.escapeHTML(item.name) + '</p>' +
        '<div class="cart-item__meta">' +
          '<span class="veg-indicator ' + vegClass + '"><span class="veg-indicator__dot"></span></span>' +
          '<span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ' + item.prepTime + ' min</span>' +
        '</div>' +
      '</div>' +
      '<span class="cart-item__price">\u20B9' + subtotal + '</span>' +
      '<div class="qty-control" style="margin:0 var(--space-xs);">' +
        '<button class="qty-control__btn cart-qty-minus" data-item-id="' + item.id + '" aria-label="Decrease">&minus;</button>' +
        '<span class="qty-control__count">' + item.qty + '</span>' +
        '<button class="qty-control__btn cart-qty-plus" data-item-id="' + item.id + '" aria-label="Increase">+</button>' +
      '</div>' +
      '<button class="cart-item__remove cart-remove-btn" data-item-id="' + item.id + '" aria-label="Remove item">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>' +
      '</button>' +
    '</div>';
  },

  renderSummary: function (cart, selectedPaymentMethod) {
    var subtotal = cart.items.reduce(function (s, i) { return s + (i.price * i.qty); }, 0);
    var maxPrep = cart.items.reduce(function (m, i) { return Math.max(m, i.prepTime || 10); }, 0);
    var paymentMethod = 'PAY_AT_COUNTER';
var btnLabel = 'Place Order \u2014 \u20B9' + subtotal;

    return '<div class="cart-page__summary">' +
      '<div class="cart-page__summary-row"><span>Subtotal</span><span>\u20B9' + subtotal + '</span></div>' +
      '<div class="cart-page__summary-row"><span>Estimated prep time</span><span>' + maxPrep + '\u2013' + (maxPrep + 5) + ' min</span></div>' +
      '<div class="cart-page__summary-row cart-page__summary-row--total"><span>Total</span><span>\u20B9' + subtotal + '</span></div>' +
    '</div>' +

    '<div class="payment-method-group">' +
      '<div class="payment-method-group__title">Payment Method</div>' +

     '<label class="payment-option is-selected" id="payment-option-counter">' +
  '<input type="radio" name="payment_method" value="PAY_AT_COUNTER" checked>' +
  '<div class="payment-option__body">' +
    '<div class="payment-option__title-row">' +
      '<span class="payment-option__label">Pay at Counter</span>' +
    '</div>' +
    '<div class="payment-option__desc">Pay cash or UPI at the counter when picking up</div>' +
  '</div>' +
'</label>' +  

     
    '</div>' +

    '<div style="margin-top:var(--space-lg);">' +
      '<button class="btn btn--primary btn--lg btn--full" id="place-order-btn">' + btnLabel + '</button>' +
    '</div>';
  }
};
