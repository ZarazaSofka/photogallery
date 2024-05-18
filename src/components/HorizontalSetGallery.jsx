import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SetPhotoContainer from "./SetPhotoContainer";
import "./styles/HorizontalPhotoGallery.style.css";

export default function HorizontalSetGallery({ sets: setList }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="horizontal-photo-gallery">
      {!setList || setList.length === 0 ? (
        <p>Нет наборов фотографий</p>
      ) : (
        <div className="gallery-wrapper">
          <Slider {...settings}>
            {setList.map((set) => {
              const { photoList } = set;
              const firstPhotoId = photoList[0];

              return (
                firstPhotoId && (
                  <div key={firstPhotoId}>
                    <SetPhotoContainer
                      photoId={firstPhotoId}
                      set={set}
                      isCombined
                    />
                  </div>
                )
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
}
