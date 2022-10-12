/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { useEffect } from "react";
import { RiUser3Fill } from "react-icons/ri";

import { Flex, Text, HStack, VStack, Avatar } from "@chakra-ui/react";

import { useBooks } from '../../hooks/useBooks';
import { useUsers } from "../../hooks/useUsers";
import { BookProps } from "../../interfaces/Book";
import { UserProps } from "../../interfaces/User";
import { borrowBook } from '../../store/books/actions';
import { requestUsersFirebase } from "../../store/users/actions";


export function UsersMap() {
    const { users } = useUsers();
    const { books } = useBooks();

    useEffect(() => {
        requestUsersFirebase();
    }, []);


    return (
        <>
            {users.map((user: UserProps) => {
                return (
                    <Flex
                        marginTop={10}
                        border="1px solid var(--chakra-colors-chakra-border-color)"
                        borderRadius="2xl"
                    >
                        <HStack p="10" w="85%">
                            <Avatar
                                size="lg"
                                name={`${user.name}`}
                                bg="gray.100"
                                icon={<RiUser3Fill fontSize="1.5rem" />}
                                color="gray.700"
                                src={`${user.image}`}
                            />
                            <VStack alignItems="flex-start" lineHeight="1" pl="5">
                                <Text fontSize="xl" fontWeight="semibold">
                                    {user.name}
                                </Text>
                                <Text fontSize="sm">{user.email}</Text>


                            </VStack>
                        </HStack>
                        <Flex justifyContent="center" alignItems="center" px="16">
                            <Text fontSize="4xl">{user.books | 0}</Text>
                        </Flex>
                    </Flex>
                );
            })}
        </>
    );
}
