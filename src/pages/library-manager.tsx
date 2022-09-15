/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect } from "react";
import { HiPlus, HiSearch, HiCloudDownload } from "react-icons/hi";

import {
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Tr,
    useBreakpointValue,
    Td,
    Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";

import {
    colorSchemeOrangeCt,
    colorSchemeOrangeCtOutline,
} from "../common/utils";
import { AddBookModal } from "../components/AddBookModal";
import { MoreSettingsPopover } from "../components/MoreSettingsPopover";
import { Pagination } from "../components/Pagination";
import { TableLibraryManager } from "../components/TableLibraryManager";
import { useBooks } from "../hooks/useBooks";
import { useSidebar } from "../hooks/useSidebar";
import { BookProps } from "../interfaces/Book";
import { onOpenAddBookModal } from "../store/addBookModal/actions";
import { requestBooksFirebase } from "../store/books/actions";

const LibraryManager: NextPage = () => {
    const { books } = useBooks();
    const isOpenSidebar = useSidebar().isOpen;
    const isWideVersion = useBreakpointValue({
        base: false,
        sm: true,
    });

    const isSideBarDrawer = useBreakpointValue({
        base: true,
        md: false,
    });

    useEffect(() => {
        requestBooksFirebase();
    }, []);

    return (
        <>
            <Flex
                align={["flex-start", "center"]}
                aria-label="second-header"
                pb="6"
                borderBottom="1px"
                borderColor="gray.200"
                gap="2"
                direction={["column", "column", "row"]}
            >
                <Heading as="h1" fontSize="xl">
                    Gerenciador de biblioteca
                </Heading>
                <HStack>
                    <Button
                        onClick={onOpenAddBookModal}
                        size="sm"
                        width="100%"
                        maxW="40"
                        leftIcon={<Icon as={HiPlus} color="white" />}
                        borderRadius="full"
                        {...colorSchemeOrangeCt}
                    >
                        Adicionar Livro
                    </Button>
                    {isWideVersion && (
                        <InputGroup w="32" size="sm">
                            <InputLeftElement>
                                <Icon as={HiSearch} color="orange.ct" />
                            </InputLeftElement>
                            <Input
                                placeholder="Pequisar"
                                variant="outline"
                                borderRadius="full"
                                {...colorSchemeOrangeCtOutline}
                            />
                        </InputGroup>
                    )}
                </HStack>
                <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<Icon as={HiCloudDownload} color="orange.ct" />}
                    {...colorSchemeOrangeCtOutline}
                    borderRadius="full"
                    width="100%"
                    maxW="28"
                    fontWeight="sm"
                    px="8"
                    ml={["unset", "unset", "auto"]}
                >
                    Exportar
                </Button>
            </Flex>
            <TableLibraryManager>
                {books.map((book: BookProps) => {
                    return (
                        <Tr key={book.id}>
                            <Td display="revert">
                                <HStack>
                                    {book.imageUrl && (
                                        <Image
                                            src={book.imageUrl}
                                            alt={book.name}
                                            width="27px"
                                            height="40px"
                                        />
                                    )}
                                    <Text>{book.name}</Text>
                                </HStack>
                            </Td>
                            <Td display={["none", "none", "none", "revert"]}>
                                {book.volume}
                            </Td>
                            <Td display={["none", "none", "revert"]}>
                                {book.author}
                            </Td>
                            <Td display={["none", "revert"]}>
                                {book.category}
                            </Td>
                            <Td display={["none", "none", "revert"]}>
                                {new Date(book.createdAt).toLocaleDateString(
                                    "pt-BR",
                                    {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </Td>
                            <Td textAlign={["end", "end", "center"]}>
                                <MoreSettingsPopover book={book} />
                            </Td>
                        </Tr>
                    );
                })}
            </TableLibraryManager>
            <Pagination />
            <AddBookModal />
        </>
    );
};

export default LibraryManager;
