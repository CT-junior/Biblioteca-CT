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
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
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
import { AddBookModal } from "../components/AddBookModal";

const LibraryManager: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" mx="auto">
        <Sidebar />
        <Box w="100%" px="8" py="8" >
          <Flex
            align={["flex-start", "flex-start", "center"]}
            justify="space-between"
            aria-label="second-header"
            pb="6"
            borderBottom="1px"
            borderColor="gray.200"
            direction={["column", "column", "row"]}
          >
            <Heading as="h1" fontSize="xl">
              Gerenciador de biblioteca
            </Heading>

            <HStack
              justify="space-between"
              w={["100%", "100%", "auto"]}
              mt={["2", "2", ""]}
            >
              <HStack>
                <Button
                  onClick={onOpen}
                  size="sm"
                  leftIcon={<Icon as={HiPlus} color="white" />}
                  borderRadius="full"
                  {...colorSchemeOrangeCt}
                >
                  Adicionar Livro
                </Button>
                {isWideVersion && (
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
                )}
              </HStack>
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
                  <Th display="revert">Título</Th>
                  <Th display={["none", "none", "none", "revert"]}>Volume</Th>
                  <Th display={["none", "none", "revert"]}>Autor</Th>
                  <Th display={["none", "revert"]}>Gênero</Th>
                  <Th display={["none", "none", "revert"]}>Data de cadastro</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td display="revert">Sussuros na floresta</Td>
                  <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
                  <Td display={["none","none" ,"revert"]}>Maria Silveira</Td>
                  <Td display={["none", "revert"]}>Suspense</Td>
                  <Td display={["none", "none", "revert"]}>
                    04 de setembro, 2022
                  </Td>
                  <Td textAlign={["end","end","center"]}>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td display="revert">Sussuros na floresta</Td>
                  <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
                  <Td display={["none","none" ,"revert"]}>Maria Silveira</Td>
                  <Td display={["none", "revert"]}>Suspense</Td>
                  <Td display={["none", "none", "revert"]}>
                    04 de setembro, 2022
                  </Td>
                  <Td textAlign={["end","end","center"]}>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td display="revert">Sussuros na floresta</Td>
                  <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
                  <Td display={["none","none" ,"revert"]}>Maria Silveira</Td>
                  <Td display={["none", "revert"]}>Suspense</Td>
                  <Td display={["none", "none", "revert"]}>
                    04 de setembro, 2022
                  </Td>
                  <Td textAlign={["end","end","center"]}>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td display="revert">Sussuros na floresta</Td>
                  <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
                  <Td display={["none","none" ,"revert"]}>Maria Silveira</Td>
                  <Td display={["none", "revert"]}>Suspense</Td>
                  <Td display={["none", "none", "revert"]}>
                    04 de setembro, 2022
                  </Td>
                  <Td textAlign={["end","end","center"]}>
                    <MoreSettingsPopover />
                  </Td>
                </Tr>
                <Tr>
                  <Td display="revert">Sussuros na floresta</Td>
                  <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
                  <Td display={["none","none" ,"revert"]}>Maria Silveira</Td>
                  <Td display={["none", "revert"]}>Suspense</Td>
                  <Td display={["none", "none", "revert"]}>
                    04 de setembro, 2022
                  </Td>
                  <Td textAlign={["end","end","center"]}>
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
          <AddBookModal isOpen={isOpen} onClose={onClose} children />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LibraryManager;
