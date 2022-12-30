import { useAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";

import { timeAtom } from "../atoms/left-right";

interface useTimerProps {
  /**
   * 초기 시간입니다.
   * @default 100
   */
  initialTime?: number;

  /**
   * 시간이 변하는 간격입니다.
   * @default 1000
   */
  ms?: number;
}

const useTimer = ({ ms = 1000, initialTime = 100 }: useTimerProps) => {
  const timerInterval = useRef<ReturnType<typeof setInterval>>();
  const [time, setTime] = useAtom(timeAtom);

  const resetTime = useCallback(() => {
    setTime(initialTime);
  }, [initialTime, setTime]);

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, ms);

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [ms, setTime]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timerInterval.current);
      // alert("Game Over");
    }

    if (time > 100) resetTime();
  }, [resetTime, time, timerInterval]);

  return {
    time,
  };
};

export default useTimer;
