const initialCards = [
    {name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"}, 
    {name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"}, 
    {name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"}, 
    {name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg"}, 
    {name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg"}, 
    {name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg"}
];

const cardsList = document.querySelector(".cards__list");

initialCards.forEach(cardObj => {
    let card = getCardElement(cardObj);
    cardsList.appendChild(card);
});

// Iterate through data struct to populate card drawn from template
function getCardElement(data) {
    const cardTemplate  = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true); 
    // set image src
    cardElement.querySelector("img").setAttribute("src", data.link);
    // set image alt
    cardElement.querySelector("img").setAttribute("alt", data.name);
    // set card header to name 
    let cardHeader = cardElement.querySelector(".card__header");
    cardHeader.textContent = data.name;
    return cardElement;
}

function renderNewLocationModal() {
    const newLocationTemplate = document.querySelector("#modal__add-location-template").content;
    const modal = newLocationTemplate.querySelector(".modal__add-location").cloneNode(true); 
    document.querySelector(".body").append(modal);
}

function renderEditModal() {
    const editModalTemplate = document.querySelector("#modal__edit-template").content;
    const modal = editModalTemplate.querySelector(".modal__edit").cloneNode(true); 
    document.querySelector(".body").append(modal);
}

renderNewLocationModal();
renderEditModal();

// Render modals 
// function renderModals(modalObj) {
//     const modalTemplate = document.querySelector("#modal-template").content;
//     const modal = modalTemplate.querySelector(".modal").cloneNode(true);

//     modal.classList.add(modalObj.modalClass);
//     modal.querySelector(".modal__header").textContent = modalObj.formHeader;

//     const fieldset = modal.querySelector(".form__fieldset");
//     const firstInputField = fieldset.querySelector("input")[0];
//     firstInputField.setAttribute("class", modalObj.formClass);
//     firstInputField.setAttribute("id", modalObj.firstFormId);
//     firstInputField.setAttribute("name", modalObj.formName);
//     // second input field 
//     const secondInputField = fieldset.querySelector("input")[1];
//     firstInputField.setAttribute("class", modalObj.secondFormClass);
//     secondInputField.setAttribute("id", modalObj.formId);
//     secondInputField.setAttribute("name", modalObj.formName);
// }

// const modalNewLocation = {
//     modalClass: "modal__form-new-location",
//     formClass: "modal__add-location", 
//     formHeader: "New Place", 
//     firstFormClass: "form__input-new-location",
//     firstFormId: "title",
//     firstFormName: "image-url",
//     secondFormClass: firstFormClass,
//     secondFormId: "image-url",
//     secondFormName: secondFormName
// }

// const modalEdit = {
//     modalClass: ,
//     formClass: , 
//     formHeader: , 
//     firstFormClass: ,
//     firstFormId: ,
//     firstFormName: ,
//     secondFormClass: ,
//     secondFormId: ,
//     secondFormName: 
// }

// const modalProfile = {
//     class: "modal__form-edit",
//     formClass: "modal__edit", 
//     type: "Edit Profile", 
//     formClass: "form__input-edit",
//     formId: "name",
//     formName: "description"
// }

// renderModals(modalNewLocation);
// renderModals(modalProfile);

// selectors for modal elements
const profileEdit = document.querySelector(".profile__edit");
const addLocation = document.querySelector(".profile__add-location");

const editModal = document.querySelector(".modal__edit");
const addLocationModal = document.querySelector(".modal__add-location");

const editForm = document.querySelector(".modal__form-edit");
const addLocationForm = document.querySelector(".modal__form-new-location");

const modalClose = document.querySelector(".modal__close");
const modalCloseEdit = document.querySelector(".modal__close-edit");
const modalCloseNewLocation = document.querySelector(".modal__close-new-location");

// selector(s) for cards
const cardHeart = document.querySelector(".card__heart-icon");

// selectors for profile elements
let userName = document.querySelector(".profile__name");
let userDescription = document.querySelector(".profile__title");


// functions for the above listeners
const openModal = evt => {
    evt.preventDefault();
    if (evt.srcElement == document.querySelector(".profile__edit")) {
        editModal.classList.add("modal__opened");
        document.querySelector(".form__input-edit:first-of-type").value = userName.textContent;
        document.querySelector(".form__input-edit:nth-of-type(2)").value = userDescription.textContent;
    } else if (evt.srcElement == document.querySelector(".profile__add-location")) {
        addLocationModal.classList.add("modal__opened");
        document.querySelector(".form__input-new-location:first-of-type").value = "Title";
        document.querySelector(".form__input-new-location:nth-of-type(2)").value = "Image URL";
    }
}

const closeModal = evt => { 
    evt.preventDefault();

    const closeEdit = document.querySelector(".modal__close-edit");
    const closeNewLocation = document.querySelector(".modal__close-new-location");
    const saveEdit = document.querySelector(".modal__form-edit");
    const saveNewLocation = document.querySelector(".modal__form-new-location");

    if (evt.target == closeEdit || evt.target == saveEdit) {
        editModal.classList.remove("modal__opened");
    } else if (evt.target == closeNewLocation || evt.target == saveNewLocation) {
        addLocationModal.classList.remove("modal__opened");
    }
}

const saveProfileEdit = evt => {
    evt.preventDefault();
    let userNameInput = document.getElementById("name").value;
    let userDescriptionInput = document.getElementById("description").value;
    userName.textContent = userNameInput;
    userDescription.textContent = userDescriptionInput;
    closeModal(evt);
}

const saveNewLocation = evt => {
    evt.preventDefault();
    const titleInput = document.getElementById("title").value;
    const imgUrlInput = document.getElementById("image-url").value;
    const cardObj = {link: imgUrlInput, name: titleInput}
    const card = getCardElement(cardObj);
    cardsList.appendChild(card);
    closeModal(evt);
}

// listeners for profile & modal buttons
profileEdit.addEventListener("click", openModal);
addLocation.addEventListener("click", openModal);

modalCloseEdit.addEventListener("click", closeModal);
modalCloseNewLocation.addEventListener("click", closeModal);

editForm.addEventListener("submit", saveProfileEdit);
addLocationForm.addEventListener("submit", saveNewLocation);


// songElement.querySelector(".song__like").addEventListener("click",  function (evt) {
//     evt.target.classList.toggle("song__like_active")
//   });

// cardHeart.addEventListener("click", evt => {
//     evt.target.classList.add("card__heart-icon_active");
//     console.log(evt);
// });

//cardsList.forEach(card => console.log(card));

// register events for card heart
document.querySelectorAll('.card__heart-icon').forEach( heart => {
    heart.addEventListener('click', evt => {
        evt.target.classList.toggle("card__heart-icon_active");
    });
});

// regsiter events for trash icon
document.querySelectorAll('.card__trash').forEach(trash => {
    trash.addEventListener('click', evt => {
        evt.target.closest('.card').remove();
    });
});









// selector(s) for images
const image = document.querySelector(".image");
const imagePopUp = document.querySelector(".image__popup");
const imageText = document.querySelector(".image__text");
const imageClose = document.querySelector(".image__close");

// register event for pictures 
document.querySelectorAll('.card__image').forEach(picture => {
    picture.addEventListener('click', evt => {
        if (image.classList.contains("image__opened")) {
            return;
        } else {
            image.classList.add("image__opened");
            const source = evt.target.src;
            imagePopUp.src = source;
            imageText.textContent = evt.target.alt;
        }
    });
});

imageClose.addEventListener("click", closeImage);

function closeImage(evt) {
    evt.preventDefault();
    image.classList.remove("image__opened");
}
