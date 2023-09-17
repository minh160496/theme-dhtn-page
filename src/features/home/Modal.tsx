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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"white"} pt={"12px"} rounded={"sm"}>
          <ModalCloseButton />
          <ModalBody rounded={"sm"}>
            <FormGetFly />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
