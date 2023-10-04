import React from "react";
import closePopup from "../images/popup__close.svg";

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup-zoom ${card ? "popup_opened" : ""}`}>
      <div className="popup-zoom__container">
        <img src={card?.link} alt={card?.name} className="popup-zoom__img" />
        <h3 className="popup-zoom__title">{card?.name}</h3>
        <button
          className="popup__close popup-zoom__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
          <img src={closePopup} alt="Закрыть" className="popup__closepic" />
        </button>
      </div>
    </section>
  );
}

export default ImagePopup;
