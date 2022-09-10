/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { ElementType } from "react";

import {
    Flex,
    Icon,
    Text,
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children?: string;
    href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
    return (
        <Flex h="10" w="100%">
            <ActiveLink href={href} passHref>
                <ChakraLink
                    display="flex"
                    alignItems="center"
                    px="1"
                    w="210px"
                    {...rest}
                >
                    <Icon as={icon} boxSize="6" />
                    <Text
                        fontWeight="medium"
                        fontSize="sm"
                        ml="8"
                        overflow="clip"
                        w="210px"
                        display="inline"
                    >
                        {children}
                    </Text>
                </ChakraLink>
            </ActiveLink>
        </Flex>
    );
}
