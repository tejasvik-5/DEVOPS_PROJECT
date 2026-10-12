/* ==========================================================================
   BHUKH LAGI — Login Page (login.js)
   Redesigned: segmented role selector, doodle background, premium card.
   Logic preserved: SAP ID/phone (student) or stall login ID (admin). No password.
   ========================================================================== */

var LoginPage = {
  _currentRole: 'student',

  render: function (container) {
    // Hide app shells — login is standalone
    var appEl = document.getElementById('app');
    if (appEl) appEl.style.display = 'none';
    var adminAppEl = document.getElementById('admin-app');
    if (adminAppEl) adminAppEl.style.display = 'none';

    // Remove any existing login wrap
    var existing = document.getElementById('login-page-wrap');
    if (existing) existing.remove();

    var wrap = document.createElement('div');
    wrap.id = 'login-page-wrap';
    wrap.setAttribute('role', 'main');

    wrap.innerHTML =
      '<div class="lp-bg" aria-hidden="true">' +
        LoginPage._doodles() +
      '</div>' +
      '<div class="lp-card" role="region" aria-label="Sign in to BHUKH LAGI">' +
        '<div class="lp-card__logo">' +
          '<img src="' + BRAND.logo.compact + '"' +
               ' alt="' + DOM.escapeHTML(BRAND.name) + '"' +
               ' class="lp-logo-img">' +
          '<p class="lp-tagline">' + DOM.escapeHTML(BRAND.tagline) + '</p>' +
        '</div>' +

        '<!-- Role segmented control -->' +
        '<div class="lp-role-toggle" role="group" aria-label="Select your role">' +
          '<button id="role-student" class="lp-role-btn lp-role-btn--active"' +
                  ' aria-pressed="true" data-role="student">' +
            'Student' +
          '</button>' +
          '<button id="role-manager" class="lp-role-btn"' +
                  ' aria-pressed="false" data-role="admin">' +
            'Stall Manager' +
          '</button>' +
        '</div>' +

        '<!-- Student section -->' +
        '<div id="lp-student-section" class="lp-section">' +
          '<div class="lp-input-group">' +
            '<label class="lp-label" for="lp-student-name">Your Name</label>' +
            '<input type="text" id="lp-student-name" class="lp-input"' +
                   ' placeholder="Enter your name"' +
                   ' autocomplete="name" autocorrect="off" spellcheck="false"' +
                   ' aria-describedby="lp-student-name-error">' +
            '<span id="lp-student-name-error" class="lp-error" role="alert" aria-live="polite"></span>' +
          '</div>' +
          '<div class="lp-input-group" style="margin-top: 14px;">' +
            '<label class="lp-label" for="lp-student-input">SAP ID or Phone Number</label>' +
            '<input type="text" id="lp-student-input" class="lp-input"' +
                   ' placeholder="Enter SAP ID or phone number"' +
                   ' autocomplete="off" autocorrect="off" spellcheck="false"' +
                   ' aria-describedby="lp-student-error">' +
            '<span id="lp-student-error" class="lp-error" role="alert" aria-live="polite"></span>' +
          '</div>' +
        '</div>' +

        '<!-- Admin section (hidden by default) -->' +
        '<div id="lp-admin-section" class="lp-section lp-section--hidden">' +
          '<div class="lp-input-group">' +
            '<label class="lp-label" for="lp-admin-input">Stall Login ID</label>' +
            '<input type="text" id="lp-admin-input" class="lp-input"' +
                   ' placeholder="e.g. admin-maximus"' +
                   ' autocomplete="off" autocorrect="off" spellcheck="false"' +
                   ' aria-describedby="lp-admin-error">' +
            '<span id="lp-admin-error" class="lp-error" role="alert" aria-live="polite"></span>' +
          '</div>' +
        '</div>' +

        '<button id="lp-cta-btn" class="lp-cta" aria-label="Continue and log in">' +
          '<span class="lp-cta__text">Let\'s Eat! \u2192</span>' +
        '</button>' +

        '<p class="lp-hint" id="lp-hint">Enter your name and SAP ID or phone number to continue.</p>' +
      '</div>';

    document.body.appendChild(wrap);

    // Kick off doodle float animation timer stagger
    LoginPage._initDoodleAnimations();

    // Role toggle
    var btnStudent = document.getElementById('role-student');
    var btnManager = document.getElementById('role-manager');

    btnStudent.addEventListener('click', function () {
      LoginPage._setRole('student');
    });
    btnManager.addEventListener('click', function () {
      LoginPage._setRole('admin');
    });

    // CTA
    document.getElementById('lp-cta-btn').addEventListener('click', function () {
      LoginPage._submit();
    });

    // Enter key on inputs
    var nameInput = document.getElementById('lp-student-name');
    if (nameInput) {
      nameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') LoginPage._submit();
      });
      nameInput.addEventListener('input', function () {
        LoginPage._clearError('lp-student-name', 'lp-student-name-error');
      });
    }

    var idInput = document.getElementById('lp-student-input');
    if (idInput) {
      idInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') LoginPage._submit();
      });
      idInput.addEventListener('input', function () {
        LoginPage._clearError('lp-student-input', 'lp-student-error');
      });
    }

    var adminInput = document.getElementById('lp-admin-input');
    if (adminInput) {
      adminInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') LoginPage._submit();
      });
      adminInput.addEventListener('input', function () {
        LoginPage._clearError('lp-admin-input', 'lp-admin-error');
      });
    }
  },

  _setRole: function (role) {
    LoginPage._currentRole = role;

    var btnStudent  = document.getElementById('role-student');
    var btnManager  = document.getElementById('role-manager');
    var secStudent  = document.getElementById('lp-student-section');
    var secAdmin    = document.getElementById('lp-admin-section');
    var hint        = document.getElementById('lp-hint');

    LoginPage._clearError('lp-student-name', 'lp-student-name-error');
    LoginPage._clearError('lp-student-input', 'lp-student-error');
    LoginPage._clearError('lp-admin-input', 'lp-admin-error');

    if (role === 'student') {
      btnStudent.classList.add('lp-role-btn--active');
      btnStudent.setAttribute('aria-pressed', 'true');
      btnManager.classList.remove('lp-role-btn--active');
      btnManager.setAttribute('aria-pressed', 'false');
      secStudent.classList.remove('lp-section--hidden');
      secAdmin.classList.add('lp-section--hidden');
      hint.textContent = 'Enter your name and SAP ID or phone number to continue.';
    } else {
      btnManager.classList.add('lp-role-btn--active');
      btnManager.setAttribute('aria-pressed', 'true');
      btnStudent.classList.remove('lp-role-btn--active');
      btnStudent.setAttribute('aria-pressed', 'false');
      secAdmin.classList.remove('lp-section--hidden');
      secStudent.classList.add('lp-section--hidden');
      hint.textContent = 'Try: admin-maximus, admin-dosa, admin-punjabi…';
    }
  },

  _submit: function () {
    if (LoginPage._currentRole === 'student') {
      LoginPage._loginStudent();
    } else {
      LoginPage._loginAdmin();
    }
  },

  _loginStudent: function () {
    var nameInput = document.getElementById('lp-student-name');
    var idInput   = document.getElementById('lp-student-input');
    var nameVal   = nameInput ? nameInput.value.trim() : '';
    var idVal     = idInput ? idInput.value.trim() : '';

    var hasError = false;

    if (!nameVal || nameVal.length < 2) {
      LoginPage._showError('lp-student-name', 'lp-student-name-error',
        'Please enter your name.');
      hasError = true;
    } else {
      LoginPage._clearError('lp-student-name', 'lp-student-name-error');
    }

    if (!idVal || idVal.length < 3) {
      LoginPage._showError('lp-student-input', 'lp-student-error',
        'Please enter a valid SAP ID or phone number.');
      hasError = true;
    } else {
      LoginPage._clearError('lp-student-input', 'lp-student-error');
    }

    if (hasError) return;

    Store.setUser({
      id: idVal,
      name: nameVal,
      role: 'student',
      stallId: null
    });

    LoginPage._cleanup();
    Router.go('home');
  },

  _loginAdmin: function () {
    var input = document.getElementById('lp-admin-input');
    var value = input.value.trim().toLowerCase();

    if (!value) {
      LoginPage._showError('lp-admin-input', 'lp-admin-error',
        'Please enter a stall login ID.');
      return;
    }

    var adminData = ADMIN_IDS[value];
    if (!adminData) {
      LoginPage._showError('lp-admin-input', 'lp-admin-error',
        'Stall ID not recognized. Try: admin-maximus, admin-dosa, etc.');
      return;
    }

    LoginPage._clearError('lp-admin-input', 'lp-admin-error');

    Store.setUser({
      id: value,
      name: adminData.name,
      role: 'admin',
      stallId: adminData.stallId
    });

    LoginPage._cleanup();
    Router.go('admin/dashboard');
  },

  _showError: function (inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (error) { error.textContent = message; error.classList.add('lp-error--visible'); }
    if (input) { input.classList.add('lp-input--error'); input.focus(); }
  },

  _clearError: function (inputId, errorId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (error) { error.textContent = ''; error.classList.remove('lp-error--visible'); }
    if (input) { input.classList.remove('lp-input--error'); }
  },

  _cleanup: function () {
    var wrap = document.getElementById('login-page-wrap');
    if (wrap) wrap.remove();
  },

  _initDoodleAnimations: function () {
    var doodles = document.querySelectorAll('.lp-doodle');
    doodles.forEach(function (el, i) {
      // Assign CSS custom property for staggered delay
      el.style.setProperty('--doodle-delay', (i * 0.7) + 's');
    });
  },

  /* ──────────────────────────────────────────────────────────────────────
     DOODLE SVGs — hand-drawn food illustrations (navy outlines, ~2px)
     Placed asymmetrically around the viewport edges.
     aria-hidden="true" is set on the parent container.
  ────────────────────────────────────────────────────────────────────── */
  _doodles: function () {
    return (
      // ── Chai cup — top-left | warm tea brown + dark surface
      '<svg class="lp-doodle lp-doodle--chai" viewBox="0 0 60 70" aria-hidden="true">' +
        '<path d="M14,18 L12,52 Q12,56 16,56 L44,56 Q48,56 48,52 L46,18 Z" fill="#C8956C" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
        '<ellipse cx="30" cy="20" rx="15" ry="3" fill="#8B5E3C" stroke="none"/>' +
        '<path d="M48,26 Q58,26 58,35 Q58,44 48,44" fill="none" stroke="#2F4156" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M22,10 Q22,5 26,3" fill="none" stroke="#C8956C" stroke-width="1.6" stroke-linecap="round"/>' +
        '<path d="M30,10 Q30,5 34,3" fill="none" stroke="#C8956C" stroke-width="1.6" stroke-linecap="round"/>' +
        '<path d="M12,64 L48,64" fill="none" stroke="#2F4156" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Pizza slice — top-right | golden cheese + terracotta toppings + darker crust
      '<svg class="lp-doodle lp-doodle--pizza" viewBox="0 0 70 70" aria-hidden="true">' +
        '<path d="M35,8 L8,62 L62,62 Z" fill="#F2C162" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M8,62 Q35,52 62,62" fill="#D4962A" stroke="#2F4156" stroke-width="2" stroke-linecap="round"/>' +
        '<circle cx="28" cy="45" r="3.5" fill="#D4634A" stroke="#2F4156" stroke-width="1.5"/>' +
        '<circle cx="42" cy="38" r="3" fill="#D4634A" stroke="#2F4156" stroke-width="1.5"/>' +
        '<circle cx="35" cy="53" r="2.5" fill="#8B5A3A" stroke="#2F4156" stroke-width="1.4"/>' +
      '</svg>' +

      // ── Roti — left-middle | warm golden wheat + charred inner ring
      '<svg class="lp-doodle lp-doodle--roti" viewBox="0 0 70 70" aria-hidden="true">' +
        '<ellipse cx="35" cy="35" rx="28" ry="26" fill="#D4A55A" stroke="#2F4156" stroke-width="2"/>' +
        '<ellipse cx="35" cy="35" rx="18" ry="16" fill="#C4913A" stroke="#2F4156" stroke-width="1.3"/>' +
        '<path d="M22,35 Q35,28 48,35" fill="none" stroke="#8B6A30" stroke-width="1.3" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Juice glass — right-middle | fresh orange juice
      '<svg class="lp-doodle lp-doodle--juice" viewBox="0 0 55 80" aria-hidden="true">' +
        '<path d="M12,16 L18,68 Q18,72 27,72 Q36,72 36,68 L42,16 Z" fill="#F0A85E" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M42,28 Q50,32 42,40" fill="none" stroke="#2F4156" stroke-width="1.6" stroke-linecap="round"/>' +
        '<path d="M12,30 Q27,34 42,30" fill="none" stroke="#C4783A" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path d="M30,4 L30,16" fill="none" stroke="#D4634A" stroke-width="1.8" stroke-linecap="round"/>' +
        '<path d="M24,8 L36,8" fill="none" stroke="#2F4156" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Idli plate — bottom-left | soft cream dumplings on warm plate
      '<svg class="lp-doodle lp-doodle--idli" viewBox="0 0 80 60" aria-hidden="true">' +
        '<ellipse cx="40" cy="46" rx="34" ry="8" fill="#EDD9B5" stroke="#2F4156" stroke-width="2"/>' +
        '<ellipse cx="26" cy="34" rx="12" ry="9" fill="#F0E6D5" stroke="#2F4156" stroke-width="1.8"/>' +
        '<ellipse cx="54" cy="34" rx="12" ry="9" fill="#F0E6D5" stroke="#2F4156" stroke-width="1.8"/>' +
        '<path d="M22,34 Q26,28 30,34" fill="none" stroke="#C8956C" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path d="M50,34 Q54,28 58,34" fill="none" stroke="#C8956C" stroke-width="1.3" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Momos — bottom-right | warm dough, steamed cream
      '<svg class="lp-doodle lp-doodle--momos" viewBox="0 0 80 60" aria-hidden="true">' +
        '<ellipse cx="22" cy="35" rx="16" ry="10" fill="#EDD9B5" stroke="#2F4156" stroke-width="1.8"/>' +
        '<path d="M10,32 Q14,22 22,22 Q30,22 34,32" fill="#F0E6D5" stroke="#2F4156" stroke-width="1.8"/>' +
        '<path d="M15,35 Q18,31 22,35 Q26,31 29,35" fill="none" stroke="#C8956C" stroke-width="1.3" stroke-linecap="round"/>' +
        '<ellipse cx="58" cy="35" rx="16" ry="10" fill="#EDD9B5" stroke="#2F4156" stroke-width="1.8"/>' +
        '<path d="M46,32 Q50,22 58,22 Q66,22 70,32" fill="#F0E6D5" stroke="#2F4156" stroke-width="1.8"/>' +
        '<path d="M51,35 Q54,31 58,35 Q62,31 65,35" fill="none" stroke="#C8956C" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path d="M36,46 Q40,50 44,46" fill="none" stroke="#2F4156" stroke-width="1.6" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Samosa — top-center-right | deep-fried golden triangle
      '<svg class="lp-doodle lp-doodle--samosa" viewBox="0 0 60 60" aria-hidden="true">' +
        '<path d="M30,8 L58,52 L2,52 Z" fill="#D4962A" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M30,8 L30,52" fill="none" stroke="#8B6A30" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path d="M16,34 Q23,30 30,34" fill="none" stroke="#8B6A30" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path d="M30,34 Q37,30 44,34" fill="none" stroke="#8B6A30" stroke-width="1.3" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Dosa — left-lower | golden crispy crepe + masala filling
      '<svg class="lp-doodle lp-doodle--dosa" viewBox="0 0 100 55" aria-hidden="true">' +
        '<path d="M5,42 Q20,10 50,8 Q80,10 95,42 Q80,50 50,52 Q20,50 5,42 Z" fill="#D4A55A" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M40,30 Q50,20 60,30 Q55,38 50,36 Q45,38 40,30 Z" fill="#8B5E3C" stroke="#2F4156" stroke-width="1.5"/>' +
      '</svg>' +

      // ── Noodles bowl — right-lower | warm bowl + golden strands
      '<svg class="lp-doodle lp-doodle--noodles" viewBox="0 0 70 60" aria-hidden="true">' +
        '<path d="M8,30 Q8,56 35,56 Q62,56 62,30 Z" fill="#EDD9B5" stroke="#2F4156" stroke-width="2"/>' +
        '<path d="M5,30 L65,30" fill="none" stroke="#2F4156" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M14,30 Q20,20 26,30 Q32,20 38,30 Q44,20 50,30 Q56,20 62,30" fill="none" stroke="#D4962A" stroke-width="1.7" stroke-linecap="round"/>' +
        '<path d="M18,22 Q24,14 30,22" fill="none" stroke="#D4962A" stroke-width="1.4" stroke-linecap="round"/>' +
        '<path d="M40,22 Q46,14 52,22" fill="none" stroke="#D4962A" stroke-width="1.4" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Burger — top area | toasted bun + green layer + yellow cheese
      '<svg class="lp-doodle lp-doodle--burger" viewBox="0 0 70 65" aria-hidden="true">' +
        '<path d="M12,22 Q12,8 35,8 Q58,8 58,22" fill="#D4962A" stroke="#2F4156" stroke-width="2" stroke-linecap="round"/>' +
        '<rect x="10" y="22" width="50" height="8" rx="4" fill="#D4962A" stroke="#2F4156" stroke-width="2"/>' +
        '<path d="M10,30 L10,38 Q10,42 14,42 L56,42 Q60,42 60,38 L60,30 Z" fill="#7DA87B" stroke="#2F4156" stroke-width="2"/>' +
        '<path d="M10,38 Q25,48 35,38 Q45,48 60,38" fill="none" stroke="#F2C162" stroke-width="1.6" stroke-linecap="round"/>' +
        '<rect x="10" y="50" width="50" height="8" rx="4" fill="#D4962A" stroke="#2F4156" stroke-width="2"/>' +
      '</svg>' +

      // ── Fries — bottom area | golden yellow sticks + cream container
      '<svg class="lp-doodle lp-doodle--fries" viewBox="0 0 55 75" aria-hidden="true">' +
        '<path d="M16,32 L10,70 Q10,74 27,74 Q44,74 44,70 L38,32 Z" fill="#EDD9B5" stroke="#2F4156" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M16,32 L38,32" fill="none" stroke="#2F4156" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M22,32 L18,12 Q18,8 22,8" fill="none" stroke="#D4962A" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M27,32 L27,6" fill="none" stroke="#D4962A" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M33,32 L36,12 Q36,8 32,8" fill="none" stroke="#D4962A" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>' +

      // ── Star sparkle 1 — scattered | filled teal
      '<svg class="lp-doodle lp-doodle--star1" viewBox="0 0 30 30" aria-hidden="true">' +
        '<path d="M15,4 L17,12 L25,15 L17,18 L15,26 L13,18 L5,15 L13,12 Z" fill="#567C8D" stroke="#567C8D" stroke-width="0.8" stroke-linejoin="round"/>' +
      '</svg>' +

      // ── Star sparkle 2 — outline navy
      '<svg class="lp-doodle lp-doodle--star2" viewBox="0 0 22 22" aria-hidden="true">' +
        '<path d="M11,3 L12.5,9 L18,11 L12.5,13 L11,19 L9.5,13 L4,11 L9.5,9 Z" fill="none" stroke="#2F4156" stroke-width="1.5" stroke-linejoin="round"/>' +
      '</svg>' +

      // ── Spoon + fork — line art accent
      '<svg class="lp-doodle lp-doodle--cutlery" viewBox="0 0 40 80" aria-hidden="true">' +
        '<path d="M10,8 Q10,26 10,72" fill="none" stroke="#2F4156" stroke-width="1.8" stroke-linecap="round"/>' +
        '<ellipse cx="10" cy="16" rx="5" ry="7" fill="#EDD9B5" stroke="#2F4156" stroke-width="1.8"/>' +
        '<path d="M30,8 L30,26 Q24,30 24,36 Q24,40 30,40 L30,72" fill="none" stroke="#2F4156" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M26,8 L26,22" fill="none" stroke="#2F4156" stroke-width="1.8" stroke-linecap="round"/>' +
        '<path d="M34,8 L34,22" fill="none" stroke="#2F4156" stroke-width="1.8" stroke-linecap="round"/>' +
      '</svg>'
    );
  }
};
