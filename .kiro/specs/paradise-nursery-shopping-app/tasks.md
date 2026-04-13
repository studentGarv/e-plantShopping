# Implementation Plan: Paradise Nursery Shopping App

## Overview

Build a React SPA with Vite for browsing and purchasing house plants. The app has three views (Landing, Product Listing, Cart) managed by a single `currentPage` state variable. Cart state is shared globally via React Context + `useReducer`. All plant data is static in-memory. Property-based tests use fast-check.

## Tasks

- [ ] 1. Initialize project and static data
  - Scaffold a new Vite + React project (or confirm existing scaffold)
  - Install dependencies: `react`, `react-dom`, `fast-check`, a test runner (Vitest + `@testing-library/react`)
  - Create `src/data/plants.js` with at least 6 plants across at least 2 categories, each with `id`, `name`, `price`, `description`, `thumbnail`, and `category` fields
  - Create `src/__tests__/unit/` and `src/__tests__/property/` directory structure
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 2. Implement cart reducer and CartContext
  - [ ] 2.1 Create `src/context/CartContext.jsx` with `CartProvider` and `useCart` hook
    - Define `CartState` and `CartAction` types/shapes
    - Implement `cartReducer` handling `ADD_ITEM`, `REMOVE_ITEM`, `INCREMENT`, `DECREMENT`
    - Enforce invariants: `ADD_ITEM` is no-op if plant already present; `DECREMENT` removes item when quantity reaches 1; no item ever has `quantity <= 0`
    - Export `CartProvider` wrapping children with context, and `useCart()` hook
    - _Requirements: 4.2, 4.3, 6.2, 6.3, 7.2, 8.1, 9.1_

  - [ ]* 2.2 Write property test for ADD_ITEM (Property 5)
    - **Property 5: ADD_ITEM adds plant with quantity one and increments total**
    - **Validates: Requirements 4.2, 4.4**
    - File: `src/__tests__/property/cartReducer.property.test.js`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 5: ADD_ITEM adds plant with quantity one and increments total`

  - [ ]* 2.3 Write property test for INCREMENT (Property 9)
    - **Property 9: INCREMENT increases item quantity by one**
    - **Validates: Requirements 6.2**
    - File: `src/__tests__/property/cartReducer.property.test.js`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 9: INCREMENT increases item quantity by one`

  - [ ]* 2.4 Write property test for DECREMENT (Property 10)
    - **Property 10: DECREMENT decreases quantity or removes item; no quantity ≤ 0**
    - **Validates: Requirements 6.3, 8.1, 8.3**
    - File: `src/__tests__/property/cartReducer.property.test.js`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 10: DECREMENT decreases quantity or removes item`

  - [ ]* 2.5 Write property test for REMOVE_ITEM (Property 11)
    - **Property 11: REMOVE_ITEM removes item and decreases total by removed quantity**
    - **Validates: Requirements 7.2, 7.4**
    - File: `src/__tests__/property/cartReducer.property.test.js`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 11: REMOVE_ITEM removes item and decreases total by removed quantity`

- [ ] 3. Checkpoint — Ensure all reducer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement App shell and navigation
  - [ ] 4.1 Create `src/App.jsx`
    - Own `currentPage` state (`'landing' | 'products' | 'cart'`)
    - Wrap entire tree in `<CartProvider>`
    - Render the correct page component based on `currentPage`
    - Pass `navigate(page)` callback to children
    - _Requirements: 1.5, 2.2, 2.4, 9.1_

  - [ ]* 4.2 Write unit test for App (smoke test)
    - Verify `CartProvider` wraps all page components
    - File: `src/__tests__/unit/App.test.jsx`
    - _Requirements: 9.1_

