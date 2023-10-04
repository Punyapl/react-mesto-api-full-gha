import React from "react";
import profile__edit from "../images/profile__edit.svg";
import profile__add from "../images/profile__add.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatarcon">
          <img
            src={currentUser.avatar}
            alt="Аватар профиля"
            className="profile__avatar"
          />
          <button
            className="profile__avatarbtn"
            type="button"
            aria-label="edit avatar"
            onClick={onEditAvatarClick}
          />
        </div>
        <div className="profile__block">
          <div className="profile__info">
            <div className="profile__naming">
              <h1 className="profile__name profile__name_output">
                {currentUser.name}
              </h1>
              <button
                className="profile__edit"
                type="button"
                onClick={onEditProfileClick}
              >
                <img
                  src={profile__edit}
                  alt="Редактировать профиль"
                  className="profile__editico"
                  aria-label="Редактирование профиля"
                />
              </button>
            </div>
            <h2 className="profile__caption profile__caption_output">
              {currentUser.about}
            </h2>
          </div>
          <button
            className="profile__add"
            type="button"
            onClick={onAddPlaceClick}
          >
            <img
              src={profile__add}
              alt="Добавить"
              aria-label="Добавить карточку"
            />
          </button>
        </div>
      </section>
      <ul className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
