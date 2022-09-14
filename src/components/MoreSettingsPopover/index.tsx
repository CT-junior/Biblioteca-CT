/* eslint-disable no-unused-expressions */
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
    const { onOpen, onClose, isOpen } = useDisclosure();
    const handleRemoveBook = async () => {
        removeBook(book.id);

        const imageRef = ref(storage, book.id);

        await deleteObject(imageRef);

        await deleteDoc(doc(db, "books", book.id));

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
            <PopoverContent py="6" px="4" w="36">
                <Stack align="center">
                    <Button
                        bg="transparent"
                        size="sm"
                        w="100%"
                        fontWeight="normal"
                        onClick={onOpen}
                        _hover={{
                            bg: "blackAlpha.50",
                        }}
                        borderRadius="full"
                    >
                        <HStack>
                            <Icon as={MdEdit} />
                            <Text>Editar</Text>
                        </HStack>
                    </Button>
                    <Button
                        bg="transparent"
                        size="sm"
                        w="100%"
                        fontWeight="normal"
                        onClick={handleRemoveBook}
                        _hover={{
                            bg: "blackAlpha.50",
                        }}
                        borderRadius="full"
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
                book={book}
                isOpen={isOpen}
                onClose={onClose}
                children
            />
        </Popover>
    );
}
