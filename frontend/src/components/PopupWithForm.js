import React from "react";
import closePopup from "../images/popup__close.svg";

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, children }) {
  return (
    <section
      className={
        isOpen ? `popup popup-${name} popup_opened` : `popup popup-${name}`
      }
    >
      <div className="popup__container">
        <button
          className="popup__close popup__closebtn-edit"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          <img src={closePopup} alt="Закрыть" className="popup__closepic" />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form-${name}`} onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__savebut ${name}-svbtn`}
            type="submit"
            aria-label="Сохранить изменения"
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
