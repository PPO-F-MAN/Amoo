import { Flex } from "@chakra-ui/react";

import { LAYER } from "../../constants";

interface ArrowProps {
  index: number;
  isLast: boolean;
  direction: "left" | "right";
}

const Arrow = ({ isLast, direction, index }: ArrowProps) => {
  const opacity = (index / 10) * 2 + 0.1;

  if (isLast) {
    return (
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

export default Arrow;
