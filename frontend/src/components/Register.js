import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
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

    onRegister(email, password);
  };

  return (
    <section className="authorization">
      <h1 className="authorization__title">Регистрация</h1>
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
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="authorization__link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
