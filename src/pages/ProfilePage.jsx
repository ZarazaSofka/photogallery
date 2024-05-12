import React from "react";
import Header from "../components/Header";
import ProfilePhoto from "../components/ProfilePhoto";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { readUser } from "../api/user";
import { readUserPhotos } from "../api/photo";
import { readUserSets } from "../api/set";
import Footer from "../components/Footer";
import CompressedPhotoGallery from "../components/CompressedPhotoGallery";

export default function ProfilePage({ user }) {
  const { userId } = useParams();
  console.log("ProfilePage: render", userId);
  const { data: profileData } = useQuery(
    ["user", userId],
    () => readUser(userId),
    {
      onError: (error) => console.error(error),
    }
  );
  console.log("ProfilePage: profileData", profileData);
  const { data: photos, setData: setPhotos } = useQuery(
    ["userPhotos", userId],
    () => readUserPhotos(userId),
    {
      onError: (error) => console.error(error),
    }
  );
  console.log("ProfilePage: photos", photos);
  const { data: sets, setData: setSets } = useQuery(
    ["userSets", userId],
    () => readUserSets(userId),
    {
      onError: (error) => console.error(error),
    }
  );
  console.log("ProfilePage: sets", sets);

  const [activeTab, setActiveTab] = React.useState("photos");
  const [isAddPhotoWindowOpen, setIsAddPhotoWindowOpen] = React.useState(false);
  const [isCreateSetWindowOpen, setIsCreateSetWindowOpen] =
    React.useState(false);

  return (
    <>
      <Header />
      <div className="profile-data-container">
        <ProfilePhoto user={profileData} />
        <div className="profile-data-container__data">
          <div className="profile-data-container__login">
            {profileData?.login ?? "User not found"}
          </div>
          {isMe(user, userId) && (
            <div className="profile-data-container__buttons">
              <button
                onClick={() => setIsAddPhotoWindowOpen(!isAddPhotoWindowOpen)}
              >
                Добавить фотографию
              </button>
              <button
                onClick={() => setIsCreateSetWindowOpen(!isCreateSetWindowOpen)}
              >
                Создать набор
              </button>
            </div>
          )}
        </div>
      </div>
      {isAddPhotoWindowOpen && (
        <AddPhotoWindow
          user={user}
          isOpen={isAddPhotoWindowOpen}
          onClose={() => setIsAddPhotoWindowOpen(false)}
          onAdd={(addedPhoto) => {
            setPhotos((photos) =>
              photos ? [addedPhoto, ...photos] : [addedPhoto]
            );
          }}
        />
      )}
      {isCreateSetWindowOpen && (
        <CreateSetWindow
          user={user}
          isOpen={isCreateSetWindowOpen}
          onClose={() => setIsCreateSetWindowOpen(false)}
          userId={userId}
          onCreate={(newSet) => {
            setSets((sets) => (sets ? [newSet, ...sets] : [newSet]));
          }}
        />
      )}
      <div className="profile-container">
        <div className="profile-container__buttons">
          <button
            onClick={() => setActiveTab("photos")}
            disabled={activeTab === "photos"}
          >
            Фотографии
          </button>
          <button
            onClick={() => setActiveTab("sets")}
            disabled={activeTab === "sets"}
          >
            Наборы
          </button>
        </div>
        {activeTab === "photos" && (
          <>
            <p>Active tab: photos</p>
            <CompressedPhotoGallery photos={photos} />
          </>
        )}
        {activeTab === "sets" && (
          <div className="set-list">
            <p>Active tab: sets</p>
            {sets?.map((set) => (
              <div key={set.id} className="set-link">
                <Link to={`/set/${set.id}`}>{set.title}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
