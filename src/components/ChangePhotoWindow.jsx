import { useMutation, useQueryClient } from "react-query";
import ReactModal from "react-modal";
import "./styles/ChangePhotoWindow.style.css";
import { changeUserPhoto } from "../api/user";
import { useUser } from "../auth";

export default function ChangePhotoWindow({ isOpen, onClose }) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["profilePhoto", user.id],
    (formData) => changeUserPhoto(user.id, formData),
    {
      onSuccess: () => {
        console.log("ChangePhotoWindow: successfully changed profile photo");
        queryClient.invalidateQueries(["profilePhoto", user.id]);
        onClose();
      },
    }
  );

  const handleSubmit = (event) => {
    console.log("ChangePhotoWindow: handling form submit");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className="change-photo-window"
      overlayClassName="change-photo-window-overlay"
      onRequestClose={onClose}
    >
      <button className="close-button" onClick={onClose} />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="change-photo-window__actions">
          <label htmlFor="file-input" className="change-photo-window__label">
            выбрать фото
          </label>
          <input
            id="file-input"
            type="file"
            name="file"
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
    </ReactModal>
  );
}
