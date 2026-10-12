/* ==========================================================================
   BHUKH LAGI — Sidebar Navigation (sidebar.js)
   Desktop-only left sidebar navigation. Hidden on mobile via CSS.
   ========================================================================== */

var Sidebar = {

  init: function () {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Check user role for admin link
    var user = Store.getUser();
    var adminLink = document.getElementById('sidebar-admin-link');
    if (adminLink) {
      adminLink.style.display = (user && user.role === 'admin') ? 'flex' : 'none';
    }

    // Bind nav link clicks
    var links = sidebar.querySelectorAll('.sidebar__link');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var page = link.getAttribute('data-page');
        if (page === 'menu') {
          Router.go('stalls');
        } else if (page === 'admin') {
          Router.go('admin/dashboard');
        } else if (page) {
          Router.go(page);
        }
      });
    });

    // Listen for hash changes to update active state
    window.addEventListener('hashchange', function () {
      Sidebar.setActive(Sidebar._currentRoute());
      var u = Store.getUser();
      if (adminLink) {
        adminLink.style.display = (u && u.role === 'admin') ? 'flex' : 'none';
      }
    });

    // Set initial active state
    Sidebar.setActive(Sidebar._currentRoute());

    // Sync cart badge
    Sidebar._updateCartBadge();
  },

  setActive: function (route) {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var links = sidebar.querySelectorAll('.sidebar__link');
    links.forEach(function (link) {
      var page = link.getAttribute('data-page');
      if (page === route) {
        link.classList.add('sidebar__link--active');
      } else {
        link.classList.remove('sidebar__link--active');
      }
    });
  },

  _currentRoute: function () {
    var hash = window.location.hash.replace('#', '') || 'home';
    // Normalize stall/xxxx → stalls, order/xxxx → orders
    if (hash.indexOf('stall/') === 0) return 'stalls';
    if (hash.indexOf('order/') === 0) return 'orders';
    return hash;
  },

  _updateCartBadge: function () {
    var badge = document.getElementById('sidebar-cart-badge');
    if (!badge) return;
    var cart = Store.getCart();
    var count = cart.items ? cart.items.reduce(function (sum, i) { return sum + i.qty; }, 0) : 0;
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sidebar;
}
