import React, { useState, useEffect } from 'react';
import PokerGrid from './components/PokerGrid';
import PositionSelector from './components/PositionSelector';
import VillainPositionSelector from './components/VillainPositionSelector';
import StackDepthSelector from './components/StackDepthSelector';
import ActionSelector from './components/ActionSelector';
import rfi60 from './data/60BB/rfi.json';
import rfi100 from './data/100BB/rfi.json';
import rfiVs3bet60 from './data/60BB/rfiVs3bet60.json';
import rfiVs3bet100 from './data/100BB/rfiVs3bet100.json';
import vsRfi60 from './data/60BB/vsRfi.json';
import vsRfi100 from './data/100BB/vsRfi.json';

const stackDepthDataMap = {
  60: { rfi: rfi60, rfiVs3bet: rfiVs3bet60, vsRfi: vsRfi60 },
  100: { rfi: rfi100, rfiVs3bet: rfiVs3bet100, vsRfi: vsRfi100 },
};

function App() {
  const [currentAction, setCurrentAction] = useState(''); // Track selected action
  const [userPos, setUserPos] = useState(''); // Track user position
  const [villainPos, setVillainPos] = useState(null); // Track villain position
  const [currentStackDepth, setCurrentStackDepth] = useState(60); // Track stack depth
  const [actions, setActions] = useState([]); // Available actions
  const [actionData, setActionData] = useState({}); // Data passed to PokerGrid
  const [sbAction, setSbAction] = useState(null); // SB Raise or SB Limp for BB response

  const positions = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

  useEffect(() => {
    // Reset action and other related states whenever position or stack depth changes
    resetState(); // Make sure all is reset
    if (userPos) updateAvailableActions(userPos); // Update available actions based on user position
  }, [userPos, currentStackDepth]);

  const resetState = () => {
    setCurrentAction('');
    setVillainPos(null); // Reset villain position
    setSbAction(null); // Reset SB action for BB
    setActionData({}); // Clear action data
  };

  const handlePositionChange = (position) => {
    console.log(`User position changed to: ${position}`);
    setUserPos(position);
  };

  const handleVillainPositionChange = (position) => {
    console.log(`Villain position changed to: ${position}`);
    setVillainPos(position);
    updateActionData(currentAction, position, userPos, currentStackDepth, sbAction);
  };

  const handleStackDepthChange = (depth) => {
    console.log(`Stack depth changed to: ${depth}`);
    setCurrentStackDepth(depth);
    updateActionData(currentAction, villainPos, userPos, depth, sbAction);
  };

  const handleActionChange = (action) => {
    console.log(`Action changed to: ${action}`);
    setCurrentAction(action); // Set the new action
    setVillainPos(null); // Reset villain position when action changes
    setSbAction(null); // Reset SB action for BB
    updateActionData(action, villainPos, userPos, currentStackDepth, sbAction);
  };

  const handleSbActionChange = (action) => {
    console.log(`SB Action changed to: ${action}`);
    console.log(`Current Action: ${currentAction}, Villain Position: ${villainPos}, User Position: ${userPos}, Stack Depth: ${currentStackDepth}`);
    setSbAction(action);
    updateActionData(currentAction, villainPos, userPos, currentStackDepth, action);
  };

  const updateAvailableActions = (position) => {
    let availableActions = [];
    if (position === 'UTG') {
      availableActions = ['rfi', 'rfiVs3bet']; // UTG only has RFI and RFI vs 3bet actions
    } else if (position === 'BB') {
      availableActions = ['vsRfi']; // BB can only respond to RFI
    } else {
      availableActions = ['rfi', 'vsRfi', 'rfiVs3bet']; // Other positions
    }
    setActions(availableActions); // Set the available actions
  };

  const updateActionData = (currentAction, villainPos, userPos, currentStackDepth, sbAction = null) => {
    console.log(`Updating action data:`, {
      currentAction,
      userPos,
      villainPos,
      currentStackDepth,
      sbAction,
    });

    // Fetch the action data for the current stack depth and action
    const actionData = stackDepthDataMap[currentStackDepth]?.[currentAction];
    console.log(`Action data for stack depth ${currentStackDepth} and action ${currentAction}:`, actionData);

    if (!actionData || !userPos) {
      console.log('No action data available.');
      setActionData({});
      return;
    }

    let posActionData;
    if (currentAction === 'rfi') {
      posActionData = actionData[userPos];
    } else if (currentAction === 'vsRfi') {
      posActionData = actionData[userPos]?.[villainPos];

      // Handling BB vs SB with SBraise or SBlimp
      if (userPos === 'BB' && villainPos === 'SB' && sbAction) {
        posActionData = actionData[userPos]?.[villainPos]?.[sbAction]; // Access nested SBraise/SBlimp
        console.log(`Data for SB Action (${sbAction}):`, posActionData);
      }
    } else if (currentAction === 'rfiVs3bet') {
      posActionData = actionData[userPos]?.[villainPos];
    }

    console.log(`Position-based action data:`, posActionData);
    setActionData(posActionData || {});
  };

  return (
    <div>
      <h1>Poker GTO Trainer</h1>
      <PositionSelector onSelect={handlePositionChange} />
      {(currentAction === 'vsRfi' && userPos !== 'UTG') || currentAction === 'rfiVs3bet' ? (
        <VillainPositionSelector
          userPos={userPos}
          onSelect={handleVillainPositionChange}
          action={currentAction}
        />
      ) : null}
      {userPos === 'BB' && villainPos === 'SB' && (
        <div>
          <label>SB Action:</label>
          <select onChange={(e) => handleSbActionChange(e.target.value)}>
            <option value="">Select SB Action</option>
            <option value="Raise">Raise</option>
            <option value="Limp">Limp</option>
          </select>
        </div>
      )}
      <StackDepthSelector onSelect={handleStackDepthChange} />
      <ActionSelector onSelect={handleActionChange} actions={actions} currentAction={currentAction} />
      <PokerGrid actionData={actionData} />
    </div>
  );
}

export default App;
