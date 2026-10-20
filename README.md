# 🍽️ BHUKH LAGI

### Campus Food Ordering & Canteen Management System

BHUKH LAGI is a web-based campus food ordering and canteen management application designed for UPES students. It allows students to explore campus food stalls, browse menus, manage their cart, place orders using the Pay at Counter option, and track their order status.

The application also provides an admin interface for managing orders, food availability, menu items, and stall operations.

---

## 📌 Table of Contents

1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Technology Stack](#️-technology-stack)
4. [Project Architecture](#️-project-architecture)
5. [Student Features](#-student-features)
6. [Campus Food Stalls](#-campus-food-stalls)
7. [Menu and Cart Management](#-menu-and-cart-management)
8. [Checkout and Order Management](#-checkout-and-order-management)
9. [Admin Features](#-admin-features)
10. [Data Management](#-data-management)
11. [Git and GitHub Workflow](#-git-and-github-workflow)
12. [Pull Requests and Code Review](#-pull-requests-and-code-review)
13. [Merge Conflict Resolution](#-merge-conflict-resolution)
14. [Testing](#-testing)
15. [Installation and Setup](#-installation-and-setup)
16. [Problems Faced and Solutions](#-problems-faced-and-solutions)
17. [Team Members](#-team-members)
18. [Current Status](#-current-status)
19. [Future Scope](#-future-scope)
20. [Conclusion](#-conclusion)

---

## 🚀 Overview

BHUKH LAGI aims to make campus food ordering simpler and more organized. Students can browse food stalls, search for food items, check availability, add items to their cart, and place orders without having to visit every stall to explore the menu.

The application includes a student-facing ordering interface and an admin interface for managing food availability and order operations.

### 🎯 Project Objectives

- Simplify food ordering within the campus.
- Reduce the need to visit multiple stalls to check menus.
- Provide a convenient cart and checkout experience.
- Allow students to view their order status.
- Help stall administrators manage orders and food availability.
- Practice collaborative software development using Git and GitHub.
- Use feature branches, pull requests, code reviews, and automated testing.

## ✨ Key Features

- **Campus Food Stalls:** Browse food outlets available on campus.
- **Search and Categories:** Find food items using search and category filters.
- **Menu Cards:** View item names, prices, dietary labels, preparation time, and availability.
- **Single-Stall Cart:** Keep one active cart associated with one stall.
- **Quantity Management:** Increase, decrease, or remove cart items.
- **Cart Validation:** Apply rules before allowing checkout.
- **Pay at Counter:** Place orders through the application and pay when collecting food.
- **Order Tracking:** Follow the order through its preparation stages.
- **Order History:** View current and previous orders.
- **Admin Dashboard:** Manage orders and stall operations.
- **Availability Management:** Change individual item availability or update all items together.
- **Stall Availability:** Mark a stall as open or closed.
- **Automated Testing:** Test frontend and backend functionality using Jest.

---

## 🛠️ Technology Stack

The project uses the following technologies and tools, subject to the implementations present in the repository.

| Technology | Purpose |
|---|---|
| HTML5 | Defines the structure of the web application. |
| CSS3 | Handles styling, layout, responsive design, and visual presentation. |
| JavaScript | Implements interactive features, cart logic, order handling, and application behavior. |
| Node.js | Provides the JavaScript runtime for the backend. |
| Express.js | Provides backend routing and HTTP request handling, where implemented. |
| LocalStorage | Persists supported application data in the user's browser. |
| npm | Installs dependencies and runs configured project scripts. |
| Jest | Runs automated tests. |
| Git | Tracks source-code changes and commits. |
| GitHub | Hosts the repository and supports branches, pull requests, reviews, and collaboration. |

---

## 🗂️ Project Architecture

The repository is organized into frontend, backend, styling, assets, and testing areas.

```text
DEVOPS_PROJECT/
│
├── assets/                       # Images and other visual assets
│   ├── food/                     # Food and stall images, if present
│   └── svg/                      # SVG graphics, if present
│
├── backend/                      # Backend application
│   ├── tests/                    # Backend tests, if present
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Backend entry point
│
├── css/                          # Stylesheets
│   ├── admin.css
│   ├── animations.css
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   ├── pages.css
│   ├── reset.css
│   └── variables.css
│
├── js/                           # Frontend JavaScript
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Student and admin pages
│   ├── utils/                    # Shared helper functions
│   ├── app.js                    # Main application logic
│   ├── brand.js                  # Branding configuration
│   ├── data.js                   # Stall and menu data
│   └── store.js                  # Central application state
│
├── tests/                        # Frontend automated tests
│
├── index.html                    # Main frontend entry point
├── package.json                  # Root dependencies and scripts
├── package-lock.json             # Dependency lock file, if present
└── README.md                     # Project documentation
```

**Note:** This is a logical overview of the project structure. Confirm each listed file and folder exists in the target branch. Remove any entries that are absent and include other important directories found in the actual repository.

---

## 🎓 Student Features

The student interface provides the main food-ordering experience.

Students can:

- Browse campus food stalls.
- Open individual stall menus.
- Search for food items.
- Filter items by category.
- Check whether food items are available.
- Add items to the cart.
- Increase or decrease item quantities.
- Remove items from the cart.
- View the total order amount.
- Place orders using Pay at Counter.
- Receive an order ID.
- View order history.
- Track order progress.

### Student Ordering Flow

```text
Home
  ↓
Browse Stalls
  ↓
Open Stall Menu
  ↓
Select Food Items
  ↓
Add Items to Cart
  ↓
Review Cart
  ↓
Proceed to Checkout
  ↓
Place Order
  ↓
Receive Order ID
  ↓
Track Order
```

---

## 🏪 Campus Food Stalls

The application represents multiple campus food outlets, including:

- Maximus Live Counter
- Dosa Express
- Appetite – The Kathi Roll Shop
- Annapurna Southern Delights
- Wat-a-Burger
- Domino's
- Café Frisco
- Chai Garam

Each stall card is intended to provide relevant information such as the stall name, category, operating status, preparation time, and visual identity.

The actual list of stalls and their information depends on the data configured in the application.

---

## 🍴 Menu and Cart Management

### Menu Management

Menu cards provide information to help students select food items.

Depending on the item configuration, a card displays:

- Food item name
- Price
- Veg/non-veg classification
- Preparation time
- Availability status
- Add-to-cart option

Individual food-item photographs are omitted from the compact menu and cart design. Stall and campus visuals may still be displayed elsewhere in the interface.

### Cart Management

The cart supports:

- Adding food items.
- Increasing item quantity.
- Decreasing item quantity.
- Removing items.
- Calculating the order total.
- Displaying order and preparation information.
- Validating cart contents before checkout.

### Single-Stall Cart Validation

The cart is designed to keep one active order associated with a single stall.

This avoids combining items from different stalls into one order when the application is configured to enforce the single-stall rule.

---

## 💳 Checkout and Order Management

### Pay at Counter

BHUKH LAGI currently uses the **Pay at Counter** ordering method.

Students place an order through the application and pay at the relevant stall when collecting their food. This is not an online payment gateway.

### Order Information

An order may contain:

- Order ID
- Stall information
- Ordered food items
- Item quantities
- Total amount
- Payment method or payment status
- Preparation information
- Current order status

The precise fields depend on the application's order data structure.

### Order Lifecycle

The intended order lifecycle is:

```text
PENDING
   ↓
PREPARING
   ↓
READY
   ↓
COMPLETED
```

Additional states, such as `DELAYED` and `CANCELLED`, may be supported where implemented.

Order-status transitions should follow the rules defined in the application rather than allowing every status change without validation.

---

## 👨‍💼 Admin Features

The admin interface supports management of campus food operations.

### Admin Dashboard

The dashboard provides access to the available administrative functions.

### Order Management

Administrators can view and manage orders through the order queue and update order status according to the application's supported workflow.

### Menu Management

The menu management interface provides controls for managing food items and their availability, where implemented.

### Individual Item Availability

An administrator can change an individual food item's availability.

```text
Available ↔ Unavailable
```

### Bulk Item Availability

The interface also supports controls for changing the availability of multiple items together.

```text
Mark All Available
          ↕
Mark All Unavailable
```

### Stall Availability

Administrators can manage the open/closed state of a stall if the corresponding controls are enabled in the application.

---

## 💾 Data Management

The application uses centralized frontend state management for supported operations.

The state may include:

- User information
- Cart contents
- Item quantities
- Orders
- Order statuses
- Item availability
- Stall availability

### Browser LocalStorage

LocalStorage is used for lightweight browser-side persistence where implemented. This can preserve supported data between page reloads in the same browser.

LocalStorage is not a shared database. Browser-stored data does not automatically synchronize between different students or devices.

### Backend

The repository contains a Node.js backend entry point at `backend/server.js`.

The backend's actual responsibilities depend on its implemented routes and logic. Only functionality that is implemented and tested should be described as a working backend feature.

**Current limitation:** Database-backed shared persistence, production authentication, and real-time cross-device synchronization should not be claimed unless they have been implemented.

---

## 🌿 Git and GitHub Workflow

The project follows a **Feature Branching Strategy** to support collaborative development.

### Integration Branch

`tejasvi/scm`

This branch is used as the shared integration branch for the team's changes.

### Feature Branches

Team members use separate branches to develop individual features or fixes. Examples from the repository's workflow include:

- `tejasvi/admin-menu-feedback`
- `tejasvi/availability-accessibility`
- `tejasvi/login-validation`
- `tejasvi/order-status-model`
- `ansh/cart-validation`
- `ansh/cart-quantity-limit`
- `harsh/validation-tests`

These are examples of branch names used in the project workflow; the active branches can change over time.

### Development Workflow

```text
Shared Integration Branch
          ↓
Create Feature Branch
          ↓
Implement Changes
          ↓
Run Tests
          ↓
Commit Changes
          ↓
Push Feature Branch
          ↓
Open Pull Request
          ↓
Review Code and Test Results
          ↓
Resolve Conflicts if Required
          ↓
Approve Pull Request
          ↓
Merge into Integration Branch
```

### Why Use Feature Branching?

- Keeps unfinished work separate from the shared integration branch.
- Allows team members to work on different features in parallel.
- Makes individual changes easier to review.
- Helps identify which commits introduced a change.
- Reduces the risk of unreviewed changes entering the shared branch.

### Git Commands Used

```bash
# Check the current branch
git branch --show-current

# View the working-tree status
git status

# Fetch updates from GitHub
git fetch origin

# Create and switch to a feature branch
git switch -c feature/your-feature

# Stage a specific file
git add path/to/file

# Commit the change
git commit -m "feat: describe the change"

# Push the feature branch
git push -u origin feature/your-feature
```

The example branch name should be replaced with the actual branch name assigned to the developer.

---

## 🔀 Pull Requests and Code Review

Pull Requests are used to propose changes from a feature branch into the shared integration branch.

Before merging a Pull Request, the team should check:

- Whether the change addresses the intended requirement.
- Which files have been modified.
- Whether the implementation follows existing project conventions.
- Whether relevant automated tests pass.
- Whether existing functionality has been affected.
- Whether any merge conflicts remain.

As team lead, Tejasvi coordinates Pull Requests, reviews changes, checks integration impact, and approves or merges changes according to the team's workflow.

A Pull Request provides a reviewable record of the proposed changes and the discussion around them.

---

## ⚠️ Merge Conflict Resolution

A merge conflict occurs when Git cannot automatically combine overlapping changes.

The team follows this process:

```text
Conflict Detected
       ↓
Identify Conflicting File
       ↓
Compare Both Changes
       ↓
Choose or Combine the Required Logic
       ↓
Remove Conflict Markers
       ↓
Run Tests
       ↓
Review the Resolved Changes
       ↓
Commit or Complete the Merge
```

Conflict markers may look like:

```text
<<<<<<< HEAD
Current branch changes
=======
Incoming branch changes
>>>>>>> incoming-branch
```

These markers must be removed from the final source code after the correct implementation has been selected or combined.

The resolved file should be checked and tested before the merge is completed.

---

## 🧪 Testing

The project uses Jest for automated testing where configured in the root and backend packages.

### Previously Reported Test Results

The project documentation previously reported the following results:

| Test Area | Previously Reported Result |
|---|---:|
| Frontend | 59 / 59 passed |
| Backend | 3 / 3 passed |
| Total | 62 / 62 passed |

These numbers should be updated after running the current test suites. They should not be treated as a guarantee that every test is passing in the latest revision.

### Areas Covered by Tests

The documented test areas include:

- Cart operations
- Quantity management and quantity limits
- Single-stall cart validation
- Cart total calculation
- Order creation and order ID generation
- Order validation
- Order-status transitions
- Cancellation rules
- Individual item availability
- Bulk item availability
- Food-card behavior
- Backend health checking
- Backend route handling

### Why Automated Testing Matters

Automated tests help detect regressions when features are changed or merged. They make it easier for the team to verify existing behavior and identify issues before integration.

---

## ▶️ Installation and Setup

### Prerequisites

Install the following tools:

- Git
- Node.js
- npm
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/tejasvik-5/DEVOPS_PROJECT.git
cd DEVOPS_PROJECT
```

### 2. Install Root Dependencies

If the root `package.json` defines the project's dependencies:

```bash
npm install
```

### 3. Install Backend Dependencies

If `backend/package.json` is present and the backend has its own dependencies:

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

If the backend requires environment variables, follow the configuration in the project's `.env.example` file, if present.

Create a local `.env` file only when required by the implementation. Never commit secrets, passwords, API keys, or real environment credentials to GitHub.

### 5. Run the Application

Inspect the scripts in the root and backend `package.json` files to identify the supported startup commands.

For example, if a package defines a `start` script:

```bash
npm start
```

If it defines a `dev` script:

```bash
npm run dev
```

Run the command from the directory containing the relevant `package.json`.

The frontend may be served using the project's configured local web server. If the frontend supports direct browser launching, `index.html` can be opened directly.

### 6. Run Automated Tests

Use the test scripts defined in the relevant package files. For example, if a package defines a `test` script:

```bash
npm test
```

Run frontend and backend tests separately if the repository configures them separately.

**Note:** Startup commands and test scripts must match the actual `package.json` configuration. The commands above are conditional examples, not a substitute for checking the project's scripts.

---

## 🐛 Problems Faced and Solutions

### 1. Missing Project Files

Some required application files were missing from a local working-tree state, which affected application loading.

**Solution:** The team inspected the repository history and restored the required files from an available repository revision.

### 2. Local Branch Behind Remote

The local integration branch did not always contain the latest changes available on GitHub.

**Solution:** The team fetched remote updates and synchronized the local branch with the relevant remote version.

### 3. Missing Image Assets

Missing image assets caused resource-loading errors in the browser.

**Solution:** The team identified and restored the required visual assets and checked their references.

### 4. Unnecessary Food Images

Some individual menu and cart image references created unnecessary loading and broken-image areas.

**Solution:** The interface was simplified to use a compact non-photo design for menu and cart items while retaining relevant stall and campus visuals.

### 5. Merge Conflicts

Overlapping changes from different feature branches caused conflicts during integration.

**Solution:** The team compared the conflicting changes, resolved the affected files, and checked the result before completing the merge.

These examples describe issues encountered during development. The exact details should be retained only if they reflect the team's actual experience.

---

## 👥 Team Members

| Member | Role |
|---|---|
| **Tejasvi Kandpal** | Team Lead, SCM and Integration |
| **Ansh Anand** | Menu, Cart, Order and Data Logic |
| **Harsh Royal** | Admin Functionality, Testing and Supporting Development |

### Tejasvi Kandpal — Team Lead / SCM and Integration

Responsibilities:

- Repository management
- Integration branch management
- Pull Request coordination
- Code reviews
- Merge approval
- Merge conflict coordination
- Integration testing
- Team coordination

### Ansh Anand — Student-Side Features

Responsibilities:

- Menu functionality
- Cart management
- Quantity controls
- Cart validation
- Order logic
- Data management
- Checkout
- Student-side integration
- Testing and debugging

### Harsh Royal — Admin and Testing

Responsibilities:

- Admin functionality
- Order management
- Menu administration
- Availability management
- Automated testing
- Debugging
- Integration support
- Supporting future CI/CD improvements

---

## 📊 Current Status

The following areas are documented as implemented in the project:

- Student interface
- Campus stall browsing
- Stall menus
- Search and category filtering
- Food availability
- Single-stall cart
- Quantity controls
- Cart validation
- Cart totals
- Pay at Counter checkout
- Order creation and order ID generation
- Order history and tracking
- Order-status handling
- Individual item availability
- Bulk item availability
- Stall availability
- Admin functionality
- Frontend and backend automated tests
- Feature-branch development
- Pull Request reviews
- Merge conflict handling

The current status should be checked against the latest code and test results before submission.

---

## 🚀 Future Scope

Possible improvements include:

- Database integration for shared persistence.
- Server-side user accounts and stronger authentication.
- Role-based access control for administrators.
- Real-time order updates.
- Student notifications.
- Improved admin analytics.
- Additional automated tests.
- Continuous Integration and Continuous Deployment (CI/CD).
- Production deployment.
- Logging and monitoring.
- Improved security.
- Accessibility improvements.
- Performance optimization.
- Release management and rollback procedures.

These are proposed improvements, not claims that the features already exist.

---

## 📝 Conclusion

BHUKH LAGI is a campus food ordering and canteen management project designed to make food selection and ordering more convenient for UPES students.

It combines student-side ordering, cart management, order tracking, and administrative availability controls with collaborative software development practices.

The team uses Git and GitHub to manage changes through feature branches, commits, Pull Requests, code reviews, and merge conflict resolution. Automated testing supports the effort to maintain existing functionality while new features are integrated.

The project also provides practical experience in frontend development, backend development, source-code management, team collaboration, and software testing.
