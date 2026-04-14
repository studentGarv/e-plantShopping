// src/__tests__/property/cartDisplay.property.test.jsx
// Property tests for cart display components using fast-check.

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import React from 'react';

import Header from '../../components/Header';
import CartPage from '../../components/CartPage';
import CartItem from '../../components/CartItem';

// ── Arbitraries ──────────────────────────────────────────────────────────────

const plantArb = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 40 }),
  price: fc.float({ min: Math.fround(0.01), max: Math.fround(999.99), noNaN: true }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  thumbnail: fc.webUrl(),
  category: fc.constantFrom('Air Purifying', 'Aromatic', 'Low Maintenance'),
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

const nonEmptyCartStateArb = cartStateArb.filter((s) => s.items.length > 0);

// ── Helper: render a component with an injected CartContext state ─────────────

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../CartSlice';

function renderWithCartState(Component, cartState, extraProps = {}) {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: cartState },
  });
  return render(
    <Provider store={store}>
      <Component navigate={() => {}} {...extraProps} />
    </Provider>
  );
}

// ── Property 1: Cart icon count reflects total items ─────────────────────────

describe('cartDisplay property tests', () => {
  // Feature: paradise-nursery-shopping-app, Property 1: Cart icon count reflects total items
  it('Property 1: Cart icon count reflects total items', () => {
    fc.assert(
      fc.property(cartStateArb, (cartState) => {
        const expectedTotal = cartState.items.reduce((s, i) => s + i.quantity, 0);
        const { unmount } = renderWithCartState(Header, cartState, {
          onLogoClick: () => {},
          onCartClick: () => {},
        });

        if (expectedTotal > 0) {
          const badge = document.querySelector('.cart-badge');
          expect(badge).not.toBeNull();
          expect(parseInt(badge.textContent, 10)).toBe(expectedTotal);
        } else {
          expect(document.querySelector('.cart-badge')).toBeNull();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Feature: paradise-nursery-shopping-app, Property 6: CartItem count matches cart items
  it('Property 6: CartItem count matches cart items', () => {
    fc.assert(
      fc.property(cartStateArb, (cartState) => {
        const { unmount } = renderWithCartState(CartPage, cartState);
        const cards = document.querySelectorAll('.cart-item-card');
        expect(cards.length).toBe(cartState.items.length);
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Feature: paradise-nursery-shopping-app, Property 7: CartItem displays correct fields and controls
  it('Property 7: CartItem displays correct fields and controls', () => {
    fc.assert(
      fc.property(cartItemArb, (item) => {
        const store = configureStore({
          reducer: { cart: cartReducer },
          preloadedState: { cart: { items: [item] } },
        });
        const { unmount } = render(
          <Provider store={store}>
            <CartItem item={item} />
          </Provider>
        );
        const card = document.querySelector('.cart-item-card');
        expect(card).not.toBeNull();
        // Name is displayed
        expect(card.textContent).toContain(item.plant.name);
        // Increase, decrease, and delete buttons exist
        expect(document.querySelector(`#increment-${item.plant.id}`)).not.toBeNull();
        expect(document.querySelector(`#decrement-${item.plant.id}`)).not.toBeNull();
        expect(document.querySelector(`#remove-${item.plant.id}`)).not.toBeNull();
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Feature: paradise-nursery-shopping-app, Property 8: Cart summary totals are arithmetically correct
  it('Property 8: Cart summary totals are arithmetically correct', () => {
    fc.assert(
      fc.property(nonEmptyCartStateArb, (cartState) => {
        const expectedItems = cartState.items.reduce((s, i) => s + i.quantity, 0);
        const expectedCost = cartState.items.reduce(
          (s, i) => s + i.plant.price * i.quantity,
          0
        );

        const { unmount } = renderWithCartState(CartPage, cartState);

        const itemsEl = document.querySelector('.cart-total-items strong');
        const costEl = document.querySelector('.cart-total-cost strong');

        expect(itemsEl).not.toBeNull();
        expect(costEl).not.toBeNull();

        expect(parseInt(itemsEl.textContent, 10)).toBe(expectedItems);
        expect(parseFloat(costEl.textContent.replace('$', ''))).toBeCloseTo(expectedCost, 2);

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
