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
} from "@chakra-ui/react";
import AccountForm from "./AccountForm";
import { Plus } from "lucide-react";

const TransactionsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} gap={1}>
        <Plus />
        New
      </Button>
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
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
