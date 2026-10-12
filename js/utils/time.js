/* ==========================================================================
   BHUKH LAGI — Time Utilities (time.js)
   Time formatting, scheduling, and estimation helpers.
   ========================================================================== */

const TimeUtil = {
  /**
   * Format time as "12:30 PM"
   */
  formatTime(date) {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  },

  /**
   * Format date as "Sep 12, 2026"
   */
  formatDate(date) {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  /**
   * Format date as "Sep 12"
   */
  formatDateShort(date) {
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  },

  /**
   * Format relative time "2 min ago"
   */
  formatRelative(date) {
    if (typeof date === 'string') date = new Date(date);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return TimeUtil.formatDateShort(date);
  },

  /**
   * Format time range "12:35 – 12:45 PM"
   */
  formatTimeRange(start, end) {
    if (typeof start === 'string') start = new Date(start);
    if (typeof end === 'string') end = new Date(end);
    const startStr = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
    const endStr = TimeUtil.formatTime(end);
    return `${startStr} – ${endStr}`;
  },

  /**
   * Add minutes to a date
   */
  addMinutes(date, minutes) {
    if (typeof date === 'string') date = new Date(date);
    return new Date(date.getTime() + minutes * 60000);
  },

  /**
   * Calculate estimated prep times for an order
   */
  calculateOrderTimes(placedAt, maxPrepTimeMin) {
    const placed = typeof placedAt === 'string' ? new Date(placedAt) : placedAt;
    const acceptanceBuffer = 2; // minutes
    const pickupWindowDuration = 10; // minutes

    const acceptedAt = TimeUtil.addMinutes(placed, acceptanceBuffer);
    const estimatedReadyAt = TimeUtil.addMinutes(acceptedAt, maxPrepTimeMin);
    const pickupWindowStart = estimatedReadyAt;
    const pickupWindowEnd = TimeUtil.addMinutes(pickupWindowStart, pickupWindowDuration);

    return {
      placedAt: placed.toISOString(),
      acceptedAt: acceptedAt.toISOString(),
      estimatedReadyAt: estimatedReadyAt.toISOString(),
      pickupWindowStart: pickupWindowStart.toISOString(),
      pickupWindowEnd: pickupWindowEnd.toISOString()
    };
  },

  /**
   * Get max prep time from cart items
   */
  getMaxPrepTime(items) {
    return Math.max(...items.map(item => item.prepTime || 10));
  },

  /**
   * Check if a stall is currently open based on operating hours
   */
  isStallOpen(operatingHours) {
    if (!operatingHours) return true;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const [openH, openM] = operatingHours.open.split(':').map(Number);
    const [closeH, closeM] = operatingHours.close.split(':').map(Number);
    const openTime = openH * 60 + openM;
    const closeTime = closeH * 60 + closeM;

    return currentTime >= openTime && currentTime <= closeTime;
  },

  /**
   * Get today's day name (lowercase)
   */
  getTodayName() {
    return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
  },

  /**
   * Get today's date string (YYYY-MM-DD)
   */
  getTodayStr() {
    return new Date().toISOString().split('T')[0];
  },

  /**
   * Check if two date strings are the same day
   */
  isSameDay(d1, d2) {
    return d1.split('T')[0] === d2.split('T')[0];
  },

  /**
   * Check if date is yesterday
   */
  isYesterday(dateStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateStr === yesterday.toISOString().split('T')[0];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TimeUtil;
}
