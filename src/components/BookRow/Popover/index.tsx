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
import { Button } from "./Button";
import { PopoverTrigger } from "./PopoverTrigger";
import { Tag } from "./Tag";

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
            <Tag variant="devolvido" />
            <PopoverTrigger />
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
            <Tag variant="em-atraso" />
            <PopoverTrigger />
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
            <Tag variant="pendente" />
            <PopoverTrigger />
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
