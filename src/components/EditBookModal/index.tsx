/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useState, FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEdit } from "react-icons/md";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Stack,
    Input as InputChakra,
    FormControl,
    FormLabel,
    useToast,
    ModalProps,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Image from "next/image";

import { IBookState } from "../../interfaces/Book";
import { bookSchema } from "../../schemas/book";
import { db, handleUploadImage, storage } from "../../services/firebase";
import { editBook } from "../../store/books/actions";
import { Input } from "./input";

interface EditBookModalProps extends ModalProps {
    book: IBookState;
}

export function EditBookModal({ book, ...rest }: EditBookModalProps) {
    const toast = useToast();

    const [imageFile, setImageFile] = useState<File>();
    const [imageDisplay, setImageDisplay] = useState(book.imageUrl);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(bookSchema),
    });

    const handleEditBook: SubmitHandler<IBookState> = async (values) => {
        let { imageUrl } = book;
        // se imageFile for diferente de nula, a imagem antiga é excluida, e uma nova é enviado ao storage
        if (imageFile != null) {
            const desertRef = ref(storage, book.id);

            await deleteObject(desertRef)
                .then(() => {
                    console.log("Imagem deletada");
                })
                .catch((error) => {
                    console.log(error);
                });

            imageUrl = await handleUploadImage(imageFile, book.id);
        }

        const createdAt = new Date(Date.now()).toISOString();

        const newBook: IBookState = {
            id: book.id,
            createdAt,
            imageUrl,
            ...values,
        };

        editBook(book.id, {
            id: book.id,
            imageUrl: newBook.imageUrl,
            name: newBook.name,
            author: newBook.author,
            category: newBook.category,
            volume: newBook.volume,
            createdAt: new Date(newBook.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
        });

        const bookDocRef = doc(db, "books", newBook.id);

        await updateDoc(bookDocRef, {
            imageUrl: newBook.imageUrl,
            name: newBook.name,
            author: newBook.author,
            category: newBook.category,
            volume: newBook.volume,
            createdAt: newBook.createdAt,
        });

        toast({
            title: "Livro editado com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

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

    // function resetStates() {
    //     reset({
    //         name: "",
    //         author: "",
    //         volume: "",
    //         category: "",
    //     });
    //     setImageDisplay("");
    // }

    console.log(book);

    return (
        <Modal {...rest} size="3xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar livro</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        as="form"
                        w="100%"
                        p="8"
                        borderRadius={8}
                        flexDir="row"
                        gap="6"
                        onSubmit={handleSubmit(handleEditBook)}
                    >
                        <FormControl flex="2">
                            <FormLabel
                                textAlign="center"
                                htmlFor="file"
                                borderRadius="15px"
                                border="1px"
                                borderColor="gray.200"
                                // display="flex"
                                // alignItems="center"
                                // justifyContent="center"
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

                        <Stack spacing="4" flexDirection="column" flex="3">
                            <Input
                                id="name"
                                register={register}
                                placeholder="Nome"
                                error={errors.name?.message as string}
                                isDisabled={isSubmitting}
                                defaultValue={book.name}
                            />
                            <Input
                                id="author"
                                register={register}
                                placeholder="Autor"
                                error={errors.author?.message as string}
                                isDisabled={isSubmitting}
                                defaultValue={book.author}
                            />
                            <Input
                                id="volume"
                                register={register}
                                placeholder="Volume"
                                error={errors.volume?.message as string}
                                isDisabled={isSubmitting}
                                defaultValue={book.volume}
                            />
                            <Input
                                id="category"
                                register={register}
                                placeholder="Categoria"
                                error={errors.category?.message as string}
                                isDisabled={isSubmitting}
                                defaultValue={book.category}
                            />
                            <Button
                                leftIcon={<MdEdit />}
                                colorScheme="orange"
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Editar
                            </Button>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
