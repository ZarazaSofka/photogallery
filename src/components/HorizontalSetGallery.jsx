import React from "react";

import PhotoContainer from "./PhotoContainer";
import SetPhotoContainer from "./SetPhotoContainer";

export default function HorizontalSetGallery({ sets: setList }) {
  return (
    <div className="horizontal-photo-gallery">
      <div className="gallery-wrapper">
        <div className="gallery">
          {setList.map((set) => {
            const { photos } = set;
            const firstPhoto = photos[0];

            return (
              firstPhoto && (
                <SetPhotoContainer
                  key={firstPhoto.id}
                  photo={firstPhoto}
                  set={set}
                  isCombined
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}
