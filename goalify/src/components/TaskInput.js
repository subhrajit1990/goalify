import React, { useState } from "react";
import nobitaImg from "../assets/nobita.png";
import doraemonImg from "../assets/doraemon.png";
import "../styles/TaskInput.css";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!text.trim() || !time) return;

    const newTask = {
      id: Date.now(),
      text,
      time,
      status: "pending",
      color: "#FFD93D",
      x: 50,
      y: 50,
      fromPocket: true
    };

    onAdd(newTask);
    setText("");
    setTime("");
  };

  return (
    <div className="task-input-container">
      {/* Nobita with bubble */}
      <div className="nobita-container">
        <img src={nobitaImg} alt="Nobita" className="nobita-img" />

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
      </div>

      {/* Doraemon with Add Button */}
      <div className="doraemon-wrapper">
        <img src={doraemonImg} alt="Doraemon" className="doraemon-img" />
        <button className="add-btn" onClick={handleAdd}>
          ➕ Add Goal
        </button>
      </div>
    </div>
  );
}