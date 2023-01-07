import { Box } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import { currentNumberAtom, stopwatchAtom } from "../../atoms/one-to-fifty";
import { getOneToFiftyOpacity } from "../../styles/opacity";
import { getTime } from "../../utils";

const Stopwatch = () => {
  const counter = useAtomValue(currentNumberAtom);
  const stopwatch = useAtomValue(stopwatchAtom);

  return (
    <Box
      position="absolute"
      fontSize={{ base: 500, sm: 60, md: 300 }}
      mx="auto"
      top={{ base: "auto", sm: "63px", md: "auto" }}
      w={{ base: "870px", sm: "180px", md: "870px" }}
      fontWeight="bold"
      color="#ffffff"
      opacity={getOneToFiftyOpacity(counter)}
    >
      {getTime(stopwatch)}
    </Box>
  );
};

export default Stopwatch;
