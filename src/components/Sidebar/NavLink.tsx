import {
  Flex,
  Icon,
  Text,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <Flex h="10">
      <ActiveLink href={href} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          textDecorationLine="inherit"
          {...rest}
        >
        <Icon as={icon} boxSize="6" />

          <Text
            fontWeight="medium"
            fontSize="sm"
            ml="4"
          >
            {children}
          </Text>
        </ChakraLink>
      </ActiveLink>
    </Flex>
  );
}
