/* ==========================================================================
   BHUKH LAGI — Admin Menu Management (admin/menu-mgmt.js)
   ========================================================================== */

var AdminMenuMgmt = {
  render: function (container) {
    var user = Store.getUser();
    var stallId = user.stallId;
    var stall = StallData.getStall(stallId);
    if (!stall) return;

    var menu = StallData.getStallMenu(stallId);
    var categories = Object.keys(menu);

    var html = '<div class="admin-page-header">' +
      '<h1 class="admin-page-header__title">Menu Management</h1>' +
      '<p class="admin-page-header__subtitle">Toggle item availability for ' + DOM.escapeHTML(stall.name) + '</p>' +
    '</div>';

    categories.forEach(function (cat) {
      html += '<div class="admin-menu-section">' +
        '<h3 class="admin-menu-section__title">' + DOM.escapeHTML(cat) + ' (' + menu[cat].length + ')</h3>';

      menu[cat].forEach(function (item) {
        var isAvail = item.available !== false;
        var vegClass = item.veg ? 'badge--veg' : 'badge--nonveg';
        var vegLabel = item.veg ? 'Veg' : 'Non-Veg';

        html += '<div class="admin-menu-item">' +
          '<div class="admin-menu-item__info">' +
            '<p class="admin-menu-item__name">' + DOM.escapeHTML(item.name) + '</p>' +
            '<div class="admin-menu-item__meta">' +
              '<span class="badge ' + vegClass + '">' + vegLabel + '</span>' +
              '<span>\u20B9' + item.price + '</span>' +
              '<span>' + item.prepTime + ' min prep</span>' +
              (!item.verified ? '<span style="color:var(--delayed);">\u26A0 Unverified</span>' : '') +
            '</div>' +
          '</div>' +
          '<div class="admin-menu-item__actions">' +
            '<label class="toggle">' +
              '<input type="checkbox" ' + (isAvail ? 'checked' : '') + ' data-item-id="' + item.id + '" data-stall-id="' + stallId + '">' +
              '<span class="toggle__track"></span>' +
              '<span class="toggle__thumb"></span>' +
            '</label>' +
          '</div>' +
        '</div>';
      });

      html += '</div>';
    });

    container.innerHTML = html;

    // Toggle listeners
    DOM.on(container, 'change', '.toggle input', function (e, input) {
      var itemId = input.getAttribute('data-item-id');
      var sId = input.getAttribute('data-stall-id');
      Store.toggleItemAvailability(sId, itemId);
      var isNowAvail = Store.isItemAvailable(sId, itemId);
var itemData = StallData.getItem(itemId);

if (!itemData) {
    Toast.warning('Food item not found.');
    return;
}

Toast.info(itemData.name + ' is now ' + (isNowAvail ? 'available' : 'unavailable'));
      var itemData = StallData.getItem(itemId);
      Toast.info(itemData.name + ' is now ' + (isNowAvail ? 'available' : 'unavailable'));
    });
  }
};
