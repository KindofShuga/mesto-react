import api from '../../utils/Api.js';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../Card/Card.js';
export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = useState([]);
    const [userDescription, setUserDescription] = useState([]);
    const [userAvatar, setUserAvatar] = useState([]);
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getUserAndCard()
            .then(([user, cards]) => {
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(cards)
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, []);
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                    <button type="button" aria-label="Редактировать аватар" className="button profile__avatar-edit-btn" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" aria-label="Редактировать профиль" className="button profile__edit-btn" onClick={onEditProfile}></button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button type="button" aria-label="Добавить место" className="button profile__add-btn" onClick={onAddPlace}></button>
            </section>
            <section>
                <ul className="cards">
                        {cards.map((card) => {
                            return <Card cardInfo={card} key={card._id} onCardClick={onCardClick}/>
                        })}
                </ul>
            </section>
        </main>
    );
};