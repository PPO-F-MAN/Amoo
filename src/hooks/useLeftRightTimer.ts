import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";

import { gameStatusAtom, positionTopAtom, timeAtom } from "../atoms/left-right";

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
  const [gameStatus, setGameStatus] = useAtom(gameStatusAtom);

  const setTop = useSetAtom(positionTopAtom);

  const resetTime = useCallback(() => {
    setTime(initialTime);
  }, [initialTime, setTime]);

  useEffect(() => {
    if (gameStatus === "end" || gameStatus === "ready") return;

    timerInterval.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, ms);

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [ms, setTime, gameStatus]);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timerInterval.current);
      setGameStatus("end");
    }
    setTop(80-(time/10));

    if (time > 100) resetTime();
  }, [resetTime, setGameStatus, setTop, time, timerInterval]);

  return {
    time,
  };
};

export default useTimer;
