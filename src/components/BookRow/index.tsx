/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { Tr, Td, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";

import { BooksUserProps } from "../../interfaces/Book";
import { Content } from "./Content";
import { Popover } from "./Popover";

interface Props {
    book: BooksUserProps;
}

export function BookRow({ book }: Props) {
    return (
        <Tr shadow="md" borderRadius="xl">
            <Td>
                <Content>
                    <HStack spacing="4">
                        {book.description.imageUrl && (
                            <Image
                                src={book.description.imageUrl}
                                alt={book.description.name}
                                width="47,25px"
                                height="70px"
                                objectFit="cover"
                                priority
                            />
                        )}
                        <Text fontSize="sm">{book.description.name}</Text>
                    </HStack>
                </Content>
            </Td>
            <Td>
                <Content justify="center">
                    {new Date(book.startDate).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </Content>
            </Td>
            <Td>
                <Content justify="center">
                    {new Date(book.endDate).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </Content>
            </Td>

            <Td>
                <Content justify="flex-end">
                    <Popover book={book} />
                </Content>
            </Td>
        </Tr>
    );
}
