import { ReactNode } from "react";

import {
	Table as TableChakra,
	TableContainer,
	TableProps as TableChakraProps,
	Tbody,
} from "@chakra-ui/react";

import { Thead } from "./Thead";

interface TableProps extends TableChakraProps {
	children?: ReactNode;
}

export function TableLibraryManager({ children, ...rest }: TableProps) {
	return (
		<TableContainer fontSize="sm" {...rest}>
			<TableChakra variant="simple">
				<Thead />
				<Tbody>{children}</Tbody>
			</TableChakra>
		</TableContainer>
	);
}
