import React from 'react';
import '../ActionPercentages.css';

const ActionPercentages = ({ actionData }) => {
  console.log('ActionPercentages received action data:', actionData);

  // Step 1: Check if actionData exists
  const { "action%": actionPercentages = null } = actionData || {};

  // If actionData is missing, default to empty actions
  const isActionDataAvailable = Object.keys(actionData || {}).length > 0;

  // Step 2: Handle missing 'action%' and set valid actions
  const validActions = actionPercentages 
    ? Object.entries(actionPercentages).filter(([key, value]) => value !== "0" && value)
    : [];

  // Step 3: Calculate width for each key item based on the number of valid actions
  const keyBoxWidth = validActions.length ? (100 / validActions.length) + "%" : "0%";

  if (!isActionDataAvailable || validActions.length === 0) {
    return null; // Don't render anything if there's no valid data
  }

  return (
    <div className="action-percentages">
      {validActions.map(([key, value], index) => (
        <div key={index} className="action-percentage-box">
          <span className="percentage">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default ActionPercentages;