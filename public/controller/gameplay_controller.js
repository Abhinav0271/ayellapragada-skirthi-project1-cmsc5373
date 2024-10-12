import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { currentUser } from "../controller/firebase_auth.js";
import { db } from "./firebase_core.js";
import { gameState } from "../model/gamestate.js";


export const gameplayController = {
    getBetDetails:(divWrapper) =>{
        const oddEvenBet = divWrapper.querySelector('input[name="oddEvenBet"]:checked')?.value;
        const oddEvenAmount = parseInt(divWrapper.querySelector('#oddEvenBetAmount').value) || 0;
        const rangeBet = divWrapper.querySelector('input[name="rangeBet"]:checked')?.value;
        const rangeAmount = parseInt(divWrapper.querySelector('#rangeBetAmount').value) || 0;
        return { oddEvenBet, oddEvenAmount, rangeBet, rangeAmount };
    },
    saveSelections: () => {
        const oddEvenBet = document.querySelector('input[name="oddEvenBet"]:checked')?.value;
        const oddEvenAmount = document.getElementById('oddEvenBetAmount').value;
        const rangeBet = document.querySelector('input[name="rangeBet"]:checked')?.value;
        const rangeAmount = document.getElementById('rangeBetAmount').value;
        gameState.setOddEvenBet(oddEvenBet);
        gameState.setoddEvenAmount(parseInt(oddEvenAmount));
        gameState.setRangeBet(rangeBet);
        gameState.setrangeAmount(parseInt(rangeAmount));

    },
     updateView:(diceResult, message, newBalance) => {
        const balanceDisplay = document.getElementById('balance-display'); //divWrapper.querySelector('#balance-display');
        const diceResultDisplay =document.getElementById('dice-result');// divWrapper.querySelector('#dice-result');
        const dice_winning_shape = document.getElementById('dice_winning_shape'); //divWrapper.querySelector('#dice_winning_shape');
        dice_winning_shape.textContent = diceResult;
        balanceDisplay.textContent = `$${newBalance}`;
        diceResultDisplay.innerHTML = message || "No bet placed.";
    },
     rollDice :() => {
        let diceValue = Math.floor(Math.random() * 6) + 1; 
        return diceValue; 
    },

    restoreSelections: () => {

        const oddEvenBet = gameState.oddEvenBet;
        const oddEvenAmount = gameState.oddEvenAmount;
        const rangeBet = gameState.rangeBet;
        const rangeAmount = gameState.rangeAmount;

        if (gameState.oddselected) {
            document.getElementById('odd').checked = true;
        } else if (gameState.evenselected) {
            document.getElementById('even').checked = true;
        }

        if (oddEvenBet) {
            document.querySelector('input[name="oddEvenBet"][value="' + oddEvenBet + '"]').checked = true;
        }
        if (oddEvenAmount) {
            document.getElementById('oddEvenBetAmount').value = oddEvenAmount;
        }
        if (rangeBet) {
            document.querySelector('input[name="rangeBet"][value="' + rangeBet + '"]').checked = true;
        }
        if (rangeAmount) {
            document.getElementById('rangeBetAmount').value = rangeAmount;
        }
        if (gameState.range1selected) {
            document.getElementById('range1').checked = true;
        } else if (gameState.range2selected) {
            document.getElementById('range2').checked = true;
        } else if (gameState.range3selected) {
            document.getElementById('range3').checked = true;
        }
        if(gameState.inPlay){
            document.getElementById('play-button').disabled = false;
        }
    },

    async playGame(oddEvenBet, oddEvenAmount, rangeBet, rangeAmount, balance, updateView,diceValue) {
        const diceResult = diceValue !== undefined && diceValue !== null ? diceValue : Math.floor(Math.random() * 6) + 1;
        let winnings = 0;
        let message = '';

        // Check for Odd/Even win
        if (oddEvenBet) {
            const isEven = diceResult % 2 === 0;
            const wonOddEven = (oddEvenBet === 'odd' && !isEven) || (oddEvenBet === 'even' && isEven);

            if (wonOddEven) {
                if (oddEvenAmount > 0){
                winnings += oddEvenAmount * 2; // Double the bet amount
                message += `You won $${oddEvenAmount * 2} on ${isEven ? 'Even' : 'Odd'}!<br>`;
                }
                else{
                    message += "No Bets Placed on Odd/Even.<br>" 
                }
                
            } else {
                if (oddEvenAmount > 0){

                message += `You lost $${oddEvenAmount } on ${isEven ? 'Even' : 'Odd'}!<br>`;
                winnings = winnings - oddEvenAmount;
                }
                else
                {
                    message += "No Bets Placed on Odd/Even.<br>" 
                }
            }
        }
        else{
            message += "No Bets Placed on Odd/Even.<br>"
        }

        if (rangeBet) {
            const inRange = (
                (rangeBet === "1-2" && diceResult >= 1 && diceResult <= 2) ||
                (rangeBet === "3-4" && diceResult >= 3 && diceResult <= 4) ||
                (rangeBet === "5-6" && diceResult >= 5 && diceResult <= 6)
            );

            if (inRange && rangeAmount>0) {
                winnings += rangeAmount * 3; // Triple the bet amount
                message += `You won $${rangeAmount * 3} on Range! ${rangeBet ? rangeBet : ''}<br>`;
            } else if (rangeAmount>0){
                message += "You lost $ "+rangeAmount+" on Range."+ (rangeBet ? rangeBet : '')+" <br>";
                winnings = winnings - rangeAmount;
            }
            else{
                 message += "No Bets Placed on range <br>"
            }
        } else {
            message += "No Bets Placed on range " + (rangeBet ? rangeBet : '');
        }
        document.getElementById('winnn').innerText = "previous balance"+balance;
        balance += winnings
        document.getElementById('winnn').innerText += "winnings:"+winnings+"total balance after win:"+balance;
        gameState.setBalance(balance); 

       try {
        const user = currentUser;
        const email = user ? user.email : "anonymous";

        const gameHistory = {
            BetAmount: oddEvenAmount + rangeAmount,
            email: email,
            timestamp: Date.now(),
            winAmount: winnings,
            balanceAfter: balance
        };

        await addDoc(collection(db, "dicegame_collection"), gameHistory);
        console.log("Game history saved successfully!");
    } catch (error) {
        console.error("Error saving game history to Firestore: ", error);
    }


        // update the view with the results
        gameplayController.updateView(diceResult, message, balance);
    },
    setupBetValidation: () => {
        const playButton = document.getElementById('play-button');
        const oddEvenBetAmount = document.getElementById('oddEvenBetAmount');
        const rangeBetAmount = document.getElementById('rangeBetAmount');
        const oddEvenBets = document.getElementsByName('oddEvenBet');
        const rangeBets = document.getElementsByName('rangeBet');
        const newGameButton = document.getElementById('new-game-button');
        const diceResultDisplay = document.getElementById('dice-result');
        const dice_winning_shape = document.getElementById('dice_winning_shape');
        const showKeySwitch =  document.getElementById('showKeySwitch');
        const gameKeyDisplay = document.getElementById('gameKeyDisplay');  
        const gameKey = document.getElementById('gameKey');



        const validateBets = () => {
            const oddEvenBetSelected = oddEvenBetAmount.value !== 'Select a bet amount' && oddEvenBetAmount.value !== '0';
            const rangeBetSelected = rangeBetAmount.value !== 'Select a bet amount' && rangeBetAmount.value !== '0';
            const oddEvenRadioSelected = Array.from(oddEvenBets).some(radio => radio.checked);
            const rangeRadioSelected = Array.from(rangeBets).some(radio => radio.checked);
            playButton.disabled = !(
                (oddEvenBetSelected && (oddEvenRadioSelected || rangeRadioSelected)) ||
                (rangeBetSelected && (oddEvenRadioSelected || rangeRadioSelected))
            );
            gameState.setInPlay(
                (
                    (oddEvenBetSelected && (oddEvenRadioSelected || rangeRadioSelected)) ||
                    (rangeBetSelected && (oddEvenRadioSelected || rangeRadioSelected))
            ));
        };

        const disableInputs = () => {
            playButton.disabled = true;
            oddEvenBetAmount.disabled = true;
            rangeBetAmount.disabled = true;
            newGameButton.disabled = false;
            oddEvenBets.forEach(radio => {
                radio.disabled = true;
            });

            rangeBets.forEach(radio => {
                radio.disabled = true;
            });

        };
        // showKeySwitch.addEventListener("change", (e) => {
        //     if (e.target.checked) {
        //         gameKey.textContent = gameplayController.rollDice();
        //         gameKeyDisplay.style.display = "block"; 
        //     } else {
        //         gameKeyDisplay.style.display = "none"; 
        //     }
        // });
        newGameButton.addEventListener('click', () => {
            newGameButton.disabled=true;
            diceResultDisplay.textContent = 'Choose bet(s) and press [PLAY]';
            dice_winning_shape.textContent = '?';
            
            document.getElementById('odd').checked = true;
            document.getElementById('range1').checked = true;
            
            gameState.setoddselected(true);
            gameState.setRange1Selected(true);

            oddEvenBetAmount.selectedIndex = 0;
            rangeBetAmount.selectedIndex = 0;

            oddEvenBetAmount.disabled = false;
            rangeBetAmount.disabled = false;

            oddEvenBets.forEach(radio => {
                radio.disabled = false;
            });

            rangeBets.forEach(radio => {
                radio.disabled = false;
            });
            let dvalue = gameplayController.rollDice();
            gameKey.textContent = dvalue;
            gameState.setDiceValue(dvalue);
            validateBets();
        });
        playButton.addEventListener('click', () => {
            disableInputs();
        
        });

        oddEvenBetAmount.addEventListener('change', (e) => {
            validateBets();

            const oddEvenAmount = parseInt(e.target.value, 10)
            gameState.setoddEvenAmount(parseInt(oddEvenAmount));
        });

        rangeBetAmount.addEventListener('change', (e) => {
            validateBets();
            const rangeAmount = parseInt(e.target.value, 10)
            gameState.setrangeAmount(parseInt(rangeAmount));
            // const selectedRangeAmount = parseInt(e.target.value, 10);
            // gameplayController.saveSelections();
        });



        document.getElementById('odd').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameState.setoddselected(true);  // Call the correct method
                gameState.setEvenselected(false); // Unselect the other radio
                gameState.setOddEvenBet('odd');
            }
        });

        document.getElementById('even').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameState.setoddselected(false);
                gameState.setEvenselected(true);
                gameState.setOddEvenBet('even');
            }
        });
        document.getElementById('range1').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameState.setRange1Selected(true);
                gameState.setRange2Selected(false);
                gameState.setRange3Selected(false);
                gameState.setRangeBet('1-2');
            }
        });

        document.getElementById('range2').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameState.setRange1Selected(false);
                gameState.setRange2Selected(true);
                gameState.setRange3Selected(false);
                gameState.setRangeBet('3-4');
            }
        });

        document.getElementById('range3').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameState.setRange1Selected(false);
                gameState.setRange2Selected(false);
                gameState.setRange3Selected(true);
                gameState.setRangeBet('5-6');
            }
        });

        validateBets();
        gameplayController.restoreSelections();
    }
};

