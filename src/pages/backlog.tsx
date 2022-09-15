/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { Box, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";

import { HeadTitle } from "../components/HeadTitle";

const Backlog: NextPage = () => {
    return (
        <>
            <HeadTitle title="Registros" />
            <Box
                backgroundColor="blackAlpha.50"
                height="70vh"
                marginInline="20"
                padding="10"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
            >
                Teste
            </Box>
        </>
    );
};

export default Backlog;
