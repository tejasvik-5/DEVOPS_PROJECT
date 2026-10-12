/* ==========================================================================
   BHUKH LAGI — SPA Router (router.js)
   Hash-based single-page application router.
   ========================================================================== */

var Router = {
  routes: {},
  currentPage: null,

  /**
   * Register a route: Router.on('home', renderHomePage)
   */
  on: function (path, handler) {
    this.routes[path] = handler;
  },

  /**
   * Navigate to a route: Router.go('stall/maximus')
   */
  go: function (path) {
    window.location.hash = '#' + path;
  },

  /**
   * Parse the current hash into { page, params }
   */
  parse: function () {
    var hash = window.location.hash.slice(1) || 'login';
    var parts = hash.split('/');
    var page = parts[0];
    var param = parts.slice(1).join('/');

    // Admin routes
    if (page === 'admin' && parts.length > 1) {
      page = 'admin/' + parts[1];
      param = parts.slice(2).join('/');
    }

    return { page: page, param: param || null };
  },

  /**
   * Resolve and render the current route
   */
  resolve: function () {
    var parsed = this.parse();
    var page = parsed.page;
    var param = parsed.param;

    // Auth guard: redirect to login if not logged in (except login page)
    if (page !== 'login' && !Store.isLoggedIn()) {
      this.go('login');
      return;
    }

    // Admin guard: redirect students away from admin routes
    if (page.indexOf('admin') === 0 && !Store.isAdmin()) {
      this.go('home');
      return;
    }

    // Student guard: redirect admins away from student routes (except shared)
    if (Store.isAdmin() && page !== 'login' && page.indexOf('admin') !== 0 && page !== 'profile') {
      this.go('admin/dashboard');
      return;
    }

    // Find handler
    var handler = this.routes[page];
    if (!handler) {
      // Fallback
      handler = this.routes[Store.isAdmin() ? 'admin/dashboard' : 'home'];
      page = Store.isAdmin() ? 'admin/dashboard' : 'home';
    }

    // Track current page
    this.currentPage = page;

    // Update nav active states
    this._updateNav(page);

    // Show correct app shell
    this._toggleShell(page);

    // Render
    if (handler) {
      var container = page.indexOf('admin') === 0
        ? document.getElementById('admin-content')
        : document.getElementById('main-content');
      try {
        handler(container, param);
      } catch (err) {
        console.error('Error rendering page "' + page + '":', err);
      }
    }

    // Scroll to top
    window.scrollTo(0, 0);
  },

  /**
   * Toggle between student and admin app shells
   */
  _toggleShell: function (page) {
    var app = document.getElementById('app');
    var adminApp = document.getElementById('admin-app');

    if (page === 'login') {
      app.style.display = 'none';
      adminApp.style.display = 'none';
    } else if (page.indexOf('admin') === 0) {
      app.style.display = 'none';
      adminApp.style.display = 'flex';
    } else {
      app.style.display = 'flex';
      adminApp.style.display = 'none';
    }
  },

  /**
   * Update active states in navigation
   */
  _updateNav: function (page) {
    // Bottom nav
    var bottomItems = document.querySelectorAll('.bottom-nav__item');
    bottomItems.forEach(function (item) {
      var itemPage = item.getAttribute('data-page');
      item.classList.toggle('active', itemPage === page);
    });

    // Admin sidebar
    var adminItems = document.querySelectorAll('.admin-sidebar__item[data-page]');
    adminItems.forEach(function (item) {
      var itemPage = item.getAttribute('data-page');
      item.classList.toggle('active', 'admin/' + itemPage.replace('admin-', '') === page || itemPage === page.replace('/', '-'));
    });
  },

  /**
   * Initialize the router
   */
  init: function () {
    var self = this;
    window.addEventListener('hashchange', function () { self.resolve(); });

    // Handle initial load
    if (!window.location.hash) {
      window.location.hash = Store.isLoggedIn()
        ? (Store.isAdmin() ? '#admin/dashboard' : '#home')
        : '#login';
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
