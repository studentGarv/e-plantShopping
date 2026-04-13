// src/components/PlantCard.jsx
import { useCart } from '../context/CartContext';

/**
 * Individual plant card for the product listing page.
 * Requirements: 3.4, 4.1, 4.2, 4.3, 4.4
 */
export default function PlantCard({ plant }) {
  const { state, dispatch } = useCart();
  const inCart = state.items.some((i) => i.plant.id === plant.id);

  function handleAddToCart() {
    dispatch({ type: 'ADD_ITEM', plant });
  }

  return (
    <article className="plant-card" aria-label={plant.name}>
      <img
        className="plant-card-img"
        src={plant.thumbnail}
        alt={plant.name}
        loading="lazy"
      />
      <div className="plant-card-body">
        <h3 className="plant-card-name">{plant.name}</h3>
        <p className="plant-card-price">${plant.price.toFixed(2)}</p>
        <p className="plant-card-desc">{plant.description}</p>
        <button
          id={`add-to-cart-${plant.id}`}
          className={`btn ${inCart ? 'btn-disabled' : 'btn-primary'}`}
          onClick={handleAddToCart}
          disabled={inCart}
          aria-label={inCart ? `${plant.name} already in cart` : `Add ${plant.name} to cart`}
        >
          {inCart ? 'In Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
