import React, { useEffect } from "react";

function Notification({ task }) {
  useEffect(() => {
    if (task?.time) {
      const now = new Date();
      const [hh, mm] = task.time.split(":");
      const taskTime = new Date();
      taskTime.setHours(hh, mm, 0);

      const delay = taskTime.getTime() - now.getTime();
      if (delay > 0) {
        const timer = setTimeout(() => {
          alert(`Reminder: ${task.title}`);
          const audio = new Audio("/notification.mp3");
          audio.play();
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }, [task]);

  return null;
}

export default Notification;