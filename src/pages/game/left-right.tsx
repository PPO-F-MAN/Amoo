import { Center, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { correctAtom, lastArrowAtom, shakeAtom, wrongAtom } from "../../atoms/left-right";
import HangHeart from "../../components/common/HangHeart";
import {
  Arrows,
  Combo,
  HorizontalLine,
  MaxCombo,
  MobilePad,
  Score,
  Timer,
  VerticalLine,
} from "../../components/LeftRight";
import { LAYER } from "../../constants";

const LeftRightGame = () => {
  const lastArrow = useAtomValue(lastArrowAtom);
  const shake = useAtomValue(shakeAtom);

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
  }, [correct, lastArrow.direction, wrong]);

  return (
    <Center position="relative" backgroundColor="primary.900">
      <HangHeart />
      <Flex
        alignItems="center"
        position="relative"
        margin="auto"
        maxWidth="600px"
        width="100vw"
        height="100vh"
        flexDirection="column"
        overflowX="hidden"
      >
        <MobilePad />
        <motion.div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: LAYER.TOP,
            width: "75%",
            height: "50%",
          }}
          animate={{
            translateX: shake ? [-5, 5, -5, 5, 0] : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Arrows />
          <Score />
          <Combo />
          <MaxCombo />
        </motion.div>
        <VerticalLine />
        <HorizontalLine />
        <Timer />
      </Flex>
    </Center>
  );
};

export default LeftRightGame;
