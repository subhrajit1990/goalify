import React, { useState } from "react";
import Draggable from "react-draggable";
import StickyNote from "./StickyNote";
import "../styles/TaskBoard.css";

const noteColors = ["#FFFA8B", "#FFD3B6", "#B5EAD7", "#C7CEEA", "#FFB6B9"];

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");

  const addTask = () => {
    if (!input.trim() || !time) return;

    const newTask = {
      id: Date.now(),
      text: input,
      time: time,
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setTime("");
  };

  const handleComplete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleReschedule = (id) => {
    const newTime = prompt("Enter new time (HH:MM):");
    if (newTime) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, time: newTime } : task
        )
      );
    }
  };

  return (
    <div className="task-board">
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Enter your goal..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="goal-input"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-picker"
        />
        <button className="add-btn" onClick={addTask}>
          ➕ Add Goal
        </button>
      </div>

      <div className="notes-area">
        {tasks.map((task) => (
          <Draggable key={task.id}>
            <div>
              <StickyNote
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
                onReschedule={handleReschedule}
              />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}