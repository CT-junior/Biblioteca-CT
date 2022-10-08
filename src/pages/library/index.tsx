/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect, useState } from "react";

import { Grid, GridItem, Divider, Flex, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import { filterListBookBySearchIndex } from "../../common/functions";
import { BookCard } from "../../components/BookCard";
import { useBooks } from "../../hooks/useBooks";
import { requestBooksFirebase } from "../../store/books/actions";

const Library: NextPage = () => {
  const { books } = useBooks();

  useEffect(() => {
    requestBooksFirebase();
  }, []);

  const [search, setSearch] = useState("");
  const filteredBookList = filterListBookBySearchIndex(books, search);
  return (
    <>
      <Head>
        <title>BiblioCTeca | Buscar livro</title>
      </Head>
      <Flex
        justifyContent="center"
        alignItems="center"
        paddingTop="10"
        flexDirection="column"
      >
        <Input
          type="search"
          placeholder="O que deseja buscar"
          w="80%"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Divider marginBlock="20" />
      </Flex>
      <Grid
        templateColumns="repeat(auto-fill, 260px)"
        gap="8"
        justifyContent={["center", "center", "space-between"]}
      >
        {filteredBookList.map((book) => (
          <GridItem key={book.id}>
            <BookCard {...book} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default Library;
