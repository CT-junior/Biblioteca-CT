/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { MdHelpOutline } from "react-icons/md";
import { TbBook, TbBookDownload, TbBookUpload } from "react-icons/tb";

import { Flex, Icon, Th, Thead as TheadChakra, Tr } from "@chakra-ui/react";

export function HeadThead() {
    return (
        <TheadChakra>
            <Tr>
                <Th display="revert">
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        columnGap="5"
                    >
                        <Icon as={TbBook} w="6" h="6" />
                        Livro
                    </Flex>
                </Th>
                <Th display="revert">
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        columnGap="3"
                    >
                        <Icon as={TbBookUpload} w="6" h="6" />
                        Data de empréstimo
                    </Flex>
                </Th>
                <Th display="revert">
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        columnGap="3"
                    >
                        <Icon as={TbBookDownload} w="6" h="6" />
                        Data de devolução
                    </Flex>
                </Th>
                <Th display="revert">
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        columnGap="3"
                    >
                        <Icon as={MdHelpOutline} w="6" h="6" />
                        Estado
                    </Flex>
                </Th>
            </Tr>
        </TheadChakra>
    );
}
