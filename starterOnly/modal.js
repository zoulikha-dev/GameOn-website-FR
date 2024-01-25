// Définition de la fonction editNav
function editNav() {
  // Récupération de l'élément du DOM avec l'ID "myTopnav"
  var x = document.getElementById("myTopnav");

  // Vérification de la classe actuelle de l'élément
  if (x.className === "topnav") {
    // Si la classe actuelle est "topnav", ajoute la classe "responsive"
    x.className += " responsive";
  } else {
    // Si la classe actuelle n'est pas "topnav", réinitialise à "topnav"
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const iconCloseModal = document.querySelectorAll(".close");
const submitBtn = document.querySelectorAll(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event
iconCloseModal.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  console.log("Modal launched");
  modalbg.style.display = "block";
}

//close modal
function closeModal(event) {
  console.log("Close modal function called");
  // Empêcher la propagation de l'événement si nécessaire
  event.stopPropagation();
  modalbg.style.display = "none";
}

// Fonction de suppression des messages d'erreur
function removeErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());
}

// Fonction pour valider une adresse e-mail
function isValidEmail(email) {
  // Utilisez une expression régulière pour vérifier le format de l'e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Stocker les valeurs actuelles des champs du formulaire
let formDataValues = {};

function validate(event) {
  event.preventDefault();
  console.log("Validation function called");
  const confMsg = document.getElementById("confirmationMsg");
  const inputs = document.querySelectorAll(".formData input");
  let isValid = true;

  // Supprimez les messages d'erreur existants
  removeErrorMessages();

  // Fonction pour afficher un message d'erreur sous un champ spécifique
  function displayErrorMessage(input, errorMessage) {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-message");
    errorContainer.textContent = errorMessage;
    input.parentNode.appendChild(errorContainer);
    isValid = false;
  }

  // Vérifiez chaque champ
  inputs.forEach((input) => {
    // Sauvegarder les valeurs actuelles des champs
    formDataValues[input.id] = input.value;
    switch (input.id) {
      case "first":
      case "last":
        if (input.value.trim().length < 2) {
          displayErrorMessage(
            input,
            "Veuillez entrer 2 caractères ou plus pour le champ."
          );
        }
        break;
      case "email":
        if (!isValidEmail(input.value)) {
          displayErrorMessage(
            input,
            "Veuillez entrer une adresse e-mail valide."
          );
        }
        break;
      case "birthdate":
        if (input.value.trim() === "") {
          displayErrorMessage(
            input,
            "Vous devez entrer votre date de naissance."
          );
        }
        break;
      case "quantity":
        if (isNaN(input.value) || input.value < 0 || input.value > 99) {
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
          // Afficher le message d'erreur une seule fois pour tous les emplacements non sélectionnés
          const errorMessage = "Veuillez sélectionner un emplacement.";
          if (!document.querySelector(".error-message")) {
            displayErrorMessage(input, errorMessage);
          }
        }
        //   break;
        // case "checkbox1":
        // case "checkbox2":
        //   // La case des conditions générales doit être cochée
        //   if (!input.checked) {
        //     console.log("Conditions générales non cochées");
        //     displayErrorMessage(
        //       input,
        //       "Vous devez accepter les conditions générales d'utilisation."
        //     );
        //   }
        break;
    }
  });

  // Si la boucle se termine sans interruption, cela signifie que tous les champs sont valides
  if (isValid) {
    // Afficher le message de confirmation dans l'élément confirmationMsg
    alert("Merci ! Votre réservation a été reçue.");
    closeModal(event);

    // Réinitialiser les valeurs du formulaire
    document.forms["reserve"].reset();
    // Réinitialiser la variable formDataValues
    formDataValues = {};
  } else {
    // Si la validation échoue, restaurer les valeurs des champs du formulaire
    Object.keys(formDataValues).forEach((inputId) => {
      document.getElementById(inputId).value = formDataValues[inputId];
    });
  }

  return isValid; // Permet l'envoi du formulaire uniquement si tous les champs sont valides
}
