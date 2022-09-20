/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { MdOutlinePending } from "react-icons/md";

import {
    Box,
    Tr,
    Td,
    HStack,
    Text,
    Tag,
    TagLeftIcon,
    TagLabel,
} from "@chakra-ui/react";
import Image from "next/image";

import { useBooks } from "../../hooks/useBooks";
import { BookProps } from "../../interfaces/Book";
import { TableLibraryDisplay } from "../TableLibraryDisplay/index";

export interface BooksDisplayProps {
    size: string;
    backgroundColor: string;
    borderRadius: string;
    shadow: string;
    border: string;
    padding: string;
    borderColor: string;
    hasHead: boolean;
}

export function BooksDisplay({
    hasHead = true,
    size,
    backgroundColor,
    borderRadius,
    shadow,
    border,
    padding,
    borderColor,
}: BooksDisplayProps) {
    const { books } = useBooks();

    return (
        <TableLibraryDisplay hasHead={hasHead}>
            {books.map((book: BookProps) => {
                return (
                    <Tr key={book.id} display="revert">
                        <Td display="revert" paddingLeft={0} paddingRight={0}>
                            <Box
                                display="flex"
                                position="relative"
                                justifyContent="left"
                                alignItems="center"
                                height={size}
                                paddingLeft="5%"
                                borderStartRadius={borderRadius}
                                border={border}
                                borderEnd="none"
                                borderColor={borderColor}
                                paddingBlock={padding}
                                backgroundColor={backgroundColor}
                                _before={{
                                    content: '""',
                                    position: "absolute",
                                    top: "0",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    zIndex: "-1",
                                    boxShadow: shadow,
                                    borderRadius: "xl",
                                }}
                            >
                                <HStack spacing={3}>
                                    {book.imageUrl && (
                                        <Image
                                            src={book.imageUrl}
                                            alt={book.name}
                                            width="47,25px"
                                            height="70px"
                                            objectFit="cover"
                                        />
                                    )}
                                    <Text overflow="clip" fontSize="sm">
                                        {book.name}
                                    </Text>
                                </HStack>
                            </Box>
                        </Td>
                        <Td display="revert" paddingInline={0}>
                            <Box
                                display="flex"
                                position="relative"
                                justifyContent="center"
                                alignItems="center"
                                height={size}
                                borderStartRadius="none"
                                border={border}
                                borderEnd="none"
                                borderStart="none"
                                borderColor={borderColor}
                                paddingBlock={padding}
                                paddingInline={0}
                                width="auto"
                                backgroundColor={backgroundColor}
                                _before={{
                                    content: '""',
                                    position: "absolute",
                                    top: "0",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    zIndex: "-1",
                                    boxShadow: shadow,
                                }}
                            >
                                {new Date(book.createdAt).toLocaleDateString(
                                    "pt-BR",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </Box>
                        </Td>
                        <Td display="revert" paddingInline={0}>
                            <Box
                                display="flex"
                                position="relative"
                                justifyContent="center"
                                alignItems="center"
                                height={size}
                                borderStartRadius="none"
                                border={border}
                                borderEnd="none"
                                borderStart="none"
                                borderColor={borderColor}
                                paddingBlock={padding}
                                paddingInline={0}
                                backgroundColor={backgroundColor}
                                _before={{
                                    content: '""',
                                    position: "absolute",
                                    top: "0",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    zIndex: "-1",
                                    boxShadow: shadow,
                                }}
                            >
                                {new Date(
                                    new Date().setDate(
                                        // eslint-disable-next-line prettier/prettier
                                        new Date(book.createdAt).getDate() + 7)
                                ).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </Box>
                        </Td>

                        <Td
                            display="revert"
                            textAlign="center"
                            // paddingRight={10}
                            paddingLeft={0}
                        >
                            <Box
                                overflow="visible"
                                display="flex"
                                position="relative"
                                justifyContent="flex-end"
                                alignItems="center"
                                height={size}
                                paddingRight="5%"
                                border={border}
                                borderEndRadius={borderRadius}
                                borderStart="none"
                                borderColor={borderColor}
                                paddingBlock={padding}
                                backgroundColor={backgroundColor}
                                _before={{
                                    content: '""',
                                    position: "absolute",
                                    top: "0",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    zIndex: "-1",
                                    boxShadow: shadow,
                                    borderRadius: "xl",
                                }}
                            >
                                <Tag size="lg">
                                    <TagLeftIcon as={MdOutlinePending} />
                                    <TagLabel>Aguardando devolução</TagLabel>
                                </Tag>
                            </Box>
                        </Td>
                    </Tr>
                );
            })}
        </TableLibraryDisplay>
    );
}
