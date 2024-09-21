import { useState } from "react";

export default function Player({ name, symbol, isActive, handlePlayerAlias }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pName, setPName] = useState(name);

  function editClickHandler() {
    setIsEditing(() => !isEditing);
    if (isEditing) handlePlayerAlias(symbol, pName);
  }

  function handleChange(event) {
    setPName(() => event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing === false ? (
          <span className="player-name">{pName}</span>
        ) : (
          <input type="text" required value={pName} onChange={handleChange} />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editClickHandler}>
        {isEditing === true ? "Save" : "Edit"}
      </button>
    </li>
  );
}
