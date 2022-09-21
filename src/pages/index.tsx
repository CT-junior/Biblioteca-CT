/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect } from "react";

import { Box, Input, Heading, Divider } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { BooksDisplay } from "../components/BooksDisplay";
import { requestBooksFirebase } from "../store/books/actions";

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        requestBooksFirebase();
        if (status !== "loading") {
            if (status === "unauthenticated") {
                router.push("/auth/signin");
            }
        }
    }, [router, status]);

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
                />
            </Box>
        </>
    );
};

export default Home;
