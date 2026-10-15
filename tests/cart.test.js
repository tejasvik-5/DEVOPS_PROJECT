/* ==========================================================================
   BHUKH LAGI — Cart Tests (single-stall enforcement)
   ========================================================================== */

describe('Cart (Single-Stall)', () => {
  const item1 = { id: 'MAX001', name: 'Paneer Tikka', price: 180, prepTime: 12, veg: true };
  const item2 = { id: 'MAX002', name: 'Chicken Tikka', price: 220, prepTime: 14, veg: false };
  const item3 = { id: 'DSA001', name: 'Masala Dosa', price: 90, prepTime: 8, veg: true };

  test('empty cart has no stall', () => {
    const cart = Store.getCart();
    expect(cart.stallId).toBeNull();
    expect(cart.items).toEqual([]);
  });

  test('addToCart adds item and sets stall', () => {
    const result = Store.addToCart('maximus', 'Maximus', item1);
    expect(result.conflict).toBe(false);
    expect(result.cart.stallId).toBe('maximus');
    expect(result.cart.items.length).toBe(1);
    expect(result.cart.items[0].qty).toBe(1);
  });

  test('addToCart increments qty for same item', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    Store.addToCart('maximus', 'Maximus', item1);
    const cart = Store.getCart();
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].qty).toBe(2);
  });

  test('addToCart adds different items from same stall', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    Store.addToCart('maximus', 'Maximus', item2);
    const cart = Store.getCart();
    expect(cart.items.length).toBe(2);
  });

  test('addToCart returns conflict for different stall', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    const result = Store.addToCart('dosa-express', 'Dosa Express', item3);
    expect(result.conflict).toBe(true);
    expect(result.currentStall).toBe('Maximus');
    expect(result.pendingItem.id).toBe('DSA001');
  });

  test('forceAddToCart clears old stall and adds new item', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    const result = Store.forceAddToCart('dosa-express', 'Dosa Express', item3);
    expect(result.conflict).toBe(false);
    const cart = Store.getCart();
    expect(cart.stallId).toBe('dosa-express');
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].name).toBe('Masala Dosa');
  });

  test('updateCartItemQty decreases quantity', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    Store.addToCart('maximus', 'Maximus', item1);
    Store.updateCartItemQty('MAX001', 1);
    expect(Store.getCartItemQty('MAX001')).toBe(1);
  });

  test('updateCartItemQty removes item when qty is 0', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    Store.updateCartItemQty('MAX001', 0);
    const cart = Store.getCart();
    expect(cart.items.length).toBe(0);
    expect(cart.stallId).toBeNull();
  });

  test('removeFromCart removes specific item', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    Store.addToCart('maximus', 'Maximus', item2);
    Store.removeFromCart('MAX001');
    const cart = Store.getCart();
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].id).toBe('MAX002');
  });

  test('clearCart empties everything', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    Store.clearCart();
    const cart = Store.getCart();
    expect(cart.stallId).toBeNull();
    expect(cart.items.length).toBe(0);
  });

  test('getCartTotal calculates correctly', () => {
    Store.addToCart('maximus', 'Maximus', item1); // 180
    Store.addToCart('maximus', 'Maximus', item2); // 220
    Store.addToCart('maximus', 'Maximus', item1); // 180 x 2
    expect(Store.getCartTotal()).toBe(180 * 2 + 220);
  });

  test('getCartItemCount sums quantities', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    Store.addToCart('maximus', 'Maximus', item1);
    Store.addToCart('maximus', 'Maximus', item2);
    expect(Store.getCartItemCount()).toBe(3);
  });

  test('cart change listener is notified', () => {
    const listener = jest.fn();
    Store.onCartChange(listener);
    Store.addToCart('maximus', 'Maximus', item1);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('adding to empty cart after stall switch conflict clears stall', () => {
    Store.addToCart('maximus', 'Maximus', item1);
    const conflict = Store.addToCart('dosa-express', 'Dosa Express', item3);
    expect(conflict.conflict).toBe(true);

    // User does NOT confirm — cart unchanged
    expect(Store.getCart().stallId).toBe('maximus');
    expect(Store.getCartItemCount()).toBe(1);
  });
});
test('cart quantity cannot exceed 10', () => {
  Store.addToCart('maximus', 'Maximus', item1);
  Store.updateCartItemQty('MAX001', 25);

  expect(Store.getCartItemQty('MAX001')).toBe(10);
test('getCartTotal ignores invalid item price', () => {
  Store.setCart({
    stallId: 'maximus',
    stallName: 'Maximus',
    items: [
      { id: 'A', name: 'Valid', price: 100, qty: 2 },
      { id: 'B', name: 'Invalid', price: 'bad', qty: 2 }
    ]
  });

  expect(Store.getCartTotal()).toBe(200);
});
});
