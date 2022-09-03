import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useSidebarDrawer } from "../../context/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const isWideMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  if (!isWideMobile && isOpen) {
    return <SidebarNav size="64" isOpen={true} isMobile={false} key={1} />;
  } else if (!isWideMobile) {
    return <SidebarNav size="20" isOpen={false} isMobile={false} key={1}/>;
  }
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent p="4">
          <DrawerCloseButton mt="6" />
          <DrawerBody px="2">
            <SidebarNav size="100%" isOpen={true} isMobile={true} key={2} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
