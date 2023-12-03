import { useState, useEffect } from "react";

export default function CountDownTimer({ initialTime, action = null }) {
  const [clueCountDown, setClueCountDown] = useState(initialTime);
  const timesUpAudio = new Audio(
    "http://localhost:3000/audio/time-up-sound.mp3"
  );

  useEffect(() => {
    if (clueCountDown <= 0) {
      timesUpAudio.play();
      if (action !== null) {
        action();
      }
      return;
    }
    const countDown = setInterval(() => {
      setClueCountDown(clueCountDown - 1);
    }, 1000);

    return () => clearTimeout(countDown);
  }, [clueCountDown]);

  return (
    <div className="count-down-timer">
      <div className="timer-text label">TIMER:</div>
      <div className="timer-text">{clueCountDown}</div>
    </div>
  );
}
