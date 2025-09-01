import React, { useEffect, useState } from "react";
import TaskBoard from "./components/TaskBoard";
import SettingsModal from "./components/SettingsModal";
import RolloverModal from "./components/RolloverModal";
import { loadTasks, saveTasks, loadSettings, saveSettings } from "./services/storage";
import { rescheduleAll } from "./services/reminder";

export default function App() {
  const [tasks, setTasks] = useState(loadTasks());
  const [settings, setSettings] = useState(loadSettings());
  const [showSettings, setShowSettings] = useState(false);
  const [rolloverTask, setRolloverTask] = useState(null);

  // apply settings on change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme || "anime");
    document.documentElement.style.setProperty("--accent", settings.accent || "#a86ef8");
    document.documentElement.style.setProperty("--bg-accent-1", settings.bg1 || "#fff2ff");
    document.documentElement.style.setProperty("--bg-accent-2", settings.bg2 || "#eef8ff");
    document.body.style.fontFamily = settings.font || "Poppins, Inter, sans-serif";
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveTasks(tasks);
    rescheduleAll(tasks);
    checkOverdueAndPrompt(tasks);
  }, [tasks]);

  function addTask(task) {
    const t = { id: Date.now().toString(), ...task };
    setTasks(prev => [t, ...prev]);
  }

  function updateTask(id, patch) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function checkOverdueAndPrompt(list) {
    const now = Date.now();
    for (const t of list) {
      if (!t.dueAt) continue;
      const due = new Date(t.dueAt).getTime();
      if (due < now && t.status !== "done" && t.status !== "missed") {
        setRolloverTask(t);
        return;
      }
    }
    setRolloverTask(null);
  }

  function handleRollover(choice, taskId, newDate) {
    if (choice === "move") {
      updateTask(taskId, { dueAt: newDate, reminderAt: newDate, status: "active" });
    } else if (choice === "miss") {
      updateTask(taskId, { status: "missed" });
    }
    setRolloverTask(null);
  }

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="logo">Goalify</div>
        <div className="small center">3D Anime • Sticky Notes</div>
        <div style={{ height: 12 }} />
        <div className="progress-circle">
          {Math.round((tasks.filter(t => t.status === "done").length / (tasks.length || 1)) * 100)}%
        </div>
        <div style={{ height: 12 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => setShowSettings(true)}>⚙️ Settings</button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <h2>Your Goals</h2>
          <div className="small">Add sticky notes for today's goals ✨</div>
        </div>

        <TaskBoard
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          settings={settings}
        />
      </main>

      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={(s) => { setSettings(s); saveSettings(s); }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {rolloverTask && (
        <RolloverModal task={rolloverTask} onChoose={handleRollover} onClose={() => setRolloverTask(null)} />
      )}
    </div>
  );
}