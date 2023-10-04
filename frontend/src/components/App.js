import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddCardPopup from "./AddCardPopup.js";
import AvatarEditPopup from "./AvatarEditPopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import ImagePopup from "./ImagePopup.js";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/Auth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({
    about: "",
    avatar: "",
    cohort: "",
    name: "",
    _id: "",
  });

  const [cards, setCards] = useState([]);
  const [authInfo, setAuthInfo] = useState({ success: false, message: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [currentUserAccount, setCurrentUserAccount] = useState({
    loggedIn: false,
    email: "",
  });

  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setCurrentUserAccount({ loggedIn: true, email: email });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        switch (err.status) {
          case 400:
            setAuthInfo({
              success: false,
              message: "Не передано одно из полей",
            });
            console.log("Не передано одно из полей");
            break;
          case 401:
            setAuthInfo({
              success: false,
              message: `пользователь с ${email} не найден`,
            });
            console.log(`пользователь с ${email} не найден`);
            break;
          default:
            setAuthInfo({
              success: false,
              message: "Не удалось войти",
            });
            console.log("Не удалось войти");
        }
        setIsInfoTooltipOpen(true);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        console.log(`Электронная почта ${res.data.email} зарегистрирована`);
        setAuthInfo({
          success: true,
          message: "Вы успешно\n зарегистрировались",
        });
        setIsInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(
          `${err.status}\nНе удалось зарегистрировать электронную почту ${email}\n Попробуйте ещё раз`,
        );
        setAuthInfo({
          success: false,
          message: "Что-то пошло не так!\n Попробуйте еще раз.",
        });
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUserAccount({ loggedIn: false, email: "" });
    navigate("/sign-in");
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (objUserInfo) => {
    console.log(objUserInfo);
    const { name, about } = objUserInfo;

    api
      .updateUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(
          `Ошибка обновления данных пользователя:\n ${err.status}\n ${err.text}`,
        );
      });
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateAvatar(link)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(
          `Ошибка обновления аватара пользователя:\n ${err.status}\n ${err.text}`,
        );
      });
  };

  const handleAddPlace = (objNewCard) => {
    api
      .sentCard(objNewCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка добавления карточки:\n ${err.status}\n ${err.text}`);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        console.log(res);
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка удаления карточки:\n ${err.status}\n ${err.text}`);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка загрузки данных карточки:\n ${err.status}\n ${err.text}`);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .getContent(jwt)
        .then((res) => {
          setCurrentUserAccount({ loggedIn: true, email: res.data.email });
          navigate("/", { replace: true });
        })
        .catch((err) => {
          switch (err.status) {
            case 400:
              console.log("Токен не передан или передан не в том формате");
              break;
            case 401:
              console.log("Переданный токен некорректен");
              break;
            default:
              console.log("Не удалось проверить токен");
          }
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (currentUserAccount.loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([infoData, cardsSectionData]) => {
          setCurrentUser(infoData);
          setCards(cardsSectionData);
        })
        .catch((err) => {
          console.log(err.status);
          alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
        });
    }
  }, [currentUserAccount.loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            userEmail={currentUserAccount.email}
            onSingOut={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement loggedIn={currentUserAccount.loggedIn}>
                  <Main
                    cards={cards}
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onDeleteClick={handleCardDelete}
                  />
                  <Footer />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          </Routes>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            success={authInfo.success}
            message={authInfo.message}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <AvatarEditPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <DeleteCardPopup />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
