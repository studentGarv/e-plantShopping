# 🌿 Paradise Nursery

A modern React shopping app for browsing and purchasing houseplants. Browse plants grouped by category, add them to your cart, adjust quantities, and review your total before checkout — all in a beautifully designed, fully client-side SPA.

---

## ✨ Features

- **Landing Page** — Full-page hero with company intro and animated CTA
- **Product Listing** — Plants grouped by category with hover effects and add-to-cart
- **Shopping Cart** — Live quantity controls, per-item subtotals, and order total
- **Global Cart State** — React Context + `useReducer` keeps cart consistent across all pages
- **Property-Based Tests** — 11 correctness properties verified with [fast-check](https://fast-check.dev), 100 iterations each

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 8 |
| State | React Context + `useReducer` |
| Styling | Vanilla CSS (Outfit font, CSS custom properties) |
| Testing | Vitest + React Testing Library + fast-check |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx       # Entry hero page
│   ├── Header.jsx            # Sticky header with live cart badge
│   ├── ProductListingPage.jsx# Products grouped by category
│   ├── CategorySection.jsx   # Section heading + plant grid
│   ├── PlantCard.jsx         # Individual plant card
│   ├── CartPage.jsx          # Cart view with totals
│   ├── CartItemCard.jsx      # Cart item with +/− controls
│   └── CheckoutButton.jsx    # Checkout trigger
├── context/
│   └── CartContext.jsx       # cartReducer + CartProvider + useCart
├── data/
│   └── plants.js             # Static plant catalogue (8 plants, 3 categories)
└── __tests__/
    ├── unit/                 # Component unit & integration tests
    │   ├── App.test.jsx
    │   ├── LandingPage.test.jsx
    │   ├── Header.test.jsx
    │   └── CartPage.test.jsx
    └── property/             # fast-check property-based tests
        ├── cartReducer.property.test.js   # Properties 5, 9, 10, 11
        ├── cartDisplay.property.test.jsx  # Properties 1, 6, 7, 8
        └── productListing.property.test.jsx # Properties 2, 3, 4
```

---