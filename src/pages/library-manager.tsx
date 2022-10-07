import { useEffect, useState } from "react";
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
import Head from "next/head";
import Image from "next/image";

import { filterListBookBySearchIndex } from "../common/functions";
import {
  colorSchemeOrangeCt,
  colorSchemeOrangeCtOutline,
} from "../common/utils";
import { AddBookModal } from "../components/AddBookModal";
import { MoreSettingsPopover } from "../components/MoreSettingsPopover";
import { TableLibraryManager } from "../components/TableLibraryManager";
import { useBooks } from "../hooks/useBooks";
import { BookProps } from "../interfaces/Book";
import { onOpenAddBookModal } from "../store/addBookModal/actions";
import { requestBooksFirebase } from "../store/books/actions";

const LibraryManager: NextPage = () => {
  const { books } = useBooks();

  useEffect(() => {
    requestBooksFirebase();
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });
  const [search, setSearch] = useState("");
  const filteredBookList = filterListBookBySearchIndex(books, search);
  return (
    <>
      <Head>
        <title>BiblioCTeca | Gerenciador de Biblioteca</title>
      </Head>
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
                onChange={(e) => setSearch(e.target.value)}
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
        {filteredBookList.map((book: BookProps) => {
          return (
            <Tr key={book.id}>
              <Td>
                <HStack>
                  {book.imageUrl && (
                    <Image
                      src={book.imageUrl}
                      alt={book.name}
                      width="27px"
                      height="40px"
                      objectFit="cover"
                    />
                  )}
                  <Text>{book.name}</Text>
                </HStack>
              </Td>
              <Td>{book.volume}</Td>
              <Td>{book.author}</Td>
              <Td>{book.category}</Td>
              <Td>
                {new Date(book.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Td>
              <Td textAlign={["end", "end", "center"]}>
                <MoreSettingsPopover book={book} />
              </Td>
            </Tr>
          );
        })}
      </TableLibraryManager>
      <AddBookModal />
    </>
  );
};

export default LibraryManager;
