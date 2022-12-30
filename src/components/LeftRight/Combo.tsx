import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { comboAtom } from "../../atoms/left-right";

const Combo = () => {
  const combo = useAtomValue(comboAtom);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [combo]);

  return (
    <Flex
      position="absolute"
      bottom="20px"
      right={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="white" lineHeight="0.9" fontSize="20px" fontWeight="bold">
        COMBO
      </Text>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: animate ? 2 : 1 }}
        style={{
          color: "white",
          lineHeight: "0.9",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        {combo}
      </motion.div>
    </Flex>
  );
};

export default Combo;
