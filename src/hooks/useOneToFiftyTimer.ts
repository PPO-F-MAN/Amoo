import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";

import {
  isStartedAtom,
  startStopwatchAtom,
  stopStopwatchAtom,
  stopwatchAtom,
} from "../atoms/one-to-fifty";

const useOneToFifty = (delay = 1) => {
  const stopwatchInterval = useRef<ReturnType<typeof setInterval>>();
  const setStopwatch = useSetAtom(stopwatchAtom);
  const startStopwatch = useSetAtom(startStopwatchAtom);
  const stopStopwatch = useSetAtom(stopStopwatchAtom);
  const isStarted = useAtomValue(isStartedAtom);

  useEffect(() => {
    if (!isStarted) clearInterval(stopwatchInterval.current);
    if (isStarted)
      stopwatchInterval.current = setInterval(() => {
        setStopwatch((prev) => prev + 1);
      }, delay);

    return () => clearInterval(stopwatchInterval.current);
  }, [isStarted, delay, setStopwatch]);

  const resetOneToFifty = useCallback(() => {
    clearInterval(stopwatchInterval.current);
    setStopwatch(0);
  }, [setStopwatch]);

  const startOneToFifty = useCallback(() => {
    resetOneToFifty();
    startStopwatch();
  }, [resetOneToFifty, startStopwatch]);

  const stopOneToFifty = useCallback(() => {
    stopStopwatch();
  }, [stopStopwatch]);

  return {
    startOneToFifty,
    stopOneToFifty,
    resetOneToFifty,
  };
};

export default useOneToFifty;
