import { currentUser } from "../controller/firebase_auth.js";
import { onSubmitCalcForm } from "../controller/homepage_controller.js";
import { root } from "./elements.js";
import { protectedView } from "./protected_view.js";
import { gameplayController } from "../controller/gameplay_controller.js";
import { gamehistoryController} from "../controller/gamehistory_controller.js";
import { gameState } from '../model/gamestate.js';



export async function homepage(){
    if(!currentUser){
        root.innerHTML= await protectedView();
        return;
    }
    
    const response = await fetch ('/view/templates/gameplay_template.html',
        {cache:"no-store"});
    const divWrapper= document.createElement('div');
    divWrapper.innerHTML= await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    
    const playButton = divWrapper.querySelector('#play-button');
    const newGameButton = divWrapper.querySelector('#new-game-button');
    const balanceDisplay = divWrapper.querySelector('#balance-display');
    const diceResultDisplay = divWrapper.querySelector('#dice-result');
    const dice_winning_shape = divWrapper.querySelector('#dice_winning_shape');
    const showKeySwitch = divWrapper.querySelector("#showKeySwitch"); 
    const gameKeyDisplay = divWrapper.querySelector("#gameKeyDisplay");  
    const gameKey = divWrapper.querySelector("#gameKey");
    

    let diceValue = null;

    const rollDice = () => {
        let diceValuen = gameState.getDiceValue();
        diceValue = (diceValuen !== undefined && diceValuen !== null) ? diceValuen : Math.floor(Math.random() * 6) + 1;
        gameKey.textContent = diceValue; 
        gameState.setDiceValue(diceValue);
    };
   
    showKeySwitch.addEventListener("change", (e) => {
        if (e.target.checked) {
            rollDice();
            gameKeyDisplay.style.display = "block"; 
        } else {
            gameKeyDisplay.style.display = "none"; 
        }
    });
  


    let balance = gameState.balance;
    
    let gameHistory = [];
    try {
        gameHistory = await gamehistoryController.fetchGameHistory();
        
    } catch (e) {
        console.log(e)
    }
    if(gameHistory.length > 0) {
        console.log(gameHistory);
        balance = gameHistory[0].balanceAfter;
        console.log(balance);
        
    } 
    
    balanceDisplay.textContent = `$${balance}`;
   
    function updateView(diceResult, message, newBalance) {
        dice_winning_shape.textContent = diceResult;
        balanceDisplay.textContent = `$${newBalance}`;
        diceResultDisplay.innerHTML = message || "No bet placed.";
    }
    playButton.addEventListener('click', async () => {
        playButton.disabled=true;
        let diceValue = gameState.getDiceValue();
        try {
            gameHistory = await gamehistoryController.fetchGameHistory();
            
        } catch (e) {
            console.log(e)
        }
        if(gameHistory.length > 0) {
            console.log(gameHistory);
            balance = gameHistory[0].balanceAfter;
            console.log(balance);
            
        } 
        
        const { oddEvenBet, oddEvenAmount, rangeBet, rangeAmount } = gameplayController.getBetDetails(divWrapper);
        if ((oddEvenBet && oddEvenAmount > 0) || (rangeBet && rangeAmount)) {
            gameplayController.playGame(oddEvenBet, oddEvenAmount, rangeBet, rangeAmount, balance, updateView,diceValue);
            console.log("gamestate"+gameState.balance);
        } else {
            alert("Please select a bet and enter a valid bet amount.");
        }
        
    });
    
    
    

    root.innerHTML = '';
    root.appendChild(divWrapper);

    gameplayController.setupBetValidation();

    gameplayController.restoreSelections();
}

