import React, { useState } from "react";
import PhotoViewer from "./PhotoViewer";
import CompressedPhotoContainer from "./CompressedPhotoContainer";
import "./styles/CompressedPhotoGallery.style.css";

export default function CompressedPhotoGallery({ photos, set }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  function handlePhotoClick(photo) {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  }

  function handleClose() {
    setModalIsOpen(false);
    setSelectedPhoto(null);
  }

  const compressedPhotos = photos?.map((photoId) => (
    <CompressedPhotoContainer
      key={photoId}
      photoId={photoId}
      onClick={(photo) => handlePhotoClick(photo)}
    />
  ));

  return (
    <div className="compressed-photo-gallery">
      {compressedPhotos}
      {selectedPhoto && (
        <PhotoViewer
          isOpen={modalIsOpen}
          photo={selectedPhoto}
          onClose={handleClose}
          set={set}
        />
      )}
    </div>
  );
}
