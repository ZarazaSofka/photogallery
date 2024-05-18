import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { readPhoto } from "../api/photo";
import "./styles/PhotoContainer.style.css";

export default function PhotoContainer({ photoId, isCombined }) {
  const {
    data: photo,
    error,
    isLoading,
  } = useQuery(["photo", photoId], () => readPhoto(photoId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading photo</div>;

  const formattedDate = new Date(photo.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const linkTarget = `/profile/${photo.user.id}`;

  return (
    <div className="photo-container">
      <Link to={linkTarget}>
        <img src={photo.URL} alt={photo.description} />
        {isCombined && (
          <div className="photo-container__data-overlay">
            <div className="photo-container__description">
              {photo.description}
            </div>
          </div>
        )}
      </Link>
      {!isCombined && (
        <div className="photo-container__data">
          {photo.description && (
            <div className="photo-container__description">
              {photo.description}
            </div>
          )}
          <div className="photo-container__author">
            Автор: {photo.user.login}
          </div>

          <div className="photo-container__create-date">
            Загружено: {formattedDate}
          </div>
        </div>
      )}
    </div>
  );
}
