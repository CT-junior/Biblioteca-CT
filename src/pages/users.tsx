import { useEffect } from "react";

import { Avatar, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import { HeadTitle } from "../components/HeadTitle";
import { useUsers } from "../hooks/useUsers";
import { requestUsersFirebase } from "../store/users/actions";

const Users: NextPage = () => {
  const { users } = useUsers();

  useEffect(() => {
    requestUsersFirebase();
  }, []);

  return (
    <>
      <Head>
        <title>BiblioCTeca | Usuários</title>
      </Head>
      <HeadTitle title="Membros" />
      {users.map((user) => {
        return (
          <Flex gap="2" align="center" mb="6">
            {" "}
            <Avatar src={`${user.image}`} />
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.books | 0}</Text>
          </Flex>
        );
      })}
    </>
  );
};

export default Users;
