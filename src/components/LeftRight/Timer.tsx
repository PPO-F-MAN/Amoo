import { Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import { positionTopAtom } from "../../atoms/left-right";
import { TOP_TRANSITION } from "../../constants/left-right";
import useTimer from "../../hooks/useTimer";

const Timer = () => {
  const top = useAtomValue(positionTopAtom);
  const { time } = useTimer({
    ms: 100,
    initialTime: 100,
  });

  return (
    <>
      <Text
        position="absolute"
        transition={TOP_TRANSITION}
        left="50%"
        top={`calc(${top}% + 3% + ${(top * 10 - 700) / 1.1}px)`}
        transform="translateX(-50%)"
        color="white"
      >
        {time}
      </Text>
    </>
  );
};

export default Timer;
