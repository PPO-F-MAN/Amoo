import { useAtom } from "jotai";
import { useRef } from "react";

import { timerAtom } from "../atoms/one-to-ten";

const useStopwatch = (ms = 1) => {
  const timerInterval = useRef<ReturnType<typeof setInterval>>();
  const [timer, setTimer] = useAtom(timerAtom);

  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, ms);
  };

  const stopTimer = () => {
    clearInterval(timerInterval.current);
  };

  return {
    timer,
    startTimer,
    stopTimer,
  };
};

export default useStopwatch;
