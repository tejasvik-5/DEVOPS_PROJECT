/* ==========================================================================
   BHUKH LAGI — Stalls Browser (stalls.js)
   ========================================================================== */

var StallsPage = {
  render: function (container) {
    var stalls = StallData.getAllStalls();
    var categories = ['All'].concat(StallData.getCategories());

    // Sort: open first, then closed
    stalls.sort(function (a, b) {
      if (a.isOpen && !b.isOpen) return -1;
      if (!a.isOpen && b.isOpen) return 1;
      return 0;
    });

    var html = '<div class="container">' +
      '<div class="page-header">' +
        '<h1 class="page-header__title">Food Stalls</h1>' +
        '<p class="page-header__subtitle">Where should we eat today?</p>' +
      '</div>';

    // Filter pills
    html += '<div class="filter-pills" id="stall-filters">';
    categories.forEach(function (cat, i) {
      html += '<button class="filter-pill' + (i === 0 ? ' active' : '') + '" data-filter="' + cat + '">' + DOM.escapeHTML(cat) + '</button>';
    });
    html += '</div>';

    // Stall grid
    html += '<div id="stalls-grid" style="margin-top:var(--space-lg);">' + StallCard.renderGrid(stalls) + '</div>';

    html += '</div>';

    container.innerHTML = html;

    // Filter logic
    DOM.on(container, 'click', '.filter-pill', function (e, btn) {
      container.querySelectorAll('.filter-pill').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      var filtered = filter === 'All'
        ? stalls
        : stalls.filter(function (s) { return s.category.indexOf(filter) !== -1; });

      document.getElementById('stalls-grid').innerHTML = StallCard.renderGrid(filtered);
    });
  }
};
