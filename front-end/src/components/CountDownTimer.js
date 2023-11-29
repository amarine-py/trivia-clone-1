import { useState, useEffect } from "react";

export default function CountDownTimer({ initialTime }) {
    const [clueCountDown, setClueCountDown] = useState(initialTime);

  useEffect(() => {
    if (clueCountDown <= 0) {
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
