import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBar.scss';

const SearchBar = ({ value, onChange }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for dishes, cuisines..."
        className="search-input"
        aria-label="Search food items"
      />
      {value && (
        <button 
          className="clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;