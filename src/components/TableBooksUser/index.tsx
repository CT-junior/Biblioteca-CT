/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { ReactNode } from "react";

import {
    Table as TableChakra,
    TableContainer,
    TableProps as TableChakraProps,
    Tbody,
} from "@chakra-ui/react";

import { Thead } from "./Thead";

interface TableProps extends TableChakraProps {
    children: ReactNode;
}

export function TableBooksUser({ children, ...rest }: TableProps) {
    return (
        <TableContainer fontSize="sm" mx="auto" {...rest}>
            <TableChakra
                variant="simple"
                sx={{
                    borderCollapse: "separate",
                    borderSpacing: "0 25px",
                    margintop: "-25px",
                    paddingRight: "4px",
                    paddingLeft: "4px",
                }}
            >
                <Thead />
                <Tbody>{children}</Tbody>
            </TableChakra>
        </TableContainer>
    );
}
