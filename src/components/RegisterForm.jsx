import React, { useState } from "react";

import { registerUser } from "../api/user";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    login: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors, setErrors] = useState({
    login: null,
    email: null,
    password: null,
    passwordRepeat: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.passwordRepeat) {
      setErrors({
        ...errors,
        passwordRepeat: "Пароли не совпадают",
      });
      return;
    }
    if (data.password.length < 8) {
      setErrors({
        ...errors,
        password: "Минимальная длина - 8 символов",
      });
      return;
    }
    registerUser(data).then((user) =>
      saveUserToLocalStorage(user)
        ? history.goBack()
        : alert("Неверные данные регистрации")
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const value = data[name];
    if (name === "login" && value === "") {
      setErrors({ ...errors, login: "Логин обязателен" });
    } else if (name === "email" && value === "") {
      setErrors({ ...errors, email: "Почта обязательна" });
    } else if (name === "password" && value.length < 8) {
      setErrors({ ...errors, password: "Минимальная длина - 8 символов" });
    } else if (name === "passwordRepeat" && value !== data.password) {
      setErrors({ ...errors, passwordRepeat: "Пароли не совпадают" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Login:
        <input
          type="text"
          name="login"
          value={data.login}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.login !== null}
        />
        {errors.login && <span>{errors.login}</span>}
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.email !== null}
        />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <br />
      <label>
        Пароль:
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.password !== null}
        />
        {errors.password && <span>{errors.password}</span>}
      </label>
      <br />
      <label>
        Повторите пароль:
        <input
          type="password"
          name="passwordRepeat"
          value={data.passwordRepeat}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.passwordRepeat !== null}
        />
        {errors.passwordRepeat && <span>{errors.passwordRepeat}</span>}
      </label>
      <br />
      <button type="submit" disabled={Object.values(errors).some(Boolean)}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
