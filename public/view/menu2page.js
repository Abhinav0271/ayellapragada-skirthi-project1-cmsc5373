import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./elements.js";
import { protectedView } from "./protected_view.js";
import { gamehistoryController } from "../controller/gamehistory_controller.js";

export async function menu2page() {
    if(!currentUser){
        root.innerHTML= await protectedView();
        return;
    }
    try {
        const gameHistory = await gamehistoryController.fetchGameHistory();
        root.innerHTML = gamehistoryController.renderGameHistoryTable(gameHistory);

        const clearHistoryButton = document.getElementById("btnclearhistory");
        clearHistoryButton.addEventListener("click", async () => {
            const confirmClear = confirm("Are you sure you want to clear your game history? This action cannot be undone.");
            if (confirmClear) {
                await gamehistoryController.clearGameHistory(currentUser.email);
                
                menu2page();  
            }
        });

    } catch (error) {
        console.error("Error displaying game history:", error);
    }

};

window.onload = () => {
    menu2page();
    
};


