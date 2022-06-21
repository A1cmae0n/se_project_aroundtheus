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

// selectors for modal elements
const profileEdit = document.querySelector(".profile__edit");
const addLocation = document.querySelector(".profile__add-location");

const editModal = document.querySelector(".modal__edit");
const addLocationModal = document.querySelector(".modal__add-location");

const editForm = document.querySelector(".modal__form-edit");
const addLocationForm = document.querySelector(".modal__form-new-location");

const modalCloseEdit = document.querySelector(".modal__close");
const modalCloseNewLocation = document.querySelector(".modal__close-new-location");

//selector(s) for cards
const cardHeart = document.querySelector(".card__heart-icon");

// selectors for profile elements
let userName = document.querySelector(".profile__name");
let userDescription = document.querySelector(".profile__title");

// functions for the above listeners
function openModal(evt) {
    if (evt.srcElement == document.querySelector(".profile__edit")) {
        editModal.classList.add("modal_opened");
        document.querySelector(".form__input-edit:first-of-type").value = userName.textContent;
        document.querySelector(".form__input-edit:nth-of-type(2)").value = userDescription.textContent;
    } else if (evt.srcElement == document.querySelector(".profile__add-location")) {
        addLocationModal.classList.add("modal_opened");
        document.querySelector(".form__input-new-location:first-of-type").value = "Title";
        document.querySelector(".form__input-new-location:nth-of-type(2)").value = "Image URL";
    }
}

function closeModal(evt) { 
    evt.preventDefault();

    const closeEdit = document.querySelector(".modal__close-edit");
    const closeNewLocation = document.querySelector(".modal__close-new-location");
    const saveEdit = document.querySelector(".modal__form-edit");
    const saveNewLocation = document.querySelector(".modal__form-new-location");

    if (evt.target == closeEdit || evt.target == saveEdit) {
        editModal.classList.remove("modal_opened");
    } else if (evt.target == closeNewLocation || evt.target == saveNewLocation) {
        addLocationModal.classList.remove("modal_opened");
    }
}

function saveProfileEdit(evt){
    evt.preventDefault();
    let userNameInput = document.getElementById("name").value;
    let userDescriptionInput = document.getElementById("description").value;
    userName.textContent = userNameInput;
    userDescription.textContent = userDescriptionInput;
    closeModal(evt);
}

function saveNewLocation(evt){
    evt.preventDefault();
    const titleInput = document.getElementById("title").value;
    const imgUrlInput = document.getElementById("image-url").value;
    const cardObj = {link: imgUrlInput, name: titleInput}
    const card = getCardElement(cardObj);
    cardsList.appendChild(card);
    closeModal(evt);
}

function removeLocation(evt){
    console.log(evt);
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