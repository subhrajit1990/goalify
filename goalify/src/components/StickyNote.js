import React from "react";
import "../styles/StickyNote.css";

export default function StickyNote({ task, onComplete, onDelete, onReschedule }) {
  const randomTilt = Math.random() > 0.5 ? "tilt-left" : "tilt-right";

  return (
    <div
      className={`sticky-note ${randomTilt}`}
      style={{ "--note-color": task.color }}
    >
      <div className="note-content">
        <h4 className="note-title">{task.text}</h4>
        <p className="note-time">⏰ {task.time}</p>
      </div>

      <div className="note-actions">
        <button
          className="note-btn complete"
          onClick={() => onComplete(task.id)}
          title="Mark as Done"
        >
          ✅
        </button>
        <button
          className="note-btn reschedule"
          onClick={() => onReschedule(task.id)}
          title="Reschedule"
        >
          🔄
        </button>
        <button
          className="note-btn delete"
          onClick={() => onDelete(task.id)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}