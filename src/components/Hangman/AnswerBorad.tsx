import { Box, Flex } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";

import { userAnswerAtom } from "../../atoms/hangman";

export const AnswerBoard = () => {
  const userAnswer = useAtomValue(userAnswerAtom);

  return (
    <Flex justify={"space-around"}>
      {userAnswer.map((alphabet: string) => (
        <Box
          marginTop={"30px"}
          h={"30px"}
          textAlign="center"
          minW={["10%", "10%", "50px"]}
          color="white"
          borderBottom={["1px", "2px", "4px"]}
          borderBottomColor="white"
          key={`${alphabet}-${nanoid()}`}
        >
          {alphabet || ""}
        </Box>
      ))}
    </Flex>
  );
};
