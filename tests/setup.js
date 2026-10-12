/* ==========================================================================
   BHUKH LAGI — Jest Test Setup
   Provides globals that the app code expects in the browser.
   ========================================================================== */

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i) => Object.keys(store)[i] || null,
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Load modules
global.BRAND = require('../js/brand.js');
global.DOM = require('../js/utils/dom.js');
global.TimeUtil = require('../js/utils/time.js');
global.OrderID = require('../js/utils/order-id.js');
global.Store = require('../js/store.js');
global.QuantityControl = require('../js/components/quantity-control.js');
global.FoodCard = require('../js/components/food-card.js');
const dataExport = require('../js/data.js');
global.StallData = dataExport.StallData;
global.ADMIN_IDS = dataExport.ADMIN_IDS;

global.EmptyState = require('../js/components/empty-state.js');
global.StallDetailPage = require('../js/pages/stall-detail.js');

if (typeof window !== 'undefined') {
  window.localStorage = localStorageMock;
  window.BRAND = global.BRAND;
  window.DOM = global.DOM;
  window.TimeUtil = global.TimeUtil;
  window.OrderID = global.OrderID;
  window.Store = global.Store;
  window.QuantityControl = global.QuantityControl;
  window.FoodCard = global.FoodCard;
  window.EmptyState = global.EmptyState;
  window.StallDetailPage = global.StallDetailPage;
  window.StallData = global.StallData;
  window.ADMIN_IDS = global.ADMIN_IDS;
}

// Reset localStorage before each test
beforeEach(() => {
  localStorageMock.clear();
  Store._cartListeners = [];
});
