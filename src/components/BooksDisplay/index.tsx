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
import { useSession } from "next-auth/react";
import Image from "next/image";
import { date } from "yup";

import { BooksUserProps } from "../../interfaces/Book";
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
    books: BooksUserProps[];
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
    books = [],
}: BooksDisplayProps) {
    return (
        <TableLibraryDisplay hasHead={hasHead}>
            {books.map((book: BooksUserProps) => {
                return (
                    <Tr key={book.borrowedBook.id} display="revert">
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
                                    {book.borrowedBook.imageUrl && (
                                        <Image
                                            src={book.borrowedBook.imageUrl}
                                            alt={book.borrowedBook.name}
                                            width="47,25px"
                                            height="70px"
                                            objectFit="cover"
                                        />
                                    )}
                                    <Text overflow="clip" fontSize="sm">
                                        {book.borrowedBook.name}
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
                                {new Date(book.startDate).toLocaleDateString(
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
                                {new Date(book.endDate).toLocaleDateString(
                                    "pt-BR",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </Box>
                        </Td>

                        <Td display="revert" textAlign="center" paddingLeft={0}>
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
                                {book.status === "devolvido" ? (
                                    <Tag size="lg" colorScheme="green">
                                        <TagLeftIcon as={MdOutlinePending} />
                                        <TagLabel>Devolvido</TagLabel>
                                    </Tag>
                                ) : book.endDate <
                                  new Date(Date.now()).toISOString() ? (
                                    <Tag size="lg" colorScheme="red">
                                        <TagLeftIcon as={MdOutlinePending} />
                                        <TagLabel>Em atraso</TagLabel>
                                    </Tag>
                                ) : (
                                    <Tag size="lg" colorScheme="orange">
                                        <TagLeftIcon as={MdOutlinePending} />
                                        <TagLabel>
                                            Aguardando devolução
                                        </TagLabel>
                                    </Tag>
                                )}
                            </Box>
                        </Td>
                    </Tr>
                );
            })}
        </TableLibraryDisplay>
    );
}
