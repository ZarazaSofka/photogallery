import React from "react";
import Header from "../components/Header";
import VerticalPhotoGallery from "../components/VerticalPhotoGallery";
import Footer from "../components/Footer";
import { readPhotos } from "../api/photo";

export default function PhotoGalleryPage({ user }) {
  const [photos, setPhotos] = React.useState([]);

  console.log("PhotoGalleryPage: render", photos);

  const onLoadMore = React.useCallback(
    async (lastPhotoId = null) => {
      console.log("PhotoGalleryPage: onLoadMore", lastPhotoId);
      const { data: newPhotos } = await readPhotos(lastPhotoId);
      console.log("PhotoGalleryPage: newPhotos", newPhotos);
      setPhotos((photos) => {
        console.log("PhotoGalleryPage: setPhotos", photos, newPhotos);
        return [...photos, ...newPhotos];
      });
    },
    [photos, setPhotos]
  );

  return (
    <>
      <Header user={user} />
      <VerticalPhotoGallery photos={photos} onLoadMore={onLoadMore} />
      <Footer />
    </>
  );
}
