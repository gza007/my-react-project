// PositionSelector.jsx
import React from 'react';
import Button from './Button';

const PositionSelector = ({ onSelect, currentPosition }) => {
  const positions = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

  return (
    <div className="selector-container">
      <h3>Select Your Position</h3>
      <div className="button-group">
        {positions.map((position) => (
          <Button
            key={position}
            label={position}
            onClick={() => onSelect(position)}
            isActive={currentPosition === position}
          />
        ))}
      </div>
    </div>
  );
};

export default PositionSelector;