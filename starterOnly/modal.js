// Fonction pour modifier la navigation
function editNav() {
  // Récupère l'élément du DOM avec l'ID "myTopnav"
  var x = document.getElementById("myTopnav");

  // Vérifie si la classe actuelle est "topnav"
  if (x.className === "topnav") {
    // Si oui, ajoute la classe "responsive" pour rendre la navigation responsive
    x.className += " responsive";
  } else {
    // Sinon, réinitialise la classe à "topnav"
    x.className = "topnav";
  }
}

// Sélectionne les éléments du DOM et stock dans des variables
const modalbg = document.querySelector(".bground"); // La modale (fenêtre contextuelle)
const modalBtn = document.querySelectorAll(".modal-btn"); // Les boutons pour ouvrir la modale
const formData = document.querySelectorAll(".formData"); // Les champs de formulaire
const iconCloseModal = document.querySelectorAll(".close"); // Les boutons pour fermer la modale
const submitBtn = document.querySelectorAll(".btn-submit"); // Les boutons de soumission du formulaire

// Événement pour lancer la modale lorsque l'on clique sur un des boutons
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Événement pour fermer la modale lorsque l'on clique sur un des boutons de fermeture
iconCloseModal.forEach((btn) => btn.addEventListener("click", closeModal));

// Fonction pour ouvrir la modale
function launchModal() {
  console.log("Modal launched"); // Affiche un message dans la console
  modalbg.style.display = "block"; // Affiche la modale
}

// Fonction pour fermer la modale
function closeModal(event) {
  console.log("Close modal function called"); // Affiche un message dans la console
  event.stopPropagation(); // Empêche la propagation de l'événement (optionnel)
  modalbg.style.display = "none"; // Cache la modale
}

// Fonction pour supprimer tous les messages d'erreur
function removeErrorMessages() {
  // Sélectionne tous les messages d'erreur
  const errorMessages = document.querySelectorAll(".error-message");
  // Supprime chaque message d'erreur
  errorMessages.forEach((errorMessage) => errorMessage.remove());
}

// Fonction pour valider une adresse e-mail
function isValidEmail(email) {
  // Utilise une expression régulière pour vérifier si l'e-mail est au bon format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // Retourne vrai si l'e-mail est valide, sinon faux
}

// Stocke les valeurs des champs de formulaire pour les restaurer en cas d'erreur
let formDataValues = {};

