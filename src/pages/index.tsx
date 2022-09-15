/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect } from "react";

import { Box, Input, Heading, Divider } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { BodyContent } from "../components/BodyContent/index";

const Home: NextPage = () => {
    const { data: session } = useSession();
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== "loading") {
            if (status === "unauthenticated") {
                router.push("/auth/signin");
            }
        }
    }, [router, status]);

    return (
        <BodyContent>
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
            </Box>
        </BodyContent>
    );
};

export default Home;
