/** Variables used across functions */
const editProfilePopUp = document.querySelector(".modal_edit");
const addLocationPopUp = document.querySelector(".modal_add-location");
const imageModal = document.querySelector(".modal_image"); 

const editProfileButton = document.querySelector(".profile__edit");
const addLocationButton = document.querySelector(".profile__add-location");

const editProfileForm = document.querySelector(".modal__form-edit");
const addLocationForm = document.querySelector(".modal__form-new-location");

const saveProfileEditForm = document.querySelector(".modal__form-edit");
// const saveAddLocationButton = document.querySelector(".modal__save-new-location-button");
const saveLocationForm = document.querySelector(".modal__form-edit");

const closeEditProfileButton = document.querySelector(".modal__close-edit");
const closeNewLocationButton = document.querySelector(".modal__close-new-location");
const closeImageModalButton = document.querySelector(".modal__image-close");

const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__title");

const imagePopUp = imageModal.querySelector(".modal__img");
const imageText = imageModal.querySelector(".modal__image-text");

const initialCards = [
    {name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"}, 
    {name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"}, 
    {name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"}, 
    {name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg"}, 
    {name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg"}, 
    {name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg"}
];

/** Open PopUps */
const openModal = modal => {
    modal.classList.add("modal__opened");
}

const openProfileModal = () => {
    const userName = document.querySelector(".profile__name").textContent; 
    const userDescription = document.querySelector(".profile__title").textContent; 
    const nameInputField = document.querySelector('.form__input-edit[name="name"]');
    const descriptionInputField = document.querySelector('.form__input-edit[name="description"]');
    nameInputField.value = userName;
    descriptionInputField.value = userDescription;
    openModal(editProfilePopUp);
}

const openLocationModal = () => {
    openModal(addLocationPopUp);
}

const openImageModal = (evt, data) => {
    imagePopUp.src = evt.target.src;
    imageText.textContent = data.name;
    openModal(imageModal);
};

/** Populate Page with Cards */
const cardsList = document.querySelector(".cards__list");

initialCards.forEach(cardObj => {
    const card = getCardElement(cardObj);
    cardsList.appendChild(card);
});

function getCardElement(data) {
    const cardTemplate = document.querySelector("#card-template").content;
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

    //     imageElement.addEventListener("click", evt => { 
//         imagePopUpContainer.classList.add("image__opened"); 
//         imagePopUp.src = evt.target.src; 
//         imageText.textContent = data.name; 
//     }); 


// const openImageModal = (evt, data) => {
//     imagePopUp.src = evt.target.src;
//     imageText.textContent = data.name;
//     openModal(imageModal);
// };  
    imageElement.addEventListener("click", evt => openImageModal(evt, data));    
    return card;
}

// function getCardElement(data) { 
//     const imageElement = card.querySelector("img"); 
//     imageElement.setAttribute("src", data.link); 
//     imageElement.setAttribute("alt", `Photo of {data.name}`); 

//     const imagePopUpContainer = document.querySelector(".image"); 
//     const imagePopUp = document.querySelector(".image__popup"); 
//     const imageText = document.querySelector(".image__text"); 

//     imageElement.addEventListener("click", evt => { 
//         imagePopUpContainer.classList.add("image__opened"); 
//         imagePopUp.src = evt.target.src; 
//         imageText.textContent = data.name; 
//     }); 
// }
 

editProfileButton.addEventListener("click", openProfileModal);
addLocationButton.addEventListener("click", openLocationModal);
/** End */

/** Close PopUps*/
const closeModal = modal => {
    modal.classList.remove("modal__opened");
}

closeEditProfileButton.addEventListener("click", closeProfileModal);
closeNewLocationButton.addEventListener("click", closeNewLocationModal);
closeImageModalButton.addEventListener("click", closeImageModal);


function closeProfileModal() {
    closeModal(editProfilePopUp);
}
function closeNewLocationModal() {
    closeModal(addLocationPopUp);
}

function closeImageModal() {
    closeModal(imageModal);
}

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

saveProfileEditForm.addEventListener("submit", saveProfileEdit);
saveLocationForm.addEventListener("submit", saveNewLocation);
