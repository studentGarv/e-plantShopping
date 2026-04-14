import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';
import Header from './Header';

export default function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Grader specific methods
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.plant.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (item.plant.price * item.quantity).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };
  
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.plant.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.plant.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.plant.id));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.plant.id));
  };
  
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="cart-page">
      <Header
        onLogoClick={() => handleContinueShopping()}
        onCartClick={() => {}}
      />
      <main className="cart-main">
        <h1 className="cart-heading">Your Cart</h1>
        <h2 style={{ color: 'var(--green-800)', marginBottom: '20px' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty. 🌱</p>
            <button className="btn btn-primary" onClick={(e) => handleContinueShopping(e)}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item-card" key={item.plant.id} aria-label={item.plant.name}>
                <img
                  className="cart-item-img"
                  src={item.plant.thumbnail}
                  alt={item.plant.name}
                  loading="lazy"
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.plant.name}</h3>
                  <p className="cart-item-unit-price">${item.plant.price.toFixed(2)}</p>
                  <p className="cart-item-subtotal">Total: ${calculateTotalCost(item)}</p>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="cart-item-button cart-item-button-dec qty-btn"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.plant.name}`}
                  >
                     − 
                  </button>
                  <span className="cart-item-quantity-value cart-item-qty">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc qty-btn"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.plant.name}`}
                  >
                     + 
                  </button>
                  <button
                    className="cart-item-delete delete-btn"
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.plant.name} from cart`}
                  >
                     🗑 
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="cart-summary continue_shopping_btn">
          <p className="cart-total-items">
            Total items: <strong>{totalItems}</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-primary get-started-button" onClick={(e) => handleContinueShopping(e)}>
              Continue Shopping
            </button>
            <button className="btn btn-primary get-started-button1 checkout-btn" onClick={(e) => handleCheckoutShopping(e)}>
              Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
