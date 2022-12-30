import { Flex, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import { maxComboAtom } from "../../atoms/left-right";

const MaxCombo = () => {
  const maxCombo = useAtomValue(maxComboAtom);

  return (
    <Flex
      position="absolute"
      bottom="80px"
      right={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="whiteAlpha.400" lineHeight="1" fontSize="11.5px" fontWeight="bold">
        MAX-COMBO
      </Text>
      <Text color="whiteAlpha.400" lineHeight="1" fontSize="16px" fontWeight="bold">
        {maxCombo}
      </Text>
    </Flex>
  );
};

export default MaxCombo;
