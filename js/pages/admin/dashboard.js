/* ==========================================================================
   BHUKH LAGI — Admin Dashboard (admin/dashboard.js)
   ========================================================================== */

var AdminDashboard = {
  render: function (container) {
    var user = Store.getUser();
    var stallId = user.stallId;
    var stall = StallData.getStall(stallId);
    var orders = Store.getStallOrders(stallId);

    var today = TimeUtil.getTodayStr();
    var todayOrders = orders.filter(function (o) {
      return o.placedAt && o.placedAt.indexOf(today) === 0;
    });

  var stats = Store.getOrderMetrics(todayOrders);

    var recentOrders = todayOrders.slice(0, 10);

    var html = '<div class="admin-page-header">' +
      '<h1 class="admin-page-header__title">' + DOM.escapeHTML(stall ? stall.name : 'Dashboard') + '</h1>' +
      '<p class="admin-page-header__subtitle">Today\u2019s overview \u2022 ' + TimeUtil.formatDate(new Date()) + '</p>' +
    '</div>';

    // Stats grid
    html += '<div class="admin-stats">' +
      '<div class="stat-card stat-card--pending"><p class="stat-card__number">' + stats.total + '</p><p class="stat-card__label">Total Orders</p></div>' +
      '<div class="stat-card stat-card--preparing"><p class="stat-card__number">' + stats.preparing + '</p><p class="stat-card__label">Preparing</p></div>' +
      '<div class="stat-card stat-card--ready"><p class="stat-card__number">' + stats.ready + '</p><p class="stat-card__label">Ready</p></div>' +
      '<div class="stat-card stat-card--completed"><p class="stat-card__number">' + stats.completed + '</p><p class="stat-card__label">Completed</p></div>' +
    '</div>';

    // Pending orders alert
    if (stats.pending > 0) {
      html += '<div class="delay-notice" style="border-left-color:var(--teal);background:var(--info-bg);margin-bottom:var(--space-lg);">' +
        '<div class="delay-notice__title" style="color:var(--teal);">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
          stats.pending + ' order(s) waiting to be accepted' +
        '</div>' +
        '<a href="#admin/orders" class="btn btn--primary btn--sm" style="margin-top:var(--space-sm);">View Order Queue</a>' +
      '</div>';
    }

    // Recent orders table
    html += '<h3 style="font-size:var(--text-h3);font-weight:var(--weight-semi);color:var(--navy);margin-bottom:var(--space-md);">Recent Orders</h3>';

    if (recentOrders.length === 0) {
      html += '<p class="text-muted text-sm">No orders today yet.</p>';
    } else {
      html += '<table class="admin-table"><thead><tr>' +
        '<th>Order ID</th><th>Items</th><th>Total</th><th>Status</th><th>Time</th>' +
      '</tr></thead><tbody>';

      recentOrders.forEach(function (order) {
        var itemsText = order.items.map(function (i) { return i.qty + 'x ' + i.name; }).join(', ');
        html += '<tr onclick="Router.go(\'admin/orders\')" style="cursor:pointer;">' +
          '<td><strong>' + order.id + '</strong></td>' +
          '<td>' + DOM.escapeHTML(itemsText) + '</td>' +
          '<td>\u20B9' + order.total + '</td>' +
          '<td><span class="badge badge--status badge--' + order.status.toLowerCase() + '"><span class="badge__dot"></span>' + order.status + '</span></td>' +
          '<td>' + TimeUtil.formatTime(order.placedAt) + '</td>' +
        '</tr>';
      });

      html += '</tbody></table>';
    }

    container.innerHTML = html;
  }
};
