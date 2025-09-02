import React from "react";
import StickyNote from "./StickyNote";
import "../styles/TaskBoard.css";

export default function TaskBoard({
  tasks,
  onComplete,
  onDelete,
  onReschedule,
}) {
  return (
    <div className="task-board">
      {tasks.map((task) => (
        <StickyNote
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
          onReschedule={onReschedule}
        />
      ))}
    </div>
  );
}