import { Box, Button, Container, Flex, FormControl, Input, useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { GameOverModal } from "../../components/common";
import { LENGTH_OF_WORD, LIFES, TOAST_SUBMITTED, TOAST_WRONG } from "../../constants";
import { getNewWord } from "../../utils";

const Game1 = () => {
  const toast = useToast();
  const [value, setValue] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [lifes, setLifes] = useState<number>(LIFES);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const resetWord = () => {
    try {
      getNewWord().then((word: string) => {
        setAnswer(word);
        setUserAnswer(Array.from(new Array(LENGTH_OF_WORD), () => ""));
        console.log(word);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resetWord();
  }, []);

  useEffect(() => {
    if (userAnswer.join("").length === LENGTH_OF_WORD) {
      onOpen();
    }
  }, [userAnswer.join("")]);

  const handleAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

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
      const updateAnswer = userAnswer;
      answer.split("").forEach((alphabet: string, index: number) => {
        if (alphabet === value) {
          updateAnswer[index] = alphabet;
        }
      });
      setUserAnswer(updateAnswer);

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
    resetWord();
    setLifes(LIFES);
    onClose();
  };

  return (
    <Container centerContent>
      <h1>Game 1</h1>
      <Flex minH={"70vh"} direction={"column"} justifyContent={"space-between"}>
        <div>
          <h2>결과 모니터</h2>
          <div>
            목숨 :
            {Array.from(new Array(lifes), () => "").map((key: string, index: number) => {
              return <span key={`${key}-${index}`}>🔥</span>;
            })}
          </div>
        </div>
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
        <form onSubmit={(e) => submitAnswer(e)}>
          <Flex margin="10" gap={2}>
            <FormControl>
              <Input
                colorScheme="primary"
                type="text"
                value={value}
                onChange={(e) => handleAnswer(e)}
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

export default Game1;
