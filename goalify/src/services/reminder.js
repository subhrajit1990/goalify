import { loadSettings } from "./storage";

const timers = new Map();

export function scheduleReminder(task){
  if(!task || !task.reminderAt || !task.id) return;
  if(timers.has(task.id)){
    clearTimeout(timers.get(task.id));
    timers.delete(task.id);
  }
  const ms = new Date(task.reminderAt).getTime() - Date.now();
  if(ms <= 0) return;
  const timeout = setTimeout(async ()=>{
    try {
      if(Notification.permission === "granted"){
        new Notification("Reminder: " + task.title, { body: task.description || "" });
      } else {
        const p = await Notification.requestPermission();
        if(p === "granted") new Notification("Reminder: " + task.title, { body: task.description || "" });
      }
    } catch(e){ console.warn(e); }
    // sound
    try {
      const settings = loadSettings();
      if(settings.notifySound){
        const audio = new Audio("/notification_sound.mp3");
        audio.play().catch(()=>{});
      }
    } catch (e){}
  }, ms);
  timers.set(task.id, timeout);
}

export function cancelReminder(id){
  if(timers.has(id)){
    clearTimeout(timers.get(id));
    timers.delete(id);
  }
}

export function rescheduleAll(tasks){
  tasks.forEach(t=>{
    if(t.status !== "done") scheduleReminder(t);
  });
}