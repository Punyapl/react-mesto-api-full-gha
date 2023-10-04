import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth.js";

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formValue;

    onLogin(email, password);
  };

  return (
    <main className="content">
      <section className="authorization">
        <h1 className="authorization__title">Вход</h1>
        <form onSubmit={handleSubmit} className="authorization__form">
          <input
            className="authorization__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
          />
          <input
            className="authorization__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="authorization__button"
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
