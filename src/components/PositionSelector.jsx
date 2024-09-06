import React from 'react';

function PositionSelector({ onSelect }) {
  const positions = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

  return (
    <div>
      <label>Select Your Position:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select...</option>
        {positions.map((position) => (
          <option key={position} value={position}>{position}</option>
        ))}
      </select>
    </div>
  );
}

export default PositionSelector;