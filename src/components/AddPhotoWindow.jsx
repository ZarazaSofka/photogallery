import React, { useState } from "react";
import { createPhoto } from "../api/photo";
import ReactModal from "react-modal";
import "./styles/AddPhotoWindow.style.css";

export default function AddPhotoWindow({ isOpen, onClose, onAdd }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const photoId = await createPhoto(formData);
    onAdd(photoId);
    handleCancel();
  };

  const handleCancel = () => {
    setImageSrc(null);
    setDescription("");
    onClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className="add-photo-window"
      overlayClassName="add-photo-window-overlay"
      contentLabel="Добавление фото"
      appElement={document.getElementById("root")}
    >
      <button className="close-button" onClick={handleCancel} />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="add-photo-window__image-preview-wrapper">
          {imageSrc && <img src={imageSrc} alt="preview" />}
        </div>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleImageChange}
          className="add-photo-window__input"
        />
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          className="add-photo-window__description"
          placeholder="Описание"
        />
        <button
          type="submit"
          className="add-photo-window__submit"
          disabled={!imageSrc}
        >
          добавить
        </button>
      </form>
    </ReactModal>
  );
}
