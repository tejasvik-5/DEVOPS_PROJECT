/* ==========================================================================
   BHUKH LAGI — Campus Food Stall Data (data.js) — v3 Real Campus Menu
   Source: BHUKH_LAGI_Menu_Transcription.md + user campus photographs.
   [VERIFY] items have verified:false; clearly readable items have verified:true.
   Chai Garam is ONE franchisee; Bite It is a sub-brand within it.
   ========================================================================== */

var ADMIN_IDS = {
  'admin-maximus':    { stallId: 'maximus',      name: 'Maximus Admin' },
  'admin-dosa':       { stallId: 'dosa-express', name: 'Dosa Express Admin' },
  'admin-appetite':   { stallId: 'appetite',     name: 'Appetite Admin' },
  'admin-annapurna':  { stallId: 'annapurna',    name: 'Annapurna Admin' },
  'admin-burger':     { stallId: 'wataburger',   name: 'Wat-a-Burger Admin' },
  'admin-dominos':    { stallId: 'dominos',      name: "Domino's Admin" },
  'admin-cafefrisco': { stallId: 'cafefrisco',   name: 'Café Frisco Admin' },
  'admin-chaigaram':  { stallId: 'chaigaram',    name: 'Chai Garam Admin' }
};

var StallData = {
  stalls: [

    /* ── 1. MAXIMUS LIVE COUNTER ──────────────────────────────────────── */
    {
      id: 'maximus',
      name: 'Maximus Live Counter',
      category: ['North Indian', 'Chinese', 'Breakfast'],
      description: 'Fresh live counter serving hearty North Indian thalis, biryanis, breads, and breakfast staples.',
      image: 'assets/food/biryani-thali.jpg',
      foodImage: 'assets/food/biryani-thali.jpg',
      operatingHours: { open: '09:00', close: '21:00' },
      avgPrepTime: { min: 5, max: 20 },
      popularItems: ['MAX023', 'MAX001', 'MAX028', 'MAX031'],
      menu: {
        'Thali Counter': [
          { id: 'MAX001', name: 'Veg Thali',                              price: 75,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX001.webp' },
          { id: 'MAX002', name: 'Veg Biryani',                            price: 70,  prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX002.webp' },
          { id: 'MAX003', name: 'Rajma Rice',                             price: 50,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX003.webp' },
          { id: 'MAX004', name: 'Chole Rice',                             price: 50,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX004.webp' },
          { id: 'MAX005', name: 'Kadhi Rice',                             price: 50,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX005.webp' },
          { id: 'MAX006', name: 'Special Veg Thali',                      price: 125, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX006.webp' },
          { id: 'MAX007', name: 'Egg Curry & Rice / Roti (2 Pc)',         price: 65,  prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/MAX007.webp' },
          { id: 'MAX008', name: 'Egg Biryani',                            price: 70,  prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/MAX008.webp' },
          { id: 'MAX009', name: 'Non-Veg Thali',                          price: 140, prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/MAX009.webp' },
          { id: 'MAX010', name: '1 Pc Butter Naan',                       price: 25,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX010.webp' },
          { id: 'MAX011', name: '1 Pc Roti (Tandoori)',                   price: 10,  prepTime: 4,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX011.webp' },
          { id: 'MAX012', name: 'Chicken + Roti / Rice',                  price: 100, prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/MAX012.webp' },
          { id: 'MAX013', name: 'Chicken Biryani',                        price: 140, prepTime: 18, veg: false, available: true, verified: true, image: 'assets/images/food/MAX013.webp' },
          { id: 'MAX014', name: 'Gravy Paneer + 2 Pc Naan',              price: 120, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX014.webp' },
          { id: 'MAX015', name: 'Pindi Chole + 2 Pc Stuff Kulcha',        price: 100, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX015.webp' },
          { id: 'MAX016', name: 'Pindi Chole Poori + Raita',              price: 55,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX016.webp' },
          { id: 'MAX017', name: 'Chicken Curry + Butter Naan',            price: 130, prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/MAX017.webp' },
          { id: 'MAX018', name: 'Pindi Chole + Bhature',                  price: 70,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX018.webp' },
          { id: 'MAX019', name: 'Muradabadi Biryani',                     price: 65,  prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/MAX019.webp' },
          { id: 'MAX020', name: 'Dal + Roti / Rice',                      price: 50,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX020.webp' },
          { id: 'MAX021', name: 'Fried Rice',                             price: 70,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX021.webp' },
          { id: 'MAX022', name: 'Noodles',                                price: 70,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX022.webp' }
        ],
        'Live Counter': [
          { id: 'MAX023', name: 'Samosa',                                 price: 12,  prepTime: 2,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX023.webp' },
          { id: 'MAX024', name: 'Bread Pakoda',                           price: 25,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX024.webp' },
          { id: 'MAX025', name: 'Chole Samosa Chat',                      price: 25,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX025.webp' },
          { id: 'MAX026', name: 'Plain Omelette',                         price: 35,  prepTime: 5,  veg: false, available: true, verified: true, image: 'assets/images/food/MAX026.webp' },
          { id: 'MAX027', name: 'Choley Poori',                           price: 45,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX027.webp' },
          { id: 'MAX028', name: 'Aloo Paratha',                           price: 40,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX028.webp' },
          { id: 'MAX029', name: 'Mix Paratha',                            price: 45,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX029.webp' },
          { id: 'MAX030', name: 'Tea',                                    price: 15,  prepTime: 3,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX030.webp' },
          { id: 'MAX031', name: 'Chole Bhatura',                          price: 60,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX031.webp' },
          { id: 'MAX032', name: 'Paneer Paratha',                         price: 60,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX032.webp' },
          { id: 'MAX033', name: 'Bread Omelet',                           price: 50,  prepTime: 6,  veg: false, available: true, verified: true, image: 'assets/images/food/MAX033.webp' },
          { id: 'MAX034', name: 'Coffee',                                 price: 22,  prepTime: 3,  veg: true,  available: true, verified: false, image: 'assets/images/food/MAX034.webp' },
          { id: 'MAX035', name: 'Aloo Stuffed Kulcha',                    price: 40,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX035.webp' },
          { id: 'MAX036', name: 'Plain Paratha + Choley',                 price: 40,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX036.webp' },
          { id: 'MAX037', name: 'Egg Paratha',                            price: 50,  prepTime: 7,  veg: false, available: true, verified: true, image: 'assets/images/food/MAX037.webp' },
          { id: 'MAX038', name: 'Poori Bhaji',                            price: 45,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX038.webp' },
          { id: 'MAX039', name: 'Pav Bhaji',                              price: 45,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX039.webp' },
          { id: 'MAX040', name: 'Poha',                                   price: 40,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX040.webp' },
          { id: 'MAX041', name: 'Macaroni',                               price: 40,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX041.webp' },
          { id: 'MAX042', name: 'Bread Roll',                             price: 20,  prepTime: 4,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX042.webp' },
          { id: 'MAX043', name: 'Gobhi Paratha',                          price: 35,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX043.webp' },
          { id: 'MAX044', name: 'Bread Butter',                           price: 35,  prepTime: 2,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX044.webp' },
          { id: 'MAX045', name: 'Aloo Toast',                             price: 35,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX045.webp' },
          { id: 'MAX046', name: 'Paneer Toast',                           price: 40,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX046.webp' },
          { id: 'MAX047', name: 'Egg Bhurji + Plain Paratha',             price: 60,  prepTime: 8,  veg: false, available: true, verified: true, image: 'assets/images/food/MAX047.webp' },
          { id: 'MAX048', name: 'Red Sauce Pasta',                        price: 50,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/MAX048.webp' },
          { id: 'MAX049', name: 'Egg Half Fry',                           price: 40,  prepTime: 5,  veg: false, available: true, verified: true, image: 'assets/images/food/MAX049.webp' },
          { id: 'MAX050', name: 'Paneer Stuffed Sandwich',                price: 50,  prepTime: 7,  veg: true,  available: true, verified: false, image: 'assets/images/food/MAX050.webp' },
          { id: 'MAX051', name: 'Paneer Grilled Sandwich',                price: 80,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX051.webp' },
          { id: 'MAX052', name: 'Veg Sandwich',                           price: 50,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX052.webp' },
          { id: 'MAX053', name: 'Gulab Jamun',                            price: 20,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX053.webp' },
          { id: 'MAX054', name: 'Chole Kulcha',                           price: 55,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/MAX054.webp' }
        ]
      }
    },

    /* ── 2. DOSA EXPRESS ──────────────────────────────────────────────── */
    {
      id: 'dosa-express',
      name: 'Dosa Express',
      category: ['South Indian'],
      description: 'Authentic South Indian dosas, uttapams, idlis, and a complete South Indian Thali.',
      image: 'assets/food/masala-dosa.jpg',
      foodImage: 'assets/food/masala-dosa.jpg',
      operatingHours: { open: '08:00', close: '20:00' },
      avgPrepTime: { min: 5, max: 15 },
      popularItems: ['DSA005', 'DSA028', 'DSA024', 'DSA013'],
      menu: {
        'Dosa': [
          { id: 'DSA001', name: 'Plain Dosa',              price: 50,  prepTime: 6,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA001.webp' },
          { id: 'DSA002', name: 'Butter Plain Dosa',        price: 65,  prepTime: 7,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA002.webp' },
          { id: 'DSA003', name: 'Veg Spring Dosa',          price: 65,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA003.webp' },
          { id: 'DSA004', name: 'Cheese Plain Dosa',        price: 80,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA004.webp' },
          { id: 'DSA005', name: 'Masala Dosa',              price: 65,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA005.webp' },
          { id: 'DSA006', name: 'Butter Masala Dosa',       price: 80,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA006.webp' },
          { id: 'DSA007', name: 'Onion Masala Dosa',        price: 60,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA007.webp' },
          { id: 'DSA008', name: 'Cheese Masala Dosa',       price: 90,  prepTime: 10, veg: true, available: true, verified: true, image: 'assets/images/food/DSA008.webp' },
          { id: 'DSA009', name: 'Mysoor Masala Dosa',       price: 80,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA009.webp' },
          { id: 'DSA010', name: 'Plain Mysoor Dosa',        price: 65,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA010.webp' },
          { id: 'DSA011', name: 'Cheese Chilly Dosa',       price: 90,  prepTime: 10, veg: true, available: true, verified: true, image: 'assets/images/food/DSA011.webp' },
          { id: 'DSA012', name: 'Sezwan Masala Dosa',       price: 70,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA012.webp' },
          { id: 'DSA013', name: 'Paneer Masala Dosa',       price: 80,  prepTime: 10, veg: true, available: true, verified: true, image: 'assets/images/food/DSA013.webp' },
          { id: 'DSA014', name: 'Paneer Sezwan Dosa',       price: 80,  prepTime: 10, veg: true, available: true, verified: true, image: 'assets/images/food/DSA014.webp' }
        ],
        'Rawa / Uttapam / Others': [
          { id: 'DSA015', name: 'Plain Rawa Dosa',           price: 60,  prepTime: 7,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA015.webp' },
          { id: 'DSA016', name: 'Masala Rawa Dosa',          price: 75,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA016.webp' },
          { id: 'DSA017', name: 'Rawa Butter Masala Dosa',   price: 80,  prepTime: 10, veg: true, available: true, verified: true, image: 'assets/images/food/DSA017.webp' },
          { id: 'DSA018', name: 'Sezwan Rawa Masala Dosa',   price: 80,  prepTime: 10, veg: true, available: true, verified: true, image: 'assets/images/food/DSA018.webp' },
          { id: 'DSA019', name: 'Plain Uttapam',             price: 50,  prepTime: 7,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA019.webp' },
          { id: 'DSA020', name: 'Onion Uttapam',             price: 60,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA020.webp' },
          { id: 'DSA021', name: 'Onion Tomato Uttapam',      price: 60,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA021.webp' },
          { id: 'DSA022', name: 'Mix Veg Uttapam',           price: 70,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA022.webp' },
          { id: 'DSA023', name: 'Cheese Uttapam',            price: 85,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA023.webp' },
          { id: 'DSA024', name: 'Idli Shambhar',             price: 50,  prepTime: 5,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA024.webp' },
          { id: 'DSA025', name: 'Vada Shambhar',             price: 55,  prepTime: 6,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA025.webp' },
          { id: 'DSA026', name: 'Masala Idli (2 Pc)',        price: 55,  prepTime: 6,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA026.webp' },
          { id: 'DSA027', name: 'Shambhar',                  price: 20,  prepTime: 2,  veg: true, available: true, verified: true, image: 'assets/images/food/DSA027.webp' },
          { id: 'DSA028', name: 'South Indian Thali',        price: 115, prepTime: 12, veg: true, available: true, verified: true, image: 'assets/images/food/DSA028.webp' }
        ]
      }
    },

    /* ── 3. APPETITE – THE KATHI ROLL SHOP ──────────────────────────── */
    {
      id: 'appetite',
      name: 'Appetite \u2013 The Kathi Roll Shop',
      category: ['Rolls', 'Wraps'],
      description: 'Sizzling kathi rolls made fresh to order — veg, egg, chicken, mutton and seekh options.',
      image: 'assets/food/kathi-roll.jpg',
      foodImage: 'assets/food/kathi-roll.jpg',
      operatingHours: { open: '10:00', close: '21:00' },
      avgPrepTime: { min: 5, max: 12 },
      popularItems: ['APP005', 'APP013', 'APP010', 'APP017'],
      menu: {
        'Veg Rolls': [
          { id: 'APP001', name: 'Single Aloo Roll',                       price: 40,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP001.webp' },
          { id: 'APP002', name: 'Double Aloo Roll',                       price: 50,  prepTime: 6,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP002.webp' },
          { id: 'APP003', name: 'Single Veggie Roll',                     price: 50,  prepTime: 6,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP003.webp' },
          { id: 'APP004', name: 'Double Veggie Roll',                     price: 65,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP004.webp' },
          { id: 'APP005', name: 'Single Paneer Roll',                     price: 80,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP005.webp' },
          { id: 'APP006', name: 'Single Paneer Bhuri Roll',               price: 80,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP006.webp' },
          { id: 'APP007', name: 'Double Paneer Bhuri Roll',               price: 100, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP007.webp' },
          { id: 'APP008', name: 'Single Soyabean Chaap Roll',             price: 70,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP008.webp' },
          { id: 'APP009', name: 'Double Soyabean Chaap Roll',             price: 100, prepTime: 9,  veg: true,  available: true, verified: true, image: 'assets/images/food/APP009.webp' }
        ],
        'Egg / Chicken Rolls': [
          { id: 'APP010', name: 'Single Egg Roll',                        price: 40,  prepTime: 5,  veg: false, available: true, verified: true, image: 'assets/images/food/APP010.webp' },
          { id: 'APP011', name: 'Double Egg Roll',                        price: 50,  prepTime: 6,  veg: false, available: true, verified: true, image: 'assets/images/food/APP011.webp' },
          { id: 'APP012', name: 'Triple Egg Roll',                        price: 60,  prepTime: 7,  veg: false, available: true, verified: true, image: 'assets/images/food/APP012.webp' },
          { id: 'APP013', name: 'Single Chicken Roll',                    price: 80,  prepTime: 8,  veg: false, available: true, verified: true, image: 'assets/images/food/APP013.webp' },
          { id: 'APP014', name: 'Single Egg Single Chicken Roll',         price: 90,  prepTime: 9,  veg: false, available: true, verified: true, image: 'assets/images/food/APP014.webp' },
          { id: 'APP015', name: 'Single Egg Double Chicken Roll',         price: 130, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/APP015.webp' },
          { id: 'APP016', name: 'Double Egg Double Chicken Roll',         price: 140, prepTime: 11, veg: false, available: true, verified: true, image: 'assets/images/food/APP016.webp' },
          { id: 'APP017', name: 'Chicken Tikka Roll',                     price: 100, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/APP017.webp' },
          { id: 'APP018', name: 'Double Chicken Tikka Roll',              price: 130, prepTime: 11, veg: false, available: true, verified: true, image: 'assets/images/food/APP018.webp' },
          { id: 'APP019', name: 'Single Egg Single Chicken Tikka Roll',   price: 110, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/APP019.webp' }
        ],
        'Seekh / Special': [
          { id: 'APP020', name: 'Double Chicken Seekh Roll',              price: 120, prepTime: 11, veg: false, available: true, verified: true, image: 'assets/images/food/APP020.webp' },
          { id: 'APP021', name: 'Single Egg Single Chicken Seekh Roll',   price: 100, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/APP021.webp' },
          { id: 'APP022', name: 'Double Egg Double Chicken Seekh Roll',   price: 140, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/APP022.webp' },
          { id: 'APP023', name: 'Single Mutton Seekh Roll',               price: 90,  prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/APP023.webp' },
          { id: 'APP024', name: 'Double Mutton Seekh Roll',               price: 120, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/APP024.webp' },
          { id: 'APP025', name: 'Single Egg Single Mutton Seekh Roll',    price: 100, prepTime: 11, veg: false, available: true, verified: true, image: 'assets/images/food/APP025.webp' },
          { id: 'APP026', name: 'Double Egg Double Mutton Seekh Roll',    price: 140, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/APP026.webp' },
          { id: 'APP027', name: 'Malai Chicken Tikka Roll',               price: 110, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/APP027.webp' },
          { id: 'APP028', name: 'Double Lemon Chicken Roll',              price: 120, prepTime: 11, veg: false, available: true, verified: true, image: 'assets/images/food/APP028.webp' },
          { id: 'APP029', name: 'Double Egg Double Chicken Tikka Roll',   price: 150, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/APP029.webp' },
          { id: 'APP030', name: 'Single Chicken Seekh Roll',              price: 90,  prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/APP030.webp' }
        ]
      }
    },

    /* ── 4. ANNAPURNA SOUTHERN DELIGHTS ──────────────────────────────── */
    {
      id: 'annapurna',
      name: 'Annapurna Southern Delights',
      category: ['South Indian', 'Meals'],
      description: 'Wholesome South Indian: idlis, dosas, uttapams, pesarettu, rice and combo meals.',
      image: 'assets/food/south-indian.jpg',
      foodImage: 'assets/food/south-indian.jpg',
      operatingHours: { open: '08:30', close: '20:30' },
      avgPrepTime: { min: 5, max: 15 },
      popularItems: ['ANN001', 'ANN021', 'ANN009', 'ANN006'],
      menu: {
        'Idli / Vada': [
          { id: 'ANN001', name: 'Plain Idli \u2013 2 Pc',       price: 40,  prepTime: 5,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN001.webp' },
          { id: 'ANN002', name: 'Masala Idli \u2013 2 Pc',      price: 45,  prepTime: 6,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN002.webp' },
          { id: 'ANN003', name: 'Vada \u2013 2 Pc',             price: 50,  prepTime: 6,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN003.webp' }
        ],
        'Dosa': [
          { id: 'ANN004', name: 'Plain Dosa',                   price: 45,  prepTime: 6,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN004.webp' },
          { id: 'ANN005', name: 'Onion Dosa',                   price: 50,  prepTime: 7,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN005.webp' },
          { id: 'ANN006', name: 'Masala Dosa',                  price: 55,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN006.webp' },
          { id: 'ANN007', name: 'Egg Dosa',                     price: 55,  prepTime: 8,  veg: false, available: true, verified: true, image: 'assets/images/food/ANN007.webp' },
          { id: 'ANN008', name: 'Butter Masala Dosa',           price: 65,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN008.webp' },
          { id: 'ANN009', name: 'Paneer Dosa',                  price: 65,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN009.webp' }
        ],
        'Uttappam': [
          { id: 'ANN010', name: 'Plain Uttappam',               price: 50,  prepTime: 7,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN010.webp' },
          { id: 'ANN011', name: 'Onion Uttappam',               price: 55,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN011.webp' },
          { id: 'ANN012', name: 'Tomato Uttappam',              price: 55,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN012.webp' },
          { id: 'ANN013', name: 'Onion Tomato Uttappam',        price: 55,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN013.webp' },
          { id: 'ANN014', name: 'Mix Uttappam',                 price: 60,  prepTime: 9,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN014.webp' }
        ],
        'Pesarettu': [
          { id: 'ANN015', name: 'Plain Pesarettu',              price: 45,  prepTime: 7,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN015.webp' },
          { id: 'ANN016', name: 'Onion Pesarettu',              price: 50,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN016.webp' },
          { id: 'ANN017', name: 'Jeera Pesarettu',              price: 55,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN017.webp' },
          { id: 'ANN018', name: 'Chilli Pesarettu',             price: 55,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN018.webp' },
          { id: 'ANN019', name: 'Ginger Pesarettu',             price: 55,  prepTime: 8,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN019.webp' }
        ],
        'Combos': [
          { id: 'ANN020', name: 'Plain Combo',                  price: 75,  prepTime: 10, veg: true, available: true, verified: true, image: 'assets/images/food/ANN020.webp' },
          { id: 'ANN021', name: 'Special Combo',                price: 95,  prepTime: 12, veg: true, available: true, verified: true, image: 'assets/images/food/ANN021.webp' }
        ],
        'Rice': [
          { id: 'ANN022', name: 'Lemon Rice',                   price: 50,  prepTime: 5,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN022.webp' },
          { id: 'ANN023', name: 'Curd Rice',                    price: 50,  prepTime: 5,  veg: true, available: true, verified: true, image: 'assets/images/food/ANN023.webp' }
        ]
      }
    },

    /* ── 5. WAT-A-BURGER ──────────────────────────────────────────────── */
    {
      id: 'wataburger',
      name: 'Wat-a-Burger',
      category: ['Burgers', 'Fast Food', 'Chinese', 'Momos'],
      description: 'Burgers, fries, Chinese, momos, wraps, shakes and more.',
      image: 'assets/food/burger.jpg',
      foodImage: 'assets/food/burger.jpg',
      operatingHours: { open: '10:00', close: '22:00' },
      avgPrepTime: { min: 8, max: 20 },
      popularItems: ['WAB001', 'WAB044', 'WAB009', 'WAB017'],
      menu: {
        'Veg Burgers': [
          { id: 'WAB001', name: 'Aloo Tikki Burger',            price: 90,  prepTime: 8,  veg: true,  available: true, verified: false, image: 'assets/images/food/WAB001.webp' },
          { id: 'WAB002', name: 'Veg Peri Peri Burger',         price: 100, prepTime: 9,  veg: true,  available: true, verified: false, image: 'assets/images/food/WAB002.webp' },
          { id: 'WAB003', name: 'Crispy Veg Burger',            price: 110, prepTime: 9,  veg: true,  available: true, verified: false, image: 'assets/images/food/WAB003.webp' },
          { id: 'WAB004', name: 'Veg Cheese Burger',            price: 120, prepTime: 10, veg: true,  available: true, verified: false, image: 'assets/images/food/WAB004.webp' },
          { id: 'WAB005', name: 'Paneer Makhni Burger',         price: 130, prepTime: 10, veg: true,  available: true, verified: false, image: 'assets/images/food/WAB005.webp' },
          { id: 'WAB006', name: 'Veg Maharaja Burger',          price: 150, prepTime: 12, veg: true,  available: true, verified: false, image: 'assets/images/food/WAB006.webp' }
        ],
        'Non-Veg Burgers': [
          { id: 'WAB007', name: 'Chicken Tikki Burger',         price: 160, prepTime: 10, veg: false, available: true, verified: false, image: 'assets/images/food/WAB007.webp' },
          { id: 'WAB008', name: 'Non-Veg Peri Peri Burger',     price: 170, prepTime: 11, veg: false, available: true, verified: false, image: 'assets/images/food/WAB008.webp' },
          { id: 'WAB009', name: 'Crispy Chicken Burger',        price: 220, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/WAB009.webp' },
          { id: 'WAB010', name: 'Chicken Cheese Burger',        price: 210, prepTime: 12, veg: false, available: true, verified: false, image: 'assets/images/food/WAB010.webp' },
          { id: 'WAB011', name: 'Chicken Makhni Burger',        price: 210, prepTime: 12, veg: false, available: true, verified: false, image: 'assets/images/food/WAB011.webp' },
          { id: 'WAB012', name: 'Chicken Maharaja Burger',      price: 150, prepTime: 12, veg: false, available: true, verified: false, image: 'assets/images/food/WAB012.webp' }
        ],
        'Veg Sides': [
          { id: 'WAB013', name: 'Classic Fries (S)',            price: 80,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB013.webp' },
          { id: 'WAB014', name: 'Classic Fries (L)',            price: 100, prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB014.webp' },
          { id: 'WAB015', name: 'Peri Peri Fries (S)',          price: 90,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB015.webp' },
          { id: 'WAB016', name: 'Peri Peri Fries (L)',          price: 110, prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB016.webp' },
          { id: 'WAB017', name: 'Cheese Loaded Fries',          price: 130, prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB017.webp' },
          { id: 'WAB018', name: 'Veg Cheese Balls (5 Pc)',      price: 100, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB018.webp' },
          { id: 'WAB019', name: 'Veg Spring Roll (2 Pc)',       price: 90,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB019.webp' },
          { id: 'WAB020', name: 'Veg Peri Peri Wrap',           price: 100, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB020.webp' },
          { id: 'WAB021', name: 'Veg Fajita Wrap',              price: 110, prepTime: 9,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB021.webp' },
          { id: 'WAB022', name: 'Veg Paneer Wrap',              price: 120, prepTime: 9,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB022.webp' }
        ],
        'Non-Veg Sides': [
          { id: 'WAB023', name: 'Chicken Cheese Balls (5 Pc)',  price: 100, prepTime: 8,  veg: false, available: true, verified: true, image: 'assets/images/food/WAB023.webp' },
          { id: 'WAB024', name: 'Chicken Nuggets (5 Pc)',       price: 100, prepTime: 8,  veg: false, available: true, verified: true, image: 'assets/images/food/WAB024.webp' },
          { id: 'WAB025', name: 'Chicken Garlic Fingers (7 Pc)', price: 110, prepTime: 9, veg: false, available: true, verified: true, image: 'assets/images/food/WAB025.webp' },
          { id: 'WAB026', name: 'Chicken Popcorn (7 Pc)',       price: 110, prepTime: 8,  veg: false, available: true, verified: true, image: 'assets/images/food/WAB026.webp' },
          { id: 'WAB027', name: 'Chicken Lollipop (5 Pc)',      price: 280, prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/WAB027.webp' },
          { id: 'WAB028', name: 'Chicken Wings (5 Pc)',         price: 190, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/WAB028.webp' },
          { id: 'WAB029', name: 'Chicken Fajita Wrap',          price: 120, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/WAB029.webp' }
        ],
        'Shakes': [
          { id: 'WAB030', name: 'Kitkes Shake',                 price: 130, prepTime: 5,  veg: true,  available: true, verified: false, image: 'assets/images/food/WAB030.webp' },
          { id: 'WAB031', name: 'Oreo Shake',                   price: 120, prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB031.webp' },
          { id: 'WAB032', name: 'Cold Coffee Frappe',           price: 130, prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB032.webp' }
        ],
        'Desserts': [
          { id: 'WAB033', name: 'Choco Lava Cake',              price: 80,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB033.webp' },
          { id: 'WAB034', name: 'Choco Brownie',                price: 90,  prepTime: 3,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB034.webp' }
        ],
        'Beverages': [
          { id: 'WAB035', name: 'Sweet Lime',                   price: 50,  prepTime: 3,  veg: true,  available: true, verified: false, image: 'assets/images/food/WAB035.webp' },
          { id: 'WAB036', name: 'Kulhad Chai',                  price: 30,  prepTime: 3,  veg: true,  available: true, verified: true, image: 'assets/images/food/WAB036.webp' }
        ],
        'Veg Chinese': [
          { id: 'WAB037', name: 'Veg Noodles',                  price: 100, prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB037.webp' },
          { id: 'WAB038', name: 'Fried Rice',                   price: 110, prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB038.webp' },
          { id: 'WAB039', name: 'Veg Hakka Noodles',            price: 110, prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB039.webp' },
          { id: 'WAB040', name: 'Veg Manchurian Gravy',         price: 120, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB040.webp' },
          { id: 'WAB041', name: 'Chilli Garlic Noodles',        price: 140, prepTime: 12, veg: true,  available: true, verified: false, image: 'assets/images/food/WAB041.webp' },
          { id: 'WAB042', name: 'Honey Chilli Potato',          price: 140, prepTime: 12, veg: true,  available: true, verified: false, image: 'assets/images/food/WAB042.webp' },
          { id: 'WAB043', name: 'Chilli Paneer Gravy',          price: 140, prepTime: 12, veg: true,  available: true, verified: false, image: 'assets/images/food/WAB043.webp' }
        ],
        'Veg Momos': [
          { id: 'WAB044', name: 'Veg Steamed Momos',            price: 80,  prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB044.webp' },
          { id: 'WAB045', name: 'Veg Fried Momos',              price: 90,  prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB045.webp' },
          { id: 'WAB046', name: 'Kurkure Veg Momos',            price: 110, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB046.webp' },
          { id: 'WAB047', name: 'Veg Gravy Momos (Steamed)',    price: 120, prepTime: 15, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB047.webp' },
          { id: 'WAB048', name: 'Veg Gravy Momos (Fried)',      price: 140, prepTime: 15, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB048.webp' }
        ],
        'Non-Veg Chinese': [
          { id: 'WAB049', name: 'Chicken Noodles',              price: 130, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/WAB049.webp' },
          { id: 'WAB050', name: 'Chicken Fried Rice',           price: 130, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/WAB050.webp' },
          { id: 'WAB051', name: 'Chilli Chicken Dry',           price: 150, prepTime: 14, veg: false, available: true, verified: true, image: 'assets/images/food/WAB051.webp' },
          { id: 'WAB052', name: 'Chilli Garlic Noodles with Chicken', price: 160, prepTime: 14, veg: false, available: true, verified: true, image: 'assets/images/food/WAB052.webp' }
        ],
        'Non-Veg Momos': [
          { id: 'WAB053', name: 'Chicken Steamed Momos',        price: 100, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/WAB053.webp' },
          { id: 'WAB054', name: 'Chicken Fried Momos',          price: 110, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/WAB054.webp' },
          { id: 'WAB055', name: 'Kurkure Chicken Momos',        price: 130, prepTime: 14, veg: false, available: true, verified: true, image: 'assets/images/food/WAB055.webp' },
          { id: 'WAB056', name: 'Chicken Gravy Momos (Steamed)', price: 140, prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/WAB056.webp' },
          { id: 'WAB057', name: 'Chicken Gravy Momos (Fried)',  price: 150, prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/WAB057.webp' }
        ],
        'Combos': [
          { id: 'WAB058', name: 'Super Loaded Veg Combo',       price: 150, prepTime: 15, veg: true,  available: true, verified: true, image: 'assets/images/food/WAB058.webp' },
          { id: 'WAB059', name: 'Super Chicken Combo',          price: 180, prepTime: 18, veg: false, available: true, verified: true, image: 'assets/images/food/WAB059.webp' },
          { id: 'WAB060', name: 'Non-Veg Combo (Chicken Manchurian + Rice/Noodle)', price: 140, prepTime: 15, veg: false, available: true, verified: true, image: 'assets/images/food/WAB060.webp' },
          { id: 'WAB061', name: 'Veg Combo (Manchurian + Rice/Noodle)',      price: 120, prepTime: 12, veg: true, available: true, verified: true, image: 'assets/images/food/WAB061.webp' },
          { id: 'WAB062', name: 'Veg Combo (Chilli Paneer + Rice/Noodle)',   price: 130, prepTime: 12, veg: true, available: true, verified: true, image: 'assets/images/food/WAB062.webp' }
        ]
      }
    },

    /* ── 6. DOMINO'S ──────────────────────────────────────────────────── */
    {
      id: 'dominos',
      name: "Domino's",
      category: ['Pizza', 'Italian'],
      description: "Everyone's favourite pizza, right on campus. Lunch feast combos, cheese burst, and more.",
      image: 'assets/food/pizza.jpg',
      foodImage: 'assets/food/pizza.jpg',
      operatingHours: { open: '11:00', close: '22:00' },
      avgPrepTime: { min: 15, max: 25 },
      popularItems: ['DOM001', 'DOM004', 'DOM015', 'DOM034'],
      menu: {
        'Lunch Feast Combos': [
          { id: 'DOM001', name: '4 Course Pizza Meal \u2013 Lunch Feast',      price: 99,  prepTime: 15, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM001.webp' },
          { id: 'DOM002', name: '5 Course Pizza Meal \u2013 Lunch Feast',      price: 119, prepTime: 18, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM002.webp' },
          { id: 'DOM003', name: '4 Course Loaded Meal \u2013 Lunch Feast',     price: 169, prepTime: 20, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM003.webp' }
        ],
        'Classic 5 Course': [
          { id: 'DOM004', name: 'Peppy Paneer',                                price: 299, prepTime: 18, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM004.webp' },
          { id: 'DOM005', name: 'Veggie Paradise',                             price: 299, prepTime: 18, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM005.webp' },
          { id: 'DOM006', name: 'Pepper BBQ Chicken',                          price: 299, prepTime: 18, veg: false, available: true, verified: true, image: 'assets/images/food/DOM006.webp' }
        ],
        'Cheese Burst 5 Course': [
          { id: 'DOM007', name: 'Peppy Paneer \u2013 Cheese Burst',            price: 349, prepTime: 20, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM007.webp' },
          { id: 'DOM008', name: 'Veggie Paradise \u2013 Cheese Burst',         price: 349, prepTime: 20, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM008.webp' },
          { id: 'DOM009', name: 'Pepper BBQ Chicken \u2013 Cheese Burst',      price: 349, prepTime: 20, veg: false, available: true, verified: true, image: 'assets/images/food/DOM009.webp' },
          { id: 'DOM010', name: 'Tandoori Chicken Burst',                      price: 349, prepTime: 20, veg: false, available: true, verified: true, image: 'assets/images/food/DOM010.webp' },
          { id: 'DOM011', name: 'Shawarma Chicken Burst',                      price: 349, prepTime: 20, veg: false, available: true, verified: true, image: 'assets/images/food/DOM011.webp' }
        ],
        'Cheese Volcano 6 Course': [
          { id: 'DOM012', name: 'Peppy Paneer \u2013 Volcano',                 price: 499, prepTime: 22, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM012.webp' },
          { id: 'DOM013', name: 'Veggie Paradise \u2013 Volcano',              price: 499, prepTime: 22, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM013.webp' },
          { id: 'DOM014', name: 'Pepper BBQ Chicken \u2013 Volcano',           price: 499, prepTime: 22, veg: false, available: true, verified: true, image: 'assets/images/food/DOM014.webp' }
        ],
        'Sides': [
          { id: 'DOM015', name: 'Garlic Breadsticks \u2013 Classic',           price: 119, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM015.webp' },
          { id: 'DOM016', name: 'Garlic Breadsticks \u2013 Corn & Jalapeno',   price: 179, prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM016.webp' },
          { id: 'DOM017', name: 'Garlic Breadsticks \u2013 Paneer Tikka',      price: 179, prepTime: 10, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM017.webp' },
          { id: 'DOM018', name: 'Garlic Breadsticks \u2013 Chicken Pepperoni', price: 179, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/DOM018.webp' },
          { id: 'DOM019', name: 'Zingy Parcel \u2013 Veg',                     price: 50,  prepTime: 5,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM019.webp' },
          { id: 'DOM020', name: 'Zingy Parcel \u2013 Chicken',                 price: 60,  prepTime: 5,  veg: false, available: true, verified: true, image: 'assets/images/food/DOM020.webp' },
          { id: 'DOM021', name: 'Loaded Saucy Paneer Parcel \u2013 Tandoori',  price: 70,  prepTime: 6,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM021.webp' },
          { id: 'DOM022', name: 'Loaded Saucy Chicken Parcel \u2013 Tandoori', price: 70,  prepTime: 6,  veg: false, available: true, verified: true, image: 'assets/images/food/DOM022.webp' },
          { id: 'DOM023', name: 'Taco Mexicana \u2013 Single Veg',             price: 79,  prepTime: 6,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM023.webp' },
          { id: 'DOM024', name: 'Taco Mexicana \u2013 Single Chicken',         price: 99,  prepTime: 6,  veg: false, available: true, verified: false, image: 'assets/images/food/DOM024.webp' },
          { id: 'DOM025', name: 'Loaded Saucy Veg Taco',                       price: 179, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM025.webp' },
          { id: 'DOM026', name: 'Double Taco Chicken',                          price: 179, prepTime: 8,  veg: false, available: true, verified: true, image: 'assets/images/food/DOM026.webp' },
          { id: 'DOM027', name: 'Loaded Saucy Chicken Taco \u2013 Tandoori',   price: 201, prepTime: 9,  veg: false, available: true, verified: true, image: 'assets/images/food/DOM027.webp' },
          { id: 'DOM028', name: 'Burger Pizza \u2013 Classic Veg',             price: 121, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM028.webp' },
          { id: 'DOM029', name: 'Burger Pizza \u2013 Premium Veg',             price: 151, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/DOM029.webp' },
          { id: 'DOM030', name: 'Burger Pizza \u2013 Classic Non-Veg',         price: 161, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/DOM030.webp' }
        ],
        'Dips': [
          { id: 'DOM031', name: 'Cheesy Jalapeno / Cheesy Dip',               price: 31,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM031.webp' },
          { id: 'DOM032', name: 'Peri Peri Dip',                              price: 39,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM032.webp' },
          { id: 'DOM033', name: 'Cream & Onion Dip',                          price: 39,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM033.webp' }
        ],
        'Chicken Feast': [
          { id: 'DOM034', name: 'Spicy Chicken Pops',                          price: 99,  prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/DOM034.webp' },
          { id: 'DOM035', name: 'Spicy Chicken Bombs',                         price: 99,  prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/DOM035.webp' },
          { id: 'DOM036', name: 'Mini Garlic Cheesiken Rice',                  price: 109, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/DOM036.webp' },
          { id: 'DOM037', name: 'Mini Hot & Fiery Cheesiken Rice',             price: 109, prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/DOM037.webp' },
          { id: 'DOM038', name: 'Garlic Cheesiken',                            price: 159, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/DOM038.webp' },
          { id: 'DOM039', name: 'Hot & Fiery Cheesiken',                       price: 159, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/DOM039.webp' },
          { id: 'DOM040', name: 'Juicy Boneless Chicken',                      price: 159, prepTime: 12, veg: false, available: true, verified: true, image: 'assets/images/food/DOM040.webp' },
          { id: 'DOM041', name: 'Grilled Wings \u2013 Lemon Pepper',           price: 169, prepTime: 14, veg: false, available: true, verified: true, image: 'assets/images/food/DOM041.webp' },
          { id: 'DOM042', name: 'Grilled Wings \u2013 Southern Spice',         price: 169, prepTime: 14, veg: false, available: true, verified: true, image: 'assets/images/food/DOM042.webp' },
          { id: 'DOM043', name: 'Grilled Wings \u2013 Signature Garlic',       price: 169, prepTime: 14, veg: false, available: true, verified: true, image: 'assets/images/food/DOM043.webp' }
        ],
        'Desserts & Beverages': [
          { id: 'DOM044', name: 'Packaged Drinking Water',                     price: 30,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM044.webp' },
          { id: 'DOM045', name: 'Fountain Drinks (350 ml)',                    price: 65,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM045.webp' },
          { id: 'DOM046', name: 'Thums Up / Coca-Cola / Sprite / Fanta (475 ml)', price: 70, prepTime: 1, veg: true, available: true, verified: true, image: 'assets/images/food/DOM046.webp' },
          { id: 'DOM047', name: 'Pineapple / Orange / Mixed Fruit',            price: 70,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM047.webp' },
          { id: 'DOM048', name: 'Unlimited Coke',                              price: 75,  prepTime: 1,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM048.webp' },
          { id: 'DOM049', name: 'Choco Lava Cake',                             price: 119, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM049.webp' },
          { id: 'DOM050', name: 'Butterscotch Mousse Cake',                    price: 119, prepTime: 3,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM050.webp' },
          { id: 'DOM051', name: 'Red Velvet Lava Cake',                        price: 149, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/DOM051.webp' }
        ]
      }
    },

    /* ── 7. CAFÉ FRISCO ──────────────────────────────────────────────── */
    {
      id: 'cafefrisco',
      name: 'Caf\u00e9 Frisco',
      category: ['Café', 'Beverages', 'Snacks'],
      description: 'Campus café with hot & cold beverages, specialty coffees, sandwiches, and quick bites.',
      image: 'assets/food/coffee-frappe.jpg',
      foodImage: 'assets/food/coffee-frappe.jpg',
      operatingHours: { open: '08:30', close: '21:00' },
      avgPrepTime: { min: 3, max: 12 },
      popularItems: ['CFR002', 'CFR027', 'CFR032', 'CFR036'],
      menu: {
        'Hot Beverages': [
          { id: 'CFR001', name: 'Classic Coffee',                   price: 25,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR001.webp' },
          { id: 'CFR002', name: 'Cappuccino',                       price: 60,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR002.webp' },
          { id: 'CFR003', name: 'Café Mocha',                       price: 60,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR003.webp' },
          { id: 'CFR004', name: 'Flat White',                       price: 60,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR004.webp' },
          { id: 'CFR005', name: 'Americano',                        price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR005.webp' },
          { id: 'CFR006', name: 'Café Latte',                       price: 60,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR006.webp' },
          { id: 'CFR007', name: 'Espresso Black Coffee',            price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR007.webp' },
          { id: 'CFR008', name: 'Hot Chocolate',                    price: 60,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR008.webp' },
          { id: 'CFR009', name: 'Regular Tea',                      price: 20,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR009.webp' },
          { id: 'CFR010', name: 'Flavored Tea \u2013 Elaichi',      price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR010.webp' },
          { id: 'CFR011', name: 'Flavored Tea \u2013 Masala',       price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR011.webp' },
          { id: 'CFR012', name: 'Flavored Tea \u2013 Ginger',       price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR012.webp' },
          { id: 'CFR013', name: 'Green Tea',                        price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR013.webp' },
          { id: 'CFR014', name: 'Lemon & Lime',                     price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR014.webp' },
          { id: 'CFR015', name: 'Moroccan Mint',                    price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR015.webp' },
          { id: 'CFR016', name: 'Jasmine',                          price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR016.webp' },
          { id: 'CFR017', name: 'Earl Grey',                        price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR017.webp' },
          { id: 'CFR018', name: 'Lemongrass',                       price: 30,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR018.webp' },
          { id: 'CFR019', name: 'Tomato Clear Soup',                price: 30,  prepTime: 5,  veg: true, available: true, verified: false, image: 'assets/images/food/CFR019.webp' },
          { id: 'CFR020', name: 'Kulhad Masala Chai',               price: 25,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR020.webp' }
        ],
        'Cold Beverages': [
          { id: 'CFR021', name: 'Nestea Iced Tea \u2013 Lemon',    price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR021.webp' },
          { id: 'CFR022', name: 'Nestea Iced Tea \u2013 Peach',    price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR022.webp' },
          { id: 'CFR023', name: 'Lemonade',                        price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR023.webp' },
          { id: 'CFR024', name: 'Orange Sparkle',                  price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR024.webp' },
          { id: 'CFR025', name: 'Mango Sparkle',                   price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR025.webp' },
          { id: 'CFR026', name: 'Watermelon Sparkle',              price: 60,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR026.webp' },
          { id: 'CFR027', name: 'Café Frappe',                     price: 80,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR027.webp' },
          { id: 'CFR028', name: 'Frappe Hazelnut',                 price: 90,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR028.webp' },
          { id: 'CFR029', name: 'Frappe Irish',                    price: 90,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR029.webp' },
          { id: 'CFR030', name: 'Frappe Mocha',                    price: 90,  prepTime: 4,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR030.webp' },
          { id: 'CFR031', name: 'Sweet Lassi',                     price: 70,  prepTime: 3,  veg: true, available: true, verified: true, image: 'assets/images/food/CFR031.webp' }
        ],
        'Munch Time': [
          { id: 'CFR032', name: 'Maggi Noodle Masala',             price: 50,  prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR032.webp' },
          { id: 'CFR033', name: 'Ice Cream (Scooping)',             price: 60,  prepTime: 2,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR033.webp' },
          { id: 'CFR034', name: 'Chilli Cheese Toast',              price: 70,  prepTime: 6,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR034.webp' },
          { id: 'CFR035', name: 'Vegetable Sandwich',               price: 80,  prepTime: 6,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR035.webp' },
          { id: 'CFR036', name: 'Veg. Cheese Sandwich',             price: 100, prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR036.webp' },
          { id: 'CFR037', name: 'Grilled Paneer Sandwich',          price: 100, prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR037.webp' },
          { id: 'CFR038', name: 'Cheese Corn Toast Sandwich',       price: 100, prepTime: 7,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR038.webp' },
          { id: 'CFR039', name: 'Grilled Chicken Sandwich',         price: 100, prepTime: 9,  veg: false, available: true, verified: true, image: 'assets/images/food/CFR039.webp' },
          { id: 'CFR040', name: 'Crispy Veg. Classic Burger',       price: 60,  prepTime: 8,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR040.webp' },
          { id: 'CFR041', name: 'Veg. Classic Cheese Burger',       price: 80,  prepTime: 9,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR041.webp' },
          { id: 'CFR042', name: 'Crispy Chicken Classic Burger',    price: 80,  prepTime: 10, veg: false, available: true, verified: true, image: 'assets/images/food/CFR042.webp' },
          { id: 'CFR043', name: 'Vegetable / Paneer Patties',       price: 40,  prepTime: 4,  veg: true,  available: true, verified: true, image: 'assets/images/food/CFR043.webp' },
          { id: 'CFR044', name: 'Thin Crust Pizza',                 price: 110, prepTime: 12, veg: true,  available: true, verified: true, image: 'assets/images/food/CFR044.webp' }
        ]
      }
    },

    /* ── 8. CHAI GARAM (incl. BITE IT sub-brand) ──────────────────────── */
    {
      id: 'chaigaram',
      name: 'Chai Garam',
      category: ['Tea', 'Café', 'Snacks', 'Fast Food'],
      description: 'Premium chai bar & Bite It — wraps, pasta, Maggi, fries and more under one roof.',
      image: 'assets/food/chai-kulhad.jpg',
      foodImage: 'assets/food/chai-kulhad.jpg',
      operatingHours: { open: '08:00', close: '22:00' },
      avgPrepTime: { min: 3, max: 15 },
      subBrands: ['Bite It'],
      popularItems: ['CGR007', 'CGR008', 'BIT040', 'BIT034', 'BIT021'],
      menu: {
        /* ── Chai Garam menu sections ── */
        'Q-Tea \u2013 150 ml': [
          { id: 'CGR001', name: 'Adrak',                     price: 25, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR001.webp' },
          { id: 'CGR002', name: 'Tulsi',                     price: 25, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR002.webp' },
          { id: 'CGR003', name: 'Elaichi',                   price: 35, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR003.webp' },
          { id: 'CGR004', name: 'Haldi Chai',                price: 35, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR004.webp' },
          { id: 'CGR005', name: 'Kali Mirch',                price: 35, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR005.webp' },
          { id: 'CGR006', name: 'Mini Kulhad',               price: 30, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR006.webp' },
          { id: 'CGR007', name: 'Kulhad Tea',                price: 40, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR007.webp' },
          { id: 'CGR008', name: 'Chai Garam Special',        price: 60, prepTime: 4, veg: true, available: true, verified: true, image: 'assets/images/food/CGR008.webp' }
        ],
        'Double Q-Tea \u2013 150 ml': [
          { id: 'CGR009', name: 'Adrak Elaichi',             price: 30, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR009.webp' },
          { id: 'CGR010', name: 'Adrak Tulsi',               price: 30, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR010.webp' },
          { id: 'CGR011', name: 'Gur Elaichi',               price: 35, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR011.webp' },
          { id: 'CGR012', name: 'Sauf Elaichi',              price: 30, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR012.webp' },
          { id: 'CGR013', name: 'Dalchini Adrak',            price: 30, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR013.webp' },
          { id: 'CGR014', name: 'Kulhad Double FLVR',        price: 45, prepTime: 4, veg: true, available: true, verified: true, image: 'assets/images/food/CGR014.webp' }
        ],
        'Premium \u2013 250 ml': [
          { id: 'CGR015', name: 'Green Tea',                 price: 50, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR015.webp' },
          { id: 'CGR016', name: 'Green with Lemon',          price: 60, prepTime: 3, veg: true, available: true, verified: false, image: 'assets/images/food/CGR016.webp' },
          { id: 'CGR017', name: 'Honey',                     price: 60, prepTime: 3, veg: true, available: true, verified: false, image: 'assets/images/food/CGR017.webp' },
          { id: 'CGR018', name: 'Jasmine Green',             price: 70, prepTime: 4, veg: true, available: true, verified: true, image: 'assets/images/food/CGR018.webp' },
          { id: 'CGR019', name: 'Black Darjeeling',          price: 50, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR019.webp' },
          { id: 'CGR020', name: 'Black Darjeeling with Lemon Honey', price: 70, prepTime: 3, veg: true, available: true, verified: true, image: 'assets/images/food/CGR020.webp' },
          { id: 'CGR021', name: 'Chamomile',                 price: 80, prepTime: 4, veg: true, available: true, verified: true, image: 'assets/images/food/CGR021.webp' }
        ],

        /* ── Bite It sub-brand sections ── */
        'Bite It \u2014 Pass-Tha': [
          { id: 'BIT001', name: 'Veg Pasta White/Red',       price: 75,  prepTime: 10, veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT001.webp' },
          { id: 'BIT002', name: 'Tandoori Sauce',            price: 85,  prepTime: 10, veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT002.webp' },
          { id: 'BIT003', name: 'Mix Sauce',                 price: 85,  prepTime: 10, veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT003.webp' },
          { id: 'BIT004', name: 'Pink Pasta',                price: 85,  prepTime: 10, veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT004.webp' },
          { id: 'BIT005', name: 'Veg Corn',                  price: 90,  prepTime: 10, veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT005.webp' },
          { id: 'BIT006', name: 'Cheese Corn',               price: 100, prepTime: 10, veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT006.webp' },
          { id: 'BIT007', name: 'Chicken Pasta',             price: 90,  prepTime: 12, veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT007.webp' },
          { id: 'BIT008', name: 'Chicken Tandoori',          price: 100, prepTime: 12, veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT008.webp' },
          { id: 'BIT009', name: 'Chicken Mix Pasta',         price: 110, prepTime: 12, veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT009.webp' },
          { id: 'BIT010', name: 'Punjabi Pasta',             price: 100, prepTime: 10, veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT010.webp' }
        ],
        'Bite It \u2014 In B/W Breads': [
          { id: 'BIT011', name: 'Veg Sandwich',              price: 40,  prepTime: 5,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT011.webp' },
          { id: 'BIT012', name: 'Cheese Garlic',             price: 55,  prepTime: 6,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT012.webp' },
          { id: 'BIT013', name: 'American Corn',             price: 60,  prepTime: 6,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT013.webp' },
          { id: 'BIT014', name: 'Paneer Sandwich',           price: 65,  prepTime: 7,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT014.webp' },
          { id: 'BIT015', name: 'Tandoori Paneer',           price: 70,  prepTime: 8,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT015.webp' },
          { id: 'BIT016', name: 'Chicken Sandwich',          price: 80,  prepTime: 8,  veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT016.webp' },
          { id: 'BIT017', name: 'Tandoori Sandwich',         price: 90,  prepTime: 9,  veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT017.webp' },
          { id: 'BIT018', name: 'Peanut Butter',             price: 70,  prepTime: 5,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT018.webp' },
          { id: 'BIT019', name: 'Paneer Twister',            price: 90,  prepTime: 8,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT019.webp' },
          { id: 'BIT020', name: 'Tomato Cheese',             price: 90,  prepTime: 7,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT020.webp' }
        ],
        'Bite It \u2014 Wrap Ur Worries': [
          { id: 'BIT021', name: 'Veg Wrap',                  price: 70,  prepTime: 7,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT021.webp' },
          { id: 'BIT022', name: 'Paneer Wrap',               price: 90,  prepTime: 8,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT022.webp' },
          { id: 'BIT023', name: 'Tandoori Veg',              price: 80,  prepTime: 8,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT023.webp' },
          { id: 'BIT024', name: 'Egg Wrap',                  price: 90,  prepTime: 8,  veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT024.webp' },
          { id: 'BIT025', name: 'Chicken Wrap',              price: 110, prepTime: 9,  veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT025.webp' },
          { id: 'BIT026', name: 'Tandoori Chicken',          price: 120, prepTime: 10, veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT026.webp' },
          { id: 'BIT027', name: 'Veg Corn Wrap',             price: 80,  prepTime: 7,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT027.webp' }
        ],
        'Bite It \u2014 Light Diet': [
          { id: 'BIT028', name: 'Veg Oats',                  price: 45,  prepTime: 5,  veg: true, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT028.webp' },
          { id: 'BIT029', name: 'Masala Oats',               price: 45,  prepTime: 5,  veg: true, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT029.webp' },
          { id: 'BIT030', name: 'Hot N Sour',                price: 30,  prepTime: 5,  veg: true, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT030.webp' },
          { id: 'BIT031', name: 'Sweet Corn',                price: 30,  prepTime: 5,  veg: true, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT031.webp' },
          { id: 'BIT032', name: 'Thick Tomato',              price: 30,  prepTime: 5,  veg: true, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT032.webp' },
          { id: 'BIT033', name: 'Corn Chaat',                price: 60,  prepTime: 5,  veg: true, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT033.webp' }
        ],
        'Bite It \u2014 Fry High': [
          { id: 'BIT034', name: 'Classic Fries',             price: 60,  prepTime: 7,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT034.webp' },
          { id: 'BIT035', name: 'Peri Peri',                 price: 80,  prepTime: 7,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT035.webp' },
          { id: 'BIT036', name: 'Cheese Fries',              price: 80,  prepTime: 8,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT036.webp' },
          { id: 'BIT037', name: 'Veg Nuggets (5 pcs)',       price: 80,  prepTime: 9,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT037.webp' },
          { id: 'BIT038', name: 'Chicken Nuggets (5 pcs)',   price: 110, prepTime: 10, veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT038.webp' },
          { id: 'BIT039', name: 'Veg Finger (5 pcs)',        price: 70,  prepTime: 9,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT039.webp' }
        ],
        'Bite It \u2014 Curly Curls': [
          { id: 'BIT040', name: 'Plain Maggi',               price: 30,  prepTime: 5,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT040.webp' },
          { id: 'BIT041', name: 'Veg Maggi',                 price: 40,  prepTime: 5,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT041.webp' },
          { id: 'BIT042', name: 'Cheese Maggi',              price: 60,  prepTime: 6,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT042.webp' },
          { id: 'BIT043', name: 'Masala Maggi',              price: 55,  prepTime: 5,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT043.webp' },
          { id: 'BIT044', name: 'Tandoori Maggi',            price: 75,  prepTime: 7,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT044.webp' },
          { id: 'BIT045', name: 'Egg Maggi',                 price: 60,  prepTime: 6,  veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT045.webp' },
          { id: 'BIT046', name: 'Chicken Maggi',             price: 80,  prepTime: 8,  veg: false, available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT046.webp' },
          { id: 'BIT047', name: 'Corn Maggi',                price: 60,  prepTime: 6,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT047.webp' },
          { id: 'BIT048', name: 'Chilly Garlic Maggi',       price: 70,  prepTime: 6,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT048.webp' },
          { id: 'BIT049', name: 'Hot and Spicy Maggi',       price: 50,  prepTime: 5,  veg: true,  available: true, verified: true,  subBrand: 'Bite It', image: 'assets/images/food/BIT049.webp' }
        ]
      }
    }
  ],

  /* ──────────────── UTILITY METHODS (unchanged API) ──────────────── */

  getAllStalls: function () {
    return this.stalls.map(function (stall) {
      var override = Store.isStallOpenOverride(stall.id);
      var isOpen = override !== null ? override : TimeUtil.isStallOpen(stall.operatingHours);
      return Object.assign({}, stall, { isOpen: isOpen });
    });
  },

  getStall: function (stallId) {
    var stall = this.stalls.find(function (s) { return s.id === stallId; });
    if (!stall) return null;
    var override = Store.isStallOpenOverride(stall.id);
    var isOpen = override !== null ? override : TimeUtil.isStallOpen(stall.operatingHours);
    return Object.assign({}, stall, { isOpen: isOpen });
  },

  getStallMenu: function (stallId) {
    var stall = this.stalls.find(function (s) { return s.id === stallId; });
    if (!stall) return {};
    var menu = {};
    Object.keys(stall.menu).forEach(function (category) {
      menu[category] = stall.menu[category].map(function (item) {
        return Object.assign({}, item, {
          available: Store.isItemAvailable(stallId, item.id) && item.available
        });
      });
    });
    return menu;
  },

  getAllMenuItems: function () {
    var items = [];
    this.stalls.forEach(function (stall) {
      Object.keys(stall.menu).forEach(function (category) {
        stall.menu[category].forEach(function (item) {
          items.push(Object.assign({}, item, {
            stallId: stall.id,
            stallName: stall.name,
            category: category
          }));
        });
      });
    });
    return items;
  },

  getItem: function (itemId) {
    for (var s = 0; s < this.stalls.length; s++) {
      var stall = this.stalls[s];
      var cats = Object.keys(stall.menu);
      for (var c = 0; c < cats.length; c++) {
        var items = stall.menu[cats[c]];
        for (var i = 0; i < items.length; i++) {
          if (items[i].id === itemId) {
            return Object.assign({}, items[i], {
              stallId: stall.id,
              stallName: stall.name,
              category: cats[c]
            });
          }
        }
      }
    }
    return null;
  },

  getPopularItems: function (limit) {
    limit = limit || 8;
    var popular = [];
    var self = this;
    // Collect the top popular item from each stall so all 8 franchises are featured
    this.stalls.forEach(function (stall) {
      if (stall.popularItems && stall.popularItems.length > 0) {
        var item = self.getItem(stall.popularItems[0]);
        if (item) popular.push(item);
      }
    });
    // Fill up to limit with secondary items if needed
    if (popular.length < limit) {
      this.stalls.forEach(function (stall) {
        if (stall.popularItems && stall.popularItems.length > 1) {
          var item = self.getItem(stall.popularItems[1]);
          if (item && popular.indexOf(item) === -1) popular.push(item);
        }
      });
    }
    return popular.slice(0, limit);
  },

  searchItems: function (query) {
    if (!query || query.length < 2) return { stalls: [], items: [] };
    var q = query.toLowerCase();

    var stalls = this.stalls.filter(function (s) {
      var nameMatch = s.name.toLowerCase().indexOf(q) !== -1;
      var catMatch  = s.category.some(function (c) { return c.toLowerCase().indexOf(q) !== -1; });
      // Also match sub-brand names (e.g. "bite it")
      var subBrandMatch = s.subBrands
        ? s.subBrands.some(function (sb) { return sb.toLowerCase().indexOf(q) !== -1; })
        : false;
      return nameMatch || catMatch || subBrandMatch;
    });

    var items = this.getAllMenuItems().filter(function (item) {
      var nameMatch     = item.name.toLowerCase().indexOf(q) !== -1;
      var catMatch      = item.category.toLowerCase().indexOf(q) !== -1;
      var stallMatch    = item.stallName.toLowerCase().indexOf(q) !== -1;
      var subBrandMatch = item.subBrand ? item.subBrand.toLowerCase().indexOf(q) !== -1 : false;
      return nameMatch || catMatch || stallMatch || subBrandMatch;
    });

    return { stalls: stalls.slice(0, 5), items: items.slice(0, 10) };
  },

  getCategories: function () {
    var cats = [];
    this.stalls.forEach(function (s) {
      s.category.forEach(function (c) {
        if (cats.indexOf(c) === -1) cats.push(c);
      });
    });
    return cats;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StallData: StallData, ADMIN_IDS: ADMIN_IDS };
}
