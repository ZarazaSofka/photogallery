import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import "./styles/AuthPage.style.css";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  console.log("Rendering AuthPage");
  console.log("isRegister:", isRegister);
  return (
    <div>
      <Header user={null} />
      <div className="auth-container">
        <div className="buttons">
          <button
            className={isRegister ? "active" : ""}
            onClick={() => {
              console.log("Clicked Register button");
              setIsRegister(true);
            }}
            disabled={isRegister}
          >
            Регистрация
          </button>
          <button
            className={isRegister ? "" : "active"}
            onClick={() => {
              console.log("Clicked Login button");
              setIsRegister(false);
            }}
            disabled={!isRegister}
          >
            Вход
          </button>
        </div>
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </div>
      <Footer />
    </div>
  );
}
