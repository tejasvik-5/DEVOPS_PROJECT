/* ==========================================================================
   BHUKH LAGI — Quantity Control (quantity-control.js)
   Animated Add → [− N +] with stall-switch modal.
   ========================================================================== */

var QuantityControl = {
  render: function (itemId, qty, stallId, stallName) {
    return '<div class="qty-control" data-item-id="' + itemId + '">' +
      '<button class="qty-control__btn qty-minus" data-item-id="' + itemId + '" aria-label="Decrease quantity">&minus;</button>' +
      '<span class="qty-control__count">' + qty + '</span>' +
      '<button class="qty-control__btn qty-plus" data-item-id="' + itemId + '" data-stall-id="' + stallId + '" data-stall-name="' + DOM.escapeHTML(stallName) + '" aria-label="Increase quantity">+</button>' +
    '</div>';
  },

  /**
   * Initialize event delegation for add buttons and quantity controls.
   * Call once on a parent container.
   */
  initListeners: function (container) {
    // Add button click
    DOM.on(container, 'click', '.add-btn:not([disabled]), .qty-add-btn:not([disabled])', function (e, btn) {
      var itemId = btn.getAttribute('data-item-id');
      var stallId = btn.getAttribute('data-stall-id');
      var stallName = btn.getAttribute('data-stall-name');

      if (!itemId || !stallId) return;

      var itemData = StallData.getItem(itemId);
      if (!itemData) return;

      var result = Store.addToCart(stallId, stallName, itemData);

      if (result.conflict) {
        QuantityControl._showStallSwitch(result, btn);
      } else {
        QuantityControl._updateCardUI(itemId, stallId, stallName);
        Toast.success(itemData.name + ' added to cart');
      }
    });

    // Minus button
    DOM.on(container, 'click', '.qty-minus', function (e, btn) {
      var itemId = btn.getAttribute('data-item-id');
      var currentQty = Store.getCartItemQty(itemId);
      Store.updateCartItemQty(itemId, currentQty - 1);
      var cart = Store.getCart();
      QuantityControl._updateCardUI(itemId, cart.stallId, cart.stallName);
    });

    // Plus button
    DOM.on(container, 'click', '.qty-plus', function (e, btn) {
      var itemId = btn.getAttribute('data-item-id');
      var stallId = btn.getAttribute('data-stall-id');
      var stallName = btn.getAttribute('data-stall-name');
      var itemData = StallData.getItem(itemId);
      if (!itemData) return;

      var result = Store.addToCart(stallId, stallName, itemData);
      if (result.conflict) {
        QuantityControl._showStallSwitch(result, btn);
      } else {
        QuantityControl._updateCardUI(itemId, stallId, stallName);
      }
    });
  },

  _updateCardUI: function (itemId, stallId, stallName) {
    var qty = Store.getCartItemQty(itemId);
    var wrap = document.querySelector('.food-card[data-item-id="' + itemId + '"] .add-btn-wrap');
    if (!wrap) return;

    if (qty > 0) {
      wrap.innerHTML = QuantityControl.render(itemId, qty, stallId, stallName);
    } else {
      wrap.innerHTML = '<button class="add-btn" data-item-id="' + itemId + '" data-stall-id="' + stallId + '" data-stall-name="' + DOM.escapeHTML(stallName) + '">Add</button>';
    }
  },

  _showStallSwitch: function (conflict, triggerBtn) {
    var cfg = BRAND.stallSwitchConfirm;
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal">' +
      '<div class="modal__header">' +
        '<h3 class="modal__title">' + DOM.escapeHTML(cfg.title) + '</h3>' +
        '<button class="modal__close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="modal__body"><p>' + DOM.escapeHTML(cfg.message(conflict.currentStall)) + '</p></div>' +
      '<div class="modal__footer">' +
        '<button class="btn btn--secondary btn--sm modal-cancel">' + DOM.escapeHTML(cfg.cancelText) + '</button>' +
        '<button class="btn btn--accent btn--sm modal-confirm">' + DOM.escapeHTML(cfg.confirmText) + '</button>' +
      '</div>' +
    '</div>';

    document.body.appendChild(overlay);

    var close = function () {
      overlay.remove();
    };

    overlay.querySelector('.modal__close').addEventListener('click', close);
    overlay.querySelector('.modal-cancel').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    overlay.querySelector('.modal-confirm').addEventListener('click', function () {
      Store.forceAddToCart(conflict.pendingStallId, conflict.pendingStallName, conflict.pendingItem);
      Toast.info('Cart cleared. ' + conflict.pendingItem.name + ' added.');
      close();
      // Re-render the current page
      Router.resolve();
    });
  }
};