- [ ] 5. Implement LandingPage
  - [ ] 5.1 Create `src/components/LandingPage.jsx`
    - Accept `onGetStarted` prop
    - Render company name "Paradise Nursery", full-page background image, company description paragraph, and "Get Started" button
    - Call `onGetStarted` when button is clicked
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ]* 5.2 Write unit tests for LandingPage
    - Test renders company name, description, background image, and "Get Started" button
    - Test clicking "Get Started" calls the navigate callback with `'products'`
    - File: `src/__tests__/unit/LandingPage.test.jsx`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 6. Implement Header
  - [ ] 6.1 Create `src/components/Header.jsx`
    - Accept `onLogoClick` and `onCartClick` props
    - Read `totalItems` from `useCart()` (derived as sum of all quantities)
    - Render company name, logo image, tagline, and cart icon with item count badge
    - Call `onLogoClick` on logo click; call `onCartClick` on cart icon click
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 6.2 Write unit tests for Header
    - Test renders company name, logo, tagline, and cart icon
    - Test clicking logo calls navigate with `'landing'`; clicking cart icon calls navigate with `'cart'`
    - File: `src/__tests__/unit/Header.test.jsx`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 6.3 Write property test for cart icon count (Property 1)
    - **Property 1: Cart icon count reflects total items**
    - **Validates: Requirements 2.3, 6.6, 9.2**
    - File: `src/__tests__/property/cartDisplay.property.test.jsx`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 1: Cart icon count reflects total items`

- [ ] 7. Implement PlantCard and CategorySection
  - [ ] 7.1 Create `src/components/PlantCard.jsx`
    - Accept `plant` prop
    - Read cart state via `useCart()` to determine if plant is already in cart
    - Render thumbnail, name, price, description, and "Add to Cart" button
    - Disable button when `plant.id` is present in cart items
    - Dispatch `ADD_ITEM` on button click
    - _Requirements: 3.4, 4.1, 4.2, 4.3, 4.4_

  - [ ] 7.2 Create `src/components/CategorySection.jsx`
    - Accept `category` (string) and `plants` (array) props
    - Render section heading with category name and a `<PlantCard>` for each plant
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 7.3 Write property test for PlantCard display (Property 3)
    - **Property 3: PlantCard displays all plant fields**
    - **Validates: Requirements 3.4**
    - File: `src/__tests__/property/productListing.property.test.jsx`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 3: PlantCard displays all plant fields`

  - [ ]* 7.4 Write property test for Add to Cart button state (Property 4)
    - **Property 4: Add to Cart button state reflects cart membership**
    - **Validates: Requirements 4.1, 4.3, 7.5, 8.2, 9.3**
    - File: `src/__tests__/property/productListing.property.test.jsx`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 4: Add to Cart button state reflects cart membership`

- [ ] 8. Implement ProductListingPage
  - [ ] 8.1 Create `src/components/ProductListingPage.jsx`
    - Accept `navigate` prop
    - Render `<Header>` with appropriate callbacks
    - Group plants from `src/data/plants.js` by category
    - Render one `<CategorySection>` per unique category
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

  - [ ]* 8.2 Write property test for category sections (Property 2)
    - **Property 2: Category sections match plant data**
    - **Validates: Requirements 3.1, 3.2, 3.3**
    - File: `src/__tests__/property/productListing.property.test.jsx`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 2: Category sections match plant data`

- [ ] 9. Checkpoint — Ensure all tests pass so far
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement CartItemCard and CartPage
  - [ ] 10.1 Create `src/components/CartItemCard.jsx`
    - Accept `item` (CartItem) prop
    - Render thumbnail, name, unit price, subtotal (unit price × quantity), increase button, decrease button, and delete button
    - Dispatch `INCREMENT`, `DECREMENT`, or `REMOVE_ITEM` on respective button clicks
    - _Requirements: 5.2, 5.3, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 8.1_

  - [ ] 10.2 Create `src/components/CheckoutButton.jsx`
    - Render a button labelled "Checkout" (checkout flow is out of scope)
    - _Requirements: 5.6_

  - [ ] 10.3 Create `src/components/CartPage.jsx`
    - Accept `navigate` prop
    - Render `<Header>` with appropriate callbacks
    - Render a `<CartItemCard>` for each item in cart state
    - Render total item count (sum of all quantities) and total cost (sum of all subtotals)
    - Render `<CheckoutButton>`
    - _Requirements: 5.1, 5.4, 5.5, 5.6, 6.5, 6.6, 7.3, 7.4_

  - [ ]* 10.4 Write unit tests for CartPage
    - Test renders Checkout button
    - File: `src/__tests__/unit/CartPage.test.jsx`
    - _Requirements: 5.6_

  - [ ]* 10.5 Write property test for CartItemCard count (Property 6)
    - **Property 6: CartItemCard count matches cart items**
    - **Validates: Requirements 5.1, 7.3**
    - File: `src/__tests__/property/cartDisplay.property.test.jsx`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 6: CartItemCard count matches cart items`

  - [ ]* 10.6 Write property test for CartItemCard fields and controls (Property 7)
    - **Property 7: CartItemCard displays correct fields and controls**
    - **Validates: Requirements 5.2, 5.3, 6.1, 7.1**
    - File: `src/__tests__/property/cartDisplay.property.test.jsx`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 7: CartItemCard displays correct fields and controls`

  - [ ]* 10.7 Write property test for cart summary totals (Property 8)
    - **Property 8: Cart summary totals are arithmetically correct**
    - **Validates: Requirements 5.4, 5.5**
    - File: `src/__tests__/property/cartDisplay.property.test.jsx`
    - Tag: `// Feature: paradise-nursery-shopping-app, Property 8: Cart summary totals are arithmetically correct`

- [ ] 11. Wire everything together in main entry point
  - [ ] 11.1 Update `src/main.jsx` (or `src/index.jsx`) to render `<App />` into the DOM root
    - Ensure `<App>` is the single root component
    - _Requirements: 9.1_

  - [ ] 11.2 Add basic CSS / styling
    - Apply styles for landing page background image, header layout, category sections, plant card grid, and cart page layout
    - _Requirements: 1.2, 2.1, 3.1_

- [ ] 12. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with a minimum of 100 iterations per property
- Each property test file includes a tag comment: `// Feature: paradise-nursery-shopping-app, Property N: <text>`
- Checkpoints ensure incremental validation at logical milestones
