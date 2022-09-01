import { Box, Stack } from "@chakra-ui/react";
import {
  HiOutlineHome,
  HiSearch,
  HiOutlineUsers,
  HiOutlineTerminal,
} from "react-icons/hi";
import { BiBookAdd, BiBookAlt } from "react-icons/bi";

import { NavLink } from "./NavLink";

export function Sidebar() {
  return (
    <Box
      as="aside"
      w="64"
      pl="6"
      pt="5"
      h="calc(100vh - var(--chakra-space-16))"
      borderRightColor="blackAlpha.200"
      borderRightStyle="solid"
      borderRightWidth="1px"
    >
      <Stack spacing="4" align="flex-start">
        <NavLink icon={HiOutlineHome} href="/">
          Página Inicial
        </NavLink>
        <NavLink icon={HiSearch} href="/">
          Pesquisar
        </NavLink>
        <NavLink icon={BiBookAlt} href="/">
          Catálogo
        </NavLink>
        <NavLink icon={BiBookAdd} href="/">
          Adicionar livro
        </NavLink>
        <NavLink icon={HiOutlineTerminal} href="/">
          Backlog
        </NavLink>
        <NavLink icon={HiOutlineUsers} href="/">
          Controle de usuários
        </NavLink>
      </Stack>
    </Box>
  );
}
