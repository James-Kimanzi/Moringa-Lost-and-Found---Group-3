import React from 'react';

const SearchBar = ({ placeholder, onSearch }) => (
  <div className="search-bar">
    <input 
      type="text" 
      placeholder={placeholder} 
      onChange={(e) => onSearch(e.target.value)} 
    />
  </div>
);

export default SearchBar;
