/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { Box, HStack, Tag, Text, Stack } from "@chakra-ui/react";
import Image from "next/image";

import { BookCardProps } from "../../interfaces/Book";

export function BookCard({
    imageUrl,
    name,
    volume,
    author,
    category,
}: BookCardProps) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderColor="gray.200"
            borderWidth="0.5px"
            borderRadius="xl"
            w="100%"
            maxW="500px"
            py="6"
            px="4"
            height="420"
            justifyContent="space-between"
            shadow="md"
        >
            <Image src={`${imageUrl}`} width="126px" height="200px" />
            <Text mt="6" fontSize="xl" textAlign="center">
                {name}
            </Text>
            <Stack fontSize="sm" align="center" spacing="1" mt="2">
                <Text as="p">
                    {volume} - {author}
                </Text>
                <Text>{category}</Text>
            </Stack>

            <Tag mt="4" bg="green.400" color="white">
                Disponível
            </Tag>
        </Box>
    );
}
