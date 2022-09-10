/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect, useState } from "react";
import { HiPlus, HiSearch, HiCloudDownload } from "react-icons/hi";

import {
    Box,
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
    useDisclosure,
    Td,
    Text,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";

import {
    colorSchemeOrangeCt,
    colorSchemeOrangeCtOutline,
} from "../common/utils";
import { AddBookModal } from "../components/AddBookModal";
import { Header } from "../components/Header";
import { MoreSettingsPopover } from "../components/MoreSettingsPopover";
import { Pagination } from "../components/Pagination";
import { Sidebar } from "../components/Sidebar";
import { TableLibraryManager } from "../components/TableLibraryManager";
import { useSidebar } from "../hooks/sidebar";
import { BookProps } from "../interfaces/BookProps";
import { db } from "../services/firebase";

const LibraryManager: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [books, setBooks] = useState<BookProps[]>([]);

    const isOpenSidebar = useSidebar().isOpen;
    const isWideVersion = useBreakpointValue({
        base: false,
        sm: true,
    });

    const isSideBarDrawer = useBreakpointValue({
        base: true,
        md: false,
    });

    const marginLeft = () => {
        if (isSideBarDrawer) {
            return "60px";
        }
        if (isOpenSidebar) {
            return "256px";
        }
        return "80px";
    };

    const bookCollectionRef = collection(db, "books");

    useEffect(() => {
        const getBooks = async () => {
            const data = await getDocs(bookCollectionRef);

            setBooks(
                data.docs.map((doc) => ({
                    id: doc.id,
                    imageUrl: doc.data().imageUrl,
                    name: doc.data().name,
                    author: doc.data().author,
                    category: doc.data().category,
                    volume: doc.data().volume,
                    createdAt: new Date(
                        doc.data().createdAt
                    ).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    }),
                }))
            );
        };

        getBooks();
    }, [bookCollectionRef]);

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" mx="auto" mt="16">
                <Sidebar />
                <Box
                    w="100%"
                    px="8"
                    py="8"
                    ml={isSideBarDrawer ? "0" : isOpenSidebar ? "64" : "20"}
                    transition="0.2s"
                >
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
                                onClick={onOpen}
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
                                    <InputLeftElement
                                        children={
                                            <Icon
                                                as={HiSearch}
                                                color="orange.ct"
                                            />
                                        }
                                    />
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
                            rightIcon={
                                <Icon as={HiCloudDownload} color="orange.ct" />
                            }
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
                        {books.map((book) => {
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
                                    <Td
                                        display={[
                                            "none",
                                            "none",
                                            "none",
                                            "revert",
                                        ]}
                                    >
                                        {book.volume}
                                    </Td>
                                    <Td display={["none", "none", "revert"]}>
                                        {book.author}
                                    </Td>
                                    <Td display={["none", "revert"]}>
                                        {book.category}
                                    </Td>
                                    <Td display={["none", "none", "revert"]}>
                                        {book.createdAt}
                                    </Td>
                                    <Td textAlign={["end", "end", "center"]}>
                                        <MoreSettingsPopover />
                                    </Td>
                                </Tr>
                            );
                        })}
                    </TableLibraryManager>
                    <Pagination />
                    <AddBookModal isOpen={isOpen} onClose={onClose} children />
                </Box>
            </Flex>
        </Flex>
    );
};

export default LibraryManager;
