/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { ReactNode } from "react";

import {
    Table as TableChakra,
    TableContainer,
    TableProps as TableChakraProps,
    Tbody,
} from "@chakra-ui/react";

import { HeadThead } from "./HomeThead";

interface TableProps extends TableChakraProps {
    children?: ReactNode;
    hasHead: boolean;
}

export function TableLibraryDisplay({
    hasHead = true,
    children,
    ...rest
}: TableProps) {
    if (hasHead === true) {
        return (
            <TableContainer fontSize="sm" {...rest}>
                <TableChakra variant="unstyled">
                    <HeadThead />
                    <Tbody paddingInline={0}>{children}</Tbody>
                </TableChakra>
            </TableContainer>
        );
    }
    return (
        <TableContainer fontSize="sm" {...rest}>
            <TableChakra variant="unstyled">
                <Tbody paddingInline={0}>{children}</Tbody>
            </TableChakra>
        </TableContainer>
    );
}
