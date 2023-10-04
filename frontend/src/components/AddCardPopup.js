import { useState, useEffect } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddCardPopup({ isOpen, onAddPlace, ...commonProps }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name, link });
  };

  useEffect(() => {
    setName("");
    setLink("");
  }, []);
  return (
    <PopupWithForm
      title={"Добавить карточку места"}
      name={"popup-add"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...commonProps}
    >
      <input
        className="popup__input popup__input_card-name"
        type="text"
        placeholder="Название"
        name="name"
        id="title-input"
        required=""
        minLength={2}
        maxLength={30}
        onInput={handleNameChange}
        value={name}
      />
      <span className="popup__error title-input-error" />
      <input
        className="popup__input popup__input_card-link"
        placeholder="Ссылка на картинку"
        name="link"
        id="link-input"
        required=""
        type="url"
        onInput={handleLinkChange}
        value={link}
      />
      <span className="popup__error link-input-error" />
    </PopupWithForm>
  );
}

export default AddCardPopup;
