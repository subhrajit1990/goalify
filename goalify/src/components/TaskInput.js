import React, { useState } from "react";
import "../styles/TaskInput.css";
import NobitaImg from "../assets/nobita.png";
import DoraemonImg from "../assets/doraemon.png";

const TaskInput = ({ onAddTask }) => {
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (goal.trim() && time) {
      onAddTask(goal, time);
      setGoal("");
      setTime("");
    }
  };

  return (
    <div className="task-input-container">
      {/* Nobita with speech bubble */}
      <div className="nobita-container">
        <img src={NobitaImg} alt="Nobita" className="character nobita" />
        <div className="speech-bubble">
          <textarea
            placeholder="Enter your goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Doraemon button */}
      <div className="doraemon-container">
        <img
          src={DoraemonImg}
          alt="Doraemon"
          className="character doraemon"
          onClick={handleAdd}
        />
        <p className="hint">Click Doraemon to add!</p>
      </div>
    </div>
  );
};

export default TaskInput;