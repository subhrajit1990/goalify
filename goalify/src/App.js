import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskBoard from "./components/TaskBoard";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sans-serif");
  const [showSettings, setShowSettings] = useState(false);

  // Add new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Update task (complete, reschedule, etc.)
  const updateTask = (id, updatedFields) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={`app theme-${theme}`} style={{ fontFamily: font }}>
      <header className="app-header">
        <h1>🎯 Goalify</h1>
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
          ⚙️ Settings
        </button>
      </header>

      {/* Input for adding new goals 
      <TaskInput /> */}

      {/* Board showing sticky notes */}
      <TaskBoard tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />

      {/* Settings modal */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        theme={theme}
        setTheme={setTheme}
        font={font}
        setFont={setFont}
      />
    </div>
  );
}

export default App;