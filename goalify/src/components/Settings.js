import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Settings.css";

export default function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.body.setAttribute("data-theme", selectedTheme);
  };

  return (
    <div className="settings-container">
      {/* Creative Gear Button */}
      <button
        className={`settings-btn ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Settings"
      >
        <span className="gear-icon">⚙️</span>
      </button>

      {open && (
        <div className="settings-panel">
          <h3>🎨 Theme & Fonts</h3>

          {/* Theme Switcher */}
          <label className="settings-label">Theme</label>
          <select
            className="settings-select"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="creative">✨ Creative</option>
          </select>

          {/* Font Switcher (optional future feature) */}
          <label className="settings-label">Font</label>
          <select className="settings-select">
            <option value="default">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="handwriting">✍ Handwriting</option>
            <option value="modern">⚡ Modern</option>
          </select>
        </div>
      )}
    </div>
  );
}