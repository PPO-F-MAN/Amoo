import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 요구사항
// 1. currentArrow는 좌, 우 둘 중 하나로 랜덤으로 나온다.
// 2. currentArrow가 좌일 때는 좌측 화살표를, 우일 때는 우측 화살표를 누르면 combo가 1씩 증가한다.

interface Item {
  id: number;
  direction: "left" | "right";
}

const LENGTH = 5;
const add = (id: number): Item => ({ direction: Math.random() > 0.5 ? "left" : "right", id });

const Arrow = () => {
  const [combo, setCombo] = useState<number>(0);
  const count = useRef<number>(0);
  const [currentArrowArray, setCurrentArrowArray] = useState<Item[]>(
    Array.from({ length: LENGTH }, () => add(count.current++)),
  );

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentArrowArray[LENGTH - 1].direction === "left") {
        setCombo((prev) => prev + 1);
        currentArrowArray.pop();
        setCurrentArrowArray([add(count.current++), ...currentArrowArray]);
      }

      if (e.key === "ArrowRight" && currentArrowArray[LENGTH - 1].direction === "right") {
        setCombo((prev) => prev + 1);
        currentArrowArray.pop();
        setCurrentArrowArray([add(count.current++), ...currentArrowArray]);
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [currentArrowArray]);

  return (
    <Center height="100vh" flexDirection="column">
      <Heading>Arrow Game</Heading>

      <Flex justifyContent="space-evenly" direction="column" height="70%">
        <AnimatePresence mode="popLayout">
          {currentArrowArray.map(({ direction, id }) => (
            <motion.div
              layout
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, translateX: direction === "left" ? -100 : 100 }}
              transition={{ duration: 0.2, type: "spring" }}
            >
              <Flex
                borderRadius="8px"
                justifyContent="center"
                alignItems="center"
                border="1px solid black"
                margin="10px"
                width="50px"
                height="50px"
                fontSize="24px"
              >
                {direction === "left" ? "←" : "→"}
              </Flex>
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>

      <Text>Combo: {combo}</Text>
    </Center>
  );
};

export default Arrow;
