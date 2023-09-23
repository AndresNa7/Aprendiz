import React from 'react';

const Desplegable = ({ label, options, placeholder }) => {
  return (
    <select>
      {placeholder && (
        <option disabled value="">
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Desplegable;


