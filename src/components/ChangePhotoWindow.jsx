export default function ChangePhotoWindow({ onClose }) {
  return (
    <div className="change-photo-window">
      <button className="close-button" onClick={onClose} />
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
      </div>
    </div>
  );
}
