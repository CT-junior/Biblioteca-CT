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
    <Flex h="10" w="100%">
      <ActiveLink href={href} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          px="1"
          w="200px"
          {...rest}
        >
          <Icon as={icon} boxSize="6" />

        
            <Text fontWeight="medium" fontSize="sm" ml="8" overflow="clip"  w="300px" display="inline">
              {children}
            </Text>
         
        </ChakraLink>
      </ActiveLink>
    </Flex>
  );
}
