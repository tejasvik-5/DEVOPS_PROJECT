/* ==========================================================================
   BHUKH LAGI — Stall Detail / Menu Page (stall-detail.js)
   ========================================================================== */

var StallDetailPage = {
  render: function (container, stallId) {
    var stall = StallData.getStall(stallId);
    if (!stall) {
      container.innerHTML = EmptyState.render('stallClosed', 'Browse Stalls', 'stalls');
      return;
    }

    var menu = StallData.getStallMenu(stallId);
    var menuCategories = Object.keys(menu);
    var cats = stall.category.join(' \u2022 ');
    var statusClass = stall.isOpen ? 'badge--preparing' : 'badge--cancelled';
    var statusText = stall.isOpen ? 'Open Now' : 'Closed';

    var html = '';

    // Hero image
    html += '<div class="stall-hero">';
    if (stall.image) {
      html += '<img src="' + stall.image + '" alt="' + DOM.escapeHTML(stall.name) + '">';
    } else {
      html += '<div class="stall-hero__placeholder"><svg viewBox="0 0 120 120" width="96" height="96"><path d="M20,50 Q60,10 100,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="20" y1="50" x2="20" y2="90" stroke="currentColor" stroke-width="2"/><line x1="100" y1="50" x2="100" y2="90" stroke="currentColor" stroke-width="2"/><line x1="20" y1="90" x2="100" y2="90" stroke="currentColor" stroke-width="2"/></svg></div>';
    }
    html += '<a href="#stalls" class="stall-hero__back" aria-label="Back to stalls"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></a>';
    html += '</div>';

    // Stall info
    html += '<div class="stall-info">' +
      '<h1 class="stall-info__name">' + DOM.escapeHTML(stall.name) + '</h1>' +
      '<div class="stall-info__meta">' +
        '<span class="badge ' + statusClass + '"><span class="badge__dot"></span>' + statusText + '</span>' +
        '<span class="text-sm text-muted">' + cats + '</span>' +
        '<span class="text-sm text-muted"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-1px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ' + stall.avgPrepTime.min + '\u2013' + stall.avgPrepTime.max + ' min</span>' +
      '</div>' +
    '</div>';

    // Sticky category tabs
    if (menuCategories.length > 1) {
      html += '<div class="stall-categories"><div class="filter-pills">';
      menuCategories.forEach(function (cat, i) {
        html += '<button class="filter-pill' + (i === 0 ? ' active' : '') + '" data-cat="' + cat + '">' + DOM.escapeHTML(cat) + '</button>';
      });
      html += '</div></div>';
    }

    // Menu sections
    html += '<div class="container" id="stall-menu-container">';
    menuCategories.forEach(function (cat) {
      html += '<section class="stall-menu-section" id="menu-' + cat.replace(/\s+/g, '-').toLowerCase() + '">' +
        '<h3 class="stall-menu-section__title">' + DOM.escapeHTML(cat) + '</h3>' +
        FoodCard.renderGrid(menu[cat], stallId, stall.name) +
      '</section>';
    });
    html += '</div>';

    container.innerHTML = html;

    // Quantity control listeners
    QuantityControl.initListeners(container);

    // Category tab scrolling
    DOM.on(container, 'click', '.stall-categories .filter-pill', function (e, btn) {
      container.querySelectorAll('.stall-categories .filter-pill').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-cat');
      var section = document.getElementById('menu-' + cat.replace(/\s+/g, '-').toLowerCase());
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Show/update floating cart bar
    var cart = Store.getCart();
    var floatingCart = document.getElementById('floating-cart');
    if (floatingCart && cart.stallId === stallId && cart.items.length > 0) {
      floatingCart.style.display = 'block';
      setTimeout(function () { floatingCart.classList.add('visible'); }, 50);
    }
  }
};
