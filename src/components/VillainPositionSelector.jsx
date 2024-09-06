import React from 'react';

function VillainPositionSelector({ position, onChange, userPosition }) {
  const positions = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

  // Find the index of the user's position in the positions array
  const userPositionIndex = positions.indexOf(userPosition);

  // Filter positions to include only those after the user's position
  const filteredPositions = positions.filter((pos, index) => index > userPositionIndex);

  console.log('All Positions:', positions);
  console.log('Current Position:', userPosition);
  console.log('Filtered Positions:', filteredPositions);

  // Ensure the select element always has a valid value
  const selectedVillainPosition = position || ""; // Default to empty string if position is null

  return (
    <div>
      <label>Select Villain Position:</label>
      <select value={selectedVillainPosition} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select...</option>
        {filteredPositions.map((pos) => (
          <option key={pos} value={pos}>{pos}</option>
        ))}
      </select>
    </div>
  );
}

export default VillainPositionSelector;
