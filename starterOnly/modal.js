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
  modalbg.style.display = "block";
}

//close modal
function closeModal() {
  modalbg.style.display = "none";
}

// Fonction de validation du formulaire
function validate() {
  const formData = document.querySelectorAll(".formData");
  const confMsg = document.getElementById("confirmationMsg");

  // Sélectionnez les balises <input> à l'intérieur du premier élément avec la classe "formData"
  const inputs = formData[0].querySelectorAll("input");

  // Parcourez chaque élément <input> trouvé
  for (let i = 0; i < inputs.length; i++) {
    // Vérifiez si la valeur de l'élément <input> est vide
    if (!inputs[i].value) {
      // Affichez une alerte si l'un des champs est vide
      alert("Veuillez renseigner tous les champs, merci !");
      return false; // Arrêtez la validation et empêchez l'envoi du formulaire
    }
  }

  // Si la boucle se termine sans interruption, cela signifie que tous les champs sont remplis
  confMsg.innerHTML = "Merci ! Votre réservation a été reçue.";
  return true; // Permettez l'envoi du formulaire
}
