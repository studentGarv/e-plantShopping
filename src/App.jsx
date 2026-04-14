// src/App.jsx
import { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';

/**
 * Root application component.
 * Owns the `currentPage` state and renders the appropriate page.
 * The entire tree is wrapped in <Provider store={store}> so cart state is global.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  function navigate(page) {
    setCurrentPage(page);
  }

  return (
    <Provider store={store}>
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => navigate('products')} />
      )}
      {currentPage === 'products' && (
        <ProductList navigate={navigate} />
      )}
      {currentPage === 'cart' && (
        <CartPage navigate={navigate} />
      )}
    </Provider>
  );
}
