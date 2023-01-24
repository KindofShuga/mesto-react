import React from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import api from '../../utils/Api.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDelitedCard, setSelectedDelitedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleConfirmPopupClick() {
    setIsConfirmPopupOpen(true);
}
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleDelitedCardClick(card) {
    setSelectedDelitedCard(card);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, !isLiked)
      .then((likedCard) => {
        setCards((cardsArray) => cardsArray.map((oneCard) => oneCard._id === card._id ? likedCard : oneCard));
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cardsArray) => cardsArray.filter((oneCard) => oneCard._id !== card._id))
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
  function handleUpdateUser(data) {
    api.addProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      });
  }
  function handleUpdateAvatar(data) {
    api.addAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      });
  }
  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  useEffect(() => {
    api.getUserAndCard()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onConfirm={handleConfirmPopupClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardClickDelete={handleDelitedCardClick}
          cards={cards} />

        <Footer />
        {isEditProfilePopupOpen && <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />}
        {isAddPlacePopupOpen && <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>}
        {isEditAvatarPopupOpen && <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />}
        {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
        {isConfirmPopupOpen && <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} delitedCard={selectedDelitedCard} />}

      </CurrentUserContext.Provider>
    </>
  );
};
