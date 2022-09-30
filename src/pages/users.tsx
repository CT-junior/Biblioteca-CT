/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { NextPage } from "next";
import Head from "next/head";

import { HeadTitle } from "../components/HeadTitle";

const Users: NextPage = () => {
    return (
        <>
            <Head>
                <title>BiblioCTeca | Usuários</title>
            </Head>
            <HeadTitle title="Membros" />
        </>
    );
};

export default Users;
