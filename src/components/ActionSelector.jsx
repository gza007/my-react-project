import React from 'react';
import DropdownSelector from './DropdownSelector';

const ActionSelector = ({ actions, onSelect, currentAction }) => {
  console.log('ActionSelector Actions:', actions);  // Add this line to log the available actions
  // Mapping between internal values and display labels
  const actionLabels = {
    rfi: 'RFI',
    vsRfi: 'vs RFI',
    rfiVs3bet: 'RFI vs 3bet',
    vsSbLimp: 'vs SB Limp',  // New action label
    vsOpenJam: 'vs Open Jam'  // New action label
  };

  // Map action values to a user-friendly label for display
  const options = actions.map(action => ({
    value: action,
    label: actionLabels[action] || action,
  }));

  return (
    <DropdownSelector
      label="Select Action"
      options={options}
      currentValue={currentAction}
      onSelect={onSelect}
    />
  );
};

export default ActionSelector;
