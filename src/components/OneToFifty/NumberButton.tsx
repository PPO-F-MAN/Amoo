import { Button } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { memo, useCallback } from "react";

import {
  addOneToCurrentNumberAtom,
  currentNumberAtom,
  startOneToFiftyAtom,
  stopOneToFiftyAtom,
} from "../../atoms/one-to-fifty";
import {
  BORDER_COLORS_DESKTOP,
  BORDER_COLORS_MOBILE,
  LAST_NUMBER,
} from "../../constants/one-to-fifty";
import { twinkling } from "../../styles/animation";

interface NumberButtonProps {
  number: number;
  index: number;
}

const NumberButton = ({ number, index }: NumberButtonProps) => {
  const counter = useAtomValue(currentNumberAtom);
  const addOneToCurrent = useSetAtom(addOneToCurrentNumberAtom);
  const startOneToFifty = useSetAtom(startOneToFiftyAtom);
  const stopOneToFifty = useSetAtom(stopOneToFiftyAtom);

  const handleNumberClick = useCallback(() => {
    if (number !== counter + 1) return;
    if (number === 1) startOneToFifty();
    if (counter + 1 === LAST_NUMBER) stopOneToFifty();

    addOneToCurrent();
  }, [number, counter, addOneToCurrent, startOneToFifty, stopOneToFifty]);

  return (
    <Button
      w={50}
      h={50}
      bg="none"
      bgGradient={number === 1 ? "linear(to-b, primary.300, primary.700)" : "none"}
      border={4}
      borderStyle="solid"
      borderColor={{
        base: BORDER_COLORS_DESKTOP[index],
        sm: BORDER_COLORS_MOBILE[index],
        md: BORDER_COLORS_DESKTOP[index],
      }}
      borderRadius={0}
      fontSize={24}
      fontWeight="light"
      color="#ffffff"
      animation={number === counter + 1 ? `${twinkling} infinite 1.5s 3s` : "none"}
      opacity={number <= counter ? 0 : 1}
      transition="opacity 0.8s"
      _hover={{ bg: "none" }}
      onClick={handleNumberClick}
    >
      {number}
    </Button>
  );
};

export default memo(NumberButton);
