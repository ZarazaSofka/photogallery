import React, { useState } from "react";
import ReactModal from "react-modal";
import { useQuery, useMutation } from "react-query";
import { api } from "../api/api";
import Button from "../components/Button";
import "./styles/AdminPage.style.css";

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [userDataToUpdate, setUserDataToUpdate] = useState({
    login: "",
    email: "",
  });
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery("users", () => api.get("/users"), {
    onError: (error) => console.error(error),
  });
  const updateUser = useMutation((data) => api.put(`/${data.id}`, data));
  const deleteUser = useMutation((userId) => api.delete(`/${userId}`));

  const handleOpenModal = (userId) => {
    setIsModalOpen(true);
    setUserIdToUpdate(userId);
    setUserDataToUpdate(users.find((user) => user.id === userId));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserIdToUpdate(null);
    setUserDataToUpdate({ login: "", email: "" });
  };

  const handleUpdateUser = () => {
    updateUser.mutate({ id: userIdToUpdate, ...userDataToUpdate });
    handleCloseModal();
  };

  const handleDeleteUser = () => {
    deleteUser.mutate(userIdToUpdate);
    handleCloseModal();
  };

  return (
    <>
      <Header />
      <div className="admin-page">
        <Button onClick={refetch}>Обновить</Button>
        <table className="admin-page__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Логин</th>
              <th>Почта</th>
              <th>Дата регистрации</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">Загрузка...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="5">Ошибка загрузки данных</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>
                    {new Date(user.registrationDate).toLocaleDateString(
                      "ru-RU"
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleOpenModal(user.id)}>
                      Обновить
                    </button>
                    <button onClick={() => deleteUser.mutate(user.id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          className="admin-page__modal"
        >
          <h2>Обновление пользователя</h2>
          <label>
            Логин:
            <input
              type="text"
              value={userDataToUpdate.login}
              onChange={(e) =>
                setUserDataToUpdate((prevState) => ({
                  ...prevState,
                  login: e.target.value,
                }))
              }
            />
          </label>
          <label>
            Почта:
            <input
              type="text"
              value={userDataToUpdate.email}
              onChange={(e) =>
                setUserDataToUpdate((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </label>
          <Button onClick={handleUpdateUser}>Обновить</Button>
          <Button onClick={handleDeleteUser}>Удалить</Button>
          <Button onClick={handleCloseModal}>Отмена</Button>
        </ReactModal>
      </div>
      <Footer />
    </>
  );
}
