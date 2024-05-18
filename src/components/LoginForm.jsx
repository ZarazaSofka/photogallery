import React, { useState } from "react";
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage, useUser } from "../auth";
import "./styles/AuthForm.style.css";

export default function LoginForm() {
  const { updateUser } = useUser();
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const [warning, setWarning] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(userData);
      console.log("Пользователь успешно авторизован:", user);

      saveUserToLocalStorage(user);
      updateUser(user);
      navigate(-1);
    } catch (error) {
      setWarning(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {warning && <p className="warning-text">{warning}</p>}
      <label className="form-label">
        Имя пользователя:
        <input
          type="text"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          minLength="4"
          required
          className="form-input"
        />
      </label>
      <label className="form-label">
        Пароль:
        <input
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          minLength="8"
          required
          className="form-input"
        />
      </label>
      <button type="submit" className="submit-button">
        Войти
      </button>
    </form>
  );
}
