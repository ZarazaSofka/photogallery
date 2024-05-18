import { readPhoto } from "../api/photo";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "./styles/PhotoContainer.style.css";

export default function SetPhotoContainer({ isCombined, set, photoId }) {
  const {
    data: photo,
    error,
    isLoading,
  } = useQuery(["photo", photoId], () => readPhoto(photoId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading photo</div>;

  const linkTarget = `/set/${set.id}`;

  return (
    <div className="photo-container">
      <Link to={linkTarget}>
        <img src={photo.URL} alt={photo.description} />
        {isCombined && (
          <div className="photo-container__data-overlay">
            <div className="photo-container__set-name">{set.name}</div>
          </div>
        )}
      </Link>
      {!isCombined && (
        <div className="photo-container__data">
          <div className="photo-container__set-name">{set.name}</div>
        </div>
      )}
    </div>
  );
}
