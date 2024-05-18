import axios from "axios";
import config from "../config";
const api = axios.create({
  baseURL: `${config.baseUrl}/set`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const createSet = async (name) => {
  try {
    const response = await api.post(`/`, { name });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании набора:", error);
    throw error;
  }
};

export const readSet = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении набора:", error);
    throw error;
  }
};

export const updateSet = async (setId, name) => {
  try {
    const response = await api.put(`/${setId}`, { name });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении набора:", error);
    throw error;
  }
};

export const deleteSet = async (setId) => {
  try {
    const response = await api.delete(`/${setId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка удаления набора:", error);
    throw error;
  }
};

export const addPhotoToSet = async (setId, photoId) => {
  try {
    const response = await api.put(`/${setId}/photos/${photoId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении фотографии:", error);
    throw error;
  }
};

export const deletePhotoFromSet = async (setId, photoId) => {
  try {
    const response = await api.delete(`/${setId}/photos/${photoId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка удаления фотографии:", error);
    throw error;
  }
};

export const getNewSets = async () => {
  try {
    const response = await api.get("/new");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения новых наборов:", error);
    throw error;
  }
};

export const readUserSets = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении наборов:", error);
    throw error;
  }
};
