/* ==========================================================================
   BHUKH LAGI — Empty States (empty-state.js)
   ========================================================================== */

var EmptyState = {
  doodles: {
    cart: '<svg viewBox="0 0 80 80" width="80" height="80"><path d="M20,60 L25,25 L55,25 L60,60 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="35" x2="30" y2="55" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="40" y1="35" x2="40" y2="55" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="50" y1="35" x2="50" y2="55" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="15" y="60" width="50" height="5" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    orders: '<svg viewBox="0 0 80 80" width="80" height="80"><path d="M28,15 Q25,15 25,18 L25,65 Q25,68 28,68 L52,68 Q55,68 55,65 L55,18 Q55,15 52,15 Z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="32" y1="28" x2="48" y2="28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="32" y1="36" x2="45" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="32" y1="44" x2="42" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="40" cy="57" r="4" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    stall: '<svg viewBox="0 0 80 80" width="80" height="80"><path d="M15,35 Q40,10 65,35" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="15" y1="35" x2="15" y2="65" stroke="currentColor" stroke-width="2"/><line x1="65" y1="35" x2="65" y2="65" stroke="currentColor" stroke-width="2"/><line x1="15" y1="65" x2="65" y2="65" stroke="currentColor" stroke-width="2"/><rect x="30" y="45" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"/><line x1="40" y1="45" x2="40" y2="65" stroke="currentColor" stroke-width="2"/></svg>',
    search: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="35" cy="35" r="18" fill="none" stroke="currentColor" stroke-width="2"/><line x1="48" y1="48" x2="62" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="28" y1="35" x2="42" y2="35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  },

  render: function (type, actionText, actionHash) {
    var message = BRAND.emptyStates[type] || BRAND.emptyStates.cart;
    var doodleKey = type === 'noActiveOrders' ? 'orders' : (type === 'stallClosed' ? 'stall' : (type === 'searchNoResults' ? 'search' : type));
    var doodle = this.doodles[doodleKey] || this.doodles.cart;

    var html = '<div class="empty-state animate-fade-in-up">' +
      '<div class="empty-state__doodle">' + doodle + '</div>' +
      '<p class="empty-state__title">' + DOM.escapeHTML(message) + '</p>';

    if (actionText && actionHash) {
      html += '<a href="#' + actionHash + '" class="btn btn--primary btn--pill">' + DOM.escapeHTML(actionText) + '</a>';
    }

    return html + '</div>';
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmptyState;
}

