import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import { HiPlus, HiSearch, HiCloudDownload } from "react-icons/hi";

import {
  colorSchemeOrangeCt,
  colorSchemeOrangeCtOutline,
} from "../common/utils";

const LibraryManager: NextPage = () => {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" mx="auto">
        <Sidebar />
        <Box w="100%" px="8" py="8">
          <Flex
            align="center"
            justify="space-between"
            aria-label="second-header"
            pb="6"
            borderBottom="1px"
            borderColor="gray.200"
          >
            <HStack flex="2">
              <Heading as="h1" fontSize="2xl">
                Gerenciador de biblioteca
              </Heading>
              <Button
                size="sm"
                leftIcon={<Icon as={HiPlus} color="white" />}
                borderRadius="full"
                {...colorSchemeOrangeCt}
              >
                Adicionar Livro
              </Button>
              <InputGroup w="32" size="sm">
                <InputLeftElement
                  children={<Icon as={HiSearch} color="orange.ct" />}
                />
                <Input
                  placeholder="Pequisar"
                  variant="outline"
                  borderRadius="full"
                  {...colorSchemeOrangeCtOutline}
                />
              </InputGroup>
            </HStack>

            <HStack flex="1" justify="flex-end">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<Icon as={HiCloudDownload} color="orange.ct" />}
                {...colorSchemeOrangeCtOutline}
                borderRadius="full"
                fontWeight="sm"
              >
                Exportar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LibraryManager;