function createConfirmationModal() {
  // Créer l'élément de la modal
  const modal = document.createElement("div");
  modal.classList.add("confirmation-modal");
  modal.id = "confirmationModal";

  // Créer le contenu de la modal
  const content = document.createElement("div");
  content.classList.add("confirmation-content");

  // Ajouter le message de confirmation
  const message = document.createElement("h2");
  message.textContent = "Merci pour votre inscription";

  // Ajouter le bouton de fermeture avec une croix
  const closeCross = document.createElement("button");
  closeCross.innerHTML = "&times;"; // Code HTML pour la croix
  closeCross.classList.add("btn-close", "btn-cross");
  closeCross.setAttribute("type", "button");

  // Ajouter le bouton "Fermer"
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Fermer";
  closeBtn.classList.add("btn-close", "btn-text");
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute("id", "closeConfirmationModal");

  // Ajouter le contenu, la croix, et le bouton de fermeture à la modal
  content.appendChild(closeCross); // Ajouter la croix en premier
  content.appendChild(message);
  content.appendChild(closeBtn); // Ajouter le bouton "Fermer"
  modal.appendChild(content);

  // Ajouter la modal au body
  document.body.appendChild(modal);

  // Ajouter les événements pour fermer la modal
  closeCross.addEventListener("click", () => {
    modal.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fermer la modal en cliquant en dehors du contenu
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Afficher la modal
  modal.style.display = "block";
}

// Fonction pour valider le formulaire
function validate(event) {
  event.preventDefault(); // Empêche le formulaire d'être envoyé normalement
  console.log("Validation function called"); // Affiche un message dans la console
  const inputs = document.querySelectorAll(".formData input"); // Sélectionne tous les champs de formulaire
  let isValid = true; // Variable pour vérifier si le formulaire est valide

  // Supprime les messages d'erreur existants
  removeErrorMessages();

  // Fonction pour afficher un message d'erreur sous un champ
  function displayErrorMessage(input, errorMessage) {
    const errorContainer = document.createElement("div"); // Crée un nouvel élément pour le message d'erreur
    errorContainer.classList.add("error-message"); // Ajoute une classe CSS pour le style
    errorContainer.textContent = errorMessage; // Définit le texte du message d'erreur

    // Ajoute un attribut data-error-visible à l'élément parent pour activer le style rouge
    const parent = input.closest(".formData");
    parent.setAttribute("data-error-visible", "true"); // Affiche la bordure rouge sur le champ

    input.parentNode.appendChild(errorContainer); // Ajoute le message d'erreur sous le champ
    isValid = false; // Marque le formulaire comme invalide
  }

  // Fonction pour retirer les erreurs et les bordures rouges
  function removeInputError(event) {
    const input = event.target;
    const parent = input.closest(".formData");
    if (parent) {
      parent.removeAttribute("data-error-visible"); // Retire l'attribut data-error-visible
      const errorMessage = parent.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove(); // Supprime le message d'erreur
      }
    }
  }

  // Ajoute des écouteurs d'événements sur les champs de formulaire pour retirer les erreurs au changement
  formData.forEach((field) => {
    const input = field.querySelector("input");
    if (input) {
      input.addEventListener("input", removeInputError);
    }
  });

  // Vérifie chaque champ de formulaire
  inputs.forEach((input) => {
    // Sauvegarde la valeur actuelle du champ
    formDataValues[input.id] = input.value;
    switch (input.id) {
      case "first":
      case "last":
        // Vérifie que les champs prénom et nom ont au moins 2 caractères
        if (input.value.trim().length < 2) {
          displayErrorMessage(
            input,
            "Veuillez entrer 2 caractères ou plus pour le champ."
          );
        }
        break;
      case "email":
        // Vérifie que l'adresse e-mail est valide
        if (!isValidEmail(input.value)) {
          displayErrorMessage(
            input,
            "Veuillez entrer une adresse e-mail valide."
          );
        }
        break;
      case "birthdate":
        // Vérifie que la date de naissance est remplie
        if (input.value.trim() === "") {
          displayErrorMessage(
            input,
            "Vous devez entrer votre date de naissance."
          );
        }
        break;
      case "quantity":
        // Vérifie que la quantité est un nombre entre 0 et 99 et n'est pas vide
        const quantityValue = input.value.trim();
        if (quantityValue === "") {
          displayErrorMessage(
            input,
            "Veuillez entrer une valeur pour le nombre de tournois."
          );
        } else if (
          isNaN(quantityValue) ||
          quantityValue < 0 ||
          quantityValue > 99
        ) {
          displayErrorMessage(
            input,
            "Veuillez entrer une valeur numérique entre 0 et 99 pour le nombre de tournois."
          );
        }
        break;
      case "location1":
      case "location2":
      case "location3":
      case "location4":
      case "location5":
      case "location6":
        // Assurez-vous qu'au moins un emplacement est sélectionné
        const locations = document.querySelectorAll(
          'input[name="location"]:checked'
        );
        if (locations.length === 0) {
          // Affiche un message d'erreur si aucun emplacement n'est sélectionné
          const errorMessage = "Veuillez sélectionner un emplacement.";
          if (!document.querySelector(".error-message")) {
            displayErrorMessage(input, errorMessage);
          }
        }
        break;
    }
  });

  // Si tous les champs sont valides
  if (isValid) {
    // Crée et affiche la modal de confirmation
    createConfirmationModal();
    closeModal(event); // Ferme la modale de réservation

    // Réinitialise les valeurs du formulaire
    document.forms["reserve"].reset();
    // Réinitialise les valeurs stockées des champs de formulaire
    formDataValues = {};
  } else {
    // Si des erreurs sont présentes, restaure les valeurs des champs du formulaire
    Object.keys(formDataValues).forEach((inputId) => {
      document.getElementById(inputId).value = formDataValues[inputId];
    });
  }

  return isValid; // Retourne vrai si le formulaire est valide, sinon faux
}
