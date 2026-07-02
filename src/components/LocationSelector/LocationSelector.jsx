import React, { useState } from 'react';
import { FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import './LocationSelector.scss';

const LocationSelector = ({ location, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(location || '');

  const handleSave = () => {
    onChange(tempLocation);
    setIsModalOpen(false);
    localStorage.setItem('deliveryLocation', tempLocation);
  };

  return (
    <>
      <div className="location-selector" onClick={() => setIsModalOpen(true)}>
        <FaMapMarkerAlt className="location-icon" />
        <div className="location-info">
          <span className="label">Deliver to</span>
          <span className="address">{location || 'Enter address'}</span>
        </div>
        <FaChevronDown className="chevron-icon" />
      </div>

      {isModalOpen && (
        <div className="location-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select Delivery Location</h3>
              <button 
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="custom-location">
                <h4>Enter Delivery Address</h4>
                <textarea
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="Enter full address with landmarks..."
                  className="address-input"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleSave}
                disabled={!tempLocation.trim()}
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationSelector;