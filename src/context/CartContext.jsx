// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from 'react';

// ── Initial State ────────────────────────────────────────────────────────────
const initialState = { items: [] };

// ── Reducer ──────────────────────────────────────────────────────────────────
/**
 * Pure cart reducer.
 *
 * Invariants:
 *   - ADD_ITEM is a no-op if the plant is already present.
 *   - DECREMENT removes the item when quantity reaches 1 (no qty ≤ 0).
 *   - REMOVE_ITEM removes the item regardless of quantity.
 *   - INCREMENT is a no-op if the plant is not in the cart.
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some((i) => i.plant.id === action.plant.id);
      if (exists) return state; // no-op
      return { items: [...state.items, { plant: action.plant, quantity: 1 }] };
    }

    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter((i) => i.plant.id !== action.plantId),
      };
    }

    case 'INCREMENT': {
      return {
        items: state.items.map((i) =>
          i.plant.id === action.plantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }

    case 'DECREMENT': {
      return {
        items: state.items
          .map((i) =>
            i.plant.id === action.plantId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────
export const CartContext = createContext(null);

/**
 * CartProvider — wraps children with CartContext.
 * @param {{ children: React.ReactNode }} props
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart — convenience hook for accessing cart state and dispatch.
 * Must be used inside a <CartProvider>.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
