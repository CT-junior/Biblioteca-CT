/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useState, useEffect, FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiPlus } from "react-icons/hi";

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
    useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { setDoc, doc } from "firebase/firestore";
import Image from "next/image";

import addBookPhoto from "../../assets/images/add_a_photo.svg";
import { IBookState } from "../../interfaces/Book";
import { bookSchema } from "../../schemas/book";
import { db, handleUploadImage } from "../../services/firebase";
import { addBook } from "../../store/books/actions";
import { Input } from "./input";

interface AddBookModalProps extends ModalProps {}

export function AddBookModal({ ...rest }: AddBookModalProps) {
    const toast = useToast();

    const [imageFile, setImageFile] = useState<File>();
    const [imageDisplay, setImageDisplay] = useState(addBookPhoto);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(bookSchema),
    });

    const handleAddBook: SubmitHandler<IBookState> = async (values) => {
        const randonNumber = String(Math.floor(Math.random() * 100000));

        const name = values.name
            .replace(/\s+/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase();

        const id = `${name}.${randonNumber}`;

        const imageUrl = await handleUploadImage(imageFile, id);

        const createdAt = new Date(Date.now()).toISOString();

        const book: IBookState = {
            id,
            createdAt,
            imageUrl,
            ...values,
        };
        addBook({
            id: book.id,
            imageUrl: book.imageUrl,
            name: book.name,
            author: book.author,
            category: book.category,
            volume: book.volume,
            createdAt: new Date(book.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
        });

        await setDoc(doc(db, "books", book.id), book);

        toast({
            title: "Livro adicionado com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                name: "",
                author: "",
                volume: "",
                category: "",
            });
            setImageDisplay(addBookPhoto);
        }
    }, [isSubmitting, isSubmitSuccessful, reset]);

    function handleImageChange(event: FormEvent) {
        const image = (event.target as HTMLInputElement).files[0];

        if (image) {
            if (image.type.match(/^image\/(jpeg|png|gif)$/)) {
                setImageFile(image);
                setImageDisplay(URL.createObjectURL(image));
                return;
            }
            // eslint-disable-next-line no-alert
            alert("Arquivo de formato inválido!");
        }
    }

    function resetUseStates() {
        setImageDisplay(addBookPhoto);
        setImageFile(null);
    }

    return (
        <Modal {...rest} size="2xl" isCentered>
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
                        onSubmit={handleSubmit(handleAddBook)}
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
                            <Button
                                leftIcon={<HiPlus />}
                                colorScheme="orange"
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Adicionar
                            </Button>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
