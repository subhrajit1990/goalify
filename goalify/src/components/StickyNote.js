import React, { useState } from "react";
import Draggable from "react-draggable";
import "../styles/StickyNote.css";

function StickyNote({ task, updateTask, deleteTask }) {
  const [pos, setPos] = useState({ x: task.x, y: task.y });

  const handleDragStop = (e, data) => {
    setPos({ x: data.x, y: data.y });
    updateTask(task.id, { ...task, x: data.x, y: data.y });
  };

  const completeTask = () =>
    updateTask(task.id, { ...task, status: "completed" });

  const rescheduleTask = () =>
    updateTask(task.id, { ...task, status: "rescheduled" });

  return (
    <Draggable position={pos} onStop={handleDragStop}>
      <div
        className={`sticky-note ${task.status}`}
        style={{ background: task.color }}
      >
        <h3>{task.title}</h3>
        {task.time && <p>⏰ {task.time}</p>}
        <div className="note-actions">
          <button onClick={completeTask}>✅</button>
          <button onClick={rescheduleTask}>📅</button>
          <button onClick={() => deleteTask(task.id)}>🗑️</button>
        </div>
      </div>
    </Draggable>
  );
}

export default StickyNote;