import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { readSet } from "../api/set";
import CompressedPhotoGallery from "../components/CompressedPhotoGallery";
import "./styles/PhotoSetPage.style.css";

export default function PhotoSetPage() {
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
          <h1 className="set-container__title">{set.name}</h1>
          <Link
            to={`/profile/${set.user.id}/`}
            className="set-container__author"
          >
            Создатель: {set.user.login}
          </Link>
        </div>
        <CompressedPhotoGallery photos={set.photoList} set={set} />
      </div>
      <Footer />
    </div>
  );
}
