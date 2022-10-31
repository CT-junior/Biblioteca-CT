import {
  HiOutlineHome,
  HiSearch,
  HiOutlineUsers,
  HiOutlineTerminal,
} from "react-icons/hi";
import { TbBooks } from "react-icons/tb";

import { Flex, Stack, useBreakpointValue, VStack } from "@chakra-ui/react";
import Image from "next/image";

import biblioctecaLogo from "../../assets/images/bibliocteca-simple-logo.svg";
import vercelLogo from "../../assets/images/vercel-horizontal-logo.svg";
import { NavLink } from "./NavLink";

interface SidebarNavProps {
  size: string;
  isOpen: boolean;
}

export function SidebarNav({ size, isOpen }: SidebarNavProps) {
  const isWideMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Flex
      position={!isWideMobile ? "fixed" : "relative"}
      zIndex="overlay"
      as="aside"
      w={size}
      px={["0", "6"]}
      py={isWideMobile ? "20" : "5"}
      h="calc(100vh - var(--chakra-space-16))"
      borderRightColor="blackAlpha.200"
      borderRightStyle="solid"
      borderRightWidth={["", "", "1px"]}
      direction="column"
      justify="space-between"
      overflow="clip"
      transition="0.3s"
      bg="white"
    >
      <Stack spacing="4" align="flex-start" paddingTop={["10", "0"]}>
        <NavLink icon={HiOutlineHome} href="/">
          Página Inicial
        </NavLink>
        <NavLink icon={HiSearch} href="/library">
          Buscar livro
        </NavLink>
        <NavLink icon={TbBooks} href="/library-manager">
          Gerenciar biblioteca
        </NavLink>
        <NavLink icon={HiOutlineTerminal} href="/logs">
          Registros
        </NavLink>
        <NavLink icon={HiOutlineUsers} href="/users">
          Controle de usuários
        </NavLink>
      </Stack>
      <VStack
        gap={["0", "0"]}
        width="100%"
        direction={["row", "column"]}
        align="center"
        justify="center"
      >
        <Image
          height="70%"
          width="70%"
          src={biblioctecaLogo}
          alt="Logo da Bibliocteca"
        />
        {isOpen && (
          <Image
            width="130%"
            height="50%"
            src={vercelLogo}
            alt="Logo da Vercel"
          />
        )}
      </VStack>
    </Flex>
  );
}
