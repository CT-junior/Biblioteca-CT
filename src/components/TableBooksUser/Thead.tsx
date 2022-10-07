import { MdHelpOutline } from "react-icons/md";
import { TbBook, TbBookDownload, TbBookUpload } from "react-icons/tb";

import {
  Icon,
  Th,
  Thead as TheadChakra,
  Tr,
  Text,
  HStack,
} from "@chakra-ui/react";

export function Thead() {
  return (
    <TheadChakra>
      <Tr>
        <Th>
          <HStack>
            <Icon as={TbBook} w="6" h="6" />
            <Text>Livro</Text>
          </HStack>
        </Th>
        <Th>
          <HStack justify="center">
            <Icon as={TbBookUpload} w="6" h="6" />
            <Text>Data de empréstimo</Text>
          </HStack>
        </Th>
        <Th>
          <HStack justify="center">
            <Icon as={TbBookDownload} w="6" h="6" />
            <Text>Data de devolução</Text>
          </HStack>
        </Th>
        <Th>
          <HStack justify="flex-end" pr="8">
            <Icon as={MdHelpOutline} w="6" h="6" />
            <Text>Estado</Text>
          </HStack>
        </Th>
      </Tr>
    </TheadChakra>
  );
}
