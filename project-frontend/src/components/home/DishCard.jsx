import React from 'react';
import '../../styles/dish-card.css';
import axiosInstance from '/axiosConfig.js';

function DishCard({ dish }) {
  const handleAddToCart = () => {
    axiosInstance.post('/api/add-to-cart/', {
      product_name: dish.name,
      quantity: 1,
      price: dish.price,
    })
      .then((response) => {
        console.log('Added to cart:', response.data);
        alert('Item added to cart successfully!');
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart.');
      });
  };

  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} className="dish-image" />
      <div className="dish-content">
        <h3 className="dish-title">{dish.name}</h3>
        <p className="dish-category">{dish.category}</p>
        <div className="dish-footer">
          <span className="dish-price">${dish.price.toFixed(2)}</span>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
