const TASK_KEY = "goalify_sticky_tasks_v1";
const SETTINGS_KEY = "goalify_sticky_settings_v1";

export function loadTasks(){
  try {
    const raw = localStorage.getItem(TASK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
export function saveTasks(tasks){
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
}

export function loadSettings(){
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if(raw) return JSON.parse(raw);
  } catch {}
  return {
    theme: "anime",
    accent: "#a86ef8",
    bg1: "#fff2ff",
    bg2: "#eef8ff",
    font: "Poppins, Inter, sans-serif",
    notifySound: true
  };
}
export function saveSettings(s){
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}