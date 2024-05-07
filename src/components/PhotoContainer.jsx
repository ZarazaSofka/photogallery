import { readPhoto } from "../api/photo";
import { Link } from "react-router-dom";

export default function PhotoContainer({ photo, isCombined }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    console.log("PhotoContainer useEffect started");
    (async () => {
      console.log("Reading photo", photo.id);
      const response = await readPhoto(photo.id);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImageSrc(objectUrl);
      console.log("Photo read, setting imageSrc", imageSrc);
    })();
    console.log("PhotoContainer useEffect finished");
  }, [photo.id]);

  const linkTarget = `/profile/${photo.user.id}`;
  return (
    <div className="photo-container">
      <Link to={linkTarget}>
        <img src={imageSrc} alt={photo.title} />
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
          <div className="photo-container__description">
            {photo.description}
          </div>
        </div>
      )}
    </div>
  );
}
