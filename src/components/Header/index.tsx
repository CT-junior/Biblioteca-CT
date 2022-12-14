import { useRef } from "react";
import { render } from "react-dom";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";

import {
  Flex,
  HStack,
  Icon,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

import biblioctecaLogo from "../../assets/images/bibliocteca-horizontal-logo.svg";
import { useSidebar } from "../../hooks/useSidebar";
import { toggleFixedSidebar } from "../../store/sidebar/actions";
import { SignOutModal } from "../SignOutModal";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const { isFixed } = useSidebar();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef: any = useRef();
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Box>
      <Flex
        position="fixed"
        zIndex="overlay"
        as="header"
        w="100%"
        h="16"
        mx="auto"
        px="5"
        py="2"
        align="center"
        justify="space-between"
        borderBottomColor="blackAlpha.200"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        gap={["3", "6"]}
        bg="white"
      >
        <HStack gap={["2", "8"]}>
          <IconButton
            aria-label="Open navigation"
            icon={<Icon as={HiOutlineMenu} color="gray.700" />}
            fontSize="24px"
            borderRadius="full"
            onClick={toggleFixedSidebar}
            bg={isFixed ? "blackAlpha.200" : ""}
          />

          <Image
            src={biblioctecaLogo}
            alt="Logo da Bibliocteca"
            width="198.4px"
            height="28.8"
            objectFit="contain"
          />
        </HStack>

        <HStack>
          <Profile showProfileData={isWideVersion} />
          <IconButton
            aria-label="Open signOut"
            icon={<Icon as={FiLogOut} color="gray.700" />}
            fontSize="24px"
            borderRadius="full"
            bg="unset"
            onClick={onOpen}
          />
        </HStack>
      </Flex>
      <SignOutModal
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        // eslint-disable-next-line react/no-children-prop
        children
      />
    </Box>
  );
}
