/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { Table, Td, Th, Tr } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import { HeadTitle } from "../components/HeadTitle";
import { UsersMap } from "../components/UsersMap";


const Users: NextPage = () => {
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
            <UsersMap />

        </>
    );
};

export default Users;
