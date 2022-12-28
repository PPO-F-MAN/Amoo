import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import {
  ARROW_LENGTH,
  arrowsAtom,
  comboAtom,
  correctAtom,
  lastArrowAtom,
  scoreAtom,
  wrongAtom,
} from "../../atoms/left-right-game";
import Timer from "../../components/LeftRight/Timer";

const LeftRightGame = () => {
  const arrows = useAtomValue(arrowsAtom);
  const lastArrow = useAtomValue(lastArrowAtom);
  const score = useAtomValue(scoreAtom);
  const combo = useAtomValue(comboAtom);

  const correct = useSetAtom(correctAtom);
  const wrong = useSetAtom(wrongAtom);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      if (
        (e.key === "ArrowLeft" && lastArrow.direction === "left") ||
        (e.key === "ArrowRight" && lastArrow.direction === "right")
      ) {
        correct();
      } else {
        wrong();
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [arrows, correct, lastArrow.direction, wrong]);

  function handleTouchPadClick(direction: "left" | "right") {
    if (lastArrow.direction === direction) {
      correct();
    } else {
      wrong();
    }
  }

  return (
    <Center
      position="relative"
      margin="auto"
      maxWidth="600px"
      width="100vw"
      height="100vh"
      flexDirection="column"
    >
      <Box
        position="absolute"
        left={0}
        bottom={0}
        width="40%"
        height="50%"
        backgroundColor="blackAlpha.100"
        onClick={() => handleTouchPadClick("left")}
      >
        왼쪽
      </Box>
      <Box
        position="absolute"
        right={0}
        bottom={0}
        width="40%"
        height="50%"
        backgroundColor="blackAlpha.100"
        onClick={() => handleTouchPadClick("right")}
      >
        오른쪽
      </Box>

      <Heading>왼쪽 & 오른쪽</Heading>

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
      <Timer />
    </Center>
  );
};

export default LeftRightGame;
