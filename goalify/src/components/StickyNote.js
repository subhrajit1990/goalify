import React, { useRef } from "react";
import Draggable from "react-draggable";
import "../styles/StickyNote.css";

export default function StickyNote({ task, onComplete, onDelete, onReschedule }) {
  const nodeRef = useRef(null); // ✅ create ref

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className={`sticky-note ${task.completed ? "done" : ""}`}>
        <h4>{task.text}</h4>
        <p>⏰ {task.time}</p>

        <div className="note-actions">
          <button onClick={() => onComplete(task.id)}>✅</button>
          <button onClick={() => onReschedule(task.id)}>📅</button>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </div>
      </div>
    </Draggable>
  );
}