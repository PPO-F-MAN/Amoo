import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type GameStatements = "success" | "fail";

interface ModalProps {
  status: GameStatements;
  isOpen: boolean;
  onClose: () => void;
  handleRestart: () => void;
}

export const GameOverModal = ({ status, isOpen, onClose, handleRestart }: ModalProps) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"primary.900"}>
        <ModalHeader color={"primary.200"} m={"auto"}>
          {status === "success" ? "SUCCESS 🎉" : "FAIL 😭"}
        </ModalHeader>
        <ModalCloseButton color={"primary.100"} onClick={() => navigate("/game")} />
        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={handleRestart}>
            RESTART
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
