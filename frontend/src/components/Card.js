import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onDeleteClick(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <li className="elements__element">
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={handleClick}
      />
      <div className="elements__block">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like">
          <button
            className={
              isLiked
                ? "elements__likebut elements__likebut_active"
                : "elements__likebut"
            }
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <h4 className="elements__likecount">{card.likes.length}</h4>
        </div>
      </div>
      {isOwn && (
        <button
          className="elements__dlt-btn elements__dlt-btn_active"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;
