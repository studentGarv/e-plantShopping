import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.plant.price * item.quantity;
    });
    return total.toFixed(2);
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

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.plant.price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container" style={{ padding: '20px', marginTop: '100px' }}>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.plant.id} style={{ display: 'flex', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
            <img className="cart-item-image" src={item.plant.thumbnail} alt={item.plant.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <div className="cart-item-details" style={{ marginLeft: '20px', flex: 1 }}>
              <div className="cart-item-name" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.plant.name}</div>
              <div className="cart-item-cost" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>${item.plant.price}</div>
              <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={btnStyle}>-</button>
                <span className="cart-item-quantity-value" style={{ margin: '0 15px', fontSize: '1.2rem' }}>{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={btnStyle}>+</button>
              </div>
              <div className="cart-item-total" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ marginTop: '10px', backgroundColor: '#e53e3e', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn" style={{ marginTop: '30px' }}>
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)} style={checkoutBtnStyle}>Continue Shopping</button>
        <br />
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)} style={checkoutBtnStyle}>Checkout</button>
      </div>
    </div>
  );
};

const btnStyle = {
  fontSize: '1.2rem',
  padding: '5px 15px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const checkoutBtnStyle = {
  padding: '10px 20px',
  backgroundColor: '#166534',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  width: '250px'
};

export default CartItem;
