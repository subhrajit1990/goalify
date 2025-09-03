import React from "react";
import StickyNote from "./StickyNote";
import TaskInput from "./TaskInput";
import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/TaskBoard.css";

export default function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const handleAddTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, fromPocket: true, x: 50, y: 50 }
    ]);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: true } : t
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
        {tasks.map((t) => (
          <StickyNote
            key={t.id}
            task={t}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onReschedule={handleReschedule}
          />
        ))}
      </div>
    </div>
  );
}