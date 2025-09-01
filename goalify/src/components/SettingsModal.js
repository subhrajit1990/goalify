import React, { useState } from "react";
import { saveSettings } from "../services/storage";

export default function SettingsModal({ settings, onSave, onClose }) {
  const [theme, setTheme] = useState(settings.theme || "anime");
  const [accent, setAccent] = useState(settings.accent || "#a86ef8");
  const [bg1, setBg1] = useState(settings.bg1 || "#fff2ff");
  const [bg2, setBg2] = useState(settings.bg2 || "#eef8ff");
  const [font, setFont] = useState(settings.font || "Poppins, Inter, sans-serif");
  const [notifySound, setNotifySound] = useState(settings.notifySound ?? true);

  function apply() {
    const s = { ...settings, theme, accent, bg1, bg2, font, notifySound };
    saveSettings(s);
    onSave && onSave(s);
  }

  return (
    <div className="modal">
      <div className="modal-card">
        <h3>Settings</h3>

        <label>Theme</label>
        <div style={{display:'flex', gap:8}}>
          <label><input type="radio" name="theme" checked={theme==="anime"} onChange={()=>setTheme("anime")} /> Anime</label>
          <label><input type="radio" name="theme" checked={theme==="neon"} onChange={()=>setTheme("neon")} /> Neon</label>
          <label><input type="radio" name="theme" checked={theme==="dark"} onChange={()=>setTheme("dark")} /> Dark</label>
        </div>

        <label>Accent</label>
        <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} />

        <label>Background Top</label>
        <input type="color" value={bg1} onChange={e=>setBg1(e.target.value)} />
        <label>Background Bottom</label>
        <input type="color" value={bg2} onChange={e=>setBg2(e.target.value)} />

        <label>Font</label>
        <select value={font} onChange={e=>setFont(e.target.value)}>
          <option value="Poppins, Inter, sans-serif">Poppins</option>
          <option value="Orbitron, Inter, sans-serif">Orbitron</option>
          <option value="Nunito, Inter, sans-serif">Nunito</option>
        </select>

        <div style={{marginTop:10}}>
          <label><input type="checkbox" checked={notifySound} onChange={e=>setNotifySound(e.target.checked)} /> Notification Sound</label>
        </div>

        <div style={{marginTop:12, display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn" onClick={()=>{
            // preview apply immediately
            document.documentElement.style.setProperty("--accent", accent);
            document.documentElement.style.setProperty("--bg-accent-1", bg1);
            document.documentElement.style.setProperty("--bg-accent-2", bg2);
            document.body.style.fontFamily = font;
            apply();
            onClose();
          }}>Save</button>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}