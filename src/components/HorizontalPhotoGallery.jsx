import React from "react";

import PhotoContainer from "./PhotoContainer";

export default function HorizontalPhotoGallery({ photos }) {
  return (
    <div className="horizontal-photo-gallery">
      <div className="gallery-wrapper">
        <div className="gallery">
          {photos.map((photo) => (
            <PhotoContainer key={photo.id} photo={photo} isCombined={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
