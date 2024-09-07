import { currentUser } from "../controller/firebase_auth.js";
import { onSubmitCalcForm } from "../controller/homepage_controller.js";
import { root } from "./elements.js";
import { protectedView } from "./protected_view.js";

export async function homepage(){
    if(!currentUser){
        root.innerHTML= await protectedView();
        return;
    }
    const response = await fetch ('/view/templates/homepage_template.html',
        {cache:"no-store"});
    const divWrapper= document.createElement('div');
    divWrapper.innerHTML= await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    const form = divWrapper.querySelector('form');
    form.onsubmit=onSubmitCalcForm;
    root.innerHTML= '';
    root.appendChild(divWrapper);
}