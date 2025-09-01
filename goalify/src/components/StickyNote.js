import React, { useRef } from "react";
import Draggable from "react-draggable";
import "../styles/StickyNote.css";

/**
 * Props:
 * - task: { id, title, time, status, ... }
 * - onComplete(id)
 * - onReschedule(id)
 * - onDelete(id)
 * - style (optional inline styles like animation, zIndex)
 */
export default function StickyNote({
  task,
  onComplete = () => {},
  onReschedule = () => {},
  onDelete = () => {},
  style = {}
}) {
  const nodeRef = useRef(null);

  return (
    // cancel ensures clicking buttons doesn't start dragging
    <Draggable nodeRef={nodeRef} bounds="parent" cancel=".note-actions button">
      <div
        ref={nodeRef}
        className={`sticky-note ${task?.status || ""}`}
        style={{ background: task?.color || "#FFD", ...style }}
      >
        <h3 style={{ margin: 0 }}>{task?.title ?? task?.text ?? "Untitled"}</h3>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "rgba(0,0,0,0.6)" }}>
          {task?.dueAt
            ? new Date(task.dueAt).toLocaleString()
            : task?.time
            ? task.time
            : "No date"}
        </p>

        <div className="note-actions" style={{ marginTop: 10 }}>
          {/* handlers are safe (default no-op) so clicks won't crash */}
          {task?.status !== "done" && (
            <button onClick={() => onComplete(task.id)} title="Complete">
              ✅
            </button>
          )}
          <button onClick={() => onReschedule(task.id)} title="Reschedule">
            🔄
          </button>
          <button onClick={() => onDelete(task.id)} title="Delete">
            ❌
          </button>
        </div>
      </div>
    </Draggable>
  );
}