import React from "react";
import Slider from "react-slick";
import PhotoContainer from "./PhotoContainer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/HorizontalPhotoGallery.style.css";

export default function HorizontalPhotoGallery({ photos: galleryPhotos }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Пролистывание каждые 3 секунды
    pauseOnHover: true,
  };

  return (
    <div className="horizontal-photo-gallery">
      {!galleryPhotos || galleryPhotos.length === 0 ? (
        <p>Нет фотографий</p>
      ) : (
        <div className="gallery-wrapper">
          <Slider {...settings}>
            {galleryPhotos.map((photoId) => (
              <PhotoContainer key={photoId} photoId={photoId} isCombined />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
