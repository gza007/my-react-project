import React from 'react';
import DropdownSelector from './DropdownSelector';

const PositionSelector = ({ onSelect, currentPosition }) => {
  const positions = [
    { value: 'UTG', label: 'UTG' },
    { value: 'UTG+1', label: 'UTG+1' },
    { value: 'LJ', label: 'LJ' },
    { value: 'HJ', label: 'HJ' },
    { value: 'CO', label: 'CO' },
    { value: 'BTN', label: 'BTN' },
    { value: 'SB', label: 'SB' },
    { value: 'BB', label: 'BB' }
  ];

  // Log the currentValue before passing it to DropdownSelector
  console.log(`PositionSelector currentValue: ${currentPosition}`);

  return (
    <DropdownSelector
      label="Select Your Position"
      options={positions}
      currentValue={currentPosition}  // Should match one of the options' values
      onSelect={onSelect}
    />
  );
};

export default PositionSelector;
