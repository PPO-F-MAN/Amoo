import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { memo, useEffect, useState } from "react";

import { scoreAtom } from "../../atoms/left-right";

const Score = () => {
  const score = useAtomValue(scoreAtom);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <Flex
      position="absolute"
      bottom="20px"
      left={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="white" lineHeight="0.9" fontSize="20px" fontWeight="bold">
        SCORE
      </Text>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: animate ? -10 : 0 }}
        style={{
          color: "white",
          lineHeight: "0.9",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        {score}
      </motion.div>
    </Flex>
  );
};

export default memo(Score);
