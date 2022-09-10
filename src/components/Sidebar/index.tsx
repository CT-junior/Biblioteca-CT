/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    useBreakpointValue,
} from "@chakra-ui/react";

import { useSidebar } from "../../hooks/sidebar";
import { toggleFixedSidebar } from "../../store/sidebar/actions";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
    const { isOpen } = useSidebar();

    const isWideMobile = useBreakpointValue({
        base: true,
        md: false,
    });

    if (!isWideMobile && isOpen) {
        return <SidebarNav size="64" isOpen key={1} />;
    }
    if (!isWideMobile) {
        return <SidebarNav size="20" isOpen={false} key={1} />;
    }

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={toggleFixedSidebar}>
            <DrawerOverlay>
                <DrawerContent p="4">
                    <DrawerCloseButton mt="6" />
                    <DrawerBody px="2">
                        <SidebarNav size="100%" isOpen key={2} />
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
}
