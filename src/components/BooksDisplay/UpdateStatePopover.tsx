/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
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
}
export function UpdateStatePopover({ book }: UpdateStatePopoverProps) {
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

    if (book.status === "devolvido") {
        return (
            <Popover placement="top">
                <Tag size="lg" colorScheme="green" py="2">
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
                    <TagLabel ml="2">Devolvido</TagLabel>
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
                            disabled
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
    if (book.endDate < new Date(Date.now()).toISOString()) {
        return (
            <Popover placement="top">
                <Tag size="lg" colorScheme="red" py="2">
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
                    <TagLabel ml="2">Em atraso</TagLabel>
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
    return (
        <Popover placement="top">
            <Tag size="lg" colorScheme="red" py="2">
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
                <TagLabel ml="2">Pendente</TagLabel>
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
