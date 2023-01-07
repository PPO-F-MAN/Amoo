import { Flex } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { memo } from "react";

import { gameDataAtom } from "../../atoms/one-to-fifty";
import NumberButton from "./NumberButton";

const NumbersBoard = () => {
  const gameData = useAtomValue(gameDataAtom);

  return (
    <Flex
      w={{ base: 550, sm: 290, md: 550 }}
      flexWrap="wrap"
      justifyContent="center"
      m="auto"
      gap="1"
    >
      {gameData.map((data, index) => (
        <NumberButton key={data} index={index} number={data} />
      ))}
    </Flex>
  );
};

export default memo(NumbersBoard);
