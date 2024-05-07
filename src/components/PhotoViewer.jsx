import React from "react";
import { Link } from "react-router-dom";
import { deletePhoto, readPhoto } from "../api/photo";

export default function PhotoViewer({ photo, user, onClose }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    console.log("PhotoViewer useEffect started");
    (async () => {
      console.log("Reading photo", photo.id);
      const res = await readPhoto(photo.id);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPhotoUrl(url);
      console.log("Photo read, setting photoUrl", photoUrl);
    })();
    console.log("PhotoViewer useEffect finished");
  }, [photo.id]);

  const deleteHandler = (event) => {
    console.log("deleteHandler called");
    event.preventDefault();
    deletePhoto(photo.id);
    onClose();
  };

  return (
    <div className="photo-viewer">
      <button onClick={onClose} className="close-button" />
      <img src={photoUrl} alt={photo.title} className="photo-viewer__photo" />
      <div className="photo-viewer__info">
        <Link to={`/profile/${photo.user.id}`} className="photo-viewer__author">
          {isMe(user, photo.user.id) ? "Вы" : photo.user.login}
        </Link>
        <h3 className="photo-viewer__title">{photo.title}</h3>
        <div className="photo-viewer__actions">
          <button className="like-button">{photo.rate}</button>
          {isMe(user, photo.user.id) && (
            <button onClick={deleteHandler} className="delete-button">
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
