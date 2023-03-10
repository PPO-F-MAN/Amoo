import { Flex } from "@chakra-ui/react";
import { LayoutGroup, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { memo } from "react";

import { arrowsAtom, gameStatusAtom, shakeAtom } from "../../atoms/left-right";
import { LAYER } from "../../constants";
import { ARROW_LENGTH } from "../../constants/left-right";

interface ArrowProps {
  index: number;
  isLast: boolean;
  direction: "left" | "right";
}

const Arrow = ({ isLast, direction, index }: ArrowProps) => {
  const opacity = (index / 10) * 2 + 0.1;
  const shake = useAtomValue(shakeAtom);
  const gameStatus = useAtomValue(gameStatusAtom);

  if (isLast) {
    return (
      <motion.div
        animate={{
          translateX: gameStatus === "ready" ? [-5, 5, -5, 5, 0] : shake ? [-5, 5, -5, 5, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          repeat: (gameStatus === "ready" && Infinity) || 0,
        }}
      >
        <Flex
          justifyContent={direction === "left" ? "flex-start" : "flex-end"}
          fontWeight="bold"
          alignItems="center"
          border="5px solid white"
          color="white"
          margin="10px"
          opacity={1}
          width={"70px"}
          height={"70px"}
          fontSize={"36px"}
          backgroundColor="primary.900"
          zIndex={LAYER.TOP}
        >
          {direction === "left" ? "←" : "→"}
        </Flex>
      </motion.div>
    );
  }

  return (
    <Flex
      justifyContent={direction === "left" ? "flex-start" : "flex-end"}
      fontWeight="bold"
      alignItems="center"
      border="5px solid white"
      color="white"
      margin="10px"
      opacity={opacity}
      width={isLast ? "70px" : "50px"}
      height={isLast ? "70px" : "50px"}
      fontSize={isLast ? "36px" : "28px"}
      backgroundColor="primary.900"
      zIndex={LAYER.TOP}
    >
      {direction === "left" ? "←" : "→"}
    </Flex>
  );
};

const Arrows = () => {
  const arrows = useAtomValue(arrowsAtom);

  return (
    <LayoutGroup>
      {arrows.map(({ direction, id }, index) => (
        <motion.div
          key={id}
          style={{
            willChange: "transform",
          }}
          layout="preserve-aspect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Arrow direction={direction} index={index} isLast={index === ARROW_LENGTH - 1} />
        </motion.div>
      ))}
    </LayoutGroup>
  );
};

export default memo(Arrows);
