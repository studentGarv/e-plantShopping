// src/__tests__/unit/Header.test.jsx
// Requirements: 2.1, 2.2, 2.3, 2.4

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../CartSlice';
import Header from '../../components/Header';

function renderHeader(props = {}) {
  const store = configureStore({ reducer: { cart: cartReducer } });
  return render(
    <Provider store={store}>
      <Header onLogoClick={props.onLogoClick ?? (() => {})} onCartClick={props.onCartClick ?? (() => {})} />
    </Provider>
  );
}

describe('Header', () => {
  it('renders company name "Paradise Nursery"', () => {
    renderHeader();
    expect(screen.getByText('Paradise Nursery')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    renderHeader();
    expect(screen.getByText(/where every leaf/i)).toBeInTheDocument();
  });

  it('renders cart icon button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /shopping cart/i })).toBeInTheDocument();
  });

  it('renders logo / company name button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /go to home/i })).toBeInTheDocument();
  });

  it('calls onLogoClick when logo is clicked', async () => {
    const user = userEvent.setup();
    const onLogoClick = vi.fn();
    renderHeader({ onLogoClick });
    await user.click(screen.getByRole('button', { name: /go to home/i }));
    expect(onLogoClick).toHaveBeenCalledOnce();
  });

  it('calls onCartClick when cart icon is clicked', async () => {
    const user = userEvent.setup();
    const onCartClick = vi.fn();
    renderHeader({ onCartClick });
    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(onCartClick).toHaveBeenCalledOnce();
  });
});
