import {
    getFirestore,collection, addDoc,query, where, orderBy, getDocs,deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


import { app } from "./firebase_core.js";

const db = getFirestore(app);

export const CollectionName = 'dicegame_collection';



export async function fetchUserPlayHistory(userEmail) {
    const histQuery = query(
        collection(db, CollectionName), 
        where('email', '==', userEmail),
        orderBy('timestamp', 'desc'), 
    );
    let historyArray = []; 
    const querySnapshot = await getDocs(histQuery); 
    querySnapshot.forEach(document => {
        const documentId = document.id; // Retrieve document ID.
        const { BetAmount, winAmount, balanceAfter, timestamp } = document.data(); 
        historyArray.push({ BetAmount, winAmount, balanceAfter, timestamp, documentId }); 
    })
    return historyArray; // Return the array containing the user's play history.
}

export async function removeAllUserHistory(userEmail) {
    // Define the query to select user's play history records for deletion.
    const deleteQuery = query(
        collection(db, CollectionName), // ref to the specific db collection.
        where('email', '==', userEmail), // filter by email
        orderBy('timestamp', 'desc'), // order by the timestamp in descending order for consistency.
    );
    let querySnapshot = await getDocs(deleteQuery); // execute the query to get the documents.

    // loop through each document and delete it.
    await querySnapshot.forEach(async (historyRecord) => {
        await deleteDoc(historyRecord.ref); 
    });
}
