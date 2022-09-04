import { Flex, HStack, Icon, IconButton} from "@chakra-ui/react";
import Image from "next/image";

import { HiOutlineMenu } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

import biblioctecaLogo from "../../assets/images/bibliocteca-horizontal-logo.svg"

import { useSidebar } from "../../hooks/sidebar";
import { toggleFixedSidebar } from "../../store/sidebar/actions";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const { isFixed } = useSidebar();

  return (
    <Flex
      as="header"
      w="100%"
      h="16"
      mx="auto"
      px="5"
      align="center"
      justify="space-between"
      borderBottomColor="blackAlpha.200"
      borderBottomWidth="1px"
      borderBottomStyle="solid"

    >
      <HStack gap="8" >
        <IconButton 
          aria-label="Open navigation"
          icon={<Icon as={HiOutlineMenu} color="gray.700"/>}
          fontSize="24px"
          borderRadius="50%"
          onClick={toggleFixedSidebar}
          bg={isFixed ? "blackAlpha.200" : ""}
        ></IconButton>
        
        <Image src={biblioctecaLogo} alt="Logo da Bibliocteca" />
      </HStack>

      <SearchBox />

      <HStack spacing="5">
        <Profile />
        <Icon as={FiLogOut} fontSize="2xl" color="gray.700"/>
      </HStack>
     

    </Flex>
  );
}
