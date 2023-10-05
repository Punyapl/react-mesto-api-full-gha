import { useContext, useState, useEffect } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onUpdateUser, ...commonProps }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    console.log(currentUser.name)
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"popup-edit"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...commonProps}
    >
      <input
        className="popup__input popup__input_name"
        type="text"
        name="name"
        id="name-input"
        required=""
        minLength={2}
        maxLength={40}
        placeholder="Имя"
        onInput={handleNameChange}
        value={name}
      />
      <span className="popup__error name-input-error" />
      <input
        className="popup__input popup__input_job"
        type="text"
        name="job"
        id="job-input"
        required=""
        minLength={2}
        maxLength={200}
        placeholder="О себе"
        onInput={handleDescriptionChange}
        value={description}
      />
      <span className="popup__error job-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
