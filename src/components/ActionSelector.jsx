import React from 'react';

function ActionSelector({ action, onChange }) {  // Expecting "onChange" here
  const actions = ['rfi', 'rfiVs3bet', 'vsRfi'];

  return (
    <div>
      <label>Select Action:</label>
      <select value={action} onChange={(e) => onChange(e.target.value)}>  {/* Use onChange */}
        <option value="">Select...</option>
        {actions.map((act) => (
          <option key={act} value={act}>{act}</option>
        ))}
      </select>
    </div>
  );
}

export default ActionSelector;
