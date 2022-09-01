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

import { BiBookAdd, BiBookAlt } from "react-icons/bi";

import { NavLink } from "./NavLink";
import Image from "next/image";

import biblioctecaLogo from "../../assets/images/bibliocteca-simple-logo.svg";
import vercelLogo from "../../assets/images/vercel-horizontal-logo.svg";

import { useSidebarDrawer } from "../../context/SidebarDrawerContext";

export function Sidebar() {
  const { isOpen } = useSidebarDrawer();

  const isWideVersionMobile = useBreakpointValue({
    base:true,
    sm: false,
  
  })

  if (isOpen && !isWideVersionMobile) {
    return (
      <Flex
        as="aside"
        w="64"
        px="6"
        py="5"
        h="calc(100vh - var(--chakra-space-16))"
        borderRightColor="blackAlpha.200"
        borderRightStyle="solid"
        borderRightWidth="1px"
        direction="column"
        justify="space-between"
        transition="0.3s"
        overflow="hidden"
      >
        <Stack spacing="4" align="flex-start" transition="0.3s">
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
        <Stack gap="6">
          <Image src={biblioctecaLogo} alt="Logo da Bibliocteca" />
          <Image src={vercelLogo} alt="Logo da Vercel" />
        </Stack>
      </Flex>
    );
  }else if(!isWideVersionMobile){
    return (
      <Flex
        as="aside"
        w="20"
        px="6"
        py="5"
        h="calc(100vh - var(--chakra-space-16))"
        borderRightColor="blackAlpha.200"
        borderRightStyle="solid"
        borderRightWidth="1px"
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
        <Stack gap="6">
          <Image src={biblioctecaLogo} alt="Logo da Bibliocteca" />
        </Stack>
      </Flex>
    );
  }

  return (
    <h1>Mobile</h1>
  );
}