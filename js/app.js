/* ==========================================================================
   BHUKH LAGI — App Initialization (app.js)
   Bootstrap, loading screen, route registration, global listeners.
   ========================================================================== */

var App = {
  init: function () {
    this.setupLoading();
    this.registerRoutes();
    this.setupCartListener();
    this.setupNavbarScroll();
    if (typeof Sidebar !== 'undefined') Sidebar.init();
    Router.init();

    // Dismiss loading screen after routes resolve
    var self = this;
    setTimeout(function () {
      try {
        Router.resolve();
      } catch (err) {
        console.error('Router resolve error:', err);
      } finally {
        self.hideLoading();
      }
    }, 1200);

    // Failsafe: loading screen must dismiss within 2.5s under any condition
    setTimeout(function () {
      self.hideLoading();
    }, 2500);
  },

  /* ─── Loading Screen ─── */

  setupLoading: function () {
    var msgEl = document.querySelector('.loading-screen__message');
    if (msgEl) msgEl.textContent = BRAND.getRandomLoadingMessage();

    var fill = document.querySelector('.loading-screen__bar-fill');
    if (fill) {
      requestAnimationFrame(function () { fill.style.width = '90%'; });
    }
  },

  hideLoading: function () {
    var screen = document.getElementById('loading-screen');
    var fill = document.querySelector('.loading-screen__bar-fill');
    if (fill) fill.style.width = '100%';

    setTimeout(function () {
      if (screen) {
        screen.classList.add('hidden');
        setTimeout(function () { screen.style.display = 'none'; }, 500);
      }
    }, 300);
  },

  /* ─── Route Registration ─── */

  registerRoutes: function () {
    Router.on('login', LoginPage.render);
    Router.on('home', HomePage.render);
    Router.on('stalls', StallsPage.render);
    Router.on('stall', StallDetailPage.render);
    Router.on('cart', CartPage.render);
    Router.on('orders', OrdersPage.render);
    Router.on('order', OrderDetailPage.render);
    Router.on('profile', ProfilePage.render);
    Router.on('admin/dashboard', AdminDashboard.render);
    Router.on('admin/orders', AdminOrderQueue.render);
    Router.on('admin/menu', AdminMenuMgmt.render);
    Router.on('admin/availability', AdminAvailability.render);
  },

  /* ─── Cart Badge Updates ─── */

  setupCartListener: function () {
    Store.onCartChange(function (cart) {
      var count = cart.items.reduce(function (s, i) { return s + i.qty; }, 0);

      // Desktop badge
      var badge = document.getElementById('cart-badge');
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      }

      // Floating cart bar
      var floatingCart = document.getElementById('floating-cart');
      var floatingCount = document.getElementById('floating-cart-count');
      var floatingTotal = document.getElementById('floating-cart-total');

      if (floatingCart) {
        if (count > 0 && Router.currentPage === 'stall') {
          floatingCart.style.display = 'block';
          floatingCart.classList.add('visible');
        } else {
          floatingCart.classList.remove('visible');
          setTimeout(function () { floatingCart.style.display = 'none'; }, 400);
        }
      }

      if (floatingCount) floatingCount.textContent = count + ' item' + (count !== 1 ? 's' : '');
      if (floatingTotal) {
        var total = cart.items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
        floatingTotal.textContent = '\u20B9' + total;
      }
    });

    // Set initial badge
    var initialCount = Store.getCartItemCount();
    var badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = initialCount;
      badge.style.display = initialCount > 0 ? 'flex' : 'none';
    }
  },

  /* ─── Navbar Scroll Effect ─── */

  setupNavbarScroll: function () {
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (navbar) {
        navbar.classList.toggle('navbar--scrolled', st > 10);
      }
      lastScroll = st;
    }, { passive: true });
  }
};

/* ─── Boot ─── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    App.init();
  });
} else {
  App.init();
}
