/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { Box, Input, Heading, Divider } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import { BookRow } from "../components/BookRow";
import { TableBooksUser } from "../components/TableBooksUser";
import { useBooks } from "../hooks/useBooks";

const Home: NextPage = () => {
    const { data: session } = useSession();
    const { booksUser } = useBooks();

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
                <Input placeholder="O que deseja buscar?" w="sm" />
            </Box>
            <Divider marginBlock="10" />
            <Box>
                <Heading size="md">Seus livros</Heading>
                <TableBooksUser>
                    {booksUser.map((book) => (
                        <BookRow book={book} key={book.description.id} />
                    ))}
                </TableBooksUser>
            </Box>
        </>
    );
};

export default Home;
