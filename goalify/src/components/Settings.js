import React from "react";
import "../styles/Settings.css";

export default function Settings({ isOpen, onClose, theme, setTheme, font, setFont }) {
  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div
        className="settings-modal"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2>⚙️ Settings</h2>

        <div className="settings-section">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="pastel">🎨 Pastel</option>
          </select>
        </div>

        <div className="settings-section">
          <label>Font:</label>
          <select value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}