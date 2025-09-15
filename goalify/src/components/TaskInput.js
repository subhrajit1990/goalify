import React, { useState } from "react";
import "../styles/TaskInput.css";
import nobitaImg from "../assets/nobita.png";
import doraemonImg from "../assets/doraemon.png";

export default function TaskInput({ onAdd }) {
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!goal.trim()) return;
    onAdd({
      id: Date.now(),
      text: goal,
      date,
      time,
      fromPocket: true,
    });
    setGoal("");
    setDate("");
    setTime("");
  };

  return (
    <div className="taskinput-container">
      {/* Nobita with bubble */}
      <div className="nobita-wrapper">
        <div className="bubble">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter your goal..."
            className="goal-input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="time-input"
          />
        </div>
        <img src={nobitaImg} alt="Nobita" className="nobita-image" />
      </div>

      {/* Doraemon as Add button */}
      <div className="doraemon-container" onClick={handleAdd}>
        <img src={doraemonImg} alt="Doraemon" className="doraemon-image" />
        <p className="doraemon-hint">🎒 Click Doraemon to add your goal!</p>
      </div>
    </div>
  );
}