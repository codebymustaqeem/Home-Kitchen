import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';
import SearchBar from '../SearchBar/SearchBar';
import LocationSelector from '../LocationSelector/LocationSelector';
import CategoryFilter from '../Category/CategoryFilter';
import MobileMenu from '../MobileMenu/MobileMenu';
import './Header.scss';

const Header = ({
  cartItemsCount,
  cartTotal,
  onCartClick,
  location,
  onLocationChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Top Row */}
        <div className="header-top">
          <div className="logo-section">
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <div className="logo">
              <MdRestaurant className="logo-icon" />
              <div>
                <h1 className="restaurant-name">FoodHub</h1>
                <p className="tagline">Delicious food delivered fast</p>
              </div>
            </div>
          </div>

          <SearchBar 
            value={searchQuery}
            onChange={onSearchChange}
          />

          <button 
            className="cart-button"
            onClick={onCartClick}
            aria-label={`Cart with ${cartItemsCount} items`}
          >
            <FaShoppingCart className="cart-icon" />
            <div className="cart-info">
              <span className="cart-count">{cartItemsCount} items</span>
              <span className="cart-total">Rs{cartTotal.toFixed(2)}</span>
            </div>
          </button>
        </div>

        {/* Bottom Row */}
        <div className="header-bottom">
          <LocationSelector 
            location={location}
            onChange={onLocationChange}
          />

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelect={onCategoryChange}
          />

          <button 
            className="whatsapp-order-btn"
            onClick={onCartClick}
            disabled={cartItemsCount === 0}
          >
            <span className="whatsapp-icon">📱</span>
            Order Now
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategoryChange}
      />
    </header>
  );
};

export default Header;