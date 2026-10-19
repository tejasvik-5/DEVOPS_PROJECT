/* ==========================================================================
   BHUKH LAGI — Navbar (navbar.js)
   Desktop top nav, mobile bottom nav logic, and user pill injection.
   ========================================================================== */

var Navbar = {
  init: function () {
    // Cart button → navigate to cart
    var cartBtn = document.getElementById('cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', function () { Router.go('cart'); });

    // Profile pill click → profile page
    var userPill = document.getElementById('navbar-user');
    if (userPill) userPill.addEventListener('click', function () { Router.go('profile'); });

    // Bell → no-op for now (future notifications)
    var bellBtn = document.getElementById('bell-btn');
    if (bellBtn) bellBtn.addEventListener('click', function () {
      /* future: show notification dropdown */
    });

    // Search in navbar (desktop)
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      var resultsWrap = document.createElement('div');
      resultsWrap.className = 'search-results-wrap';
      resultsWrap.style.cssText = 'position:absolute;top:100%;left:0;right:0;z-index:10;display:none;';
      searchInput.parentElement.style.position = 'relative';
      searchInput.parentElement.appendChild(resultsWrap);

      Search.init(searchInput, resultsWrap, function () {
        searchInput.value = '';
      });
    }

    // Render logged-in user pill
    this.renderUserPill();

    // Admin sidebar toggle for mobile
    var adminToggle = document.querySelector('.admin-mobile-header__menu');
    var sidebar = document.getElementById('admin-sidebar');
    var overlay = document.querySelector('.admin-overlay');
    if (adminToggle && sidebar) {
      adminToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('visible');
      });
      if (overlay) {
        overlay.addEventListener('click', function () {
          sidebar.classList.remove('open');
          overlay.classList.remove('visible');
        });
      }
    }

    // Admin logout
    var logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        Store.logout();
        Router.go('login');
      });
    }
  },

  /* Injects user initials-avatar + name + role into #navbar-user */
  renderUserPill: function () {
    var pill = document.getElementById('navbar-user');
    if (!pill) return;
    var user = Store.getUser();
    if (!user) { pill.innerHTML = ''; return; }

    var name = user.name || user.username || 'Student';
    var role = user.role === 'admin' ? 'Admin' : 'Student';
    var initials = name.split(' ').map(function (w) { return w.charAt(0).toUpperCase(); }).slice(0, 2).join('');

    pill.innerHTML =
      '<div class="nup__avatar" aria-hidden="true">' + initials + '</div>' +
      '<div class="nup__info">' +
        '<span class="nup__name">' + DOM.escapeHTML(name) + '</span>' +
        '<span class="nup__role">' + DOM.escapeHTML(role) + '</span>' +
      '</div>' +
      '<svg class="nup__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
  }
};
