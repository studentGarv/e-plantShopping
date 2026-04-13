// src/App.jsx
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import LandingPage from './components/LandingPage';
import ProductListingPage from './components/ProductListingPage';
import CartPage from './components/CartPage';

/**
 * Root application component.
 * Owns the `currentPage` state and renders the appropriate page.
 * The entire tree is wrapped in <CartProvider> so cart state is global.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  function navigate(page) {
    setCurrentPage(page);
  }

  return (
    <CartProvider>
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => navigate('products')} />
      )}
      {currentPage === 'products' && (
        <ProductListingPage navigate={navigate} />
      )}
      {currentPage === 'cart' && (
        <CartPage navigate={navigate} />
      )}
    </CartProvider>
  );
}
