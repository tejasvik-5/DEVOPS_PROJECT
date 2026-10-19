/* ==========================================================================
   BHUKH LAGI — Stall Card (stall-card.js)
   ========================================================================== */

var StallCard = {
  render: function (stall) {
    var statusClass = stall.isOpen ? 'stall-card__status-dot--open' : 'stall-card__status-dot--closed';
    var statusText = stall.isOpen ? 'Open Now' : 'Closed';
    var cardClass = 'stall-card' + (stall.isOpen ? '' : ' stall-card--closed');

    var imageHtml;
    if (stall.image) {
      imageHtml = '<img src="' + stall.image + '" alt="' + DOM.escapeHTML(stall.name) + '" loading="lazy">';
    } else {
      imageHtml = '<div class="stall-card__image-placeholder">' +
        '<svg viewBox="0 0 80 80" width="64" height="64"><path d="M15,35 Q40,10 65,35" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15" y1="35" x2="15" y2="60" stroke="currentColor" stroke-width="2"/><line x1="65" y1="35" x2="65" y2="60" stroke="currentColor" stroke-width="2"/><line x1="15" y1="60" x2="65" y2="60" stroke="currentColor" stroke-width="2"/><rect x="30" y="42" width="20" height="18" fill="none" stroke="currentColor" stroke-width="2"/></svg>' +
      '</div>';
    }

    var cats = stall.category.map(function (c) { return DOM.escapeHTML(c); }).join(' \u2022 ');
    var prepTime = stall.avgPrepTime ? stall.avgPrepTime.min + '\u2013' + stall.avgPrepTime.max + ' min' : '';

    // Popular items preview
    var popularHtml = '';
    if (stall.popularItems && stall.popularItems.length > 0) {
      var names = stall.popularItems.slice(0, 3).map(function (id) {
        var item = StallData.getItem(id);
        return item ? item.name : '';
      }).filter(Boolean);
      if (names.length) {
        popularHtml = '<p class="stall-card__popular"><strong>Popular:</strong> ' + names.join(', ') + '</p>';
      }
    }

    return '<div class="' + cardClass + ' animate-fade-in-up" data-stall-id="' + stall.id + '" onclick="Router.go(\'stall/' + stall.id + '\')">' +
      '<div class="stall-card__image">' +
        imageHtml +
        '<span class="stall-card__status-dot ' + statusClass + '"><span class="dot"></span>' + statusText + '</span>' +
      '</div>' +
      '<div class="stall-card__body">' +
        '<h3 class="stall-card__name">' + DOM.escapeHTML(stall.name) + '</h3>' +
        '<div class="stall-card__meta">' +
          '<span class="stall-card__category">' + cats + '</span>' +
          (prepTime ? '<span class="stall-card__prep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + prepTime + '</span>' : '') +
        '</div>' +
        popularHtml +
      '</div>' +
    '</div>';
  },

  renderGrid: function (stalls, columns) {
    columns = columns || 3;
    if (stalls.length === 0) {
      return EmptyState.render('stallClosed', 'Go Home', 'home');
    }
    var html = '<div class="grid grid--' + columns + ' stagger">';
    stalls.forEach(function (stall) {
      html += StallCard.render(stall);
    });
    return html + '</div>';
  }
};
