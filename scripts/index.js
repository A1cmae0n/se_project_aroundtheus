/** Variables used across functions */
const editProfileForm = document.querySelector(".modal__form-edit");
const addLocationForm = document.querySelector(".modal__form-new-location");

const editProfilePopUp = document.querySelector(".modal__edit");
const addLocationPopUp = document.querySelector(".modal__add-location");

const editProfileButton = document.querySelector(".profile__edit");
const addLocationButton = document.querySelector(".profile__add-location");

const closeEditProfileButton = document.querySelector(".modal__close-edit");
const closeNewLocationButton = document.querySelector(".modal__close-new-location");

const saveProfileEditButton =  document.querySelector(".modal__edit-profile-submit-button");
const saveAddLocationButton = document.querySelector(".modal__save-new-location-button");

const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__title");

const initialCards = [
    {name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"}, 
    {name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"}, 
    {name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"}, 
    {name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg"}, 
    {name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg"}, 
    {name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg"}
];

/** Populate Page with Cards */
const cardsList = document.querySelector(".cards__list");

initialCards.forEach(cardObj => {
    const card = getCardElement(cardObj);
    cardsList.appendChild(card);
});

function getCardElement(data) {
    const cardTemplate  = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector(".card").cloneNode(true); 

    const cardHeader = card.querySelector(".card__header");
    cardHeader.textContent = data.name;
    
    /** add event listeners */
    const heart = card.querySelector(".card__heart-icon");
    heart.addEventListener("click", evt => evt.target.classList.toggle("card__heart-icon_active"));

    const trash = card.querySelector(".card__trash");
    trash.addEventListener("click", evt=>  evt.target.closest('.card').remove());

    const imageElement = card.querySelector("img");
    imageElement.setAttribute("src", data.link);
    imageElement.setAttribute("alt", `Photo of {data.name}`);

    const imagePopUpContainer = document.querySelector(".image");
    const imagePopUp = document.querySelector(".image__popup");
    const imageText = document.querySelector(".image__text");

    imageElement.addEventListener("click", evt => {
        imagePopUpContainer.classList.add("image__opened");
        imagePopUp.src = evt.target.src;
        imageText.textContent = data.name;
    });

    const imageClose = document.querySelector(".image__close");
    imageClose.addEventListener("click", closeImage);
    function closeImage(evt) {
        evt.preventDefault();
        imagePopUpContainer.classList.remove("image__opened");
    }
    return card;
}
/** End */

/** Open PopUps */
const openModal = modal => {
    modal.classList.add("modal__opened");
}

const openProfileModal = () => {
    openModal(editProfilePopUp);
}
const openLocationModal = () => {
    openModal(addLocationPopUp);
}

editProfileButton.addEventListener("click", openProfileModal);
addLocationButton.addEventListener("click", openLocationModal);
/** End */

/** Close PopUps*/
const closeModal = modal => {
    modal.classList.remove("modal__opened");
}

closeEditProfileButton.addEventListener("click", closeProfileModal);
closeNewLocationButton.addEventListener("click", closeNewLocationModal);

function closeProfileModal() {
    closeModal(editProfilePopUp);
}
function closeNewLocationModal() {
    closeModal(addLocationPopUp);
}
/** END */

const saveProfileEdit = evt => {
    evt.preventDefault();

    const userNameInput = document.getElementById("name").value;
    const userDescriptionInput = document.getElementById("description").value;

    userName.textContent = userNameInput;
    userDescription.textContent = userDescriptionInput;

    editProfileForm.reset();
    closeProfileModal();
}

const saveNewLocation = evt => {
    evt.preventDefault();
    const titleInput = document.getElementById("title").value;
    const imageUrlInput = document.getElementById("image-url").value;
    const cardObj = {link: imageUrlInput, name: titleInput}
    const card = getCardElement(cardObj);
    cardsList.prepend(card);
    addLocationForm.reset();
    closeNewLocationModal();
}
/** END Add Location and Save Profile Edits*/

saveProfileEditButton.addEventListener("click", saveProfileEdit);
saveAddLocationButton.addEventListener("click", saveNewLocation);
