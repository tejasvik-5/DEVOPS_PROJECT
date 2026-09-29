# BHUKH LAGI — College Canteen Management System

> Fast, queue-free campus food ordering web application with **Pay at Counter** support.

---

## 🚀 Overview

BHUKH LAGI is designed for college campus food courts, allowing students to browse stall menus, add items to a single-stall cart, and complete orders with counter payment upon pickup.

### Key Features
- **Pay at Counter Checkout**: Quick and reliable ordering flow. Students place their order and pay cash or UPI at the counter when picking up.
- **Clean Compact Menu Cards**: Sleek, vector-icon-based food item cards without broken or blank image spaces.
- **Stall & Campus Visuals**: Preserved stall banners and campus photography.
- **Order Lifecycle & Tracking**: Live status transitions (`PENDING` → `PREPARING` → `READY` → `COMPLETED`).
- **Single-Stall Cart Integrity**: Smart stall conflict detection and cart persistence.
- **Admin Dashboard**: Live order queue for stall managers with action buttons to accept, mark ready, delay, or complete orders.

---

## 🛠️ Architecture

```
BHUKH-LAGI/
├── index.html                  # Main SPA entry point
├── css/                        # Approved Navy (#2F4156), Cream (#F5F0EB), Teal (#567C8D) theme
├── js/                         # Frontend modular vanilla JavaScript
│   ├── components/food-card.js # Compact menu item cards with category vector icons
│   ├── components/cart.js      # Cart items & Pay at Counter summary
│   ├── pages/cart-page.js      # Order placement and checkout
│   ├── pages/order-detail.js   # Order tracking with live preparation timeline
│   ├── pages/admin/            # Stall manager dashboard
│   └── store.js                # LocalStorage management
├── backend/                    # Node.js + Express backend service
│   ├── server.js               # Express server, CORS, static frontend serving
│   ├── .env.example            # Environment template
│   ├── .env                    # Active local configuration
│   ├── package.json            # Backend dependencies
│   └── tests/server.test.js    # Backend Jest test suite
└── tests/                      # Frontend & Integration test suites
```

---

## 💻 Running the Application Locally

### Option 1: Unified Server (Recommended)
The backend server serves the application on port `3000`:
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Start the server
npm start
```
Open **`http://localhost:3000`** in your browser.

### Option 2: Static Server
You can also serve the root directory directly:
```bash
python3 -m http.server 8080
```
Open **`http://localhost:8080`** in your browser.

---

## 🧪 Running Tests

```bash
# Run all tests (frontend + backend)
npm test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend
```

Browser Test Runner:
- Open `http://localhost:3000/tests/runner.html` to run unit test suites in-browser.
- Open `http://localhost:3000/tests/verify_flow.html` to run verification checks.
