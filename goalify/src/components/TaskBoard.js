import React, { useState } from "react";
import TaskInput from "./TaskInput";
import StickyNote from "./StickyNote";
import "../styles/TaskBoard.css";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, fromPocket: true, x: 50, y: 50 }
    ]);
  };

  return (
    <div className="task-board">
      <TaskInput onAdd={handleAddTask} />
      <div id="notes-area" className="notes-area">
        {tasks.map((t) => (
          <StickyNote
            key={t.id}
            task={t}
            onDelete={(id) => setTasks((p) => p.filter((tt) => tt.id !== id))}
          />
        ))}
      </div>
    </div>
  );
}