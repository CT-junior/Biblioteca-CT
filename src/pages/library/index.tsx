/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { useEffect, useState } from "react";

import { Grid, GridItem, Divider, Flex, Input } from "@chakra-ui/react";
import { NextPage } from "next";

import { BookCard } from "../../components/BookCard";
import { useBooks } from "../../hooks/useBooks";
import { requestBooksFirebase } from "../../store/books/actions";

const Library: NextPage = () => {
    const { books } = useBooks();
    const [search, setSearch] = useState("");
    const regex = /[\s{2,}\s+!"#$%&'´()*+,-./:;<=>?@[\]^_`{|}~]/g;

    useEffect(() => {
        requestBooksFirebase();
    }, []);

    return (
        <>
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
