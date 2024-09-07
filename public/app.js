import { attachAuthStateChangeObserver } from "./controller/firebase_auth.js";
import { HomeMenu, Menu2Menu, SignoutMenu } from "./controller/menueventhandlers.js";
import { routing } from "./controller/route_controller.js";


document.getElementById('menu-home').onclick= HomeMenu;
document.getElementById('menu-menu2').onclick= Menu2Menu;
document.getElementById('menu-signout').onclick = SignoutMenu;

attachAuthStateChangeObserver();

window.onload= function(e){
    const pathname = window.location.pathname;
    const hash= window.location.hash;
    console.log(pathname, hash);
    routing(pathname, hash); 
}

window.onpopstate = function(e){
    e.preventDefault();
    const pathname = window.location.pathname;
    const hash= window.location.hash;
    routing (pathname, hash);
}

