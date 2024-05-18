import React from "react";
import { useUser } from "../auth";
import { useQuery, useQueryClient } from "react-query";
import { readUserSets, addPhotoToSet } from "../api/set";
import "./styles/ChooseSetWindow.style.css";

export default function ChooseSetWindow({ onClose, photoId }) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    data: userSets,
    isLoading,
    isError,
  } = useQuery(["userSets", user.id], () => readUserSets(user.id));

  const handleSetSelection = async (setId) => {
    if (await addPhotoToSet(setId, photoId)) {
      queryClient.invalidateQueries(["set", setId]);
      queryClient.invalidateQueries(["userSets", user.id]);
    } else alert("Не получилось добавить фотографию в набор");
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="choose-set-window">
      <h2 className="choose-set-window__title">Выберите набор</h2>
      {isLoading ? (
        <p className="choose-set-window__loading">Loading...</p>
      ) : isError ? (
        <p className="choose-set-window__error">Ошибка загрузки наборов</p>
      ) : (
        <React.Fragment>
          {userSets.filter((set) => !set.photoList.includes(photoId)).length >
          0 ? (
            <div className="choose-set-window__set-list">
              {userSets
                .filter((set) => !set.photoList.includes(photoId))
                .map((set) => (
                  <div
                    key={set.id}
                    onClick={() => handleSetSelection(set.id)}
                    className="choose-set-window__set"
                  >
                    {set.name}
                  </div>
                ))}
            </div>
          ) : (
            <p className="choose-set-window__error">
              Нет подходящих наборов фотографий
            </p>
          )}
        </React.Fragment>
      )}
      <button onClick={handleCancel} className="choose-set-window__cancel">
        Отмена
      </button>
    </div>
  );
}
