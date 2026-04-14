// Feature: paradise-nursery-shopping-app
// Property tests for the cart reducer (pure function, no rendering needed).

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import cartReducer, { addItem, removeItem, updateQuantity } from '../../CartSlice';

// ── Arbitraries ──────────────────────────────────────────────────────────────

/** Generate a valid Plant object. */
const plantArb = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 40 }),
  price: fc.float({ min: Math.fround(0.01), max: Math.fround(999.99), noNaN: true }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  thumbnail: fc.webUrl(),
  category: fc.constantFrom('Air Purifying', 'Aromatic', 'Low Maintenance'),
});

/** Generate a CartItem (plant + quantity ≥ 1). */
const cartItemArb = fc.record({
  plant: plantArb,
  quantity: fc.integer({ min: 1, max: 50 }),
});

/** Generate a CartState with 0–5 unique items. */
const cartStateArb = fc
  .array(cartItemArb, { minLength: 0, maxLength: 5 })
  .map((items) => {
    // Deduplicate by plant.id so state is always valid.
    const seen = new Set();
    const unique = items.filter(({ plant }) => {
      if (seen.has(plant.id)) return false;
      seen.add(plant.id);
      return true;
    });
    return { items: unique };
  });

/** Generate a CartState that is guaranteed to contain at least one item. */
const nonEmptyCartStateArb = cartStateArb.filter((s) => s.items.length > 0);

// ── Helper ───────────────────────────────────────────────────────────────────

function totalItems(state) {
  return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

// ── Property 5: ADD_ITEM ─────────────────────────────────────────────────────

describe('cartReducer', () => {
  // Feature: paradise-nursery-shopping-app, Property 5: ADD_ITEM adds plant with quantity one and increments total
  it('Property 5: ADD_ITEM adds plant with quantity one and increments total', () => {
    fc.assert(
      fc.property(cartStateArb, plantArb, (state, plant) => {
        // Make sure the plant is NOT already in the state to satisfy the precondition.
        const filtered = {
          items: state.items.filter((i) => i.plant.id !== plant.id),
        };

        const before = totalItems(filtered);
        const next = cartReducer(filtered, addItem(plant));

        // Item appears in cart with quantity 1.
        const added = next.items.find((i) => i.plant.id === plant.id);
        expect(added).toBeDefined();
        expect(added.quantity).toBe(1);

        // Total increments by exactly 1.
        expect(totalItems(next)).toBe(before + 1);
      }),
      { numRuns: 100 }
    );
  });

  // ADD_ITEM is a no-op when plant is already present.
  it('ADD_ITEM is a no-op when plant already present', () => {
    fc.assert(
      fc.property(nonEmptyCartStateArb, (state) => {
        const existing = state.items[0];
        const next = cartReducer(state, addItem(existing.plant));
        // Note: Redux Toolkit uses immer, so it creates a new draft. However, if draft isn't mutated, it might return same reference or not. It's better to check equality of items length or something. Let's just adjust to expect(next).toEqual(state); instead of toBe.
        expect(next).toEqual(state);
      }),
      { numRuns: 100 }
    );
  });

  // ── Property 9: INCREMENT ────────────────────────────────────────────────────

  // Feature: paradise-nursery-shopping-app, Property 9: INCREMENT increases item quantity by one
  it('Property 9: INCREMENT increases item quantity by one', () => {
    fc.assert(
      fc.property(nonEmptyCartStateArb, (state) => {
        // Pick a random item to increment.
        const idx = Math.floor(Math.random() * state.items.length);
        const target = state.items[idx];
        const before = target.quantity;

        const next = cartReducer(state, updateQuantity({ id: target.plant.id, quantity: target.quantity + 1 }));

        const updated = next.items.find((i) => i.plant.id === target.plant.id);
        expect(updated.quantity).toBe(before + 1);

        // All other items are unchanged.
        next.items
          .filter((i) => i.plant.id !== target.plant.id)
          .forEach((i) => {
            const original = state.items.find((o) => o.plant.id === i.plant.id);
            expect(i.quantity).toBe(original.quantity);
          });
      }),
      { numRuns: 100 }
    );
  });

  // ── Property 10: DECREMENT ───────────────────────────────────────────────────

  // Feature: paradise-nursery-shopping-app, Property 10: DECREMENT decreases quantity or removes item
  it('Property 10: DECREMENT decreases quantity or removes item; no quantity ≤ 0', () => {
    fc.assert(
      fc.property(nonEmptyCartStateArb, (state) => {
        const idx = Math.floor(Math.random() * state.items.length);
        const target = state.items[idx];

        const next = cartReducer(state, updateQuantity({ id: target.plant.id, quantity: target.quantity - 1 }));

        // No item should ever have quantity ≤ 0.
        expect(next.items.every((i) => i.quantity > 0)).toBe(true);

        if (target.quantity === 1) {
          // Item must be removed entirely.
          expect(next.items.find((i) => i.plant.id === target.plant.id)).toBeUndefined();
        } else {
          // Quantity decremented by 1.
          const updated = next.items.find((i) => i.plant.id === target.plant.id);
          expect(updated).toBeDefined();
          expect(updated.quantity).toBe(target.quantity - 1);
        }
      }),
      { numRuns: 100 }
    );
  });

  // ── Property 11: REMOVE_ITEM ─────────────────────────────────────────────────

  // Feature: paradise-nursery-shopping-app, Property 11: REMOVE_ITEM removes item and decreases total by removed quantity
  it('Property 11: REMOVE_ITEM removes item and decreases total by removed quantity', () => {
    fc.assert(
      fc.property(nonEmptyCartStateArb, (state) => {
        const idx = Math.floor(Math.random() * state.items.length);
        const target = state.items[idx];
        const before = totalItems(state);

        const next = cartReducer(state, removeItem(target.plant.id));

        // Item is absent from the new state.
        expect(next.items.find((i) => i.plant.id === target.plant.id)).toBeUndefined();

        // Total decreases by exactly the removed quantity.
        expect(totalItems(next)).toBe(before - target.quantity);
      }),
      { numRuns: 100 }
    );
  });
});
