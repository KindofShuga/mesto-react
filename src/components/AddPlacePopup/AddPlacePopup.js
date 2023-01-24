import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import { useState } from 'react';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }
    return (
        <PopupWithForm
            name="place"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Новое место"
            buttonTitle="Создать"
            ariaLabel="Добавить место">
            <label className="popup__field">
                <input
                    type="text"
                    id="title-input"
                    name="name"
                    className="popup__input popup__input_el_title"
                    onChange={handleNameChange}
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <span className="title-input-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="url"
                    id="img-input"
                    name="link"
                    className="popup__input popup__input_el_img"
                    onChange={handleLinkChange}
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="img-input-error"></span>
            </label>
        </PopupWithForm>
    );
}