import React from 'react';
import { FaMotorcycle, FaPhone, FaStar } from 'react-icons/fa';
import './NotificationBar.scss';

const NotificationBar = () => {
  return (
    <div className="notification-bar">
      <div className="container">
        <div className="notification-content">
          <div className="notification-item">
            <FaMotorcycle className="icon" />
            <span>Free delivery on orders above ₹299</span>
          </div>
          
          <div className="notification-item">
            <FaStar className="icon" />
            <span>Rated 4.8/5 by 2000+ customers</span>
          </div>
          
          <div className="notification-item">
            <FaPhone className="icon" />
            <span>Call: +91 98765 43210</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;