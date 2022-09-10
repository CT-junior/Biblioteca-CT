/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";

import {
    Flex,
    HStack,
    Icon,
    IconButton,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";

import biblioctecaLogo from "../../assets/images/bibliocteca-horizontal-logo.svg";
import { useSidebar } from "../../hooks/sidebar";
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
                gap={["3", "6"]}
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

                {isWideVersion && <SearchBox />}

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
                children
            />
        </>
    );
}
