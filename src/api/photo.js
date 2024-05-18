import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: `${config.baseUrl}/photo`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const readUserPhotos = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении фотографий:", error);
    throw error;
  }
};

export const readPopularPhotos = async () => {
  try {
    const response = await api.get("/popular");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении фотографий:", error);
    throw error;
  }
};

export const readLatestPhotos = async () => {
  try {
    const response = await api.get("/latest");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении фотографий:", error);
    throw error;
  }
};

export const readPhotos = async (last = null) => {
  try {
    const response = await api.get("/", { params: { last } });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении фотографий:", error);
    throw error;
  }
};

export const readPhoto = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    console.log(response);
    const photo = response.data;

    // Преобразуем массив байтов в Uint8Array
    const byteArray = new Uint8Array(photo.buffer.data);

    // Создаем Blob из Uint8Array и типа содержимого
    const blob = new Blob([byteArray], { type: photo.contentType });

    // Создаем URL из Blob
    const url = URL.createObjectURL(blob);

    // Добавляем URL к объекту фотографии
    photo.URL = url;

    return photo;
  } catch (error) {
    console.error("Ошибка получения фотографии:", error);
    throw error;
  }
};

export const createPhoto = async (formData) => {
  try {
    const response = await api.post(`/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data.id;
  } catch (error) {
    console.error("Ошибка при создании фотографии:", error);
    throw error;
  }
};
export const deletePhoto = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    console.log(response);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting photo:", error);
    return false;
  }
};
export const likePhoto = async (id) => {
  try {
    await api.put(`/${id}/like`);
    return true;
  } catch (error) {
    console.error("Ошибка при лайке фотографии:", error);
    return false;
  }
};
