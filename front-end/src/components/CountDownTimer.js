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
      <p className="timer-text">{clueCountDown}</p>
    </div>
  );
}
