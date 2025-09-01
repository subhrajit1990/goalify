import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Settings.css";

export default function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.body.setAttribute("data-theme", selectedTheme); // ✅ Apply globally
  };

  return (
    <div className="settings-container">
      <button className="settings-btn" onClick={() => setOpen(!open)}>
        ⚙️
      </button>

      {open && (
        <div className="settings-panel">
          <h3>🎨 Theme</h3>
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="creative">✨ Creative</option>
          </select>
        </div>
      )}
    </div>
  );
}