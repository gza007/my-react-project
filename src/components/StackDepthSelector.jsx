// StackDepthSelector.jsx
import React from 'react';
import Button from './Button';

const StackDepthSelector = ({ onSelect, currentStackDepth }) => {
  const stackDepths = [100, 60, 50, 40, 30, 20, 10];

  return (
    <div className="selector-container">
      <h3>Select Stack Depth</h3>
      <div className="button-group">
        {stackDepths.map((depth) => (
          <Button
            key={depth}
            label={`${depth}BB`}
            onClick={() => onSelect(depth)}
            isActive={currentStackDepth === depth}
          />
        ))}
      </div>
    </div>
  );
};

export default StackDepthSelector;