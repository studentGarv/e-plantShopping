// src/__tests__/unit/CartPage.test.jsx
// Requirements: 5.6

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../../context/CartContext';
import CartPage from '../../components/CartPage';

function renderCartPage(props = {}) {
  return render(
    <CartProvider>
      <CartPage navigate={props.navigate ?? (() => {})} />
    </CartProvider>
  );
}

describe('CartPage', () => {
  it('renders the Checkout button', () => {
    renderCartPage();
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
  });

  it('renders "Your Cart" heading', () => {
    renderCartPage();
    expect(screen.getByRole('heading', { name: /your cart/i })).toBeInTheDocument();
  });

  it('shows empty state message when cart is empty', () => {
    renderCartPage();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
