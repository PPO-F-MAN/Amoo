import { Flex, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import { scoreAtom } from "../../atoms/left-right";

const Score = () => {
  const score = useAtomValue(scoreAtom);
  return (
    <Flex
      position="absolute"
      bottom="20px"
      left={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="white" lineHeight="0.9" fontSize="20px" fontWeight="bold">
        SCORE
      </Text>
      <Text color="white" lineHeight="0.9" fontSize="30px" fontWeight="bold">
        {score}
      </Text>
    </Flex>
  );
};

export default Score;
