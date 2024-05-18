import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { likePhoto, deletePhoto } from "../api/photo";
import { deletePhotoFromSet } from "../api/set";
import { isAuthenticated, isMe, useUser } from "../auth";
import { useQueryClient } from "react-query";
import ReactModal from "react-modal";
import ChooseSetWindow from "./ChooseSetWindow";
import "./styles/PhotoViewer.style.css";

export default function PhotoViewer({ isOpen, photo, onClose, set }) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  console.log(photo);
  const [liked, setLiked] = useState(false);
  const [score, setScore] = useState(photo.score);
  const [chooseSetOpen, setChooseSetOpen] = useState(false); // Состояние для показа/скрытия окна выбора набора

  const handleLike = useCallback(async () => {
    const success = await likePhoto(photo.id);
    if (!success) {
      return;
    }
    setScore((prev) => prev + (liked ? -1 : 1));
    setLiked((prev) => !prev);

    queryClient.invalidateQueries(["photo", photo.id]);
  }, [queryClient, photo, liked]);

  const handleDelete = useCallback(
    async (event) => {
      event.preventDefault();
      await deletePhoto(photo.id);
      queryClient.invalidateQueries(["userPhotos", photo.user.id]);
      queryClient.invalidateQueries(["set"]);
      queryClient.invalidateQueries(["newSets"]);
      queryClient.invalidateQueries(["popularPhotos"]);
      queryClient.invalidateQueries(["latestPhotos"]);

      onClose();
    },
    [onClose, photo, queryClient]
  );

  useEffect(() => {
    if (isAuthenticated(user)) {
      const userLike = photo.likes.find((like) => like === user.id);
      if (userLike) {
        setLiked(true);
      }
    }

    setScore(photo.score);
  }, [user, photo]);

  const handleAddToSet = () => {
    setChooseSetOpen(true);
  };

  const handleDeleteFromSet = async () => {
    if (await deletePhotoFromSet(set.id, photo.id)) {
      queryClient.invalidateQueries(["userSets", user.id]);
      queryClient.invalidateQueries(["set", set.id]);
      onClose();
    }
  };

  const formattedDate = new Date(photo.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="photo-viewer"
      overlayClassName="photo-viewer-overlay"
      appElement={document.getElementById("root")}
    >
      <button onClick={onClose} className="close-button" />
      <img src={photo.URL} alt={photo.title} className="photo-viewer__photo" />
      <div className="photo-viewer__info">
        <Link to={`/profile/${photo.user.id}`} className="photo-viewer__author">
          Автор: {isMe(user, photo.user.id) ? "Вы" : photo.user.login}
        </Link>
        {photo.description && (
          <div className="photo-viewer__description">
            Описание: {photo.description}
          </div>
        )}
        <div className="photo-viewer__create-date">
          Загружено: {formattedDate}
        </div>
        <div className="photo-viewer__score">Рейтинг: {score}</div>
        {isAuthenticated(user) && (
          <div className="photo-viewer__actions">
            <button
              onClick={handleLike}
              className={`like-button ${liked ? "active" : ""}`}
            >
              Лайк
            </button>
            <button onClick={handleAddToSet} className="add-to-set-button">
              Добавить в набор
            </button>
            {set && isMe(user, set.user.id) && (
              <button
                onClick={handleDeleteFromSet}
                className="delete-from-set-button"
              >
                Удалить из набора
              </button>
            )}
            {isMe(user, photo.user.id) && (
              <button onClick={handleDelete} className="delete-button">
                Удалить
              </button>
            )}
          </div>
        )}
      </div>
      {chooseSetOpen && (
        <ChooseSetWindow
          isOpen={chooseSetOpen}
          onClose={() => setChooseSetOpen(false)}
          photoId={photo.id}
        />
      )}
    </ReactModal>
  );
}
