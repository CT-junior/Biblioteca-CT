/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useState } from "react";

import {
    HStack,
    Popover as PopoverChakra,
    PopoverArrow,
    PopoverContent,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { BooksUserProps } from "../../../interfaces/Book";
import { reBorrowBook, returnBookUser } from "../../../store/books/actions";
import { Tag } from "../Tag";
import { Button } from "./Button";
import { PopoverTrigger } from "./PopoverTrigger";

interface UpdateStatePopoverProps {
    book: BooksUserProps;
}
export function Popover({ book }: UpdateStatePopoverProps) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleReBorrowedBook = async () => {
        setLoading(true);
        await reBorrowBook(book, session?.user);
        setLoading(false);
    };

    const handleReturnBook = async () => {
        setLoading2(true);
        await returnBookUser(session?.user, book);
        setLoading2(false);
    };

    return book.status === "devolvido" ? (
        <PopoverChakra placement="top">
            <PopoverTrigger />
            <Tag variant="devolvido" />
            <PopoverContent py="4" px="6" shadow="md" borderRadius="full">
                <HStack align="center">
                    <Button
                        variant="re-alugar"
                        onClick={handleReBorrowedBook}
                        isLoading={loading}
                    />
                    <Button
                        variant="devolver"
                        disabled
                        onClick={handleReturnBook}
                        isLoading={loading2}
                    />
                </HStack>
                <PopoverArrow />
            </PopoverContent>
        </PopoverChakra>
    ) : book.endDate < new Date(Date.now()).toISOString() ? (
        <PopoverChakra placement="top">
            <PopoverTrigger />
            <Tag variant="em-atraso" />
            <PopoverContent py="4" px="6" shadow="md" borderRadius="full">
                <HStack align="center">
                    <Button
                        variant="re-alugar"
                        onClick={handleReBorrowedBook}
                        isLoading={loading}
                    />
                    <Button
                        variant="devolver"
                        onClick={handleReturnBook}
                        isLoading={loading2}
                    />
                </HStack>
                <PopoverArrow />
            </PopoverContent>
        </PopoverChakra>
    ) : (
        <PopoverChakra placement="top">
            <PopoverTrigger />
            <Tag variant="pendente" />

            <PopoverContent py="4" px="6" shadow="md" borderRadius="full">
                <HStack align="center">
                    <Button
                        variant="re-alugar"
                        onClick={handleReBorrowedBook}
                        isLoading={loading}
                    />
                    <Button
                        variant="devolver"
                        onClick={handleReturnBook}
                        isLoading={loading2}
                    />
                </HStack>
                <PopoverArrow />
            </PopoverContent>
        </PopoverChakra>
    );
}
