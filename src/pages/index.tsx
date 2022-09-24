/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect } from "react";

import { Box, Input, Heading, Divider } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { BooksDisplay } from "../components/BooksDisplay";
import { useBooks } from "../hooks/useBooks";
import { requestBooksUserFirebase } from "../store/books/actions";

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const { booksUser } = useBooks();
    const router = useRouter();

    useEffect(() => {
        if (status !== "loading") {
            if (status === "unauthenticated") {
                router.push("/auth/signin");
            } else {
                requestBooksUserFirebase(session?.user?.id);
            }
        }
    }, [router, session?.user?.id, status]);

    return (
        <>
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
                <BooksDisplay
                    backgroundColor="white"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="xl"
                    padding="10"
                    size="10rem"
                    shadow="md"
                    hasHead
                    books={booksUser}
                />
            </Box>
        </>
    );
};

export default Home;
