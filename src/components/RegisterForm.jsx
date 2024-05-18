import React, { useState } from "react";
import { register } from "../api/user";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage, useUser } from "../auth";
import "./styles/AuthForm.style.css";

const RegisterForm = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
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
    warning: null,
  });

  const handleSubmit = async (e) => {
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
    try {
      const user = await register(data);
      console.log("Пользователь успешно зарегистрирован:", user);

      saveUserToLocalStorage(user);
      updateUser(user);
      navigate(-1);
    } catch (error) {
      setErrors({ ...errors, warning: error.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: null, warning: null });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const value = data[name];
    if (name === "login" && value === "") {
      setErrors({ ...errors, login: "Имя пользователя обязательно" });
    } else if (name === "email" && value === "") {
      setErrors({ ...errors, email: "Почта обязательна" });
    } else if (name === "password" && value.length < 8) {
      setErrors({ ...errors, password: "Минимальная длина - 8 символов" });
    } else if (name === "passwordRepeat" && value !== data.password) {
      setErrors({ ...errors, passwordRepeat: "Пароли не совпадают" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {errors.warning && <p className="warning-text">{errors.warning}</p>}
      <label className="form-label">
        Имя пользователя:
        <input
          type="text"
          name="login"
          value={data.login}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.login !== null}
          className="form-input"
        />
        {errors.login && <span className="warning-text">{errors.login}</span>}
      </label>
      <br />
      <label className="form-label">
        Почта:
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.email !== null}
          className="form-input"
        />
        {errors.email && <span className="warning-text">{errors.email}</span>}
      </label>
      <br />
      <label className="form-label">
        Пароль:
        <input
          type="password"
          name="password"
          minLength="8"
          value={data.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.password !== null}
          className="form-input"
        />
        {errors.password && (
          <span className="warning-text">{errors.password}</span>
        )}
      </label>
      <br />
      <label className="form-label">
        Повторите пароль:
        <input
          type="password"
          name="passwordRepeat"
          minLength="8"
          value={data.passwordRepeat}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.passwordRepeat !== null}
          className="form-input"
        />
        {errors.passwordRepeat && (
          <span className="warning-text">{errors.passwordRepeat}</span>
        )}
      </label>
      <br />
      <button
        type="submit"
        disabled={Object.values(errors).some(Boolean)}
        className="submit-button"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
