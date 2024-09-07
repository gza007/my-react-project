import React from 'react';
import DropdownSelector from './DropdownSelector';

const StackDepthSelector = ({ onSelect, currentStackDepth }) => {
  const stackDepths = [100, 60, 50, 40, 30, 20, 10].map(depth => ({
    value: depth,
    label: `${depth}BB`, // For display purposes
  }));

  return (
    <DropdownSelector
      label="Select Stack Depth"
      options={stackDepths} // Already correctly formatted as {value, label}
      currentValue={currentStackDepth} // This should be a number that matches the 'value' in the options
      onSelect={onSelect} // Calls onSelect with the selected value
    />
  );
};

export default StackDepthSelector;
