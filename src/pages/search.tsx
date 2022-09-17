/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { useEffect } from "react";

import { Box, Divider, Flex, Input } from "@chakra-ui/react";
import { NextPage } from "next";

import { BooksDisplay } from "../components/BooksDisplay";
import { requestBooksFirebase } from "../store/books/actions";

const Search: NextPage = () => {
    useEffect(() => {
        requestBooksFirebase();
    }, []);

    return (
        <>
            <Flex
                justifyContent="center"
                alignItems="center"
                paddingTop="10"
                flexDirection="column"
            >
                <Input placeholder="O que deseja buscar" w="80%" />
                <Divider marginBlock="20" />
            </Flex>
            <Box>
                <BooksDisplay
                    hasHead={false}
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
