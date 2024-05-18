import React, { useState } from "react";
import { createSet } from "../api/set";
import ReactModal from "react-modal";
import "./styles/CreateSetWindow.style.css";

export default function CreateSetWindow({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdSet = await createSet(name);
    onCreate(createdSet);
    onClose(createdSet);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className="create-set-window"
      overlayClassName="create-set-window-overlay"
      contentLabel="Создание набора"
      onRequestClose={handleCancel}
      appElement={document.getElementById("root")}
    >
      <form className="create-set-window__form" onSubmit={handleSubmit}>
        <label className="create-set-window__label">
          Имя набора:{" "}
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button className="create-set-window__submit" type="submit">
          создать
        </button>
        <button className="create-set-window__cancel" onClick={handleCancel}>
          отмена
        </button>
      </form>
    </ReactModal>
  );
}
