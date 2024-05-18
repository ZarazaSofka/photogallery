import React from "react";
import Header from "../components/Header";
import HorizontalPhotoGallery from "../components/HorizontalPhotoGallery";
import Footer from "../components/Footer";
import { useQuery } from "react-query";
import { readPopularPhotos, readLatestPhotos } from "../api/photo";
import { getNewSets } from "../api/set";
import HorizontalSetGallery from "../components/HorizontalSetGallery";
import "./styles/HomePage.style.css";

export default function HomePage() {
  const { data: popularPhotos } = useQuery("popularPhotos", readPopularPhotos);
  const { data: lastPhotos } = useQuery("lastPhotos", readLatestPhotos);
  const { data: newSets } = useQuery("newSets", getNewSets);

  console.log("HomePage: render");
  console.log("popularPhotos", popularPhotos);
  console.log("lastPhotos", lastPhotos);
  console.log("newSets", newSets);

  return (
    <>
      <Header />
      <div className="homepage-gallery-wrapper">
        <div className="homepage-gallery-wrapper__title">
          Набирающие популярность:
        </div>
        <HorizontalPhotoGallery photos={popularPhotos} />
      </div>
      <div className="homepage-gallery-wrapper">
        <div className="homepage-gallery-wrapper__title">Новые наборы:</div>
        <HorizontalSetGallery sets={newSets} />
      </div>
      <div className="homepage-gallery-wrapper">
        <div className="homepage-gallery-wrapper__title">
          Последние фотографии:
        </div>
        <HorizontalPhotoGallery photos={lastPhotos} />
      </div>
      <Footer />
    </>
  );
}
