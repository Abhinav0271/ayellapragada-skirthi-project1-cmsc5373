import { DEV } from "../model/constants.js";
import { Thread } from "../model/thread.js";
import { prependThread } from "../view/homepage.js";
import { progressMessage } from "../view/progress.js";
import { currentUser } from "./firebase_auth.js";
import { addThread } from "./firestore_controller.js";

export function onClickCreateButton(e){
    showTextArea();
}

function showTextArea(){
    const divModals = document.querySelectorAll('.create-modal');
    const divButton = divModals[0];
    const divTextArea= divModals[1];

    divButton.classList.replace('d-block', 'd-none');
    divTextArea.classList.replace('d-none', 'd-block');
}

function hideTextArea(){
    const divModals = document.querySelectorAll('.create-modal');
    const divButton = divModals[0];
    const divTextArea= divModals[1];

    divButton.classList.replace('d-none', 'd-block');
    divTextArea.classList.replace('d-block', 'd-none');
}

export async function onSubmitCreateMessage(e){
    e.preventDefault();
    if(e.submitter.value == 'cancel'){
        hideTextArea();
        return;
    }

    const title = e.target.title.value;
    const content = e.target.content.value;
    const uid = currentUser.uid;
    const email = currentUser.email;
    const timestamp= Date.now();
    const thread = new Thread({
        title, content, email, uid, timestamp,
    });

    const div = document.createElement('div');
    div.innerHTML= progressMessage('Saving ....');
    e.target.parentElement.appendChild(div);

    try {
        const docId = await addThread(thread);
        thread.set_docId(docId);
        prependThread(thread);
        hideTextArea();
        e.target.reset();
    }  catch (e){
        if(DEV) console.log('addThread error', e);
        alert ('Failed to create message: '+ JSON.stringify(e));
    }
    div.remove();
}

export function onClickViewButton(e){
    console.log(e.target.id);
}

