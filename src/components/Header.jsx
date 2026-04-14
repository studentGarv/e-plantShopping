// src/components/Header.jsx
import { useSelector } from 'react-redux';

/**
 * Shared header for ProductListingPage and CartPage.
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
export default function Header({ onLogoClick, onCartClick }) {
  const items = useSelector(state => state.cart.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="header">
      <button
        id="logo-btn"
        className="header-logo-btn"
        onClick={onLogoClick}
        aria-label="Go to home"
      >
        {/* Inline SVG leaf logo */}
        <svg
          className="header-logo-img"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M24 4C13 4 5 15 5 27c0 8.3 5.4 15.3 13 17.6V44h4v-3C34.4 38.2 43 30.2 43 20
               43 10.6 34.4 4 24 4z"
            fill="#4ade80"
          />
          <path d="M24 44V26" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className="header-company">Paradise Nursery</span>
      </button>

      <p className="header-tagline">Where every leaf tells a story 🌿</p>

      <button
        id="cart-icon-btn"
        className="header-cart-btn"
        onClick={onCartClick}
        aria-label={`Shopping cart, ${totalItems} items`}
      >
        <svg
          className="cart-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {totalItems > 0 && (
          <span className="cart-badge" aria-live="polite">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
}
