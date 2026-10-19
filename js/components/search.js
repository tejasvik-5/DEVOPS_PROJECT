/* ==========================================================================
   BHUKH LAGI — Search (search.js)
   ========================================================================== */

var Search = {
  _timeout: null,

  init: function (inputEl, resultsContainer, onSelect) {
    var self = this;
    inputEl.addEventListener('input', function () {
      clearTimeout(self._timeout);
      var query = inputEl.value.trim();
      self._timeout = setTimeout(function () {
        self._search(query, resultsContainer, onSelect);
      }, 250);
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!inputEl.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
      }
    });

    // Close on Escape
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        inputEl.blur();
      }
    });
  },

  _search: function (query, container, onSelect) {
    if (!query || query.length < 2) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    var results = StallData.searchItems(query);
    var html = '';

    if (results.stalls.length === 0 && results.items.length === 0) {
      html = '<div class="search-results__empty">' + DOM.escapeHTML(BRAND.emptyStates.searchNoResults) + '</div>';
    } else {
      results.stalls.forEach(function (stall) {
        html += '<div class="search-results__item" data-type="stall" data-id="' + stall.id + '">' +
          '<div class="search-results__item-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v4H3z"/><path d="M3 7v13h18V7"/></svg></div>' +
          '<div><div class="search-results__item-name">' + DOM.escapeHTML(stall.name) + '</div>' +
          '<div class="search-results__item-type">' + stall.category.join(', ') + '</div></div></div>';
      });

      results.items.forEach(function (item) {
        html += '<div class="search-results__item" data-type="item" data-id="' + item.id + '" data-stall="' + item.stallId + '">' +
          '<div class="search-results__item-icon">' +
            '<span class="veg-indicator__dot" style="border-color:' + (item.veg ? 'var(--veg)' : 'var(--nonveg)') + ';width:10px;height:10px;border-radius:2px;border:1.5px solid;display:flex;align-items:center;justify-content:center;">' +
              '<span style="width:5px;height:5px;border-radius:50%;background:' + (item.veg ? 'var(--veg)' : 'var(--nonveg)') + ';"></span>' +
            '</span>' +
          '</div>' +
          '<div><div class="search-results__item-name">' + DOM.escapeHTML(item.name) + '</div>' +
          '<div class="search-results__item-type">' + DOM.escapeHTML(item.stallName) + ' \u2022 \u20B9' + item.price + '</div></div></div>';
      });
    }

    container.innerHTML = '<div class="search-results">' + html + '</div>';
    container.style.display = 'block';

    // Click handlers
    DOM.on(container, 'click', '.search-results__item', function (e, target) {
      var type = target.getAttribute('data-type');
      var id = target.getAttribute('data-id');
      if (type === 'stall') {
        Router.go('stall/' + id);
      } else if (type === 'item') {
        var stallId = target.getAttribute('data-stall');
        Router.go('stall/' + stallId);
      }
      container.innerHTML = '';
      container.style.display = 'none';
      if (onSelect) onSelect();
    });
  }
};
