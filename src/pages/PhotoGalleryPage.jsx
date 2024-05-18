import React from "react";
import { useInfiniteQuery } from "react-query";
import Header from "../components/Header";
import VerticalPhotoGallery from "../components/VerticalPhotoGallery";
import Footer from "../components/Footer";
import { readPhotos } from "../api/photo";
import config from "../config";
import "./styles/PhotoGalleryPage.style.css";

export default function PhotoGalleryPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    "photos",
    ({ pageParam = null }) => readPhotos(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === config.MAX_DOWNLOAD_PHOTOS_VALUE
          ? lastPage[lastPage.length - 1].id
          : null,
    }
  );

  const photos = data?.pages.flat() || [];

  return (
    <>
      <Header />
      <div className="vertical-photo-gallery-wrapper">
        <div className="vertical-photo-gallery-wrapper__title">Галерея</div>
        <VerticalPhotoGallery
          photos={photos}
          onLoadMore={fetchNextPage}
          canLoadMore={hasNextPage}
          loading={isFetchingNextPage || isLoading}
        />
      </div>
      <Footer />
      {isError && <div>Error: {error.message}</div>}
    </>
  );
}
