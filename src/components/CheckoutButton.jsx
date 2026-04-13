// src/components/CheckoutButton.jsx
/**
 * Checkout button — present per requirements; checkout flow is out of scope.
 * Requirement: 5.6
 */
export default function CheckoutButton() {
  return (
    <button
      id="checkout-btn"
      className="btn btn-primary checkout-btn"
      onClick={() => alert('Checkout flow coming soon! 🌱')}
    >
      Checkout
    </button>
  );
}
