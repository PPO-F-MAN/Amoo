import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

import EnterIcon from "../../assets/hangman/enter.svg";
import { answerAtom, resetGameAtom, updateUserAnswerAtom, userLifeAtom } from "../../atoms/hangman";
import { GameOverModal } from "../../components/common";
import { AnswerBoard } from "../../components/Hangman";
import { Heart } from "../../components/Hangman/Heart";
import { LENGTH_OF_WORD, LIFES, TOAST_SUBMITTED, TOAST_WRONG } from "../../constants";

const Hangman = () => {
  const toast = useToast();
  const [, restartGame] = useAtom(resetGameAtom);
  const [lifes, setLifes] = useAtom(userLifeAtom);
  const [answer] = useAtom(answerAtom);
  const [userAnswer, updateUserAnswer] = useAtom(updateUserAnswerAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

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

    if (value.length === 1 && answer.includes(value)) {
      if (userAnswer.includes(value)) {
        toast(TOAST_SUBMITTED);

        return;
      }
      answer.split("").forEach((alphabet: string, index: number) => {
        if (alphabet === value) {
          updateUserAnswer({ index, value: alphabet });
        }
      });
      if (userAnswer.join("").length === LENGTH_OF_WORD) onOpen();
      return;
    }

    if (value === answer) {
      onOpen();
      return;
    }

    toast(TOAST_WRONG);
    decreaseLife();
  };

  const handleRestart = () => {
    restartGame();
    setLifes(LIFES);
    onClose();
  };

  return (
    <Container bgColor="primary.900" centerContent>
      <h1>Game 1</h1>
      <Container minH={"100vh"}>
        <Heart />
        <AnswerBoard />
        <Container pos="fixed" left="0" right="0" bottom="20px">
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
                    onChange={(e) => setValue(e.target.value)}
                    pattern="[a-z]+$"
                  />
                </FormControl>
                <Button bgColor="transparent" type="submit" colorScheme="primary">
                  <EnterIcon />
                </Button>
              </Flex>
            </form>
          </Box>
        </Container>
      </Container>
      <GameOverModal
        status={lifes < 1 ? "fail" : "success"}
        isOpen={isOpen}
        onClose={handleRestart}
        handleRestart={handleRestart}
      />
    </Container>
  );
};

export default Hangman;
