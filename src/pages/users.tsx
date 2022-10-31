/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { Flex, Table, Td, Th, useBreakpointValue } from '@chakra-ui/react';
import { NextPage } from "next";
import Head from "next/head";

import { HeadTitle } from "../components/HeadTitle";
import { UsersMap } from "../components/UsersMap";


const Users: NextPage = () => {

    const isMobileView = useBreakpointValue({
        base: true,
        md: false,
    })

    if (isMobileView) {
        return (
            <>
                <Head>
                    <title>BiblioCTeca | Usuários</title>
                </Head>
                <HeadTitle title="Membros" />
                <Flex flexWrap="wrap" justifyContent="space-around" overflowY="scroll" height="75vh">
                    <UsersMap />
                </Flex>

            </>
        );
    }
    return (
        <>
            <Head>
                <title>BiblioCTeca | Usuários</title>
            </Head>
            <HeadTitle title="Membros" />

            <Table>
                <Th w="100%" fontSize="sm">
                    <Td p='0' w="85vw" border="none">Membros</Td>
                    <Td p='0' w="15vw" border="none">Livros em posse</Td>
                </Th>
            </Table>
            <Flex flexDirection="column" overflowY="scroll" height="75vh">
                <UsersMap />
            </Flex>

        </>
    );
};

export default Users;
