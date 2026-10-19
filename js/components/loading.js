/* ==========================================================================
   BHUKH LAGI — Loading & Skeleton (loading.js)
   ========================================================================== */

var Loading = {
  showScreen: function () {
    var screen = document.getElementById('loading-screen');
    if (screen) {
      screen.style.display = 'flex';
      screen.classList.remove('hidden');
      var msg = screen.querySelector('.loading-screen__message');
      if (msg) msg.textContent = BRAND.getRandomLoadingMessage();
    }
  },

  hideScreen: function () {
    var screen = document.getElementById('loading-screen');
    if (screen) {
      screen.classList.add('hidden');
      setTimeout(function () { screen.style.display = 'none'; }, 500);
    }
  },

  stallCardSkeleton: function () {
    return '<div class="skeleton-stall-card">' +
      '<div class="skeleton-stall-card__image skeleton"></div>' +
      '<div class="skeleton-stall-card__body">' +
        '<div class="skeleton-stall-card__title skeleton"></div>' +
        '<div class="skeleton-stall-card__meta skeleton"></div>' +
        '<div class="skeleton-stall-card__popular skeleton"></div>' +
      '</div></div>';
  },

  foodCardSkeleton: function () {
    return '<div class="skeleton-food-card">' +
      '<div class="skeleton-food-card__image skeleton"></div>' +
      '<div class="skeleton-food-card__body">' +
        '<div class="skeleton-food-card__name skeleton"></div>' +
        '<div class="skeleton-food-card__price skeleton"></div>' +
        '<div class="skeleton-food-card__btn skeleton"></div>' +
      '</div></div>';
  },

  stallGridSkeleton: function (count) {
    count = count || 6;
    var html = '<div class="grid grid--3 stagger">';
    for (var i = 0; i < count; i++) {
      html += this.stallCardSkeleton();
    }
    return html + '</div>';
  },

  foodGridSkeleton: function (count) {
    count = count || 4;
    var html = '<div class="grid grid--2 stagger">';
    for (var i = 0; i < count; i++) {
      html += this.foodCardSkeleton();
    }
    return html + '</div>';
  }
};
