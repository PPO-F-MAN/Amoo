import { Box, Center, Show, Text } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { currentNumberAtom, resetOneToFiftyAtom } from "../../../atoms/one-to-fifty";
import HangHeart from "../../../components/common/HangHeart";
import NumbersBoard from "../../../components/OneToFifty/NumbersBoard";
import Stopwatch from "../../../components/OneToFifty/Stopwatch";
import { LAST_NUMBER } from "../../../constants/one-to-fifty";
import useOneToFiftyTimer from "../../../hooks/useOneToFiftyTimer";
import { getOneToFiftyOpacity } from "../../../styles/opacity";

const OneToFifty = () => {
  const counter = useAtomValue(currentNumberAtom);
  const resetOneToFifty = useSetAtom(resetOneToFiftyAtom);
  useOneToFiftyTimer();

  const resetGame = useCallback(() => {
    resetOneToFifty();
  }, [resetOneToFifty]);

  useEffect(() => {
    resetGame();

    window.addEventListener("keydown", (e) => {
      if (e.key === "r") {
        resetGame();
      }
    });

    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "r") {
          resetGame();
        }
      });
    };
  }, [resetGame]);

  return (
    <Box paddingTop={63} bg="#000000" h="100vh">
      <HangHeart />
      <Center h="100%">
        <Stopwatch />
        <NumbersBoard />
        <Show above="md">
          <Text position="absolute" bottom="15%" color="#ffffff" fontSize={12}>
            Press R to Restart
          </Text>
        </Show>
        <Text
          position="absolute"
          bottom="8%"
          color="#ffffff"
          opacity={getOneToFiftyOpacity(counter)}
          fontSize={24}
        >
          {counter < LAST_NUMBER ? `current : ${counter + 1}` : "WELL DONE"}
        </Text>
      </Center>
    </Box>
  );
};

export default OneToFifty;
