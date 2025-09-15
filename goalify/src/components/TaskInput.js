import React, { useState } from "react";
import "../styles/TaskInput.css";
import nobitaImg from "../assets/nobita.png";
import doraemonImg from "../assets/doraemon.png";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text,
      date,
      time,
      status: "pending",
      color: getRandomColor(),
      fromPocket: true,
    };
    onAdd(newTask);
    setText("");
    setDate("");
    setTime("");
  };

  const getRandomColor = () => {
    const colors = ["#FFD93D", "#FF6B6B", "#6BCB77", "#4D96FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="task-input-container">
      {/* Nobita with speech bubble */}
      <div className="nobita-section">
        <img src={nobitaImg} alt="Nobita" className="character nobita" />
        <div className="bubble">
          <input
            type="text"
            placeholder="Enter your goal..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="date-time">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Doraemon button */}
      <div className="doraemon-section" onClick={handleAdd}>
        <img src={doraemonImg} alt="Doraemon" className="character doraemon" />
        <div className="pocket-hint">🎒 Click me!</div>
      </div>
    </div>
  );
}