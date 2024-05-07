import { readCompressedPhoto } from "../api/photo";

import { useQuery } from "react-query";

export default function CompressedPhotoContainer({ photo, onClick }) {
  const { data, isLoading } = useQuery(
    ["compressedPhoto", photo.id],
    () => readCompressedPhoto(photo.id),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <div className="compressed-photo-container" />;
  }

  return (
    <div className="compressed-photo-container" onClick={onClick}>
      <img src={URL.createObjectURL(data)} alt={photo.title} />
    </div>
  );
}
