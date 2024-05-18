import CryptoJS from "crypto-js";
import React, { createContext, useState, useContext } from "react";

export function isAuthenticated(user) {
  return !!user;
}

export function hasRole(user, role) {
  return user?.roles?.includes(role);
}

export function isMe(user, userId) {
  return user?.id === userId;
}

const secretKey = "yourSecretKey";

export function saveUserToLocalStorage(user) {
  if (!user) throw new Error("Неверные данные пользователя");

  const userString = JSON.stringify(user);
  console.log(userString);

  const encryptedUser = CryptoJS.AES.encrypt(userString, secretKey).toString();

  localStorage.setItem("user", encryptedUser);
  return true;
}

export function getUserFromLocalStorage() {
  const encryptedUser = localStorage.getItem("user");
  console.log(encryptedUser);

  if (encryptedUser) {
    const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
    const decryptedUserString = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedUserString);
    return JSON.parse(decryptedUserString);
  }
}

export function deleteUserFromLocalStorage() {
  localStorage.removeItem("user");
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
