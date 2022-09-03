import {
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

import {
  HiOutlineHome,
  HiSearch,
  HiOutlineUsers,
  HiOutlineTerminal,
} from "react-icons/hi";

import Image from "next/image";

import { BiBookAdd, BiBookAlt } from "react-icons/bi";
import { NavLink } from "./NavLink";

import biblioctecaLogo from "../../assets/images/bibliocteca-simple-logo.svg";
import vercelLogo from "../../assets/images/vercel-horizontal-logo.svg";

interface SidebarNavProps {
    size: string;
    isOpen: boolean;
    isMobile: boolean;
}

export function SidebarNav({size, isOpen, isMobile}: SidebarNavProps) {
  return (
    <Flex
      as="aside"
      w={size}
      px={["0","6"]}
      py="5"
      h="calc(100vh - var(--chakra-space-16))"
      borderRightColor="blackAlpha.200"
      borderRightStyle="solid"
      borderRightWidth={["","1px"]}
      direction="column"
      justify="space-between"
      overflow="hidden"
      transition="0.3s"
    >
      <Stack spacing="4" align="flex-start">
        <NavLink icon={HiOutlineHome} href="/">
          Página Inicial
        </NavLink>
        <NavLink icon={HiSearch} href="/search">
          Pesquisar
        </NavLink>
        <NavLink icon={BiBookAlt} href="/catalog">
          Catálogo
        </NavLink>
        <NavLink icon={BiBookAdd} href="/add-book">
          Adicionar livro
        </NavLink>
        <NavLink icon={HiOutlineTerminal} href="/backlog">
          Backlog
        </NavLink>
        <NavLink icon={HiOutlineUsers} href="/user-control">
          Controle de usuários
        </NavLink>
      </Stack>
      <Stack gap={["10","6"]} direction={["row","column"]} align="center" justify="center">
        <Image src={biblioctecaLogo} alt="Logo da Bibliocteca" />
        {isOpen && (
            <Image src={vercelLogo} alt="Logo da Vercel" />
        )}
      </Stack>
    </Flex>
  );
}