import { collection, query, where, orderBy, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { db } from "../controller/firebase_core.js";
import { currentUser } from "../controller/firebase_auth.js";
import { gameState } from "../model/gamestate.js";
import { gameplayController } from "./gameplay_controller.js";

export const gamehistoryController = {
    async fetchGameHistory() {
        try {
            const user = currentUser; // Make sure currentUser is defined and has the user's info
            if (!user) {
                console.log("No user is logged in.");
                return [];
            }
            const gameHistoryRef = collection(db, "dicegame_collection");

            const q = query(gameHistoryRef, where("email", "==", user.email),
                orderBy('timestamp', 'desc'));

            const querySnapshot = await getDocs(q);
            const gameHistoryData = [];

            querySnapshot.forEach((doc) => {
                gameHistoryData.push({ id: doc.id, ...doc.data() });
            });

            return gameHistoryData;
        } catch (error) {
            console.error("Error fetching game history: ", error);
            return [];
        }
    },
    renderGameHistoryTable(gameHistory) {
        let table = `
            <h3>Game Play History Records</h3>
            <button id="btnclearhistory" class="btn btn-outline-danger btn-sm mb-3">Clear History</button>
            <table class="table table-striped" border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bet</th>
                        <th>Won</th>
                        <th>Balance</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
        `;

        if (gameHistory.length === 0) {
            table += `
                <tr>
                    <td colspan="5" style="color: red; text-align: left; font-size: 24px;">No gameplay history found</td>
                </tr>
            `;
        } else {
            gameHistory.forEach((game, index) => {
                const date = new Date(game.timestamp);
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });

                const formattedDateTime = `${formattedDate} ${formattedTime}`;

                table += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${game.BetAmount}</td>
                        <td>${game.winAmount}</td>
                        <td>${game.balanceAfter}</td>
                        <td>${formattedDateTime}</td>
                    </tr>
                `;
            });
        }

        table += `</tbody></table>`;
        return table;
    },
    async clearGameHistory(email) {
        try {
            const q = query(collection(db, "dicegame_collection"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            gameState.setoddselected(true);
            gameState.setRange1Selected(true);
            console.log("Game history cleared successfully.");
            gameState.setBalance(100);
            gameState.setoddselected(true);
            gameState.setRange1Selected(true);
            gameState.sethistorycleared(true);
        } catch (error) {
            console.error("Error clearing game history:", error);
        }
    }

};
