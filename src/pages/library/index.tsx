/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { useState } from "react";

import { Grid, GridItem, Divider, Flex, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import { BookCard } from "../../components/BookCard";
import { useBooks } from "../../hooks/useBooks";

const Library: NextPage = () => {
    const { books } = useBooks();
    const [search, setSearch] = useState("");
    const regex = /[\s{2,}\s+!"#$%&'´()*+,-./:;<=>?@[\]^_`{|}~]/g;

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
                {books.map((book) => {
                    if (search !== "") {
                        if (
                            book.name
                                .toLowerCase()
                                .replace(regex, "")
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .includes(
                                    search
                                        .replace(regex, "")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "")
                                )
                        ) {
                            return (
                                <GridItem key={book.id}>
                                    <BookCard {...book} />
                                </GridItem>
                            );
                        }
                    } else {
                        return (
                            <GridItem key={book.id}>
                                <BookCard {...book} />
                            </GridItem>
                        );
                    }
                    return null;
                })}
            </Grid>
        </>
    );
};

export default Library;
