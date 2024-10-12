// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCv5Je_uj3Jr_cd3_5hrZKTdtQm3y2yT8",
    authDomain: "ayellapragada-cmsc5373.firebaseapp.com",
    projectId: "ayellapragada-cmsc5373",
    storageBucket: "ayellapragada-cmsc5373.appspot.com",
    messagingSenderId: "306254655624",
    appId: "1:306254655624:web:1efc9cd185762bb2922f3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


