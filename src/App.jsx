// src/App.jsx
import { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';

import AboutUs from './components/AboutUs';

/**
 * Root application component.
 * Owns the state and renders the appropriate page.
 * The entire tree is wrapped in <Provider store={store}> so cart state is global.
 */
export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const navigate = (page) => {
    if (page === 'landing') {
      setShowProductList(false);
      setShowCart(false);
    } else if (page === 'products') {
      setShowProductList(true);
      setShowCart(false);
    } else if (page === 'cart') {
      setShowProductList(true);
      setShowCart(true);
    }
  };

  return (
    <Provider store={store}>
      <div className="app-container">
        {!showProductList && (
          <div className="landing-page" role="main">
            <div className="landing-overlay" />
            <div className="landing-content">
              <h1 className="landing-title">Welcome to Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <AboutUs />
              <button
                id="get-started-btn"
                className="btn btn-primary landing-cta get-started-button"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
        
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          {showProductList && !showCart && (
            <ProductList navigate={navigate} />
          )}
          {showProductList && showCart && (
            <CartPage navigate={navigate} />
          )}
        </div>
      </div>
    </Provider>
  );
}
