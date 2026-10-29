var AppLogger = {
    enabled: true,

    info: function (message, data) {
        if (!this.enabled) return;
        console.info('[BHUKH LAGI]', message, data || '');
    },

    warn: function (message, data) {
        if (!this.enabled) return;
        console.warn('[BHUKH LAGI]', message, data || '');
    },

    error: function (message, error) {
        console.error('[BHUKH LAGI]', message, error || '');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppLogger;
}