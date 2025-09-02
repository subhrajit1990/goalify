import React from "react";
import StickyNote from "./StickyNote";
import "./TaskBoard.css";

export default function TaskBoard({ tasks, onDelete, onComplete, onReschedule }) {
  return (
    <div className="task-board">
      {tasks.map((task) => (
        <StickyNote
          key={task.id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onReschedule={onReschedule}
        />
      ))}
    </div>
  );
}