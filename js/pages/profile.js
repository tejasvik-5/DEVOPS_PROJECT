/* ==========================================================================
   BHUKH LAGI — Profile Page (profile.js)
   ========================================================================== */

var ProfilePage = {
  render: function (container) {
    var user = Store.getUser();
    if (!user) { Router.go('login'); return; }

    var orders = Store.getOrders();
    var completedOrders = orders.filter(function (o) { return o.status === 'COMPLETED'; });
    var totalSpent = completedOrders.reduce(function (s, o) { return s + o.total; }, 0);

    // Find favourite stall
    var stallCounts = {};
    completedOrders.forEach(function (o) {
      stallCounts[o.stallName] = (stallCounts[o.stallName] || 0) + 1;
    });
    var favStall = Object.keys(stallCounts).sort(function (a, b) { return stallCounts[b] - stallCounts[a]; })[0] || '\u2014';

    var name = user.name || 'Student';
    var id = user.id || '\u2014';
    var role = (user.role === 'admin') ? 'Stall Manager' : 'Student';
    var initials = name.split(/\s+/).filter(Boolean).map(function (w) { return w.charAt(0).toUpperCase(); }).slice(0, 2).join('') || 'S';

    var html = '<div class="container"><div class="profile-page">' +
      '<div class="page-header"><h1 class="page-header__title">Profile</h1></div>' +

      '<div class="profile-card">' +
        '<div class="profile-card__avatar">' + DOM.escapeHTML(initials) + '</div>' +
        '<h2 class="profile-card__name">' + DOM.escapeHTML(name) + '</h2>' +
        '<p class="profile-card__id">' + (user.role === 'admin' ? 'Stall ID: ' : 'Student ID: ') + DOM.escapeHTML(id) + '</p>' +
        '<p class="profile-card__role">Role: ' + DOM.escapeHTML(role) + '</p>' +
      '</div>' +

      '<div class="profile-stats">' +
        '<div class="profile-stat"><p class="profile-stat__value">' + completedOrders.length + '</p><p class="profile-stat__label">Orders</p></div>' +
        '<div class="profile-stat"><p class="profile-stat__value">\u20B9' + totalSpent + '</p><p class="profile-stat__label">Total Spent</p></div>' +
        '<div class="profile-stat"><p class="profile-stat__value">' + DOM.escapeHTML(favStall) + '</p><p class="profile-stat__label">Favourite</p></div>' +
      '</div>' +

      StreakComponent.renderExpanded() +

      '<div style="margin-top:var(--space-xl);">' +
        '<button class="btn btn--secondary btn--full" id="logout-btn">Logout</button>' +
      '</div>' +

    '</div></div>';

    container.innerHTML = html;

    document.getElementById('logout-btn').addEventListener('click', function () {
      Store.logout();
      Router.go('login');
    });
  }
};
