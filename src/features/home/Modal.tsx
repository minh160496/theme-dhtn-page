import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FormGetFly } from "../../components/FormContact";

interface IModalBase {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalBase = (props: IModalBase) => {
  const { onClose, isOpen } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"transparent"} shadow={"none"}>
          <ModalCloseButton />
          <ModalBody rounded={"sm"} p={0}>
            <FormGetFly />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
