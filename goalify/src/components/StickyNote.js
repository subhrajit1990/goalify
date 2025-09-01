import React from "react";
import Draggable from "react-draggable";
import "./StickyNote.css";

const COLORS = ["#FFEB3B", "#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFE0B2", "#E1BEE7", "#D1FFD6", "#FFE8B9"];

export default function StickyNote({ task, onComplete, onReschedule, onDelete, onDragStop, onDragStart, parentId, style }) {
  const color = task.color || COLORS[Math.floor(Math.random() * COLORS.length)];
  const statusClass = task.status === "done" ? "done" : task.status === "missed" ? "missed" : "";

  // defaultPosition: if task.pos exists use it, otherwise compute a random spot near top-left
  const defaultPos = task.pos ? { x: task.pos.x, y: task.pos.y } : { x: 20 + Math.floor(Math.random() * 300), y: 20 + Math.floor(Math.random() * 200) };

  // react-draggable bounds: restrict within parent by id (string). If no parentId, bounds undefined.
  const bounds = parentId ? `#${parentId}` : undefined;

  return (
    <Draggable defaultPosition={defaultPos} bounds={bounds} onStop={onDragStop} onStart={onDragStart}>
      <div className={`sticky-note ${statusClass}`} style={{ background: color, ...style, zIndex: task.z || 0 }}>
        <h3>{task.title}</h3>
        <p>{task.dueAt ? new Date(task.dueAt).toLocaleString() : (task.reminderAt ? new Date(task.reminderAt).toLocaleString() : "No date")}</p>
        <div className="note-actions">
          <button title="Complete" onClick={onComplete}>✅</button>
          <button title="Reschedule" onClick={onReschedule}>🔄</button>
          <button title="Delete" onClick={onDelete}>❌</button>
        </div>
      </div>
    </Draggable>
  );
}