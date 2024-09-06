import React, { useState } from 'react';
import PokerGrid from './components/PokerGrid';
import PositionSelector from './components/PositionSelector';
import VillainPositionSelector from './components/VillainPositionSelector';
import StackDepthSelector from './components/StackDepthSelector';
import ActionSelector from './components/ActionSelector';
import rfi60 from './data/60BB/rfi.json';
import rfi100 from './data/100BB/rfi.json';
import rfiVs3bet60 from './data/60BB/rfiVs3bet60.json';
import rfiVs3bet100 from './data/100BB/rfiVs3bet100.json';

// Stack depth to dataset mappings
const stackDepthDataMap = {
  60: { rfi: rfi60, rfiVs3bet: rfiVs3bet60 },
  100: { rfi: rfi100, rfiVs3bet: rfiVs3bet100 },
};

const App = () => {
  const [userPosition, setUserPosition] = useState('UTG');
  const [villainPosition, setVillainPosition] = useState(null);
  const [stackDepth, setStackDepth] = useState(60);
  const [action, setAction] = useState('rfi');
  const [actionData, setActionData] = useState(stackDepthDataMap[60].rfi[userPosition]);

  // Handler for user position change
  const handleUserPositionChange = (newPosition) => {
    console.log('User position changed to:', newPosition);
    setUserPosition(newPosition);
    setVillainPosition(null); // Reset villain position when user position changes
    updateActionData(action, newPosition, null, stackDepth);
  };

  // Handler for villain position change
  const handleVillainPositionChange = (newVillainPosition) => {
    console.log('Villain position changed to:', newVillainPosition);
    setVillainPosition(newVillainPosition);
    updateActionData(action, userPosition, newVillainPosition, stackDepth);
  };

  // Handler for stack depth change
  const handleStackDepthChange = (newStackDepth) => {
    console.log('Stack depth changed to:', newStackDepth);
    setStackDepth(newStackDepth);
    updateActionData(action, userPosition, villainPosition, newStackDepth);
  };

  // Handler for action change
  const handleActionChange = (newAction) => {
    console.log('Action changed to:', newAction);
    setAction(newAction);
    updateActionData(newAction, userPosition, villainPosition, stackDepth);
  };

  const updateActionData = (currentAction, userPos, villainPos, currentStackDepth) => {
    console.log('Updating action data:', { currentAction, userPos, villainPos, currentStackDepth });

    const dataMap = stackDepthDataMap[currentStackDepth];
    if (!dataMap) {
      console.error('No data found for stack depth:', currentStackDepth);
      setActionData(null);
      return;
    }

    if (currentAction === 'rfi') {
      setActionData(dataMap.rfi[userPos] || null);
    } else if (currentAction === 'rfiVs3bet' && villainPos) {
      setActionData(dataMap.rfiVs3bet[userPos]?.[villainPos] || null);
    }
  };

  return (
    <div>
      <h1>G's GTO Grid Grinder</h1>

      {/* Position Selector */}
      <PositionSelector position={userPosition} onSelect={handleUserPositionChange} />

      {/* Villain Position Selector */}
      {action === 'rfiVs3bet' && (
        <VillainPositionSelector
          position={villainPosition}
          onChange={handleVillainPositionChange}
          userPosition={userPosition}
        />
      )}

      {/* Stack Depth Selector */}
      <StackDepthSelector stackDepth={stackDepth} onSelect={handleStackDepthChange} />

      {/* Action Selector */}
      <ActionSelector action={action} onChange={handleActionChange} />

      {/* Poker Grid */}
      <PokerGrid actionData={actionData} />
    </div>
  );
};

export default App;
