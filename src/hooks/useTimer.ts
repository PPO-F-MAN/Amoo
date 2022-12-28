import { useCallback, useEffect, useRef, useState } from "react";

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
  const [time, setTime] = useState(initialTime);

  const resetTime = useCallback(() => {
    setTime(initialTime);
  }, [initialTime]);

  const addTime = useCallback((amount: number) => {
    setTime((prevTime) => prevTime + amount);
  }, []);

  const subtractTime = useCallback((amount: number) => {
    setTime((prevTime) => prevTime - amount);
  }, []);

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, ms);

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [ms]);

  return {
    time,
    timerInterval,
    resetTime,
    addTime,
    subtractTime,
  };
};

export default useTimer;
