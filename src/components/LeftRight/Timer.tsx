import { Text } from "@chakra-ui/react";

import useTimer from "../../hooks/useTimer";

const Timer = () => {
  const { time } = useTimer({
    ms: 100,
    initialTime: 100,
  });

  return (
    <>
      <Text color="white">{time}</Text>
    </>
  );
};

export default Timer;
