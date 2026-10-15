/* ==========================================================================
   BHUKH LAGI — Food Card Component Unit Tests
   Verifies:
   - Removal of food photographs from all individual menu item cards (<img> = 0)
   - Removal of image wrappers, placeholders, and aspect-ratio containers
   - Clean, compact card layout with category vector icon badges
   - All 362 menu items across all 8 stalls render without broken/blank image areas
   - Preserves card metadata, pricing, veg/non-veg tags, and action buttons
   - Preserves stall images and home page images
   ========================================================================== */

describe('FoodCard — Compact Non-Photo Visual Cards', () => {
  const allItems = StallData.getAllMenuItems();

  test('has 362 total menu items across stalls', () => {
    expect(allItems.length).toBe(362);
  });

  test('FoodCard.render never renders <img> photographs for menu items', () => {
    let imgTagCount = 0;
    allItems.forEach(item => {
      const html = FoodCard.render(item, item.stallId, 'Test Stall');
      if (html.includes('<img')) {
        imgTagCount++;
      }
    });
    expect(imgTagCount).toBe(0);
  });

  test('FoodCard.render has zero image wrappers and zero placeholders across all 362 items', () => {
    let imageWrapperCount = 0;
    let placeholderCount = 0;
    let badgeCount = 0;

    allItems.forEach(item => {
      const html = FoodCard.render(item, item.stallId, 'Test Stall');
      if (html.includes('food-card__image')) {
        imageWrapperCount++;
      }
      if (html.includes('food-card__image-placeholder')) {
        placeholderCount++;
      }
      if (html.includes('food-card__icon-badge')) {
        badgeCount++;
      }
      expect(html).toContain('<svg');
      expect(html).toContain('food-card__top');
      expect(html).toContain('food-card__footer');
      expect(html).toContain('food-card__pricing');
    });

    expect(imageWrapperCount).toBe(0);
    expect(placeholderCount).toBe(0);
    expect(badgeCount).toBe(362);
  });

  test('All 8 stalls menu items render valid compact cards without <img> tags', () => {
    const stalls = ['maximus', 'dosa-express', 'appetite', 'annapurna', 'wataburger', 'dominos', 'cafefrisco', 'chaigaram'];
    stalls.forEach(stallId => {
      const stall = StallData.getStall(stallId);
      expect(stall).not.toBeNull();
      const menu = StallData.getStallMenu(stallId);
      Object.keys(menu).forEach(cat => {
        const items = menu[cat];
        expect(items.length).toBeGreaterThan(0);
        const gridHtml = FoodCard.renderGrid(items, stallId, stall.name, cat);
        expect(gridHtml).not.toContain('<img');
        expect(gridHtml).not.toContain('food-card__image');
        expect(gridHtml).toContain('food-card__icon-badge');
      });
    });
  });

  test('Accurately detects distinct categories (dosa, burger, pizza, chai, thali, rice, dessert, etc.)', () => {
    const dosaItem = StallData.getItem('DOS001'); // Masala Dosa
    const burgerItem = StallData.getItem('WAB001'); // Aloo Bechara / Burger
    const pizzaItem = StallData.getItem('DOM001'); // Margherita
    const chaiItem = StallData.getItem('CHG001'); // Masala Chai
    const thaliItem = StallData.getItem('MAX001'); // Veg Thali
    const riceItem = StallData.getItem('MAX002'); // Veg Biryani
    const dessertItem = StallData.getItem('DOM049') || StallData.getItem('WAB033'); // Choco Lava Cake

    if (dosaItem) {
      const html = FoodCard.render(dosaItem, dosaItem.stallId, 'Dosa Express', 'Dosa Counter');
      expect(html).toContain('food-card__icon-badge--dosa');
      expect(html).toContain('South Indian');
    }
    if (burgerItem) {
      const html = FoodCard.render(burgerItem, burgerItem.stallId, 'Wat-a-Burger', 'Burgers');
      expect(html).toContain('food-card__icon-badge--burger');
      expect(html).toContain('Burger');
    }
    if (pizzaItem) {
      const html = FoodCard.render(pizzaItem, pizzaItem.stallId, "Domino's", 'Veg Pizza');
      expect(html).toContain('food-card__icon-badge--pizza');
      expect(html).toContain('Pizza');
    }
    if (chaiItem) {
      const html = FoodCard.render(chaiItem, chaiItem.stallId, 'Chai Garam', 'Chai Bar');
      expect(html).toContain('food-card__icon-badge--beverage');
      expect(html).toContain('Chai &amp; Beverage');
    }
    if (thaliItem) {
      const html = FoodCard.render(thaliItem, thaliItem.stallId, 'Maximus Live Counter', 'Thali Counter');
      expect(html).toContain('food-card__icon-badge--thali');
      expect(html).toContain('Thali &amp; Meal');
    }
    if (riceItem) {
      const html = FoodCard.render(riceItem, riceItem.stallId, 'Maximus Live Counter', 'Thali Counter');
      expect(html).toContain('food-card__icon-badge--rice');
      expect(html).toContain('Rice &amp; Biryani');
    }
    if (dessertItem) {
      const html = FoodCard.render(dessertItem, dessertItem.stallId, "Domino's", 'Desserts');
      expect(html).toContain('food-card__icon-badge--dessert');
      expect(html).toContain('Dessert &amp; Bakery');
    }
  });

  test('Preserves essential card elements: name, price, veg status, prep time, and add button', () => {
    const item = StallData.getItem('MAX023'); // Samosa
    const html = FoodCard.render(item, 'maximus', 'Maximus Live Counter', 'Live Counter');
    expect(html).toContain('Samosa');
    expect(html).toContain('₹12');
    expect(html).toContain('veg-indicator--veg');
    expect(html).toContain('2 min');
    expect(html).toContain('add-btn');
    expect(html).not.toContain('<img');
  });

  test('Food court stall images and campus hero are untouched in data', () => {
    StallData.stalls.forEach(stall => {
      expect(stall.image).toBeTruthy();
      expect(stall.image.length).toBeGreaterThan(0);
    });
  });

  test('Audit all 8 stall pages: 0 food-card <img>, 0 image wrappers, stall hero preserved', () => {
    const stalls = [
      { id: 'maximus', name: 'Maximus Live Counter' },
      { id: 'dosa-express', name: 'Dosa Express' },
      { id: 'appetite', name: 'Appetite – The Kathi Roll Shop' },
      { id: 'annapurna', name: 'Annapurna Southern Delights' },
      { id: 'wataburger', name: 'Wat-a-Burger' },
      { id: 'dominos', name: "Domino's" },
      { id: 'cafefrisco', name: 'Café Frisco' },
      { id: 'chaigaram', name: 'Chai Garam' }
    ];

    const div = document.createElement('div');
    let totalCards = 0;

    stalls.forEach(s => {
      StallDetailPage.render(div, s.id);

      // Hero banner preserved
      const hero = div.querySelector('.stall-hero img');
      expect(hero).not.toBeNull();
      expect(hero.getAttribute('src')).toBeTruthy();

      // Zero menu item photos
      const menuImgs = div.querySelectorAll('.food-card img');
      expect(menuImgs.length).toBe(0);

      // Zero image wrappers
      const wrappers = div.querySelectorAll('.food-card__image');
      expect(wrappers.length).toBe(0);

      // Zero image placeholders
      const placeholders = div.querySelectorAll('.food-card__image-placeholder');
      expect(placeholders.length).toBe(0);

      // All cards have icon badges
      const cards = div.querySelectorAll('.food-card');
      const badges = div.querySelectorAll('.food-card__icon-badge');
      expect(badges.length).toBe(cards.length);
      expect(cards.length).toBeGreaterThan(0);

      totalCards += cards.length;
    });

    expect(totalCards).toBe(362);
  });

  test('Audit Bite It sub-brand items under Chai Garam: 0 food-card <img>', () => {
    const menu = StallData.getStallMenu('chaigaram');
    const biteItItems = [];
    Object.keys(menu).forEach(cat => {
      menu[cat].forEach(item => {
        if (item.subBrand === 'Bite It' || (item.id && item.id.startsWith('BIT'))) {
          biteItItems.push(item);
        }
      });
    });

    expect(biteItItems.length).toBe(49);
    biteItItems.forEach(item => {
      const html = FoodCard.render(item, 'chaigaram', 'Chai Garam', 'Bite It');
      expect(html).not.toContain('<img');
      expect(html).not.toContain('food-card__image');
      expect(html).toContain('food-card__icon-badge');
    });
  });
test('food card becomes unavailable when Store override is false', () => {
  var item = StallData.getItem('MAX023');

  Store.setStallOverride('maximus', {
    items: { MAX023: false }
  });

  var html = FoodCard.render(
    item,
    'maximus',
    'Maximus Live Counter',
    'Live Counter'
  );

  expect(html).toContain('Currently unavailable');
  expect(html).toContain('disabled');
}); 
});
