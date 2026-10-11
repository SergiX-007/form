
'use strict'
/* je sais que cette methode n'est pas encore dans le cours,
mais je me suis permis de l'utiliser quand meme pour eviter des erreurs de frappe
qui serait reduit en silence lors de la compilation du code dans le navigateur.
*/


// des Raccourcis en fonction pour eviter de reecrir toute la syntaxe
const fId = a => document.getElementById(a);
const fQuery = a => document.querySelector(a);
const fRandom = max => Math.floor(Math.random() * (max + 1));

// les variables
const signUp = fId('signUp');
const errGlobal = fId('errGlobal');
const thanks = fId('thanks');
const userName = fId('userName');

const form = fQuery('form');

const n1 = fRandom(100);
const n2 = fRandom(100);
let n3 = n1 + n2;


fId('num1').textContent = n1;
fId('num2').textContent = n2;

// lister les champs pour mieux les utiliser dans l'avancement du code
const formulaire = [
    new ChampTxtV(fId('fName'), fId('errFName')),
    new ChampTxtV(fId('lName'), fId('errLName')),
    new ChampNic(fId('nic'), fId('errNic')),
    new ChampTel(fId('tel'), fId('errTel')),
    new ChampDob(fId('dob'), fId('errDob')),
    new ChampEmail(fId('email'), fId('errEmail')),
    new ChampF(fId('country'), fId('errCountry')),
    new ChampUName(fId('uName'), fId('errUName')),
    new ChampMdp(fId('mdp'), fId('errMdp')),
    new ChampCmdp(fId('cMdp'), fId('errCMdp'), fId('mdp')),
    new ChampC(fId('captcha'), fId('errCaptcha'), n3)
];


form.addEventListener('submit', (e) => {
    let validation = true;
    let erreur1 = null;

    /*
    La raison du pourquoi lister les champ etait pratique
    car c'est mieux de parcours une liste que de faire une par une.
    */
    for (const champ of formulaire) {
        if (!champ.valider()) {
            /*
            le  champ enfant comportent tous une methode valider depuis le champF parent
            */
            validation = false;
            if (!erreur1) {
                erreur1 = champ.element;
            }
        }
    }

    if (!validation) {
        e.preventDefault();
        if (errGlobal) {
            errGlobal.textContent = "Please correct the errors in the form below.";
            errGlobal.style.color = "red";
            errGlobal.style.display = "block";
        }
        if (erreur1) {
            erreur1.focus();
        }
    } else {
        e.preventDefault()
        signUp.style.display = "none";
        thanks.style.display = "block";
        userName.textContent = ` ${fId('uName').value} `;
        
    }
});
