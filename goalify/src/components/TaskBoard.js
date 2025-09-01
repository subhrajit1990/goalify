import React from "react";
import StickyNote from "./StickyNote";
import "../styles/TaskBoard.css";

function TaskBoard({ tasks, updateTask, deleteTask }) {
  return (
    <div className="task-board">
      {tasks.map((task) => (
        <StickyNote
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskBoard;