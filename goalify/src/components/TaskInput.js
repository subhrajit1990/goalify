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
      color: "#FFD93D",
      fromPocket: true,
    });
    setText("");
    setTime("");
  };

  return (
    <div className="taskinput-container">
      {/* Nobita with bubble */}
      <div className="nobita-container">
        <img src={nobitaImg} alt="Nobita" className="character nobita" />
        <div className="speech-bubble">
          <input
            type="text"
            placeholder="Enter goal..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Doraemon with Add Button */}
      <div className="doraemon-container">
        <img src={doraemonImg} alt="Doraemon" className="character doraemon" />
        <button className="add-btn" onClick={handleAdd}>
          ➕
        </button>
      </div>
    </div>
  );
}