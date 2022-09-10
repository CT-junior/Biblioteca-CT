/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { BiBookAlt } from "react-icons/bi";
import {
    HiOutlineHome,
    HiSearch,
    HiOutlineUsers,
    HiOutlineTerminal,
} from "react-icons/hi";

import { Flex, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { setTimeout } from "timers";

import biblioctecaLogo from "../../assets/images/bibliocteca-simple-logo.svg";
import vercelLogo from "../../assets/images/vercel-horizontal-logo.svg";
import { toggleSidebar } from "../../store/sidebar/actions";
import { NavLink } from "./NavLink";

interface SidebarNavProps {
    size: string;
    isOpen: boolean;
}

export function SidebarNav({ size, isOpen }: SidebarNavProps) {
    const onMouseLeave = () => {
        new Promise((res) => setTimeout(res, 400)).then(() => {
            toggleSidebar(false);
        });
    };

    const onMouseEnter = () => {
        new Promise((res) => setTimeout(res, 300)).then(() => {
            toggleSidebar(true);
        });
    };

    return (
        <Flex
            as="aside"
            w={size}
            px={["0", "6"]}
            py="5"
            h="calc(100vh - var(--chakra-space-16))"
            borderRightColor="blackAlpha.200"
            borderRightStyle="solid"
            borderRightWidth={["", "", "1px"]}
            direction="column"
            justify="space-between"
            overflow="clip"
            transition="0.3s"
            onMouseEnter={onMouseEnter}
            onMouseLeave={() => {
                onMouseLeave();
            }}
        >
            <Stack spacing="4" align="flex-start">
                <NavLink icon={HiOutlineHome} href="/">
                    Página Inicial
                </NavLink>
                <NavLink icon={HiSearch} href="/search">
                    Buscar livro
                </NavLink>
                <NavLink icon={BiBookAlt} href="/library-manager">
                    Gerenciar biblioteca
                </NavLink>
                <NavLink icon={HiOutlineTerminal} href="/backlog">
                    Backlog
                </NavLink>
                <NavLink icon={HiOutlineUsers} href="/user-control">
                    Controle de usuários
                </NavLink>
            </Stack>
            <Stack
                gap={["10", "6"]}
                direction={["row", "column"]}
                align="center"
                justify="center"
            >
                <Image src={biblioctecaLogo} alt="Logo da Bibliocteca" />
                {isOpen && <Image src={vercelLogo} alt="Logo da Vercel" />}
            </Stack>
        </Flex>
    );
}
