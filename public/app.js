const b1= document.getElementById('buttonNumber');
const b2= document.getElementById('buttonName');
const rootEl = document.getElementById('root');

b1.onclick = function (){
    let r1= Math.random();
    let n1 = Math.floor(r1*100);

    let r2 = Math.random();
    let n2= Math.floor(r2*100);

    rootEl.innerHTML= 'Your lucky numbers are ' + n1 + ' and ' + n2;

}

b2.onclick = function (){
    rootEl.innerHTML = 'My name is <b>ABHINAV<b/>';
}