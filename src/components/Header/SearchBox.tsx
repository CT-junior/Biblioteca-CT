import { Flex, Icon, Input} from "@chakra-ui/react";


import { FiSearch } from "react-icons/fi";

export function SearchBox(){
    return(
        <Flex
        as="label"
        flex="1"
        py="2"
        px="3"
        maxW="600"
        h="12"
        align="center"
        justify="center"
        color="gray.200"
        position="relative"
        bg="blackAlpha.50"
        borderRadius="lg"
      >
          <Icon as={FiSearch} fontSize="20" color="blackAlpha.700" />
        <Input
          color="blackAlpha.700"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "blackAlpha.700" }}
          
        />
      
      </Flex>
    )
}