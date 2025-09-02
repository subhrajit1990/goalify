import React, { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import StickyNote from "./StickyNote";
import "../styles/TaskBoard.css";

const STORAGE = "goalify_tasks_v1";
const NOTE_COLORS = ["#FFD93D", "#FF6B6B", "#6BCB77", "#4D96FF", "#F7A8B8"];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(tasks)); } catch {}
  }, [tasks]);

  function handleAddTask(text, time) {
    const color = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
    const newTask = {
      id: Date.now(),
      text,
      time: time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      color,
      status: "active",
      x: 40, // initial spawn position (near Doraemon pocket in your layout)
      y: 260,
      fromPocket: true
    };
    setTasks((p) => [...p, newTask]);
  }

  function handleMove(id, x, y) {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, x, y, fromPocket: false } : t)));
  }
  function handleComplete(id) {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, status: "done" } : t)));
  }
  function handleReschedule(id) {
    const newTime = prompt("Enter new time (HH:MM)", "");
    if (!newTime) return;
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, time: newTime } : t)));
  }
  function handleDelete(id) {
    if (!window.confirm("Delete this note?")) return;
    setTasks((p) => p.filter((t) => t.id !== id));
  }

  return (
    <div className="taskboard-container">
      <TaskInput onAdd={handleAddTask} />

      <div id="notes-area" className="notes-area">
        {tasks.map((t, i) => (
          <StickyNote
            key={t.id}
            task={t}
            zIndex={100 + i}
            onMove={handleMove}
            onComplete={handleComplete}
            onReschedule={handleReschedule}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}