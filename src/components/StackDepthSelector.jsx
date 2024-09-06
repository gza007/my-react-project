import React from 'react';

function StackDepthSelector({ onSelect }) {
  const stackDepths = [100, 60, 50, 40, 30, 20, 10];

  return (
    <div>
      <label>Select Stack Depth:</label>
      <select onChange={(e) => onSelect(Number(e.target.value))}>
        <option value="">Select...</option>
        {stackDepths.map((depth) => (
          <option key={depth} value={depth}>{depth}BB</option>
        ))}
      </select>
    </div>
  );
}

export default StackDepthSelector;
