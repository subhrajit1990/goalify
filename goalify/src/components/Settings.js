import React from "react";
import "../styles/Settings.css";

export default function Settings({ isOpen, onClose, theme, setTheme, font, setFont }) {
  if (!isOpen) return null; // don’t render unless opened

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div
        className="settings-modal"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2>⚙️ Settings</h2>

        {/* Theme Switcher */}
        <div className="settings-section">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="digital">💻 Digital</option>
            <option value="anime">✨ Anime</option>
          </select>
        </div>

        {/* Font Switcher */}
        <div className="settings-section">
          <label>Font:</label>
          <select value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
        </div>

        <div className="settings-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}