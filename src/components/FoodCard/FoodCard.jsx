import React from 'react';
import { FaStar, FaPlus, FaLeaf, FaFire } from 'react-icons/fa';
import './FoodCard.scss';

const FoodCard = ({ item, quantity, onAdd }) => {
  return (
    <div className="food-card">
      <div className="card-header">
        <div className="food-image">{item.image}</div>
        
        <div className="food-badges">
          {item.isVeg && (
            <span className="badge veg">
              <FaLeaf /> Veg
            </span>
          )}
          {item.rating > 4.5 && (
            <span className="badge popular">
              <FaFire /> Popular
            </span>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="food-info">
          <h3 className="food-name">{item.name}</h3>
          <p className="food-description">{item.description}</p>
        </div>

        <div className="food-details">
          <div className="detail-item">
            <span className="label">Rating</span>
            <span className="value">
              <FaStar className="star-icon" />
              {item.rating}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="label">Prep Time</span>
            <span className="value">{item.preparationTime}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="price-section">
            <span className="price">Rs{item.price}</span>
            {quantity > 0 && (
              <span className="quantity-badge">{quantity} in cart</span>
            )}
          </div>

          <button 
            className={`add-btn ${quantity > 0 ? 'added' : ''}`}
            onClick={onAdd}
          >
            <FaPlus />
            {quantity > 0 ? `Add More (${quantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;