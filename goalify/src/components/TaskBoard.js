import React from "react";
import StickyNote from "./StickyNote";
import TaskInput from "./TaskInput";
import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/TaskBoard.css";

export default function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const handleAddTask = (task) => {
    const index = tasks.length;
    const col = index % 3; // 3 columns for wider screens
    const row = Math.floor(index / 3);

    setTasks((prev) => [
      ...prev,
      {
        ...task,
        fromPocket: true,
        x: col * 220, // spacing between stickies
        y: row * 220,
      },
    ]);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "done" } : t
      )
    );
  };

  const handleReschedule = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, time: "" } : t
      )
    );
  };

  return (
    <div className="task-board">
      <TaskInput onAdd={handleAddTask} />

      <div id="notes-area" className="notes-area">
        {tasks.map((t, i) => (
          <StickyNote
            key={t.id}
            task={t}
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