import React from 'react';

const ActionSelector = ({ actions, onSelect, currentAction }) => {
  // Mapping between internal values and display labels
  const actionLabels = {
    rfi: 'RFI',
    vsRfi: 'vs RFI',
    rfiVs3bet: 'RFI vs 3bet'
  };

  return (
    <div>
      <label>Select Action:</label>
      <select value={currentAction || ''} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select an action</option>
        {actions.map((action) => (
          <option key={action} value={action}>
            {actionLabels[action] || action} {/* Use friendly label */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActionSelector;
