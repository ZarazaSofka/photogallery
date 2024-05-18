import { readPhoto } from "../api/photo";
import { useQuery } from "react-query";
import "./styles/CompressedPhotoContainer.style.css";

export default function CompressedPhotoContainer({ photoId, onClick }) {
  const { data: photo, isLoading } = useQuery(["photo", photoId], () =>
    readPhoto(photoId)
  );

  console.log("CompressedPhotoContainer: render", photoId);
  console.log("CompressedPhotoContainer: isLoading", isLoading);
  console.log("CompressedPhotoContainer: data", photo);

  if (isLoading) {
    console.log("CompressedPhotoContainer: render loading...");
    return <div className="compressed-photo-container" />;
  }

  return (
    <div className="compressed-photo-container" onClick={() => onClick(photo)}>
      <img src={photo.URL} alt={photo.description} />
    </div>
  );
}
