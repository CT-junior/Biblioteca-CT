/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { ReactNode } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdReturnRight } from "react-icons/io";
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
    Button,
    useToast,
    Tag,
    TagLabel,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { BooksUserProps } from "../../interfaces/Book";
import { reBorrowBook, returnBookUser } from "../../store/books/actions";

interface UpdateStatePopoverProps {
    book: BooksUserProps;
    children: ReactNode;
    colorScheme: "red" | "green" | "orange";
    returned?: boolean;
}
export function UpdateStatePopover({
    book,
    children,
    colorScheme,
    returned = false,
}: UpdateStatePopoverProps) {
    const toast = useToast();
    const { data: session } = useSession();

    const handleReturnBook = async () => {
        await returnBookUser(session?.user, book);
        toast({
            title: "Livro devolvido com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    const handleReBorrowedBook = async () => {
        await reBorrowBook(book, session?.user);
        toast({
            title: "Livro re-alugado com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };
    return (
        <Popover placement="top">
            <Tag size="lg" colorScheme={colorScheme} py="2">
                <PopoverTrigger>
                    <IconButton
                        aria-label="Open popover"
                        size="sm"
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        borderRadius="full"
                        _hover={{
                            bg: "blackAlpha.50",
                        }}
                    />
                </PopoverTrigger>
                <TagLabel ml="2">{children}</TagLabel>
            </Tag>

            <PopoverContent py="4" px="6" shadow="md" borderRadius="full">
                <HStack align="center">
                    <Button
                        size="md"
                        w="100%"
                        fontWeight="normal"
                        borderRadius="full"
                        borderColor="green.500"
                        borderWidth="1px"
                        bg="white"
                        color="green.500"
                        _hover={{
                            bg: "green.50",
                        }}
                        onClick={handleReBorrowedBook}
                        disabled={!returned}
                    >
                        <HStack>
                            <Icon as={MdEdit} />
                            <Text>Re-alugar</Text>
                        </HStack>
                    </Button>
                    <Button
                        colorScheme="green"
                        size="md"
                        w="100%"
                        fontWeight="normal"
                        borderRadius="full"
                        onClick={handleReturnBook}
                        disabled={returned}
                    >
                        <HStack>
                            <Icon as={IoMdReturnRight} />
                            <Text>Devolver</Text>
                        </HStack>
                    </Button>
                </HStack>
                <PopoverArrow />
            </PopoverContent>
        </Popover>
    );
}
