import React from "react";
import Header from "../components/Header";
import HorizontalPhotoGallery from "../components/HorizontalPhotoGallery";
import Footer from "../components/Footer";
import { useQuery } from "react-query";
import { getPopularPhotos, getLastPhotos } from "../api/photo";
import { getNewSets } from "../api/set";

export default function HomePage({ user }) {
  const { data: popularPhotos } = useQuery("popularPhotos", getPopularPhotos);
  const { data: lastPhotos } = useQuery("lastPhotos", getLastPhotos);
  const { data: newSets } = useQuery("newSets", getNewSets);

  return (
    <>
      <Header />
      <div className="popular-photos">
        <div className="title">Набирающие популярность:</div>
        <HorizontalPhotoGallery photos={popularPhotos} />
      </div>
      <div className="new-sets">
        <div className="title">Новые наборы:</div>
        {newSets?.map((set) => (
          <Link key={set.id} to={`/sets/${set.id}`}>
            <div className="set-preview">
              <img src={set.previewPhotoUrl} alt={set.name} />
              <div className="name">{set.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="last-photos">
        <div className="title">Последние фотографии:</div>
        <HorizontalPhotoGallery photos={lastPhotos} />
      </div>
      <Footer />
    </>
  );
}
