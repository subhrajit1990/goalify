import React, { useState } from "react";
import "../styles/TaskInput.css";
import NobitaImg from "../assets/nobita.png";
import DoraemonImg from "../assets/doraemon.png";

export default function TaskInput({ onAdd }) {
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!goal.trim()) return;
    onAdd({ text: goal, time, id: Date.now() });
    setGoal("");
    setTime("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="task-input-wrapper">
      {/* Nobita side */}
      <div className="nobita-side">
        <img src={NobitaImg} alt="Nobita" className="nobita-img" />
        <div className="speech-cloud" role="group" aria-label="Goal input">
          <input
            type="text"
            className="goal-input"
            placeholder="Enter your goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Goal text"
          />
          <input
            type="time"
            className="time-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-label="Goal time"
          />
        </div>
      </div>

      {/* Doraemon side (large touch target) */}
      <div
        className="doraemon-side"
        onClick={handleAdd}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        aria-label="Add goal (Doraemon)"
      >
        <div className="doraemon-hit">
          <img
            src={DoraemonImg}
            alt="Doraemon"
            className="doraemon-img clickable"
          />
        </div>
        <p className="doraemon-text">Add Goal</p>
      </div>
    </div>
  );
}