import React, { useRef } from "react";
import Draggable from "react-draggable";
import "../styles/StickyNote.css";

export default function StickyNote({ task, onComplete, onDelete, onReschedule }) {
  // Fix for React 18: use nodeRef instead of findDOMNode
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} className={`sticky-note ${task.completed ? "completed" : ""}`}>
        <h4>{task.text}</h4>
        <p className="time">⏰ {task.time}</p>
        <div className="actions">
          {!task.completed && (
            <button className="complete-btn" onClick={() => onComplete(task.id)}>
              ✅ Complete
            </button>
          )}
          <button className="reschedule-btn" onClick={() => onReschedule(task.id)}>
            📅 Reschedule
          </button>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            ❌ Delete
          </button>
        </div>
      </div>
    </Draggable>
  );
}