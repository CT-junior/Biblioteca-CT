/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { Divider, Flex, Input } from "@chakra-ui/react";
import { NextPage } from "next";

const Search: NextPage = () => {
    return (
        <>
            <Flex justifyContent="center" paddingTop="10">
                <Input placeholder="O que deseja buscar" w="80%" />
            </Flex>
            <Divider marginBlock="20" />
        </>
    );
};

export default Search;
