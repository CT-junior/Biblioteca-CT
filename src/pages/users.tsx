/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { NextPage } from "next";
import Head from "next/head";

import { HeadTitle } from "../components/HeadTitle";
import { useUser } from "../hooks/useUser";
import { useUsers } from "../hooks/useUsers";

const Users: NextPage = () => {
    const { users } = useUsers();
    console.log(users);
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
