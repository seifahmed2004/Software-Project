import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../components/home/Header.jsx';
import CategoryList from '../components/home/CategoryList.jsx';
import DishCard from '../components/home/DishCard.jsx';
import { popularDishes } from '../components/data/dishes.js';
import '../styles/layout.css';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (dish) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find(item => item.id === dish.id);
      if (exists) {
        return prevItems.map(item => item.id === dish.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
  };

  return (
    <div className="container">
      <div className="main-content">
        <Header cartIcon={<button className="cart-icon" onClick={() => navigate('/cart')}>
          🛒 {cartItems.length}
        </button>} />
        <CategoryList 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        <div className="content-grid">
          <div className="dishes-container">
            <h2 className="text-2xl font-semibold mb-6">Popular dishes</h2>
            <div className="dishes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {popularDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} onAddToCart={() => handleAddToCart(dish)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
