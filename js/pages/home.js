/* ==========================================================================
   BHUKH LAGI — Home Page (home.js) — v5 Reference-Matched Layout
   Premium student home dashboard matching reference image structure.
   Layout: Header → Hero → Categories → Content Grid (Main + Right Widgets) → Popular → Banner → Footer
   Visual system: login page (cream/navy/teal, no orange).
   ========================================================================== */

var HomePage = {

  /* Food image map for popular items (keyed by item name fragment) */
  _foodImages: {
    'samosa':       'assets/food/samosa.jpg',
    'dosa':         'assets/food/masala-dosa.jpg',
    'roll':         'assets/food/kathi-roll.jpg',
    'kathi':        'assets/food/kathi-roll.jpg',
    'burger':       'assets/food/burger.jpg',
    'momo':         'assets/food/momos.jpg',
    'chai':         'assets/food/chai-kulhad.jpg',
    'tea':          'assets/food/chai-kulhad.jpg',
    'coffee':       'assets/food/coffee-frappe.jpg',
    'frappe':       'assets/food/coffee-frappe.jpg',
    'bhatura':      'assets/food/chole-bhature.jpg',
    'bhature':      'assets/food/chole-bhature.jpg',
    'chole':        'assets/food/chole-bhature.jpg',
    'biryani':      'assets/food/biryani-thali.jpg',
    'thali':        'assets/food/biryani-thali.jpg',
    'pizza':        'assets/food/pizza.jpg',
    'idli':         'assets/food/south-indian.jpg',
    'vada':         'assets/food/south-indian.jpg',
    'south':        'assets/food/south-indian.jpg',
    'uttapam':      'assets/food/south-indian.jpg',
    'paneer':       'assets/food/kathi-roll.jpg',
    'noodle':       'assets/food/biryani-thali.jpg',
    'maggi':        'assets/food/chai-kulhad.jpg',
    'paratha':      'assets/food/biryani-thali.jpg',
    'pasta':        'assets/food/pizza.jpg',
    'fries':        'assets/food/burger.jpg',
    'sandwich':     'assets/food/kathi-roll.jpg',
    'wrap':         'assets/food/kathi-roll.jpg'
  },

  _getFoodImage: function (name) {
    var n = (name || '').toLowerCase();
    var map = HomePage._foodImages;
    for (var key in map) {
      if (map.hasOwnProperty(key) && n.indexOf(key) !== -1) return map[key];
    }
    return 'assets/food/biryani-thali.jpg'; // fallback
  },

  render: function (container) {
    var stalls       = StallData.getAllStalls();
    var popularItems = StallData.getPopularItems(10);
    var user         = Store.getUser();
    var allOrders    = Store.getOrders();
    var activeOrders = (typeof Store.getActiveOrders === 'function') ? Store.getActiveOrders() : [];
    var activeOrder  = (activeOrders && activeOrders.length > 0) ? activeOrders[0] : HomePage._getActiveOrder(allOrders);
    var categories   = StallData.getCategories();
    var streak       = Store.getStreak();

    var html =
      HomePage._renderDesktopHeader(user) +
      HomePage._renderHero(user) +
      HomePage._renderCategoryStrip(categories) +
      '<div class="hp-content-grid">' +
        '<div class="hp-content-main">' +
          HomePage._renderFoodCourts(stalls) +
          HomePage._renderPopularToday(popularItems) +
        '</div>' +
        '<div class="hp-content-widgets">' +
          HomePage._renderOrderCard(activeOrder) +
          HomePage._renderStreakCard(streak, allOrders) +
          HomePage._renderPromoCard() +
        '</div>' +
      '</div>' +
      HomePage._renderEditorialBanner() +
      HomePage._renderFooter();

    container.innerHTML = html;

    // Bind events
    HomePage._initSearch();
    HomePage._initQuickActions();
    HomePage._initCategoryStrip();
    QuantityControl.initListeners(container);
    Navbar.init();
    if (typeof Sidebar !== 'undefined') Sidebar.init();
  },

  /* ══════════════════════════════════════════════════════════════════
     DESKTOP HEADER — Search bar + notification + user pill
     ══════════════════════════════════════════════════════════════════ */
  _renderDesktopHeader: function (user) {
    var name     = (user && user.name) ? user.name : ((user && user.username) ? user.username : 'Student');
    var id       = (user && (user.id || user.phone)) ? (user.id || user.phone) : '';
    var role     = (user && user.role === 'admin') ? 'Stall Manager' : 'Student';
    var initials = name.split(/\s+/).filter(Boolean).map(function (w) { return w.charAt(0).toUpperCase(); }).slice(0, 2).join('') || 'S';

    return (
      '<header class="hp-desktop-header" id="hp-desktop-header">' +

        /* Search */
        '<div class="hp-desktop-header__search">' +
          '<svg class="hp-desktop-header__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
            '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>' +
          '</svg>' +
          '<input type="text" id="hero-search-input" class="hp-desktop-header__search-input" ' +
            'placeholder="Search food, stalls or cravings\u2026" ' +
            'aria-label="Search food and stalls" autocomplete="off">' +
          '<div id="hero-search-results" class="hp-hero__search-results" style="display:none;"></div>' +
        '</div>' +

        /* Right actions */
        '<div class="hp-desktop-header__actions">' +
          /* Bell */
          '<button class="hp-desktop-header__bell" aria-label="Notifications" id="desktop-bell-btn">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>' +
            '</svg>' +
          '</button>' +
          /* User pill */
          '<div class="hp-desktop-header__user" onclick="Router.go(\'profile\')" role="button" tabindex="0" style="cursor:pointer;" title="View Profile">' +
            '<div class="hp-desktop-header__avatar">' + DOM.escapeHTML(initials) + '</div>' +
            '<div class="hp-desktop-header__user-info">' +
              '<span class="hp-desktop-header__user-name">' + DOM.escapeHTML(name) + '</span>' +
              '<span class="hp-desktop-header__user-id">' + DOM.escapeHTML(id) + '</span>' +
              '<span class="hp-desktop-header__user-role">' + DOM.escapeHTML(role) + '</span>' +
            '</div>' +
            '<svg class="hp-desktop-header__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
          '</div>' +
        '</div>' +

      '</header>'
    );
  },

  _getGreeting: function (user) {
    var name = (user && user.name) ? user.name.trim() : '';
    if (!name) return null;

    var hour = new Date().getHours();
    var timeOfDay = 'morning';
    if (hour >= 12 && hour < 17) {
      timeOfDay = 'afternoon';
    } else if (hour >= 17 || hour < 4) {
      timeOfDay = 'evening';
    }

    return 'Good ' + timeOfDay + ', ' + name + '.';
  },

  /* ══════════════════════════════════════════════════════════════════
     HERO — Campus photo + branding + search
     ══════════════════════════════════════════════════════════════════ */
  _renderHero: function (user) {
    var greeting = HomePage._getGreeting(user);
    var greetingHtml = '';
    if (greeting) {
      greetingHtml =
        '<div class="hp-hero__greeting-wrap">' +
          '<h2 class="hp-hero__greeting">' + DOM.escapeHTML(greeting) + '</h2>' +
          '<p class="hp-hero__sub">Your campus cravings, sorted.</p>' +
        '</div>';
    } else {
      greetingHtml =
        '<p class="hp-hero__sub">Your campus cravings, sorted.</p>';
    }

    return (
      '<section class="hp-hero" id="hp-hero">' +

        /* Left content */
        '<div class="hp-hero__left">' +
          '<h1 class="hp-hero__brand">' + DOM.escapeHTML(BRAND.name) + '</h1>' +
          '<p class="hp-hero__tagline font-handwritten">' + DOM.escapeHTML(BRAND.tagline) + '</p>' +
          greetingHtml +

          /* Search (mobile + desktop fallback) */
          '<div class="hp-hero__search-wrap">' +
            '<div class="hp-hero__search-box">' +
              '<svg class="hp-hero__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
                '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>' +
              '</svg>' +
              '<input type="text" id="hero-search-input-mobile" class="hp-hero__search-input" ' +
                'placeholder="What are you craving today?" ' +
                'aria-label="Search food and stalls" autocomplete="off">' +
              '<button class="hp-hero__search-btn" id="hero-search-btn">Search</button>' +
            '</div>' +
            '<div id="hero-search-results-mobile" class="hp-hero__search-results" style="display:none;"></div>' +
          '</div>' +

          /* Quick tag chips */
          '<div class="hp-hero__tags">' +
            HomePage._tagPill('Momos', 'momos') +
            HomePage._tagPill('Dosa', 'dosa') +
            HomePage._tagPill('Chai', 'chai') +
            HomePage._tagPill('Biryani', 'biryani') +
            HomePage._tagPill('Maggi', 'maggi') +
          '</div>' +
        '</div>' +

        /* Right — campus photograph */
        '<div class="hp-hero__right" aria-hidden="true">' +
          '<img src="assets/campus-hero.jpg" alt="UPES Campus food court" loading="eager" class="hp-hero__campus-img">' +
          /* Overlay text */
          '<div class="hp-hero__overlay-text">' +
            '<span class="hp-hero__overlay-line font-handwritten">Good Food</span>' +
            '<span class="hp-hero__overlay-line font-handwritten">Better Days</span>' +
          '</div>' +
          '<div class="hp-hero__overlay-badge">' +
            '<span class="hp-hero__overlay-line2 font-handwritten">Same Campus</span>' +
            '<span class="hp-hero__overlay-line2 font-handwritten">Bigger Cravings</span>' +
          '</div>' +
        '</div>' +

      '</section>'
    );
  },

  _tagPill: function (label, query) {
    return '<button class="hp-tag-pill" data-query="' + DOM.escapeHTML(query) + '">' +
      DOM.escapeHTML(label) + '</button>';
  },

  /* ══════════════════════════════════════════════════════════════════
     CATEGORY STRIP
     ══════════════════════════════════════════════════════════════════ */
  _renderCategoryStrip: function (categories) {
    var iconMap = {
      'Breakfast':     '<svg viewBox="0 0 32 32" width="28" height="28"><ellipse cx="16" cy="18" rx="10" ry="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M26,18 Q30,18 30,14 Q30,10 26,10" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
      'Meals':         '<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="18" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10,18 Q16,10 22,18" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
      'Snacks':        '<svg viewBox="0 0 32 32" width="28" height="28"><path d="M12,6 L8,24 L24,24 L20,6 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="10" y1="14" x2="22" y2="14" stroke="currentColor" stroke-width="1.2"/></svg>',
      'Beverages':     '<svg viewBox="0 0 32 32" width="28" height="28"><path d="M10,8 L12,26 Q16,28 20,26 L22,8 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="8" y1="8" x2="24" y2="8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      'Desserts':      '<svg viewBox="0 0 32 32" width="28" height="28"><path d="M8,20 Q16,6 24,20" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="8" y="20" width="16" height="4" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="16" y1="6" x2="16" y2="10" stroke="currentColor" stroke-width="1.8"/></svg>',
      'North Indian':  '<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="18" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10,18 Q16,10 22,18" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
      'South Indian':  '<svg viewBox="0 0 32 32" width="28" height="28"><ellipse cx="16" cy="20" rx="12" ry="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8,16 Q16,6 24,16" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
      'Chinese':       '<svg viewBox="0 0 32 32" width="28" height="28"><path d="M10,8 Q16,6 22,8 L20,22 Q16,24 12,22 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" stroke-width="1.8"/></svg>',
      'Fast Food':     '<svg viewBox="0 0 32 32" width="28" height="28"><path d="M6,18 Q16,4 26,18" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="6" y1="18" x2="26" y2="18" stroke="currentColor" stroke-width="1.8"/><line x1="8" y1="22" x2="24" y2="22" stroke="currentColor" stroke-width="1.8"/></svg>'
    };
    var defaultIcon = '<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

    /* Ordered display list (matching reference) */
    var displayOrder = ['Breakfast', 'Meals', 'Snacks', 'Beverages', 'Desserts', 'North Indian', 'South Indian', 'Chinese', 'Fast Food'];

    var html =
      '<section class="hp-category-strip" id="category-strip">' +
        '<div class="hp-category-strip__scroll">';

    displayOrder.forEach(function (cat, idx) {
      var icon = iconMap[cat] || defaultIcon;
      html +=
        '<button class="hp-cat-pill' + (idx === 0 ? ' hp-cat-pill--active' : '') + '" data-category="' + DOM.escapeHTML(cat) + '">' +
          '<span class="hp-cat-pill__icon">' + icon + '</span>' +
          '<span class="hp-cat-pill__label">' + DOM.escapeHTML(cat) + '</span>' +
        '</button>';
    });

    html +=
      /* Scroll arrow */
      '<button class="hp-category-strip__arrow" aria-label="More categories">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>' +
      '</div></section>';
    return html;
  },

  _initCategoryStrip: function () {
    var pills = document.querySelectorAll('.hp-cat-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('hp-cat-pill--active'); });
        pill.classList.add('hp-cat-pill--active');
        var el = document.getElementById('food-courts');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    /* Arrow button — scroll strip right */
    var arrow = document.querySelector('.hp-category-strip__arrow');
    var scroll = document.querySelector('.hp-category-strip__scroll');
    if (arrow && scroll) {
      arrow.addEventListener('click', function () {
        scroll.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }
  },

  /* ══════════════════════════════════════════════════════════════════
     CAMPUS FOOD COURTS — 4-column card grid (matches reference)
     ══════════════════════════════════════════════════════════════════ */
  _renderFoodCourts: function (stalls) {
    var html =
      '<section class="hp-section hp-section--courts" id="food-courts">' +
        '<div class="hp-section__head">' +
          '<div>' +
            '<h2 class="hp-section__title">Campus Food Courts</h2>' +
            '<p class="hp-section__sub">Explore food outlets across campus</p>' +
          '</div>' +
          '<a href="#stalls" class="hp-section__all" onclick="Router.go(\'stalls\');return false;">View All \u2192</a>' +
        '</div>' +

        '<div class="hp-courts__grid">';

    stalls.forEach(function (stall) {
      html += HomePage._renderCourtCard(stall);
    });

    html += '</div></section>';
    return html;
  },

  _renderCourtCard: function (stall) {
    var isOpen       = stall.isOpen;
    var statusClass  = isOpen ? 'hp-court__badge--open' : 'hp-court__badge--closed';
    var statusText   = isOpen ? 'Open' : 'Closed';
    var prepTime     = stall.avgPrepTime ? stall.avgPrepTime.min + '\u2013' + stall.avgPrepTime.max + ' min' : '';
    var cats         = stall.category.slice(0, 2).join(' \u2022 ');
    var imgSrc       = stall.foodImage || stall.image;  /* Prefer food photo over menu board */

    return (
      '<div class="hp-court__card" onclick="Router.go(\'stall/' + stall.id + '\')" role="button" tabindex="0" ' +
        'aria-label="' + DOM.escapeHTML(stall.name) + ', ' + statusText + '">' +
        '<div class="hp-court__img-wrap">' +
          '<img src="' + imgSrc + '" alt="' + DOM.escapeHTML(stall.name) + '" loading="lazy" class="hp-court__img">' +
          '<span class="hp-court__badge ' + statusClass + '">' +
            '<span class="hp-court__dot hp-court__dot--' + (isOpen ? 'open' : 'closed') + '"></span>' +
            statusText +
          '</span>' +
        '</div>' +
        '<div class="hp-court__body">' +
          '<h3 class="hp-court__name">' + DOM.escapeHTML(stall.name) + '</h3>' +
          '<div class="hp-court__meta">' +
            '<span class="hp-court__cat">' + DOM.escapeHTML(cats) + '</span>' +
          '</div>' +
          '<div class="hp-court__foot">' +
            (prepTime
              ? '<span class="hp-court__time">' +
                  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
                  prepTime +
                '</span>'
              : '') +
            '<span class="hp-court__cta">View Menu \u2192</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  },

  /* ══════════════════════════════════════════════════════════════════
     POPULAR TODAY — Horizontal scroll with real food photos
     ══════════════════════════════════════════════════════════════════ */
  _renderPopularToday: function (items) {
    var html =
      '<section class="hp-section hp-section--popular" id="popular-today">' +
        '<div class="hp-section__head">' +
          '<div>' +
            '<h2 class="hp-section__title">Popular Today</h2>' +
            '<p class="hp-section__sub">Most loved by UPES students</p>' +
          '</div>' +
          '<a href="#stalls" class="hp-section__all" onclick="Router.go(\'stalls\');return false;">View All \u2192</a>' +
        '</div>' +
        '<div class="hp-popular__scroll">';

    items.forEach(function (item) {
      var vegDot = item.veg === false
        ? '<span class="hp-pop__veg-dot hp-pop__veg-dot--nonveg" title="Non-veg"></span>'
        : '<span class="hp-pop__veg-dot hp-pop__veg-dot--veg" title="Veg"></span>';

      var avail = Store.isItemAvailable(item.stallId, item.id) && item.available;
       

      html +=
        '<div class="hp-pop__card" data-stall-id="' + item.stallId + '">' +
           
          '<div class="hp-pop__body">' +
            '<div class="hp-pop__row1">' +
              vegDot +
              '<span class="hp-pop__name">' + DOM.escapeHTML(item.name) + '</span>' +
            '</div>' +
            '<span class="hp-pop__stall">' + DOM.escapeHTML(item.stallName) + '</span>' +
            '<div class="hp-pop__row2">' +
              '<strong class="hp-pop__price">\u20b9' + item.price + '</strong>' +
              (avail
                ? '<button class="hp-pop__add qty-add-btn add-btn" data-item-id="' + item.id + '" data-stall-id="' + item.stallId + '" data-stall-name="' + DOM.escapeHTML(item.stallName) + '" aria-label="Add ' + DOM.escapeHTML(item.name) + '">' +
                    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
                    ' Add' +
                  '</button>'
                : '<span class="hp-pop__unavail">Unavailable</span>') +
            '</div>' +
          '</div>' +
        '</div>';
    });

    html += '</div></section>';
    return html;
  },

  /* ══════════════════════════════════════════════════════════════════
     RIGHT SIDEBAR WIDGETS
     ══════════════════════════════════════════════════════════════════ */

  /* ── YOUR ORDER CARD ── */
  _renderOrderCard: function (order) {
    if (!order) {
      return (
        '<div class="hp-widget hp-widget--order hp-widget--order-empty">' +
          '<div class="hp-widget__order-head">' +
            '<h3 class="hp-widget__order-title">Your Order</h3>' +
          '</div>' +
          '<div class="hp-widget__order-empty-icon">' +
            '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
              '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>' +
            '</svg>' +
          '</div>' +
          '<p class="hp-widget__order-empty-msg">' + DOM.escapeHTML(BRAND.emptyStates.noActiveOrders) + '</p>' +
          '<button class="hp-widget__order-explore-btn" onclick="Router.go(\'stalls\')">Explore Stalls \u2192</button>' +
        '</div>'
      );
    }

    var prefix = BRAND.orderPrefix || 'BL';
    var item = (order.items && order.items.length > 0) ? order.items[0] : null;
    var itemName = item ? item.name : 'Campus Meal';
    var stallName = order.stallName || 'Campus Food Court';
    var itemImg = (item && item.image) ? item.image : HomePage._getFoodImage(itemName);
    var status = (order.status || 'PENDING').toLowerCase();

    var isPlacedDone = true;
    var isPlacedActive = status === 'pending';

    var isPrepDone = status === 'preparing' || status === 'ready' || status === 'completed';
    var isPrepActive = status === 'preparing';

    var isReadyDone = status === 'ready' || status === 'completed';
    var isReadyActive = status === 'ready';

    var isCompDone = status === 'completed';

    return (
      '<div class="hp-widget hp-widget--order">' +
        '<div class="hp-widget__order-head">' +
          '<h3 class="hp-widget__order-title">Your Order</h3>' +
          '<a href="#order/' + order.id + '" class="hp-widget__order-link" onclick="Router.go(\'order/' + order.id + '\');return false;">View Details \u2192</a>' +
        '</div>' +
        '<p class="hp-widget__order-id">#' + prefix + (order.id || '').toString().replace(/^BL/i, '').slice(-4).toUpperCase() + '</p>' +
        '<div class="hp-widget__order-item">' +
          '<img src="' + itemImg + '" alt="' + DOM.escapeHTML(itemName) + '" class="hp-widget__order-thumb">' +
          '<div class="hp-widget__order-item-info">' +
            '<span class="hp-widget__order-item-name">' + DOM.escapeHTML(itemName) + '</span>' +
            '<span class="hp-widget__order-item-stall">' + DOM.escapeHTML(stallName) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="hp-widget__order-timeline">' +
          HomePage._orderStep('Order Placed', order.placedAt || '12:30 PM', isPlacedDone, isPlacedActive) +
          HomePage._orderStep('Preparing', order.prepAt || (status === 'preparing' ? '12:45 PM' : ''), isPrepDone, isPrepActive) +
          HomePage._orderStep('Ready for Pickup', order.eta || (status === 'ready' ? '1:00 PM' : ''), isReadyDone, isReadyActive) +
          HomePage._orderStep('Completed', '', isCompDone, false) +
        '</div>' +
        '<button class="hp-widget__order-track-btn" onclick="Router.go(\'order/' + order.id + '\')">Track Order \u2192</button>' +
      '</div>'
    );
  },

  _orderStep: function (label, time, done, active) {
    var cls = 'hp-order-step';
    if (done) cls += ' hp-order-step--done';
    if (active) cls += ' hp-order-step--active';

    var dotContent = '';
    if (done && !active) {
      dotContent = '<svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg>';
    } else if (active) {
      dotContent = '<span class="hp-order-step__pulse"></span>';
    }

    return (
      '<div class="' + cls + '">' +
        '<span class="hp-order-step__dot">' + dotContent + '</span>' +
        '<div class="hp-order-step__info">' +
          '<span class="hp-order-step__label">' + label + '</span>' +
          (time ? '<span class="hp-order-step__time">' + time + '</span>' : '') +
        '</div>' +
      '</div>'
    );
  },

  /* ── CAMPUS CRAVINGS STREAK ── */
  _renderStreakCard: function (streak, pastOrders) {
    var days        = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    var dayLabels   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var message     = BRAND.getStreakMessage(streak.current);
    var ordersTotal = pastOrders ? pastOrders.length : 0;

    var dotsHtml = days.map(function (d, i) {
      var on = streak.week[d];
      return (
        '<div class="hp-streak__day">' +
          '<span class="hp-streak__day-label">' + dayLabels[i] + '</span>' +
          '<span class="hp-streak__day-dot' + (on ? ' hp-streak__day-dot--on' : '') + '">' +
            (on ? '<svg width="10" height="10" viewBox="0 0 10 10"><polyline points="2,5 4,8 8,2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '') +
          '</span>' +
        '</div>'
      );
    }).join('');

    return (
      '<div class="hp-widget hp-widget--streak">' +
        '<h3 class="hp-streak-card__title">Campus Cravings Streak</h3>' +
        '<div class="hp-streak-card__hero">' +
          '<span class="hp-streak-card__flame">\uD83D\uDD25</span>' +
          '<span class="hp-streak-card__count">' + streak.current + ' Days</span>' +
          '<p class="hp-streak-card__msg">' + DOM.escapeHTML(message) + '</p>' +
        '</div>' +
        '<div class="hp-streak__days">' + dotsHtml + '</div>' +
        '<div class="hp-streak-card__stats">' +
          '<div class="hp-streak-card__stat">' +
            '<span class="hp-streak-card__stat-val">' + ordersTotal + '</span>' +
            '<span class="hp-streak-card__stat-key">Orders Placed</span>' +
          '</div>' +
          '<div class="hp-streak-card__stat">' +
            '<span class="hp-streak-card__stat-val">' + streak.best + ' Days</span>' +
            '<span class="hp-streak-card__stat-key">Best Streak</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  },

  /* ── PROMO CARD ── */
  _renderPromoCard: function () {
    return (
      '<div class="hp-widget hp-widget--promo">' +
        '<img src="assets/food/biryani-thali.jpg" alt="Campus food" loading="lazy" class="hp-widget__promo-bg">' +
        '<div class="hp-widget__promo-overlay">' +
          '<p class="hp-widget__promo-tagline font-handwritten">' + DOM.escapeHTML(BRAND.tagline) + '</p>' +
          '<p class="hp-widget__promo-sub">Campus cravings,<br>sorted.</p>' +
          '<button class="hp-widget__promo-cta" onclick="Router.go(\'stalls\')">Explore Menu \u2192</button>' +
        '</div>' +
      '</div>'
    );
  },

  /* ══════════════════════════════════════════════════════════════════
     EDITORIAL BANNER
     ══════════════════════════════════════════════════════════════════ */
  _renderEditorialBanner: function () {
    return (
      '<section class="hp-banner" aria-label="BHUKH LAGI campaign banner">' +
        /* Doodle accents */
        '<svg class="hp-banner__doodle hp-banner__doodle--1" viewBox="0 0 60 70" aria-hidden="true">' +
          '<path d="M14,18 L12,52 Q12,56 16,56 L44,56 Q48,56 48,52 L46,18 Z" fill="#C8956C" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
          '<ellipse cx="30" cy="20" rx="15" ry="3" fill="#8B5E3C" stroke="none"/>' +
          '<path d="M48,26 Q58,26 58,35 Q58,44 48,44" fill="none" stroke="#2F4156" stroke-width="2" stroke-linecap="round"/>' +
        '</svg>' +
        '<svg class="hp-banner__doodle hp-banner__doodle--2" viewBox="0 0 70 70" aria-hidden="true">' +
          '<path d="M35,8 L8,62 L62,62 Z" fill="#F2C162" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
          '<circle cx="28" cy="45" r="3.5" fill="#D4634A" stroke="#2F4156" stroke-width="1.5"/>' +
        '</svg>' +

        '<div class="hp-banner__inner">' +
          '<div class="hp-banner__left">' +
            '<img src="assets/food/biryani-thali.jpg" alt="Campus food counter" loading="lazy" class="hp-banner__campus-img">' +
          '</div>' +
          '<div class="hp-banner__right">' +
            '<p class="hp-banner__eyebrow">' + DOM.escapeHTML(BRAND.name) + ' \u2022 UPES Dehradun</p>' +
            '<h2 class="hp-banner__headline font-handwritten">' + DOM.escapeHTML(BRAND.tagline) + '</h2>' +
            '<p class="hp-banner__body">Good food. Shorter queues. Happier breaks.</p>' +
            '<p class="hp-banner__sub">8 food courts. Hundreds of real campus dishes. Order ahead, skip the wait.</p>' +
            '<button class="hp-banner__cta" onclick="Router.go(\'stalls\')">' +
              'Explore All Stalls \u2192' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  },

  /* ══════════════════════════════════════════════════════════════════
     FOOTER — Nav + social + branding
     ══════════════════════════════════════════════════════════════════ */
  _renderFooter: function () {
    return (
      '<footer class="hp-footer">' +
        '<div class="hp-footer__inner">' +

          '<div class="hp-footer__brand">' +
            '<img src="' + BRAND.logo.compact + '" alt="' + DOM.escapeHTML(BRAND.name) + '" class="hp-footer__logo" height="28">' +
            '<span class="hp-footer__app-name">' + DOM.escapeHTML(BRAND.name) + '</span>' +
            '<p class="hp-footer__tagline font-handwritten">' + DOM.escapeHTML(BRAND.tagline) + '</p>' +
          '</div>' +

          '<nav class="hp-footer__nav">' +
            '<a href="#home" class="hp-footer__link" onclick="Router.go(\'home\');return false;">Home</a>' +
            '<a href="#stalls" class="hp-footer__link" onclick="Router.go(\'stalls\');return false;">Food Courts</a>' +
            '<a href="#stalls" class="hp-footer__link" onclick="Router.go(\'stalls\');return false;">Menu</a>' +
            '<a href="#orders" class="hp-footer__link" onclick="Router.go(\'orders\');return false;">Orders</a>' +
            '<a href="#profile" class="hp-footer__link" onclick="Router.go(\'profile\');return false;">Profile</a>' +
            '<a href="#about" class="hp-footer__link">About</a>' +
          '</nav>' +

          '<div class="hp-footer__social">' +
            '<a href="#" class="hp-footer__social-link" aria-label="Instagram">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>' +
            '</a>' +
            '<a href="#" class="hp-footer__social-link" aria-label="LinkedIn">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>' +
            '</a>' +
            '<a href="#" class="hp-footer__social-link" aria-label="GitHub">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>' +
            '</a>' +
          '</div>' +

          '<p class="hp-footer__campus">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' +
            ' Made for the UPES campus.' +
          '</p>' +

        '</div>' +
      '</footer>'
    );
  },

  /* ══════════════════════════════════════════════════════════════════
     HELPERS
     ══════════════════════════════════════════════════════════════════ */
  _getActiveOrder: function (orders) {
    if (!orders || orders.length === 0) return null;
    var active = ['pending', 'preparing', 'ready', 'delayed', 'in_progress'];
    for (var i = 0; i < orders.length; i++) {
      var s = (orders[i].status || '').toLowerCase();
      if (active.indexOf(s) !== -1) return orders[i];
    }
    return null;
  },

  _initSearch: function () {
    var input   = document.getElementById('hero-search-input');
    var results = document.getElementById('hero-search-results');
    if (input && results) {
      Search.init(input, results, function () { input.value = ''; });
    }
    var inputM   = document.getElementById('hero-search-input-mobile');
    var resultsM = document.getElementById('hero-search-results-mobile');
    if (inputM && resultsM) {
      Search.init(inputM, resultsM, function () { inputM.value = ''; });
    }
    /* Search button */
    var btn = document.getElementById('hero-search-btn');
    if (btn && inputM) {
      btn.addEventListener('click', function () {
        inputM.dispatchEvent(new Event('input'));
        inputM.focus();
      });
    }
  },

  _initQuickActions: function () {
    var tags = document.querySelectorAll('.hp-tag-pill');
    tags.forEach(function (tag) {
      tag.addEventListener('click', function () {
        var q = tag.dataset.query;
        var input = document.getElementById('hero-search-input') || document.getElementById('hero-search-input-mobile');
        if (input) {
          input.value = q;
          input.dispatchEvent(new Event('input'));
          input.focus();
        }
      });
    });
  }
};
