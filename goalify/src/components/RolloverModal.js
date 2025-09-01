import React, { useState } from "react";

export default function RolloverModal({ task, onChoose, onClose }) {
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0,16);
  });

  function move() {
    onChoose("move", task.id, new Date(date).toISOString());
  }
  function miss() {
    onChoose("miss", task.id);
  }

  return (
    <div className="modal">
      <div className="modal-card">
        <h3>Missed Task</h3>
        <p>You didn't complete <strong>{task.title}</strong>.</p>
        <p>Move it to another day or mark it as missed so it won't keep prompting.</p>

        <label>New Date</label>
        <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />

        <div style={{display:'flex', gap:8, marginTop:12, justifyContent:'flex-end'}}>
          <button className="btn" onClick={move}>Move</button>
          <button className="btn ghost" onClick={miss} style={{background:'#ff6b6b', color:'#fff'}}>Mark as Missed</button>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}