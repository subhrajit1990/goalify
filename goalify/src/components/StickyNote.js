import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import "../styles/StickyNote.css";

export default function StickyNote({
  task,
  onMove = () => {},
  onComplete = () => {},
  onReschedule = () => {},
  onDelete = () => {},
  zIndex = 1,
}) {
  const nodeRef = useRef(null);

  const tiltClass = useMemo(
    () => (Math.random() > 0.5 ? "tilt-left" : "tilt-right"),
    []
  );

  const [fromPocket, setFromPocket] = useState(Boolean(task.fromPocket));
  const [showRescheduler, setShowRescheduler] = useState(false);
  const [newTime, setNewTime] = useState(task.time || "");

  useEffect(() => {
    if (task.fromPocket) {
      const t = setTimeout(() => setFromPocket(false), 900);
      return () => clearTimeout(t);
    }
  }, [task.fromPocket]);

  function handleStop(_e, data) {
    onMove(task.id, data.x, data.y);
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: task.x || 0, y: task.y || 0 }}
      bounds="#notes-area"
      cancel=".note-actions, .note-actions *, .reschedule-box, .reschedule-box *"
      onStop={handleStop}
    >
      <div
        ref={nodeRef}
        className={`sticky-note ${tiltClass} ${
          task.completed ? "done" : ""
        } ${fromPocket ? "from-pocket" : ""}`}
        style={{
          background: task.color || "#FFD93D",
          zIndex,
          touchAction: "none",
        }}
      >
        <div className="note-pin">📌</div>

        <div className="note-body">
          <div className="note-title">{task.text}</div>
          {task.time ? <div className="note-time">⏰ {task.time}</div> : null}
        </div>

        <div className="note-actions">
          {!task.completed && (
            <button
              className="action-btn"
              onClick={() => onComplete(task.id)}
              title="Mark as done"
            >
              ✅
            </button>
          )}

          <button
            className="action-btn"
            onClick={() => setShowRescheduler((s) => !s)}
            title="Reschedule"
          >
            🔄
          </button>

          <button
            className="action-btn"
            onClick={() => onDelete(task.id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>

        {showRescheduler && (
          <div className="reschedule-box">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
            <button
              className="reschedule-save"
              onClick={() => {
                onReschedule(task.id, newTime);
                setShowRescheduler(false);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </Draggable>
  );
}