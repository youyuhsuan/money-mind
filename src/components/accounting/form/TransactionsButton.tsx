"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import AccountForm from "./AccountForm";

const TransactionsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Button variant="ghost" onClick={onOpen} gap={1}>
        <Plus />
      </Button>
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg={colorMode === "light" ? "#faf9f0" : "#171407"}>
          <ModalHeader>Add Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AccountForm></AccountForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionsButton;
