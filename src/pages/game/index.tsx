import { Flex, Heading, Img } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

const GameListPage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction={{ base: "column", lg: "row" }}
      gap="70px"
      position="relative"
      width="100vw"
      height="100vh"
      backgroundColor="primary.900"
    >
      <Img
        src={logo}
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        width="130px"
        opacity={0.4}
        height="105px"
        draggable={false}
        _hover={{
          cursor: "pointer",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "20px",
          top: "-95px",
        }}
        initial={{
          y: -80,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          duration: 2.5,
        }}
      >
        <svg
          width="32"
          height="149"
          viewBox="0 0 32 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="16" y1="-4.37114e-08" x2="16" y2="129" stroke="white" strokeWidth="2" />
          <path
            d="M14.91 129.877L16 130.585L17.09 129.877L24 125.385L30 129.285V137.515L22.91 142.123L16 146.615L9.08998 142.123L2 137.515V129.285L8 125.385L14.91 129.877Z"
            stroke="white"
            strokeWidth="4"
          />
        </svg>
      </motion.div>

      <Link style={{ zIndex: 1 }} to="/game/left-right">
        <Heading size={{ base: "2xl", lg: "3xl" }} color="white">
          left & right
        </Heading>
      </Link>
      <Link style={{ zIndex: 1 }} to="/game/game2">
        <Heading size={{ base: "2xl", lg: "3xl" }} color="white">
          1 to 50
        </Heading>
      </Link>
      <Link style={{ zIndex: 1 }} to="/game/game1">
        <Heading size={{ base: "2xl", lg: "3xl" }} color="white">
          hangman
        </Heading>
      </Link>
    </Flex>
  );
};

export default GameListPage;
