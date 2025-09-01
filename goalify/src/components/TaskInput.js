import React, { useState } from "react";
import "../styles/TaskInput.css";

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !time) return;

    const newTask = {
      id: Date.now(),
      text,
      time,
      completed: false,
    };

    addTask(newTask);
    setText("");
    setTime("");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="✍️ What’s your next big goal?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="goal-input"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="time-picker"
      />
      <button type="submit" className="add-btn">
        🚀 Add Goal
      </button>
    </form>
  );
}