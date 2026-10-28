describe('OrderStatus', () => {
  test('allows PENDING to PREPARING', () => {
    expect(OrderStatus.canTransition('PENDING', 'PREPARING')).toBe(true);
  });

  test('allows PREPARING to READY', () => {
    expect(OrderStatus.canTransition('PREPARING', 'READY')).toBe(true);
  });

  test('rejects COMPLETED to PREPARING', () => {
    expect(OrderStatus.canTransition('COMPLETED', 'PREPARING')).toBe(false);
  });

  test('allows cancellation from PENDING', () => {
    expect(OrderStatus.canCancel('PENDING')).toBe(true);
  });

  test('does not allow cancellation after READY', () => {
    expect(OrderStatus.canCancel('READY')).toBe(false);
  });
test('invalid order transition is rejected', () => {
  Store.addOrder({
    id: 'BL10001',
    status: 'COMPLETED',
    orderStatus: 'COMPLETED',
    stallId: 'maximus',
    total: 100,
    items: []
  });

  var result = Store.updateOrderStatus('BL10001', 'PREPARING');

  expect(result.success).toBe(false);
  expect(result.reason).toBe('INVALID_TRANSITION');
});

test('week two order workflow follows valid status sequence', () => {
  Store.addOrder({
    id: 'BL20001',
    status: 'PENDING',
    stallId: 'maximus',
    total: 100,
    items: [
      { id: 'MAX023', name: 'Samosa', qty: 1, price: 100 }
    ]
  });

  var preparing = Store.updateOrderStatus('BL20001', 'PREPARING');
  expect(preparing.success).toBe(true);

  var ready = Store.updateOrderStatus('BL20001', 'READY');
  expect(ready.success).toBe(true);

  var completed = Store.updateOrderStatus('BL20001', 'COMPLETED');
  expect(completed.success).toBe(true);

  var order = Store.getOrder('BL20001');
  expect(order.status).toBe('COMPLETED');
});

test('completed order cannot be cancelled', () => {
  Store.addOrder({
    id: 'BL10001',
    status: 'COMPLETED',
    stallId: 'maximus',
    total: 100,
    items: []
  });

  var result = Store.cancelOrder('BL10001');

  expect(result.success).toBe(false);
  expect(result.reason).toBe('CANNOT_CANCEL');
});