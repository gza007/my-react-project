import React, { useState, useEffect } from 'react';
import PokerGrid from './components/PokerGrid';
import PositionSelector from './components/PositionSelector';
import VillainPositionSelector from './components/VillainPositionSelector';
import StackDepthSelector from './components/StackDepthSelector';
import ActionSelector from './components/ActionSelector';
import rfi100 from './data/100BB/rfi.json';
import rfiVs3bet100 from './data/100BB/rfiVs3bet100.json';
import vsRfi100 from './data/100BB/vsRfi.json';
import rfi60 from './data/60BB/rfi.json';
import rfiVs3bet60 from './data/60BB/rfiVs3bet60.json';
import vsRfi60 from './data/60BB/vsRfi.json';
import rfi50 from './data/50BB/rfi.json';
import rfiVs3bet50 from './data/50BB/rfiVs3bet50.json';
import vsRfi50 from './data/50BB/vsRfi.json';
import rfi40 from './data/40BB/rfi.json';
import rfiVs3bet40 from './data/40BB/rfiVs3bet40.json';
import vsRfi40 from './data/40BB/vsRfi.json';
import rfi30 from './data/30BB/rfi.json';
import rfiVs3bet30 from './data/30BB/rfiVs3bet30.json';
import vsRfi30 from './data/30BB/vsRfi.json';
import rfi20 from './data/20BB/rfi.json';
import rfiVs3bet20 from './data/20BB/rfiVs3bet20.json';
import vsRfi20 from './data/20BB/vsRfi.json';
import rfi10 from './data/10BB/rfi.json';
import vsRfi10 from './data/10BB/vsRfi.json';

const stackDepthDataMap = {
  10: { rfi: rfi10, vsRfi: vsRfi10},
  20: { rfi: rfi20, rfiVs3bet: rfiVs3bet20, vsRfi: vsRfi20 },
  30: { rfi: rfi30, rfiVs3bet: rfiVs3bet30, vsRfi: vsRfi30 },
  40: { rfi: rfi40, rfiVs3bet: rfiVs3bet40, vsRfi: vsRfi40 },
  50: { rfi: rfi50, rfiVs3bet: rfiVs3bet50, vsRfi: vsRfi50 },
  60: { rfi: rfi60, rfiVs3bet: rfiVs3bet60, vsRfi: vsRfi60 },
  100: { rfi: rfi100, rfiVs3bet: rfiVs3bet100, vsRfi: vsRfi100 },
};

const positions = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

