import { readPhoto } from "../api/photo";
import { Link } from "react-router-dom";

export default function SetPhotoContainer({ photo, isCombined, set }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    console.log("SetPhotoContainer useEffect started");
    (async () => {
      console.log("Reading photo", photo.id);
      const response = await readPhoto(photo.id);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setPhotoUrl(objectUrl);
      console.log("Photo read, setting photoUrl", photoUrl);
    })();
    console.log("SetPhotoContainer useEffect finished");
  }, [photo.id]);

  const linkTarget = `/set/${set.id}`;
  return (
    <div className="photo-container">
      <Link to={linkTarget}>
        <img src={photoUrl} alt={photo.title} />
        {isCombined && (
          <div className="photo-container__data-overlay">
            <div className="photo-container__description">
              {photo.description}
            </div>
            <div className="photo-container__set-name">{set.name}</div>
          </div>
        )}
      </Link>
      {!isCombined && (
        <div className="photo-container__data">
          <div className="photo-container__description">
            {photo.description}
          </div>
          <div className="photo-container__set-name">{set.name}</div>
        </div>
      )}
    </div>
  );
}
