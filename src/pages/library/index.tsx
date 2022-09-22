/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { useEffect } from "react";

import { Grid, GridItem, Divider, Flex, Input } from "@chakra-ui/react";
import { NextPage } from "next";

import { BookCard } from "../../components/BookCard";
import { useBooks } from "../../hooks/useBooks";
import { requestBooksFirebase } from "../../store/books/actions";

const Library: NextPage = () => {
    const { books } = useBooks();
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
                <Input placeholder="O que deseja buscar" w="80%" />
                <Divider marginBlock="20" />
            </Flex>

            <Grid
                templateColumns="repeat(auto-fill, 260px)"
                gap="8"
                justifyContent={["center", "center", "space-between"]}
            >
                {books.map((book) => {
                    return (
                        <GridItem key={book.id}>
                            <BookCard {...book} />
                        </GridItem>
                    );
                })}
            </Grid>
        </>
    );
};

export default Library;
