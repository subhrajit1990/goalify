import React, { useState } from "react";
import "../styles/TaskInput.css";
import nobitaImg from "../assets/nobita.png";   // Nobita image
import doraemonImg from "../assets/doraemon.png"; // Doraemon image

export default function TaskInput({ onAdd }) {
  const [goal, setGoal] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleAdd = () => {
    if (goal.trim() === "" || dateTime === "") return;
    onAdd({ goal, dateTime });
    setGoal("");
    setDateTime("");
  };

  return (
    <div>
      {/* Nobita with bubble */}
      <div className="nobita-container">
        <div className="thought-bubble">
          <input
            type="text"
            placeholder="Enter goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <img src={nobitaImg} alt="Nobita" className="nobita-img" />
      </div>

      {/* Doraemon with Add Goal button */}
      <div className="doraemon-wrapper">
        <img src={doraemonImg} alt="Doraemon" className="doraemon-img" />
        <button className="add-btn" onClick={handleAdd}>
          <span>➕</span> Add Goal
        </button>
      </div>
    </div>
  );
}