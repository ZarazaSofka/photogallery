import React, { useState } from "react";
import { loginUser } from "../api/user";
import { useHistory } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [userData, setUserData] = useState({ login: "", password: "" });
  const history = useHistory();

  const [warning, setWarning] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(userData);
    const isSuccess = saveUserToLocalStorage(user);
    if (isSuccess) {
      onLogin(user);
      history.goBack();
    } else {
      setWarning("Неверное имя пользователя или пароль");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {warning && <p style={{ color: "red" }}>{warning}</p>}
      <label>
        Login:
        <input
          type="text"
          value={userData.login}
          onChange={(e) => setUserData({ ...userData, login: e.target.value })}
          minLength="4"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          minLength="8"
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
