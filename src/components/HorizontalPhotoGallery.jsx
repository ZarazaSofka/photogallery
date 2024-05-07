import React from "react";

import PhotoContainer from "./PhotoContainer";

export default function HorizontalPhotoGallery({ photos: galleryPhotos }) {
  return (
    <div className="horizontal-photo-gallery">
      <div className="gallery-wrapper">
        <div className="gallery">
          {galleryPhotos.map((photo) => (
            <PhotoContainer key={photo.id} photo={photo} isCombined />
          ))}
        </div>
      </div>
    </div>
  );
}
