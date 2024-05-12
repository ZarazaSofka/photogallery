import axios from "axios";
import config from "../config";
const api = axios.create({
  baseURL: `${config.baseUrl}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const readUser = async (userId) =>
  api.get(`/${userId}`).then((res) => res.data);

export const register = async (user) =>
  api.post("/", user).then((res) => res.data);

export const login = async (user) =>
  api.post("/auth", user).then((res) => res.data);

export const updateUser = (user, userToUpdate) =>
  api.put("/", userToUpdate, { params: user }).then((res) => res.data);

export const deleteUser = (admin, user) =>
  api.delete("/", { params: { admin, user } });
