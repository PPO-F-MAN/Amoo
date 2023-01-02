/* eslint-disable no-unused-vars */
import { Button, Flex, keyframes } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { addOneToCurrentNumberAtom, currentNumberAtom } from "../../../../atoms/one-to-fifty";
import { stopwatchAtom } from "../../../../atoms/one-to-fifty";
import { BORDER_COLORS_DESKTOP, BORDER_COLORS_MOBILE } from "../../../../constants/one-to-fifty";
import useOneToFifty from "../../../../hooks/useOneToFiftyTimer";
import { getShuffledArray } from "../../../../utils";
import { twinkling } from "../utils/styles";

interface NumbersBoardProps {
  handleEnd: (gameData: [number, boolean][]) => void;
}

const NumbersBoard = ({ handleEnd }: NumbersBoardProps) => {
  const [gameData, setGameData] = useState<[number, boolean][]>([]);
  const counter = useAtomValue(currentNumberAtom);
  const stopwatch = useAtomValue(stopwatchAtom);
  const addOne = useSetAtom(addOneToCurrentNumberAtom);
  const { startOneToFifty } = useOneToFifty();

  useEffect(() => {
    if (counter === 0) {
      const shuffledArray = getShuffledArray(50);
      setGameData(shuffledArray.map((number) => [number, false]));
    }
  }, [counter]);

  const handleNumberClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const clickedNumber = +e.currentTarget.textContent!;
    if (stopwatch === 0 && clickedNumber === 1) startOneToFifty();

    if (clickedNumber !== counter + 1) return;

    addOne();
    setGameData(gameData.map((data) => (data[0] === clickedNumber ? [data[0], true] : data)));
  };

  useEffect(() => {
    handleEnd(gameData);
  }, [handleEnd, gameData]);

  return (
    <Flex
      w={{ base: 550, sm: 290, md: 550 }}
      top="auto"
      flexWrap="wrap"
      justifyContent="center"
      m="auto"
      gap="1"
    >
      {gameData.map(([number, isClicked], i) => (
        <Button
          key={number}
          w={50}
          h={50}
          bg="none"
          bgGradient={number === 1 ? "linear(to-b, primary.300, primary.700)" : "none"}
          border={4}
          borderStyle="solid"
          borderColor={{
            base: BORDER_COLORS_DESKTOP[i],
            sm: BORDER_COLORS_MOBILE[i],
            md: BORDER_COLORS_DESKTOP[i],
          }}
          borderRadius={0}
          fontSize={24}
          fontWeight="light"
          color="#ffffff"
          animation={number === counter + 1 ? `${twinkling} infinite 1.5s 3s` : "none"}
          opacity={isClicked ? 0 : 1}
          transition="opacity 0.8s"
          _hover={{ bg: "none" }}
          onClick={handleNumberClick}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};

export default NumbersBoard;
