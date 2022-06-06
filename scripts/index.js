

const profileEdit = document.querySelector(".profile__edit");
const modal = document.querySelector(".modal");
const formButton = document.querySelector(".form__button");
// const modalContainer = document.querySelector(".modal__container");
const modalCloseIcon = document.querySelector(".modal__close");

let userName = document.querySelector(".profile__name");
let userDescription = document.querySelector(".profile__title");


profileEdit.addEventListener("click", openModal);
modalCloseIcon.addEventListener("click", closeModal);
formButton.addEventListener("click", saveProfileEdit);



function openModal() {
    modal.classList.add("modal_opened");
    // modal.classList.toggle(".modal_opened");
    document.querySelector(".form__input-name").placeholder = userName.textContent;
    document.querySelector(".form__input-description").placeholder = userDescription.textContent;
}

function closeModal() { 
    // modal.classList.remove(".modal_opened")
    modal.classList.remove("modal_opened");
}

function saveProfileEdit(e){
    e.preventDefault();
    let userNameInput = document.getElementById("name").value;
    let userDescriptionInput = document.getElementById("description").value;
    userName.textContent = userNameInput;
    userDescription.textContent = userDescriptionInput;
    closeModal();
}