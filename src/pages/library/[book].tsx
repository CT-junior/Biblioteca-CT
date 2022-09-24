/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { IoMdArrowBack } from "react-icons/io";

import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Stack,
    Tag,
    Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import BookImage from "../../assets/images/sussuros-na-floresta.png";

const Book: NextPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <Box w="100%" maxW="1200" mx="auto">
            <IconButton
                aria-label="Back page"
                icon={<IoMdArrowBack size="32px" />}
                bg="transparent"
                boxSize="50px"
                borderRadius="full"
                onClick={() => router.push("/library")}
            />
            <Flex
                direction="column"
                align="flex-start"
                maxW="800"
                mx="auto"
                gap="5"
            >
                <Flex
                    align="flex-start"
                    w="100%"
                    justify="space-between"
                    gap="10"
                    py="16"
                >
                    <Image
                        src={BookImage}
                        width="277px"
                        height="443px"
                        objectFit="cover"
                    />
                    <Stack align="flex-end" spacing="40">
                        <Stack fontSize="xl">
                            <Text as="h1" fontSize="5xl">
                                Susurros na floresta
                            </Text>
                            <Text>Volume 1</Text>
                            <Text>Maria Silveira</Text>
                            <Text>Suspense</Text>
                        </Stack>
                        <Tag size="lg" bg="orange.300" color="white">
                            Indisponível
                        </Tag>
                    </Stack>
                </Flex>
                <Text as="span">
                    Este livro está na posse de
                    <Avatar
                        src={`${session?.user?.image}`}
                        size="sm"
                        ml="2"
                        my="auto"
                        verticalAlign="middle"
                    />
                    <Text as="b"> Héber Lima Silva </Text>
                    de
                    <Text as="b"> 10/12/2022 </Text>à
                    <Text as="b"> 02/02/2022</Text>
                </Text>
                <Button mx="auto" mt="8" colorScheme="teal">
                    Pegar emprestado
                </Button>
            </Flex>
        </Box>
    );
};

export default Book;
