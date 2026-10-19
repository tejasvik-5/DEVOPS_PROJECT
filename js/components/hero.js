/* ==========================================================================
   BHUKH LAGI — Hero Section (hero.js)
   ========================================================================== */

var Hero = {
  doodles: {
    pizza: '<svg viewBox="0 0 50 50" width="50" height="50"><path d="M25,5 L45,42 L5,42 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="20" cy="30" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="25" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="25" cy="35" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    chai: '<svg viewBox="0 0 50 50" width="50" height="50"><path d="M12,18 L12,40 Q12,44 16,44 L34,44 Q38,44 38,40 L38,18" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="18" x2="40" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M38,24 Q46,24 46,31 Q46,38 38,38" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20,12 Q22,6 24,12" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/><path d="M28,10 Q30,4 32,10" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/></svg>',
    stars: '<svg viewBox="0 0 50 50" width="50" height="50"><path d="M25,5 L28,18 L42,18 L31,26 L34,40 L25,32 L16,40 L19,26 L8,18 L22,18 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    momos: '<svg viewBox="0 0 50 50" width="50" height="50"><ellipse cx="25" cy="35" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10,35 Q10,20 25,15 Q40,20 40,35" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18,25 Q25,20 32,25" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M20,10 Q22,5 24,10" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5" stroke-linecap="round"/></svg>'
  },

  render: function () {
    return '<section class="hero" id="hero-section">' +
      '<div class="hero__doodle hero__doodle--1">' + this.doodles.pizza + '</div>' +
      '<div class="hero__doodle hero__doodle--2">' + this.doodles.chai + '</div>' +
      '<div class="hero__doodle hero__doodle--3">' + this.doodles.momos + '</div>' +
      '<div class="hero__doodle hero__doodle--4">' + this.doodles.stars + '</div>' +
      '<div class="hero__inner">' +
        '<h1 class="hero__title">' + DOM.escapeHTML(BRAND.tagline) + '</h1>' +
        '<p class="hero__subtitle">' + DOM.escapeHTML(BRAND.copy.heroSubtitle) + '</p>' +
        '<div class="hero__search">' +
          '<svg class="hero__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' +
          '<input type="text" id="hero-search-input" class="hero__search-input" placeholder="Search for food, stalls..." aria-label="Search food and stalls" autocomplete="off">' +
          '<div id="hero-search-results" style="position:absolute;top:calc(100% + 8px);left:0;right:0;z-index:10;display:none;"></div>' +
        '</div>' +
      '</div>' +
    '</section>';
  },

  initSearch: function () {
    var input = document.getElementById('hero-search-input');
    var results = document.getElementById('hero-search-results');
    if (input && results) {
      Search.init(input, results, function () { input.value = ''; });
    }
  }
};
