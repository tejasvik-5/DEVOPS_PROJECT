/* ==========================================================================
   BHUKH LAGI — Data & Brand Tests
   ========================================================================== */

describe('StallData', () => {
  test('has 8 stalls', () => {
    expect(StallData.stalls.length).toBe(8);
  });

  test('getStall returns correct stall', () => {
    const stall = StallData.getStall('maximus');
    expect(stall).not.toBeNull();
    expect(stall.name).toBe('Maximus Live Counter');
  });

  test('getStall returns null for invalid id', () => {
    expect(StallData.getStall('nonexistent')).toBeNull();
  });

  test('getItem returns item with stall info', () => {
    const item = StallData.getItem('MAX023');
    expect(item).not.toBeNull();
    expect(item.name).toBe('Samosa');
    expect(item.stallId).toBe('maximus');
  });

  test('getAllMenuItems returns all items', () => {
    const items = StallData.getAllMenuItems();
    expect(items.length).toBeGreaterThan(50);
  });

  test('getPopularItems returns limited items', () => {
    const popular = StallData.getPopularItems(4);
    expect(popular.length).toBeLessThanOrEqual(4);
  });

  test('searchItems finds stalls by name', () => {
    const results = StallData.searchItems('maximus');
    expect(results.stalls.length).toBeGreaterThan(0);
  });

  test('searchItems finds items by name', () => {
    const results = StallData.searchItems('paneer');
    expect(results.items.length).toBeGreaterThan(0);
  });

  test('searchItems returns empty for short query', () => {
    const results = StallData.searchItems('a');
    expect(results.stalls.length).toBe(0);
    expect(results.items.length).toBe(0);
  });

  test('getCategories returns unique categories', () => {
    const cats = StallData.getCategories();
    expect(cats.length).toBeGreaterThan(0);
    const unique = new Set(cats);
    expect(unique.size).toBe(cats.length);
  });

  test('verified flag exists on menu items', () => {
    const item = StallData.getItem('MAX023');
    expect(item).toHaveProperty('verified');
    expect(typeof item.verified).toBe('boolean');
  });

  test('all menu items have an image property', () => {
    const items = StallData.getAllMenuItems();
    expect(items.length).toBeGreaterThan(300);
    items.forEach(item => {
      expect(item.image).toBeTruthy();
      expect(item.image).toMatch(/^assets\/images\/food\/[A-Za-z0-9_-]+\.webp$/);
    });
  });
});

describe('ADMIN_IDS', () => {
  test('has entries for all stalls', () => {
    expect(Object.keys(ADMIN_IDS).length).toBe(8);
  });

  test('admin-maximus maps to maximus stall', () => {
    expect(ADMIN_IDS['admin-maximus'].stallId).toBe('maximus');
  });

  test('invalid admin ID returns undefined', () => {
    expect(ADMIN_IDS['admin-invalid']).toBeUndefined();
  });
});

describe('BRAND', () => {
  test('has name and tagline', () => {
    expect(BRAND.name).toBe('BHUKH LAGI');
    expect(BRAND.tagline).toBe('Aaj kya khaoge?');
  });

  test('has logo paths', () => {
    expect(BRAND.logo.full).toBeTruthy();
    expect(BRAND.logo.compact).toBeTruthy();
    expect(BRAND.logo.icon).toBeTruthy();
  });

  test('getRandomLoadingMessage returns a string', () => {
    const msg = BRAND.getRandomLoadingMessage();
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  test('emptyStates has required keys', () => {
    expect(BRAND.emptyStates).toHaveProperty('cart');
    expect(BRAND.emptyStates).toHaveProperty('orders');
    expect(BRAND.emptyStates).toHaveProperty('stallClosed');
    expect(BRAND.emptyStates).toHaveProperty('searchNoResults');
  });
});
