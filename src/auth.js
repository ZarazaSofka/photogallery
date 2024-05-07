export function isAuthenticated(user) {
  return !!user;
}

export function hasRole(user, role) {
  return user?.roles?.includes(role);
}

export function isMe(user, userId) {
  return user?.id === userId;
}

import { encrypt, decrypt } from "../crypto";

export function saveUserToLocalStorage(user) {
  if (!user) return false;
  const encryptedUser = encrypt(JSON.stringify(user));
  localStorage.setItem("user", encryptedUser);
  return true;
}

export function getUserFromLocalStorage() {
  const encryptedUser = localStorage.getItem("user");
  if (encryptedUser) {
    return JSON.parse(decrypt(encryptedUser));
  }
  return null;
}
