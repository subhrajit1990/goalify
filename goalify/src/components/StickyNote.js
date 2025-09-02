import React from "react";
import Draggable from "react-draggable";
import "../styles/StickyNote.css";

const colors = ["#FFD93D", "#FF6B6B", "#6BCB77", "#4D96FF"];

const StickyNote = ({ task, onUpdate, onDelete }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Draggable>
      <div className="sticky-note" style={{ backgroundColor: randomColor }}>
        <h4>{task.text}</h4>
        <p className="time">{task.time}</p>
        <div className="note-actions">
          <button onClick={() => onUpdate(task.id, "completed")}>✅</button>
          <button onClick={() => onUpdate(task.id, "rescheduled")}>📅</button>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </div>
      </div>
    </Draggable>
  );
};

export default StickyNote;