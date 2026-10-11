'use strict'

//la gestion du formulaire
class ChampF {

    constructor(element, erreurElement) {
        this.element = element;
        this.erreurElement = erreurElement;
    }

    valider() {
        if (!this.element) return true;

        if (this.element.value.trim() === "") {
            // Si le champ est vide, on affiche l'erreur en CSS
            if (this.erreurElement) {
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }

            // et on renvoie "false" pour dire à la boucle : "Ce champ a échoué !"
            return false;

        } else {
            // Si Le champ est rempli, on cache l'erreur en CSS
            if (this.erreurElement) this.erreurElement.style.display = "none";

            // et on renvoie "true" pour dire à la boucle : "Ce champ est valide !"
            return true;
        }


    }



}

// gestion des caracteres invalides
class ChampTxtV extends ChampF {
    valider() {
        if (!super.valider()) return false;

        // Autorise les lettres (avec accents), espaces, apostrophes et tirets
        const rejetChar = /^[a-zA-ZÀ-ÿ\s'-]+$/;

        if (!rejetChar.test(this.element.value.trim())) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* Special characters are not allowed.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }
        return true;
    }
}
//Gestion du Nic
class ChampNic extends ChampF {
    valider() {
        if (!super.valider()) return false;

        const valeur = this.element.value.trim();
        // Une lettre au début, suivie de 13 caractères
        const structNic = /^[a-zA-Z].{13}$/;

        if (valeur.length !== 14 || !structNic.test(valeur)) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* The NIC must be 14 characters long and start with a letter.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }
        return true;
    }
}
//Gestion du Tel
class ChampTel extends ChampF {
    valider() {
        if (!super.valider()) return false;

        const valeur = this.element.value.trim();
        const structTel = /^\d{8}$/; // Exactement 8 chiffres numériques

        if (!structTel.test(valeur)) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* The number must contain exactly 8 digits.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }
        return true;
    }
}


// Gestion de date de naissance
class ChampDob extends ChampF {
    valider() {
        if (!super.valider()) return false;

        const dob = new Date(this.element.value);
        const aujourdHui = new Date();

        // Calcul de l'âge exact
        let age = aujourdHui.getFullYear() - dob.getFullYear();
        const m = aujourdHui.getMonth() - dob.getMonth();

        // Ajustement si l'anniversaire n'est pas encore passé cette année
        if (m < 0 || (m === 0 && aujourdHui.getDate() < dob.getDate())) { age--; }

        // Vérification de la majorité (18 ans ou plus)
        if (age < 18 || isNaN(dob.getTime())) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* You must be 18 or older.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }

        return true;
    }
}

// gestion des email
class ChampEmail extends ChampF {
    valider() {
        
        if (!super.valider()) return false;

        const value = this.element.value.trim();
        // Expression régulière stricte pour forcer un format complet (ex: nom@domaine.com)
        const structEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!structEmail.test(value)) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* Please enter a valid email address.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false; //format invalide
        }
        return true; // Succès
    }
}


//gestion du user name entre [6,20]
class ChampUName extends ChampF {
    valider() {
        if (!super.valider()) return false;

        const taille = this.element.value.trim().length;
        if (taille < 6 || taille > 20) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* The username must be between 6 and 20 characters.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }
        return true;
    }
}

//gestion des mdp
class ChampMdp extends ChampF {
    valider() {
        if (!super.valider()) return false;

        const valeur = this.element.value; // Pas de trim() pour conserver les espaces explicitement poser par l'user
        const taille = valeur.length;

        const contientMajuscule = /[A-Z]/.test(valeur);
        const contientChiffre = /\d/.test(valeur);

        if (taille < 5 || taille > 15 || !contientMajuscule || !contientChiffre) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* 5 to 15 characters, with at least 1 uppercase letter and 1 digit.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }
        return true;
    }
}

//gestion de confirmation de mot de passe

class ChampCmdp extends ChampF {
    constructor(element, erreurElement, mdp) {
        super(element, erreurElement);
        this.mdp = mdp;
    }

    valider() {
        if (!super.valider()) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* Password confirmation is required.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }

        if (this.element.value !== this.mdp.value) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* Passwords do not match.";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false; // Échec (pas identiques)
        }
        if (this.erreurElement) {
            this.erreurElement.style.display = "none";
        }
        return true;
    }
}
//la gestion du captcha
class ChampC extends ChampF {

    constructor(element, erreurElement, solution) {
        super(element, erreurElement);
        this.solution = solution;
    }

    valider() {
        if (!super.valider()) {
            if (this.erreurElement) this.erreurElement.textContent = "* The captcha is required.";
            return false;
        }

        // On récupère ce que l'utilisateur a écrit (en texte) et on la convertie en nombre
        const reponseUser = Number(this.element.value.trim());

        // Si la réponse est fausse ou vide, on affiche le span et on renvoie false
        /*
        isNaN ici car j'ai directement converti le texte en nombre et si il tape quelques
        chose non convertible en nombre isNaN le detectera donc soit c'est du texte soit c'est un espace vide
        */

        if (reponseUser !== this.solution || isNaN(reponseUser)) {
            if (this.erreurElement) {
                this.erreurElement.textContent = "* Captcha error";
                this.erreurElement.style.display = "inline";
                this.erreurElement.style.color = "red";
            }
            return false;
        }



        return true;
    }
}