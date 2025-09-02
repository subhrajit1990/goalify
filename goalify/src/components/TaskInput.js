import React, { useState } from "react";
import "../styles/TaskInput.css";
import nobitaImg from "../assets/nobita.png";
import doraemonImg from "../assets/doraemon.png";

export default function TaskInput({ onAdd }) {
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!goal.trim()) return;
    onAdd(goal, time);
    setGoal("");
    setTime("");
  };

  return (
    <div className="task-input-container">
      {/* Nobita crying with speech bubble input */}
      <div className="nobita-section">
        <img src={nobitaImg} alt="Nobita" className="nobita-img" />
        <div className="speech-bubble">
          <input
            type="text"
            placeholder="Enter your goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Doraemon button */}
      <div className="doraemon-section" onClick={handleAdd}>
        <img src={doraemonImg} alt="Doraemon" className="doraemon-img" />
        <span className="add-text">Add Goal</span>
      </div>
    </div>
  );
}