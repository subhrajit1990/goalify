import React from "react";
import StickyNote from "./StickyNote";
import "../styles/TaskBoard.css";

export default function TaskBoard({ tasks = [], updateTask, deleteTask }) {
  // If parent didn't supply updateTask/deleteTask, set safe fallbacks:
  const safeUpdate = typeof updateTask === "function" ? updateTask : (id, patch) => {
    console.warn("updateTask not provided:", id, patch);
  };
  const safeDelete = typeof deleteTask === "function" ? deleteTask : (id) => {
    console.warn("deleteTask not provided:", id);
  };

  function handleComplete(id) {
    // example: mark done
    // read the previous values (you may want to pass the whole task)
    safeUpdate(id, { status: "done" });
  }

  function handleReschedule(id) {
    const newDate = prompt("Enter new date/time (YYYY-MM-DDTHH:MM)", new Date().toISOString().slice(0,16));
    if (!newDate) return;
    safeUpdate(id, { dueAt: newDate, reminderAt: newDate, status: "active" });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this note?")) return;
    safeDelete(id);
  }

  return (
    <div className="task-board" id="notes-grid" style={{ position: "relative" }}>
      {tasks.map((t, i) => {
        const anims = ["float1","float2","float3"];
        const anim = anims[i % anims.length];
        const style = { animation: `${anim} ${5 + (i % 3)}s ease-in-out infinite`, zIndex: t.z || 0 };
        return (
          <StickyNote
            key={t.id}
            task={t}
            style={style}
            onComplete={handleComplete}
            onReschedule={handleReschedule}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}