import {
  Table as TableChakra,
  TableContainer,
  TableProps as TableChakraProps,
} from "@chakra-ui/react";

import { ReactNode } from "react";

import { MoreSettingsPopover } from "../MoreSettingsPopover";
import { Thead } from "./Thead";

interface TableProps extends TableChakraProps {
  children?: ReactNode;

}

export function TableLibraryManager({ children,...rest }: TableProps) {
  return (
    <TableContainer fontSize="sm" {...rest}>
      <TableChakra variant="simple">
          <Thead />
            {children}

            {/* <Td display="revert">Sussuros na floresta</Td>
            <Td display={["none", "none", "none", "revert"]}>Volume 1</Td>
            <Td display={["none", "none", "revert"]}>Maria Silveira</Td>
            <Td display={["none", "revert"]}>Suspense</Td>
            <Td display={["none", "none", "revert"]}>04 de setembro, 2022</Td>
            <Td textAlign={["end", "end", "center"]}>
              <MoreSettingsPopover />
            </Td> */}
         
      </TableChakra>
    </TableContainer>
  );
}
