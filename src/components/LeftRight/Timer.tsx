import { Progress, Text } from "@chakra-ui/react";

import useTimer from "../../hooks/useTimer";

const Timer = () => {
  const { time } = useTimer({
    ms: 100,
    initialTime: 100,
  });

  return (
    <>
      <Text>Timer: {time}</Text>
      <Progress value={time} height="20px" width="80%" colorScheme="pink" />
    </>
  );
};

export default Timer;
