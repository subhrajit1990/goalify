import React from "react";
import "./StickyNote.css";

export default function StickyNote({ task, onDelete, onComplete, onReschedule }) {
  return (
    <div className="sticky-note">
      <h4>{task.text}</h4>
      {task.time && <p className="note-time">⏰ {task.time}</p>}
      <div className="note-actions">
        <button onClick={() => onComplete(task.id)}>✅</button>
        <button onClick={() => onReschedule(task.id)}>🔄</button>
        <button onClick={() => onDelete(task.id)}>❌</button>
      </div>
    </div>
  );
}