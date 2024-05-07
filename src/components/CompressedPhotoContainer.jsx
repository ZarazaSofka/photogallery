import { readCompressedPhoto } from "../api/photo";

import { useQuery } from "react-query";

export default function CompressedPhotoContainer({ photo, onClick }) {
  const { data, isLoading } = useQuery(
    ["compressedPhoto", photo.id],
    () => readCompressedPhoto(photo.id),
    { keepPreviousData: true }
  );

  console.log("CompressedPhotoContainer: render", photo.id);
  console.log("CompressedPhotoContainer: isLoading", isLoading);
  console.log("CompressedPhotoContainer: data", data);

  if (isLoading) {
    console.log("CompressedPhotoContainer: render loading...");
    return <div className="compressed-photo-container" />;
  }

  return (
    <div className="compressed-photo-container" onClick={onClick}>
      <img src={URL.createObjectURL(data)} alt={photo.title} />
    </div>
  );
}
