import { useEffect } from "react";
import { HiCloudDownload } from "react-icons/hi";

import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { sortLastDateFirst } from "../common/functions";
import { useRegistries } from "../hooks/useRegistries";
import { RegistryProps } from "../interfaces/Registry";
import { requestRegistriesFirebase } from "../store/registries/actions";

const Logs: NextPage = () => {
  const { registries } = useRegistries();

  useEffect(() => {
    requestRegistriesFirebase();
  }, []);

  const list = [...registries];
  list.sort(sortLastDateFirst);

  return (
    <>
      <Head>
        <title>BiblioCTeca | Registros</title>
      </Head>
      <Flex
        align="center"
        justify="space-between"
        aria-label="second-header"
        pb="6"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Heading as="h1" fontSize="xl">
          Registros
        </Heading>
        <Button
          colorScheme="orange"
          size="sm"
          borderRadius="full"
          fontWeight="sm"
          px="4"
          rightIcon={<HiCloudDownload />}
        >
          Exportar como CSV
        </Button>
      </Flex>
      <Box
        backgroundColor="blackAlpha.50"
        padding="10"
        borderWidth="1px"
        borderRadius="lg"
        h="70vh"
        overflow="scroll"
        mt="8"
      >
        <Flex
          gap="4"
          align="flex-start"
          direction="column"
          overflow="clip"
          w="max-content"
        >
          {list.map((registry: RegistryProps) => {
            return (
              <Text verticalAlign="center" as="p" gap="1" key={registry.id}>
                {new Date(registry.date).toLocaleDateString("pt-BR", {
                  dateStyle: "short",
                })}
                {" às "}
                {new Date(registry.date).toLocaleTimeString("pt-BR", {
                  timeStyle: "short",
                })}
                {" | O livro"}
                <Text display="inline" fontWeight="bold">
                  <Link href={`/library/${registry.book.id}`}>
                    {` ${registry.book.name} ↗ `}
                  </Link>
                </Text>
                {`foi ${registry.action} por`}
                <Avatar
                  src={`${registry.user.image}`}
                  size="sm"
                  ml="2"
                  my="auto"
                  verticalAlign="middle"
                />
                <Text as="b">{` ${registry.user.name}`}</Text>
              </Text>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default Logs;
