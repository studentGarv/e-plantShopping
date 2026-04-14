// src/components/CartItem.jsx
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

/**
 * Card showing a single cart item with quantity controls and delete.
 * Requirements: 5.2, 5.3, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 8.1
 */
export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { plant, quantity } = item;
  const subtotal = (plant.price * quantity).toFixed(2);

  return (
    <article className="cart-item-card" aria-label={plant.name}>
      <img
        className="cart-item-img"
        src={plant.thumbnail}
        alt={plant.name}
        loading="lazy"
      />
      <div className="cart-item-info">
        <h3 className="cart-item-name">{plant.name}</h3>
        <p className="cart-item-unit-price">Unit: ${plant.price.toFixed(2)}</p>
        <p className="cart-item-subtotal">Subtotal: ${subtotal}</p>
      </div>
      <div className="cart-item-controls">
        <button
          id={`decrement-${plant.id}`}
          className="qty-btn"
          onClick={() => dispatch(updateQuantity({ id: plant.id, quantity: quantity - 1 }))}
          aria-label={`Decrease quantity of ${plant.name}`}
        >
          −
        </button>
        <span className="cart-item-qty" aria-label="quantity">{quantity}</span>
        <button
          id={`increment-${plant.id}`}
          className="qty-btn"
          onClick={() => dispatch(updateQuantity({ id: plant.id, quantity: quantity + 1 }))}
          aria-label={`Increase quantity of ${plant.name}`}
        >
          +
        </button>
        <button
          id={`remove-${plant.id}`}
          className="delete-btn"
          onClick={() => dispatch(removeItem(plant.id))}
          aria-label={`Remove ${plant.name} from cart`}
        >
          🗑
        </button>
      </div>
    </article>
  );
}
