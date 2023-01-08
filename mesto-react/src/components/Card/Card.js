export default function Card({ cardInfo, onCardClick }) {
    function handleClick() {
        onCardClick(cardInfo);
    }
    return (
        <li className="cards__item">
            <img src={cardInfo.link} alt={cardInfo.name} className="cards__image" onClick={handleClick} />
            <div className="cards__name">
                <h3 className="cards__title">{cardInfo.name}</h3>
                <div>
                    <button type="button" aria-label="Поставить нравится" className="button cards__like"></button>
                    <p className="cards__likes-amount">{String(cardInfo.likes.length)}</p>
                </div>
                <button type="button" aria-label="Удалить место" className="button cards__delete"></button>
            </div>
        </li>
    );
};