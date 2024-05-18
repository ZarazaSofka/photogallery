import React, { useState } from "react";
import ReactModal from "react-modal";
import { useQuery, useMutation } from "react-query";
import { deleteUser, updateUser, readUsers } from "../api/user";
import "./styles/AdminPage.style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDataToUpdate, setUserDataToUpdate] = useState({
    id: "",
    login: "",
    email: "",
  });

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery("users", () => readUsers(), {
    onError: (error) => console.error(error),
  });

  const updateUserMutation = useMutation((data) => updateUser(data), {
    onSuccess: () => refetch(),
  });
  const deleteUserMutation = useMutation((userId) => deleteUser(userId), {
    onSuccess: () => refetch(),
  });

  const handleOpenModal = (userId) => {
    setIsModalOpen(true);
    setUserDataToUpdate(users.find((user) => user.id === userId));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserDataToUpdate({ id: "", login: "", email: "" });
  };

  const handleUpdateUser = () => {
    updateUserMutation.mutate(userDataToUpdate);
    handleCloseModal();
  };

  return (
    <>
      <Header />
      <div className="admin-page">
        <button className="admin-page__refresh-button" onClick={refetch}>
          Обновить
        </button>
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
                    <button
                      className="admin-page__update-button"
                      onClick={() => handleOpenModal(user.id)}
                    >
                      Обновить
                    </button>
                    <button
                      className="admin-page__delete-button"
                      onClick={() => deleteUserMutation.mutate(user.id)}
                    >
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
          overlayClassName="admin-page__modal-overlay"
          appElement={document.getElementById("root")}
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
              className="admin-page__input"
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
              className="admin-page__input"
            />
          </label>
          <button
            onClick={handleUpdateUser}
            className="admin-page__submit-button"
          >
            Обновить
          </button>
          <button
            onClick={handleCloseModal}
            className="admin-page__cancel-button"
          >
            Отмена
          </button>
        </ReactModal>
      </div>
      <Footer />
    </>
  );
}
