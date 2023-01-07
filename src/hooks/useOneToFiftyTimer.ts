import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

import { isRunningAtom, stopOneToFiftyAtom, stopwatchAtom } from "../atoms/one-to-fifty";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();
  const savedInterval = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current!();
    };

    if (delay) {
      savedInterval.current = setInterval(tick, delay);

      return () => clearInterval(savedInterval.current);
    }
  }, [delay]);
};

const useOneToFiftyTimer = (delay = 10) => {
  const isRunning = useAtomValue(isRunningAtom);
  const setStopwatch = useSetAtom(stopwatchAtom);
  const stopStopwatch = useSetAtom(stopOneToFiftyAtom);

  useInterval(
    () => {
      setStopwatch((prev) => {
        if (prev >= 9999) {
          stopStopwatch();
          return prev;
        }

        return prev + 1;
      });
    },
    isRunning ? delay : null,
  );
};

export default useOneToFiftyTimer;
