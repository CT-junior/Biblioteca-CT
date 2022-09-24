/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { IoMdArrowBack } from "react-icons/io";

import {
    Avatar,
    Box,
    Button,
    Flex,
    IconButton,
    Stack,
    Tag,
    Text,
    useToast,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { BookProps } from "../../interfaces/Book";
import { UserProps } from "../../interfaces/User";
import { db } from "../../services/firebase";
import { borrowBook } from "../../store/books/actions";

interface Props {
    book: BookProps;
}

export default function Library({ book }: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const toast = useToast();

    const handleBorrowBook = async () => {
        const user: UserProps = {
            id: String(session?.user?.id),
            name: String(session?.user?.name),
            email: String(session?.user?.email),
            image: String(session?.user?.image),
            borrowedBooks: null,
        };
        await borrowBook(book, user);

        toast({
            title: "Livro emprestado com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };
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
                        src={book.imageUrl}
                        width="277px"
                        height="443px"
                        objectFit="cover"
                        priority
                    />
                    <Stack align="flex-end" spacing="40">
                        <Stack fontSize="xl">
                            <Text as="h1" fontSize="5xl">
                                {book.name}
                            </Text>
                            <Text>{book.volume}</Text>
                            <Text>{book.author}</Text>
                            <Text>{book.category}</Text>
                        </Stack>
                        {book.status === "available" ? (
                            <Tag mt="4" bg="green.400" color="white">
                                Disponível
                            </Tag>
                        ) : (
                            <Tag mt="4" bg="orange.400" color="white">
                                Indisponível
                            </Tag>
                        )}
                    </Stack>
                </Flex>
                {book.borrowedTo && (
                    <Text as="span">
                        Este livro está na posse de
                        <Avatar
                            src={`${session?.user?.image}`}
                            size="sm"
                            ml="2"
                            my="auto"
                            verticalAlign="middle"
                        />
                        <Text as="b"> {book.borrowedTo.user.name} </Text>
                        de{" "}
                        <Text as="b">
                            {new Date(
                                book.borrowedTo.startDate
                            ).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </Text>{" "}
                        à{" "}
                        <Text as="b">
                            {new Date(
                                book.borrowedTo.endDate
                            ).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </Text>
                    </Text>
                )}

                <Button
                    mx="auto"
                    mt="8"
                    colorScheme="teal"
                    disabled={book.status === "unavailable"}
                    onClick={handleBorrowBook}
                >
                    Pegar emprestado
                </Button>
            </Flex>
        </Box>
    );
}
interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as IParams;
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
        props: {
            book: data,
        },
    };
};
