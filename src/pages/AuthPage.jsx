import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="buttons">
          <button
            className={isRegister ? "active" : ""}
            onClick={() => setIsRegister(true)}
          >
            Регистрация
          </button>
          <button
            className={isRegister ? "" : "active"}
            onClick={() => setIsRegister(false)}
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
