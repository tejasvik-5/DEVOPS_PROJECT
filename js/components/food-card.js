/* ==========================================================================
   BHUKH LAGI — Food Item Card (food-card.js)
   Compact menu item cards with small category vector icons.
   No <img> tags, no image wrappers, no reserved aspect-ratio space.
   ========================================================================== */

var FoodCard = {
  /* ── Compact Vector Icons for Food Categories ────────────────────────── */
  _icons: {
    dosa: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M8 44C18 48 46 48 56 44" stroke="#567C8D" stroke-width="2"/>' +
      '<path d="M12 40L44 20C48 17 54 21 51 26L21 44C16 47 10 44 12 40Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M22 34L26 38" stroke="#E8B931" stroke-width="2"/>' +
      '<path d="M31 29L35 33" stroke="#E8B931" stroke-width="2"/>' +
      '<ellipse cx="46" cy="42" rx="8" ry="4" fill="#FFFFFF" stroke="#567C8D" stroke-width="1.8"/>' +
      '<circle cx="46" cy="42" r="1.5" fill="#E8B931"/>' +
      '<path d="M28 16Q30 11 28 8" stroke="#567C8D" stroke-width="1.5" opacity="0.6"/>' +
    '</svg>',

    burger: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 26C14 16 22 13 32 13C42 13 50 16 50 26Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<circle cx="28" cy="19" r="1.2" fill="#E8B931"/>' +
      '<circle cx="36" cy="18" r="1.2" fill="#E8B931"/>' +
      '<path d="M12 28Q22 25 32 28Q42 31 52 28" stroke="#567C8D" stroke-width="2.5"/>' +
      '<path d="M14 32H50L44 38L38 32" fill="#E8B931" stroke="#E8B931" stroke-width="1.5"/>' +
      '<rect x="14" y="34" width="36" height="7" rx="3.5" fill="#2F4156" stroke="#2F4156" stroke-width="1.5"/>' +
      '<path d="M16 44C16 49 22 51 32 51C42 51 48 49 48 44Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
    '</svg>',

    pizza: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M16 16C26 12 40 12 50 18" stroke="#2F4156" stroke-width="2.5"/>' +
      '<path d="M16 16L32 52L50 18C40 13 26 13 16 16Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M30 46Q32 54 34 46" stroke="#E8B931" stroke-width="2"/>' +
      '<circle cx="32" cy="26" r="3" fill="#E8B931" stroke="#2F4156" stroke-width="1.5"/>' +
      '<circle cx="26" cy="34" r="2.5" fill="#567C8D" stroke="#2F4156" stroke-width="1.5"/>' +
      '<circle cx="38" cy="35" r="2.5" fill="#567C8D" stroke="#2F4156" stroke-width="1.5"/>' +
    '</svg>',

    pasta: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<ellipse cx="32" cy="44" rx="22" ry="7" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M18 42Q22 34 28 39Q34 44 40 37Q46 42 46 43" stroke="#E8B931" stroke-width="2.5"/>' +
      '<path d="M22 38Q26 31 32 36Q38 41 43 35" stroke="#E8B931" stroke-width="2"/>' +
      '<path d="M30 11V26M33 11V26M36 11V26" stroke="#567C8D" stroke-width="1.5"/>' +
      '<line x1="33" y1="21" x2="33" y2="34" stroke="#567C8D" stroke-width="2"/>' +
    '</svg>',

    sandwich: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 44L44 12L52 38L18 52Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<line x1="15" y1="48" x2="48" y2="16" stroke="#567C8D" stroke-width="2"/>' +
      '<path d="M16 46Q30 33 46 22" stroke="#E8B931" stroke-width="3"/>' +
      '<line x1="26" y1="36" x2="32" y2="42" stroke="#2F4156" stroke-width="1.5" opacity="0.6"/>' +
    '</svg>',

    beverage: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<ellipse cx="32" cy="48" rx="18" ry="4" stroke="#567C8D" stroke-width="2"/>' +
      '<path d="M20 27L23 45C23 47 27 48 32 48C37 48 41 47 41 45L44 27Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M42 30C47 30 48 38 41 40" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M21 33H43" stroke="#E8B931" stroke-width="2"/>' +
      '<path d="M30 21Q32 15 30 10" stroke="#567C8D" stroke-width="1.8" opacity="0.7"/>' +
    '</svg>',

    thali: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="32" cy="32" r="22" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<circle cx="32" cy="21" r="4.5" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.5"/>' +
      '<circle cx="41" cy="33" r="4.5" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.5"/>' +
      '<circle cx="35" cy="43" r="4" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.5"/>' +
      '<ellipse cx="23" cy="34" rx="5" ry="7" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.5"/>' +
    '</svg>',

    rice: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 34C14 48 24 50 32 50C40 50 50 48 50 34Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<ellipse cx="32" cy="34" rx="18" ry="4" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.8"/>' +
      '<path d="M18 34C20 26 26 23 32 23C38 23 44 26 46 34" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.8"/>' +
      '<circle cx="30" cy="28" r="1.2" fill="#E8B931"/>' +
      '<circle cx="35" cy="27" r="1.2" fill="#E8B931"/>' +
      '<path d="M30 17Q32 12 30 8" stroke="#567C8D" stroke-width="1.5" opacity="0.6"/>' +
    '</svg>',

    curry: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M16 32C16 46 23 48 32 48C41 48 48 46 48 32Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<ellipse cx="32" cy="32" rx="16" ry="4" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.8"/>' +
      '<path d="M14 31C10 31 10 36 14 36" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M50 31C54 31 54 36 50 36" stroke="#2F4156" stroke-width="2"/>' +
      '<circle cx="32" cy="32" r="2.5" fill="#E8B931"/>' +
      '<path d="M30 22Q32 16 30 11" stroke="#567C8D" stroke-width="1.5" opacity="0.6"/>' +
    '</svg>',

    bread: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<ellipse cx="30" cy="38" rx="20" ry="10" fill="#EDE6DF" stroke="#2F4156" stroke-width="2"/>' +
      '<ellipse cx="34" cy="32" rx="19" ry="9" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<circle cx="30" cy="31" r="1.5" fill="#E8B931"/>' +
      '<circle cx="38" cy="30" r="1.5" fill="#E8B931"/>' +
      '<path d="M28 33Q34 30 40 33" stroke="#E8B931" stroke-width="2" opacity="0.8"/>' +
    '</svg>',

    chinese: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<ellipse cx="32" cy="44" rx="22" ry="7" fill="#EDE6DF" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M10 44V38C10 38 20 34 32 34C44 34 54 38 54 38V44" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M27 34C27 28 32 26 32 26C32 26 37 28 37 34Z" fill="#FFFFFF" stroke="#2F4156" stroke-width="1.5"/>' +
      '<line x1="32" y1="26" x2="32" y2="33" stroke="#567C8D" stroke-width="1.2"/>' +
      '<circle cx="32" cy="27" r="1" fill="#E8B931"/>' +
      '<path d="M32 19Q34 14 32 9" stroke="#567C8D" stroke-width="1.5" opacity="0.6"/>' +
    '</svg>',

    snack: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M16 44L28 20L44 42C44 42 30 47 16 44Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M18 43Q30 46 42 41" stroke="#E8B931" stroke-width="2.5"/>' +
      '<ellipse cx="46" cy="38" rx="7" ry="3.5" fill="#FFFFFF" stroke="#567C8D" stroke-width="1.8"/>' +
      '<circle cx="46" cy="38" r="1.5" fill="#E8B931"/>' +
    '</svg>',

    dessert: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M20 34L23 48H41L44 34Z" fill="#EDE6DF" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M18 34C18 26 24 22 32 20C40 22 46 26 46 34Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<circle cx="32" cy="18" r="3" fill="#E8B931" stroke="#2F4156" stroke-width="1.5"/>' +
      '<circle cx="37" cy="26" r="1" fill="#E8B931"/>' +
    '</svg>',

    dish: '<svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
      '<ellipse cx="32" cy="44" rx="22" ry="5" fill="#EDE6DF" stroke="#2F4156" stroke-width="2"/>' +
      '<path d="M15 42C15 26 23 21 32 21C41 21 49 26 49 42Z" fill="#FDF6E3" stroke="#2F4156" stroke-width="2"/>' +
      '<circle cx="32" cy="18" r="3" fill="#E8B931" stroke="#2F4156" stroke-width="1.8"/>' +
      '<path d="M30 14Q32 10 30 6" stroke="#567C8D" stroke-width="1.5" opacity="0.6"/>' +
    '</svg>'
  },

  /* ── Category Classification for Menu Items ─────────────────────────── */
  _getCategoryMeta: function (item, categoryName) {
    var name = (item.name || '').toLowerCase();
    var extra = ((item.subBrand || '') + ' ' + (item.category || '') + ' ' + (categoryName || '')).toLowerCase();
    var full = name + ' ' + extra;

    // 1. Check specific item name keywords first
    if (/dosa|idli|vada|uttapam|sambhar|\brava\b/.test(name)) return { id: 'dosa', label: 'South Indian' };
    if (/burger|patty|whopper|aloo bechara/.test(name)) return { id: 'burger', label: 'Burger' };
    if (/pizza|calzone/.test(name)) return { id: 'pizza', label: 'Pizza' };
    if (/pasta|pass-tha|penne|macaroni|spaghetti/.test(name)) return { id: 'pasta', label: 'Pasta' };
    if (/sandwich|wrap|kathi|\brolls?\b|frankie|panini|\bsub\b/.test(name)) return { id: 'sandwich', label: 'Sandwich & Wrap' };
    if (/chai|\btea\b|coffee|latte|cappuccino|espresso|frappe|\bbrew\b|shake|cooler|mojito|lemonade|\blassi\b|chaas|pepsi|mirinda|kulhad/.test(name)) return { id: 'beverage', label: 'Chai & Beverage' };
    if (/biryani|fried rice|pulao|khichdi|chawal|\brice\b/.test(name)) return { id: 'rice', label: 'Rice & Biryani' };
    if (/thali|platter|combo|executive|deluxe/.test(name)) return { id: 'thali', label: 'Thali & Meal' };
    if (/curry|gravy|paneer|\bdal\b|sabzi|makhani|chole|rajma|kadhi|korma|kofta|butter chicken|egg curry/.test(name)) return { id: 'curry', label: 'Curry & Gravy' };
    if (/roti|naan|paratha|kulcha|bhature|poori|\bbreads?\b|breadstick/.test(name)) return { id: 'bread', label: 'Tandoor & Breads' };
    if (/momo|dimsum|dumpling|noodle|chowmein|manchurian|spring roll|chilli potato|chili potato/.test(name)) return { id: 'chinese', label: 'Momos & Chinese' };
    if (/samosa|pakoda|fries|fried|\bfry\b|nugget|finger|chaat|tikki|snack|bites|maggi|\bcorn\b|oats|popcorn/.test(name)) return { id: 'snack', label: 'Snacks & Sides' };
    if (/cake|dessert|pastry|brownie|ice cream|sweet|waffle|muffin|lava|mousse|gulab jamun|cheesecake/.test(name)) return { id: 'dessert', label: 'Dessert & Bakery' };

    // 2. If name wasn't specific enough, check category/section/subBrand context
    if (/south indian|dosa/.test(full)) return { id: 'dosa', label: 'South Indian' };
    if (/burger/.test(full)) return { id: 'burger', label: 'Burger' };
    if (/pizza/.test(full)) return { id: 'pizza', label: 'Pizza' };
    if (/pasta|pass-tha/.test(full)) return { id: 'pasta', label: 'Pasta' };
    if (/sandwich|wrap|in b\/w breads|wrap ur worries/.test(full)) return { id: 'sandwich', label: 'Sandwich & Wrap' };
    if (/chai|beverage|drink|\btea\b|coffee/.test(full)) return { id: 'beverage', label: 'Chai & Beverage' };
    if (/thali|meal/.test(full)) return { id: 'thali', label: 'Thali & Meal' };
    if (/rice|biryani/.test(full)) return { id: 'rice', label: 'Rice & Biryani' };
    if (/curry|gravy|north indian/.test(full)) return { id: 'curry', label: 'Curry & Gravy' };
    if (/bread|roti|paratha/.test(full)) return { id: 'bread', label: 'Tandoor & Breads' };
    if (/chinese|momo/.test(full)) return { id: 'chinese', label: 'Momos & Chinese' };
    if (/fry high|snack|quick bites|sides/.test(full)) return { id: 'snack', label: 'Snacks & Sides' };
    if (/dessert|bakery/.test(full)) return { id: 'dessert', label: 'Dessert & Bakery' };

    return { id: 'dish', label: 'Campus Special' };
  },

  /* ── Compact Menu Item Card Renderer ────────────────────────────────── */
  render: function (item, stallId, stallName, categoryName) {
    var isAvailable =
  item.available !== false &&
  Store.isItemAvailable(stallId, item.id) !== false;
    var cardClass = 'food-card' + (isAvailable ? '' : ' food-card--unavailable');
    var qty = Store.getCartItemQty(item.id);

    var meta = FoodCard._getCategoryMeta(item, categoryName);
    var svgIcon = FoodCard._icons[meta.id] || FoodCard._icons.dish;

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
      actionHtml = '<button class="add-btn" disabled aria-disabled="true">Unavailable</button>';
    }

    var unavailableBanner = !isAvailable ? '<div class="food-card__unavailable-banner">Currently unavailable</div>' : '';

    return '<div class="' + cardClass + '" data-item-id="' + item.id + '">' +
      '<div class="food-card__top">' +
        '<div class="food-card__meta-badges">' +
          '<span class="veg-indicator ' + vegClass + '"><span class="veg-indicator__dot"></span> ' + vegLabel + '</span>' +
          '<span class="food-card__category-tag">' + DOM.escapeHTML(meta.label) + '</span>' +
        '</div>' +
        '<div class="food-card__icon-badge food-card__icon-badge--' + meta.id + '" aria-hidden="true">' +
          svgIcon +
        '</div>' +
      '</div>' +
      '<h4 class="food-card__name">' + DOM.escapeHTML(item.name) + '</h4>' +
      unavailableBanner +
      '<div class="food-card__footer">' +
        '<div class="food-card__pricing">' +
          '<span class="food-card__price">\u20B9' + item.price + '</span>' +
          '<span class="food-card__prep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + item.prepTime + ' min</span>' +
        '</div>' +
        '<div class="food-card__action add-btn-wrap">' + actionHtml + '</div>' +
      '</div>' +
    '</div>';
  },

  renderGrid: function (items, stallId, stallName, categoryName) {
    if (items.length === 0) return '';
    var html = '<div class="grid grid--2">';
    items.forEach(function (item) {
      html += FoodCard.render(item, stallId, stallName, categoryName);
    });
    return html + '</div>';
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FoodCard;
}

