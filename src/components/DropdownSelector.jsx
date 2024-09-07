import React from 'react';

const DropdownSelector = ({ label, options, currentValue, onSelect }) => {
  // Log the currentValue and options received by DropdownSelector
  console.log(`DropdownSelector currentValue: ${currentValue}`);
  console.log(`DropdownSelector options:`, options);

  return (
    <div>
      <label>{label}</label>
      <select
        value={currentValue || ''}  // Log the current value
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select...</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;