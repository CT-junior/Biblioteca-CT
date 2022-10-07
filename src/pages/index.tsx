import { useState } from "react";

import { Box, Input, Heading, Divider } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import { filterListBookUserBySearchIndex } from "../common/functions";
import { BookRow } from "../components/BookRow";
import { TableBooksUser } from "../components/TableBooksUser";
import { useBooks } from "../hooks/useBooks";
import { useUser } from "../hooks/useUser";

const Home: NextPage = () => {
  const { user } = useUser();
  const { booksUser } = useBooks();
  const [search, setSearch] = useState("");
  const filteredBookList = filterListBookUserBySearchIndex(booksUser, search);
  return (
    <>
      <Head>
        <title>BiblioCTeca</title>
      </Head>
      <Box display="flex" flexDirection="column" gap="30" alignItems="center">
        <Heading textAlign="center">{`Bem vindo, ${user.name}`}</Heading>
        <Input
          placeholder="O que deseja buscar?"
          w="sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Divider marginBlock="10" />
      <Box>
        <Heading size="md">Seus livros</Heading>
        <TableBooksUser>
          {filteredBookList.map((book) => (
            <BookRow book={book} key={book.description.id} />
          ))}
        </TableBooksUser>
      </Box>
    </>
  );
};

export default Home;
