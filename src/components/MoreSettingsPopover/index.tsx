/* eslint-disable react/no-children-prop */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { FiMoreVertical } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import {
    HStack,
    Icon,
    Text,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Button,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { IBookState } from "../../interfaces/Book";
import { db, storage } from "../../services/firebase";
import { removeBook } from "../../store/books/actions";
import { EditBookModal } from "../EditBookModal";

interface MoreSettingsPopoverProps {
    book: IBookState;
}
export function MoreSettingsPopover({ book }: MoreSettingsPopoverProps) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleRemoveBook = async () => {
        const desertRef = ref(storage, book.id);

        await deleteObject(desertRef)
            .then(() => {
                console.log("Imagem deletada");
            })
            .catch((error) => {
                console.log(error);
            });
        await deleteDoc(doc(db, "books", book.id));

        removeBook(book.id);

        toast({
            title: "Livro deletado com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };
    return (
        <Popover placement="bottom-start">
            <PopoverTrigger>
                <IconButton
                    aria-label="Open popover"
                    size="sm"
                    icon={<FiMoreVertical />}
                    variant="ghost"
                    borderRadius="full"
                />
            </PopoverTrigger>
            <PopoverContent p={5} w="32">
                <Stack align="center">
                    <Button
                        variant="unstyled"
                        size="sm"
                        fontWeight="normal"
                        onClick={onOpen}
                    >
                        <HStack>
                            <Icon as={MdEdit} />
                            <Text>Editar</Text>
                        </HStack>
                    </Button>
                    <Button
                        size="sm"
                        fontWeight="normal"
                        onClick={handleRemoveBook}
                    >
                        <HStack>
                            <Icon as={IoMdTrash} />
                            <Text>Excluir</Text>
                        </HStack>
                    </Button>
                </Stack>
                <PopoverArrow />
            </PopoverContent>
            <EditBookModal
                isOpen={isOpen}
                onClose={onClose}
                book={book}
                children
            />
        </Popover>
    );
}
