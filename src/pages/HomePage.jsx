import React from "react";
import Header from "../components/Header";
import HorizontalPhotoGallery from "../components/HorizontalPhotoGallery";
import Footer from "../components/Footer";
import { useQuery } from "react-query";
import { getPopularPhotos, getLastPhotos } from "../api/photo";
import { getNewSets } from "../api/set";
import HorizontalSetGallery from "../components/HorizontalSetGallery";

export default function HomePage({ user }) {
  const { data: popularPhotos } = useQuery("popularPhotos", getPopularPhotos);
  const { data: lastPhotos } = useQuery("lastPhotos", getLastPhotos);
  const { data: newSets } = useQuery("newSets", getNewSets);

  console.log("HomePage: render");
  console.log("user", user);
  console.log("popularPhotos", popularPhotos);
  console.log("lastPhotos", lastPhotos);
  console.log("newSets", newSets);

  return (
    <>
      <Header user={user} />
      <div className="popular-photos">
        <div className="title">Набирающие популярность:</div>
        <HorizontalPhotoGallery photos={popularPhotos} />
      </div>
      <div className="new-sets">
        <div className="title">Новые наборы:</div>
        <HorizontalSetGallery sets={newSets} />
      </div>
      <div className="last-photos">
        <div className="title">Последние фотографии:</div>
        <HorizontalPhotoGallery photos={lastPhotos} />
      </div>
      <Footer />
    </>
  );
}
