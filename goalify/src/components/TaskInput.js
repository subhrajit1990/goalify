import React, { useState } from "react";
import "../styles/TaskInput.css";
import NobitaImg from "../assets/nobita.png";
import DoraemonImg from "../assets/doraemon.png";

/**
 * Props:
 *  - onAdd(goalText, time)
 *
 * This component renders Nobita (left) with a cloud-shaped input,
 * and Doraemon (right) — clicking Doraemon triggers onAdd.
 */
export default function TaskInput({ onAdd }) {
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");

  function handleAdd() {
    if (!goal.trim()) return;
    onAdd(goal.trim(), time || "");
    setGoal("");
    setTime("");
  }

  // allow Enter to add
  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="task-input-root">
      <div className="nobita-block">
        <img src={NobitaImg} alt="Nobita" className="character nobita" />
        <div className="cloud-bubble">
          <textarea
            className="cloud-textarea"
            placeholder="Enter your goal here..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
          />
          <div className="cloud-controls">
            <input
              className="time-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <div className="hint">Press Enter or click Doraemon to add</div>
          </div>
        </div>
      </div>

      <div className="doraemon-block" onClick={handleAdd} role="button" tabIndex={0}>
        <img src={DoraemonImg} alt="Doraemon" className="character doraemon" />
        <div className="doraemon-caption">Click Doraemon to add</div>
      </div>
    </div>
  );
}