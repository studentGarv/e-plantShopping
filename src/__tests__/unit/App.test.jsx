// src/__tests__/unit/App.test.jsx
// Smoke test verifying CartProvider wraps all page components.
// Requirements: 9.1

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('App', () => {
  it('renders without crashing and shows LandingPage by default', () => {
    render(<App />);
    expect(screen.getByText('Paradise Nursery')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('navigates to ProductListingPage after clicking Get Started', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /get started/i }));
    // Header tagline is only on ProductListingPage / CartPage
    expect(screen.getByText(/where every leaf/i)).toBeInTheDocument();
  });

  it('navigates to CartPage when Cart icon is clicked from product page', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /get started/i }));
    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(screen.getByRole('heading', { name: /your cart/i })).toBeInTheDocument();
  });
});
