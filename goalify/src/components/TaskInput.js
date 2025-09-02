import React, { useState } from "react";
import "../styles/TaskInput.css";
import nobitaImg from "../assets/nobita.png";
import doraemonImg from "../assets/doraemon.png";

export default function TaskInput({ onAdd }) {
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (goal && time) {
      onAdd(goal, time);
      setGoal("");
      setTime("");
    }
  };

  return (
    <div className="task-input-container">
      {/* Nobita crying with cloud bubble */}
      <div className="nobita-section">
        <img src={nobitaImg} alt="Nobita" className="character nobita" />
        <div className="speech-bubble">
          <input
            type="text"
            placeholder="Enter your goal here..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input
            type="time"
            className="time-picker"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Doraemon to trigger add */}
      <div className="doraemon-section" onClick={handleAdd}>
        <img src={doraemonImg} alt="Doraemon" className="character doraemon" />
        <p className="click-hint">Click Doraemon to add</p>
      </div>
    </div>
  );
}