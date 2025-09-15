import React, { useState } from "react";
import "../styles/TaskInput.css";
import nobitaImg from "../assets/nobita.png";
import doraemonImg from "../assets/doraemon.png";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd({
      id: Date.now(),
      text,
      time,
      status: "pending",
      color: "#FFD93D"
    });
    setText("");
    setTime("");
  };

  return (
    <div className="taskinput-container">
      {/* Nobita with thought bubble */}
      <div className="nobita-wrapper">
        <div className="thought-bubble">
          <input
            type="text"
            placeholder="Enter goal..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <img src={nobitaImg} alt="Nobita" className="nobita-img" />
      </div>

      {/* Doraemon with Add Goal button */}
      <div className="doraemon-wrapper">
        <img src={doraemonImg} alt="Doraemon" className="doraemon-img" />
        <button className="add-btn" onClick={handleAdd}>
          ➕ Add Goal
        </button>
      </div>
    </div>
  );
}