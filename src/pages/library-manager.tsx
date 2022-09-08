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
  Text,
  Tr,
  useBreakpointValue,
  useDisclosure,
  Td,
} from "@chakra-ui/react";

import { NextPage } from "next";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { MoreSettingsPopover } from "../components/MoreSettingsPopover";
import { AddBookModal } from "../components/AddBookModal";
import { TableLibraryManager } from "../components/TableLibraryManager";
import { Pagination } from "../components/Pagination";

import { HiPlus, HiSearch, HiCloudDownload } from "react-icons/hi";

import {
  colorSchemeOrangeCt,
  colorSchemeOrangeCtOutline,
} from "../common/utils";



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
        <Box w="100%" px="8" py="8">
          <Flex
            align={["flex-start","center"]}
            aria-label="second-header"
            pb="6"
            borderBottom="1px"
            borderColor="gray.200"
            gap="2"
            direction={["column", "column","row"]}
          >
            <Heading as="h1" fontSize="xl" >
              Gerenciador de biblioteca
            </Heading>
            <HStack>
              <Button
                onClick={onOpen}
                size="sm"
                width="100%"
                maxW="40"
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
              width="100%"
              maxW="28"
              fontWeight="sm"
              px="8"
              ml={["unset","unset","auto"]}
            >
              Exportar
            </Button>
          </Flex>
          <TableLibraryManager>
            <Tr>
              <Td display="revert">Sussuros na floresta</Td>
              <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
              <Td display={["none", "none", "revert"]}>Maria Silveira</Td>
              <Td display={["none", "revert"]}>Suspense</Td>
              <Td display={["none", "none", "revert"]}>04 de setembro, 2022</Td>
              <Td textAlign={["end", "end", "center"]}>
              <MoreSettingsPopover />
              </Td>
            </Tr>
            <Tr>
              <Td display="revert">Sussuros na floresta</Td>
              <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
              <Td display={["none", "none", "revert"]}>Maria Silveira</Td>
              <Td display={["none", "revert"]}>Suspense</Td>
              <Td display={["none", "none", "revert"]}>04 de setembro, 2022</Td>
              <Td textAlign={["end", "end", "center"]}>
              <MoreSettingsPopover />
              </Td>
            </Tr>
            <Tr>
              <Td display="revert">Sussuros na floresta</Td>
              <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
              <Td display={["none", "none", "revert"]}>Maria Silveira</Td>
              <Td display={["none", "revert"]}>Suspense</Td>
              <Td display={["none", "none", "revert"]}>04 de setembro, 2022</Td>
              <Td textAlign={["end", "end", "center"]}>
              <MoreSettingsPopover />
              </Td>
            </Tr>
            <Tr>
              <Td display="revert">Sussuros na floresta</Td>
              <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
              <Td display={["none", "none", "revert"]}>Maria Silveira</Td>
              <Td display={["none", "revert"]}>Suspense</Td>
              <Td display={["none", "none", "revert"]}>04 de setembro, 2022</Td>
              <Td textAlign={["end", "end", "center"]}>
              <MoreSettingsPopover />
              </Td>
            </Tr>
            <Tr>
              <Td display="revert">Sussuros na floresta</Td>
              <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
              <Td display={["none", "none", "revert"]}>Maria Silveira</Td>
              <Td display={["none", "revert"]}>Suspense</Td>
              <Td display={["none", "none", "revert"]}>04 de setembro, 2022</Td>
              <Td textAlign={["end", "end", "center"]}>
              <MoreSettingsPopover />
              </Td>
            </Tr>
          </TableLibraryManager>
          <Pagination />
          <AddBookModal isOpen={isOpen} onClose={onClose} children />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LibraryManager;
