import { useEffect, useState } from "react";

function Timer({ seconds, resetTimer, onResetTimer, onTimerEnd }) {
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  const handleSecondsToTime = (val) => {
    const min = Math.floor(val / 60)
      .toString()
      .padStart(2, "0");
    const sec = (val - min * 60).toString().padStart(2, "0");

    return `${min}:${sec}`;
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        setRemainingSeconds(remainingSeconds - 1);
      }
      if (remainingSeconds === 0) {
        clearInterval(myInterval);
        if (onTimerEnd) {
          onTimerEnd();
        }
      } else {
        setRemainingSeconds(remainingSeconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (resetTimer) {
      setRemainingSeconds(seconds);
      onResetTimer(false);
    }
  }, [resetTimer]);

  return <>{handleSecondsToTime(remainingSeconds)}</>;
}

export default Timer;
