import React, { useEffect, useState } from "react";
import StickyNote from "./StickyNote";
import TaskInput from "./TaskInput";
import "../styles/TaskBoard.css";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task → staggered grid positioning
  const handleAddTask = (task) => {
    const index = tasks.length;
    const x = 40 + (index % 4) * 160; // column-based positioning
    const y = 40 + Math.floor(index / 4) * 160; // row-based positioning

    setTasks((prev) => [
      ...prev,
      { ...task, fromPocket: true, x, y, status: "pending" },
    ]);
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Complete task
  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "done" } : t
      )
    );
  };

  // Reschedule task → clear time
  const handleReschedule = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, time: "⏳ Reschedule pending" } : t
      )
    );
  };

  // Update sticky note position
  const handleMove = (id, x, y) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, x, y } : t))
    );
  };

  return (
    <div className="task-board">
      {/* Nobita + Doraemon Input */}
      <TaskInput onAdd={handleAddTask} />

      {/* Sticky Notes Area */}
      <div id="notes-area" className="notes-area">
        {tasks.map((t, i) => (
          <StickyNote
            key={t.id}
            task={t}
            onMove={handleMove}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onReschedule={handleReschedule}
            zIndex={i + 1}
          />
        ))}
      </div>
    </div>
  );
}