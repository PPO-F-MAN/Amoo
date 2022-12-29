import { Box } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { currentNumberAtom } from "../../atoms/one-to-ten";
import CountNumber from "../../components/CountNumbers";
import useStopwatch from "../../hooks/useStopwatch";

const END_NUMBER = 50;

const Game2 = () => {
  const [isEnd, setIsEnd] = useState(false);
  const counter = useAtomValue(currentNumberAtom);
  const { timer, startTimer, stopTimer } = useStopwatch();

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (isEnd) {
      stopTimer();
    }
  }, [isEnd, stopTimer]);

  const handleEnd = (gameData: [number, boolean][]) => {
    if (gameData.length && !gameData.filter((data) => data[1] !== true).length) setIsEnd(true);
  };

  const getOpacity = (counter: number) => {
    if (counter === END_NUMBER) return 1;
    if (counter < 5) return 0.2;
    return 0.2 + (counter - 4) * 0.05;
  };

  const get2digitNumber = (num: number) => {
    return ("0" + num).slice(-2);
  };

  const getTime = (timer: number) => {
    let s = 0;
    let ms = 0;

    if (timer < 100) {
      ms = timer;
    }
    if (timer >= 100) {
      s = Math.floor(timer / 100);
      ms = timer - s * 100;
    }

    return `${get2digitNumber(s)}.${get2digitNumber(ms)}`;
  };

  return (
    <Box paddingTop={63} bg="#000000" h="100vh">
      <Box
        fontSize={60}
        mx="auto"
        w={180}
        fontWeight="bold"
        color="#ffffff"
        opacity={getOpacity(counter)}
      >
        {getTime(timer)}
      </Box>
      <CountNumber handleEnd={handleEnd} />
    </Box>
  );
};

export default Game2;
