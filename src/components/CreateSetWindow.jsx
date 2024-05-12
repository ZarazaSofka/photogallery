import React, { useState } from "react";

import { createSet } from "../api/set";

import ReactModal from "react-modal";

export default function CreateSetWindow({ user, isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const set = { name, userId: user.id };
    const createdSet = await createSet(set);
    onCreate(createdSet);
    onClose(createdSet);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <ReactModal isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <label>
          Имя набора:{" "}
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button type="submit">создать</button>
        <button onClick={handleCancel}>отмена</button>
      </form>
    </ReactModal>
  );
}
