import { Box, Flex } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import { userAnswerAtom } from "../../atoms/hangman";

export const AnswerBoard = () => {
  const userAnswer = useAtomValue(userAnswerAtom);

  return (
    <Flex justify={"space-around"}>
      {userAnswer.map((alphabet: string, index: number) => (
        <Box
          marginTop={"18px"}
          p="2"
          minW={"30px"}
          borderBottom="1px"
          borderBottomColor="primary.400"
          key={`${alphabet}-${index}`}
        >
          {alphabet || ""}
        </Box>
      ))}
    </Flex>
  );
};
