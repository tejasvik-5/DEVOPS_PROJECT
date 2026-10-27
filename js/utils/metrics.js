var Metrics = {
    countByStatus: function (orders, status) {
        return orders.filter(function (order) {
            return order.status === status;
        }).length;
    },

    totalValue: function (orders) {
        return orders.reduce(function (sum, order) {
            return sum + Number(order.total || 0);
        }, 0);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Metrics;
}