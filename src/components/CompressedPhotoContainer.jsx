import { readCompressedPhoto } from "../api/photo";

export default function CompressedPhotoContainer({ photo, onClick }) {
  const [compressedPhotoUrl, setCompressedPhotoUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const res = readCompressedPhoto(photo.id);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setCompressedPhotoUrl(url);
    })();
  }, [photo.id]);

  return (
    <div className="compressed-photo-container" onClick={onClick}>
      <img src={compressedPhotoUrl} alt={photo.title} />
    </div>
  );
}
