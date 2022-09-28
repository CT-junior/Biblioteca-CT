/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useState } from "react";

import { Box, Input, Heading, Divider } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import { filterListBookUserBySearchIndex } from "../common/functions";
import { BookRow } from "../components/BookRow";
import { TableBooksUser } from "../components/TableBooksUser";
import { useBooks } from "../hooks/useBooks";

const Home: NextPage = () => {
    const { data: session } = useSession();
    const { booksUser } = useBooks();
    const [search, setSearch] = useState("");
    const filteredBookList = filterListBookUserBySearchIndex(booksUser, search);
    return (
        <>
            <Head>
                <title>BiblioCTeca</title>
            </Head>
            <Box
                display="flex"
                flexDirection="column"
                gap="30"
                alignItems="center"
            >
                <Heading textAlign="center">
                    Bem vindo, {session?.user?.name}
                </Heading>
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
