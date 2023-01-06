import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      if (timeRef.current === 20) {
        clearInterval(intervalRef.current);
        const random = Math.random();

        // TODO: 게임이 늘어났을 때 이 부분을 수정해야 함
        if (random < 0.3) navigate("/game/one-to-fifty");
        else if (random < 0.6) navigate("/game/hangman");
        else navigate("/game/left-right");
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

  const handleClickHamberger = () => {
    navigate("/game");
  };

  return (
    <Center
      overflow="hidden"
      position="relative"
      width="100vw"
      height="100vh"
      backgroundColor="primary.900"
    >
      <Box
        position="fixed"
        right={0}
        top={0}
        margin="20px"
        _hover={{ cursor: "pointer" }}
        onClick={handleClickHamberger}
      >
        <svg
          width="24"
          height="18"
          viewBox="0 0 24 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L23 1M1 9L23 9M1 17L23 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Box>
      <motion.div
        animate={{
          scale: isPressed ? 10 : 1,
          opacity: isPressed ? 0.1 : 1,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <motion.div
          initial={{ scale: 10, opacity: 0.1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <svg
            width="131"
            height="105"
            viewBox="0 0 131 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <path d="M0 21L32.75 42L5.42724e-07 63L0 21Z" fill="#03045E" />
            <path d="M32.75 0V42L0 21L32.75 0Z" fill="#023E8A" />
            <path d="M32.75 42V84L5.42724e-07 63L32.75 42Z" fill="#023E8A" />
            <path d="M32.75 0L65.5 21L32.75 42V0Z" fill="#0077B6" />
            <path d="M32.75 42L65.5 63L32.75 84V42Z" fill="#0077B6" />
            <path d="M65.5 21V63L32.75 42L65.5 21Z" fill="#0096C7" />
            <path d="M98.25 0V42L65.5 21L98.25 0Z" fill="#0096C7" />
            <path d="M131 21V63L98.25 42L131 21Z" fill="#48CAE4" />
            <path d="M65.5 21L98.25 42L65.5 63V21Z" fill="#90E0EF" />
            <path d="M98.25 0L131 21L98.25 42V0Z" fill="#90E0EF" />
            <path d="M98.25 42L131 63L98.25 84V42Z" fill="#90E0EF" />
            <path d="M98.25 42V84L65.5 63L98.25 42Z" fill="#ADE8F4" />
            <path d="M65.5 63V105L32.75 84L65.5 63Z" fill="#ADE8F4" />
            <path d="M65.5 63L98.25 84L65.5 105V63Z" fill="#CAF0F8" />
          </svg>
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
