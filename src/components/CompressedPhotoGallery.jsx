import React, { useState, useEffect } from "react";
import PhotoViewer from "./PhotoViewer";
import ReactModal from "react-modal";
import CompressedPhotoContainer from "./CompressedPhotoContainer";

export default function CompressedPhotoGallery({ photos }) {
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

  const compressedPhotos = photos.map((photo) => (
    <CompressedPhotoContainer
      key={photo.id}
      photo={photo}
      onClick={() => handlePhotoClick(photo)}
    />
  ));

  return (
    <div>
      {compressedPhotos}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleClose}
        className="photo-viewer"
        overlayClassName="photo-viewer-overlay"
      >
        <PhotoViewer photo={selectedPhoto} onClose={handleClose} />
      </ReactModal>
    </div>
  );
}
