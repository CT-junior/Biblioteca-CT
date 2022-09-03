import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { on } from "events";

import { useSidebarDrawerFixed } from "../../context/SidebarDrawerFixedContext";
import { useSidebarDrawerTemp } from "../../context/SidebarDrawerTempContext";

import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawerFixed();
  
  const isOpenTemp = useSidebarDrawerTemp().isOpen;

  const isWideMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  if (!isWideMobile && isOpen || isOpenTemp) {
    return <SidebarNav size="64" isOpen={true} key={1} />; 
  } else if (!isWideMobile) {
    return <SidebarNav size="20" isOpen={false} key={1}/>;
  }
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent p="4">
          <DrawerCloseButton mt="6" />
          <DrawerBody px="2" >
            <SidebarNav size="100%" isOpen={true}  key={2} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
