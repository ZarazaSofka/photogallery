import React, { useState } from "react";
import { createPhoto } from "../api/photo";
import ReactModal from "react-modal";

export default function AddPhotoWindow({ user, isOpen, onClose, onAdd }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("userId", user.id);
    const photo = await createPhoto({ formData });
    onAdd(photo);
    onClose();
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
      contentLabel="Добавление фото"
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
