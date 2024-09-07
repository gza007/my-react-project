import React from 'react';

const VillainPositionSelector = ({ userPos, onSelect, action }) => {
  const positions = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
  
  // Filter villain positions based on the action
  const filterVillainPositions = () => {
    const userIndex = positions.indexOf(userPos);
    if (action === 'vsRfi') {
      return positions.slice(0, userIndex); // Positions before user
    } else if (action === 'rfiVs3bet') {
      return positions.slice(userIndex + 1); // Positions after user
    }
    return [];
  };

  const availablePositions = filterVillainPositions();

  return (
    <div>
      <label>Select Villain Position:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Position</option>
        {availablePositions.map((pos) => (
          <option key={pos} value={pos}>
            {pos}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VillainPositionSelector;
