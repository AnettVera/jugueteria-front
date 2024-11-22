import React, { useState } from 'react';
import './../../../assets/Components/general/SearchEngine.scss'
const SearchEngine = ({ placeholder = "Buscar...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value); 
    }
  };

  return (
    <div className="search-engine">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="input-search"
      />
    </div>
  );
};

export default SearchEngine;
