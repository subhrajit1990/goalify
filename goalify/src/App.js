import React, { useState, useEffect } from "react";
import TaskBoard from "./components/TaskBoard";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  // --- Load from localStorage (or fallback to defaults)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [font, setFont] = useState(() => {
    return localStorage.getItem("font") || "sans-serif";
  });

  const [showSettings, setShowSettings] = useState(false);

  // --- Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);

  // --- Add new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // --- Update task (complete, reschedule, etc.)
  const updateTask = (id, updatedFields) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
  };

  // --- Delete task
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

      {/* Task Board with sticky notes */}
      <TaskBoard
        tasks={tasks}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      {/* Settings Modal */}
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