import React, { useState } from "react";
import StickyNote from "./StickyNote";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!goal.trim()) return;
    const newTask = {
      id: Date.now(),
      text: goal,
      time: new Date().toLocaleTimeString(),
      status: "pending",
    };
    setTasks([...tasks, newTask]);
    setGoal("");
  };

  const updateTask = (id, status) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="taskboard">
      <div className="character-area">
        {/* Nobita crying with speech bubble */}
        <div className="nobita">
          <img
            src="https://i.ibb.co/JrM2Sdb/nobita-crying.png"
            alt="Nobita crying"
            className="character-img"
          />
          <input
            type="text"
            className="cloud-input"
            placeholder="Enter your goal here..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>

        {/* Doraemon to release sticky notes */}
        <div className="doraemon" onClick={addTask}>
          <img
            src="https://i.ibb.co/6sVZBbf/doraemon.png"
            alt="Doraemon"
            className="character-img"
          />
          <p className="doraemon-text">Click me to add goal!</p>
        </div>
      </div>

      <div className="notes-area">
        {tasks.map((task) => (
          <StickyNote
            key={task.id}
            task={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;