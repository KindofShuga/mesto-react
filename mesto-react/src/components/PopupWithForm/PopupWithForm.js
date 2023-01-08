export default function PopupWithForm(props) {
    return (
        <>
            <div className={`popup popup-${props.name} ${props.isOpen ? 'popup__opened' : ''}`}>
                <div className="popup__container">
                    <button type="button" aria-label="Закрыть" className="button popup__close-btn" onClick={props.onClose}></button>
                    <form name={props.name} className="popup__form" noValidate>
                        <h3 className="popup__heading">{props.title}</h3>
                        {props.children}
                        <button type="submit" aria-label="Сохранить" className="button popup__submit-btn">{props.buttonTitle}</button>
                    </form>
                </div>
            </div>
            
            {/* <div className="popup popup-confirm">
                <div className="popup__container">
                    <button type="button" aria-label="Закрыть" className="button popup__close-btn"></button>
                    <form name="confirm" className="popup__form" noValidate>
                        <h3 className="popup__heading">Вы уверены?</h3>
                        <button type="submit" aria-label="Удалить карточку" className="button popup__submit-btn">Да</button>
                    </form>
                </div>
            </div> */}
        </>
    );
}