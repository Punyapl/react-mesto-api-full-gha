import React from "react";
import headerLogo from "../images/header__logo.svg";
import { Route, Routes, Link, Switch } from "react-router-dom";
import { useState } from "react";

function Header({ userEmail, onSingOut, openPopupBurger }) {
  const [isActiveBurger, setIsActiveBurger] = useState(false);

  function openPopupBurger() {
    setIsActiveBurger(!isActiveBurger);
  }

  return (
    <header className={isActiveBurger ? "header header_active" : "header"}>
      <img src={headerLogo} alt="Место Лого" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <>
              <Link to="/sign-in" className="header__nav-link">
                Войти
              </Link>
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Link to="/sign-up" className="header__nav-link">
                Регистрация
              </Link>
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div
                className={
                  isActiveBurger
                    ? "header__user-elements header__user-elements_active"
                    : "header__user-elements"
                }
              >
                <p className="header__email">{userEmail}</p>
                <button onClick={onSingOut} className="header__logout-btn">
                  Выйти
                </button>
              </div>
              <button
                className={
                  isActiveBurger
                    ? " header__burger_active header__burger"
                    : "header__burger"
                }
                onClick={openPopupBurger}
              >
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
