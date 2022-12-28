import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type GameStatements = "success" | "fail";

interface ModalProps {
  status: GameStatements;
  isOpen: boolean;
  onClose: () => void;
  handleRestart: () => void;
}

export const GameOverModal = ({ status, isOpen, onClose, handleRestart }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader m={"auto"}>{status === "success" ? "성공 🎉" : "실패 😭"} </ModalHeader>
        <ModalCloseButton />
        {/* <ModalBody>
          <Lorem count={2} />
        </ModalBody> */}
        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={handleRestart}>
            게임 다시 시작
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
