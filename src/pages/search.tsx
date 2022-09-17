/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { Box, Divider, Flex, Input } from "@chakra-ui/react";
import { NextPage } from "next";

import { BooksDisplay } from "../components/BooksDisplay";
import { TableLibraryDisplay } from "../components/HomeThead";

const Search: NextPage = () => {
    return (
        <>
            <Flex justifyContent="center" paddingTop="10">
                <Input placeholder="O que deseja buscar" w="80%" />
            </Flex>
            <Divider marginBlock="20" />
            <Box>
                <BooksDisplay
                    hasHead="false"
                    backgroundColor="white"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="xl"
                    padding="10"
                    size="10rem"
                    shadow="md"
                />
            </Box>
        </>
    );
};

export default Search;
