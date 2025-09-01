import React, { useEffect, useRef, useState } from "react";
import StickyNote from "./StickyNote";
import { scheduleReminder, cancelReminder } from "../services/reminder";
import "./TaskBoard.css";

/**
 * Grid & collision logic:
 * - Snap dropped note to nearest grid cell (gridW x gridH).
 * - If snapped cell is occupied by another note, search outward in grid steps until free.
 * - Keep z-order counter; increase when a note is picked up (bring-to-front).
 */

const GRID_W = 220;
const GRID_H = 180;
const MAX_SEARCH_STEPS = 500; // upper bound for collision search

export default function TaskBoard({ tasks, addTask, updateTask, deleteTask, settings }) {
  const containerRef = useRef(null);
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [reminderAt, setReminderAt] = useState("");
  const [topZ, setTopZ] = useState(() => Math.max(0, ...(tasks.map(t => t.z || 0))));

  useEffect(() => {
    // schedule reminders for current tasks
    tasks.forEach(t => { if (t.reminderAt) scheduleReminder(t); });
    return () => { tasks.forEach(t => t.id && cancelReminder(t.id)); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if tasks change, update topZ to max z present
    const mz = tasks.reduce((m, t) => Math.max(m, t.z || 0), 0);
    setTopZ(mz);
  }, [tasks]);

  function handleAdd(e) {
    e && e.preventDefault();
    if (!title) return;
    const task = {
      title,
      description: "",
      dueAt: dueAt || null,
      reminderAt: reminderAt || null,
      priority: "2",
      repeat: "none",
      status: "active",
      color: null,
      pos: null,
      z: topZ + 1
    };
    addTask(task);
    setTopZ(prev => prev + 1);
    setTitle(""); setDueAt(""); setReminderAt("");
  }

  function handleComplete(id) {
    updateTask(id, { status: "done" });
    cancelReminder(id);
  }

  function handleReschedule(id) {
    const v = prompt("Choose new date/time (YYYY-MM-DDTHH:MM) — example: 2025-09-01T18:30");
    if (v) {
      updateTask(id, { dueAt: v, reminderAt: v, status: "active" });
      scheduleReminder({ id, reminderAt: v, title: tasks.find(t => t.id === id)?.title });
    }
  }

  function handleDelete(id) {
    deleteTask(id);
    cancelReminder(id);
  }

  // bring note to front by increasing topZ and saving to task
  function handleBringToFront(id) {
    const newZ = topZ + 1;
    setTopZ(newZ);
    updateTask(id, { z: newZ });
  }

  // helper to get bounding box for an existing task (grid cell coords)
  function occupiedCellsMap(exceptId = null) {
    const map = new Map();
    tasks.forEach(t => {
      if (!t.pos) return;
      if (t.id === exceptId) return;
      // normalize to grid coordinates
      const gx = Math.round(t.pos.x / GRID_W);
      const gy = Math.round(t.pos.y / GRID_H);
      map.set(`${gx},${gy}`, true);
    });
    return map;
  }

  // compute container bounds
  function getContainerRect() {
    const el = containerRef.current;
    if (!el) return { width: 1000, height: 600, left: 0, top: 0 };
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height, left: rect.left, top: rect.top };
  }

  // clamped grid coords to container
  function clampGridPos(gridX, gridY, containerWidth, containerHeight) {
    const maxCols = Math.max(1, Math.floor(containerWidth / GRID_W));
    const maxRows = Math.max(1, Math.floor(containerHeight / GRID_H));
    const gx = Math.max(0, Math.min(gridX, maxCols - 1));
    const gy = Math.max(0, Math.min(gridY, maxRows - 1));
    return { gx, gy };
  }

  // search spiral for nearest free cell starting at (startGx, startGy)
  function findFreeGridCell(startGx, startGy, occupiedMap, containerWidth, containerHeight) {
    const maxCols = Math.max(1, Math.floor(containerWidth / GRID_W));
    const maxRows = Math.max(1, Math.floor(containerHeight / GRID_H));
    // if start cell free, return immediately
    const key0 = `${startGx},${startGy}`;
    if (!occupiedMap.has(key0)) return { gx: startGx, gy: startGy };

    // spiral search
    let step = 1;
    let dx = 0, dy = 0;
    const dirs = [[1,0],[0,1],[-1,0],[0,-1]]; // right, down, left, up
    let dirIndex = 0;
    let cx = startGx, cy = startGy;
    let stepsTaken = 0;
    let segmentLength = 1;
    while (stepsTaken < MAX_SEARCH_STEPS) {
      for (let seg = 0; seg < 2; seg++) {
        for (let i = 0; i < segmentLength; i++) {
          cx += dirs[dirIndex][0];
          cy += dirs[dirIndex][1];
          // clamp
          const { gx, gy } = clampGridPos(cx, cy, containerWidth, containerHeight);
          const key = `${gx},${gy}`;
          if (!occupiedMap.has(key)) return { gx, gy };
          stepsTaken++;
        }
        dirIndex = (dirIndex + 1) % 4;
      }
      segmentLength++;
    }
    // fallback to start (clamped)
    return clampGridPos(startGx, startGy, containerWidth, containerHeight);
  }

  // handle drag stop from StickyNote (data: {x,y})
  function handleDragStop(id, data) {
    // data has x,y relative to container top-left
    const container = getContainerRect();
    const rawX = data.x;
    const rawY = data.y;
    // compute grid coords
    const startGx = Math.round(rawX / GRID_W);
    const startGy = Math.round(rawY / GRID_H);
    const occupied = occupiedCellsMap(id);
    const free = findFreeGridCell(startGx, startGy, occupied, container.width, container.height);
    // convert back to pixel position
    const finalX = free.gx * GRID_W;
    const finalY = free.gy * GRID_H;
    updateTask(id, { pos: { x: finalX, y: finalY } });
  }

  return (
    <div>
      <form className="board-controls" onSubmit={handleAdd}>
        <input className="input" type="text" placeholder="Goal title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="datetime-local" value={dueAt} onChange={e => setDueAt(e.target.value)} />
        <input type="datetime-local" value={reminderAt} onChange={e => setReminderAt(e.target.value)} />
        <button className="btn" type="submit">Add Goal</button>
      </form>

      <div className="notes-grid" id="notes-grid" ref={containerRef}>
        {tasks.map((t, i) => {
          // randomized float variant & duration
          const anims = ["float1", "float2", "float3"];
          const animName = anims[i % anims.length];
          const animDuration = 5 + (i % 3); // 5s,6s,7s
          const style = { animation: `${animName} ${animDuration}s ease-in-out infinite`, zIndex: t.z || 0 };
          return (
            <StickyNote
              key={t.id}
              task={t}
              onComplete={() => handleComplete(t.id)}
              onReschedule={() => handleReschedule(t.id)}
              onDelete={() => handleDelete(t.id)}
              onDragStop={(e, data) => handleDragStop(t.id, data)}
              onDragStart={() => handleBringToFront(t.id)}
              parentId="notes-grid"
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
}