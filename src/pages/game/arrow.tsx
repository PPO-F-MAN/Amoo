import { Center, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import useTimer from "../../hooks/useTimer";

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

  const { time, timerInterval, resetTime, addTime, subtractTime } = useTimer({
    ms: 100,
    initialTime: 100,
  });

  useEffect(() => {
    if (time === 0) {
      clearInterval(timerInterval.current);
      // alert("Game Over");
    }

    if (time > 100) resetTime();
  }, [resetTime, time, timerInterval]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentArrowArray[LENGTH - 1].direction === "left") {
        setCombo((prev) => prev + 1);
        setScore((prev) => prev + 1);
        addTime(10);
        currentArrowArray.pop();
        setCurrentArrowArray([add(count.current++), ...currentArrowArray]);
      } else if (e.key === "ArrowRight" && currentArrowArray[LENGTH - 1].direction === "right") {
        setCombo((prev) => prev + 1);
        setScore((prev) => prev + 1);
        addTime(10);
        currentArrowArray.pop();
        setCurrentArrowArray([add(count.current++), ...currentArrowArray]);
      } else {
        setCombo(0);
        subtractTime(10);
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [addTime, currentArrowArray, subtractTime]);

  return (
    <Center margin="auto" maxWidth="600px" width="100vw" height="100vh" flexDirection="column">
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
      <Text>Timer: {time}</Text>
      <Progress value={time} height="20px" width="80%" colorScheme="pink" />
    </Center>
  );
};

export default ArrowGame;
