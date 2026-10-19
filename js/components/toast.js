/* ==========================================================================
   BHUKH LAGI — Toast Notifications (toast.js)
   ========================================================================== */

var Toast = {
  container: null,

  _getContainer: function () {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
    }
    return this.container;
  },

  show: function (message, type) {
    type = type || 'info';
    var container = this._getContainer();
    if (!container) return;

    var icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6BA368" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C75B4A" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873F" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#567C8D" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.innerHTML = '<span class="toast__icon">' + (icons[type] || icons.info) + '</span>' +
      '<span class="toast__message">' + DOM.escapeHTML(message) + '</span>';

    container.appendChild(toast);

    // Auto-dismiss after 3s
    setTimeout(function () {
      toast.classList.add('removing');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  },

  success: function (msg) { this.show(msg, 'success'); },
  error: function (msg) { this.show(msg, 'error'); },
  warning: function (msg) { this.show(msg, 'warning'); },
  info: function (msg) { this.show(msg, 'info'); }
};
