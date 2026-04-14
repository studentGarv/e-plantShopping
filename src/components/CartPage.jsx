// src/components/CartPage.jsx
import Header from './Header';
import CartItem from './CartItem';
import CheckoutButton from './CheckoutButton';
import { useSelector } from 'react-redux';

/**
 * Cart page — shows all items in cart with totals and checkout.
 * Requirements: 5.1, 5.4, 5.5, 5.6, 6.5, 6.6, 7.3, 7.4
 */
export default function CartPage({ navigate }) {
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalCost = items.reduce((sum, i) => sum + i.plant.price * i.quantity, 0);

  return (
    <div className="cart-page">
      <Header
        onLogoClick={() => navigate('landing')}
        onCartClick={() => navigate('cart')}
      />
      <main className="cart-main">
        <h1 className="cart-heading">Your Cart</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty. 🌱</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('products')}
            >
              Browse Plants
            </button>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <CartItem key={item.plant.id} item={item} />
            ))}
          </div>
        )}

        {/* Summary and checkout are always visible */}
        <div className="cart-summary">
          <p className="cart-total-items">
            Total items: <strong>{totalItems}</strong>
          </p>
          <p className="cart-total-cost">
            Total cost: <strong>${totalCost.toFixed(2)}</strong>
          </p>
          <CheckoutButton />
        </div>
      </main>
    </div>
  );
}
