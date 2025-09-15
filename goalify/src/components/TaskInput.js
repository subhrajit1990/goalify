import React, { useState } from "react";
import "../styles/TaskInput.css";
import nobitaImg from "../assets/nobita.png";   // Nobita with bubble
import doraemonImg from "../assets/doraemon.png"; // Doraemon image

export default function TaskInput({ onAdd }) {
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!goal.trim()) return;
    onAdd({ text: goal, date, id: Date.now() });
    setGoal("");
    setDate("");
  };

  return (
    <div className="taskinput-container">
      {/* Nobita with bubble and inputs inside */}
      <div className="nobita-container">
        <img src={nobitaImg} alt="Nobita" className="nobita-image" />
        <div className="bubble-inputs">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter goal..."
            className="goal-input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
          <button onClick={handleAdd} className="add-btn">
            +
          </button>
        </div>
      </div>

      {/* Doraemon trigger */}
      <div className="doraemon-container" onClick={handleAdd}>
        <img src={doraemonImg} alt="Doraemon" className="doraemon-image" />
        <p className="doraemon-hint">Click me!</p>
      </div>
    </div>
  );
}