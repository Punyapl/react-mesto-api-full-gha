import { useRef, useEffect } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AvatarEditPopup({ isOpen, onUpdateAvatar, ...commonProps }) {
  const avatarLink = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  };

  useEffect(() => {
    avatarLink.current.value = "";
  }, []);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"popup-avatar"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...commonProps}
    >
      <input
        ref={avatarLink}
        className="popup__input popup__input_avatar-link"
        placeholder="Ссылка на картинку"
        name="link"
        id="avatar-link-input"
        required=""
        type="url"
      />
      <span className="popup__error avatar-link-input-error" />
    </PopupWithForm>
  );
}

export default AvatarEditPopup;
