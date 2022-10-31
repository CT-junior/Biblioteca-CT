import { useEffect } from "react";
import { RiUser3Fill } from "react-icons/ri";

import {
  Flex,
  Text,
  HStack,
  VStack,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useUsers } from "../../hooks/useUsers";
import { UserProps } from "../../interfaces/User";
import { requestUsersFirebase } from "../../store/users/actions";

export function UsersMap() {
  const { users } = useUsers();

  const isMobileView = useBreakpointValue({
    base: true,
    md: false,
  });

  useEffect(() => {
    requestUsersFirebase();
  }, []);

  if (!isMobileView) {
    return (
      <>
        {users.map((user: UserProps) => {
          return (
            <Flex
              marginTop={10}
              border="1px solid var(--chakra-colors-chakra-border-color)"
              borderRadius="2xl"
              justifyContent="space-between"
            >
              <HStack p="10" w="500px">
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

  return (
    <>
      {users.map((user: UserProps) => {
        return (
          <Flex
            marginTop={10}
            border="1px solid var(--chakra-colors-chakra-border-color)"
            borderRadius="2xl"
            flexDirection="column"
            minW="280px"
          >
            <VStack py="10" px="5" alignItems="center">
              <Avatar
                size="lg"
                name={`${user.name}`}
                bg="gray.100"
                icon={<RiUser3Fill fontSize="1.5rem" />}
                color="gray.700"
                src={`${user.image}`}
              />
              <VStack alignItems="center" lineHeight="1">
                <Text fontSize="lg" fontWeight="semibold" textAlign="center">
                  {user.name}
                </Text>
                <Text fontSize="smaller">{user.email}</Text>
              </VStack>
            </VStack>
            <Text textAlign="center">Livros em posse</Text>
            <Flex justifyContent="center" alignItems="center">
              <Text fontSize="4xl" paddingBottom="10">
                {user.books | 0}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
}
