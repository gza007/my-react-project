import React, { useEffect } from 'react';
import Button from './Button';

const VillainPositionSelector = ({ userPos, onSelect, currentValue, action, stackDepth }) => {
  const positions = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

  useEffect(() => {
    if (stackDepth === 10 && userPos === 'BB' && action === 'vsSbLimp') {
      onSelect('SB');
    }
  }, [stackDepth, userPos, action, onSelect]);

  const isPositionDisabled = (position) => {
    const userIndex = positions.indexOf(userPos);
    const posIndex = positions.indexOf(position);

    if (!action || !userPos) {
      return true; // Disable all if no action or user position is selected
    }

    if (stackDepth === 10 && userPos === 'BB' && action === 'vsSbLimp') {
      return position !== 'SB';
    }

    if (action === 'vsRfi' || action === 'vsOpenJam') {
      return posIndex >= userIndex;
    } else if (action === 'rfiVs3bet') {
      return posIndex <= userIndex;
    }

    return true; // Disable all if no relevant action is selected
  };

  return (
    <div className="selector-container">
      <h3>Select Villain's Position</h3>
      <div className="button-grid">
        {positions.map((position) => (
          <Button
            key={position}
            label={position}
            onClick={() => onSelect(position)}
            isActive={currentValue === position}
            disabled={isPositionDisabled(position)}
            //stackDepth={currentStackDepth}
          />
        ))}
      </div>
    </div>
  );
};

export default VillainPositionSelector;