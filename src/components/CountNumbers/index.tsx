/* eslint-disable no-unused-vars */
import { Button, Flex } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { currentNumberAtom, timerAtom } from "../../atoms/one-to-ten";
import { BORDER_COLORS } from "./constants";
import { getShuffledArray } from "./utils";

interface CountNumberProps {
  handleEnd: (gameData: [number, boolean][]) => void;
}

const CountNumber = ({ handleEnd }: CountNumberProps) => {
  const [gameData, setGameData] = useState<[number, boolean][]>([]);
  const [counter, setCounter] = useAtom(currentNumberAtom);

  useEffect(() => {
    const shuffledArray = getShuffledArray(50);
    setGameData(shuffledArray.map((number) => [number, false]));
  }, []);

  const handleNumberClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const clickedNumber = +e.currentTarget.textContent!;
    if (clickedNumber !== counter + 1) return;

    setCounter(counter + 1);
    setGameData(gameData.map((data) => (data[0] === clickedNumber ? [data[0], true] : data)));
  };

  useEffect(() => {
    handleEnd(gameData);
  }, [handleEnd, gameData]);

  return (
    <Flex w={290} flexWrap="wrap" justifyContent="center" m="auto" gap="1">
      {gameData.map(([number, isClicked], i) => (
        <Button
          key={number}
          w={50}
          h={50}
          bg="none"
          border={4}
          borderStyle="solid"
          borderColor={BORDER_COLORS[i]}
          borderRadius={0}
          fontSize={24}
          fontWeight="light"
          color="#ffffff"
          opacity={isClicked ? 0 : 1}
          _hover={{ bg: "none" }}
          onClick={handleNumberClick}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};

export default CountNumber;
