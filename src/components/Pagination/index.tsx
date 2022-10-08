import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";

export function Pagination() {
  return (
    <Flex w="100%">
      <Box ml="auto" mt="2">
        <HStack>
          <Text as="p">Visualização</Text>
          <Text as="b">1</Text>
          <Text as="p"> - </Text>
          <Text as="b">5</Text>
          <Text as="p"> de </Text>
          <Text as="b"> 28</Text>
          <IconButton
            aria-label="select previous page"
            icon={<MdNavigateBefore />}
            variant="outline"
            colorScheme="blackAlpha"
            size="sm"
          />
          <IconButton
            aria-label="select next page"
            icon={<MdNavigateNext />}
            variant="outline"
            colorScheme="blackAlpha"
            size="sm"
          />
        </HStack>
      </Box>
    </Flex>
  );
}
