import { Center, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 요구사항
// 1. currentArrow는 좌, 우 둘 중 하나로 랜덤으로 나온다.
// 2. currentArrow가 좌일 때는 좌측 화살표를, 우일 때는 우측 화살표를 누르면 combo가 1씩 증가한다.

interface Item {
  id: number;
  direction: "left" | "right";
}

const LENGTH = 5;
const add = (id: number): Item => ({ direction: Math.random() > 0.5 ? "left" : "right", id });

const ArrowGame = () => {
  const count = useRef<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [currentArrowArray, setCurrentArrowArray] = useState<Item[]>(
    Array.from({ length: LENGTH }, () => add(count.current++)),
  );

  const [timer, setTimer] = useState<number>(100);
  const interval = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 100);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(interval.current);
      // alert("Game Over");
    }

    if (timer > 100) setTimer(100);
  }, [timer]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentArrowArray[LENGTH - 1].direction === "left") {
        setCombo((prev) => prev + 1);
        setScore((prev) => prev + 1);
        setTimer((prev) => prev + 10);
        currentArrowArray.pop();
        setCurrentArrowArray([add(count.current++), ...currentArrowArray]);
      } else if (e.key === "ArrowRight" && currentArrowArray[LENGTH - 1].direction === "right") {
        setCombo((prev) => prev + 1);
        setScore((prev) => prev + 1);
        setTimer((prev) => prev + 10);
        currentArrowArray.pop();
        setCurrentArrowArray([add(count.current++), ...currentArrowArray]);
      } else {
        setCombo(0);
        setTimer((prev) => prev - 10);
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [currentArrowArray]);

  return (
    <Center height="100vh" flexDirection="column">
      <Heading>Arrow Game</Heading>

      <Flex justifyContent="space-evenly" alignItems="center" direction="column" height="70%">
        <AnimatePresence mode="popLayout">
          {currentArrowArray.map(({ direction, id }, index) => (
            <motion.div
              layout
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, translateX: direction === "left" ? -100 : 100 }}
              transition={{ duration: 0.25, type: "spring" }}
            >
              <Flex
                borderRadius="8px"
                justifyContent="center"
                fontWeight="bold"
                alignItems="center"
                border="3px solid black"
                margin="10px"
                width={index === LENGTH - 1 ? "70px" : "50px"}
                height={index === LENGTH - 1 ? "70px" : "50px"}
                fontSize={index === LENGTH - 1 ? "36px" : "28px"}
              >
                {direction === "left" ? "←" : "→"}
              </Flex>
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>

      <Text>Combo: {combo}</Text>
      <Text>Score: {score}</Text>
      <Text>Timer: {timer}</Text>
      <Progress value={timer} height="20px" width="80vw" colorScheme="pink" />
    </Center>
  );
};

export default ArrowGame;
