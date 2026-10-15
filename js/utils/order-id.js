/* ==========================================================================
   BHUKH LAGI — Order ID Generator (order-id.js)
   Generates unique order IDs with BL prefix.
   ========================================================================== */

const OrderID = {
  /**
   * Generate a unique order ID: BL + 5 digits
   * e.g., BL12345, BL00042
   */
  generate() {
    // Get current counter from localStorage, increment
    let counter = parseInt(localStorage.getItem('bl_order_counter') || '10000', 10);
    counter++;
    localStorage.setItem('bl_order_counter', counter.toString());
    return `BL${counter}`;
  },

  /**
   * Reset counter (for testing)
   */
  reset() {
    localStorage.setItem('bl_order_counter', '10000');
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrderID;
}
