import { Flex, Icon, Text,   Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";


import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
    href: string;
  }
  
export function NavLink({icon, children, href, ...rest}: NavLinkProps) {
  return (
    <Flex h="10">
      <ChakraLink display="flex" alignItems="center" textDecorationLine="inherit" {...rest} >
        <Flex boxSize="10" align="center" justify="center">
          <Icon as={icon} color="gray.600" boxSize="6"/>
        </Flex>
        <Text fontWeight="medium" fontSize="sm" color="gray.900" ml="4" textDecor="none">
          {children}
        </Text>
      </ChakraLink>
    </Flex>
  );
}
