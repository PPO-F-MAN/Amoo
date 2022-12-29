import { Container, Flex, useDisclosure } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { resetGameAtom, userLifeAtom } from "../../atoms/hangman";
import { GameOverModal } from "../../components/common";
import { AnswerBoard, InputForm } from "../../components/Hangman";
import { Heart } from "../../components/Hangman/Heart";
import { LIFES } from "../../constants";

const Hangman = () => {
  const [, restartGame] = useAtom(resetGameAtom);
  const [lifes, setLifes] = useAtom(userLifeAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRestart = () => {
    restartGame();
    setLifes(LIFES);
    onClose();
  };

  return (
    <Container centerContent>
      <h1>Game 1</h1>
      <Flex minH={"70vh"} direction={"column"} justifyContent={"space-between"}>
        <div>
          <h2>결과 모니터</h2>
          <Heart />
        </div>
        <AnswerBoard />
        <InputForm onOpen={onOpen} />
      </Flex>
      <GameOverModal
        status={lifes < 1 ? "fail" : "success"}
        isOpen={isOpen}
        onClose={handleRestart}
        handleRestart={handleRestart}
      />
    </Container>
  );
};

export default Hangman;
