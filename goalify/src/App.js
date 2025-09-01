import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskBoard from "./components/TaskBoard";
import Settings from "./components/Settings";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (id, updatedTask) =>
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <ThemeProvider>
      <div className="App">
        <header className="app-header">
          <h1>🎯 Goalify</h1>
          <ThemeSwitcher />
        </header>

        <TaskInput addTask={addTask} />
        <TaskBoard tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        <Settings />
      </div>
    </ThemeProvider>
  );
}

export default App;