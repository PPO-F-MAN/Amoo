import { Flex, Heading, Img } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import HangHeart from "../../components/common/HangHeart";
import { LAYER } from "../../constants";

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
      <HangHeart />
      <Link style={{ zIndex: LAYER.TOP }} to="/game/left-right">
        <Heading size={{ base: "2xl", lg: "3xl" }} color="white" fontWeight="100">
          left & right
        </Heading>
      </Link>
      <Link style={{ zIndex: LAYER.TOP }} to="/game/one-to-fifty">
        <Heading size={{ base: "2xl", lg: "3xl" }} color="white" fontWeight="100">
          1 to 50
        </Heading>
      </Link>
      <Link style={{ zIndex: LAYER.TOP }} to="/game/hangman">
        <Heading size={{ base: "2xl", lg: "3xl" }} color="white" fontWeight="100">
          hangman
        </Heading>
      </Link>
    </Flex>
  );
};

export default GameListPage;
