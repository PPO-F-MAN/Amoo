import { Center, Flex, Img, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

const Home = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const timeRef = useRef<number>(0);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMouseDown = () => {
    setIsPressed(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      timeRef.current += 1;
      if (timeRef.current === 30) {
        clearInterval(intervalRef.current);
        navigate("/game");
      }
    }, 100);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      timeRef.current -= 1;
      if (timeRef.current === 0) clearInterval(intervalRef.current);
    }, 100);
  };

  return (
    <Center
      overflow="hidden"
      position="relative"
      width="100vw"
      height="100vh"
      backgroundColor="primary.900"
    >
      <motion.div
        animate={{
          scale: isPressed ? 5 : 1,
          opacity: isPressed ? 0.1 : 1,
        }}
        transition={{
          duration: 3,
        }}
      >
        <motion.div
          initial={{ scale: 10, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <Img
            src={logo}
            width="130px"
            height="105px"
            draggable={false}
            _hover={{
              cursor: "pointer",
            }}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        </motion.div>
      </motion.div>
      <Flex
        direction="column"
        alignItems="center"
        gap="10px"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        bottom="50px"
      >
        <motion.div
          style={{
            width: "20px",
            height: "2px",
            backgroundColor: "white",
          }}
          animate={{
            width: isPressed ? "200px" : "20px",
          }}
          transition={{
            duration: 3,
          }}
        />
        <Text color="white">CLICK & HOLD</Text>
      </Flex>
    </Center>
  );
};

export default Home;
