/* ==========================================================================
   BHUKH LAGI — Brand Configuration (brand.js)
   Single source of truth for all brand identity strings and assets.
   ========================================================================== */

const BRAND = {
  name: 'BHUKH LAGI',
  tagline: 'Aaj kya khaoge?',
  shortName: 'BL',
  description: 'Your campus food-court ordering app.',

  logo: {
    full: 'assets/svg/logo-full.svg',
    compact: 'assets/svg/logo-compact.svg',
    icon: 'assets/svg/logo-icon.svg',
  },

  loadingMessages: [
    'Checking what\u2019s cooking\u2026',
    'Finding your next craving\u2026',
    'Getting the stall menu\u2026',
    'Almost there\u2026',
  ],

  emptyStates: {
    cart: 'Your cart is looking suspiciously empty.',
    orders: 'No cravings recorded yet.',
    stallClosed: 'This stall is taking a tiny break.',
    searchNoResults: 'Nothing matched. Try something else?',
    noActiveOrders: 'No active orders right now.',
  },

  streakMessages: {
    0: 'Start your streak today!',
    1: 'Just getting started\u2026',
    2: 'Just getting started\u2026',
    3: 'Keep it going! \uD83D\uDD25',
    4: 'Keep it going! \uD83D\uDD25',
    5: 'On fire this week!',
    6: 'On fire this week!',
    7: 'Perfect week! Legend. \uD83C\uDFC6',
  },

  orderPrefix: 'BL',

  stallSwitchConfirm: {
    title: 'Switch stall?',
    message: function (currentStall) {
      return 'You already have items from ' + currentStall + '. Starting a new cart will clear those items.';
    },
    confirmText: 'Start New Cart',
    cancelText: 'Cancel',
  },

  copy: {
    heroSubtitle: 'Your campus cravings, sorted.',
    payAtCounter: 'Pay at Counter',
    payAtCounterDetail: 'No online payment \u2014 pay directly at the stall counter when you pick up your order.',
  },

  getStreakMessage: function (count) {
    if (count >= 7) return this.streakMessages[7];
    return this.streakMessages[count] || this.streakMessages[0];
  },

  getRandomLoadingMessage: function () {
    var idx = Math.floor(Math.random() * this.loadingMessages.length);
    return this.loadingMessages[idx];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BRAND;
}
