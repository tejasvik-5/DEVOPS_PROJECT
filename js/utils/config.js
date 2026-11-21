var AppConfig = {
  API_BASE_URL:
    window.BHUKH_LAGI_API_URL ||
    (window.location.hostname.endsWith('github.io')
      ? 'https://bhukh-lagi-backend-1fkr.onrender.com'
      : 'http://localhost:3000'),

  apiUrl: function (path) {
    return this.API_BASE_URL.replace(/\/$/, '') + '/' + String(path || '').replace(/^\//, '');
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppConfig;
}