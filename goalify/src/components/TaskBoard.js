import React, { useEffect, useState } from "react";
import StickyNote from "./StickyNote";
import TaskInput from "./TaskInput";
import "../styles/TaskBoard.css";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // persist
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // strict grid position so notes don’t overlap
  const getGridPosition = (index) => {
    const NOTE_W = 200;   // should match .sticky-note width (desktop)
    const GAP = 20;
    const COLS = 3;       // columns on wide screens (mobile will still be fine)
    const x = 20 + (index % COLS) * (NOTE_W + GAP);
    const y = 20 + Math.floor(index / COLS) * (NOTE_W + GAP);
    return { x, y };
  };

  // Add
  const handleAddTask = (task) => {
    const index = tasks.length;
    const { x, y } = getGridPosition(index);
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: task.id ?? Date.now(),
        completed: false,
        fromPocket: true,
        x,
        y,
      },
    ]);
  };

  // Move (drag stop)
  const handleMove = (id, x, y) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
  };

  // Done
  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  };

  // Reschedule (inline picker supplies newTime)
  const handleReschedule = (id, newTime) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, time: newTime ?? "", completed: false } : t
      )
    );
  };

  // Delete
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="task-board">
      <TaskInput onAdd={handleAddTask} />

      <div id="notes-area" className="notes-area">
        {tasks.map((t, i) => (
          <StickyNote
            key={t.id}
            task={t}
            onMove={handleMove}
            onComplete={handleComplete}
            onReschedule={handleReschedule}
            onDelete={handleDelete}
            zIndex={i + 1}
          />
        ))}
      </div>
    </div>
  );
}