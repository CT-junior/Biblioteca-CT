import { Flex, HStack, Icon, IconButton, useDisclosure} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";


import { useSidebar } from "../../hooks/sidebar";
import { toggleFixedSidebar } from "../../store/sidebar/actions";

import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

import { HiOutlineMenu } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

import biblioctecaLogo from "../../assets/images/bibliocteca-horizontal-logo.svg"
import { SignOutModal } from "../SignOutModal";


export function Header() {
  const { isFixed } = useSidebar();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef: any = useRef();

  return (
    <>
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
            borderRadius="full"
            onClick={toggleFixedSidebar}
            bg={isFixed ? "blackAlpha.200" : ""}
          />
          
          <Image src={biblioctecaLogo} alt="Logo da Bibliocteca" width="198.4px" height="28.8"/>
        </HStack>

        <SearchBox />

        <HStack spacing="5">
          <Profile />
          <IconButton 
            aria-label="Open signOut"
            icon={<Icon as={FiLogOut} color="gray.700"/>}
            fontSize="24px"
            borderRadius="full"
            bg="unset"
            onClick={onOpen}
          />
        </HStack>
      

      </Flex>
      <SignOutModal isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} children/>
    </>
  );
}
