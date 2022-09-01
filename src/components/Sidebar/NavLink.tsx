import {
  Flex,
  Icon,
  Text,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Center,
} from "@chakra-ui/react";

import { ElementType } from "react";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children?: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  const { isOpen } = useSidebarDrawer();

  return (
    <Flex h="10">
      <ActiveLink href={href} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          justifyItems="center"
          justifyContent="center"
          w="100%"
          {...rest}
        >
          <Icon as={icon} boxSize="6" />

          {isOpen && (
            <Text fontWeight="medium" fontSize="sm" ml="4">
              {children}
            </Text>
          )}
        </ChakraLink>
      </ActiveLink>
    </Flex>
  );
}
