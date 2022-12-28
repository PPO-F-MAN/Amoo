/* eslint-disable no-unused-vars */
import { Button, Flex } from "@chakra-ui/react";
import type { MutableRefObject } from "react";
import { useEffect, useState } from "react";

import { getShuffledArray } from "./utils";

interface CountNumberProps {
  counter: MutableRefObject<number>;
  handleTimeOver: (gameData: [number, boolean][]) => void;
}

const CountNumber = ({ counter, handleTimeOver }: CountNumberProps) => {
  const [gameData, setGameData] = useState<[number, boolean][]>([]);

  useEffect(() => {
    const shuffledArray = getShuffledArray(50);
    setGameData(shuffledArray.map((number) => [number, false]));
    console.time("game");
    console.timeLog("game");
  }, []);

  const handleNumberClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const clickedNumber = +e.currentTarget.textContent!;

    if (clickedNumber !== counter.current + 1) return;

    counter.current += 1;
    setGameData(gameData.map((data) => (data[0] === clickedNumber ? [data[0], true] : data)));
  };

  useEffect(() => {
    handleTimeOver(gameData);
  }, [handleTimeOver, gameData]);

  return (
    <Flex w={320} flexWrap="wrap" justifyContent="center" m="auto" gap="2">
      {gameData.map(([number, isClicked]) => (
        <Button
          key={number}
          w={5}
          colorScheme={isClicked ? "whiteAlpha" : "blackAlpha"}
          onClick={handleNumberClick}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};

export default CountNumber;
