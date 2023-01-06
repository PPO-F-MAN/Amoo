import { Box, CircularProgress, Container, useDisclosure, VisuallyHidden } from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

import { answerAtom, resetGameAtom, userLifeAtom } from "../../atoms/hangman";
import HangHeart from "../../components/common/HangHeart";
import { AnswerBoard, AnswerInput } from "../../components/Hangman";
import { GameOverModal } from "../../components/Hangman/GameOverModal";
import { Heart } from "../../components/Hangman/Heart";
import { LIFES } from "../../constants";

const Hangman = () => {
  const [, restartGame] = useAtom(resetGameAtom);
  const [lifes, setLifes] = useAtom(userLifeAtom);
  const answer = useAtomValue(answerAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = "100vh";
      window.visualViewport?.addEventListener("resize", resizeHeight);
    }

    return () => window.visualViewport?.removeEventListener("resize", resizeHeight);
  }, [containerRef.current]);

  const handleRestart = () => {
    restartGame();
    setLifes(LIFES);
    onClose();
  };

  const resizeHeight = () => {
    const height = window.visualViewport?.height ? `${window.visualViewport?.height}px` : "100vh";
    (containerRef.current as HTMLDivElement).style.height = height;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <Box
      ref={containerRef}
      bgColor="primary.900"
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
