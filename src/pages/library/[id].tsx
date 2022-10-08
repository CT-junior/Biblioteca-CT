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
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { useBooks } from "../../hooks/useBooks";
import { useUser } from "../../hooks/useUser";
import { db } from "../../services/firebase";
import { borrowBook } from "../../store/books/actions";

export default function Library({ book }: any) {
  const { user } = useUser();
  const router = useRouter();
  const { isLoading } = useBooks();
  const handleBorrowBook = async () => {
    await borrowBook(book, user);
    router.reload();
  };

  return (
    <Box w="100%" maxW="1200" mx="auto" key={book.id}>
      <IconButton
        aria-label="Back page"
        icon={<IoMdArrowBack size="32px" />}
        bg="transparent"
        boxSize="50px"
        borderRadius="full"
        onClick={() => router.push("/library")}
      />
      <Flex direction="column" align="flex-start" maxW="800" mx="auto" gap="5">
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
              src={`${book.borrowedTo.user.image}`}
              size="sm"
              ml="2"
              my="auto"
              verticalAlign="middle"
            />
            <Text as="b">{` ${book.borrowedTo.user.name} `}</Text>
            de
            <Text as="b">
              {` ${new Date(book.borrowedTo.startDate).toLocaleDateString(
                "pt-BR",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )} `}
            </Text>
            {` à `}
            <Text as="b">
              {new Date(book.borrowedTo.endDate).toLocaleDateString("pt-BR", {
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
          isLoading={isLoading}
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
