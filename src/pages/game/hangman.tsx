import {
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

import { answerAtom, resetGameAtom, updateUserAnswerAtom, userLifeAtom } from "../../atoms/hangman";
import { GameOverModal } from "../../components/common";
import { AnswerBoard } from "../../components/Hangman";
import { Heart } from "../../components/Hangman/Heart";
import { LENGTH_OF_WORD, LIFES, TOAST_SUBMITTED, TOAST_WRONG } from "../../constants";

const Hangman = () => {
  const toast = useToast();
  const [, restartGame] = useAtom(resetGameAtom);
  const [lifes, setLifes] = useAtom(userLifeAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [answer] = useAtom(answerAtom);
  const [userAnswer, updateUserAnswer] = useAtom(updateUserAnswerAtom);
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
    <Container centerContent>
      <h1>Game 1</h1>
      <Flex minH={"70vh"} direction={"column"} justifyContent={"space-between"}>
        <Heart />
        <AnswerBoard />
        <form onSubmit={(e) => submitAnswer(e)}>
          <Flex margin="10" gap={2}>
            <FormControl>
              <Input
                colorScheme="primary"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                pattern="[a-z]+$"
              />
            </FormControl>
            <Button type="submit" colorScheme="primary">
              제출
            </Button>
          </Flex>
        </form>
      </Flex>
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
