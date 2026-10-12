/* ==========================================================================
   BHUKH LAGI — Order & Time Tests
   ========================================================================== */

describe('Order', () => {
  test('OrderID generates incrementing IDs', () => {
    OrderID.reset();
    const id1 = OrderID.generate();
    const id2 = OrderID.generate();
    expect(id1).toBe('BL10001');
    expect(id2).toBe('BL10002');
  });

  test('OrderID prefix matches BRAND config', () => {
    OrderID.reset();
    const id = OrderID.generate();
    expect(id.startsWith(BRAND.orderPrefix)).toBe(true);
  });
});

describe('TimeUtil', () => {
  test('addMinutes adds correctly', () => {
    const base = new Date('2026-09-13T12:00:00');
    const result = TimeUtil.addMinutes(base, 15);
    expect(result.getMinutes()).toBe(15);
  });

  test('calculateOrderTimes returns all fields', () => {
    const now = new Date('2026-09-13T12:30:00');
    const times = TimeUtil.calculateOrderTimes(now, 15);
    expect(times.placedAt).toBeTruthy();
    expect(times.acceptedAt).toBeTruthy();
    expect(times.estimatedReadyAt).toBeTruthy();
    expect(times.pickupWindowStart).toBeTruthy();
    expect(times.pickupWindowEnd).toBeTruthy();
  });

  test('calculateOrderTimes estimated ready = placed + buffer + prepTime', () => {
    const now = new Date('2026-09-13T12:30:00');
    const times = TimeUtil.calculateOrderTimes(now, 15);
    const ready = new Date(times.estimatedReadyAt);
    // 12:30 + 2 (buffer) + 15 (prep) = 12:47
    expect(ready.getHours()).toBe(12);
    expect(ready.getMinutes()).toBe(47);
  });

  test('getMaxPrepTime returns highest prep time', () => {
    const items = [
      { prepTime: 8 },
      { prepTime: 15 },
      { prepTime: 12 }
    ];
    expect(TimeUtil.getMaxPrepTime(items)).toBe(15);
  });

  test('getTodayStr returns YYYY-MM-DD format', () => {
    const today = TimeUtil.getTodayStr();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('formatTime returns readable time', () => {
    const date = new Date('2026-09-13T14:30:00');
    const formatted = TimeUtil.formatTime(date);
    expect(formatted).toMatch(/2:30\s*PM/i);
  });
});

describe('Payment & Order Model', () => {
  test('creates Pay at Counter order with proper payment method and status', () => {
    OrderID.reset();
    const orderId = OrderID.generate();
    const order = {
      id: orderId,
      orderId: orderId,
      stallId: 'maximus',
      stallName: 'Maximus',
      items: [{ id: 'MAX001', name: 'Paneer Tikka', qty: 1, price: 180 }],
      total: 180,
      status: 'PENDING',
      orderStatus: 'PENDING',
      paymentMethod: 'PAY_AT_COUNTER',
      paymentStatus: 'PAY_AT_COUNTER'
    };

    Store.addOrder(order);
    const retrieved = Store.getOrder(orderId);
    expect(retrieved.paymentMethod).toBe('PAY_AT_COUNTER');
    expect(retrieved.paymentStatus).toBe('PAY_AT_COUNTER');
    expect(retrieved.status).toBe('PENDING');
    expect(retrieved.razorpayOrderId).toBeUndefined();
    expect(retrieved.razorpayPaymentId).toBeUndefined();
  });

  test('order food preparation status transitions correctly (PENDING -> PREPARING -> READY -> COMPLETED)', () => {
    OrderID.reset();
    const orderId = OrderID.generate();
    const order = {
      id: orderId,
      stallId: 'dosa-express',
      stallName: 'Dosa Express',
      items: [{ id: 'DSA001', name: 'Masala Dosa', qty: 1, price: 90 }],
      total: 90,
      status: 'PENDING',
      paymentMethod: 'PAY_AT_COUNTER',
      paymentStatus: 'PAY_AT_COUNTER'
    };
    Store.addOrder(order);

    // Transition 1: Order accepted / preparing
    Store.updateOrder(orderId, { status: 'PREPARING', acceptedAt: new Date().toISOString() });
    let current = Store.getOrder(orderId);
    expect(current.status).toBe('PREPARING');
    expect(current.paymentMethod).toBe('PAY_AT_COUNTER');

    // Transition 2: Food ready for pickup
    Store.updateOrder(orderId, { status: 'READY', actualReadyAt: new Date().toISOString() });
    current = Store.getOrder(orderId);
    expect(current.status).toBe('READY');

    // Transition 3: Completed at counter
    Store.updateOrder(orderId, { status: 'COMPLETED', completedAt: new Date().toISOString() });
    current = Store.getOrder(orderId);
    expect(current.status).toBe('COMPLETED');
  });
});
