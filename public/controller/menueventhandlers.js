import { homepage } from "../view/homepage.js";
import { menu2page } from "../view/menu2page.js";
import { signoutFirebase } from "./firebase_auth.js";
import { routePathNames } from "./route_controller.js";

export function HomeMenu(e){
    history.pushState(null, null, routePathNames.HOME);   
    homepage();
}

export function Menu2Menu(e){
    history.pushState(null, null, routePathNames.MENU2);
    menu2page();
}

export async function SignoutMenu(e){
    await signoutFirebase(e);
}