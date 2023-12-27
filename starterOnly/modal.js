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
