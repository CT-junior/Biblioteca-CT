/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { ReactNode } from "react";

import { Box, useBreakpointValue, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useSidebar } from "../../hooks/useSidebar";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface Props {
    children?: ReactNode;
}

export const BodyContent = ({ children }: Props) => {
    const router = useRouter();

    const isOpenSidebar = useSidebar().isOpen;

    const isSideBarDrawer = useBreakpointValue({
        base: true,
        md: false,
    });

    if (router.pathname === "/auth/signin") {
        return <Box>{children}</Box>;
    }

    return (
        <Flex flexDirection="column">
            <Box h="16">
                <Header />
            </Box>
            <Flex>
                <Sidebar />
                <Box
                    w="100%"
                    px="8"
                    py="8"
                    ml={isSideBarDrawer ? "0" : isOpenSidebar ? "64" : "20"}
                    transition="0.2s"
                >
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
};
