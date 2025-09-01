import React, { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import Settings from "./components/Settings";

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sans-serif");
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`app theme-${theme}`} style={{ fontFamily: font }}>
      <header>
        <h1>Goalify</h1>
        <button onClick={() => setShowSettings(true)}>⚙️ Settings</button>
      </header>

      <TaskBoard tasks={tasks} updateTask={() => {}} deleteTask={() => {}} />

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