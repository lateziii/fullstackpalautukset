import React from "react";

const Filter = ({ onFilterChange, filter }) => {
  return (
    <div>
        find countries: 
      <input onChange={onFilterChange} value={filter} />
    </div>
  );
};

export default Filter;