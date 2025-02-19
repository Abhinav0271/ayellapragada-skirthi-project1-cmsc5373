import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { app } from "./firebase_core.js";
import { DEV } from "../model/constants.js";
import { signinPage } from "../view/signin.js";
import { routePathNames, routing } from "./route_controller.js";
import { userInfo } from "../view/elements.js";

const auth = getAuth(app);

export let currentUser=null;

export async function signinFirebase(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    } catch (error) {
        if (DEV) console.log('signin error: ', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('signin error: ' + errorCode + '' + errorMessage);
    }
}

export function attachAuthStateChangeObserver() {
    onAuthStateChanged(auth, authStateChangeListener);
}

function authStateChangeListener(user) {
    currentUser= user;
    if (user) { 
        userInfo.textContent = user.email; 
        const postAuth= document.getElementsByClassName('myclass-postauth');
        for(let i=0; i<postAuth.length; i++){
            postAuth[i].classList.replace('d-none', 'd-block');
        }
        const preAuth= document.getElementsByClassName('myclass-preauth');
        for(let i=0; i<preAuth.length; i++){
            preAuth[i].classList.replace('d-block', 'd-none');
        }
        const pathname= window.location.pathname;
        const hash = window.location.hash;
        routing(pathname, hash); 

     }
    else { 
        userInfo.textContent= 'No User';  
        const postAuth= document.getElementsByClassName('myclass-postauth');
        for(let i=0; i<postAuth.length; i++){
            postAuth[i].classList.replace('d-block', 'd-none');
        }
        const preAuth= document.getElementsByClassName('myclass-preauth');
        for(let i=0; i<preAuth.length; i++){
            preAuth[i].classList.replace('d-none', 'd-block');
        }
        history.pushState(null, null, routePathNames.HOME);
        signinPage();
     }
}

export async function signoutFirebase() {
    await signOut(auth);
}







