import { Button, Flex, FormControl, Input, useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

import { answerAtom, updateUserAnswerAtom, userLifeAtom } from "../../atoms/hangman";
import { LENGTH_OF_WORD, TOAST_SUBMITTED, TOAST_WRONG } from "../../constants";

interface InputFormProps {
  onOpen: () => void;
}

export const InputForm = ({ onOpen }: InputFormProps) => {
  const toast = useToast();
  const [answer] = useAtom(answerAtom);
  const [lifes, setLifes] = useAtom(userLifeAtom);
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

  return (
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
  );
};
