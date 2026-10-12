var Validation = {
  text: function (value, minLength, maxLength) {
    var valueText = String(value || '').trim();
    return valueText.length >= minLength &&
      valueText.length <= maxLength;
  },

  studentLogin: function (name, id) {
    return this.text(name, 2, 60) &&
      this.text(id, 3, 30);
  },

  adminLogin: function (id) {
    return /^admin-[a-z0-9-]+$/i.test(String(id || '').trim());
  },

  quantity: function (qty) {
    var n = Number(qty);
    return Number.isInteger(n) && n >= 1 && n <= 10;
  },

  money: function (value) {
    var n = Number(value);
    return Number.isFinite(n) && n >= 0;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Validation;
}