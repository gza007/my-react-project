import React from 'react';
import DropdownSelector from './DropdownSelector';

const VillainPositionSelector = ({ userPos, onSelect, currentValue, action }) => {
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

  const filterVillainPositions = () => {
    const userIndex = positions.findIndex(pos => pos.value === userPos);
    if (action === 'vsRfi' || action === 'vsOpenJam') {
      return positions.slice(0, userIndex); // Positions before user for vsRfi
    } else if (action === 'rfiVs3bet') {
      return positions.slice(userIndex + 1); // Positions after user for rfiVs3bet
    }
    return [];
  };

  const availablePositions = filterVillainPositions();

  return (
    <DropdownSelector
      label="Select Villain's Position"
      options={availablePositions}
      currentValue={currentValue}  // Pass currentValue to DropdownSelector
      onSelect={onSelect}  // Ensure this calls the onSelect from App
    />
  );
};

export default VillainPositionSelector;
