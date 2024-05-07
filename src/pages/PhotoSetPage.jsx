import React from "react";
import Header from "../components/Header";
import CompressedPhotoWindow from "../components/CompressedPhotoWindow";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { readSet } from "../api/set";

export default function PhotoSetPage({ user }) {
  const { setId } = useParams();

  console.log("PhotoSetPage: render", setId);

  const { data: set } = useQuery(["set", setId], () => readSet(setId), {
    keepPreviousData: true,
  });

  console.log("PhotoSetPage: set", set);

  if (!set) {
    console.log("PhotoSetPage: render loading...");
    return <div>Загрузка...</div>;
  }

  document.title = set.name;

  console.log("PhotoSetPage: render page");

  return (
    <div>
      <Header />
      <div className="set-conteiner">
        <div className="set-container__header">
          <h1>{set.name}</h1>
        </div>
        <CompressedPhotoGallery photos={set.photos} />
      </div>
      <Footer />
    </div>
  );
}
