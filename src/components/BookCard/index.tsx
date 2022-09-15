/* eslint-disable react/jsx-indent */

import { Th, Thead as TheadChakra, Tr } from "@chakra-ui/react";

export function BookCard() {
    return (
        <>
            <TheadChakra>
                <Tr>
                    <Th display="revert">Título</Th>
                    <Th display={["none", "none", "none", "revert"]}>Volume</Th>
                    <Th display={["none", "none", "revert"]}>Autor</Th>
                    <Th display={["none", "revert"]}>Gênero</Th>
                    <Th display={["none", "none", "revert"]}>
                        Data de cadastro
                    </Th>
                    <Th />
                </Tr>
            </TheadChakra>
        </>
    );
}
