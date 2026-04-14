import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';

export default function ProductList({ navigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Compute total quantity for navbar indicator
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const plantsArray = [
    {
      id: 'snake-plant',
      name: 'Snake Plant',
      price: 12.99,
      description:
        'One of the hardest plants to kill. Thrives in low light and removes toxins from the air overnight.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1673969608395-9281e5e4395f?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Air Purifying',
    },
    {
      id: 'peace-lily',
      name: 'Peace Lily',
      price: 18.99,
      description:
        'Elegant white blooms and deep-green foliage. Excels at removing household air pollutants.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1663961915598-e63b1cc7275b?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Air Purifying',
    },
    {
      id: 'pothos',
      name: 'Golden Pothos',
      price: 9.99,
      description:
        'Fast-growing trailing vine that filters formaldehyde and CO₂. Perfect for beginners.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1673969608398-18921179fa7d?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Air Purifying',
    },

    // ── Aromatic ─────────────────────────────────────────────────────────────────
    {
      id: 'lavender',
      name: 'Lavender',
      price: 14.99,
      description:
        'Calming floral fragrance. Proven to reduce anxiety and promote restful sleep.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1711598349661-55de9a0ab085?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Aromatic',
    },
    {
      id: 'jasmine',
      name: 'Jasmine',
      price: 16.99,
      description:
        'Intensely sweet night-blooming scent. A classic choice for patios and sunlit windowsills.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1775212180950-a8b51479cabf?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Aromatic',
    },
    {
      id: 'rosemary',
      name: 'Rosemary',
      price: 11.99,
      description:
        'Woody, pine-like aroma. Doubles as a culinary herb — snip a sprig straight into your cooking.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1764112640891-1ac308ad955b?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Aromatic',
    },

    // ── Low Maintenance ───────────────────────────────────────────────────────────
    {
      id: 'zz-plant',
      name: 'ZZ Plant',
      price: 21.99,
      description:
        'Drought-tolerant and shade-loving. Glossy leaves add a sculptural statement to any room.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1675864662842-6efc0ef31f67?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Low Maintenance',
    },
    {
      id: 'cactus-assorted',
      name: 'Assorted Cactus',
      price: 7.99,
      description:
        'A curated trio of mini cacti. Water once a month and let the desert vibes flow.',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1673064926981-a7ebef0fbd27?ixlib=rb-4.1.0&w=400&q=80',
      category: 'Low Maintenance',
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const categories = [...new Set(plantsArray.map(p => p.category))];

  return (
    <div className="product-list-container">
      {/* Explicit Navbar Section */}
      <div className="navbar" style={styleObj.navbar}>
        <div className="navbar-logo" onClick={() => navigate('landing')} style={{ cursor: 'pointer' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Paradise Nursery</h1>
        </div>
        <div className="navbar-cart" onClick={() => navigate('cart')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <div className="cart-icon-container" style={{ position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-quantity" style={styleObj.badge}>{totalQuantity}</span>
          </div>
        </div>
      </div>

      {/* Main product list with mapped categories & plants */}
      <div className="product-list" style={{ marginTop: '100px', padding: '0 2rem' }}>
        {categories.map((category, index) => (
          <div key={index} className="plant-category">
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>{category}</h2>
            <div className="category-plants" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '50px' }}>
              {plantsArray.filter(p => p.category === category).map((plant) => (
                <div key={plant.id} className="plant-card" style={styleObj.card}>
                  <div className="plant-image-container" style={{ height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
                    <img src={plant.thumbnail} alt={plant.name} style={styleObj.image} />
                  </div>
                  <h3 className="plant-name" style={{ marginTop: '15px' }}>{plant.name}</h3>
                  <p className="plant-description" style={{ color: '#555', fontSize: '0.9rem', minHeight: '40px' }}>{plant.description}</p>
                  <p className="plant-price" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${plant.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={cartItems.some(item => item.plant.id === plant.id)}
                    style={{
                      ...styleObj.button,
                      backgroundColor: cartItems.some(item => item.plant.id === plant.id) ? '#a3a3a3' : '#166534'
                    }}
                  >
                    {cartItems.some(item => item.plant.id === plant.id) ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styleObj = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2.5rem',
    backgroundColor: '#4ade80',
    color: '#064e3b',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-10px',
    backgroundColor: '#064e3b',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 8px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '320px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  button: {
    padding: '0.75rem 1.5rem',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    marginTop: '10px'
  }
};
