var OrderStatus = {
  ACTIVE: ['PENDING', 'PREPARING', 'DELAYED', 'READY'],

  TRANSITIONS: {
    PENDING: ['PREPARING', 'CANCELLED'],
    PREPARING: ['READY', 'DELAYED', 'CANCELLED'],
    DELAYED: ['READY', 'CANCELLED'],
    READY: ['COMPLETED'],
    COMPLETED: [],
    CANCELLED: []
  },

  canTransition: function (from, to) {
    if (!this.TRANSITIONS[from]) return false;
    return this.TRANSITIONS[from].indexOf(to) !== -1;
  },

  canCancel: function (status) {
    return ['PENDING', 'PREPARING', 'DELAYED'].indexOf(status) !== -1;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrderStatus;
}