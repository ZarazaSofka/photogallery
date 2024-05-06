import { readPhoto } from "../api/photo";
import { Link } from "react-router-dom";

export default function PhotoContainer({ photo, onClick }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const res = readPhoto(photo.id);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPhotoUrl(url);
    })();
  }, [photo.id]);

  return (
    <div className="photo-container" onClick={onClick}>
      <Link to={`/user/${photo.user_id}`}>
        <img src={photoUrl} alt={photo.title} />
      </Link>
    </div>
  );
}
