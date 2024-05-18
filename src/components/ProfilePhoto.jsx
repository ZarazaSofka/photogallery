import React, { useState } from "react";
import ChangePhotoWindow from "./ChangePhotoWindow";
import { useQuery } from "react-query";
import "./styles/ProfilePhoto.style.css";
import { readUserPhoto } from "../api/user";
import { isMe, useUser } from "../auth";

export default function ProfilePhoto({ profileData }) {
  const { user } = useUser();
  console.log("ProfilePhoto: rendering with user", profileData);
  const { data: photoUrl, isLoading } = useQuery(
    ["profilePhoto", profileData.id],
    async () => {
      console.log("ProfilePhoto: fetching profile photo", profileData.id);
      const blob = await readUserPhoto(profileData.id);
      return URL.createObjectURL(blob);
    }
  );

  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    console.log("ProfilePhoto: closing modal");
    setIsOpen(false);
  }

  return (
    <div className="profile-photo-wrapper">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <img
          src={photoUrl}
          alt="Профильное фото"
          className="profile-photo"
          onClick={() => {
            if (profileData && isMe(user, profileData.id)) {
              console.log("ProfilePhoto: opening modal");
              setIsOpen(true);
            }
          }}
        />
      )}
      {user && <ChangePhotoWindow isOpen={isOpen} onClose={handleClose} />}
    </div>
  );
}
