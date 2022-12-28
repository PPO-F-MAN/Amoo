import { Center, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import useArrowGame, { ARROW_LENGTH } from "../../hooks/useArrowGame";
import useTimer from "../../hooks/useTimer";

const ArrowGame = () => {
  const { dispatch, arrows, combo, score, arrowCount } = useArrowGame();
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
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      if (e.key === "ArrowLeft" && arrows[ARROW_LENGTH - 1].direction === "left") {
        dispatch({ type: "CORRECT", arrowCount });
        addTime(10);
      } else if (e.key === "ArrowRight" && arrows[ARROW_LENGTH - 1].direction === "right") {
        dispatch({ type: "CORRECT", arrowCount });
        addTime(10);
      } else {
        dispatch({ type: "WRONG" });
        subtractTime(10);
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [addTime, arrowCount, arrows, dispatch, subtractTime]);

  return (
    <Center margin="auto" maxWidth="600px" width="100vw" height="100vh" flexDirection="column">
      <Heading>Arrow Game</Heading>

      <Flex justifyContent="space-evenly" alignItems="center" direction="column" height="70%">
        <AnimatePresence mode="popLayout">
          {arrows.map(({ direction, id }, index) => (
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
                width={index === ARROW_LENGTH - 1 ? "70px" : "50px"}
                height={index === ARROW_LENGTH - 1 ? "70px" : "50px"}
                fontSize={index === ARROW_LENGTH - 1 ? "36px" : "28px"}
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