function App() {
    const [currentAction, setCurrentAction] = useState(''); // Track selected action
    const [userPos, setUserPos] = useState(''); // Track user position
    const [villainPos, setVillainPos] = useState(null); // Track villain position
    const [currentStackDepth, setCurrentStackDepth] = useState(60); // Track stack depth
    const [actions, setActions] = useState([]); // Available actions
    const [actionData, setActionData] = useState({}); // Data passed to PokerGrid
    const [sbAction, setSbAction] = useState(null); // SB Raise or SB Limp for BB response
  
    useEffect(() => {
      // Reset action and other related states whenever position or stack depth changes
      resetState(); // Make sure all is reset
      if (userPos) updateAvailableActions(userPos); // Update available actions based on user position
    }, [userPos, currentStackDepth]);
  
    const resetState = () => {
      setCurrentAction('');
      setVillainPos(null); // Reset villain position
      setSbAction(null); // Reset SB action for BB
      setActionData({}); // Reset action data for grid
    };
  
    const updateAvailableActions = (userPos) => {
      const posIndex = positions.indexOf(userPos);
    
      console.log(`Updating actions for Stack Depth = ${currentStackDepth}, User Position = ${userPos}`);
    
      if (currentStackDepth === 10) {
        console.log("10BB Stack Detected");
    
        // For UTG, only RFI is available
        if (userPos === 'UTG') {
          console.log("Position is UTG at 10BB, setting actions to ['rfi']");
          setActions(['rfi']);  
        }
        // For BB, vs Open Jam and vs SB Limp are available
        else if (userPos === 'BB') {
          console.log("Position is BB at 10BB, setting actions to ['vsOpenJam', 'vsSbLimp']");
          setActions(['vsOpenJam', 'vsSbLimp']);
        }
        // For all other positions, RFI or vs Open Jam are available
        else {
          console.log("Other position at 10BB, setting actions to ['rfi', 'vsOpenJam']");
          setActions(['rfi', 'vsOpenJam']);
        }
      } else {
        // Existing logic for other stack depths
        if (userPos === 'BB') {
          setActions(['vsRfi']);
        } else if (posIndex === 0) {
          setActions(['rfi', 'rfiVs3bet']);
        } else {
          setActions(['rfi', 'vsRfi', 'rfiVs3bet']);
        }
      }
    };
    
    const handlePositionChange = (position) => {
      console.log(`User position changed to: ${position}`);
      setUserPos(position);  // Update state
    };
  
    const handleVillainPositionChange = (position) => {
      console.log(`Villain position changed to: ${position}`);
      setVillainPos(position);
    };
  
    const handleActionChange = (action) => {
      console.log(`Action changed to: ${action}`);
      setCurrentAction(action);
    };
  
    const handleStackDepthChange = (depth) => {
      console.log(`Stack depth changed to: ${depth}`);
      setCurrentStackDepth(Number(depth)); // Ensure depth is a number
    };
    
  
    const handleSbActionChange = (action) => {
      console.log(`SB Action changed to: ${action}`);
      setSbAction(action);
    };
  
    useEffect(() => {
      console.log(`User Position or Stack Depth changed: User Position = ${userPos}, Stack Depth = ${currentStackDepth}`);
    
      if (currentAction && userPos && currentStackDepth) {
        // Map 'vsOpenJam' to 'vsRfi' for stackDepth 10BB when action is vsOpenJam
        const stackData = stackDepthDataMap[currentStackDepth][currentAction === 'vsOpenJam' ? 'vsRfi' : currentAction];
    
        if (!stackData || !userPos) {
          console.log('No action data available.');
          setActionData({});
          return;
        }
    
        console.log('Stack Data for current user position:', stackData[userPos]);
        console.log('Stack Data for villain position:', stackData[userPos]?.[villainPos]);
    
        let posActionData;
    
        if (currentAction === 'rfi') {
          // RFI logic
          posActionData = stackData[userPos];
        } else if (currentAction === 'vsRfi' || currentAction === 'vsOpenJam') {
          // vsRFI or vsOpenJam logic: ensure villainPos is set
          if (!villainPos) {
            console.log('No villain position set for vsRFI or vsOpenJam action.');
            setActionData({});
            return;
          }
    
          // Special handling for BB vs SB at 10BB (force SB action to All-in)
          if (userPos === 'BB' && villainPos === 'SB') {
            if (currentStackDepth === 10 && currentAction === 'vsOpenJam') {
              // At 10BB, set SB action to 'All-in'
              setSbAction('All-in');
              posActionData = stackData[userPos]?.[villainPos]?.['Raise']; // Map All-in to Raise
              console.log(`Data for SB Action (All-in):`, posActionData);
            } else if (sbAction) {
              // Handle other stack sizes with SB Raise or SB Limp
              posActionData = stackData[userPos]?.[villainPos]?.[sbAction];
              console.log(`Data for SB Action (${sbAction}):`, posActionData);
            }
          } else {
            // Regular villain data handling
            posActionData = stackData[userPos]?.[villainPos];
          }
        } else if (currentAction === 'rfiVs3bet') {
          // rfiVs3bet logic
          posActionData = stackData[userPos]?.[villainPos];
        }
    
        console.log(`Final position-based action data:`, posActionData);
        setActionData(posActionData || {});  // Set the action data for PokerGrid
      }
    }, [currentAction, userPos, villainPos, currentStackDepth, sbAction]);
  
   return (
      <div>
        <h1>GTO Pre-Flop Simplified Ranges</h1>
        <PositionSelector onSelect={handlePositionChange} currentPosition={userPos} />
    
        {/* Include 'vsOpenJam' to make the Villain Position Selector appear for 'vs Open Jam' */}
        {(currentAction === 'vsRfi' || currentAction === 'vsOpenJam') && userPos !== 'UTG' || currentAction === 'rfiVs3bet' ? (
          <VillainPositionSelector
            userPos={userPos}
            onSelect={handleVillainPositionChange}
            currentValue={villainPos}  // Pass villainPos here
            action={currentAction}
          />
        ) : null}
    
        {/* SB Action logic for different scenarios */}
        {userPos === 'BB' && villainPos === 'SB' && (
          <div>
          <label>SB Action:</label>

            {/* Handle BB vs SB at 10BB for 'vs Open Jam' */}
            {currentStackDepth === 10 && currentAction === 'vsOpenJam' ? (
              <select value="All-in" disabled>
                <option value="All-in">All-in</option>
              </select>
            ) : (
              <select onChange={(e) => handleSbActionChange(e.target.value)}>
                <option value="">Select SB Action</option>
                <option value="Raise">Raise</option>
                <option value="Limp">Limp</option>
              </select>
            )}
          </div>
        )}
    
        <StackDepthSelector onSelect={handleStackDepthChange} currentStackDepth={currentStackDepth} />
        <ActionSelector onSelect={handleActionChange} actions={actions} currentAction={currentAction} />
        <PokerGrid actionData={actionData} />
      </div>
    );
    
  }
  
  export default App;