import axios from "axios";
import config from "../config";
const api = axios.create({
  baseURL: `${config.baseUrl}/photo`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const readUserPhotos = async (userId) => {
  const { data } = await api.get(`/user/${userId}`);
  return data;
};

export const readPopularPhotos = async () => {
  const { data } = await api.get(`/popular`);
  return data;
};

export const readLatestPhotos = async () => {
  const { data } = await api.get(`/latest`);
  return data;
};

export const readPhotos = async (lastId = null) =>
  (await api.get(`/${lastId ? `?last=${lastId}` : ""}`)).data;

export const readPhoto = async (id) => (await api.get(`/${id}`)).data;
export const readCompressedPhoto = async (id) =>
  (await api.get(`/${id}/compressed`)).data;
export const createPhoto = async (formData) =>
  (await api.post("/", formData)).data;
export const deletePhoto = async (user, id) =>
  (await api.delete(`/${id}`, { params: user })).data;
