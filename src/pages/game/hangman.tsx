import { Box, CircularProgress, Container, useDisclosure, VisuallyHidden } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { answerAtom, resetGameAtom, userLifeAtom } from "../../atoms/hangman";
import { GameOverModal } from "../../components/common";
import HangHeart from "../../components/common/HangHeart";
import { AnswerBoard, AnswerInput } from "../../components/Hangman";
import { Heart } from "../../components/Hangman/Heart";
import { LIFES } from "../../constants";

const Hangman = () => {
  const [, restartGame] = useAtom(resetGameAtom);
  const [lifes, setLifes] = useAtom(userLifeAtom);
  const [answer] = useAtom(answerAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRestart = () => {
    restartGame();
    setLifes(LIFES);
    onClose();
  };

  return (
    <Box
      bgColor="primary.900"
      minH={"100vh"}
      display="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems="center"
    >
      <nav>
        <HangHeart />
      </nav>
      <h1>
        <VisuallyHidden>Hangman</VisuallyHidden>
      </h1>
      <Container>
        <Heart />
        {answer ? (
          <AnswerBoard />
        ) : (
          <Container centerContent>
            <CircularProgress isIndeterminate color="primary.300" />
          </Container>
        )}
      </Container>
      <AnswerInput onOpen={onOpen} />
      <GameOverModal
        status={lifes < 1 ? "fail" : "success"}
        isOpen={isOpen}
        onClose={handleRestart}
        handleRestart={handleRestart}
      />
    </Box>
  );
};

export default Hangman;
