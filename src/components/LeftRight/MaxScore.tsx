import { Flex, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { memo } from "react";

import { maxScoreAtom } from "../../atoms/left-right";

const MaxScore = () => {
  const maxScore = useAtomValue(maxScoreAtom);

  return (
    <Flex
      position="absolute"
      bottom="62px"
      left={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="whiteAlpha.400" lineHeight="1" fontSize="11.5px" fontWeight="bold">
        MAX-SCORE
      </Text>
      <Text color="whiteAlpha.400" lineHeight="1" fontSize="14px" fontWeight="bold">
        {maxScore}
      </Text>
    </Flex>
  );
};

export default memo(MaxScore);
