import { Flex } from "@chakra-ui/react";

import { LAYER } from "../../constants";

interface ArrowProps {
  isLast: boolean;
  direction: "left" | "right";
}

const Arrow = ({ isLast, direction }: ArrowProps) => {
  return (
    <Flex
      justifyContent="center"
      fontWeight="bold"
      alignItems="center"
      border="5px solid white"
      color="white"
      margin="10px"
      opacity={isLast ? 1 : 0.7}
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
