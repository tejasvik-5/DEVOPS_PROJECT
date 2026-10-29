/* ==========================================================================
   BHUKH LAGI — Store Tests
   ========================================================================== */

describe('Store', () => {
  describe('User', () => {
    test('getUser returns null when no user', () => {
      expect(Store.getUser()).toBeNull();
    });

    test('setUser and getUser round-trip', () => {
      Store.setUser({ id: 'STU123', name: 'Test', role: 'student', stallId: null });
      const user = Store.getUser();
      expect(user.id).toBe('STU123');
      expect(user.name).toBe('Test');
      expect(user.role).toBe('student');
    });

    test('isLoggedIn returns true after login', () => {
      expect(Store.isLoggedIn()).toBe(false);
      Store.setUser({ id: 'STU123', name: 'Test', role: 'student' });
      expect(Store.isLoggedIn()).toBe(true);
    });

    test('isAdmin returns true for admin role', () => {
      Store.setUser({ id: 'admin-maximus', name: 'Admin', role: 'admin', stallId: 'maximus' });
      expect(Store.isAdmin()).toBe(true);
    });

    test('logout clears user', () => {
      Store.setUser({ id: 'STU123', name: 'Test', role: 'student' });
      Store.logout();
      expect(Store.isLoggedIn()).toBe(false);
    });
  });

  describe('Orders', () => {
    test('getOrders returns empty array initially', () => {
      expect(Store.getOrders()).toEqual([]);
    });

    test('addOrder prepends order', () => {
      Store.addOrder({ id: 'BL10001', status: 'PENDING', stallId: 'maximus', total: 100, items: [] });
      Store.addOrder({ id: 'BL10002', status: 'PENDING', stallId: 'maximus', total: 200, items: [] });
      const orders = Store.getOrders();
      expect(orders.length).toBe(2);
      expect(orders[0].id).toBe('BL10002');
    });

    test('updateOrder modifies order fields', () => {
      Store.addOrder({ id: 'BL10001', status: 'PENDING', stallId: 'maximus', total: 100, items: [] });
      Store.updateOrder('BL10001', { status: 'PREPARING', acceptedAt: '2026-09-13T12:00:00' });
      const order = Store.getOrder('BL10001');
      expect(order.status).toBe('PREPARING');
      expect(order.acceptedAt).toBe('2026-09-13T12:00:00');
    });

    test('getActiveOrders filters correctly', () => {
      Store.addOrder({ id: 'BL10001', status: 'PENDING', stallId: 'x', total: 0, items: [] });
      Store.addOrder({ id: 'BL10002', status: 'COMPLETED', stallId: 'x', total: 0, items: [] });
      Store.addOrder({ id: 'BL10003', status: 'PREPARING', stallId: 'x', total: 0, items: [] });
      expect(Store.getActiveOrders().length).toBe(2);
      expect(Store.getPastOrders().length).toBe(1);
    });

    test('getStallOrders filters by stallId', () => {
      Store.addOrder({ id: 'BL10001', status: 'PENDING', stallId: 'maximus', total: 0, items: [] });
      Store.addOrder({ id: 'BL10002', status: 'PENDING', stallId: 'dosa-express', total: 0, items: [] });
      expect(Store.getStallOrders('maximus').length).toBe(1);
    });
  });
test('status label is readable', () => {
  expect(Store.getOrderStatusLabel('PENDING')).toBe('Pending');
  expect(Store.getOrderStatusLabel('READY')).toBe('Ready');
});

test('unknown status gets safe fallback', () => {
  expect(Store.getOrderStatusLabel('UNKNOWN')).toBe('Unknown');
  
});
  
test('toggleItemAvailability switches an item state', () => {
  expect(Store.isItemAvailable('maximus', 'MAX023')).toBe(true);

  Store.toggleItemAvailability('maximus', 'MAX023');

  expect(Store.isItemAvailable('maximus', 'MAX023')).toBe(false);

  Store.toggleItemAvailability('maximus', 'MAX023');

  expect(Store.isItemAvailable('maximus', 'MAX023')).toBe(true);
});

test('bulk availability marks every stall item unavailable', () => {
  Store.setAllItemsAvailability('maximus', false);

  var stall = StallData.getStall('maximus');
  var menu = stall.menu;

  Object.keys(menu).forEach(function (category) {
    menu[category].forEach(function (item) {
      expect(Store.isItemAvailable('maximus', item.id)).toBe(false);
    });
  });
});

test('order metrics count statuses and total value', () => {
  var orders = [
    { status: 'PENDING', total: 100 },
    { status: 'READY', total: 150 },
    { status: 'COMPLETED', total: 200 }
  ];

  var metrics = Metrics.countByStatus(orders, 'READY');

  expect(metrics).toBe(1);
  expect(Metrics.totalValue(orders)).toBe(450);
});
test('order metrics count statuses and total value', () => {
  var orders = [
    { status: 'PENDING', total: 100 },
    { status: 'READY', total: 150 },
    { status: 'COMPLETED', total: 200 }
  ];

  var metrics = Metrics.countByStatus(orders, 'READY');

  expect(metrics).toBe(1);
  expect(Metrics.totalValue(orders)).toBe(450);
});
});