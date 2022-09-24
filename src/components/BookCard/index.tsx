/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { Box, Tag, Text, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import { BookProps } from "../../interfaces/Book";

export function BookCard({
    imageUrl,
    name,
    volume,
    author,
    category,
    status,
    id,
}: BookProps) {
    return (
        <Link href={`/library/${id}`}>
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
                cursor="pointer"
            >
                <Image
                    src={`${imageUrl}`}
                    width="126px"
                    height="200px"
                    objectFit="cover"
                />
                <Text mt="6" fontSize="xl" textAlign="center">
                    {name}
                </Text>
                <Stack fontSize="sm" align="center" spacing="1" mt="2">
                    <Text as="p">
                        {volume} - {author}
                    </Text>
                    <Text>{category}</Text>
                </Stack>
                {status === "available" ? (
                    <Tag mt="4" bg="green.400" color="white">
                        Disponível
                    </Tag>
                ) : (
                    <Tag mt="4" bg="orange.400" color="white">
                        Indisponível
                    </Tag>
                )}
            </Box>
        </Link>
    );
}
