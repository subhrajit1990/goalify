import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import "../styles/StickyNote.css";

export default function StickyNote({
  task,
  onComplete,
  onReschedule,
  onDelete,
  zIndex
}) {
  const nodeRef = useRef(null);
  const tiltClass = useMemo(
    () => (Math.random() > 0.5 ? "tilt-left" : "tilt-right"),
    []
  );
  const [fromPocket, setFromPocket] = useState(Boolean(task.fromPocket));

  useEffect(() => {
    if (task.fromPocket) {
      const t = setTimeout(() => setFromPocket(false), 900);
      return () => clearTimeout(t);
    }
  }, [task.fromPocket]);

  function handleStop(_e, data) {
    // Save draggable position later if needed
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: task.x || 0, y: task.y || 0 }}
      bounds="#notes-area"
      cancel=".note-actions, .note-actions *"
      onStop={handleStop}
    >
      <div
        ref={nodeRef}
        className={`sticky-note ${tiltClass} ${
          task.status === "done" ? "done" : ""
        } ${fromPocket ? "from-pocket" : ""}`}
        style={{
          background: task.color || "#FFD93D",
          zIndex,
          touchAction: "none"
        }}
      >
        <div className="note-pin">📌</div>

        <div className="note-body">
          <div className="note-title">{task.text}</div>
          <div className="note-time">⏰ {task.time}</div>
        </div>

        <div className="note-actions">
          {task.status !== "done" && (
            <button className="action-btn" onClick={() => onComplete(task.id)}>
              ✅
            </button>
          )}
          <button
            className="action-btn"
            onClick={() => {
              const newTime = prompt(
                "Enter new date & time (YYYY-MM-DD HH:mm):",
                task.time || ""
              );
              if (newTime) {
                onReschedule(task.id, newTime);
              }
            }}
          >
            🔄
          </button>
          <button className="action-btn" onClick={() => onDelete(task.id)}>
            🗑️
          </button>
        </div>
      </div>
    </Draggable>
  );
}