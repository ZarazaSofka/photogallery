import React, { useEffect, useCallback } from "react";
import PhotoContainer from "./PhotoContainer";
import "./styles/VerticalPhotoGallery.style.css";

const VerticalPhotoGallery = ({ photos, onLoadMore, canLoadMore, loading }) => {
  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      canLoadMore &&
      scrollTop + clientHeight >= scrollHeight - 300 &&
      !loading
    ) {
      onLoadMore();
    }
  }, [loading, onLoadMore, canLoadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="vertical-photo-gallery">
      {photos.map((photoId) => (
        <PhotoContainer key={photoId} photoId={photoId} isCombined={false} />
      ))}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default VerticalPhotoGallery;
