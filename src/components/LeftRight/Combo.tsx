import { Flex, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import { comboAtom } from "../../atoms/left-right";

const Combo = () => {
  const combo = useAtomValue(comboAtom);
  return (
    <Flex
      position="absolute"
      bottom="20px"
      right={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="white" lineHeight="0.9" fontSize="20px" fontWeight="bold">
        COMBO
      </Text>
      <Text color="white" lineHeight="0.9" fontSize="30px" fontWeight="bold">
        {combo}
      </Text>
    </Flex>
  );
};

export default Combo;
