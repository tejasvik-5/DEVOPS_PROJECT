/* ==========================================================================
   BHUKH LAGI — Food Item Card (food-card.js)
   ========================================================================== */

var FoodCard = {
  render: function (item, stallId, stallName) {
    var isAvailable = item.available !== false;
    var cardClass = 'food-card' + (isAvailable ? '' : ' food-card--unavailable');
    var qty = Store.getCartItemQty(item.id);

    var foodImg = item.image || (item.id ? 'assets/images/food/' + item.id + '.webp' : null) || (typeof HomePage !== 'undefined' && HomePage._getFoodImage ? HomePage._getFoodImage(item.name) : null);
    var imageHtml;
    if (foodImg) {
      imageHtml = '<img src="' + foodImg + '" alt="' + DOM.escapeHTML(item.name) + '" loading="lazy">';
    } else {
      imageHtml = '<div class="food-card__image-placeholder">' +
        '<svg viewBox="0 0 60 60" width="48" height="48"><ellipse cx="30" cy="40" rx="22" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10,40 Q10,25 30,18 Q50,25 50,40" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M22,12 Q24,6 26,12" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M32,10 Q34,4 36,10" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>' +
        '<span>' + DOM.escapeHTML(item.name) + '</span>' +
      '</div>';
    }

    var unavailableLabel = !isAvailable ? '<span class="food-card__unavailable-label">Currently unavailable</span>' : '';

    var vegClass = item.veg ? 'veg-indicator--veg' : 'veg-indicator--nonveg';
    var vegLabel = item.veg ? 'Veg' : 'Non-Veg';

    var actionHtml = '';
    if (isAvailable) {
      if (qty > 0) {
        actionHtml = QuantityControl.render(item.id, qty, stallId, stallName);
      } else {
        actionHtml = '<button class="add-btn" data-item-id="' + item.id + '" data-stall-id="' + stallId + '" data-stall-name="' + DOM.escapeHTML(stallName) + '">Add</button>';
      }
    } else {
      actionHtml = '<button class="add-btn" disabled>Unavailable</button>';
    }

    return '<div class="' + cardClass + '" data-item-id="' + item.id + '">' +
      '<div class="food-card__image">' + imageHtml + unavailableLabel + '</div>' +
      '<div class="food-card__body">' +
        '<div class="food-card__veg"><span class="veg-indicator ' + vegClass + '"><span class="veg-indicator__dot"></span> ' + vegLabel + '</span></div>' +
        '<h4 class="food-card__name">' + DOM.escapeHTML(item.name) + '</h4>' +
        '<div class="food-card__info">' +
          '<span class="food-card__price">\u20B9' + item.price + '</span>' +
          '<span class="food-card__prep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + item.prepTime + ' min</span>' +
        '</div>' +
        '<div class="food-card__action add-btn-wrap">' + actionHtml + '</div>' +
      '</div>' +
    '</div>';
  },

  renderGrid: function (items, stallId, stallName) {
    if (items.length === 0) return '';
    var html = '<div class="grid grid--2">';
    items.forEach(function (item) {
      html += FoodCard.render(item, stallId, stallName);
    });
    return html + '</div>';
  }
};
