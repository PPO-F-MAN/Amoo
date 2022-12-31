import { Button, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";

import { resetAtom, scoreAtom } from "../../atoms/left-right";
import { LAYER } from "../../constants";

const GameOverOverlay = ({ visible }: { visible: boolean }) => {
  const score = useAtomValue(scoreAtom);

  const reset = useSetAtom(resetAtom);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",

            gap: "10px",

            position: "fixed",
            left: 0,
            top: 0,

            width: "100vw",
            height: "100vh",

            backgroundColor: "rgba(0, 0, 0, 0.8)",

            zIndex: LAYER.MODAL,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <motion.div
            initial={{
              scale: 5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            <Heading color="white" fontSize="5xl">
              Game Over
            </Heading>
          </motion.div>
          <motion.div
            initial={{
              scale: 10,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
            }}
          >
            <Text color="white" fontSize="4xl" fontWeight="bold">
              {score.toLocaleString()}
            </Text>
          </motion.div>
          <Button onClick={reset}>Close</Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverOverlay;
