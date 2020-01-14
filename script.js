const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];
const rootMainContainer = document.querySelector('.root');
const placesList = rootMainContainer.querySelector('.places-list');
const userInfoBtn = rootMainContainer.querySelector('.user-info__button');
const popUpBtnSubmit = rootMainContainer.querySelector('.popup__button');
const userInfoEdit = rootMainContainer.querySelector('.user-info__edit');
const profile = rootMainContainer.querySelector('.profile');

function createMarkup(citiName, linkToPic) {
  const placeCard = document.createElement("div");
  placeCard.classList.add("place-card");
  placeCard.insertAdjacentHTML('beforeend', `
      <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>`);
  placeCard.querySelector(".place-card__name").textContent = citiName;
  placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${linkToPic})`;

  return placeCard;
}

function createCards(arr, wrap) {
  arr.forEach(function (obj) {
    wrap.appendChild(createMarkup(obj.name, obj.link));
  });
}

function closePopUp() {
  let popup = rootMainContainer.querySelectorAll('.popup');
  for (let i = 0; popup.length > i; i++) {
    popup[i].classList.remove('popup_is-opened');
  }
}

function addNewCard(event) {
  event.preventDefault();

  const form = document.forms.new;
  const nameF = form.elements.name;
  const link = form.elements.link;
  placesList.appendChild(createMarkup(nameF.value, link.value));

  closePopUp();
  form.reset();
}

function addUserData(event) {
  event.preventDefault();

  const form = document.forms.formProfile;
  const inputName = form.elements.name;
  const inputInfo = form.elements.info;
  profile.querySelector('.user-info__name').textContent = inputName;
  profile.querySelector('.user-info__job').textContent = inputInfo.value;


  closePopUp();
  form.reset();
}

window.addEventListener('load', createCards(initialCards, placesList));
 
placesList.addEventListener('click', function (event) {

  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');

  } else if (event.target.classList.contains('place-card__delete-icon')) {
    placesList.removeChild(event.target.closest('.place-card'));

  } else if (event.target.classList.contains('place-card__image')) {
    document.querySelector('.popup-image').classList.add('popup_is-opened');
    const stylelink = event.target.getAttribute('style');
    document.querySelector(".popup-image__img").setAttribute('style', stylelink);

  }
});

profile.addEventListener('click', function (event) {

  const newCardPopUp = rootMainContainer.querySelector('.popup');
  const poopUpEditProfile = rootMainContainer.querySelector('.popup_edit-profile')

  if (event.target.classList.contains('user-info__button')) {
    newCardPopUp.classList.add('popup_is-opened');

  } else if (event.target.classList.contains('user-info__edit')) {
    poopUpEditProfile.classList.add('popup_is-opened');
  }
});

document.forms.new.addEventListener('submit', addNewCard);

document.forms.formProfile.addEventListener('submit', addUserData);

rootMainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup__close')) {
    closePopUp();
  }
});
