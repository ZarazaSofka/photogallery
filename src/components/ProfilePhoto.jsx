import React, { useState } from "react";
import ReactModal from "react-modal";
import ChangePhotoWindow from "./ChangePhotoWindow";
import { useQuery } from "react-query";
import { readPhoto } from "../api/photo";

export default function ProfilePhoto({ user }) {
  const { photoUrl } = useQuery(["ProfilePhoto", user.photo_id], () =>
    URL.createObjectURL(readPhoto(user.photo_id).blob)
  );

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

  return (
    <div className="profile-photo-wrapper">
      <img
        src={photoUrl}
        alt="profile photo"
        className="profile-photo"
        onClick={() => setIsOpen(true)}
      />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <ChangePhotoWindow user={user} onClose={() => setIsOpen(false)} />
      </ReactModal>
    </div>
  );
}
