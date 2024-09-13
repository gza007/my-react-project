// StackDepthSelector.jsx
import React from 'react';
import Button from './Button';

const StackDepthSelector = ({ onSelect, currentStackDepth }) => {
  const stackDepths = [100, 60, 50, 40, 30, 20, 10];

  return (
    <div className="selector-container">
      <h3>Select Stack Depth</h3>
      <div className="button-grid">
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


// return (
//   <div className="selector-container">
//     <h3>Stack Size</h3>
//     <div className="button-grid">
//       {stackDepths.map(({ value, label, star }) => (
//         <Button
//           key={value}
//           label={`${label}${star ? ' ★' : ''}`}
//           onClick={() => onSelect(value)}
//           isActive={currentStackDepth === value}
//         />
//       ))}
//     </div>
//     <button className="access-all-button">Access all Stack Sizes for £4.99 per month</button>
//   </div>
// );
// };

export default StackDepthSelector;