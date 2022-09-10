/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect } from "react";

import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Home: NextPage = () => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status != "loading") {
            if (status == "unauthenticated") {
                router.push("/auth/signin");
            }
        }
    }, [router, status]);

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" mx="auto" mt="16">
                <Sidebar />
            </Flex>
        </Flex>
    );
};

export default Home;
