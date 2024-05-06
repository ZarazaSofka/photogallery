import React, { useState } from "react";
import PhotoContainer from "./PhotoContainer";

export default function VerticalPhotoGallery({ photos }) {
  const [numberOfContainers, setNumberOfContainers] = useState(10);
  const [loadMore, setLoadMore] = useState(false);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight * 0.9 && !loadMore) {
      setLoadMore(true);
      setTimeout(() => {
        setNumberOfContainers(numberOfContainers + 10);
        setLoadMore(false);
      }, 1000);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="vertical-photo-gallery">
      {photos.slice(0, numberOfContainers).map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} isCombined={false} />
      ))}
    </div>
  );
}
