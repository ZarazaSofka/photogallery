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

  const { data: profileData } = useQuery(["user", userId], () =>
    readUser(userId)
  );
  const { data: photos } = useQuery(["userPhotos", userId], () =>
    readUserPhotos(userId)
  );
  const { data: sets } = useQuery(["userSets", userId], () =>
    readUserSets(userId)
  );

  const [activeTab, setActiveTab] = React.useState("photos");

  console.log("ProfilePage re-rendered");
  console.log("userId", userId);
  console.log("profileData", profileData);
  console.log("photos", photos);
  console.log("sets", sets);
  console.log("activeTab", activeTab);

  return (
    <>
      <Header />
      <div className="profile-data-container">
        <ProfilePhoto user={profileData} />
        <div className="profile-data-container__data">
          <div className="profile-data-container__login">
            {profileData.login}
          </div>
        </div>
      </div>
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
        {activeTab === "photos" && <CompressedPhotoGallery photos={photos} />}
        {activeTab === "sets" && (
          <div className="set-list">
            {sets.map((set) => (
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
