import React, { useState } from "react";
import "./TaskInput.css";
import nobitaImg from "./nobita.png"; // use your nobita image with bubble

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
    <div className="nobita-container">
      <img src={nobitaImg} alt="Nobita" className="nobita-image" />

      {/* Positioned inside the bubble */}
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
        <button onClick={handleAdd} className="add-btn">+</button>
      </div>
    </div>
  );
}