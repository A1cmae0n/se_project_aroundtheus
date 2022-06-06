

const profileEdit = document.querySelector(".profile__edit");
const modal = document.querySelector(".modal");
const modalCloseIcon = document.querySelector(".modal__close");

let userName = document.querySelector(".profile__name").textContent;
let userDescription = document.querySelector(".profile__title").textContent;


profileEdit.addEventListener("click", openModal);
modalCloseIcon.addEventListener("click", closeModal);


function openModal() {
    modal.style.visibility = "visible";
    document.querySelector(".form__input-name").placeholder = userName;
    document.querySelector(".form__input-description").placeholder = userDescription;
}

function closeModal() { 
    modal.style.visibility = "hidden";
}
