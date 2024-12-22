import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Greek Salad', price: 5.4, quantity: 1, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Grilled Fish', price: 5.7, quantity: 1, image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Beef Steak', price: 4.8, quantity: 1, image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'Ramen', price: 3.9, quantity: 1, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=100&q=80' }
  ]);

  const navigate = useNavigate();

  const handleAdd = (item) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find(cartItem => cartItem.id === item.id);
      if (exists) {
        return prevItems.map(cartItem => cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemove = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const handleDelete = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container cart-page">
      <button className="back-button" onClick={() => navigate('/home')}>
    Home
      </button>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="item-actions">
                  <button onClick={() => handleRemove(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAdd(item)}>+</button>
                  <button onClick={() => handleDelete(item)} className="delete-button">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
      <div className="checkout-section">
        <h3>Total: ${calculateTotal()}</h3>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
