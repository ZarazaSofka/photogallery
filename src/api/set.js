import axios from "axios";
import config from "../config";
const api = axios.create({
  baseURL: `${config.baseUrl}/set`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createSet = async (set) => (await api.post("/", set)).data;

export const readSet = async (id) => (await api.get(`/${id}`)).data;

export const updateSet = async (user, id, set) =>
  (await api.put(`/${id}`, set, { params: user })).data;

export const deleteSet = async (user, id) =>
  (await api.delete(`/${id}`, { params: user })).data;

export const addPhotoToSet = async (user, set_id, photo_id) =>
  (await api.put(`/${set_id}/photos/${photo_id}`, null, { params: user })).data;

export const deletePhotoFromSet = async (user, set_id, photo_id) =>
  (await api.delete(`/${set_id}/photos/${photo_id}`, { params: user })).data;

export const getNewSets = async () => (await api.get(`/new`)).data;

export const readUserSets = async (userId) =>
  (await api.get(`/user/${userId}`)).data;
