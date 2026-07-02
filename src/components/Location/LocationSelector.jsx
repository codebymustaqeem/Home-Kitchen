import React, { useState } from 'react';
import { FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import './LocationSelector.scss';

const LocationSelector = ({ location, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const commonLocations = [
    'Enter your delivery address',
    'Home: 123 Main Street',
    'Office: 456 Business Road',
    'Current Location'
  ];

  const handleSave = () => {
    onChange(tempLocation);
    setIsModalOpen(false);
    localStorage.setItem('deliveryLocation', tempLocation);
  };

  const handleSelect = (loc) => {
    if (loc === 'Current Location') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLoc = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
            setTempLocation(newLoc);
            onChange(newLoc);
            localStorage.setItem('deliveryLocation', newLoc);
            setIsModalOpen(false);
          },
          () => {
            alert('Unable to get location. Please enter manually.');
          }
        );
      }
    } else {
      setTempLocation(loc);
      onChange(loc);
      localStorage.setItem('deliveryLocation', loc);
      setIsModalOpen(false);
    }
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
              <div className="current-location">
                <h4>Current Location</h4>
                <div className="location-options">
                  {commonLocations.map((loc, index) => (
                    <button
                      key={index}
                      className={`location-option ${location === loc ? 'selected' : ''}`}
                      onClick={() => handleSelect(loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="custom-location">
                <h4>Enter Custom Address</h4>
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