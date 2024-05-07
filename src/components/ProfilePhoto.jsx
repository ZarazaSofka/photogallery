import React, { useState } from "react";
import ReactModal from "react-modal";
import ChangePhotoWindow from "./ChangePhotoWindow";
import { useQuery } from "react-query";
import { readPhoto } from "../api/photo";

export default function ProfilePhoto({ user }) {
  console.log("ProfilePhoto: rendering with user", user);
  const { photoUrl } = useQuery(["ProfilePhoto", user.photo_id], () => {
    console.log("ProfilePhoto: fetching photo", user.photo_id);
    return URL.createObjectURL(readPhoto(user.photo_id).blob);
  });

  const [isOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  console.log("ProfilePhoto: rendering isOpen", isOpen);

  return (
    <div className="profile-photo-wrapper">
      <img
        src={photoUrl}
        alt="profile photo"
        className="profile-photo"
        onClick={() => {
          console.log("ProfilePhoto: opening modal");
          setIsOpen(true);
        }}
      />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          console.log("ProfilePhoto: closing modal");
          setIsOpen(false);
        }}
        style={customStyles}
      >
        <ChangePhotoWindow
          user={user}
          onClose={() => {
            console.log("ProfilePhoto: closing modal from ChangePhotoWindow");
            setIsOpen(false);
          }}
        />
      </ReactModal>
    </div>
  );
}
