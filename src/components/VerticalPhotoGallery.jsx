import React, { useState } from "react";
import PhotoContainer from "./PhotoContainer";

export default function VerticalPhotoGallery({ photos, onLoadMore }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight * 0.9 && !isLoading) {
      setIsLoading(true);
      try {
        await onLoadMore(photos[photos.length - 1].id);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="vertical-photo-gallery">
      {photos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} isCombined={false} />
      ))}
    </div>
  );
}
