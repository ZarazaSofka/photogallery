import React, { useState } from "react";
import Header from "../components/Header";
import ProfilePhoto from "../components/ProfilePhoto";
import { useQuery, useQueryClient } from "react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readUser, deleteUser } from "../api/user";
import { readUserPhotos } from "../api/photo";
import { readUserSets } from "../api/set";
import Footer from "../components/Footer";
import CompressedPhotoGallery from "../components/CompressedPhotoGallery";
import AddPhotoWindow from "../components/AddPhotoWindow";
import CreateSetWindow from "../components/CreateSetWindow";
import {
  isMe,
  isMeOrAdmin,
  useUser,
  deleteUserFromLocalStorage,
} from "../auth";
import "./styles/ProfilePage.style.css";

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: profileData } = useQuery(
    ["user", userId],
    () => readUser(userId),
    {
      onError: (error) => console.error(error),
    }
  );

  const { data: photos } = useQuery(
    ["userPhotos", userId],
    () => readUserPhotos(userId),
    {
      onError: (error) => console.error(error),
    }
  );

  const { data: sets } = useQuery(
    ["userSets", userId],
    () => readUserSets(userId),
    {
      onError: (error) => console.error(error),
    }
  );

  const [activeTab, setActiveTab] = useState("photos");
  const [isAddPhotoWindowOpen, setIsAddPhotoWindowOpen] = useState(false);
  const [isCreateSetWindowOpen, setIsCreateSetWindowOpen] = useState(false);

  const handleAddPhoto = (addedPhotoId) => {
    queryClient.setQueryData(["userPhotos", userId], (prevData) => [
      addedPhotoId,
      ...(prevData || []),
    ]);
  };

  const handleCreateSet = (newSet) => {
    queryClient.setQueryData(["userSets", userId], (prevData) => [
      newSet,
      ...(prevData || []),
    ]);
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить аккаунт?")) {
        await deleteUser(userId);
        deleteUserFromLocalStorage();
        updateUser(null);
        queryClient.removeQueries(["user", userId]);
        queryClient.removeQueries(["userSets", userId]);
        queryClient.removeQueries(["userPhotos", userId]);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Не получилось удалить аккаунт");
    }
  };

  return (
    <>
      <Header />
      <div className="profile-data-container">
        {profileData && <ProfilePhoto profileData={profileData} />}
        <div className="profile-data-container__data">
          <div className="profile-data-container__login">
            {profileData?.login ?? "User not found"}
          </div>
          {isMeOrAdmin(user, userId) && (
            <div className="profile-data-container__buttons">
              {isMe(user, userId) && (
                <div className="profile-data-container__buttons-photo">
                  <button
                    onClick={() =>
                      setIsAddPhotoWindowOpen(!isAddPhotoWindowOpen)
                    }
                    сlassName="add-photo-button"
                  >
                    Добавить фотографию
                  </button>
                  <button
                    onClick={() =>
                      setIsCreateSetWindowOpen(!isCreateSetWindowOpen)
                    }
                    сlassName="create-set-button"
                  >
                    Создать набор
                  </button>
                </div>
              )}
              <div className="profile-data-container__buttons-user">
                <button onClick={handleDelete} сlassName="delete-user-button">
                  Удалить аккаунт
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {user && (
        <AddPhotoWindow
          isOpen={isAddPhotoWindowOpen}
          onClose={() => setIsAddPhotoWindowOpen(false)}
          onAdd={handleAddPhoto}
        />
      )}
      {user && (
        <CreateSetWindow
          isOpen={isCreateSetWindowOpen}
          onClose={() => setIsCreateSetWindowOpen(false)}
          userId={userId}
          onCreate={handleCreateSet}
        />
      )}
      <div className="profile-container">
        <div className="profile-container__buttons">
          <button
            onClick={() => setActiveTab("photos")}
            disabled={activeTab === "photos"}
            className={activeTab === "photos" ? "active" : ""}
          >
            Фотографии
          </button>
          <button
            onClick={() => setActiveTab("sets")}
            disabled={activeTab === "sets"}
            className={activeTab === "sets" ? "active" : ""}
          >
            Наборы
          </button>
        </div>
        {activeTab === "photos" && (
          <div className="content-wrapper">
            <p className="content-wrapper__title">Фотографии пользователя:</p>
            <CompressedPhotoGallery
              photosKey={["userPhotos", userId]}
              photos={photos}
            />
          </div>
        )}
        {activeTab === "sets" && (
          <div className="content-wrapper">
            <p className="content-wrapper__title">Наборы пользователя:</p>
            {sets?.map((set) => (
              <Link
                key={set.id}
                to={`/set/${set.id}`}
                className="set-container-link"
              >
                <div className="set-container">
                  <div className="set-container__name">{set.name}</div>
                  <div className="set-container__length">
                    Количество фотографий: {set.photoList.length}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
