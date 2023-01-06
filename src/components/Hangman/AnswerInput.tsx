import { Box, Button, Container, Flex, FormControl, Input } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import EnterIcon from "../../assets/hangman/enter.svg";
import { answerAtom, updateUserAnswerAtom, userLifeAtom } from "../../atoms/hangman";
import { LENGTH_OF_WORD } from "../../constants";

interface AnswerInputProps {
  onOpen: () => void;
}

export const AnswerInput = ({ onOpen }: AnswerInputProps) => {
  const [userAnswer, updateUserAnswer] = useAtom(updateUserAnswerAtom);
  const [value, setValue] = useState("");
  const [lifes, setLifes] = useAtom(userLifeAtom);
  const [answer] = useAtom(answerAtom);

  useEffect(() => {
    if (userAnswer.join("").length === LENGTH_OF_WORD) onOpen();
  }, [userAnswer.join("")]);

  const decreaseLife = () => {
    setLifes(lifes - 1);

    if (lifes <= 1) {
      onOpen();
    }
  };

  const resetInput = () => {
    setValue("");
  };

  const submitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetInput();

    if (!answer) return;

    if (value.length === 1 && answer.includes(value)) {
      if (userAnswer.includes(value)) {
        return;
      }

      updateUserAnswer(value);
      return;
    }

    if (value === answer) {
      onOpen();
      return;
    }
    decreaseLife();
  };

  return (
    <Container mt={"20px"}>
      <Box border="1px" borderColor="white">
        <form onSubmit={(e) => submitAnswer(e)}>
          <Flex margin="0" gap={2}>
            <FormControl>
              <Input
                border="none"
                color="white"
                _focusVisible={{ outline: "none" }}
                colorScheme="primary"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value.toLocaleLowerCase())}
                pattern="[a-zA_Z]+$"
              />
            </FormControl>
            <Button
              bgColor="transparent"
              type="submit"
              colorScheme="primary"
              _hover={{ background: "transparent" }}
              _active={{ background: "transparent" }}
            >
              <EnterIcon />
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};
