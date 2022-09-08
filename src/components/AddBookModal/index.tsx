import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
  Flex,
  Stack,
  Input as InputChakra,
  FormControl,
  FormLabel,
  useToast
} from "@chakra-ui/react";

import { useState } from "react";
import Image from "next/image";

import {  } from "../../services/firebase";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookSchema } from "../../schemas/book";

import addBookPhoto from "../../assets/images/add_a_photo.svg";
import { HiPlus } from "react-icons/hi";

import { Input } from "./input";

interface AddBookModalProps extends ModalProps {}

type BookFormData = {
  id: string;
  name: string;
  author: string;
  volume: string;
  category: string;
};

export function AddBookModal({ ...rest }: AddBookModalProps) {
  
  const toast = useToast();
  
  const [imageFile, setImageFile] = useState<File>();
  const [imageDisplay, setImageDisplay] = useState(addBookPhoto);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookSchema),
    shouldUnregister: false,
  });


  const handleAddBook: SubmitHandler<
  BookFormData
  > = async (values) => {
    toast({
      title: 'Aguarde o fim do cadastro!',
      description: "Cadastrando...",
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
    
    // const imageUrl = await handleUploadImage(imageFile);

    const randomNumber = Math.floor(Math.random() * 100000);
    const id = `${randomNumber}`;

    const book: BookFormData = {
      id,
      ...values,
    };

    // await fetch('/api/congressist', {
    //   method: "POST",
    //   body: JSON.stringify({"congressist":congressist})
    // })

    toast({
      title: 'Livro adicionado com sucesso!',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

  };

  const onSubmit = async () => {
    await handleAddBook;
  };

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

  function resetUseStates() {
    setImageDisplay(addBookPhoto);
    setImageFile(null);
  }

  return (
    <Modal {...rest} size="2xl" isCentered onOverlayClick={resetUseStates}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar livro</ModalHeader>
        <ModalCloseButton onClick={resetUseStates} />
        <ModalBody>
          <Flex
            as="form"
            w="100%"
            p="8"
            borderRadius={8}
            flexDir="row"
            gap="6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                <Image src={imageDisplay} layout="fill" />
              </FormLabel>
              <InputChakra
                name="file"
                id="file"
                type="file"
                display="none"
                onChange={(ev) => handleImageChange(ev)}
                {...register("file")}
              />
            </FormControl>

            <Stack spacing="4" flexDirection="column" flex="2">
              <Input
                id="name"
                register={register}
                placeholder="Nome"
                error={errors.name?.message as string}
                isDisabled={isSubmitting}
              />
              <Input
                id="author"
                register={register}
                placeholder="Autor"
                error={errors.author?.message as string}
                isDisabled={isSubmitting}
              />
              <Input
                id="volume"
                register={register}
                placeholder="Volume"
                error={errors.volume?.message as string}
                isDisabled={isSubmitting}
              />
              <Input
                id="category"
                register={register}
                placeholder="Categoria"
                error={errors.category?.message as string}
                isDisabled={isSubmitting}
              />
              <Button leftIcon={<HiPlus />} colorScheme="orange" type="submit">
                Adicionar
              </Button>
            </Stack>

          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
