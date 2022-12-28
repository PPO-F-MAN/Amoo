import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";

const LIFES: number = 10;
const ANSWER: string = "answer";

const Game1 = () => {
  const [value, setValue] = useState<string>("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [lifes, setLifes] = useState<number>(LIFES);

  useEffect(() => {
    // 랜덤으로 단어 설정
    setAnswer(ANSWER.split(""));
    setUserAnswer(Array.from(new Array(ANSWER.length), () => ""));
  }, []);

  const handleAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const decreaseLife = () => {
    setLifes(lifes - 1);
  };

  const submitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);

    if (value.length === 1 && ANSWER.includes(value)) {
      const updateAnswer = userAnswer;
      answer.forEach((alphabet: string, index: number) => {
        if (alphabet === value) {
          updateAnswer[index] = alphabet;
        }
      });
      setUserAnswer(updateAnswer);
      setValue("");
      return;
    }

    if (value.length > 1 && value === ANSWER) {
      // 정답 처리
      return;
    }

    decreaseLife();
    setValue("");
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
    </Container>
  );
};

export default Game1;
