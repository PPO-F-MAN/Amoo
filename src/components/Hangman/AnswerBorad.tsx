import { Box, Flex } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import { userAnswerAtom } from "../../atoms/hangman";

export const AnswerBoard = () => {
  const userAnswer = useAtomValue(userAnswerAtom);

  return (
    <Flex justify={"space-around"}>
      {userAnswer.map((alphabet: string, index: number) => (
        <Box
          marginTop={"30px"}
          h={"30px"}
          textAlign="center"
          minW={["10%", "10%", "100px"]}
          color="white"
          borderBottom={["1px", "2px", "4px"]}
          borderBottomColor="white"
          key={`${alphabet}-${index}`}
        >
          {alphabet || ""}
        </Box>
      ))}
    </Flex>
  );
};
