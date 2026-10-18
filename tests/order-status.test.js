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
});