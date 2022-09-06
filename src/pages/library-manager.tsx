import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import { HiPlus, HiSearch, HiCloudDownload } from "react-icons/hi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import {
  colorSchemeOrangeCt,
  colorSchemeOrangeCtOutline,
} from "../common/utils";
import { MoreSettingsPopover } from "../components/MoreSettingsPopover";

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
          <TableContainer fontSize="sm">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Título</Th>
                  <Th>Volume</Th>
                  <Th>Autor</Th>
                  <Th>Gênero</Th>
                  <Th>Data de cadastro</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Sussuros na floresta</Td>
                  <Td>Volume 1</Td>
                  <Td>Maria Silveira</Td>
                  <Td>Suspense</Td>
                  <Td>04 de setembro, 2022</Td>
                  <Td>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Sussuros na floresta</Td>
                  <Td>Volume 1</Td>
                  <Td>Maria Silveira</Td>
                  <Td>Suspense</Td>
                  <Td>04 de setembro, 2022</Td>
                  <Td>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Sussuros na floresta</Td>
                  <Td>Volume 1</Td>
                  <Td>Maria Silveira</Td>
                  <Td>Suspense</Td>
                  <Td>04 de setembro, 2022</Td>
                  <Td>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Sussuros na floresta</Td>
                  <Td>Volume 1</Td>
                  <Td>Maria Silveira</Td>
                  <Td>Suspense</Td>
                  <Td>04 de setembro, 2022</Td>
                  <Td>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Sussuros na floresta</Td>
                  <Td>Volume 1</Td>
                  <Td>Maria Silveira</Td>
                  <Td>Suspense</Td>
                  <Td>04 de setembro, 2022</Td>
                  <Td>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Flex w="100%">
            <Box ml="auto" mt="2">
              <HStack>
                <Text as="p">
                  Visualização <Text as="b">1</Text> - <Text as="b">5</Text> de
                  <Text as="b"> 28</Text>
                </Text>
                  <IconButton
                    aria-label="select previous page"
                    icon={<MdNavigateBefore />}
                    variant="outline"
                    colorScheme="blackAlpha"
                    size="sm"
                  />
                  <IconButton
                    aria-label="select next page"
                    icon={<MdNavigateNext />}
                    variant="outline"
                    colorScheme="blackAlpha"
                    size="sm"
                  />
              </HStack>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LibraryManager;
