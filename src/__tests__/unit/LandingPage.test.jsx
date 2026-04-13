// src/__tests__/unit/LandingPage.test.jsx
// Requirements: 1.1, 1.2, 1.3, 1.4, 1.5

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LandingPage from '../../components/LandingPage';

describe('LandingPage', () => {
  it('renders company name "Paradise Nursery"', () => {
    render(<LandingPage onGetStarted={() => {}} />);
    expect(screen.getByRole('heading', { name: /paradise nursery/i })).toBeInTheDocument();
  });

  it('renders a description paragraph', () => {
    render(<LandingPage onGetStarted={() => {}} />);
    expect(screen.getByText(/bring nature indoors/i)).toBeInTheDocument();
  });

  it('renders a "Get Started" button', () => {
    render(<LandingPage onGetStarted={() => {}} />);
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('calls onGetStarted when "Get Started" is clicked', async () => {
    const user = userEvent.setup();
    const onGetStarted = vi.fn();
    render(<LandingPage onGetStarted={onGetStarted} />);
    await user.click(screen.getByRole('button', { name: /get started/i }));
    expect(onGetStarted).toHaveBeenCalledOnce();
  });

  it('clicking "Get Started" calls navigate with "products" when used inside App', async () => {
    // Verify callback is triggered (navigate behavior tested in App.test.jsx)
    const user = userEvent.setup();
    const onGetStarted = vi.fn();
    render(<LandingPage onGetStarted={onGetStarted} />);
    await user.click(screen.getByRole('button', { name: /get started/i }));
    expect(onGetStarted).toHaveBeenCalledTimes(1);
  });
});
