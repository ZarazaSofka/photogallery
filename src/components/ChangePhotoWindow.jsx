import { changeProfilePhoto } from "../api/user";

import { useMutation, useQueryClient } from "react-query";

export default function ChangePhotoWindow({ user, onClose }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["changeProfilePhoto", user.id],
    (formData) => changeProfilePhoto(user.id, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profilePhoto");
        onClose();
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <div className="change-photo-window">
      <button className="close-button" onClick={onClose} />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="change-photo-window__actions">
          <label htmlFor="file-input" className="change-photo-window__label">
            выбрать фото
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="change-photo-window__input"
          />
          <button
            type="submit"
            className="change-photo-window__submit"
            disabled={mutation.isLoading}
          >
            загрузить
          </button>
        </div>
      </form>
    </div>
  );
}
