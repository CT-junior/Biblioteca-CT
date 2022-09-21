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
    Image,
    CircularProgress,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";

import { BookProps } from "../../interfaces/Book";
import { UserProps } from "../../interfaces/User";
import { bookSchema } from "../../schemas/book";
import { editBook } from "../../store/books/actions";
import { Input } from "./input";

interface EditBookModalProps {
    book: BookProps;
    isOpen: boolean;
    onClose: () => void;
}

export function EditBookModal({ book, isOpen, onClose }: EditBookModalProps) {
    const toast = useToast();
    const { data: session } = useSession();

    const [imageFile, setImageFile] = useState<File>();
    const [imageDisplay, setImageDisplay] = useState(book.imageUrl);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(bookSchema),
    });

    const handleEditBook: SubmitHandler<BookProps> = async (newValues) => {
        const user: UserProps = {
            name: String(session?.user?.name),
            email: String(session?.user?.email),
            image: String(session?.user?.image),
        };

        await editBook(book, newValues, imageFile, user);
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

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
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
                                width="100%"
                                height="100%"
                                textAlign="center"
                                alignItems="center"
                                justifyContent="center"
                                display="flex"
                                htmlFor="file"
                                borderRadius="15px"
                                border="1px"
                                borderColor="gray.200"
                            >
                                <Image
                                    borderRadius="15px"
                                    border="1px"
                                    borderColor="gray.200"
                                    boxSize="100%"
                                    objectFit="cover"
                                    src={imageDisplay}
                                    fallback={
                                        <CircularProgress
                                            isIndeterminate
                                            capIsRound
                                            trackColor="transparent"
                                            color="orange.ct"
                                        />
                                    }
                                />
                            </FormLabel>
                            <InputChakra
                                name="file"
                                id="file"
                                type="file"
                                display="none"
                                onChange={(ev) => handleImageChange(ev)}
                            />
                        </FormControl>

                        <Stack spacing="10" flexDirection="column" flex="3">
                            <Stack>
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
                            </Stack>
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
