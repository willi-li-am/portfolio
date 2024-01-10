import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { THEME } from "../../constants";

//setLoading in Submit Button and then onCLose

const GeneralModal = ({
  children,
  isOpen,
  onClose,
  header,
  onSubmit,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={THEME[1]} color={"white"}>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            onClick={() => {
              onSubmit();
            }}
            colorScheme="blue"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GeneralModal;
