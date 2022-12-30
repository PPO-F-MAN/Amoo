import { Center, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import {
  arrowsAtom,
  correctAtom,
  lastArrowAtom,
  scoreAtom,
  wrongAtom,
} from "../../atoms/left-right";
import HangHeart from "../../components/common/HangHeart";
import Arrow from "../../components/LeftRight/Arrow";
import Combo from "../../components/LeftRight/Combo";
import Timer from "../../components/LeftRight/Timer";
import { ARROW_LENGTH } from "../../constants/left-right";

const LeftRightGame = () => {
  const arrows = useAtomValue(arrowsAtom);
  const lastArrow = useAtomValue(lastArrowAtom);
  const score = useAtomValue(scoreAtom);

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

  // function handleTouchPadClick(direction: "left" | "right") {
  //   if (lastArrow.direction === direction) {
  //     correct();
  //   } else {
  //     wrong();
  //   }
  // }

  return (
    <Center position="relative" backgroundColor="primary.900">
      <HangHeart />
      <Center
        position="relative"
        margin="auto"
        maxWidth="600px"
        width="100vw"
        height="100vh"
        flexDirection="column"
      >
        {/* <Box
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
        </Box> */}

        <Flex
          position="relative"
          justifyContent="space-between"
          alignItems="center"
          direction="column"
          width="75%"
          height="70%"
        >
          <AnimatePresence mode="popLayout">
            {arrows.map(({ direction, id }, index) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, translateX: direction === "left" ? -100 : 100 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Arrow direction={direction} isLast={index === ARROW_LENGTH - 1} />
              </motion.div>
            ))}
          </AnimatePresence>
          <Combo />
        </Flex>

        <Text>Score: {score}</Text>
        <Timer />
      </Center>
    </Center>
  );
};

export default LeftRightGame;
