import { Center, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";

import { gameStatusAtom } from "../../atoms/left-right";
import HangHeart from "../../components/common/HangHeart";
import {
  Arrows,
  Combo,
  GameOverOverlay,
  HorizontalLine,
  MaxCombo,
  MaxScore,
  MobilePad,
  Score,
  Timer,
  VerticalLine,
} from "../../components/LeftRight";
import { LAYER } from "../../constants";
import useLeftRightKeyBoard from "../../hooks/useLeftRightKeyBoard";

const LeftRightGame = () => {
  const gameStatus = useAtomValue(gameStatusAtom);
  useLeftRightKeyBoard();

  return (
    <Center position="relative" backgroundColor="primary.900">
      {gameStatus !== "playing" && <HangHeart />}
      <GameOverOverlay visible={gameStatus === "end"} />
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
        >
          <Arrows />
          <Score />
          <Combo />
          <MaxCombo />
          <MaxScore />
        </motion.div>
        <VerticalLine />
        <HorizontalLine />
        <Timer />
      </Flex>
    </Center>
  );
};

export default LeftRightGame;
