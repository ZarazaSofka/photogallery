import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: `${config.baseUrl}/user`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const readUser = async (userId) => {
  try {
    const response = await api.get(`/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при получении данных пользователя:",
      error.response || error.message
    );
    throw new Error(
      "Не удалось получить данные пользователя. Попробуйте снова."
    );
  }
};

export const register = async (user) => {
  try {
    const response = await api.post("/register", user);
    return response.data.user;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Регистрация не удалась. Проверьте введенные данные и попробуйте снова.";

    console.error("Ошибка при авторизации пользователя:", errorMessage);

    throw new Error(errorMessage);
  }
};

export const login = async (user) => {
  try {
    const response = await api.post("/auth", user);
    return response.data.user;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Авторизация не удалась. Проверьте введенные данные и попробуйте снова.";

    console.error("Ошибка при авторизации пользователя:", errorMessage);

    throw new Error(errorMessage);
  }
};

export const updateUser = async (userToUpdate) => {
  try {
    const response = await api.put("/", userToUpdate);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при обновлении данных пользователя:",
      error.response || error.message
    );
    throw new Error(
      "Обновление данных пользователя не удалось. Попробуйте снова."
    );
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при удалении пользователя:",
      error.response || error.message
    );
    throw new Error("Удаление пользователя не удалось. Попробуйте снова.");
  }
};

export const readUserPhoto = async (userId) => {
  try {
    const response = await api.get(`/${userId}/photo`, {
      responseType: "blob",
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при получении фотографии пользователя:",
      error.response || error.message
    );
    throw new Error(
      "Не удалось получить фотографию пользователя. Попробуйте снова."
    );
  }
};

export const changeUserPhoto = async (userId, formData) => {
  try {
    const response = await api.put(`/${userId}/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при изменении фотографии пользователя:",
      error.response || error.message
    );
    throw new Error(
      "Не удалось изменить фотографию пользователя. Попробуйте снова."
    );
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при выходе из системы:",
      error.response || error.message
    );
    throw new Error("Не удалось выйти из системы. Попробуйте снова.");
  }
};
