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
const saveLocationForm = document.querySelector(".modal_add-location");

const closeEditProfileButton = document.querySelector(".modal__close-edit");
const closeNewLocationButton = document.querySelector(
  ".modal__close-new-location"
);
const closeImageModalButton = document.querySelector(".modal__image-close");

const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__title");

const imagePreview = imageModal.querySelector(".modal__img");
const imageText = imageModal.querySelector(".modal__image-text");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/** Open PopUps */
const openModal = (modal) => {
  modal.classList.add("modal__opened");
};

const openProfileModal = () => {
  const userName = document.querySelector(".profile__name").textContent;
  const userDescription = document.querySelector(".profile__title").textContent;
  const nameInputField = document.querySelector(
    '.form__input-edit[name="name"]'
  );
  const descriptionInputField = document.querySelector(
    '.form__input-edit[name="description"]'
  );
  nameInputField.value = userName;
  descriptionInputField.value = userDescription;
  openModal(editProfilePopUp);
};

const openLocationModal = () => {
  openModal(addLocationPopUp);
};

const openImageModal = (evt, data) => {
  imagePreview.src = evt.target.src;
  imagePreview.alt = `Photo of ${data.name}`;
  imageText.textContent = data.name;
  openModal(imageModal);
};

/** Populate Page with Cards */
const cardsList = document.querySelector(".cards__list");

initialCards.forEach((cardObj) => {
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
  heart.addEventListener("click", (evt) =>
    evt.target.classList.toggle("card__heart-icon_active")
  );

  const trash = card.querySelector(".card__trash");
  trash.addEventListener("click", (evt) =>
    evt.target.closest(".card").remove()
  );

  const imageElement = card.querySelector("img");
  imageElement.setAttribute("src", data.link);
  imageElement.setAttribute("alt", `Photo of ${data.name}`);

  imageElement.addEventListener("click", (evt) => openImageModal(evt, data));
  return card;
}


editProfileButton.addEventListener("click", openProfileModal);
addLocationButton.addEventListener("click", openLocationModal);
/** End */

/** Close PopUps*/
const closeModal = (modal) => {
  modal.classList.remove("modal__opened");
};

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

const saveProfileEdit = (evt) => {
  evt.preventDefault();
  const userNameInput = document.getElementById("name").value;
  const userDescriptionInput = document.getElementById("description").value;

  userName.textContent = userNameInput;
  userDescription.textContent = userDescriptionInput;

  editProfileForm.reset();
  closeProfileModal();
};

const saveNewLocation = (evt) => {
  evt.preventDefault();
  const titleInput = document.getElementById("title").value;
  const imageUrlInput = document.getElementById("image-url").value;
  const cardObj = { link: imageUrlInput, name: titleInput };
  const card = getCardElement(cardObj);
  cardsList.prepend(card);
  addLocationForm.reset();
  closeNewLocationModal();
};
/** END Add Location and Save Profile Edits*/

saveProfileEditForm.addEventListener("submit", saveProfileEdit);
saveLocationForm.addEventListener("submit", saveNewLocation);


// Error validation
const newLocationFormElement = document.querySelector(".modal__form-new-location");
const newLocationFormInput = newLocationFormElement.querySelector(".form__input-new-location");
const newLocationFormError = newLocationFormElement.querySelector(`.${newLocationFormInput.id}-error`); // title-error || image-url-error

const editFormElement = document.querySelector(".modal__form-edit");
const editFormInput = editFormElement.querySelector(".form__input-edit");
const editFormError = editFormElement.querySelector(`.${editFormInput.id}-error`); // name-error || description-error 

// general error logic 
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  // console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove("button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
  const buttonElement = formElement.querySelector('.form__button');
  toggleButtonState(inputList, buttonElement); 
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(".form__fieldset"));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();
