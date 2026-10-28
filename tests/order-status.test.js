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
});