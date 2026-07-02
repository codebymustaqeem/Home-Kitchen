import React from 'react';
import FoodCard from '../FoodCard/FoodCard';
import './FoodMenu.scss';

const FoodMenu = ({ cart, addToCart, searchQuery, selectedCategory }) => {
  // Sample food data
  const foodItems = [
    { id: 1, name: 'Classic Cheeseburger', category: 'burger', price: 299, rating: 4.7, image: '🍔', description: 'Juicy beef patty with cheese, lettuce, and special sauce', isVeg: false, preparationTime: '15-20 min' },
    { id: 2, name: 'Margherita Pizza', category: 'pizza', price: 399, rating: 4.8, image: '🍕', description: 'Classic pizza with fresh mozzarella and basil', isVeg: true, preparationTime: '20-25 min' },
    { id: 3, name: 'Chicken Alfredo Pasta', category: 'pasta', price: 349, rating: 4.5, image: '🍝', description: 'Creamy alfredo sauce with grilled chicken', isVeg: false, preparationTime: '15-20 min' },
    { id: 4, name: 'Caesar Salad', category: 'salad', price: 249, rating: 4.3, image: '🥗', description: 'Fresh romaine with caesar dressing and croutons', isVeg: true, preparationTime: '10-15 min' },
    { id: 5, name: 'Chocolate Lava Cake', category: 'dessert', price: 199, rating: 4.9, image: '🍰', description: 'Warm chocolate cake with molten center', isVeg: true, preparationTime: '10-15 min' },
    { id: 6, name: 'Fresh Lime Soda', category: 'drink', price: 99, rating: 4.2, image: '🥤', description: 'Refreshing lime soda with mint', isVeg: true, preparationTime: '5-10 min' },
    { id: 7, name: 'Chicken Biryani', category: 'biryani', price: 349, rating: 4.6, image: '🍚', description: 'Aromatic basmati rice with chicken and spices', isVeg: false, preparationTime: '25-30 min' },
    { id: 8, name: 'Hakka Noodles', category: 'noodles', price: 299, rating: 4.4, image: '🍜', description: 'Stir-fried noodles with vegetables', isVeg: true, preparationTime: '15-20 min' },
    { id: 9, name: 'Veggie Supreme Pizza', category: 'pizza', price: 449, rating: 4.7, image: '🍕', description: 'Loaded with fresh vegetables and cheese', isVeg: true, preparationTime: '20-25 min' },
    { id: 10, name: 'BBQ Chicken Burger', category: 'burger', price: 329, rating: 4.5, image: '🍔', description: 'Grilled chicken with BBQ sauce and crispy onions', isVeg: false, preparationTime: '15-20 min' },
  ];

  // Filter items based on search and category
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="food-menu">
      <div className="menu-header">
        <h2 className="menu-title">
          {selectedCategory === 'all' ? 'Our Menu' : 
           `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
        </h2>
        {searchQuery && (
          <p className="search-results">
            Showing {filteredItems.length} results for "{searchQuery}"
          </p>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🍽️</div>
          <h3>No items found</h3>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <div className="food-grid">
          {filteredItems.map(item => {
            const cartItem = cart.find(cartItem => cartItem.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            
            return (
              <FoodCard
                key={item.id}
                item={item}
                quantity={quantity}
                onAdd={() => addToCart(item)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FoodMenu;