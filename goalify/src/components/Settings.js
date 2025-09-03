import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Settings.css";

export default function Settings() {
  const { theme, setTheme, font, setFont } = useContext(ThemeContext);

  return (
    <div className="settings-panel">
      <h3>Settings</h3>

      <label>Theme</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="anime">Anime</option>
      </select>

      <label>Font</label>
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Comic Sans MS">Comic Sans</option>
        <option value="Courier New">Courier</option>
        <option value="Poppins">Poppins</option>
      </select>
    </div>
  );
}