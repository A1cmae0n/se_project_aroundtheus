const initialCards = [
    {name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"}, 
    {name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"}, 
    {name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"}, 
    {name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg"}, 
    {name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg"}, 
    {name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg"}
];

// selectors for modal elements
const profileEdit = document.querySelector(".profile__edit");
const modal = document.querySelector(".modal");
const formButton = document.querySelector(".form__button");
const modalCloseIcon = document.querySelector(".modal__close");

// selectors for profile elements
let userName = document.querySelector(".profile__name");
let userDescription = document.querySelector(".profile__title");

// listeners for profile & modal buttons
profileEdit.addEventListener("click", openModal);
modalCloseIcon.addEventListener("click", closeModal);
formButton.addEventListener("click", saveProfileEdit);

// functions for the above listeners
function openModal() {
    modal.classList.add("modal_opened");
    document.querySelector(".form__input-name").placeholder = userName.textContent;
    document.querySelector(".form__input-description").placeholder = userDescription.textContent;
}

function closeModal() { 
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

// For future functionality 
// iterate through data struct to populate card drawn from template
function getCardElement(data) {
    const cardTemplate  = document.querySelector("#card-template").content;
    let cardElement = cardTemplate.querySelector(".card").cloneNode(true); 
    // set image src
    cardElement.querySelector("img").setAttribute("src", data.link);
    // set image alt
    cardElement.querySelector("img").setAttribute("alt", data.name);
    // set card header to name 
    let cardHeader = cardElement.querySelector(".card__header");
    cardHeader.textContent = data.name;
    return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
    getCardElement(initialCards[i]);
}

