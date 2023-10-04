import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup() {
  return (
    <PopupWithForm title={"Вы уверены?"} name={"popup-delete"}></PopupWithForm>
  );
}

export default DeleteCardPopup;
