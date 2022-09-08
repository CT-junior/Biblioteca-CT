import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
  Flex,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";

import { useState } from "react";
import Image from "next/image";
import addBookPhoto from "../assets/images/add_a_photo.svg"

interface AddBookModalProps extends ModalProps {}

export function AddBookModal({ ...rest }: AddBookModalProps) {
  const [imageFile, setImageFile] = useState<File>();
  const [imageDisplay, setImageDisplay] = useState(addBookPhoto);

  function handleImageChange(event: React.FormEvent) {
    const image = (event.target as HTMLInputElement).files[0];

    if (!!image) {
      if (image.type.match(/^image\/(jpeg|png|gif)$/)) {
        setImageFile(image);
        setImageDisplay(URL.createObjectURL(image));
        return;
      }
      alert("Arquivo de formato inválido!");
    }
  }

  function resetUseStates(){
    setImageDisplay(addBookPhoto);
    setImageFile(null);
  }


  return (
    <Modal {...rest} size="2xl" isCentered onOverlayClick={resetUseStates}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar livro</ModalHeader>
        <ModalCloseButton onClick={resetUseStates}/>
        <ModalBody>
          <Flex as="form" w="100%" p="8" borderRadius={8} flexDir="row" gap="6">
            <FormControl flex="1 ">
              <FormLabel
                textAlign="center"
                htmlFor="file"
                h="100%"
                w="100%"
                borderRadius="15px"
                border="1px"
                borderColor="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={imageDisplay} layout="fill"  />
              </FormLabel>
              <Input
                    name="file"
                    id="file"
                    type="file"
                    display="none"
                    onChange={(ev) => handleImageChange(ev)}
                  />
            </FormControl>

            <Stack spacing="4" flexDirection="column" flex="2">
              <FormControl>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input name="name" id="name" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="author">Autor</FormLabel>
                <Input name="author" id="author" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="volume">Volume</FormLabel>
                <Input name="volume" id="volume" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="category">Categoria</FormLabel>
                <Input name="category" id="category" type="text" />
              </FormControl>
            </Stack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button leftIcon={<HiPlus />} colorScheme="orange">
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
