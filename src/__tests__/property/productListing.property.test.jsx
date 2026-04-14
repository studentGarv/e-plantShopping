// src/__tests__/property/productListing.property.test.jsx
// Property tests for product listing components.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import React from 'react';

import PlantCard from '../../components/PlantCard';
import ProductList from '../../components/ProductList';
import { plants } from '../../data/plants';

// ── Arbitraries ──────────────────────────────────────────────────────────────

const plantArb = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 40 }),
  price: fc.float({ min: Math.fround(0.01), max: Math.fround(999.99), noNaN: true }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  thumbnail: fc.webUrl(),
  category: fc.constantFrom('Air Purifying', 'Aromatic', 'Low Maintenance', 'Exotic'),
});

const cartItemArb = fc.record({
  plant: plantArb,
  quantity: fc.integer({ min: 1, max: 20 }),
});

const cartStateArb = fc
  .array(cartItemArb, { minLength: 0, maxLength: 5 })
  .map((items) => {
    const seen = new Set();
    return {
      items: items.filter(({ plant }) => {
        if (seen.has(plant.id)) return false;
        seen.add(plant.id);
        return true;
      }),
    };
  });

// ── Helper: render PlantCard with an injected cart state ─────────────────────

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../CartSlice';

function renderPlantCardWithCart(plant, cartState = { items: [] }) {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: cartState },
  });
  return render(
    <Provider store={store}>
      <PlantCard plant={plant} />
    </Provider>
  );
}

// ── Property 3: PlantCard displays all plant fields ──────────────────────────

describe('productListing property tests', () => {
  // Feature: paradise-nursery-shopping-app, Property 3: PlantCard displays all plant fields
  it('Property 3: PlantCard displays all plant fields', () => {
    fc.assert(
      fc.property(plantArb, (plant) => {
        const { unmount } = renderPlantCardWithCart(plant);
        const card = document.querySelector('.plant-card');
        expect(card).not.toBeNull();
        // Name
        expect(card.textContent).toContain(plant.name);
        // Description
        expect(card.textContent).toContain(plant.description);
        // Price (formatted to 2 dp)
        expect(card.textContent).toContain(plant.price.toFixed(2));
        // Thumbnail img
        const img = card.querySelector('img');
        expect(img).not.toBeNull();
        expect(img.getAttribute('src')).toBe(plant.thumbnail);
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Feature: paradise-nursery-shopping-app, Property 4: Add to Cart button state reflects cart membership
  it('Property 4: Add to Cart button state reflects cart membership', () => {
    fc.assert(
      fc.property(plantArb, cartStateArb, (plant, cartState) => {
        const inCart = cartState.items.some((i) => i.plant.id === plant.id);
        const { unmount } = renderPlantCardWithCart(plant, cartState);

        const btn = document.querySelector(`#add-to-cart-${plant.id}`);
        expect(btn).not.toBeNull();

        if (inCart) {
          expect(btn.disabled).toBe(true);
        } else {
          expect(btn.disabled).toBe(false);
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Feature: paradise-nursery-shopping-app, Property 2: Category sections match plant data
  it('Property 2: Category sections match plant data', () => {
    const uniqueCategories = [...new Set(plants.map((p) => p.category))];

    const store = configureStore({ reducer: { cart: cartReducer } });
    const { unmount } = render(
      <Provider store={store}>
        <ProductList navigate={() => {}} />
      </Provider>
    );

    const sections = document.querySelectorAll('.category-section');
    expect(sections.length).toBe(uniqueCategories.length);

    uniqueCategories.forEach((cat) => {
      // Each category heading should appear
      const heading = screen.getByRole('heading', { name: cat });
      expect(heading).toBeInTheDocument();

      // Each section should contain exactly the right number of plant cards
      const section = document.querySelector(`.category-section[aria-label="${cat}"]`);
      const plantsInCat = plants.filter((p) => p.category === cat);
      const cards = section.querySelectorAll('.plant-card');
      expect(cards.length).toBe(plantsInCat.length);
    });

    unmount();
  });
});
