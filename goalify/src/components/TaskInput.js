import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      time,
      status: "pending",
      x: 50,
      y: 50,
      color: randomColor()
    };
    addTask(newTask);
    setTitle("");
    setTime("");
  };

  const randomColor = () => {
    const colors = ["#FFEB3B", "#FFCDD2", "#C8E6C9", "#BBDEFB", "#D1C4E9"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your goal..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default TaskInput;