/* eslint-disable prettier/prettier */
import { ReactNode } from 'react';

import { Flex } from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

export function UserBookCard({ children }: Props) {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            borderColor="gray.200"
            borderWidth="0.5px"
            borderRadius="xl"
            w="max-content"
            maxW="500px"
            height="max-content"
            py="10"
            px="5"
            justifyContent="center"
            shadow="md"
            cursor="pointer"
        >
            {children}
        </Flex>
    )
}
