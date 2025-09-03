import React, { useState } from "react";
import "../styles/TaskInput.css";
import NobitaImg from "../assets/nobita.png";
import DoraemonImg from "../assets/doraemon.png";

export default function TaskInput({ onAdd = () => {} }) {
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!goal.trim()) return;
    onAdd({ text: goal, time, id: Date.now() });
    setGoal("");
    setTime("");
  };

  return (
    <div className="task-input-wrapper">
      {/* Nobita side with speech cloud */}
      <div className="nobita-side">
        <img src={NobitaImg} alt="Nobita" className="nobita-img" />
        <div className="speech-cloud">
          <input
            type="text"
            className="goal-input"
            placeholder="Enter your goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input
            type="time"
            className="time-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Doraemon side */}
      <div className="doraemon-side" onClick={handleAdd}>
        <img
          src={DoraemonImg}
          alt="Doraemon"
          className="doraemon-img clickable"
        />
        <p className="doraemon-text">Add Goal</p>
      </div>
    </div>
  );
}