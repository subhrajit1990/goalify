import React, { useState } from "react";
import "../styles/Settings.css";

const themes = [
  { value: "light", label: "☀️ Light" },
  { value: "dark", label: "🌙 Dark" },
  { value: "digital", label: "💻 Digital" },
  { value: "anime", label: "✨ Anime" },
];

const fonts = [
  { value: "sans-serif", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "cursive", label: "Cursive" },
];

export default function Settings({ isOpen, onClose, theme, setTheme, font, setFont }) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <h2>⚙️ Settings</h2>

        {/* Theme Selector */}
        <div className="settings-section">
          <label>Theme:</label>
          <div className="custom-select" onClick={() => setThemeOpen(!themeOpen)}>
            <span>{themes.find(t => t.value === theme)?.label}</span>
            <ul className={`select-options ${themeOpen ? "open" : ""}`}>
              {themes.map(t => (
                <li key={t.value} onClick={() => { setTheme(t.value); setThemeOpen(false); }}>
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Font Selector */}
        <div className="settings-section">
          <label>Font:</label>
          <div className="custom-select" onClick={() => setFontOpen(!fontOpen)}>
            <span>{fonts.find(f => f.value === font)?.label}</span>
            <ul className={`select-options ${fontOpen ? "open" : ""}`}>
              {fonts.map(f => (
                <li key={f.value} onClick={() => { setFont(f.value); setFontOpen(false); }}>
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="settings-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}