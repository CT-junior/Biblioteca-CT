import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export function Pagination(){
    return(
        <Flex w="100%">
        <Box ml="auto" mt="2">
          <HStack>
            <Text as="p">
              Visualização <Text as="b">1</Text> - <Text as="b">5</Text> de
              <Text as="b"> 28</Text>
            </Text>
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
    )
}