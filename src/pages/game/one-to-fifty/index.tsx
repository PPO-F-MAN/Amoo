import { Box, Center, Show, Text } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import {
  currentNumberAtom,
  resetCurrentNumberAtom,
  stopwatchAtom,
} from "../../../atoms/one-to-fifty";
import HangHeart from "../../../components/common/HangHeart";
import useOneToFifty from "../../../hooks/useOneToFiftyTimer";
import { getTime } from "../../../utils";
import NumbersBoard from "./components/NumbersBoard";
import { getStopwatchOpacity } from "./utils/styles";

const OneToFifty = () => {
  const [isEnd, setIsEnd] = useState(false);
  const counter = useAtomValue(currentNumberAtom);
  const resetCounter = useSetAtom(resetCurrentNumberAtom);
  const stopwatch = useAtomValue(stopwatchAtom);
  const { stopOneToFifty, resetOneToFifty } = useOneToFifty();

  const resetGame = useCallback(() => {
    resetCounter();
    stopOneToFifty();
    resetOneToFifty();
    setIsEnd(false);
  }, [setIsEnd, resetCounter, resetOneToFifty, stopOneToFifty]);

  useEffect(() => {
    resetGame();
    window.addEventListener("keydown", (e) => {
      if (e.key === "r") {
        resetGame();
      }
    });

    return () => window.removeEventListener("keydown", resetGame);
  }, [resetGame]);

  useEffect(() => {
    if (isEnd) stopOneToFifty();
  }, [isEnd, stopOneToFifty]);

  const handleEnd = (gameData: [number, boolean][]) => {
    if (gameData.length && !gameData.filter((data) => data[1] !== true).length) setIsEnd(true);
  };

  return (
    <Box paddingTop={63} bg="#000000" h="100vh">
      <HangHeart />
      <Center h="100%">
        <Box
          position="absolute"
          fontSize={{ base: 500, sm: 60, md: 300 }}
          mx="auto"
          top={{ base: "30%", sm: "63px", md: "30%" }}
          w={{ base: "870px", sm: "180px", md: "870px" }}
          fontWeight="bold"
          color="#ffffff"
          opacity={getStopwatchOpacity(counter)}
        >
          {getTime(stopwatch)}
        </Box>
        <NumbersBoard handleEnd={handleEnd} />
        <Show above="md">
          <Text position="absolute" bottom="15%" color="#ffffff" fontSize={12}>
            Press R to Restart
          </Text>
        </Show>
        <Text position="absolute" bottom="8%" color="#ffffff" opacity={0.4} fontSize={24}>
          current : {counter + 1}
        </Text>
      </Center>
    </Box>
  );
};

export default OneToFifty;
