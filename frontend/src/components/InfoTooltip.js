import React from "react";
import iconSuccess from "../images/auth-success.svg";
import iconFailure from "../images/auth-failure.svg";
import closePopup from "../images/popup__close.svg";

function InfoTooltip({ isOpen, success, message, onClose }) {
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          <img src={closePopup} alt="Закрыть" className="popup__closepic" />
        </button>
        <div className="infotooltip">
          <img
            className="infotooltip__image"
            src={success ? iconSuccess : iconFailure}
            alt={success ? "Удачно" : "Ошибка"}
          ></img>
          <p className="infotooltip__message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
