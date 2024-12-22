import React from 'react';
import '../../styles/cart.css';

function Cart({ items }) {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">My order</h2>
        <span className="cart-currency">€</span>
      </div>
      
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <div className="item-info">
                <span className="item-name">{item.quantity} × {item.name}</span>
                <span className="item-price">€{(item.price * item.quantity).toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="delivery-info">
          <div>
            <span className="delivery-text">Delivery</span>
            <p className="delivery-time">20-40 min</p>
          </div>
          <span className="item-price">€5</span>
        </div>
        
        <div className="total-amount">
          <span>Total Amount:</span>
          <span>€{(totalAmount + 5).toFixed(2)}</span>
        </div>

        <button className="checkout-button">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;