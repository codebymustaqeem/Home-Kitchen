import React from 'react';
import './CategoryFilter.scss';

const CategoryFilter = ({ selectedCategory, onSelect }) => {
  const categories = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'burger', label: 'Burgers', icon: '🍔' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'pasta', label: 'Pasta', icon: '🍝' },
    { id: 'salad', label: 'Salads', icon: '🥗' },
    { id: 'dessert', label: 'Desserts', icon: '🍰' },
    { id: 'drink', label: 'Drinks', icon: '🥤' },
    { id: 'biryani', label: 'Biryani', icon: '🍚' },
    { id: 'noodles', label: 'Noodles', icon: '🍜' },
  ];

  return (
    <div className="category-filter">
      <div className="categories-scroll">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelect(category.id)}
            aria-label={`Filter by ${category.label}`}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;