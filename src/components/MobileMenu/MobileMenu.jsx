import React from 'react';
import { 
  FaTimes, FaHome, FaUtensils, FaTag, 
  FaPhone, FaStar, FaMotorcycle 
} from 'react-icons/fa';
import './MobileMenu.scss';

const MobileMenu = ({ isOpen, onClose, selectedCategory, onCategorySelect }) => {
  const categories = [
    { id: 'all', label: 'Home', icon: <FaHome /> },
    { id: 'burger', label: 'Burgers', icon: '🍔' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'pasta', label: 'Pasta', icon: '🍝' },
    { id: 'salad', label: 'Salads', icon: '🥗' },
    { id: 'dessert', label: 'Desserts', icon: '🍰' },
    { id: 'drink', label: 'Drinks', icon: '🥤' },
    { id: 'biryani', label: 'Biryani', icon: '🍚' },
    { id: 'noodles', label: 'Noodles', icon: '🍜' },
  ];

  const menuSections = [
    { label: 'Deals & Offers', icon: <FaTag /> },
    { label: 'Our Story', icon: <FaUtensils /> },
    { label: 'Reviews', icon: <FaStar /> },
    { label: 'Contact Us', icon: <FaPhone /> },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />
      
      <div className="mobile-menu">
        <div className="mobile-menu-header">
          <div className="menu-header-content">
            <h2>FoodHub</h2>
            <p className="tagline">Delicious food delivered fast</p>
          </div>
          <button className="close-menu-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="mobile-menu-content">
          {/* Categories Section */}
          <div className="categories-section">
            <h3>Categories</h3>
            <div className="categories-grid">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => {
                    onCategorySelect(category.id);
                    onClose();
                  }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Sections */}
          <div className="menu-sections">
            {menuSections.map((section, index) => (
              <button key={index} className="menu-section-btn">
                <span className="section-icon">{section.icon}</span>
                <span className="section-label">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <FaMotorcycle />
              <span>Free delivery above ₹299</span>
            </div>
            <div className="contact-item">
              <FaStar />
              <span>Rated 4.8/5 (2000+ reviews)</span>
            </div>
          </div>

          {/* Order Button */}
          <button className="mobile-order-btn" onClick={onClose}>
            Start Ordering
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;