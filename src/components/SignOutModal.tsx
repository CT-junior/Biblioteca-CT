import { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
  AlertDialogProps,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

interface SignOutModalProps extends AlertDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

export function SignOutModal({ onClose, isOpen, ...rest }: SignOutModalProps) {
  const cancelRef: any = useRef();

  return (
    <>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        motionPreset="slideInBottom"
        onClose={onClose}
        {...rest}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Deslogar da Bibliocteca?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Você tem certeza que deseja se desconectar?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Não
            </Button>
            <Button
              bg="orange.ct"
              color="white"
              ml={3}
              opacity={0.9}
              _hover={{
                bg: "prange.ct",
                opacity: "1",
                color: "white",
              }}
              onClick={() => signOut()}
            >
              Sim
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
