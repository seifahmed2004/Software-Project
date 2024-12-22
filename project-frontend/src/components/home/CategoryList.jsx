import React from 'react';
import { categories } from '../data/categories';
import '../../styles/category-list.css';

function CategoryList({ selectedCategory, onSelectCategory }) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.name)}
          className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;