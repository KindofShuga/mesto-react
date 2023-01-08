import React from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import { useState } from 'react';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer />
      {isEditProfilePopupOpen &&
        <PopupWithForm name="profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" buttonTitle="Сохранить" ariaLabel="Сохранить изменения">
          <label className="popup__field">
            <input type="text" id="name-input" name="name" className="popup__input popup__input_el_name" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="name-input-error"></span>
          </label>
          <label className="popup__field">
            <input type="text" id="job-input" name="job" className="popup__input popup__input_el_job" placeholder="О себе" minLength="2" maxLength="200" required />
            <span className="job-input-error"></span>
          </label>
        </PopupWithForm>}
      {isAddPlacePopupOpen &&
        <PopupWithForm name="place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" buttonTitle="Создать" ariaLabel="Добавить место">
          <label className="popup__field">
            <input type="text" id="title-input" name="name" className="popup__input popup__input_el_title" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="title-input-error"></span>
          </label>
          <label className="popup__field">
            <input type="url" id="img-input" name="link" className="popup__input popup__input_el_img" placeholder="Ссылка на картинку" required />
            <span className="img-input-error"></span>
          </label>
        </PopupWithForm>}
      {isEditAvatarPopupOpen &&
        <PopupWithForm name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" buttonTitle="Сохранить" ariaLabel="Сохранить изменения">
          <label className="popup__field">
            <input type="url" id="avatar-input" name="link" className="popup__input popup__input_el_img" placeholder="Ссылка на картинку" required />
            <span className="avatar-input-error"></span>
          </label>
        </PopupWithForm>}
      {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
    </>
  );
};
