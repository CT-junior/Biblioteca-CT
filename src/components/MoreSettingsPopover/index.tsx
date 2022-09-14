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

import { BookProps } from "../../interfaces/Book";
import { removeBook } from "../../store/books/actions";
import { EditBookModal } from "../EditBookModal";

interface MoreSettingsPopoverProps {
    book: BookProps;
}
export function MoreSettingsPopover({ book }: MoreSettingsPopoverProps) {
    const toast = useToast();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const handleRemoveBook = async () => {
        await removeBook(book.id);

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
            <EditBookModal book={book} isOpen={isOpen} onClose={onClose} />
        </Popover>
    );
}
