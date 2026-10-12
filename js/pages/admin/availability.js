/* ==========================================================================
   BHUKH LAGI — Admin Availability (admin/availability.js)
   Stall open/close toggle and bulk item availability.
   ========================================================================== */

var AdminAvailability = {
  render: function (container) {
    var user = Store.getUser();
    var stallId = user.stallId;
    var stall = StallData.getStall(stallId);
    if (!stall) return;

    var isOpen = stall.isOpen;
    var hours = stall.operatingHours;

    var html = '<div class="admin-page-header">' +
      '<h1 class="admin-page-header__title">Availability</h1>' +
      '<p class="admin-page-header__subtitle">Control stall and item availability</p>' +
    '</div>';

    // Stall open/close card
    html += '<div class="avail-card">' +
      '<div class="avail-card__header">' +
        '<h3 class="avail-card__title">Stall Status</h3>' +
        '<label class="toggle">' +
          '<input type="checkbox" id="stall-open-toggle" ' + (isOpen ? 'checked' : '') + '>' +
          '<span class="toggle__track"></span>' +
          '<span class="toggle__thumb"></span>' +
        '</label>' +
      '</div>' +
      '<p style="font-size:var(--text-body-sm);color:var(--text-muted);margin-bottom:var(--space-md);">Your stall is currently <strong style="color:' + (isOpen ? 'var(--success)' : 'var(--cancelled)') + ';">' + (isOpen ? 'OPEN' : 'CLOSED') + '</strong></p>' +
      '<div class="avail-card__hours">' +
        '<span class="avail-card__hours-label">Operating Hours:</span>' +
        '<span style="font-weight:var(--weight-semi);color:var(--charcoal);">' + hours.open + ' \u2013 ' + hours.close + '</span>' +
      '</div>' +
    '</div>';

    // Bulk availability
    html += '<div class="avail-card">' +
      '<div class="avail-card__header">' +
        '<h3 class="avail-card__title">Bulk Item Controls</h3>' +
      '</div>' +
      '<p style="font-size:var(--text-body-sm);color:var(--text-muted);margin-bottom:var(--space-lg);">Quickly toggle all items at once.</p>' +
      '<div class="avail-card__bulk-actions">' +
        '<button class="btn btn--primary btn--sm" id="bulk-available-btn">Mark All Available</button>' +
        '<button class="btn btn--secondary btn--sm" id="bulk-unavailable-btn">Mark All Unavailable</button>' +
      '</div>' +
    '</div>';

    container.innerHTML = html;

    // Stall toggle
    document.getElementById('stall-open-toggle').addEventListener('change', function (e) {
      Store.setStallOverride(stallId, { isOpen: e.target.checked });
      Toast.info('Stall is now ' + (e.target.checked ? 'open' : 'closed'));
      AdminAvailability.render(container);
    });

    // Bulk available
    document.getElementById('bulk-available-btn').addEventListener('click', function () {
      var menu = stall.menu;
      Object.keys(menu).forEach(function (cat) {
        menu[cat].forEach(function (item) {
          var overrides = Store.getStallOverrides();
          if (!overrides[stallId]) overrides[stallId] = { items: {} };
          if (!overrides[stallId].items) overrides[stallId].items = {};
          overrides[stallId].items[item.id] = true;
          Store._set(Store.KEYS.STALL_OVERRIDES, overrides);
        });
      });
      Toast.success('All items marked available');
    });

    // Bulk unavailable
    document.getElementById('bulk-unavailable-btn').addEventListener('click', function () {
      var menu = stall.menu;
      Object.keys(menu).forEach(function (cat) {
        menu[cat].forEach(function (item) {
          var overrides = Store.getStallOverrides();
          if (!overrides[stallId]) overrides[stallId] = { items: {} };
          if (!overrides[stallId].items) overrides[stallId].items = {};
          overrides[stallId].items[item.id] = false;
          Store._set(Store.KEYS.STALL_OVERRIDES, overrides);
        });
      });
      Toast.warning('All items marked unavailable');
    });
  }
};
