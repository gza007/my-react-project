// ActionSelector.jsx
import React from 'react';
import Button from './Button';

const ActionSelector = ({ onSelect, currentAction, userPos, stackDepth }) => {
  const actions = [
    { value: 'rfi', label: 'RFI' },
    { value: 'vsRfi', label: 'vs RFI' },
    { value: 'rfiVs3bet', label: 'RFI vs 3bet' },
    { value: 'vsOpenJam', label: 'vs All-in' },
    { value: 'vsSbLimp', label: 'vs SB Limp' },
    { value: 'vsSbRaise', label: 'vs SB Raise' }
  ];

  const isActionDisabled = (action) => {
    if (stackDepth === 10) {
      if (userPos === 'UTG' && action !== 'rfi') return true;
      if (userPos === 'BB' && !['vsOpenJam', 'vsSbLimp'].includes(action)) return true;
      if (userPos !== 'BB' && !['rfi', 'vsOpenJam'].includes(action)) return true;
    } else {
      if (userPos === 'BB' && action !== 'vsRfi') return true;
      if (userPos === 'UTG' && !['rfi', 'rfiVs3bet'].includes(action)) return true;
      if (userPos !== 'BB' && userPos !== 'UTG' && !['rfi', 'vsRfi', 'rfiVs3bet'].includes(action)) return true;
    }
    return false;
  };

  return (
    <div className="selector-container">
      <h3>Select Action</h3>
      <div className="button-grid">
        {actions.map(({ value, label }) => (
          <Button
            key={value}
            label={label}
            onClick={() => onSelect(value)}
            isActive={currentAction === value}
            disabled={isActionDisabled(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionSelector;